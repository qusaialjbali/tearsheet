# Tooltip (Tearsheet, Overlays)

CSS-only tooltip that shows on hover and on keyboard focus.

**Why it works:** Tooltips hold short, non-essential hints. Touch screens have no hover, so never hide required information in one.

**Checked:** axe clean in light and dark; 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet tooltip v0306f36e · https://qusaialjbali.github.io/tearsheet/zine/parts/tooltip.html -->
<span class="tip">
  <button class="tip-trigger" type="button" aria-label="Billing help" aria-describedby="tip-billing">?</button>
  <span class="tip-bubble" role="tooltip" id="tip-billing">You’re billed on the 1st of each month.</span>
</span>
```

`styles.css`

```css
/* tearsheet tooltip v0306f36e · https://qusaialjbali.github.io/tearsheet/zine/parts/tooltip.html */
.tip { position: relative; display: inline-flex; }
.tip-trigger {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font: inherit;
  font-weight: 700;
  color: var(--ui-muted);
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  cursor: help;
}
.tip-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tip-bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  width: max-content;
  max-width: 240px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s, transform 0.15s;
}
.tip-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border: 6px solid transparent;
  border-top-color: var(--ui-text);
  transform: translateX(-50%);
}
.tip:hover .tip-bubble,
.tip:focus-within .tip-bubble { opacity: 1; transform: translate(-50%, 0); }
```

## React

`Tooltip.jsx`

```jsx
/* tearsheet tooltip v0306f36e · https://qusaialjbali.github.io/tearsheet/zine/parts/tooltip.html */
import './Tooltip.css';

export function Tooltip() {
  return (
    <span className="tip">
      <button className="tip-trigger" type="button" aria-label="Billing help" aria-describedby="tip-billing">?</button>
      <span className="tip-bubble" role="tooltip" id="tip-billing">You’re billed on the 1st of each month.</span>
    </span>
  );
}
```

`Tooltip.css`

```css
/* tearsheet tooltip v0306f36e · https://qusaialjbali.github.io/tearsheet/zine/parts/tooltip.html */
.tip { position: relative; display: inline-flex; }
.tip-trigger {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font: inherit;
  font-weight: 700;
  color: var(--ui-muted);
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  cursor: help;
}
.tip-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tip-bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  width: max-content;
  max-width: 240px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s, transform 0.15s;
}
.tip-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border: 6px solid transparent;
  border-top-color: var(--ui-text);
  transform: translateX(-50%);
}
.tip:hover .tip-bubble,
.tip:focus-within .tip-bubble { opacity: 1; transform: translate(-50%, 0); }
```

## Vue

`Tooltip.vue`

```vue
<!-- tearsheet tooltip v0306f36e · https://qusaialjbali.github.io/tearsheet/zine/parts/tooltip.html -->
<template>
  <span class="tip">
    <button class="tip-trigger" type="button" aria-label="Billing help" aria-describedby="tip-billing">?</button>
    <span class="tip-bubble" role="tooltip" id="tip-billing">You’re billed on the 1st of each month.</span>
  </span>
</template>

<style scoped>
.tip { position: relative; display: inline-flex; }
.tip-trigger {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font: inherit;
  font-weight: 700;
  color: var(--ui-muted);
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  cursor: help;
}
.tip-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tip-bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  width: max-content;
  max-width: 240px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s, transform 0.15s;
}
.tip-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border: 6px solid transparent;
  border-top-color: var(--ui-text);
  transform: translateX(-50%);
}
.tip:hover .tip-bubble,
.tip:focus-within .tip-bubble { opacity: 1; transform: translate(-50%, 0); }
</style>
```

## Svelte

`Tooltip.svelte`

```svelte
<!-- tearsheet tooltip v0306f36e · https://qusaialjbali.github.io/tearsheet/zine/parts/tooltip.html -->
<span class="tip">
  <button class="tip-trigger" type="button" aria-label="Billing help" aria-describedby="tip-billing">?</button>
  <span class="tip-bubble" role="tooltip" id="tip-billing">You’re billed on the 1st of each month.</span>
</span>

<style>
.tip { position: relative; display: inline-flex; }
.tip-trigger {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font: inherit;
  font-weight: 700;
  color: var(--ui-muted);
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  cursor: help;
}
.tip-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tip-bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  width: max-content;
  max-width: 240px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s, transform 0.15s;
}
.tip-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border: 6px solid transparent;
  border-top-color: var(--ui-text);
  transform: translateX(-50%);
}
.tip:hover .tip-bubble,
.tip:focus-within .tip-bubble { opacity: 1; transform: translate(-50%, 0); }
</style>
```
