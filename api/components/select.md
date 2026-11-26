# Select (Tearsheet, Forms)

A native select restyled to match the text field, with a drawn chevron.

**Why it works:** Keep the native <select>: it gets the right picker on every phone, works with autofill and needs no JavaScript. Use it for 5 to 15 options; fewer than 5 read better as radios.

**Checked:** axe clean in light and dark; tightest text contrast 16.1:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet select v634c7b93 · https://qusaialjbali.github.io/tearsheet/zine/parts/select.html -->
<div class="select-field">
  <label class="select-label" for="country">Country</label>
  <div class="select-wrap">
    <select class="select" id="country" autocomplete="country-name">
      <option>Canada</option>
      <option>Germany</option>
      <option>Japan</option>
      <option>Jordan</option>
      <option>Mexico</option>
      <option>United Kingdom</option>
    </select>
    <svg class="select-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet select v634c7b93 · https://qusaialjbali.github.io/tearsheet/zine/parts/select.html */
.select-field { display: grid; gap: 6px; width: 100%; max-width: 320px; }
.select-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.select-wrap { position: relative; }
.select {
  appearance: none;
  width: 100%;
  min-height: 42px;
  padding: 10px 40px 10px 12px;
  font: inherit;
  font-size: 15px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.select:hover { border-color: var(--ui-text); }
.select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 18px;
  height: 18px;
  color: var(--ui-muted);
  transform: translateY(-50%);
  pointer-events: none;
}
```

## React

`Select.jsx`

```jsx
/* tearsheet select v634c7b93 · https://qusaialjbali.github.io/tearsheet/zine/parts/select.html */
import './Select.css';

export function Select() {
  return (
    <div className="select-field">
      <label className="select-label" htmlFor="country">Country</label>
      <div className="select-wrap">
        <select className="select" id="country" autoComplete="country-name">
          <option>Canada</option>
          <option>Germany</option>
          <option>Japan</option>
          <option>Jordan</option>
          <option>Mexico</option>
          <option>United Kingdom</option>
        </select>
        <svg className="select-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}
```

`Select.css`

```css
/* tearsheet select v634c7b93 · https://qusaialjbali.github.io/tearsheet/zine/parts/select.html */
.select-field { display: grid; gap: 6px; width: 100%; max-width: 320px; }
.select-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.select-wrap { position: relative; }
.select {
  appearance: none;
  width: 100%;
  min-height: 42px;
  padding: 10px 40px 10px 12px;
  font: inherit;
  font-size: 15px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.select:hover { border-color: var(--ui-text); }
.select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 18px;
  height: 18px;
  color: var(--ui-muted);
  transform: translateY(-50%);
  pointer-events: none;
}
```

## Vue

`Select.vue`

```vue
<!-- tearsheet select v634c7b93 · https://qusaialjbali.github.io/tearsheet/zine/parts/select.html -->
<template>
  <div class="select-field">
    <label class="select-label" for="country">Country</label>
    <div class="select-wrap">
      <select class="select" id="country" autocomplete="country-name">
        <option>Canada</option>
        <option>Germany</option>
        <option>Japan</option>
        <option>Jordan</option>
        <option>Mexico</option>
        <option>United Kingdom</option>
      </select>
      <svg class="select-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
  </div>
</template>

<style scoped>
.select-field { display: grid; gap: 6px; width: 100%; max-width: 320px; }
.select-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.select-wrap { position: relative; }
.select {
  appearance: none;
  width: 100%;
  min-height: 42px;
  padding: 10px 40px 10px 12px;
  font: inherit;
  font-size: 15px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.select:hover { border-color: var(--ui-text); }
.select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 18px;
  height: 18px;
  color: var(--ui-muted);
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
```

## Svelte

`Select.svelte`

```svelte
<!-- tearsheet select v634c7b93 · https://qusaialjbali.github.io/tearsheet/zine/parts/select.html -->
<div class="select-field">
  <label class="select-label" for="country">Country</label>
  <div class="select-wrap">
    <select class="select" id="country" autocomplete="country-name">
      <option>Canada</option>
      <option>Germany</option>
      <option>Japan</option>
      <option>Jordan</option>
      <option>Mexico</option>
      <option>United Kingdom</option>
    </select>
    <svg class="select-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
</div>

<style>
.select-field { display: grid; gap: 6px; width: 100%; max-width: 320px; }
.select-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.select-wrap { position: relative; }
.select {
  appearance: none;
  width: 100%;
  min-height: 42px;
  padding: 10px 40px 10px 12px;
  font: inherit;
  font-size: 15px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.select:hover { border-color: var(--ui-text); }
.select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 18px;
  height: 18px;
  color: var(--ui-muted);
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
```
