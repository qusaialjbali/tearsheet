/* Builds the machine-readable side of the site for AI agents and tools:
 *   llms.txt                         – a map of the library for language models
 *   api/components.json              – every component, with ids and descriptions
 *   api/components/<id>.json         – one component's code in all four formats
 *   api/components/<id>.md           – the same, as Markdown with code blocks
 *   api/tokens.css, api/guide.json   – the design tokens and the design rules
 * Run: node build-api.js   (no dependencies)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const cat = require('./lib/catalog');

const OUT = path.join(__dirname, 'api');
const LANG = { html: 'html', css: 'css', js: 'js', jsx: 'jsx', vue: 'vue', svelte: 'svelte' };
const langOf = (file) => LANG[file.split('.').pop()] || '';

// api/receipts.json is written by the accessibility run (npm run check:a11y), so keep it
const RECEIPTS = path.join(OUT, 'receipts.json');
const keptReceipts = fs.existsSync(RECEIPTS) ? fs.readFileSync(RECEIPTS) : null;
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'components'), { recursive: true });
if (keptReceipts) fs.writeFileSync(RECEIPTS, keptReceipts);

const all = cat.components();
const meta = {
  name: 'Tearsheet',
  description: 'Free, accessible UI components in HTML + CSS, React, Vue and Svelte, with notes on why they work, plus a web design guide.',
  license: 'MIT-0 (no attribution required)',
  site: cat.SITE + '/',
  formats: cat.FORMATS,
  tokens: cat.SITE + '/api/tokens.css',
  guide: cat.SITE + '/api/guide.json',
  usage: 'Every component reads its colours, radii and focus ring from tokens.css (CSS custom properties). Include tokens.css once, globally, then add component files.',
};

/* index */
fs.writeFileSync(
  path.join(OUT, 'components.json'),
  JSON.stringify(Object.assign({}, meta, {
    count: all.length,
    collections: cat.collections(),
    components: all.map(cat.summary),
  }), null, 2)
);

/* one file per component */
for (const c of all) {
  const formats = {};
  cat.FORMATS.forEach((f) => (formats[f] = cat.files(c, f, false).map(({ name, code }) => ({ name, code }))));
  fs.writeFileSync(
    path.join(OUT, 'components', c.id + '.json'),
    JSON.stringify(Object.assign(cat.summary(c), { requires: 'tokens.css (see tokens URL)', tokens: meta.tokens, receipt: cat.receipt(c.id) || undefined, files: formats }), null, 2)
  );

  const md = [
    '# ' + c.name + ' (Tearsheet, ' + c.collection + ')',
    '',
    c.description,
    '',
    c.notes ? '**Why it works:** ' + c.notes + '\n' : '',
    cat.receiptLine(c.id) ? '**Checked:** ' + cat.receiptLine(c.id) + '.\n' : '',
    'Requires the shared design tokens once per project: ' + meta.tokens,
    '',
  ];
  cat.FORMATS.forEach((f) => {
    md.push('## ' + { html: 'HTML + CSS', react: 'React', vue: 'Vue', svelte: 'Svelte' }[f], '');
    formats[f].forEach((file) => md.push('`' + file.name + '`', '', '```' + langOf(file.name), file.code, '```', ''));
  });
  fs.writeFileSync(path.join(OUT, 'components', c.id + '.md'), md.join('\n'));
}

/* tokens and guide */
fs.writeFileSync(path.join(OUT, 'tokens.css'), cat.tokens() + '\n');
fs.writeFileSync(path.join(OUT, 'guide.json'), JSON.stringify({ name: 'Tearsheet design guide', chapters: cat.guide() }, null, 2));

/* llms.txt */
const lines = [
  '# Tearsheet',
  '',
  '> ' + meta.description + ' ' + all.length + ' components, free forever, licensed MIT-0 (no attribution). No install and no dependencies: copy the files into a project.',
  '',
  'How to use this library as an agent:',
  '',
  '1. Find a component in the list below (or fetch ' + cat.SITE + '/api/components.json).',
  '2. Fetch ' + cat.SITE + '/api/components/<id>.md (or .json) and use the files for the project\'s framework: html, react, vue or svelte.',
  '3. Make sure ' + meta.tokens + ' is included once, globally. Components read colours, radii and focus styles from it; change --ui-accent and friends to match the project\'s brand.',
  '4. Keep the accessibility details the component ships with (labels, ARIA, keyboard handling, reduced motion). The notes explain each one.',
  '',
  '## Tools',
  '',
  '- [Command-line tool](' + cat.SITE + '/zine/index.html#agents): `npx -y ' + cat.REPO + ' add <id> --format react` writes a component into the current project. Also `list`, `search`, `show`, `tokens` (`--accent <hex>` fits them to a brand colour with contrast checks), `guide`, `audit <path>` (checks UI code against the design guide) and `diff` (compares copied parts with the latest versions).',
  '- [MCP server](' + cat.SITE + '/zine/index.html#agents): run `npx -y ' + cat.REPO + ' mcp` as a stdio MCP server to get search_components, get_component, get_design_tokens (optionally fitted to a brand colour), get_design_rules and review_ui (checks the UI code you write against the guide).',
  '- [Receipts (JSON)](' + cat.SITE + '/api/receipts.json): per component evidence from CI: axe results in light and dark, tightest contrast, tab order, accessibility tree, reduced-motion behaviour, and whether it fits a phone right-to-left with Arabic text and with 40% longer text.',
  '- [Brand fitter](' + cat.SITE + '/zine/fitter.html): one brand colour in, contrast-safe light and dark tokens out.',
  '',
  '## Reference',
  '',
  '- [Component index (JSON)](' + cat.SITE + '/api/components.json): every component with id, collection, description and notes',
  '- [Design tokens (CSS)](' + meta.tokens + '): the CSS custom properties every component uses, light and dark',
  '- [Design guide (JSON)](' + meta.guide + '): web design dos and don\'ts by chapter, plus a pre-launch checklist',
  '- [Design guide (page)](' + cat.SITE + '/zine/guide.html): the same guide for people',
  '',
];
cat.collections().forEach((label) => {
  lines.push('## Components: ' + label, '');
  all.filter((c) => c.collection === label).forEach((c) => {
    lines.push('- [' + c.name + '](' + cat.SITE + '/api/components/' + c.id + '.md): `' + c.id + '`. ' + c.description);
  });
  lines.push('');
});
fs.writeFileSync(path.join(__dirname, 'llms.txt'), lines.join('\n'));

const count = fs.readdirSync(path.join(OUT, 'components')).length;
console.log('wrote llms.txt, api/components.json, api/tokens.css, api/guide.json and ' + count + ' component files');
