# Logo strip (Tearsheet, Sections)

A quiet row of customer logos under a plain label, greyed so it never competes with the content.

**Why it works:** Only show logos you have permission to show. These are made-up wordmarks. Keep logos monochrome and the same visual weight.

**Checked:** axe clean in light and dark; tightest text contrast 4.62:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet logo-strip v94b0425b · https://qusaialjbali.github.io/tearsheet/zine/parts/logo-strip.html -->
<section class="logos" aria-labelledby="logos-title">
  <p id="logos-title">Used by teams at (example names)</p>
  <ul>
    <li class="lg1">northwind</li>
    <li class="lg2">GLOBEX</li>
    <li class="lg3">Initech</li>
    <li class="lg4">umbra&amp;co</li>
    <li class="lg5">HOOLI</li>
  </ul>
</section>
```

`styles.css`

```css
/* tearsheet logo-strip v94b0425b · https://qusaialjbali.github.io/tearsheet/zine/parts/logo-strip.html */
.logos { width: 100%; padding: 28px 20px; text-align: center; }
.logos p { margin: 0 0 18px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: var(--ui-muted); }
.logos ul { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 18px 44px; margin: 0; padding: 0; list-style: none; color: var(--ui-muted); opacity: 0.85; }
.logos li { font-size: 22px; }
.lg1 { font-weight: 800; letter-spacing: -0.04em; }
.lg2 { font-weight: 900; letter-spacing: 0.12em; font-size: 18px !important; }
.lg3 { font-family: Georgia, serif; font-style: italic; }
.lg4 { font-weight: 300; letter-spacing: 0.02em; }
.lg5 { font-weight: 700; font-family: ui-monospace, Consolas, monospace; }
```

## React

`LogoStrip.jsx`

```jsx
/* tearsheet logo-strip v94b0425b · https://qusaialjbali.github.io/tearsheet/zine/parts/logo-strip.html */
import './LogoStrip.css';

export function LogoStrip() {
  return (
    <section className="logos" aria-labelledby="logos-title">
      <p id="logos-title">Used by teams at (example names)</p>
      <ul>
        <li className="lg1">northwind</li>
        <li className="lg2">GLOBEX</li>
        <li className="lg3">Initech</li>
        <li className="lg4">umbra&amp;co</li>
        <li className="lg5">HOOLI</li>
      </ul>
    </section>
  );
}
```

`LogoStrip.css`

```css
/* tearsheet logo-strip v94b0425b · https://qusaialjbali.github.io/tearsheet/zine/parts/logo-strip.html */
.logos { width: 100%; padding: 28px 20px; text-align: center; }
.logos p { margin: 0 0 18px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: var(--ui-muted); }
.logos ul { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 18px 44px; margin: 0; padding: 0; list-style: none; color: var(--ui-muted); opacity: 0.85; }
.logos li { font-size: 22px; }
.lg1 { font-weight: 800; letter-spacing: -0.04em; }
.lg2 { font-weight: 900; letter-spacing: 0.12em; font-size: 18px !important; }
.lg3 { font-family: Georgia, serif; font-style: italic; }
.lg4 { font-weight: 300; letter-spacing: 0.02em; }
.lg5 { font-weight: 700; font-family: ui-monospace, Consolas, monospace; }
```

## Vue

`LogoStrip.vue`

```vue
<!-- tearsheet logo-strip v94b0425b · https://qusaialjbali.github.io/tearsheet/zine/parts/logo-strip.html -->
<template>
  <section class="logos" aria-labelledby="logos-title">
    <p id="logos-title">Used by teams at (example names)</p>
    <ul>
      <li class="lg1">northwind</li>
      <li class="lg2">GLOBEX</li>
      <li class="lg3">Initech</li>
      <li class="lg4">umbra&amp;co</li>
      <li class="lg5">HOOLI</li>
    </ul>
  </section>
</template>

<style scoped>
.logos { width: 100%; padding: 28px 20px; text-align: center; }
.logos p { margin: 0 0 18px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: var(--ui-muted); }
.logos ul { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 18px 44px; margin: 0; padding: 0; list-style: none; color: var(--ui-muted); opacity: 0.85; }
.logos li { font-size: 22px; }
.lg1 { font-weight: 800; letter-spacing: -0.04em; }
.lg2 { font-weight: 900; letter-spacing: 0.12em; font-size: 18px !important; }
.lg3 { font-family: Georgia, serif; font-style: italic; }
.lg4 { font-weight: 300; letter-spacing: 0.02em; }
.lg5 { font-weight: 700; font-family: ui-monospace, Consolas, monospace; }
</style>
```

## Svelte

`LogoStrip.svelte`

```svelte
<!-- tearsheet logo-strip v94b0425b · https://qusaialjbali.github.io/tearsheet/zine/parts/logo-strip.html -->
<section class="logos" aria-labelledby="logos-title">
  <p id="logos-title">Used by teams at (example names)</p>
  <ul>
    <li class="lg1">northwind</li>
    <li class="lg2">GLOBEX</li>
    <li class="lg3">Initech</li>
    <li class="lg4">umbra&amp;co</li>
    <li class="lg5">HOOLI</li>
  </ul>
</section>

<style>
.logos { width: 100%; padding: 28px 20px; text-align: center; }
.logos p { margin: 0 0 18px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: var(--ui-muted); }
.logos ul { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 18px 44px; margin: 0; padding: 0; list-style: none; color: var(--ui-muted); opacity: 0.85; }
.logos li { font-size: 22px; }
.lg1 { font-weight: 800; letter-spacing: -0.04em; }
.lg2 { font-weight: 900; letter-spacing: 0.12em; font-size: 18px !important; }
.lg3 { font-family: Georgia, serif; font-style: italic; }
.lg4 { font-weight: 300; letter-spacing: 0.02em; }
.lg5 { font-weight: 700; font-family: ui-monospace, Consolas, monospace; }
</style>
```
