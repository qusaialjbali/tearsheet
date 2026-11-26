# Segmented control (Tearsheet, Forms)

Switch between two to four views. Radios underneath, so it works without JavaScript.

**Why it works:** Best for mutually exclusive views of the same content (List / Board / Calendar). For more than four options use tabs or a select.

**Checked:** axe clean in light and dark; tightest text contrast 6.09:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet segmented-control v48655c56 · https://qusaialjbali.github.io/tearsheet/zine/parts/segmented-control.html -->
<fieldset class="segmented">
  <legend class="sr-only">View</legend>
  <label><input type="radio" name="view" value="list" checked><span>List</span></label>
  <label><input type="radio" name="view" value="board"><span>Board</span></label>
  <label><input type="radio" name="view" value="calendar"><span>Calendar</span></label>
</fieldset>
```

`styles.css`

```css
/* tearsheet segmented-control v48655c56 · https://qusaialjbali.github.io/tearsheet/zine/parts/segmented-control.html */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.segmented {
  display: inline-flex;
  gap: 2px;
  margin: 0;
  padding: 4px;
  background: var(--ui-surface-2);
  border: 0;
  border-radius: calc(var(--ui-radius-sm) + 4px);
}
.segmented label { position: relative; }
.segmented input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.segmented span {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-muted);
  border-radius: var(--ui-radius-sm);
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.segmented label:hover span { color: var(--ui-text); }
.segmented input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.12); }
.segmented input:focus-visible + span { box-shadow: var(--ui-focus); }
```

## React

`SegmentedControl.jsx`

```jsx
/* tearsheet segmented-control v48655c56 · https://qusaialjbali.github.io/tearsheet/zine/parts/segmented-control.html */
import './SegmentedControl.css';

export function SegmentedControl() {
  return (
    <fieldset className="segmented">
      <legend className="sr-only">View</legend>
      <label><input type="radio" name="view" defaultValue="list" defaultChecked /><span>List</span></label>
      <label><input type="radio" name="view" defaultValue="board" /><span>Board</span></label>
      <label><input type="radio" name="view" defaultValue="calendar" /><span>Calendar</span></label>
    </fieldset>
  );
}
```

`SegmentedControl.css`

```css
/* tearsheet segmented-control v48655c56 · https://qusaialjbali.github.io/tearsheet/zine/parts/segmented-control.html */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.segmented {
  display: inline-flex;
  gap: 2px;
  margin: 0;
  padding: 4px;
  background: var(--ui-surface-2);
  border: 0;
  border-radius: calc(var(--ui-radius-sm) + 4px);
}
.segmented label { position: relative; }
.segmented input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.segmented span {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-muted);
  border-radius: var(--ui-radius-sm);
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.segmented label:hover span { color: var(--ui-text); }
.segmented input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.12); }
.segmented input:focus-visible + span { box-shadow: var(--ui-focus); }
```

## Vue

`SegmentedControl.vue`

```vue
<!-- tearsheet segmented-control v48655c56 · https://qusaialjbali.github.io/tearsheet/zine/parts/segmented-control.html -->
<template>
  <fieldset class="segmented">
    <legend class="sr-only">View</legend>
    <label><input type="radio" name="view" value="list" checked><span>List</span></label>
    <label><input type="radio" name="view" value="board"><span>Board</span></label>
    <label><input type="radio" name="view" value="calendar"><span>Calendar</span></label>
  </fieldset>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.segmented {
  display: inline-flex;
  gap: 2px;
  margin: 0;
  padding: 4px;
  background: var(--ui-surface-2);
  border: 0;
  border-radius: calc(var(--ui-radius-sm) + 4px);
}
.segmented label { position: relative; }
.segmented input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.segmented span {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-muted);
  border-radius: var(--ui-radius-sm);
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.segmented label:hover span { color: var(--ui-text); }
.segmented input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.12); }
.segmented input:focus-visible + span { box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`SegmentedControl.svelte`

```svelte
<!-- tearsheet segmented-control v48655c56 · https://qusaialjbali.github.io/tearsheet/zine/parts/segmented-control.html -->
<fieldset class="segmented">
  <legend class="sr-only">View</legend>
  <label><input type="radio" name="view" value="list" checked><span>List</span></label>
  <label><input type="radio" name="view" value="board"><span>Board</span></label>
  <label><input type="radio" name="view" value="calendar"><span>Calendar</span></label>
</fieldset>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.segmented {
  display: inline-flex;
  gap: 2px;
  margin: 0;
  padding: 4px;
  background: var(--ui-surface-2);
  border: 0;
  border-radius: calc(var(--ui-radius-sm) + 4px);
}
.segmented label { position: relative; }
.segmented input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.segmented span {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-muted);
  border-radius: var(--ui-radius-sm);
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.segmented label:hover span { color: var(--ui-text); }
.segmented input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.12); }
.segmented input:focus-visible + span { box-shadow: var(--ui-focus); }
</style>
```
