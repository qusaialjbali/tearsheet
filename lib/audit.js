/* Tearsheet audit: checks interface code against the design guide, without running it.
 * Works on HTML, JSX/TSX, Vue and Svelte files (and the CSS inside them). Zero dependencies.
 * It is a fast first pass that catches the common mistakes; it does not replace testing
 * with a keyboard, a screen reader and real content.
 */
'use strict';

const GUIDE = 'https://qusaialjbali.github.io/tearsheet/zine/guide.html#';

/* Every rule names the guide chapter it comes from. */
const RULES = {
  'img-alt': { severity: 'error', chapter: 'accessibility', fix: 'Add alt text that says what the image shows, or alt="" if it is decoration.' },
  'button-name': { severity: 'error', chapter: 'buttons', fix: 'Give the button visible text, or an aria-label when it only shows an icon.' },
  'link-name': { severity: 'error', chapter: 'navigation', fix: 'Give the link text, or an aria-label when it only shows an icon.' },
  'click-on-static': { severity: 'error', chapter: 'buttons', fix: 'Use a <button> (or <a href> for navigation). A clickable div is invisible to keyboards and screen readers.' },
  'input-label': { severity: 'error', chapter: 'forms', fix: 'Connect a <label for> to the field, wrap it in <label>, or add aria-label.' },
  'placeholder-label': { severity: 'warn', chapter: 'forms', fix: 'Placeholders vanish while typing and are often low contrast. Use a real label; keep the placeholder as an example.' },
  'positive-tabindex': { severity: 'error', chapter: 'accessibility', fix: 'Use tabindex="0" or "-1" only. Positive values reorder the whole page for keyboard users.' },
  'outline-none': { severity: 'error', chapter: 'accessibility', fix: 'Keep a visible focus style: replace the outline with a :focus-visible ring, never remove it alone.' },
  'zoom-blocked': { severity: 'error', chapter: 'responsive', fix: 'Remove user-scalable=no and maximum-scale from the viewport meta. People zoom to read.' },
  'html-lang': { severity: 'error', chapter: 'accessibility', fix: 'Add lang="en" (or the page language) to <html> so screen readers pronounce it correctly.' },
  'autoplay-media': { severity: 'warn', chapter: 'motion', fix: 'Do not autoplay with sound. If it must autoplay, make it muted, give it controls and a way to pause.' },
  'reduced-motion': { severity: 'warn', chapter: 'motion', fix: 'Wrap movement in @media (prefers-reduced-motion: no-preference), or turn it off under prefers-reduced-motion: reduce.' },
  'heading-skip': { severity: 'warn', chapter: 'typography', fix: 'Do not skip heading levels (h2 straight to h4). Headings are how screen-reader users skim.' },
  'vague-link': { severity: 'warn', chapter: 'content', fix: 'Say where the link goes ("Read the pricing guide"), not "click here" or "read more".' },
  'tiny-text': { severity: 'warn', chapter: 'typography', fix: 'Keep body text at 14px or more, and nothing under 12px.' },
  'blank-target': { severity: 'warn', chapter: 'navigation', fix: 'Add rel="noopener", and tell people the link opens a new tab.' },
};

