# Autocomplete (Tearsheet, Forms)

A text field that suggests matching options as you type, with full keyboard control.

**Why it works:** Follows the WAI-ARIA combobox pattern: focus stays in the input, arrows move through suggestions, Enter picks, Esc closes. People can still type a value that is not in the list.

**Checked:** axe clean in light and dark; tightest text contrast 16.1:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html -->
<div class="combo">
  <label class="combo-label" for="combo-city">City</label>
  <div class="combo-wrap">
    <input class="combo-input" id="combo-city" type="text" role="combobox" aria-expanded="false" aria-controls="combo-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing, e.g. “am”">
    <ul class="combo-list" id="combo-list" role="listbox" aria-label="Cities" hidden></ul>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html */
.combo { display: grid; gap: 6px; width: 100%; max-width: 340px; }
.combo-label { font-size: 14px; font-weight: 600; }
.combo-wrap { position: relative; }
.combo-input {
  width: 100%; min-height: 42px; padding: 10px 12px; font: inherit; font-size: 15px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.combo-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.combo-list {
  position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 10; max-height: 220px; overflow-y: auto;
  margin: 0; padding: 6px; list-style: none;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.combo-list li { padding: 9px 10px; font-size: 15px; border-radius: 6px; cursor: pointer; }
.combo-list li mark { color: inherit; background: none; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.combo-list li[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
```

`script.js`

```js
/* tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html */
function setup(root) {
  const CITIES = ['Amman', 'Amsterdam', 'Athens', 'Auckland', 'Bangkok', 'Barcelona', 'Berlin', 'Bogotá', 'Cairo', 'Cape Town', 'Dubai', 'Istanbul', 'Lagos', 'Lisbon', 'London', 'Madrid', 'Mexico City', 'Montreal', 'Nairobi', 'Oslo', 'Paris', 'Seoul', 'Tokyo', 'Toronto'];
  const input = root.querySelector('.combo-input');
  const list = root.querySelector('.combo-list');
  let matches = [];
  let active = -1;

  const show = (open) => { list.hidden = !open; input.setAttribute('aria-expanded', String(open)); };
  const highlight = (i) => {
    active = i;
    [...list.children].forEach((li, n) => li.setAttribute('aria-selected', String(n === i)));
    const li = list.children[i];
    if (li) { input.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
    else input.removeAttribute('aria-activedescendant');
  };
  const render = () => {
    const q = input.value.trim().toLowerCase();
    matches = q ? CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8) : [];
    list.replaceChildren(...matches.map((c, i) => {
      const li = document.createElement('li');
      li.id = 'combo-opt-' + i;
      li.setAttribute('role', 'option');
      const at = c.toLowerCase().indexOf(q);
      const mark = document.createElement('mark');
      mark.textContent = c.slice(at, at + q.length);
      li.append(c.slice(0, at), mark, c.slice(at + q.length));
      return li;
    }));
    show(matches.length > 0);
    highlight(-1);
  };
  const pick = (i) => { if (i < 0) return; input.value = matches[i]; show(false); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); highlight(Math.min(active + 1, matches.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter' && !list.hidden && active >= 0) { e.preventDefault(); pick(active); }
    else if (e.key === 'Escape') show(false);
  };
  const onClick = (e) => { const li = e.target.closest('li'); if (li) pick([...list.children].indexOf(li)); };
  const onBlur = () => setTimeout(() => show(false), 120);

  input.addEventListener('input', render);
  input.addEventListener('keydown', onKey);
  input.addEventListener('blur', onBlur);
  list.addEventListener('pointerdown', (e) => e.preventDefault());
  list.addEventListener('click', onClick);
  return () => {
    input.removeEventListener('input', render);
    input.removeEventListener('keydown', onKey);
    input.removeEventListener('blur', onBlur);
    list.removeEventListener('click', onClick);
  };
}

document.querySelectorAll(".combo").forEach(setup);
```

## React

`Combobox.jsx`

```jsx
/* tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html */
import { useEffect, useRef } from 'react';
import './Combobox.css';

function setup(root) {
  const CITIES = ['Amman', 'Amsterdam', 'Athens', 'Auckland', 'Bangkok', 'Barcelona', 'Berlin', 'Bogotá', 'Cairo', 'Cape Town', 'Dubai', 'Istanbul', 'Lagos', 'Lisbon', 'London', 'Madrid', 'Mexico City', 'Montreal', 'Nairobi', 'Oslo', 'Paris', 'Seoul', 'Tokyo', 'Toronto'];
  const input = root.querySelector('.combo-input');
  const list = root.querySelector('.combo-list');
  let matches = [];
  let active = -1;

  const show = (open) => { list.hidden = !open; input.setAttribute('aria-expanded', String(open)); };
  const highlight = (i) => {
    active = i;
    [...list.children].forEach((li, n) => li.setAttribute('aria-selected', String(n === i)));
    const li = list.children[i];
    if (li) { input.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
    else input.removeAttribute('aria-activedescendant');
  };
  const render = () => {
    const q = input.value.trim().toLowerCase();
    matches = q ? CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8) : [];
    list.replaceChildren(...matches.map((c, i) => {
      const li = document.createElement('li');
      li.id = 'combo-opt-' + i;
      li.setAttribute('role', 'option');
      const at = c.toLowerCase().indexOf(q);
      const mark = document.createElement('mark');
      mark.textContent = c.slice(at, at + q.length);
      li.append(c.slice(0, at), mark, c.slice(at + q.length));
      return li;
    }));
    show(matches.length > 0);
    highlight(-1);
  };
  const pick = (i) => { if (i < 0) return; input.value = matches[i]; show(false); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); highlight(Math.min(active + 1, matches.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter' && !list.hidden && active >= 0) { e.preventDefault(); pick(active); }
    else if (e.key === 'Escape') show(false);
  };
  const onClick = (e) => { const li = e.target.closest('li'); if (li) pick([...list.children].indexOf(li)); };
  const onBlur = () => setTimeout(() => show(false), 120);

  input.addEventListener('input', render);
  input.addEventListener('keydown', onKey);
  input.addEventListener('blur', onBlur);
  list.addEventListener('pointerdown', (e) => e.preventDefault());
  list.addEventListener('click', onClick);
  return () => {
    input.removeEventListener('input', render);
    input.removeEventListener('keydown', onKey);
    input.removeEventListener('blur', onBlur);
    list.removeEventListener('click', onClick);
  };
}

export function Combobox() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="combo">
      <label className="combo-label" htmlFor="combo-city">City</label>
      <div className="combo-wrap">
        <input className="combo-input" id="combo-city" type="text" role="combobox" aria-expanded="false" aria-controls="combo-list" aria-autocomplete="list" autoComplete="off" placeholder="Start typing, e.g. “am”" />
        <ul className="combo-list" id="combo-list" role="listbox" aria-label="Cities" hidden></ul>
      </div>
    </div>
  );
}
```

`Combobox.css`

```css
/* tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html */
.combo { display: grid; gap: 6px; width: 100%; max-width: 340px; }
.combo-label { font-size: 14px; font-weight: 600; }
.combo-wrap { position: relative; }
.combo-input {
  width: 100%; min-height: 42px; padding: 10px 12px; font: inherit; font-size: 15px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.combo-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.combo-list {
  position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 10; max-height: 220px; overflow-y: auto;
  margin: 0; padding: 6px; list-style: none;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.combo-list li { padding: 9px 10px; font-size: 15px; border-radius: 6px; cursor: pointer; }
.combo-list li mark { color: inherit; background: none; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.combo-list li[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
```

## Vue

`Combobox.vue`

```vue
<!-- tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const CITIES = ['Amman', 'Amsterdam', 'Athens', 'Auckland', 'Bangkok', 'Barcelona', 'Berlin', 'Bogotá', 'Cairo', 'Cape Town', 'Dubai', 'Istanbul', 'Lagos', 'Lisbon', 'London', 'Madrid', 'Mexico City', 'Montreal', 'Nairobi', 'Oslo', 'Paris', 'Seoul', 'Tokyo', 'Toronto'];
  const input = root.querySelector('.combo-input');
  const list = root.querySelector('.combo-list');
  let matches = [];
  let active = -1;

  const show = (open) => { list.hidden = !open; input.setAttribute('aria-expanded', String(open)); };
  const highlight = (i) => {
    active = i;
    [...list.children].forEach((li, n) => li.setAttribute('aria-selected', String(n === i)));
    const li = list.children[i];
    if (li) { input.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
    else input.removeAttribute('aria-activedescendant');
  };
  const render = () => {
    const q = input.value.trim().toLowerCase();
    matches = q ? CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8) : [];
    list.replaceChildren(...matches.map((c, i) => {
      const li = document.createElement('li');
      li.id = 'combo-opt-' + i;
      li.setAttribute('role', 'option');
      const at = c.toLowerCase().indexOf(q);
      const mark = document.createElement('mark');
      mark.textContent = c.slice(at, at + q.length);
      li.append(c.slice(0, at), mark, c.slice(at + q.length));
      return li;
    }));
    show(matches.length > 0);
    highlight(-1);
  };
  const pick = (i) => { if (i < 0) return; input.value = matches[i]; show(false); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); highlight(Math.min(active + 1, matches.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter' && !list.hidden && active >= 0) { e.preventDefault(); pick(active); }
    else if (e.key === 'Escape') show(false);
  };
  const onClick = (e) => { const li = e.target.closest('li'); if (li) pick([...list.children].indexOf(li)); };
  const onBlur = () => setTimeout(() => show(false), 120);

  input.addEventListener('input', render);
  input.addEventListener('keydown', onKey);
  input.addEventListener('blur', onBlur);
  list.addEventListener('pointerdown', (e) => e.preventDefault());
  list.addEventListener('click', onClick);
  return () => {
    input.removeEventListener('input', render);
    input.removeEventListener('keydown', onKey);
    input.removeEventListener('blur', onBlur);
    list.removeEventListener('click', onClick);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="combo">
    <label class="combo-label" for="combo-city">City</label>
    <div class="combo-wrap">
      <input class="combo-input" id="combo-city" type="text" role="combobox" aria-expanded="false" aria-controls="combo-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing, e.g. “am”">
      <ul class="combo-list" id="combo-list" role="listbox" aria-label="Cities" hidden></ul>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.combo { display: grid; gap: 6px; width: 100%; max-width: 340px; }
.combo-label { font-size: 14px; font-weight: 600; }
.combo-wrap { position: relative; }
.combo-input {
  width: 100%; min-height: 42px; padding: 10px 12px; font: inherit; font-size: 15px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.combo-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.combo-list {
  position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 10; max-height: 220px; overflow-y: auto;
  margin: 0; padding: 6px; list-style: none;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.combo-list li { padding: 9px 10px; font-size: 15px; border-radius: 6px; cursor: pointer; }
.combo-list li mark { color: inherit; background: none; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.combo-list li[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
</style>
```

## Svelte

`Combobox.svelte`

```svelte
<!-- tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html -->
<script>
  import { onMount } from 'svelte';
  import './Combobox.css';

  let node;

  function setup(root) {
    const CITIES = ['Amman', 'Amsterdam', 'Athens', 'Auckland', 'Bangkok', 'Barcelona', 'Berlin', 'Bogotá', 'Cairo', 'Cape Town', 'Dubai', 'Istanbul', 'Lagos', 'Lisbon', 'London', 'Madrid', 'Mexico City', 'Montreal', 'Nairobi', 'Oslo', 'Paris', 'Seoul', 'Tokyo', 'Toronto'];
    const input = root.querySelector('.combo-input');
    const list = root.querySelector('.combo-list');
    let matches = [];
    let active = -1;

    const show = (open) => { list.hidden = !open; input.setAttribute('aria-expanded', String(open)); };
    const highlight = (i) => {
      active = i;
      [...list.children].forEach((li, n) => li.setAttribute('aria-selected', String(n === i)));
      const li = list.children[i];
      if (li) { input.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
      else input.removeAttribute('aria-activedescendant');
    };
    const render = () => {
      const q = input.value.trim().toLowerCase();
      matches = q ? CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8) : [];
      list.replaceChildren(...matches.map((c, i) => {
        const li = document.createElement('li');
        li.id = 'combo-opt-' + i;
        li.setAttribute('role', 'option');
        const at = c.toLowerCase().indexOf(q);
        const mark = document.createElement('mark');
        mark.textContent = c.slice(at, at + q.length);
        li.append(c.slice(0, at), mark, c.slice(at + q.length));
        return li;
      }));
      show(matches.length > 0);
      highlight(-1);
    };
    const pick = (i) => { if (i < 0) return; input.value = matches[i]; show(false); };
    const onKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); highlight(Math.min(active + 1, matches.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
      else if (e.key === 'Enter' && !list.hidden && active >= 0) { e.preventDefault(); pick(active); }
      else if (e.key === 'Escape') show(false);
    };
    const onClick = (e) => { const li = e.target.closest('li'); if (li) pick([...list.children].indexOf(li)); };
    const onBlur = () => setTimeout(() => show(false), 120);

    input.addEventListener('input', render);
    input.addEventListener('keydown', onKey);
    input.addEventListener('blur', onBlur);
    list.addEventListener('pointerdown', (e) => e.preventDefault());
    list.addEventListener('click', onClick);
    return () => {
      input.removeEventListener('input', render);
      input.removeEventListener('keydown', onKey);
      input.removeEventListener('blur', onBlur);
      list.removeEventListener('click', onClick);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="combo">
  <label class="combo-label" for="combo-city">City</label>
  <div class="combo-wrap">
    <input class="combo-input" id="combo-city" type="text" role="combobox" aria-expanded="false" aria-controls="combo-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing, e.g. “am”">
    <ul class="combo-list" id="combo-list" role="listbox" aria-label="Cities" hidden></ul>
  </div>
</div>
```

`Combobox.css`

```css
/* tearsheet combobox vfff72dab · https://qusaialjbali.github.io/tearsheet/zine/parts/combobox.html */
.combo { display: grid; gap: 6px; width: 100%; max-width: 340px; }
.combo-label { font-size: 14px; font-weight: 600; }
.combo-wrap { position: relative; }
.combo-input {
  width: 100%; min-height: 42px; padding: 10px 12px; font: inherit; font-size: 15px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.combo-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.combo-list {
  position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 10; max-height: 220px; overflow-y: auto;
  margin: 0; padding: 6px; list-style: none;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.combo-list li { padding: 9px 10px; font-size: 15px; border-radius: 6px; cursor: pointer; }
.combo-list li mark { color: inherit; background: none; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.combo-list li[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
```
