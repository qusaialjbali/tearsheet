# Liquid progress (Tearsheet, Weird)

A round tank that fills with a rolling wave as progress changes.

**Why it works:** It is still a role="progressbar" with a value, so the meaning never depends on the animation. The number changes colour exactly at the waterline so it stays readable. The wave stops for reduced motion.

**Checked:** axe clean in light and dark; 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html -->
<div class="liquid">
  <div class="liquid-tank" role="progressbar" aria-label="Daily water goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
    <span class="liquid-value" aria-hidden="true">45%</span>
    <svg class="liquid-wave" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z"/></svg>
    <div class="liquid-fill" aria-hidden="true"><span class="liquid-value">45%</span></div>
  </div>
  <div class="liquid-actions">
    <button class="liquid-btn" type="button" data-add="-15" aria-label="Remove 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <button class="liquid-btn" type="button" data-add="15" aria-label="Add 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html */
.liquid { display: grid; justify-items: center; gap: 14px; }
.liquid-tank {
  --level: 45%;
  position: relative;
  width: 168px;
  height: 168px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--ui-surface-2);
  border: 4px solid var(--ui-surface);
  box-shadow: 0 0 0 2px var(--ui-accent), inset 0 6px 14px rgb(0 0 0 / 0.08);
}
.liquid-value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 34px;
  font-weight: 800;
  color: var(--ui-text);
  font-variant-numeric: tabular-nums;
}
.liquid-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-accent);
  clip-path: inset(calc(100% - var(--level)) 0 0 0);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.liquid-fill .liquid-value { color: var(--ui-accent-text); }
.liquid-wave {
  position: absolute;
  left: 0;
  bottom: calc(var(--level) - 1px);
  width: 200%;
  height: 12px;
  fill: var(--ui-accent);
  transition: bottom 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  animation: liquid-roll 2.4s linear infinite;
}
@keyframes liquid-roll { to { transform: translateX(-50%); } }
.liquid-actions { display: flex; gap: 8px; }
.liquid-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: 50%;
  cursor: pointer;
}
.liquid-btn svg { width: 18px; height: 18px; }
.liquid-btn:hover { background: var(--ui-surface-2); }
.liquid-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) {
  .liquid-wave { animation: none; }
  .liquid-fill, .liquid-wave { transition: none; }
}
```

`script.js`

```js
/* tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html */
function setup(root) {
  const tank = root.querySelector('.liquid-tank');
  const labels = root.querySelectorAll('.liquid-value');
  const buttons = root.querySelectorAll('.liquid-btn');
  let level = Number(tank.getAttribute('aria-valuenow'));

  const render = () => {
    tank.style.setProperty('--level', level + '%');
    tank.setAttribute('aria-valuenow', level);
    labels.forEach((l) => (l.textContent = level + '%'));
  };
  const onAdd = (e) => {
    level = Math.min(100, Math.max(0, level + Number(e.currentTarget.dataset.add)));
    render();
  };

  buttons.forEach((b) => b.addEventListener('click', onAdd));
  render();
  return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
}

document.querySelectorAll(".liquid").forEach(setup);
```

## React

`LiquidProgress.jsx`

```jsx
/* tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html */
import { useEffect, useRef } from 'react';
import './LiquidProgress.css';

function setup(root) {
  const tank = root.querySelector('.liquid-tank');
  const labels = root.querySelectorAll('.liquid-value');
  const buttons = root.querySelectorAll('.liquid-btn');
  let level = Number(tank.getAttribute('aria-valuenow'));

  const render = () => {
    tank.style.setProperty('--level', level + '%');
    tank.setAttribute('aria-valuenow', level);
    labels.forEach((l) => (l.textContent = level + '%'));
  };
  const onAdd = (e) => {
    level = Math.min(100, Math.max(0, level + Number(e.currentTarget.dataset.add)));
    render();
  };

  buttons.forEach((b) => b.addEventListener('click', onAdd));
  render();
  return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
}

export function LiquidProgress() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="liquid">
      <div className="liquid-tank" role="progressbar" aria-label="Daily water goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
        <span className="liquid-value" aria-hidden="true">45%</span>
        <svg className="liquid-wave" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z"/></svg>
        <div className="liquid-fill" aria-hidden="true"><span className="liquid-value">45%</span></div>
      </div>
      <div className="liquid-actions">
        <button className="liquid-btn" type="button" data-add="-15" aria-label="Remove 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
        <button className="liquid-btn" type="button" data-add="15" aria-label="Add 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
      </div>
    </div>
  );
}
```

`LiquidProgress.css`

```css
/* tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html */
.liquid { display: grid; justify-items: center; gap: 14px; }
.liquid-tank {
  --level: 45%;
  position: relative;
  width: 168px;
  height: 168px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--ui-surface-2);
  border: 4px solid var(--ui-surface);
  box-shadow: 0 0 0 2px var(--ui-accent), inset 0 6px 14px rgb(0 0 0 / 0.08);
}
.liquid-value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 34px;
  font-weight: 800;
  color: var(--ui-text);
  font-variant-numeric: tabular-nums;
}
.liquid-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-accent);
  clip-path: inset(calc(100% - var(--level)) 0 0 0);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.liquid-fill .liquid-value { color: var(--ui-accent-text); }