const lineAt = (text, index) => text.slice(0, index).split('\n').length;
const strip = (html) => html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, 'x').trim();
const hasExpression = (s) => /\{[^}]*\}|\{\{/.test(s);

function attrs(tag) {
  const out = {};
  const re = /([:@a-zA-Z_][\w:.@-]*)(?:\s*=\s*("[^"]*"|'[^']*'|\{[^}]*\}|[^\s>]+))?/g;
  let m;
  const body = tag.replace(/^<\s*[\w.-]+/, '').replace(/\/?>$/, '');
  while ((m = re.exec(body))) out[m[1].toLowerCase()] = m[2] === undefined ? true : m[2].replace(/^["'{]|["'}]$/g, '');
  return out;
}

/* All opening tags with their name, attributes and position. */
function tags(code) {
  const out = [];
  const re = /<([a-zA-Z][\w.-]*)\b(?:[^>"'{]|"[^"]*"|'[^']*'|\{[^}]*\})*\/?>/g;
  let m;
  while ((m = re.exec(code))) out.push({ name: m[1], lower: m[1].toLowerCase(), raw: m[0], index: m.index, attrs: attrs(m[0]) });
  return out;
}

function auditMarkup(code, report) {
  const all = tags(code);
  const has = (t, ...names) => names.some((n) => t.attrs[n] !== undefined);
  const named = (t) => has(t, 'aria-label', 'aria-labelledby', 'title', ':aria-label', 'v-bind:aria-label');

  // label regions and label targets
  const labelFor = new Set();
  all.filter((t) => t.lower === 'label').forEach((t) => { const id = t.attrs.for || t.attrs.htmlfor; if (id) labelFor.add(id); });
  const labelSpans = [];
  const lre = /<label\b[\s\S]*?<\/label>/gi;
  let lm;
  while ((lm = lre.exec(code))) labelSpans.push([lm.index, lm.index + lm[0].length]);
  const insideLabel = (i) => labelSpans.some(([a, b]) => i > a && i < b);

  for (const t of all) {
    const line = lineAt(code, t.index);
    const a = t.attrs;
    if (t.lower === 'img' && a.alt === undefined && !has(t, ':alt', 'aria-hidden') && a.role !== 'presentation') report('img-alt', line, '<img> has no alt attribute.');
    if (['input', 'select', 'textarea'].includes(t.lower)) {
      const type = String(a.type || '').toLowerCase();
      if (!['hidden', 'submit', 'button', 'reset', 'image'].includes(type)) {
        const labelled = named(t) || (a.id && labelFor.has(a.id)) || insideLabel(t.index) || has(t, 'aria-hidden');
        if (!labelled) report(a.placeholder ? 'placeholder-label' : 'input-label', line,
          a.placeholder ? 'The field relies on its placeholder ("' + a.placeholder + '") as its only label.' : '<' + t.lower + '> has no label.');
      }
    }
    const tab = Number(a.tabindex);
    if (a.tabindex !== undefined && tab > 0) report('positive-tabindex', line, 'tabindex="' + a.tabindex + '" changes the tab order.');
    if (['div', 'span', 'li', 'td', 'p', 'img', 'section', 'article'].includes(t.lower)) {
      const clicky = has(t, 'onclick', '@click', 'v-on:click', 'on:click');
      if (clicky && !(a.role && a.tabindex !== undefined)) report('click-on-static', line, '<' + t.lower + '> handles clicks but is not a button or link.');
    }
    if (t.lower === 'meta' && a.name === 'viewport' && /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/.test(String(a.content))) report('zoom-blocked', line, 'The viewport meta stops people from zooming.');
    if (t.lower === 'html' && a.lang === undefined) report('html-lang', line, '<html> has no lang attribute.');
    if ((t.lower === 'video' || t.lower === 'audio') && has(t, 'autoplay') && !(has(t, 'muted') && has(t, 'controls'))) report('autoplay-media', line, '<' + t.lower + '> autoplays without both muted and controls.');
    if (t.lower === 'a' && a.target === '_blank' && !/noopener|noreferrer/.test(String(a.rel || ''))) report('blank-target', line, 'Link opens a new tab without rel="noopener".');
  }

  // buttons and links: accessible name from content
  const pairs = [['button', 'button-name'], ['a', 'link-name']];
  for (const [tag, rule] of pairs) {
    const re = new RegExp('<' + tag + '\\b((?:[^>"\'{]|"[^"]*"|\'[^\']*\'|\\{[^}]*\\})*)>([\\s\\S]*?)<\\/' + tag + '>', 'g');
    let m;
    while ((m = re.exec(code))) {
      const a = attrs('<' + tag + m[1] + '>');
      if (a['aria-label'] || a['aria-labelledby'] || a.title || a[':aria-label'] || a['aria-hidden'] === 'true') continue;
      const inner = m[2];
      const text = strip(inner.replace(/<svg[\s\S]*?<\/svg>/gi, ' '));
      const altText = /<img\b[^>]*\balt\s*=\s*["'][^"']+["']/i.test(inner);
      if (!text && !altText && !hasExpression(inner) && !/<slot\b|\{children\}|<[A-Z]/.test(inner)) report(rule, lineAt(code, m.index), '<' + tag + '> has no text or label' + (/<svg/i.test(inner) ? ' (icon only).' : '.'));
      if (tag === 'a' && /^(click here|here|read more|more|learn more|link)$/i.test(text)) report('vague-link', lineAt(code, m.index), 'Link text "' + text + '" does not say where it goes.');
    }
  }

  // heading order
  let last = 0;
  const hre = /<h([1-6])\b/gi;
  let hm;
  while ((hm = hre.exec(code))) {
    const level = Number(hm[1]);
    if (last && level > last + 1) report('heading-skip', lineAt(code, hm.index), 'h' + last + ' is followed by h' + level + '.');
    last = level;
  }
}

function auditCss(css, offsetLine, report, context) {
  const at = (i) => offsetLine + lineAt(css, i) - 1;
  const re = /outline\s*:\s*(none|0)\b/g;
  let m;
  const hasFocusStyle = /:focus-visible/.test(css) || /:focus\b[^{]*\{[^}]*(box-shadow|border|outline\s*:\s*(?!none\b|0\b)\S)/.test(css);
  while ((m = re.exec(css))) if (!hasFocusStyle) report('outline-none', at(m.index), 'outline is removed and no focus style replaces it.');
  // Keyframe animation, or a transition that moves things for 300ms or more. Short hover feedback is fine.
  const longMove = (css.match(/transition\s*:[^;}]*/g) || []).some((t) => /transform|translate|scale|rotate|\bleft\b|\btop\b|\ball\b/.test(t) && (t.match(/(\d*\.?\d+)(m?s)\b/g) || []).some((d) => (d.endsWith('ms') ? parseFloat(d) : parseFloat(d) * 1000) >= 300));
  const moves = /@keyframes|animation\s*:|animation-name\s*:/.test(css) || longMove;
  if (moves && !/prefers-reduced-motion/.test(css + (context || ''))) report('reduced-motion', at(css.search(/@keyframes|animation|transition/)), 'There is movement here but no prefers-reduced-motion rule.');
  const fre = /font-size\s*:\s*(\d+(?:\.\d+)?)px/g;
  while ((m = fre.exec(css))) if (Number(m[1]) < 12) report('tiny-text', at(m.index), 'font-size: ' + m[1] + 'px is too small to read comfortably.');
}

/* Audits one file's text. Returns findings: { rule, severity, line, message, fix, guide }.
   context: text of sibling files (a component's script.js next to its CSS), used only to see
   whether motion is already handled for prefers-reduced-motion somewhere. */
function auditCode(code, filename, context) {
  const name = String(filename || 'snippet.html');
  const findings = [];
  const seen = new Set();
  const report = (rule, line, message) => {
    const key = rule + ':' + line + ':' + message;
    if (seen.has(key)) return;
    seen.add(key);
    const r = RULES[rule];
    findings.push({ rule, severity: r.severity, line, message, fix: r.fix, guide: GUIDE + r.chapter });
  };
  const ext = (name.split('.').pop() || 'html').toLowerCase();
  if (ext === 'css' || ext === 'scss') auditCss(code, 1, report, context);
  else {
    const markup = ext === 'vue' ? (code.match(/<template>([\s\S]*)<\/template>/) || [, code])[1] : code;
    const offset = ext === 'vue' ? lineAt(code, code.indexOf(markup)) - 1 : 0;
    auditMarkup(markup.replace(/<style\b[\s\S]*?<\/style>|<script\b[\s\S]*?<\/script>/gi, (s) => s.replace(/[^\n]/g, ' ')), (r, l, msg) => report(r, l + offset, msg));
    const sre = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = sre.exec(code))) auditCss(m[1], lineAt(code, m.index), report, code + (context || ''));
  }
  return findings.sort((a, b) => a.line - b.line);
}

module.exports = { auditCode, RULES, GUIDE };
