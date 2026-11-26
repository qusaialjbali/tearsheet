# Hero with signup (Tearsheet, Sections)

A hero whose main action is a working email field, with an honest product preview beside it.

**Why it works:** Putting the first form field in the hero removes a whole page from the funnel. The preview shows the real thing working, not an abstract illustration.

**Checked:** axe clean in light and dark; tightest text contrast 5.35:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html -->
<section class="hero-s">
  <div class="hero-s-copy">
    <h1>Know who owes what, instantly.</h1>
    <p>Add an expense in two taps. Pocketsplit does the maths and settles up in the fewest payments.</p>
    <form class="hero-s-form" novalidate>
      <label class="sr-only" for="hero-email">Email</label>
      <input id="hero-email" type="email" placeholder="you@example.com" autocomplete="email" required>
      <button class="btn btn-primary" type="submit">Get started</button>
    </form>
    <p class="hero-s-msg" aria-live="polite">Free for groups up to 5. We never share your email.</p>
  </div>
  <div class="hero-s-shot" aria-label="Example: Lisbon trip balance" role="img">
    <p class="shot-title">Lisbon trip <span>4 people</span></p>
    <ul>
      <li><span>Maya paid dinner</span><b>€84.00</b></li>
      <li><span>Leo paid train</span><b>€46.40</b></li>
      <li><span>Sam paid museum</span><b>€32.00</b></li>
    </ul>
    <p class="shot-settle">Sam owes Maya <b>€21.10</b></p>
  </div>
