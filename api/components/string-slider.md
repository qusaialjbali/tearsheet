# Elastic string slider (Tearsheet, Weird)

A slider drawn as a guitar string: drag the thumb up or down and it bends, let go and it twangs back.

**Why it works:** A real range input sits on top, so arrow keys, screen readers and forms all work. Keyboard changes give the string a small pluck; reduced motion keeps it straight.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html -->
<div class="string">
  <div class="string-head">
    <label for="tension">Tension</label>
    <output class="string-value" for="tension">50</output>
  </div>
  <div class="string-track">
    <svg class="string-svg" aria-hidden="true"><path class="string-path"/></svg>
    <input class="string-input" id="tension" type="range" min="0" max="100" value="50">
    <span class="string-thumb" aria-hidden="true"></span>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html */
.string { width: 100%; max-width: 420px; }
.string-head { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.string-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.string-track { position: relative; height: 90px; }
.string-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.string-path { fill: none; stroke: var(--ui-text); stroke-width: 2.5; stroke-linecap: round; }
.string-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: grab;
}
.string-input:active { cursor: grabbing; }
.string-thumb {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border-radius: 50%;
  background: var(--ui-accent);
  border: 3px solid var(--ui-bg);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
  pointer-events: none;
}
.string-input:focus-visible ~ .string-thumb { box-shadow: var(--ui-focus), 0 2px 8px rgb(0 0 0 / 0.3); }
```

`script.js`

```js
/* tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const input = root.querySelector('.string-input');
  const output = root.querySelector('.string-value');
  const track = root.querySelector('.string-track');
  const path = root.querySelector('.string-path');
  const thumb = root.querySelector('.string-thumb');
  let bend = 0;
  let velocity = 0;
  let dragging = false;
  let raf;

  const pad = 12;
  const draw = () => {
    const w = track.clientWidth;
    const h = track.clientHeight;
    const mid = h / 2;
    const pct = (input.value - input.min) / (input.max - input.min);
    const x = pad + pct * (w - pad * 2);
    const y = mid + bend;
    path.setAttribute('d', 'M' + pad + ' ' + mid + ' Q' + (pad + x) / 2 + ' ' + y + ' ' + x + ' ' + y + ' Q' + (x + w - pad) / 2 + ' ' + y + ' ' + (w - pad) + ' ' + mid);
    thumb.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    output.textContent = input.value;
  };
  const spring = () => {
    cancelAnimationFrame(raf);
    const step = () => {
      velocity = (velocity - bend * 0.18) * 0.86;
      bend += velocity;
      draw();
      if (Math.abs(bend) > 0.2 || Math.abs(velocity) > 0.2) raf = requestAnimationFrame(step);
      else {
        bend = 0;
        draw();
      }
    };
    raf = requestAnimationFrame(step);
  };
  const onDown = () => {
    dragging = true;
    cancelAnimationFrame(raf);
  };
  const onMove = (e) => {
    if (!dragging || reduce) return;
    const r = track.getBoundingClientRect();
    bend = Math.max(-34, Math.min(34, e.clientY - (r.top + r.height / 2)));
    draw();
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    if (!reduce) spring();
  };
  const onKey = () => {
    if (reduce) return;
    velocity = 7;
    spring();
  };

  input.addEventListener('pointerdown', onDown);
  input.addEventListener('input', draw);
  input.addEventListener('keydown', onKey);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  const ro = new ResizeObserver(draw);
  ro.observe(track);
  draw();
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    input.removeEventListener('pointerdown', onDown);
    input.removeEventListener('input', draw);
    input.removeEventListener('keydown', onKey);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  };
}

document.querySelectorAll(".string").forEach(setup);
```

## React

`StringSlider.jsx`

```jsx
/* tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html */
import { useEffect, useRef } from 'react';
import './StringSlider.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const input = root.querySelector('.string-input');
  const output = root.querySelector('.string-value');
  const track = root.querySelector('.string-track');
  const path = root.querySelector('.string-path');
  const thumb = root.querySelector('.string-thumb');
  let bend = 0;
  let velocity = 0;
  let dragging = false;
  let raf;

  const pad = 12;
  const draw = () => {
    const w = track.clientWidth;
    const h = track.clientHeight;
    const mid = h / 2;
    const pct = (input.value - input.min) / (input.max - input.min);
    const x = pad + pct * (w - pad * 2);
    const y = mid + bend;
    path.setAttribute('d', 'M' + pad + ' ' + mid + ' Q' + (pad + x) / 2 + ' ' + y + ' ' + x + ' ' + y + ' Q' + (x + w - pad) / 2 + ' ' + y + ' ' + (w - pad) + ' ' + mid);
    thumb.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    output.textContent = input.value;
  };
  const spring = () => {
    cancelAnimationFrame(raf);
    const step = () => {
      velocity = (velocity - bend * 0.18) * 0.86;
      bend += velocity;
      draw();
      if (Math.abs(bend) > 0.2 || Math.abs(velocity) > 0.2) raf = requestAnimationFrame(step);
      else {
        bend = 0;
        draw();
      }
    };
    raf = requestAnimationFrame(step);
  };
  const onDown = () => {
    dragging = true;
    cancelAnimationFrame(raf);
  };
  const onMove = (e) => {
    if (!dragging || reduce) return;
    const r = track.getBoundingClientRect();
    bend = Math.max(-34, Math.min(34, e.clientY - (r.top + r.height / 2)));
    draw();
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    if (!reduce) spring();
  };
  const onKey = () => {
    if (reduce) return;
    velocity = 7;
    spring();
  };

  input.addEventListener('pointerdown', onDown);
  input.addEventListener('input', draw);
  input.addEventListener('keydown', onKey);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  const ro = new ResizeObserver(draw);
  ro.observe(track);
  draw();
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    input.removeEventListener('pointerdown', onDown);
    input.removeEventListener('input', draw);
    input.removeEventListener('keydown', onKey);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  };
}

