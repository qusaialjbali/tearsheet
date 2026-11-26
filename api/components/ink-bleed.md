# Ink bleed menu (Tearsheet, Weird)

Menu items flood with ink from exactly where your pointer enters, like a drop on blotting paper.

**Why it works:** The ink is a clip-path circle that grows from the pointer’s entry point; keyboard focus floods from the centre. The link text flips colour with it, so contrast holds the whole way.

**Checked:** axe clean in light and dark; 4 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html -->
<nav class="bleed" aria-label="Sections">
  <a href="#"><span>Work</span></a>
  <a href="#"><span>Studio</span></a>
  <a href="#"><span>Journal</span></a>
  <a href="#"><span>Contact</span></a>
</nav>
```

`styles.css`

```css
/* tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html */
.bleed { display: grid; width: 100%; max-width: 380px; border-top: 2px solid var(--ui-text); }
.bleed a {
  --x: 50%; --y: 50%;
  position: relative; display: block; overflow: hidden; padding: 16px 18px;
  font-size: clamp(22px, 4vw, 30px); font-weight: 800; letter-spacing: -0.02em; text-decoration: none;
  color: var(--ui-text); border-bottom: 2px solid var(--ui-text);
}
.bleed a::before {
  content: ""; position: absolute; inset: 0; background: var(--ui-text);
  clip-path: circle(0% at var(--x) var(--y)); transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.bleed a span { position: relative; transition: color 0.25s; }
.bleed a:hover::before, .bleed a:focus-visible::before { clip-path: circle(150% at var(--x) var(--y)); }
.bleed a:hover span, .bleed a:focus-visible span { color: var(--ui-bg); }
.bleed a:focus-visible { outline: none; }
@media (prefers-reduced-motion: reduce) { .bleed a::before { transition: none; } }
```

`script.js`

```js
/* tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html */
function setup(root) {
  const links = [...root.querySelectorAll('a')];
  const onEnter = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px');
  };
  const onFocus = (e) => { e.currentTarget.style.setProperty('--x', '50%'); e.currentTarget.style.setProperty('--y', '50%'); };
  links.forEach((a) => { a.addEventListener('pointerenter', onEnter); a.addEventListener('pointerleave', onEnter); a.addEventListener('focus', onFocus); });
  return () => links.forEach((a) => { a.removeEventListener('pointerenter', onEnter); a.removeEventListener('pointerleave', onEnter); a.removeEventListener('focus', onFocus); });
}

document.querySelectorAll(".bleed").forEach(setup);
```

## React

`InkBleed.jsx`

```jsx
/* tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html */
import { useEffect, useRef } from 'react';
import './InkBleed.css';

function setup(root) {
  const links = [...root.querySelectorAll('a')];
  const onEnter = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px');
  };
  const onFocus = (e) => { e.currentTarget.style.setProperty('--x', '50%'); e.currentTarget.style.setProperty('--y', '50%'); };
  links.forEach((a) => { a.addEventListener('pointerenter', onEnter); a.addEventListener('pointerleave', onEnter); a.addEventListener('focus', onFocus); });
  return () => links.forEach((a) => { a.removeEventListener('pointerenter', onEnter); a.removeEventListener('pointerleave', onEnter); a.removeEventListener('focus', onFocus); });
}

