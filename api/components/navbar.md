# Navigation bar (Tearsheet, Navigation)

Responsive site header with brand, links, actions and a no-JS mobile menu.

**Why it works:** Mark the current page with aria-current="page". Keep top-level links to about five to seven, with plain names people would search for.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 7 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet navbar v4cc9869e · https://qusaialjbali.github.io/tearsheet/zine/parts/navbar.html -->
<header class="nav">
  <a class="nav-brand" href="#"><span class="nav-logo" aria-hidden="true"></span>Acme</a>
  <nav class="nav-main" aria-label="Main">
    <ul class="nav-links">
      <li><a href="#" aria-current="page">Product</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </nav>
  <div class="nav-actions">
    <a class="nav-signin" href="#">Sign in</a>
    <a class="nav-cta" href="#">Get started</a>
    <details class="nav-menu">
      <summary aria-label="Menu"><span></span></summary>
      <ul>
        <li><a href="#" aria-current="page">Product</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Docs</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Sign in</a></li>
      </ul>
    </details>
  </div>
</header>
```

`styles.css`

```css
/* tearsheet navbar v4cc9869e · https://qusaialjbali.github.io/tearsheet/zine/parts/navbar.html */
.nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.nav a { color: inherit; text-decoration: none; border-radius: 6px; }
.nav a:focus-visible, .nav summary:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nav-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; }
.nav-logo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--ui-accent), var(--ui-accent-hover));
}
.nav-links { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }
.nav-links a, .nav-signin {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-muted);
}
.nav-links a:hover, .nav-signin:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.nav-links a[aria-current="page"] { color: var(--ui-text); font-weight: 600; }
.nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nav-cta {
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent-text) !important;
  background: var(--ui-accent);
}
.nav-cta:hover { background: var(--ui-accent-hover); }

.nav-menu { display: none; }
.nav-menu summary {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  list-style: none;
}
.nav-menu summary::-webkit-details-marker { display: none; }
.nav-menu summary span,
.nav-menu summary span::before,
.nav-menu summary span::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ui-text);
  border-radius: 2px;
  position: relative;
}
.nav-menu summary span::before, .nav-menu summary span::after { content: ""; position: absolute; }
.nav-menu summary span::before { top: -6px; }
.nav-menu summary span::after { top: 6px; }
.nav-menu ul {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.nav-menu li a { display: block; padding: 12px; font-weight: 500; }
.nav-menu li a:hover { background: var(--ui-surface-2); }

@media (max-width: 720px) {
  .nav-main, .nav-signin { display: none; }
  .nav-menu { display: block; }
}
```

## React

`Navbar.jsx`

```jsx
/* tearsheet navbar v4cc9869e · https://qusaialjbali.github.io/tearsheet/zine/parts/navbar.html */
import './Navbar.css';

export function Navbar() {
  return (
    <header className="nav">
      <a className="nav-brand" href="#"><span className="nav-logo" aria-hidden="true"></span>Acme</a>
      <nav className="nav-main" aria-label="Main">
        <ul className="nav-links">
          <li><a href="#" aria-current="page">Product</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Docs</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </nav>
      <div className="nav-actions">
        <a className="nav-signin" href="#">Sign in</a>
        <a className="nav-cta" href="#">Get started</a>
        <details className="nav-menu">
          <summary aria-label="Menu"><span></span></summary>
          <ul>
            <li><a href="#" aria-current="page">Product</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Sign in</a></li>
          </ul>
        </details>
      </div>
    </header>
  );
}
```

`Navbar.css`

```css
/* tearsheet navbar v4cc9869e · https://qusaialjbali.github.io/tearsheet/zine/parts/navbar.html */
.nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.nav a { color: inherit; text-decoration: none; border-radius: 6px; }
.nav a:focus-visible, .nav summary:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nav-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; }
.nav-logo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--ui-accent), var(--ui-accent-hover));
}
.nav-links { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }
.nav-links a, .nav-signin {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-muted);
}
.nav-links a:hover, .nav-signin:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.nav-links a[aria-current="page"] { color: var(--ui-text); font-weight: 600; }
.nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nav-cta {
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent-text) !important;
  background: var(--ui-accent);
}
.nav-cta:hover { background: var(--ui-accent-hover); }

