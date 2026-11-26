# Side drawer (Tearsheet, Overlays)

A panel that slides in from the edge for filters or secondary tasks, built on <dialog>.

**Why it works:** The native dialog traps focus and closes on Esc. Clicking the dimmed backdrop also closes it. Use a drawer for tasks that keep the page in context; use a page for long ones.

**Checked:** axe clean in light and dark; tightest text contrast 16.1:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html -->
<div class="drawer-demo">
  <button class="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M6 10h8M8 15h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Filters</button>
  <dialog class="drawer" aria-labelledby="drawer-title">
    <div class="drawer-head">
      <h2 id="drawer-title">Filters</h2>
      <button class="drawer-x" type="button" aria-label="Close filters" data-close><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
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
</div>
```

`styles.css`

```css
/* tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html */
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
@media (prefers-reduced-motion: reduce) { .drawer[open] { animation: none; } }
```

`script.js`

```js
/* tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html */
function setup(root) {
  const dialog = root.querySelector('.drawer');
  const open = root.querySelector('[data-open]');
  const onOpen = () => dialog.showModal();
  const onClick = (e) => {
    if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
  };
  open.addEventListener('click', onOpen);
  dialog.addEventListener('click', onClick);
  return () => { open.removeEventListener('click', onOpen); dialog.removeEventListener('click', onClick); };
}

document.querySelectorAll(".drawer-demo").forEach(setup);
```

## React

`Drawer.jsx`

```jsx
/* tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html */
import { useEffect, useRef } from 'react';
import './Drawer.css';

function setup(root) {
  const dialog = root.querySelector('.drawer');
  const open = root.querySelector('[data-open]');
  const onOpen = () => dialog.showModal();
  const onClick = (e) => {
    if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
  };
  open.addEventListener('click', onOpen);
  dialog.addEventListener('click', onClick);
  return () => { open.removeEventListener('click', onOpen); dialog.removeEventListener('click', onClick); };
}

export function Drawer() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="drawer-demo">
      <button className="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M6 10h8M8 15h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Filters</button>
      <dialog className="drawer" aria-labelledby="drawer-title">
        <div className="drawer-head">
          <h2 id="drawer-title">Filters</h2>
          <button className="drawer-x" type="button" aria-label="Close filters" data-close><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
        <div className="drawer-body">
          <fieldset className="drawer-set">
            <legend>Status</legend>
            <label><input type="checkbox" defaultChecked /> Active</label>
            <label><input type="checkbox" /> Paused</label>
            <label><input type="checkbox" /> Archived</label>
          </fieldset>
          <fieldset className="drawer-set">
            <legend>Sort by</legend>
            <label><input type="radio" name="sort" defaultChecked /> Newest first</label>
            <label><input type="radio" name="sort" /> Oldest first</label>
          </fieldset>
        </div>
        <div className="drawer-foot">
          <button className="btn btn-secondary" type="button" data-close>Clear all</button>
          <button className="btn btn-primary" type="button" data-close>Show 24 results</button>
        </div>
      </dialog>
    </div>
  );
}
```

`Drawer.css`

```css
/* tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html */
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
@media (prefers-reduced-motion: reduce) { .drawer[open] { animation: none; } }
```

## Vue

`Drawer.vue`

```vue
<!-- tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const dialog = root.querySelector('.drawer');
  const open = root.querySelector('[data-open]');
  const onOpen = () => dialog.showModal();
  const onClick = (e) => {
    if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
  };
  open.addEventListener('click', onOpen);
  dialog.addEventListener('click', onClick);
  return () => { open.removeEventListener('click', onOpen); dialog.removeEventListener('click', onClick); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="drawer-demo">
    <button class="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M6 10h8M8 15h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Filters</button>
    <dialog class="drawer" aria-labelledby="drawer-title">
      <div class="drawer-head">
        <h2 id="drawer-title">Filters</h2>
        <button class="drawer-x" type="button" aria-label="Close filters" data-close><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
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
@media (prefers-reduced-motion: reduce) { .drawer[open] { animation: none; } }
</style>
```

## Svelte

`Drawer.svelte`

```svelte
<!-- tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html -->
<script>
  import { onMount } from 'svelte';
  import './Drawer.css';

  let node;

  function setup(root) {
    const dialog = root.querySelector('.drawer');
    const open = root.querySelector('[data-open]');
    const onOpen = () => dialog.showModal();
    const onClick = (e) => {
      if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
    };
    open.addEventListener('click', onOpen);
    dialog.addEventListener('click', onClick);
    return () => { open.removeEventListener('click', onOpen); dialog.removeEventListener('click', onClick); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="drawer-demo">
  <button class="btn btn-secondary" type="button" data-open><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M6 10h8M8 15h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Filters</button>
  <dialog class="drawer" aria-labelledby="drawer-title">
    <div class="drawer-head">
      <h2 id="drawer-title">Filters</h2>
      <button class="drawer-x" type="button" aria-label="Close filters" data-close><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
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
</div>
```

`Drawer.css`

```css
/* tearsheet drawer v016ae6d4 · https://qusaialjbali.github.io/tearsheet/zine/parts/drawer.html */
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
@media (prefers-reduced-motion: reduce) { .drawer[open] { animation: none; } }
```
