# Odometer counter (Tearsheet, Weird)

A mechanical counter whose digit wheels roll into place, each a beat after the last.

**Why it works:** The real number lives in a live region for assistive tech. Leading zeros are dimmed, like an old meter.

**Checked:** axe clean in light and dark; tightest text contrast 3.23:1 (needs 3:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html -->
<div class="odo">
  <p class="odo-label">Tickets sold</p>
  <div class="odo-digits" aria-hidden="true"></div>
  <p class="odo-sr" aria-live="polite"></p>
  <div class="odo-actions">
    <button class="odo-btn" type="button" data-add="1">Sell 1</button>
    <button class="odo-btn" type="button" data-add="250">Sell 250</button>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html */
.odo { display: grid; justify-items: center; gap: 14px; }
.odo-label { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ui-muted); }
.odo-digits {
  display: flex;
  gap: 4px;
  padding: 10px;
  background: var(--ui-text);
  border-radius: 12px;
}
.odo-digit {
  height: 64px;
  width: 44px;
  overflow: hidden;
  background: var(--ui-bg);
  border-radius: 6px;
  box-shadow: inset 0 8px 10px -6px rgb(0 0 0 / 0.35), inset 0 -8px 10px -6px rgb(0 0 0 / 0.35);
}
.odo-digit.is-lead { opacity: 0.35; }
.odo-reel { display: grid; transition: transform 0.9s cubic-bezier(0.2, 0.85, 0.25, 1.05); }
.odo-reel span {
  display: grid;
  place-items: center;
  height: 64px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 38px;
  font-weight: 700;
  color: var(--ui-text);
}
.odo-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.odo-actions { display: flex; gap: 8px; }
.odo-btn {
  padding: 9px 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.odo-btn:hover { background: var(--ui-surface-2); }
.odo-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .odo-reel { transition: none; } }
```

`script.js`

```js
/* tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html */
function setup(root) {
  const digitsEl = root.querySelector('.odo-digits');
  const sr = root.querySelector('.odo-sr');
  const buttons = root.querySelectorAll('.odo-btn');
  const PLACES = 6;
  let value = 1287;

  digitsEl.textContent = '';
  const reels = Array.from({ length: PLACES }, (_, i) => {
    const digit = document.createElement('div');
    digit.className = 'odo-digit';
    const reel = document.createElement('div');
    reel.className = 'odo-reel';
    reel.style.transitionDelay = (PLACES - i) * 70 + 'ms';
    for (let n = 0; n < 10; n++) {
      const s = document.createElement('span');
      s.textContent = n;
      reel.append(s);
    }
    digit.append(reel);
    digitsEl.append(digit);
    return reel;
  });

  const render = () => {
    const text = String(value % 10 ** PLACES).padStart(PLACES, '0');
    const firstSignificant = text.search(/[1-9]/);
    reels.forEach((reel, i) => {
      reel.style.transform = 'translateY(' + -Number(text[i]) * 64 + 'px)';
      reel.parentElement.classList.toggle('is-lead', firstSignificant === -1 ? i < PLACES - 1 : i < firstSignificant);
    });
    sr.textContent = value.toLocaleString() + ' tickets sold';
  };
  const onAdd = (e) => {
    value += Number(e.currentTarget.dataset.add);
    render();
  };

  buttons.forEach((b) => b.addEventListener('click', onAdd));
  render();
  return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
}

document.querySelectorAll(".odo").forEach(setup);
```

## React

`Odometer.jsx`

```jsx
/* tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html */
import { useEffect, useRef } from 'react';
import './Odometer.css';

function setup(root) {
  const digitsEl = root.querySelector('.odo-digits');
  const sr = root.querySelector('.odo-sr');
  const buttons = root.querySelectorAll('.odo-btn');
  const PLACES = 6;
  let value = 1287;

  digitsEl.textContent = '';
  const reels = Array.from({ length: PLACES }, (_, i) => {
    const digit = document.createElement('div');
    digit.className = 'odo-digit';
    const reel = document.createElement('div');
    reel.className = 'odo-reel';
    reel.style.transitionDelay = (PLACES - i) * 70 + 'ms';
    for (let n = 0; n < 10; n++) {
      const s = document.createElement('span');
      s.textContent = n;
      reel.append(s);
    }
    digit.append(reel);
    digitsEl.append(digit);
    return reel;
  });

  const render = () => {
    const text = String(value % 10 ** PLACES).padStart(PLACES, '0');
    const firstSignificant = text.search(/[1-9]/);
    reels.forEach((reel, i) => {
      reel.style.transform = 'translateY(' + -Number(text[i]) * 64 + 'px)';
      reel.parentElement.classList.toggle('is-lead', firstSignificant === -1 ? i < PLACES - 1 : i < firstSignificant);
    });
    sr.textContent = value.toLocaleString() + ' tickets sold';
  };
  const onAdd = (e) => {
    value += Number(e.currentTarget.dataset.add);
    render();
  };

  buttons.forEach((b) => b.addEventListener('click', onAdd));
  render();
  return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
}

