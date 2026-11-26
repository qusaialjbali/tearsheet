# Multi-step form (Tearsheet, Forms)

A short sign-up split into three steps with progress, back and next, and focus moved to each new step.

**Why it works:** Split long forms only where the steps are genuinely different topics. Show how many steps there are, let people go back without losing answers, and move focus to the new step heading.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html -->
<form class="wizard" novalidate>
  <p class="wiz-progress"><span class="wiz-count">Step 1 of 3</span><span class="wiz-bar"><span></span></span></p>
  <fieldset class="wiz-step">
    <legend tabindex="-1">About you</legend>
    <label>Full name <input type="text" autocomplete="name" required></label>
    <label>Email <input type="email" autocomplete="email" required></label>
  </fieldset>
  <fieldset class="wiz-step" hidden>
    <legend tabindex="-1">Your team</legend>
    <label>Team name <input type="text" autocomplete="organization"></label>
    <label>Team size
      <select><option>Just me</option><option>2–10</option><option>11–50</option><option>51+</option></select>
    </label>
  </fieldset>
  <fieldset class="wiz-step" hidden>
    <legend tabindex="-1">All set</legend>
    <p class="wiz-done">Check your answers, then create your workspace. You can change everything later.</p>
  </fieldset>
  <div class="wiz-nav">
    <button class="btn btn-secondary" type="button" data-back hidden>Back</button>
    <button class="btn btn-primary" type="button" data-next>Continue</button>
  </div>
