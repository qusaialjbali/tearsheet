# Hero, centred (Tearsheet, Sections)

An opening section with one clear promise, a short explanation and one main action.

**Why it works:** One primary button, one quiet secondary link. The line under the buttons answers the first worry (cost, card, commitment) before anyone has to ask.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet hero-centered v77ecfe03 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-centered.html -->
<section class="hero-c">
  <h1>Split costs without the awkward spreadsheet.</h1>
  <p class="hero-c-lede">Pocketsplit keeps a running total for trips, flats and teams, and tells everyone exactly who owes what.</p>
  <div class="hero-c-actions">
    <a class="btn btn-primary" href="#">Start a shared budget</a>
    <a class="btn btn-secondary" href="#">See how it works</a>
  </div>
  <p class="hero-c-note">Free for up to 5 people · No card needed</p>
</section>
```

`styles.css`

```css
/* tearsheet hero-centered v77ecfe03 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-centered.html */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 46px; padding: 0 22px; font: inherit; font-size: 15px; font-weight: 600; text-decoration: none;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.hero-c { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.hero-c { text-align: center; }
.hero-c h1 { max-width: 16ch; margin: 0 auto 16px; font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-c-lede { max-width: 52ch; margin: 0 auto 28px; font-size: clamp(16px, 2vw, 19px); color: var(--ui-muted); }
.hero-c-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.hero-c-note { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
```

## React

`HeroCentered.jsx`

```jsx
/* tearsheet hero-centered v77ecfe03 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-centered.html */
import './HeroCentered.css';

export function HeroCentered() {
  return (
    <section className="hero-c">
      <h1>Split costs without the awkward spreadsheet.</h1>
      <p className="hero-c-lede">Pocketsplit keeps a running total for trips, flats and teams, and tells everyone exactly who owes what.</p>
      <div className="hero-c-actions">
        <a className="btn btn-primary" href="#">Start a shared budget</a>
        <a className="btn btn-secondary" href="#">See how it works</a>
      </div>
      <p className="hero-c-note">Free for up to 5 people · No card needed</p>
    </section>
  );
}
```

`HeroCentered.css`

```css
/* tearsheet hero-centered v77ecfe03 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-centered.html */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 46px; padding: 0 22px; font: inherit; font-size: 15px; font-weight: 600; text-decoration: none;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.hero-c { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.hero-c { text-align: center; }
.hero-c h1 { max-width: 16ch; margin: 0 auto 16px; font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-c-lede { max-width: 52ch; margin: 0 auto 28px; font-size: clamp(16px, 2vw, 19px); color: var(--ui-muted); }
.hero-c-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.hero-c-note { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
```

## Vue

`HeroCentered.vue`

```vue
<!-- tearsheet hero-centered v77ecfe03 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-centered.html -->
<template>
  <section class="hero-c">
    <h1>Split costs without the awkward spreadsheet.</h1>
    <p class="hero-c-lede">Pocketsplit keeps a running total for trips, flats and teams, and tells everyone exactly who owes what.</p>
    <div class="hero-c-actions">
      <a class="btn btn-primary" href="#">Start a shared budget</a>
      <a class="btn btn-secondary" href="#">See how it works</a>
    </div>
    <p class="hero-c-note">Free for up to 5 people · No card needed</p>
  </section>
</template>

<style scoped>
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 46px; padding: 0 22px; font: inherit; font-size: 15px; font-weight: 600; text-decoration: none;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.hero-c { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.hero-c { text-align: center; }
.hero-c h1 { max-width: 16ch; margin: 0 auto 16px; font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-c-lede { max-width: 52ch; margin: 0 auto 28px; font-size: clamp(16px, 2vw, 19px); color: var(--ui-muted); }
.hero-c-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.hero-c-note { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
</style>
```

## Svelte

`HeroCentered.svelte`

```svelte
<!-- tearsheet hero-centered v77ecfe03 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-centered.html -->
<section class="hero-c">
  <h1>Split costs without the awkward spreadsheet.</h1>
  <p class="hero-c-lede">Pocketsplit keeps a running total for trips, flats and teams, and tells everyone exactly who owes what.</p>
  <div class="hero-c-actions">
    <a class="btn btn-primary" href="#">Start a shared budget</a>
    <a class="btn btn-secondary" href="#">See how it works</a>
  </div>
  <p class="hero-c-note">Free for up to 5 people · No card needed</p>
</section>

<style>
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 46px; padding: 0 22px; font: inherit; font-size: 15px; font-weight: 600; text-decoration: none;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.hero-c { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.hero-c { text-align: center; }
.hero-c h1 { max-width: 16ch; margin: 0 auto 16px; font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-c-lede { max-width: 52ch; margin: 0 auto 28px; font-size: clamp(16px, 2vw, 19px); color: var(--ui-muted); }
.hero-c-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.hero-c-note { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
</style>
```