</section>
```

`styles.css`

```css
/* tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html */
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
.hero-s { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.hero-s { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; align-items: center; }
.hero-s h1 { margin: 0 0 14px; font-size: clamp(30px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-s-copy > p { margin: 0 0 22px; font-size: 17px; color: var(--ui-muted); max-width: 46ch; }
.hero-s-form { display: flex; flex-wrap: wrap; gap: 8px; }
.hero-s-form input { flex: 1 1 200px; min-height: 46px; padding: 0 14px; font: inherit; font-size: 15px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.hero-s-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.hero-s-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.hero-s-msg { margin: 10px 0 0 !important; font-size: 13px !important; }
.hero-s-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.hero-s-msg.is-ok { color: var(--ui-success); font-weight: 600; }
.hero-s-shot { padding: 20px; background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: 16px; box-shadow: var(--ui-shadow-lg); rotate: 1.5deg; }
.shot-title { display: flex; justify-content: space-between; margin: 0 0 12px; font-weight: 700; }
.shot-title span { font-size: 13px; font-weight: 500; color: var(--ui-muted); }
.hero-s-shot ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hero-s-shot li { display: flex; justify-content: space-between; padding: 10px 12px; font-size: 14px; background: var(--ui-surface-2); border-radius: 8px; font-variant-numeric: tabular-nums; }
.shot-settle { margin: 12px 0 0; padding: 10px 12px; font-size: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 8px; }
```

`script.js`

```js
/* tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html */
function setup(root) {
  const form = root.querySelector('form');
  const input = form.querySelector('input');
  const msg = root.querySelector('.hero-s-msg');
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = input.checkValidity() && input.value;
    input.setAttribute('aria-invalid', String(!ok));
    msg.className = 'hero-s-msg ' + (ok ? 'is-ok' : 'is-error');
    msg.textContent = ok ? 'Check your inbox for a sign-in link.' : 'Enter an email like name@example.com.';
    if (!ok) input.focus();
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

document.querySelectorAll(".hero-s").forEach(setup);
```

## React

`HeroSignup.jsx`

```jsx
/* tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html */
import { useEffect, useRef } from 'react';
import './HeroSignup.css';

function setup(root) {
  const form = root.querySelector('form');
  const input = form.querySelector('input');
  const msg = root.querySelector('.hero-s-msg');
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = input.checkValidity() && input.value;
    input.setAttribute('aria-invalid', String(!ok));
    msg.className = 'hero-s-msg ' + (ok ? 'is-ok' : 'is-error');
    msg.textContent = ok ? 'Check your inbox for a sign-in link.' : 'Enter an email like name@example.com.';
    if (!ok) input.focus();
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

export function HeroSignup() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <section ref={ref} className="hero-s">
      <div className="hero-s-copy">
        <h1>Know who owes what, instantly.</h1>
        <p>Add an expense in two taps. Pocketsplit does the maths and settles up in the fewest payments.</p>
        <form className="hero-s-form" noValidate>
          <label className="sr-only" htmlFor="hero-email">Email</label>
          <input id="hero-email" type="email" placeholder="you@example.com" autoComplete="email" required />
          <button className="btn btn-primary" type="submit">Get started</button>
        </form>
        <p className="hero-s-msg" aria-live="polite">Free for groups up to 5. We never share your email.</p>
      </div>
      <div className="hero-s-shot" aria-label="Example: Lisbon trip balance" role="img">
        <p className="shot-title">Lisbon trip <span>4 people</span></p>
        <ul>
          <li><span>Maya paid dinner</span><b>€84.00</b></li>
          <li><span>Leo paid train</span><b>€46.40</b></li>
          <li><span>Sam paid museum</span><b>€32.00</b></li>
        </ul>
        <p className="shot-settle">Sam owes Maya <b>€21.10</b></p>
      </div>
    </section>
  );
}
```

`HeroSignup.css`

```css
/* tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html */
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
.hero-s { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.hero-s { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; align-items: center; }
.hero-s h1 { margin: 0 0 14px; font-size: clamp(30px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-s-copy > p { margin: 0 0 22px; font-size: 17px; color: var(--ui-muted); max-width: 46ch; }
.hero-s-form { display: flex; flex-wrap: wrap; gap: 8px; }
.hero-s-form input { flex: 1 1 200px; min-height: 46px; padding: 0 14px; font: inherit; font-size: 15px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.hero-s-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.hero-s-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.hero-s-msg { margin: 10px 0 0 !important; font-size: 13px !important; }
.hero-s-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.hero-s-msg.is-ok { color: var(--ui-success); font-weight: 600; }
.hero-s-shot { padding: 20px; background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: 16px; box-shadow: var(--ui-shadow-lg); rotate: 1.5deg; }
.shot-title { display: flex; justify-content: space-between; margin: 0 0 12px; font-weight: 700; }
.shot-title span { font-size: 13px; font-weight: 500; color: var(--ui-muted); }
.hero-s-shot ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hero-s-shot li { display: flex; justify-content: space-between; padding: 10px 12px; font-size: 14px; background: var(--ui-surface-2); border-radius: 8px; font-variant-numeric: tabular-nums; }
.shot-settle { margin: 12px 0 0; padding: 10px 12px; font-size: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 8px; }
```

## Vue

`HeroSignup.vue`

```vue
<!-- tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const form = root.querySelector('form');
  const input = form.querySelector('input');
  const msg = root.querySelector('.hero-s-msg');
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = input.checkValidity() && input.value;
    input.setAttribute('aria-invalid', String(!ok));
    msg.className = 'hero-s-msg ' + (ok ? 'is-ok' : 'is-error');
    msg.textContent = ok ? 'Check your inbox for a sign-in link.' : 'Enter an email like name@example.com.';
    if (!ok) input.focus();
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <section ref="el" class="hero-s">
    <div class="hero-s-copy">
      <h1>Know who owes what, instantly.</h1>
      <p>Add an expense in two taps. Pocketsplit does the maths and settles up in the fewest payments.</p>
      <form class="hero-s-form" novalidate>
        <label class="sr-only" for="hero-email">Email</label>
        <input id="hero-email" type="email" placeholder="you@example.com" autocomplete="email" required>
        <button class="btn btn-primary" type="submit">Get started</button>
      </form>
      <p class="hero-s-msg" aria-live="polite">Free for groups up to 5. We never share your email.</p>
    </div>
    <div class="hero-s-shot" aria-label="Example: Lisbon trip balance" role="img">
      <p class="shot-title">Lisbon trip <span>4 people</span></p>
      <ul>
        <li><span>Maya paid dinner</span><b>€84.00</b></li>
        <li><span>Leo paid train</span><b>€46.40</b></li>
        <li><span>Sam paid museum</span><b>€32.00</b></li>
      </ul>
      <p class="shot-settle">Sam owes Maya <b>€21.10</b></p>
    </div>
  </section>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
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
.hero-s { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.hero-s { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; align-items: center; }
.hero-s h1 { margin: 0 0 14px; font-size: clamp(30px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-s-copy > p { margin: 0 0 22px; font-size: 17px; color: var(--ui-muted); max-width: 46ch; }
.hero-s-form { display: flex; flex-wrap: wrap; gap: 8px; }
.hero-s-form input { flex: 1 1 200px; min-height: 46px; padding: 0 14px; font: inherit; font-size: 15px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.hero-s-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.hero-s-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.hero-s-msg { margin: 10px 0 0 !important; font-size: 13px !important; }
.hero-s-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.hero-s-msg.is-ok { color: var(--ui-success); font-weight: 600; }
.hero-s-shot { padding: 20px; background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: 16px; box-shadow: var(--ui-shadow-lg); rotate: 1.5deg; }
.shot-title { display: flex; justify-content: space-between; margin: 0 0 12px; font-weight: 700; }
.shot-title span { font-size: 13px; font-weight: 500; color: var(--ui-muted); }
.hero-s-shot ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hero-s-shot li { display: flex; justify-content: space-between; padding: 10px 12px; font-size: 14px; background: var(--ui-surface-2); border-radius: 8px; font-variant-numeric: tabular-nums; }
.shot-settle { margin: 12px 0 0; padding: 10px 12px; font-size: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 8px; }
</style>
```

## Svelte

`HeroSignup.svelte`

```svelte
<!-- tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html -->
<script>
  import { onMount } from 'svelte';
  import './HeroSignup.css';

  let node;

  function setup(root) {
    const form = root.querySelector('form');
    const input = form.querySelector('input');
    const msg = root.querySelector('.hero-s-msg');
    const onSubmit = (e) => {
      e.preventDefault();
      const ok = input.checkValidity() && input.value;
      input.setAttribute('aria-invalid', String(!ok));
      msg.className = 'hero-s-msg ' + (ok ? 'is-ok' : 'is-error');
      msg.textContent = ok ? 'Check your inbox for a sign-in link.' : 'Enter an email like name@example.com.';
      if (!ok) input.focus();
    };
    form.addEventListener('submit', onSubmit);
    return () => form.removeEventListener('submit', onSubmit);
  }

  onMount(() => setup(node));
</script>

<section bind:this={node} class="hero-s">
  <div class="hero-s-copy">
    <h1>Know who owes what, instantly.</h1>
    <p>Add an expense in two taps. Pocketsplit does the maths and settles up in the fewest payments.</p>
    <form class="hero-s-form" novalidate>
      <label class="sr-only" for="hero-email">Email</label>
      <input id="hero-email" type="email" placeholder="you@example.com" autocomplete="email" required>
      <button class="btn btn-primary" type="submit">Get started</button>
    </form>
    <p class="hero-s-msg" aria-live="polite">Free for groups up to 5. We never share your email.</p>
  </div>
  <div class="hero-s-shot" aria-label="Example: Lisbon trip balance" role="img">
    <p class="shot-title">Lisbon trip <span>4 people</span></p>
    <ul>
      <li><span>Maya paid dinner</span><b>€84.00</b></li>
      <li><span>Leo paid train</span><b>€46.40</b></li>
      <li><span>Sam paid museum</span><b>€32.00</b></li>
    </ul>
    <p class="shot-settle">Sam owes Maya <b>€21.10</b></p>
  </div>
</section>
```

`HeroSignup.css`

```css
/* tearsheet hero-signup v520e4cc4 · https://qusaialjbali.github.io/tearsheet/zine/parts/hero-signup.html */
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
.hero-s { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.hero-s { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; align-items: center; }
.hero-s h1 { margin: 0 0 14px; font-size: clamp(30px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-s-copy > p { margin: 0 0 22px; font-size: 17px; color: var(--ui-muted); max-width: 46ch; }
.hero-s-form { display: flex; flex-wrap: wrap; gap: 8px; }
.hero-s-form input { flex: 1 1 200px; min-height: 46px; padding: 0 14px; font: inherit; font-size: 15px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.hero-s-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.hero-s-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.hero-s-msg { margin: 10px 0 0 !important; font-size: 13px !important; }
.hero-s-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.hero-s-msg.is-ok { color: var(--ui-success); font-weight: 600; }
.hero-s-shot { padding: 20px; background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: 16px; box-shadow: var(--ui-shadow-lg); rotate: 1.5deg; }
.shot-title { display: flex; justify-content: space-between; margin: 0 0 12px; font-weight: 700; }
.shot-title span { font-size: 13px; font-weight: 500; color: var(--ui-muted); }
.hero-s-shot ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hero-s-shot li { display: flex; justify-content: space-between; padding: 10px 12px; font-size: 14px; background: var(--ui-surface-2); border-radius: 8px; font-variant-numeric: tabular-nums; }
.shot-settle { margin: 12px 0 0; padding: 10px 12px; font-size: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 8px; }
```
