# Date range (Tearsheet, Forms)

Start and end dates using the native date input, styled to match, with the end kept after the start.

**Why it works:** Native date inputs give every phone its own good picker and handle locales for free. Only build a custom calendar when you need to show availability on it.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html -->
<fieldset class="dates">
  <legend>Trip dates</legend>
  <div class="dates-row">
    <label class="date-field">
      <span>Check-in</span>
      <input class="date-in" type="date" value="2026-12-18">
    </label>
    <span class="dates-arrow" aria-hidden="true"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    <label class="date-field">
      <span>Check-out</span>
      <input class="date-out" type="date" value="2026-12-22">
    </label>
  </div>
  <p class="dates-sum" aria-live="polite">4 nights</p>
</fieldset>
```

`styles.css`

```css
/* tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html */
.dates { margin: 0; padding: 0; border: 0; }
.dates legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; }
.dates-row { display: flex; align-items: end; gap: 10px; flex-wrap: wrap; }
.date-field { display: grid; gap: 4px; font-size: 13px; color: var(--ui-muted); }
.date-field input {
  min-height: 42px; padding: 8px 10px; font: inherit; font-size: 15px; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  color-scheme: light dark;
}
.date-field input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.dates-arrow { padding-bottom: 10px; color: var(--ui-muted); }
.dates-arrow svg { width: 18px; height: 18px; }
.dates-sum { margin: 8px 0 0; font-size: 14px; font-weight: 600; color: var(--ui-accent); }
```

`script.js`

```js
/* tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html */
function setup(root) {
  const start = root.querySelector('.date-in');
  const end = root.querySelector('.date-out');
  const sum = root.querySelector('.dates-sum');
  const update = () => {
    end.min = start.value;
    if (end.value && end.value <= start.value) {
      const d = new Date(start.value);
      d.setDate(d.getDate() + 1);
      end.value = d.toISOString().slice(0, 10);
    }
    const nights = Math.round((new Date(end.value) - new Date(start.value)) / 86400000);
    sum.textContent = nights > 0 ? nights + (nights === 1 ? ' night' : ' nights') : 'Pick your dates';
  };
  start.addEventListener('change', update);
  end.addEventListener('change', update);
  update();
  return () => { start.removeEventListener('change', update); end.removeEventListener('change', update); };
}

document.querySelectorAll(".dates").forEach(setup);
```

## React

`DateRange.jsx`

```jsx
/* tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html */
import { useEffect, useRef } from 'react';
import './DateRange.css';

function setup(root) {
  const start = root.querySelector('.date-in');
  const end = root.querySelector('.date-out');
  const sum = root.querySelector('.dates-sum');
  const update = () => {
    end.min = start.value;
    if (end.value && end.value <= start.value) {
      const d = new Date(start.value);
      d.setDate(d.getDate() + 1);
      end.value = d.toISOString().slice(0, 10);
    }
    const nights = Math.round((new Date(end.value) - new Date(start.value)) / 86400000);
    sum.textContent = nights > 0 ? nights + (nights === 1 ? ' night' : ' nights') : 'Pick your dates';
  };
  start.addEventListener('change', update);
  end.addEventListener('change', update);
  update();
  return () => { start.removeEventListener('change', update); end.removeEventListener('change', update); };
}

