# One-time code (Tearsheet, Forms)

Six-box verification code that auto-advances, handles backspace and accepts a pasted or autofilled code.

**Why it works:** autocomplete="one-time-code" lets phones offer the SMS code. Pasting a full code into any box fills them all, so nobody has to type six times.

**Checked:** axe clean in light and dark; tightest text contrast 17.41:1 (needs 4.5:1); 6 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html -->
<div class="otp">
  <p class="otp-label" id="otp-label">Enter the 6-digit code we sent you</p>
  <div class="otp-boxes" role="group" aria-labelledby="otp-label">
    <input class="otp-box" inputmode="numeric" autocomplete="one-time-code" aria-label="Digit 1">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 2">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 3">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 4">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 5">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 6">
  </div>
</div>
```

`styles.css`

```css
/* tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html */
.otp { display: grid; gap: 12px; justify-items: start; }
.otp-label { margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.otp-boxes { display: flex; gap: 8px; }
.otp-box {
  width: 48px;
  height: 58px;
  font: inherit;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  caret-color: var(--ui-accent);
  font-variant-numeric: tabular-nums;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.otp-box:nth-child(3) { margin-right: 10px; }
.otp-box:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.otp.is-complete .otp-box { border-color: var(--ui-success); }
```

`script.js`

```js
/* tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html */
function setup(root) {
  const boxes = [...root.querySelectorAll('.otp-box')];

  const fill = (start, digits) => {
    digits.slice(0, boxes.length - start).forEach((d, k) => (boxes[start + k].value = d));
    const next = Math.min(start + digits.length, boxes.length - 1);
    boxes[next].focus();
    root.classList.toggle('is-complete', boxes.every((b) => b.value));
  };
  const onInput = (e) => {
    const i = boxes.indexOf(e.target);
    const digits = e.target.value.replace(/\D/g, '').split('');
    e.target.value = '';
    if (digits.length) fill(i, digits);
    else root.classList.remove('is-complete');
  };
  const onKeyDown = (e) => {
    const i = boxes.indexOf(e.target);
    if (e.key === 'Backspace' && !e.target.value && i > 0) boxes[i - 1].focus();
    if (e.key === 'ArrowLeft' && i > 0) boxes[i - 1].focus();
    if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
  };
  const onPaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').split('');
    if (digits.length) fill(boxes.indexOf(e.target), digits);
  };

  boxes.forEach((b) => {
    b.addEventListener('input', onInput);
    b.addEventListener('keydown', onKeyDown);
    b.addEventListener('paste', onPaste);
  });
  return () => boxes.forEach((b) => {
    b.removeEventListener('input', onInput);
    b.removeEventListener('keydown', onKeyDown);
    b.removeEventListener('paste', onPaste);
  });
}

document.querySelectorAll(".otp").forEach(setup);
```

## React

`OtpInput.jsx`

```jsx
/* tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html */
import { useEffect, useRef } from 'react';
import './OtpInput.css';

function setup(root) {
  const boxes = [...root.querySelectorAll('.otp-box')];

  const fill = (start, digits) => {
    digits.slice(0, boxes.length - start).forEach((d, k) => (boxes[start + k].value = d));
    const next = Math.min(start + digits.length, boxes.length - 1);
    boxes[next].focus();
    root.classList.toggle('is-complete', boxes.every((b) => b.value));
  };
  const onInput = (e) => {
    const i = boxes.indexOf(e.target);
    const digits = e.target.value.replace(/\D/g, '').split('');
    e.target.value = '';
    if (digits.length) fill(i, digits);
    else root.classList.remove('is-complete');
  };
  const onKeyDown = (e) => {
    const i = boxes.indexOf(e.target);
    if (e.key === 'Backspace' && !e.target.value && i > 0) boxes[i - 1].focus();
    if (e.key === 'ArrowLeft' && i > 0) boxes[i - 1].focus();
    if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
  };
  const onPaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').split('');
    if (digits.length) fill(boxes.indexOf(e.target), digits);
  };

  boxes.forEach((b) => {
    b.addEventListener('input', onInput);
    b.addEventListener('keydown', onKeyDown);
    b.addEventListener('paste', onPaste);
  });
  return () => boxes.forEach((b) => {
    b.removeEventListener('input', onInput);
    b.removeEventListener('keydown', onKeyDown);
    b.removeEventListener('paste', onPaste);
  });
}

