/* Builds one static page per component (zine/parts/<id>.html), an index of them and
 * sitemap.xml (submit it in Google Search Console; a project site cannot have its own
 * robots.txt). The zine itself is drawn by JavaScript; these pages give
 * search engines and link previews real text, code and a live preview for every part.
 * Run: node build-pages.js   (part of npm run build)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const cat = require('./lib/catalog');
const gen = require('./shared/codegen');
const meta = require('./tools/meta');

const { SITE, esc } = meta;
const OUT = path.join(__dirname, 'zine', 'parts');
const LABEL = { html: 'HTML + CSS', react: 'React', vue: 'Vue', svelte: 'Svelte' };
const issueNo = (c) => String(c.issue || 1).padStart(2, '0');
const all = cat.components();

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const head = (title, description, file, extra) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
${meta({ path: 'zine/parts/' + file, title, description, up: '../../' })}
  <script>document.documentElement.dataset.theme = localStorage.getItem('cui-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');</script>
  <link rel="stylesheet" href="../part.css?v=5">
${extra || ''}</head>
<body>
  <header class="top">
    <a class="brand" href="../index.html">Tear<span>sheet</span></a>
    <nav aria-label="Main"><a href="index.html">Every part</a><a href="../guide.html">Guide</a></nav>
  </header>
`;

const foot = `  <footer class="foot"><p>Tearsheet. Free to take, change and ship with no attribution (MIT-0).</p></footer>
</body>
</html>
`;

const SCRIPT = `  <script src="../../shared/stress.js?v=1"></script>
  <script>
    /* Stress toggles: reload the preview, then rewrite it right-to-left in Arabic, or longer. */
    const original = document.querySelector('.preview iframe').getAttribute('srcdoc');
    document.querySelectorAll('.stress-btn').forEach((b, _, all) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      all.forEach((x) => x.setAttribute('aria-pressed', String(x === b && on)));
      const f = document.querySelector('.preview iframe');
      f.addEventListener('load', () => {
        if (on) window.TearsheetStress[b.dataset.fn](f.contentDocument);
        document.querySelector('.stress-status').textContent = on ? (b.dataset.fn === 'arabic' ? 'Right-to-left with Arabic sample words (not a translation): the layout should mirror and nothing should spill out.' : 'A pretend translation: every string about 40% longer, with accents, as German or Finnish often are. Buttons and labels should wrap or grow, never clip or overflow.') : 'Back to normal.';
      }, { once: true });
      f.srcdoc = original + '<!--n' + Date.now() + '-->';
    }));
    /* Preview follows the site's light/dark choice; code blocks get copy buttons. */
    const frame = document.querySelector('.preview iframe');
    const fit = () => {
      const d = frame.contentDocument;
      if (!d) return;
      d.documentElement.dataset.theme = document.documentElement.dataset.theme;
      frame.style.height = Math.max(Number(frame.dataset.min || 0), d.documentElement.scrollHeight) + 'px';
    };
    frame.addEventListener('load', () => { fit(); new ResizeObserver(fit).observe(frame.contentDocument.body); });
    document.querySelectorAll('.file').forEach((f) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'copy';
      b.textContent = 'Copy';
      b.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(f.querySelector('code').textContent); b.textContent = 'Copied'; }
        catch { b.textContent = 'Select and copy'; }
        setTimeout(() => (b.textContent = 'Copy'), 1600);
      });
      f.querySelector('.file-head').append(b);
    });
  </script>
