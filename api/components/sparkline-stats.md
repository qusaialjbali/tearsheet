# Sparkline stats (Tearsheet, Data)

Compact metric tiles, each with a tiny trend line and its change spelled out.

**Why it works:** A sparkline shows shape, not values, so the number and the change sit next to it as text. Mark whether the change is good or bad in words.

**Checked:** axe clean in light and dark; tightest text contrast 5.01:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet sparkline-stats v55133227 · https://qusaialjbali.github.io/tearsheet/zine/parts/sparkline-stats.html -->
<div class="spark-row">
  <article class="spark">
    <p class="spark-label">Revenue</p>
    <p class="spark-value">$24.8k</p>
    <svg class="spark-line up" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24L14 20L28 22L42 15L57 17L71 10L85 8L100 3"/></svg>
    <p class="spark-delta good">Up 8% this month</p>
  </article>
  <article class="spark">
    <p class="spark-label">Churn</p>
    <p class="spark-value">2.1%</p>
    <svg class="spark-line" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10L14 12L28 9L42 14L57 15L71 18L85 20L100 22"/></svg>
    <p class="spark-delta good">Down 0.4 points, good</p>
  </article>
  <article class="spark">
    <p class="spark-label">Response time</p>
    <p class="spark-value">340 ms</p>
    <svg class="spark-line bad" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22L14 21L28 22L42 18L57 19L71 12L85 10L100 6"/></svg>
    <p class="spark-delta bad">Up 60 ms, slower</p>
  </article>
