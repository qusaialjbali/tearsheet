# Lightbox gallery (Tearsheet, Content)

A thumbnail grid that opens each picture large in a dialog, with arrow keys to flip through.

**Why it works:** Thumbnails are buttons named after the picture. The open view is a <dialog>, so focus is trapped and returns to the thumbnail you came from. Replace the drawn art with your <img> tags.

**Checked:** axe clean in light and dark; 4 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html -->
<div class="gallery">
  <ul class="gal-grid">
    <li><button type="button" class="gal-thumb" aria-label="Open: Dunes at dusk"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#f4c08b"/><circle cx="118" cy="38" r="16" fill="#fff3d6"/><path d="M0 86Q40 60 80 84T160 76V120H0Z" fill="#d9874a"/><path d="M0 100Q50 84 100 102T160 98V120H0Z" fill="#a85a2c"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: Lake and pines"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#bfe1ea"/><path d="M0 72 30 40 50 60 80 26 110 58 130 44 160 70V120H0Z" fill="#5d8aa8"/><rect y="78" width="160" height="42" fill="#3f6f8a"/><path d="M20 78 28 56 36 78ZM132 78 140 52 148 78Z" fill="#1f4d3a"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: City at night"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#1e1b4b"/><circle cx="34" cy="28" r="10" fill="#fde68a"/><path d="M0 120V70h22V50h20v30h16V40h26v50h18V62h22v26h14V58h22v62Z" fill="#312e81"/><path d="M66 50h4v4h-4ZM74 58h4v4h-4ZM104 70h4v4h-4ZM132 66h4v4h-4Z" fill="#fde68a"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: Meadow flowers"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#e0f2d0"/><rect y="70" width="160" height="50" fill="#7fb069"/><circle cx="30" cy="76" r="6" fill="#ff6b9a"/><circle cx="62" cy="86" r="5" fill="#ffd166"/><circle cx="96" cy="74" r="6" fill="#ff6b9a"/><circle cx="128" cy="90" r="5" fill="#fff"/><circle cx="80" cy="100" r="5" fill="#ffd166"/></svg></button></li>
  </ul>
  <dialog class="gal-dialog" aria-label="Picture viewer">
    <div class="gal-stage"></div>
    <p class="gal-cap"></p>
    <div class="gal-nav">
      <button type="button" data-step="-1" aria-label="Previous picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button type="button" data-close aria-label="Close viewer"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button type="button" data-step="1" aria-label="Next picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
  </dialog>
