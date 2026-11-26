#!/usr/bin/env node
/* Tearsheet command-line tool.
 *   npx tearsheet <command>
 * Works offline: the components ship inside the package. No dependencies.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const cat = require('../lib/catalog');
const gen = require('../shared/codegen.js');
const pkg = require('../package.json');

const color = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (color ? '\x1b[' + code + 'm' + s + '\x1b[0m' : String(s));
const bold = paint('1');
const dim = paint('2');
const pink = paint('35');
const green = paint('32');
const red = paint('31');

const HELP = `${bold('Tearsheet')} ${dim('v' + pkg.version)}: free interface components for any project.

${bold('Usage')}
  tearsheet <command> [options]

${bold('Commands')}
  list [--collection <name>]       All components, grouped by collection
  search <words...>                Find components by name or purpose
  show <id> [--format <f>]         Print a component's files
  add <id...> [options]            Write components into this project
  tokens [--out <file>]            Print or save the shared design tokens (tokens.css)
           [--accent <hex>]        ...fitted to your brand colour, contrast-checked (--radius, --font)
  diff [id...] [--dir <path>]      Check copied parts against the latest versions
  audit [paths...]                 Check your own UI code against the design guide
  guide [chapter]                  Web design dos and don'ts
  mcp                              Run as an MCP server over stdio (for AI agents)

${bold('Options')}
  --format html|react|vue|svelte   Output format (add: detected from package.json)
  --dir <path>                     Where add writes files
  --no-tokens                      add: skip tokens.css
  --force                          add: overwrite existing files
  --json                           Machine-readable output (list, search, show, guide)

${bold('Examples')}
  npx tearsheet search date
  npx tearsheet add modal tabs --format react
  npx tearsheet guide forms

Browse everything: ${cat.SITE}/
`;

/* ───────── argument parsing ───────── */
function parse(argv) {
  const args = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--no-tokens') args.flags.tokens = false;
    else if (['--force', '--json', '--verbose', '--help', '-h', '--version', '-v'].includes(a)) args.flags[a.replace(/^-+/, '')] = true;
    else if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      args.flags[k] = v !== undefined ? v : argv[++i];
    } else args._.push(a);
  }
  return args;
}

function fail(msg, hint) {
  console.error(red('Error: ') + msg + (hint ? '\n' + dim(hint) : ''));
  process.exit(1);
}

function requireComponent(id) {
  const c = cat.get(id);
  if (c) return c;
  const near = cat.suggest(id);
  fail('no component called "' + id + '".', near.length ? 'Did you mean: ' + near.join(', ') + '?' : 'Run "tearsheet list" to see every id.');
}

function checkFormat(f) {
  if (f && !cat.FORMATS.includes(f)) fail('unknown format "' + f + '".', 'Use one of: ' + cat.FORMATS.join(', '));
  return f;
}

/* Guess the framework from the project's package.json. */
function detectFormat(cwd) {
  try {
    const p = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
    const deps = Object.assign({}, p.dependencies, p.devDependencies);
    if (deps.svelte || deps['@sveltejs/kit']) return 'svelte';
    if (deps.vue || deps.nuxt) return 'vue';
    if (deps.react || deps.next || deps['react-dom']) return 'react';
  } catch (e) { /* no package.json: plain HTML */ }
  return 'html';
}

function defaultDir(cwd, format) {
  if (format === 'html') return 'tearsheet';
  return fs.existsSync(path.join(cwd, 'src')) ? path.join('src', 'components', 'tearsheet') : path.join('components', 'tearsheet');
}

/* ───────── commands ───────── */
function list(flags) {
  const want = flags.collection ? String(flags.collection).toLowerCase() : null;
  const items = cat.components().filter((c) => !want || c.collection.toLowerCase() === want);
  if (want && !items.length) fail('no collection called "' + flags.collection + '".', 'Collections: ' + cat.collections().join(', '));
  if (flags.json) return console.log(JSON.stringify(items.map(cat.summary), null, 2));
  cat.collections().forEach((label) => {
    const inCol = items.filter((c) => c.collection === label);
    if (!inCol.length) return;
    console.log('\n' + bold(pink(label)) + dim(' (' + inCol.length + ')'));
    const width = Math.max(...inCol.map((c) => c.id.length));
    inCol.forEach((c) => console.log('  ' + c.id.padEnd(width + 2) + dim(c.description)));
  });
  console.log('\n' + dim(items.length + ' components. Add one: tearsheet add <id>'));
}

