/* Tearsheet brand fitter: turns one brand colour into contrast-safe design tokens for light
 * and dark mode. The colour is only changed as much as needed for WCAG AA (4.5:1 for text),
 * and every pair it checked is reported. Pure functions, shared by the fitter page
 * (window.TearsheetFit), the CLI and the MCP server (require('./fitter')).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TearsheetFit = api;
})(typeof self !== 'undefined' ? self : this, function () {
  const LIGHT = { bg: '#ffffff', surface: '#ffffff', ink: '#18181b', muted: '#5b5b66' };
  const DARK = { bg: '#0f0f12', surface: '#18181c', ink: '#0f0f12', text: '#f4f4f5', muted: '#a1a1aa' };
  const AA = 4.5;

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  function parse(hex) {
    let h = String(hex || '').trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map((c) => c + c).join('');
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const toHex = (rgb) => '#' + rgb.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
  function luminance(rgb) {
    const [r, g, b] = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function contrast(a, b) {
    const la = luminance(typeof a === 'string' ? parse(a) : a), lb = luminance(typeof b === 'string' ? parse(b) : b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function toHsl([r, g, b]) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  }
  function fromHsl([h, s, l]) {
    const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)].map((v) => v * 255);
  }
  const mix = (a, b, t) => toHex(parse(a).map((v, i) => v + (parse(b)[i] - v) * t)); // t = share of b
  const shade = (hex, dl) => { const [h, s, l] = toHsl(parse(hex)); return toHex(fromHsl([h, s, clamp(l + dl, 0, 1)])); };

  /* Moves the lightness one way until `ok` holds; keeps hue and saturation. */
  function nudge(hex, direction, ok) {
    const [h, s, l0] = toHsl(parse(hex));
    for (let step = 0; step <= 100; step++) {
      const l = clamp(l0 + direction * step * 0.01, 0, 1);
      const out = toHex(fromHsl([h, s, l]));
      if (ok(out)) return out;
    }
    return direction < 0 ? '#000000' : '#ffffff';
  }

  function fit(input, options) {
    const o = options || {};
    const brand = parse(input) ? toHex(parse(input)) : null;
    if (!brand) throw new Error('Give a colour as hex, for example #e11d48.');

    // The soft tint is a background for accent, body and muted text, so all three must read on it.
    // Start from a clearly visible tint and fade it toward the page only as far as that needs.
    const softFor = (accent, page, ink, muted, from) => {
      for (let t = from; t <= 0.985; t += 0.01) {
        const soft = mix(accent, page, t);
        if (contrast(ink, soft) >= AA && contrast(muted, soft) >= AA) return soft;
      }
      return page;
    };
    const lightSoftOf = (c) => softFor(c, '#ffffff', LIGHT.ink, LIGHT.muted, 0.9);
    const darkSoftOf = (c) => softFor(c, DARK.bg, DARK.text, DARK.muted, 0.78);
    // Light mode: the accent is text on white and on its tint, and the background of white button text.
    const lightAccent = nudge(brand, -1, (c) => contrast(c, LIGHT.surface) >= AA && contrast(c, lightSoftOf(c)) >= AA);
    const lightSoft = lightSoftOf(lightAccent);
    // Dark mode: the accent is text on the dark surface and on its tint, and the background of dark button text.
    const darkAccent = nudge(brand, 1, (c) => contrast(c, DARK.surface) >= AA && contrast(c, DARK.ink) >= AA && contrast(c, darkSoftOf(c)) >= AA);
    const darkSoft = darkSoftOf(darkAccent);
    const rgb = (hex) => parse(hex).join(' ');

    const light = { accent: lightAccent, hover: shade(lightAccent, -0.07), soft: lightSoft, text: '#ffffff', focus: 'rgb(' + rgb(lightAccent) + ' / 0.4)' };
    const dark = { accent: darkAccent, hover: shade(darkAccent, 0.07), soft: darkSoft, text: DARK.ink, focus: 'rgb(' + rgb(darkAccent) + ' / 0.5)' };

    const pair = (name, fg, bg, need) => { const r = contrast(fg, bg); return { name, fg, bg, ratio: Math.round(r * 100) / 100, need, pass: r >= need }; };
    const checks = [
      pair('Light: button text on accent', light.text, light.accent, AA),
      pair('Light: accent text on page', light.accent, LIGHT.surface, AA),
      pair('Light: accent text on soft tint', light.accent, light.soft, AA),
      pair('Light: button text on hover', light.text, light.hover, AA),
      pair('Light: muted text on soft tint', LIGHT.muted, light.soft, AA),
      pair('Dark: button text on accent', dark.text, dark.accent, AA),
      pair('Dark: accent text on surface', dark.accent, DARK.surface, AA),
      pair('Dark: accent text on soft tint', dark.accent, dark.soft, AA),
      pair('Dark: button text on hover', dark.text, dark.hover, AA),
      pair('Dark: muted text on soft tint', DARK.muted, dark.soft, AA),
    ];
    const notes = [];
    if (light.accent !== brand) notes.push('Light mode uses ' + light.accent + ': your ' + brand + ' darkened just enough to read at 4.5:1 on white and on its own tint.');
    else notes.push('Light mode uses your colour exactly.');
    if (dark.accent !== brand) notes.push('Dark mode uses ' + dark.accent + ': lightened just enough to read on the dark surface and its tint.');
    else notes.push('Dark mode uses your colour exactly.');

    return { brand, light, dark, radius: o.radius, font: o.font, checks, notes, pass: checks.every((c) => c.pass) };
  }

  /* Rewrites tokens.css with the fitted values. */
  function applyToTokens(tokensCss, result) {
    const set = (block, name, value) => block.replace(new RegExp('(' + name + ':\\s*)[^;]+;'), '$1' + value + ';');
    const [head, darkPart] = tokensCss.split('[data-theme="dark"]');
    let light = head, dark = darkPart;
    const L = result.light, D = result.dark;
    [['--ui-accent', L.accent], ['--ui-accent-hover', L.hover], ['--ui-accent-soft', L.soft], ['--ui-accent-text', L.text], ['--ui-focus', '0 0 0 3px ' + L.focus]].forEach(([n, v]) => (light = set(light, n, v)));
    [['--ui-accent', D.accent], ['--ui-accent-hover', D.hover], ['--ui-accent-soft', D.soft], ['--ui-accent-text', D.text], ['--ui-focus', '0 0 0 3px ' + D.focus]].forEach(([n, v]) => (dark = set(dark, n, v)));
    if (result.radius !== undefined && result.radius !== null && result.radius !== '') {
      const r = Number(result.radius);
      light = set(light, '--ui-radius', r + 'px');
      light = set(light, '--ui-radius-sm', Math.round(r * 0.66) + 'px');
    }
    if (result.font) light = set(light, '--ui-font', result.font);
    return (light + '[data-theme="dark"]' + dark).replace(/^\/\* Tearsheet design tokens[^\n]*/, (m) => m + '\n   Fitted to brand colour ' + result.brand + ' with the Tearsheet brand fitter.');
  }

  return { fit, applyToTokens, contrast, parse, toHex };
});