export function Odometer() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="odo">
      <p className="odo-label">Tickets sold</p>
      <div className="odo-digits" aria-hidden="true"></div>
      <p className="odo-sr" aria-live="polite"></p>
      <div className="odo-actions">
        <button className="odo-btn" type="button" data-add="1">Sell 1</button>
        <button className="odo-btn" type="button" data-add="250">Sell 250</button>
      </div>
    </div>
  );
}
```

`Odometer.css`

```css
/* tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html */
.odo { display: grid; justify-items: center; gap: 14px; }
.odo-label { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ui-muted); }
.odo-digits {
  display: flex;
  gap: 4px;
  padding: 10px;
  background: var(--ui-text);
  border-radius: 12px;
}
.odo-digit {
  height: 64px;
  width: 44px;
  overflow: hidden;
  background: var(--ui-bg);
  border-radius: 6px;
  box-shadow: inset 0 8px 10px -6px rgb(0 0 0 / 0.35), inset 0 -8px 10px -6px rgb(0 0 0 / 0.35);
}
.odo-digit.is-lead { opacity: 0.35; }
.odo-reel { display: grid; transition: transform 0.9s cubic-bezier(0.2, 0.85, 0.25, 1.05); }
.odo-reel span {
  display: grid;
  place-items: center;
  height: 64px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 38px;
  font-weight: 700;
  color: var(--ui-text);
}
.odo-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.odo-actions { display: flex; gap: 8px; }
.odo-btn {
  padding: 9px 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.odo-btn:hover { background: var(--ui-surface-2); }
.odo-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .odo-reel { transition: none; } }
```

## Vue

`Odometer.vue`

```vue
<!-- tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const digitsEl = root.querySelector('.odo-digits');
  const sr = root.querySelector('.odo-sr');
  const buttons = root.querySelectorAll('.odo-btn');
  const PLACES = 6;
  let value = 1287;

  digitsEl.textContent = '';
  const reels = Array.from({ length: PLACES }, (_, i) => {
    const digit = document.createElement('div');
    digit.className = 'odo-digit';
    const reel = document.createElement('div');
    reel.className = 'odo-reel';
    reel.style.transitionDelay = (PLACES - i) * 70 + 'ms';
    for (let n = 0; n < 10; n++) {
      const s = document.createElement('span');
      s.textContent = n;
      reel.append(s);
    }
    digit.append(reel);
    digitsEl.append(digit);
    return reel;
  });

  const render = () => {
    const text = String(value % 10 ** PLACES).padStart(PLACES, '0');
    const firstSignificant = text.search(/[1-9]/);
    reels.forEach((reel, i) => {
      reel.style.transform = 'translateY(' + -Number(text[i]) * 64 + 'px)';
      reel.parentElement.classList.toggle('is-lead', firstSignificant === -1 ? i < PLACES - 1 : i < firstSignificant);
    });
    sr.textContent = value.toLocaleString() + ' tickets sold';
  };
  const onAdd = (e) => {
    value += Number(e.currentTarget.dataset.add);
    render();
  };

  buttons.forEach((b) => b.addEventListener('click', onAdd));
  render();
  return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="odo">
    <p class="odo-label">Tickets sold</p>
    <div class="odo-digits" aria-hidden="true"></div>
    <p class="odo-sr" aria-live="polite"></p>
    <div class="odo-actions">
      <button class="odo-btn" type="button" data-add="1">Sell 1</button>
      <button class="odo-btn" type="button" data-add="250">Sell 250</button>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.odo { display: grid; justify-items: center; gap: 14px; }
