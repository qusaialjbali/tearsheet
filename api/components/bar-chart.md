# Bar chart (Tearsheet, Data)

Horizontal bars drawn with plain HTML and CSS, every value printed next to its bar.

**Why it works:** The numbers are real text, so the chart is readable without colour or sight, and nothing needs a chart library. Sort bars by value unless the categories have a natural order.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet bar-chart vf5a4d37e · https://qusaialjbali.github.io/tearsheet/zine/parts/bar-chart.html -->
<figure class="bars">
  <figcaption>Visits by source, last 30 days</figcaption>
  <ul class="bars-list">
    <li style="--v: 100%"><span class="bars-name">Search</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">12,480</span></li>
    <li style="--v: 64%"><span class="bars-name">Direct</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">7,990</span></li>
    <li style="--v: 41%"><span class="bars-name">Newsletter</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">5,120</span></li>
    <li style="--v: 22%"><span class="bars-name">Social</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">2,740</span></li>
    <li style="--v: 9%"><span class="bars-name">Other</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">1,130</span></li>
  </ul>
</figure>
```

`styles.css`

```css
/* tearsheet bar-chart vf5a4d37e · https://qusaialjbali.github.io/tearsheet/zine/parts/bar-chart.html */
.bars { width: 100%; max-width: 460px; margin: 0; }
.bars figcaption { margin-bottom: 14px; font-size: 15px; font-weight: 700; }
.bars-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.bars-list li { display: grid; grid-template-columns: 90px 1fr 64px; align-items: center; gap: 12px; font-size: 14px; }
.bars-name { color: var(--ui-muted); }
.bars-track { height: 14px; background: var(--ui-surface-2); border-radius: 4px; overflow: hidden; }
.bars-fill { display: block; height: 100%; width: var(--v); background: var(--ui-accent); border-radius: 4px; animation: bars-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; transform-origin: left; }
.bars-list li:nth-child(n + 2) .bars-fill { opacity: 0.8; }
.bars-val { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
@keyframes bars-grow { from { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) { .bars-fill { animation: none; } }
```

## React

`BarChart.jsx`

```jsx
/* tearsheet bar-chart vf5a4d37e · https://qusaialjbali.github.io/tearsheet/zine/parts/bar-chart.html */
import './BarChart.css';

export function BarChart() {
  return (
    <figure className="bars">
      <figcaption>Visits by source, last 30 days</figcaption>
      <ul className="bars-list">
        <li style={{ '--v': '100%' }}><span className="bars-name">Search</span><span className="bars-track"><span className="bars-fill"></span></span><span className="bars-val">12,480</span></li>
        <li style={{ '--v': '64%' }}><span className="bars-name">Direct</span><span className="bars-track"><span className="bars-fill"></span></span><span className="bars-val">7,990</span></li>
        <li style={{ '--v': '41%' }}><span className="bars-name">Newsletter</span><span className="bars-track"><span className="bars-fill"></span></span><span className="bars-val">5,120</span></li>
        <li style={{ '--v': '22%' }}><span className="bars-name">Social</span><span className="bars-track"><span className="bars-fill"></span></span><span className="bars-val">2,740</span></li>
        <li style={{ '--v': '9%' }}><span className="bars-name">Other</span><span className="bars-track"><span className="bars-fill"></span></span><span className="bars-val">1,130</span></li>
      </ul>
    </figure>
  );
}
```

`BarChart.css`

```css
/* tearsheet bar-chart vf5a4d37e · https://qusaialjbali.github.io/tearsheet/zine/parts/bar-chart.html */
.bars { width: 100%; max-width: 460px; margin: 0; }
.bars figcaption { margin-bottom: 14px; font-size: 15px; font-weight: 700; }
.bars-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.bars-list li { display: grid; grid-template-columns: 90px 1fr 64px; align-items: center; gap: 12px; font-size: 14px; }
.bars-name { color: var(--ui-muted); }
.bars-track { height: 14px; background: var(--ui-surface-2); border-radius: 4px; overflow: hidden; }
.bars-fill { display: block; height: 100%; width: var(--v); background: var(--ui-accent); border-radius: 4px; animation: bars-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; transform-origin: left; }
.bars-list li:nth-child(n + 2) .bars-fill { opacity: 0.8; }
.bars-val { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
@keyframes bars-grow { from { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) { .bars-fill { animation: none; } }
```

## Vue

`BarChart.vue`

```vue
<!-- tearsheet bar-chart vf5a4d37e · https://qusaialjbali.github.io/tearsheet/zine/parts/bar-chart.html -->
<template>
  <figure class="bars">
    <figcaption>Visits by source, last 30 days</figcaption>
    <ul class="bars-list">
      <li style="--v: 100%"><span class="bars-name">Search</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">12,480</span></li>
      <li style="--v: 64%"><span class="bars-name">Direct</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">7,990</span></li>
      <li style="--v: 41%"><span class="bars-name">Newsletter</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">5,120</span></li>
      <li style="--v: 22%"><span class="bars-name">Social</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">2,740</span></li>
      <li style="--v: 9%"><span class="bars-name">Other</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">1,130</span></li>
    </ul>
  </figure>
</template>

<style scoped>
.bars { width: 100%; max-width: 460px; margin: 0; }
.bars figcaption { margin-bottom: 14px; font-size: 15px; font-weight: 700; }
.bars-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.bars-list li { display: grid; grid-template-columns: 90px 1fr 64px; align-items: center; gap: 12px; font-size: 14px; }
.bars-name { color: var(--ui-muted); }
.bars-track { height: 14px; background: var(--ui-surface-2); border-radius: 4px; overflow: hidden; }
.bars-fill { display: block; height: 100%; width: var(--v); background: var(--ui-accent); border-radius: 4px; animation: bars-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; transform-origin: left; }
.bars-list li:nth-child(n + 2) .bars-fill { opacity: 0.8; }
.bars-val { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
@keyframes bars-grow { from { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) { .bars-fill { animation: none; } }
</style>
```

## Svelte

`BarChart.svelte`

```svelte
<!-- tearsheet bar-chart vf5a4d37e · https://qusaialjbali.github.io/tearsheet/zine/parts/bar-chart.html -->
<figure class="bars">
  <figcaption>Visits by source, last 30 days</figcaption>
  <ul class="bars-list">
    <li style="--v: 100%"><span class="bars-name">Search</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">12,480</span></li>
    <li style="--v: 64%"><span class="bars-name">Direct</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">7,990</span></li>
    <li style="--v: 41%"><span class="bars-name">Newsletter</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">5,120</span></li>
    <li style="--v: 22%"><span class="bars-name">Social</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">2,740</span></li>
    <li style="--v: 9%"><span class="bars-name">Other</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">1,130</span></li>
  </ul>
</figure>

<style>
.bars { width: 100%; max-width: 460px; margin: 0; }
.bars figcaption { margin-bottom: 14px; font-size: 15px; font-weight: 700; }
.bars-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.bars-list li { display: grid; grid-template-columns: 90px 1fr 64px; align-items: center; gap: 12px; font-size: 14px; }
.bars-name { color: var(--ui-muted); }
.bars-track { height: 14px; background: var(--ui-surface-2); border-radius: 4px; overflow: hidden; }
.bars-fill { display: block; height: 100%; width: var(--v); background: var(--ui-accent); border-radius: 4px; animation: bars-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; transform-origin: left; }
.bars-list li:nth-child(n + 2) .bars-fill { opacity: 0.8; }
.bars-val { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
@keyframes bars-grow { from { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) { .bars-fill { animation: none; } }
</style>
```
