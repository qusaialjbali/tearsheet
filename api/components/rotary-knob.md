# Rotary knob (Tearsheet, Weird)

An amp-style dial you twist by dragging around it, scrolling, or with the arrow keys. It goes to eleven.

**Why it works:** It is an ARIA slider: arrows, Home, End and Page keys all work, and the value is announced. Dragging follows the angle of your pointer around the centre.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html -->
<div class="knob-wrap">
  <div class="knob" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="11" aria-valuenow="5">
    <div class="knob-dial"><span class="knob-mark"></span></div>
  </div>
  <p class="knob-readout"><span class="knob-num">5</span> / 11</p>
</div>
```

`styles.css`

```css
/* tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html */
.knob-wrap { display: grid; justify-items: center; gap: 10px; }
.knob {
  position: relative;
  display: grid;
  place-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  cursor: grab;
  touch-action: none;
}
.knob-tick {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 12px;
  margin: -6px 0 0 -1.5px;
  border-radius: 2px;
  background: var(--ui-border-strong);
  transform: rotate(var(--a)) translateY(-80px);
  transition: background-color 0.15s;
}
.knob-tick.is-on { background: var(--ui-accent); }
.knob-dial {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #4a4a52, #19191c 70%);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.35), inset 0 2px 1px rgb(255 255 255 / 0.15);
  transition: transform 0.15s ease-out;
}
.knob-mark {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 4px;
  height: 26px;
  margin-left: -2px;
  border-radius: 2px;
  background: #f5c518;
}
.knob:focus-visible { outline: none; }
.knob:focus-visible .knob-dial { box-shadow: var(--ui-focus), 0 12px 24px rgb(0 0 0 / 0.35); }
.knob:active { cursor: grabbing; }
.knob-readout { margin: 0; font-size: 15px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.knob-num { font-size: 26px; font-weight: 800; color: var(--ui-text); }
```

`script.js`

```js
/* tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html */
function setup(root) {
  const knob = root.querySelector('.knob');
  const dial = root.querySelector('.knob-dial');
  const num = root.querySelector('.knob-num');
  const MAX = Number(knob.getAttribute('aria-valuemax'));
  let value = Number(knob.getAttribute('aria-valuenow'));
  let dragging = false;

  const ticks = Array.from({ length: MAX + 1 }, (_, i) => {
    const t = document.createElement('span');
    t.className = 'knob-tick';
    t.setAttribute('aria-hidden', 'true');
    t.style.setProperty('--a', -135 + (i / MAX) * 270 + 'deg');
    knob.prepend(t);
    return t;
  });

  const set = (v) => {
    value = Math.min(MAX, Math.max(0, Math.round(v)));
    ticks.forEach((t, i) => t.classList.toggle('is-on', i <= value));
    dial.style.transform = 'rotate(' + (-135 + (value / MAX) * 270) + 'deg)';
    knob.setAttribute('aria-valuenow', value);
    knob.setAttribute('aria-valuetext', value === MAX ? value + ', this one goes to eleven' : String(value));
    num.textContent = value;
  };
  const fromPointer = (e) => {
    const r = knob.getBoundingClientRect();
    let angle = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI;
    angle = Math.max(-135, Math.min(135, angle));
    set(((angle + 135) / 270) * MAX);
  };
  const onDown = (e) => {
    dragging = true;
    knob.setPointerCapture(e.pointerId);
    fromPointer(e);
  };
  const onMove = (e) => dragging && fromPointer(e);
  const onUp = () => (dragging = false);
  const onWheel = (e) => {
    e.preventDefault();
    set(value + (e.deltaY < 0 ? 1 : -1));
  };
  const onKey = (e) => {
    const map = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 3, PageDown: -3 };
    if (e.key in map) set(value + map[e.key]);
    else if (e.key === 'Home') set(0);
    else if (e.key === 'End') set(MAX);
    else return;
    e.preventDefault();
  };

  knob.addEventListener('pointerdown', onDown);
  knob.addEventListener('pointermove', onMove);
  knob.addEventListener('pointerup', onUp);
  knob.addEventListener('wheel', onWheel, { passive: false });
  knob.addEventListener('keydown', onKey);
  set(value);
  return () => {
    knob.removeEventListener('pointerdown', onDown);
    knob.removeEventListener('pointermove', onMove);
    knob.removeEventListener('pointerup', onUp);
    knob.removeEventListener('wheel', onWheel);
    knob.removeEventListener('keydown', onKey);
  };
}