.odo-label { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ui-muted); }
.odo-digits {
  display: flex;
  gap: 4px;
  padding: 10px;
  background: var(--ui-text);
  border-radius: 12px;
}
.odo-digit {
  height: 64px;
  width: 44px;
  overflow: hidden;
  background: var(--ui-bg);
  border-radius: 6px;
  box-shadow: inset 0 8px 10px -6px rgb(0 0 0 / 0.35), inset 0 -8px 10px -6px rgb(0 0 0 / 0.35);
}
.odo-digit.is-lead { opacity: 0.35; }
.odo-reel { display: grid; transition: transform 0.9s cubic-bezier(0.2, 0.85, 0.25, 1.05); }
.odo-reel span {
  display: grid;
  place-items: center;
  height: 64px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 38px;
  font-weight: 700;
  color: var(--ui-text);
}
.odo-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.odo-actions { display: flex; gap: 8px; }
.odo-btn {
  padding: 9px 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.odo-btn:hover { background: var(--ui-surface-2); }
.odo-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .odo-reel { transition: none; } }
</style>
```

## Svelte

`Odometer.svelte`

```svelte
<!-- tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html -->
<script>
  import { onMount } from 'svelte';
  import './Odometer.css';

  let node;

  function setup(root) {
    const digitsEl = root.querySelector('.odo-digits');
    const sr = root.querySelector('.odo-sr');
    const buttons = root.querySelectorAll('.odo-btn');
    const PLACES = 6;
    let value = 1287;

    digitsEl.textContent = '';
    const reels = Array.from({ length: PLACES }, (_, i) => {
      const digit = document.createElement('div');
      digit.className = 'odo-digit';
      const reel = document.createElement('div');
      reel.className = 'odo-reel';
      reel.style.transitionDelay = (PLACES - i) * 70 + 'ms';
      for (let n = 0; n < 10; n++) {
        const s = document.createElement('span');
        s.textContent = n;
        reel.append(s);
      }
      digit.append(reel);
      digitsEl.append(digit);
      return reel;
    });

    const render = () => {
      const text = String(value % 10 ** PLACES).padStart(PLACES, '0');
      const firstSignificant = text.search(/[1-9]/);
      reels.forEach((reel, i) => {
        reel.style.transform = 'translateY(' + -Number(text[i]) * 64 + 'px)';
        reel.parentElement.classList.toggle('is-lead', firstSignificant === -1 ? i < PLACES - 1 : i < firstSignificant);
      });
      sr.textContent = value.toLocaleString() + ' tickets sold';
    };
    const onAdd = (e) => {
      value += Number(e.currentTarget.dataset.add);
      render();
    };

    buttons.forEach((b) => b.addEventListener('click', onAdd));
    render();
    return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="odo">
  <p class="odo-label">Tickets sold</p>
  <div class="odo-digits" aria-hidden="true"></div>
  <p class="odo-sr" aria-live="polite"></p>
  <div class="odo-actions">
    <button class="odo-btn" type="button" data-add="1">Sell 1</button>
    <button class="odo-btn" type="button" data-add="250">Sell 250</button>
  </div>
</div>
```

`Odometer.css`

```css
/* tearsheet odometer v4d4bdac7 · https://qusaialjbali.github.io/tearsheet/zine/parts/odometer.html */
.odo { display: grid; justify-items: center; gap: 14px; }
.odo-label { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ui-muted); }
.odo-digits {
  display: flex;
  gap: 4px;
  padding: 10px;
  background: var(--ui-text);
  border-radius: 12px;
}
.odo-digit {
  height: 64px;
  width: 44px;
  overflow: hidden;
  background: var(--ui-bg);
  border-radius: 6px;
  box-shadow: inset 0 8px 10px -6px rgb(0 0 0 / 0.35), inset 0 -8px 10px -6px rgb(0 0 0 / 0.35);
}
.odo-digit.is-lead { opacity: 0.35; }
.odo-reel { display: grid; transition: transform 0.9s cubic-bezier(0.2, 0.85, 0.25, 1.05); }
.odo-reel span {
  display: grid;
  place-items: center;
  height: 64px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 38px;
  font-weight: 700;
  color: var(--ui-text);
}
.odo-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.odo-actions { display: flex; gap: 8px; }
.odo-btn {
  padding: 9px 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.odo-btn:hover { background: var(--ui-surface-2); }
.odo-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .odo-reel { transition: none; } }
```
