# Details list (Tearsheet, Data)

Label-and-value pairs for an order or a profile, with one value you can edit in place.

**Why it works:** Use a <dl> for key-value data so the pairs stay connected for screen readers. Right-align nothing here: these are words, not numbers.

**Checked:** axe clean in light and dark; tightest text contrast 4.79:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet description-list v7760a1e8 · https://qusaialjbali.github.io/tearsheet/zine/parts/description-list.html -->
<dl class="dl">
  <div><dt>Order</dt><dd>#20418</dd></div>
  <div><dt>Placed</dt><dd><time datetime="2026-11-21">21 November 2026</time></dd></div>
  <div><dt>Status</dt><dd><span class="dl-badge">Shipped</span></dd></div>
  <div><dt>Delivery address</dt><dd>12 Harbour Street<br>Leith, Edinburgh EH6 6QZ</dd></div>
  <div><dt>Payment</dt><dd>Card ending 4421 <a href="#" class="dl-edit">Change</a></dd></div>
</dl>
```

`styles.css`

```css
/* tearsheet description-list v7760a1e8 · https://qusaialjbali.github.io/tearsheet/zine/parts/description-list.html */
.dl { width: 100%; max-width: 480px; margin: 0; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.dl div { display: grid; grid-template-columns: 150px 1fr; gap: 12px; padding: 12px 18px; }
.dl div + div { border-top: 1px solid var(--ui-border); }
.dl dt { font-size: 14px; color: var(--ui-muted); }
.dl dd { margin: 0; font-size: 14px; font-weight: 500; }
.dl-badge { padding: 2px 10px; font-size: 12px; font-weight: 600; color: var(--ui-success); background: var(--ui-success-soft); border-radius: 999px; }
.dl-edit { margin-left: 8px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
@media (max-width: 420px) { .dl div { grid-template-columns: 1fr; gap: 2px; } }
```

## React

`DescriptionList.jsx`

```jsx
/* tearsheet description-list v7760a1e8 · https://qusaialjbali.github.io/tearsheet/zine/parts/description-list.html */
import './DescriptionList.css';

export function DescriptionList() {
  return (
    <dl className="dl">
      <div><dt>Order</dt><dd>#20418</dd></div>
      <div><dt>Placed</dt><dd><time dateTime="2026-11-21">21 November 2026</time></dd></div>
      <div><dt>Status</dt><dd><span className="dl-badge">Shipped</span></dd></div>
      <div><dt>Delivery address</dt><dd>12 Harbour Street<br />Leith, Edinburgh EH6 6QZ</dd></div>
      <div><dt>Payment</dt><dd>Card ending 4421 <a href="#" className="dl-edit">Change</a></dd></div>
    </dl>
  );
}
```

`DescriptionList.css`

```css
/* tearsheet description-list v7760a1e8 · https://qusaialjbali.github.io/tearsheet/zine/parts/description-list.html */
.dl { width: 100%; max-width: 480px; margin: 0; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.dl div { display: grid; grid-template-columns: 150px 1fr; gap: 12px; padding: 12px 18px; }
.dl div + div { border-top: 1px solid var(--ui-border); }
.dl dt { font-size: 14px; color: var(--ui-muted); }
.dl dd { margin: 0; font-size: 14px; font-weight: 500; }
.dl-badge { padding: 2px 10px; font-size: 12px; font-weight: 600; color: var(--ui-success); background: var(--ui-success-soft); border-radius: 999px; }
.dl-edit { margin-left: 8px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
@media (max-width: 420px) { .dl div { grid-template-columns: 1fr; gap: 2px; } }
```

## Vue

`DescriptionList.vue`

```vue
<!-- tearsheet description-list v7760a1e8 · https://qusaialjbali.github.io/tearsheet/zine/parts/description-list.html -->
<template>
  <dl class="dl">
    <div><dt>Order</dt><dd>#20418</dd></div>
    <div><dt>Placed</dt><dd><time datetime="2026-11-21">21 November 2026</time></dd></div>
    <div><dt>Status</dt><dd><span class="dl-badge">Shipped</span></dd></div>
    <div><dt>Delivery address</dt><dd>12 Harbour Street<br>Leith, Edinburgh EH6 6QZ</dd></div>
    <div><dt>Payment</dt><dd>Card ending 4421 <a href="#" class="dl-edit">Change</a></dd></div>
  </dl>
</template>

<style scoped>
.dl { width: 100%; max-width: 480px; margin: 0; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.dl div { display: grid; grid-template-columns: 150px 1fr; gap: 12px; padding: 12px 18px; }
.dl div + div { border-top: 1px solid var(--ui-border); }
.dl dt { font-size: 14px; color: var(--ui-muted); }
.dl dd { margin: 0; font-size: 14px; font-weight: 500; }
.dl-badge { padding: 2px 10px; font-size: 12px; font-weight: 600; color: var(--ui-success); background: var(--ui-success-soft); border-radius: 999px; }
.dl-edit { margin-left: 8px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
@media (max-width: 420px) { .dl div { grid-template-columns: 1fr; gap: 2px; } }
</style>
```

## Svelte

`DescriptionList.svelte`

```svelte
<!-- tearsheet description-list v7760a1e8 · https://qusaialjbali.github.io/tearsheet/zine/parts/description-list.html -->
<dl class="dl">
  <div><dt>Order</dt><dd>#20418</dd></div>
  <div><dt>Placed</dt><dd><time datetime="2026-11-21">21 November 2026</time></dd></div>
  <div><dt>Status</dt><dd><span class="dl-badge">Shipped</span></dd></div>
  <div><dt>Delivery address</dt><dd>12 Harbour Street<br>Leith, Edinburgh EH6 6QZ</dd></div>
  <div><dt>Payment</dt><dd>Card ending 4421 <a href="#" class="dl-edit">Change</a></dd></div>
</dl>

<style>
.dl { width: 100%; max-width: 480px; margin: 0; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.dl div { display: grid; grid-template-columns: 150px 1fr; gap: 12px; padding: 12px 18px; }
.dl div + div { border-top: 1px solid var(--ui-border); }
.dl dt { font-size: 14px; color: var(--ui-muted); }
.dl dd { margin: 0; font-size: 14px; font-weight: 500; }
.dl-badge { padding: 2px 10px; font-size: 12px; font-weight: 600; color: var(--ui-success); background: var(--ui-success-soft); border-radius: 999px; }
.dl-edit { margin-left: 8px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
@media (max-width: 420px) { .dl div { grid-template-columns: 1fr; gap: 2px; } }
</style>
```
