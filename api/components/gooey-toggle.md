# Gooey switch (Tearsheet, Weird)

A switch whose knob stretches like liquid as it slides, made with an SVG goo filter and zero JavaScript.

**Why it works:** Underneath it is a native checkbox with role="switch", so keyboard, forms and screen readers work as normal. The goo is two blobs, one lagging behind the other, melted together by the filter.

**Checked:** axe clean in light and dark; tightest text contrast 17.41:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet gooey-toggle v17174b71 · https://qusaialjbali.github.io/tearsheet/zine/parts/gooey-toggle.html -->
<label class="goo">
  <input type="checkbox" role="switch" checked>
  <span class="goo-track" aria-hidden="true"><span class="goo-blobs"><i></i><i></i></span></span>
  <span class="goo-text">Airplane mode</span>
  <svg class="goo-defs" aria-hidden="true" focusable="false"><filter id="goo-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="3.5"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/></filter></svg>
</label>
```

`styles.css`

```css
/* tearsheet gooey-toggle v17174b71 · https://qusaialjbali.github.io/tearsheet/zine/parts/gooey-toggle.html */
.goo { display: inline-flex; align-items: center; gap: 14px; font-size: 16px; font-weight: 600; cursor: pointer; }
.goo input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.goo-defs { position: absolute; width: 0; height: 0; }
.goo-track { position: relative; width: 76px; height: 40px; border-radius: 999px; background: var(--ui-border-strong); transition: background-color 0.3s; }
.goo-blobs { position: absolute; inset: 0; filter: url(#goo-filter); }
.goo-blobs i { position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; background: #fff; transition: transform 0.35s cubic-bezier(0.5, 0, 0.3, 1); }
.goo-blobs i + i { transition-duration: 0.6s; }
.goo input:checked + .goo-track { background: var(--ui-accent); }
.goo input:checked + .goo-track i { transform: translateX(36px); }
.goo input:focus-visible + .goo-track { box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .goo-blobs i { transition-duration: 0.01s !important; } }
```

## React

`GooeyToggle.jsx`

```jsx
/* tearsheet gooey-toggle v17174b71 · https://qusaialjbali.github.io/tearsheet/zine/parts/gooey-toggle.html */
import './GooeyToggle.css';

export function GooeyToggle() {
  return (
    <label className="goo">
      <input type="checkbox" role="switch" defaultChecked />
      <span className="goo-track" aria-hidden="true"><span className="goo-blobs"><i></i><i></i></span></span>
      <span className="goo-text">Airplane mode</span>
      <svg className="goo-defs" aria-hidden="true" focusable="false"><filter id="goo-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="3.5"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/></filter></svg>
    </label>
  );
}
```

`GooeyToggle.css`

```css
/* tearsheet gooey-toggle v17174b71 · https://qusaialjbali.github.io/tearsheet/zine/parts/gooey-toggle.html */
.goo { display: inline-flex; align-items: center; gap: 14px; font-size: 16px; font-weight: 600; cursor: pointer; }
.goo input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.goo-defs { position: absolute; width: 0; height: 0; }
.goo-track { position: relative; width: 76px; height: 40px; border-radius: 999px; background: var(--ui-border-strong); transition: background-color 0.3s; }
.goo-blobs { position: absolute; inset: 0; filter: url(#goo-filter); }
.goo-blobs i { position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; background: #fff; transition: transform 0.35s cubic-bezier(0.5, 0, 0.3, 1); }
.goo-blobs i + i { transition-duration: 0.6s; }
.goo input:checked + .goo-track { background: var(--ui-accent); }
.goo input:checked + .goo-track i { transform: translateX(36px); }
.goo input:focus-visible + .goo-track { box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .goo-blobs i { transition-duration: 0.01s !important; } }
```

## Vue

`GooeyToggle.vue`

```vue
<!-- tearsheet gooey-toggle v17174b71 · https://qusaialjbali.github.io/tearsheet/zine/parts/gooey-toggle.html -->
<template>
  <label class="goo">
    <input type="checkbox" role="switch" checked>
    <span class="goo-track" aria-hidden="true"><span class="goo-blobs"><i></i><i></i></span></span>
    <span class="goo-text">Airplane mode</span>
    <svg class="goo-defs" aria-hidden="true" focusable="false"><filter id="goo-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="3.5"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/></filter></svg>
  </label>
</template>

<style scoped>
.goo { display: inline-flex; align-items: center; gap: 14px; font-size: 16px; font-weight: 600; cursor: pointer; }
.goo input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.goo-defs { position: absolute; width: 0; height: 0; }
.goo-track { position: relative; width: 76px; height: 40px; border-radius: 999px; background: var(--ui-border-strong); transition: background-color 0.3s; }
.goo-blobs { position: absolute; inset: 0; filter: url(#goo-filter); }
.goo-blobs i { position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; background: #fff; transition: transform 0.35s cubic-bezier(0.5, 0, 0.3, 1); }
.goo-blobs i + i { transition-duration: 0.6s; }
.goo input:checked + .goo-track { background: var(--ui-accent); }
.goo input:checked + .goo-track i { transform: translateX(36px); }
.goo input:focus-visible + .goo-track { box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .goo-blobs i { transition-duration: 0.01s !important; } }
</style>
```

## Svelte

`GooeyToggle.svelte`

```svelte
<!-- tearsheet gooey-toggle v17174b71 · https://qusaialjbali.github.io/tearsheet/zine/parts/gooey-toggle.html -->
<label class="goo">
  <input type="checkbox" role="switch" checked>
  <span class="goo-track" aria-hidden="true"><span class="goo-blobs"><i></i><i></i></span></span>
  <span class="goo-text">Airplane mode</span>
  <svg class="goo-defs" aria-hidden="true" focusable="false"><filter id="goo-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="3.5"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/></filter></svg>
</label>

<style>
.goo { display: inline-flex; align-items: center; gap: 14px; font-size: 16px; font-weight: 600; cursor: pointer; }
.goo input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.goo-defs { position: absolute; width: 0; height: 0; }
.goo-track { position: relative; width: 76px; height: 40px; border-radius: 999px; background: var(--ui-border-strong); transition: background-color 0.3s; }
.goo-blobs { position: absolute; inset: 0; filter: url(#goo-filter); }
.goo-blobs i { position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; background: #fff; transition: transform 0.35s cubic-bezier(0.5, 0, 0.3, 1); }
.goo-blobs i + i { transition-duration: 0.6s; }
.goo input:checked + .goo-track { background: var(--ui-accent); }
.goo input:checked + .goo-track i { transform: translateX(36px); }
.goo input:focus-visible + .goo-track { box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .goo-blobs i { transition-duration: 0.01s !important; } }
</style>
```
