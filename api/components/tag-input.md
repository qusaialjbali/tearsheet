# Tag input (Tearsheet, Forms)

Type a word and press Enter or comma to turn it into a removable tag.

**Why it works:** Backspace in the empty field removes the last tag. Each tag’s remove button names the tag (“Remove design”), and changes are announced.

**Checked:** axe clean in light and dark; tightest text contrast 5.35:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html -->
<div class="tags">
  <label class="tags-label" for="tags-new">Topics</label>
  <div class="tags-box">
    <ul class="tags-list" aria-label="Added topics"></ul>
    <input class="tags-input" id="tags-new" type="text" placeholder="Add a topic" enterkeyhint="done" autocomplete="off">
  </div>
  <p class="tags-hint">Press Enter or comma to add. Up to 6.</p>
  <span class="tags-live" aria-live="polite"></span>
</div>
```

`styles.css`

```css
/* tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html */
.tags { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.tags-label { font-size: 14px; font-weight: 600; }
.tags-box {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 46px; padding: 6px 8px;
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: text;
}
.tags-box:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.tags-list { display: contents; margin: 0; padding: 0; list-style: none; }
.tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 3px 4px 3px 10px;
  font-size: 14px; font-weight: 600; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px;
}
.tag button {
  display: grid; place-items: center; width: 22px; height: 22px; padding: 0;
  color: inherit; background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.tag button:hover { background: rgb(127 127 127 / 0.2); }
.tag button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tag svg { width: 14px; height: 14px; }
.tags-input { flex: 1; min-width: 120px; padding: 6px 4px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; outline: none; }
.tags-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
.tags-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
```

`script.js`

```js
/* tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html */
function setup(root) {
  const list = root.querySelector('.tags-list');
  const input = root.querySelector('.tags-input');
  const live = root.querySelector('.tags-live');
  const box = root.querySelector('.tags-box');
  const MAX = 6;
  const tags = ['design', 'accessibility'];

  const render = () => {
    list.replaceChildren(...tags.map((t) => {
      const li = document.createElement('li');
      li.className = 'tag';
      li.textContent = t;
      const x = document.createElement('button');
      x.type = 'button';
      x.setAttribute('aria-label', 'Remove ' + t);
      x.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      x.addEventListener('click', () => remove(t));
      li.append(x);
      return li;
    }));
    input.disabled = tags.length >= MAX;
    input.placeholder = tags.length >= MAX ? 'Limit reached' : 'Add a topic';
  };
  const add = (raw) => {
    const t = raw.trim().toLowerCase();
    if (!t || tags.includes(t) || tags.length >= MAX) return;
    tags.push(t);
    render();
    live.textContent = 'Added ' + t;
  };
  const remove = (t) => {
    tags.splice(tags.indexOf(t), 1);
    render();
    live.textContent = 'Removed ' + t;
    input.focus();
  };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input.value); input.value = ''; }
    else if (e.key === 'Backspace' && !input.value && tags.length) remove(tags[tags.length - 1]);
  };
  const onBox = (e) => { if (e.target === box) input.focus(); };
  input.addEventListener('keydown', onKey);
  box.addEventListener('click', onBox);
  render();
  return () => { input.removeEventListener('keydown', onKey); box.removeEventListener('click', onBox); };
}

document.querySelectorAll(".tags").forEach(setup);
```

## React

`TagInput.jsx`

```jsx
/* tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html */
import { useEffect, useRef } from 'react';
import './TagInput.css';

