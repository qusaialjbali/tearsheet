/* Tearsheet — everyday gaps: more actions, overlays and form controls.
 * Interactive components use `setup` (body of function setup(root)) + `root` selector.
 */
(function () {
  const SR = '.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }';
  const I = (d, extra) => '<svg viewBox="0 0 20 20" aria-hidden="true"' + (extra || '') + '><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const BTN = `.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 40px; padding: 0 16px;
  font: inherit; font-size: 14px; font-weight: 600; line-height: 1;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn svg { width: 18px; height: 18px; }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }`;

  window.COMPONENTS.push(
    /* ───────── Button group ───────── */
    {
      id: 'button-group',
      name: 'Toggle button group',
      category: 'Actions',
      description: 'A formatting toolbar of joined icon buttons that each switch on and off.',
      notes: 'Each button reports its state with aria-pressed, and the group has a role="toolbar" label. Icon-only buttons always carry an aria-label.',
      root: '.toolbar-group',
      html: `<div class="toolbar-group" role="toolbar" aria-label="Text formatting">
  <button class="tg-btn" type="button" aria-pressed="true" aria-label="Bold"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h5a3 3 0 0 1 0 6H6zM6 10h6a3 3 0 0 1 0 6H6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Italic"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4H8M12 16H8M11 4 9 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Underline"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v5a4 4 0 0 0 8 0V4M5 17h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  <span class="tg-sep" aria-hidden="true"></span>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Bulleted list"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h9M8 10h9M8 15h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="4" cy="5" r="1.3" fill="currentColor"/><circle cx="4" cy="10" r="1.3" fill="currentColor"/><circle cx="4" cy="15" r="1.3" fill="currentColor"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Insert link"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-.8.8M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l.8-.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
</div>`,
      css: `.toolbar-group {
  display: inline-flex; align-items: center; gap: 2px; padding: 4px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: calc(var(--ui-radius-sm) + 4px);
  box-shadow: var(--ui-shadow);
}
.tg-btn {
  display: grid; place-items: center; width: 40px; height: 40px;
  color: var(--ui-muted); background: none; border: 0; border-radius: var(--ui-radius-sm); cursor: pointer;
}
.tg-btn svg { width: 18px; height: 18px; }
.tg-btn:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.tg-btn[aria-pressed="true"] { color: var(--ui-accent); background: var(--ui-accent-soft); }
.tg-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tg-sep { width: 1px; height: 24px; margin: 0 4px; background: var(--ui-border); }`,
      setup: `const buttons = [...root.querySelectorAll('.tg-btn')];
const onClick = (e) => {
  const b = e.currentTarget;
  b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
};
// Arrow keys move between buttons, Tab leaves the toolbar
const onKey = (e) => {
  const i = buttons.indexOf(document.activeElement);
  if (i < 0) return;
  const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (d) { e.preventDefault(); buttons[(i + d + buttons.length) % buttons.length].focus(); }
};
buttons.forEach((b, i) => { b.tabIndex = i === 0 ? 0 : -1; b.addEventListener('click', onClick); });
const onFocus = (e) => buttons.forEach((b) => (b.tabIndex = b === e.target ? 0 : -1));
root.addEventListener('keydown', onKey);
root.addEventListener('focusin', onFocus);
return () => {
  buttons.forEach((b) => b.removeEventListener('click', onClick));
  root.removeEventListener('keydown', onKey);
  root.removeEventListener('focusin', onFocus);
};`,
    },

    /* ───────── Split button ───────── */
    {
      id: 'split-button',
      name: 'Split button',
      category: 'Actions',
      description: 'A main action with a small menu of related alternatives attached to its side.',
      notes: 'Use it when one action is the obvious default and the others are rare variants. Both halves are real buttons with their own labels.',
      minHeight: 260,
      html: `<div class="split">
  <button class="split-main" type="button">Publish</button>
  <details class="split-more">
    <summary aria-label="More publish options">${I('m5 8 5 5 5-5')}</summary>
    <div class="split-menu">
      <button type="button">Publish now</button>
      <button type="button">Schedule for later</button>
      <button type="button">Save as draft</button>
    </div>
  </details>
</div>`,
      css: `.split { position: relative; display: inline-flex; }
.split-main, .split-more summary {
  display: inline-flex; align-items: center; min-height: 42px;
  font: inherit; font-size: 14px; font-weight: 600;
  color: var(--ui-accent-text); background: var(--ui-accent); border: 0; cursor: pointer;
}
.split-main { padding: 0 18px; border-radius: var(--ui-radius-sm) 0 0 var(--ui-radius-sm); }
.split-more summary {
  padding: 0 10px; list-style: none;
  border-left: 1px solid rgb(255 255 255 / 0.3); border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
}
.split-more summary::-webkit-details-marker { display: none; }
.split-more summary svg { width: 18px; height: 18px; transition: transform 0.2s; }
.split-more[open] summary svg { transform: rotate(180deg); }
.split-main:hover, .split-more summary:hover { background: var(--ui-accent-hover); }
.split-main:focus-visible, .split-more summary:focus-visible { outline: none; box-shadow: var(--ui-focus); position: relative; z-index: 1; }
.split-menu {
  position: absolute; top: calc(100% + 6px); inset-inline-end: 0; z-index: 5; min-width: 200px; padding: 6px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.split-menu button {
  display: block; width: 100%; padding: 9px 10px; text-align: start;
  font: inherit; font-size: 14px; color: var(--ui-text); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.split-menu button:hover, .split-menu button:focus-visible { outline: none; background: var(--ui-surface-2); }`,
    },

    /* ───────── Icon buttons ───────── */
    {
      id: 'icon-buttons',
      name: 'Icon buttons',
      category: 'Actions',
      description: 'Round and square icon-only buttons in three sizes, plus a favourite toggle.',
      notes: 'An icon button must have an aria-label, and its hit area stays at least 40px even when the icon is small.',
      root: '.icon-row',
      html: `<div class="icon-row">
  <button class="icon-btn sm" type="button" aria-label="Edit">${I('M13.5 3.5 16.5 6.5 7 16H4v-3Z')}</button>
  <button class="icon-btn" type="button" aria-label="Share">${I('M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3')}</button>
  <button class="icon-btn lg solid" type="button" aria-label="Add item">${I('M10 4v12M4 10h12')}</button>
  <button class="icon-btn square" type="button" aria-label="Settings">${I('M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16 10l1.5-1-1.5-2.6-1.7.5-1.3-.8-.5-1.6h-3l-.5 1.6-1.3.8-1.7-.5L2.5 9 4 10l-1.5 1 1.5 2.6 1.7-.5 1.3.8.5 1.6h3l.5-1.6 1.3-.8 1.7.5 1.5-2.6Z')}</button>
  <button class="icon-btn fav" type="button" aria-label="Add to favourites" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16.5s-6-3.6-6-8A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6 2.5c0 4.4-6 8-6 8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
</div>`,
      css: `.icon-row { display: flex; align-items: center; gap: 12px; }
.icon-btn {
  display: grid; place-items: center; width: 40px; height: 40px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: 50%; cursor: pointer;
  transition: background-color 0.15s, transform 0.15s;
}
.icon-btn svg { width: 18px; height: 18px; fill: none; }
.icon-btn.sm svg { width: 15px; height: 15px; }
.icon-btn.lg { width: 52px; height: 52px; }
.icon-btn.lg svg { width: 22px; height: 22px; }
.icon-btn.square { border-radius: var(--ui-radius-sm); }
.icon-btn.solid { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.icon-btn:hover { background: var(--ui-surface-2); }
.icon-btn.solid:hover { background: var(--ui-accent-hover); }
.icon-btn:active { transform: scale(0.94); }
.icon-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.icon-btn.fav[aria-pressed="true"] { color: var(--ui-danger); border-color: var(--ui-danger); }
.icon-btn.fav[aria-pressed="true"] svg { fill: currentColor; }`,
      setup: `const fav = root.querySelector('.fav');
const onFav = () => {
  const on = fav.getAttribute('aria-pressed') !== 'true';
  fav.setAttribute('aria-pressed', String(on));
  fav.setAttribute('aria-label', on ? 'Remove from favourites' : 'Add to favourites');
};
fav.addEventListener('click', onFav);
return () => fav.removeEventListener('click', onFav);`,
    },

    /* ───────── Loading button ───────── */
    {
      id: 'loading-button',
      name: 'Loading button',
      category: 'Actions',
      description: 'A button that shows its work: idle, saving with a spinner, then a short confirmation.',
      notes: 'While busy it is aria-disabled (still focusable) and ignores repeat clicks, so nothing is submitted twice. The result is announced through a live region.',
      root: '.load-demo',
      html: `<div class="load-demo">
  <button class="load-btn" type="button">
    <span class="load-spin" aria-hidden="true"></span>
    <span class="load-label">Save changes</span>
  </button>
  <span class="load-status" aria-live="polite"></span>
</div>`,
      css: `.load-demo { display: inline-flex; }
.load-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-width: 170px; min-height: 44px; padding: 0 20px;
  font: inherit; font-size: 15px; font-weight: 600;
  color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer;
  transition: background-color 0.2s;
}
.load-btn:hover { background: var(--ui-accent-hover); }
.load-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.load-btn[aria-disabled="true"] { cursor: progress; opacity: 0.85; }
.load-btn.is-done { background: var(--ui-success); }
.load-spin {
  display: none; width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent; animation: load-spin 0.7s linear infinite;
}
.load-btn[aria-disabled="true"] .load-spin { display: block; }
@keyframes load-spin { to { transform: rotate(360deg); } }
.load-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
@media (prefers-reduced-motion: reduce) { .load-spin { animation-duration: 2s; } }`,
      setup: `const button = root.querySelector('.load-btn');
const label = root.querySelector('.load-label');
const status = root.querySelector('.load-status');
let timers = [];
const onClick = () => {
  if (button.getAttribute('aria-disabled') === 'true') return;
  button.setAttribute('aria-disabled', 'true');
  label.textContent = 'Saving…';
  // Replace this timeout with your real request
  timers.push(setTimeout(() => {
    button.removeAttribute('aria-disabled');
    button.classList.add('is-done');
    label.textContent = 'Saved';
    status.textContent = 'Changes saved';
    timers.push(setTimeout(() => {
      button.classList.remove('is-done');
      label.textContent = 'Save changes';
      status.textContent = '';
    }, 1800));
  }, 1400));
};
button.addEventListener('click', onClick);
return () => { timers.forEach(clearTimeout); button.removeEventListener('click', onClick); };`,
    },

    /* ───────── Drawer ───────── */
    {
      id: 'drawer',
      name: 'Side drawer',
      category: 'Overlays',
      description: 'A panel that slides in from the edge for filters or secondary tasks, built on <dialog>.',
      notes: 'The native dialog traps focus and closes on Esc. Clicking the dimmed backdrop also closes it. Use a drawer for tasks that keep the page in context; use a page for long ones.',
      minHeight: 420,
      root: '.drawer-demo',
      html: `<div class="drawer-demo">
  <button class="btn btn-secondary" type="button" data-open>${I('M3 5h14M6 10h8M8 15h4')} Filters</button>
  <dialog class="drawer" aria-labelledby="drawer-title">
    <div class="drawer-head">
      <h2 id="drawer-title">Filters</h2>
      <button class="drawer-x" type="button" aria-label="Close filters" data-close>${I('m5 5 10 10M15 5 5 15')}</button>
    </div>
    <div class="drawer-body">
      <fieldset class="drawer-set">
        <legend>Status</legend>
        <label><input type="checkbox" checked> Active</label>
        <label><input type="checkbox"> Paused</label>
        <label><input type="checkbox"> Archived</label>
      </fieldset>
      <fieldset class="drawer-set">
        <legend>Sort by</legend>
        <label><input type="radio" name="sort" checked> Newest first</label>
        <label><input type="radio" name="sort"> Oldest first</label>
      </fieldset>
    </div>
    <div class="drawer-foot">
      <button class="btn btn-secondary" type="button" data-close>Clear all</button>
      <button class="btn btn-primary" type="button" data-close>Show 24 results</button>
    </div>
  </dialog>
</div>`,
      css: `${BTN}
.drawer {
  position: fixed; inset: 0 0 0 auto; width: min(360px, 90vw); height: 100%; max-height: none; margin: 0; padding: 0;
  display: none; flex-direction: column;
  color: var(--ui-text); background: var(--ui-surface); border: 0; border-left: 1px solid var(--ui-border);
  box-shadow: var(--ui-shadow-lg);
}
.drawer[open] { display: flex; animation: drawer-in 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer::backdrop { background: rgb(0 0 0 / 0.4); }
@keyframes drawer-in { from { transform: translateX(100%); } }
.drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--ui-border); }
.drawer-head h2 { margin: 0; font-size: 18px; }
.drawer-x { display: grid; place-items: center; width: 36px; height: 36px; color: var(--ui-muted); background: none; border: 0; border-radius: 8px; cursor: pointer; }
.drawer-x svg { width: 18px; height: 18px; }
.drawer-x:hover { background: var(--ui-surface-2); color: var(--ui-text); }
.drawer-x:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.drawer-body { flex: 1; overflow-y: auto; padding: 8px 20px; }
.drawer-set { display: grid; gap: 10px; margin: 16px 0; padding: 0; border: 0; }
.drawer-set legend { margin-bottom: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ui-muted); }
.drawer-set label { display: flex; align-items: center; gap: 10px; font-size: 15px; }
.drawer-set input { width: 18px; height: 18px; accent-color: var(--ui-accent); }
.drawer-foot { display: flex; gap: 10px; padding: 16px 20px; border-top: 1px solid var(--ui-border); }
.drawer-foot .btn { flex: 1; }
@media (prefers-reduced-motion: reduce) { .drawer[open] { animation: none; } }`,
      setup: `const dialog = root.querySelector('.drawer');
const open = root.querySelector('[data-open]');
const onOpen = () => dialog.showModal();
const onClick = (e) => {
  if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
};
open.addEventListener('click', onOpen);
dialog.addEventListener('click', onClick);
return () => { open.removeEventListener('click', onOpen); dialog.removeEventListener('click', onClick); };`,
    },

    /* ───────── Popover ───────── */
    {
      id: 'popover',
      name: 'Popover',
      category: 'Overlays',
      description: 'A small anchored card for extra detail, using the native popover attribute: no JavaScript.',
      notes: 'The browser handles opening, light-dismiss (click outside) and Esc. Unlike a tooltip it can hold links and buttons, so it is fine on touch screens.',
      minHeight: 300,
      html: `<div class="pop-demo">
  <button class="pop-trigger" type="button" popovertarget="pop-share">Who can see this?</button>
  <div class="pop" id="pop-share" popover>
    <p class="pop-title">Visible to your team</p>
    <p class="pop-text">Everyone in “Design” can view and comment. Only editors can make changes.</p>
    <button class="pop-close" type="button" popovertarget="pop-share" popovertargetaction="hide">Got it</button>
  </div>
</div>`,
      css: `.pop-demo { position: relative; }
.pop-trigger {
  font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-accent);
  background: none; border: 0; padding: 6px 4px; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px; cursor: pointer;
}
.pop-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.pop {
  width: 280px; margin: auto; padding: 16px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.pop:popover-open { animation: pop-in 0.18s ease-out; }
@media (prefers-reduced-motion: reduce) { .pop:popover-open { animation: none; } }
@keyframes pop-in { from { opacity: 0; transform: translateY(6px); } }
.pop-title { margin: 0 0 4px; font-weight: 700; }
.pop-text { margin: 0 0 12px; font-size: 14px; color: var(--ui-muted); }
.pop-close {
  padding: 7px 12px; font: inherit; font-size: 13px; font-weight: 600;
  color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 6px; cursor: pointer;
}
.pop-close:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
    },

    /* ───────── Context menu ───────── */
    {
      id: 'context-menu',
      name: 'Context menu',
      category: 'Overlays',
      description: 'Right-click (or long-press, or the Menu key) on the card to get a menu of actions at the pointer.',
      notes: 'Never make a context menu the only way to reach an action; it is a shortcut. Keyboard users open it with Shift+F10 or the Menu key, then use arrow keys.',
      minHeight: 300,
      root: '.ctx',
      html: `<div class="ctx">
  <div class="ctx-target" tabindex="0" aria-describedby="ctx-hint">
    <p class="ctx-file">Quarterly report.pdf</p>
    <p class="ctx-hint" id="ctx-hint">Right-click, long-press, or press Shift+F10 for actions</p>
  </div>
  <div class="ctx-menu" role="menu" aria-label="File actions" hidden>
    <button role="menuitem" type="button" tabindex="-1">Open</button>
    <button role="menuitem" type="button" tabindex="-1">Rename</button>
    <button role="menuitem" type="button" tabindex="-1">Download</button>
    <button role="menuitem" type="button" tabindex="-1" class="ctx-danger">Delete</button>
  </div>
</div>`,
      css: `.ctx { position: relative; width: 100%; max-width: 420px; }
.ctx-target {
  padding: 28px 24px; text-align: center; user-select: none;
  background: var(--ui-surface); border: 1.5px dashed var(--ui-border-strong); border-radius: var(--ui-radius);
}
.ctx-target:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.ctx-file { margin: 0 0 4px; font-weight: 700; }
.ctx-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
.ctx-menu {
  position: absolute; z-index: 10; min-width: 180px; padding: 6px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.ctx-menu button {
  display: block; width: 100%; padding: 9px 10px; text-align: start;
  font: inherit; font-size: 14px; color: var(--ui-text); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.ctx-menu button:hover, .ctx-menu button:focus { outline: none; background: var(--ui-surface-2); }
.ctx-menu .ctx-danger { color: var(--ui-danger); }`,
      setup: `const target = root.querySelector('.ctx-target');
const menu = root.querySelector('.ctx-menu');
const items = [...menu.querySelectorAll('[role="menuitem"]')];
let pressTimer;

const openAt = (x, y) => {
  const r = root.getBoundingClientRect();
  menu.hidden = false;
  menu.style.left = Math.min(x - r.left, r.width - menu.offsetWidth) + 'px';
  menu.style.top = (y - r.top) + 'px';
  items[0].focus();
};
const close = (refocus) => {
  if (menu.hidden) return;
  menu.hidden = true;
  if (refocus) target.focus();
};
const onContext = (e) => { e.preventDefault(); openAt(e.clientX, e.clientY); };
const onKey = (e) => {
  if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
    e.preventDefault();
    const r = target.getBoundingClientRect();
    openAt(r.left + 24, r.top + r.height / 2);
  }
};
const onMenuKey = (e) => {
  const i = items.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  else if (e.key === 'Escape' || e.key === 'Tab') close(true);
};
const onPick = () => close(true);
const onDoc = (e) => { if (!menu.contains(e.target)) close(false); };
const onDown = (e) => { if (e.pointerType === 'touch') pressTimer = setTimeout(() => openAt(e.clientX, e.clientY), 550); };
const cancelPress = () => clearTimeout(pressTimer);

target.addEventListener('contextmenu', onContext);
target.addEventListener('keydown', onKey);
target.addEventListener('pointerdown', onDown);
target.addEventListener('pointerup', cancelPress);
target.addEventListener('pointermove', cancelPress);
menu.addEventListener('keydown', onMenuKey);
items.forEach((b) => b.addEventListener('click', onPick));
document.addEventListener('pointerdown', onDoc);
return () => {
  target.removeEventListener('contextmenu', onContext);
  target.removeEventListener('keydown', onKey);
  target.removeEventListener('pointerdown', onDown);
  target.removeEventListener('pointerup', cancelPress);
  target.removeEventListener('pointermove', cancelPress);
  menu.removeEventListener('keydown', onMenuKey);
  items.forEach((b) => b.removeEventListener('click', onPick));
  document.removeEventListener('pointerdown', onDoc);
};`,
    },

    /* ───────── Cookie banner ───────── */
    {
      id: 'cookie-banner',
      name: 'Honest cookie banner',
      category: 'Overlays',
      description: 'A consent banner where saying no is exactly as easy as saying yes.',
      notes: 'Reject and Accept get equal size and weight, and nothing is pre-ticked. That is not just polite: GDPR guidance treats a buried “reject” as invalid consent. It never blocks the page.',
      layout: 'full',
      root: '.consent',
      html: `<section class="consent" aria-labelledby="consent-title">
  <div class="consent-text">
    <h2 id="consent-title">Cookies, briefly</h2>
    <p>We use essential cookies to keep you signed in. With your OK we would also like to measure which pages are useful. No ads, no selling data.</p>
  </div>
  <div class="consent-actions">
    <button class="btn btn-secondary" type="button" data-choice="reject">Reject optional</button>
    <button class="btn btn-secondary" type="button" data-choice="accept">Accept all</button>
    <a class="consent-link" href="#">Choose what to allow</a>
  </div>
  <p class="consent-done" aria-live="polite"></p>
</section>`,
      css: `${BTN}
.consent {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;
  max-width: 900px; margin: 0 auto; padding: 20px 24px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.consent-text { flex: 1 1 340px; }
.consent-text h2 { margin: 0 0 4px; font-size: 17px; }
.consent-text p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.consent-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.consent-actions .btn { min-width: 140px; }
.consent-link { font-size: 14px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
.consent-done { flex-basis: 100%; margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-success); }
.consent-done:empty { display: none; }`,
      setup: `const done = root.querySelector('.consent-done');
const buttons = root.querySelectorAll('[data-choice]');
const onChoice = (e) => {
  const accepted = e.currentTarget.dataset.choice === 'accept';
  // Store the choice, e.g. localStorage.setItem('consent', accepted ? 'all' : 'essential')
  done.textContent = accepted ? 'Thanks. Optional cookies are on; change this any time in Settings.' : 'Done. Only essential cookies will be used.';
};
buttons.forEach((b) => b.addEventListener('click', onChoice));
return () => buttons.forEach((b) => b.removeEventListener('click', onChoice));`,
    },

    /* ───────── Command palette ───────── */
    {
      id: 'command-palette',
      name: 'Command palette',
      category: 'Overlays',
      description: 'A searchable list of actions on Ctrl/⌘ K, driven entirely by the keyboard.',
      notes: 'It is a combobox: focus stays in the input while arrow keys move the highlighted option (aria-activedescendant). Always also offer these actions somewhere visible.',
      minHeight: 460,
      root: '.palette',
      html: `<div class="palette">
  <button class="btn btn-secondary" type="button" data-open>${I('M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12ZM13.5 13.5 17 17')} Search commands <kbd>Ctrl K</kbd></button>
  <dialog class="pal-dialog" aria-label="Command palette">
    <input class="pal-input" type="text" role="combobox" aria-label="Search commands" aria-expanded="true" aria-controls="pal-list" aria-autocomplete="list" placeholder="Type a command…" autocomplete="off" spellcheck="false">
    <ul class="pal-list" id="pal-list" role="listbox" aria-label="Commands">
      <li role="option" data-cmd="New file">New file <kbd>N</kbd></li>
      <li role="option" data-cmd="Open recent">Open recent <kbd>R</kbd></li>
      <li role="option" data-cmd="Invite teammate">Invite teammate</li>
      <li role="option" data-cmd="Switch theme">Switch theme <kbd>T</kbd></li>
      <li role="option" data-cmd="Export as PDF">Export as PDF</li>
      <li role="option" data-cmd="Keyboard shortcuts">Keyboard shortcuts <kbd>?</kbd></li>
    </ul>
    <p class="pal-empty" hidden>No commands match.</p>
  </dialog>
  <p class="pal-out" aria-live="polite"></p>
</div>`,
      css: `${BTN}
.palette { display: grid; justify-items: center; gap: 12px; }
.palette kbd, .pal-list kbd {
  padding: 1px 6px; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: var(--ui-muted);
  border: 1px solid var(--ui-border-strong); border-bottom-width: 2px; border-radius: 4px;
}
.pal-dialog {
  width: min(520px, calc(100vw - 32px)); margin: 10vh auto auto; padding: 8px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 14px; box-shadow: var(--ui-shadow-lg);
}
.pal-dialog::backdrop { background: rgb(0 0 0 / 0.35); }
.pal-input {
  width: 100%; padding: 14px 14px; font: inherit; font-size: 17px; color: var(--ui-text);
  background: none; border: 0; border-bottom: 1px solid var(--ui-border); outline: none;
}
.pal-list { max-height: 280px; overflow-y: auto; margin: 6px 0 0; padding: 0; list-style: none; }
.pal-list li { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; font-size: 15px; border-radius: 8px; cursor: pointer; }
.pal-list li[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.pal-list li[aria-selected="true"] kbd { color: inherit; border-color: currentColor; }
.pal-list li[hidden] { display: none; }
.pal-empty { margin: 0; padding: 16px 12px; color: var(--ui-muted); }
.pal-out { margin: 0; min-height: 1.5em; font-size: 14px; color: var(--ui-muted); }`,
      setup: `const dialog = root.querySelector('.pal-dialog');
const input = root.querySelector('.pal-input');
const options = [...root.querySelectorAll('[role="option"]')];
const empty = root.querySelector('.pal-empty');
const out = root.querySelector('.pal-out');
const openBtn = root.querySelector('[data-open]');
let visible = options;
let active = 0;
options.forEach((o, i) => (o.id = 'pal-opt-' + i));

const highlight = (i) => {
  active = Math.max(0, Math.min(visible.length - 1, i));
  options.forEach((o) => o.setAttribute('aria-selected', 'false'));
  const o = visible[active];
  if (o) { o.setAttribute('aria-selected', 'true'); o.scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', o.id); }
  else input.removeAttribute('aria-activedescendant');
};
const filter = () => {
  const q = input.value.trim().toLowerCase();
  visible = options.filter((o) => { const ok = o.dataset.cmd.toLowerCase().includes(q); o.hidden = !ok; return ok; });
  empty.hidden = visible.length > 0;
  highlight(0);
};
const run = (o) => { if (!o) return; dialog.close(); out.textContent = 'Ran: ' + o.dataset.cmd; };
const open = () => { input.value = ''; filter(); dialog.showModal(); input.focus(); };
const onKey = (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); highlight(active + 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(active - 1); }
  else if (e.key === 'Enter') { e.preventDefault(); run(visible[active]); }
};
const onGlobal = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); } };
const onList = (e) => run(e.target.closest('[role="option"]'));
const onBackdrop = (e) => { if (e.target === dialog) dialog.close(); };

openBtn.addEventListener('click', open);
input.addEventListener('input', filter);
input.addEventListener('keydown', onKey);
dialog.addEventListener('click', onList);
dialog.addEventListener('click', onBackdrop);
document.addEventListener('keydown', onGlobal);
return () => {
  openBtn.removeEventListener('click', open);
  input.removeEventListener('input', filter);
  input.removeEventListener('keydown', onKey);
  dialog.removeEventListener('click', onList);
  dialog.removeEventListener('click', onBackdrop);
  document.removeEventListener('keydown', onGlobal);
};`,
    },

    /* ───────── Combobox ───────── */
    {
      id: 'combobox',
      name: 'Autocomplete',
      category: 'Forms',
      description: 'A text field that suggests matching options as you type, with full keyboard control.',
      notes: 'Follows the WAI-ARIA combobox pattern: focus stays in the input, arrows move through suggestions, Enter picks, Esc closes. People can still type a value that is not in the list.',
      minHeight: 340,
      root: '.combo',
      html: `<div class="combo">
  <label class="combo-label" for="combo-city">City</label>
  <div class="combo-wrap">
    <input class="combo-input" id="combo-city" type="text" role="combobox" aria-expanded="false" aria-controls="combo-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing, e.g. “am”">
    <ul class="combo-list" id="combo-list" role="listbox" aria-label="Cities" hidden></ul>
  </div>
</div>`,
      css: `.combo { display: grid; gap: 6px; width: 100%; max-width: 340px; }
.combo-label { font-size: 14px; font-weight: 600; }
.combo-wrap { position: relative; }
.combo-input {
  width: 100%; min-height: 42px; padding: 10px 12px; font: inherit; font-size: 15px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.combo-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.combo-list {
  position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 10; max-height: 220px; overflow-y: auto;
  margin: 0; padding: 6px; list-style: none;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.combo-list li { padding: 9px 10px; font-size: 15px; border-radius: 6px; cursor: pointer; }
.combo-list li mark { color: inherit; background: none; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.combo-list li[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }`,
      setup: `const CITIES = ['Amman', 'Amsterdam', 'Athens', 'Auckland', 'Bangkok', 'Barcelona', 'Berlin', 'Bogotá', 'Cairo', 'Cape Town', 'Dubai', 'Istanbul', 'Lagos', 'Lisbon', 'London', 'Madrid', 'Mexico City', 'Montreal', 'Nairobi', 'Oslo', 'Paris', 'Seoul', 'Tokyo', 'Toronto'];
const input = root.querySelector('.combo-input');
const list = root.querySelector('.combo-list');
let matches = [];
let active = -1;

const show = (open) => { list.hidden = !open; input.setAttribute('aria-expanded', String(open)); };
const highlight = (i) => {
  active = i;
  [...list.children].forEach((li, n) => li.setAttribute('aria-selected', String(n === i)));
  const li = list.children[i];
  if (li) { input.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
  else input.removeAttribute('aria-activedescendant');
};
const render = () => {
  const q = input.value.trim().toLowerCase();
  matches = q ? CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8) : [];
  list.replaceChildren(...matches.map((c, i) => {
    const li = document.createElement('li');
    li.id = 'combo-opt-' + i;
    li.setAttribute('role', 'option');
    const at = c.toLowerCase().indexOf(q);
    const mark = document.createElement('mark');
    mark.textContent = c.slice(at, at + q.length);
    li.append(c.slice(0, at), mark, c.slice(at + q.length));
    return li;
  }));
  show(matches.length > 0);
  highlight(-1);
};
const pick = (i) => { if (i < 0) return; input.value = matches[i]; show(false); };
const onKey = (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); highlight(Math.min(active + 1, matches.length - 1)); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
  else if (e.key === 'Enter' && !list.hidden && active >= 0) { e.preventDefault(); pick(active); }
  else if (e.key === 'Escape') show(false);
};
const onClick = (e) => { const li = e.target.closest('li'); if (li) pick([...list.children].indexOf(li)); };
const onBlur = () => setTimeout(() => show(false), 120);

input.addEventListener('input', render);
input.addEventListener('keydown', onKey);
input.addEventListener('blur', onBlur);
list.addEventListener('pointerdown', (e) => e.preventDefault());
list.addEventListener('click', onClick);
return () => {
  input.removeEventListener('input', render);
  input.removeEventListener('keydown', onKey);
  input.removeEventListener('blur', onBlur);
  list.removeEventListener('click', onClick);
};`,
    },

    /* ───────── Tag input ───────── */
    {
      id: 'tag-input',
      name: 'Tag input',
      category: 'Forms',
      description: 'Type a word and press Enter or comma to turn it into a removable tag.',
      notes: 'Backspace in the empty field removes the last tag. Each tag’s remove button names the tag (“Remove design”), and changes are announced.',
      root: '.tags',
      html: `<div class="tags">
  <label class="tags-label" for="tags-new">Topics</label>
  <div class="tags-box">
    <ul class="tags-list" aria-label="Added topics"></ul>
    <input class="tags-input" id="tags-new" type="text" placeholder="Add a topic" enterkeyhint="done" autocomplete="off">
  </div>
  <p class="tags-hint">Press Enter or comma to add. Up to 6.</p>
  <span class="tags-live" aria-live="polite"></span>
</div>`,
      css: `.tags { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.tags-label { font-size: 14px; font-weight: 600; }
.tags-box {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 46px; padding: 6px 8px;
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: text;
}
.tags-box:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.tags-list { display: contents; margin: 0; padding: 0; list-style: none; }
.tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 3px 4px 3px 10px;
  font-size: 14px; font-weight: 600; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px;
}
.tag button {
  display: grid; place-items: center; width: 22px; height: 22px; padding: 0;
  color: inherit; background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.tag button:hover { background: rgb(127 127 127 / 0.2); }
.tag button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tag svg { width: 14px; height: 14px; }
.tags-input { flex: 1; min-width: 120px; padding: 6px 4px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; outline: none; }
.tags-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
.tags-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }`,
      setup: `const list = root.querySelector('.tags-list');
const input = root.querySelector('.tags-input');
const live = root.querySelector('.tags-live');
const box = root.querySelector('.tags-box');
const MAX = 6;
const tags = ['design', 'accessibility'];

const render = () => {
  list.replaceChildren(...tags.map((t) => {
    const li = document.createElement('li');
    li.className = 'tag';
    li.textContent = t;
    const x = document.createElement('button');
    x.type = 'button';
    x.setAttribute('aria-label', 'Remove ' + t);
    x.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    x.addEventListener('click', () => remove(t));
    li.append(x);
    return li;
  }));
  input.disabled = tags.length >= MAX;
  input.placeholder = tags.length >= MAX ? 'Limit reached' : 'Add a topic';
};
const add = (raw) => {
  const t = raw.trim().toLowerCase();
  if (!t || tags.includes(t) || tags.length >= MAX) return;
  tags.push(t);
  render();
  live.textContent = 'Added ' + t;
};
const remove = (t) => {
  tags.splice(tags.indexOf(t), 1);
  render();
  live.textContent = 'Removed ' + t;
  input.focus();
};
const onKey = (e) => {
  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input.value); input.value = ''; }
  else if (e.key === 'Backspace' && !input.value && tags.length) remove(tags[tags.length - 1]);
};
const onBox = (e) => { if (e.target === box) input.focus(); };
input.addEventListener('keydown', onKey);
box.addEventListener('click', onBox);
render();
return () => { input.removeEventListener('keydown', onKey); box.removeEventListener('click', onBox); };`,
    },

    /* ───────── Date input ───────── */
    {
      id: 'date-range',
      name: 'Date range',
      category: 'Forms',
      description: 'Start and end dates using the native date input, styled to match, with the end kept after the start.',
      notes: 'Native date inputs give every phone its own good picker and handle locales for free. Only build a custom calendar when you need to show availability on it.',
      root: '.dates',
      html: `<fieldset class="dates">
  <legend>Trip dates</legend>
  <div class="dates-row">
    <label class="date-field">
      <span>Check-in</span>
      <input class="date-in" type="date" value="2026-12-18">
    </label>
    <span class="dates-arrow" aria-hidden="true">${I('M4 10h12M11 5l5 5-5 5')}</span>
    <label class="date-field">
      <span>Check-out</span>
      <input class="date-out" type="date" value="2026-12-22">
    </label>
  </div>
  <p class="dates-sum" aria-live="polite">4 nights</p>
</fieldset>`,
      css: `.dates { margin: 0; padding: 0; border: 0; }
.dates legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; }
.dates-row { display: flex; align-items: end; gap: 10px; flex-wrap: wrap; }
.date-field { display: grid; gap: 4px; font-size: 13px; color: var(--ui-muted); }
.date-field input {
  min-height: 42px; padding: 8px 10px; font: inherit; font-size: 15px; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  color-scheme: light dark;
}
.date-field input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.dates-arrow { padding-bottom: 10px; color: var(--ui-muted); }
.dates-arrow svg { width: 18px; height: 18px; }
.dates-sum { margin: 8px 0 0; font-size: 14px; font-weight: 600; color: var(--ui-accent); }`,
      setup: `const start = root.querySelector('.date-in');
const end = root.querySelector('.date-out');
const sum = root.querySelector('.dates-sum');
const update = () => {
  end.min = start.value;
  if (end.value && end.value <= start.value) {
    const d = new Date(start.value);
    d.setDate(d.getDate() + 1);
    end.value = d.toISOString().slice(0, 10);
  }
  const nights = Math.round((new Date(end.value) - new Date(start.value)) / 86400000);
  sum.textContent = nights > 0 ? nights + (nights === 1 ? ' night' : ' nights') : 'Pick your dates';
};
start.addEventListener('change', update);
end.addEventListener('change', update);
update();
return () => { start.removeEventListener('change', update); end.removeEventListener('change', update); };`,
    },

    /* ───────── Multi-step form ───────── */
    {
      id: 'multi-step-form',
      name: 'Multi-step form',
      category: 'Forms',
      description: 'A short sign-up split into three steps with progress, back and next, and focus moved to each new step.',
      notes: 'Split long forms only where the steps are genuinely different topics. Show how many steps there are, let people go back without losing answers, and move focus to the new step heading.',
      root: '.wizard',
      html: `<form class="wizard" novalidate>
  <p class="wiz-progress"><span class="wiz-count">Step 1 of 3</span><span class="wiz-bar"><span></span></span></p>
  <fieldset class="wiz-step">
    <legend tabindex="-1">About you</legend>
    <label>Full name <input type="text" autocomplete="name" required></label>
    <label>Email <input type="email" autocomplete="email" required></label>
  </fieldset>
  <fieldset class="wiz-step" hidden>
    <legend tabindex="-1">Your team</legend>
    <label>Team name <input type="text" autocomplete="organization"></label>
    <label>Team size
      <select><option>Just me</option><option>2–10</option><option>11–50</option><option>51+</option></select>
    </label>
  </fieldset>
  <fieldset class="wiz-step" hidden>
    <legend tabindex="-1">All set</legend>
    <p class="wiz-done">Check your answers, then create your workspace. You can change everything later.</p>
  </fieldset>
  <div class="wiz-nav">
    <button class="btn btn-secondary" type="button" data-back hidden>Back</button>
    <button class="btn btn-primary" type="button" data-next>Continue</button>
  </div>
</form>`,
      css: `${BTN}
.wizard {
  display: grid; gap: 16px; width: 100%; max-width: 400px; padding: 22px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius);
}
.wiz-progress { display: grid; gap: 6px; margin: 0; font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.wiz-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.wiz-bar span { display: block; height: 100%; width: 33.3%; background: var(--ui-accent); border-radius: inherit; transition: width 0.3s; }
.wiz-step { display: grid; gap: 14px; margin: 0; padding: 0; border: 0; }
.wiz-step legend { margin-bottom: 4px; font-size: 18px; font-weight: 700; }
.wiz-step legend:focus { outline: none; }
.wiz-step label { display: grid; gap: 6px; font-size: 14px; font-weight: 600; }
.wiz-step input, .wiz-step select {
  min-height: 42px; padding: 8px 12px; font: inherit; font-size: 15px; font-weight: 400; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.wiz-step input:focus, .wiz-step select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.wiz-step input[aria-invalid="true"] { border-color: var(--ui-danger); }
.wiz-done { margin: 0; color: var(--ui-muted); }
.wiz-nav { display: flex; justify-content: flex-end; gap: 10px; }
.wizard [hidden] { display: none !important; }`,
      setup: `const steps = [...root.querySelectorAll('.wiz-step')];
const back = root.querySelector('[data-back]');
const next = root.querySelector('[data-next]');
const count = root.querySelector('.wiz-count');
const bar = root.querySelector('.wiz-bar span');
let at = 0;

const go = (i) => {
  at = i;
  steps.forEach((s, n) => (s.hidden = n !== i));
  back.hidden = i === 0;
  next.textContent = i === steps.length - 1 ? 'Create workspace' : 'Continue';
  count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
  bar.style.width = ((i + 1) / steps.length) * 100 + '%';
  steps[i].querySelector('legend').focus();
};
const valid = () => {
  let ok = true;
  steps[at].querySelectorAll('input[required]').forEach((inp) => {
    const bad = !inp.checkValidity();
    inp.setAttribute('aria-invalid', String(bad));
    if (bad && ok) { inp.focus(); ok = false; }
  });
  return ok;
};
const onNext = () => {
  if (!valid()) return;
  if (at < steps.length - 1) go(at + 1);
  else { count.textContent = 'Workspace created'; next.disabled = true; }
};
const onBack = () => go(at - 1);
next.addEventListener('click', onNext);
back.addEventListener('click', onBack);
return () => { next.removeEventListener('click', onNext); back.removeEventListener('click', onBack); };`,
    },

    /* ───────── Textarea with counter ───────── */
    {
      id: 'textarea-counter',
      name: 'Textarea with counter',
      category: 'Forms',
      description: 'A comment box that grows with its text and counts down the characters left.',
      notes: 'The live count is announced only near the limit so screen readers are not flooded on every keystroke. Over the limit, the field explains how to fix it instead of silently cutting text.',
      root: '.counted',
      html: `<div class="counted">
  <label class="counted-label" for="bio">Short bio</label>
  <textarea class="counted-input" id="bio" rows="3" aria-describedby="bio-count">I design calm interfaces for busy people.</textarea>
  <p class="counted-meta"><span>Shown on your public profile.</span><span class="counted-count" id="bio-count" aria-live="polite"></span></p>
</div>`,
      css: `.counted { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.counted-label { font-size: 14px; font-weight: 600; }
.counted-input {
  width: 100%; min-height: 90px; padding: 10px 12px; resize: none; overflow: hidden;
  font: inherit; font-size: 15px; line-height: 1.5; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  field-sizing: content;
}
.counted-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.counted-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.counted-meta { display: flex; justify-content: space-between; gap: 12px; margin: 0; font-size: 13px; color: var(--ui-muted); }
.counted-count { font-variant-numeric: tabular-nums; white-space: nowrap; }
.counted-count.is-near { color: var(--ui-warning); font-weight: 600; }
.counted-count.is-over { color: var(--ui-danger); font-weight: 700; }`,
      setup: `const MAX = 120;
const input = root.querySelector('.counted-input');
const count = root.querySelector('.counted-count');
const update = () => {
  input.style.height = 'auto';
  input.style.height = input.scrollHeight + 'px';
  const left = MAX - input.value.length;
  count.classList.toggle('is-near', left <= 20 && left >= 0);
  count.classList.toggle('is-over', left < 0);
  input.setAttribute('aria-invalid', String(left < 0));
  count.textContent = left < 0 ? Math.abs(left) + ' over the limit, please shorten it' : left + ' characters left';
  // only speak up near the limit
  count.setAttribute('aria-live', left <= 20 ? 'polite' : 'off');
};
input.addEventListener('input', update);
update();
return () => input.removeEventListener('input', update);`,
    }
  );
})();
