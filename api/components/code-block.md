# Code block (Tearsheet, Content)

A file-tabbed code snippet with line numbers, a highlighted line and a copy button.

**Why it works:** Line numbers are CSS counters, so copying the code never copies the numbers. The block scrolls sideways instead of wrapping, and is focusable so keyboard users can scroll it.

**Checked:** axe clean in light and dark; tightest text contrast 7.02:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html -->
<figure class="codeblock">
  <figcaption><span>tokens.css</span><button class="cb-copy" type="button">Copy</button></figcaption>
  <pre tabindex="0"><code><span class="ln">:root &#123;</span>
<span class="ln">  --ui-accent: #4f46e5;</span>
<span class="ln is-hl">  --ui-radius: 12px;</span>
<span class="ln">  --ui-focus: 0 0 0 3px rgb(79 70 229 / 0.4);</span>
<span class="ln">&#125;</span></code></pre>
</figure>
```

`styles.css`

```css
/* tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html */
.codeblock { width: 100%; max-width: 520px; margin: 0; overflow: hidden; background: #16161c; border-radius: var(--ui-radius); }
.codeblock figcaption { display: flex; justify-content: space-between; align-items: center; padding: 8px 8px 8px 16px; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #a1a1aa; border-bottom: 1px solid #2a2a33; }
.cb-copy { padding: 5px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e4e4e7; background: #2a2a33; border: 0; border-radius: 6px; cursor: pointer; }
.cb-copy:hover { background: #3a3a45; }
.cb-copy:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.codeblock pre { margin: 0; padding: 14px 0; overflow-x: auto; counter-reset: ln; font-family: ui-monospace, Consolas, monospace; font-size: 13px; line-height: 1.7; color: #e4e4e7; }
.codeblock pre:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.ln { display: inline-block; min-width: 100%; padding-right: 16px; counter-increment: ln; }
.ln::before { content: counter(ln); display: inline-block; width: 2.5em; margin-right: 1em; text-align: right; color: #52525b; user-select: none; }
.ln.is-hl { background: rgb(129 140 248 / 0.16); box-shadow: inset 3px 0 0 #818cf8; }
```

`script.js`

```js
/* tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html */
function setup(root) {
  const btn = root.querySelector('.cb-copy');
  const code = root.querySelector('code');
  let t;
  const onCopy = async () => {
    // join lines explicitly so line breaks survive in every framework
    const text = [...code.querySelectorAll('.ln')].map((l) => l.textContent).join('\n');
    try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; }
    catch (e) { btn.textContent = 'Press Ctrl+C'; }
    clearTimeout(t);
    t = setTimeout(() => (btn.textContent = 'Copy'), 1600);
  };
  btn.addEventListener('click', onCopy);
  return () => { clearTimeout(t); btn.removeEventListener('click', onCopy); };
}

document.querySelectorAll(".codeblock").forEach(setup);
```

## React

`CodeBlock.jsx`

```jsx
/* tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html */
import { useEffect, useRef } from 'react';
import './CodeBlock.css';

function setup(root) {
  const btn = root.querySelector('.cb-copy');
  const code = root.querySelector('code');
  let t;
  const onCopy = async () => {
    // join lines explicitly so line breaks survive in every framework
    const text = [...code.querySelectorAll('.ln')].map((l) => l.textContent).join('\n');
    try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; }
    catch (e) { btn.textContent = 'Press Ctrl+C'; }
    clearTimeout(t);
    t = setTimeout(() => (btn.textContent = 'Copy'), 1600);
  };
  btn.addEventListener('click', onCopy);
  return () => { clearTimeout(t); btn.removeEventListener('click', onCopy); };
}

export function CodeBlock() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <figure ref={ref} className="codeblock">
      <figcaption><span>tokens.css</span><button className="cb-copy" type="button">Copy</button></figcaption>
      <pre tabIndex={0}><code><span className="ln">:root &#123;</span>
    <span className="ln">  --ui-accent: #4f46e5;</span>
    <span className="ln is-hl">  --ui-radius: 12px;</span>
    <span className="ln">  --ui-focus: 0 0 0 3px rgb(79 70 229 / 0.4);</span>
    <span className="ln">&#125;</span></code></pre>
    </figure>
  );
}
```

`CodeBlock.css`

```css
/* tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html */
.codeblock { width: 100%; max-width: 520px; margin: 0; overflow: hidden; background: #16161c; border-radius: var(--ui-radius); }
.codeblock figcaption { display: flex; justify-content: space-between; align-items: center; padding: 8px 8px 8px 16px; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #a1a1aa; border-bottom: 1px solid #2a2a33; }
.cb-copy { padding: 5px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e4e4e7; background: #2a2a33; border: 0; border-radius: 6px; cursor: pointer; }
.cb-copy:hover { background: #3a3a45; }
.cb-copy:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.codeblock pre { margin: 0; padding: 14px 0; overflow-x: auto; counter-reset: ln; font-family: ui-monospace, Consolas, monospace; font-size: 13px; line-height: 1.7; color: #e4e4e7; }
.codeblock pre:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.ln { display: inline-block; min-width: 100%; padding-right: 16px; counter-increment: ln; }
.ln::before { content: counter(ln); display: inline-block; width: 2.5em; margin-right: 1em; text-align: right; color: #52525b; user-select: none; }
.ln.is-hl { background: rgb(129 140 248 / 0.16); box-shadow: inset 3px 0 0 #818cf8; }
```

## Vue

`CodeBlock.vue`

```vue
<!-- tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const btn = root.querySelector('.cb-copy');
  const code = root.querySelector('code');
  let t;
  const onCopy = async () => {
    // join lines explicitly so line breaks survive in every framework
    const text = [...code.querySelectorAll('.ln')].map((l) => l.textContent).join('\n');
    try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; }
    catch (e) { btn.textContent = 'Press Ctrl+C'; }
    clearTimeout(t);
    t = setTimeout(() => (btn.textContent = 'Copy'), 1600);
  };
  btn.addEventListener('click', onCopy);
  return () => { clearTimeout(t); btn.removeEventListener('click', onCopy); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <figure ref="el" class="codeblock">
    <figcaption><span>tokens.css</span><button class="cb-copy" type="button">Copy</button></figcaption>
    <pre tabindex="0"><code><span class="ln">:root &#123;</span>
  <span class="ln">  --ui-accent: #4f46e5;</span>
  <span class="ln is-hl">  --ui-radius: 12px;</span>
  <span class="ln">  --ui-focus: 0 0 0 3px rgb(79 70 229 / 0.4);</span>
  <span class="ln">&#125;</span></code></pre>
  </figure>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.codeblock { width: 100%; max-width: 520px; margin: 0; overflow: hidden; background: #16161c; border-radius: var(--ui-radius); }
.codeblock figcaption { display: flex; justify-content: space-between; align-items: center; padding: 8px 8px 8px 16px; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #a1a1aa; border-bottom: 1px solid #2a2a33; }
.cb-copy { padding: 5px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e4e4e7; background: #2a2a33; border: 0; border-radius: 6px; cursor: pointer; }
.cb-copy:hover { background: #3a3a45; }
.cb-copy:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.codeblock pre { margin: 0; padding: 14px 0; overflow-x: auto; counter-reset: ln; font-family: ui-monospace, Consolas, monospace; font-size: 13px; line-height: 1.7; color: #e4e4e7; }
.codeblock pre:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.ln { display: inline-block; min-width: 100%; padding-right: 16px; counter-increment: ln; }
.ln::before { content: counter(ln); display: inline-block; width: 2.5em; margin-right: 1em; text-align: right; color: #52525b; user-select: none; }
.ln.is-hl { background: rgb(129 140 248 / 0.16); box-shadow: inset 3px 0 0 #818cf8; }
</style>
```

## Svelte

`CodeBlock.svelte`

```svelte
<!-- tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html -->
<script>
  import { onMount } from 'svelte';
  import './CodeBlock.css';

  let node;

  function setup(root) {
    const btn = root.querySelector('.cb-copy');
    const code = root.querySelector('code');
    let t;
    const onCopy = async () => {
      // join lines explicitly so line breaks survive in every framework
      const text = [...code.querySelectorAll('.ln')].map((l) => l.textContent).join('\n');
      try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; }
      catch (e) { btn.textContent = 'Press Ctrl+C'; }
      clearTimeout(t);
      t = setTimeout(() => (btn.textContent = 'Copy'), 1600);
    };
    btn.addEventListener('click', onCopy);
    return () => { clearTimeout(t); btn.removeEventListener('click', onCopy); };
  }

  onMount(() => setup(node));
</script>

<figure bind:this={node} class="codeblock">
  <figcaption><span>tokens.css</span><button class="cb-copy" type="button">Copy</button></figcaption>
  <pre tabindex="0"><code><span class="ln">:root &#123;</span>
<span class="ln">  --ui-accent: #4f46e5;</span>
<span class="ln is-hl">  --ui-radius: 12px;</span>
<span class="ln">  --ui-focus: 0 0 0 3px rgb(79 70 229 / 0.4);</span>
<span class="ln">&#125;</span></code></pre>
</figure>
```

`CodeBlock.css`

```css
/* tearsheet code-block v83e808b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/code-block.html */
.codeblock { width: 100%; max-width: 520px; margin: 0; overflow: hidden; background: #16161c; border-radius: var(--ui-radius); }
.codeblock figcaption { display: flex; justify-content: space-between; align-items: center; padding: 8px 8px 8px 16px; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #a1a1aa; border-bottom: 1px solid #2a2a33; }
.cb-copy { padding: 5px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e4e4e7; background: #2a2a33; border: 0; border-radius: 6px; cursor: pointer; }
.cb-copy:hover { background: #3a3a45; }
.cb-copy:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.codeblock pre { margin: 0; padding: 14px 0; overflow-x: auto; counter-reset: ln; font-family: ui-monospace, Consolas, monospace; font-size: 13px; line-height: 1.7; color: #e4e4e7; }
.codeblock pre:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.ln { display: inline-block; min-width: 100%; padding-right: 16px; counter-increment: ln; }
.ln::before { content: counter(ln); display: inline-block; width: 2.5em; margin-right: 1em; text-align: right; color: #52525b; user-select: none; }
.ln.is-hl { background: rgb(129 140 248 / 0.16); box-shadow: inset 3px 0 0 #818cf8; }
```
