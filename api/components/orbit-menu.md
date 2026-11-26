# Orbit menu (Tearsheet, Weird)

A floating action button that bursts six actions into orbit around itself.

**Why it works:** Closed items are hidden from the tab order. Esc closes and returns focus to the button. Each item has a text label, not just an icon.

**Checked:** axe clean in light and dark; 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html -->
<div class="orbit">
  <ul class="orbit-items" id="orbit-items">
    <li style="--i: 0"><button class="orbit-item" type="button" aria-label="Photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 1"><button class="orbit-item" type="button" aria-label="Note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 11h6M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
    <li style="--i: 2"><button class="orbit-item" type="button" aria-label="Link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
    <li style="--i: 3"><button class="orbit-item" type="button" aria-label="Location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 4"><button class="orbit-item" type="button" aria-label="Music"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 5"><button class="orbit-item" type="button" aria-label="Event"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M9 3v5M15 3v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
  </ul>
  <button class="orbit-toggle" type="button" aria-expanded="false" aria-controls="orbit-items" aria-label="Quick add"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
</div>
```

`styles.css`

```css
/* tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html */
.orbit { position: relative; display: grid; place-items: center; width: 260px; height: 260px; }
.orbit-items { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
.orbit-items li {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  transform: rotate(calc(var(--i) * 60deg)) translateY(0) rotate(calc(var(--i) * -60deg)) scale(0.4);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.2s, visibility 0.35s;
  transition-delay: calc((5 - var(--i)) * 20ms);
}
.orbit.is-open .orbit-items li {
  transform: rotate(calc(var(--i) * 60deg)) translateY(-96px) rotate(calc(var(--i) * -60deg)) scale(1);
  opacity: 1;
  visibility: visible;
  transition-delay: calc(var(--i) * 40ms);
}
.orbit-item {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  box-shadow: var(--ui-shadow);
  cursor: pointer;
}
.orbit-item svg { width: 22px; height: 22px; }
.orbit-item:hover { color: var(--ui-accent); scale: 1.1; }
.orbit-item:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.orbit-toggle {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.25);
  cursor: pointer;
}
.orbit-toggle svg { width: 28px; height: 28px; transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1); }
.orbit.is-open .orbit-toggle svg { transform: rotate(135deg); }
.orbit-toggle:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 10px 24px rgb(0 0 0 / 0.25); }
@media (prefers-reduced-motion: reduce) {
  .orbit-items li, .orbit-toggle svg { transition-duration: 0.01s; transition-delay: 0s !important; }
}
```

`script.js`

```js
/* tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html */
function setup(root) {
  const toggle = root.querySelector('.orbit-toggle');
  const items = root.querySelectorAll('.orbit-item');

  const setOpen = (open) => {
    root.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close quick add' : 'Quick add');
  };
  const onToggle = () => setOpen(!root.classList.contains('is-open'));
  const onKey = (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  };
  const onItem = () => {
    setOpen(false);
    toggle.focus();
  };

  toggle.addEventListener('click', onToggle);
  root.addEventListener('keydown', onKey);
  items.forEach((i) => i.addEventListener('click', onItem));
  return () => {
    toggle.removeEventListener('click', onToggle);
    root.removeEventListener('keydown', onKey);
    items.forEach((i) => i.removeEventListener('click', onItem));
  };
}

document.querySelectorAll(".orbit").forEach(setup);
```

## React

`OrbitMenu.jsx`

```jsx
/* tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html */
import { useEffect, useRef } from 'react';
import './OrbitMenu.css';

function setup(root) {
  const toggle = root.querySelector('.orbit-toggle');
  const items = root.querySelectorAll('.orbit-item');

  const setOpen = (open) => {
    root.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close quick add' : 'Quick add');
  };
  const onToggle = () => setOpen(!root.classList.contains('is-open'));
  const onKey = (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  };
  const onItem = () => {
    setOpen(false);
    toggle.focus();
  };

  toggle.addEventListener('click', onToggle);
  root.addEventListener('keydown', onKey);
  items.forEach((i) => i.addEventListener('click', onItem));
  return () => {
    toggle.removeEventListener('click', onToggle);
    root.removeEventListener('keydown', onKey);
    items.forEach((i) => i.removeEventListener('click', onItem));
  };
}

