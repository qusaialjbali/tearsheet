# Dropdown menu (Tearsheet, Overlays)

An actions menu built on <details>, with icons and a separated destructive item.

**Why it works:** Group items, put destructive actions last and visually apart. For a full keyboard menu pattern (arrow keys, typeahead) add the WAI-ARIA menu button script.

**Checked:** axe clean in light and dark; tightest text contrast 16.1:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet dropdown-menu vff55de92 · https://qusaialjbali.github.io/tearsheet/zine/parts/dropdown-menu.html -->
<details class="menu">
  <summary class="menu-trigger">Options <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
  <div class="menu-list">
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>Rename</button>
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>Duplicate</button>
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Share</button>
    <hr class="menu-sep">
    <button class="menu-item menu-danger" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Delete</button>
  </div>
</details>
```

`styles.css`

```css
/* tearsheet dropdown-menu vff55de92 · https://qusaialjbali.github.io/tearsheet/zine/parts/dropdown-menu.html */
.menu { position: relative; display: inline-block; }
.menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
  list-style: none;
}
.menu-trigger::-webkit-details-marker { display: none; }
.menu-trigger svg { width: 16px; height: 16px; transition: transform 0.2s; }
.menu[open] .menu-trigger svg { transform: rotate(180deg); }
.menu-trigger:hover { background: var(--ui-surface-2); }
.menu-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.menu-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  min-width: 200px;
  padding: 6px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  font: inherit;
  font-size: 14px;
  text-align: start;
  color: var(--ui-text);
  background: none;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.menu-item svg { width: 18px; height: 18px; color: var(--ui-muted); }
.menu-item:hover, .menu-item:focus-visible { outline: none; background: var(--ui-surface-2); }
.menu-danger, .menu-danger svg { color: var(--ui-danger); }
.menu-sep { margin: 6px 4px; border: 0; border-top: 1px solid var(--ui-border); }
```

## React

`DropdownMenu.jsx`

```jsx
/* tearsheet dropdown-menu vff55de92 · https://qusaialjbali.github.io/tearsheet/zine/parts/dropdown-menu.html */
import './DropdownMenu.css';

export function DropdownMenu() {
  return (
    <details className="menu">
      <summary className="menu-trigger">Options <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></summary>
      <div className="menu-list">
        <button className="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>Rename</button>
        <button className="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>Duplicate</button>
        <button className="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>Share</button>
        <hr className="menu-sep" />
        <button className="menu-item menu-danger" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>Delete</button>
      </div>
    </details>
  );
}
```

`DropdownMenu.css`

```css
/* tearsheet dropdown-menu vff55de92 · https://qusaialjbali.github.io/tearsheet/zine/parts/dropdown-menu.html */
.menu { position: relative; display: inline-block; }
.menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
  list-style: none;
}
.menu-trigger::-webkit-details-marker { display: none; }
.menu-trigger svg { width: 16px; height: 16px; transition: transform 0.2s; }
.menu[open] .menu-trigger svg { transform: rotate(180deg); }
.menu-trigger:hover { background: var(--ui-surface-2); }
.menu-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.menu-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  min-width: 200px;
  padding: 6px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  font: inherit;
  font-size: 14px;
  text-align: start;
  color: var(--ui-text);
  background: none;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.menu-item svg { width: 18px; height: 18px; color: var(--ui-muted); }
.menu-item:hover, .menu-item:focus-visible { outline: none; background: var(--ui-surface-2); }
.menu-danger, .menu-danger svg { color: var(--ui-danger); }
.menu-sep { margin: 6px 4px; border: 0; border-top: 1px solid var(--ui-border); }
```

## Vue

`DropdownMenu.vue`

```vue
<!-- tearsheet dropdown-menu vff55de92 · https://qusaialjbali.github.io/tearsheet/zine/parts/dropdown-menu.html -->
<template>
  <details class="menu">
    <summary class="menu-trigger">Options <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
    <div class="menu-list">
      <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>Rename</button>
      <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>Duplicate</button>
      <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Share</button>
      <hr class="menu-sep">
      <button class="menu-item menu-danger" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Delete</button>
    </div>
  </details>
</template>

<style scoped>
.menu { position: relative; display: inline-block; }
.menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
  list-style: none;
}
.menu-trigger::-webkit-details-marker { display: none; }
.menu-trigger svg { width: 16px; height: 16px; transition: transform 0.2s; }
.menu[open] .menu-trigger svg { transform: rotate(180deg); }
.menu-trigger:hover { background: var(--ui-surface-2); }
.menu-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.menu-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  min-width: 200px;
  padding: 6px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  font: inherit;
  font-size: 14px;
  text-align: start;
  color: var(--ui-text);
  background: none;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.menu-item svg { width: 18px; height: 18px; color: var(--ui-muted); }
.menu-item:hover, .menu-item:focus-visible { outline: none; background: var(--ui-surface-2); }
.menu-danger, .menu-danger svg { color: var(--ui-danger); }
.menu-sep { margin: 6px 4px; border: 0; border-top: 1px solid var(--ui-border); }
</style>
```

## Svelte

`DropdownMenu.svelte`

```svelte
<!-- tearsheet dropdown-menu vff55de92 · https://qusaialjbali.github.io/tearsheet/zine/parts/dropdown-menu.html -->
<details class="menu">
  <summary class="menu-trigger">Options <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
  <div class="menu-list">
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>Rename</button>
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>Duplicate</button>
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Share</button>
    <hr class="menu-sep">
    <button class="menu-item menu-danger" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Delete</button>
  </div>
</details>

<style>
.menu { position: relative; display: inline-block; }
.menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
  list-style: none;
}
.menu-trigger::-webkit-details-marker { display: none; }
.menu-trigger svg { width: 16px; height: 16px; transition: transform 0.2s; }
.menu[open] .menu-trigger svg { transform: rotate(180deg); }
.menu-trigger:hover { background: var(--ui-surface-2); }
.menu-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.menu-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  min-width: 200px;
  padding: 6px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  font: inherit;
  font-size: 14px;
  text-align: start;
  color: var(--ui-text);
  background: none;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.menu-item svg { width: 18px; height: 18px; color: var(--ui-muted); }
.menu-item:hover, .menu-item:focus-visible { outline: none; background: var(--ui-surface-2); }
.menu-danger, .menu-danger svg { color: var(--ui-danger); }
.menu-sep { margin: 6px 4px; border: 0; border-top: 1px solid var(--ui-border); }
</style>
```
