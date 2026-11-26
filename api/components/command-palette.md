# Command palette (Tearsheet, Overlays)

A searchable list of actions on Ctrl/⌘ K, driven entirely by the keyboard.

**Why it works:** It is a combobox: focus stays in the input while arrow keys move the highlighted option (aria-activedescendant). Always also offer these actions somewhere visible.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html -->
<div class="palette">
  <button class="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12ZM13.5 13.5 17 17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Search commands <kbd>Ctrl K</kbd></button>
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
</div>
```

`styles.css`

```css
/* tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html */
.btn {
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
.btn-secondary:hover { background: var(--ui-surface-2); }
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
.pal-out { margin: 0; min-height: 1.5em; font-size: 14px; color: var(--ui-muted); }
```

`script.js`

```js
/* tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html */
function setup(root) {
  const dialog = root.querySelector('.pal-dialog');
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
  };
}

document.querySelectorAll(".palette").forEach(setup);
```

## React

`CommandPalette.jsx`

```jsx
/* tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html */
import { useEffect, useRef } from 'react';
import './CommandPalette.css';

function setup(root) {
  const dialog = root.querySelector('.pal-dialog');
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
  };
}

export function CommandPalette() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="palette">
      <button className="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12ZM13.5 13.5 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Search commands <kbd>Ctrl K</kbd></button>
      <dialog className="pal-dialog" aria-label="Command palette">
        <input className="pal-input" type="text" role="combobox" aria-label="Search commands" aria-expanded="true" aria-controls="pal-list" aria-autocomplete="list" placeholder="Type a command…" autoComplete="off" spellCheck="false" />
        <ul className="pal-list" id="pal-list" role="listbox" aria-label="Commands">
          <li role="option" data-cmd="New file">New file <kbd>N</kbd></li>
          <li role="option" data-cmd="Open recent">Open recent <kbd>R</kbd></li>
          <li role="option" data-cmd="Invite teammate">Invite teammate</li>
          <li role="option" data-cmd="Switch theme">Switch theme <kbd>T</kbd></li>
          <li role="option" data-cmd="Export as PDF">Export as PDF</li>
          <li role="option" data-cmd="Keyboard shortcuts">Keyboard shortcuts <kbd>?</kbd></li>
        </ul>
        <p className="pal-empty" hidden>No commands match.</p>
      </dialog>
      <p className="pal-out" aria-live="polite"></p>
    </div>
  );
}
```

`CommandPalette.css`

```css
/* tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html */
.btn {
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
.btn-secondary:hover { background: var(--ui-surface-2); }
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
.pal-out { margin: 0; min-height: 1.5em; font-size: 14px; color: var(--ui-muted); }
```

## Vue

`CommandPalette.vue`

```vue
<!-- tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const dialog = root.querySelector('.pal-dialog');
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
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="palette">
    <button class="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12ZM13.5 13.5 17 17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Search commands <kbd>Ctrl K</kbd></button>
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
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.btn {
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
.btn-secondary:hover { background: var(--ui-surface-2); }
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
.pal-out { margin: 0; min-height: 1.5em; font-size: 14px; color: var(--ui-muted); }
</style>
```

## Svelte

`CommandPalette.svelte`

```svelte
<!-- tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html -->
<script>
  import { onMount } from 'svelte';
  import './CommandPalette.css';

  let node;

  function setup(root) {
    const dialog = root.querySelector('.pal-dialog');
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
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="palette">
  <button class="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12ZM13.5 13.5 17 17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Search commands <kbd>Ctrl K</kbd></button>
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
</div>
```

`CommandPalette.css`

```css
/* tearsheet command-palette ve52a0554 · https://qusaialjbali.github.io/tearsheet/zine/parts/command-palette.html */
.btn {
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
.btn-secondary:hover { background: var(--ui-surface-2); }
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
.pal-out { margin: 0; min-height: 1.5em; font-size: 14px; color: var(--ui-muted); }
```