`;

/* The receipt: evidence from the accessibility run, as a till slip under the notes. */
function receiptHtml(c) {
  const r = cat.receipt(c.id);
  if (!r) return '';
  const clean = !r.axe.light.violations && !r.axe.dark.violations;
  const line = (ok, text) => '<li><b class="' + (ok ? 'r-ok">PASS' : 'r-no">NOTE') + '</b> ' + esc(text) + '</li>';
  const motion = !r.motion.moves ? 'No motion.'
    : r.motion.loopingUnderReducedMotion ? r.motion.loopingUnderReducedMotion + ' looping animation keeps running with reduced motion on (slowed or essential, like a loading bar).'
    : r.motion.handled ? 'Movement stops or calms down with reduced motion on.' : 'Only short hover and focus transitions (under 300ms).';
  return `    <details class="receipt">
      <summary>Receipt: axe ${clean ? 'clean' : 'issues'} · contrast ${r.contrast ? r.contrast.ratio + ':1' : 'n/a'} · ${r.keyboard.length} tab stop${r.keyboard.length === 1 ? '' : 's'} · RTL ${r.rtl.overflows ? '✗' : '✓'} · long text ${r.long.overflows ? '✗' : '✓'}</summary>
      <ul class="r-lines">
        ${line(clean, 'axe, WCAG 2.1 A and AA: no violations in light or dark (' + r.axe.light.rulesPassed + ' rules passed).')}
        ${r.contrast ? line(true, 'Tightest text contrast ' + r.contrast.ratio + ':1, where ' + r.contrast.need + ':1 is needed (' + r.contrast.theme + ').') : line(true, 'No text to measure for contrast.')}
        ${line(r.brand, r.brand ? 'Still passes contrast with tokens fitted to a yellow brand colour.' : 'Contrast slips with a fitted yellow brand.')}
        ${line(!r.rtl.overflows, 'Right-to-left with Arabic sample text fits a 390px phone.')}
        ${line(!r.long.overflows, 'Every string 40% longer still fits a 390px phone.')}
        ${line(true, motion)}
      </ul>
      <p class="r-head">${r.keyboard.length ? 'Tab order' : 'Tab order: nothing here takes focus (it is content, not controls).'}</p>
      ${r.keyboard.length ? '<ol class="r-keys">' + r.keyboard.map((k) => '<li>' + esc(k) + '</li>').join('') + '</ol>' : ''}
      <p class="r-head">What assistive tech is given</p>
      <pre class="r-tree" tabindex="0" aria-label="Accessibility tree">${esc(r.tree || '(empty)')}</pre>
      <p class="r-foot">Automated checks in CI (axe in Chromium, reduced motion on). They catch a lot, not everything: still try it with a screen reader.</p>
    </details>
`;
}

all.forEach((c, i) => {
  const sameIssue = all.filter((x) => (x.issue || 1) === (c.issue || 1));
  const k = sameIssue.indexOf(c);
  const prev = sameIssue[k - 1];
  const next = sameIssue[k + 1];
  const title = c.name + ' · ' + c.collection + ' component in HTML, React, Vue and Svelte | Tearsheet';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: c.name,
    description: c.description,
    codeRepository: 'https://github.com/qusaialjbali/tearsheet',
    license: 'https://spdx.org/licenses/MIT-0.html',
    programmingLanguage: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Svelte'],
    url: SITE + '/zine/parts/' + c.id + '.html',
  };
  const formats = cat.FORMATS.map((f, n) => {
    const files = cat.files(c, f, false).map((file) =>
      `      <div class="file"><div class="file-head"><span>${esc(file.name)}</span></div><pre tabindex="0"><code>${esc(file.code)}</code></pre></div>`
    ).join('\n');
    return `    <details class="format"${n === 0 ? ' open' : ''}>
      <summary><h2>${LABEL[f]}</h2></summary>
${files}
    </details>`;
  }).join('\n');

  const html =
    head(title, c.description, c.id + '.html', '  <script type="application/ld+json">' + JSON.stringify(ld) + '</script>\n') +
    `  <main class="part">
    <p class="crumbs"><a href="${esc(c.page)}">Issue ${issueNo(c)}</a> · ${esc(c.collection)} · p.${c.no}</p>
    <h1><span class="a">${esc(c.name)}</span><span class="b" aria-hidden="true">${esc(c.name)}</span></h1>
    <p class="lede">${esc(c.description)}</p>
    ${c.notes ? `<p class="why"><b>Why it works:</b> ${esc(c.notes)}</p>` : ''}
    <div class="stress" role="group" aria-label="Test this part under stress"><span class="stress-label">Try it:</span><button type="button" class="stress-btn" data-fn="arabic" aria-pressed="false">RTL + Arabic</button><button type="button" class="stress-btn" data-fn="longText" aria-pressed="false">Long text</button><span class="stress-status" role="status"></span></div>
    <div class="preview"><iframe title="${esc(c.name)} preview" data-min="${c.minHeight || 0}" srcdoc="${esc(gen.previewDoc(c, cat.tokens(), { theme: 'light' }))}"></iframe></div>
