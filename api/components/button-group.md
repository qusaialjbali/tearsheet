# Toggle button group (Tearsheet, Actions)

A formatting toolbar of joined icon buttons that each switch on and off.

**Why it works:** Each button reports its state with aria-pressed, and the group has a role="toolbar" label. Icon-only buttons always carry an aria-label.

**Checked:** axe clean in light and dark; 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html -->
<div class="toolbar-group" role="toolbar" aria-label="Text formatting">
  <button class="tg-btn" type="button" aria-pressed="true" aria-label="Bold"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h5a3 3 0 0 1 0 6H6zM6 10h6a3 3 0 0 1 0 6H6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Italic"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4H8M12 16H8M11 4 9 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Underline"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v5a4 4 0 0 0 8 0V4M5 17h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  <span class="tg-sep" aria-hidden="true"></span>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Bulleted list"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h9M8 10h9M8 15h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="4" cy="5" r="1.3" fill="currentColor"/><circle cx="4" cy="10" r="1.3" fill="currentColor"/><circle cx="4" cy="15" r="1.3" fill="currentColor"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Insert link"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-.8.8M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l.8-.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
</div>
```

`styles.css`

```css
/* tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html */
.toolbar-group {
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
.tg-sep { width: 1px; height: 24px; margin: 0 4px; background: var(--ui-border); }
```

`script.js`

```js
/* tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html */
function setup(root) {
  const buttons = [...root.querySelectorAll('.tg-btn')];
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
  };
}

document.querySelectorAll(".toolbar-group").forEach(setup);
```

## React

`ButtonGroup.jsx`

```jsx
/* tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html */
import { useEffect, useRef } from 'react';
import './ButtonGroup.css';

function setup(root) {
  const buttons = [...root.querySelectorAll('.tg-btn')];
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
  };
}

export function ButtonGroup() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="toolbar-group" role="toolbar" aria-label="Text formatting">
      <button className="tg-btn" type="button" aria-pressed="true" aria-label="Bold"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h5a3 3 0 0 1 0 6H6zM6 10h6a3 3 0 0 1 0 6H6z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg></button>
      <button className="tg-btn" type="button" aria-pressed="false" aria-label="Italic"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4H8M12 16H8M11 4 9 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
      <button className="tg-btn" type="button" aria-pressed="false" aria-label="Underline"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v5a4 4 0 0 0 8 0V4M5 17h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
      <span className="tg-sep" aria-hidden="true"></span>
      <button className="tg-btn" type="button" aria-pressed="false" aria-label="Bulleted list"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h9M8 10h9M8 15h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="4" cy="5" r="1.3" fill="currentColor"/><circle cx="4" cy="10" r="1.3" fill="currentColor"/><circle cx="4" cy="15" r="1.3" fill="currentColor"/></svg></button>
      <button className="tg-btn" type="button" aria-pressed="false" aria-label="Insert link"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-.8.8M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l.8-.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></button>
    </div>
  );
}
```

`ButtonGroup.css`

```css
/* tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html */
.toolbar-group {
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
.tg-sep { width: 1px; height: 24px; margin: 0 4px; background: var(--ui-border); }
```

## Vue

`ButtonGroup.vue`

```vue
<!-- tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const buttons = [...root.querySelectorAll('.tg-btn')];
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
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="toolbar-group" role="toolbar" aria-label="Text formatting">
    <button class="tg-btn" type="button" aria-pressed="true" aria-label="Bold"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h5a3 3 0 0 1 0 6H6zM6 10h6a3 3 0 0 1 0 6H6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg></button>
    <button class="tg-btn" type="button" aria-pressed="false" aria-label="Italic"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4H8M12 16H8M11 4 9 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <button class="tg-btn" type="button" aria-pressed="false" aria-label="Underline"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v5a4 4 0 0 0 8 0V4M5 17h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <span class="tg-sep" aria-hidden="true"></span>
    <button class="tg-btn" type="button" aria-pressed="false" aria-label="Bulleted list"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h9M8 10h9M8 15h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="4" cy="5" r="1.3" fill="currentColor"/><circle cx="4" cy="10" r="1.3" fill="currentColor"/><circle cx="4" cy="15" r="1.3" fill="currentColor"/></svg></button>
    <button class="tg-btn" type="button" aria-pressed="false" aria-label="Insert link"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-.8.8M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l.8-.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.toolbar-group {
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
.tg-sep { width: 1px; height: 24px; margin: 0 4px; background: var(--ui-border); }
</style>
```

## Svelte

`ButtonGroup.svelte`

```svelte
<!-- tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html -->
<script>
  import { onMount } from 'svelte';
  import './ButtonGroup.css';

  let node;

  function setup(root) {
    const buttons = [...root.querySelectorAll('.tg-btn')];
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
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="toolbar-group" role="toolbar" aria-label="Text formatting">
  <button class="tg-btn" type="button" aria-pressed="true" aria-label="Bold"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h5a3 3 0 0 1 0 6H6zM6 10h6a3 3 0 0 1 0 6H6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Italic"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4H8M12 16H8M11 4 9 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Underline"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v5a4 4 0 0 0 8 0V4M5 17h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  <span class="tg-sep" aria-hidden="true"></span>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Bulleted list"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h9M8 10h9M8 15h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="4" cy="5" r="1.3" fill="currentColor"/><circle cx="4" cy="10" r="1.3" fill="currentColor"/><circle cx="4" cy="15" r="1.3" fill="currentColor"/></svg></button>
  <button class="tg-btn" type="button" aria-pressed="false" aria-label="Insert link"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-.8.8M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l.8-.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
</div>
```

`ButtonGroup.css`

```css
/* tearsheet button-group vb1cf99ae · https://qusaialjbali.github.io/tearsheet/zine/parts/button-group.html */
.toolbar-group {
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
.tg-sep { width: 1px; height: 24px; margin: 0 4px; background: var(--ui-border); }
```
