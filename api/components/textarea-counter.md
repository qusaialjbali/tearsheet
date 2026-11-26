# Textarea with counter (Tearsheet, Forms)

A comment box that grows with its text and counts down the characters left.

**Why it works:** The live count is announced only near the limit so screen readers are not flooded on every keystroke. Over the limit, the field explains how to fix it instead of silently cutting text.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html -->
<div class="counted">
  <label class="counted-label" for="bio">Short bio</label>
  <textarea class="counted-input" id="bio" rows="3" aria-describedby="bio-count">I design calm interfaces for busy people.</textarea>
  <p class="counted-meta"><span>Shown on your public profile.</span><span class="counted-count" id="bio-count" aria-live="polite"></span></p>
</div>
```

`styles.css`

```css
/* tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html */
.counted { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.counted-label { font-size: 14px; font-weight: 600; }
.counted-input {
  width: 100%; min-height: 90px; padding: 10px 12px; resize: none; overflow: hidden;
  font: inherit; font-size: 15px; line-height: 1.5; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  field-sizing: content;
}
.counted-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.counted-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.counted-meta { display: flex; justify-content: space-between; gap: 12px; margin: 0; font-size: 13px; color: var(--ui-muted); }
.counted-count { font-variant-numeric: tabular-nums; white-space: nowrap; }
.counted-count.is-near { color: var(--ui-warning); font-weight: 600; }
.counted-count.is-over { color: var(--ui-danger); font-weight: 700; }
```

`script.js`

```js
/* tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html */
function setup(root) {
  const MAX = 120;
  const input = root.querySelector('.counted-input');
  const count = root.querySelector('.counted-count');
  const update = () => {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
    const left = MAX - input.value.length;
    count.classList.toggle('is-near', left <= 20 && left >= 0);
    count.classList.toggle('is-over', left < 0);
    input.setAttribute('aria-invalid', String(left < 0));
    count.textContent = left < 0 ? Math.abs(left) + ' over the limit, please shorten it' : left + ' characters left';
    // only speak up near the limit
    count.setAttribute('aria-live', left <= 20 ? 'polite' : 'off');
  };
  input.addEventListener('input', update);
  update();
  return () => input.removeEventListener('input', update);
}

document.querySelectorAll(".counted").forEach(setup);
```

## React

`TextareaCounter.jsx`

```jsx
/* tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html */
import { useEffect, useRef } from 'react';
import './TextareaCounter.css';

function setup(root) {
  const MAX = 120;
  const input = root.querySelector('.counted-input');
  const count = root.querySelector('.counted-count');
  const update = () => {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
    const left = MAX - input.value.length;
    count.classList.toggle('is-near', left <= 20 && left >= 0);
    count.classList.toggle('is-over', left < 0);
    input.setAttribute('aria-invalid', String(left < 0));
    count.textContent = left < 0 ? Math.abs(left) + ' over the limit, please shorten it' : left + ' characters left';
    // only speak up near the limit
    count.setAttribute('aria-live', left <= 20 ? 'polite' : 'off');
  };
  input.addEventListener('input', update);
  update();
  return () => input.removeEventListener('input', update);
}

export function TextareaCounter() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="counted">
      <label className="counted-label" htmlFor="bio">Short bio</label>
      <textarea className="counted-input" id="bio" rows="3" aria-describedby="bio-count">I design calm interfaces for busy people.</textarea>
      <p className="counted-meta"><span>Shown on your public profile.</span><span className="counted-count" id="bio-count" aria-live="polite"></span></p>
    </div>
  );
}
```

`TextareaCounter.css`

```css
/* tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html */
.counted { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.counted-label { font-size: 14px; font-weight: 600; }
.counted-input {
  width: 100%; min-height: 90px; padding: 10px 12px; resize: none; overflow: hidden;
  font: inherit; font-size: 15px; line-height: 1.5; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  field-sizing: content;
}
.counted-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.counted-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.counted-meta { display: flex; justify-content: space-between; gap: 12px; margin: 0; font-size: 13px; color: var(--ui-muted); }
.counted-count { font-variant-numeric: tabular-nums; white-space: nowrap; }
.counted-count.is-near { color: var(--ui-warning); font-weight: 600; }
.counted-count.is-over { color: var(--ui-danger); font-weight: 700; }
```

## Vue

`TextareaCounter.vue`

```vue
<!-- tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const MAX = 120;
  const input = root.querySelector('.counted-input');
  const count = root.querySelector('.counted-count');
  const update = () => {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
    const left = MAX - input.value.length;
    count.classList.toggle('is-near', left <= 20 && left >= 0);
    count.classList.toggle('is-over', left < 0);
    input.setAttribute('aria-invalid', String(left < 0));
    count.textContent = left < 0 ? Math.abs(left) + ' over the limit, please shorten it' : left + ' characters left';
    // only speak up near the limit
    count.setAttribute('aria-live', left <= 20 ? 'polite' : 'off');
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
  <div ref="el" class="counted">
    <label class="counted-label" for="bio">Short bio</label>
    <textarea class="counted-input" id="bio" rows="3" aria-describedby="bio-count">I design calm interfaces for busy people.</textarea>
    <p class="counted-meta"><span>Shown on your public profile.</span><span class="counted-count" id="bio-count" aria-live="polite"></span></p>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.counted { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.counted-label { font-size: 14px; font-weight: 600; }
.counted-input {
  width: 100%; min-height: 90px; padding: 10px 12px; resize: none; overflow: hidden;
  font: inherit; font-size: 15px; line-height: 1.5; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  field-sizing: content;
}
.counted-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.counted-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.counted-meta { display: flex; justify-content: space-between; gap: 12px; margin: 0; font-size: 13px; color: var(--ui-muted); }
.counted-count { font-variant-numeric: tabular-nums; white-space: nowrap; }
.counted-count.is-near { color: var(--ui-warning); font-weight: 600; }
.counted-count.is-over { color: var(--ui-danger); font-weight: 700; }
</style>
```

## Svelte

`TextareaCounter.svelte`

```svelte
<!-- tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html -->
<script>
  import { onMount } from 'svelte';
  import './TextareaCounter.css';

  let node;

  function setup(root) {
    const MAX = 120;
    const input = root.querySelector('.counted-input');
    const count = root.querySelector('.counted-count');
    const update = () => {
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
      const left = MAX - input.value.length;
      count.classList.toggle('is-near', left <= 20 && left >= 0);
      count.classList.toggle('is-over', left < 0);
      input.setAttribute('aria-invalid', String(left < 0));
      count.textContent = left < 0 ? Math.abs(left) + ' over the limit, please shorten it' : left + ' characters left';
      // only speak up near the limit
      count.setAttribute('aria-live', left <= 20 ? 'polite' : 'off');
    };
    input.addEventListener('input', update);
    update();
    return () => input.removeEventListener('input', update);
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="counted">
  <label class="counted-label" for="bio">Short bio</label>
  <textarea class="counted-input" id="bio" rows="3" aria-describedby="bio-count">I design calm interfaces for busy people.</textarea>
  <p class="counted-meta"><span>Shown on your public profile.</span><span class="counted-count" id="bio-count" aria-live="polite"></span></p>
</div>
```

`TextareaCounter.css`

```css
/* tearsheet textarea-counter v392b1a97 · https://qusaialjbali.github.io/tearsheet/zine/parts/textarea-counter.html */
.counted { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.counted-label { font-size: 14px; font-weight: 600; }
.counted-input {
  width: 100%; min-height: 90px; padding: 10px 12px; resize: none; overflow: hidden;
  font: inherit; font-size: 15px; line-height: 1.5; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
  field-sizing: content;
}
.counted-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.counted-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.counted-meta { display: flex; justify-content: space-between; gap: 12px; margin: 0; font-size: 13px; color: var(--ui-muted); }
.counted-count { font-variant-numeric: tabular-nums; white-space: nowrap; }
.counted-count.is-near { color: var(--ui-warning); font-weight: 600; }
.counted-count.is-over { color: var(--ui-danger); font-weight: 700; }
```
