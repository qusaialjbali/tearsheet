# Cube tabs (Tearsheet, Weird)

Tabs where every panel is a face of a 3D cube that turns to show the one you pick.

**Why it works:** It is the standard tabs pattern (arrow keys, roving focus), so only the visible face is exposed; the other faces are inert. With reduced motion the cube snaps instead of turning.

**Checked:** axe clean in light and dark; tightest text contrast 6.09:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html -->
<div class="cube">
  <div class="cube-tabs" role="tablist" aria-label="About the zine">
    <button role="tab" type="button" aria-selected="true" aria-controls="cf-0" id="ct-0">What</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-1" id="ct-1" tabindex="-1">Who</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-2" id="ct-2" tabindex="-1">How</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-3" id="ct-3" tabindex="-1">Why</button>
  </div>
  <div class="cube-scene">
    <div class="cube-body">
      <section class="cube-face f0" role="tabpanel" id="cf-0" aria-labelledby="ct-0"><b>What</b>Free interface parts, printed in four formats.</section>
      <section class="cube-face f1" role="tabpanel" id="cf-1" aria-labelledby="ct-1" inert><b>Who</b>Designers and developers, equally.</section>
      <section class="cube-face f2" role="tabpanel" id="cf-2" aria-labelledby="ct-2" inert><b>How</b>Pick a format, tear out the code, ship it.</section>
      <section class="cube-face f3" role="tabpanel" id="cf-3" aria-labelledby="ct-3" inert><b>Why</b>Because good defaults should be free.</section>
    </div>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html */
