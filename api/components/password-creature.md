# Password creature (Tearsheet, Weird)

A little creature that covers its eyes while you type a password, peeks when you show it, and grins as it gets stronger.

**Why it works:** The real feedback is the text under the meter, announced politely as it changes. The creature is decoration and is hidden from screen readers.

**Checked:** axe clean in light and dark; tightest text contrast 5.93:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html -->
<div class="critter" data-score="0">
  <svg class="critter-face" viewBox="0 0 120 110" aria-hidden="true">
    <circle class="critter-body" cx="60" cy="62" r="44"/>
    <g class="critter-eyes"><circle cx="44" cy="54" r="6"/><circle cx="76" cy="54" r="6"/></g>
    <path class="critter-mouth" d="M46 78 Q60 78 74 78"/>
    <g class="critter-paws"><ellipse cx="42" cy="56" rx="15" ry="11"/><ellipse cx="78" cy="56" rx="15" ry="11"/></g>
  </svg>
  <label class="critter-label" for="new-password">Create a password</label>
  <div class="critter-row">
    <input class="critter-input" id="new-password" type="password" autocomplete="new-password" aria-describedby="critter-status">
    <button class="critter-show" type="button" aria-pressed="false">Show</button>
  </div>
  <div class="critter-meter" aria-hidden="true"><span></span></div>
  <p class="critter-status" id="critter-status" aria-live="polite">Use 12 or more characters, with a mix of letters, numbers and symbols.</p>
</div>
```

`styles.css`

```css
/* tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html */
.critter {
  --tone: var(--ui-border-strong);
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 340px;
}
.critter[data-score="1"] { --tone: var(--ui-danger); }
.critter[data-score="2"] { --tone: var(--ui-warning); }
.critter[data-score="3"] { --tone: var(--ui-warning); }
.critter[data-score="4"] { --tone: var(--ui-success); }
.critter[data-score="5"] { --tone: var(--ui-success); }
.critter-face { width: 108px; justify-self: center; overflow: visible; }
.critter-body { fill: var(--tone); transition: fill 0.3s; }
.critter-eyes circle { fill: var(--ui-text); transition: transform 0.2s; }
.critter-mouth { fill: none; stroke: var(--ui-text); stroke-width: 4; stroke-linecap: round; transition: d 0.3s; }
.critter-paws ellipse { fill: var(--tone); stroke: var(--ui-text); stroke-width: 2.5; filter: brightness(1.1); }
.critter-paws { transform: translateY(46px); transition: transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1); }
.critter.is-shy .critter-paws { transform: translateY(0); }
.critter.is-peek .critter-paws { transform: translateY(12px); }
.critter-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.critter-row {
  display: flex;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.critter-row:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.critter-input { flex: 1; min-width: 0; padding: 10px 12px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; }
.critter-input:focus { outline: none; }
.critter-show {
  padding: 0 14px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  color: var(--ui-accent);
  background: none;
  border: 0;
  cursor: pointer;
}
.critter-show:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -4px; border-radius: 6px; }
.critter-meter { height: 6px; overflow: hidden; border-radius: 999px; background: var(--ui-surface-2); }
.critter-meter span { display: block; height: 100%; width: calc(var(--fill, 0) * 20%); background: var(--tone); transition: width 0.3s, background-color 0.3s; }
.critter-status { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .critter-paws, .critter-mouth { transition: none; } }
```

`script.js`

```js
/* tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html */
function setup(root) {
  const input = root.querySelector('.critter-input');
  const show = root.querySelector('.critter-show');
  const status = root.querySelector('.critter-status');
  const mouth = root.querySelector('.critter-mouth');
  const eyes = root.querySelectorAll('.critter-eyes circle');
  const meter = root.querySelector('.critter-meter');
  const LABELS = [
    'Use 12 or more characters, with a mix of letters, numbers and symbols.',
    'Too weak. Make it longer.',
    'Weak. Add numbers or symbols.',
    'Okay. A few more characters would help.',
    'Strong password.',
    'Excellent. Even the creature is impressed.',
  ];

  const score = (pw) => {
    if (!pw) return 0;
    let s = 1;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(5, s);
  };
  const mood = () => {
    const hidden = input.type === 'password';
    const focused = document.activeElement === input;
    root.classList.toggle('is-shy', hidden && focused);
    root.classList.toggle('is-peek', !hidden && focused);
  };
  const update = () => {
    const s = score(input.value);
    root.dataset.score = s;
    meter.style.setProperty('--fill', s);
    status.textContent = LABELS[s];
    mouth.setAttribute('d', 'M46 78 Q60 ' + (70 + s * 4) + ' 74 78');
    const look = Math.min(input.value.length, 20) * 0.35 - 3.5;
    eyes.forEach((e) => (e.style.transform = 'translateX(' + look + 'px)'));
  };
  const onShow = () => {
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    show.textContent = reveal ? 'Hide' : 'Show';
    show.setAttribute('aria-pressed', String(reveal));
    input.focus();
    mood();
  };

  input.addEventListener('input', update);
  input.addEventListener('focus', mood);
  input.addEventListener('blur', mood);
  show.addEventListener('click', onShow);
  update();
  return () => {
    input.removeEventListener('input', update);
    input.removeEventListener('focus', mood);
    input.removeEventListener('blur', mood);
    show.removeEventListener('click', onShow);
  };
}

