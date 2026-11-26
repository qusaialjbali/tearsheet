# Decoder text (Tearsheet, Weird)

A headline that decrypts itself from noise, one letter locking in at a time.

**Why it works:** The real sentence sits in visually hidden text and the scrambled copy is aria-hidden, so screen readers never hear the noise. It plays on hover and on the button, never on its own loop.

**Checked:** axe clean in light and dark; tightest text contrast 17.41:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html -->
<div class="decode">
  <p class="decode-text"><span class="decode-sr">Design is how it works</span><span class="decode-show" aria-hidden="true">Design is how it works</span></p>
  <button class="decode-btn" type="button">Decode again</button>
</div>
```

`styles.css`

```css
/* tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html */
.decode { display: grid; justify-items: center; gap: 16px; }
.decode-text {
  margin: 0;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ui-text);
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  cursor: default;
}
.decode-noise { color: var(--ui-accent); }
.decode-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.decode-btn {
  padding: 8px 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: none;
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.decode-btn:hover { background: var(--ui-surface-2); }
.decode-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

`script.js`

```js
/* tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = '!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ';
  const textEl = root.querySelector('.decode-text');
  const span = textEl.querySelector('.decode-show');
  const button = root.querySelector('.decode-btn');
  const text = span.textContent;
  let raf;

  const run = () => {
    if (reduce) return;
    cancelAnimationFrame(raf);
    let frame = 0;
    const tick = () => {
      const frag = document.createDocumentFragment();
      let done = true;
      [...text].forEach((ch, i) => {
        if (ch === ' ' || frame > i * 2 + 8) {
          frag.append(ch);
        } else {
          done = false;
          const noise = document.createElement('span');
          noise.className = 'decode-noise';
          noise.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          frag.append(noise);
        }
      });
      span.replaceChildren(frag);
      frame++;
      if (!done) raf = requestAnimationFrame(tick);
    };
    tick();
  };

  textEl.addEventListener('pointerenter', run);
  button.addEventListener('click', run);
  run();
  return () => {
    cancelAnimationFrame(raf);
    textEl.removeEventListener('pointerenter', run);
    button.removeEventListener('click', run);
  };
}

document.querySelectorAll(".decode").forEach(setup);
```

## React

`ScrambleText.jsx`

```jsx
/* tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html */
import { useEffect, useRef } from 'react';
import './ScrambleText.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = '!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ';
  const textEl = root.querySelector('.decode-text');
  const span = textEl.querySelector('.decode-show');
  const button = root.querySelector('.decode-btn');
  const text = span.textContent;
  let raf;

  const run = () => {
    if (reduce) return;
    cancelAnimationFrame(raf);
    let frame = 0;
    const tick = () => {
      const frag = document.createDocumentFragment();
      let done = true;
      [...text].forEach((ch, i) => {
        if (ch === ' ' || frame > i * 2 + 8) {
          frag.append(ch);
        } else {
          done = false;
          const noise = document.createElement('span');
          noise.className = 'decode-noise';
          noise.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          frag.append(noise);
        }
      });
      span.replaceChildren(frag);
      frame++;
      if (!done) raf = requestAnimationFrame(tick);
    };
    tick();
  };

  textEl.addEventListener('pointerenter', run);
  button.addEventListener('click', run);
  run();
  return () => {
    cancelAnimationFrame(raf);
    textEl.removeEventListener('pointerenter', run);
    button.removeEventListener('click', run);
  };
}

export function ScrambleText() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="decode">
      <p className="decode-text"><span className="decode-sr">Design is how it works</span><span className="decode-show" aria-hidden="true">Design is how it works</span></p>
      <button className="decode-btn" type="button">Decode again</button>
    </div>
  );
}
```

`ScrambleText.css`

```css
/* tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html */
.decode { display: grid; justify-items: center; gap: 16px; }
.decode-text {
  margin: 0;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ui-text);
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  cursor: default;
}
.decode-noise { color: var(--ui-accent); }
.decode-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.decode-btn {
  padding: 8px 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: none;
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.decode-btn:hover { background: var(--ui-surface-2); }
.decode-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`ScrambleText.vue`

```vue
<!-- tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = '!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ';
  const textEl = root.querySelector('.decode-text');
  const span = textEl.querySelector('.decode-show');
  const button = root.querySelector('.decode-btn');
  const text = span.textContent;
  let raf;

  const run = () => {
    if (reduce) return;
    cancelAnimationFrame(raf);
    let frame = 0;
    const tick = () => {
      const frag = document.createDocumentFragment();
      let done = true;
      [...text].forEach((ch, i) => {
        if (ch === ' ' || frame > i * 2 + 8) {
          frag.append(ch);
        } else {
          done = false;
          const noise = document.createElement('span');
          noise.className = 'decode-noise';
          noise.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          frag.append(noise);
        }
      });
      span.replaceChildren(frag);
      frame++;
      if (!done) raf = requestAnimationFrame(tick);
    };
    tick();
  };

  textEl.addEventListener('pointerenter', run);
  button.addEventListener('click', run);
  run();
  return () => {
    cancelAnimationFrame(raf);
    textEl.removeEventListener('pointerenter', run);
    button.removeEventListener('click', run);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="decode">
    <p class="decode-text"><span class="decode-sr">Design is how it works</span><span class="decode-show" aria-hidden="true">Design is how it works</span></p>
    <button class="decode-btn" type="button">Decode again</button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.decode { display: grid; justify-items: center; gap: 16px; }
.decode-text {
  margin: 0;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ui-text);
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  cursor: default;
}
.decode-noise { color: var(--ui-accent); }
.decode-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.decode-btn {
  padding: 8px 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: none;
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.decode-btn:hover { background: var(--ui-surface-2); }
.decode-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`ScrambleText.svelte`

```svelte
<!-- tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html -->
<script>
  import { onMount } from 'svelte';
  import './ScrambleText.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GLYPHS = '!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ';
    const textEl = root.querySelector('.decode-text');
    const span = textEl.querySelector('.decode-show');
    const button = root.querySelector('.decode-btn');
    const text = span.textContent;
    let raf;

    const run = () => {
      if (reduce) return;
      cancelAnimationFrame(raf);
      let frame = 0;
      const tick = () => {
        const frag = document.createDocumentFragment();
        let done = true;
        [...text].forEach((ch, i) => {
          if (ch === ' ' || frame > i * 2 + 8) {
            frag.append(ch);
          } else {
            done = false;
            const noise = document.createElement('span');
            noise.className = 'decode-noise';
            noise.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            frag.append(noise);
          }
        });
        span.replaceChildren(frag);
        frame++;
        if (!done) raf = requestAnimationFrame(tick);
      };
      tick();
    };

    textEl.addEventListener('pointerenter', run);
    button.addEventListener('click', run);
    run();
    return () => {
      cancelAnimationFrame(raf);
      textEl.removeEventListener('pointerenter', run);
      button.removeEventListener('click', run);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="decode">
  <p class="decode-text"><span class="decode-sr">Design is how it works</span><span class="decode-show" aria-hidden="true">Design is how it works</span></p>
  <button class="decode-btn" type="button">Decode again</button>
</div>
```

`ScrambleText.css`

```css
/* tearsheet scramble-text v00fecc37 · https://qusaialjbali.github.io/tearsheet/zine/parts/scramble-text.html */
.decode { display: grid; justify-items: center; gap: 16px; }
.decode-text {
  margin: 0;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ui-text);
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  cursor: default;
}
.decode-noise { color: var(--ui-accent); }
.decode-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.decode-btn {
  padding: 8px 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: none;
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.decode-btn:hover { background: var(--ui-surface-2); }
.decode-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```
