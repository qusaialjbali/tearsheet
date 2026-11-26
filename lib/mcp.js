/* Tearsheet MCP server (stdio). Zero dependencies.
 * Speaks JSON-RPC 2.0, one message per line, as the Model Context Protocol stdio transport expects.
 * Start it with:  npx -y tearsheet mcp
 */
'use strict';

const readline = require('readline');
const cat = require('./catalog');
const pkg = require('../package.json');

const INSTRUCTIONS =
  'Tearsheet is a free (MIT-0) library of ' + 0 + ' accessible UI components in HTML + CSS, React, Vue and Svelte, plus web design rules. ' +
  'Use search_components to find a component, get_component to fetch its files in the project\'s framework, and get_design_tokens for tokens.css, ' +
  'which every component needs once, globally. Keep the accessibility details (labels, ARIA, keyboard handling, reduced motion) when adapting the code. ' +
  'Use get_design_rules before making layout, colour, form or copy decisions, and review_ui on interface code you write before finishing.';

const FORMAT = { type: 'string', enum: cat.FORMATS, description: 'Which framework to return: html (HTML + CSS + JS), react, vue or svelte.' };

const TOOLS = [
  {
    name: 'search_components',
    title: 'Search components',
    description: 'Find Tearsheet components by name or purpose (for example "date", "modal", "pricing", "chart"). Returns ids, collections and short descriptions.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Words describing what you need.' },
        limit: { type: 'number', description: 'Maximum results (default 10).' },
      },
      required: ['query'],
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'list_components',
    title: 'List components',
    description: 'List every Tearsheet component, optionally only one collection (Actions, Forms, Content, Data, Feedback, Navigation, Overlays, Sections, Weird).',
    inputSchema: {
      type: 'object',
      properties: { collection: { type: 'string', description: 'Collection name to filter by.' } },
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'get_component',
    title: 'Get component code',
    description: 'Get the complete files for one component in one framework, with notes on why it is built that way. Write the files into the project as given.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Component id from search_components or list_components, for example "modal".' },
        format: FORMAT,
        include_tokens: { type: 'boolean', description: 'Also include tokens.css (needed once per project). Default false.' },
      },
      required: ['id'],
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'get_design_tokens',
    title: 'Get design tokens',
    description: 'Get tokens.css: the CSS custom properties (colours, radii, shadows, focus ring, light and dark theme) that every component reads. Include it once, globally. Pass a brand colour to get tokens fitted to it: the colour is adjusted only as much as WCAG AA contrast needs, in light and dark, with a report of every check.',
    inputSchema: {
      type: 'object',
      properties: {
        accent: { type: 'string', description: 'Optional brand colour as hex, for example "#e11d48".' },
        radius: { type: 'number', description: 'Optional corner radius in px for cards and inputs.' },
      },
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'get_design_rules',
    title: 'Get design rules',
    description: 'Web design dos and don\'ts with the reason for each, by chapter: principles, layout, typography, color, buttons, forms, navigation, accessibility, states, motion, responsive, performance, content, plus a pre-launch checklist. Leave topic empty to list chapters.',
    inputSchema: {
      type: 'object',
      properties: { topic: { type: 'string', description: 'Chapter or keyword, for example "forms", "color" or "checklist".' } },
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'review_ui',
    title: 'Review UI code',
    description: 'Check interface code you wrote (HTML, JSX/TSX, Vue, Svelte or CSS) against the Tearsheet design guide: missing labels and alt text, clickable divs, icon-only buttons with no name, removed focus outlines, blocked zoom, skipped headings, vague links, tiny text, motion without prefers-reduced-motion. Returns each problem with its line, a fix and the guide rule. Run it on new or changed UI before finishing.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'The source of one file.' },
        filename: { type: 'string', description: 'File name with extension, for example "Signup.jsx" or "styles.css", so the right checks run. Defaults to HTML.' },
      },
      required: ['code'],
    },
    annotations: { readOnlyHint: true },
  },
];

const line = (c) => '- `' + c.id + '` **' + c.name + '** (' + c.collection + '): ' + c.description;

