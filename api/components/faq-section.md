# FAQ section (Tearsheet, Sections)

Questions people actually ask, in two columns: a heading and contact route on one side, answers on the other.

**Why it works:** Write questions in the reader’s words. Always end with a way to ask something that is not listed. <details> keeps it accessible and searchable with Ctrl+F.

**Checked:** axe clean in light and dark; tightest text contrast 5.93:1 (needs 4.5:1); 5 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet faq-section vb8b00fca · https://qusaialjbali.github.io/tearsheet/zine/parts/faq-section.html -->
<section class="faq">
  <div class="faq-intro">
    <h2>Questions, answered</h2>
    <p>Can’t find yours? <a href="#">Ask us</a>. A person replies within a day.</p>
  </div>
  <div class="faq-list">
    <details open><summary>Is it really free?</summary><p>Yes, for groups of up to five people. Bigger groups pay $3 a month per group, not per person.</p></details>
    <details><summary>Do my friends need an account?</summary><p>No. Share a link and they can view and add expenses as a guest.</p></details>
    <details><summary>Can I export my data?</summary><p>Any time, as CSV or PDF. If you leave, your data leaves with you.</p></details>
    <details><summary>Which currencies do you support?</summary><p>All 160 ISO currencies, converted at the daily reference rate.</p></details>
  </div>
</section>
```

`styles.css`

```css
/* tearsheet faq-section vb8b00fca · https://qusaialjbali.github.io/tearsheet/zine/parts/faq-section.html */
.faq { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.faq { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px; }
.faq h2 { margin: 0 0 10px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.faq-intro p { margin: 0; color: var(--ui-muted); }
.faq-intro a { color: var(--ui-accent); font-weight: 600; text-underline-offset: 3px; }
.faq-list details { border-bottom: 1px solid var(--ui-border); }
.faq-list summary { display: flex; justify-content: space-between; gap: 16px; padding: 16px 0; font-weight: 600; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: "+"; font-size: 22px; line-height: 1; color: var(--ui-muted); transition: transform 0.2s; }
.faq-list details[open] summary::after { transform: rotate(45deg); }
.faq-list summary:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.faq-list p { margin: 0 0 16px; color: var(--ui-muted); }
```

## React

`FaqSection.jsx`

```jsx
/* tearsheet faq-section vb8b00fca · https://qusaialjbali.github.io/tearsheet/zine/parts/faq-section.html */
import './FaqSection.css';

export function FaqSection() {
  return (
    <section className="faq">
      <div className="faq-intro">
        <h2>Questions, answered</h2>
        <p>Can’t find yours? <a href="#">Ask us</a>. A person replies within a day.</p>
      </div>
      <div className="faq-list">
        <details open><summary>Is it really free?</summary><p>Yes, for groups of up to five people. Bigger groups pay $3 a month per group, not per person.</p></details>
        <details><summary>Do my friends need an account?</summary><p>No. Share a link and they can view and add expenses as a guest.</p></details>
        <details><summary>Can I export my data?</summary><p>Any time, as CSV or PDF. If you leave, your data leaves with you.</p></details>
        <details><summary>Which currencies do you support?</summary><p>All 160 ISO currencies, converted at the daily reference rate.</p></details>
      </div>
    </section>
  );
}
```

`FaqSection.css`

```css
/* tearsheet faq-section vb8b00fca · https://qusaialjbali.github.io/tearsheet/zine/parts/faq-section.html */
.faq { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.faq { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px; }
.faq h2 { margin: 0 0 10px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.faq-intro p { margin: 0; color: var(--ui-muted); }
.faq-intro a { color: var(--ui-accent); font-weight: 600; text-underline-offset: 3px; }
.faq-list details { border-bottom: 1px solid var(--ui-border); }
.faq-list summary { display: flex; justify-content: space-between; gap: 16px; padding: 16px 0; font-weight: 600; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: "+"; font-size: 22px; line-height: 1; color: var(--ui-muted); transition: transform 0.2s; }
.faq-list details[open] summary::after { transform: rotate(45deg); }
.faq-list summary:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.faq-list p { margin: 0 0 16px; color: var(--ui-muted); }
```

## Vue

`FaqSection.vue`

```vue
<!-- tearsheet faq-section vb8b00fca · https://qusaialjbali.github.io/tearsheet/zine/parts/faq-section.html -->
<template>
  <section class="faq">
    <div class="faq-intro">
      <h2>Questions, answered</h2>
      <p>Can’t find yours? <a href="#">Ask us</a>. A person replies within a day.</p>
    </div>
    <div class="faq-list">
      <details open><summary>Is it really free?</summary><p>Yes, for groups of up to five people. Bigger groups pay $3 a month per group, not per person.</p></details>
      <details><summary>Do my friends need an account?</summary><p>No. Share a link and they can view and add expenses as a guest.</p></details>
      <details><summary>Can I export my data?</summary><p>Any time, as CSV or PDF. If you leave, your data leaves with you.</p></details>
      <details><summary>Which currencies do you support?</summary><p>All 160 ISO currencies, converted at the daily reference rate.</p></details>
    </div>
  </section>
</template>

<style scoped>
.faq { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.faq { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px; }
.faq h2 { margin: 0 0 10px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.faq-intro p { margin: 0; color: var(--ui-muted); }
.faq-intro a { color: var(--ui-accent); font-weight: 600; text-underline-offset: 3px; }
.faq-list details { border-bottom: 1px solid var(--ui-border); }
.faq-list summary { display: flex; justify-content: space-between; gap: 16px; padding: 16px 0; font-weight: 600; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: "+"; font-size: 22px; line-height: 1; color: var(--ui-muted); transition: transform 0.2s; }
.faq-list details[open] summary::after { transform: rotate(45deg); }
.faq-list summary:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.faq-list p { margin: 0 0 16px; color: var(--ui-muted); }
</style>
```

## Svelte

`FaqSection.svelte`

```svelte
<!-- tearsheet faq-section vb8b00fca · https://qusaialjbali.github.io/tearsheet/zine/parts/faq-section.html -->
<section class="faq">
  <div class="faq-intro">
    <h2>Questions, answered</h2>
    <p>Can’t find yours? <a href="#">Ask us</a>. A person replies within a day.</p>
  </div>
  <div class="faq-list">
    <details open><summary>Is it really free?</summary><p>Yes, for groups of up to five people. Bigger groups pay $3 a month per group, not per person.</p></details>
    <details><summary>Do my friends need an account?</summary><p>No. Share a link and they can view and add expenses as a guest.</p></details>
    <details><summary>Can I export my data?</summary><p>Any time, as CSV or PDF. If you leave, your data leaves with you.</p></details>
    <details><summary>Which currencies do you support?</summary><p>All 160 ISO currencies, converted at the daily reference rate.</p></details>
  </div>
</section>

<style>
.faq { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.faq { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px; }
.faq h2 { margin: 0 0 10px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.faq-intro p { margin: 0; color: var(--ui-muted); }
.faq-intro a { color: var(--ui-accent); font-weight: 600; text-underline-offset: 3px; }
.faq-list details { border-bottom: 1px solid var(--ui-border); }
.faq-list summary { display: flex; justify-content: space-between; gap: 16px; padding: 16px 0; font-weight: 600; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: "+"; font-size: 22px; line-height: 1; color: var(--ui-muted); transition: transform 0.2s; }
.faq-list details[open] summary::after { transform: rotate(45deg); }
.faq-list summary:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.faq-list p { margin: 0 0 16px; color: var(--ui-muted); }
</style>
```