export function OtpInput() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="otp">
      <p className="otp-label" id="otp-label">Enter the 6-digit code we sent you</p>
      <div className="otp-boxes" role="group" aria-labelledby="otp-label">
        <input className="otp-box" inputMode="numeric" autoComplete="one-time-code" aria-label="Digit 1" />
        <input className="otp-box" inputMode="numeric" aria-label="Digit 2" />
        <input className="otp-box" inputMode="numeric" aria-label="Digit 3" />
        <input className="otp-box" inputMode="numeric" aria-label="Digit 4" />
        <input className="otp-box" inputMode="numeric" aria-label="Digit 5" />
        <input className="otp-box" inputMode="numeric" aria-label="Digit 6" />
      </div>
    </div>
  );
}
```

`OtpInput.css`

```css
/* tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html */
.otp { display: grid; gap: 12px; justify-items: start; }
.otp-label { margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.otp-boxes { display: flex; gap: 8px; }
.otp-box {
  width: 48px;
  height: 58px;
  font: inherit;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  caret-color: var(--ui-accent);
  font-variant-numeric: tabular-nums;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.otp-box:nth-child(3) { margin-right: 10px; }
.otp-box:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.otp.is-complete .otp-box { border-color: var(--ui-success); }
```

## Vue

`OtpInput.vue`

```vue
<!-- tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const boxes = [...root.querySelectorAll('.otp-box')];

  const fill = (start, digits) => {
    digits.slice(0, boxes.length - start).forEach((d, k) => (boxes[start + k].value = d));
    const next = Math.min(start + digits.length, boxes.length - 1);
    boxes[next].focus();
    root.classList.toggle('is-complete', boxes.every((b) => b.value));
  };
  const onInput = (e) => {
    const i = boxes.indexOf(e.target);
    const digits = e.target.value.replace(/\D/g, '').split('');
    e.target.value = '';
    if (digits.length) fill(i, digits);
    else root.classList.remove('is-complete');
  };
  const onKeyDown = (e) => {
    const i = boxes.indexOf(e.target);
    if (e.key === 'Backspace' && !e.target.value && i > 0) boxes[i - 1].focus();
    if (e.key === 'ArrowLeft' && i > 0) boxes[i - 1].focus();
    if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
  };
  const onPaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').split('');
    if (digits.length) fill(boxes.indexOf(e.target), digits);
  };

  boxes.forEach((b) => {
    b.addEventListener('input', onInput);
    b.addEventListener('keydown', onKeyDown);
    b.addEventListener('paste', onPaste);
  });
  return () => boxes.forEach((b) => {
    b.removeEventListener('input', onInput);
    b.removeEventListener('keydown', onKeyDown);
    b.removeEventListener('paste', onPaste);
  });
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="otp">
    <p class="otp-label" id="otp-label">Enter the 6-digit code we sent you</p>
    <div class="otp-boxes" role="group" aria-labelledby="otp-label">
      <input class="otp-box" inputmode="numeric" autocomplete="one-time-code" aria-label="Digit 1">
      <input class="otp-box" inputmode="numeric" aria-label="Digit 2">
      <input class="otp-box" inputmode="numeric" aria-label="Digit 3">
      <input class="otp-box" inputmode="numeric" aria-label="Digit 4">
      <input class="otp-box" inputmode="numeric" aria-label="Digit 5">
      <input class="otp-box" inputmode="numeric" aria-label="Digit 6">
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.otp { display: grid; gap: 12px; justify-items: start; }
.otp-label { margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.otp-boxes { display: flex; gap: 8px; }
.otp-box {
  width: 48px;
  height: 58px;
  font: inherit;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  caret-color: var(--ui-accent);
  font-variant-numeric: tabular-nums;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.otp-box:nth-child(3) { margin-right: 10px; }
.otp-box:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.otp.is-complete .otp-box { border-color: var(--ui-success); }
</style>
```

## Svelte

`OtpInput.svelte`

```svelte
<!-- tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html -->
<script>
  import { onMount } from 'svelte';
  import './OtpInput.css';

  let node;

  function setup(root) {
    const boxes = [...root.querySelectorAll('.otp-box')];

    const fill = (start, digits) => {
      digits.slice(0, boxes.length - start).forEach((d, k) => (boxes[start + k].value = d));
      const next = Math.min(start + digits.length, boxes.length - 1);
      boxes[next].focus();
      root.classList.toggle('is-complete', boxes.every((b) => b.value));
    };
    const onInput = (e) => {
      const i = boxes.indexOf(e.target);
      const digits = e.target.value.replace(/\D/g, '').split('');
      e.target.value = '';
      if (digits.length) fill(i, digits);
      else root.classList.remove('is-complete');
    };
    const onKeyDown = (e) => {
      const i = boxes.indexOf(e.target);
      if (e.key === 'Backspace' && !e.target.value && i > 0) boxes[i - 1].focus();
      if (e.key === 'ArrowLeft' && i > 0) boxes[i - 1].focus();
      if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
    };
    const onPaste = (e) => {
      e.preventDefault();
      const digits = e.clipboardData.getData('text').replace(/\D/g, '').split('');
      if (digits.length) fill(boxes.indexOf(e.target), digits);
    };

    boxes.forEach((b) => {
      b.addEventListener('input', onInput);
      b.addEventListener('keydown', onKeyDown);
      b.addEventListener('paste', onPaste);
    });
    return () => boxes.forEach((b) => {
      b.removeEventListener('input', onInput);
      b.removeEventListener('keydown', onKeyDown);
      b.removeEventListener('paste', onPaste);
    });
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="otp">
  <p class="otp-label" id="otp-label">Enter the 6-digit code we sent you</p>
  <div class="otp-boxes" role="group" aria-labelledby="otp-label">
    <input class="otp-box" inputmode="numeric" autocomplete="one-time-code" aria-label="Digit 1">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 2">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 3">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 4">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 5">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 6">
  </div>
</div>
```

`OtpInput.css`

```css
/* tearsheet otp-input v27ea638b · https://qusaialjbali.github.io/tearsheet/zine/parts/otp-input.html */
.otp { display: grid; gap: 12px; justify-items: start; }
.otp-label { margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.otp-boxes { display: flex; gap: 8px; }
.otp-box {
  width: 48px;
  height: 58px;
  font: inherit;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  caret-color: var(--ui-accent);
  font-variant-numeric: tabular-nums;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.otp-box:nth-child(3) { margin-right: 10px; }
.otp-box:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.otp.is-complete .otp-box { border-color: var(--ui-success); }
```
