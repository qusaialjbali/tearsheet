# Empty state (Tearsheet, Feedback)

Explains why a view is empty and offers the next step.

**Why it works:** An empty screen is a chance to teach. Say what will appear here and give one clear way to get started.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet empty-state vc0a4ccc5 · https://qusaialjbali.github.io/tearsheet/zine/parts/empty-state.html -->
<div class="empty">
  <svg class="empty-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 14a4 4 0 0 1 4-4h9l4 5h15a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 22v10M19 27h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
  <h3 class="empty-title">No projects yet</h3>
  <p class="empty-text">Projects you create will show up here. Start from a template or a blank canvas.</p>
  <div class="empty-actions">
    <button class="btn btn-primary" type="button">New project</button>
    <button class="btn btn-secondary" type="button">Browse templates</button>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet empty-state vc0a4ccc5 · https://qusaialjbali.github.io/tearsheet/zine/parts/empty-state.html */
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
.empty {
  display: grid;
  justify-items: center;
  max-width: 420px;
  padding: 40px 24px;
  text-align: center;
  border: 1.5px dashed var(--ui-border);
  border-radius: var(--ui-radius);
}
.empty-icon {
  width: 56px;
  height: 56px;
  padding: 10px;
  margin-bottom: 16px;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 16px;
}
.empty-title { margin: 0 0 6px; font-size: 18px; color: var(--ui-text); }
.empty-text { margin: 0 0 20px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
```

## React

`EmptyState.jsx`

```jsx
/* tearsheet empty-state vc0a4ccc5 · https://qusaialjbali.github.io/tearsheet/zine/parts/empty-state.html */
import './EmptyState.css';

export function EmptyState() {
  return (
    <div className="empty">
      <svg className="empty-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 14a4 4 0 0 1 4-4h9l4 5h15a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M24 22v10M19 27h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
      <h3 className="empty-title">No projects yet</h3>
      <p className="empty-text">Projects you create will show up here. Start from a template or a blank canvas.</p>
      <div className="empty-actions">
        <button className="btn btn-primary" type="button">New project</button>
        <button className="btn btn-secondary" type="button">Browse templates</button>
      </div>
    </div>
  );
}
```

`EmptyState.css`

```css
/* tearsheet empty-state vc0a4ccc5 · https://qusaialjbali.github.io/tearsheet/zine/parts/empty-state.html */
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
.empty {
  display: grid;
  justify-items: center;
  max-width: 420px;
  padding: 40px 24px;
  text-align: center;
  border: 1.5px dashed var(--ui-border);
  border-radius: var(--ui-radius);
}
.empty-icon {
  width: 56px;
  height: 56px;
  padding: 10px;
  margin-bottom: 16px;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 16px;
}
.empty-title { margin: 0 0 6px; font-size: 18px; color: var(--ui-text); }
.empty-text { margin: 0 0 20px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
```

## Vue

`EmptyState.vue`

```vue
<!-- tearsheet empty-state vc0a4ccc5 · https://qusaialjbali.github.io/tearsheet/zine/parts/empty-state.html -->
<template>
  <div class="empty">
    <svg class="empty-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 14a4 4 0 0 1 4-4h9l4 5h15a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 22v10M19 27h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    <h3 class="empty-title">No projects yet</h3>
    <p class="empty-text">Projects you create will show up here. Start from a template or a blank canvas.</p>
    <div class="empty-actions">
      <button class="btn btn-primary" type="button">New project</button>
      <button class="btn btn-secondary" type="button">Browse templates</button>
    </div>
  </div>
</template>

<style scoped>
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
.empty {
  display: grid;
  justify-items: center;
  max-width: 420px;
  padding: 40px 24px;
  text-align: center;
  border: 1.5px dashed var(--ui-border);
  border-radius: var(--ui-radius);
}
.empty-icon {
  width: 56px;
  height: 56px;
  padding: 10px;
  margin-bottom: 16px;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 16px;
}
.empty-title { margin: 0 0 6px; font-size: 18px; color: var(--ui-text); }
.empty-text { margin: 0 0 20px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
</style>
```

## Svelte

`EmptyState.svelte`

```svelte
<!-- tearsheet empty-state vc0a4ccc5 · https://qusaialjbali.github.io/tearsheet/zine/parts/empty-state.html -->
<div class="empty">
  <svg class="empty-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 14a4 4 0 0 1 4-4h9l4 5h15a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 22v10M19 27h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
  <h3 class="empty-title">No projects yet</h3>
  <p class="empty-text">Projects you create will show up here. Start from a template or a blank canvas.</p>
  <div class="empty-actions">
    <button class="btn btn-primary" type="button">New project</button>
    <button class="btn btn-secondary" type="button">Browse templates</button>
  </div>
</div>

<style>
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
.empty {
  display: grid;
  justify-items: center;
  max-width: 420px;
  padding: 40px 24px;
  text-align: center;
  border: 1.5px dashed var(--ui-border);
  border-radius: var(--ui-radius);
}
.empty-icon {
  width: 56px;
  height: 56px;
  padding: 10px;
  margin-bottom: 16px;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 16px;
}
.empty-title { margin: 0 0 6px; font-size: 18px; color: var(--ui-text); }
.empty-text { margin: 0 0 20px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
</style>
```
