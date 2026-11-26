# Card (Tearsheet, Content)

Content card with media, eyebrow, title, summary and a link footer.

**Why it works:** Keep one clear link per card. Put the meta line (category, read time) above the title as a quick scanning aid.

**Checked:** axe clean in light and dark; tightest text contrast 5.93:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet card v34135998 · https://qusaialjbali.github.io/tearsheet/zine/parts/card.html -->
<article class="card">
  <div class="card-media" aria-hidden="true"></div>
  <div class="card-body">
    <p class="card-eyebrow">Guide · 6 min read</p>
    <h3 class="card-title">Designing forms people finish</h3>
    <p class="card-text">Labels, errors and layout patterns that cut abandonment without adding friction.</p>
  </div>
  <div class="card-footer">
    <a class="card-link" href="#">Read article <span aria-hidden="true">→</span></a>
  </div>
</article>
```

`styles.css`

```css
/* tearsheet card v34135998 · https://qusaialjbali.github.io/tearsheet/zine/parts/card.html */
.card {
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow);
}
.card-media {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(circle at 30% 40%, var(--ui-accent) 0 18%, transparent 19%),
    linear-gradient(135deg, var(--ui-accent-soft), var(--ui-surface-2));
}
.card-body { padding: 20px 20px 8px; }
.card-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
}
.card-title { margin: 0 0 8px; font-size: 19px; line-height: 1.3; color: var(--ui-text); }
.card-text { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.card-footer { padding: 12px 20px 20px; }
.card-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent);
  text-decoration: none;
  border-radius: 4px;
}
.card-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.card-link:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## React

`Card.jsx`

```jsx
/* tearsheet card v34135998 · https://qusaialjbali.github.io/tearsheet/zine/parts/card.html */
import './Card.css';

export function Card() {
  return (
    <article className="card">
      <div className="card-media" aria-hidden="true"></div>
      <div className="card-body">
        <p className="card-eyebrow">Guide · 6 min read</p>
        <h3 className="card-title">Designing forms people finish</h3>
        <p className="card-text">Labels, errors and layout patterns that cut abandonment without adding friction.</p>
      </div>
      <div className="card-footer">
        <a className="card-link" href="#">Read article <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}
```

`Card.css`

```css
/* tearsheet card v34135998 · https://qusaialjbali.github.io/tearsheet/zine/parts/card.html */
.card {
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow);
}
.card-media {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(circle at 30% 40%, var(--ui-accent) 0 18%, transparent 19%),
    linear-gradient(135deg, var(--ui-accent-soft), var(--ui-surface-2));
}
.card-body { padding: 20px 20px 8px; }
.card-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
}
.card-title { margin: 0 0 8px; font-size: 19px; line-height: 1.3; color: var(--ui-text); }
.card-text { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.card-footer { padding: 12px 20px 20px; }
.card-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent);
  text-decoration: none;
  border-radius: 4px;
}
.card-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.card-link:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`Card.vue`

```vue
<!-- tearsheet card v34135998 · https://qusaialjbali.github.io/tearsheet/zine/parts/card.html -->
<template>
  <article class="card">
    <div class="card-media" aria-hidden="true"></div>
    <div class="card-body">
      <p class="card-eyebrow">Guide · 6 min read</p>
      <h3 class="card-title">Designing forms people finish</h3>
      <p class="card-text">Labels, errors and layout patterns that cut abandonment without adding friction.</p>
    </div>
    <div class="card-footer">
      <a class="card-link" href="#">Read article <span aria-hidden="true">→</span></a>
    </div>
  </article>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow);
}
.card-media {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(circle at 30% 40%, var(--ui-accent) 0 18%, transparent 19%),
    linear-gradient(135deg, var(--ui-accent-soft), var(--ui-surface-2));
}
.card-body { padding: 20px 20px 8px; }
.card-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
}
.card-title { margin: 0 0 8px; font-size: 19px; line-height: 1.3; color: var(--ui-text); }
.card-text { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.card-footer { padding: 12px 20px 20px; }
.card-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent);
  text-decoration: none;
  border-radius: 4px;
}
.card-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.card-link:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`Card.svelte`

```svelte
<!-- tearsheet card v34135998 · https://qusaialjbali.github.io/tearsheet/zine/parts/card.html -->
<article class="card">
  <div class="card-media" aria-hidden="true"></div>
  <div class="card-body">
    <p class="card-eyebrow">Guide · 6 min read</p>
    <h3 class="card-title">Designing forms people finish</h3>
    <p class="card-text">Labels, errors and layout patterns that cut abandonment without adding friction.</p>
  </div>
  <div class="card-footer">
    <a class="card-link" href="#">Read article <span aria-hidden="true">→</span></a>
  </div>
</article>

<style>
.card {
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow);
}
.card-media {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(circle at 30% 40%, var(--ui-accent) 0 18%, transparent 19%),
    linear-gradient(135deg, var(--ui-accent-soft), var(--ui-surface-2));
}
.card-body { padding: 20px 20px 8px; }
.card-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
}
.card-title { margin: 0 0 8px; font-size: 19px; line-height: 1.3; color: var(--ui-text); }
.card-text { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.card-footer { padding: 12px 20px 20px; }
.card-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent);
  text-decoration: none;
  border-radius: 4px;
}
.card-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.card-link:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```
