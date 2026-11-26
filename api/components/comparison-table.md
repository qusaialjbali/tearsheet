# Plan comparison (Tearsheet, Sections)

Plans side by side with yes/no marks that read as words to screen readers, and the recommended plan marked.

**Why it works:** Each tick and cross has hidden text (“Included”, “Not included”), so the table makes sense without seeing the icons. The recommended column is labelled in words, not just colour.

**Checked:** axe clean in light and dark; tightest text contrast 5.35:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet comparison-table va6a207c7 · https://qusaialjbali.github.io/tearsheet/zine/parts/comparison-table.html -->
<div class="cmp-wrap">
  <table class="cmp">
    <caption>Compare plans</caption>
    <thead>
      <tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col">Free</th><th scope="col" class="cmp-rec">Group <span>Recommended</span></th><th scope="col">Team</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">People per group</th><td>5</td><td class="cmp-rec">25</td><td>Unlimited</td></tr>
      <tr><th scope="row">Receipt photos</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Multi-currency</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Export to CSV</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Admin controls</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="n"><span class="sr-only">Not included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Price</th><td>$0</td><td class="cmp-rec">$3 / month</td><td>$12 / month</td></tr>
    </tbody>
  </table>
</div>
```

`styles.css`

```css
/* tearsheet comparison-table va6a207c7 · https://qusaialjbali.github.io/tearsheet/zine/parts/comparison-table.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.cmp-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cmp { width: 100%; min-width: 480px; border-collapse: collapse; font-size: 15px; }
.cmp caption { padding: 18px 20px 6px; text-align: start; font-size: 18px; font-weight: 700; }
.cmp th, .cmp td { padding: 13px 20px; text-align: center; border-bottom: 1px solid var(--ui-border); }
.cmp tbody th { text-align: start; font-weight: 500; color: var(--ui-muted); }
.cmp thead th { font-size: 16px; }
.cmp tbody tr:last-child > * { border-bottom: 0; font-weight: 700; color: var(--ui-text); }
.cmp-rec { background: var(--ui-accent-soft); }
thead .cmp-rec span { display: block; margin-top: 2px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ui-accent); }
.y, .n { display: inline-block; width: 20px; height: 20px; vertical-align: middle; background: var(--ui-success); }
.n { background: var(--ui-border-strong); }
.y { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.n { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; }
```

## React

`ComparisonTable.jsx`

```jsx
/* tearsheet comparison-table va6a207c7 · https://qusaialjbali.github.io/tearsheet/zine/parts/comparison-table.html */
import './ComparisonTable.css';

