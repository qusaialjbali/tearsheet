/* Builds zine/guide.html from the shared guide content.
 * Run: node build-guides.js
 */
const fs = require('fs');
const meta = require('./tools/meta');
const path = require('path');

const toc = fs.readFileSync(path.join(__dirname, 'shared/guide-toc.html'), 'utf8');
const body = fs.readFileSync(path.join(__dirname, 'shared/guide-body.html'), 'utf8');

const head = (title, css, font) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="A practical guide to web design: layout, typography, colour, forms, accessibility, motion, performance and copy, with clear dos and don'ts and a pre-launch checklist.">
${meta({ path: 'zine/guide.html', title: 'The guide: web design dos and don’ts | Tearsheet', description: 'A practical guide to web design: layout, typography, colour, forms, accessibility, motion, performance and copy, with clear dos and don’ts and a pre-launch checklist.' })}
  <script>document.documentElement.dataset.theme = localStorage.getItem('cui-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');</script>
  <link rel="preload" href="../shared/fonts/${font}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${css}?v=16">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
`;

const worlds = {
  zine: {
    file: 'zine/guide.html',
    html:
      head('The guide — dos and don’ts | Tearsheet Issue 01', 'zine.css', 'bricolage-grotesque-latin-wght-normal.woff2') +
      `
  <header class="mast">
    <div class="wrap mast-inner">
      <a class="mast-title" href="index.html">Tear<span>sheet</span></a>
      <nav aria-label="Main">
        <a href="index.html#parts">Parts</a>
        <a href="guide.html" aria-current="page">Guide</a>
        <a href="index.html#back-page">Tokens</a>
        <a class="nav-fitter" href="fitter.html">Fitter</a>
        <a class="nav-agents" href="index.html#agents">For agents</a>
      </nav>
      <span class="mast-issue">Issue 01 · the back half</span>
      <a class="chip-in" href="#" data-donate aria-label="Chip in: buy me a coffee (optional)"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8h10v4.5A3.5 3.5 0 0 1 10.5 16h-3A3.5 3.5 0 0 1 4 12.5ZM14 9h1.5a2 2 0 0 1 0 4H14M7 3.5c0 1 1 1 1 2M10 3.5c0 1 1 1 1 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Chip in</span></a>
      <button class="stock-btn" type="button" data-theme-toggle aria-label="Print on black stock">
        <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 3a7 7 0 0 0 0 14z" fill="currentColor"/></svg>
        <span>Black stock</span>
      </button>
    </div>
  </header>

  <main id="main">
    <div class="wrap guide-cover">
      <h1 aria-label="Do this, not that"><span class="ink2" aria-hidden="true"><span class="a">Do this,</span><span class="b">Do this,</span></span><br><span class="ink2" aria-hidden="true"><span class="a">not that.</span><span class="b">not that.</span></span></h1>
      <p>The back half of the issue: thirteen short chapters on designing for the web, every rule printed as a do, a don’t and a why. Tear out the checklist at the end before you launch.</p>
    </div>
    <div class="wrap manual">
      ${toc}
      ${body}
    </div>
  </main>

  <footer class="colophon">
    <div class="wrap colophon-inner">
      <p>Tearsheet, Issue 01. Free to read, share and adapt.</p>
      <nav aria-label="Footer">
        <a href="index.html">The parts</a>
      </nav>
    </div>
  </footer>
  <script src="../shared/guide.js?v=2"></script>
  <script src="../shared/site-config.js?v=2"></script>
</body>
</html>
`,
  },
};

for (const w of Object.values(worlds)) {
  fs.writeFileSync(path.join(__dirname, w.file), w.html);
  console.log('wrote', w.file);
}
