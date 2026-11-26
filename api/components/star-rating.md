# Star rating (Tearsheet, Forms)

Five-star rating with hover preview, made of radio buttons and zero JavaScript.

**Why it works:** Each star is a labelled radio, so arrow keys work and screen readers announce “3 stars”. Stars are drawn with a CSS mask, not a font.

**Checked:** axe clean in light and dark; tightest text contrast 17.41:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet star-rating v0cae067b · https://qusaialjbali.github.io/tearsheet/zine/parts/star-rating.html -->
<fieldset class="rating">
  <legend class="rating-legend">Rate this component</legend>
  <div class="rating-stars">
    <input type="radio" name="rating" id="star5" value="5"><label for="star5" title="5 stars"><span class="sr-only">5 stars</span></label>
    <input type="radio" name="rating" id="star4" value="4" checked><label for="star4" title="4 stars"><span class="sr-only">4 stars</span></label>
    <input type="radio" name="rating" id="star3" value="3"><label for="star3" title="3 stars"><span class="sr-only">3 stars</span></label>
    <input type="radio" name="rating" id="star2" value="2"><label for="star2" title="2 stars"><span class="sr-only">2 stars</span></label>
    <input type="radio" name="rating" id="star1" value="1"><label for="star1" title="1 star"><span class="sr-only">1 star</span></label>
  </div>
