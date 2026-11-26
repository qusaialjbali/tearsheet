/* The brand fitter page: fit tokens to a colour, show every contrast check, preview the parts. */
(function () {
  const F = window.TearsheetFit;
  const G = window.CUIGen;
  const PARTS = ['buttons', 'text-field', 'checkbox-switch', 'segmented-control', 'tabs', 'alerts', 'badges', 'pricing-card'];
  const byId = (id) => document.getElementById(id);
  const picker = byId('fit-picker'), hex = byId('fit-hex'), radius = byId('fit-radius'), radiusOut = byId('fit-radius-out');
  const font = byId('fit-font'), status = byId('fit-status');
  let mode = 'light', css = '', last = null, timer = 0;

  // Restore a shared fit from the address (#accent=e11d48&radius=8)
  const saved = new URLSearchParams(location.hash.slice(1));
  if (saved.get('accent') && F.parse(saved.get('accent'))) picker.value = hex.value = '#' + saved.get('accent').replace('#', '').toLowerCase();
  if (saved.get('radius')) radius.value = saved.get('radius');

  const frames = PARTS.map((id) => (window.COMPONENTS || []).find((c) => c.id === id)).filter(Boolean).map((c) => {
    const frame = document.createElement('iframe');
    frame.title = c.name + ' in your brand';
    frame.loading = 'lazy';
    const fig = document.createElement('figure');
    const cap = document.createElement('figcaption');
    cap.textContent = c.name;
    fig.append(cap, frame);
    byId('fit-grid').append(fig);
    // Fit the frame to its content, and keep fitting as fonts load and scripts run.
    frame.addEventListener('load', () => {
      const d = frame.contentDocument;
      if (!d || !d.body) return;
      const fit = () => (frame.style.height = Math.max(160, d.querySelector('.stage').getBoundingClientRect().height) + 'px');
      new ResizeObserver(fit).observe(d.body);
      fit();
    });
    return { c, frame };
  });

  function render() {
    const value = hex.value.trim();
    if (!F.parse(value)) { hex.setAttribute('aria-invalid', 'true'); byId('fit-hex-hint').textContent = 'That is not a hex colour yet. Try #e11d48.'; return; }
    hex.removeAttribute('aria-invalid');
    byId('fit-hex-hint').textContent = 'Hex, like #e11d48';
    const r = Number(radius.value);
    radiusOut.textContent = r + 'px';
    last = F.fit(value, { radius: r, font: font.value || undefined });
    css = F.applyToTokens(window.TOKENS_CSS, last);

    byId('fit-notes').replaceChildren(...last.notes.map((n) => Object.assign(document.createElement('p'), { className: 'fit-notes', textContent: n })));
    byId('fit-checks').replaceChildren(...last.checks.map((c) => {
      const tr = document.createElement('tr');
      const sw = (color) => '<span class="fit-swatch" style="background:' + color + '"></span>';
      tr.innerHTML = '<td>' + sw(c.bg) + sw(c.fg) + c.name + '</td><td>' + c.ratio.toFixed(2) + ':1</td><td class="' + (c.pass ? 'fit-pass">Pass' : 'fit-fail">Fails') + '</td>';
      return tr;
    }));
    frames.forEach(({ c, frame }) => (frame.srcdoc = G.previewDoc(c, css, { theme: mode, extraCss: 'html{overflow:hidden}' })));

    const cli = 'npx tearsheet tokens --accent "' + last.brand + '" --radius ' + r + ' --out tokens.css';
    byId('fit-cli').textContent = cli;
    const dl = byId('fit-download');
    if (dl.href.startsWith('blob:')) URL.revokeObjectURL(dl.href);
    dl.href = URL.createObjectURL(new Blob([css + '\n'], { type: 'text/css' }));
    history.replaceState(null, '', '#accent=' + last.brand.slice(1) + '&radius=' + r);
  }
  const soon = () => { clearTimeout(timer); timer = setTimeout(render, 120); };

  picker.addEventListener('input', () => { hex.value = picker.value; soon(); });
  hex.addEventListener('input', () => { if (F.parse(hex.value)) picker.value = '#' + hex.value.trim().replace('#', '').toLowerCase().replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3'); soon(); });
  radius.addEventListener('input', soon);
  font.addEventListener('change', soon);
  document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    document.querySelectorAll('[data-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    render();
  }));

  async function copy(text, what) {
    try { await navigator.clipboard.writeText(text); status.textContent = what + ' copied.'; }
    catch { status.textContent = 'Copy was blocked. Select the text and press Ctrl+C.'; }
  }
  byId('fit-copy').addEventListener('click', () => copy(css + '\n', 'tokens.css'));
  byId('fit-copy-cli').addEventListener('click', () => copy(byId('fit-cli').textContent, 'Command'));

  render();
})();
