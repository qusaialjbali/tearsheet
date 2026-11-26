# Kanban column (Tearsheet, Content)

A board column of task cards with labels, assignees, due dates and a quick add.

**Why it works:** Drag and drop should never be the only way to move a card: give each card a menu or a “Move to” control as the keyboard path.

**Checked:** axe clean in light and dark; tightest text contrast 5.02:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet kanban-column vc514d992 · https://qusaialjbali.github.io/tearsheet/zine/parts/kanban-column.html -->
<section class="kanban" aria-labelledby="kb-title">
  <header class="kb-head"><h3 id="kb-title">In progress</h3><span class="kb-count">3</span></header>
  <ul class="kb-cards">
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag design">Design</span></p>
      <p class="kb-name">Dark mode for the settings page</p>
      <p class="kb-meta"><time datetime="2026-12-02">Due 2 Dec</time><span class="kb-av" title="Amara">A</span></p>
    </li>
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag bug">Bug</span><span class="kb-tag">Forms</span></p>
      <p class="kb-name">Date picker loses focus after closing</p>
      <p class="kb-meta"><time datetime="2026-11-28" class="kb-late">Due tomorrow</time><span class="kb-av alt" title="Bo">B</span></p>
    </li>
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag">Docs</span></p>
      <p class="kb-name">Write the toast usage notes</p>
      <p class="kb-meta"><span>No due date</span><span class="kb-av" title="Chiara">C</span></p>
    </li>
  </ul>
  <button class="kb-add" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Add a card</button>
