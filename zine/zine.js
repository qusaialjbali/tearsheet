/* The Risograph Zine: cover contents, category spreads, tear-off code and the centerfold. */
(function () {
  const { el, prefs, filesFor, specs, lazyFrame, formatGroup, copyText, FRAME_CSS, TOKENS } = CUI;
  const parts = CUI.ordered();
  const cats = CUI.categories();
  const WIDE = new Set(['navbar', 'data-table', 'steps-indicator', 'stat-group']);
  const isWide = (p) => WIDE.has(p.id) || p.layout === 'full';
  const COPY_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13 3H5a2 2 0 0 0-2 2v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const SCISSORS = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.6 7.6 20 18M8.6 16.4 20 6"/></svg>';

  document.querySelectorAll('[data-count]').forEach((n) => (n.textContent = parts.length));
  const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three', 'Twenty-four', 'Twenty-five'];
  const wildN = parts.filter((p) => p.wild).length;
  document.querySelectorAll('[data-wild-count]').forEach((n) => (n.textContent = WORDS[wildN] || String(wildN)));
  document.querySelectorAll('[data-formats]').forEach((g) => formatGroup(g, 'ink-btn'));

  const ink2 = (text, tag, attrs) =>
    el(tag, attrs, el('span', { class: 'ink2' }, [el('span', { class: 'a', text }), el('span', { class: 'b', 'aria-hidden': 'true', text })]));

  /* ───────── Collections ───────── */
  const secId = (cat) => (cat === 'Experimental' ? 'centerfold' : 'spread-' + cat.toLowerCase());
  const short = (cat) => (cat === 'Experimental' ? 'Weird' : cat);
  const inCat = (cat) => parts.filter((p) => p.category === cat);
  const ARROW_L = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ARROW_R = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* Cover contents (page numbers) */
  const contents = document.getElementById('contents');
  cats.forEach((cat) => {
    const first = inCat(cat)[0];
    contents.append(el('li', {}, el('a', { href: '#' + secId(cat) }, [el('span', { text: cat === 'Experimental' ? 'The weird centerfold' : cat }), el('span', { text: 'p.' + first.no })])));
  });

  /* Shelf (sticky collection bar) and thumb-index tabs on the page edge */
  const shelf = document.getElementById('shelf');
  const thumbs = document.getElementById('thumbs');
  cats.forEach((cat) => {
    const n = inCat(cat).length;
    shelf.append(el('a', { href: '#' + secId(cat), 'data-sec': secId(cat) }, [short(cat), el('b', { text: String(n) })]));
    thumbs.append(el('a', { href: '#' + secId(cat), 'data-sec': secId(cat), 'aria-label': short(cat) + ', ' + n + (n === 1 ? ' page' : ' pages') }, el('span', { text: short(cat) })));
  });

  /* ───────── Tear-off code ───────── */
  function renderTear(box, part) {
    box.replaceChildren();
    const group = el('div', { class: 'inks', role: 'radiogroup', 'aria-label': 'Format for ' + part.name });
    box.append(group);
    formatGroup(group, 'ink-btn');
    filesFor(part, prefs.framework, prefs.tokens).forEach((file) => {
      const copy = el('button', { type: 'button', class: 'copy', 'aria-label': 'Copy ' + file.name });
      copy.innerHTML = COPY_ICON;
      copy.append(el('span', { 'data-label': '', text: 'Copy' }));
      copy.addEventListener('click', () => copyText(file.code, copy));
      box.append(
        el('div', { class: 'file' }, [
          el('div', { class: 'file-head' }, [
            el('span', { class: 'file-name', text: file.name }),
            file.note ? el('span', { class: 'file-note', text: file.note }) : null,
            copy,
          ]),
          el('pre', { class: 'code', tabindex: '0', 'aria-label': file.name }, el('code', { text: file.code })),
        ])
      );
    });
    const fw = prefs.framework;
    const live = el('button', { type: 'button', class: 'try-live', text: fw === 'html' ? 'Edit live on CodePen' : 'Run it on StackBlitz' });
    live.addEventListener('click', () => openPlayground(part, fw));
    box.append(el('p', { class: 'try-row' }, [live, el('span', { text: 'Opens in a new tab with tokens.css included.' })]));
  }

  /* ───────── Try it live ─────────
     Posts the component to CodePen (HTML) or to a small Vite project on StackBlitz
     (React, Vue, Svelte). Nothing is sent until the reader presses the button. */
  function postForm(action, fields) {
    const form = el('form', { method: 'POST', action, target: '_blank', hidden: true });
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.append(input);
    });
    document.body.append(form);
    form.submit();
    form.remove();
  }

  function openPlayground(part, fw) {
    const title = part.name + ' · Tearsheet';
    if (fw === 'html') {
      const files = filesFor(part, 'html', false);
      const get = (n) => (files.find((f) => f.name === n) || { code: '' }).code;
      postForm('https://codepen.io/pen/define', {
        data: JSON.stringify({
          title, description: part.description, editors: '110', layout: 'top',
          html: get('index.html'),
          css: TOKENS + '\n\nbody { display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 40px 20px; font-family: var(--ui-font); color: var(--ui-text); background: var(--ui-bg); }\n\n' + get('styles.css'),
          js: get('script.js'),
        }),
      });
      return;
    }
    const name = CUI.pascal(part.id);
    const ext = { react: 'jsx', vue: 'vue', svelte: 'svelte' }[fw];
    const deps = {
      react: [{ react: '^19.0.0', 'react-dom': '^19.0.0' }, { '@vitejs/plugin-react': '^4.3.0' }, "import react from '@vitejs/plugin-react';", 'react()'],
      vue: [{ vue: '^3.5.0' }, { '@vitejs/plugin-vue': '^5.2.0' }, "import vue from '@vitejs/plugin-vue';", 'vue()'],
      svelte: [{}, { svelte: '^5.0.0', '@sveltejs/vite-plugin-svelte': '^5.0.0' }, "import { svelte } from '@sveltejs/vite-plugin-svelte';", 'svelte()'],
    }[fw];
    const main = {
      react: "import { createRoot } from 'react-dom/client';\nimport { " + name + " } from './" + name + ".jsx';\n\ncreateRoot(document.getElementById('app')).render(<" + name + ' />);\n',
      vue: "import { createApp } from 'vue';\nimport " + name + " from './" + name + ".vue';\n\ncreateApp(" + name + ").mount('#app');\n",
      svelte: "import { mount } from 'svelte';\nimport " + name + " from './" + name + ".svelte';\n\nmount(" + name + ", { target: document.getElementById('app') });\n",
    }[fw];
    const entry = 'src/main.' + (fw === 'react' ? 'jsx' : 'js');
    const fields = {
      'project[title]': title,
      'project[description]': part.description,
      'project[template]': 'node',
      'project[files][package.json]': JSON.stringify({
        name: part.id, private: true, type: 'module',
        scripts: { dev: 'vite', build: 'vite build' },
        dependencies: deps[0],
        devDependencies: Object.assign({ vite: '^6.0.0' }, deps[1]),
      }, null, 2),
      'project[files][vite.config.js]': "import { defineConfig } from 'vite';\n" + deps[2] + '\n\nexport default defineConfig({ plugins: [' + deps[3] + '] });\n',
      'project[files][index.html]': '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>' + title + '</title>\n    <link rel="stylesheet" href="/src/tokens.css">\n    <style>body { display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 40px 20px; font-family: var(--ui-font); color: var(--ui-text); background: var(--ui-bg); }</style>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="module" src="/' + entry + '"></script>\n  </body>\n</html>\n',
      'project[files][src/tokens.css]': TOKENS,
    };
    fields['project[files][' + entry + ']'] = main;
    filesFor(part, fw, false).forEach((f) => (fields['project[files][src/' + f.name + ']'] = f.code));
    postForm('https://stackblitz.com/run?file=src/' + name + '.' + ext, fields);
  }

  /* ───────── Stress the preview: right-to-left with Arabic, or 40% longer text ───────── */
  const STRESS = [['arabic', 'RTL + Arabic'], ['longText', 'Long text']];
  function stressBar(part, frame) {
    const status = el('span', { class: 'stress-status', role: 'status' });
    const buttons = STRESS.map(([fn, label]) => {
      const b = el('button', { type: 'button', class: 'stress-btn', 'aria-pressed': 'false', 'data-fn': fn, text: label });
      b.addEventListener('click', () => {
        const on = b.getAttribute('aria-pressed') !== 'true';
        buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b && on)));
        if (!frame.srcdoc) CUI.mountFrame(frame, part, FRAME_CSS);
        frame.addEventListener('load', () => {
          if (on) window.TearsheetStress[fn](frame.contentDocument);
          status.textContent = on ? (fn === 'arabic' ? 'Right-to-left with Arabic sample words (not a translation): the layout should mirror and nothing should spill out.' : 'A pretend translation: every string about 40% longer, with accents, as German or Finnish often are. Buttons and labels should wrap or grow, never clip or overflow.') : 'Back to normal.';
        }, { once: true });
        // reload the preview fresh, then apply the stress to it
        frame.srcdoc = frame.srcdoc.replace(/<!--n\d+-->$/, '') + '<!--n' + Date.now() + '-->';
      });
      return b;
    });
    return el('div', { class: 'stress', role: 'group', 'aria-label': 'Test ' + part.name + ' under stress' }, [el('span', { class: 'stress-label', text: 'Try it:' }), ...buttons, status]);
  }

  /* ───────── Receipts: the evidence from the CI run, per part ───────── */
  let receiptsData = null;
  const receiptsReady = fetch('../api/receipts.json').then((r) => (r.ok ? r.json() : null)).then((d) => (receiptsData = d)).catch(() => null);
  function receipt(part) {
    const box = el('details', { class: 'receipt' });
    const summary = el('summary', { text: 'Receipt: checking…' });
    box.append(summary);
    receiptsReady.then(() => {
      const r = receiptsData && receiptsData.parts[part.id];
      if (!r) { box.remove(); return; }
      const ok = (yes, text) => el('li', {}, [el('b', { class: yes ? 'r-ok' : 'r-no', text: yes ? 'PASS' : 'NOTE' }), ' ' + text]);
      const clean = !r.axe.light.violations && !r.axe.dark.violations;
      const motion = !r.motion.moves ? 'No motion.'
        : r.motion.loopingUnderReducedMotion ? r.motion.loopingUnderReducedMotion + ' looping animation keeps running with reduced motion on (slowed or essential, like a loading bar).'
        : r.motion.handled ? 'Movement stops or calms down with reduced motion on.' : 'Only short hover and focus transitions (under 300ms).';
      summary.textContent = 'Receipt: axe ' + (clean ? 'clean' : 'issues') + ' · contrast ' + (r.contrast ? r.contrast.ratio + ':1' : 'n/a') + ' · ' + r.keyboard.length + ' tab stop' + (r.keyboard.length === 1 ? '' : 's') + ' · RTL ' + (r.rtl.overflows ? '✗' : '✓') + ' · long text ' + (r.long.overflows ? '✗' : '✓');
      const tree = el('pre', { class: 'r-tree', tabindex: '0', 'aria-label': 'Accessibility tree' });
      tree.textContent = r.tree || '(empty)';
      box.append(
        el('ul', { class: 'r-lines' }, [
          ok(clean, 'axe, WCAG 2.1 A and AA: no violations in light or dark (' + r.axe.light.rulesPassed + ' rules passed).'),
          r.contrast ? ok(true, 'Tightest text contrast ' + r.contrast.ratio + ':1, where ' + r.contrast.need + ':1 is needed (' + r.contrast.theme + ').') : ok(true, 'No text to measure for contrast.'),
          ok(r.brand, r.brand ? 'Still passes contrast with tokens fitted to a yellow brand colour.' : 'Contrast slips with a fitted yellow brand.'),
          ok(!r.rtl.overflows, 'Right-to-left with Arabic sample text fits a 390px phone.'),
          ok(!r.long.overflows, 'Every string 40% longer still fits a 390px phone.'),
          ok(true, motion),
        ]),
        el('p', { class: 'r-head', text: r.keyboard.length ? 'Tab order' : 'Tab order: nothing here takes focus (it is content, not controls).' }),
        r.keyboard.length ? el('ol', { class: 'r-keys' }, r.keyboard.map((k) => el('li', { text: k }))) : null,
        el('p', { class: 'r-head', text: 'What assistive tech is given' }),
        tree,
        el('p', { class: 'r-foot', text: (receiptsData.about || '') + ' Automated checks catch a lot, not everything: still try it with a screen reader.' })
      );
    });
    return box;
  }

  function page(part) {
    const sp = specs(part);
    const tearId = 'tear-' + part.id;
    const tear = el('div', { class: 'tear', id: tearId, hidden: true });
    const btn = el('button', { type: 'button', class: 'tear-btn', 'aria-expanded': 'false', 'aria-controls': tearId });
    btn.innerHTML = SCISSORS + '<span>Tear out the code</span>';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('span').textContent = open ? 'Put it back' : 'Tear out the code';
      tear.hidden = !open;
      if (open) {
        renderTear(tear, part);
        tear.classList.remove('is-new');
        void tear.offsetWidth;
        tear.classList.add('is-new');
      }
    });

    const frame = el('iframe');
    lazyFrame(frame, part, FRAME_CSS);

    const i = parts.findIndex((p) => p.id === part.id);
    const prev = parts[i - 1];
    const next = parts[i + 1];
    const navLink = (p, dir) => {
      const a = el('a', { class: 'pn-' + dir, href: '#' + p.id, rel: dir });
      a.innerHTML = dir === 'prev' ? ARROW_L : '';
      a.append(el('span', {}, [el('small', { text: (dir === 'prev' ? 'Previous' : 'Next') + ' · p.' + p.no }), p.name]));
      if (dir === 'next') a.insertAdjacentHTML('beforeend', ARROW_R);
      return a;
    };
    const pageNav = el('nav', { class: 'page-nav', 'aria-label': 'Next and previous pages' }, [
      prev ? navLink(prev, 'prev') : el('span'),
      next ? navLink(next, 'next') : el('a', { class: 'pn-next', href: '#back-page' }, [el('span', {}, [el('small', { text: 'Last page' }), 'Back page: tokens'])]),
    ]);

    const art = el('article', { class: 'page' + (isWide(part) ? ' is-wide' : ''), id: part.id, 'aria-labelledby': 'h-' + part.id }, [
      el('div', { class: 'page-head' }, [
        ink2(part.name, 'h3', { id: 'h-' + part.id }),
        el('span', { class: 'folio', text: 'p.' + part.no }),
      ]),
      el('p', { class: 'page-desc', text: part.description }),
      stressBar(part, frame),
      el('div', { class: 'frame' }, frame),
      part.notes ? el('p', { class: 'why-box' }, [el('b', { text: 'Why it works: ' }), part.notes]) : null,
      receipt(part),
      el('p', { class: 'page-meta' }, [
        el('span', { text: sp.kb + ' KB' }),
        el('span', { text: sp.js ? 'Uses JavaScript' : 'No JavaScript' }),
        el('span', { text: '4 formats' }),
      ]),
      btn,
      tear,
      pageNav,
    ]);
    art._part = part;
    art._tear = tear;
    return art;
  }

  /* ───────── Spreads ───────── */
  const spreads = document.getElementById('spreads');
  const pageIndex = (list) =>
    el('ol', { class: 'spread-index', 'aria-label': 'Pages in this collection' },
      list.map((p) => el('li', {}, el('a', { href: '#' + p.id }, [el('span', { text: 'p.' + p.no }), p.name]))));

  cats.filter((c) => c !== 'Experimental').forEach((cat) => {
    const list = inCat(cat);
    const sec = el('section', { class: 'spread', id: secId(cat), 'aria-labelledby': 'sh-' + cat }, [
      el('div', { class: 'spread-head' }, [
        ink2(cat, 'h2', { id: 'sh-' + cat }),
        el('p', { text: list.length === 1 ? '1 page · p.' + list[0].no : list.length + ' pages · p.' + list[0].no + '–' + list[list.length - 1].no }),
      ]),
      list.length > 1 ? pageIndex(list) : null,
      el('div', { class: 'pages' }, list.map(page)),
    ]);
    spreads.append(sec);
  });
  const centerfold = document.getElementById('centerfold-pages');
  centerfold.before(pageIndex(inCat('Experimental')));
  inCat('Experimental').forEach((p) => centerfold.append(page(p)));

  const rerender = () =>
    document.querySelectorAll('.page').forEach((pg) => {
      if (!pg._tear.hidden) renderTear(pg._tear, pg._part);
    });
  document.addEventListener('cui:frameworkchange', rerender);
  document.addEventListener('cui:tokenschange', rerender);

  const withTokens = document.getElementById('with-tokens');
  withTokens.checked = prefs.tokens;
  withTokens.addEventListener('change', () => (prefs.tokens = withTokens.checked));

  /* ───────── Arriving at a page: scroll there and misregister its ink once ───────── */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function flash(target) {
    if (!target) return;
    target.classList.remove('is-arrived');
    void target.offsetWidth;
    target.classList.add('is-arrived');
  }
  function go(id) {
    const target = document.getElementById(id);
    if (!target) return;
    if (location.hash !== '#' + id) history.pushState(null, '', '#' + id);
    land(target);
  }

  // Previews above a target size themselves as they load, which would push the target away.
  // Keep it pinned under the sticky shelf until things settle, unless the reader takes over.
  let pin;
  const stopPin = () => clearInterval(pin);
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, stopPin, { passive: true }));
  function land(target) {
    if (!target) return;
    const padTop = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    stopPin();
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    flash(target);
    let tries = 0;
    pin = setInterval(() => {
      const off = target.getBoundingClientRect().top - padTop();
      if (Math.abs(off) > 4) window.scrollBy({ top: off, behavior: 'instant' });
      if (++tries > 14) stopPin();
    }, 120);
  }

  // Every in-page link (shelf, thumb tabs, page lists, previous/next, cover contents) lands the same way.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    if (location.hash !== a.getAttribute('href')) history.pushState(null, '', a.getAttribute('href'));
    land(target);
  });
  window.addEventListener('popstate', () => land(document.getElementById(location.hash.slice(1))));
  // Pages are built by script, so the browser could not scroll to a shared link's #page on load.
  if (location.hash) requestAnimationFrame(() => land(document.getElementById(location.hash.slice(1))));

  /* ───────── Where am I? Highlight the current collection everywhere ───────── */
  const mastIssue = document.querySelector('.mast-issue');
  const mastDefault = mastIssue.textContent;
  const sections = [...cats.map(secId), 'back-page'].map((id) => document.getElementById(id));
  const labelFor = (id) => {
    if (id === 'back-page') return 'Back page · tokens';
    const cat = cats.find((c) => secId(c) === id);
    const list = inCat(cat);
    return 'Now reading: ' + short(cat) + ' · p.' + list[0].no + (list.length > 1 ? '–' + list[list.length - 1].no : '');
  };
  let currentId = null;
  const setCurrent = (id) => {
    currentId = id;
    document.querySelectorAll('[data-sec]').forEach((a) => {
      if (a.dataset.sec === id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    mastIssue.textContent = id ? labelFor(id) : mastDefault;
    document.body.classList.toggle('is-reading', Boolean(id));
    const active = shelf.querySelector('[aria-current]');
    if (active && shelf.scrollWidth > shelf.clientWidth) shelf.scrollTo({ left: active.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
  };
  if ('IntersectionObserver' in window) {
    const visible = new Set();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
      const current = sections.find((s) => visible.has(s.id));
      setCurrent(current ? current.id : null);
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ───────── The index: jump to any page or collection ───────── */
  const dialog = document.getElementById('jump');
  const input = document.getElementById('jump-input');
  const listbox = document.getElementById('jump-list');
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  document.querySelectorAll('[data-shortcut]').forEach((k) => (k.textContent = isMac ? '⌘ K' : 'Ctrl K'));

  const entries = [];
  cats.forEach((cat) => {
    const list = inCat(cat);
    entries.push({ id: secId(cat), cat, kind: 'collection', label: cat === 'Experimental' ? 'The weird centerfold' : cat, meta: list.length + (list.length === 1 ? ' page' : ' pages') });
    list.forEach((p) => entries.push({ id: p.id, cat, kind: 'page', label: p.name, meta: 'p.' + p.no, text: (p.name + ' ' + p.description + (p.wild ? ' experimental weird wild' : '')).toLowerCase() }));
  });
  entries.push({ id: 'back-page', cat: 'More', kind: 'collection', label: 'Back page: tokens', meta: 'tokens.css', text: 'tokens colours theme css variables' });
  entries.push({ id: 'next-issue', cat: 'More', kind: 'collection', label: 'Next issue: Animation', meta: 'soon', text: 'issue 02 next animation motion coming soon' });
  entries.push({ href: 'fitter.html', cat: 'More', kind: 'collection', label: 'Brand fitter: tokens from one colour', meta: 'tool', text: 'brand fitter colour color tokens theme contrast accent palette wcag dark mode' });
  entries.push({ id: 'agents', cat: 'More', kind: 'collection', label: 'Give it to your agent', meta: 'AI', text: 'ai agent llm llms.txt cli command line npx mcp connector api json' });
  entries.push({ href: 'guide.html', cat: 'More', kind: 'collection', label: 'The guide: dos and don’ts', meta: 'other half', text: 'guide design rules dos donts checklist' });

  let shown = [];
  let active = 0;

  const score = (e, q) => {
    const name = e.label.toLowerCase();
    if (name.startsWith(q)) return 4;
    if (name.split(/[\s:]+/).some((w) => w.startsWith(q))) return 3;
    if (name.includes(q)) return 2;
    if (e.cat.toLowerCase().startsWith(q)) return 1.5;
    if ((e.text || '').includes(q)) return 1;
    return 0;
  };

  function render() {
    const q = input.value.trim().toLowerCase();
    listbox.replaceChildren();
    shown = q
      ? entries.map((e) => [e, score(e, q)]).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).map(([e]) => e)
      : entries;
    let lastCat = null;
    shown.forEach((e, i) => {
      if (!q && e.cat !== lastCat) {
        listbox.append(el('li', { role: 'presentation', class: 'jump-group', text: e.cat === 'Experimental' ? 'Weird' : e.cat }));
        lastCat = e.cat;
      }
      const opt = el('li', { role: 'option', id: 'opt-' + i, class: 'jump-opt is-' + e.kind, 'aria-selected': 'false' }, [
        el('span', { class: 'jump-meta', text: e.meta }),
        el('span', { class: 'jump-label', text: e.label }),
        q ? el('span', { class: 'jump-cat', text: e.cat === 'Experimental' ? 'Weird' : e.cat })
          : e.id && e.id === currentId ? el('span', { class: 'jump-here', text: 'You are here' }) : null,
      ]);
      if (!q && e.id && e.id === currentId) opt.setAttribute('aria-current', 'location');
      opt.addEventListener('click', () => choose(i));
      opt.addEventListener('pointermove', () => setActive(i, false));
      listbox.append(opt);
    });
    if (!shown.length) listbox.append(el('li', { role: 'presentation', class: 'jump-empty', text: 'Nothing called that in this issue. Try “form”, “menu” or “weird”.' }));
    setActive(0, true);
  }
  function setActive(i, scroll) {
    active = Math.max(0, Math.min(shown.length - 1, i));
    listbox.querySelectorAll('[role="option"]').forEach((o) => o.setAttribute('aria-selected', String(o.id === 'opt-' + active)));
    const opt = document.getElementById('opt-' + active);
    if (opt) {
      input.setAttribute('aria-activedescendant', opt.id);
      if (scroll) opt.scrollIntoView({ block: 'nearest' });
    } else input.removeAttribute('aria-activedescendant');
  }
  function choose(i) {
    const e = shown[i];
    if (!e) return;
    dialog.close();
    if (e.href) location.href = e.href;
    else go(e.id);
  }
  function openIndex() {
    if (dialog.open) return;
    input.value = '';
    render();
    dialog.showModal();
    input.focus();
    const here = shown.findIndex((e) => e.id && e.id === currentId);
    if (here > 0) setActive(here, true);
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1, true); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1, true); }
    else if (e.key === 'Home' && !input.value) { e.preventDefault(); setActive(0, true); }
    else if (e.key === 'End' && !input.value) { e.preventDefault(); setActive(shown.length - 1, true); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(active); }
  });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.querySelector('.jump-close').addEventListener('click', () => dialog.close());
  document.querySelectorAll('[data-open-index]').forEach((b) => b.addEventListener('click', openIndex));
  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openIndex(); }
    else if (e.key === '/' && !typing) { e.preventDefault(); openIndex(); }
  });

  /* ───────── Measure the sticky masthead + shelf so jumps land just below them ───────── */
  const band = document.querySelector('.toolbar-band');
  const mast = document.querySelector('.mast');
  const measure = () => {
    const sticky = getComputedStyle(band).position === 'sticky';
    document.documentElement.style.setProperty('--nav-h', mast.offsetHeight + (sticky ? band.offsetHeight : 0) + 'px');
  };
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(measure);
    ro.observe(band);
    ro.observe(mast);
  }
  window.addEventListener('resize', measure);
  measure();

  /* ───────── Halftone screens: dot size carries the tone, at riso screen angles ───────── */
  function screen(canvas, ink, angleDeg, pitch) {
    const box = canvas.getBoundingClientRect();
    if (!box.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(box.width * dpr);
    canvas.height = Math.round(box.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = ink.startsWith('#') ? ink : getComputedStyle(document.documentElement).getPropertyValue(ink).trim();
    const w = box.width;
    const h = box.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2;
    const a = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const n = Math.ceil(Math.hypot(w, h) / pitch / 2) + 1;
    for (let u = -n; u <= n; u++) {
      for (let v = -n; v <= n; v++) {
        const x = cx + (u * cos - v * sin) * pitch;
        const y = cy + (u * sin + v * cos) * pitch;
        const d = Math.hypot(x - cx, y - cy) / radius;
        if (d >= 1) continue;
        const tone = Math.pow(1 - d, 1.35); // dense in the middle, fading to paper
        const r = tone * pitch * 0.62;
        if (r < 0.35) continue;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  const pinkScreen = document.querySelector('.screen-pink');
  const blueScreen = document.querySelector('.screen-blue');
  const foldScreen = document.querySelector('.screen-fold');
  const drawScreens = () => {
    screen(pinkScreen, '--pink', 15, 11);
    screen(blueScreen, '--blue', 75, 9);
    // the centerfold is always printed on pink paper, so its screen is always riso blue
    screen(foldScreen, '#0078bf', 75, 10);
  };
  let screenTimer;
  window.addEventListener('resize', () => {
    clearTimeout(screenTimer);
    screenTimer = setTimeout(drawScreens, 150);
  });
  document.addEventListener('cui:themechange', drawScreens);
  drawScreens();

  /* ───────── Copy buttons in the agents section ───────── */
  document.querySelectorAll('[data-copy]').forEach((btn) =>
    btn.addEventListener('click', () => copyText(document.getElementById(btn.dataset.copy).textContent, btn))
  );

  /* ───────── Back page ───────── */
  document.getElementById('tokens-code').textContent = TOKENS;
  const ct = document.getElementById('copy-tokens');
  ct.addEventListener('click', () => copyText(TOKENS, ct));
})();
