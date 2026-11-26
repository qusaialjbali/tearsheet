# Site footer (Tearsheet, Sections)

A footer with the brand line, grouped links, a language picker and the legal row.

**Why it works:** Group links under short headings people scan for (Product, Company, Help). Keep the legal links and the copyright on their own quiet row.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 13 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet site-footer v5907f40b · https://qusaialjbali.github.io/tearsheet/zine/parts/site-footer.html -->
<footer class="sfoot">
  <div class="sfoot-top">
    <div class="sfoot-brand">
      <p class="sfoot-logo">Pocketsplit</p>
      <p>Shared budgets without the awkward maths.</p>
    </div>
    <nav class="sfoot-cols" aria-label="Footer">
      <div><h3>Product</h3><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Changelog</a></li></ul></div>
      <div><h3>Company</h3><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul></div>
      <div><h3>Help</h3><ul><li><a href="#">Support</a></li><li><a href="#">Status</a></li><li><a href="#">Contact</a></li></ul></div>
    </nav>
  </div>
  <div class="sfoot-bottom">
    <p>© 2026 Pocketsplit Ltd.</p>
    <ul><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Cookies</a></li></ul>
    <label class="sfoot-lang"><span class="sr-only">Language</span>
      <select><option>English</option><option>Español</option><option>Deutsch</option><option>العربية</option></select>
    </label>
  </div>
</footer>
```

`styles.css`

```css
/* tearsheet site-footer v5907f40b · https://qusaialjbali.github.io/tearsheet/zine/parts/site-footer.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.sfoot { width: 100%; padding: 40px clamp(20px, 4vw, 40px) 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sfoot a { color: var(--ui-muted); text-decoration: none; }
.sfoot a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.sfoot a:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.sfoot-top { display: grid; grid-template-columns: minmax(200px, 1fr) 2fr; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--ui-border); }
.sfoot-logo { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: var(--ui-text) !important; }
.sfoot-brand p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.sfoot-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; }
.sfoot-cols h3 { margin: 0 0 10px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; }
.sfoot-cols ul, .sfoot-bottom ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.sfoot-bottom { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; padding-top: 20px; font-size: 13px; color: var(--ui-muted); }
.sfoot-bottom p { margin: 0; }
.sfoot-bottom ul { display: flex; gap: 18px; font-size: 13px; }
.sfoot-lang { margin-left: auto; }
.sfoot-lang select { padding: 6px 10px; font: inherit; font-size: 13px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: 6px; }
@media (max-width: 600px) { .sfoot-top { grid-template-columns: 1fr; } .sfoot-lang { margin-left: 0; } }
```

## React

`SiteFooter.jsx`

```jsx
/* tearsheet site-footer v5907f40b · https://qusaialjbali.github.io/tearsheet/zine/parts/site-footer.html */
import './SiteFooter.css';

