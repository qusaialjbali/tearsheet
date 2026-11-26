/* Accessibility check and receipts. For every component, in a real browser:
 *   - axe (WCAG 2.1 A and AA) in light and dark: any violation fails the run
 *   - the same contrast rules with tokens fitted to an awkward brand colour: must pass too
 *   - the keyboard tab order and the accessibility tree assistive tech is given
 *   - what keeps moving under prefers-reduced-motion
 *   - on a phone-width page: right-to-left with Arabic sample text, and 40% longer text
 * The evidence is written to api/receipts.json, which the site and the API publish.
 * Run: npm run check:a11y   (needs a browser: npx playwright install chromium; locally it falls
 * back to an installed Chrome or Edge)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const gen = require('../shared/codegen');
const fitter = require('../shared/fitter');
const cat = require('../lib/catalog');

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const BRAND = '#facc15'; // yellow: the hardest common brand colour to make readable
const STRESS = fs.readFileSync(path.join(__dirname, '..', 'shared', 'stress.js'), 'utf8');
const OUT = path.join(__dirname, '..', 'api', 'receipts.json');
const only = process.argv.slice(2);

async function launch() {
  try { return await chromium.launch(); } catch (first) {
    for (const channel of ['chrome', 'msedge']) { try { return await chromium.launch({ channel }); } catch {} }
    throw first;
  }
}

const trim = (s, lines) => { const all = String(s).split('\n'); return all.length > lines ? all.slice(0, lines).join('\n') + '\n- …' : all.join('\n'); };

async function main() {
  const browser = await launch();
  const tokens = cat.tokens();
  const brandTokens = fitter.applyToTokens(tokens, fitter.fit(BRAND));
  const problems = [];
  const receipts = {};
  let axeVersion = '';

  const load = async (page, c, theme, css) => {
    await page.setContent(gen.previewDoc(c, css || tokens, { theme, title: c.name }), { waitUntil: 'load' });
    await page.waitForTimeout(150);
  };

  const parts = cat.components().filter((c) => !only.length || only.includes(c.id));
  // Four workers, each with a desktop and a phone page. Reduced motion everywhere, so parts are
  // measured at rest rather than halfway through an entrance.
  let next = 0;
  const worker = async () => {
    const desk = await (await browser.newContext({ viewport: { width: 900, height: 700 }, reducedMotion: 'reduce' })).newPage();
    const phone = await (await browser.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce' })).newPage();
    while (next < parts.length) await check(parts[next++], desk, phone);
  };
  const check = async (c, desk, phone) => {
    const r ={ axe: {}, contrast: null, brand: true, keyboard: [], tree: '', motion: {}, rtl: {}, long: {} };

    for (const theme of ['light', 'dark']) {
      await load(desk, c, theme);
      const res = await new AxeBuilder({ page: desk }).withTags(TAGS).analyze();
      axeVersion = res.testEngine.version;
      res.violations.forEach((v) => problems.push(c.id + ' (' + theme + '): ' + v.id + ' — ' + v.help + ' [' + v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ') + ']'));
      const ratios = (res.passes.find((p) => p.id === 'color-contrast') || { nodes: [] }).nodes
        .map((n) => n.any[0] && n.any[0].data).filter((d) => d && d.contrastRatio)
        .map((d) => ({ ratio: d.contrastRatio, need: parseFloat(d.expectedContrastRatio) || 4.5 }));
      r.axe[theme] = { violations: res.violations.length, rulesPassed: res.passes.length };
      // the tightest pair: smallest margin over what WCAG asks for that text (4.5:1, or 3:1 when large)
      ratios.forEach((x) => {
        const margin = x.ratio / x.need;
        if (!r.contrast || margin < r.contrast.ratio / r.contrast.need) r.contrast = { ratio: Math.round(x.ratio * 100) / 100, need: x.need, theme };
      });

      if (theme === 'light') {
        r.tree = trim(await desk.locator('.stage').ariaSnapshot(), 40);
        // Keyboard: Tab through the part and note every stop
        await desk.evaluate(() => document.activeElement && document.activeElement.blur());
        // Tab may move inside one control (the day, month and year of a date field), so a repeat
        // of the current element is skipped; coming back to an earlier one means the order wrapped.
        const seen = [];
        for (let i = 0; i < 40 && seen.length < 14; i++) {
          await desk.keyboard.press('Tab');
          const at = await desk.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            if (!el.dataset.stop) el.dataset.stop = String(Math.random());
            return el.dataset.stop;
          });
          if (!at) break;
          if (at === seen[seen.length - 1]) continue;
          if (seen.includes(at)) break;
          seen.push(at);
          r.keyboard.push((await desk.locator(':focus').ariaSnapshot().catch(() => '- (unnamed)')).split('\n')[0].replace(/^- /, ''));
        }
        // Motion: what is still looping with reduced motion on
        await desk.waitForTimeout(450);
        r.motion = await desk.evaluate(() => {
          const loops = document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations === Infinity);
          return { loopingUnderReducedMotion: loops.length };
        });
        const source = c.css + (c.setup || '') + (c.js || '');
        r.motion.moves = /@keyframes|animation\s*:|transition\s*:|\.animate\(|requestAnimationFrame/.test(source);
        r.motion.handled = /prefers-reduced-motion/.test(source);
      }

      // The same contrast rules with tokens fitted to a hard brand colour
      await load(desk, c, theme, brandTokens);
      const brand = await new AxeBuilder({ page: desk }).withRules(['color-contrast']).analyze();
      if (brand.violations.length) {
        r.brand = false;
        brand.violations.forEach((v) => problems.push(c.id + ' (' + theme + ', fitted to ' + BRAND + '): ' + v.id + ' [' + v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ') + ']'));
      }
    }

    // Phone width: right-to-left with Arabic sample text, then 40% longer text
    for (const [key, fn] of [['rtl', 'arabic'], ['long', 'longText']]) {
      await load(phone, c, 'light');
      await phone.addScriptTag({ content: STRESS });
      r[key] = await phone.evaluate(async (name) => {
        window.TearsheetStress[name](document);
        await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
        return { overflows: window.TearsheetStress.overflows(document) };
      }, fn);
    }
    receipts[c.id] = r;
  };
  await Promise.all([1, 2, 3, 4].map(worker));
  await browser.close();
  // Same order as the catalogue, so the file only changes when results do
  const ordered = {};
  parts.forEach((c) => (ordered[c.id] = receipts[c.id]));
  Object.keys(receipts).forEach((k) => delete receipts[k]);
  Object.assign(receipts, ordered);

  const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { parts: {} };
  const out = {
    about: 'Evidence from the Tearsheet CI run: axe ' + axeVersion + ' in Chromium, WCAG 2.1 A and AA, light and dark, reduced motion on. Brand check uses tokens fitted to ' + BRAND + '. RTL and long-text checks run at 390px wide.',
    parts: Object.assign(only.length ? previous.parts : {}, receipts),
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');

  const all = Object.values(out.parts);
  const rtlOver = Object.entries(receipts).filter(([, r]) => r.rtl.overflows).map(([id]) => id);
  const longOver = Object.entries(receipts).filter(([, r]) => r.long.overflows).map(([id]) => id);
  if (rtlOver.length) problems.push('RTL with Arabic overflows on a phone: ' + rtlOver.join(', '));
  if (longOver.length) problems.push('40% longer text overflows on a phone: ' + longOver.join(', '));
  if (problems.length) {
    console.error(problems.length + ' problem(s) across ' + parts.length + ' components:\n  ' + problems.join('\n  '));
    process.exit(1);
  }
  console.log('No problems in ' + parts.length + ' components: axe clean in light and dark, contrast holds with a fitted brand, nothing overflows in RTL or with long text. Receipts for ' + all.length + ' parts written.');
}

main().catch((err) => { console.error(err); process.exit(1); });