document.querySelectorAll(".critter").forEach(setup);
```

## React

`PasswordCreature.jsx`

```jsx
/* tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html */
import { useEffect, useRef } from 'react';
import './PasswordCreature.css';

function setup(root) {
  const input = root.querySelector('.critter-input');
  const show = root.querySelector('.critter-show');
  const status = root.querySelector('.critter-status');
  const mouth = root.querySelector('.critter-mouth');
  const eyes = root.querySelectorAll('.critter-eyes circle');
  const meter = root.querySelector('.critter-meter');
  const LABELS = [
    'Use 12 or more characters, with a mix of letters, numbers and symbols.',
    'Too weak. Make it longer.',
    'Weak. Add numbers or symbols.',
    'Okay. A few more characters would help.',
    'Strong password.',
    'Excellent. Even the creature is impressed.',
  ];

  const score = (pw) => {
    if (!pw) return 0;
    let s = 1;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(5, s);
  };
  const mood = () => {
    const hidden = input.type === 'password';
    const focused = document.activeElement === input;
    root.classList.toggle('is-shy', hidden && focused);
    root.classList.toggle('is-peek', !hidden && focused);
  };
  const update = () => {
    const s = score(input.value);
    root.dataset.score = s;
    meter.style.setProperty('--fill', s);
    status.textContent = LABELS[s];
    mouth.setAttribute('d', 'M46 78 Q60 ' + (70 + s * 4) + ' 74 78');
    const look = Math.min(input.value.length, 20) * 0.35 - 3.5;
    eyes.forEach((e) => (e.style.transform = 'translateX(' + look + 'px)'));
  };
  const onShow = () => {
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    show.textContent = reveal ? 'Hide' : 'Show';
    show.setAttribute('aria-pressed', String(reveal));
    input.focus();
    mood();
  };

  input.addEventListener('input', update);
  input.addEventListener('focus', mood);
  input.addEventListener('blur', mood);
  show.addEventListener('click', onShow);
  update();
  return () => {
    input.removeEventListener('input', update);
    input.removeEventListener('focus', mood);
    input.removeEventListener('blur', mood);
    show.removeEventListener('click', onShow);
  };
}

