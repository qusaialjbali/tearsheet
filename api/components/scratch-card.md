# Scratch card (Tearsheet, Weird)

Scratch off a foil layer with your cursor or finger to reveal a hidden code.

**Why it works:** The prize text is real text underneath (screen readers can read it), and “Reveal without scratching” gives keyboard users the same result.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html -->
<div class="scratch">
  <div class="scratch-card">
    <p class="scratch-prize"><span>Your discount code</span><strong>TEAR-25</strong></p>
    <canvas class="scratch-foil" aria-hidden="true"></canvas>
  </div>
  <button class="scratch-reveal" type="button">Reveal without scratching</button>
</div>
```

`styles.css`

```css
/* tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html */
.scratch { display: grid; justify-items: center; gap: 12px; }
.scratch-card {
  position: relative;
  width: 300px;
  height: 160px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--ui-accent-soft);
  border: 2px dashed var(--ui-accent);
}
.scratch-prize {
  display: grid;
  place-content: center;
  gap: 4px;
  height: 100%;
  margin: 0;
  text-align: center;
  color: var(--ui-text);
}
.scratch-prize span { font-size: 13px; color: var(--ui-muted); }
.scratch-prize strong { font-size: 28px; letter-spacing: 0.06em; color: var(--ui-accent); }
.scratch-foil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: none;
  transition: opacity 0.6s;
}
.scratch.is-done .scratch-foil { opacity: 0; pointer-events: none; }
.scratch-reveal {
  padding: 6px 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-accent);
  background: none;
  border: 0;
  border-radius: 6px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.scratch-reveal:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

`script.js`

```js
/* tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html */
function setup(root) {
  const canvas = root.querySelector('.scratch-foil');
  const reveal = root.querySelector('.scratch-reveal');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let last = null;
  let strokes = 0;

  const paint = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, '#b8bcc6');
    g.addColorStop(0.5, '#e9ebf0');
    g.addColorStop(1, '#9ea3ad');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.font = '700 15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', r.width / 2, r.height / 2 + 5);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36;
    ctx.lineCap = 'round';
  };
  const cleared = () => {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
    return clear / (data.length / 64);
  };
  const point = (e) => {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const onDown = (e) => {
    drawing = true;
    last = point(e);
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drawing) return;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(last[0], last[1]);
    ctx.lineTo(p[0], p[1]);
    ctx.stroke();
    last = p;
    if (++strokes % 12 === 0 && cleared() > 0.5) root.classList.add('is-done');
  };
  const onUp = () => (drawing = false);
  const onReveal = () => root.classList.add('is-done');

  paint();
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  reveal.addEventListener('click', onReveal);
  return () => {
    canvas.removeEventListener('pointerdown', onDown);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerup', onUp);
    reveal.removeEventListener('click', onReveal);
  };
}

document.querySelectorAll(".scratch").forEach(setup);
```

## React

`ScratchCard.jsx`

```jsx
/* tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html */
import { useEffect, useRef } from 'react';
import './ScratchCard.css';

function setup(root) {
  const canvas = root.querySelector('.scratch-foil');
  const reveal = root.querySelector('.scratch-reveal');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let last = null;
  let strokes = 0;

  const paint = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, '#b8bcc6');
    g.addColorStop(0.5, '#e9ebf0');
    g.addColorStop(1, '#9ea3ad');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.font = '700 15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', r.width / 2, r.height / 2 + 5);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36;
    ctx.lineCap = 'round';
  };
  const cleared = () => {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
    return clear / (data.length / 64);
  };
  const point = (e) => {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const onDown = (e) => {
    drawing = true;
    last = point(e);
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drawing) return;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(last[0], last[1]);
    ctx.lineTo(p[0], p[1]);
    ctx.stroke();
    last = p;
    if (++strokes % 12 === 0 && cleared() > 0.5) root.classList.add('is-done');
  };
  const onUp = () => (drawing = false);
  const onReveal = () => root.classList.add('is-done');

  paint();
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  reveal.addEventListener('click', onReveal);
  return () => {
    canvas.removeEventListener('pointerdown', onDown);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerup', onUp);
    reveal.removeEventListener('click', onReveal);
  };
}

export function ScratchCard() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="scratch">
      <div className="scratch-card">
        <p className="scratch-prize"><span>Your discount code</span><strong>TEAR-25</strong></p>
        <canvas className="scratch-foil" aria-hidden="true"></canvas>
      </div>
      <button className="scratch-reveal" type="button">Reveal without scratching</button>
    </div>
  );
}
```

`ScratchCard.css`

