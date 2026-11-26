# Breadcrumb (Tearsheet, Navigation)

Shows where the page sits in the site hierarchy, using an ordered list.

**Why it works:** Separators are drawn with CSS so screen readers don’t read them out. The last item is the current page.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet breadcrumb vb646e028 · https://qusaialjbali.github.io/tearsheet/zine/parts/breadcrumb.html -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Settings</a></li>
    <li><a href="#" aria-current="page">Notifications</a></li>
  </ol>
</nav>
```

`styles.css`

```css
/* tearsheet breadcrumb vb646e028 · https://qusaialjbali.github.io/tearsheet/zine/parts/breadcrumb.html */
.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}
.breadcrumb li + li::before {
  content: "/";
  margin: 0 10px;
  color: var(--ui-border-strong);
}
.breadcrumb a {
  color: var(--ui-muted);
  text-decoration: none;
  border-radius: 4px;
}
.breadcrumb a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.breadcrumb a:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.breadcrumb a[aria-current="page"] { color: var(--ui-text); font-weight: 600; pointer-events: none; }
```

## React

`Breadcrumb.jsx`

```jsx
/* tearsheet breadcrumb vb646e028 · https://qusaialjbali.github.io/tearsheet/zine/parts/breadcrumb.html */
import './Breadcrumb.css';

export function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#" aria-current="page">Notifications</a></li>
      </ol>
    </nav>
  );
}
```

`Breadcrumb.css`

```css
/* tearsheet breadcrumb vb646e028 · https://qusaialjbali.github.io/tearsheet/zine/parts/breadcrumb.html */
.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}
.breadcrumb li + li::before {
  content: "/";
  margin: 0 10px;
  color: var(--ui-border-strong);
}
.breadcrumb a {
  color: var(--ui-muted);
  text-decoration: none;
  border-radius: 4px;
}
.breadcrumb a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.breadcrumb a:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.breadcrumb a[aria-current="page"] { color: var(--ui-text); font-weight: 600; pointer-events: none; }
```

## Vue

`Breadcrumb.vue`

```vue
<!-- tearsheet breadcrumb vb646e028 · https://qusaialjbali.github.io/tearsheet/zine/parts/breadcrumb.html -->
<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="#">Home</a></li>
      <li><a href="#">Settings</a></li>
      <li><a href="#" aria-current="page">Notifications</a></li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}
.breadcrumb li + li::before {
  content: "/";
  margin: 0 10px;
  color: var(--ui-border-strong);
}
.breadcrumb a {
  color: var(--ui-muted);
  text-decoration: none;
  border-radius: 4px;
}
.breadcrumb a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.breadcrumb a:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.breadcrumb a[aria-current="page"] { color: var(--ui-text); font-weight: 600; pointer-events: none; }
</style>
```

## Svelte

`Breadcrumb.svelte`

```svelte
<!-- tearsheet breadcrumb vb646e028 · https://qusaialjbali.github.io/tearsheet/zine/parts/breadcrumb.html -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Settings</a></li>
    <li><a href="#" aria-current="page">Notifications</a></li>
  </ol>
</nav>

<style>
.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}
.breadcrumb li + li::before {
  content: "/";
  margin: 0 10px;
  color: var(--ui-border-strong);
}
.breadcrumb a {
  color: var(--ui-muted);
  text-decoration: none;
  border-radius: 4px;
}
.breadcrumb a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.breadcrumb a:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.breadcrumb a[aria-current="page"] { color: var(--ui-text); font-weight: 600; pointer-events: none; }
</style>
```
