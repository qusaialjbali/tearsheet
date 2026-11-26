# Honest cookie banner (Tearsheet, Overlays)

A consent banner where saying no is exactly as easy as saying yes.

**Why it works:** Reject and Accept get equal size and weight, and nothing is pre-ticked. That is not just polite: GDPR guidance treats a buried “reject” as invalid consent. It never blocks the page.

**Checked:** axe clean in light and dark; tightest text contrast 5.93:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html -->
<section class="consent" aria-labelledby="consent-title">
  <div class="consent-text">
    <h2 id="consent-title">Cookies, briefly</h2>
    <p>We use essential cookies to keep you signed in. With your OK we would also like to measure which pages are useful. No ads, no selling data.</p>
  </div>
  <div class="consent-actions">
    <button class="btn btn-secondary" type="button" data-choice="reject">Reject optional</button>
    <button class="btn btn-secondary" type="button" data-choice="accept">Accept all</button>
    <a class="consent-link" href="#">Choose what to allow</a>
  </div>
  <p class="consent-done" aria-live="polite"></p>
</section>
```

`styles.css`

```css
/* tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 40px; padding: 0 16px;
  font: inherit; font-size: 14px; font-weight: 600; line-height: 1;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn svg { width: 18px; height: 18px; }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.consent {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;
  max-width: 900px; margin: 0 auto; padding: 20px 24px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.consent-text { flex: 1 1 340px; }
.consent-text h2 { margin: 0 0 4px; font-size: 17px; }
.consent-text p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.consent-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.consent-actions .btn { min-width: 140px; }
.consent-link { font-size: 14px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
.consent-done { flex-basis: 100%; margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-success); }
.consent-done:empty { display: none; }
```

`script.js`

```js
/* tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html */
function setup(root) {
  const done = root.querySelector('.consent-done');
  const buttons = root.querySelectorAll('[data-choice]');
  const onChoice = (e) => {
    const accepted = e.currentTarget.dataset.choice === 'accept';
    // Store the choice, e.g. localStorage.setItem('consent', accepted ? 'all' : 'essential')
    done.textContent = accepted ? 'Thanks. Optional cookies are on; change this any time in Settings.' : 'Done. Only essential cookies will be used.';
  };
  buttons.forEach((b) => b.addEventListener('click', onChoice));
  return () => buttons.forEach((b) => b.removeEventListener('click', onChoice));
}

document.querySelectorAll(".consent").forEach(setup);
```

## React

`CookieBanner.jsx`

```jsx
/* tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html */
import { useEffect, useRef } from 'react';
import './CookieBanner.css';

function setup(root) {
  const done = root.querySelector('.consent-done');
  const buttons = root.querySelectorAll('[data-choice]');
  const onChoice = (e) => {
    const accepted = e.currentTarget.dataset.choice === 'accept';
    // Store the choice, e.g. localStorage.setItem('consent', accepted ? 'all' : 'essential')
    done.textContent = accepted ? 'Thanks. Optional cookies are on; change this any time in Settings.' : 'Done. Only essential cookies will be used.';
  };
  buttons.forEach((b) => b.addEventListener('click', onChoice));
  return () => buttons.forEach((b) => b.removeEventListener('click', onChoice));
}

