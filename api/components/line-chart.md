# Line chart (Tearsheet, Data)

A lightweight SVG line chart with gridlines, axis labels and a highlighted latest point.

**Why it works:** The SVG has a title and a description that state the trend in words, and the data is offered as a table for anyone who needs exact values.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet line-chart vf5563d6b · https://qusaialjbali.github.io/tearsheet/zine/parts/line-chart.html -->
<figure class="line">
  <figcaption>Weekly sign-ups</figcaption>
  <svg class="line-svg" viewBox="0 0 400 200" role="img" aria-labelledby="line-t line-d">
    <title id="line-t">Weekly sign-ups, 8 weeks</title>
    <desc id="line-d">Sign-ups rose from 120 in week 1 to 310 in week 8, with a dip in week 5.</desc>
    <g class="line-grid"><path d="M40 20H390M40 70H390M40 120H390M40 170H390"/></g>
    <g class="line-y"><text x="32" y="24">300</text><text x="32" y="74">200</text><text x="32" y="124">100</text><text x="32" y="174">0</text></g>
    <path class="line-area" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34V170H40Z"/>
    <path class="line-path" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34"/>
    <circle class="line-dot" cx="390" cy="34" r="5"/>
    <g class="line-x"><text x="40" y="192">W1</text><text x="190" y="192">W4</text><text x="390" y="192">W8</text></g>
  </svg>
  <details class="line-data">
    <summary>Show data</summary>
    <div class="line-table" tabindex="0" role="region" aria-label="Weekly sign-ups as a table"><table><tbody><tr><th scope="row">Week</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th scope="row">Sign-ups</th><td>120</td><td>144</td><td>168</td><td>196</td><td>156</td><td>220</td><td>252</td><td>310</td></tr></tbody></table></div>
  </details>
