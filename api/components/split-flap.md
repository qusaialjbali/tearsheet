# Split-flap board (Tearsheet, Weird)

An airport departures board: every letter clatters through the alphabet until it lands.

**Why it works:** Screen readers get the finished message once through a live region; the flipping cells are hidden from them. With reduced motion, letters swap instantly.

**Checked:** axe clean in light and dark; tightest text contrast 11.47:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html -->
<div class="flap-board" data-words="FREE UI|SHIP IT|NO LOGIN|COPY ME">
  <p class="flap-row" aria-hidden="true"></p>
  <p class="flap-sr" aria-live="polite"></p>
  <button class="flap-next" type="button">Next message</button>
</div>
```

`styles.css`

```css
/* tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html */
.flap-board {
  display: grid;
  justify-items: center;
  gap: 18px;
  padding: 26px 24px 22px;
  background: #121214;
  border-radius: 14px;
  box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.06), 0 12px 30px rgb(0 0 0 / 0.3);
}
.flap-row { display: flex; gap: 5px; margin: 0; perspective: 300px; }
.flap {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 62px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 36px;
  font-weight: 700;
  color: #f3f0e6;
  background: linear-gradient(#2a2a2e 50%, #232326 50%);
  border-radius: 5px;
  box-shadow: 0 2px 0 #000;
}
.flap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: #0a0a0b;
}
.flap.is-flip { animation: flap 0.09s ease-in; }
@keyframes flap {
  from { transform: rotateX(-70deg); filter: brightness(0.6); }
}
.flap-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.flap-next {
  padding: 8px 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #121214;
  background: #f5c518;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.flap-next:focus-visible { outline: 3px solid #f5c518; outline-offset: 3px; }
@media (max-width: 480px) {
  .flap { width: 30px; height: 44px; font-size: 24px; }
  .flap-row { gap: 3px; }
}
```

`script.js`

```js
/* tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const words = root.dataset.words.split('|');
  const row = root.querySelector('.flap-row');
  const sr = root.querySelector('.flap-sr');
  const next = root.querySelector('.flap-next');
  const length = Math.max(...words.map((w) => w.length));
  let index = 0;
  let timers = [];

  row.textContent = '';
  const cells = Array.from({ length }, () => {
    const cell = document.createElement('span');
    cell.className = 'flap';
    cell.textContent = ' ';
    row.append(cell);
    return cell;
  });

  const show = (word) => {
    sr.textContent = word;
    timers.forEach(clearInterval);
    timers = [];
    const target = word.padEnd(length, ' ');
    cells.forEach((cell, i) => {
      const goal = target[i];
      if (reduce) {
        cell.textContent = goal;
        return;
      }
      let pos = Math.max(0, CHARS.indexOf(cell.textContent));
      const t = setInterval(() => {
        if (cell.textContent === goal) return clearInterval(t);
        pos = (pos + 1) % CHARS.length;
        cell.textContent = CHARS[pos];
        cell.classList.remove('is-flip');
        void cell.offsetWidth;
        cell.classList.add('is-flip');
      }, 40 + i * 7);
      timers.push(t);
    });
  };
  const onNext = () => {
    index = (index + 1) % words.length;
    show(words[index]);
  };

  next.addEventListener('click', onNext);
  show(words[0]);
  return () => {
    timers.forEach(clearInterval);
    next.removeEventListener('click', onNext);
  };
}

document.querySelectorAll(".flap-board").forEach(setup);
```

## React

`SplitFlap.jsx`

```jsx
/* tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html */
import { useEffect, useRef } from 'react';
import './SplitFlap.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const words = root.dataset.words.split('|');
  const row = root.querySelector('.flap-row');
  const sr = root.querySelector('.flap-sr');
  const next = root.querySelector('.flap-next');
  const length = Math.max(...words.map((w) => w.length));
  let index = 0;
  let timers = [];

  row.textContent = '';
  const cells = Array.from({ length }, () => {
    const cell = document.createElement('span');
    cell.className = 'flap';
    cell.textContent = ' ';
    row.append(cell);
    return cell;
  });

  const show = (word) => {
    sr.textContent = word;
    timers.forEach(clearInterval);
    timers = [];
    const target = word.padEnd(length, ' ');
    cells.forEach((cell, i) => {
      const goal = target[i];
      if (reduce) {
        cell.textContent = goal;
        return;
      }
      let pos = Math.max(0, CHARS.indexOf(cell.textContent));
      const t = setInterval(() => {
        if (cell.textContent === goal) return clearInterval(t);
        pos = (pos + 1) % CHARS.length;
        cell.textContent = CHARS[pos];
        cell.classList.remove('is-flip');
        void cell.offsetWidth;
        cell.classList.add('is-flip');
      }, 40 + i * 7);
      timers.push(t);
    });
  };
  const onNext = () => {
    index = (index + 1) % words.length;
    show(words[index]);
  };

  next.addEventListener('click', onNext);
  show(words[0]);
  return () => {
    timers.forEach(clearInterval);
    next.removeEventListener('click', onNext);
  };
}

