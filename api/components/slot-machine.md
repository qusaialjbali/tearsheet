# Idea slot machine (Tearsheet, Weird)

Three reels spin and land one by one on a random brief: a mood, a colour and a component to build.

**Why it works:** The result is written to a live region once the last reel stops. Reduced motion skips the spin and shows the result straight away.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html -->
<div class="slots">
  <div class="slots-window" aria-hidden="true">
    <div class="reel" data-words="Calm|Loud|Tiny|Wild|Polite|Moody"></div>
    <div class="reel" data-words="pink|blue|ink|lime|amber|violet"></div>
    <div class="reel" data-words="button|modal|chart|toast|menu|card"></div>
  </div>
  <p class="slots-result" aria-live="polite">Pull for a brief</p>
  <button class="slots-pull" type="button">Spin</button>
</div>
```

`styles.css`

```css
/* tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html */
.slots { display: grid; justify-items: center; gap: 14px; }
.slots-window { display: flex; gap: 6px; padding: 10px; background: #1b1b20; border-radius: 16px; box-shadow: inset 0 3px 8px rgb(0 0 0 / 0.5); }
.reel { width: 110px; height: 56px; overflow: hidden; background: #fafaf7; border-radius: 8px; box-shadow: inset 0 10px 10px -8px rgb(0 0 0 / 0.4), inset 0 -10px 10px -8px rgb(0 0 0 / 0.4); }
.reel span { display: grid; place-items: center; height: 56px; font-size: 20px; font-weight: 800; color: #1b1b20; }
.slots-result { margin: 0; min-height: 1.5em; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.slots-pull { min-width: 120px; padding: 12px 24px; font: inherit; font-size: 15px; font-weight: 800; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 999px; cursor: pointer; box-shadow: 0 4px 0 var(--ui-accent-hover); }
.slots-pull:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ui-accent-hover); }
.slots-pull:disabled { opacity: 0.6; cursor: default; }
.slots-pull:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

`script.js`

```js
/* tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reels = [...root.querySelectorAll('.reel')];
  const result = root.querySelector('.slots-result');
  const pull = root.querySelector('.slots-pull');
  const H = 56, LOOPS = 5;
  const words = reels.map((r) => r.dataset.words.split('|'));
  // each reel gets a long strip of its words, repeated so it can spin several loops
  const tracks = reels.map((r, i) => {
    const strip = document.createElement('div');
    for (let n = 0; n < LOOPS + 1; n++) words[i].forEach((w) => { const s = document.createElement('span'); s.textContent = w; strip.append(s); });
    r.replaceChildren(strip);
    return strip;
  });
  let timers = [];
  const onPull = () => {
    pull.disabled = true;
    result.textContent = 'Spinning…';
    const picks = words.map((w) => Math.floor(Math.random() * w.length));
    tracks.forEach((t, i) => {
      t.style.transition = 'none';
      t.style.transform = 'translateY(0)';
      void t.offsetHeight;
      const target = (LOOPS * words[i].length + picks[i]) * H;
      t.style.transition = reduce ? 'none' : 'transform ' + (1.2 + i * 0.45) + 's cubic-bezier(0.16, 1, 0.3, 1)';
      t.style.transform = 'translateY(' + -target + 'px)';
    });
    timers.push(setTimeout(() => {
      result.textContent = picks.map((p, i) => words[i][p]).join(' ') + '. Go build it.';
      pull.disabled = false;
    }, reduce ? 0 : 1250 + 2 * 450));
  };
  pull.addEventListener('click', onPull);
  return () => { timers.forEach(clearTimeout); pull.removeEventListener('click', onPull); };
}

document.querySelectorAll(".slots").forEach(setup);
```

## React

`SlotMachine.jsx`

```jsx
/* tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html */
import { useEffect, useRef } from 'react';
import './SlotMachine.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reels = [...root.querySelectorAll('.reel')];
  const result = root.querySelector('.slots-result');
  const pull = root.querySelector('.slots-pull');
  const H = 56, LOOPS = 5;
  const words = reels.map((r) => r.dataset.words.split('|'));
  // each reel gets a long strip of its words, repeated so it can spin several loops
  const tracks = reels.map((r, i) => {
    const strip = document.createElement('div');
    for (let n = 0; n < LOOPS + 1; n++) words[i].forEach((w) => { const s = document.createElement('span'); s.textContent = w; strip.append(s); });
    r.replaceChildren(strip);
    return strip;
  });
  let timers = [];
  const onPull = () => {
    pull.disabled = true;
    result.textContent = 'Spinning…';
    const picks = words.map((w) => Math.floor(Math.random() * w.length));
    tracks.forEach((t, i) => {
      t.style.transition = 'none';
      t.style.transform = 'translateY(0)';
      void t.offsetHeight;
      const target = (LOOPS * words[i].length + picks[i]) * H;
      t.style.transition = reduce ? 'none' : 'transform ' + (1.2 + i * 0.45) + 's cubic-bezier(0.16, 1, 0.3, 1)';
      t.style.transform = 'translateY(' + -target + 'px)';
    });
    timers.push(setTimeout(() => {
      result.textContent = picks.map((p, i) => words[i][p]).join(' ') + '. Go build it.';
      pull.disabled = false;
    }, reduce ? 0 : 1250 + 2 * 450));
  };
  pull.addEventListener('click', onPull);
  return () => { timers.forEach(clearTimeout); pull.removeEventListener('click', onPull); };
}

export function SlotMachine() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="slots">
      <div className="slots-window" aria-hidden="true">
        <div className="reel" data-words="Calm|Loud|Tiny|Wild|Polite|Moody"></div>
        <div className="reel" data-words="pink|blue|ink|lime|amber|violet"></div>
        <div className="reel" data-words="button|modal|chart|toast|menu|card"></div>
      </div>
      <p className="slots-result" aria-live="polite">Pull for a brief</p>
      <button className="slots-pull" type="button">Spin</button>
    </div>
  );
}
```

`SlotMachine.css`

```css
/* tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html */
.slots { display: grid; justify-items: center; gap: 14px; }
.slots-window { display: flex; gap: 6px; padding: 10px; background: #1b1b20; border-radius: 16px; box-shadow: inset 0 3px 8px rgb(0 0 0 / 0.5); }
.reel { width: 110px; height: 56px; overflow: hidden; background: #fafaf7; border-radius: 8px; box-shadow: inset 0 10px 10px -8px rgb(0 0 0 / 0.4), inset 0 -10px 10px -8px rgb(0 0 0 / 0.4); }
.reel span { display: grid; place-items: center; height: 56px; font-size: 20px; font-weight: 800; color: #1b1b20; }
.slots-result { margin: 0; min-height: 1.5em; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.slots-pull { min-width: 120px; padding: 12px 24px; font: inherit; font-size: 15px; font-weight: 800; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 999px; cursor: pointer; box-shadow: 0 4px 0 var(--ui-accent-hover); }
.slots-pull:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ui-accent-hover); }
.slots-pull:disabled { opacity: 0.6; cursor: default; }
.slots-pull:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`SlotMachine.vue`

```vue
<!-- tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reels = [...root.querySelectorAll('.reel')];
  const result = root.querySelector('.slots-result');
  const pull = root.querySelector('.slots-pull');
  const H = 56, LOOPS = 5;
  const words = reels.map((r) => r.dataset.words.split('|'));
  // each reel gets a long strip of its words, repeated so it can spin several loops
  const tracks = reels.map((r, i) => {
    const strip = document.createElement('div');
    for (let n = 0; n < LOOPS + 1; n++) words[i].forEach((w) => { const s = document.createElement('span'); s.textContent = w; strip.append(s); });
    r.replaceChildren(strip);
    return strip;
  });
  let timers = [];
  const onPull = () => {
    pull.disabled = true;
    result.textContent = 'Spinning…';
    const picks = words.map((w) => Math.floor(Math.random() * w.length));
    tracks.forEach((t, i) => {
      t.style.transition = 'none';
      t.style.transform = 'translateY(0)';
      void t.offsetHeight;
      const target = (LOOPS * words[i].length + picks[i]) * H;
      t.style.transition = reduce ? 'none' : 'transform ' + (1.2 + i * 0.45) + 's cubic-bezier(0.16, 1, 0.3, 1)';
      t.style.transform = 'translateY(' + -target + 'px)';
    });
    timers.push(setTimeout(() => {
      result.textContent = picks.map((p, i) => words[i][p]).join(' ') + '. Go build it.';
      pull.disabled = false;
    }, reduce ? 0 : 1250 + 2 * 450));
  };
  pull.addEventListener('click', onPull);
  return () => { timers.forEach(clearTimeout); pull.removeEventListener('click', onPull); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="slots">
    <div class="slots-window" aria-hidden="true">
      <div class="reel" data-words="Calm|Loud|Tiny|Wild|Polite|Moody"></div>
      <div class="reel" data-words="pink|blue|ink|lime|amber|violet"></div>
      <div class="reel" data-words="button|modal|chart|toast|menu|card"></div>
    </div>
    <p class="slots-result" aria-live="polite">Pull for a brief</p>
    <button class="slots-pull" type="button">Spin</button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.slots { display: grid; justify-items: center; gap: 14px; }
.slots-window { display: flex; gap: 6px; padding: 10px; background: #1b1b20; border-radius: 16px; box-shadow: inset 0 3px 8px rgb(0 0 0 / 0.5); }
.reel { width: 110px; height: 56px; overflow: hidden; background: #fafaf7; border-radius: 8px; box-shadow: inset 0 10px 10px -8px rgb(0 0 0 / 0.4), inset 0 -10px 10px -8px rgb(0 0 0 / 0.4); }
.reel span { display: grid; place-items: center; height: 56px; font-size: 20px; font-weight: 800; color: #1b1b20; }
.slots-result { margin: 0; min-height: 1.5em; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.slots-pull { min-width: 120px; padding: 12px 24px; font: inherit; font-size: 15px; font-weight: 800; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 999px; cursor: pointer; box-shadow: 0 4px 0 var(--ui-accent-hover); }
.slots-pull:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ui-accent-hover); }
.slots-pull:disabled { opacity: 0.6; cursor: default; }
.slots-pull:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`SlotMachine.svelte`

```svelte
<!-- tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html -->
<script>
  import { onMount } from 'svelte';
  import './SlotMachine.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reels = [...root.querySelectorAll('.reel')];
    const result = root.querySelector('.slots-result');
    const pull = root.querySelector('.slots-pull');
    const H = 56, LOOPS = 5;
    const words = reels.map((r) => r.dataset.words.split('|'));
    // each reel gets a long strip of its words, repeated so it can spin several loops
    const tracks = reels.map((r, i) => {
      const strip = document.createElement('div');
      for (let n = 0; n < LOOPS + 1; n++) words[i].forEach((w) => { const s = document.createElement('span'); s.textContent = w; strip.append(s); });
      r.replaceChildren(strip);
      return strip;
    });
    let timers = [];
    const onPull = () => {
      pull.disabled = true;
      result.textContent = 'Spinning…';
      const picks = words.map((w) => Math.floor(Math.random() * w.length));
      tracks.forEach((t, i) => {
        t.style.transition = 'none';
        t.style.transform = 'translateY(0)';
        void t.offsetHeight;
        const target = (LOOPS * words[i].length + picks[i]) * H;
        t.style.transition = reduce ? 'none' : 'transform ' + (1.2 + i * 0.45) + 's cubic-bezier(0.16, 1, 0.3, 1)';
        t.style.transform = 'translateY(' + -target + 'px)';
      });
      timers.push(setTimeout(() => {
        result.textContent = picks.map((p, i) => words[i][p]).join(' ') + '. Go build it.';
        pull.disabled = false;
      }, reduce ? 0 : 1250 + 2 * 450));
    };
    pull.addEventListener('click', onPull);
    return () => { timers.forEach(clearTimeout); pull.removeEventListener('click', onPull); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="slots">
  <div class="slots-window" aria-hidden="true">
    <div class="reel" data-words="Calm|Loud|Tiny|Wild|Polite|Moody"></div>
    <div class="reel" data-words="pink|blue|ink|lime|amber|violet"></div>
    <div class="reel" data-words="button|modal|chart|toast|menu|card"></div>
  </div>
  <p class="slots-result" aria-live="polite">Pull for a brief</p>
  <button class="slots-pull" type="button">Spin</button>
</div>
```

`SlotMachine.css`

```css
/* tearsheet slot-machine vf05d6f2c · https://qusaialjbali.github.io/tearsheet/zine/parts/slot-machine.html */
.slots { display: grid; justify-items: center; gap: 14px; }
.slots-window { display: flex; gap: 6px; padding: 10px; background: #1b1b20; border-radius: 16px; box-shadow: inset 0 3px 8px rgb(0 0 0 / 0.5); }
.reel { width: 110px; height: 56px; overflow: hidden; background: #fafaf7; border-radius: 8px; box-shadow: inset 0 10px 10px -8px rgb(0 0 0 / 0.4), inset 0 -10px 10px -8px rgb(0 0 0 / 0.4); }
.reel span { display: grid; place-items: center; height: 56px; font-size: 20px; font-weight: 800; color: #1b1b20; }
.slots-result { margin: 0; min-height: 1.5em; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.slots-pull { min-width: 120px; padding: 12px 24px; font: inherit; font-size: 15px; font-weight: 800; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 999px; cursor: pointer; box-shadow: 0 4px 0 var(--ui-accent-hover); }
.slots-pull:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ui-accent-hover); }
.slots-pull:disabled { opacity: 0.6; cursor: default; }
.slots-pull:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```