export function CookieBanner() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <section ref={ref} className="consent" aria-labelledby="consent-title">
      <div className="consent-text">
        <h2 id="consent-title">Cookies, briefly</h2>
        <p>We use essential cookies to keep you signed in. With your OK we would also like to measure which pages are useful. No ads, no selling data.</p>
      </div>
      <div className="consent-actions">
        <button className="btn btn-secondary" type="button" data-choice="reject">Reject optional</button>
        <button className="btn btn-secondary" type="button" data-choice="accept">Accept all</button>
        <a className="consent-link" href="#">Choose what to allow</a>
      </div>
      <p className="consent-done" aria-live="polite"></p>
    </section>
  );
}
```

`CookieBanner.css`

```css
/* tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 40px; padding: 0 16px;
  font: inherit; font-size: 14px; font-weight: 600; line-height: 1;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn svg { width: 18px; height: 18px; }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.consent {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;
  max-width: 900px; margin: 0 auto; padding: 20px 24px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.consent-text { flex: 1 1 340px; }
.consent-text h2 { margin: 0 0 4px; font-size: 17px; }
.consent-text p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.consent-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.consent-actions .btn { min-width: 140px; }
.consent-link { font-size: 14px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
.consent-done { flex-basis: 100%; margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-success); }
.consent-done:empty { display: none; }
```

## Vue

`CookieBanner.vue`

```vue
<!-- tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const done = root.querySelector('.consent-done');
  const buttons = root.querySelectorAll('[data-choice]');
  const onChoice = (e) => {
    const accepted = e.currentTarget.dataset.choice === 'accept';
    // Store the choice, e.g. localStorage.setItem('consent', accepted ? 'all' : 'essential')
    done.textContent = accepted ? 'Thanks. Optional cookies are on; change this any time in Settings.' : 'Done. Only essential cookies will be used.';
  };
  buttons.forEach((b) => b.addEventListener('click', onChoice));
  return () => buttons.forEach((b) => b.removeEventListener('click', onChoice));
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <section ref="el" class="consent" aria-labelledby="consent-title">
    <div class="consent-text">
      <h2 id="consent-title">Cookies, briefly</h2>
      <p>We use essential cookies to keep you signed in. With your OK we would also like to measure which pages are useful. No ads, no selling data.</p>
    </div>
    <div class="consent-actions">
      <button class="btn btn-secondary" type="button" data-choice="reject">Reject optional</button>
      <button class="btn btn-secondary" type="button" data-choice="accept">Accept all</button>
      <a class="consent-link" href="#">Choose what to allow</a>
    </div>
    <p class="consent-done" aria-live="polite"></p>
  </section>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 40px; padding: 0 16px;
  font: inherit; font-size: 14px; font-weight: 600; line-height: 1;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn svg { width: 18px; height: 18px; }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.consent {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;
  max-width: 900px; margin: 0 auto; padding: 20px 24px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.consent-text { flex: 1 1 340px; }
.consent-text h2 { margin: 0 0 4px; font-size: 17px; }
.consent-text p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.consent-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.consent-actions .btn { min-width: 140px; }
.consent-link { font-size: 14px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
.consent-done { flex-basis: 100%; margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-success); }
.consent-done:empty { display: none; }
</style>
```

## Svelte

`CookieBanner.svelte`

```svelte
<!-- tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html -->
<script>
  import { onMount } from 'svelte';
  import './CookieBanner.css';

  let node;

  function setup(root) {
    const done = root.querySelector('.consent-done');
    const buttons = root.querySelectorAll('[data-choice]');
    const onChoice = (e) => {
      const accepted = e.currentTarget.dataset.choice === 'accept';
      // Store the choice, e.g. localStorage.setItem('consent', accepted ? 'all' : 'essential')
      done.textContent = accepted ? 'Thanks. Optional cookies are on; change this any time in Settings.' : 'Done. Only essential cookies will be used.';
    };
    buttons.forEach((b) => b.addEventListener('click', onChoice));
    return () => buttons.forEach((b) => b.removeEventListener('click', onChoice));
  }

  onMount(() => setup(node));
</script>

<section bind:this={node} class="consent" aria-labelledby="consent-title">
  <div class="consent-text">
    <h2 id="consent-title">Cookies, briefly</h2>
    <p>We use essential cookies to keep you signed in. With your OK we would also like to measure which pages are useful. No ads, no selling data.</p>
  </div>
  <div class="consent-actions">
    <button class="btn btn-secondary" type="button" data-choice="reject">Reject optional</button>
    <button class="btn btn-secondary" type="button" data-choice="accept">Accept all</button>
    <a class="consent-link" href="#">Choose what to allow</a>
  </div>
  <p class="consent-done" aria-live="polite"></p>
</section>
```

`CookieBanner.css`

```css
/* tearsheet cookie-banner v6a7ef958 · https://qusaialjbali.github.io/tearsheet/zine/parts/cookie-banner.html */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 40px; padding: 0 16px;
  font: inherit; font-size: 14px; font-weight: 600; line-height: 1;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn svg { width: 18px; height: 18px; }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }
.consent {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;
  max-width: 900px; margin: 0 auto; padding: 20px 24px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.consent-text { flex: 1 1 340px; }
.consent-text h2 { margin: 0 0 4px; font-size: 17px; }
.consent-text p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.consent-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.consent-actions .btn { min-width: 140px; }
.consent-link { font-size: 14px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
.consent-done { flex-basis: 100%; margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-success); }
.consent-done:empty { display: none; }
```