function setup(root) {
  const list = root.querySelector('.tags-list');
  const input = root.querySelector('.tags-input');
  const live = root.querySelector('.tags-live');
  const box = root.querySelector('.tags-box');
  const MAX = 6;
  const tags = ['design', 'accessibility'];

  const render = () => {
    list.replaceChildren(...tags.map((t) => {
      const li = document.createElement('li');
      li.className = 'tag';
      li.textContent = t;
      const x = document.createElement('button');
      x.type = 'button';
      x.setAttribute('aria-label', 'Remove ' + t);
      x.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      x.addEventListener('click', () => remove(t));
      li.append(x);
      return li;
    }));
    input.disabled = tags.length >= MAX;
    input.placeholder = tags.length >= MAX ? 'Limit reached' : 'Add a topic';
  };
  const add = (raw) => {
    const t = raw.trim().toLowerCase();
    if (!t || tags.includes(t) || tags.length >= MAX) return;
    tags.push(t);
    render();
    live.textContent = 'Added ' + t;
  };
  const remove = (t) => {
    tags.splice(tags.indexOf(t), 1);
    render();
    live.textContent = 'Removed ' + t;
    input.focus();
  };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input.value); input.value = ''; }
    else if (e.key === 'Backspace' && !input.value && tags.length) remove(tags[tags.length - 1]);
  };
  const onBox = (e) => { if (e.target === box) input.focus(); };
  input.addEventListener('keydown', onKey);
  box.addEventListener('click', onBox);
  render();
  return () => { input.removeEventListener('keydown', onKey); box.removeEventListener('click', onBox); };
}