export function PasswordCreature() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="critter" data-score="0">
      <svg className="critter-face" viewBox="0 0 120 110" aria-hidden="true">
        <circle className="critter-body" cx="60" cy="62" r="44"/>
        <g className="critter-eyes"><circle cx="44" cy="54" r="6"/><circle cx="76" cy="54" r="6"/></g>
        <path className="critter-mouth" d="M46 78 Q60 78 74 78"/>
        <g className="critter-paws"><ellipse cx="42" cy="56" rx="15" ry="11"/><ellipse cx="78" cy="56" rx="15" ry="11"/></g>
      </svg>
      <label className="critter-label" htmlFor="new-password">Create a password</label>
      <div className="critter-row">
        <input className="critter-input" id="new-password" type="password" autoComplete="new-password" aria-describedby="critter-status" />
        <button className="critter-show" type="button" aria-pressed="false">Show</button>
      </div>
      <div className="critter-meter" aria-hidden="true"><span></span></div>
      <p className="critter-status" id="critter-status" aria-live="polite">Use 12 or more characters, with a mix of letters, numbers and symbols.</p>
    </div>
  );
}
```

`PasswordCreature.css`

```css
/* tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html */
.critter {
  --tone: var(--ui-border-strong);
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 340px;
}
.critter[data-score="1"] { --tone: var(--ui-danger); }
.critter[data-score="2"] { --tone: var(--ui-warning); }
.critter[data-score="3"] { --tone: var(--ui-warning); }
.critter[data-score="4"] { --tone: var(--ui-success); }
.critter[data-score="5"] { --tone: var(--ui-success); }
.critter-face { width: 108px; justify-self: center; overflow: visible; }
.critter-body { fill: var(--tone); transition: fill 0.3s; }
.critter-eyes circle { fill: var(--ui-text); transition: transform 0.2s; }
.critter-mouth { fill: none; stroke: var(--ui-text); stroke-width: 4; stroke-linecap: round; transition: d 0.3s; }
.critter-paws ellipse { fill: var(--tone); stroke: var(--ui-text); stroke-width: 2.5; filter: brightness(1.1); }
.critter-paws { transform: translateY(46px); transition: transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1); }
.critter.is-shy .critter-paws { transform: translateY(0); }
.critter.is-peek .critter-paws { transform: translateY(12px); }
.critter-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.critter-row {
  display: flex;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.critter-row:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.critter-input { flex: 1; min-width: 0; padding: 10px 12px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; }
.critter-input:focus { outline: none; }
.critter-show {
  padding: 0 14px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  color: var(--ui-accent);
  background: none;
  border: 0;
  cursor: pointer;
}
.critter-show:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -4px; border-radius: 6px; }
.critter-meter { height: 6px; overflow: hidden; border-radius: 999px; background: var(--ui-surface-2); }
.critter-meter span { display: block; height: 100%; width: calc(var(--fill, 0) * 20%); background: var(--tone); transition: width 0.3s, background-color 0.3s; }
.critter-status { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .critter-paws, .critter-mouth { transition: none; } }
```

## Vue

`PasswordCreature.vue`

```vue
<!-- tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const input = root.querySelector('.critter-input');
  const show = root.querySelector('.critter-show');
  const status = root.querySelector('.critter-status');
  const mouth = root.querySelector('.critter-mouth');
  const eyes = root.querySelectorAll('.critter-eyes circle');
  const meter = root.querySelector('.critter-meter');
  const LABELS = [
    'Use 12 or more characters, with a mix of letters, numbers and symbols.',
    'Too weak. Make it longer.',
    'Weak. Add numbers or symbols.',
    'Okay. A few more characters would help.',
    'Strong password.',
    'Excellent. Even the creature is impressed.',
  ];

  const score = (pw) => {
    if (!pw) return 0;
    let s = 1;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(5, s);
  };
  const mood = () => {
    const hidden = input.type === 'password';
    const focused = document.activeElement === input;
    root.classList.toggle('is-shy', hidden && focused);
    root.classList.toggle('is-peek', !hidden && focused);
  };
  const update = () => {
    const s = score(input.value);
    root.dataset.score = s;
    meter.style.setProperty('--fill', s);
    status.textContent = LABELS[s];
    mouth.setAttribute('d', 'M46 78 Q60 ' + (70 + s * 4) + ' 74 78');
    const look = Math.min(input.value.length, 20) * 0.35 - 3.5;
    eyes.forEach((e) => (e.style.transform = 'translateX(' + look + 'px)'));
  };
  const onShow = () => {
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    show.textContent = reveal ? 'Hide' : 'Show';
    show.setAttribute('aria-pressed', String(reveal));
    input.focus();
    mood();
  };

  input.addEventListener('input', update);
  input.addEventListener('focus', mood);
  input.addEventListener('blur', mood);
  show.addEventListener('click', onShow);
  update();
  return () => {
    input.removeEventListener('input', update);
    input.removeEventListener('focus', mood);
    input.removeEventListener('blur', mood);
    show.removeEventListener('click', onShow);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="critter" data-score="0">
    <svg class="critter-face" viewBox="0 0 120 110" aria-hidden="true">
      <circle class="critter-body" cx="60" cy="62" r="44"/>
      <g class="critter-eyes"><circle cx="44" cy="54" r="6"/><circle cx="76" cy="54" r="6"/></g>
      <path class="critter-mouth" d="M46 78 Q60 78 74 78"/>
      <g class="critter-paws"><ellipse cx="42" cy="56" rx="15" ry="11"/><ellipse cx="78" cy="56" rx="15" ry="11"/></g>
    </svg>
    <label class="critter-label" for="new-password">Create a password</label>
    <div class="critter-row">
      <input class="critter-input" id="new-password" type="password" autocomplete="new-password" aria-describedby="critter-status">
      <button class="critter-show" type="button" aria-pressed="false">Show</button>
    </div>
    <div class="critter-meter" aria-hidden="true"><span></span></div>
    <p class="critter-status" id="critter-status" aria-live="polite">Use 12 or more characters, with a mix of letters, numbers and symbols.</p>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.critter {
  --tone: var(--ui-border-strong);
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 340px;
}
.critter[data-score="1"] { --tone: var(--ui-danger); }
.critter[data-score="2"] { --tone: var(--ui-warning); }
.critter[data-score="3"] { --tone: var(--ui-warning); }
.critter[data-score="4"] { --tone: var(--ui-success); }
.critter[data-score="5"] { --tone: var(--ui-success); }
.critter-face { width: 108px; justify-self: center; overflow: visible; }
.critter-body { fill: var(--tone); transition: fill 0.3s; }
.critter-eyes circle { fill: var(--ui-text); transition: transform 0.2s; }
.critter-mouth { fill: none; stroke: var(--ui-text); stroke-width: 4; stroke-linecap: round; transition: d 0.3s; }
.critter-paws ellipse { fill: var(--tone); stroke: var(--ui-text); stroke-width: 2.5; filter: brightness(1.1); }
.critter-paws { transform: translateY(46px); transition: transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1); }
.critter.is-shy .critter-paws { transform: translateY(0); }
.critter.is-peek .critter-paws { transform: translateY(12px); }
.critter-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.critter-row {
  display: flex;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.critter-row:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.critter-input { flex: 1; min-width: 0; padding: 10px 12px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; }
.critter-input:focus { outline: none; }
.critter-show {
  padding: 0 14px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  color: var(--ui-accent);
  background: none;
  border: 0;
  cursor: pointer;
}
.critter-show:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -4px; border-radius: 6px; }
.critter-meter { height: 6px; overflow: hidden; border-radius: 999px; background: var(--ui-surface-2); }
.critter-meter span { display: block; height: 100%; width: calc(var(--fill, 0) * 20%); background: var(--tone); transition: width 0.3s, background-color 0.3s; }
.critter-status { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .critter-paws, .critter-mouth { transition: none; } }
</style>
```

## Svelte

`PasswordCreature.svelte`

```svelte
<!-- tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html -->
<script>
  import { onMount } from 'svelte';
  import './PasswordCreature.css';

  let node;

  function setup(root) {
    const input = root.querySelector('.critter-input');
    const show = root.querySelector('.critter-show');
    const status = root.querySelector('.critter-status');
    const mouth = root.querySelector('.critter-mouth');
    const eyes = root.querySelectorAll('.critter-eyes circle');
    const meter = root.querySelector('.critter-meter');
    const LABELS = [
      'Use 12 or more characters, with a mix of letters, numbers and symbols.',
      'Too weak. Make it longer.',
      'Weak. Add numbers or symbols.',
      'Okay. A few more characters would help.',
      'Strong password.',
      'Excellent. Even the creature is impressed.',
    ];

    const score = (pw) => {
      if (!pw) return 0;
      let s = 1;
      if (pw.length >= 8) s++;
      if (pw.length >= 12) s++;
      if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
      if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
      return Math.min(5, s);
    };
    const mood = () => {
      const hidden = input.type === 'password';
      const focused = document.activeElement === input;
      root.classList.toggle('is-shy', hidden && focused);
      root.classList.toggle('is-peek', !hidden && focused);
    };
    const update = () => {
      const s = score(input.value);
      root.dataset.score = s;
      meter.style.setProperty('--fill', s);
      status.textContent = LABELS[s];
      mouth.setAttribute('d', 'M46 78 Q60 ' + (70 + s * 4) + ' 74 78');
      const look = Math.min(input.value.length, 20) * 0.35 - 3.5;
      eyes.forEach((e) => (e.style.transform = 'translateX(' + look + 'px)'));
    };
    const onShow = () => {
      const reveal = input.type === 'password';
      input.type = reveal ? 'text' : 'password';
      show.textContent = reveal ? 'Hide' : 'Show';
      show.setAttribute('aria-pressed', String(reveal));
      input.focus();
      mood();
    };

    input.addEventListener('input', update);
    input.addEventListener('focus', mood);
    input.addEventListener('blur', mood);
    show.addEventListener('click', onShow);
    update();
    return () => {
      input.removeEventListener('input', update);
      input.removeEventListener('focus', mood);
      input.removeEventListener('blur', mood);
      show.removeEventListener('click', onShow);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="critter" data-score="0">
  <svg class="critter-face" viewBox="0 0 120 110" aria-hidden="true">
    <circle class="critter-body" cx="60" cy="62" r="44"/>
    <g class="critter-eyes"><circle cx="44" cy="54" r="6"/><circle cx="76" cy="54" r="6"/></g>
    <path class="critter-mouth" d="M46 78 Q60 78 74 78"/>
    <g class="critter-paws"><ellipse cx="42" cy="56" rx="15" ry="11"/><ellipse cx="78" cy="56" rx="15" ry="11"/></g>
  </svg>
  <label class="critter-label" for="new-password">Create a password</label>
  <div class="critter-row">
    <input class="critter-input" id="new-password" type="password" autocomplete="new-password" aria-describedby="critter-status">
    <button class="critter-show" type="button" aria-pressed="false">Show</button>
  </div>
  <div class="critter-meter" aria-hidden="true"><span></span></div>
  <p class="critter-status" id="critter-status" aria-live="polite">Use 12 or more characters, with a mix of letters, numbers and symbols.</p>
</div>
```

`PasswordCreature.css`

```css
/* tearsheet password-creature v08beb996 · https://qusaialjbali.github.io/tearsheet/zine/parts/password-creature.html */
.critter {
  --tone: var(--ui-border-strong);
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 340px;
}
.critter[data-score="1"] { --tone: var(--ui-danger); }
.critter[data-score="2"] { --tone: var(--ui-warning); }
.critter[data-score="3"] { --tone: var(--ui-warning); }
.critter[data-score="4"] { --tone: var(--ui-success); }
.critter[data-score="5"] { --tone: var(--ui-success); }
.critter-face { width: 108px; justify-self: center; overflow: visible; }
.critter-body { fill: var(--tone); transition: fill 0.3s; }
.critter-eyes circle { fill: var(--ui-text); transition: transform 0.2s; }
.critter-mouth { fill: none; stroke: var(--ui-text); stroke-width: 4; stroke-linecap: round; transition: d 0.3s; }
.critter-paws ellipse { fill: var(--tone); stroke: var(--ui-text); stroke-width: 2.5; filter: brightness(1.1); }
.critter-paws { transform: translateY(46px); transition: transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1); }
.critter.is-shy .critter-paws { transform: translateY(0); }
.critter.is-peek .critter-paws { transform: translateY(12px); }
.critter-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.critter-row {
  display: flex;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.critter-row:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.critter-input { flex: 1; min-width: 0; padding: 10px 12px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; }
.critter-input:focus { outline: none; }
.critter-show {
  padding: 0 14px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  color: var(--ui-accent);
  background: none;
  border: 0;
  cursor: pointer;
}
.critter-show:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -4px; border-radius: 6px; }
.critter-meter { height: 6px; overflow: hidden; border-radius: 999px; background: var(--ui-surface-2); }
.critter-meter span { display: block; height: 100%; width: calc(var(--fill, 0) * 20%); background: var(--tone); transition: width 0.3s, background-color 0.3s; }
.critter-status { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .critter-paws, .critter-mouth { transition: none; } }
```
