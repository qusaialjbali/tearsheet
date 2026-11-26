# Changelog (Tearsheet, Sections)

Release notes grouped by date, each change tagged New, Improved or Fixed.

**Why it works:** Lead with what changed for the user, not the ticket title. Dates are machine-readable <time> elements so feeds and search engines understand them.

**Checked:** axe clean in light and dark; tightest text contrast 4.79:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet changelog v72a745d0 · https://qusaialjbali.github.io/tearsheet/zine/parts/changelog.html -->
<section class="changelog">
  <h2>What’s new</h2>
  <article class="cl-entry">
    <time datetime="2026-11-20">20 Nov 2026</time>
    <div>
      <h3>Version 3.2</h3>
      <ul>
        <li><span class="cl-tag new">New</span> Split by percentage, not just shares.</li>
        <li><span class="cl-tag imp">Improved</span> Receipts load twice as fast on slow connections.</li>
        <li><span class="cl-tag fix">Fixed</span> Totals no longer round the wrong way in yen.</li>
      </ul>
    </div>
  </article>
  <article class="cl-entry">
    <time datetime="2026-10-28">28 Oct 2026</time>
    <div>
      <h3>Version 3.1</h3>
      <ul>
        <li><span class="cl-tag new">New</span> Dark mode follows your system setting.</li>
        <li><span class="cl-tag fix">Fixed</span> Guests can now attach photos.</li>
      </ul>
    </div>
  </article>