export function OrbitMenu() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="orbit">
      <ul className="orbit-items" id="orbit-items">
        <li style={{ '--i': '0' }}><button className="orbit-item" type="button" aria-label="Photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg></button></li>
        <li style={{ '--i': '1' }}><button className="orbit-item" type="button" aria-label="Note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></button></li>
        <li style={{ '--i': '2' }}><button className="orbit-item" type="button" aria-label="Link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></button></li>
        <li style={{ '--i': '3' }}><button className="orbit-item" type="button" aria-label="Location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg></button></li>
        <li style={{ '--i': '4' }}><button className="orbit-item" type="button" aria-label="Music"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg></button></li>
        <li style={{ '--i': '5' }}><button className="orbit-item" type="button" aria-label="Event"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M4 10h16M9 3v5M15 3v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></button></li>
      </ul>
      <button className="orbit-toggle" type="button" aria-expanded="false" aria-controls="orbit-items" aria-label="Quick add"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg></button>
    </div>
  );
}
```

`OrbitMenu.css`

```css
/* tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html */
.orbit { position: relative; display: grid; place-items: center; width: 260px; height: 260px; }
.orbit-items { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
.orbit-items li {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  transform: rotate(calc(var(--i) * 60deg)) translateY(0) rotate(calc(var(--i) * -60deg)) scale(0.4);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.2s, visibility 0.35s;
  transition-delay: calc((5 - var(--i)) * 20ms);
}
.orbit.is-open .orbit-items li {
  transform: rotate(calc(var(--i) * 60deg)) translateY(-96px) rotate(calc(var(--i) * -60deg)) scale(1);
  opacity: 1;
  visibility: visible;
  transition-delay: calc(var(--i) * 40ms);
}
.orbit-item {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  box-shadow: var(--ui-shadow);
  cursor: pointer;
}
.orbit-item svg { width: 22px; height: 22px; }
.orbit-item:hover { color: var(--ui-accent); scale: 1.1; }
.orbit-item:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.orbit-toggle {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.25);
  cursor: pointer;
}
.orbit-toggle svg { width: 28px; height: 28px; transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1); }
.orbit.is-open .orbit-toggle svg { transform: rotate(135deg); }
.orbit-toggle:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 10px 24px rgb(0 0 0 / 0.25); }
@media (prefers-reduced-motion: reduce) {
  .orbit-items li, .orbit-toggle svg { transition-duration: 0.01s; transition-delay: 0s !important; }
}
```

## Vue

`OrbitMenu.vue`

```vue
<!-- tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const toggle = root.querySelector('.orbit-toggle');
  const items = root.querySelectorAll('.orbit-item');

  const setOpen = (open) => {
    root.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close quick add' : 'Quick add');
  };
  const onToggle = () => setOpen(!root.classList.contains('is-open'));
  const onKey = (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  };
  const onItem = () => {
    setOpen(false);
    toggle.focus();
  };

  toggle.addEventListener('click', onToggle);
  root.addEventListener('keydown', onKey);
  items.forEach((i) => i.addEventListener('click', onItem));
  return () => {
    toggle.removeEventListener('click', onToggle);
    root.removeEventListener('keydown', onKey);
    items.forEach((i) => i.removeEventListener('click', onItem));
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="orbit">
    <ul class="orbit-items" id="orbit-items">
      <li style="--i: 0"><button class="orbit-item" type="button" aria-label="Photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
      <li style="--i: 1"><button class="orbit-item" type="button" aria-label="Note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 11h6M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
      <li style="--i: 2"><button class="orbit-item" type="button" aria-label="Link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
      <li style="--i: 3"><button class="orbit-item" type="button" aria-label="Location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
      <li style="--i: 4"><button class="orbit-item" type="button" aria-label="Music"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
      <li style="--i: 5"><button class="orbit-item" type="button" aria-label="Event"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M9 3v5M15 3v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
    </ul>
    <button class="orbit-toggle" type="button" aria-expanded="false" aria-controls="orbit-items" aria-label="Quick add"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.orbit { position: relative; display: grid; place-items: center; width: 260px; height: 260px; }
.orbit-items { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
.orbit-items li {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  transform: rotate(calc(var(--i) * 60deg)) translateY(0) rotate(calc(var(--i) * -60deg)) scale(0.4);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.2s, visibility 0.35s;
  transition-delay: calc((5 - var(--i)) * 20ms);
}
.orbit.is-open .orbit-items li {
  transform: rotate(calc(var(--i) * 60deg)) translateY(-96px) rotate(calc(var(--i) * -60deg)) scale(1);
  opacity: 1;
  visibility: visible;
  transition-delay: calc(var(--i) * 40ms);
}
.orbit-item {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  box-shadow: var(--ui-shadow);
  cursor: pointer;
}
.orbit-item svg { width: 22px; height: 22px; }
.orbit-item:hover { color: var(--ui-accent); scale: 1.1; }
.orbit-item:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.orbit-toggle {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.25);
  cursor: pointer;
}
.orbit-toggle svg { width: 28px; height: 28px; transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1); }
.orbit.is-open .orbit-toggle svg { transform: rotate(135deg); }
.orbit-toggle:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 10px 24px rgb(0 0 0 / 0.25); }
@media (prefers-reduced-motion: reduce) {
  .orbit-items li, .orbit-toggle svg { transition-duration: 0.01s; transition-delay: 0s !important; }
}
</style>
```

## Svelte

`OrbitMenu.svelte`

```svelte
<!-- tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html -->
<script>
  import { onMount } from 'svelte';
  import './OrbitMenu.css';

  let node;

  function setup(root) {
    const toggle = root.querySelector('.orbit-toggle');
    const items = root.querySelectorAll('.orbit-item');

    const setOpen = (open) => {
      root.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close quick add' : 'Quick add');
    };
    const onToggle = () => setOpen(!root.classList.contains('is-open'));
    const onKey = (e) => {
      if (e.key === 'Escape' && root.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    };
    const onItem = () => {
      setOpen(false);
      toggle.focus();
    };

    toggle.addEventListener('click', onToggle);
    root.addEventListener('keydown', onKey);
    items.forEach((i) => i.addEventListener('click', onItem));
    return () => {
      toggle.removeEventListener('click', onToggle);
      root.removeEventListener('keydown', onKey);
      items.forEach((i) => i.removeEventListener('click', onItem));
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="orbit">
  <ul class="orbit-items" id="orbit-items">
    <li style="--i: 0"><button class="orbit-item" type="button" aria-label="Photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 1"><button class="orbit-item" type="button" aria-label="Note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 11h6M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
    <li style="--i: 2"><button class="orbit-item" type="button" aria-label="Link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
    <li style="--i: 3"><button class="orbit-item" type="button" aria-label="Location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 4"><button class="orbit-item" type="button" aria-label="Music"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 5"><button class="orbit-item" type="button" aria-label="Event"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M9 3v5M15 3v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
  </ul>
  <button class="orbit-toggle" type="button" aria-expanded="false" aria-controls="orbit-items" aria-label="Quick add"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
</div>
```

`OrbitMenu.css`

```css
/* tearsheet orbit-menu v294ea01e · https://qusaialjbali.github.io/tearsheet/zine/parts/orbit-menu.html */
.orbit { position: relative; display: grid; place-items: center; width: 260px; height: 260px; }
.orbit-items { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
.orbit-items li {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  transform: rotate(calc(var(--i) * 60deg)) translateY(0) rotate(calc(var(--i) * -60deg)) scale(0.4);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.2s, visibility 0.35s;
  transition-delay: calc((5 - var(--i)) * 20ms);
}
.orbit.is-open .orbit-items li {
  transform: rotate(calc(var(--i) * 60deg)) translateY(-96px) rotate(calc(var(--i) * -60deg)) scale(1);
  opacity: 1;
  visibility: visible;
  transition-delay: calc(var(--i) * 40ms);
}
.orbit-item {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  box-shadow: var(--ui-shadow);
  cursor: pointer;
}
.orbit-item svg { width: 22px; height: 22px; }
.orbit-item:hover { color: var(--ui-accent); scale: 1.1; }
.orbit-item:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.orbit-toggle {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.25);
  cursor: pointer;
}
.orbit-toggle svg { width: 28px; height: 28px; transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1); }
.orbit.is-open .orbit-toggle svg { transform: rotate(135deg); }
.orbit-toggle:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 10px 24px rgb(0 0 0 / 0.25); }
@media (prefers-reduced-motion: reduce) {
  .orbit-items li, .orbit-toggle svg { transition-duration: 0.01s; transition-delay: 0s !important; }
}
```
