# Hold to confirm (Tearsheet, Weird)

A destructive button you have to press and hold, so a stray click can never delete anything.

**Why it works:** Works with mouse, touch, Space and Enter. Letting go early cancels. Tell people they need to hold, right next to the button.

**Checked:** axe clean in light and dark; tightest text contrast 5.24:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html -->
<div class="hold-demo">
  <button class="hold" type="button" aria-describedby="hold-hint">
    <span class="hold-fill" aria-hidden="true"></span>
    <span class="hold-label">Hold to delete</span>
  </button>
  <p class="hold-hint" id="hold-hint">Press and hold for 1.5 seconds</p>
</div>
```

`styles.css`

```css
/* tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html */
.hold-demo { display: grid; justify-items: center; gap: 10px; }
.hold {
  position: relative;
  overflow: hidden;
  min-width: 220px;
  padding: 14px 24px;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  color: var(--ui-danger);
  background: var(--ui-danger-soft);
  border: 2px solid var(--ui-danger);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.hold:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.hold-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-danger);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-out;
}
.hold.is-holding .hold-fill { transform: scaleX(1); transition: transform 1.5s linear; }
.hold-label { position: relative; transition: color 0.2s; }
.hold.is-holding .hold-label, .hold.is-done .hold-label { color: var(--ui-danger-text); }
.hold.is-done .hold-fill { transform: scaleX(1); }
.hold.is-holding { animation: hold-shake 0.12s 1.1s 3; }
@keyframes hold-shake { 50% { translate: 2px 0; } }
.hold-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .hold.is-holding { animation: none; } }
```

`script.js`

```js
/* tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html */
function setup(root) {
  const button = root.querySelector('.hold');
  const label = root.querySelector('.hold-label');
  const original = label.textContent;
  let timer;
  let resetTimer;

  const start = () => {
    if (button.classList.contains('is-done')) return;
    button.classList.add('is-holding');
    timer = setTimeout(() => {
      button.classList.remove('is-holding');
      button.classList.add('is-done');
      label.textContent = 'Deleted';
      resetTimer = setTimeout(() => {
        button.classList.remove('is-done');
        label.textContent = original;
      }, 2200);
    }, 1500);
  };
  const cancel = () => {
    clearTimeout(timer);
    button.classList.remove('is-holding');
  };
  const onKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault();
      start();
    }
  };
  const onKeyUp = (e) => {
    if (e.key === ' ' || e.key === 'Enter') cancel();
  };

  button.addEventListener('pointerdown', start);
  button.addEventListener('pointerup', cancel);
  button.addEventListener('pointerleave', cancel);
  button.addEventListener('keydown', onKeyDown);
  button.addEventListener('keyup', onKeyUp);
  return () => {
    clearTimeout(timer);
    clearTimeout(resetTimer);
    button.removeEventListener('pointerdown', start);
    button.removeEventListener('pointerup', cancel);
    button.removeEventListener('pointerleave', cancel);
    button.removeEventListener('keydown', onKeyDown);
    button.removeEventListener('keyup', onKeyUp);
  };
}

document.querySelectorAll(".hold-demo").forEach(setup);
```

## React

`HoldToConfirm.jsx`

```jsx
/* tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html */
import { useEffect, useRef } from 'react';
import './HoldToConfirm.css';