</section>
```

`styles.css`

```css
/* tearsheet changelog v72a745d0 · https://qusaialjbali.github.io/tearsheet/zine/parts/changelog.html */
.changelog { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.changelog h2 { margin: 0 0 24px; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.cl-entry { display: grid; grid-template-columns: 130px 1fr; gap: 20px; padding: 20px 0; border-top: 1px solid var(--ui-border); }
.cl-entry time { font-size: 14px; font-weight: 600; color: var(--ui-muted); }
.cl-entry h3 { margin: 0 0 10px; font-size: 17px; }
.cl-entry ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.cl-entry li { font-size: 15px; }
.cl-tag { display: inline-block; min-width: 76px; margin-right: 8px; padding: 1px 8px; text-align: center; font-size: 12px; font-weight: 700; border-radius: 999px; }
.cl-tag.new { color: var(--ui-accent); background: var(--ui-accent-soft); }
.cl-tag.imp { color: var(--ui-success); background: var(--ui-success-soft); }
.cl-tag.fix { color: var(--ui-warning); background: var(--ui-warning-soft); }
@media (max-width: 520px) { .cl-entry { grid-template-columns: 1fr; gap: 6px; } }
```

## React

`Changelog.jsx`

```jsx
/* tearsheet changelog v72a745d0 · https://qusaialjbali.github.io/tearsheet/zine/parts/changelog.html */
import './Changelog.css';

export function Changelog() {
  return (
    <section className="changelog">
      <h2>What’s new</h2>
      <article className="cl-entry">
        <time dateTime="2026-11-20">20 Nov 2026</time>
        <div>
          <h3>Version 3.2</h3>
          <ul>
            <li><span className="cl-tag new">New</span> Split by percentage, not just shares.</li>
            <li><span className="cl-tag imp">Improved</span> Receipts load twice as fast on slow connections.</li>
            <li><span className="cl-tag fix">Fixed</span> Totals no longer round the wrong way in yen.</li>
          </ul>
        </div>
      </article>
      <article className="cl-entry">
        <time dateTime="2026-10-28">28 Oct 2026</time>
        <div>
          <h3>Version 3.1</h3>
          <ul>
            <li><span className="cl-tag new">New</span> Dark mode follows your system setting.</li>
            <li><span className="cl-tag fix">Fixed</span> Guests can now attach photos.</li>
          </ul>
        </div>
      </article>
    </section>
  );
}
```

`Changelog.css`

```css
/* tearsheet changelog v72a745d0 · https://qusaialjbali.github.io/tearsheet/zine/parts/changelog.html */
.changelog { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.changelog h2 { margin: 0 0 24px; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.cl-entry { display: grid; grid-template-columns: 130px 1fr; gap: 20px; padding: 20px 0; border-top: 1px solid var(--ui-border); }
.cl-entry time { font-size: 14px; font-weight: 600; color: var(--ui-muted); }
.cl-entry h3 { margin: 0 0 10px; font-size: 17px; }
.cl-entry ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.cl-entry li { font-size: 15px; }
.cl-tag { display: inline-block; min-width: 76px; margin-right: 8px; padding: 1px 8px; text-align: center; font-size: 12px; font-weight: 700; border-radius: 999px; }
.cl-tag.new { color: var(--ui-accent); background: var(--ui-accent-soft); }
.cl-tag.imp { color: var(--ui-success); background: var(--ui-success-soft); }
.cl-tag.fix { color: var(--ui-warning); background: var(--ui-warning-soft); }
@media (max-width: 520px) { .cl-entry { grid-template-columns: 1fr; gap: 6px; } }
```

## Vue

`Changelog.vue`

```vue
<!-- tearsheet changelog v72a745d0 · https://qusaialjbali.github.io/tearsheet/zine/parts/changelog.html -->
<template>
  <section class="changelog">
    <h2>What’s new</h2>
    <article class="cl-entry">
      <time datetime="2026-11-20">20 Nov 2026</time>
      <div>
        <h3>Version 3.2</h3>
        <ul>
          <li><span class="cl-tag new">New</span> Split by percentage, not just shares.</li>
          <li><span class="cl-tag imp">Improved</span> Receipts load twice as fast on slow connections.</li>
          <li><span class="cl-tag fix">Fixed</span> Totals no longer round the wrong way in yen.</li>
        </ul>
      </div>
    </article>
    <article class="cl-entry">
      <time datetime="2026-10-28">28 Oct 2026</time>
      <div>
        <h3>Version 3.1</h3>
        <ul>
          <li><span class="cl-tag new">New</span> Dark mode follows your system setting.</li>
          <li><span class="cl-tag fix">Fixed</span> Guests can now attach photos.</li>
        </ul>
      </div>
    </article>
  </section>
</template>

<style scoped>
.changelog { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.changelog h2 { margin: 0 0 24px; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.cl-entry { display: grid; grid-template-columns: 130px 1fr; gap: 20px; padding: 20px 0; border-top: 1px solid var(--ui-border); }
.cl-entry time { font-size: 14px; font-weight: 600; color: var(--ui-muted); }
.cl-entry h3 { margin: 0 0 10px; font-size: 17px; }
.cl-entry ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.cl-entry li { font-size: 15px; }
.cl-tag { display: inline-block; min-width: 76px; margin-right: 8px; padding: 1px 8px; text-align: center; font-size: 12px; font-weight: 700; border-radius: 999px; }
.cl-tag.new { color: var(--ui-accent); background: var(--ui-accent-soft); }
.cl-tag.imp { color: var(--ui-success); background: var(--ui-success-soft); }
.cl-tag.fix { color: var(--ui-warning); background: var(--ui-warning-soft); }
@media (max-width: 520px) { .cl-entry { grid-template-columns: 1fr; gap: 6px; } }
</style>
```

## Svelte

`Changelog.svelte`

```svelte
<!-- tearsheet changelog v72a745d0 · https://qusaialjbali.github.io/tearsheet/zine/parts/changelog.html -->
<section class="changelog">
  <h2>What’s new</h2>
  <article class="cl-entry">
    <time datetime="2026-11-20">20 Nov 2026</time>
    <div>
      <h3>Version 3.2</h3>
      <ul>
        <li><span class="cl-tag new">New</span> Split by percentage, not just shares.</li>
        <li><span class="cl-tag imp">Improved</span> Receipts load twice as fast on slow connections.</li>
        <li><span class="cl-tag fix">Fixed</span> Totals no longer round the wrong way in yen.</li>
      </ul>
    </div>
  </article>
  <article class="cl-entry">
    <time datetime="2026-10-28">28 Oct 2026</time>
    <div>
      <h3>Version 3.1</h3>
      <ul>
        <li><span class="cl-tag new">New</span> Dark mode follows your system setting.</li>
        <li><span class="cl-tag fix">Fixed</span> Guests can now attach photos.</li>
      </ul>
    </div>
  </article>
</section>

<style>
.changelog { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.changelog h2 { margin: 0 0 24px; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.cl-entry { display: grid; grid-template-columns: 130px 1fr; gap: 20px; padding: 20px 0; border-top: 1px solid var(--ui-border); }
.cl-entry time { font-size: 14px; font-weight: 600; color: var(--ui-muted); }
.cl-entry h3 { margin: 0 0 10px; font-size: 17px; }
.cl-entry ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.cl-entry li { font-size: 15px; }
.cl-tag { display: inline-block; min-width: 76px; margin-right: 8px; padding: 1px 8px; text-align: center; font-size: 12px; font-weight: 700; border-radius: 999px; }
.cl-tag.new { color: var(--ui-accent); background: var(--ui-accent-soft); }
.cl-tag.imp { color: var(--ui-success); background: var(--ui-success-soft); }
.cl-tag.fix { color: var(--ui-warning); background: var(--ui-warning-soft); }
@media (max-width: 520px) { .cl-entry { grid-template-columns: 1fr; gap: 6px; } }
</style>
```
