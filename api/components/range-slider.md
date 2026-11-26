# Range slider (Tearsheet, Forms)

Native range input with a filled track and a live value readout.

**Why it works:** Sliders are for approximate values where the change is previewed live (volume, brightness). For exact numbers use a number field.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html -->
<div class="range">
  <div class="range-head">
    <label for="volume">Volume</label>
    <output class="range-value" for="volume">40</output>
  </div>
  <input class="range-input" id="volume" type="range" min="0" max="100" value="40">
</div>
```

`styles.css`

```css
/* tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html */
.range { width: 100%; max-width: 360px; }
.range-head { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.range-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.range-input {
  --fill: 40%;
  appearance: none;
  width: 100%;
  height: 6px;
  margin: 0;
  border-radius: 999px;
  background: linear-gradient(var(--ui-accent), var(--ui-accent)) 0 / var(--fill) 100% no-repeat, var(--ui-surface-2);
  cursor: pointer;
}
.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.25);
}
.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
}
.range-input:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

`script.js`

```js
/* tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html */
function setup(root) {
  const input = root.querySelector('.range-input');
  const output = root.querySelector('.range-value');

  const update = () => {
    const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', pct + '%');
    output.textContent = input.value;
  };

  input.addEventListener('input', update);
  update();
  return () => input.removeEventListener('input', update);
}

document.querySelectorAll(".range").forEach(setup);
```

## React

`RangeSlider.jsx`

```jsx
/* tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html */
import { useEffect, useRef } from 'react';
import './RangeSlider.css';

function setup(root) {
  const input = root.querySelector('.range-input');
  const output = root.querySelector('.range-value');

  const update = () => {
    const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', pct + '%');
    output.textContent = input.value;
  };

  input.addEventListener('input', update);
  update();
  return () => input.removeEventListener('input', update);
}

export function RangeSlider() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="range">
      <div className="range-head">
        <label htmlFor="volume">Volume</label>
        <output className="range-value" htmlFor="volume">40</output>
      </div>
      <input className="range-input" id="volume" type="range" min="0" max="100" defaultValue="40" />
    </div>
  );
}
```

`RangeSlider.css`

```css
/* tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html */
.range { width: 100%; max-width: 360px; }
.range-head { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.range-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.range-input {
  --fill: 40%;
  appearance: none;
  width: 100%;
  height: 6px;
  margin: 0;
  border-radius: 999px;
  background: linear-gradient(var(--ui-accent), var(--ui-accent)) 0 / var(--fill) 100% no-repeat, var(--ui-surface-2);
  cursor: pointer;
}
.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.25);
}
.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
}
.range-input:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`RangeSlider.vue`

```vue
<!-- tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const input = root.querySelector('.range-input');
  const output = root.querySelector('.range-value');

  const update = () => {
    const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', pct + '%');
    output.textContent = input.value;
  };

  input.addEventListener('input', update);
  update();
  return () => input.removeEventListener('input', update);
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="range">
    <div class="range-head">
      <label for="volume">Volume</label>
      <output class="range-value" for="volume">40</output>
    </div>
    <input class="range-input" id="volume" type="range" min="0" max="100" value="40">
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.range { width: 100%; max-width: 360px; }
.range-head { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.range-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.range-input {
  --fill: 40%;
  appearance: none;
  width: 100%;
  height: 6px;
  margin: 0;
  border-radius: 999px;
  background: linear-gradient(var(--ui-accent), var(--ui-accent)) 0 / var(--fill) 100% no-repeat, var(--ui-surface-2);
  cursor: pointer;
}
.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.25);
}
.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
}
.range-input:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`RangeSlider.svelte`

```svelte
<!-- tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html -->
<script>
  import { onMount } from 'svelte';
  import './RangeSlider.css';

  let node;

  function setup(root) {
    const input = root.querySelector('.range-input');
    const output = root.querySelector('.range-value');

    const update = () => {
      const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.setProperty('--fill', pct + '%');
      output.textContent = input.value;
    };

    input.addEventListener('input', update);
    update();
    return () => input.removeEventListener('input', update);
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="range">
  <div class="range-head">
    <label for="volume">Volume</label>
    <output class="range-value" for="volume">40</output>
  </div>
  <input class="range-input" id="volume" type="range" min="0" max="100" value="40">
</div>
```

`RangeSlider.css`

```css
/* tearsheet range-slider v66fccff7 · https://qusaialjbali.github.io/tearsheet/zine/parts/range-slider.html */
.range { width: 100%; max-width: 360px; }
.range-head { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.range-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.range-input {
  --fill: 40%;
  appearance: none;
  width: 100%;
  height: 6px;
  margin: 0;
  border-radius: 999px;
  background: linear-gradient(var(--ui-accent), var(--ui-accent)) 0 / var(--fill) 100% no-repeat, var(--ui-surface-2);
  cursor: pointer;
}
.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.25);
}
.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
}
.range-input:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```
