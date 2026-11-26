# Holographic card (Tearsheet, Weird)

A foil membership card that tilts in 3D and throws a moving rainbow sheen as you move across it.

**Why it works:** Keyboard users can tilt it with the arrow keys once it has focus. Reduced motion keeps a still foil and no tilt.

**Checked:** axe clean in light and dark; 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html -->
<div class="holo" tabindex="0" role="img" aria-label="Holographic membership card for Ada Lovelace, member number 000417">
  <div class="holo-shine" aria-hidden="true"></div>
  <div class="holo-chip" aria-hidden="true"></div>
  <p class="holo-brand" aria-hidden="true">TEARSHEET</p>
  <div class="holo-foot" aria-hidden="true">
    <p class="holo-name">Ada Lovelace</p>
    <p class="holo-meta">Member No. 000417</p>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html */
.holo {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  position: relative;
  width: 320px;
  aspect-ratio: 1.586;
  padding: 22px 24px;
  overflow: hidden;
  color: #fff;
  border-radius: 18px;
  background:
    radial-gradient(120% 120% at 0% 0%, #3b2a7a, transparent 60%),
    radial-gradient(120% 120% at 100% 100%, #0f6b78, transparent 60%),
    #17152b;
  box-shadow: 0 24px 50px -12px rgb(0 0 0 / 0.5);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: grab;
}
.holo.is-active { transition: transform 0.08s linear; }
.holo:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.holo-shine {
  position: absolute;
  inset: 0;
  mix-blend-mode: color-dodge;
  opacity: 0.55;
  background:
    radial-gradient(circle at var(--mx) var(--my), rgb(255 255 255 / 0.7), transparent 38%),
    linear-gradient(115deg, #ff3cac 0%, #f5d300 20%, #2bd2ff 40%, #8bff7a 60%, #ff3cac 80%, #f5d300 100%);
  background-size: 100% 100%, 300% 300%;
  background-position: center, var(--mx) var(--my);
  pointer-events: none;
}
.holo-chip {
  width: 44px;
  height: 34px;
  border-radius: 7px;
  background: linear-gradient(135deg, #f7e29b, #c9a24a);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.2);
}
.holo-brand { position: absolute; top: 22px; right: 24px; margin: 0; font-weight: 800; letter-spacing: 0.24em; font-size: 14px; }
.holo-foot { position: absolute; left: 24px; bottom: 20px; }
.holo-name { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.02em; }
.holo-meta { margin: 2px 0 0; font-size: 12px; opacity: 0.75; letter-spacing: 0.08em; font-variant-numeric: tabular-nums; }
```

`script.js`

```js
/* tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const set = (px, py) => {
    root.style.setProperty('--ry', (px - 0.5) * 24 + 'deg');
    root.style.setProperty('--rx', (0.5 - py) * 24 + 'deg');
    root.style.setProperty('--mx', px * 100 + '%');
    root.style.setProperty('--my', py * 100 + '%');
  };
  let kx = 0.5;
  let ky = 0.5;

  const onMove = (e) => {
    const r = root.getBoundingClientRect();
    root.classList.add('is-active');
    set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    root.classList.remove('is-active');
    set(0.5, 0.5);
  };
  const onKey = (e) => {
    const step = { ArrowLeft: [-0.1, 0], ArrowRight: [0.1, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1] }[e.key];
    if (!step) return;
    e.preventDefault();
    kx = Math.min(1, Math.max(0, kx + step[0]));
    ky = Math.min(1, Math.max(0, ky + step[1]));
    set(kx, ky);
  };

  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('keydown', onKey);
  return () => {
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('keydown', onKey);
  };
}

document.querySelectorAll(".holo").forEach(setup);
```

## React

`HoloCard.jsx`

```jsx
/* tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html */
import { useEffect, useRef } from 'react';
import './HoloCard.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const set = (px, py) => {
    root.style.setProperty('--ry', (px - 0.5) * 24 + 'deg');
    root.style.setProperty('--rx', (0.5 - py) * 24 + 'deg');
    root.style.setProperty('--mx', px * 100 + '%');
    root.style.setProperty('--my', py * 100 + '%');
  };
  let kx = 0.5;
  let ky = 0.5;

  const onMove = (e) => {
    const r = root.getBoundingClientRect();
    root.classList.add('is-active');
    set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    root.classList.remove('is-active');
    set(0.5, 0.5);
  };
  const onKey = (e) => {
    const step = { ArrowLeft: [-0.1, 0], ArrowRight: [0.1, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1] }[e.key];
    if (!step) return;
    e.preventDefault();
    kx = Math.min(1, Math.max(0, kx + step[0]));
    ky = Math.min(1, Math.max(0, ky + step[1]));
    set(kx, ky);
  };

  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('keydown', onKey);
  return () => {
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('keydown', onKey);
  };
}

export function HoloCard() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="holo" tabIndex={0} role="img" aria-label="Holographic membership card for Ada Lovelace, member number 000417">
      <div className="holo-shine" aria-hidden="true"></div>
      <div className="holo-chip" aria-hidden="true"></div>
      <p className="holo-brand" aria-hidden="true">TEARSHEET</p>
      <div className="holo-foot" aria-hidden="true">
        <p className="holo-name">Ada Lovelace</p>
        <p className="holo-meta">Member No. 000417</p>
      </div>
    </div>
  );
}
```

`HoloCard.css`

```css
/* tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html */
.holo {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  position: relative;
  width: 320px;
  aspect-ratio: 1.586;
  padding: 22px 24px;
  overflow: hidden;
  color: #fff;
  border-radius: 18px;
  background:
    radial-gradient(120% 120% at 0% 0%, #3b2a7a, transparent 60%),
    radial-gradient(120% 120% at 100% 100%, #0f6b78, transparent 60%),
    #17152b;
  box-shadow: 0 24px 50px -12px rgb(0 0 0 / 0.5);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: grab;
}
.holo.is-active { transition: transform 0.08s linear; }
.holo:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.holo-shine {
  position: absolute;
  inset: 0;
  mix-blend-mode: color-dodge;
  opacity: 0.55;
  background:
    radial-gradient(circle at var(--mx) var(--my), rgb(255 255 255 / 0.7), transparent 38%),
    linear-gradient(115deg, #ff3cac 0%, #f5d300 20%, #2bd2ff 40%, #8bff7a 60%, #ff3cac 80%, #f5d300 100%);
  background-size: 100% 100%, 300% 300%;
  background-position: center, var(--mx) var(--my);
  pointer-events: none;
}
.holo-chip {
  width: 44px;
  height: 34px;
  border-radius: 7px;
  background: linear-gradient(135deg, #f7e29b, #c9a24a);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.2);
}
.holo-brand { position: absolute; top: 22px; right: 24px; margin: 0; font-weight: 800; letter-spacing: 0.24em; font-size: 14px; }
.holo-foot { position: absolute; left: 24px; bottom: 20px; }
.holo-name { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.02em; }
.holo-meta { margin: 2px 0 0; font-size: 12px; opacity: 0.75; letter-spacing: 0.08em; font-variant-numeric: tabular-nums; }
```

## Vue

`HoloCard.vue`

```vue
<!-- tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const set = (px, py) => {
    root.style.setProperty('--ry', (px - 0.5) * 24 + 'deg');
    root.style.setProperty('--rx', (0.5 - py) * 24 + 'deg');
    root.style.setProperty('--mx', px * 100 + '%');
    root.style.setProperty('--my', py * 100 + '%');
  };
  let kx = 0.5;
  let ky = 0.5;

  const onMove = (e) => {
    const r = root.getBoundingClientRect();
    root.classList.add('is-active');
    set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    root.classList.remove('is-active');
    set(0.5, 0.5);
  };
  const onKey = (e) => {
    const step = { ArrowLeft: [-0.1, 0], ArrowRight: [0.1, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1] }[e.key];
    if (!step) return;
    e.preventDefault();
    kx = Math.min(1, Math.max(0, kx + step[0]));
    ky = Math.min(1, Math.max(0, ky + step[1]));
    set(kx, ky);
  };

  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('keydown', onKey);
  return () => {
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('keydown', onKey);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="holo" tabindex="0" role="img" aria-label="Holographic membership card for Ada Lovelace, member number 000417">
    <div class="holo-shine" aria-hidden="true"></div>
    <div class="holo-chip" aria-hidden="true"></div>
    <p class="holo-brand" aria-hidden="true">TEARSHEET</p>
    <div class="holo-foot" aria-hidden="true">
      <p class="holo-name">Ada Lovelace</p>
      <p class="holo-meta">Member No. 000417</p>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.holo {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  position: relative;
  width: 320px;
  aspect-ratio: 1.586;
  padding: 22px 24px;
  overflow: hidden;
  color: #fff;
  border-radius: 18px;
  background:
    radial-gradient(120% 120% at 0% 0%, #3b2a7a, transparent 60%),
    radial-gradient(120% 120% at 100% 100%, #0f6b78, transparent 60%),
    #17152b;
  box-shadow: 0 24px 50px -12px rgb(0 0 0 / 0.5);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: grab;
}
.holo.is-active { transition: transform 0.08s linear; }
.holo:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.holo-shine {
  position: absolute;
  inset: 0;
  mix-blend-mode: color-dodge;
  opacity: 0.55;
  background:
    radial-gradient(circle at var(--mx) var(--my), rgb(255 255 255 / 0.7), transparent 38%),
    linear-gradient(115deg, #ff3cac 0%, #f5d300 20%, #2bd2ff 40%, #8bff7a 60%, #ff3cac 80%, #f5d300 100%);
  background-size: 100% 100%, 300% 300%;
  background-position: center, var(--mx) var(--my);
  pointer-events: none;
}
.holo-chip {
  width: 44px;
  height: 34px;
  border-radius: 7px;
  background: linear-gradient(135deg, #f7e29b, #c9a24a);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.2);
}
.holo-brand { position: absolute; top: 22px; right: 24px; margin: 0; font-weight: 800; letter-spacing: 0.24em; font-size: 14px; }
.holo-foot { position: absolute; left: 24px; bottom: 20px; }
.holo-name { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.02em; }
.holo-meta { margin: 2px 0 0; font-size: 12px; opacity: 0.75; letter-spacing: 0.08em; font-variant-numeric: tabular-nums; }
</style>
```

## Svelte

`HoloCard.svelte`

```svelte
<!-- tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html -->
<script>
  import { onMount } from 'svelte';
  import './HoloCard.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const set = (px, py) => {
      root.style.setProperty('--ry', (px - 0.5) * 24 + 'deg');
      root.style.setProperty('--rx', (0.5 - py) * 24 + 'deg');
      root.style.setProperty('--mx', px * 100 + '%');
      root.style.setProperty('--my', py * 100 + '%');
    };
    let kx = 0.5;
    let ky = 0.5;

    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      root.classList.add('is-active');
      set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    };
    const onLeave = () => {
      root.classList.remove('is-active');
      set(0.5, 0.5);
    };
    const onKey = (e) => {
      const step = { ArrowLeft: [-0.1, 0], ArrowRight: [0.1, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1] }[e.key];
      if (!step) return;
      e.preventDefault();
      kx = Math.min(1, Math.max(0, kx + step[0]));
      ky = Math.min(1, Math.max(0, ky + step[1]));
      set(kx, ky);
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('keydown', onKey);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="holo" tabindex="0" role="img" aria-label="Holographic membership card for Ada Lovelace, member number 000417">
  <div class="holo-shine" aria-hidden="true"></div>
  <div class="holo-chip" aria-hidden="true"></div>
  <p class="holo-brand" aria-hidden="true">TEARSHEET</p>
  <div class="holo-foot" aria-hidden="true">
    <p class="holo-name">Ada Lovelace</p>
    <p class="holo-meta">Member No. 000417</p>
  </div>
</div>
```

`HoloCard.css`

```css
/* tearsheet holo-card v7291d454 · https://qusaialjbali.github.io/tearsheet/zine/parts/holo-card.html */
.holo {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  position: relative;
  width: 320px;
  aspect-ratio: 1.586;
  padding: 22px 24px;
  overflow: hidden;
  color: #fff;
  border-radius: 18px;
  background:
    radial-gradient(120% 120% at 0% 0%, #3b2a7a, transparent 60%),
    radial-gradient(120% 120% at 100% 100%, #0f6b78, transparent 60%),
    #17152b;
  box-shadow: 0 24px 50px -12px rgb(0 0 0 / 0.5);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: grab;
}
.holo.is-active { transition: transform 0.08s linear; }
.holo:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.holo-shine {
  position: absolute;
  inset: 0;
  mix-blend-mode: color-dodge;
  opacity: 0.55;
  background:
    radial-gradient(circle at var(--mx) var(--my), rgb(255 255 255 / 0.7), transparent 38%),
    linear-gradient(115deg, #ff3cac 0%, #f5d300 20%, #2bd2ff 40%, #8bff7a 60%, #ff3cac 80%, #f5d300 100%);
  background-size: 100% 100%, 300% 300%;
  background-position: center, var(--mx) var(--my);
  pointer-events: none;
}
.holo-chip {
  width: 44px;
  height: 34px;
  border-radius: 7px;
  background: linear-gradient(135deg, #f7e29b, #c9a24a);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.2);
}
.holo-brand { position: absolute; top: 22px; right: 24px; margin: 0; font-weight: 800; letter-spacing: 0.24em; font-size: 14px; }
.holo-foot { position: absolute; left: 24px; bottom: 20px; }
.holo-name { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.02em; }
.holo-meta { margin: 2px 0 0; font-size: 12px; opacity: 0.75; letter-spacing: 0.08em; font-variant-numeric: tabular-nums; }
```
