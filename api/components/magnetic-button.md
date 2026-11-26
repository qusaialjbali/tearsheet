# Magnetic button (Tearsheet, Weird)

The button leans toward your cursor before you reach it, and its label lags behind for depth.

**Why it works:** The pull only starts inside the stage around the button, so it never chases people across the page. Motion is skipped entirely for reduced-motion users.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html -->
<div class="magnet-stage">
  <button class="magnet" type="button"><span class="magnet-label">Hover me</span></button>
</div>
```

`styles.css`

```css
/* tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html */
.magnet-stage { display: inline-grid; place-items: center; padding: 56px; }
.magnet {
  display: grid;
  place-items: center;
  width: 148px;
  height: 148px;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
  transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4), box-shadow 0.3s;
}
.magnet-label { display: block; transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4); }
.magnet:hover { box-shadow: 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:active { scale: 0.94; }
```

`script.js`

```js
/* tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  const button = root.querySelector('.magnet');
  const label = root.querySelector('.magnet-label');

  const move = (e) => {
    const r = button.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    button.style.transform = 'translate(' + x * 0.35 + 'px, ' + y * 0.35 + 'px)';
    label.style.transform = 'translate(' + x * 0.15 + 'px, ' + y * 0.15 + 'px)';
  };
  const reset = () => {
    button.style.transform = '';
    label.style.transform = '';
  };

  root.addEventListener('pointermove', move);
  root.addEventListener('pointerleave', reset);
  return () => {
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerleave', reset);
  };
}

document.querySelectorAll(".magnet-stage").forEach(setup);
```

## React

`MagneticButton.jsx`

```jsx
/* tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html */
import { useEffect, useRef } from 'react';
import './MagneticButton.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  const button = root.querySelector('.magnet');
  const label = root.querySelector('.magnet-label');

  const move = (e) => {
    const r = button.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    button.style.transform = 'translate(' + x * 0.35 + 'px, ' + y * 0.35 + 'px)';
    label.style.transform = 'translate(' + x * 0.15 + 'px, ' + y * 0.15 + 'px)';
  };
  const reset = () => {
    button.style.transform = '';
    label.style.transform = '';
  };

  root.addEventListener('pointermove', move);
  root.addEventListener('pointerleave', reset);
  return () => {
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerleave', reset);
  };
}

export function MagneticButton() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="magnet-stage">
      <button className="magnet" type="button"><span className="magnet-label">Hover me</span></button>
    </div>
  );
}
```

`MagneticButton.css`

```css
/* tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html */
.magnet-stage { display: inline-grid; place-items: center; padding: 56px; }
.magnet {
  display: grid;
  place-items: center;
  width: 148px;
  height: 148px;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
  transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4), box-shadow 0.3s;
}
.magnet-label { display: block; transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4); }
.magnet:hover { box-shadow: 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:active { scale: 0.94; }
```

## Vue

`MagneticButton.vue`

```vue
<!-- tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  const button = root.querySelector('.magnet');
  const label = root.querySelector('.magnet-label');

  const move = (e) => {
    const r = button.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    button.style.transform = 'translate(' + x * 0.35 + 'px, ' + y * 0.35 + 'px)';
    label.style.transform = 'translate(' + x * 0.15 + 'px, ' + y * 0.15 + 'px)';
  };
  const reset = () => {
    button.style.transform = '';
    label.style.transform = '';
  };

  root.addEventListener('pointermove', move);
  root.addEventListener('pointerleave', reset);
  return () => {
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerleave', reset);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="magnet-stage">
    <button class="magnet" type="button"><span class="magnet-label">Hover me</span></button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.magnet-stage { display: inline-grid; place-items: center; padding: 56px; }
.magnet {
  display: grid;
  place-items: center;
  width: 148px;
  height: 148px;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
  transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4), box-shadow 0.3s;
}
.magnet-label { display: block; transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4); }
.magnet:hover { box-shadow: 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:active { scale: 0.94; }
</style>
```

## Svelte

`MagneticButton.svelte`

```svelte
<!-- tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html -->
<script>
  import { onMount } from 'svelte';
  import './MagneticButton.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const button = root.querySelector('.magnet');
    const label = root.querySelector('.magnet-label');

    const move = (e) => {
      const r = button.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      button.style.transform = 'translate(' + x * 0.35 + 'px, ' + y * 0.35 + 'px)';
      label.style.transform = 'translate(' + x * 0.15 + 'px, ' + y * 0.15 + 'px)';
    };
    const reset = () => {
      button.style.transform = '';
      label.style.transform = '';
    };

    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', reset);
    return () => {
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', reset);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="magnet-stage">
  <button class="magnet" type="button"><span class="magnet-label">Hover me</span></button>
</div>
```

`MagneticButton.css`

```css
/* tearsheet magnetic-button v2f1b5abb · https://qusaialjbali.github.io/tearsheet/zine/parts/magnetic-button.html */
.magnet-stage { display: inline-grid; place-items: center; padding: 56px; }
.magnet {
  display: grid;
  place-items: center;
  width: 148px;
  height: 148px;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
  transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4), box-shadow 0.3s;
}
.magnet-label { display: block; transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4); }
.magnet:hover { box-shadow: 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:active { scale: 0.94; }
```
