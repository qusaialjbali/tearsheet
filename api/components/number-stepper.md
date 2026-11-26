# Number stepper (Tearsheet, Forms)

Minus and plus buttons around a number field, clamped to a range.

**Why it works:** People can still type a number directly. The buttons disable at the limits instead of silently doing nothing.

**Checked:** axe clean in light and dark; tightest text contrast 16.1:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html -->
<div class="stepper">
  <label class="stepper-label" for="guests">Guests</label>
  <div class="stepper-control">
    <button class="stepper-btn" type="button" data-step="-1" aria-label="Fewer guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <input class="stepper-input" id="guests" type="number" inputmode="numeric" min="1" max="12" value="2">
    <button class="stepper-btn" type="button" data-step="1" aria-label="More guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html */
.stepper { display: grid; gap: 6px; }
.stepper-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.stepper-control {
  display: inline-flex;
  align-items: center;
  width: max-content;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.stepper-control:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.stepper-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: none;
  border: 0;
  cursor: pointer;
}
.stepper-btn svg { width: 18px; height: 18px; }
.stepper-btn:hover:not(:disabled) { background: var(--ui-surface-2); }
.stepper-btn:disabled { color: var(--ui-border-strong); cursor: not-allowed; }
.stepper-btn:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -2px; }
.stepper-input {
  width: 56px;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: none;
  border: 0;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}
.stepper-input:focus { outline: none; }
.stepper-input::-webkit-inner-spin-button, .stepper-input::-webkit-outer-spin-button { appearance: none; margin: 0; }
```

`script.js`

```js
/* tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html */
function setup(root) {
  const input = root.querySelector('.stepper-input');
  const [minus, plus] = root.querySelectorAll('[data-step]');
  const clamp = (v) => Math.min(Number(input.max), Math.max(Number(input.min), v));

  const sync = () => {
    minus.disabled = Number(input.value) <= Number(input.min);
    plus.disabled = Number(input.value) >= Number(input.max);
  };
  const onStep = (e) => {
    input.value = clamp((Number(input.value) || 0) + Number(e.currentTarget.dataset.step));
    sync();
  };
  const onChange = () => {
    input.value = clamp(Number(input.value) || Number(input.min));
    sync();
  };

  minus.addEventListener('click', onStep);
  plus.addEventListener('click', onStep);
  input.addEventListener('change', onChange);
  sync();
  return () => {
    minus.removeEventListener('click', onStep);
    plus.removeEventListener('click', onStep);
    input.removeEventListener('change', onChange);
  };
}

document.querySelectorAll(".stepper").forEach(setup);
```

## React

`NumberStepper.jsx`

```jsx
/* tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html */
import { useEffect, useRef } from 'react';
import './NumberStepper.css';

function setup(root) {
  const input = root.querySelector('.stepper-input');
  const [minus, plus] = root.querySelectorAll('[data-step]');
  const clamp = (v) => Math.min(Number(input.max), Math.max(Number(input.min), v));

  const sync = () => {
    minus.disabled = Number(input.value) <= Number(input.min);
    plus.disabled = Number(input.value) >= Number(input.max);
  };
  const onStep = (e) => {
    input.value = clamp((Number(input.value) || 0) + Number(e.currentTarget.dataset.step));
    sync();
  };
  const onChange = () => {
    input.value = clamp(Number(input.value) || Number(input.min));
    sync();
  };

  minus.addEventListener('click', onStep);
  plus.addEventListener('click', onStep);
  input.addEventListener('change', onChange);
  sync();
  return () => {
    minus.removeEventListener('click', onStep);
    plus.removeEventListener('click', onStep);
    input.removeEventListener('change', onChange);
  };
}

export function NumberStepper() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="stepper">
      <label className="stepper-label" htmlFor="guests">Guests</label>
      <div className="stepper-control">
        <button className="stepper-btn" type="button" data-step="-1" aria-label="Fewer guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
        <input className="stepper-input" id="guests" type="number" inputMode="numeric" min="1" max="12" defaultValue="2" />
        <button className="stepper-btn" type="button" data-step="1" aria-label="More guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
      </div>
    </div>
  );
}
```

`NumberStepper.css`

```css
/* tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html */
.stepper { display: grid; gap: 6px; }
.stepper-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.stepper-control {
  display: inline-flex;
  align-items: center;
  width: max-content;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.stepper-control:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.stepper-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: none;
  border: 0;
  cursor: pointer;
}
.stepper-btn svg { width: 18px; height: 18px; }
.stepper-btn:hover:not(:disabled) { background: var(--ui-surface-2); }
.stepper-btn:disabled { color: var(--ui-border-strong); cursor: not-allowed; }
.stepper-btn:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -2px; }
.stepper-input {
  width: 56px;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: none;
  border: 0;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}
