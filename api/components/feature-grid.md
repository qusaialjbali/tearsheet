# Feature grid (Tearsheet, Sections)

Six features as short, scannable blocks, each leading with what it does for the reader.

**Why it works:** Write the heading as the benefit (“Settle in one tap”), not the feature name. Six is a comfortable maximum; more and nobody reads them.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet feature-grid v48219d2b · https://qusaialjbali.github.io/tearsheet/zine/parts/feature-grid.html -->
<section class="features">
  <h2>Everything a shared budget needs</h2>
  <ul class="feat-grid">
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M7 8h7.5a3.5 3.5 0 0 1 0 7H8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Settle in one tap</h3><p>Pocketsplit finds the fewest payments to square everyone up.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Split any way</h3><p>Evenly, by shares, by exact amounts or by percentage.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Any currency</h3><p>Spend in yen, settle in euros, at the day’s real rate.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6ZM9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Snap the receipt</h3><p>Photos are attached to the expense, so nobody argues later.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Works offline</h3><p>Add expenses on the mountain; they sync when you are back.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11V8a7 7 0 0 1 14 0v3M5 11h14v10H5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Private by default</h3><p>Only people in a group can see it. No ads, ever.</p></li>
  </ul>
</section>
```

`styles.css`

```css
/* tearsheet feature-grid v48219d2b · https://qusaialjbali.github.io/tearsheet/zine/parts/feature-grid.html */
.features { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.features h2 { margin: 0 0 32px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px 32px; margin: 0; padding: 0; list-style: none; }
.feat-icon { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 12px; }
.feat-icon svg { width: 22px; height: 22px; }
.feat-grid h3 { margin: 0 0 6px; font-size: 17px; }
.feat-grid p { margin: 0; font-size: 15px; color: var(--ui-muted); }
```

## React

`FeatureGrid.jsx`

```jsx
/* tearsheet feature-grid v48219d2b · https://qusaialjbali.github.io/tearsheet/zine/parts/feature-grid.html */
import './FeatureGrid.css';

export function FeatureGrid() {
  return (
    <section className="features">
      <h2>Everything a shared budget needs</h2>
      <ul className="feat-grid">
        <li><span className="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M7 8h7.5a3.5 3.5 0 0 1 0 7H8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3>Settle in one tap</h3><p>Pocketsplit finds the fewest payments to square everyone up.</p></li>
        <li><span className="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3>Split any way</h3><p>Evenly, by shares, by exact amounts or by percentage.</p></li>
        <li><span className="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3>Any currency</h3><p>Spend in yen, settle in euros, at the day’s real rate.</p></li>
        <li><span className="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6ZM9 12h6M9 16h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3>Snap the receipt</h3><p>Photos are attached to the expense, so nobody argues later.</p></li>
        <li><span className="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3>Works offline</h3><p>Add expenses on the mountain; they sync when you are back.</p></li>
        <li><span className="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11V8a7 7 0 0 1 14 0v3M5 11h14v10H5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3>Private by default</h3><p>Only people in a group can see it. No ads, ever.</p></li>
      </ul>
    </section>
  );
}
```

`FeatureGrid.css`

```css
/* tearsheet feature-grid v48219d2b · https://qusaialjbali.github.io/tearsheet/zine/parts/feature-grid.html */
.features { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.features h2 { margin: 0 0 32px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px 32px; margin: 0; padding: 0; list-style: none; }
.feat-icon { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 12px; }
.feat-icon svg { width: 22px; height: 22px; }
.feat-grid h3 { margin: 0 0 6px; font-size: 17px; }
.feat-grid p { margin: 0; font-size: 15px; color: var(--ui-muted); }
```

## Vue

`FeatureGrid.vue`

```vue
<!-- tearsheet feature-grid v48219d2b · https://qusaialjbali.github.io/tearsheet/zine/parts/feature-grid.html -->
<template>
  <section class="features">
    <h2>Everything a shared budget needs</h2>
    <ul class="feat-grid">
      <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M7 8h7.5a3.5 3.5 0 0 1 0 7H8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Settle in one tap</h3><p>Pocketsplit finds the fewest payments to square everyone up.</p></li>
      <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Split any way</h3><p>Evenly, by shares, by exact amounts or by percentage.</p></li>
      <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Any currency</h3><p>Spend in yen, settle in euros, at the day’s real rate.</p></li>
      <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6ZM9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Snap the receipt</h3><p>Photos are attached to the expense, so nobody argues later.</p></li>
      <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Works offline</h3><p>Add expenses on the mountain; they sync when you are back.</p></li>
      <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11V8a7 7 0 0 1 14 0v3M5 11h14v10H5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Private by default</h3><p>Only people in a group can see it. No ads, ever.</p></li>
    </ul>
  </section>
</template>

<style scoped>
.features { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.features h2 { margin: 0 0 32px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px 32px; margin: 0; padding: 0; list-style: none; }
.feat-icon { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 12px; }
.feat-icon svg { width: 22px; height: 22px; }
.feat-grid h3 { margin: 0 0 6px; font-size: 17px; }
.feat-grid p { margin: 0; font-size: 15px; color: var(--ui-muted); }
</style>
```

## Svelte

`FeatureGrid.svelte`

```svelte
<!-- tearsheet feature-grid v48219d2b · https://qusaialjbali.github.io/tearsheet/zine/parts/feature-grid.html -->
<section class="features">
  <h2>Everything a shared budget needs</h2>
  <ul class="feat-grid">
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M7 8h7.5a3.5 3.5 0 0 1 0 7H8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Settle in one tap</h3><p>Pocketsplit finds the fewest payments to square everyone up.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Split any way</h3><p>Evenly, by shares, by exact amounts or by percentage.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Any currency</h3><p>Spend in yen, settle in euros, at the day’s real rate.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6ZM9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Snap the receipt</h3><p>Photos are attached to the expense, so nobody argues later.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Works offline</h3><p>Add expenses on the mountain; they sync when you are back.</p></li>
    <li><span class="feat-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11V8a7 7 0 0 1 14 0v3M5 11h14v10H5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Private by default</h3><p>Only people in a group can see it. No ads, ever.</p></li>
  </ul>
</section>

<style>
.features { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.features h2 { margin: 0 0 32px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px 32px; margin: 0; padding: 0; list-style: none; }
.feat-icon { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 12px; }
.feat-icon svg { width: 22px; height: 22px; }
.feat-grid h3 { margin: 0 0 6px; font-size: 17px; }
.feat-grid p { margin: 0; font-size: 15px; color: var(--ui-muted); }
</style>
```
