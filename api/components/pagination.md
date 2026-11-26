# Pagination (Tearsheet, Navigation)

Page links with previous/next, a current page and a gap for skipped pages.

**Why it works:** Give arrow-only links an aria-label. Use real links (with URLs) so pages can be bookmarked and opened in new tabs.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 6 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet pagination vec753872 · https://qusaialjbali.github.io/tearsheet/zine/parts/pagination.html -->
<nav class="pagination" aria-label="Pagination">
  <a class="page" href="#" aria-label="Previous page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  <a class="page" href="#">1</a>
  <a class="page" href="#" aria-current="page">2</a>
  <a class="page" href="#">3</a>
  <span class="page-gap" aria-hidden="true">…</span>
  <a class="page" href="#">12</a>
  <a class="page" href="#" aria-label="Next page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
</nav>
```

`styles.css`

```css
/* tearsheet pagination vec753872 · https://qusaialjbali.github.io/tearsheet/zine/parts/pagination.html */
.pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.page, .page-gap {
  display: grid;
  place-items: center;
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.page {
  color: var(--ui-text);
  text-decoration: none;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-surface);
}
.page:hover { background: var(--ui-surface-2); }
.page:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.page[aria-current="page"] { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.page-gap { color: var(--ui-muted); min-width: 24px; padding: 0; }
```

## React

`Pagination.jsx`

```jsx
/* tearsheet pagination vec753872 · https://qusaialjbali.github.io/tearsheet/zine/parts/pagination.html */
import './Pagination.css';

export function Pagination() {
  return (
    <nav className="pagination" aria-label="Pagination">
      <a className="page" href="#" aria-label="Previous page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
      <a className="page" href="#">1</a>
      <a className="page" href="#" aria-current="page">2</a>
      <a className="page" href="#">3</a>
      <span className="page-gap" aria-hidden="true">…</span>
      <a className="page" href="#">12</a>
      <a className="page" href="#" aria-label="Next page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
    </nav>
  );
}
```

`Pagination.css`

```css
/* tearsheet pagination vec753872 · https://qusaialjbali.github.io/tearsheet/zine/parts/pagination.html */
.pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.page, .page-gap {
  display: grid;
  place-items: center;
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.page {
  color: var(--ui-text);
  text-decoration: none;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-surface);
}
.page:hover { background: var(--ui-surface-2); }
.page:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.page[aria-current="page"] { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.page-gap { color: var(--ui-muted); min-width: 24px; padding: 0; }
```

## Vue

`Pagination.vue`

```vue
<!-- tearsheet pagination vec753872 · https://qusaialjbali.github.io/tearsheet/zine/parts/pagination.html -->
<template>
  <nav class="pagination" aria-label="Pagination">
    <a class="page" href="#" aria-label="Previous page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    <a class="page" href="#">1</a>
    <a class="page" href="#" aria-current="page">2</a>
    <a class="page" href="#">3</a>
    <span class="page-gap" aria-hidden="true">…</span>
    <a class="page" href="#">12</a>
    <a class="page" href="#" aria-label="Next page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  </nav>
</template>

<style scoped>
.pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.page, .page-gap {
  display: grid;
  place-items: center;
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.page {
  color: var(--ui-text);
  text-decoration: none;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-surface);
}
.page:hover { background: var(--ui-surface-2); }
.page:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.page[aria-current="page"] { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.page-gap { color: var(--ui-muted); min-width: 24px; padding: 0; }
</style>
```

## Svelte

`Pagination.svelte`

```svelte
<!-- tearsheet pagination vec753872 · https://qusaialjbali.github.io/tearsheet/zine/parts/pagination.html -->
<nav class="pagination" aria-label="Pagination">
  <a class="page" href="#" aria-label="Previous page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  <a class="page" href="#">1</a>
  <a class="page" href="#" aria-current="page">2</a>
  <a class="page" href="#">3</a>
  <span class="page-gap" aria-hidden="true">…</span>
  <a class="page" href="#">12</a>
  <a class="page" href="#" aria-label="Next page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
</nav>

<style>
.pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.page, .page-gap {
  display: grid;
  place-items: center;
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.page {
  color: var(--ui-text);
  text-decoration: none;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-surface);
}
.page:hover { background: var(--ui-surface-2); }
.page:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.page[aria-current="page"] { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.page-gap { color: var(--ui-muted); min-width: 24px; padding: 0; }
</style>
```