${receiptHtml(c)}    <p class="actions"><a href="${esc(c.page)}">See it in the zine</a> <code>npx -y ${cat.REPO} add ${c.id}</code></p>
    <p class="needs">Needs the shared <a href="../../api/tokens.css">tokens.css</a> once per project.</p>
${formats}
    <nav class="pager" aria-label="More parts">
      ${prev ? `<a rel="prev" href="${prev.id}.html">← ${esc(prev.name)}</a>` : '<span></span>'}
      ${next ? `<a rel="next" href="${next.id}.html">${esc(next.name)} →</a>` : '<span></span>'}
    </nav>
  </main>
` + SCRIPT + foot;
  fs.writeFileSync(path.join(OUT, c.id + '.html'), html);
});

/* index of every part */
const groups = cat.issues ? cat.issues() : [{ no: 1, title: 'Interface parts' }];
const list = groups.map((g) => {
  const items = all.filter((c) => (c.issue || 1) === g.no);
  const cols = [...new Set(items.map((c) => c.collection))];
  return `    <section>
      <h2>Issue ${String(g.no).padStart(2, '0')}: ${esc(g.title)}</h2>
${cols.map((col) => `      <h3>${esc(col)}</h3>
      <ul>
${items.filter((c) => c.collection === col).map((c) => `        <li><a href="${c.id}.html">${esc(c.name)}</a> <span>${esc(c.description)}</span></li>`).join('\n')}
      </ul>`).join('\n')}
    </section>`;
}).join('\n');
fs.writeFileSync(path.join(OUT, 'index.html'),
  head('Every Tearsheet component, one page each', 'All ' + all.length + ' free Tearsheet components, each with a live preview and code in HTML, React, Vue and Svelte.', 'index.html') +
  `  <main class="part every">
    <h1><span class="a">Every part</span><span class="b" aria-hidden="true">Every part</span></h1>
    <p class="lede">All ${all.length} components, one page each, with a live preview and the code in four formats. Free to take, change and ship.</p>
${list}
  </main>
