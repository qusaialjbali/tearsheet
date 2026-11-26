# Buttons (Tearsheet, Actions)

Primary, secondary, ghost and destructive buttons with hover, focus and disabled states.

**Why it works:** Use one primary button per view. Label with a verb (“Save changes”, not “Submit”). Use <button> for actions and <a> for navigation.

**Checked:** axe clean in light and dark; tightest text contrast 5.73:1 (needs 4.5:1); 4 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet buttons v3f4ce376 · https://qusaialjbali.github.io/tearsheet/zine/parts/buttons.html -->
<div class="btn-row">
  <button class="btn btn-primary" type="button">Save changes</button>
  <button class="btn btn-secondary" type="button">Cancel</button>
  <button class="btn btn-ghost" type="button">Learn more</button>
  <button class="btn btn-danger" type="button">Delete</button>
  <button class="btn btn-primary" type="button" disabled>Disabled</button>
</div>
```

`styles.css`

```css
/* tearsheet buttons v3f4ce376 · https://qusaialjbali.github.io/tearsheet/zine/parts/buttons.html */
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.btn-ghost { background: transparent; color: var(--ui-accent); }
.btn-ghost:hover:not(:disabled) { background: var(--ui-accent-soft); }
```

## React

`Buttons.jsx`

```jsx
/* tearsheet buttons v3f4ce376 · https://qusaialjbali.github.io/tearsheet/zine/parts/buttons.html */
import './Buttons.css';

export function Buttons() {
  return (
    <div className="btn-row">
      <button className="btn btn-primary" type="button">Save changes</button>
      <button className="btn btn-secondary" type="button">Cancel</button>
      <button className="btn btn-ghost" type="button">Learn more</button>
      <button className="btn btn-danger" type="button">Delete</button>
      <button className="btn btn-primary" type="button" disabled>Disabled</button>
    </div>
  );
}
```

`Buttons.css`

```css
/* tearsheet buttons v3f4ce376 · https://qusaialjbali.github.io/tearsheet/zine/parts/buttons.html */
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.btn-ghost { background: transparent; color: var(--ui-accent); }
.btn-ghost:hover:not(:disabled) { background: var(--ui-accent-soft); }
```

## Vue

`Buttons.vue`

```vue
<!-- tearsheet buttons v3f4ce376 · https://qusaialjbali.github.io/tearsheet/zine/parts/buttons.html -->
<template>
  <div class="btn-row">
    <button class="btn btn-primary" type="button">Save changes</button>
    <button class="btn btn-secondary" type="button">Cancel</button>
    <button class="btn btn-ghost" type="button">Learn more</button>
    <button class="btn btn-danger" type="button">Delete</button>
    <button class="btn btn-primary" type="button" disabled>Disabled</button>
  </div>
</template>

<style scoped>
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.btn-ghost { background: transparent; color: var(--ui-accent); }
.btn-ghost:hover:not(:disabled) { background: var(--ui-accent-soft); }
</style>
```

## Svelte

`Buttons.svelte`

```svelte
<!-- tearsheet buttons v3f4ce376 · https://qusaialjbali.github.io/tearsheet/zine/parts/buttons.html -->
<div class="btn-row">
  <button class="btn btn-primary" type="button">Save changes</button>
  <button class="btn btn-secondary" type="button">Cancel</button>
  <button class="btn btn-ghost" type="button">Learn more</button>
  <button class="btn btn-danger" type="button">Delete</button>
  <button class="btn btn-primary" type="button" disabled>Disabled</button>
</div>

<style>
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.btn-ghost { background: transparent; color: var(--ui-accent); }
.btn-ghost:hover:not(:disabled) { background: var(--ui-accent-soft); }
</style>
```