function search(words, flags) {
  const q = words.join(' ');
  if (!q) fail('give me something to search for.', 'Example: tearsheet search date picker');
  const hits = cat.search(q, 20);
  if (flags.json) return console.log(JSON.stringify(hits.map(cat.summary), null, 2));
  if (!hits.length) return console.log('Nothing matches "' + q + '". Try a broader word, or "tearsheet list".');
  const width = Math.max(...hits.map((c) => c.id.length));
  hits.forEach((c) => console.log(c.id.padEnd(width + 2) + dim('[' + c.collection + '] ') + c.description));
}

function show(id, flags) {
  if (!id) fail('which component?', 'Example: tearsheet show modal --format react');
  const c = requireComponent(id);
  const format = checkFormat(flags.format) || 'html';
  const files = cat.files(c, format, false);
  if (flags.json) return console.log(JSON.stringify(Object.assign(cat.summary(c), { format, files }), null, 2));
  console.log(bold(c.name) + dim('  ' + c.collection + ' · ' + format));
  console.log(c.description);
  if (c.notes) console.log(dim('Why it works: ' + c.notes));
  if (cat.receiptLine(c.id)) console.log(dim('Checked: ' + cat.receiptLine(c.id) + '.'));
  files.forEach((f) => console.log('\n' + pink('── ' + f.name + ' ──') + '\n' + f.code));
  console.log('\n' + dim('Needs tokens.css once per project: tearsheet tokens --out tokens.css'));
}

function add(ids, flags) {
  if (!ids.length) fail('which components?', 'Example: tearsheet add modal tabs --format react');
  const cwd = process.cwd();
  const format = checkFormat(flags.format) || detectFormat(cwd);
  const dir = path.resolve(cwd, flags.dir || defaultDir(cwd, format));
  const comps = ids.map(requireComponent);
  const written = [];
  const skipped = [];
  const write = (file, code) => {
    if (fs.existsSync(file) && !flags.force) return skipped.push(path.relative(cwd, file));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, code.endsWith('\n') ? code : code + '\n');
    written.push(path.relative(cwd, file));
  };
  if (flags.tokens !== false) write(path.join(dir, 'tokens.css'), cat.tokens());
  comps.forEach((c) => {
    const folder = path.join(dir, format === 'html' ? c.id : require('../shared/codegen.js').pascal(c.id));
    cat.files(c, format, false).forEach((f) => write(path.join(folder, f.name), f.code));
  });

  console.log(written.length
    ? green('Added ') + comps.map((c) => bold(c.name)).join(', ') + dim(' as ' + format)
    : dim('Nothing new written: every file is already there.'));
  written.forEach((f) => console.log('  ' + green('+ ') + f));
  skipped.forEach((f) => console.log('  ' + dim('= ' + f + ' (exists, use --force to overwrite)')));
  if (flags.tokens !== false && written.length) {
    const tokensRel = path.relative(cwd, path.join(dir, 'tokens.css')).replace(/\\/g, '/');
    const hint = {
      html: 'Link it once in every page <head>: <link rel="stylesheet" href="' + tokensRel + '">',
      react: 'Import ' + tokensRel + ' once in your app entry (for example main.jsx or app/layout.jsx).',
      vue: 'Import ' + tokensRel + ' once in main.js.',
      svelte: 'Import ' + tokensRel + ' once in your root +layout.svelte.',
    }[format];
    console.log('\n' + bold('Next: ') + hint);
  }
}

function tokens(flags) {
  let css = cat.files({ id: 'tokens' }, 'none', true)[0].code;
  if (flags.accent) {
    // Fit the tokens to a brand colour; the report goes to stderr so stdout stays plain CSS.
    const F = require('../shared/fitter');
    let result;
    try { result = F.fit(flags.accent, { radius: flags.radius, font: flags.font }); } catch (e) { fail(e.message, 'Example: tearsheet tokens --accent "#e11d48" --radius 8'); }
    const fitted = F.applyToTokens(cat.tokens(), result);
    css = gen.stampLine('tokens', gen.tokensVersion(fitted), 'tokens.css') + '\n' + fitted;
    const log = (s) => process.stderr.write(s + '\n');
    result.notes.forEach((n) => log(dim(n)));
    result.checks.forEach((c) => log((c.pass ? green('  pass ') : red('  FAIL ')) + c.ratio.toFixed(2) + ':1  ' + dim(c.name)));
  }
  if (!flags.out) return process.stdout.write(css + '\n');
  fs.mkdirSync(path.dirname(path.resolve(flags.out)), { recursive: true });
  fs.writeFileSync(path.resolve(flags.out), css + '\n');
  console.log(green('Saved ') + flags.out);
}

