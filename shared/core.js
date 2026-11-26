/* Tearsheet core: code generation, live previews, copy and theme.
 * Shared by every visual world of the site. Exposes window.CUI.
 */
window.CUI = (function () {
  const COMPONENTS = window.COMPONENTS;
  const TOKENS = window.TOKENS_CSS;

  const G = window.CUIGen;
  const FRAMEWORKS = G.FRAMEWORKS;

  /* ───────── persisted preferences ───────── */
  const prefs = {
    get framework() { return localStorage.getItem('cui-framework') || 'html'; },
    set framework(v) { localStorage.setItem('cui-framework', v); emit('frameworkchange', v); },
    get tokens() { return localStorage.getItem('cui-tokens') !== 'off'; },
    set tokens(v) { localStorage.setItem('cui-tokens', v ? 'on' : 'off'); emit('tokenschange', v); },
  };

  function emit(name, detail) {
    document.dispatchEvent(new CustomEvent('cui:' + name, { detail }));
  }

  /* ───────── code generation lives in codegen.js, shared with the CLI and API ───────── */
  const pascal = G.pascal;
  const vanillaScript = G.vanillaScript;
  const filesFor = (c, fw, withTokens) => G.filesFor(c, fw, withTokens ? TOKENS : '');
  const singleFile = G.singleFile;
  const specs = G.specs;

  /* ───────── live previews ───────── */

  const theme = () => document.documentElement.dataset.theme || 'light';

  const srcdoc = (c, extraCss) => G.previewDoc(c, TOKENS, { theme: theme(), extraCss });

  /* Size a preview to everything it draws, including parts that hang outside
     the component's own box (open menus, tooltips, orbiting items). */
  function fitFrame(frame, c) {
    const doc = frame.contentDocument;
    const stage = doc && doc.querySelector('.stage');
    if (!stage) return;
    const win = doc.defaultView;
    const box = stage.getBoundingClientRect();
    let top = box.top;
    let bottom = box.bottom;
    const styles = new Map();
    const style = (n) => styles.get(n) || (styles.set(n, win.getComputedStyle(n)), styles.get(n));
    stage.querySelectorAll('*').forEach((n) => {
      const s = style(n);
      if (s.position === 'fixed' || s.visibility === 'hidden') return;
      const r = n.getBoundingClientRect();
      if (!r.width && !r.height) return;
      // Only count what is actually visible: clip by every ancestor that hides overflow.
      let t = r.top;
      let b = r.bottom;
      for (let p = n.parentElement; p && p !== stage; p = p.parentElement) {
        const ps = style(p);
        if (ps.position === 'fixed') return;
        if (ps.overflowY !== 'visible' || ps.overflowX !== 'visible') {
          const pr = p.getBoundingClientRect();
          t = Math.max(t, pr.top);
          b = Math.min(b, pr.bottom);
          if (b <= t) return;
        }
      }
      top = Math.min(top, t);
      bottom = Math.max(bottom, b);
    });
    // Something pokes out above the stage (a tooltip bubble): give it headroom once.
    if (top < box.top - 0.5 && !stage.dataset.headroom) {
      const pad = parseFloat(win.getComputedStyle(stage).paddingTop) || 0;
      stage.dataset.headroom = '1';
      stage.style.paddingTop = pad + Math.ceil(box.top - top) + 16 + 'px';
      return fitFrame(frame, c);
    }
    const extra = bottom > box.bottom + 0.5 ? 20 : 0;
    frame.style.height = Math.max(Math.ceil(bottom - Math.min(0, top)) + extra, c.minHeight || 0) + 'px';
  }

  function mountFrame(frame, c, extraCss) {
    frame.title = c.name + ' preview';
    frame.setAttribute('scrolling', 'no');
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument;
      let queued = false;
      const refit = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          fitFrame(frame, c);
        });
      };
      fitFrame(frame, c);
      try {
        new ResizeObserver(refit).observe(doc.querySelector('.stage'));
        new MutationObserver(refit).observe(doc.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'open', 'hidden', 'aria-expanded'] });
        doc.addEventListener('transitionend', refit, true);
        doc.addEventListener('toggle', refit, true);
        doc.fonts && doc.fonts.ready.then(refit);
      } catch (e) {}
    });
    frame.srcdoc = srcdoc(c, extraCss);
  }

  /* ───────── copy ───────── */
  async function copyText(text, button, doneLabel) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    if (!button) return;
    const label = button.querySelector('[data-label]') || button;
    const before = label.textContent;
    label.textContent = doneLabel || 'Copied';
    button.classList.add('is-copied');
    clearTimeout(button._t);
    button._t = setTimeout(() => {
      label.textContent = before;
      button.classList.remove('is-copied');
    }, 1600);
  }

  /* ───────── theme ───────── */
  function setTheme(next) {
    document.documentElement.dataset.theme = next;
    localStorage.setItem('cui-theme', next);
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentDocument.documentElement.dataset.theme = next; } catch (e) {}
    });
    document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(next === 'dark')));
    emit('themechange', next);
  }
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(theme() === 'dark'));
    b.addEventListener('click', () => setTheme(theme() === 'dark' ? 'light' : 'dark'));
  });

  /* ───────── element helper ───────── */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'text') node.textContent = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) node.setAttribute(k, v === true ? '' : v);
    }
    [].concat(children || []).forEach((ch) => ch != null && ch !== false && node.append(ch));
    return node;
  }

  const categories = () => G.categories(COMPONENTS);
  const ordered = () => G.ordered(COMPONENTS);

  /* Mount a preview only when it comes near the viewport. */
  const lazyQueue = new Map();
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const job = lazyQueue.get(e.target);
          if (job) job();
          lazyQueue.delete(e.target);
          io.unobserve(e.target);
        });
      }, { rootMargin: '600px 0px' })
    : null;
  function lazyFrame(frame, c, extraCss) {
    if (!io) return mountFrame(frame, c, extraCss);
    // skip frames something else already loaded (a stress toggle, for one)
    lazyQueue.set(frame, () => frame.srcdoc || mountFrame(frame, c, extraCss));
    io.observe(frame);
  }

  /* A radiogroup of format buttons, kept in sync with the saved preference. */
  const groups = new Set();
  function formatGroup(container, buttonClass) {
    container.replaceChildren(
      ...FRAMEWORKS.map((f) =>
        el('button', { type: 'button', class: buttonClass, role: 'radio', 'data-fw': f.id, text: f.label })
      )
    );
    const buttons = [...container.children];
    const sync = () =>
      buttons.forEach((b) => {
        const on = b.dataset.fw === prefs.framework;
        b.setAttribute('aria-checked', String(on));
        b.tabIndex = on ? 0 : -1;
      });
    buttons.forEach((b, i) => {
      b.addEventListener('click', () => { prefs.framework = b.dataset.fw; });
      b.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const next = buttons[(i + d + buttons.length) % buttons.length];
        prefs.framework = next.dataset.fw;
        next.focus();
      });
    });
    groups.add(sync);
    sync();
  }
  document.addEventListener('cui:frameworkchange', () => groups.forEach((s) => s()));

  /* Frame CSS: let previews sit on the world's own ground. */
  const FRAME_CSS = ':root{color-scheme:light}[data-theme="dark"]{color-scheme:dark}html{overflow:hidden}body{background:transparent}';

  return {
    COMPONENTS, TOKENS, FRAMEWORKS, FRAME_CSS, prefs, pascal, filesFor, singleFile, specs,
    mountFrame, lazyFrame, formatGroup, copyText, setTheme, el, categories, ordered,
  };
})();
