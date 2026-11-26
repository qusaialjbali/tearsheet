# 404 page (Tearsheet, Sections)

A not-found page that admits the mistake, offers a search and the three most likely destinations.

**Why it works:** Do not blame the visitor. Give them a search box and the few places they most likely meant to go, and log 404s so you can fix the broken links.

**Checked:** axe clean in light and dark; tightest text contrast 5.93:1 (needs 4.5:1); 5 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet not-found vc3139eca · https://qusaialjbali.github.io/tearsheet/zine/parts/not-found.html -->
<section class="nf">
  <p class="nf-code" aria-hidden="true">404</p>
  <h1>That page has wandered off.</h1>
  <p class="nf-text">The link may be old, or we moved something. Try a search, or head somewhere useful.</p>
  <form class="nf-search" role="search">
    <label class="sr-only" for="nf-q">Search the site</label>
    <input id="nf-q" type="search" placeholder="Search the site">
    <button type="submit">Search</button>
  </form>
  <ul class="nf-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Help centre</a></li>
    <li><a href="#">Contact support</a></li>
  </ul>
</section>
```

`styles.css`

```css
/* tearsheet not-found vc3139eca · https://qusaialjbali.github.io/tearsheet/zine/parts/not-found.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.nf { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.nf { text-align: center; }
.nf-code { margin: 0; font-size: clamp(72px, 14vw, 140px); font-weight: 900; line-height: 0.9; letter-spacing: -0.05em; color: var(--ui-accent); }
.nf h1 { margin: 16px 0 8px; font-size: clamp(24px, 3.4vw, 36px); letter-spacing: -0.02em; }
.nf-text { max-width: 44ch; margin: 0 auto 24px; color: var(--ui-muted); }
.nf-search { display: flex; gap: 8px; max-width: 420px; margin: 0 auto 20px; }
.nf-search input { flex: 1; min-width: 0; min-height: 44px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.nf-search input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.nf-search button { padding: 0 18px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.nf-search button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; margin: 0; padding: 0; list-style: none; }
.nf-links a { font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
```

## React

`NotFound.jsx`

```jsx
/* tearsheet not-found vc3139eca · https://qusaialjbali.github.io/tearsheet/zine/parts/not-found.html */
import './NotFound.css';

export function NotFound() {
  return (
    <section className="nf">
      <p className="nf-code" aria-hidden="true">404</p>
      <h1>That page has wandered off.</h1>
      <p className="nf-text">The link may be old, or we moved something. Try a search, or head somewhere useful.</p>
      <form className="nf-search" role="search">
        <label className="sr-only" htmlFor="nf-q">Search the site</label>
        <input id="nf-q" type="search" placeholder="Search the site" />
        <button type="submit">Search</button>
      </form>
      <ul className="nf-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Help centre</a></li>
        <li><a href="#">Contact support</a></li>
      </ul>
    </section>
  );
}
```

`NotFound.css`

```css
/* tearsheet not-found vc3139eca · https://qusaialjbali.github.io/tearsheet/zine/parts/not-found.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.nf { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.nf { text-align: center; }
.nf-code { margin: 0; font-size: clamp(72px, 14vw, 140px); font-weight: 900; line-height: 0.9; letter-spacing: -0.05em; color: var(--ui-accent); }
.nf h1 { margin: 16px 0 8px; font-size: clamp(24px, 3.4vw, 36px); letter-spacing: -0.02em; }
.nf-text { max-width: 44ch; margin: 0 auto 24px; color: var(--ui-muted); }
.nf-search { display: flex; gap: 8px; max-width: 420px; margin: 0 auto 20px; }
.nf-search input { flex: 1; min-width: 0; min-height: 44px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.nf-search input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.nf-search button { padding: 0 18px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.nf-search button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; margin: 0; padding: 0; list-style: none; }
.nf-links a { font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
```

## Vue

`NotFound.vue`

```vue
<!-- tearsheet not-found vc3139eca · https://qusaialjbali.github.io/tearsheet/zine/parts/not-found.html -->
<template>
  <section class="nf">
    <p class="nf-code" aria-hidden="true">404</p>
    <h1>That page has wandered off.</h1>
    <p class="nf-text">The link may be old, or we moved something. Try a search, or head somewhere useful.</p>
    <form class="nf-search" role="search">
      <label class="sr-only" for="nf-q">Search the site</label>
      <input id="nf-q" type="search" placeholder="Search the site">
      <button type="submit">Search</button>
    </form>
    <ul class="nf-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Help centre</a></li>
      <li><a href="#">Contact support</a></li>
    </ul>
  </section>
</template>

<style scoped>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.nf { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.nf { text-align: center; }
.nf-code { margin: 0; font-size: clamp(72px, 14vw, 140px); font-weight: 900; line-height: 0.9; letter-spacing: -0.05em; color: var(--ui-accent); }
.nf h1 { margin: 16px 0 8px; font-size: clamp(24px, 3.4vw, 36px); letter-spacing: -0.02em; }
.nf-text { max-width: 44ch; margin: 0 auto 24px; color: var(--ui-muted); }
.nf-search { display: flex; gap: 8px; max-width: 420px; margin: 0 auto 20px; }
.nf-search input { flex: 1; min-width: 0; min-height: 44px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.nf-search input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.nf-search button { padding: 0 18px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.nf-search button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; margin: 0; padding: 0; list-style: none; }
.nf-links a { font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
</style>
```

## Svelte

`NotFound.svelte`

```svelte
<!-- tearsheet not-found vc3139eca · https://qusaialjbali.github.io/tearsheet/zine/parts/not-found.html -->
<section class="nf">
  <p class="nf-code" aria-hidden="true">404</p>
  <h1>That page has wandered off.</h1>
  <p class="nf-text">The link may be old, or we moved something. Try a search, or head somewhere useful.</p>
  <form class="nf-search" role="search">
    <label class="sr-only" for="nf-q">Search the site</label>
    <input id="nf-q" type="search" placeholder="Search the site">
    <button type="submit">Search</button>
  </form>
  <ul class="nf-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Help centre</a></li>
    <li><a href="#">Contact support</a></li>
  </ul>
</section>

<style>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.nf { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.nf { text-align: center; }
.nf-code { margin: 0; font-size: clamp(72px, 14vw, 140px); font-weight: 900; line-height: 0.9; letter-spacing: -0.05em; color: var(--ui-accent); }
.nf h1 { margin: 16px 0 8px; font-size: clamp(24px, 3.4vw, 36px); letter-spacing: -0.02em; }
.nf-text { max-width: 44ch; margin: 0 auto 24px; color: var(--ui-muted); }
.nf-search { display: flex; gap: 8px; max-width: 420px; margin: 0 auto 20px; }
.nf-search input { flex: 1; min-width: 0; min-height: 44px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.nf-search input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.nf-search button { padding: 0 18px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.nf-search button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; margin: 0; padding: 0; list-style: none; }
.nf-links a { font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
</style>
```