/* ───────── audit: check a project against the design guide ───────── */
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', '.svelte-kit', 'out', 'coverage']);
const AUDIT_FILE = /\.(html?|jsx|tsx|vue|svelte|astro|css|scss)$/;

function collect(target, depth, out) {
  let stat;
  try { stat = fs.statSync(target); } catch { return out; }
  if (stat.isFile()) { if (AUDIT_FILE.test(target)) out.push(target); return out; }
  if (depth < 0 || out.length > 3000) return out;
  for (const e of fs.readdirSync(target, { withFileTypes: true })) {
    if (e.isDirectory() && (SKIP_DIRS.has(e.name) || e.name.startsWith('.'))) continue;
    collect(path.join(target, e.name), depth - 1, out);
  }
  return out;
}

function audit(targets, flags) {
  const { auditCode } = require('../lib/audit');
  const files = (targets.length ? targets : ['.']).flatMap((t) => collect(path.resolve(t), 10, []));
  if (!files.length) fail('no HTML, JSX, Vue, Svelte or CSS files found.', 'Example: tearsheet audit src');
  const results = files.map((file) => {
    // sibling files, so motion handled in a component's script still counts
    const dir = path.dirname(file);
    const context = fs.readdirSync(dir).filter((n) => /\.(js|jsx|ts|tsx|vue|svelte)$/.test(n)).slice(0, 20)
      .map((n) => { try { return fs.readFileSync(path.join(dir, n), 'utf8'); } catch { return ''; } }).join('\n');
    return { file: path.relative(process.cwd(), file), findings: auditCode(fs.readFileSync(file, 'utf8'), file, context) };
  }).filter((r) => r.findings.length);
  const errors = results.reduce((n, r) => n + r.findings.filter((f) => f.severity === 'error').length, 0);
  const warnings = results.reduce((n, r) => n + r.findings.filter((f) => f.severity === 'warn').length, 0);
  if (flags.json) { console.log(JSON.stringify({ files: files.length, errors, warnings, results }, null, 2)); process.exit(errors ? 1 : 0); }
  results.forEach((r) => {
    console.log('\n' + bold(r.file));
    r.findings.forEach((f) => {
      console.log('  ' + dim(String(f.line).padStart(4) + '  ') + (f.severity === 'error' ? red('error') : pink('warn ')) + '  ' + f.message + dim('  ' + f.rule));
      console.log('        ' + dim(f.fix + ' ' + f.guide));
    });
  });
  console.log('\n' + (errors || warnings
    ? (errors ? red(errors + ' error(s)') : green('0 errors')) + ', ' + warnings + ' warning(s) in ' + files.length + ' file(s).' + dim(' A first pass only: also try it with a keyboard and a screen reader.')
    : green('No problems found in ' + files.length + ' file(s).') + dim(' Still worth a pass with a keyboard and a screen reader.')));
  if (errors) process.exitCode = 1;
}

/* ───────── diff: what changed upstream since a part was copied ───────── */
const CODE_FILE = /\.(html|css|js|jsx|vue|svelte)$/;

function findStamped(dir, depth, found) {
  if (depth < 0) return found;
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return found; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name) && !e.name.startsWith('.')) findStamped(full, depth - 1, found); continue; }
    if (!CODE_FILE.test(e.name)) continue;
    const head = fs.readFileSync(full, 'utf8').slice(0, 300);
    const stamp = gen.readStamp(head);
    if (stamp) found.push({ file: full, stamp });
  }
  return found;
}

/* The latest version of a stamped local file, matched by file name across the four formats. */
function latestFor(c, fileName) {
  for (const format of cat.FORMATS) {
    const f = cat.files(c, format, false).find((x) => x.name === fileName);
    if (f) return f.code;
  }
  return null;
}