.liquid-wave {
  position: absolute;
  left: 0;
  bottom: calc(var(--level) - 1px);
  width: 200%;
  height: 12px;
  fill: var(--ui-accent);
  transition: bottom 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  animation: liquid-roll 2.4s linear infinite;
}
@keyframes liquid-roll { to { transform: translateX(-50%); } }
.liquid-actions { display: flex; gap: 8px; }
.liquid-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: 50%;
  cursor: pointer;
}
.liquid-btn svg { width: 18px; height: 18px; }
.liquid-btn:hover { background: var(--ui-surface-2); }
.liquid-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) {
  .liquid-wave { animation: none; }
  .liquid-fill, .liquid-wave { transition: none; }
}
```

## Vue

`LiquidProgress.vue`

```vue
<!-- tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const tank = root.querySelector('.liquid-tank');
  const labels = root.querySelectorAll('.liquid-value');
  const buttons = root.querySelectorAll('.liquid-btn');
  let level = Number(tank.getAttribute('aria-valuenow'));

  const render = () => {
    tank.style.setProperty('--level', level + '%');
    tank.setAttribute('aria-valuenow', level);
    labels.forEach((l) => (l.textContent = level + '%'));
  };
  const onAdd = (e) => {
    level = Math.min(100, Math.max(0, level + Number(e.currentTarget.dataset.add)));
    render();
  };

  buttons.forEach((b) => b.addEventListener('click', onAdd));
  render();
  return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="liquid">
    <div class="liquid-tank" role="progressbar" aria-label="Daily water goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
      <span class="liquid-value" aria-hidden="true">45%</span>
      <svg class="liquid-wave" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z"/></svg>
      <div class="liquid-fill" aria-hidden="true"><span class="liquid-value">45%</span></div>
    </div>
    <div class="liquid-actions">
      <button class="liquid-btn" type="button" data-add="-15" aria-label="Remove 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
      <button class="liquid-btn" type="button" data-add="15" aria-label="Add 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.liquid { display: grid; justify-items: center; gap: 14px; }
.liquid-tank {
  --level: 45%;
  position: relative;
  width: 168px;
  height: 168px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--ui-surface-2);
  border: 4px solid var(--ui-surface);
  box-shadow: 0 0 0 2px var(--ui-accent), inset 0 6px 14px rgb(0 0 0 / 0.08);
}
.liquid-value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 34px;
  font-weight: 800;
  color: var(--ui-text);
  font-variant-numeric: tabular-nums;
}
.liquid-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-accent);
  clip-path: inset(calc(100% - var(--level)) 0 0 0);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.liquid-fill .liquid-value { color: var(--ui-accent-text); }
.liquid-wave {
  position: absolute;
  left: 0;
  bottom: calc(var(--level) - 1px);
  width: 200%;
  height: 12px;
  fill: var(--ui-accent);
  transition: bottom 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  animation: liquid-roll 2.4s linear infinite;
}
@keyframes liquid-roll { to { transform: translateX(-50%); } }
.liquid-actions { display: flex; gap: 8px; }
.liquid-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: 50%;
  cursor: pointer;
}
.liquid-btn svg { width: 18px; height: 18px; }
.liquid-btn:hover { background: var(--ui-surface-2); }
.liquid-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) {
  .liquid-wave { animation: none; }
  .liquid-fill, .liquid-wave { transition: none; }
}
</style>
```

## Svelte

`LiquidProgress.svelte`

```svelte
<!-- tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html -->
<script>
  import { onMount } from 'svelte';
  import './LiquidProgress.css';

  let node;

  function setup(root) {
    const tank = root.querySelector('.liquid-tank');
    const labels = root.querySelectorAll('.liquid-value');
    const buttons = root.querySelectorAll('.liquid-btn');
    let level = Number(tank.getAttribute('aria-valuenow'));

    const render = () => {
      tank.style.setProperty('--level', level + '%');
      tank.setAttribute('aria-valuenow', level);
      labels.forEach((l) => (l.textContent = level + '%'));
    };
    const onAdd = (e) => {
      level = Math.min(100, Math.max(0, level + Number(e.currentTarget.dataset.add)));
      render();
    };

    buttons.forEach((b) => b.addEventListener('click', onAdd));
    render();
    return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="liquid">
  <div class="liquid-tank" role="progressbar" aria-label="Daily water goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
    <span class="liquid-value" aria-hidden="true">45%</span>
    <svg class="liquid-wave" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z"/></svg>
    <div class="liquid-fill" aria-hidden="true"><span class="liquid-value">45%</span></div>
  </div>
  <div class="liquid-actions">
    <button class="liquid-btn" type="button" data-add="-15" aria-label="Remove 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <button class="liquid-btn" type="button" data-add="15" aria-label="Add 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
</div>
```

`LiquidProgress.css`

```css
/* tearsheet liquid-progress vde1df5d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/liquid-progress.html */
.liquid { display: grid; justify-items: center; gap: 14px; }
.liquid-tank {
  --level: 45%;
  position: relative;
  width: 168px;
  height: 168px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--ui-surface-2);
  border: 4px solid var(--ui-surface);
  box-shadow: 0 0 0 2px var(--ui-accent), inset 0 6px 14px rgb(0 0 0 / 0.08);
}
.liquid-value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 34px;
  font-weight: 800;
  color: var(--ui-text);
  font-variant-numeric: tabular-nums;
}
.liquid-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-accent);
  clip-path: inset(calc(100% - var(--level)) 0 0 0);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.liquid-fill .liquid-value { color: var(--ui-accent-text); }
.liquid-wave {
  position: absolute;
  left: 0;
  bottom: calc(var(--level) - 1px);
  width: 200%;
  height: 12px;
  fill: var(--ui-accent);
  transition: bottom 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  animation: liquid-roll 2.4s linear infinite;
}
@keyframes liquid-roll { to { transform: translateX(-50%); } }
.liquid-actions { display: flex; gap: 8px; }
.liquid-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: 50%;
  cursor: pointer;
}
.liquid-btn svg { width: 18px; height: 18px; }
.liquid-btn:hover { background: var(--ui-surface-2); }
.liquid-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) {
  .liquid-wave { animation: none; }
  .liquid-fill, .liquid-wave { transition: none; }
}
```
