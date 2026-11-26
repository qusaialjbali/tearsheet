# Loading button (Tearsheet, Actions)

A button that shows its work: idle, saving with a spinner, then a short confirmation.

**Why it works:** While busy it is aria-disabled (still focusable) and ignores repeat clicks, so nothing is submitted twice. The result is announced through a live region.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html -->
<div class="load-demo">
  <button class="load-btn" type="button">
    <span class="load-spin" aria-hidden="true"></span>
    <span class="load-label">Save changes</span>
  </button>
  <span class="load-status" aria-live="polite"></span>
</div>
```

`styles.css`

```css
/* tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html */
.load-demo { display: inline-flex; }
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
@media (prefers-reduced-motion: reduce) { .load-spin { animation-duration: 2s; } }
```

`script.js`

```js
/* tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html */
function setup(root) {
  const button = root.querySelector('.load-btn');
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
  return () => { timers.forEach(clearTimeout); button.removeEventListener('click', onClick); };
}

document.querySelectorAll(".load-demo").forEach(setup);
```

## React

`LoadingButton.jsx`

```jsx
/* tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html */
import { useEffect, useRef } from 'react';
import './LoadingButton.css';

function setup(root) {
  const button = root.querySelector('.load-btn');
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
  return () => { timers.forEach(clearTimeout); button.removeEventListener('click', onClick); };
}

export function LoadingButton() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="load-demo">
      <button className="load-btn" type="button">
        <span className="load-spin" aria-hidden="true"></span>
        <span className="load-label">Save changes</span>
      </button>
      <span className="load-status" aria-live="polite"></span>
    </div>
  );
}
```

`LoadingButton.css`

```css
/* tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html */
.load-demo { display: inline-flex; }
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
@media (prefers-reduced-motion: reduce) { .load-spin { animation-duration: 2s; } }
```

## Vue

`LoadingButton.vue`

```vue
<!-- tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const button = root.querySelector('.load-btn');
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
  return () => { timers.forEach(clearTimeout); button.removeEventListener('click', onClick); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="load-demo">
    <button class="load-btn" type="button">
      <span class="load-spin" aria-hidden="true"></span>
      <span class="load-label">Save changes</span>
    </button>
    <span class="load-status" aria-live="polite"></span>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.load-demo { display: inline-flex; }
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
@media (prefers-reduced-motion: reduce) { .load-spin { animation-duration: 2s; } }
</style>
```

## Svelte

`LoadingButton.svelte`

```svelte
<!-- tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html -->
<script>
  import { onMount } from 'svelte';
  import './LoadingButton.css';

  let node;

  function setup(root) {
    const button = root.querySelector('.load-btn');
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
    return () => { timers.forEach(clearTimeout); button.removeEventListener('click', onClick); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="load-demo">
  <button class="load-btn" type="button">
    <span class="load-spin" aria-hidden="true"></span>
    <span class="load-label">Save changes</span>
  </button>
  <span class="load-status" aria-live="polite"></span>
</div>
```

`LoadingButton.css`

```css
/* tearsheet loading-button v185b2b1e · https://qusaialjbali.github.io/tearsheet/zine/parts/loading-button.html */
.load-demo { display: inline-flex; }
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
@media (prefers-reduced-motion: reduce) { .load-spin { animation-duration: 2s; } }
```
