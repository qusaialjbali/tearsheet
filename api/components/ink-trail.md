# Ink trail pad (Tearsheet, Weird)

Move across the pad and leave a trail of ink dots that spread and fade like wet riso ink.

**Why it works:** Purely decorative, so the canvas is hidden from assistive tech and nothing depends on it. With reduced motion the dots stay put instead of spreading.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html -->
<figure class="trail">
  <canvas class="trail-canvas" aria-hidden="true"></canvas>
  <figcaption>Draw with your pointer or finger</figcaption>
</figure>
```

`styles.css`

```css
/* tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html */
.trail { width: 100%; max-width: 460px; margin: 0; }
.trail-canvas { display: block; width: 100%; height: 240px; background: var(--ui-surface); border: 2px dashed var(--ui-border-strong); border-radius: var(--ui-radius); cursor: crosshair; touch-action: none; }
.trail figcaption { margin-top: 8px; text-align: center; font-size: 13px; color: var(--ui-muted); }
```

`script.js`

```js
/* tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const INKS = ['#ff48b0', '#0078bf'];
  let dots = [], raf = 0, last = null;
  const size = () => {
    const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr; canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'multiply';
    dots = dots.filter((d) => d.life > 0);
    dots.forEach((d) => {
      if (!reduce) { d.r += 0.25; d.life -= 0.012; }
      ctx.globalAlpha = Math.max(0, d.life) * 0.8;
      ctx.fillStyle = d.ink;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    raf = dots.length && !reduce ? requestAnimationFrame(frame) : 0;
  };
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    const p = { x: e.clientX - r.left, y: e.clientY - r.top };
    const dist = last ? Math.hypot(p.x - last.x, p.y - last.y) : 99;
    if (dist < 6) return;
    last = p;
    dots.push({ x: p.x, y: p.y, r: 3 + Math.random() * 4, life: 1, ink: INKS[dots.length % 2] });
    if (reduce) frame();
    else if (!raf) raf = requestAnimationFrame(frame);
  };
  const onLeave = () => (last = null);
  size();
  window.addEventListener('resize', size);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', size);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerleave', onLeave);
  };
}

document.querySelectorAll(".trail").forEach(setup);
```

## React

`InkTrail.jsx`

```jsx
/* tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html */
import { useEffect, useRef } from 'react';
import './InkTrail.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const INKS = ['#ff48b0', '#0078bf'];
  let dots = [], raf = 0, last = null;
  const size = () => {
    const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr; canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'multiply';
    dots = dots.filter((d) => d.life > 0);
    dots.forEach((d) => {
      if (!reduce) { d.r += 0.25; d.life -= 0.012; }
      ctx.globalAlpha = Math.max(0, d.life) * 0.8;
      ctx.fillStyle = d.ink;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    raf = dots.length && !reduce ? requestAnimationFrame(frame) : 0;
  };
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    const p = { x: e.clientX - r.left, y: e.clientY - r.top };
    const dist = last ? Math.hypot(p.x - last.x, p.y - last.y) : 99;
    if (dist < 6) return;
    last = p;
    dots.push({ x: p.x, y: p.y, r: 3 + Math.random() * 4, life: 1, ink: INKS[dots.length % 2] });
    if (reduce) frame();
    else if (!raf) raf = requestAnimationFrame(frame);
  };
  const onLeave = () => (last = null);
  size();
  window.addEventListener('resize', size);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', size);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerleave', onLeave);
  };
}

