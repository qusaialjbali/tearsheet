# Call-to-action band (Tearsheet, Sections)

A closing band in the accent colour that repeats the main action once more.

**Why it works:** Use it at the end of a long page, once. Repeat the same action as the hero, not a new one, and keep the reassurance line.

**Checked:** axe clean in light and dark; tightest text contrast 5.42:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet cta-band v1d7e969e · https://qusaialjbali.github.io/tearsheet/zine/parts/cta-band.html -->
<section class="cta-band">
  <div>
    <h2>Your next trip, already settled.</h2>
    <p>Set up a group in under a minute. Free for up to five people.</p>
  </div>
  <a class="cta-band-btn" href="#">Start a shared budget</a>
</section>
```

`styles.css`

```css
/* tearsheet cta-band v1d7e969e · https://qusaialjbali.github.io/tearsheet/zine/parts/cta-band.html */
.cta-band {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px 32px;
  width: 100%; padding: clamp(28px, 5vw, 48px); color: var(--ui-accent-text); background: var(--ui-accent); border-radius: var(--ui-radius);
}
.cta-band h2 { margin: 0 0 6px; font-size: clamp(22px, 3vw, 32px); letter-spacing: -0.02em; }
.cta-band p { margin: 0; opacity: 0.9; }
.cta-band-btn {
  display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; font-weight: 700; text-decoration: none;
  color: var(--ui-accent); background: var(--ui-accent-text); border-radius: var(--ui-radius-sm);
}
.cta-band-btn:hover { opacity: 0.92; }
.cta-band-btn:focus-visible { outline: 3px solid var(--ui-accent-text); outline-offset: 3px; }
```

## React

`CtaBand.jsx`

```jsx
/* tearsheet cta-band v1d7e969e · https://qusaialjbali.github.io/tearsheet/zine/parts/cta-band.html */
import './CtaBand.css';

export function CtaBand() {
  return (
    <section className="cta-band">
      <div>
        <h2>Your next trip, already settled.</h2>
        <p>Set up a group in under a minute. Free for up to five people.</p>
      </div>
      <a className="cta-band-btn" href="#">Start a shared budget</a>
    </section>
  );
}
```

`CtaBand.css`

```css
/* tearsheet cta-band v1d7e969e · https://qusaialjbali.github.io/tearsheet/zine/parts/cta-band.html */
.cta-band {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px 32px;
  width: 100%; padding: clamp(28px, 5vw, 48px); color: var(--ui-accent-text); background: var(--ui-accent); border-radius: var(--ui-radius);
}
.cta-band h2 { margin: 0 0 6px; font-size: clamp(22px, 3vw, 32px); letter-spacing: -0.02em; }
.cta-band p { margin: 0; opacity: 0.9; }
.cta-band-btn {
  display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; font-weight: 700; text-decoration: none;
  color: var(--ui-accent); background: var(--ui-accent-text); border-radius: var(--ui-radius-sm);
}
.cta-band-btn:hover { opacity: 0.92; }
.cta-band-btn:focus-visible { outline: 3px solid var(--ui-accent-text); outline-offset: 3px; }
```

## Vue

`CtaBand.vue`

```vue
<!-- tearsheet cta-band v1d7e969e · https://qusaialjbali.github.io/tearsheet/zine/parts/cta-band.html -->
<template>
  <section class="cta-band">
    <div>
      <h2>Your next trip, already settled.</h2>
      <p>Set up a group in under a minute. Free for up to five people.</p>
    </div>
    <a class="cta-band-btn" href="#">Start a shared budget</a>
  </section>
</template>

<style scoped>
.cta-band {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px 32px;
  width: 100%; padding: clamp(28px, 5vw, 48px); color: var(--ui-accent-text); background: var(--ui-accent); border-radius: var(--ui-radius);
}
.cta-band h2 { margin: 0 0 6px; font-size: clamp(22px, 3vw, 32px); letter-spacing: -0.02em; }
.cta-band p { margin: 0; opacity: 0.9; }
.cta-band-btn {
  display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; font-weight: 700; text-decoration: none;
  color: var(--ui-accent); background: var(--ui-accent-text); border-radius: var(--ui-radius-sm);
}
.cta-band-btn:hover { opacity: 0.92; }
.cta-band-btn:focus-visible { outline: 3px solid var(--ui-accent-text); outline-offset: 3px; }
</style>
```

## Svelte

`CtaBand.svelte`

```svelte
<!-- tearsheet cta-band v1d7e969e · https://qusaialjbali.github.io/tearsheet/zine/parts/cta-band.html -->
<section class="cta-band">
  <div>
    <h2>Your next trip, already settled.</h2>
    <p>Set up a group in under a minute. Free for up to five people.</p>
  </div>
  <a class="cta-band-btn" href="#">Start a shared budget</a>
</section>

<style>
.cta-band {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px 32px;
  width: 100%; padding: clamp(28px, 5vw, 48px); color: var(--ui-accent-text); background: var(--ui-accent); border-radius: var(--ui-radius);
}
.cta-band h2 { margin: 0 0 6px; font-size: clamp(22px, 3vw, 32px); letter-spacing: -0.02em; }
.cta-band p { margin: 0; opacity: 0.9; }
.cta-band-btn {
  display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; font-weight: 700; text-decoration: none;
  color: var(--ui-accent); background: var(--ui-accent-text); border-radius: var(--ui-radius-sm);
}
.cta-band-btn:hover { opacity: 0.92; }
.cta-band-btn:focus-visible { outline: 3px solid var(--ui-accent-text); outline-offset: 3px; }
</style>
```