export function SplitFlap() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="flap-board" data-words="FREE UI|SHIP IT|NO LOGIN|COPY ME">
      <p className="flap-row" aria-hidden="true"></p>
      <p className="flap-sr" aria-live="polite"></p>
      <button className="flap-next" type="button">Next message</button>
    </div>
  );
}
```

`SplitFlap.css`

```css
/* tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html */
.flap-board {
  display: grid;
  justify-items: center;
  gap: 18px;
  padding: 26px 24px 22px;
  background: #121214;
  border-radius: 14px;
  box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.06), 0 12px 30px rgb(0 0 0 / 0.3);
}
.flap-row { display: flex; gap: 5px; margin: 0; perspective: 300px; }
.flap {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 62px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 36px;
  font-weight: 700;
  color: #f3f0e6;
  background: linear-gradient(#2a2a2e 50%, #232326 50%);
  border-radius: 5px;
  box-shadow: 0 2px 0 #000;
}
.flap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: #0a0a0b;
}
.flap.is-flip { animation: flap 0.09s ease-in; }
@keyframes flap {
  from { transform: rotateX(-70deg); filter: brightness(0.6); }
}
.flap-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.flap-next {
  padding: 8px 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #121214;
  background: #f5c518;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.flap-next:focus-visible { outline: 3px solid #f5c518; outline-offset: 3px; }
@media (max-width: 480px) {
  .flap { width: 30px; height: 44px; font-size: 24px; }
  .flap-row { gap: 3px; }
}
```

## Vue

`SplitFlap.vue`

```vue
<!-- tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const words = root.dataset.words.split('|');
  const row = root.querySelector('.flap-row');
  const sr = root.querySelector('.flap-sr');
  const next = root.querySelector('.flap-next');
  const length = Math.max(...words.map((w) => w.length));
  let index = 0;
  let timers = [];

  row.textContent = '';
  const cells = Array.from({ length }, () => {
    const cell = document.createElement('span');
    cell.className = 'flap';
    cell.textContent = ' ';
    row.append(cell);
    return cell;
  });

  const show = (word) => {
    sr.textContent = word;
    timers.forEach(clearInterval);
    timers = [];
    const target = word.padEnd(length, ' ');
    cells.forEach((cell, i) => {
      const goal = target[i];
      if (reduce) {
        cell.textContent = goal;
        return;
      }
      let pos = Math.max(0, CHARS.indexOf(cell.textContent));
      const t = setInterval(() => {
        if (cell.textContent === goal) return clearInterval(t);
        pos = (pos + 1) % CHARS.length;
        cell.textContent = CHARS[pos];
        cell.classList.remove('is-flip');
        void cell.offsetWidth;
        cell.classList.add('is-flip');
      }, 40 + i * 7);
      timers.push(t);
    });
  };
  const onNext = () => {
    index = (index + 1) % words.length;
    show(words[index]);
  };

  next.addEventListener('click', onNext);
  show(words[0]);
  return () => {
    timers.forEach(clearInterval);
    next.removeEventListener('click', onNext);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="flap-board" data-words="FREE UI|SHIP IT|NO LOGIN|COPY ME">
    <p class="flap-row" aria-hidden="true"></p>
    <p class="flap-sr" aria-live="polite"></p>
    <button class="flap-next" type="button">Next message</button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.flap-board {
  display: grid;
  justify-items: center;
  gap: 18px;
  padding: 26px 24px 22px;
  background: #121214;
  border-radius: 14px;
  box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.06), 0 12px 30px rgb(0 0 0 / 0.3);
}
.flap-row { display: flex; gap: 5px; margin: 0; perspective: 300px; }
.flap {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 62px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 36px;
  font-weight: 700;
  color: #f3f0e6;
  background: linear-gradient(#2a2a2e 50%, #232326 50%);
  border-radius: 5px;
  box-shadow: 0 2px 0 #000;
}
.flap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: #0a0a0b;
}
.flap.is-flip { animation: flap 0.09s ease-in; }
@keyframes flap {
  from { transform: rotateX(-70deg); filter: brightness(0.6); }
}
.flap-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.flap-next {
  padding: 8px 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #121214;
  background: #f5c518;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.flap-next:focus-visible { outline: 3px solid #f5c518; outline-offset: 3px; }
@media (max-width: 480px) {
  .flap { width: 30px; height: 44px; font-size: 24px; }
  .flap-row { gap: 3px; }
}
</style>
```

## Svelte

`SplitFlap.svelte`

```svelte
<!-- tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html -->
<script>
  import { onMount } from 'svelte';
  import './SplitFlap.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const words = root.dataset.words.split('|');
    const row = root.querySelector('.flap-row');
    const sr = root.querySelector('.flap-sr');
    const next = root.querySelector('.flap-next');
    const length = Math.max(...words.map((w) => w.length));
    let index = 0;
    let timers = [];

    row.textContent = '';
    const cells = Array.from({ length }, () => {
      const cell = document.createElement('span');
      cell.className = 'flap';
      cell.textContent = ' ';
      row.append(cell);
      return cell;
    });

    const show = (word) => {
      sr.textContent = word;
      timers.forEach(clearInterval);
      timers = [];
      const target = word.padEnd(length, ' ');
      cells.forEach((cell, i) => {
        const goal = target[i];
        if (reduce) {
          cell.textContent = goal;
          return;
        }
        let pos = Math.max(0, CHARS.indexOf(cell.textContent));
        const t = setInterval(() => {
          if (cell.textContent === goal) return clearInterval(t);
          pos = (pos + 1) % CHARS.length;
          cell.textContent = CHARS[pos];
          cell.classList.remove('is-flip');
          void cell.offsetWidth;
          cell.classList.add('is-flip');
        }, 40 + i * 7);
        timers.push(t);
      });
    };
    const onNext = () => {
      index = (index + 1) % words.length;
      show(words[index]);
    };

    next.addEventListener('click', onNext);
    show(words[0]);
    return () => {
      timers.forEach(clearInterval);
      next.removeEventListener('click', onNext);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="flap-board" data-words="FREE UI|SHIP IT|NO LOGIN|COPY ME">
  <p class="flap-row" aria-hidden="true"></p>
  <p class="flap-sr" aria-live="polite"></p>
  <button class="flap-next" type="button">Next message</button>
</div>
```

`SplitFlap.css`

```css
/* tearsheet split-flap vea81d3b4 · https://qusaialjbali.github.io/tearsheet/zine/parts/split-flap.html */
.flap-board {
  display: grid;
  justify-items: center;
  gap: 18px;
  padding: 26px 24px 22px;
  background: #121214;
  border-radius: 14px;
  box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.06), 0 12px 30px rgb(0 0 0 / 0.3);
}
.flap-row { display: flex; gap: 5px; margin: 0; perspective: 300px; }
.flap {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 62px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 36px;
  font-weight: 700;
  color: #f3f0e6;
  background: linear-gradient(#2a2a2e 50%, #232326 50%);
  border-radius: 5px;
  box-shadow: 0 2px 0 #000;
}
.flap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: #0a0a0b;
}
.flap.is-flip { animation: flap 0.09s ease-in; }
@keyframes flap {
  from { transform: rotateX(-70deg); filter: brightness(0.6); }
}
.flap-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.flap-next {
  padding: 8px 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #121214;
  background: #f5c518;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.flap-next:focus-visible { outline: 3px solid #f5c518; outline-offset: 3px; }
@media (max-width: 480px) {
  .flap { width: 30px; height: 44px; font-size: 24px; }
  .flap-row { gap: 3px; }
}
```