export function InkTrail() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <figure ref={ref} className="trail">
      <canvas className="trail-canvas" aria-hidden="true"></canvas>
      <figcaption>Draw with your pointer or finger</figcaption>
    </figure>
  );
}
```

`InkTrail.css`

```css
/* tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html */
.trail { width: 100%; max-width: 460px; margin: 0; }
.trail-canvas { display: block; width: 100%; height: 240px; background: var(--ui-surface); border: 2px dashed var(--ui-border-strong); border-radius: var(--ui-radius); cursor: crosshair; touch-action: none; }
.trail figcaption { margin-top: 8px; text-align: center; font-size: 13px; color: var(--ui-muted); }
```

## Vue

`InkTrail.vue`

```vue
<!-- tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const INKS = ['#ff48b0', '#0078bf'];
  let dots = [], raf = 0, last = null;
  const size = () => {
    const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr; canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'multiply';
    dots = dots.filter((d) => d.life > 0);
    dots.forEach((d) => {
      if (!reduce) { d.r += 0.25; d.life -= 0.012; }
      ctx.globalAlpha = Math.max(0, d.life) * 0.8;
      ctx.fillStyle = d.ink;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    raf = dots.length && !reduce ? requestAnimationFrame(frame) : 0;
  };
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    const p = { x: e.clientX - r.left, y: e.clientY - r.top };
    const dist = last ? Math.hypot(p.x - last.x, p.y - last.y) : 99;
    if (dist < 6) return;
    last = p;
    dots.push({ x: p.x, y: p.y, r: 3 + Math.random() * 4, life: 1, ink: INKS[dots.length % 2] });
    if (reduce) frame();
    else if (!raf) raf = requestAnimationFrame(frame);
  };
  const onLeave = () => (last = null);
  size();
  window.addEventListener('resize', size);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', size);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerleave', onLeave);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <figure ref="el" class="trail">
    <canvas class="trail-canvas" aria-hidden="true"></canvas>
    <figcaption>Draw with your pointer or finger</figcaption>
  </figure>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.trail { width: 100%; max-width: 460px; margin: 0; }
.trail-canvas { display: block; width: 100%; height: 240px; background: var(--ui-surface); border: 2px dashed var(--ui-border-strong); border-radius: var(--ui-radius); cursor: crosshair; touch-action: none; }
.trail figcaption { margin-top: 8px; text-align: center; font-size: 13px; color: var(--ui-muted); }
</style>
```

## Svelte

`InkTrail.svelte`

```svelte
<!-- tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html -->
<script>
  import { onMount } from 'svelte';
  import './InkTrail.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = root.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const INKS = ['#ff48b0', '#0078bf'];
    let dots = [], raf = 0, last = null;
    const size = () => {
      const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'multiply';
      dots = dots.filter((d) => d.life > 0);
      dots.forEach((d) => {
        if (!reduce) { d.r += 0.25; d.life -= 0.012; }
        ctx.globalAlpha = Math.max(0, d.life) * 0.8;
        ctx.fillStyle = d.ink;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = dots.length && !reduce ? requestAnimationFrame(frame) : 0;
    };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const p = { x: e.clientX - r.left, y: e.clientY - r.top };
      const dist = last ? Math.hypot(p.x - last.x, p.y - last.y) : 99;
      if (dist < 6) return;
      last = p;
      dots.push({ x: p.x, y: p.y, r: 3 + Math.random() * 4, life: 1, ink: INKS[dots.length % 2] });
      if (reduce) frame();
      else if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => (last = null);
    size();
    window.addEventListener('resize', size);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }

  onMount(() => setup(node));
</script>

<figure bind:this={node} class="trail">
  <canvas class="trail-canvas" aria-hidden="true"></canvas>
  <figcaption>Draw with your pointer or finger</figcaption>
</figure>
```

`InkTrail.css`

```css
/* tearsheet ink-trail v3e0552b1 · https://qusaialjbali.github.io/tearsheet/zine/parts/ink-trail.html */
.trail { width: 100%; max-width: 460px; margin: 0; }
.trail-canvas { display: block; width: 100%; height: 240px; background: var(--ui-surface); border: 2px dashed var(--ui-border-strong); border-radius: var(--ui-radius); cursor: crosshair; touch-action: none; }
.trail figcaption { margin-top: 8px; text-align: center; font-size: 13px; color: var(--ui-muted); }
```