function callTool(name, args) {
  args = args || {};
  if (name === 'search_components') {
    const hits = cat.search(args.query, Math.max(1, Math.min(50, Number(args.limit) || 10)));
    if (!hits.length) return 'No components match "' + args.query + '". Try a broader word, or call list_components.';
    return hits.map(line).join('\n');
  }
  if (name === 'list_components') {
    const want = args.collection ? String(args.collection).toLowerCase() : null;
    const groups = cat.collections().filter((c) => !want || c.toLowerCase() === want);
    if (!groups.length) throw new Error('Unknown collection "' + args.collection + '". Collections: ' + cat.collections().join(', '));
    return groups.map((g) => '## ' + g + '\n' + cat.components().filter((c) => c.collection === g).map(line).join('\n')).join('\n\n');
  }
  if (name === 'get_component') {
    const c = cat.get(args.id);
    if (!c) {
      const near = cat.suggest(args.id);
      throw new Error('No component "' + args.id + '".' + (near.length ? ' Did you mean: ' + near.join(', ') + '?' : ''));
    }
    const format = args.format || 'html';
    if (!cat.FORMATS.includes(format)) throw new Error('Unknown format "' + format + '". Use: ' + cat.FORMATS.join(', '));
    const files = cat.files(c, format, Boolean(args.include_tokens));
    const out = ['# ' + c.name + ' (' + format + ')', '', c.description];
    if (c.notes) out.push('', 'Why it works: ' + c.notes);
    if (cat.receiptLine(c.id)) out.push('', 'Checked in CI: ' + cat.receiptLine(c.id) + '.');
    if (!args.include_tokens) out.push('', 'Requires tokens.css once per project (get_design_tokens).');
    files.forEach((f) => out.push('', '## ' + f.name + (f.note ? ' (' + f.note + ')' : ''), '```' + f.name.split('.').pop(), f.code, '```'));
    return out.join('\n');
  }
  if (name === 'review_ui') {
    if (!args.code) throw new Error('Pass the file source as "code".');
    const found = require('./audit').auditCode(String(args.code), args.filename || 'snippet.html');
    if (!found.length) return 'No problems found by the static checks. Still check it with a keyboard (Tab, Enter, Space, Escape) and confirm every control has a visible focus style.';
    const errors = found.filter((x) => x.severity === 'error').length;
    return errors + ' error(s), ' + (found.length - errors) + ' warning(s):\n\n' + found
      .map((x) => '- line ' + x.line + ' [' + x.severity + ' · ' + x.rule + '] ' + x.message + '\n  Fix: ' + x.fix + '\n  Rule: ' + x.guide)
      .join('\n');
  }
  if (name === 'get_design_tokens' && args.accent) {
    const F = require('../shared/fitter');
    const result = F.fit(args.accent, { radius: args.radius });
    const report = result.notes.join(' ') + '\n' + result.checks.map((c) => '- ' + (c.pass ? 'pass' : 'FAIL') + ' ' + c.ratio + ':1 ' + c.name).join('\n');
    return 'Tokens fitted to ' + result.brand + '. Include once, globally.\n\n' + report + '\n\n```css\n' + F.applyToTokens(cat.tokens(), result) + '\n```';
  }
  if (name === 'get_design_tokens') {
    return 'Include once, globally. Switch to dark mode with <html data-theme="dark">. Change --ui-accent and friends to match a brand.\n\n```css\n' + cat.tokens() + '\n```';
  }
  if (name === 'get_design_rules') {
    const chapters = cat.guide();
    const t = String(args.topic || '').trim().toLowerCase();
    if (!t) return 'Chapters (call again with a topic):\n' + chapters.map((ch) => '- ' + ch.id + ': ' + ch.title).join('\n');
    const pick = chapters.filter((ch) => ch.id.includes(t) || ch.title.toLowerCase().includes(t) ||
      ch.rules.some((r) => (r.do + ' ' + r.dont).toLowerCase().includes(t)));
    if (!pick.length) throw new Error('No chapter about "' + args.topic + '". Chapters: ' + chapters.map((c) => c.id).join(', '));
    return pick.map((ch) => {
      const rules = ch.rules.map((r) => '- Do: ' + r.do + '\n  Don\'t: ' + r.dont + (r.why ? '\n  Why: ' + r.why : '')).join('\n');
      const list = (ch.checklist || []).map((i) => '- [ ] ' + i).join('\n');
      return '## ' + ch.title + '\n' + ch.intro + '\n\n' + [rules, list].filter(Boolean).join('\n');
    }).join('\n\n');
  }
  throw new Error('Unknown tool "' + name + '".');
}

function start() {
  const send = (msg) => process.stdout.write(JSON.stringify(msg) + '\n');
  const reply = (id, result) => send({ jsonrpc: '2.0', id, result });
  const error = (id, code, message) => send({ jsonrpc: '2.0', id, error: { code, message } });
  const count = cat.components().length;

  const rl = readline.createInterface({ input: process.stdin, terminal: false });
  rl.on('line', (raw) => {
    if (!raw.trim()) return;
    let msg;
    try { msg = JSON.parse(raw); } catch (e) { return error(null, -32700, 'Parse error'); }
    const { id, method, params } = msg;
    const isRequest = id !== undefined && id !== null;
    try {
      if (method === 'initialize') {
        return reply(id, {
          protocolVersion: (params && params.protocolVersion) || '2025-06-18',
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: 'tearsheet', title: 'Tearsheet', version: pkg.version },
          instructions: INSTRUCTIONS.replace(' ' + 0 + ' ', ' ' + count + ' '),
        });
      }
      if (method === 'ping') return reply(id, {});
      if (method === 'tools/list') return reply(id, { tools: TOOLS });
      if (method === 'tools/call') {
        try {
          const textOut = callTool(params && params.name, params && params.arguments);
          return reply(id, { content: [{ type: 'text', text: textOut }] });
        } catch (e) {
          return reply(id, { content: [{ type: 'text', text: e.message }], isError: true });
        }
      }
      if (method === 'resources/list') return reply(id, { resources: [] });
      if (method === 'prompts/list') return reply(id, { prompts: [] });
      if (isRequest) return error(id, -32601, 'Method not found: ' + method);
      // notifications (notifications/initialized and others) need no answer
    } catch (e) {
      if (isRequest) error(id, -32603, e.message);
    }
  });
  rl.on('close', () => process.exit(0));
  process.stderr.write('Tearsheet MCP server ready (' + count + ' components)\n');
}

module.exports = { start, callTool, TOOLS };
