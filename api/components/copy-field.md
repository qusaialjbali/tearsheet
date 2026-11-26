# Copy field (Tearsheet, Forms)

Read-only value with a copy button that confirms in place and announces it.

**Why it works:** Confirm the copy right where people looked, and say it to screen readers through a live region. If the clipboard is blocked, the text gets selected instead.

**Checked:** axe clean in light and dark; tightest text contrast 14.21:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html -->
<div class="copy-field">
  <label class="copy-label" for="invite-link">Invite link</label>
  <div class="copy-row">
    <input class="copy-input" id="invite-link" type="text" readonly value="https://example.com/invite/7Hq2-kX9p">
    <button class="copy-button" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span class="copy-text">Copy</span></button>
  </div>
  <span class="copy-status" aria-live="polite"></span>
</div>
```

`styles.css`

```css
/* tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html */
.copy-field { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.copy-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.copy-row {
  display: flex;
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.copy-input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  font: inherit;
  font-size: 14px;
  color: var(--ui-text);
  background: none;
  border: 0;
  text-overflow: ellipsis;
}
.copy-input:focus { outline: none; }
.copy-row:focus-within { box-shadow: var(--ui-focus); }
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 0;
  border-left: 1px solid var(--ui-border-strong);
  border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
  cursor: pointer;
}
.copy-button svg { width: 16px; height: 16px; }
.copy-button:hover { background: var(--ui-surface-2); }
.copy-button:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--ui-accent); }
.copy-field.is-copied .copy-button { color: var(--ui-success); }
.copy-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
```

`script.js`

```js
/* tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html */
function setup(root) {
  const input = root.querySelector('.copy-input');
  const button = root.querySelector('.copy-button');
  const text = root.querySelector('.copy-text');
  const status = root.querySelector('.copy-status');
  let timer;

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(input.value);
      text.textContent = 'Copied';
      status.textContent = 'Link copied to clipboard';
      root.classList.add('is-copied');
      clearTimeout(timer);
      timer = setTimeout(() => {
        text.textContent = 'Copy';
        status.textContent = '';
        root.classList.remove('is-copied');
      }, 1800);
    } catch (err) {
      input.select();
    }
  };

  button.addEventListener('click', onClick);
  return () => {
    clearTimeout(timer);
    button.removeEventListener('click', onClick);
  };
}

document.querySelectorAll(".copy-field").forEach(setup);
```

## React

`CopyField.jsx`

```jsx
/* tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html */
import { useEffect, useRef } from 'react';
import './CopyField.css';

function setup(root) {
  const input = root.querySelector('.copy-input');
  const button = root.querySelector('.copy-button');
  const text = root.querySelector('.copy-text');
  const status = root.querySelector('.copy-status');
  let timer;

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(input.value);
      text.textContent = 'Copied';
      status.textContent = 'Link copied to clipboard';
      root.classList.add('is-copied');
      clearTimeout(timer);
      timer = setTimeout(() => {
        text.textContent = 'Copy';
        status.textContent = '';
        root.classList.remove('is-copied');
      }, 1800);
    } catch (err) {
      input.select();
    }
  };

  button.addEventListener('click', onClick);
  return () => {
    clearTimeout(timer);
    button.removeEventListener('click', onClick);
  };
}