</figure>
```

`styles.css`

```css
/* tearsheet line-chart vf5563d6b · https://qusaialjbali.github.io/tearsheet/zine/parts/line-chart.html */
.line { width: 100%; max-width: 480px; margin: 0; }
.line figcaption { margin-bottom: 8px; font-size: 15px; font-weight: 700; }
.line-svg { display: block; width: 100%; height: auto; overflow: visible; }
.line-grid path { stroke: var(--ui-border); stroke-width: 1; }
.line-y text, .line-x text { font-size: 12px; fill: var(--ui-muted); font-variant-numeric: tabular-nums; }
.line-y text { text-anchor: end; }
.line-x text { text-anchor: middle; }
.line-area { fill: var(--ui-accent); opacity: 0.12; }
.line-path { fill: none; stroke: var(--ui-accent); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 600; animation: line-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
.line-dot { fill: var(--ui-surface); stroke: var(--ui-accent); stroke-width: 3; }
@keyframes line-draw { from { stroke-dashoffset: 600; } }
.line-data { margin-top: 8px; font-size: 13px; }
.line-data summary { cursor: pointer; color: var(--ui-accent); font-weight: 600; }
.line-table { max-width: 100%; margin-top: 8px; overflow-x: auto; }
.line-table:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.line-data table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
.line-data th, .line-data td { padding: 4px 8px; border: 1px solid var(--ui-border); }
@media (prefers-reduced-motion: reduce) { .line-path { animation: none; } }
```

## React

`LineChart.jsx`

```jsx
/* tearsheet line-chart vf5563d6b · https://qusaialjbali.github.io/tearsheet/zine/parts/line-chart.html */
import './LineChart.css';

export function LineChart() {
  return (
    <figure className="line">
      <figcaption>Weekly sign-ups</figcaption>
      <svg className="line-svg" viewBox="0 0 400 200" role="img" aria-labelledby="line-t line-d">
        <title id="line-t">Weekly sign-ups, 8 weeks</title>
        <desc id="line-d">Sign-ups rose from 120 in week 1 to 310 in week 8, with a dip in week 5.</desc>
        <g className="line-grid"><path d="M40 20H390M40 70H390M40 120H390M40 170H390"/></g>
        <g className="line-y"><text x="32" y="24">300</text><text x="32" y="74">200</text><text x="32" y="124">100</text><text x="32" y="174">0</text></g>
        <path className="line-area" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34V170H40Z"/>
        <path className="line-path" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34"/>
        <circle className="line-dot" cx="390" cy="34" r="5"/>
        <g className="line-x"><text x="40" y="192">W1</text><text x="190" y="192">W4</text><text x="390" y="192">W8</text></g>
      </svg>
      <details className="line-data">
        <summary>Show data</summary>
        <div className="line-table" tabIndex={0} role="region" aria-label="Weekly sign-ups as a table"><table><tbody><tr><th scope="row">Week</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th scope="row">Sign-ups</th><td>120</td><td>144</td><td>168</td><td>196</td><td>156</td><td>220</td><td>252</td><td>310</td></tr></tbody></table></div>
      </details>
    </figure>
  );
}
```

`LineChart.css`

```css
/* tearsheet line-chart vf5563d6b · https://qusaialjbali.github.io/tearsheet/zine/parts/line-chart.html */
.line { width: 100%; max-width: 480px; margin: 0; }
.line figcaption { margin-bottom: 8px; font-size: 15px; font-weight: 700; }
.line-svg { display: block; width: 100%; height: auto; overflow: visible; }
.line-grid path { stroke: var(--ui-border); stroke-width: 1; }
.line-y text, .line-x text { font-size: 12px; fill: var(--ui-muted); font-variant-numeric: tabular-nums; }
.line-y text { text-anchor: end; }
.line-x text { text-anchor: middle; }
.line-area { fill: var(--ui-accent); opacity: 0.12; }
.line-path { fill: none; stroke: var(--ui-accent); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 600; animation: line-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
.line-dot { fill: var(--ui-surface); stroke: var(--ui-accent); stroke-width: 3; }
@keyframes line-draw { from { stroke-dashoffset: 600; } }
.line-data { margin-top: 8px; font-size: 13px; }
.line-data summary { cursor: pointer; color: var(--ui-accent); font-weight: 600; }
.line-table { max-width: 100%; margin-top: 8px; overflow-x: auto; }
.line-table:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.line-data table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
.line-data th, .line-data td { padding: 4px 8px; border: 1px solid var(--ui-border); }
@media (prefers-reduced-motion: reduce) { .line-path { animation: none; } }
```

## Vue

`LineChart.vue`

```vue
<!-- tearsheet line-chart vf5563d6b · https://qusaialjbali.github.io/tearsheet/zine/parts/line-chart.html -->
<template>
  <figure class="line">
    <figcaption>Weekly sign-ups</figcaption>
    <svg class="line-svg" viewBox="0 0 400 200" role="img" aria-labelledby="line-t line-d">
      <title id="line-t">Weekly sign-ups, 8 weeks</title>
      <desc id="line-d">Sign-ups rose from 120 in week 1 to 310 in week 8, with a dip in week 5.</desc>
      <g class="line-grid"><path d="M40 20H390M40 70H390M40 120H390M40 170H390"/></g>
      <g class="line-y"><text x="32" y="24">300</text><text x="32" y="74">200</text><text x="32" y="124">100</text><text x="32" y="174">0</text></g>
      <path class="line-area" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34V170H40Z"/>
      <path class="line-path" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34"/>
      <circle class="line-dot" cx="390" cy="34" r="5"/>
      <g class="line-x"><text x="40" y="192">W1</text><text x="190" y="192">W4</text><text x="390" y="192">W8</text></g>
    </svg>
    <details class="line-data">
      <summary>Show data</summary>
      <div class="line-table" tabindex="0" role="region" aria-label="Weekly sign-ups as a table"><table><tbody><tr><th scope="row">Week</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th scope="row">Sign-ups</th><td>120</td><td>144</td><td>168</td><td>196</td><td>156</td><td>220</td><td>252</td><td>310</td></tr></tbody></table></div>
    </details>
  </figure>
</template>

<style scoped>
.line { width: 100%; max-width: 480px; margin: 0; }
.line figcaption { margin-bottom: 8px; font-size: 15px; font-weight: 700; }
.line-svg { display: block; width: 100%; height: auto; overflow: visible; }
.line-grid path { stroke: var(--ui-border); stroke-width: 1; }
.line-y text, .line-x text { font-size: 12px; fill: var(--ui-muted); font-variant-numeric: tabular-nums; }
.line-y text { text-anchor: end; }
.line-x text { text-anchor: middle; }
.line-area { fill: var(--ui-accent); opacity: 0.12; }
.line-path { fill: none; stroke: var(--ui-accent); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 600; animation: line-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
.line-dot { fill: var(--ui-surface); stroke: var(--ui-accent); stroke-width: 3; }
@keyframes line-draw { from { stroke-dashoffset: 600; } }
.line-data { margin-top: 8px; font-size: 13px; }
.line-data summary { cursor: pointer; color: var(--ui-accent); font-weight: 600; }
.line-table { max-width: 100%; margin-top: 8px; overflow-x: auto; }
.line-table:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.line-data table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
.line-data th, .line-data td { padding: 4px 8px; border: 1px solid var(--ui-border); }
@media (prefers-reduced-motion: reduce) { .line-path { animation: none; } }
</style>
```

## Svelte

`LineChart.svelte`

```svelte
<!-- tearsheet line-chart vf5563d6b · https://qusaialjbali.github.io/tearsheet/zine/parts/line-chart.html -->
<figure class="line">
  <figcaption>Weekly sign-ups</figcaption>
  <svg class="line-svg" viewBox="0 0 400 200" role="img" aria-labelledby="line-t line-d">
    <title id="line-t">Weekly sign-ups, 8 weeks</title>
    <desc id="line-d">Sign-ups rose from 120 in week 1 to 310 in week 8, with a dip in week 5.</desc>
    <g class="line-grid"><path d="M40 20H390M40 70H390M40 120H390M40 170H390"/></g>
    <g class="line-y"><text x="32" y="24">300</text><text x="32" y="74">200</text><text x="32" y="124">100</text><text x="32" y="174">0</text></g>
    <path class="line-area" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34V170H40Z"/>
    <path class="line-path" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34"/>
    <circle class="line-dot" cx="390" cy="34" r="5"/>
    <g class="line-x"><text x="40" y="192">W1</text><text x="190" y="192">W4</text><text x="390" y="192">W8</text></g>
  </svg>
  <details class="line-data">
    <summary>Show data</summary>
    <div class="line-table" tabindex="0" role="region" aria-label="Weekly sign-ups as a table"><table><tbody><tr><th scope="row">Week</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th scope="row">Sign-ups</th><td>120</td><td>144</td><td>168</td><td>196</td><td>156</td><td>220</td><td>252</td><td>310</td></tr></tbody></table></div>
  </details>
</figure>

<style>
.line { width: 100%; max-width: 480px; margin: 0; }
.line figcaption { margin-bottom: 8px; font-size: 15px; font-weight: 700; }
.line-svg { display: block; width: 100%; height: auto; overflow: visible; }
.line-grid path { stroke: var(--ui-border); stroke-width: 1; }
.line-y text, .line-x text { font-size: 12px; fill: var(--ui-muted); font-variant-numeric: tabular-nums; }
.line-y text { text-anchor: end; }
.line-x text { text-anchor: middle; }
.line-area { fill: var(--ui-accent); opacity: 0.12; }
.line-path { fill: none; stroke: var(--ui-accent); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 600; animation: line-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
.line-dot { fill: var(--ui-surface); stroke: var(--ui-accent); stroke-width: 3; }
@keyframes line-draw { from { stroke-dashoffset: 600; } }
.line-data { margin-top: 8px; font-size: 13px; }
.line-data summary { cursor: pointer; color: var(--ui-accent); font-weight: 600; }
.line-table { max-width: 100%; margin-top: 8px; overflow-x: auto; }
.line-table:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.line-data table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
.line-data th, .line-data td { padding: 4px 8px; border: 1px solid var(--ui-border); }
@media (prefers-reduced-motion: reduce) { .line-path { animation: none; } }
</style>
```
