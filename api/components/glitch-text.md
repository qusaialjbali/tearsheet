# VHS glitch heading (Tearsheet, Weird)

A heading that tears into red and cyan slices like a worn tape when you hover or press the button.

**Why it works:** The slices are pseudo-elements copying the text from data-text, so the heading is read once. It never glitches on its own, and reduced motion keeps it still.

**Checked:** axe clean in light and dark; tightest text contrast 16.1:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html -->
<div class="glitch-demo">
  <h2 class="glitch" data-text="REWIND">REWIND</h2>
  <button class="glitch-btn" type="button">Glitch it</button>
</div>
```

`styles.css`

```css
/* tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html */
.glitch-demo { display: grid; justify-items: center; gap: 14px; }
.glitch { position: relative; margin: 0; font-size: clamp(48px, 9vw, 84px); font-weight: 900; letter-spacing: 0.02em; color: var(--ui-text); }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.glitch::before { color: #ff2a6d; }
.glitch::after { color: #05d9e8; }
.glitch:hover::before, .glitch.is-on::before { opacity: 0.9; animation: glitch-a 0.6s steps(2) infinite; }
.glitch:hover::after, .glitch.is-on::after { opacity: 0.9; animation: glitch-b 0.5s steps(2) infinite; }
@keyframes glitch-a {
  0% { clip-path: inset(10% 0 70% 0); transform: translate(-6px, -2px); }
  33% { clip-path: inset(55% 0 20% 0); transform: translate(5px, 1px); }
  66% { clip-path: inset(30% 0 45% 0); transform: translate(-3px, 2px); }
  100% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -1px); }
}
@keyframes glitch-b {
  0% { clip-path: inset(65% 0 10% 0); transform: translate(6px, 2px); }
  50% { clip-path: inset(15% 0 60% 0); transform: translate(-5px, -2px); }
  100% { clip-path: inset(40% 0 35% 0); transform: translate(3px, 1px); }
}
.glitch-btn { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.glitch-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .glitch::before, .glitch::after { animation: none !important; opacity: 0 !important; } }
```

`script.js`

```js
/* tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html */
function setup(root) {
  const h = root.querySelector('.glitch');
  const btn = root.querySelector('.glitch-btn');
  let t;
  const onClick = () => { h.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => h.classList.remove('is-on'), 900); };
  btn.addEventListener('click', onClick);
  return () => { clearTimeout(t); btn.removeEventListener('click', onClick); };
}

document.querySelectorAll(".glitch-demo").forEach(setup);
```

## React

`GlitchText.jsx`

```jsx
/* tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html */
import { useEffect, useRef } from 'react';
import './GlitchText.css';

function setup(root) {
  const h = root.querySelector('.glitch');
  const btn = root.querySelector('.glitch-btn');
  let t;
  const onClick = () => { h.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => h.classList.remove('is-on'), 900); };
  btn.addEventListener('click', onClick);
  return () => { clearTimeout(t); btn.removeEventListener('click', onClick); };
}

