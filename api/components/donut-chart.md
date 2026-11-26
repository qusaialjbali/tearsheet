# Donut chart (Tearsheet, Data)

A CSS conic-gradient donut with a total in the middle and a legend that carries the real numbers.

**Why it works:** Keep donuts to five slices or fewer. The legend repeats every value as text and uses patterns of position and order, not colour alone.

**Checked:** axe clean in light and dark; tightest text contrast 17.41:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet donut-chart v7cb7f462 · https://qusaialjbali.github.io/tearsheet/zine/parts/donut-chart.html -->
<figure class="donut">
  <div class="donut-ring" role="img" aria-label="Storage used: 48 of 100 gigabytes. Photos 24, Video 14, Documents 6, Other 4.">
    <span class="donut-total"><b>48</b> of 100 GB</span>
  </div>
  <figcaption>
    <ul class="donut-legend">
      <li><i style="--c: var(--ui-accent)"></i>Photos <b>24 GB</b></li>
      <li><i style="--c: #0d9488"></i>Video <b>14 GB</b></li>
      <li><i style="--c: #c2410c"></i>Documents <b>6 GB</b></li>
      <li><i style="--c: #a855f7"></i>Other <b>4 GB</b></li>
    </ul>
  </figcaption>
</figure>
```

`styles.css`

```css
/* tearsheet donut-chart v7cb7f462 · https://qusaialjbali.github.io/tearsheet/zine/parts/donut-chart.html */
.donut { display: flex; flex-wrap: wrap; align-items: center; gap: 28px; margin: 0; }
.donut-ring {
  position: relative; display: grid; place-items: center; width: 170px; aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(var(--ui-accent) 0 24%, #0d9488 0 38%, #c2410c 0 44%, #a855f7 0 48%, var(--ui-surface-2) 0);
}
.donut-ring::before { content: ""; position: absolute; inset: 22px; border-radius: 50%; background: var(--ui-bg); }
.donut-total { position: relative; display: grid; text-align: center; font-size: 13px; color: var(--ui-muted); }
.donut-total b { font-size: 34px; line-height: 1; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.donut-legend { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.donut-legend li { display: grid; grid-template-columns: 14px 1fr auto; align-items: center; gap: 10px; min-width: 180px; }
.donut-legend i { width: 14px; height: 14px; border-radius: 4px; background: var(--c); }
.donut-legend b { font-variant-numeric: tabular-nums; }
```

## React

`DonutChart.jsx`

```jsx
/* tearsheet donut-chart v7cb7f462 · https://qusaialjbali.github.io/tearsheet/zine/parts/donut-chart.html */
import './DonutChart.css';

export function DonutChart() {
  return (
    <figure className="donut">
      <div className="donut-ring" role="img" aria-label="Storage used: 48 of 100 gigabytes. Photos 24, Video 14, Documents 6, Other 4.">
        <span className="donut-total"><b>48</b> of 100 GB</span>
      </div>
      <figcaption>
        <ul className="donut-legend">
          <li><i style={{ '--c': 'var(--ui-accent)' }}></i>Photos <b>24 GB</b></li>
          <li><i style={{ '--c': '#0d9488' }}></i>Video <b>14 GB</b></li>
          <li><i style={{ '--c': '#c2410c' }}></i>Documents <b>6 GB</b></li>
          <li><i style={{ '--c': '#a855f7' }}></i>Other <b>4 GB</b></li>
        </ul>
      </figcaption>
    </figure>
  );
}
```

`DonutChart.css`

```css
/* tearsheet donut-chart v7cb7f462 · https://qusaialjbali.github.io/tearsheet/zine/parts/donut-chart.html */
.donut { display: flex; flex-wrap: wrap; align-items: center; gap: 28px; margin: 0; }
.donut-ring {
  position: relative; display: grid; place-items: center; width: 170px; aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(var(--ui-accent) 0 24%, #0d9488 0 38%, #c2410c 0 44%, #a855f7 0 48%, var(--ui-surface-2) 0);
}
.donut-ring::before { content: ""; position: absolute; inset: 22px; border-radius: 50%; background: var(--ui-bg); }
.donut-total { position: relative; display: grid; text-align: center; font-size: 13px; color: var(--ui-muted); }
.donut-total b { font-size: 34px; line-height: 1; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.donut-legend { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.donut-legend li { display: grid; grid-template-columns: 14px 1fr auto; align-items: center; gap: 10px; min-width: 180px; }
.donut-legend i { width: 14px; height: 14px; border-radius: 4px; background: var(--c); }
.donut-legend b { font-variant-numeric: tabular-nums; }
```

## Vue

`DonutChart.vue`

```vue
<!-- tearsheet donut-chart v7cb7f462 · https://qusaialjbali.github.io/tearsheet/zine/parts/donut-chart.html -->
<template>
  <figure class="donut">
    <div class="donut-ring" role="img" aria-label="Storage used: 48 of 100 gigabytes. Photos 24, Video 14, Documents 6, Other 4.">
      <span class="donut-total"><b>48</b> of 100 GB</span>
    </div>
    <figcaption>
      <ul class="donut-legend">
        <li><i style="--c: var(--ui-accent)"></i>Photos <b>24 GB</b></li>
        <li><i style="--c: #0d9488"></i>Video <b>14 GB</b></li>
        <li><i style="--c: #c2410c"></i>Documents <b>6 GB</b></li>
        <li><i style="--c: #a855f7"></i>Other <b>4 GB</b></li>
      </ul>
    </figcaption>
  </figure>
</template>

<style scoped>
.donut { display: flex; flex-wrap: wrap; align-items: center; gap: 28px; margin: 0; }
.donut-ring {
  position: relative; display: grid; place-items: center; width: 170px; aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(var(--ui-accent) 0 24%, #0d9488 0 38%, #c2410c 0 44%, #a855f7 0 48%, var(--ui-surface-2) 0);
}
.donut-ring::before { content: ""; position: absolute; inset: 22px; border-radius: 50%; background: var(--ui-bg); }
.donut-total { position: relative; display: grid; text-align: center; font-size: 13px; color: var(--ui-muted); }
.donut-total b { font-size: 34px; line-height: 1; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.donut-legend { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.donut-legend li { display: grid; grid-template-columns: 14px 1fr auto; align-items: center; gap: 10px; min-width: 180px; }
.donut-legend i { width: 14px; height: 14px; border-radius: 4px; background: var(--c); }
.donut-legend b { font-variant-numeric: tabular-nums; }
</style>
```

## Svelte

`DonutChart.svelte`

```svelte
<!-- tearsheet donut-chart v7cb7f462 · https://qusaialjbali.github.io/tearsheet/zine/parts/donut-chart.html -->
<figure class="donut">
  <div class="donut-ring" role="img" aria-label="Storage used: 48 of 100 gigabytes. Photos 24, Video 14, Documents 6, Other 4.">
    <span class="donut-total"><b>48</b> of 100 GB</span>
  </div>
  <figcaption>
    <ul class="donut-legend">
      <li><i style="--c: var(--ui-accent)"></i>Photos <b>24 GB</b></li>
      <li><i style="--c: #0d9488"></i>Video <b>14 GB</b></li>
      <li><i style="--c: #c2410c"></i>Documents <b>6 GB</b></li>
      <li><i style="--c: #a855f7"></i>Other <b>4 GB</b></li>
    </ul>
  </figcaption>
</figure>

<style>
.donut { display: flex; flex-wrap: wrap; align-items: center; gap: 28px; margin: 0; }
.donut-ring {
  position: relative; display: grid; place-items: center; width: 170px; aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(var(--ui-accent) 0 24%, #0d9488 0 38%, #c2410c 0 44%, #a855f7 0 48%, var(--ui-surface-2) 0);
}
.donut-ring::before { content: ""; position: absolute; inset: 22px; border-radius: 50%; background: var(--ui-bg); }
.donut-total { position: relative; display: grid; text-align: center; font-size: 13px; color: var(--ui-muted); }
.donut-total b { font-size: 34px; line-height: 1; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.donut-legend { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.donut-legend li { display: grid; grid-template-columns: 14px 1fr auto; align-items: center; gap: 10px; min-width: 180px; }
.donut-legend i { width: 14px; height: 14px; border-radius: 4px; background: var(--c); }
.donut-legend b { font-variant-numeric: tabular-nums; }
</style>
```