export function SiteFooter() {
  return (
    <footer className="sfoot">
      <div className="sfoot-top">
        <div className="sfoot-brand">
          <p className="sfoot-logo">Pocketsplit</p>
          <p>Shared budgets without the awkward maths.</p>
        </div>
        <nav className="sfoot-cols" aria-label="Footer">
          <div><h3>Product</h3><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Changelog</a></li></ul></div>
          <div><h3>Company</h3><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul></div>
          <div><h3>Help</h3><ul><li><a href="#">Support</a></li><li><a href="#">Status</a></li><li><a href="#">Contact</a></li></ul></div>
        </nav>
      </div>
      <div className="sfoot-bottom">
        <p>© 2026 Pocketsplit Ltd.</p>
        <ul><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Cookies</a></li></ul>
        <label className="sfoot-lang"><span className="sr-only">Language</span>
          <select><option>English</option><option>Español</option><option>Deutsch</option><option>العربية</option></select>
        </label>
      </div>
    </footer>
  );
}
```

`SiteFooter.css`

```css
/* tearsheet site-footer v5907f40b · https://qusaialjbali.github.io/tearsheet/zine/parts/site-footer.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.sfoot { width: 100%; padding: 40px clamp(20px, 4vw, 40px) 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sfoot a { color: var(--ui-muted); text-decoration: none; }
.sfoot a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.sfoot a:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.sfoot-top { display: grid; grid-template-columns: minmax(200px, 1fr) 2fr; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--ui-border); }
.sfoot-logo { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: var(--ui-text) !important; }
.sfoot-brand p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.sfoot-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; }
.sfoot-cols h3 { margin: 0 0 10px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; }
.sfoot-cols ul, .sfoot-bottom ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.sfoot-bottom { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; padding-top: 20px; font-size: 13px; color: var(--ui-muted); }
.sfoot-bottom p { margin: 0; }
.sfoot-bottom ul { display: flex; gap: 18px; font-size: 13px; }
.sfoot-lang { margin-left: auto; }
.sfoot-lang select { padding: 6px 10px; font: inherit; font-size: 13px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: 6px; }
@media (max-width: 600px) { .sfoot-top { grid-template-columns: 1fr; } .sfoot-lang { margin-left: 0; } }
```

## Vue

`SiteFooter.vue`

```vue
<!-- tearsheet site-footer v5907f40b · https://qusaialjbali.github.io/tearsheet/zine/parts/site-footer.html -->
<template>
  <footer class="sfoot">
    <div class="sfoot-top">
      <div class="sfoot-brand">
        <p class="sfoot-logo">Pocketsplit</p>
        <p>Shared budgets without the awkward maths.</p>
      </div>
      <nav class="sfoot-cols" aria-label="Footer">
        <div><h3>Product</h3><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Changelog</a></li></ul></div>
        <div><h3>Company</h3><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul></div>
        <div><h3>Help</h3><ul><li><a href="#">Support</a></li><li><a href="#">Status</a></li><li><a href="#">Contact</a></li></ul></div>
      </nav>
    </div>
    <div class="sfoot-bottom">
      <p>© 2026 Pocketsplit Ltd.</p>
      <ul><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Cookies</a></li></ul>
      <label class="sfoot-lang"><span class="sr-only">Language</span>
        <select><option>English</option><option>Español</option><option>Deutsch</option><option>العربية</option></select>
      </label>
    </div>
  </footer>
</template>

<style scoped>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.sfoot { width: 100%; padding: 40px clamp(20px, 4vw, 40px) 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sfoot a { color: var(--ui-muted); text-decoration: none; }
.sfoot a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.sfoot a:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.sfoot-top { display: grid; grid-template-columns: minmax(200px, 1fr) 2fr; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--ui-border); }
.sfoot-logo { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: var(--ui-text) !important; }
.sfoot-brand p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.sfoot-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; }
.sfoot-cols h3 { margin: 0 0 10px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; }
.sfoot-cols ul, .sfoot-bottom ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.sfoot-bottom { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; padding-top: 20px; font-size: 13px; color: var(--ui-muted); }
.sfoot-bottom p { margin: 0; }
.sfoot-bottom ul { display: flex; gap: 18px; font-size: 13px; }
.sfoot-lang { margin-left: auto; }
.sfoot-lang select { padding: 6px 10px; font: inherit; font-size: 13px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: 6px; }
@media (max-width: 600px) { .sfoot-top { grid-template-columns: 1fr; } .sfoot-lang { margin-left: 0; } }
</style>
```

## Svelte

`SiteFooter.svelte`

```svelte
<!-- tearsheet site-footer v5907f40b · https://qusaialjbali.github.io/tearsheet/zine/parts/site-footer.html -->
<footer class="sfoot">
  <div class="sfoot-top">
    <div class="sfoot-brand">
      <p class="sfoot-logo">Pocketsplit</p>
      <p>Shared budgets without the awkward maths.</p>
    </div>
    <nav class="sfoot-cols" aria-label="Footer">
      <div><h3>Product</h3><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Changelog</a></li></ul></div>
      <div><h3>Company</h3><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul></div>
      <div><h3>Help</h3><ul><li><a href="#">Support</a></li><li><a href="#">Status</a></li><li><a href="#">Contact</a></li></ul></div>
    </nav>
  </div>
  <div class="sfoot-bottom">
    <p>© 2026 Pocketsplit Ltd.</p>
    <ul><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Cookies</a></li></ul>
    <label class="sfoot-lang"><span class="sr-only">Language</span>
      <select><option>English</option><option>Español</option><option>Deutsch</option><option>العربية</option></select>
    </label>
  </div>
</footer>

<style>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.sfoot { width: 100%; padding: 40px clamp(20px, 4vw, 40px) 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sfoot a { color: var(--ui-muted); text-decoration: none; }
.sfoot a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.sfoot a:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.sfoot-top { display: grid; grid-template-columns: minmax(200px, 1fr) 2fr; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--ui-border); }
.sfoot-logo { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: var(--ui-text) !important; }
.sfoot-brand p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.sfoot-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; }
.sfoot-cols h3 { margin: 0 0 10px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; }
.sfoot-cols ul, .sfoot-bottom ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.sfoot-bottom { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; padding-top: 20px; font-size: 13px; color: var(--ui-muted); }
.sfoot-bottom p { margin: 0; }
.sfoot-bottom ul { display: flex; gap: 18px; font-size: 13px; }
.sfoot-lang { margin-left: auto; }
.sfoot-lang select { padding: 6px 10px; font: inherit; font-size: 13px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: 6px; }
@media (max-width: 600px) { .sfoot-top { grid-template-columns: 1fr; } .sfoot-lang { margin-left: 0; } }
</style>
```
