/* Tearsheet catalogue for Node: loads every component, the design tokens and the design
 * guide straight from the website's own source files, so the API, the command-line tool
 * and the MCP server can never drift from what the site shows.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const gen = require('../shared/codegen.js');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://qusaialjbali.github.io/tearsheet';
const REPO = 'tearsheet'; // the npm package (the GitHub repo is qusaialjbali/tearsheet)
const COMPONENT_FILES = [
  'components.js',
  'components-basics.js',
  'components-wild.js',
  'components-everyday.js',
  'components-data.js',
  'components-sections.js',
  'components-wild-2.js',
];

let cache;

function load() {
  if (cache) return cache;
  const sandbox = { window: { COMPONENTS: [] } };
  vm.createContext(sandbox);
  for (const file of COMPONENT_FILES) {
    const code = fs.readFileSync(path.join(ROOT, 'shared', file), 'utf8');
    vm.runInContext(code, sandbox, { filename: file });
  }
  const list = gen.ordered(sandbox.window.COMPONENTS).map((c) => Object.assign(c, {
    collection: gen.collectionLabel(c.category),
    specs: gen.specs(c),
    page: SITE + '/zine/index.html#' + c.id,
  }));
  cache = { components: list, tokens: sandbox.window.TOKENS_CSS.trim() };
  return cache;
}

const components = () => load().components;
const tokens = () => load().tokens;
const collections = () => gen.categories(components()).map((c) => gen.collectionLabel(c));

/* Find a component by exact id, then by name, then by a unique partial match. */
function get(query) {
  const q = String(query || '').trim().toLowerCase();
  const all = components();
  return (
    all.find((c) => c.id === q) ||
    all.find((c) => c.name.toLowerCase() === q) ||
    (() => {
      const hits = all.filter((c) => c.id.includes(q) || c.name.toLowerCase().includes(q));
      return hits.length === 1 ? hits[0] : null;
    })()
  );
}

/* Rank components for a free-text query (name first, then collection, then descriptions). */
function search(query, limit) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return components().slice(0, limit || 100);
  // whole-word starts, so “date” finds “Date range” but not “update”
  const words = q.split(/\s+/).map((w) => new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  return components()
    .map((c) => {
      const name = c.name.toLowerCase();
      const hay = [c.id, name, c.collection.toLowerCase(), c.description.toLowerCase(), (c.notes || '').toLowerCase()].join(' ');
      let score = 0;
      if (name === q || c.id === q) score += 10;
      if (name.startsWith(q)) score += 5;
      if (name.includes(q)) score += 3;
      if (c.collection.toLowerCase() === q) score += 4;
      words.forEach((w) => { if (w.test(hay)) score += 1; });
      if (words.length > 1 && words.every((w) => w.test(hay))) score += 5; // all words beat some words
      return [c, score];
    })
    .filter(([, s]) => s >= 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit || 100)
    .map(([c]) => c);
}

const FORMATS = gen.FRAMEWORKS.map((f) => f.id);
function files(c, format, withTokens) {
  return gen.filesFor(c, format, withTokens ? tokens() : '');
}

/* Receipts: evidence from the accessibility run (api/receipts.json), when it exists. */
let receiptsCache;
function receipt(id) {
  if (receiptsCache === undefined) {
    try { receiptsCache = JSON.parse(fs.readFileSync(path.join(ROOT, 'api', 'receipts.json'), 'utf8')); } catch { receiptsCache = null; }
  }
  return receiptsCache && receiptsCache.parts[id] ? receiptsCache.parts[id] : null;
}
function receiptLine(id) {
  const r = receipt(id);
  if (!r) return '';
  const clean = !r.axe.light.violations && !r.axe.dark.violations;
  return 'axe ' + (clean ? 'clean in light and dark' : 'has issues') +
    (r.contrast ? '; tightest text contrast ' + r.contrast.ratio + ':1 (needs ' + r.contrast.need + ':1)' : '') +
    '; ' + r.keyboard.length + ' tab stop' + (r.keyboard.length === 1 ? '' : 's') +
    '; fits a phone in RTL with Arabic: ' + (r.rtl.overflows ? 'no' : 'yes') +
    '; with 40% longer text: ' + (r.long.overflows ? 'no' : 'yes') +
    '; contrast holds with a fitted brand: ' + (r.brand ? 'yes' : 'no');
}

/* A plain summary of a component, safe to serialise. */
function summary(c) {
  return {
    id: c.id,
    name: c.name,
    page: 'p.' + c.no,
    collection: c.collection,
    experimental: Boolean(c.wild),
    description: c.description,
    notes: c.notes || '',
    usesJavaScript: c.specs.js,
    sizeKb: Number(c.specs.kb),
    formats: FORMATS,
    url: c.page,
    api: SITE + '/api/components/' + c.id + '.json',
    version: require('../shared/codegen.js').version(c),
    checked: receiptLine(c.id) || undefined,
  };
}

/* ───────── design guide: parsed from the guide's own HTML ───────── */
const text = (html) =>
  html
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

let guideCache;
function guide() {
  if (guideCache) return guideCache;
  const html = fs.readFileSync(path.join(ROOT, 'shared', 'guide-body.html'), 'utf8');
  const parts = html.split(/<section class="guide-section" id="/).slice(1);
  guideCache = parts.map((part) => {
    const id = part.slice(0, part.indexOf('"'));
    const title = ((part.match(/<h2>([\s\S]*?)<\/h2>/) || [])[1] || '').replace(/<span class="num">[\s\S]*?<\/span>/, '');
    const intro = text((part.match(/<\/h2>\s*<p>([\s\S]*?)<\/p>/) || [])[1] || '');
    const rules = (part.match(/<div class="rule">[\s\S]*?(?=<div class="rule">|<\/section>|$)/g) || []).map((r) => ({
      do: text((r.match(/<div class="do"><b>[^<]*<\/b><p>([\s\S]*?)<\/p>/) || [])[1] || ''),
      dont: text((r.match(/<div class="dont"><b>[^<]*<\/b><p>([\s\S]*?)<\/p>/) || [])[1] || ''),
      why: text((r.match(/<p class="why">([\s\S]*?)<\/p>/) || [])[1] || ''),
    }));
    const checklist = (part.match(/<label><input type="checkbox"[^>]*><span>([\s\S]*?)<\/span><\/label>/g) || []).map((l) => text(l));
    const chapter = { id, title: text(title), intro, rules };
    if (checklist.length) chapter.checklist = checklist;
    return chapter;
  });
  return guideCache;
}

/* Suggestions for a mistyped id: search, then fall back to the first letters. */
function suggest(query) {
  const q = String(query || '').trim();
  const hits = search(q, 5);
  return (hits.length ? hits : search(q.slice(0, 3), 5)).map((c) => c.id);
}

module.exports = { receipt, receiptLine, suggest, SITE, REPO, FORMATS, components, collections, tokens, get, search, files, summary, guide, singleFile: gen.singleFile };