export function ComparisonTable() {
  return (
    <div className="cmp-wrap">
      <table className="cmp">
        <caption>Compare plans</caption>
        <thead>
          <tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">Free</th><th scope="col" className="cmp-rec">Group <span>Recommended</span></th><th scope="col">Team</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">People per group</th><td>5</td><td className="cmp-rec">25</td><td>Unlimited</td></tr>
          <tr><th scope="row">Receipt photos</th><td><span className="y"><span className="sr-only">Included</span></span></td><td className="cmp-rec"><span className="y"><span className="sr-only">Included</span></span></td><td><span className="y"><span className="sr-only">Included</span></span></td></tr>
          <tr><th scope="row">Multi-currency</th><td><span className="n"><span className="sr-only">Not included</span></span></td><td className="cmp-rec"><span className="y"><span className="sr-only">Included</span></span></td><td><span className="y"><span className="sr-only">Included</span></span></td></tr>
          <tr><th scope="row">Export to CSV</th><td><span className="y"><span className="sr-only">Included</span></span></td><td className="cmp-rec"><span className="y"><span className="sr-only">Included</span></span></td><td><span className="y"><span className="sr-only">Included</span></span></td></tr>
          <tr><th scope="row">Admin controls</th><td><span className="n"><span className="sr-only">Not included</span></span></td><td className="cmp-rec"><span className="n"><span className="sr-only">Not included</span></span></td><td><span className="y"><span className="sr-only">Included</span></span></td></tr>
          <tr><th scope="row">Price</th><td>$0</td><td className="cmp-rec">$3 / month</td><td>$12 / month</td></tr>
        </tbody>
      </table>
    </div>
  );
}
```

`ComparisonTable.css`

```css
/* tearsheet comparison-table va6a207c7 · https://qusaialjbali.github.io/tearsheet/zine/parts/comparison-table.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.cmp-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cmp { width: 100%; min-width: 480px; border-collapse: collapse; font-size: 15px; }
.cmp caption { padding: 18px 20px 6px; text-align: start; font-size: 18px; font-weight: 700; }
.cmp th, .cmp td { padding: 13px 20px; text-align: center; border-bottom: 1px solid var(--ui-border); }
.cmp tbody th { text-align: start; font-weight: 500; color: var(--ui-muted); }
.cmp thead th { font-size: 16px; }
.cmp tbody tr:last-child > * { border-bottom: 0; font-weight: 700; color: var(--ui-text); }
.cmp-rec { background: var(--ui-accent-soft); }
thead .cmp-rec span { display: block; margin-top: 2px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ui-accent); }
.y, .n { display: inline-block; width: 20px; height: 20px; vertical-align: middle; background: var(--ui-success); }
.n { background: var(--ui-border-strong); }
.y { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.n { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; }
```

## Vue

`ComparisonTable.vue`

```vue
<!-- tearsheet comparison-table va6a207c7 · https://qusaialjbali.github.io/tearsheet/zine/parts/comparison-table.html -->
<template>
  <div class="cmp-wrap">
    <table class="cmp">
      <caption>Compare plans</caption>
      <thead>
        <tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col">Free</th><th scope="col" class="cmp-rec">Group <span>Recommended</span></th><th scope="col">Team</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">People per group</th><td>5</td><td class="cmp-rec">25</td><td>Unlimited</td></tr>
        <tr><th scope="row">Receipt photos</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
        <tr><th scope="row">Multi-currency</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
        <tr><th scope="row">Export to CSV</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
        <tr><th scope="row">Admin controls</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="n"><span class="sr-only">Not included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
        <tr><th scope="row">Price</th><td>$0</td><td class="cmp-rec">$3 / month</td><td>$12 / month</td></tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.cmp-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cmp { width: 100%; min-width: 480px; border-collapse: collapse; font-size: 15px; }
.cmp caption { padding: 18px 20px 6px; text-align: start; font-size: 18px; font-weight: 700; }
.cmp th, .cmp td { padding: 13px 20px; text-align: center; border-bottom: 1px solid var(--ui-border); }
.cmp tbody th { text-align: start; font-weight: 500; color: var(--ui-muted); }
.cmp thead th { font-size: 16px; }
.cmp tbody tr:last-child > * { border-bottom: 0; font-weight: 700; color: var(--ui-text); }
.cmp-rec { background: var(--ui-accent-soft); }
thead .cmp-rec span { display: block; margin-top: 2px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ui-accent); }
.y, .n { display: inline-block; width: 20px; height: 20px; vertical-align: middle; background: var(--ui-success); }
.n { background: var(--ui-border-strong); }
.y { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.n { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; }
</style>
```

## Svelte

`ComparisonTable.svelte`

```svelte
<!-- tearsheet comparison-table va6a207c7 · https://qusaialjbali.github.io/tearsheet/zine/parts/comparison-table.html -->
<div class="cmp-wrap">
  <table class="cmp">
    <caption>Compare plans</caption>
    <thead>
      <tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col">Free</th><th scope="col" class="cmp-rec">Group <span>Recommended</span></th><th scope="col">Team</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">People per group</th><td>5</td><td class="cmp-rec">25</td><td>Unlimited</td></tr>
      <tr><th scope="row">Receipt photos</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Multi-currency</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Export to CSV</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Admin controls</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="n"><span class="sr-only">Not included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Price</th><td>$0</td><td class="cmp-rec">$3 / month</td><td>$12 / month</td></tr>
    </tbody>
  </table>
</div>

<style>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.cmp-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cmp { width: 100%; min-width: 480px; border-collapse: collapse; font-size: 15px; }
.cmp caption { padding: 18px 20px 6px; text-align: start; font-size: 18px; font-weight: 700; }
.cmp th, .cmp td { padding: 13px 20px; text-align: center; border-bottom: 1px solid var(--ui-border); }
.cmp tbody th { text-align: start; font-weight: 500; color: var(--ui-muted); }
.cmp thead th { font-size: 16px; }
.cmp tbody tr:last-child > * { border-bottom: 0; font-weight: 700; color: var(--ui-text); }
.cmp-rec { background: var(--ui-accent-soft); }
thead .cmp-rec span { display: block; margin-top: 2px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ui-accent); }
.y, .n { display: inline-block; width: 20px; height: 20px; vertical-align: middle; background: var(--ui-success); }
.n { background: var(--ui-border-strong); }
.y { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.n { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; }
</style>
```
