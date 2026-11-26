# Newsletter signup (Tearsheet, Sections)

An email signup that says exactly what you will get and how often, with inline validation.

**Why it works:** Say what is in it and how often (“one email a month”). No pre-ticked boxes, and the privacy line is right next to the button, not in a footer.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html -->
<section class="news">
  <h2>One useful email a month</h2>
  <p>New components, one design rule explained, nothing else. Unsubscribe in one click.</p>
  <form class="news-form" novalidate>
    <label class="sr-only" for="news-email">Email address</label>
    <input id="news-email" type="email" placeholder="you@example.com" autocomplete="email" required aria-describedby="news-msg">
    <button type="submit">Subscribe</button>
  </form>
  <p class="news-msg" id="news-msg" aria-live="polite">We only use your email for this newsletter.</p>
</section>
```

`styles.css`

```css
/* tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html */
.news { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.news { text-align: center; }
.news h2 { margin: 0 0 8px; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.02em; }
.news > p { margin: 0 auto 20px; max-width: 46ch; color: var(--ui-muted); }
.news-form { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 440px; margin: 0 auto; }
.news-form input { flex: 1 1 220px; min-height: 46px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.news-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.news-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.news-form button { min-height: 46px; padding: 0 22px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.news-form button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.news-msg { margin: 10px 0 0; font-size: 13px; color: var(--ui-muted); }
.news-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.news-msg.is-ok { color: var(--ui-success); font-weight: 600; }
```

`script.js`

```js
/* tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html */
function setup(root) {
  const form = root.querySelector('form');
  const input = form.querySelector('input');
  const msg = root.querySelector('.news-msg');
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = Boolean(input.value) && input.checkValidity();
    input.setAttribute('aria-invalid', String(!ok));
    msg.className = 'news-msg ' + (ok ? 'is-ok' : 'is-error');
    msg.textContent = ok ? 'Almost done: confirm the link we just emailed you.' : 'That email looks incomplete. Try name@example.com.';
    if (!ok) input.focus();
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

document.querySelectorAll(".news").forEach(setup);
```

## React

`Newsletter.jsx`

```jsx
/* tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html */
import { useEffect, useRef } from 'react';
import './Newsletter.css';

function setup(root) {
  const form = root.querySelector('form');
  const input = form.querySelector('input');
  const msg = root.querySelector('.news-msg');
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = Boolean(input.value) && input.checkValidity();
    input.setAttribute('aria-invalid', String(!ok));
    msg.className = 'news-msg ' + (ok ? 'is-ok' : 'is-error');
    msg.textContent = ok ? 'Almost done: confirm the link we just emailed you.' : 'That email looks incomplete. Try name@example.com.';
    if (!ok) input.focus();
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

export function Newsletter() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <section ref={ref} className="news">
      <h2>One useful email a month</h2>
      <p>New components, one design rule explained, nothing else. Unsubscribe in one click.</p>
      <form className="news-form" noValidate>
        <label className="sr-only" htmlFor="news-email">Email address</label>
        <input id="news-email" type="email" placeholder="you@example.com" autoComplete="email" required aria-describedby="news-msg" />
        <button type="submit">Subscribe</button>
      </form>
      <p className="news-msg" id="news-msg" aria-live="polite">We only use your email for this newsletter.</p>
    </section>
  );
}
```

`Newsletter.css`

```css
/* tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html */
.news { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.news { text-align: center; }
.news h2 { margin: 0 0 8px; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.02em; }
.news > p { margin: 0 auto 20px; max-width: 46ch; color: var(--ui-muted); }
.news-form { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 440px; margin: 0 auto; }
.news-form input { flex: 1 1 220px; min-height: 46px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.news-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.news-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.news-form button { min-height: 46px; padding: 0 22px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.news-form button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.news-msg { margin: 10px 0 0; font-size: 13px; color: var(--ui-muted); }
.news-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.news-msg.is-ok { color: var(--ui-success); font-weight: 600; }
```

## Vue

`Newsletter.vue`

```vue
<!-- tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const form = root.querySelector('form');
  const input = form.querySelector('input');
  const msg = root.querySelector('.news-msg');
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = Boolean(input.value) && input.checkValidity();
    input.setAttribute('aria-invalid', String(!ok));
    msg.className = 'news-msg ' + (ok ? 'is-ok' : 'is-error');
    msg.textContent = ok ? 'Almost done: confirm the link we just emailed you.' : 'That email looks incomplete. Try name@example.com.';
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
  <section ref="el" class="news">
    <h2>One useful email a month</h2>
    <p>New components, one design rule explained, nothing else. Unsubscribe in one click.</p>
    <form class="news-form" novalidate>
      <label class="sr-only" for="news-email">Email address</label>
      <input id="news-email" type="email" placeholder="you@example.com" autocomplete="email" required aria-describedby="news-msg">
      <button type="submit">Subscribe</button>
    </form>
    <p class="news-msg" id="news-msg" aria-live="polite">We only use your email for this newsletter.</p>
  </section>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.news { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.news { text-align: center; }
.news h2 { margin: 0 0 8px; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.02em; }
.news > p { margin: 0 auto 20px; max-width: 46ch; color: var(--ui-muted); }
.news-form { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 440px; margin: 0 auto; }
.news-form input { flex: 1 1 220px; min-height: 46px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.news-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.news-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.news-form button { min-height: 46px; padding: 0 22px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.news-form button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.news-msg { margin: 10px 0 0; font-size: 13px; color: var(--ui-muted); }
.news-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.news-msg.is-ok { color: var(--ui-success); font-weight: 600; }
</style>
```

## Svelte

`Newsletter.svelte`

```svelte
<!-- tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html -->
<script>
  import { onMount } from 'svelte';
  import './Newsletter.css';

  let node;

  function setup(root) {
    const form = root.querySelector('form');
    const input = form.querySelector('input');
    const msg = root.querySelector('.news-msg');
    const onSubmit = (e) => {
      e.preventDefault();
      const ok = Boolean(input.value) && input.checkValidity();
      input.setAttribute('aria-invalid', String(!ok));
      msg.className = 'news-msg ' + (ok ? 'is-ok' : 'is-error');
      msg.textContent = ok ? 'Almost done: confirm the link we just emailed you.' : 'That email looks incomplete. Try name@example.com.';
      if (!ok) input.focus();
    };
    form.addEventListener('submit', onSubmit);
    return () => form.removeEventListener('submit', onSubmit);
  }

  onMount(() => setup(node));
</script>

<section bind:this={node} class="news">
  <h2>One useful email a month</h2>
  <p>New components, one design rule explained, nothing else. Unsubscribe in one click.</p>
  <form class="news-form" novalidate>
    <label class="sr-only" for="news-email">Email address</label>
    <input id="news-email" type="email" placeholder="you@example.com" autocomplete="email" required aria-describedby="news-msg">
    <button type="submit">Subscribe</button>
  </form>
  <p class="news-msg" id="news-msg" aria-live="polite">We only use your email for this newsletter.</p>
</section>
```

`Newsletter.css`

```css
/* tearsheet newsletter v1fce2b0d · https://qusaialjbali.github.io/tearsheet/zine/parts/newsletter.html */
.news { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.news { text-align: center; }
.news h2 { margin: 0 0 8px; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.02em; }
.news > p { margin: 0 auto 20px; max-width: 46ch; color: var(--ui-muted); }
.news-form { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 440px; margin: 0 auto; }
.news-form input { flex: 1 1 220px; min-height: 46px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.news-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.news-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.news-form button { min-height: 46px; padding: 0 22px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.news-form button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.news-msg { margin: 10px 0 0; font-size: 13px; color: var(--ui-muted); }
.news-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.news-msg.is-ok { color: var(--ui-success); font-weight: 600; }
```