.cube { display: grid; justify-items: center; gap: 24px; }
.cube-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; max-width: 100%; padding: 4px; background: var(--ui-surface-2); border-radius: 22px; }
.cube-tabs button { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-muted); background: none; border: 0; border-radius: 999px; cursor: pointer; }
.cube-tabs button[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cube-tabs button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cube-scene { width: 200px; height: 200px; perspective: 700px; }
.cube-body { --turn: 0deg; position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: translateZ(-100px) rotateY(var(--turn)); transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.cube-face {
  position: absolute; inset: 0; display: grid; align-content: center; gap: 6px; padding: 22px;
  font-size: 15px; line-height: 1.35; color: #fff; border-radius: 14px; backface-visibility: hidden;
}
.cube-face b { font-size: 26px; }
.f0 { background: #4f46e5; transform: rotateY(0deg) translateZ(100px); }
.f1 { background: #db2777; transform: rotateY(90deg) translateZ(100px); }
.f2 { background: #0d9488; transform: rotateY(180deg) translateZ(100px); }
.f3 { background: #c2410c; transform: rotateY(270deg) translateZ(100px); }
@media (prefers-reduced-motion: reduce) { .cube-body { transition: none; } }
```

`script.js`

```js
/* tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html */
function setup(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const faces = [...root.querySelectorAll('[role="tabpanel"]')];
  const body = root.querySelector('.cube-body');
  const select = (i, focus) => {
    tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; });
    faces.forEach((f, n) => (f.inert = n !== i));
    body.style.setProperty('--turn', -90 * i + 'deg');
    if (focus) tabs[i].focus();
  };
  const onClick = (e) => select(tabs.indexOf(e.currentTarget));
  const onKey = (e) => {
    const i = tabs.indexOf(document.activeElement);
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (i < 0 || !d) return;
    e.preventDefault();
    select((i + d + tabs.length) % tabs.length, true);
  };
  tabs.forEach((t) => t.addEventListener('click', onClick));
  root.addEventListener('keydown', onKey);
  return () => { tabs.forEach((t) => t.removeEventListener('click', onClick)); root.removeEventListener('keydown', onKey); };
}

document.querySelectorAll(".cube").forEach(setup);
```

## React

`CubeTabs.jsx`

```jsx
/* tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html */
import { useEffect, useRef } from 'react';
import './CubeTabs.css';

function setup(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const faces = [...root.querySelectorAll('[role="tabpanel"]')];
  const body = root.querySelector('.cube-body');
  const select = (i, focus) => {
    tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; });
    faces.forEach((f, n) => (f.inert = n !== i));
    body.style.setProperty('--turn', -90 * i + 'deg');
    if (focus) tabs[i].focus();
  };
  const onClick = (e) => select(tabs.indexOf(e.currentTarget));
  const onKey = (e) => {
    const i = tabs.indexOf(document.activeElement);
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (i < 0 || !d) return;
    e.preventDefault();
    select((i + d + tabs.length) % tabs.length, true);
  };
  tabs.forEach((t) => t.addEventListener('click', onClick));
  root.addEventListener('keydown', onKey);
  return () => { tabs.forEach((t) => t.removeEventListener('click', onClick)); root.removeEventListener('keydown', onKey); };
}

export function CubeTabs() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="cube">
      <div className="cube-tabs" role="tablist" aria-label="About the zine">
        <button role="tab" type="button" aria-selected="true" aria-controls="cf-0" id="ct-0">What</button>
        <button role="tab" type="button" aria-selected="false" aria-controls="cf-1" id="ct-1" tabIndex={-1}>Who</button>
        <button role="tab" type="button" aria-selected="false" aria-controls="cf-2" id="ct-2" tabIndex={-1}>How</button>
        <button role="tab" type="button" aria-selected="false" aria-controls="cf-3" id="ct-3" tabIndex={-1}>Why</button>
      </div>
      <div className="cube-scene">
        <div className="cube-body">
          <section className="cube-face f0" role="tabpanel" id="cf-0" aria-labelledby="ct-0"><b>What</b>Free interface parts, printed in four formats.</section>
          <section className="cube-face f1" role="tabpanel" id="cf-1" aria-labelledby="ct-1" inert><b>Who</b>Designers and developers, equally.</section>
          <section className="cube-face f2" role="tabpanel" id="cf-2" aria-labelledby="ct-2" inert><b>How</b>Pick a format, tear out the code, ship it.</section>
          <section className="cube-face f3" role="tabpanel" id="cf-3" aria-labelledby="ct-3" inert><b>Why</b>Because good defaults should be free.</section>
        </div>
      </div>
    </div>
  );
}
```

`CubeTabs.css`

```css
/* tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html */
.cube { display: grid; justify-items: center; gap: 24px; }
.cube-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; max-width: 100%; padding: 4px; background: var(--ui-surface-2); border-radius: 22px; }
.cube-tabs button { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-muted); background: none; border: 0; border-radius: 999px; cursor: pointer; }
.cube-tabs button[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cube-tabs button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cube-scene { width: 200px; height: 200px; perspective: 700px; }
.cube-body { --turn: 0deg; position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: translateZ(-100px) rotateY(var(--turn)); transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.cube-face {
  position: absolute; inset: 0; display: grid; align-content: center; gap: 6px; padding: 22px;
  font-size: 15px; line-height: 1.35; color: #fff; border-radius: 14px; backface-visibility: hidden;
}
.cube-face b { font-size: 26px; }
.f0 { background: #4f46e5; transform: rotateY(0deg) translateZ(100px); }
.f1 { background: #db2777; transform: rotateY(90deg) translateZ(100px); }
.f2 { background: #0d9488; transform: rotateY(180deg) translateZ(100px); }
.f3 { background: #c2410c; transform: rotateY(270deg) translateZ(100px); }
@media (prefers-reduced-motion: reduce) { .cube-body { transition: none; } }
```

## Vue

`CubeTabs.vue`

```vue
<!-- tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const faces = [...root.querySelectorAll('[role="tabpanel"]')];
  const body = root.querySelector('.cube-body');
  const select = (i, focus) => {
    tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; });
    faces.forEach((f, n) => (f.inert = n !== i));
    body.style.setProperty('--turn', -90 * i + 'deg');
    if (focus) tabs[i].focus();
  };
  const onClick = (e) => select(tabs.indexOf(e.currentTarget));
  const onKey = (e) => {
    const i = tabs.indexOf(document.activeElement);
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (i < 0 || !d) return;
    e.preventDefault();
    select((i + d + tabs.length) % tabs.length, true);
  };
  tabs.forEach((t) => t.addEventListener('click', onClick));
  root.addEventListener('keydown', onKey);
  return () => { tabs.forEach((t) => t.removeEventListener('click', onClick)); root.removeEventListener('keydown', onKey); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="cube">
    <div class="cube-tabs" role="tablist" aria-label="About the zine">
      <button role="tab" type="button" aria-selected="true" aria-controls="cf-0" id="ct-0">What</button>
      <button role="tab" type="button" aria-selected="false" aria-controls="cf-1" id="ct-1" tabindex="-1">Who</button>
      <button role="tab" type="button" aria-selected="false" aria-controls="cf-2" id="ct-2" tabindex="-1">How</button>
      <button role="tab" type="button" aria-selected="false" aria-controls="cf-3" id="ct-3" tabindex="-1">Why</button>
    </div>
    <div class="cube-scene">
      <div class="cube-body">
        <section class="cube-face f0" role="tabpanel" id="cf-0" aria-labelledby="ct-0"><b>What</b>Free interface parts, printed in four formats.</section>
        <section class="cube-face f1" role="tabpanel" id="cf-1" aria-labelledby="ct-1" inert><b>Who</b>Designers and developers, equally.</section>
        <section class="cube-face f2" role="tabpanel" id="cf-2" aria-labelledby="ct-2" inert><b>How</b>Pick a format, tear out the code, ship it.</section>
        <section class="cube-face f3" role="tabpanel" id="cf-3" aria-labelledby="ct-3" inert><b>Why</b>Because good defaults should be free.</section>
      </div>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.cube { display: grid; justify-items: center; gap: 24px; }
.cube-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; max-width: 100%; padding: 4px; background: var(--ui-surface-2); border-radius: 22px; }
.cube-tabs button { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-muted); background: none; border: 0; border-radius: 999px; cursor: pointer; }
.cube-tabs button[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cube-tabs button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cube-scene { width: 200px; height: 200px; perspective: 700px; }
.cube-body { --turn: 0deg; position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: translateZ(-100px) rotateY(var(--turn)); transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.cube-face {
  position: absolute; inset: 0; display: grid; align-content: center; gap: 6px; padding: 22px;
  font-size: 15px; line-height: 1.35; color: #fff; border-radius: 14px; backface-visibility: hidden;
}
.cube-face b { font-size: 26px; }
.f0 { background: #4f46e5; transform: rotateY(0deg) translateZ(100px); }
.f1 { background: #db2777; transform: rotateY(90deg) translateZ(100px); }
.f2 { background: #0d9488; transform: rotateY(180deg) translateZ(100px); }
.f3 { background: #c2410c; transform: rotateY(270deg) translateZ(100px); }
@media (prefers-reduced-motion: reduce) { .cube-body { transition: none; } }
</style>
```

## Svelte

`CubeTabs.svelte`

```svelte
<!-- tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html -->
<script>
  import { onMount } from 'svelte';
  import './CubeTabs.css';

  let node;

  function setup(root) {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const faces = [...root.querySelectorAll('[role="tabpanel"]')];
    const body = root.querySelector('.cube-body');
    const select = (i, focus) => {
      tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; });
      faces.forEach((f, n) => (f.inert = n !== i));
      body.style.setProperty('--turn', -90 * i + 'deg');
      if (focus) tabs[i].focus();
    };
    const onClick = (e) => select(tabs.indexOf(e.currentTarget));
    const onKey = (e) => {
      const i = tabs.indexOf(document.activeElement);
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (i < 0 || !d) return;
      e.preventDefault();
      select((i + d + tabs.length) % tabs.length, true);
    };
    tabs.forEach((t) => t.addEventListener('click', onClick));
    root.addEventListener('keydown', onKey);
    return () => { tabs.forEach((t) => t.removeEventListener('click', onClick)); root.removeEventListener('keydown', onKey); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="cube">
  <div class="cube-tabs" role="tablist" aria-label="About the zine">
    <button role="tab" type="button" aria-selected="true" aria-controls="cf-0" id="ct-0">What</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-1" id="ct-1" tabindex="-1">Who</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-2" id="ct-2" tabindex="-1">How</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-3" id="ct-3" tabindex="-1">Why</button>
  </div>
  <div class="cube-scene">
    <div class="cube-body">
      <section class="cube-face f0" role="tabpanel" id="cf-0" aria-labelledby="ct-0"><b>What</b>Free interface parts, printed in four formats.</section>
      <section class="cube-face f1" role="tabpanel" id="cf-1" aria-labelledby="ct-1" inert><b>Who</b>Designers and developers, equally.</section>
      <section class="cube-face f2" role="tabpanel" id="cf-2" aria-labelledby="ct-2" inert><b>How</b>Pick a format, tear out the code, ship it.</section>
      <section class="cube-face f3" role="tabpanel" id="cf-3" aria-labelledby="ct-3" inert><b>Why</b>Because good defaults should be free.</section>
    </div>
  </div>
</div>
```

`CubeTabs.css`

```css
/* tearsheet cube-tabs v4eb762ab · https://qusaialjbali.github.io/tearsheet/zine/parts/cube-tabs.html */
.cube { display: grid; justify-items: center; gap: 24px; }
.cube-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; max-width: 100%; padding: 4px; background: var(--ui-surface-2); border-radius: 22px; }
.cube-tabs button { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-muted); background: none; border: 0; border-radius: 999px; cursor: pointer; }
.cube-tabs button[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cube-tabs button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cube-scene { width: 200px; height: 200px; perspective: 700px; }
.cube-body { --turn: 0deg; position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: translateZ(-100px) rotateY(var(--turn)); transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.cube-face {
  position: absolute; inset: 0; display: grid; align-content: center; gap: 6px; padding: 22px;
  font-size: 15px; line-height: 1.35; color: #fff; border-radius: 14px; backface-visibility: hidden;
}
.cube-face b { font-size: 26px; }
.f0 { background: #4f46e5; transform: rotateY(0deg) translateZ(100px); }
.f1 { background: #db2777; transform: rotateY(90deg) translateZ(100px); }
.f2 { background: #0d9488; transform: rotateY(180deg) translateZ(100px); }
.f3 { background: #c2410c; transform: rotateY(270deg) translateZ(100px); }
@media (prefers-reduced-motion: reduce) { .cube-body { transition: none; } }
```