</div>
```

`styles.css`

```css
/* tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html */
.gallery { width: 100%; max-width: 460px; }
.gal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 0; padding: 0; list-style: none; }
.gal-thumb { display: block; width: 100%; padding: 0; border: 0; border-radius: var(--ui-radius-sm); overflow: hidden; cursor: zoom-in; background: none; }
.gal-thumb svg { display: block; width: 100%; height: auto; transition: transform 0.3s; }
@media (prefers-reduced-motion: reduce) { .gal-thumb svg { transition: none; } }
.gal-thumb:hover svg { transform: scale(1.04); }
.gal-thumb:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.gal-dialog { width: min(640px, calc(100vw - 32px)); padding: 12px; color: #fff; background: #111114; border: 0; border-radius: 14px; }
.gal-dialog::backdrop { background: rgb(0 0 0 / 0.75); }
.gal-stage svg { display: block; width: 100%; height: auto; border-radius: 8px; }
.gal-cap { margin: 10px 4px; font-size: 14px; }
.gal-nav { display: flex; justify-content: center; gap: 10px; }
.gal-nav button { display: grid; place-items: center; width: 42px; height: 42px; color: #fff; background: #2a2a33; border: 0; border-radius: 50%; cursor: pointer; }
.gal-nav svg { width: 18px; height: 18px; }
.gal-nav button:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
```

`script.js`

```js
/* tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html */
function setup(root) {
  const thumbs = [...root.querySelectorAll('.gal-thumb')];
  const dialog = root.querySelector('.gal-dialog');
  const stage = root.querySelector('.gal-stage');
  const cap = root.querySelector('.gal-cap');
  let at = 0;
  const show = (i) => {
    at = (i + thumbs.length) % thumbs.length;
    stage.innerHTML = thumbs[at].innerHTML;
    cap.textContent = thumbs[at].getAttribute('aria-label').replace('Open: ', '') + ' · ' + (at + 1) + ' of ' + thumbs.length;
  };
  const onThumb = (e) => { show(thumbs.indexOf(e.currentTarget)); dialog.showModal(); };
  const onDialog = (e) => {
    const step = e.target.closest('[data-step]');
    if (step) show(at + Number(step.dataset.step));
    else if (e.target.closest('[data-close]') || e.target === dialog) dialog.close();
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') show(at + 1);
    else if (e.key === 'ArrowLeft') show(at - 1);
  };
  const onClose = () => thumbs[at].focus();
  thumbs.forEach((t) => t.addEventListener('click', onThumb));
  dialog.addEventListener('click', onDialog);
  dialog.addEventListener('keydown', onKey);
  dialog.addEventListener('close', onClose);
  return () => {
    thumbs.forEach((t) => t.removeEventListener('click', onThumb));
    dialog.removeEventListener('click', onDialog);
    dialog.removeEventListener('keydown', onKey);
    dialog.removeEventListener('close', onClose);
  };
}

document.querySelectorAll(".gallery").forEach(setup);
```

## React

`Lightbox.jsx`

```jsx
/* tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html */
import { useEffect, useRef } from 'react';
import './Lightbox.css';

function setup(root) {
  const thumbs = [...root.querySelectorAll('.gal-thumb')];
  const dialog = root.querySelector('.gal-dialog');
  const stage = root.querySelector('.gal-stage');
  const cap = root.querySelector('.gal-cap');
  let at = 0;
  const show = (i) => {
    at = (i + thumbs.length) % thumbs.length;
    stage.innerHTML = thumbs[at].innerHTML;
    cap.textContent = thumbs[at].getAttribute('aria-label').replace('Open: ', '') + ' · ' + (at + 1) + ' of ' + thumbs.length;
  };
  const onThumb = (e) => { show(thumbs.indexOf(e.currentTarget)); dialog.showModal(); };
  const onDialog = (e) => {
    const step = e.target.closest('[data-step]');
    if (step) show(at + Number(step.dataset.step));
    else if (e.target.closest('[data-close]') || e.target === dialog) dialog.close();
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') show(at + 1);
    else if (e.key === 'ArrowLeft') show(at - 1);
  };
  const onClose = () => thumbs[at].focus();
  thumbs.forEach((t) => t.addEventListener('click', onThumb));
  dialog.addEventListener('click', onDialog);
  dialog.addEventListener('keydown', onKey);
  dialog.addEventListener('close', onClose);
  return () => {
    thumbs.forEach((t) => t.removeEventListener('click', onThumb));
    dialog.removeEventListener('click', onDialog);
    dialog.removeEventListener('keydown', onKey);
    dialog.removeEventListener('close', onClose);
  };
}

export function Lightbox() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="gallery">
      <ul className="gal-grid">
        <li><button type="button" className="gal-thumb" aria-label="Open: Dunes at dusk"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#f4c08b"/><circle cx="118" cy="38" r="16" fill="#fff3d6"/><path d="M0 86Q40 60 80 84T160 76V120H0Z" fill="#d9874a"/><path d="M0 100Q50 84 100 102T160 98V120H0Z" fill="#a85a2c"/></svg></button></li>
        <li><button type="button" className="gal-thumb" aria-label="Open: Lake and pines"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#bfe1ea"/><path d="M0 72 30 40 50 60 80 26 110 58 130 44 160 70V120H0Z" fill="#5d8aa8"/><rect y="78" width="160" height="42" fill="#3f6f8a"/><path d="M20 78 28 56 36 78ZM132 78 140 52 148 78Z" fill="#1f4d3a"/></svg></button></li>
        <li><button type="button" className="gal-thumb" aria-label="Open: City at night"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#1e1b4b"/><circle cx="34" cy="28" r="10" fill="#fde68a"/><path d="M0 120V70h22V50h20v30h16V40h26v50h18V62h22v26h14V58h22v62Z" fill="#312e81"/><path d="M66 50h4v4h-4ZM74 58h4v4h-4ZM104 70h4v4h-4ZM132 66h4v4h-4Z" fill="#fde68a"/></svg></button></li>
        <li><button type="button" className="gal-thumb" aria-label="Open: Meadow flowers"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#e0f2d0"/><rect y="70" width="160" height="50" fill="#7fb069"/><circle cx="30" cy="76" r="6" fill="#ff6b9a"/><circle cx="62" cy="86" r="5" fill="#ffd166"/><circle cx="96" cy="74" r="6" fill="#ff6b9a"/><circle cx="128" cy="90" r="5" fill="#fff"/><circle cx="80" cy="100" r="5" fill="#ffd166"/></svg></button></li>
      </ul>
      <dialog className="gal-dialog" aria-label="Picture viewer">
        <div className="gal-stage"></div>
        <p className="gal-cap"></p>
        <div className="gal-nav">
          <button type="button" data-step="-1" aria-label="Previous picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button type="button" data-close aria-label="Close viewer"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button type="button" data-step="1" aria-label="Next picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
      </dialog>
    </div>
  );
}
```

`Lightbox.css`

```css
/* tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html */
.gallery { width: 100%; max-width: 460px; }
.gal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 0; padding: 0; list-style: none; }
.gal-thumb { display: block; width: 100%; padding: 0; border: 0; border-radius: var(--ui-radius-sm); overflow: hidden; cursor: zoom-in; background: none; }
.gal-thumb svg { display: block; width: 100%; height: auto; transition: transform 0.3s; }
@media (prefers-reduced-motion: reduce) { .gal-thumb svg { transition: none; } }
.gal-thumb:hover svg { transform: scale(1.04); }
.gal-thumb:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.gal-dialog { width: min(640px, calc(100vw - 32px)); padding: 12px; color: #fff; background: #111114; border: 0; border-radius: 14px; }
.gal-dialog::backdrop { background: rgb(0 0 0 / 0.75); }
.gal-stage svg { display: block; width: 100%; height: auto; border-radius: 8px; }
.gal-cap { margin: 10px 4px; font-size: 14px; }
.gal-nav { display: flex; justify-content: center; gap: 10px; }
.gal-nav button { display: grid; place-items: center; width: 42px; height: 42px; color: #fff; background: #2a2a33; border: 0; border-radius: 50%; cursor: pointer; }
.gal-nav svg { width: 18px; height: 18px; }
.gal-nav button:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
```

## Vue

`Lightbox.vue`

```vue
<!-- tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const thumbs = [...root.querySelectorAll('.gal-thumb')];
  const dialog = root.querySelector('.gal-dialog');
  const stage = root.querySelector('.gal-stage');
  const cap = root.querySelector('.gal-cap');
  let at = 0;
  const show = (i) => {
    at = (i + thumbs.length) % thumbs.length;
    stage.innerHTML = thumbs[at].innerHTML;
    cap.textContent = thumbs[at].getAttribute('aria-label').replace('Open: ', '') + ' · ' + (at + 1) + ' of ' + thumbs.length;
  };
  const onThumb = (e) => { show(thumbs.indexOf(e.currentTarget)); dialog.showModal(); };
  const onDialog = (e) => {
    const step = e.target.closest('[data-step]');
    if (step) show(at + Number(step.dataset.step));
    else if (e.target.closest('[data-close]') || e.target === dialog) dialog.close();
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') show(at + 1);
    else if (e.key === 'ArrowLeft') show(at - 1);
  };
  const onClose = () => thumbs[at].focus();
  thumbs.forEach((t) => t.addEventListener('click', onThumb));
  dialog.addEventListener('click', onDialog);
  dialog.addEventListener('keydown', onKey);
  dialog.addEventListener('close', onClose);
  return () => {
    thumbs.forEach((t) => t.removeEventListener('click', onThumb));
    dialog.removeEventListener('click', onDialog);
    dialog.removeEventListener('keydown', onKey);
    dialog.removeEventListener('close', onClose);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="gallery">
    <ul class="gal-grid">
      <li><button type="button" class="gal-thumb" aria-label="Open: Dunes at dusk"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#f4c08b"/><circle cx="118" cy="38" r="16" fill="#fff3d6"/><path d="M0 86Q40 60 80 84T160 76V120H0Z" fill="#d9874a"/><path d="M0 100Q50 84 100 102T160 98V120H0Z" fill="#a85a2c"/></svg></button></li>
      <li><button type="button" class="gal-thumb" aria-label="Open: Lake and pines"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#bfe1ea"/><path d="M0 72 30 40 50 60 80 26 110 58 130 44 160 70V120H0Z" fill="#5d8aa8"/><rect y="78" width="160" height="42" fill="#3f6f8a"/><path d="M20 78 28 56 36 78ZM132 78 140 52 148 78Z" fill="#1f4d3a"/></svg></button></li>
      <li><button type="button" class="gal-thumb" aria-label="Open: City at night"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#1e1b4b"/><circle cx="34" cy="28" r="10" fill="#fde68a"/><path d="M0 120V70h22V50h20v30h16V40h26v50h18V62h22v26h14V58h22v62Z" fill="#312e81"/><path d="M66 50h4v4h-4ZM74 58h4v4h-4ZM104 70h4v4h-4ZM132 66h4v4h-4Z" fill="#fde68a"/></svg></button></li>
      <li><button type="button" class="gal-thumb" aria-label="Open: Meadow flowers"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#e0f2d0"/><rect y="70" width="160" height="50" fill="#7fb069"/><circle cx="30" cy="76" r="6" fill="#ff6b9a"/><circle cx="62" cy="86" r="5" fill="#ffd166"/><circle cx="96" cy="74" r="6" fill="#ff6b9a"/><circle cx="128" cy="90" r="5" fill="#fff"/><circle cx="80" cy="100" r="5" fill="#ffd166"/></svg></button></li>
    </ul>
    <dialog class="gal-dialog" aria-label="Picture viewer">
      <div class="gal-stage"></div>
      <p class="gal-cap"></p>
      <div class="gal-nav">
        <button type="button" data-step="-1" aria-label="Previous picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button type="button" data-close aria-label="Close viewer"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button type="button" data-step="1" aria-label="Next picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </dialog>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.gallery { width: 100%; max-width: 460px; }
.gal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 0; padding: 0; list-style: none; }
.gal-thumb { display: block; width: 100%; padding: 0; border: 0; border-radius: var(--ui-radius-sm); overflow: hidden; cursor: zoom-in; background: none; }
.gal-thumb svg { display: block; width: 100%; height: auto; transition: transform 0.3s; }
@media (prefers-reduced-motion: reduce) { .gal-thumb svg { transition: none; } }
.gal-thumb:hover svg { transform: scale(1.04); }
.gal-thumb:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.gal-dialog { width: min(640px, calc(100vw - 32px)); padding: 12px; color: #fff; background: #111114; border: 0; border-radius: 14px; }
.gal-dialog::backdrop { background: rgb(0 0 0 / 0.75); }
.gal-stage svg { display: block; width: 100%; height: auto; border-radius: 8px; }
.gal-cap { margin: 10px 4px; font-size: 14px; }
.gal-nav { display: flex; justify-content: center; gap: 10px; }
.gal-nav button { display: grid; place-items: center; width: 42px; height: 42px; color: #fff; background: #2a2a33; border: 0; border-radius: 50%; cursor: pointer; }
.gal-nav svg { width: 18px; height: 18px; }
.gal-nav button:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
</style>
```

## Svelte

`Lightbox.svelte`

```svelte
<!-- tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html -->
<script>
  import { onMount } from 'svelte';
  import './Lightbox.css';

  let node;

  function setup(root) {
    const thumbs = [...root.querySelectorAll('.gal-thumb')];
    const dialog = root.querySelector('.gal-dialog');
    const stage = root.querySelector('.gal-stage');
    const cap = root.querySelector('.gal-cap');
    let at = 0;
    const show = (i) => {
      at = (i + thumbs.length) % thumbs.length;
      stage.innerHTML = thumbs[at].innerHTML;
      cap.textContent = thumbs[at].getAttribute('aria-label').replace('Open: ', '') + ' · ' + (at + 1) + ' of ' + thumbs.length;
    };
    const onThumb = (e) => { show(thumbs.indexOf(e.currentTarget)); dialog.showModal(); };
    const onDialog = (e) => {
      const step = e.target.closest('[data-step]');
      if (step) show(at + Number(step.dataset.step));
      else if (e.target.closest('[data-close]') || e.target === dialog) dialog.close();
    };
    const onKey = (e) => {
      if (e.key === 'ArrowRight') show(at + 1);
      else if (e.key === 'ArrowLeft') show(at - 1);
    };
    const onClose = () => thumbs[at].focus();
    thumbs.forEach((t) => t.addEventListener('click', onThumb));
    dialog.addEventListener('click', onDialog);
    dialog.addEventListener('keydown', onKey);
    dialog.addEventListener('close', onClose);
    return () => {
      thumbs.forEach((t) => t.removeEventListener('click', onThumb));
      dialog.removeEventListener('click', onDialog);
      dialog.removeEventListener('keydown', onKey);
      dialog.removeEventListener('close', onClose);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="gallery">
  <ul class="gal-grid">
    <li><button type="button" class="gal-thumb" aria-label="Open: Dunes at dusk"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#f4c08b"/><circle cx="118" cy="38" r="16" fill="#fff3d6"/><path d="M0 86Q40 60 80 84T160 76V120H0Z" fill="#d9874a"/><path d="M0 100Q50 84 100 102T160 98V120H0Z" fill="#a85a2c"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: Lake and pines"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#bfe1ea"/><path d="M0 72 30 40 50 60 80 26 110 58 130 44 160 70V120H0Z" fill="#5d8aa8"/><rect y="78" width="160" height="42" fill="#3f6f8a"/><path d="M20 78 28 56 36 78ZM132 78 140 52 148 78Z" fill="#1f4d3a"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: City at night"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#1e1b4b"/><circle cx="34" cy="28" r="10" fill="#fde68a"/><path d="M0 120V70h22V50h20v30h16V40h26v50h18V62h22v26h14V58h22v62Z" fill="#312e81"/><path d="M66 50h4v4h-4ZM74 58h4v4h-4ZM104 70h4v4h-4ZM132 66h4v4h-4Z" fill="#fde68a"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: Meadow flowers"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#e0f2d0"/><rect y="70" width="160" height="50" fill="#7fb069"/><circle cx="30" cy="76" r="6" fill="#ff6b9a"/><circle cx="62" cy="86" r="5" fill="#ffd166"/><circle cx="96" cy="74" r="6" fill="#ff6b9a"/><circle cx="128" cy="90" r="5" fill="#fff"/><circle cx="80" cy="100" r="5" fill="#ffd166"/></svg></button></li>
  </ul>
  <dialog class="gal-dialog" aria-label="Picture viewer">
    <div class="gal-stage"></div>
    <p class="gal-cap"></p>
    <div class="gal-nav">
      <button type="button" data-step="-1" aria-label="Previous picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button type="button" data-close aria-label="Close viewer"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button type="button" data-step="1" aria-label="Next picture"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
  </dialog>
</div>
```

`Lightbox.css`

```css
/* tearsheet lightbox v976853d6 · https://qusaialjbali.github.io/tearsheet/zine/parts/lightbox.html */
.gallery { width: 100%; max-width: 460px; }
.gal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 0; padding: 0; list-style: none; }
.gal-thumb { display: block; width: 100%; padding: 0; border: 0; border-radius: var(--ui-radius-sm); overflow: hidden; cursor: zoom-in; background: none; }
.gal-thumb svg { display: block; width: 100%; height: auto; transition: transform 0.3s; }
@media (prefers-reduced-motion: reduce) { .gal-thumb svg { transition: none; } }
.gal-thumb:hover svg { transform: scale(1.04); }
.gal-thumb:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.gal-dialog { width: min(640px, calc(100vw - 32px)); padding: 12px; color: #fff; background: #111114; border: 0; border-radius: 14px; }
.gal-dialog::backdrop { background: rgb(0 0 0 / 0.75); }
.gal-stage svg { display: block; width: 100%; height: auto; border-radius: 8px; }
.gal-cap { margin: 10px 4px; font-size: 14px; }
.gal-nav { display: flex; justify-content: center; gap: 10px; }
.gal-nav button { display: grid; place-items: center; width: 42px; height: 42px; color: #fff; background: #2a2a33; border: 0; border-radius: 50%; cursor: pointer; }
.gal-nav svg { width: 18px; height: 18px; }
.gal-nav button:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
```