</form>
```

`styles.css`

```css
/* tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html */
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
.wizard {
  display: grid; gap: 16px; width: 100%; max-width: 400px; padding: 22px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius);
}
.wiz-progress { display: grid; gap: 6px; margin: 0; font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.wiz-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.wiz-bar span { display: block; height: 100%; width: 33.3%; background: var(--ui-accent); border-radius: inherit; transition: width 0.3s; }
.wiz-step { display: grid; gap: 14px; margin: 0; padding: 0; border: 0; }
.wiz-step legend { margin-bottom: 4px; font-size: 18px; font-weight: 700; }
.wiz-step legend:focus { outline: none; }
.wiz-step label { display: grid; gap: 6px; font-size: 14px; font-weight: 600; }
.wiz-step input, .wiz-step select {
  min-height: 42px; padding: 8px 12px; font: inherit; font-size: 15px; font-weight: 400; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.wiz-step input:focus, .wiz-step select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.wiz-step input[aria-invalid="true"] { border-color: var(--ui-danger); }
.wiz-done { margin: 0; color: var(--ui-muted); }
.wiz-nav { display: flex; justify-content: flex-end; gap: 10px; }
.wizard [hidden] { display: none !important; }
```

`script.js`

```js
/* tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html */
function setup(root) {
  const steps = [...root.querySelectorAll('.wiz-step')];
  const back = root.querySelector('[data-back]');
  const next = root.querySelector('[data-next]');
  const count = root.querySelector('.wiz-count');
  const bar = root.querySelector('.wiz-bar span');
  let at = 0;

  const go = (i) => {
    at = i;
    steps.forEach((s, n) => (s.hidden = n !== i));
    back.hidden = i === 0;
    next.textContent = i === steps.length - 1 ? 'Create workspace' : 'Continue';
    count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    bar.style.width = ((i + 1) / steps.length) * 100 + '%';
    steps[i].querySelector('legend').focus();
  };
  const valid = () => {
    let ok = true;
    steps[at].querySelectorAll('input[required]').forEach((inp) => {
      const bad = !inp.checkValidity();
      inp.setAttribute('aria-invalid', String(bad));
      if (bad && ok) { inp.focus(); ok = false; }
    });
    return ok;
  };
  const onNext = () => {
    if (!valid()) return;
    if (at < steps.length - 1) go(at + 1);
    else { count.textContent = 'Workspace created'; next.disabled = true; }
  };
  const onBack = () => go(at - 1);
  next.addEventListener('click', onNext);
  back.addEventListener('click', onBack);
  return () => { next.removeEventListener('click', onNext); back.removeEventListener('click', onBack); };
}

document.querySelectorAll(".wizard").forEach(setup);
```

## React

`MultiStepForm.jsx`

```jsx
/* tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html */
import { useEffect, useRef } from 'react';
import './MultiStepForm.css';

function setup(root) {
  const steps = [...root.querySelectorAll('.wiz-step')];
  const back = root.querySelector('[data-back]');
  const next = root.querySelector('[data-next]');
  const count = root.querySelector('.wiz-count');
  const bar = root.querySelector('.wiz-bar span');
  let at = 0;

  const go = (i) => {
    at = i;
    steps.forEach((s, n) => (s.hidden = n !== i));
    back.hidden = i === 0;
    next.textContent = i === steps.length - 1 ? 'Create workspace' : 'Continue';
    count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    bar.style.width = ((i + 1) / steps.length) * 100 + '%';
    steps[i].querySelector('legend').focus();
  };
  const valid = () => {
    let ok = true;
    steps[at].querySelectorAll('input[required]').forEach((inp) => {
      const bad = !inp.checkValidity();
      inp.setAttribute('aria-invalid', String(bad));
      if (bad && ok) { inp.focus(); ok = false; }
    });
    return ok;
  };
  const onNext = () => {
    if (!valid()) return;
    if (at < steps.length - 1) go(at + 1);
    else { count.textContent = 'Workspace created'; next.disabled = true; }
  };
  const onBack = () => go(at - 1);
  next.addEventListener('click', onNext);
  back.addEventListener('click', onBack);
  return () => { next.removeEventListener('click', onNext); back.removeEventListener('click', onBack); };
}

export function MultiStepForm() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <form ref={ref} className="wizard" noValidate>
      <p className="wiz-progress"><span className="wiz-count">Step 1 of 3</span><span className="wiz-bar"><span></span></span></p>
      <fieldset className="wiz-step">
        <legend tabIndex={-1}>About you</legend>
        <label>Full name <input type="text" autoComplete="name" required /></label>
        <label>Email <input type="email" autoComplete="email" required /></label>
      </fieldset>
      <fieldset className="wiz-step" hidden>
        <legend tabIndex={-1}>Your team</legend>
        <label>Team name <input type="text" autoComplete="organization" /></label>
        <label>Team size
          <select><option>Just me</option><option>2–10</option><option>11–50</option><option>51+</option></select>
        </label>
      </fieldset>
      <fieldset className="wiz-step" hidden>
        <legend tabIndex={-1}>All set</legend>
        <p className="wiz-done">Check your answers, then create your workspace. You can change everything later.</p>
      </fieldset>
      <div className="wiz-nav">
        <button className="btn btn-secondary" type="button" data-back hidden>Back</button>
        <button className="btn btn-primary" type="button" data-next>Continue</button>
      </div>
    </form>
  );
}
```

`MultiStepForm.css`

```css
/* tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html */
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
.wizard {
  display: grid; gap: 16px; width: 100%; max-width: 400px; padding: 22px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius);
}
.wiz-progress { display: grid; gap: 6px; margin: 0; font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.wiz-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.wiz-bar span { display: block; height: 100%; width: 33.3%; background: var(--ui-accent); border-radius: inherit; transition: width 0.3s; }
.wiz-step { display: grid; gap: 14px; margin: 0; padding: 0; border: 0; }
.wiz-step legend { margin-bottom: 4px; font-size: 18px; font-weight: 700; }
.wiz-step legend:focus { outline: none; }
.wiz-step label { display: grid; gap: 6px; font-size: 14px; font-weight: 600; }
.wiz-step input, .wiz-step select {
  min-height: 42px; padding: 8px 12px; font: inherit; font-size: 15px; font-weight: 400; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.wiz-step input:focus, .wiz-step select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.wiz-step input[aria-invalid="true"] { border-color: var(--ui-danger); }
.wiz-done { margin: 0; color: var(--ui-muted); }
.wiz-nav { display: flex; justify-content: flex-end; gap: 10px; }
.wizard [hidden] { display: none !important; }
```

## Vue

`MultiStepForm.vue`

```vue
<!-- tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const steps = [...root.querySelectorAll('.wiz-step')];
  const back = root.querySelector('[data-back]');
  const next = root.querySelector('[data-next]');
  const count = root.querySelector('.wiz-count');
  const bar = root.querySelector('.wiz-bar span');
  let at = 0;

  const go = (i) => {
    at = i;
    steps.forEach((s, n) => (s.hidden = n !== i));
    back.hidden = i === 0;
    next.textContent = i === steps.length - 1 ? 'Create workspace' : 'Continue';
    count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    bar.style.width = ((i + 1) / steps.length) * 100 + '%';
    steps[i].querySelector('legend').focus();
  };
  const valid = () => {
    let ok = true;
    steps[at].querySelectorAll('input[required]').forEach((inp) => {
      const bad = !inp.checkValidity();
      inp.setAttribute('aria-invalid', String(bad));
      if (bad && ok) { inp.focus(); ok = false; }
    });
    return ok;
  };
  const onNext = () => {
    if (!valid()) return;
    if (at < steps.length - 1) go(at + 1);
    else { count.textContent = 'Workspace created'; next.disabled = true; }
  };
  const onBack = () => go(at - 1);
  next.addEventListener('click', onNext);
  back.addEventListener('click', onBack);
  return () => { next.removeEventListener('click', onNext); back.removeEventListener('click', onBack); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <form ref="el" class="wizard" novalidate>
    <p class="wiz-progress"><span class="wiz-count">Step 1 of 3</span><span class="wiz-bar"><span></span></span></p>
    <fieldset class="wiz-step">
      <legend tabindex="-1">About you</legend>
      <label>Full name <input type="text" autocomplete="name" required></label>
      <label>Email <input type="email" autocomplete="email" required></label>
    </fieldset>
    <fieldset class="wiz-step" hidden>
      <legend tabindex="-1">Your team</legend>
      <label>Team name <input type="text" autocomplete="organization"></label>
      <label>Team size
        <select><option>Just me</option><option>2–10</option><option>11–50</option><option>51+</option></select>
      </label>
    </fieldset>
    <fieldset class="wiz-step" hidden>
      <legend tabindex="-1">All set</legend>
      <p class="wiz-done">Check your answers, then create your workspace. You can change everything later.</p>
    </fieldset>
    <div class="wiz-nav">
      <button class="btn btn-secondary" type="button" data-back hidden>Back</button>
      <button class="btn btn-primary" type="button" data-next>Continue</button>
    </div>
  </form>
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
.wizard {
  display: grid; gap: 16px; width: 100%; max-width: 400px; padding: 22px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius);
}
.wiz-progress { display: grid; gap: 6px; margin: 0; font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.wiz-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.wiz-bar span { display: block; height: 100%; width: 33.3%; background: var(--ui-accent); border-radius: inherit; transition: width 0.3s; }
.wiz-step { display: grid; gap: 14px; margin: 0; padding: 0; border: 0; }
.wiz-step legend { margin-bottom: 4px; font-size: 18px; font-weight: 700; }
.wiz-step legend:focus { outline: none; }
.wiz-step label { display: grid; gap: 6px; font-size: 14px; font-weight: 600; }
.wiz-step input, .wiz-step select {
  min-height: 42px; padding: 8px 12px; font: inherit; font-size: 15px; font-weight: 400; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.wiz-step input:focus, .wiz-step select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.wiz-step input[aria-invalid="true"] { border-color: var(--ui-danger); }
.wiz-done { margin: 0; color: var(--ui-muted); }
.wiz-nav { display: flex; justify-content: flex-end; gap: 10px; }
.wizard [hidden] { display: none !important; }
</style>
```

## Svelte

`MultiStepForm.svelte`

```svelte
<!-- tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html -->
<script>
  import { onMount } from 'svelte';
  import './MultiStepForm.css';

  let node;

  function setup(root) {
    const steps = [...root.querySelectorAll('.wiz-step')];
    const back = root.querySelector('[data-back]');
    const next = root.querySelector('[data-next]');
    const count = root.querySelector('.wiz-count');
    const bar = root.querySelector('.wiz-bar span');
    let at = 0;

    const go = (i) => {
      at = i;
      steps.forEach((s, n) => (s.hidden = n !== i));
      back.hidden = i === 0;
      next.textContent = i === steps.length - 1 ? 'Create workspace' : 'Continue';
      count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
      bar.style.width = ((i + 1) / steps.length) * 100 + '%';
      steps[i].querySelector('legend').focus();
    };
    const valid = () => {
      let ok = true;
      steps[at].querySelectorAll('input[required]').forEach((inp) => {
        const bad = !inp.checkValidity();
        inp.setAttribute('aria-invalid', String(bad));
        if (bad && ok) { inp.focus(); ok = false; }
      });
      return ok;
    };
    const onNext = () => {
      if (!valid()) return;
      if (at < steps.length - 1) go(at + 1);
      else { count.textContent = 'Workspace created'; next.disabled = true; }
    };
    const onBack = () => go(at - 1);
    next.addEventListener('click', onNext);
    back.addEventListener('click', onBack);
    return () => { next.removeEventListener('click', onNext); back.removeEventListener('click', onBack); };
  }

  onMount(() => setup(node));
</script>

<form bind:this={node} class="wizard" novalidate>
  <p class="wiz-progress"><span class="wiz-count">Step 1 of 3</span><span class="wiz-bar"><span></span></span></p>
  <fieldset class="wiz-step">
    <legend tabindex="-1">About you</legend>
    <label>Full name <input type="text" autocomplete="name" required></label>
    <label>Email <input type="email" autocomplete="email" required></label>
  </fieldset>
  <fieldset class="wiz-step" hidden>
    <legend tabindex="-1">Your team</legend>
    <label>Team name <input type="text" autocomplete="organization"></label>
    <label>Team size
      <select><option>Just me</option><option>2–10</option><option>11–50</option><option>51+</option></select>
    </label>
  </fieldset>
  <fieldset class="wiz-step" hidden>
    <legend tabindex="-1">All set</legend>
    <p class="wiz-done">Check your answers, then create your workspace. You can change everything later.</p>
  </fieldset>
  <div class="wiz-nav">
    <button class="btn btn-secondary" type="button" data-back hidden>Back</button>
    <button class="btn btn-primary" type="button" data-next>Continue</button>
  </div>
</form>
```

`MultiStepForm.css`

```css
/* tearsheet multi-step-form ve4d0b5ea · https://qusaialjbali.github.io/tearsheet/zine/parts/multi-step-form.html */
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
.wizard {
  display: grid; gap: 16px; width: 100%; max-width: 400px; padding: 22px;
  background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius);
}
.wiz-progress { display: grid; gap: 6px; margin: 0; font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.wiz-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.wiz-bar span { display: block; height: 100%; width: 33.3%; background: var(--ui-accent); border-radius: inherit; transition: width 0.3s; }
.wiz-step { display: grid; gap: 14px; margin: 0; padding: 0; border: 0; }
.wiz-step legend { margin-bottom: 4px; font-size: 18px; font-weight: 700; }
.wiz-step legend:focus { outline: none; }
.wiz-step label { display: grid; gap: 6px; font-size: 14px; font-weight: 600; }
.wiz-step input, .wiz-step select {
  min-height: 42px; padding: 8px 12px; font: inherit; font-size: 15px; font-weight: 400; color: var(--ui-text);
  background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm);
}
.wiz-step input:focus, .wiz-step select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.wiz-step input[aria-invalid="true"] { border-color: var(--ui-danger); }
.wiz-done { margin: 0; color: var(--ui-muted); }
.wiz-nav { display: flex; justify-content: flex-end; gap: 10px; }
.wizard [hidden] { display: none !important; }
```