export function StringSlider() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="string">
      <div className="string-head">
        <label htmlFor="tension">Tension</label>
        <output className="string-value" htmlFor="tension">50</output>
      </div>
      <div className="string-track">
        <svg className="string-svg" aria-hidden="true"><path className="string-path"/></svg>
        <input className="string-input" id="tension" type="range" min="0" max="100" defaultValue="50" />
        <span className="string-thumb" aria-hidden="true"></span>
      </div>
    </div>
  );
}
```

`StringSlider.css`

```css
/* tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html */
.string { width: 100%; max-width: 420px; }
.string-head { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.string-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.string-track { position: relative; height: 90px; }
.string-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.string-path { fill: none; stroke: var(--ui-text); stroke-width: 2.5; stroke-linecap: round; }
.string-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: grab;
}
.string-input:active { cursor: grabbing; }
.string-thumb {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border-radius: 50%;
  background: var(--ui-accent);
  border: 3px solid var(--ui-bg);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
  pointer-events: none;
}
.string-input:focus-visible ~ .string-thumb { box-shadow: var(--ui-focus), 0 2px 8px rgb(0 0 0 / 0.3); }
```

## Vue

`StringSlider.vue`

```vue
<!-- tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const input = root.querySelector('.string-input');
  const output = root.querySelector('.string-value');
  const track = root.querySelector('.string-track');
  const path = root.querySelector('.string-path');
  const thumb = root.querySelector('.string-thumb');
  let bend = 0;
  let velocity = 0;
  let dragging = false;
  let raf;

  const pad = 12;
  const draw = () => {
    const w = track.clientWidth;
    const h = track.clientHeight;
    const mid = h / 2;
    const pct = (input.value - input.min) / (input.max - input.min);
    const x = pad + pct * (w - pad * 2);
    const y = mid + bend;
    path.setAttribute('d', 'M' + pad + ' ' + mid + ' Q' + (pad + x) / 2 + ' ' + y + ' ' + x + ' ' + y + ' Q' + (x + w - pad) / 2 + ' ' + y + ' ' + (w - pad) + ' ' + mid);
    thumb.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    output.textContent = input.value;
  };
  const spring = () => {
    cancelAnimationFrame(raf);
    const step = () => {
      velocity = (velocity - bend * 0.18) * 0.86;
      bend += velocity;
      draw();
      if (Math.abs(bend) > 0.2 || Math.abs(velocity) > 0.2) raf = requestAnimationFrame(step);
      else {
        bend = 0;
        draw();
      }
    };
    raf = requestAnimationFrame(step);
  };
  const onDown = () => {
    dragging = true;
    cancelAnimationFrame(raf);
  };
  const onMove = (e) => {
    if (!dragging || reduce) return;
    const r = track.getBoundingClientRect();
    bend = Math.max(-34, Math.min(34, e.clientY - (r.top + r.height / 2)));
    draw();
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    if (!reduce) spring();
  };
  const onKey = () => {
    if (reduce) return;
    velocity = 7;
    spring();
  };

  input.addEventListener('pointerdown', onDown);
  input.addEventListener('input', draw);
  input.addEventListener('keydown', onKey);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  const ro = new ResizeObserver(draw);
  ro.observe(track);
  draw();
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    input.removeEventListener('pointerdown', onDown);
    input.removeEventListener('input', draw);
    input.removeEventListener('keydown', onKey);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="string">
    <div class="string-head">
      <label for="tension">Tension</label>
      <output class="string-value" for="tension">50</output>
    </div>
    <div class="string-track">
      <svg class="string-svg" aria-hidden="true"><path class="string-path"/></svg>
      <input class="string-input" id="tension" type="range" min="0" max="100" value="50">
      <span class="string-thumb" aria-hidden="true"></span>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.string { width: 100%; max-width: 420px; }