```css
/* tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html */
.scratch { display: grid; justify-items: center; gap: 12px; }
.scratch-card {
  position: relative;
  width: 300px;
  height: 160px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--ui-accent-soft);
  border: 2px dashed var(--ui-accent);
}
.scratch-prize {
  display: grid;
  place-content: center;
  gap: 4px;
  height: 100%;
  margin: 0;
  text-align: center;
  color: var(--ui-text);
}
.scratch-prize span { font-size: 13px; color: var(--ui-muted); }
.scratch-prize strong { font-size: 28px; letter-spacing: 0.06em; color: var(--ui-accent); }
.scratch-foil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: none;
  transition: opacity 0.6s;
}
.scratch.is-done .scratch-foil { opacity: 0; pointer-events: none; }
.scratch-reveal {
  padding: 6px 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-accent);
  background: none;
  border: 0;
  border-radius: 6px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.scratch-reveal:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`ScratchCard.vue`

```vue
<!-- tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const canvas = root.querySelector('.scratch-foil');
  const reveal = root.querySelector('.scratch-reveal');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let last = null;
  let strokes = 0;

  const paint = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, '#b8bcc6');
    g.addColorStop(0.5, '#e9ebf0');
    g.addColorStop(1, '#9ea3ad');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.font = '700 15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', r.width / 2, r.height / 2 + 5);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36;
    ctx.lineCap = 'round';
  };
  const cleared = () => {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
    return clear / (data.length / 64);
  };
  const point = (e) => {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const onDown = (e) => {
    drawing = true;
    last = point(e);
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drawing) return;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(last[0], last[1]);
    ctx.lineTo(p[0], p[1]);
    ctx.stroke();
    last = p;
    if (++strokes % 12 === 0 && cleared() > 0.5) root.classList.add('is-done');
  };
  const onUp = () => (drawing = false);
  const onReveal = () => root.classList.add('is-done');

  paint();
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  reveal.addEventListener('click', onReveal);
  return () => {
    canvas.removeEventListener('pointerdown', onDown);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerup', onUp);
    reveal.removeEventListener('click', onReveal);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="scratch">
    <div class="scratch-card">
      <p class="scratch-prize"><span>Your discount code</span><strong>TEAR-25</strong></p>
      <canvas class="scratch-foil" aria-hidden="true"></canvas>
    </div>
    <button class="scratch-reveal" type="button">Reveal without scratching</button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.scratch { display: grid; justify-items: center; gap: 12px; }
.scratch-card {
  position: relative;
  width: 300px;
  height: 160px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--ui-accent-soft);
  border: 2px dashed var(--ui-accent);
}
.scratch-prize {
  display: grid;
  place-content: center;
  gap: 4px;
  height: 100%;
  margin: 0;
  text-align: center;
  color: var(--ui-text);
}
.scratch-prize span { font-size: 13px; color: var(--ui-muted); }
.scratch-prize strong { font-size: 28px; letter-spacing: 0.06em; color: var(--ui-accent); }
.scratch-foil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: none;
  transition: opacity 0.6s;
}
.scratch.is-done .scratch-foil { opacity: 0; pointer-events: none; }
.scratch-reveal {
  padding: 6px 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-accent);
  background: none;
  border: 0;
  border-radius: 6px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.scratch-reveal:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`ScratchCard.svelte`

```svelte
<!-- tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html -->
<script>
  import { onMount } from 'svelte';
  import './ScratchCard.css';

  let node;

  function setup(root) {
    const canvas = root.querySelector('.scratch-foil');
    const reveal = root.querySelector('.scratch-reveal');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let last = null;
    let strokes = 0;

    const paint = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
      const g = ctx.createLinearGradient(0, 0, r.width, r.height);
      g.addColorStop(0, '#b8bcc6');
      g.addColorStop(0.5, '#e9ebf0');
      g.addColorStop(1, '#9ea3ad');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, r.width, r.height);
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.font = '700 15px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH HERE', r.width / 2, r.height / 2 + 5);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 36;
      ctx.lineCap = 'round';
    };
    const cleared = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
      return clear / (data.length / 64);
    };
    const point = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const onDown = (e) => {
      drawing = true;
      last = point(e);
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!drawing) return;
      const p = point(e);
      ctx.beginPath();
      ctx.moveTo(last[0], last[1]);
      ctx.lineTo(p[0], p[1]);
      ctx.stroke();
      last = p;
      if (++strokes % 12 === 0 && cleared() > 0.5) root.classList.add('is-done');
    };
    const onUp = () => (drawing = false);
    const onReveal = () => root.classList.add('is-done');

    paint();
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    reveal.addEventListener('click', onReveal);
    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      reveal.removeEventListener('click', onReveal);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="scratch">
  <div class="scratch-card">
    <p class="scratch-prize"><span>Your discount code</span><strong>TEAR-25</strong></p>
    <canvas class="scratch-foil" aria-hidden="true"></canvas>
  </div>
  <button class="scratch-reveal" type="button">Reveal without scratching</button>
</div>
```

`ScratchCard.css`

```css
/* tearsheet scratch-card vca084053 · https://qusaialjbali.github.io/tearsheet/zine/parts/scratch-card.html */
.scratch { display: grid; justify-items: center; gap: 12px; }
.scratch-card {
  position: relative;
  width: 300px;
  height: 160px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--ui-accent-soft);
  border: 2px dashed var(--ui-accent);
}
.scratch-prize {
  display: grid;
  place-content: center;
  gap: 4px;
  height: 100%;
  margin: 0;
  text-align: center;
  color: var(--ui-text);
}
.scratch-prize span { font-size: 13px; color: var(--ui-muted); }
.scratch-prize strong { font-size: 28px; letter-spacing: 0.06em; color: var(--ui-accent); }
.scratch-foil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: none;
  transition: opacity 0.6s;
}
.scratch.is-done .scratch-foil { opacity: 0; pointer-events: none; }
.scratch-reveal {
  padding: 6px 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-accent);
  background: none;
  border: 0;
  border-radius: 6px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.scratch-reveal:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```