</fieldset>
```

`styles.css`

```css
/* tearsheet star-rating v0cae067b · https://qusaialjbali.github.io/tearsheet/zine/parts/star-rating.html */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.rating { margin: 0; padding: 0; border: 0; }
.rating-legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.rating-stars { display: inline-flex; flex-direction: row-reverse; gap: 4px; }
.rating-stars input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.rating-stars label {
  width: 34px;
  height: 34px;
  cursor: pointer;
  border-radius: 6px;
  background: var(--ui-border-strong);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  transition: background-color 0.12s, transform 0.12s;
}
.rating-stars input:checked ~ label,
.rating-stars label:hover,
.rating-stars label:hover ~ label { background: #f5a524; }
.rating-stars:has(label:hover) label:not(:hover):not(:has(~ label:hover)) { background: var(--ui-border-strong); }
.rating-stars label:hover { transform: scale(1.12); }
.rating-stars input:focus-visible + label { outline: 3px solid var(--ui-accent); outline-offset: 2px; }
```

## React

`StarRating.jsx`

```jsx
/* tearsheet star-rating v0cae067b · https://qusaialjbali.github.io/tearsheet/zine/parts/star-rating.html */
import './StarRating.css';

export function StarRating() {
  return (
    <fieldset className="rating">
      <legend className="rating-legend">Rate this component</legend>
      <div className="rating-stars">
        <input type="radio" name="rating" id="star5" defaultValue="5" /><label htmlFor="star5" title="5 stars"><span className="sr-only">5 stars</span></label>
        <input type="radio" name="rating" id="star4" defaultValue="4" defaultChecked /><label htmlFor="star4" title="4 stars"><span className="sr-only">4 stars</span></label>
        <input type="radio" name="rating" id="star3" defaultValue="3" /><label htmlFor="star3" title="3 stars"><span className="sr-only">3 stars</span></label>
        <input type="radio" name="rating" id="star2" defaultValue="2" /><label htmlFor="star2" title="2 stars"><span className="sr-only">2 stars</span></label>
        <input type="radio" name="rating" id="star1" defaultValue="1" /><label htmlFor="star1" title="1 star"><span className="sr-only">1 star</span></label>
      </div>
    </fieldset>
  );
}
```

`StarRating.css`

```css
/* tearsheet star-rating v0cae067b · https://qusaialjbali.github.io/tearsheet/zine/parts/star-rating.html */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.rating { margin: 0; padding: 0; border: 0; }
.rating-legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.rating-stars { display: inline-flex; flex-direction: row-reverse; gap: 4px; }
.rating-stars input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.rating-stars label {
  width: 34px;
  height: 34px;
  cursor: pointer;
  border-radius: 6px;
  background: var(--ui-border-strong);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  transition: background-color 0.12s, transform 0.12s;
}
.rating-stars input:checked ~ label,
.rating-stars label:hover,
.rating-stars label:hover ~ label { background: #f5a524; }
.rating-stars:has(label:hover) label:not(:hover):not(:has(~ label:hover)) { background: var(--ui-border-strong); }
.rating-stars label:hover { transform: scale(1.12); }
.rating-stars input:focus-visible + label { outline: 3px solid var(--ui-accent); outline-offset: 2px; }
```

## Vue

`StarRating.vue`

```vue
<!-- tearsheet star-rating v0cae067b · https://qusaialjbali.github.io/tearsheet/zine/parts/star-rating.html -->
<template>
  <fieldset class="rating">
    <legend class="rating-legend">Rate this component</legend>
    <div class="rating-stars">
      <input type="radio" name="rating" id="star5" value="5"><label for="star5" title="5 stars"><span class="sr-only">5 stars</span></label>
      <input type="radio" name="rating" id="star4" value="4" checked><label for="star4" title="4 stars"><span class="sr-only">4 stars</span></label>
      <input type="radio" name="rating" id="star3" value="3"><label for="star3" title="3 stars"><span class="sr-only">3 stars</span></label>
      <input type="radio" name="rating" id="star2" value="2"><label for="star2" title="2 stars"><span class="sr-only">2 stars</span></label>
      <input type="radio" name="rating" id="star1" value="1"><label for="star1" title="1 star"><span class="sr-only">1 star</span></label>
    </div>
  </fieldset>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.rating { margin: 0; padding: 0; border: 0; }
.rating-legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.rating-stars { display: inline-flex; flex-direction: row-reverse; gap: 4px; }
.rating-stars input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.rating-stars label {
  width: 34px;
  height: 34px;
  cursor: pointer;
  border-radius: 6px;
  background: var(--ui-border-strong);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  transition: background-color 0.12s, transform 0.12s;
}
.rating-stars input:checked ~ label,
.rating-stars label:hover,
.rating-stars label:hover ~ label { background: #f5a524; }
.rating-stars:has(label:hover) label:not(:hover):not(:has(~ label:hover)) { background: var(--ui-border-strong); }
.rating-stars label:hover { transform: scale(1.12); }
.rating-stars input:focus-visible + label { outline: 3px solid var(--ui-accent); outline-offset: 2px; }
</style>
```

## Svelte

`StarRating.svelte`

```svelte
<!-- tearsheet star-rating v0cae067b · https://qusaialjbali.github.io/tearsheet/zine/parts/star-rating.html -->
<fieldset class="rating">
  <legend class="rating-legend">Rate this component</legend>
  <div class="rating-stars">
    <input type="radio" name="rating" id="star5" value="5"><label for="star5" title="5 stars"><span class="sr-only">5 stars</span></label>
    <input type="radio" name="rating" id="star4" value="4" checked><label for="star4" title="4 stars"><span class="sr-only">4 stars</span></label>
    <input type="radio" name="rating" id="star3" value="3"><label for="star3" title="3 stars"><span class="sr-only">3 stars</span></label>
    <input type="radio" name="rating" id="star2" value="2"><label for="star2" title="2 stars"><span class="sr-only">2 stars</span></label>
    <input type="radio" name="rating" id="star1" value="1"><label for="star1" title="1 star"><span class="sr-only">1 star</span></label>
  </div>
</fieldset>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.rating { margin: 0; padding: 0; border: 0; }
.rating-legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.rating-stars { display: inline-flex; flex-direction: row-reverse; gap: 4px; }
.rating-stars input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.rating-stars label {
  width: 34px;
  height: 34px;
  cursor: pointer;
  border-radius: 6px;
  background: var(--ui-border-strong);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  transition: background-color 0.12s, transform 0.12s;
}
.rating-stars input:checked ~ label,
.rating-stars label:hover,
.rating-stars label:hover ~ label { background: #f5a524; }
.rating-stars:has(label:hover) label:not(:hover):not(:has(~ label:hover)) { background: var(--ui-border-strong); }
.rating-stars label:hover { transform: scale(1.12); }
.rating-stars input:focus-visible + label { outline: 3px solid var(--ui-accent); outline-offset: 2px; }
</style>
```
