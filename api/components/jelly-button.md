# Jelly button (Tearsheet, Weird)

A button that squashes and wobbles like jelly when you press it, then settles.

**Why it works:** The wobble plays after the click, never before, so it cannot delay the action. Reduced motion keeps a simple press state.

**Checked:** axe clean in light and dark; tightest text contrast 11.37:1 (needs 3:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html -->
<div class="jelly-demo">
  <button class="jelly" type="button">Boing</button>
</div>
```

`styles.css`

```css
/* tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html */
.jelly-demo { display: grid; place-items: center; padding: 20px; }
.jelly {
  padding: 18px 36px; font: inherit; font-size: 20px; font-weight: 900; letter-spacing: 0.02em;
  color: #1b1b20; background: #a3e635; border: 0; border-radius: 22px; cursor: pointer;
  box-shadow: 0 10px 0 -2px #65a30d, 0 18px 30px -10px rgb(0 0 0 / 0.35);
}
.jelly:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.jelly:active { transform: scale(0.96, 0.9); }
.jelly.is-wobbling { animation: jelly 0.7s both; }
@keyframes jelly {
  0% { transform: scale(1, 1); }
  25% { transform: scale(1.18, 0.82); }
  40% { transform: scale(0.88, 1.12); }
  55% { transform: scale(1.06, 0.94); }
  70% { transform: scale(0.97, 1.03); }
  85% { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); }
}
@media (prefers-reduced-motion: reduce) { .jelly.is-wobbling { animation: none; } }
```

`script.js`

```js
/* tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html */
function setup(root) {
  const btn = root.querySelector('.jelly');
  const onClick = () => { btn.classList.remove('is-wobbling'); void btn.offsetWidth; btn.classList.add('is-wobbling'); };
  const onEnd = () => btn.classList.remove('is-wobbling');
  btn.addEventListener('click', onClick);
  btn.addEventListener('animationend', onEnd);
  return () => { btn.removeEventListener('click', onClick); btn.removeEventListener('animationend', onEnd); };
}

document.querySelectorAll(".jelly-demo").forEach(setup);
```

## React

`JellyButton.jsx`

```jsx
/* tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html */
import { useEffect, useRef } from 'react';
import './JellyButton.css';

function setup(root) {
  const btn = root.querySelector('.jelly');
  const onClick = () => { btn.classList.remove('is-wobbling'); void btn.offsetWidth; btn.classList.add('is-wobbling'); };
  const onEnd = () => btn.classList.remove('is-wobbling');
  btn.addEventListener('click', onClick);
  btn.addEventListener('animationend', onEnd);
  return () => { btn.removeEventListener('click', onClick); btn.removeEventListener('animationend', onEnd); };
}

export function JellyButton() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="jelly-demo">
      <button className="jelly" type="button">Boing</button>
    </div>
  );
}
```

`JellyButton.css`

```css
/* tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html */
.jelly-demo { display: grid; place-items: center; padding: 20px; }
.jelly {
  padding: 18px 36px; font: inherit; font-size: 20px; font-weight: 900; letter-spacing: 0.02em;
  color: #1b1b20; background: #a3e635; border: 0; border-radius: 22px; cursor: pointer;
  box-shadow: 0 10px 0 -2px #65a30d, 0 18px 30px -10px rgb(0 0 0 / 0.35);
}
.jelly:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.jelly:active { transform: scale(0.96, 0.9); }
.jelly.is-wobbling { animation: jelly 0.7s both; }
@keyframes jelly {
  0% { transform: scale(1, 1); }
  25% { transform: scale(1.18, 0.82); }
  40% { transform: scale(0.88, 1.12); }
  55% { transform: scale(1.06, 0.94); }
  70% { transform: scale(0.97, 1.03); }
  85% { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); }
}
@media (prefers-reduced-motion: reduce) { .jelly.is-wobbling { animation: none; } }
```

## Vue

`JellyButton.vue`

```vue
<!-- tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const btn = root.querySelector('.jelly');
  const onClick = () => { btn.classList.remove('is-wobbling'); void btn.offsetWidth; btn.classList.add('is-wobbling'); };
  const onEnd = () => btn.classList.remove('is-wobbling');
  btn.addEventListener('click', onClick);
  btn.addEventListener('animationend', onEnd);
  return () => { btn.removeEventListener('click', onClick); btn.removeEventListener('animationend', onEnd); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="jelly-demo">
    <button class="jelly" type="button">Boing</button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.jelly-demo { display: grid; place-items: center; padding: 20px; }
.jelly {
  padding: 18px 36px; font: inherit; font-size: 20px; font-weight: 900; letter-spacing: 0.02em;
  color: #1b1b20; background: #a3e635; border: 0; border-radius: 22px; cursor: pointer;
  box-shadow: 0 10px 0 -2px #65a30d, 0 18px 30px -10px rgb(0 0 0 / 0.35);
}
.jelly:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.jelly:active { transform: scale(0.96, 0.9); }
.jelly.is-wobbling { animation: jelly 0.7s both; }
@keyframes jelly {
  0% { transform: scale(1, 1); }
  25% { transform: scale(1.18, 0.82); }
  40% { transform: scale(0.88, 1.12); }
  55% { transform: scale(1.06, 0.94); }
  70% { transform: scale(0.97, 1.03); }
  85% { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); }
}
@media (prefers-reduced-motion: reduce) { .jelly.is-wobbling { animation: none; } }
</style>
```

## Svelte

`JellyButton.svelte`

```svelte
<!-- tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html -->
<script>
  import { onMount } from 'svelte';
  import './JellyButton.css';

  let node;

  function setup(root) {
    const btn = root.querySelector('.jelly');
    const onClick = () => { btn.classList.remove('is-wobbling'); void btn.offsetWidth; btn.classList.add('is-wobbling'); };
    const onEnd = () => btn.classList.remove('is-wobbling');
    btn.addEventListener('click', onClick);
    btn.addEventListener('animationend', onEnd);
    return () => { btn.removeEventListener('click', onClick); btn.removeEventListener('animationend', onEnd); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="jelly-demo">
  <button class="jelly" type="button">Boing</button>
</div>
```

`JellyButton.css`

```css
/* tearsheet jelly-button v917865be · https://qusaialjbali.github.io/tearsheet/zine/parts/jelly-button.html */
.jelly-demo { display: grid; place-items: center; padding: 20px; }
.jelly {
  padding: 18px 36px; font: inherit; font-size: 20px; font-weight: 900; letter-spacing: 0.02em;
  color: #1b1b20; background: #a3e635; border: 0; border-radius: 22px; cursor: pointer;
  box-shadow: 0 10px 0 -2px #65a30d, 0 18px 30px -10px rgb(0 0 0 / 0.35);
}
.jelly:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.jelly:active { transform: scale(0.96, 0.9); }
.jelly.is-wobbling { animation: jelly 0.7s both; }
@keyframes jelly {
  0% { transform: scale(1, 1); }
  25% { transform: scale(1.18, 0.82); }
  40% { transform: scale(0.88, 1.12); }
  55% { transform: scale(1.06, 0.94); }
  70% { transform: scale(0.97, 1.03); }
  85% { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); }
}
@media (prefers-reduced-motion: reduce) { .jelly.is-wobbling { animation: none; } }
```
