# Context menu (Tearsheet, Overlays)

Right-click (or long-press, or the Menu key) on the card to get a menu of actions at the pointer.

**Why it works:** Never make a context menu the only way to reach an action; it is a shortcut. Keyboard users open it with Shift+F10 or the Menu key, then use arrow keys.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html -->
<div class="ctx">
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
</div>
```

`styles.css`

```css
/* tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html */
.ctx { position: relative; width: 100%; max-width: 420px; }
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
.ctx-menu .ctx-danger { color: var(--ui-danger); }
```

`script.js`

```js
/* tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html */
function setup(root) {
  const target = root.querySelector('.ctx-target');
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
  };
}

document.querySelectorAll(".ctx").forEach(setup);
```

## React

`ContextMenu.jsx`

```jsx
/* tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html */
import { useEffect, useRef } from 'react';
import './ContextMenu.css';

function setup(root) {
  const target = root.querySelector('.ctx-target');
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
  };
}

export function ContextMenu() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="ctx">
      <div className="ctx-target" tabIndex={0} aria-describedby="ctx-hint">
        <p className="ctx-file">Quarterly report.pdf</p>
        <p className="ctx-hint" id="ctx-hint">Right-click, long-press, or press Shift+F10 for actions</p>
      </div>
      <div className="ctx-menu" role="menu" aria-label="File actions" hidden>
        <button role="menuitem" type="button" tabIndex={-1}>Open</button>
        <button role="menuitem" type="button" tabIndex={-1}>Rename</button>
        <button role="menuitem" type="button" tabIndex={-1}>Download</button>
        <button role="menuitem" type="button" tabIndex={-1} className="ctx-danger">Delete</button>
      </div>
    </div>
  );
}
```

`ContextMenu.css`

```css
/* tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html */
.ctx { position: relative; width: 100%; max-width: 420px; }
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
.ctx-menu .ctx-danger { color: var(--ui-danger); }
```

## Vue

`ContextMenu.vue`

```vue
<!-- tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const target = root.querySelector('.ctx-target');
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
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="ctx">
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
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.ctx { position: relative; width: 100%; max-width: 420px; }
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
.ctx-menu .ctx-danger { color: var(--ui-danger); }
</style>
```

## Svelte

`ContextMenu.svelte`

```svelte
<!-- tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html -->
<script>
  import { onMount } from 'svelte';
  import './ContextMenu.css';

  let node;

  function setup(root) {
    const target = root.querySelector('.ctx-target');
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
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="ctx">
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
</div>
```

`ContextMenu.css`

```css
/* tearsheet context-menu vfb2dad70 · https://qusaialjbali.github.io/tearsheet/zine/parts/context-menu.html */
.ctx { position: relative; width: 100%; max-width: 420px; }
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
.ctx-menu .ctx-danger { color: var(--ui-danger); }
```