function setup(root) {
  const button = root.querySelector('.hold');
  const label = root.querySelector('.hold-label');
  const original = label.textContent;
  let timer;
  let resetTimer;

  const start = () => {
    if (button.classList.contains('is-done')) return;
    button.classList.add('is-holding');
    timer = setTimeout(() => {
      button.classList.remove('is-holding');
      button.classList.add('is-done');
      label.textContent = 'Deleted';
      resetTimer = setTimeout(() => {
        button.classList.remove('is-done');
        label.textContent = original;
      }, 2200);
    }, 1500);
  };
  const cancel = () => {
    clearTimeout(timer);
    button.classList.remove('is-holding');
  };
  const onKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault();
      start();
    }
  };
  const onKeyUp = (e) => {
    if (e.key === ' ' || e.key === 'Enter') cancel();
  };

  button.addEventListener('pointerdown', start);
  button.addEventListener('pointerup', cancel);
  button.addEventListener('pointerleave', cancel);
  button.addEventListener('keydown', onKeyDown);
  button.addEventListener('keyup', onKeyUp);
  return () => {
    clearTimeout(timer);
    clearTimeout(resetTimer);
    button.removeEventListener('pointerdown', start);
    button.removeEventListener('pointerup', cancel);
    button.removeEventListener('pointerleave', cancel);
    button.removeEventListener('keydown', onKeyDown);
    button.removeEventListener('keyup', onKeyUp);
  };
}

