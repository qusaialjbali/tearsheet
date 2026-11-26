# Throwable tags (Tearsheet, Weird)

Tags fall into a box under gravity. Grab one, fling it, and watch the pile settle.

**Why it works:** The tags are a real list, so screen readers just read the words. “Shake” gives keyboard and touch users the same fun. With reduced motion the tags simply sit in a tidy row.

**Checked:** axe clean in light and dark; tightest text contrast 4.59:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html -->
<div class="phys">
  <ul class="phys-box" aria-label="Topics">
    <li>HTML</li><li>CSS</li><li>React</li><li>Vue</li><li>Svelte</li><li>a11y</li><li>tokens</li><li>dark mode</li><li>free</li><li>zine</li>
  </ul>
  <button class="phys-shake" type="button">Shake the box</button>
</div>
```

`styles.css`

```css
/* tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html */
.phys { display: grid; justify-items: center; gap: 12px; width: 100%; max-width: 460px; }
.phys-box {
  position: relative; width: 100%; height: 280px; margin: 0; padding: 0; list-style: none; overflow: hidden;
  background: var(--ui-surface); border: 2px solid var(--ui-border-strong); border-radius: var(--ui-radius);
  touch-action: none;
}
.phys-box li {
  position: absolute; left: 0; top: 0; padding: 8px 16px;
  font-size: 15px; font-weight: 700; white-space: nowrap; user-select: none; cursor: grab;
  color: var(--ui-accent-text); background: var(--ui-accent); border-radius: 999px;
  will-change: transform;
}
.phys-box li:nth-child(3n) { color: #fff; background: #db2777; }
.phys-box li:nth-child(3n + 1) { color: #fff; background: #0f766e; }
.phys-box li.is-held { cursor: grabbing; box-shadow: 0 10px 20px rgb(0 0 0 / 0.25); }
.phys.is-static .phys-box { display: flex; flex-wrap: wrap; align-content: flex-end; gap: 6px; padding: 10px; }
.phys.is-static .phys-box li { position: static; }
.phys-shake { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.phys-shake:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

`script.js`

```js
/* tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const box = root.querySelector('.phys-box');
  const shake = root.querySelector('.phys-shake');
  if (reduce) { root.classList.add('is-static'); return; }
  const G = 0.45, BOUNCE = 0.35, FRICTION = 0.985;
  const bodies = [...box.children].map((el, i) => ({
    el, w: el.offsetWidth, h: el.offsetHeight,
    x: 20 + ((i * 67) % Math.max(1, box.clientWidth - 120)), y: -60 - i * 50, vx: (Math.random() - 0.5) * 4, vy: 0,
  }));
  let held = null, last = null, raf = 0, still = 0;

  const step = () => {
    const W = box.clientWidth, H = box.clientHeight;
    let energy = 0;
    bodies.forEach((b) => {
      if (b === held) return;
      b.vy += G; b.vx *= FRICTION; b.x += b.vx; b.y += b.vy;
      if (b.y + b.h > H) { b.y = H - b.h; b.vy *= -BOUNCE; b.vx *= 0.9; }
      if (b.x < 0) { b.x = 0; b.vx *= -BOUNCE; }
      if (b.x + b.w > W) { b.x = W - b.w; b.vx *= -BOUNCE; }
    });
    // separate overlapping tags along the shallower axis
    for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i], b = bodies[j];
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox <= 0 || oy <= 0) continue;
      const ma = a === held ? 0 : 1, mb = b === held ? 0 : 1;
      if (!ma && !mb) continue;
      const share = (m, n) => (m / (m + n || 1));
      if (oy < ox) {
        const dir = a.y < b.y ? -1 : 1;
        a.y += dir * oy * share(ma, mb); b.y -= dir * oy * share(mb, ma);
        const v = (a.vy + b.vy) / 2; if (ma) a.vy = v * 0.6; if (mb) b.vy = v * 0.6;
      } else {
        const dir = a.x < b.x ? -1 : 1;
        a.x += dir * ox * share(ma, mb); b.x -= dir * ox * share(mb, ma);
        const v = (a.vx + b.vx) / 2; if (ma) a.vx = v; if (mb) b.vx = v;
      }
    }
    bodies.forEach((b) => {
      energy += Math.abs(b.vx) + Math.abs(b.vy);
      const tilt = Math.max(-25, Math.min(25, b.vx * 3));
      b.el.style.transform = 'translate(' + b.x + 'px, ' + b.y + 'px) rotate(' + tilt + 'deg)';
    });
    still = energy < 0.6 && !held ? still + 1 : 0;
    raf = still > 40 ? 0 : requestAnimationFrame(step);
  };
  const wake = () => { still = 0; if (!raf) raf = requestAnimationFrame(step); };
  const point = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onDown = (e) => {
    const b = bodies.find((x) => x.el === e.target.closest('li'));
    if (!b) return;
    held = b; last = point(e); b.vx = b.vy = 0;
    b.el.classList.add('is-held');
    box.setPointerCapture(e.pointerId);
    wake();
  };
  const onMove = (e) => {
    if (!held) return;
    const p = point(e);
    held.vx = p.x - last.x; held.vy = p.y - last.y;
    held.x += held.vx; held.y += held.vy;
    last = p;
  };
  const onUp = () => { if (!held) return; held.el.classList.remove('is-held'); held = null; wake(); };
  const onShake = () => { bodies.forEach((b) => { b.vx += (Math.random() - 0.5) * 18; b.vy -= 8 + Math.random() * 10; }); wake(); };

  box.addEventListener('pointerdown', onDown);
  box.addEventListener('pointermove', onMove);
  box.addEventListener('pointerup', onUp);
  box.addEventListener('pointercancel', onUp);
  shake.addEventListener('click', onShake);
  wake();
  return () => {
    cancelAnimationFrame(raf);
    box.removeEventListener('pointerdown', onDown);
    box.removeEventListener('pointermove', onMove);
    box.removeEventListener('pointerup', onUp);
    box.removeEventListener('pointercancel', onUp);
    shake.removeEventListener('click', onShake);
  };
}

document.querySelectorAll(".phys").forEach(setup);
```

## React

`PhysicsTags.jsx`

```jsx
/* tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html */
import { useEffect, useRef } from 'react';
import './PhysicsTags.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const box = root.querySelector('.phys-box');
  const shake = root.querySelector('.phys-shake');
  if (reduce) { root.classList.add('is-static'); return; }
  const G = 0.45, BOUNCE = 0.35, FRICTION = 0.985;
  const bodies = [...box.children].map((el, i) => ({
    el, w: el.offsetWidth, h: el.offsetHeight,
    x: 20 + ((i * 67) % Math.max(1, box.clientWidth - 120)), y: -60 - i * 50, vx: (Math.random() - 0.5) * 4, vy: 0,
  }));
  let held = null, last = null, raf = 0, still = 0;

  const step = () => {
    const W = box.clientWidth, H = box.clientHeight;
    let energy = 0;
    bodies.forEach((b) => {
      if (b === held) return;
      b.vy += G; b.vx *= FRICTION; b.x += b.vx; b.y += b.vy;
      if (b.y + b.h > H) { b.y = H - b.h; b.vy *= -BOUNCE; b.vx *= 0.9; }
      if (b.x < 0) { b.x = 0; b.vx *= -BOUNCE; }
      if (b.x + b.w > W) { b.x = W - b.w; b.vx *= -BOUNCE; }
    });
    // separate overlapping tags along the shallower axis
    for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i], b = bodies[j];
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox <= 0 || oy <= 0) continue;
      const ma = a === held ? 0 : 1, mb = b === held ? 0 : 1;
      if (!ma && !mb) continue;
      const share = (m, n) => (m / (m + n || 1));
      if (oy < ox) {
        const dir = a.y < b.y ? -1 : 1;
        a.y += dir * oy * share(ma, mb); b.y -= dir * oy * share(mb, ma);
        const v = (a.vy + b.vy) / 2; if (ma) a.vy = v * 0.6; if (mb) b.vy = v * 0.6;
      } else {
        const dir = a.x < b.x ? -1 : 1;
        a.x += dir * ox * share(ma, mb); b.x -= dir * ox * share(mb, ma);
        const v = (a.vx + b.vx) / 2; if (ma) a.vx = v; if (mb) b.vx = v;
      }
    }
    bodies.forEach((b) => {
      energy += Math.abs(b.vx) + Math.abs(b.vy);
      const tilt = Math.max(-25, Math.min(25, b.vx * 3));
      b.el.style.transform = 'translate(' + b.x + 'px, ' + b.y + 'px) rotate(' + tilt + 'deg)';
    });
    still = energy < 0.6 && !held ? still + 1 : 0;
    raf = still > 40 ? 0 : requestAnimationFrame(step);
  };
  const wake = () => { still = 0; if (!raf) raf = requestAnimationFrame(step); };
  const point = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onDown = (e) => {
    const b = bodies.find((x) => x.el === e.target.closest('li'));
    if (!b) return;
    held = b; last = point(e); b.vx = b.vy = 0;
    b.el.classList.add('is-held');
    box.setPointerCapture(e.pointerId);
    wake();
  };
  const onMove = (e) => {
    if (!held) return;
    const p = point(e);
    held.vx = p.x - last.x; held.vy = p.y - last.y;
    held.x += held.vx; held.y += held.vy;
    last = p;
  };
  const onUp = () => { if (!held) return; held.el.classList.remove('is-held'); held = null; wake(); };
  const onShake = () => { bodies.forEach((b) => { b.vx += (Math.random() - 0.5) * 18; b.vy -= 8 + Math.random() * 10; }); wake(); };

  box.addEventListener('pointerdown', onDown);
  box.addEventListener('pointermove', onMove);
  box.addEventListener('pointerup', onUp);
  box.addEventListener('pointercancel', onUp);
  shake.addEventListener('click', onShake);
  wake();
  return () => {
    cancelAnimationFrame(raf);
    box.removeEventListener('pointerdown', onDown);
    box.removeEventListener('pointermove', onMove);
    box.removeEventListener('pointerup', onUp);
    box.removeEventListener('pointercancel', onUp);
    shake.removeEventListener('click', onShake);
  };
}

export function PhysicsTags() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="phys">
      <ul className="phys-box" aria-label="Topics">
        <li>HTML</li><li>CSS</li><li>React</li><li>Vue</li><li>Svelte</li><li>a11y</li><li>tokens</li><li>dark mode</li><li>free</li><li>zine</li>
      </ul>
      <button className="phys-shake" type="button">Shake the box</button>
    </div>
  );
}
```

`PhysicsTags.css`

```css
/* tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html */
.phys { display: grid; justify-items: center; gap: 12px; width: 100%; max-width: 460px; }
.phys-box {
  position: relative; width: 100%; height: 280px; margin: 0; padding: 0; list-style: none; overflow: hidden;
  background: var(--ui-surface); border: 2px solid var(--ui-border-strong); border-radius: var(--ui-radius);
  touch-action: none;
}
.phys-box li {
  position: absolute; left: 0; top: 0; padding: 8px 16px;
  font-size: 15px; font-weight: 700; white-space: nowrap; user-select: none; cursor: grab;
  color: var(--ui-accent-text); background: var(--ui-accent); border-radius: 999px;
  will-change: transform;
}
.phys-box li:nth-child(3n) { color: #fff; background: #db2777; }
.phys-box li:nth-child(3n + 1) { color: #fff; background: #0f766e; }
.phys-box li.is-held { cursor: grabbing; box-shadow: 0 10px 20px rgb(0 0 0 / 0.25); }
.phys.is-static .phys-box { display: flex; flex-wrap: wrap; align-content: flex-end; gap: 6px; padding: 10px; }
.phys.is-static .phys-box li { position: static; }
.phys-shake { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.phys-shake:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`PhysicsTags.vue`

```vue
<!-- tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const box = root.querySelector('.phys-box');
  const shake = root.querySelector('.phys-shake');
  if (reduce) { root.classList.add('is-static'); return; }
  const G = 0.45, BOUNCE = 0.35, FRICTION = 0.985;
  const bodies = [...box.children].map((el, i) => ({
    el, w: el.offsetWidth, h: el.offsetHeight,
    x: 20 + ((i * 67) % Math.max(1, box.clientWidth - 120)), y: -60 - i * 50, vx: (Math.random() - 0.5) * 4, vy: 0,
  }));
  let held = null, last = null, raf = 0, still = 0;

  const step = () => {
    const W = box.clientWidth, H = box.clientHeight;
    let energy = 0;
    bodies.forEach((b) => {
      if (b === held) return;
      b.vy += G; b.vx *= FRICTION; b.x += b.vx; b.y += b.vy;
      if (b.y + b.h > H) { b.y = H - b.h; b.vy *= -BOUNCE; b.vx *= 0.9; }
      if (b.x < 0) { b.x = 0; b.vx *= -BOUNCE; }
      if (b.x + b.w > W) { b.x = W - b.w; b.vx *= -BOUNCE; }
    });
    // separate overlapping tags along the shallower axis
    for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i], b = bodies[j];
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox <= 0 || oy <= 0) continue;
      const ma = a === held ? 0 : 1, mb = b === held ? 0 : 1;
      if (!ma && !mb) continue;
      const share = (m, n) => (m / (m + n || 1));
      if (oy < ox) {
        const dir = a.y < b.y ? -1 : 1;
        a.y += dir * oy * share(ma, mb); b.y -= dir * oy * share(mb, ma);
        const v = (a.vy + b.vy) / 2; if (ma) a.vy = v * 0.6; if (mb) b.vy = v * 0.6;
      } else {
        const dir = a.x < b.x ? -1 : 1;
        a.x += dir * ox * share(ma, mb); b.x -= dir * ox * share(mb, ma);
        const v = (a.vx + b.vx) / 2; if (ma) a.vx = v; if (mb) b.vx = v;
      }
    }
    bodies.forEach((b) => {
      energy += Math.abs(b.vx) + Math.abs(b.vy);
      const tilt = Math.max(-25, Math.min(25, b.vx * 3));
      b.el.style.transform = 'translate(' + b.x + 'px, ' + b.y + 'px) rotate(' + tilt + 'deg)';
    });
    still = energy < 0.6 && !held ? still + 1 : 0;
    raf = still > 40 ? 0 : requestAnimationFrame(step);
  };
  const wake = () => { still = 0; if (!raf) raf = requestAnimationFrame(step); };
  const point = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onDown = (e) => {
    const b = bodies.find((x) => x.el === e.target.closest('li'));
    if (!b) return;
    held = b; last = point(e); b.vx = b.vy = 0;
    b.el.classList.add('is-held');
    box.setPointerCapture(e.pointerId);
    wake();
  };
  const onMove = (e) => {
    if (!held) return;
    const p = point(e);
    held.vx = p.x - last.x; held.vy = p.y - last.y;
    held.x += held.vx; held.y += held.vy;
    last = p;
  };
  const onUp = () => { if (!held) return; held.el.classList.remove('is-held'); held = null; wake(); };
  const onShake = () => { bodies.forEach((b) => { b.vx += (Math.random() - 0.5) * 18; b.vy -= 8 + Math.random() * 10; }); wake(); };

  box.addEventListener('pointerdown', onDown);
  box.addEventListener('pointermove', onMove);
  box.addEventListener('pointerup', onUp);
  box.addEventListener('pointercancel', onUp);
  shake.addEventListener('click', onShake);
  wake();
  return () => {
    cancelAnimationFrame(raf);
    box.removeEventListener('pointerdown', onDown);
    box.removeEventListener('pointermove', onMove);
    box.removeEventListener('pointerup', onUp);
    box.removeEventListener('pointercancel', onUp);
    shake.removeEventListener('click', onShake);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="phys">
    <ul class="phys-box" aria-label="Topics">
      <li>HTML</li><li>CSS</li><li>React</li><li>Vue</li><li>Svelte</li><li>a11y</li><li>tokens</li><li>dark mode</li><li>free</li><li>zine</li>
    </ul>
    <button class="phys-shake" type="button">Shake the box</button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.phys { display: grid; justify-items: center; gap: 12px; width: 100%; max-width: 460px; }
.phys-box {
  position: relative; width: 100%; height: 280px; margin: 0; padding: 0; list-style: none; overflow: hidden;
  background: var(--ui-surface); border: 2px solid var(--ui-border-strong); border-radius: var(--ui-radius);
  touch-action: none;
}
.phys-box li {
  position: absolute; left: 0; top: 0; padding: 8px 16px;
  font-size: 15px; font-weight: 700; white-space: nowrap; user-select: none; cursor: grab;
  color: var(--ui-accent-text); background: var(--ui-accent); border-radius: 999px;
  will-change: transform;
}
.phys-box li:nth-child(3n) { color: #fff; background: #db2777; }
.phys-box li:nth-child(3n + 1) { color: #fff; background: #0f766e; }
.phys-box li.is-held { cursor: grabbing; box-shadow: 0 10px 20px rgb(0 0 0 / 0.25); }
.phys.is-static .phys-box { display: flex; flex-wrap: wrap; align-content: flex-end; gap: 6px; padding: 10px; }
.phys.is-static .phys-box li { position: static; }
.phys-shake { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.phys-shake:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`PhysicsTags.svelte`

```svelte
<!-- tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html -->
<script>
  import { onMount } from 'svelte';
  import './PhysicsTags.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const box = root.querySelector('.phys-box');
    const shake = root.querySelector('.phys-shake');
    if (reduce) { root.classList.add('is-static'); return; }
    const G = 0.45, BOUNCE = 0.35, FRICTION = 0.985;
    const bodies = [...box.children].map((el, i) => ({
      el, w: el.offsetWidth, h: el.offsetHeight,
      x: 20 + ((i * 67) % Math.max(1, box.clientWidth - 120)), y: -60 - i * 50, vx: (Math.random() - 0.5) * 4, vy: 0,
    }));
    let held = null, last = null, raf = 0, still = 0;

    const step = () => {
      const W = box.clientWidth, H = box.clientHeight;
      let energy = 0;
      bodies.forEach((b) => {
        if (b === held) return;
        b.vy += G; b.vx *= FRICTION; b.x += b.vx; b.y += b.vy;
        if (b.y + b.h > H) { b.y = H - b.h; b.vy *= -BOUNCE; b.vx *= 0.9; }
        if (b.x < 0) { b.x = 0; b.vx *= -BOUNCE; }
        if (b.x + b.w > W) { b.x = W - b.w; b.vx *= -BOUNCE; }
      });
      // separate overlapping tags along the shallower axis
      for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i], b = bodies[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox <= 0 || oy <= 0) continue;
        const ma = a === held ? 0 : 1, mb = b === held ? 0 : 1;
        if (!ma && !mb) continue;
        const share = (m, n) => (m / (m + n || 1));
        if (oy < ox) {
          const dir = a.y < b.y ? -1 : 1;
          a.y += dir * oy * share(ma, mb); b.y -= dir * oy * share(mb, ma);
          const v = (a.vy + b.vy) / 2; if (ma) a.vy = v * 0.6; if (mb) b.vy = v * 0.6;
        } else {
          const dir = a.x < b.x ? -1 : 1;
          a.x += dir * ox * share(ma, mb); b.x -= dir * ox * share(mb, ma);
          const v = (a.vx + b.vx) / 2; if (ma) a.vx = v; if (mb) b.vx = v;
        }
      }
      bodies.forEach((b) => {
        energy += Math.abs(b.vx) + Math.abs(b.vy);
        const tilt = Math.max(-25, Math.min(25, b.vx * 3));
        b.el.style.transform = 'translate(' + b.x + 'px, ' + b.y + 'px) rotate(' + tilt + 'deg)';
      });
      still = energy < 0.6 && !held ? still + 1 : 0;
      raf = still > 40 ? 0 : requestAnimationFrame(step);
    };
    const wake = () => { still = 0; if (!raf) raf = requestAnimationFrame(step); };
    const point = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onDown = (e) => {
      const b = bodies.find((x) => x.el === e.target.closest('li'));
      if (!b) return;
      held = b; last = point(e); b.vx = b.vy = 0;
      b.el.classList.add('is-held');
      box.setPointerCapture(e.pointerId);
      wake();
    };
    const onMove = (e) => {
      if (!held) return;
      const p = point(e);
      held.vx = p.x - last.x; held.vy = p.y - last.y;
      held.x += held.vx; held.y += held.vy;
      last = p;
    };
    const onUp = () => { if (!held) return; held.el.classList.remove('is-held'); held = null; wake(); };
    const onShake = () => { bodies.forEach((b) => { b.vx += (Math.random() - 0.5) * 18; b.vy -= 8 + Math.random() * 10; }); wake(); };

    box.addEventListener('pointerdown', onDown);
    box.addEventListener('pointermove', onMove);
    box.addEventListener('pointerup', onUp);
    box.addEventListener('pointercancel', onUp);
    shake.addEventListener('click', onShake);
    wake();
    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener('pointerdown', onDown);
      box.removeEventListener('pointermove', onMove);
      box.removeEventListener('pointerup', onUp);
      box.removeEventListener('pointercancel', onUp);
      shake.removeEventListener('click', onShake);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="phys">
  <ul class="phys-box" aria-label="Topics">
    <li>HTML</li><li>CSS</li><li>React</li><li>Vue</li><li>Svelte</li><li>a11y</li><li>tokens</li><li>dark mode</li><li>free</li><li>zine</li>
  </ul>
  <button class="phys-shake" type="button">Shake the box</button>
</div>
```

`PhysicsTags.css`

```css
/* tearsheet physics-tags v3eb56329 · https://qusaialjbali.github.io/tearsheet/zine/parts/physics-tags.html */
.phys { display: grid; justify-items: center; gap: 12px; width: 100%; max-width: 460px; }
.phys-box {
  position: relative; width: 100%; height: 280px; margin: 0; padding: 0; list-style: none; overflow: hidden;
  background: var(--ui-surface); border: 2px solid var(--ui-border-strong); border-radius: var(--ui-radius);
  touch-action: none;
}
.phys-box li {
  position: absolute; left: 0; top: 0; padding: 8px 16px;
  font-size: 15px; font-weight: 700; white-space: nowrap; user-select: none; cursor: grab;
  color: var(--ui-accent-text); background: var(--ui-accent); border-radius: 999px;
  will-change: transform;
}
.phys-box li:nth-child(3n) { color: #fff; background: #db2777; }
.phys-box li:nth-child(3n + 1) { color: #fff; background: #0f766e; }
.phys-box li.is-held { cursor: grabbing; box-shadow: 0 10px 20px rgb(0 0 0 / 0.25); }
.phys.is-static .phys-box { display: flex; flex-wrap: wrap; align-content: flex-end; gap: 6px; padding: 10px; }
.phys.is-static .phys-box li { position: static; }
.phys-shake { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.phys-shake:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```
