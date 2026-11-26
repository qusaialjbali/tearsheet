# Sortable table (Tearsheet, Data)

Click a column header to sort; click again to reverse. Row checkboxes select, with a select-all.

**Why it works:** Headers are real buttons inside the <th>, and aria-sort tells screen readers the current order. The select-all box goes “mixed” when only some rows are picked.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 8 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html -->
<div class="st-wrap">
  <table class="st">
    <caption>Team members <span class="st-picked" aria-live="polite"></span></caption>
    <thead>
      <tr>
        <th scope="col" class="st-check"><input type="checkbox" aria-label="Select all members"></th>
        <th scope="col" aria-sort="ascending"><button type="button" data-key="name">Name</button></th>
        <th scope="col"><button type="button" data-key="role">Role</button></th>
        <th scope="col" class="num"><button type="button" data-key="tasks">Open tasks</button></th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Amara"></td><td>Amara</td><td>Designer</td><td class="num">7</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Bo"></td><td>Bo</td><td>Engineer</td><td class="num">12</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Chiara"></td><td>Chiara</td><td>Product</td><td class="num">3</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Dev"></td><td>Dev</td><td>Engineer</td><td class="num">9</td></tr>
    </tbody>
  </table>
</div>
```

`styles.css`

```css
/* tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html */
.st-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.st { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.st caption { padding: 16px 18px 8px; text-align: start; font-size: 16px; font-weight: 700; }
.st-picked { margin-left: 8px; font-size: 13px; font-weight: 600; color: var(--ui-accent); }
.st th, .st td { padding: 10px 18px; text-align: start; border-bottom: 1px solid var(--ui-border); }
.st tbody tr:last-child td { border-bottom: 0; }
.st tbody tr:has(input:checked) { background: var(--ui-accent-soft); }
.st .num { text-align: right; font-variant-numeric: tabular-nums; }
.st .st-check { width: 44px; padding-right: 0; }
.st input { width: 18px; height: 18px; accent-color: var(--ui-accent); }
.st th button {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 6px; margin: -4px -6px;
  font: inherit; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.st th.num button { flex-direction: row-reverse; }
.st th button::after { content: ""; width: 0; height: 0; border: 4px solid transparent; opacity: 0.4; border-top-color: currentColor; margin-top: 4px; }
.st th[aria-sort] button { color: var(--ui-text); }
.st th[aria-sort] button::after { opacity: 1; }
.st th[aria-sort="ascending"] button::after { border-top-color: transparent; border-bottom-color: currentColor; margin: -4px 0 0; }
.st th button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.st th button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

`script.js`

```js
/* tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html */
function setup(root) {
  const tbody = root.querySelector('tbody');
  const all = root.querySelector('thead input');
  const picked = root.querySelector('.st-picked');
  const heads = [...root.querySelectorAll('th button')];
  const col = { name: 1, role: 2, tasks: 3 };

  const sort = (btn) => {
    const th = btn.closest('th');
    const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
    root.querySelectorAll('th[aria-sort]').forEach((h) => h.removeAttribute('aria-sort'));
    th.setAttribute('aria-sort', dir);
    const i = col[btn.dataset.key];
    const rows = [...tbody.rows].sort((a, b) => {
      const x = a.cells[i].textContent, y = b.cells[i].textContent;
      const cmp = isNaN(x) ? x.localeCompare(y) : Number(x) - Number(y);
      return dir === 'ascending' ? cmp : -cmp;
    });
    tbody.append(...rows);
  };
  const sync = () => {
    const boxes = [...tbody.querySelectorAll('input')];
    const n = boxes.filter((b) => b.checked).length;
    all.checked = n === boxes.length;
    all.indeterminate = n > 0 && n < boxes.length;
    picked.textContent = n ? n + ' selected' : '';
  };
  const onAll = () => { tbody.querySelectorAll('input').forEach((b) => (b.checked = all.checked)); sync(); };
  const onHead = (e) => sort(e.currentTarget);
  heads.forEach((b) => b.addEventListener('click', onHead));
  all.addEventListener('change', onAll);
  tbody.addEventListener('change', sync);
  return () => {
    heads.forEach((b) => b.removeEventListener('click', onHead));
    all.removeEventListener('change', onAll);
    tbody.removeEventListener('change', sync);
  };
}

document.querySelectorAll(".st-wrap").forEach(setup);
```

## React

`SortableTable.jsx`

```jsx
/* tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html */
import { useEffect, useRef } from 'react';
import './SortableTable.css';

function setup(root) {
  const tbody = root.querySelector('tbody');
  const all = root.querySelector('thead input');
  const picked = root.querySelector('.st-picked');
  const heads = [...root.querySelectorAll('th button')];
  const col = { name: 1, role: 2, tasks: 3 };

  const sort = (btn) => {
    const th = btn.closest('th');
    const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
    root.querySelectorAll('th[aria-sort]').forEach((h) => h.removeAttribute('aria-sort'));
    th.setAttribute('aria-sort', dir);
    const i = col[btn.dataset.key];
    const rows = [...tbody.rows].sort((a, b) => {
      const x = a.cells[i].textContent, y = b.cells[i].textContent;
      const cmp = isNaN(x) ? x.localeCompare(y) : Number(x) - Number(y);
      return dir === 'ascending' ? cmp : -cmp;
    });
    tbody.append(...rows);
  };
  const sync = () => {
    const boxes = [...tbody.querySelectorAll('input')];
    const n = boxes.filter((b) => b.checked).length;
    all.checked = n === boxes.length;
    all.indeterminate = n > 0 && n < boxes.length;
    picked.textContent = n ? n + ' selected' : '';
  };
  const onAll = () => { tbody.querySelectorAll('input').forEach((b) => (b.checked = all.checked)); sync(); };
  const onHead = (e) => sort(e.currentTarget);
  heads.forEach((b) => b.addEventListener('click', onHead));
  all.addEventListener('change', onAll);
  tbody.addEventListener('change', sync);
  return () => {
    heads.forEach((b) => b.removeEventListener('click', onHead));
    all.removeEventListener('change', onAll);
    tbody.removeEventListener('change', sync);
  };
}

export function SortableTable() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="st-wrap">
      <table className="st">
        <caption>Team members <span className="st-picked" aria-live="polite"></span></caption>
        <thead>
          <tr>
            <th scope="col" className="st-check"><input type="checkbox" aria-label="Select all members" /></th>
            <th scope="col" aria-sort="ascending"><button type="button" data-key="name">Name</button></th>
            <th scope="col"><button type="button" data-key="role">Role</button></th>
            <th scope="col" className="num"><button type="button" data-key="tasks">Open tasks</button></th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="st-check"><input type="checkbox" aria-label="Select Amara" /></td><td>Amara</td><td>Designer</td><td className="num">7</td></tr>
          <tr><td className="st-check"><input type="checkbox" aria-label="Select Bo" /></td><td>Bo</td><td>Engineer</td><td className="num">12</td></tr>
          <tr><td className="st-check"><input type="checkbox" aria-label="Select Chiara" /></td><td>Chiara</td><td>Product</td><td className="num">3</td></tr>
          <tr><td className="st-check"><input type="checkbox" aria-label="Select Dev" /></td><td>Dev</td><td>Engineer</td><td className="num">9</td></tr>
        </tbody>
      </table>
    </div>
  );
}
```

`SortableTable.css`

```css
/* tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html */
.st-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.st { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.st caption { padding: 16px 18px 8px; text-align: start; font-size: 16px; font-weight: 700; }
.st-picked { margin-left: 8px; font-size: 13px; font-weight: 600; color: var(--ui-accent); }
.st th, .st td { padding: 10px 18px; text-align: start; border-bottom: 1px solid var(--ui-border); }
.st tbody tr:last-child td { border-bottom: 0; }
.st tbody tr:has(input:checked) { background: var(--ui-accent-soft); }
.st .num { text-align: right; font-variant-numeric: tabular-nums; }
.st .st-check { width: 44px; padding-right: 0; }
.st input { width: 18px; height: 18px; accent-color: var(--ui-accent); }
.st th button {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 6px; margin: -4px -6px;
  font: inherit; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.st th.num button { flex-direction: row-reverse; }
.st th button::after { content: ""; width: 0; height: 0; border: 4px solid transparent; opacity: 0.4; border-top-color: currentColor; margin-top: 4px; }
.st th[aria-sort] button { color: var(--ui-text); }
.st th[aria-sort] button::after { opacity: 1; }
.st th[aria-sort="ascending"] button::after { border-top-color: transparent; border-bottom-color: currentColor; margin: -4px 0 0; }
.st th button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.st th button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`SortableTable.vue`

```vue
<!-- tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const tbody = root.querySelector('tbody');
  const all = root.querySelector('thead input');
  const picked = root.querySelector('.st-picked');
  const heads = [...root.querySelectorAll('th button')];
  const col = { name: 1, role: 2, tasks: 3 };

  const sort = (btn) => {
    const th = btn.closest('th');
    const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
    root.querySelectorAll('th[aria-sort]').forEach((h) => h.removeAttribute('aria-sort'));
    th.setAttribute('aria-sort', dir);
    const i = col[btn.dataset.key];
    const rows = [...tbody.rows].sort((a, b) => {
      const x = a.cells[i].textContent, y = b.cells[i].textContent;
      const cmp = isNaN(x) ? x.localeCompare(y) : Number(x) - Number(y);
      return dir === 'ascending' ? cmp : -cmp;
    });
    tbody.append(...rows);
  };
  const sync = () => {
    const boxes = [...tbody.querySelectorAll('input')];
    const n = boxes.filter((b) => b.checked).length;
    all.checked = n === boxes.length;
    all.indeterminate = n > 0 && n < boxes.length;
    picked.textContent = n ? n + ' selected' : '';
  };
  const onAll = () => { tbody.querySelectorAll('input').forEach((b) => (b.checked = all.checked)); sync(); };
  const onHead = (e) => sort(e.currentTarget);
  heads.forEach((b) => b.addEventListener('click', onHead));
  all.addEventListener('change', onAll);
  tbody.addEventListener('change', sync);
  return () => {
    heads.forEach((b) => b.removeEventListener('click', onHead));
    all.removeEventListener('change', onAll);
    tbody.removeEventListener('change', sync);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="st-wrap">
    <table class="st">
      <caption>Team members <span class="st-picked" aria-live="polite"></span></caption>
      <thead>
        <tr>
          <th scope="col" class="st-check"><input type="checkbox" aria-label="Select all members"></th>
          <th scope="col" aria-sort="ascending"><button type="button" data-key="name">Name</button></th>
          <th scope="col"><button type="button" data-key="role">Role</button></th>
          <th scope="col" class="num"><button type="button" data-key="tasks">Open tasks</button></th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="st-check"><input type="checkbox" aria-label="Select Amara"></td><td>Amara</td><td>Designer</td><td class="num">7</td></tr>
        <tr><td class="st-check"><input type="checkbox" aria-label="Select Bo"></td><td>Bo</td><td>Engineer</td><td class="num">12</td></tr>
        <tr><td class="st-check"><input type="checkbox" aria-label="Select Chiara"></td><td>Chiara</td><td>Product</td><td class="num">3</td></tr>
        <tr><td class="st-check"><input type="checkbox" aria-label="Select Dev"></td><td>Dev</td><td>Engineer</td><td class="num">9</td></tr>
      </tbody>
    </table>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.st-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.st { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.st caption { padding: 16px 18px 8px; text-align: start; font-size: 16px; font-weight: 700; }
.st-picked { margin-left: 8px; font-size: 13px; font-weight: 600; color: var(--ui-accent); }
.st th, .st td { padding: 10px 18px; text-align: start; border-bottom: 1px solid var(--ui-border); }
.st tbody tr:last-child td { border-bottom: 0; }
.st tbody tr:has(input:checked) { background: var(--ui-accent-soft); }
.st .num { text-align: right; font-variant-numeric: tabular-nums; }
.st .st-check { width: 44px; padding-right: 0; }
.st input { width: 18px; height: 18px; accent-color: var(--ui-accent); }
.st th button {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 6px; margin: -4px -6px;
  font: inherit; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.st th.num button { flex-direction: row-reverse; }
.st th button::after { content: ""; width: 0; height: 0; border: 4px solid transparent; opacity: 0.4; border-top-color: currentColor; margin-top: 4px; }
.st th[aria-sort] button { color: var(--ui-text); }
.st th[aria-sort] button::after { opacity: 1; }
.st th[aria-sort="ascending"] button::after { border-top-color: transparent; border-bottom-color: currentColor; margin: -4px 0 0; }
.st th button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.st th button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`SortableTable.svelte`

```svelte
<!-- tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html -->
<script>
  import { onMount } from 'svelte';
  import './SortableTable.css';

  let node;

  function setup(root) {
    const tbody = root.querySelector('tbody');
    const all = root.querySelector('thead input');
    const picked = root.querySelector('.st-picked');
    const heads = [...root.querySelectorAll('th button')];
    const col = { name: 1, role: 2, tasks: 3 };

    const sort = (btn) => {
      const th = btn.closest('th');
      const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
      root.querySelectorAll('th[aria-sort]').forEach((h) => h.removeAttribute('aria-sort'));
      th.setAttribute('aria-sort', dir);
      const i = col[btn.dataset.key];
      const rows = [...tbody.rows].sort((a, b) => {
        const x = a.cells[i].textContent, y = b.cells[i].textContent;
        const cmp = isNaN(x) ? x.localeCompare(y) : Number(x) - Number(y);
        return dir === 'ascending' ? cmp : -cmp;
      });
      tbody.append(...rows);
    };
    const sync = () => {
      const boxes = [...tbody.querySelectorAll('input')];
      const n = boxes.filter((b) => b.checked).length;
      all.checked = n === boxes.length;
      all.indeterminate = n > 0 && n < boxes.length;
      picked.textContent = n ? n + ' selected' : '';
    };
    const onAll = () => { tbody.querySelectorAll('input').forEach((b) => (b.checked = all.checked)); sync(); };
    const onHead = (e) => sort(e.currentTarget);
    heads.forEach((b) => b.addEventListener('click', onHead));
    all.addEventListener('change', onAll);
    tbody.addEventListener('change', sync);
    return () => {
      heads.forEach((b) => b.removeEventListener('click', onHead));
      all.removeEventListener('change', onAll);
      tbody.removeEventListener('change', sync);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="st-wrap">
  <table class="st">
    <caption>Team members <span class="st-picked" aria-live="polite"></span></caption>
    <thead>
      <tr>
        <th scope="col" class="st-check"><input type="checkbox" aria-label="Select all members"></th>
        <th scope="col" aria-sort="ascending"><button type="button" data-key="name">Name</button></th>
        <th scope="col"><button type="button" data-key="role">Role</button></th>
        <th scope="col" class="num"><button type="button" data-key="tasks">Open tasks</button></th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Amara"></td><td>Amara</td><td>Designer</td><td class="num">7</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Bo"></td><td>Bo</td><td>Engineer</td><td class="num">12</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Chiara"></td><td>Chiara</td><td>Product</td><td class="num">3</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Dev"></td><td>Dev</td><td>Engineer</td><td class="num">9</td></tr>
    </tbody>
  </table>
</div>
```

`SortableTable.css`

```css
/* tearsheet sortable-table v0b9aa3e3 · https://qusaialjbali.github.io/tearsheet/zine/parts/sortable-table.html */
.st-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.st { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.st caption { padding: 16px 18px 8px; text-align: start; font-size: 16px; font-weight: 700; }
.st-picked { margin-left: 8px; font-size: 13px; font-weight: 600; color: var(--ui-accent); }
.st th, .st td { padding: 10px 18px; text-align: start; border-bottom: 1px solid var(--ui-border); }
.st tbody tr:last-child td { border-bottom: 0; }
.st tbody tr:has(input:checked) { background: var(--ui-accent-soft); }
.st .num { text-align: right; font-variant-numeric: tabular-nums; }
.st .st-check { width: 44px; padding-right: 0; }
.st input { width: 18px; height: 18px; accent-color: var(--ui-accent); }
.st th button {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 6px; margin: -4px -6px;
  font: inherit; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.st th.num button { flex-direction: row-reverse; }
.st th button::after { content: ""; width: 0; height: 0; border: 4px solid transparent; opacity: 0.4; border-top-color: currentColor; margin-top: 4px; }
.st th[aria-sort] button { color: var(--ui-text); }
.st th[aria-sort] button::after { opacity: 1; }
.st th[aria-sort="ascending"] button::after { border-top-color: transparent; border-bottom-color: currentColor; margin: -4px 0 0; }
.st th button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.st th button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```