.nav-menu { display: none; }
.nav-menu summary {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  list-style: none;
}
.nav-menu summary::-webkit-details-marker { display: none; }
.nav-menu summary span,
.nav-menu summary span::before,
.nav-menu summary span::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ui-text);
  border-radius: 2px;
  position: relative;
}
.nav-menu summary span::before, .nav-menu summary span::after { content: ""; position: absolute; }
.nav-menu summary span::before { top: -6px; }
.nav-menu summary span::after { top: 6px; }
.nav-menu ul {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.nav-menu li a { display: block; padding: 12px; font-weight: 500; }
.nav-menu li a:hover { background: var(--ui-surface-2); }

@media (max-width: 720px) {
  .nav-main, .nav-signin { display: none; }
  .nav-menu { display: block; }
}
```

## Vue

`Navbar.vue`

```vue
<!-- tearsheet navbar v4cc9869e · https://qusaialjbali.github.io/tearsheet/zine/parts/navbar.html -->
<template>
  <header class="nav">
    <a class="nav-brand" href="#"><span class="nav-logo" aria-hidden="true"></span>Acme</a>
    <nav class="nav-main" aria-label="Main">
      <ul class="nav-links">
        <li><a href="#" aria-current="page">Product</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Docs</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
    </nav>
    <div class="nav-actions">
      <a class="nav-signin" href="#">Sign in</a>
      <a class="nav-cta" href="#">Get started</a>
      <details class="nav-menu">
        <summary aria-label="Menu"><span></span></summary>
        <ul>
          <li><a href="#" aria-current="page">Product</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Docs</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Sign in</a></li>
        </ul>
      </details>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.nav a { color: inherit; text-decoration: none; border-radius: 6px; }
.nav a:focus-visible, .nav summary:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nav-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; }
.nav-logo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--ui-accent), var(--ui-accent-hover));
}
.nav-links { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }
.nav-links a, .nav-signin {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-muted);
}
.nav-links a:hover, .nav-signin:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.nav-links a[aria-current="page"] { color: var(--ui-text); font-weight: 600; }
.nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nav-cta {
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent-text) !important;
  background: var(--ui-accent);
}
.nav-cta:hover { background: var(--ui-accent-hover); }

.nav-menu { display: none; }
.nav-menu summary {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  list-style: none;
}
.nav-menu summary::-webkit-details-marker { display: none; }
.nav-menu summary span,
.nav-menu summary span::before,
.nav-menu summary span::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ui-text);
  border-radius: 2px;
  position: relative;
}
.nav-menu summary span::before, .nav-menu summary span::after { content: ""; position: absolute; }
.nav-menu summary span::before { top: -6px; }
.nav-menu summary span::after { top: 6px; }
.nav-menu ul {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.nav-menu li a { display: block; padding: 12px; font-weight: 500; }
.nav-menu li a:hover { background: var(--ui-surface-2); }

@media (max-width: 720px) {
  .nav-main, .nav-signin { display: none; }
  .nav-menu { display: block; }
}
</style>
```

## Svelte

`Navbar.svelte`

```svelte
<!-- tearsheet navbar v4cc9869e · https://qusaialjbali.github.io/tearsheet/zine/parts/navbar.html -->
<header class="nav">
  <a class="nav-brand" href="#"><span class="nav-logo" aria-hidden="true"></span>Acme</a>
  <nav class="nav-main" aria-label="Main">
    <ul class="nav-links">
      <li><a href="#" aria-current="page">Product</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </nav>
  <div class="nav-actions">
    <a class="nav-signin" href="#">Sign in</a>
    <a class="nav-cta" href="#">Get started</a>
    <details class="nav-menu">
      <summary aria-label="Menu"><span></span></summary>
      <ul>
        <li><a href="#" aria-current="page">Product</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Docs</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Sign in</a></li>
      </ul>
    </details>
  </div>
</header>

<style>
.nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.nav a { color: inherit; text-decoration: none; border-radius: 6px; }
.nav a:focus-visible, .nav summary:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nav-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; }
.nav-logo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--ui-accent), var(--ui-accent-hover));
}
.nav-links { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }
.nav-links a, .nav-signin {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-muted);
}
.nav-links a:hover, .nav-signin:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.nav-links a[aria-current="page"] { color: var(--ui-text); font-weight: 600; }
.nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nav-cta {
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent-text) !important;
  background: var(--ui-accent);
}
.nav-cta:hover { background: var(--ui-accent-hover); }

.nav-menu { display: none; }
.nav-menu summary {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  list-style: none;
}
.nav-menu summary::-webkit-details-marker { display: none; }
.nav-menu summary span,
.nav-menu summary span::before,
.nav-menu summary span::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ui-text);
  border-radius: 2px;
  position: relative;
}
.nav-menu summary span::before, .nav-menu summary span::after { content: ""; position: absolute; }
.nav-menu summary span::before { top: -6px; }
.nav-menu summary span::after { top: 6px; }
.nav-menu ul {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.nav-menu li a { display: block; padding: 12px; font-weight: 500; }
.nav-menu li a:hover { background: var(--ui-surface-2); }

@media (max-width: 720px) {
  .nav-main, .nav-signin { display: none; }
  .nav-menu { display: block; }
}
</style>
```