export function HoldToConfirm() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="hold-demo">
      <button className="hold" type="button" aria-describedby="hold-hint">
        <span className="hold-fill" aria-hidden="true"></span>
        <span className="hold-label">Hold to delete</span>
      </button>
      <p className="hold-hint" id="hold-hint">Press and hold for 1.5 seconds</p>
    </div>
  );
}
```

`HoldToConfirm.css`

```css
/* tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html */
.hold-demo { display: grid; justify-items: center; gap: 10px; }
.hold {
  position: relative;
  overflow: hidden;
  min-width: 220px;
  padding: 14px 24px;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  color: var(--ui-danger);
  background: var(--ui-danger-soft);
  border: 2px solid var(--ui-danger);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.hold:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.hold-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-danger);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-out;
}
.hold.is-holding .hold-fill { transform: scaleX(1); transition: transform 1.5s linear; }
.hold-label { position: relative; transition: color 0.2s; }
.hold.is-holding .hold-label, .hold.is-done .hold-label { color: var(--ui-danger-text); }
.hold.is-done .hold-fill { transform: scaleX(1); }
.hold.is-holding { animation: hold-shake 0.12s 1.1s 3; }
@keyframes hold-shake { 50% { translate: 2px 0; } }
.hold-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .hold.is-holding { animation: none; } }
```

## Vue

`HoldToConfirm.vue`

```vue
<!-- tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const button = root.querySelector('.hold');
  const label = root.querySelector('.hold-label');
  const original = label.textContent;
  let timer;
  let resetTimer;

  const start = () => {
    if (button.classList.contains('is-done')) return;
    button.classList.add('is-holding');
    timer = setTimeout(() => {
      button.classList.remove('is-holding');
      button.classList.add('is-done');
      label.textContent = 'Deleted';
      resetTimer = setTimeout(() => {
        button.classList.remove('is-done');
        label.textContent = original;
      }, 2200);
    }, 1500);
  };
  const cancel = () => {
    clearTimeout(timer);
    button.classList.remove('is-holding');
  };
  const onKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault();
      start();
    }
  };
  const onKeyUp = (e) => {
    if (e.key === ' ' || e.key === 'Enter') cancel();
  };

  button.addEventListener('pointerdown', start);
  button.addEventListener('pointerup', cancel);
  button.addEventListener('pointerleave', cancel);
  button.addEventListener('keydown', onKeyDown);
  button.addEventListener('keyup', onKeyUp);
  return () => {
    clearTimeout(timer);
    clearTimeout(resetTimer);
    button.removeEventListener('pointerdown', start);
    button.removeEventListener('pointerup', cancel);
    button.removeEventListener('pointerleave', cancel);
    button.removeEventListener('keydown', onKeyDown);
    button.removeEventListener('keyup', onKeyUp);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="hold-demo">
    <button class="hold" type="button" aria-describedby="hold-hint">
      <span class="hold-fill" aria-hidden="true"></span>
      <span class="hold-label">Hold to delete</span>
    </button>
    <p class="hold-hint" id="hold-hint">Press and hold for 1.5 seconds</p>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.hold-demo { display: grid; justify-items: center; gap: 10px; }
.hold {
  position: relative;
  overflow: hidden;
  min-width: 220px;
  padding: 14px 24px;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  color: var(--ui-danger);
  background: var(--ui-danger-soft);
  border: 2px solid var(--ui-danger);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.hold:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.hold-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-danger);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-out;
}
.hold.is-holding .hold-fill { transform: scaleX(1); transition: transform 1.5s linear; }
.hold-label { position: relative; transition: color 0.2s; }
.hold.is-holding .hold-label, .hold.is-done .hold-label { color: var(--ui-danger-text); }
.hold.is-done .hold-fill { transform: scaleX(1); }
.hold.is-holding { animation: hold-shake 0.12s 1.1s 3; }
@keyframes hold-shake { 50% { translate: 2px 0; } }
.hold-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .hold.is-holding { animation: none; } }
</style>
```

## Svelte

`HoldToConfirm.svelte`

```svelte
<!-- tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html -->
<script>
  import { onMount } from 'svelte';
  import './HoldToConfirm.css';

  let node;

  function setup(root) {
    const button = root.querySelector('.hold');
    const label = root.querySelector('.hold-label');
    const original = label.textContent;
    let timer;
    let resetTimer;

    const start = () => {
      if (button.classList.contains('is-done')) return;
      button.classList.add('is-holding');
      timer = setTimeout(() => {
        button.classList.remove('is-holding');
        button.classList.add('is-done');
        label.textContent = 'Deleted';
        resetTimer = setTimeout(() => {
          button.classList.remove('is-done');
          label.textContent = original;
        }, 2200);
      }, 1500);
    };
    const cancel = () => {
      clearTimeout(timer);
      button.classList.remove('is-holding');
    };
    const onKeyDown = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault();
        start();
      }
    };
    const onKeyUp = (e) => {
      if (e.key === ' ' || e.key === 'Enter') cancel();
    };

    button.addEventListener('pointerdown', start);
    button.addEventListener('pointerup', cancel);
    button.addEventListener('pointerleave', cancel);
    button.addEventListener('keydown', onKeyDown);
    button.addEventListener('keyup', onKeyUp);
    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
      button.removeEventListener('pointerdown', start);
      button.removeEventListener('pointerup', cancel);
      button.removeEventListener('pointerleave', cancel);
      button.removeEventListener('keydown', onKeyDown);
      button.removeEventListener('keyup', onKeyUp);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="hold-demo">
  <button class="hold" type="button" aria-describedby="hold-hint">
    <span class="hold-fill" aria-hidden="true"></span>
    <span class="hold-label">Hold to delete</span>
  </button>
  <p class="hold-hint" id="hold-hint">Press and hold for 1.5 seconds</p>
</div>
```

`HoldToConfirm.css`

```css
/* tearsheet hold-to-confirm v54b2d2e1 · https://qusaialjbali.github.io/tearsheet/zine/parts/hold-to-confirm.html */
.hold-demo { display: grid; justify-items: center; gap: 10px; }
.hold {
  position: relative;
  overflow: hidden;
  min-width: 220px;
  padding: 14px 24px;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  color: var(--ui-danger);
  background: var(--ui-danger-soft);
  border: 2px solid var(--ui-danger);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.hold:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.hold-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-danger);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-out;
}
.hold.is-holding .hold-fill { transform: scaleX(1); transition: transform 1.5s linear; }
.hold-label { position: relative; transition: color 0.2s; }
.hold.is-holding .hold-label, .hold.is-done .hold-label { color: var(--ui-danger-text); }
.hold.is-done .hold-fill { transform: scaleX(1); }
.hold.is-holding { animation: hold-shake 0.12s 1.1s 3; }
@keyframes hold-shake { 50% { translate: 2px 0; } }
.hold-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .hold.is-holding { animation: none; } }
```