export function CopyField() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="copy-field">
      <label className="copy-label" htmlFor="invite-link">Invite link</label>
      <div className="copy-row">
        <input className="copy-input" id="invite-link" type="text" readOnly defaultValue="https://example.com/invite/7Hq2-kX9p" />
        <button className="copy-button" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg><span className="copy-text">Copy</span></button>
      </div>
      <span className="copy-status" aria-live="polite"></span>
    </div>
  );
}
```

`CopyField.css`

```css
/* tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html */
.copy-field { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.copy-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.copy-row {
  display: flex;
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.copy-input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  font: inherit;
  font-size: 14px;
  color: var(--ui-text);
  background: none;
  border: 0;
  text-overflow: ellipsis;
}
.copy-input:focus { outline: none; }
.copy-row:focus-within { box-shadow: var(--ui-focus); }
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 0;
  border-left: 1px solid var(--ui-border-strong);
  border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
  cursor: pointer;
}
.copy-button svg { width: 16px; height: 16px; }
.copy-button:hover { background: var(--ui-surface-2); }
.copy-button:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--ui-accent); }
.copy-field.is-copied .copy-button { color: var(--ui-success); }
.copy-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
```

## Vue

`CopyField.vue`

```vue
<!-- tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const input = root.querySelector('.copy-input');
  const button = root.querySelector('.copy-button');
  const text = root.querySelector('.copy-text');
  const status = root.querySelector('.copy-status');
  let timer;

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(input.value);
      text.textContent = 'Copied';
      status.textContent = 'Link copied to clipboard';
      root.classList.add('is-copied');
      clearTimeout(timer);
      timer = setTimeout(() => {
        text.textContent = 'Copy';
        status.textContent = '';
        root.classList.remove('is-copied');
      }, 1800);
    } catch (err) {
      input.select();
    }
  };

  button.addEventListener('click', onClick);
  return () => {
    clearTimeout(timer);
    button.removeEventListener('click', onClick);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="copy-field">
    <label class="copy-label" for="invite-link">Invite link</label>
    <div class="copy-row">
      <input class="copy-input" id="invite-link" type="text" readonly value="https://example.com/invite/7Hq2-kX9p">
      <button class="copy-button" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span class="copy-text">Copy</span></button>
    </div>
    <span class="copy-status" aria-live="polite"></span>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.copy-field { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.copy-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.copy-row {
  display: flex;
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.copy-input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  font: inherit;
  font-size: 14px;
  color: var(--ui-text);
  background: none;
  border: 0;
  text-overflow: ellipsis;
}
.copy-input:focus { outline: none; }
.copy-row:focus-within { box-shadow: var(--ui-focus); }
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 0;
  border-left: 1px solid var(--ui-border-strong);
  border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
  cursor: pointer;
}
.copy-button svg { width: 16px; height: 16px; }
.copy-button:hover { background: var(--ui-surface-2); }
.copy-button:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--ui-accent); }
.copy-field.is-copied .copy-button { color: var(--ui-success); }
.copy-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
</style>
```

## Svelte

`CopyField.svelte`

```svelte
<!-- tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html -->
<script>
  import { onMount } from 'svelte';
  import './CopyField.css';

  let node;

  function setup(root) {
    const input = root.querySelector('.copy-input');
    const button = root.querySelector('.copy-button');
    const text = root.querySelector('.copy-text');
    const status = root.querySelector('.copy-status');
    let timer;

    const onClick = async () => {
      try {
        await navigator.clipboard.writeText(input.value);
        text.textContent = 'Copied';
        status.textContent = 'Link copied to clipboard';
        root.classList.add('is-copied');
        clearTimeout(timer);
        timer = setTimeout(() => {
          text.textContent = 'Copy';
          status.textContent = '';
          root.classList.remove('is-copied');
        }, 1800);
      } catch (err) {
        input.select();
      }
    };

    button.addEventListener('click', onClick);
    return () => {
      clearTimeout(timer);
      button.removeEventListener('click', onClick);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="copy-field">
  <label class="copy-label" for="invite-link">Invite link</label>
  <div class="copy-row">
    <input class="copy-input" id="invite-link" type="text" readonly value="https://example.com/invite/7Hq2-kX9p">
    <button class="copy-button" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span class="copy-text">Copy</span></button>
  </div>
  <span class="copy-status" aria-live="polite"></span>
</div>
```

`CopyField.css`

```css
/* tearsheet copy-field v0d7ef826 · https://qusaialjbali.github.io/tearsheet/zine/parts/copy-field.html */
.copy-field { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.copy-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.copy-row {
  display: flex;
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.copy-input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  font: inherit;
  font-size: 14px;
  color: var(--ui-text);
  background: none;
  border: 0;
  text-overflow: ellipsis;
}
.copy-input:focus { outline: none; }
.copy-row:focus-within { box-shadow: var(--ui-focus); }
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 0;
  border-left: 1px solid var(--ui-border-strong);
  border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
  cursor: pointer;
}
.copy-button svg { width: 16px; height: 16px; }
.copy-button:hover { background: var(--ui-surface-2); }
.copy-button:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--ui-accent); }
.copy-field.is-copied .copy-button { color: var(--ui-success); }
.copy-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
```