export function GlitchText() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="glitch-demo">
      <h2 className="glitch" data-text="REWIND">REWIND</h2>
      <button className="glitch-btn" type="button">Glitch it</button>
    </div>
  );
}
```

`GlitchText.css`

```css
/* tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html */
.glitch-demo { display: grid; justify-items: center; gap: 14px; }
.glitch { position: relative; margin: 0; font-size: clamp(48px, 9vw, 84px); font-weight: 900; letter-spacing: 0.02em; color: var(--ui-text); }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.glitch::before { color: #ff2a6d; }
.glitch::after { color: #05d9e8; }
.glitch:hover::before, .glitch.is-on::before { opacity: 0.9; animation: glitch-a 0.6s steps(2) infinite; }
.glitch:hover::after, .glitch.is-on::after { opacity: 0.9; animation: glitch-b 0.5s steps(2) infinite; }
@keyframes glitch-a {
  0% { clip-path: inset(10% 0 70% 0); transform: translate(-6px, -2px); }
  33% { clip-path: inset(55% 0 20% 0); transform: translate(5px, 1px); }
  66% { clip-path: inset(30% 0 45% 0); transform: translate(-3px, 2px); }
  100% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -1px); }
}
@keyframes glitch-b {
  0% { clip-path: inset(65% 0 10% 0); transform: translate(6px, 2px); }
  50% { clip-path: inset(15% 0 60% 0); transform: translate(-5px, -2px); }
  100% { clip-path: inset(40% 0 35% 0); transform: translate(3px, 1px); }
}
.glitch-btn { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.glitch-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .glitch::before, .glitch::after { animation: none !important; opacity: 0 !important; } }
```

## Vue

`GlitchText.vue`

```vue
<!-- tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const h = root.querySelector('.glitch');
  const btn = root.querySelector('.glitch-btn');
  let t;
  const onClick = () => { h.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => h.classList.remove('is-on'), 900); };
  btn.addEventListener('click', onClick);
  return () => { clearTimeout(t); btn.removeEventListener('click', onClick); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="glitch-demo">
    <h2 class="glitch" data-text="REWIND">REWIND</h2>
    <button class="glitch-btn" type="button">Glitch it</button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.glitch-demo { display: grid; justify-items: center; gap: 14px; }
.glitch { position: relative; margin: 0; font-size: clamp(48px, 9vw, 84px); font-weight: 900; letter-spacing: 0.02em; color: var(--ui-text); }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.glitch::before { color: #ff2a6d; }
.glitch::after { color: #05d9e8; }
.glitch:hover::before, .glitch.is-on::before { opacity: 0.9; animation: glitch-a 0.6s steps(2) infinite; }
.glitch:hover::after, .glitch.is-on::after { opacity: 0.9; animation: glitch-b 0.5s steps(2) infinite; }
@keyframes glitch-a {
  0% { clip-path: inset(10% 0 70% 0); transform: translate(-6px, -2px); }
  33% { clip-path: inset(55% 0 20% 0); transform: translate(5px, 1px); }
  66% { clip-path: inset(30% 0 45% 0); transform: translate(-3px, 2px); }
  100% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -1px); }
}
@keyframes glitch-b {
  0% { clip-path: inset(65% 0 10% 0); transform: translate(6px, 2px); }
  50% { clip-path: inset(15% 0 60% 0); transform: translate(-5px, -2px); }
  100% { clip-path: inset(40% 0 35% 0); transform: translate(3px, 1px); }
}
.glitch-btn { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.glitch-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .glitch::before, .glitch::after { animation: none !important; opacity: 0 !important; } }
</style>
```

## Svelte

`GlitchText.svelte`

```svelte
<!-- tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html -->
<script>
  import { onMount } from 'svelte';
  import './GlitchText.css';

  let node;

  function setup(root) {
    const h = root.querySelector('.glitch');
    const btn = root.querySelector('.glitch-btn');
    let t;
    const onClick = () => { h.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => h.classList.remove('is-on'), 900); };
    btn.addEventListener('click', onClick);
    return () => { clearTimeout(t); btn.removeEventListener('click', onClick); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="glitch-demo">
  <h2 class="glitch" data-text="REWIND">REWIND</h2>
  <button class="glitch-btn" type="button">Glitch it</button>
</div>
```

`GlitchText.css`

```css
/* tearsheet glitch-text v6b5681ea · https://qusaialjbali.github.io/tearsheet/zine/parts/glitch-text.html */
.glitch-demo { display: grid; justify-items: center; gap: 14px; }
.glitch { position: relative; margin: 0; font-size: clamp(48px, 9vw, 84px); font-weight: 900; letter-spacing: 0.02em; color: var(--ui-text); }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.glitch::before { color: #ff2a6d; }
.glitch::after { color: #05d9e8; }
.glitch:hover::before, .glitch.is-on::before { opacity: 0.9; animation: glitch-a 0.6s steps(2) infinite; }
.glitch:hover::after, .glitch.is-on::after { opacity: 0.9; animation: glitch-b 0.5s steps(2) infinite; }
@keyframes glitch-a {
  0% { clip-path: inset(10% 0 70% 0); transform: translate(-6px, -2px); }
  33% { clip-path: inset(55% 0 20% 0); transform: translate(5px, 1px); }
  66% { clip-path: inset(30% 0 45% 0); transform: translate(-3px, 2px); }
  100% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -1px); }
}
@keyframes glitch-b {
  0% { clip-path: inset(65% 0 10% 0); transform: translate(6px, 2px); }
  50% { clip-path: inset(15% 0 60% 0); transform: translate(-5px, -2px); }
  100% { clip-path: inset(40% 0 35% 0); transform: translate(3px, 1px); }
}
.glitch-btn { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.glitch-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .glitch::before, .glitch::after { animation: none !important; opacity: 0 !important; } }
```