</section>
```

`styles.css`

```css
/* tearsheet kanban-column vc514d992 · https://qusaialjbali.github.io/tearsheet/zine/parts/kanban-column.html */
.kanban { width: 100%; max-width: 300px; padding: 12px; background: var(--ui-surface-2); border-radius: var(--ui-radius); }
.kb-head { display: flex; align-items: center; gap: 8px; padding: 2px 4px 10px; }
.kb-head h3 { margin: 0; font-size: 14px; }
.kb-count { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface); border-radius: 999px; }
.kb-cards { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.kb-card { padding: 12px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-sm); box-shadow: 0 1px 2px rgb(0 0 0 / 0.06); }
.kb-card p { margin: 0; }
.kb-tags { display: flex; gap: 4px; margin-bottom: 6px !important; }
.kb-tag { padding: 1px 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface-2); border-radius: 4px; }
.kb-tag.design { color: var(--ui-accent); background: var(--ui-accent-soft); }
.kb-tag.bug { color: var(--ui-danger); background: var(--ui-danger-soft); }
.kb-name { font-size: 14px; font-weight: 600; line-height: 1.35; }
.kb-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 10px !important; font-size: 12px; color: var(--ui-muted); }
.kb-late { color: var(--ui-warning); font-weight: 700; }
.kb-av { display: grid; place-items: center; width: 22px; height: 22px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.kb-av.alt { background: #0f766e; }
.kb-add { display: flex; align-items: center; gap: 6px; width: 100%; margin-top: 8px; padding: 8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.kb-add svg { width: 16px; height: 16px; }
.kb-add:hover { color: var(--ui-text); background: var(--ui-surface); }
.kb-add:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## React

`KanbanColumn.jsx`

```jsx
/* tearsheet kanban-column vc514d992 · https://qusaialjbali.github.io/tearsheet/zine/parts/kanban-column.html */
import './KanbanColumn.css';

export function KanbanColumn() {
  return (
    <section className="kanban" aria-labelledby="kb-title">
      <header className="kb-head"><h3 id="kb-title">In progress</h3><span className="kb-count">3</span></header>
      <ul className="kb-cards">
        <li className="kb-card">
          <p className="kb-tags"><span className="kb-tag design">Design</span></p>
          <p className="kb-name">Dark mode for the settings page</p>
          <p className="kb-meta"><time dateTime="2026-12-02">Due 2 Dec</time><span className="kb-av" title="Amara">A</span></p>
        </li>
        <li className="kb-card">
          <p className="kb-tags"><span className="kb-tag bug">Bug</span><span className="kb-tag">Forms</span></p>
          <p className="kb-name">Date picker loses focus after closing</p>
          <p className="kb-meta"><time dateTime="2026-11-28" className="kb-late">Due tomorrow</time><span className="kb-av alt" title="Bo">B</span></p>
        </li>
        <li className="kb-card">
          <p className="kb-tags"><span className="kb-tag">Docs</span></p>
          <p className="kb-name">Write the toast usage notes</p>
          <p className="kb-meta"><span>No due date</span><span className="kb-av" title="Chiara">C</span></p>
        </li>
      </ul>
      <button className="kb-add" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Add a card</button>
    </section>
  );
}
```

`KanbanColumn.css`

```css
/* tearsheet kanban-column vc514d992 · https://qusaialjbali.github.io/tearsheet/zine/parts/kanban-column.html */
.kanban { width: 100%; max-width: 300px; padding: 12px; background: var(--ui-surface-2); border-radius: var(--ui-radius); }
.kb-head { display: flex; align-items: center; gap: 8px; padding: 2px 4px 10px; }
.kb-head h3 { margin: 0; font-size: 14px; }
.kb-count { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface); border-radius: 999px; }
.kb-cards { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.kb-card { padding: 12px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-sm); box-shadow: 0 1px 2px rgb(0 0 0 / 0.06); }
.kb-card p { margin: 0; }
.kb-tags { display: flex; gap: 4px; margin-bottom: 6px !important; }
.kb-tag { padding: 1px 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface-2); border-radius: 4px; }
.kb-tag.design { color: var(--ui-accent); background: var(--ui-accent-soft); }
.kb-tag.bug { color: var(--ui-danger); background: var(--ui-danger-soft); }
.kb-name { font-size: 14px; font-weight: 600; line-height: 1.35; }
.kb-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 10px !important; font-size: 12px; color: var(--ui-muted); }
.kb-late { color: var(--ui-warning); font-weight: 700; }
.kb-av { display: grid; place-items: center; width: 22px; height: 22px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.kb-av.alt { background: #0f766e; }
.kb-add { display: flex; align-items: center; gap: 6px; width: 100%; margin-top: 8px; padding: 8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.kb-add svg { width: 16px; height: 16px; }
.kb-add:hover { color: var(--ui-text); background: var(--ui-surface); }
.kb-add:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`KanbanColumn.vue`

```vue
<!-- tearsheet kanban-column vc514d992 · https://qusaialjbali.github.io/tearsheet/zine/parts/kanban-column.html -->
<template>
  <section class="kanban" aria-labelledby="kb-title">
    <header class="kb-head"><h3 id="kb-title">In progress</h3><span class="kb-count">3</span></header>
    <ul class="kb-cards">
      <li class="kb-card">
        <p class="kb-tags"><span class="kb-tag design">Design</span></p>
        <p class="kb-name">Dark mode for the settings page</p>
        <p class="kb-meta"><time datetime="2026-12-02">Due 2 Dec</time><span class="kb-av" title="Amara">A</span></p>
      </li>
      <li class="kb-card">
        <p class="kb-tags"><span class="kb-tag bug">Bug</span><span class="kb-tag">Forms</span></p>
        <p class="kb-name">Date picker loses focus after closing</p>
        <p class="kb-meta"><time datetime="2026-11-28" class="kb-late">Due tomorrow</time><span class="kb-av alt" title="Bo">B</span></p>
      </li>
      <li class="kb-card">
        <p class="kb-tags"><span class="kb-tag">Docs</span></p>
        <p class="kb-name">Write the toast usage notes</p>
        <p class="kb-meta"><span>No due date</span><span class="kb-av" title="Chiara">C</span></p>
      </li>
    </ul>
    <button class="kb-add" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Add a card</button>
  </section>
</template>

<style scoped>
.kanban { width: 100%; max-width: 300px; padding: 12px; background: var(--ui-surface-2); border-radius: var(--ui-radius); }
.kb-head { display: flex; align-items: center; gap: 8px; padding: 2px 4px 10px; }
.kb-head h3 { margin: 0; font-size: 14px; }
.kb-count { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface); border-radius: 999px; }
.kb-cards { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.kb-card { padding: 12px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-sm); box-shadow: 0 1px 2px rgb(0 0 0 / 0.06); }
.kb-card p { margin: 0; }
.kb-tags { display: flex; gap: 4px; margin-bottom: 6px !important; }
.kb-tag { padding: 1px 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface-2); border-radius: 4px; }
.kb-tag.design { color: var(--ui-accent); background: var(--ui-accent-soft); }
.kb-tag.bug { color: var(--ui-danger); background: var(--ui-danger-soft); }
.kb-name { font-size: 14px; font-weight: 600; line-height: 1.35; }
.kb-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 10px !important; font-size: 12px; color: var(--ui-muted); }
.kb-late { color: var(--ui-warning); font-weight: 700; }
.kb-av { display: grid; place-items: center; width: 22px; height: 22px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.kb-av.alt { background: #0f766e; }
.kb-add { display: flex; align-items: center; gap: 6px; width: 100%; margin-top: 8px; padding: 8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.kb-add svg { width: 16px; height: 16px; }
.kb-add:hover { color: var(--ui-text); background: var(--ui-surface); }
.kb-add:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`KanbanColumn.svelte`

```svelte
<!-- tearsheet kanban-column vc514d992 · https://qusaialjbali.github.io/tearsheet/zine/parts/kanban-column.html -->
<section class="kanban" aria-labelledby="kb-title">
  <header class="kb-head"><h3 id="kb-title">In progress</h3><span class="kb-count">3</span></header>
  <ul class="kb-cards">
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag design">Design</span></p>
      <p class="kb-name">Dark mode for the settings page</p>
      <p class="kb-meta"><time datetime="2026-12-02">Due 2 Dec</time><span class="kb-av" title="Amara">A</span></p>
    </li>
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag bug">Bug</span><span class="kb-tag">Forms</span></p>
      <p class="kb-name">Date picker loses focus after closing</p>
      <p class="kb-meta"><time datetime="2026-11-28" class="kb-late">Due tomorrow</time><span class="kb-av alt" title="Bo">B</span></p>
    </li>
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag">Docs</span></p>
      <p class="kb-name">Write the toast usage notes</p>
      <p class="kb-meta"><span>No due date</span><span class="kb-av" title="Chiara">C</span></p>
    </li>
  </ul>
  <button class="kb-add" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Add a card</button>
</section>

<style>
.kanban { width: 100%; max-width: 300px; padding: 12px; background: var(--ui-surface-2); border-radius: var(--ui-radius); }
.kb-head { display: flex; align-items: center; gap: 8px; padding: 2px 4px 10px; }
.kb-head h3 { margin: 0; font-size: 14px; }
.kb-count { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface); border-radius: 999px; }
.kb-cards { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.kb-card { padding: 12px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-sm); box-shadow: 0 1px 2px rgb(0 0 0 / 0.06); }
.kb-card p { margin: 0; }
.kb-tags { display: flex; gap: 4px; margin-bottom: 6px !important; }
.kb-tag { padding: 1px 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface-2); border-radius: 4px; }
.kb-tag.design { color: var(--ui-accent); background: var(--ui-accent-soft); }
.kb-tag.bug { color: var(--ui-danger); background: var(--ui-danger-soft); }
.kb-name { font-size: 14px; font-weight: 600; line-height: 1.35; }
.kb-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 10px !important; font-size: 12px; color: var(--ui-muted); }
.kb-late { color: var(--ui-warning); font-weight: 700; }
.kb-av { display: grid; place-items: center; width: 22px; height: 22px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.kb-av.alt { background: #0f766e; }
.kb-add { display: flex; align-items: center; gap: 6px; width: 100%; margin-top: 8px; padding: 8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.kb-add svg { width: 16px; height: 16px; }
.kb-add:hover { color: var(--ui-text); background: var(--ui-surface); }
.kb-add:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```
