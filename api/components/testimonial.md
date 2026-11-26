# Testimonial (Tearsheet, Sections)

One large, specific quote with the person’s name, role and a photo slot.

**Why it works:** One real, specific quote beats a wall of vague ones. Only use quotes from real people who agreed to it; the one here is placeholder text for a fictional app.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet testimonial v1a205836 · https://qusaialjbali.github.io/tearsheet/zine/parts/testimonial.html -->
<section class="testi">
  <figure>
    <blockquote><p>“We used to settle our flat’s bills on a whiteboard. Pocketsplit sorted four months of mess in one evening.”</p></blockquote>
    <figcaption>
      <span class="testi-photo" aria-hidden="true">NA</span>
      <span><b>Your customer’s name</b><br>Their role, their company</span>
    </figcaption>
  </figure>
</section>
```

`styles.css`

```css
/* tearsheet testimonial v1a205836 · https://qusaialjbali.github.io/tearsheet/zine/parts/testimonial.html */
.testi { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.testi figure { max-width: 760px; margin: 0 auto; }
.testi blockquote { margin: 0; }
.testi blockquote p { margin: 0; font-size: clamp(22px, 3.2vw, 34px); font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; text-wrap: balance; }
.testi figcaption { display: flex; align-items: center; gap: 14px; margin-top: 24px; font-size: 15px; color: var(--ui-muted); }
.testi figcaption b { color: var(--ui-text); }
.testi-photo { display: grid; place-items: center; width: 52px; height: 52px; flex: none; font-weight: 700; color: #fff; background: linear-gradient(135deg, #f97316, #db2777); border-radius: 50%; }
```

## React

`Testimonial.jsx`

```jsx
/* tearsheet testimonial v1a205836 · https://qusaialjbali.github.io/tearsheet/zine/parts/testimonial.html */
import './Testimonial.css';

export function Testimonial() {
  return (
    <section className="testi">
      <figure>
        <blockquote><p>“We used to settle our flat’s bills on a whiteboard. Pocketsplit sorted four months of mess in one evening.”</p></blockquote>
        <figcaption>
          <span className="testi-photo" aria-hidden="true">NA</span>
          <span><b>Your customer’s name</b><br />Their role, their company</span>
        </figcaption>
      </figure>
    </section>
  );
}
```

`Testimonial.css`

```css
/* tearsheet testimonial v1a205836 · https://qusaialjbali.github.io/tearsheet/zine/parts/testimonial.html */
.testi { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.testi figure { max-width: 760px; margin: 0 auto; }
.testi blockquote { margin: 0; }
.testi blockquote p { margin: 0; font-size: clamp(22px, 3.2vw, 34px); font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; text-wrap: balance; }
.testi figcaption { display: flex; align-items: center; gap: 14px; margin-top: 24px; font-size: 15px; color: var(--ui-muted); }
.testi figcaption b { color: var(--ui-text); }
.testi-photo { display: grid; place-items: center; width: 52px; height: 52px; flex: none; font-weight: 700; color: #fff; background: linear-gradient(135deg, #f97316, #db2777); border-radius: 50%; }
```

## Vue

`Testimonial.vue`

```vue
<!-- tearsheet testimonial v1a205836 · https://qusaialjbali.github.io/tearsheet/zine/parts/testimonial.html -->
<template>
  <section class="testi">
    <figure>
      <blockquote><p>“We used to settle our flat’s bills on a whiteboard. Pocketsplit sorted four months of mess in one evening.”</p></blockquote>
      <figcaption>
        <span class="testi-photo" aria-hidden="true">NA</span>
        <span><b>Your customer’s name</b><br>Their role, their company</span>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
.testi { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.testi figure { max-width: 760px; margin: 0 auto; }
.testi blockquote { margin: 0; }
.testi blockquote p { margin: 0; font-size: clamp(22px, 3.2vw, 34px); font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; text-wrap: balance; }
.testi figcaption { display: flex; align-items: center; gap: 14px; margin-top: 24px; font-size: 15px; color: var(--ui-muted); }
.testi figcaption b { color: var(--ui-text); }
.testi-photo { display: grid; place-items: center; width: 52px; height: 52px; flex: none; font-weight: 700; color: #fff; background: linear-gradient(135deg, #f97316, #db2777); border-radius: 50%; }
</style>
```

## Svelte

`Testimonial.svelte`

```svelte
<!-- tearsheet testimonial v1a205836 · https://qusaialjbali.github.io/tearsheet/zine/parts/testimonial.html -->
<section class="testi">
  <figure>
    <blockquote><p>“We used to settle our flat’s bills on a whiteboard. Pocketsplit sorted four months of mess in one evening.”</p></blockquote>
    <figcaption>
      <span class="testi-photo" aria-hidden="true">NA</span>
      <span><b>Your customer’s name</b><br>Their role, their company</span>
    </figcaption>
  </figure>
</section>

<style>
.testi { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.testi figure { max-width: 760px; margin: 0 auto; }
.testi blockquote { margin: 0; }
.testi blockquote p { margin: 0; font-size: clamp(22px, 3.2vw, 34px); font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; text-wrap: balance; }
.testi figcaption { display: flex; align-items: center; gap: 14px; margin-top: 24px; font-size: 15px; color: var(--ui-muted); }
.testi figcaption b { color: var(--ui-text); }
.testi-photo { display: grid; place-items: center; width: 52px; height: 52px; flex: none; font-weight: 700; color: #fff; background: linear-gradient(135deg, #f97316, #db2777); border-radius: 50%; }
</style>
```
