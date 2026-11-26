# Split button (Tearsheet, Actions)

A main action with a small menu of related alternatives attached to its side.

**Why it works:** Use it when one action is the obvious default and the others are rare variants. Both halves are real buttons with their own labels.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet split-button v895470ee · https://qusaialjbali.github.io/tearsheet/zine/parts/split-button.html -->
<div class="split">
  <button class="split-main" type="button">Publish</button>
  <details class="split-more">
    <summary aria-label="More publish options"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
    <div class="split-menu">
      <button type="button">Publish now</button>
      <button type="button">Schedule for later</button>
      <button type="button">Save as draft</button>
    </div>
  </details>
</div>
```

`styles.css`

```css
/* tearsheet split-button v895470ee · https://qusaialjbali.github.io/tearsheet/zine/parts/split-button.html */
.split { position: relative; display: inline-flex; }
.split-main, .split-more summary {
  display: inline-flex; align-items: center; min-height: 42px;
  font: inherit; font-size: 14px; font-weight: 600;
  color: var(--ui-accent-text); background: var(--ui-accent); border: 0; cursor: pointer;
}
.split-main { padding: 0 18px; border-radius: var(--ui-radius-sm) 0 0 var(--ui-radius-sm); }
.split-more summary {
  padding: 0 10px; list-style: none;
  border-left: 1px solid rgb(255 255 255 / 0.3); border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
}
.split-more summary::-webkit-details-marker { display: none; }
.split-more summary svg { width: 18px; height: 18px; transition: transform 0.2s; }
.split-more[open] summary svg { transform: rotate(180deg); }
.split-main:hover, .split-more summary:hover { background: var(--ui-accent-hover); }
.split-main:focus-visible, .split-more summary:focus-visible { outline: none; box-shadow: var(--ui-focus); position: relative; z-index: 1; }
.split-menu {
  position: absolute; top: calc(100% + 6px); inset-inline-end: 0; z-index: 5; min-width: 200px; padding: 6px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.split-menu button {
  display: block; width: 100%; padding: 9px 10px; text-align: start;
  font: inherit; font-size: 14px; color: var(--ui-text); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.split-menu button:hover, .split-menu button:focus-visible { outline: none; background: var(--ui-surface-2); }
```

## React

`SplitButton.jsx`

```jsx
/* tearsheet split-button v895470ee · https://qusaialjbali.github.io/tearsheet/zine/parts/split-button.html */
import './SplitButton.css';

export function SplitButton() {
  return (
    <div className="split">
      <button className="split-main" type="button">Publish</button>
      <details className="split-more">
        <summary aria-label="More publish options"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></summary>
        <div className="split-menu">
          <button type="button">Publish now</button>
          <button type="button">Schedule for later</button>
          <button type="button">Save as draft</button>
        </div>
      </details>
    </div>
  );
}
```

`SplitButton.css`

```css
/* tearsheet split-button v895470ee · https://qusaialjbali.github.io/tearsheet/zine/parts/split-button.html */
.split { position: relative; display: inline-flex; }
.split-main, .split-more summary {
  display: inline-flex; align-items: center; min-height: 42px;
  font: inherit; font-size: 14px; font-weight: 600;
  color: var(--ui-accent-text); background: var(--ui-accent); border: 0; cursor: pointer;
}
.split-main { padding: 0 18px; border-radius: var(--ui-radius-sm) 0 0 var(--ui-radius-sm); }
.split-more summary {
  padding: 0 10px; list-style: none;
  border-left: 1px solid rgb(255 255 255 / 0.3); border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
}
.split-more summary::-webkit-details-marker { display: none; }
.split-more summary svg { width: 18px; height: 18px; transition: transform 0.2s; }
.split-more[open] summary svg { transform: rotate(180deg); }
.split-main:hover, .split-more summary:hover { background: var(--ui-accent-hover); }
.split-main:focus-visible, .split-more summary:focus-visible { outline: none; box-shadow: var(--ui-focus); position: relative; z-index: 1; }
.split-menu {
  position: absolute; top: calc(100% + 6px); inset-inline-end: 0; z-index: 5; min-width: 200px; padding: 6px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.split-menu button {
  display: block; width: 100%; padding: 9px 10px; text-align: start;
  font: inherit; font-size: 14px; color: var(--ui-text); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.split-menu button:hover, .split-menu button:focus-visible { outline: none; background: var(--ui-surface-2); }
```

## Vue

`SplitButton.vue`

```vue
<!-- tearsheet split-button v895470ee · https://qusaialjbali.github.io/tearsheet/zine/parts/split-button.html -->
<template>
  <div class="split">
    <button class="split-main" type="button">Publish</button>
    <details class="split-more">
      <summary aria-label="More publish options"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
      <div class="split-menu">
        <button type="button">Publish now</button>
        <button type="button">Schedule for later</button>
        <button type="button">Save as draft</button>
      </div>
    </details>
  </div>
</template>

<style scoped>
.split { position: relative; display: inline-flex; }
.split-main, .split-more summary {
  display: inline-flex; align-items: center; min-height: 42px;
  font: inherit; font-size: 14px; font-weight: 600;
  color: var(--ui-accent-text); background: var(--ui-accent); border: 0; cursor: pointer;
}
.split-main { padding: 0 18px; border-radius: var(--ui-radius-sm) 0 0 var(--ui-radius-sm); }
.split-more summary {
  padding: 0 10px; list-style: none;
  border-left: 1px solid rgb(255 255 255 / 0.3); border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
}
.split-more summary::-webkit-details-marker { display: none; }
.split-more summary svg { width: 18px; height: 18px; transition: transform 0.2s; }
.split-more[open] summary svg { transform: rotate(180deg); }
.split-main:hover, .split-more summary:hover { background: var(--ui-accent-hover); }
.split-main:focus-visible, .split-more summary:focus-visible { outline: none; box-shadow: var(--ui-focus); position: relative; z-index: 1; }
.split-menu {
  position: absolute; top: calc(100% + 6px); inset-inline-end: 0; z-index: 5; min-width: 200px; padding: 6px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.split-menu button {
  display: block; width: 100%; padding: 9px 10px; text-align: start;
  font: inherit; font-size: 14px; color: var(--ui-text); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.split-menu button:hover, .split-menu button:focus-visible { outline: none; background: var(--ui-surface-2); }
</style>
```

## Svelte

`SplitButton.svelte`

```svelte
<!-- tearsheet split-button v895470ee · https://qusaialjbali.github.io/tearsheet/zine/parts/split-button.html -->
<div class="split">
  <button class="split-main" type="button">Publish</button>
  <details class="split-more">
    <summary aria-label="More publish options"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
    <div class="split-menu">
      <button type="button">Publish now</button>
      <button type="button">Schedule for later</button>
      <button type="button">Save as draft</button>
    </div>
  </details>
</div>

<style>
.split { position: relative; display: inline-flex; }
.split-main, .split-more summary {
  display: inline-flex; align-items: center; min-height: 42px;
  font: inherit; font-size: 14px; font-weight: 600;
  color: var(--ui-accent-text); background: var(--ui-accent); border: 0; cursor: pointer;
}
.split-main { padding: 0 18px; border-radius: var(--ui-radius-sm) 0 0 var(--ui-radius-sm); }
.split-more summary {
  padding: 0 10px; list-style: none;
  border-left: 1px solid rgb(255 255 255 / 0.3); border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
}
.split-more summary::-webkit-details-marker { display: none; }
.split-more summary svg { width: 18px; height: 18px; transition: transform 0.2s; }
.split-more[open] summary svg { transform: rotate(180deg); }
.split-main:hover, .split-more summary:hover { background: var(--ui-accent-hover); }
.split-main:focus-visible, .split-more summary:focus-visible { outline: none; box-shadow: var(--ui-focus); position: relative; z-index: 1; }
.split-menu {
  position: absolute; top: calc(100% + 6px); inset-inline-end: 0; z-index: 5; min-width: 200px; padding: 6px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.split-menu button {
  display: block; width: 100%; padding: 9px 10px; text-align: start;
  font: inherit; font-size: 14px; color: var(--ui-text); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.split-menu button:hover, .split-menu button:focus-visible { outline: none; background: var(--ui-surface-2); }
</style>
```