document.querySelectorAll(".knob-wrap").forEach(setup);
```

## React

`RotaryKnob.jsx`

```jsx
/* tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html */
import { useEffect, useRef } from 'react';
import './RotaryKnob.css';

function setup(root) {
  const knob = root.querySelector('.knob');
  const dial = root.querySelector('.knob-dial');
  const num = root.querySelector('.knob-num');
  const MAX = Number(knob.getAttribute('aria-valuemax'));
  let value = Number(knob.getAttribute('aria-valuenow'));
  let dragging = false;

  const ticks = Array.from({ length: MAX + 1 }, (_, i) => {
    const t = document.createElement('span');
    t.className = 'knob-tick';
    t.setAttribute('aria-hidden', 'true');
    t.style.setProperty('--a', -135 + (i / MAX) * 270 + 'deg');
    knob.prepend(t);
    return t;
  });

  const set = (v) => {
    value = Math.min(MAX, Math.max(0, Math.round(v)));
    ticks.forEach((t, i) => t.classList.toggle('is-on', i <= value));
    dial.style.transform = 'rotate(' + (-135 + (value / MAX) * 270) + 'deg)';
    knob.setAttribute('aria-valuenow', value);
    knob.setAttribute('aria-valuetext', value === MAX ? value + ', this one goes to eleven' : String(value));
    num.textContent = value;
  };
  const fromPointer = (e) => {
    const r = knob.getBoundingClientRect();
    let angle = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI;
    angle = Math.max(-135, Math.min(135, angle));
    set(((angle + 135) / 270) * MAX);
  };
  const onDown = (e) => {
    dragging = true;
    knob.setPointerCapture(e.pointerId);
    fromPointer(e);
  };
  const onMove = (e) => dragging && fromPointer(e);
  const onUp = () => (dragging = false);
  const onWheel = (e) => {
    e.preventDefault();
    set(value + (e.deltaY < 0 ? 1 : -1));
  };
  const onKey = (e) => {
    const map = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 3, PageDown: -3 };
    if (e.key in map) set(value + map[e.key]);
    else if (e.key === 'Home') set(0);
    else if (e.key === 'End') set(MAX);
    else return;
    e.preventDefault();
  };

  knob.addEventListener('pointerdown', onDown);
  knob.addEventListener('pointermove', onMove);
  knob.addEventListener('pointerup', onUp);
  knob.addEventListener('wheel', onWheel, { passive: false });
  knob.addEventListener('keydown', onKey);
  set(value);
  return () => {
    knob.removeEventListener('pointerdown', onDown);
    knob.removeEventListener('pointermove', onMove);
    knob.removeEventListener('pointerup', onUp);
    knob.removeEventListener('wheel', onWheel);
    knob.removeEventListener('keydown', onKey);
  };
}

