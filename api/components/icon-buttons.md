# Icon buttons (Tearsheet, Actions)

Round and square icon-only buttons in three sizes, plus a favourite toggle.

**Why it works:** An icon button must have an aria-label, and its hit area stays at least 40px even when the icon is small.

**Checked:** axe clean in light and dark; 5 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html -->
<div class="icon-row">
  <button class="icon-btn sm" type="button" aria-label="Edit"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn" type="button" aria-label="Share"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn lg solid" type="button" aria-label="Add item"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn square" type="button" aria-label="Settings"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16 10l1.5-1-1.5-2.6-1.7.5-1.3-.8-.5-1.6h-3l-.5 1.6-1.3.8-1.7-.5L2.5 9 4 10l-1.5 1 1.5 2.6 1.7-.5 1.3.8.5 1.6h3l.5-1.6 1.3-.8 1.7.5 1.5-2.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn fav" type="button" aria-label="Add to favourites" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16.5s-6-3.6-6-8A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6 2.5c0 4.4-6 8-6 8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
</div>
```

`styles.css`

```css
/* tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html */
.icon-row { display: flex; align-items: center; gap: 12px; }
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
.icon-btn.fav[aria-pressed="true"] svg { fill: currentColor; }
```

`script.js`

```js
/* tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html */
function setup(root) {
  const fav = root.querySelector('.fav');
  const onFav = () => {
    const on = fav.getAttribute('aria-pressed') !== 'true';
    fav.setAttribute('aria-pressed', String(on));
    fav.setAttribute('aria-label', on ? 'Remove from favourites' : 'Add to favourites');
  };
  fav.addEventListener('click', onFav);
  return () => fav.removeEventListener('click', onFav);
}

document.querySelectorAll(".icon-row").forEach(setup);
```

## React

`IconButtons.jsx`

```jsx
/* tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html */
import { useEffect, useRef } from 'react';
import './IconButtons.css';

function setup(root) {
  const fav = root.querySelector('.fav');
  const onFav = () => {
    const on = fav.getAttribute('aria-pressed') !== 'true';
    fav.setAttribute('aria-pressed', String(on));
    fav.setAttribute('aria-label', on ? 'Remove from favourites' : 'Add to favourites');
  };
  fav.addEventListener('click', onFav);
  return () => fav.removeEventListener('click', onFav);
}

export function IconButtons() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="icon-row">
      <button className="icon-btn sm" type="button" aria-label="Edit"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      <button className="icon-btn" type="button" aria-label="Share"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      <button className="icon-btn lg solid" type="button" aria-label="Add item"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      <button className="icon-btn square" type="button" aria-label="Settings"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16 10l1.5-1-1.5-2.6-1.7.5-1.3-.8-.5-1.6h-3l-.5 1.6-1.3.8-1.7-.5L2.5 9 4 10l-1.5 1 1.5 2.6 1.7-.5 1.3.8.5 1.6h3l.5-1.6 1.3-.8 1.7.5 1.5-2.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      <button className="icon-btn fav" type="button" aria-label="Add to favourites" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16.5s-6-3.6-6-8A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6 2.5c0 4.4-6 8-6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg></button>
    </div>
  );
}
```

`IconButtons.css`

```css
/* tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html */
.icon-row { display: flex; align-items: center; gap: 12px; }
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
.icon-btn.fav[aria-pressed="true"] svg { fill: currentColor; }
```

## Vue

`IconButtons.vue`

```vue
<!-- tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const fav = root.querySelector('.fav');
  const onFav = () => {
    const on = fav.getAttribute('aria-pressed') !== 'true';
    fav.setAttribute('aria-pressed', String(on));
    fav.setAttribute('aria-label', on ? 'Remove from favourites' : 'Add to favourites');
  };
  fav.addEventListener('click', onFav);
  return () => fav.removeEventListener('click', onFav);
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="icon-row">
    <button class="icon-btn sm" type="button" aria-label="Edit"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="icon-btn" type="button" aria-label="Share"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="icon-btn lg solid" type="button" aria-label="Add item"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="icon-btn square" type="button" aria-label="Settings"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16 10l1.5-1-1.5-2.6-1.7.5-1.3-.8-.5-1.6h-3l-.5 1.6-1.3.8-1.7-.5L2.5 9 4 10l-1.5 1 1.5 2.6 1.7-.5 1.3.8.5 1.6h3l.5-1.6 1.3-.8 1.7.5 1.5-2.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="icon-btn fav" type="button" aria-label="Add to favourites" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16.5s-6-3.6-6-8A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6 2.5c0 4.4-6 8-6 8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.icon-row { display: flex; align-items: center; gap: 12px; }
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
.icon-btn.fav[aria-pressed="true"] svg { fill: currentColor; }
</style>
```

## Svelte

`IconButtons.svelte`

```svelte
<!-- tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html -->
<script>
  import { onMount } from 'svelte';
  import './IconButtons.css';

  let node;

  function setup(root) {
    const fav = root.querySelector('.fav');
    const onFav = () => {
      const on = fav.getAttribute('aria-pressed') !== 'true';
      fav.setAttribute('aria-pressed', String(on));
      fav.setAttribute('aria-label', on ? 'Remove from favourites' : 'Add to favourites');
    };
    fav.addEventListener('click', onFav);
    return () => fav.removeEventListener('click', onFav);
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="icon-row">
  <button class="icon-btn sm" type="button" aria-label="Edit"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn" type="button" aria-label="Share"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn lg solid" type="button" aria-label="Add item"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn square" type="button" aria-label="Settings"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16 10l1.5-1-1.5-2.6-1.7.5-1.3-.8-.5-1.6h-3l-.5 1.6-1.3.8-1.7-.5L2.5 9 4 10l-1.5 1 1.5 2.6 1.7-.5 1.3.8.5 1.6h3l.5-1.6 1.3-.8 1.7.5 1.5-2.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <button class="icon-btn fav" type="button" aria-label="Add to favourites" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16.5s-6-3.6-6-8A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6 2.5c0 4.4-6 8-6 8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
</div>
```

`IconButtons.css`

```css
/* tearsheet icon-buttons va7c7c8e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/icon-buttons.html */
.icon-row { display: flex; align-items: center; gap: 12px; }
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
.icon-btn.fav[aria-pressed="true"] svg { fill: currentColor; }
```