function diff(ids, flags) {
  const root = path.resolve(process.cwd(), flags.dir || '.');
  const want = new Set(ids);
  const stamped = findStamped(root, 8, []).filter(({ stamp }) => stamp.id !== 'tokens' && (!want.size || want.has(stamp.id)));
  if (!stamped.length) {
    return console.log(want.size
      ? 'No copied files for ' + ids.join(', ') + ' under ' + path.relative(process.cwd(), root || '.') + '.'
      : 'No Tearsheet files found here. Files added with "tearsheet add" or copied from the site carry a stamp on their first line.');
  }
  const { diffLines, hunks, changed } = require('../lib/diff');
  const report = [];
  for (const { file, stamp } of stamped) {
    const c = cat.get(stamp.id);
    const rel = path.relative(process.cwd(), file);
    if (!c) { report.push({ file: rel, id: stamp.id, status: 'unknown' }); continue; }
    const latestVersion = gen.version(c);
    const latest = latestFor(c, path.basename(file));
    const mine = fs.readFileSync(file, 'utf8');
    const ops = latest ? diffLines(gen.unstamp(mine).trimEnd(), gen.unstamp(latest).trimEnd()) : [];
    const status = stamp.version === latestVersion ? (changed(ops) ? 'edited' : 'current') : 'outdated';
    report.push({ file: rel, id: stamp.id, yours: stamp.version, latest: latestVersion, status, ops });
  }
  if (flags.json) return console.log(JSON.stringify(report.map(({ ops, ...r }) => r), null, 2));

  const label = { current: green('up to date'), edited: dim('up to date, with your own edits'), outdated: pink('newer version available'), unknown: red('no longer in the library') };
  report.forEach((r) => {
    console.log(bold(r.file) + '  ' + label[r.status] + (r.status === 'outdated' ? dim('  v' + r.yours + ' → v' + r.latest) : ''));
    if (r.status !== 'outdated' && !(r.status === 'edited' && flags.verbose)) return;
    hunks(r.ops).forEach((h) => {
      console.log(dim('  ···'));
      h.forEach((o) => console.log('  ' + (o.op === '+' ? green('+ ' + o.line) : o.op === '-' ? red('- ' + o.line) : dim('  ' + o.line))));
    });
  });
  const outdated = report.filter((r) => r.status === 'outdated');
  console.log('\n' + (outdated.length
    ? pink(outdated.length + ' file(s) behind.') + dim(' Lines marked - are yours, + are the latest. Update with: tearsheet add ' + [...new Set(outdated.map((r) => r.id))].join(' ') + ' --force')
    : green('Everything is current.')));
}

function guide(topic, flags) {
  const chapters = cat.guide();
  const pick = topic
    ? chapters.filter((ch) => ch.id.includes(topic.toLowerCase()) || ch.title.toLowerCase().includes(topic.toLowerCase()))
    : chapters;
  if (topic && !pick.length) fail('no chapter about "' + topic + '".', 'Chapters: ' + chapters.map((c) => c.id).join(', '));
  if (flags.json) return console.log(JSON.stringify(pick, null, 2));
  if (!topic) {
    console.log(bold('The design guide') + dim(' (pick a chapter: tearsheet guide <name>)\n'));
    chapters.forEach((ch) => console.log('  ' + ch.id.padEnd(16) + ch.title + dim(ch.rules.length ? ' · ' + ch.rules.length + ' rules' : '')));
    return;
  }
  pick.forEach((ch) => {
    console.log('\n' + bold(pink(ch.title)) + '\n' + dim(ch.intro));
    ch.rules.forEach((r) => {
      console.log('\n  ' + green('Do:    ') + r.do);
      console.log('  ' + red("Don't: ") + r.dont);
      if (r.why) console.log('  ' + dim('Why:   ' + r.why));
    });
    (ch.checklist || []).forEach((item) => console.log('  [ ] ' + item));
  });
}

/* ───────── main ───────── */
const { _: [cmd, ...rest], flags } = parse(process.argv.slice(2));
if (flags.version || flags.v || cmd === 'version') console.log(pkg.version);
else if (!cmd || cmd === 'help' || flags.help || flags.h) process.stdout.write(HELP);
else if (cmd === 'list' || cmd === 'ls') list(flags);
else if (cmd === 'search' || cmd === 'find') search(rest, flags);
else if (cmd === 'show') show(rest[0], flags);
else if (cmd === 'add') add(rest, flags);
else if (cmd === 'tokens') tokens(flags);
else if (cmd === 'diff') diff(rest, flags);
else if (cmd === 'audit') audit(rest, flags);
else if (cmd === 'guide') guide(rest[0], flags);
else if (cmd === 'mcp') require('../lib/mcp').start();
else fail('unknown command "' + cmd + '".', 'Run "tearsheet help" for the list.');