export function RotaryKnob() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="knob-wrap">
      <div className="knob" role="slider" tabIndex={0} aria-label="Volume" aria-valuemin="0" aria-valuemax="11" aria-valuenow="5">
        <div className="knob-dial"><span className="knob-mark"></span></div>
      </div>
      <p className="knob-readout"><span className="knob-num">5</span> / 11</p>
    </div>
  );
}
```

`RotaryKnob.css`

```css
/* tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html */
.knob-wrap { display: grid; justify-items: center; gap: 10px; }
.knob {
  position: relative;
  display: grid;
  place-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  cursor: grab;
  touch-action: none;
}
.knob-tick {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 12px;
  margin: -6px 0 0 -1.5px;
  border-radius: 2px;
  background: var(--ui-border-strong);
  transform: rotate(var(--a)) translateY(-80px);
  transition: background-color 0.15s;
}
.knob-tick.is-on { background: var(--ui-accent); }
.knob-dial {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #4a4a52, #19191c 70%);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.35), inset 0 2px 1px rgb(255 255 255 / 0.15);
  transition: transform 0.15s ease-out;
}
.knob-mark {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 4px;
  height: 26px;
  margin-left: -2px;
  border-radius: 2px;
  background: #f5c518;
}
.knob:focus-visible { outline: none; }
.knob:focus-visible .knob-dial { box-shadow: var(--ui-focus), 0 12px 24px rgb(0 0 0 / 0.35); }
.knob:active { cursor: grabbing; }
.knob-readout { margin: 0; font-size: 15px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.knob-num { font-size: 26px; font-weight: 800; color: var(--ui-text); }
```

## Vue

`RotaryKnob.vue`

```vue
<!-- tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const knob = root.querySelector('.knob');
  const dial = root.querySelector('.knob-dial');
  const num = root.querySelector('.knob-num');
  const MAX = Number(knob.getAttribute('aria-valuemax'));
  let value = Number(knob.getAttribute('aria-valuenow'));
  let dragging = false;

  const ticks = Array.from({ length: MAX + 1 }, (_, i) => {
    const t = document.createElement('span');
    t.className = 'knob-tick';
    t.setAttribute('aria-hidden', 'true');
    t.style.setProperty('--a', -135 + (i / MAX) * 270 + 'deg');
    knob.prepend(t);
    return t;
  });

  const set = (v) => {
    value = Math.min(MAX, Math.max(0, Math.round(v)));
    ticks.forEach((t, i) => t.classList.toggle('is-on', i <= value));
    dial.style.transform = 'rotate(' + (-135 + (value / MAX) * 270) + 'deg)';
    knob.setAttribute('aria-valuenow', value);
    knob.setAttribute('aria-valuetext', value === MAX ? value + ', this one goes to eleven' : String(value));
    num.textContent = value;
  };
  const fromPointer = (e) => {
    const r = knob.getBoundingClientRect();
    let angle = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI;
    angle = Math.max(-135, Math.min(135, angle));
    set(((angle + 135) / 270) * MAX);
  };
  const onDown = (e) => {
    dragging = true;
    knob.setPointerCapture(e.pointerId);
    fromPointer(e);
  };
  const onMove = (e) => dragging && fromPointer(e);
  const onUp = () => (dragging = false);
  const onWheel = (e) => {
    e.preventDefault();
    set(value + (e.deltaY < 0 ? 1 : -1));
  };
  const onKey = (e) => {
    const map = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 3, PageDown: -3 };
    if (e.key in map) set(value + map[e.key]);
    else if (e.key === 'Home') set(0);
    else if (e.key === 'End') set(MAX);
    else return;
    e.preventDefault();
  };

  knob.addEventListener('pointerdown', onDown);
  knob.addEventListener('pointermove', onMove);
  knob.addEventListener('pointerup', onUp);
  knob.addEventListener('wheel', onWheel, { passive: false });
  knob.addEventListener('keydown', onKey);
  set(value);
  return () => {
    knob.removeEventListener('pointerdown', onDown);
    knob.removeEventListener('pointermove', onMove);
    knob.removeEventListener('pointerup', onUp);
    knob.removeEventListener('wheel', onWheel);
    knob.removeEventListener('keydown', onKey);
  };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="knob-wrap">
    <div class="knob" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="11" aria-valuenow="5">
      <div class="knob-dial"><span class="knob-mark"></span></div>
    </div>
    <p class="knob-readout"><span class="knob-num">5</span> / 11</p>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.knob-wrap { display: grid; justify-items: center; gap: 10px; }