` + foot);

/* 404.html: GitHub Pages serves it for any missing address under the site, at any depth,
   so every link in it is absolute. It knows every part, so a mistyped part link gets a
   "did you mean". */
const BASE = '/tearsheet/';
const known = all.map((c) => [c.id, c.name]);
const notFound = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page torn out | Tearsheet</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="${BASE}favicon.svg" type="image/svg+xml">
  <link rel="author" href="${BASE}humans.txt" type="text/plain">
  <script>document.documentElement.dataset.theme = localStorage.getItem('cui-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');</script>
  <link rel="stylesheet" href="${BASE}zine/part.css?v=5">
  <style>
    .lost { display: grid; gap: 14px; justify-items: start; }
    .lost-code { position: relative; margin: 8px 0 0; font-size: clamp(120px, 30vw, 260px); font-weight: 800; line-height: 0.8; letter-spacing: -0.06em; }
    .lost-code .a { position: relative; z-index: 1; color: var(--ink); mix-blend-mode: multiply; }
    .lost-code .b { position: absolute; left: 0; top: 0; color: var(--pink); transform: translate(0.05em, 0.04em) rotate(-3deg); }
    [data-theme="dark"] .lost-code .a { mix-blend-mode: normal; }
    .lost-tear { width: 100%; height: 14px; margin: 6px 0; background: linear-gradient(-45deg, var(--stock) 7px, transparent 0) 0 0 / 14px 14px, linear-gradient(45deg, var(--stock) 7px, var(--rule) 0) 0 0 / 14px 14px; }
    .lost h1 { margin: 0; font-size: clamp(30px, 6vw, 48px); letter-spacing: -0.03em; }
    .lost-guess:empty { display: none; }
    .lost-guess { margin: 0; padding: 10px 14px; font-size: 18px; font-weight: 700; background: var(--sheet); border: 2px dashed var(--rule); }
    .lost-links { display: flex; flex-wrap: wrap; gap: 10px; margin: 6px 0 0; padding: 0; list-style: none; }
    .lost-links a { display: inline-flex; min-height: 44px; align-items: center; padding: 0 18px; font-weight: 800; text-decoration: none; border: 2px solid var(--rule); border-radius: 999px; }
    .lost-links li:first-child a { color: #1b1b20; background: var(--pink); border-color: var(--pink); }
  </style>
</head>
<body>
  <header class="top">
    <a class="brand" href="${BASE}zine/index.html">Tear<span>sheet</span></a>
    <nav aria-label="Main"><a href="${BASE}zine/parts/index.html">Every part</a><a href="${BASE}zine/guide.html">Guide</a><a href="${BASE}zine/fitter.html">Fitter</a></nav>
  </header>
  <main class="part lost">
    <p class="lost-code" aria-hidden="true"><span class="a">404</span><span class="b">404</span></p>
    <div class="lost-tear" aria-hidden="true"></div>
    <h1>This page was torn out.</h1>
    <p class="lede">Whatever was here is not in the zine any more, or the link has a typo. Everything is still free; it just lives somewhere else.</p>
    <p class="lost-guess" id="guess" role="status"></p>
    <ul class="lost-links">
      <li><a href="${BASE}zine/index.html">Open the zine</a></li>
      <li><a href="${BASE}zine/parts/index.html">Every part, one page each</a></li>
      <li><a href="${BASE}zine/guide.html">The guide</a></li>
      <li><a href="${BASE}zine/fitter.html">Brand fitter</a></li>
    </ul>
  </main>
  <footer class="foot"><p>Tearsheet. Free to take, change and ship with no attribution (MIT-0).</p></footer>
  <script>
    /* A mistyped or old part link: suggest the closest part by name. */
    (function () {
      var parts = ${JSON.stringify(known)};
      var word = decodeURIComponent(location.pathname.split('/').filter(Boolean).pop() || '').replace(/\.html?$/, '').replace(/^#/, '').toLowerCase();
      if (!word || word === 'tearsheet') return;
      var dist = function (a, b) {
        var row = []; for (var j = 0; j <= b.length; j++) row[j] = j;
        for (var i = 1; i <= a.length; i++) { var prev = row[0]; row[0] = i;
          for (var k = 1; k <= b.length; k++) { var t = row[k]; row[k] = Math.min(row[k] + 1, row[k - 1] + 1, prev + (a[i - 1] === b[k - 1] ? 0 : 1)); prev = t; } }
        return row[b.length];
      };
      var best = null;
      parts.forEach(function (p) {
        var d = p[0].indexOf(word) >= 0 || word.indexOf(p[0]) >= 0 ? 0 : dist(word, p[0]);
        if (!best || d < best.d) best = { d: d, p: p };
      });
      if (!best || best.d > Math.max(2, Math.floor(word.length / 3))) return;
      var guess = document.getElementById('guess');
      guess.append('Were you looking for ');
      var a = document.createElement('a');
      a.href = '${BASE}zine/parts/' + best.p[0] + '.html';
      a.textContent = best.p[1];
      guess.append(a, '?');
    })();
  </script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, '404.html'), notFound);

/* sitemap */
const pages = ['zine/index.html', ...(cat.issues ? cat.issues().filter((i) => i.no > 1).map((i) => i.url.replace(SITE + '/', '')) : []), 'zine/guide.html', 'zine/fitter.html', 'zine/parts/index.html', ...all.map((c) => 'zine/parts/' + c.id + '.html')];
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((p) => '  <url><loc>' + SITE + '/' + p + '</loc></url>').join('\n') + '\n</urlset>\n');

console.log('wrote ' + all.length + ' part pages, zine/parts/index.html, 404.html and sitemap.xml');