.stepper-input:focus { outline: none; }
.stepper-input::-webkit-inner-spin-button, .stepper-input::-webkit-outer-spin-button { appearance: none; margin: 0; }
```

## Vue

`NumberStepper.vue`

```vue
<!-- tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const input = root.querySelector('.stepper-input');
  const [minus, plus] = root.querySelectorAll('[data-step]');
  const clamp = (v) => Math.min(Number(input.max), Math.max(Number(input.min), v));

  const sync = () => {
    minus.disabled = Number(input.value) <= Number(input.min);
    plus.disabled = Number(input.value) >= Number(input.max);
  };
  const onStep = (e) => {
    input.value = clamp((Number(input.value) || 0) + Number(e.currentTarget.dataset.step));
    sync();
  };
  const onChange = () => {
    input.value = clamp(Number(input.value) || Number(input.min));
    sync();
  };

  minus.addEventListener('click', onStep);
  plus.addEventListener('click', onStep);
  input.addEventListener('change', onChange);
  sync();
  return () => {
    minus.removeEventListener('click', onStep);
    plus.removeEventListener('click', onStep);
    input.removeEventListener('change', onChange);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="stepper">
    <label class="stepper-label" for="guests">Guests</label>
    <div class="stepper-control">
      <button class="stepper-btn" type="button" data-step="-1" aria-label="Fewer guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
      <input class="stepper-input" id="guests" type="number" inputmode="numeric" min="1" max="12" value="2">
      <button class="stepper-btn" type="button" data-step="1" aria-label="More guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.stepper { display: grid; gap: 6px; }
.stepper-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.stepper-control {
  display: inline-flex;
  align-items: center;
  width: max-content;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.stepper-control:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.stepper-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: none;
  border: 0;
  cursor: pointer;
}
.stepper-btn svg { width: 18px; height: 18px; }
.stepper-btn:hover:not(:disabled) { background: var(--ui-surface-2); }
.stepper-btn:disabled { color: var(--ui-border-strong); cursor: not-allowed; }
.stepper-btn:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -2px; }
.stepper-input {
  width: 56px;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: none;
  border: 0;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}
.stepper-input:focus { outline: none; }
.stepper-input::-webkit-inner-spin-button, .stepper-input::-webkit-outer-spin-button { appearance: none; margin: 0; }
</style>
```

## Svelte

`NumberStepper.svelte`

```svelte
<!-- tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html -->
<script>
  import { onMount } from 'svelte';
  import './NumberStepper.css';

  let node;

  function setup(root) {
    const input = root.querySelector('.stepper-input');
    const [minus, plus] = root.querySelectorAll('[data-step]');
    const clamp = (v) => Math.min(Number(input.max), Math.max(Number(input.min), v));

    const sync = () => {
      minus.disabled = Number(input.value) <= Number(input.min);
      plus.disabled = Number(input.value) >= Number(input.max);
    };
    const onStep = (e) => {
      input.value = clamp((Number(input.value) || 0) + Number(e.currentTarget.dataset.step));
      sync();
    };
    const onChange = () => {
      input.value = clamp(Number(input.value) || Number(input.min));
      sync();
    };

    minus.addEventListener('click', onStep);
    plus.addEventListener('click', onStep);
    input.addEventListener('change', onChange);
    sync();
    return () => {
      minus.removeEventListener('click', onStep);
      plus.removeEventListener('click', onStep);
      input.removeEventListener('change', onChange);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="stepper">
  <label class="stepper-label" for="guests">Guests</label>
  <div class="stepper-control">
    <button class="stepper-btn" type="button" data-step="-1" aria-label="Fewer guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <input class="stepper-input" id="guests" type="number" inputmode="numeric" min="1" max="12" value="2">
    <button class="stepper-btn" type="button" data-step="1" aria-label="More guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
</div>
```

`NumberStepper.css`

```css
/* tearsheet number-stepper v199faec9 · https://qusaialjbali.github.io/tearsheet/zine/parts/number-stepper.html */
.stepper { display: grid; gap: 6px; }
.stepper-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.stepper-control {
  display: inline-flex;
  align-items: center;
  width: max-content;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.stepper-control:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.stepper-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: none;
  border: 0;
  cursor: pointer;
}
.stepper-btn svg { width: 18px; height: 18px; }
.stepper-btn:hover:not(:disabled) { background: var(--ui-surface-2); }
.stepper-btn:disabled { color: var(--ui-border-strong); cursor: not-allowed; }
.stepper-btn:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -2px; }
.stepper-input {
  width: 56px;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: none;
  border: 0;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}
.stepper-input:focus { outline: none; }
.stepper-input::-webkit-inner-spin-button, .stepper-input::-webkit-outer-spin-button { appearance: none; margin: 0; }
```