export function TagInput() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="tags">
      <label className="tags-label" htmlFor="tags-new">Topics</label>
      <div className="tags-box">
        <ul className="tags-list" aria-label="Added topics"></ul>
        <input className="tags-input" id="tags-new" type="text" placeholder="Add a topic" enterKeyHint="done" autoComplete="off" />
      </div>
      <p className="tags-hint">Press Enter or comma to add. Up to 6.</p>
      <span className="tags-live" aria-live="polite"></span>
    </div>
  );
}
```

`TagInput.css`

```css
/* tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html */
.tags { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.tags-label { font-size: 14px; font-weight: 600; }
.tags-box {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 46px; padding: 6px 8px;
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: text;
}
.tags-box:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.tags-list { display: contents; margin: 0; padding: 0; list-style: none; }
.tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 3px 4px 3px 10px;
  font-size: 14px; font-weight: 600; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px;
}
.tag button {
  display: grid; place-items: center; width: 22px; height: 22px; padding: 0;
  color: inherit; background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.tag button:hover { background: rgb(127 127 127 / 0.2); }
.tag button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tag svg { width: 14px; height: 14px; }
.tags-input { flex: 1; min-width: 120px; padding: 6px 4px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; outline: none; }
.tags-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
.tags-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
```

## Vue

`TagInput.vue`

```vue
<!-- tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const list = root.querySelector('.tags-list');
  const input = root.querySelector('.tags-input');
  const live = root.querySelector('.tags-live');
  const box = root.querySelector('.tags-box');
  const MAX = 6;
  const tags = ['design', 'accessibility'];

  const render = () => {
    list.replaceChildren(...tags.map((t) => {
      const li = document.createElement('li');
      li.className = 'tag';
      li.textContent = t;
      const x = document.createElement('button');
      x.type = 'button';
      x.setAttribute('aria-label', 'Remove ' + t);
      x.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      x.addEventListener('click', () => remove(t));
      li.append(x);
      return li;
    }));
    input.disabled = tags.length >= MAX;
    input.placeholder = tags.length >= MAX ? 'Limit reached' : 'Add a topic';
  };
  const add = (raw) => {
    const t = raw.trim().toLowerCase();
    if (!t || tags.includes(t) || tags.length >= MAX) return;
    tags.push(t);
    render();
    live.textContent = 'Added ' + t;
  };
  const remove = (t) => {
    tags.splice(tags.indexOf(t), 1);
    render();
    live.textContent = 'Removed ' + t;
    input.focus();
  };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input.value); input.value = ''; }
    else if (e.key === 'Backspace' && !input.value && tags.length) remove(tags[tags.length - 1]);
  };
  const onBox = (e) => { if (e.target === box) input.focus(); };
  input.addEventListener('keydown', onKey);
  box.addEventListener('click', onBox);
  render();
  return () => { input.removeEventListener('keydown', onKey); box.removeEventListener('click', onBox); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="tags">
    <label class="tags-label" for="tags-new">Topics</label>
    <div class="tags-box">
      <ul class="tags-list" aria-label="Added topics"></ul>
      <input class="tags-input" id="tags-new" type="text" placeholder="Add a topic" enterkeyhint="done" autocomplete="off">
    </div>
    <p class="tags-hint">Press Enter or comma to add. Up to 6.</p>
    <span class="tags-live" aria-live="polite"></span>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.tags { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.tags-label { font-size: 14px; font-weight: 600; }
.tags-box {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 46px; padding: 6px 8px;
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: text;
}
.tags-box:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.tags-list { display: contents; margin: 0; padding: 0; list-style: none; }
.tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 3px 4px 3px 10px;
  font-size: 14px; font-weight: 600; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px;
}
.tag button {
  display: grid; place-items: center; width: 22px; height: 22px; padding: 0;
  color: inherit; background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.tag button:hover { background: rgb(127 127 127 / 0.2); }
.tag button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tag svg { width: 14px; height: 14px; }
.tags-input { flex: 1; min-width: 120px; padding: 6px 4px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; outline: none; }
.tags-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
.tags-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
</style>
```

## Svelte

`TagInput.svelte`

```svelte
<!-- tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html -->
<script>
  import { onMount } from 'svelte';
  import './TagInput.css';

  let node;

  function setup(root) {
    const list = root.querySelector('.tags-list');
    const input = root.querySelector('.tags-input');
    const live = root.querySelector('.tags-live');
    const box = root.querySelector('.tags-box');
    const MAX = 6;
    const tags = ['design', 'accessibility'];

    const render = () => {
      list.replaceChildren(...tags.map((t) => {
        const li = document.createElement('li');
        li.className = 'tag';
        li.textContent = t;
        const x = document.createElement('button');
        x.type = 'button';
        x.setAttribute('aria-label', 'Remove ' + t);
        x.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        x.addEventListener('click', () => remove(t));
        li.append(x);
        return li;
      }));
      input.disabled = tags.length >= MAX;
      input.placeholder = tags.length >= MAX ? 'Limit reached' : 'Add a topic';
    };
    const add = (raw) => {
      const t = raw.trim().toLowerCase();
      if (!t || tags.includes(t) || tags.length >= MAX) return;
      tags.push(t);
      render();
      live.textContent = 'Added ' + t;
    };
    const remove = (t) => {
      tags.splice(tags.indexOf(t), 1);
      render();
      live.textContent = 'Removed ' + t;
      input.focus();
    };
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input.value); input.value = ''; }
      else if (e.key === 'Backspace' && !input.value && tags.length) remove(tags[tags.length - 1]);
    };
    const onBox = (e) => { if (e.target === box) input.focus(); };
    input.addEventListener('keydown', onKey);
    box.addEventListener('click', onBox);
    render();
    return () => { input.removeEventListener('keydown', onKey); box.removeEventListener('click', onBox); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="tags">
  <label class="tags-label" for="tags-new">Topics</label>
  <div class="tags-box">
    <ul class="tags-list" aria-label="Added topics"></ul>
    <input class="tags-input" id="tags-new" type="text" placeholder="Add a topic" enterkeyhint="done" autocomplete="off">
  </div>
  <p class="tags-hint">Press Enter or comma to add. Up to 6.</p>
  <span class="tags-live" aria-live="polite"></span>
</div>
```

`TagInput.css`

```css
/* tearsheet tag-input v26650985 · https://qusaialjbali.github.io/tearsheet/zine/parts/tag-input.html */
.tags { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.tags-label { font-size: 14px; font-weight: 600; }
.tags-box {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 46px; padding: 6px 8px;
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: text;
}
.tags-box:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.tags-list { display: contents; margin: 0; padding: 0; list-style: none; }
.tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 3px 4px 3px 10px;
  font-size: 14px; font-weight: 600; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px;
}
.tag button {
  display: grid; place-items: center; width: 22px; height: 22px; padding: 0;
  color: inherit; background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.tag button:hover { background: rgb(127 127 127 / 0.2); }
.tag button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tag svg { width: 14px; height: 14px; }
.tags-input { flex: 1; min-width: 120px; padding: 6px 4px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; outline: none; }
.tags-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
.tags-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
```