export function DateRange() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <fieldset ref={ref} className="dates">
      <legend>Trip dates</legend>
      <div className="dates-row">
        <label className="date-field">
          <span>Check-in</span>
          <input className="date-in" type="date" defaultValue="2026-12-18" />
        </label>
        <span className="dates-arrow" aria-hidden="true"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        <label className="date-field">
          <span>Check-out</span>
          <input className="date-out" type="date" defaultValue="2026-12-22" />
        </label>
      </div>
      <p className="dates-sum" aria-live="polite">4 nights</p>
    </fieldset>
  );
}
```

`DateRange.css`

```css
/* tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html */
.dates { margin: 0; padding: 0; border: 0; }
.dates legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; }
.dates-row { display: flex; align-items: end; gap: 10px; flex-wrap: wrap; }
.date-field { display: grid; gap: 4px; font-size: 13px; color: var(--ui-muted); }
.date-field input {
  min-height: 42px; padding: 8px 10px; font: inherit; font-size: 15px; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  color-scheme: light dark;
}
.date-field input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.dates-arrow { padding-bottom: 10px; color: var(--ui-muted); }
.dates-arrow svg { width: 18px; height: 18px; }
.dates-sum { margin: 8px 0 0; font-size: 14px; font-weight: 600; color: var(--ui-accent); }
```

## Vue

`DateRange.vue`

```vue
<!-- tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const start = root.querySelector('.date-in');
  const end = root.querySelector('.date-out');
  const sum = root.querySelector('.dates-sum');
  const update = () => {
    end.min = start.value;
    if (end.value && end.value <= start.value) {
      const d = new Date(start.value);
      d.setDate(d.getDate() + 1);
      end.value = d.toISOString().slice(0, 10);
    }
    const nights = Math.round((new Date(end.value) - new Date(start.value)) / 86400000);
    sum.textContent = nights > 0 ? nights + (nights === 1 ? ' night' : ' nights') : 'Pick your dates';
  };
  start.addEventListener('change', update);
  end.addEventListener('change', update);
  update();
  return () => { start.removeEventListener('change', update); end.removeEventListener('change', update); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <fieldset ref="el" class="dates">
    <legend>Trip dates</legend>
    <div class="dates-row">
      <label class="date-field">
        <span>Check-in</span>
        <input class="date-in" type="date" value="2026-12-18">
      </label>
      <span class="dates-arrow" aria-hidden="true"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <label class="date-field">
        <span>Check-out</span>
        <input class="date-out" type="date" value="2026-12-22">
      </label>
    </div>
    <p class="dates-sum" aria-live="polite">4 nights</p>
  </fieldset>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.dates { margin: 0; padding: 0; border: 0; }
.dates legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; }
.dates-row { display: flex; align-items: end; gap: 10px; flex-wrap: wrap; }
.date-field { display: grid; gap: 4px; font-size: 13px; color: var(--ui-muted); }
.date-field input {
  min-height: 42px; padding: 8px 10px; font: inherit; font-size: 15px; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  color-scheme: light dark;
}
.date-field input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.dates-arrow { padding-bottom: 10px; color: var(--ui-muted); }
.dates-arrow svg { width: 18px; height: 18px; }
.dates-sum { margin: 8px 0 0; font-size: 14px; font-weight: 600; color: var(--ui-accent); }
</style>
```

## Svelte

`DateRange.svelte`

```svelte
<!-- tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html -->
<script>
  import { onMount } from 'svelte';
  import './DateRange.css';

  let node;

  function setup(root) {
    const start = root.querySelector('.date-in');
    const end = root.querySelector('.date-out');
    const sum = root.querySelector('.dates-sum');
    const update = () => {
      end.min = start.value;
      if (end.value && end.value <= start.value) {
        const d = new Date(start.value);
        d.setDate(d.getDate() + 1);
        end.value = d.toISOString().slice(0, 10);
      }
      const nights = Math.round((new Date(end.value) - new Date(start.value)) / 86400000);
      sum.textContent = nights > 0 ? nights + (nights === 1 ? ' night' : ' nights') : 'Pick your dates';
    };
    start.addEventListener('change', update);
    end.addEventListener('change', update);
    update();
    return () => { start.removeEventListener('change', update); end.removeEventListener('change', update); };
  }

  onMount(() => setup(node));
</script>

<fieldset bind:this={node} class="dates">
  <legend>Trip dates</legend>
  <div class="dates-row">
    <label class="date-field">
      <span>Check-in</span>
      <input class="date-in" type="date" value="2026-12-18">
    </label>
    <span class="dates-arrow" aria-hidden="true"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    <label class="date-field">
      <span>Check-out</span>
      <input class="date-out" type="date" value="2026-12-22">
    </label>
  </div>
  <p class="dates-sum" aria-live="polite">4 nights</p>
</fieldset>
```

`DateRange.css`

```css
/* tearsheet date-range ve79811d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/date-range.html */
.dates { margin: 0; padding: 0; border: 0; }
.dates legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; }
.dates-row { display: flex; align-items: end; gap: 10px; flex-wrap: wrap; }
.date-field { display: grid; gap: 4px; font-size: 13px; color: var(--ui-muted); }
.date-field input {
  min-height: 42px; padding: 8px 10px; font: inherit; font-size: 15px; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  color-scheme: light dark;
}
.date-field input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.dates-arrow { padding-bottom: 10px; color: var(--ui-muted); }
.dates-arrow svg { width: 18px; height: 18px; }
.dates-sum { margin: 8px 0 0; font-size: 14px; font-weight: 600; color: var(--ui-accent); }
```