</div>
```

`styles.css`

```css
/* tearsheet sparkline-stats v55133227 · https://qusaialjbali.github.io/tearsheet/zine/parts/sparkline-stats.html */
.spark-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.spark { padding: 16px 18px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.spark p { margin: 0; }
.spark-label { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.spark-value { margin: 2px 0 8px !important; font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }
.spark-line { display: block; width: 100%; height: 34px; }
.spark-line path { fill: none; stroke: var(--ui-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
.spark-line.bad path { stroke: var(--ui-danger); }
.spark-delta { margin-top: 8px !important; font-size: 13px; font-weight: 600; }
.spark-delta.good { color: var(--ui-success); }
.spark-delta.bad { color: var(--ui-danger); }
```

## React

`SparklineStats.jsx`

```jsx
/* tearsheet sparkline-stats v55133227 · https://qusaialjbali.github.io/tearsheet/zine/parts/sparkline-stats.html */
import './SparklineStats.css';

export function SparklineStats() {
  return (
    <div className="spark-row">
      <article className="spark">
        <p className="spark-label">Revenue</p>
        <p className="spark-value">$24.8k</p>
        <svg className="spark-line up" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24L14 20L28 22L42 15L57 17L71 10L85 8L100 3"/></svg>
        <p className="spark-delta good">Up 8% this month</p>
      </article>
      <article className="spark">
        <p className="spark-label">Churn</p>
        <p className="spark-value">2.1%</p>
        <svg className="spark-line" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10L14 12L28 9L42 14L57 15L71 18L85 20L100 22"/></svg>
        <p className="spark-delta good">Down 0.4 points, good</p>
      </article>
      <article className="spark">
        <p className="spark-label">Response time</p>
        <p className="spark-value">340 ms</p>
        <svg className="spark-line bad" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22L14 21L28 22L42 18L57 19L71 12L85 10L100 6"/></svg>
        <p className="spark-delta bad">Up 60 ms, slower</p>
      </article>
    </div>
  );
}
```

`SparklineStats.css`

```css
/* tearsheet sparkline-stats v55133227 · https://qusaialjbali.github.io/tearsheet/zine/parts/sparkline-stats.html */
.spark-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.spark { padding: 16px 18px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.spark p { margin: 0; }
.spark-label { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.spark-value { margin: 2px 0 8px !important; font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }
.spark-line { display: block; width: 100%; height: 34px; }
.spark-line path { fill: none; stroke: var(--ui-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
.spark-line.bad path { stroke: var(--ui-danger); }
.spark-delta { margin-top: 8px !important; font-size: 13px; font-weight: 600; }
.spark-delta.good { color: var(--ui-success); }
.spark-delta.bad { color: var(--ui-danger); }
```

## Vue

`SparklineStats.vue`

```vue
<!-- tearsheet sparkline-stats v55133227 · https://qusaialjbali.github.io/tearsheet/zine/parts/sparkline-stats.html -->
<template>
  <div class="spark-row">
    <article class="spark">
      <p class="spark-label">Revenue</p>
      <p class="spark-value">$24.8k</p>
      <svg class="spark-line up" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24L14 20L28 22L42 15L57 17L71 10L85 8L100 3"/></svg>
      <p class="spark-delta good">Up 8% this month</p>
    </article>
    <article class="spark">
      <p class="spark-label">Churn</p>
      <p class="spark-value">2.1%</p>
      <svg class="spark-line" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10L14 12L28 9L42 14L57 15L71 18L85 20L100 22"/></svg>
      <p class="spark-delta good">Down 0.4 points, good</p>
    </article>
    <article class="spark">
      <p class="spark-label">Response time</p>
      <p class="spark-value">340 ms</p>
      <svg class="spark-line bad" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22L14 21L28 22L42 18L57 19L71 12L85 10L100 6"/></svg>
      <p class="spark-delta bad">Up 60 ms, slower</p>
    </article>
  </div>
</template>

<style scoped>
.spark-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.spark { padding: 16px 18px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.spark p { margin: 0; }
.spark-label { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.spark-value { margin: 2px 0 8px !important; font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }
.spark-line { display: block; width: 100%; height: 34px; }
.spark-line path { fill: none; stroke: var(--ui-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
.spark-line.bad path { stroke: var(--ui-danger); }
.spark-delta { margin-top: 8px !important; font-size: 13px; font-weight: 600; }
.spark-delta.good { color: var(--ui-success); }
.spark-delta.bad { color: var(--ui-danger); }
</style>
```

## Svelte

`SparklineStats.svelte`

```svelte
<!-- tearsheet sparkline-stats v55133227 · https://qusaialjbali.github.io/tearsheet/zine/parts/sparkline-stats.html -->
<div class="spark-row">
  <article class="spark">
    <p class="spark-label">Revenue</p>
    <p class="spark-value">$24.8k</p>
    <svg class="spark-line up" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24L14 20L28 22L42 15L57 17L71 10L85 8L100 3"/></svg>
    <p class="spark-delta good">Up 8% this month</p>
  </article>
  <article class="spark">
    <p class="spark-label">Churn</p>
    <p class="spark-value">2.1%</p>
    <svg class="spark-line" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10L14 12L28 9L42 14L57 15L71 18L85 20L100 22"/></svg>
    <p class="spark-delta good">Down 0.4 points, good</p>
  </article>
  <article class="spark">
    <p class="spark-label">Response time</p>
    <p class="spark-value">340 ms</p>
    <svg class="spark-line bad" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22L14 21L28 22L42 18L57 19L71 12L85 10L100 6"/></svg>
    <p class="spark-delta bad">Up 60 ms, slower</p>
  </article>
</div>

<style>
.spark-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.spark { padding: 16px 18px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.spark p { margin: 0; }
.spark-label { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.spark-value { margin: 2px 0 8px !important; font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }
.spark-line { display: block; width: 100%; height: 34px; }
.spark-line path { fill: none; stroke: var(--ui-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
.spark-line.bad path { stroke: var(--ui-danger); }
.spark-delta { margin-top: 8px !important; font-size: 13px; font-weight: 600; }
.spark-delta.good { color: var(--ui-success); }
.spark-delta.bad { color: var(--ui-danger); }
</style>
```
