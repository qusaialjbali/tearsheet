/* Tearsheet code generation: turns a component entry into HTML, React, Vue and Svelte files.
 * Pure functions with no DOM, shared by the website (window.CUIGen), the command-line tool,
 * the MCP server and the API build (require('./codegen')).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CUIGen = api;
})(typeof self !== 'undefined' ? self : this, function () {
  const FRAMEWORKS = [
    { id: 'html', label: 'HTML' },
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
    { id: 'svelte', label: 'Svelte' },
  ];

  /* Collections in reading order; the experimental centerfold always comes last. */
  const ORDER = ['Actions', 'Forms', 'Content', 'Data', 'Feedback', 'Navigation', 'Overlays', 'Sections'];

  const pascal = (id) => id.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
  const indent = (text, n) => text.split('\n').map((l) => (l ? ' '.repeat(n) + l : l)).join('\n');

  function styleToObject(css) {
    const pairs = css
      .split(';')
      .filter((d) => d.trim())
      .map((d) => {
        const [k, ...v] = d.split(':');
        const key = k.trim();
        const prop = key.startsWith('--') ? "'" + key + "'" : key.replace(/-(\w)/g, (_, c) => c.toUpperCase());
        return prop + ": '" + v.join(':').trim() + "'";
      });
    return '{{ ' + pairs.join(', ') + ' }}';
  }

  function htmlToJsx(html) {
    return html
      .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
      .replace(/\sclass=/g, ' className=')
      .replace(/\sfor=/g, ' htmlFor=')
      .replace(/\stabindex="(-?\d+)"/g, ' tabIndex={$1}')
      .replace(/\sautocomplete=/g, ' autoComplete=')
      .replace(/\sinputmode=/g, ' inputMode=')
      .replace(/\smaxlength="(\d+)"/g, ' maxLength={$1}')
      .replace(/\sreadonly(?=[\s>/])/g, ' readOnly')
      .replace(/\snovalidate(?=[\s>/])/g, ' noValidate')
      .replace(/\schecked(?=[\s>/])/g, ' defaultChecked')
      .replace(/<input\b[^>]*>/g, (tag) => tag.replace(/\svalue=/, ' defaultValue='))
      .replace(/\sdatetime=/g, ' dateTime=')
      .replace(/\scolspan=/g, ' colSpan=')
      .replace(/\srowspan=/g, ' rowSpan=')
      .replace(/\sspellcheck=/g, ' spellCheck=')
      .replace(/\senterkeyhint=/g, ' enterKeyHint=')
      .replace(/\sminlength="(\d+)"/g, ' minLength={$1}')
      .replace(/\spopovertargetaction=/g, ' popoverTargetAction=')
      .replace(/\spopovertarget=/g, ' popoverTarget=')
      .replace(/\scontenteditable=/g, ' contentEditable=')
      // hyphenated SVG/presentation attributes (stroke-width, stop-color, text-anchor…) become camelCase
      .replace(/\s((?!aria-|data-)[a-z]+(?:-[a-z]+)+)=/g, (_, name) => ' ' + name.replace(/-(\w)/g, (m, c) => c.toUpperCase()) + '=')
      .replace(/\sstyle="([^"]*)"/g, (_, css) => ' style=' + styleToObject(css))
      .replace(/<(input|img|br|hr|source)\b([^>]*?)\s*\/?>/g, '<$1$2 />');
  }

  /* Count top-level elements without a DOM, so React knows when it needs a fragment. */
  const VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
  function rootCount(html) {
    const re = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g;
    let depth = 0;
    let count = 0;
    let m;
    while ((m = re.exec(html))) {
      if (m[0].startsWith('<!--')) continue;
      const closing = m[0].startsWith('</');
      const selfClosing = m[2] === '/' || VOID.test(m[1]);
      if (closing) { depth--; continue; }
      if (depth === 0) count++;
      if (!selfClosing) depth++;
    }
    return count;
  }

  const injectAttr = (markup, attr) => markup.replace(/^<([\w-]+)/, '<$1 ' + attr);

  function setupFn(c, param) {
    return 'function setup(' + (param || 'root') + ') {\n' + indent(c.setup.trim(), 2) + '\n}';
  }

  function vanillaScript(c) {
    if (c.setup) return setupFn(c) + '\n\ndocument.querySelectorAll(' + JSON.stringify(c.root) + ').forEach(setup);';
    return c.js ? c.js.trim() : '';
  }

  function reactCode(c) {
    if (c.react) return c.react;
    const name = pascal(c.id);
    let jsx = htmlToJsx(c.html.trim());
    if (c.setup) {
      jsx = injectAttr(jsx, 'ref={ref}');
      return (
        "import { useEffect, useRef } from 'react';\n" +
        "import './" + name + ".css';\n\n" +
        setupFn(c) + '\n\n' +
        'export function ' + name + '() {\n' +
        '  const ref = useRef(null);\n' +
        '  useEffect(() => setup(ref.current), []);\n\n' +
        '  return (\n' + indent(jsx, 4) + '\n  );\n}\n'
      );
    }
    const body = rootCount(c.html) > 1 ? '<>\n' + indent(jsx, 2) + '\n</>' : jsx;
    return (
      "import './" + name + ".css';\n\n" +
      'export function ' + name + '() {\n' +
      '  return (\n' + indent(body, 4) + '\n  );\n}\n'
    );
  }

  function vueCode(c) {
    const css = c.css.trim();
    if (c.vue) return c.vue.replace('__CSS__', css);
    if (c.setup) {
      return (
        '<script setup>\n' +
        "import { onBeforeUnmount, onMounted, ref } from 'vue';\n\n" +
        'const el = ref(null);\nlet cleanup;\n\n' +
        setupFn(c) + '\n\n' +
        'onMounted(() => {\n  cleanup = setup(el.value);\n});\n' +
        'onBeforeUnmount(() => cleanup?.());\n' +
        '</script>\n\n' +
        '<template>\n' + indent(injectAttr(c.html.trim(), 'ref="el"'), 2) + '\n</template>\n\n' +
        '<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->\n' +
        '<style>\n' + css + '\n</style>\n'
      );
    }
    return '<template>\n' + indent(c.html.trim(), 2) + '\n</template>\n\n<style scoped>\n' + css + '\n</style>\n';
  }

  function svelteCode(c) {
    const css = c.css.trim();
    if (c.svelte) return c.svelte.replace('__CSS__', css);
    if (c.setup) {
      const name = pascal(c.id);
      return (
        '<script>\n' +
        "  import { onMount } from 'svelte';\n" +
        "  import './" + name + ".css';\n\n" +
        '  let node;\n\n' +
        indent(setupFn(c), 2) + '\n\n' +
        '  onMount(() => setup(node));\n' +
        '</script>\n\n' +
        injectAttr(c.html.trim(), 'bind:this={node}') + '\n'
      );
    }
    return c.html.trim() + '\n\n<style>\n' + css + '\n</style>\n';
  }

  /* Version stamps. Every file carries one comment line naming the part and a short hash of its
     source, so `tearsheet diff` can tell later whether a copied part has changed upstream. */
  const SITE = 'https://qusaialjbali.github.io/tearsheet';
  function hash(text) {
    let h = 0x811c9dc5; // FNV-1a, 32-bit: tiny, stable, the same in Node and the browser
    for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const version = (c) => hash([c.html, c.css, c.setup || '', c.js || '', c.react || '', c.vue || '', c.svelte || ''].join('\n--\n'));
  const tokensVersion = (tokensCss) => hash(tokensCss.trim());
  function stampLine(id, v, name) {
    const text = 'tearsheet ' + id + ' v' + v + (id === 'tokens' ? '' : ' · ' + SITE + '/zine/parts/' + id + '.html');
    return /\.(html|vue|svelte)$/.test(name) ? '<!-- ' + text + ' -->' : '/* ' + text + ' */';
  }
  /* Reads a stamp back: { id, version } or null. */
  function readStamp(code) {
    const m = /^\s*(?:<!--|\/\*)\s*tearsheet ([a-z0-9-]+) v([0-9a-f]{8})/.exec(code);
    return m ? { id: m[1], version: m[2] } : null;
  }
  const unstamp = (code) => (readStamp(code) ? code.replace(/^\s*(?:<!--.*?-->|\/\*.*?\*\/)[ \t]*\r?\n/, '') : code);

  /* Files for one component in one format. Pass the tokens CSS to include tokens.css first. */
  function filesFor(c, fw, tokensCss) {
    const name = pascal(c.id);
    const files = [];
    const v = version(c);
    const add = (fileName, code) => files.push({ name: fileName, code: stampLine(c.id, v, fileName) + '\n' + code });
    if (tokensCss) files.push({ name: 'tokens.css', code: stampLine('tokens', tokensVersion(tokensCss), 'tokens.css') + '\n' + tokensCss.trim(), note: 'once, globally' });
    if (fw === 'html') {
      add('index.html', c.html.trim());
      add('styles.css', c.css.trim());
      const js = vanillaScript(c);
      if (js) add('script.js', js);
    } else if (fw === 'react') {
      add(name + '.jsx', reactCode(c).trim());
      add(name + '.css', c.css.trim());
    } else if (fw === 'vue') {
      add(name + '.vue', vueCode(c).trim());
    } else if (fw === 'svelte') {
      add(name + '.svelte', svelteCode(c).trim());
      if (c.setup && !c.svelte) add(name + '.css', c.css.trim());
    }
    return files;
  }

  /* One-file version for quick copy: everything a person needs in a single paste. */
  function singleFile(c, fw) {
    if (fw === 'html') {
      const js = vanillaScript(c);
      return '<style>\n' + c.css.trim() + '\n</style>\n\n' + c.html.trim() + (js ? '\n\n<script>\n' + js + '\n</script>' : '');
    }
    if (fw === 'react') return reactCode(c).trim();
    if (fw === 'vue') return vueCode(c).trim();
    return svelteCode(c).trim();
  }

  /* A complete HTML document that shows one live component: used by the site's previews,
     the static part pages and the accessibility check. */
  const PREVIEW_BASE =
    'html, body { margin: 0; }' +
    'body { font-family: var(--ui-font); font-size: 15px; line-height: 1.5; color: var(--ui-text); background: var(--ui-bg); -webkit-font-smoothing: antialiased; }' +
    '.stage { padding: 40px 28px; display: flex; justify-content: center; align-items: center; }' +
    '.stage.full { display: block; }';

  function previewDoc(c, tokensCss, opts) {
    const o = opts || {};
    const js = vanillaScript(c);
    return (
      '<!doctype html><html lang="en" data-theme="' + (o.theme || 'light') + '"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      (o.title ? '<title>' + o.title + '</title>' : '') +
      '<style>' + (tokensCss || '') + PREVIEW_BASE + (o.extraCss || '') + c.css + '</style></head><body>' +
      '<div class="stage' + (c.layout === 'full' ? ' full' : '') + '">' + c.html + '</div>' +
      '<script>document.addEventListener("click",function(e){var a=e.target.closest("a[href=\'#\']");if(a)e.preventDefault();});<\/script>' +
      (js ? '<script>' + js + '<\/script>' : '') +
      '</body></html>'
    );
  }

  function specs(c) {
    const bytes = new TextEncoder().encode(c.html + c.css + vanillaScript(c)).length;
    return { kb: (bytes / 1024).toFixed(1), js: Boolean(c.js || c.setup), formats: FRAMEWORKS.length };
  }

  function categories(components) {
    const found = [...new Set(components.map((c) => c.category))];
    const rank = (c) => (c === 'Experimental' ? 999 : ORDER.includes(c) ? ORDER.indexOf(c) : 500);
    return found.sort((a, b) => rank(a) - rank(b));
  }

  /* Components grouped by collection and numbered 01, 02, … (the zine's page numbers). */
  function ordered(components) {
    let n = 0;
    return categories(components).flatMap((cat) =>
      components.filter((c) => c.category === cat).map((c) => Object.assign({}, c, { no: String(++n).padStart(2, '0') }))
    );
  }

  /* The collection name readers see (“Experimental” is printed as “Weird”). */
  const collectionLabel = (cat) => (cat === 'Experimental' ? 'Weird' : cat);

  return {
    FRAMEWORKS, ORDER, pascal, htmlToJsx, rootCount, vanillaScript,
    reactCode, vueCode, svelteCode, filesFor, singleFile, specs, categories, ordered, collectionLabel, previewDoc,
    hash, version, tokensVersion, stampLine, readStamp, unstamp,
  };
});