.string-head { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.string-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.string-track { position: relative; height: 90px; }
.string-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.string-path { fill: none; stroke: var(--ui-text); stroke-width: 2.5; stroke-linecap: round; }
.string-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: grab;
}
.string-input:active { cursor: grabbing; }
.string-thumb {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border-radius: 50%;
  background: var(--ui-accent);
  border: 3px solid var(--ui-bg);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
  pointer-events: none;
}
.string-input:focus-visible ~ .string-thumb { box-shadow: var(--ui-focus), 0 2px 8px rgb(0 0 0 / 0.3); }
</style>
```

## Svelte

`StringSlider.svelte`

```svelte
<!-- tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html -->
<script>
  import { onMount } from 'svelte';
  import './StringSlider.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const input = root.querySelector('.string-input');
    const output = root.querySelector('.string-value');
    const track = root.querySelector('.string-track');
    const path = root.querySelector('.string-path');
    const thumb = root.querySelector('.string-thumb');
    let bend = 0;
    let velocity = 0;
    let dragging = false;
    let raf;

    const pad = 12;
    const draw = () => {
      const w = track.clientWidth;
      const h = track.clientHeight;
      const mid = h / 2;
      const pct = (input.value - input.min) / (input.max - input.min);
      const x = pad + pct * (w - pad * 2);
      const y = mid + bend;
      path.setAttribute('d', 'M' + pad + ' ' + mid + ' Q' + (pad + x) / 2 + ' ' + y + ' ' + x + ' ' + y + ' Q' + (x + w - pad) / 2 + ' ' + y + ' ' + (w - pad) + ' ' + mid);
      thumb.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      output.textContent = input.value;
    };
    const spring = () => {
      cancelAnimationFrame(raf);
      const step = () => {
        velocity = (velocity - bend * 0.18) * 0.86;
        bend += velocity;
        draw();
        if (Math.abs(bend) > 0.2 || Math.abs(velocity) > 0.2) raf = requestAnimationFrame(step);
        else {
          bend = 0;
          draw();
        }
      };
      raf = requestAnimationFrame(step);
    };
    const onDown = () => {
      dragging = true;
      cancelAnimationFrame(raf);
    };
    const onMove = (e) => {
      if (!dragging || reduce) return;
      const r = track.getBoundingClientRect();
      bend = Math.max(-34, Math.min(34, e.clientY - (r.top + r.height / 2)));
      draw();
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      if (!reduce) spring();
    };
    const onKey = () => {
      if (reduce) return;
      velocity = 7;
      spring();
    };

    input.addEventListener('pointerdown', onDown);
    input.addEventListener('input', draw);
    input.addEventListener('keydown', onKey);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    const ro = new ResizeObserver(draw);
    ro.observe(track);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      input.removeEventListener('pointerdown', onDown);
      input.removeEventListener('input', draw);
      input.removeEventListener('keydown', onKey);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="string">
  <div class="string-head">
    <label for="tension">Tension</label>
    <output class="string-value" for="tension">50</output>
  </div>
  <div class="string-track">
    <svg class="string-svg" aria-hidden="true"><path class="string-path"/></svg>
    <input class="string-input" id="tension" type="range" min="0" max="100" value="50">
    <span class="string-thumb" aria-hidden="true"></span>
  </div>
</div>
```

`StringSlider.css`

```css
/* tearsheet string-slider vf9f960db · https://qusaialjbali.github.io/tearsheet/zine/parts/string-slider.html */
.string { width: 100%; max-width: 420px; }
.string-head { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.string-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.string-track { position: relative; height: 90px; }
.string-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.string-path { fill: none; stroke: var(--ui-text); stroke-width: 2.5; stroke-linecap: round; }
.string-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: grab;
}
.string-input:active { cursor: grabbing; }
.string-thumb {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border-radius: 50%;
  background: var(--ui-accent);
  border: 3px solid var(--ui-bg);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
  pointer-events: none;
}
.string-input:focus-visible ~ .string-thumb { box-shadow: var(--ui-focus), 0 2px 8px rgb(0 0 0 / 0.3); }
```