.knob {
  position: relative;
  display: grid;
  place-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  cursor: grab;
  touch-action: none;
}
.knob-tick {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 12px;
  margin: -6px 0 0 -1.5px;
  border-radius: 2px;
  background: var(--ui-border-strong);
  transform: rotate(var(--a)) translateY(-80px);
  transition: background-color 0.15s;
}
.knob-tick.is-on { background: var(--ui-accent); }
.knob-dial {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #4a4a52, #19191c 70%);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.35), inset 0 2px 1px rgb(255 255 255 / 0.15);
  transition: transform 0.15s ease-out;
}
.knob-mark {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 4px;
  height: 26px;
  margin-left: -2px;
  border-radius: 2px;
  background: #f5c518;
}
.knob:focus-visible { outline: none; }
.knob:focus-visible .knob-dial { box-shadow: var(--ui-focus), 0 12px 24px rgb(0 0 0 / 0.35); }
.knob:active { cursor: grabbing; }
.knob-readout { margin: 0; font-size: 15px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.knob-num { font-size: 26px; font-weight: 800; color: var(--ui-text); }
</style>
```

## Svelte

`RotaryKnob.svelte`

```svelte
<!-- tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html -->
<script>
  import { onMount } from 'svelte';
  import './RotaryKnob.css';

  let node;

  function setup(root) {
    const knob = root.querySelector('.knob');
    const dial = root.querySelector('.knob-dial');
    const num = root.querySelector('.knob-num');
    const MAX = Number(knob.getAttribute('aria-valuemax'));
    let value = Number(knob.getAttribute('aria-valuenow'));
    let dragging = false;

    const ticks = Array.from({ length: MAX + 1 }, (_, i) => {
      const t = document.createElement('span');
      t.className = 'knob-tick';
      t.setAttribute('aria-hidden', 'true');
      t.style.setProperty('--a', -135 + (i / MAX) * 270 + 'deg');
      knob.prepend(t);
      return t;
    });

    const set = (v) => {
      value = Math.min(MAX, Math.max(0, Math.round(v)));
      ticks.forEach((t, i) => t.classList.toggle('is-on', i <= value));
      dial.style.transform = 'rotate(' + (-135 + (value / MAX) * 270) + 'deg)';
      knob.setAttribute('aria-valuenow', value);
      knob.setAttribute('aria-valuetext', value === MAX ? value + ', this one goes to eleven' : String(value));
      num.textContent = value;
    };
    const fromPointer = (e) => {
      const r = knob.getBoundingClientRect();
      let angle = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI;
      angle = Math.max(-135, Math.min(135, angle));
      set(((angle + 135) / 270) * MAX);
    };
    const onDown = (e) => {
      dragging = true;
      knob.setPointerCapture(e.pointerId);
      fromPointer(e);
    };
    const onMove = (e) => dragging && fromPointer(e);
    const onUp = () => (dragging = false);
    const onWheel = (e) => {
      e.preventDefault();
      set(value + (e.deltaY < 0 ? 1 : -1));
    };
    const onKey = (e) => {
      const map = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 3, PageDown: -3 };
      if (e.key in map) set(value + map[e.key]);
      else if (e.key === 'Home') set(0);
      else if (e.key === 'End') set(MAX);
      else return;
      e.preventDefault();
    };

    knob.addEventListener('pointerdown', onDown);
    knob.addEventListener('pointermove', onMove);
    knob.addEventListener('pointerup', onUp);
    knob.addEventListener('wheel', onWheel, { passive: false });
    knob.addEventListener('keydown', onKey);
    set(value);
    return () => {
      knob.removeEventListener('pointerdown', onDown);
      knob.removeEventListener('pointermove', onMove);
      knob.removeEventListener('pointerup', onUp);
      knob.removeEventListener('wheel', onWheel);
      knob.removeEventListener('keydown', onKey);
    };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="knob-wrap">
  <div class="knob" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="11" aria-valuenow="5">
    <div class="knob-dial"><span class="knob-mark"></span></div>
  </div>
  <p class="knob-readout"><span class="knob-num">5</span> / 11</p>
</div>
```

`RotaryKnob.css`

```css
/* tearsheet rotary-knob ve00e28c9 · https://qusaialjbali.github.io/tearsheet/zine/parts/rotary-knob.html */
.knob-wrap { display: grid; justify-items: center; gap: 10px; }
.knob {
  position: relative;
  display: grid;
  place-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  cursor: grab;
  touch-action: none;
}
.knob-tick {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 12px;
  margin: -6px 0 0 -1.5px;
  border-radius: 2px;
  background: var(--ui-border-strong);
  transform: rotate(var(--a)) translateY(-80px);
  transition: background-color 0.15s;
}
.knob-tick.is-on { background: var(--ui-accent); }
.knob-dial {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #4a4a52, #19191c 70%);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.35), inset 0 2px 1px rgb(255 255 255 / 0.15);
  transition: transform 0.15s ease-out;
}
.knob-mark {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 4px;
  height: 26px;
  margin-left: -2px;
  border-radius: 2px;
  background: #f5c518;
}
.knob:focus-visible { outline: none; }
.knob:focus-visible .knob-dial { box-shadow: var(--ui-focus), 0 12px 24px rgb(0 0 0 / 0.35); }
.knob:active { cursor: grabbing; }
.knob-readout { margin: 0; font-size: 15px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.knob-num { font-size: 26px; font-weight: 800; color: var(--ui-text); }
```
