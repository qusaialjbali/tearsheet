# File dropzone (Tearsheet, Forms)

Drag files in or click to browse. A real file input underneath keeps it keyboard accessible.

**Why it works:** State the accepted types and size limit before people try. The visually hidden input stays focusable, and the whole zone shows its focus ring.

**Checked:** axe clean in light and dark; tightest text contrast 5.93:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html -->
<label class="drop">
  <input class="drop-input" type="file" multiple accept="image/*,.pdf">
  <svg class="drop-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="drop-title">Drop files here or <u>browse</u></span>
  <span class="drop-hint">PNG, JPG or PDF, up to 10 MB each</span>
  <span class="drop-files" aria-live="polite"></span>
</label>
```

`styles.css`

```css
/* tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html */
.drop {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 6px;
  width: 100%;
  max-width: 440px;
  padding: 32px 24px;
  text-align: center;
  background: var(--ui-surface);
  border: 2px dashed var(--ui-border-strong);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.drop:hover, .drop.is-over { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.drop:focus-within { box-shadow: var(--ui-focus); }
.drop-input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.drop-icon { width: 36px; height: 36px; margin-bottom: 6px; color: var(--ui-accent); }
.drop-title { font-weight: 600; color: var(--ui-text); }
.drop-title u { color: var(--ui-accent); text-underline-offset: 3px; }
.drop-hint { font-size: 13px; color: var(--ui-muted); }
.drop-files:not(:empty) {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface-2);
  border-radius: 999px;
}
```

`script.js`

```js
/* tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html */
function setup(root) {
  const input = root.querySelector('.drop-input');
  const list = root.querySelector('.drop-files');

  const show = () => {
    const names = [...input.files].map((f) => f.name);
    list.textContent = names.length ? names.length + ' selected: ' + names.join(', ') : '';
  };
  const over = (e) => {
    e.preventDefault();
    root.classList.add('is-over');
  };
  const leave = () => root.classList.remove('is-over');
  const drop = (e) => {
    e.preventDefault();
    leave();
    input.files = e.dataTransfer.files;
    show();
  };

  root.addEventListener('dragover', over);
  root.addEventListener('dragleave', leave);
  root.addEventListener('drop', drop);
  input.addEventListener('change', show);
  return () => {
    root.removeEventListener('dragover', over);
    root.removeEventListener('dragleave', leave);
    root.removeEventListener('drop', drop);
    input.removeEventListener('change', show);
  };
}

document.querySelectorAll(".drop").forEach(setup);
```

## React

`FileDropzone.jsx`

```jsx
/* tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html */
import { useEffect, useRef } from 'react';
import './FileDropzone.css';

function setup(root) {
  const input = root.querySelector('.drop-input');
  const list = root.querySelector('.drop-files');

  const show = () => {
    const names = [...input.files].map((f) => f.name);
    list.textContent = names.length ? names.length + ' selected: ' + names.join(', ') : '';
  };
  const over = (e) => {
    e.preventDefault();
    root.classList.add('is-over');
  };
  const leave = () => root.classList.remove('is-over');
  const drop = (e) => {
    e.preventDefault();
    leave();
    input.files = e.dataTransfer.files;
    show();
  };

  root.addEventListener('dragover', over);
  root.addEventListener('dragleave', leave);
  root.addEventListener('drop', drop);
  input.addEventListener('change', show);
  return () => {
    root.removeEventListener('dragover', over);
    root.removeEventListener('dragleave', leave);
    root.removeEventListener('drop', drop);
    input.removeEventListener('change', show);
  };
}

export function FileDropzone() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <label ref={ref} className="drop">
      <input className="drop-input" type="file" multiple accept="image/*,.pdf" />
      <svg className="drop-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <span className="drop-title">Drop files here or <u>browse</u></span>
      <span className="drop-hint">PNG, JPG or PDF, up to 10 MB each</span>
      <span className="drop-files" aria-live="polite"></span>
    </label>
  );
}
```

`FileDropzone.css`

```css
/* tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html */
.drop {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 6px;
  width: 100%;
  max-width: 440px;
  padding: 32px 24px;
  text-align: center;
  background: var(--ui-surface);
  border: 2px dashed var(--ui-border-strong);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.drop:hover, .drop.is-over { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.drop:focus-within { box-shadow: var(--ui-focus); }
.drop-input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.drop-icon { width: 36px; height: 36px; margin-bottom: 6px; color: var(--ui-accent); }
.drop-title { font-weight: 600; color: var(--ui-text); }
.drop-title u { color: var(--ui-accent); text-underline-offset: 3px; }
.drop-hint { font-size: 13px; color: var(--ui-muted); }
.drop-files:not(:empty) {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface-2);
  border-radius: 999px;
}
```

## Vue

`FileDropzone.vue`

```vue
<!-- tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const input = root.querySelector('.drop-input');
  const list = root.querySelector('.drop-files');

  const show = () => {
    const names = [...input.files].map((f) => f.name);
    list.textContent = names.length ? names.length + ' selected: ' + names.join(', ') : '';
  };
  const over = (e) => {
    e.preventDefault();
    root.classList.add('is-over');
  };
  const leave = () => root.classList.remove('is-over');
  const drop = (e) => {
    e.preventDefault();
    leave();
    input.files = e.dataTransfer.files;
    show();
  };

  root.addEventListener('dragover', over);
  root.addEventListener('dragleave', leave);
  root.addEventListener('drop', drop);
  input.addEventListener('change', show);
  return () => {
    root.removeEventListener('dragover', over);
    root.removeEventListener('dragleave', leave);
    root.removeEventListener('drop', drop);
    input.removeEventListener('change', show);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <label ref="el" class="drop">
    <input class="drop-input" type="file" multiple accept="image/*,.pdf">
    <svg class="drop-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span class="drop-title">Drop files here or <u>browse</u></span>
    <span class="drop-hint">PNG, JPG or PDF, up to 10 MB each</span>
    <span class="drop-files" aria-live="polite"></span>
  </label>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.drop {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 6px;
  width: 100%;
  max-width: 440px;
  padding: 32px 24px;
  text-align: center;
  background: var(--ui-surface);
  border: 2px dashed var(--ui-border-strong);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.drop:hover, .drop.is-over { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.drop:focus-within { box-shadow: var(--ui-focus); }
.drop-input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.drop-icon { width: 36px; height: 36px; margin-bottom: 6px; color: var(--ui-accent); }
.drop-title { font-weight: 600; color: var(--ui-text); }
.drop-title u { color: var(--ui-accent); text-underline-offset: 3px; }
.drop-hint { font-size: 13px; color: var(--ui-muted); }
.drop-files:not(:empty) {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface-2);
  border-radius: 999px;
}
</style>
```

## Svelte

`FileDropzone.svelte`

```svelte
<!-- tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html -->
<script>
  import { onMount } from 'svelte';
  import './FileDropzone.css';

  let node;

  function setup(root) {
    const input = root.querySelector('.drop-input');
    const list = root.querySelector('.drop-files');

    const show = () => {
      const names = [...input.files].map((f) => f.name);
      list.textContent = names.length ? names.length + ' selected: ' + names.join(', ') : '';
    };
    const over = (e) => {
      e.preventDefault();
      root.classList.add('is-over');
    };
    const leave = () => root.classList.remove('is-over');
    const drop = (e) => {
      e.preventDefault();
      leave();
      input.files = e.dataTransfer.files;
      show();
    };

    root.addEventListener('dragover', over);
    root.addEventListener('dragleave', leave);
    root.addEventListener('drop', drop);
    input.addEventListener('change', show);
    return () => {
      root.removeEventListener('dragover', over);
      root.removeEventListener('dragleave', leave);
      root.removeEventListener('drop', drop);
      input.removeEventListener('change', show);
    };
  }

  onMount(() => setup(node));
</script>

<label bind:this={node} class="drop">
  <input class="drop-input" type="file" multiple accept="image/*,.pdf">
  <svg class="drop-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="drop-title">Drop files here or <u>browse</u></span>
  <span class="drop-hint">PNG, JPG or PDF, up to 10 MB each</span>
  <span class="drop-files" aria-live="polite"></span>
</label>
```

`FileDropzone.css`

```css
/* tearsheet file-dropzone vcd41a5dc · https://qusaialjbali.github.io/tearsheet/zine/parts/file-dropzone.html */
.drop {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 6px;
  width: 100%;
  max-width: 440px;
  padding: 32px 24px;
  text-align: center;
  background: var(--ui-surface);
  border: 2px dashed var(--ui-border-strong);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.drop:hover, .drop.is-over { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.drop:focus-within { box-shadow: var(--ui-focus); }
.drop-input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.drop-icon { width: 36px; height: 36px; margin-bottom: 6px; color: var(--ui-accent); }
.drop-title { font-weight: 600; color: var(--ui-text); }
.drop-title u { color: var(--ui-accent); text-underline-offset: 3px; }
.drop-hint { font-size: 13px; color: var(--ui-muted); }
.drop-files:not(:empty) {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface-2);
  border-radius: 999px;
}
```