export function InkBleed() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <nav ref={ref} className="bleed" aria-label="Sections">
      <a href="#"><span>Work</span></a>
      <a href="#"><span>Studio</span></a>
      <a href="#"><span>Journal</span></a>
      <a href="#"><span>Contact</span></a>
    </nav>
  );
}
```

`InkBleed.css`

```css
/* tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html */
.bleed { display: grid; width: 100%; max-width: 380px; border-top: 2px solid var(--ui-text); }
.bleed a {
  --x: 50%; --y: 50%;
  position: relative; display: block; overflow: hidden; padding: 16px 18px;
  font-size: clamp(22px, 4vw, 30px); font-weight: 800; letter-spacing: -0.02em; text-decoration: none;
  color: var(--ui-text); border-bottom: 2px solid var(--ui-text);
}
.bleed a::before {
  content: ""; position: absolute; inset: 0; background: var(--ui-text);
  clip-path: circle(0% at var(--x) var(--y)); transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.bleed a span { position: relative; transition: color 0.25s; }
.bleed a:hover::before, .bleed a:focus-visible::before { clip-path: circle(150% at var(--x) var(--y)); }
.bleed a:hover span, .bleed a:focus-visible span { color: var(--ui-bg); }
.bleed a:focus-visible { outline: none; }
@media (prefers-reduced-motion: reduce) { .bleed a::before { transition: none; } }
```

## Vue

`InkBleed.vue`

```vue
<!-- tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const links = [...root.querySelectorAll('a')];
  const onEnter = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px');
  };
  const onFocus = (e) => { e.currentTarget.style.setProperty('--x', '50%'); e.currentTarget.style.setProperty('--y', '50%'); };
  links.forEach((a) => { a.addEventListener('pointerenter', onEnter); a.addEventListener('pointerleave', onEnter); a.addEventListener('focus', onFocus); });
  return () => links.forEach((a) => { a.removeEventListener('pointerenter', onEnter); a.removeEventListener('pointerleave', onEnter); a.removeEventListener('focus', onFocus); });
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <nav ref="el" class="bleed" aria-label="Sections">
    <a href="#"><span>Work</span></a>
    <a href="#"><span>Studio</span></a>
    <a href="#"><span>Journal</span></a>
    <a href="#"><span>Contact</span></a>
  </nav>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.bleed { display: grid; width: 100%; max-width: 380px; border-top: 2px solid var(--ui-text); }
.bleed a {
  --x: 50%; --y: 50%;
  position: relative; display: block; overflow: hidden; padding: 16px 18px;
  font-size: clamp(22px, 4vw, 30px); font-weight: 800; letter-spacing: -0.02em; text-decoration: none;
  color: var(--ui-text); border-bottom: 2px solid var(--ui-text);
}
.bleed a::before {
  content: ""; position: absolute; inset: 0; background: var(--ui-text);
  clip-path: circle(0% at var(--x) var(--y)); transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.bleed a span { position: relative; transition: color 0.25s; }
.bleed a:hover::before, .bleed a:focus-visible::before { clip-path: circle(150% at var(--x) var(--y)); }
.bleed a:hover span, .bleed a:focus-visible span { color: var(--ui-bg); }
.bleed a:focus-visible { outline: none; }
@media (prefers-reduced-motion: reduce) { .bleed a::before { transition: none; } }
</style>
```

## Svelte

`InkBleed.svelte`

```svelte
<!-- tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html -->
<script>
  import { onMount } from 'svelte';
  import './InkBleed.css';

  let node;

  function setup(root) {
    const links = [...root.querySelectorAll('a')];
    const onEnter = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px');
      e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px');
    };
    const onFocus = (e) => { e.currentTarget.style.setProperty('--x', '50%'); e.currentTarget.style.setProperty('--y', '50%'); };
    links.forEach((a) => { a.addEventListener('pointerenter', onEnter); a.addEventListener('pointerleave', onEnter); a.addEventListener('focus', onFocus); });
    return () => links.forEach((a) => { a.removeEventListener('pointerenter', onEnter); a.removeEventListener('pointerleave', onEnter); a.removeEventListener('focus', onFocus); });
  }

  onMount(() => setup(node));
</script>

<nav bind:this={node} class="bleed" aria-label="Sections">
  <a href="#"><span>Work</span></a>
  <a href="#"><span>Studio</span></a>
  <a href="#"><span>Journal</span></a>
  <a href="#"><span>Contact</span></a>
</nav>
```

`InkBleed.css`

```css
/* tearsheet ink-bleed ved54eb86 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-bleed.html */
.bleed { display: grid; width: 100%; max-width: 380px; border-top: 2px solid var(--ui-text); }
.bleed a {
  --x: 50%; --y: 50%;
  position: relative; display: block; overflow: hidden; padding: 16px 18px;
  font-size: clamp(22px, 4vw, 30px); font-weight: 800; letter-spacing: -0.02em; text-decoration: none;
  color: var(--ui-text); border-bottom: 2px solid var(--ui-text);
}
.bleed a::before {
  content: ""; position: absolute; inset: 0; background: var(--ui-text);
  clip-path: circle(0% at var(--x) var(--y)); transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.bleed a span { position: relative; transition: color 0.25s; }
.bleed a:hover::before, .bleed a:focus-visible::before { clip-path: circle(150% at var(--x) var(--y)); }
.bleed a:hover span, .bleed a:focus-visible span { color: var(--ui-bg); }
.bleed a:focus-visible { outline: none; }
@media (prefers-reduced-motion: reduce) { .bleed a::before { transition: none; } }
```
