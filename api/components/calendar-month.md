# Month calendar (Tearsheet, Data)

A month grid with today marked, event dots, and arrow-key navigation between days.

**Why it works:** It uses the ARIA grid pattern: one day is tabbable, arrow keys move by day and week, Enter selects. Each day button reads its full date and how many events it has.

**Checked:** axe clean in light and dark; tightest text contrast 5.93:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html -->
<div class="cal">
  <div class="cal-head">
    <h3 class="cal-title" aria-live="polite">December 2026</h3>
    <p class="cal-picked">Pick a day</p>
  </div>
  <table class="cal-grid" role="grid" aria-label="December 2026">
    <thead><tr><th scope="col" abbr="Monday">Mo</th><th scope="col" abbr="Tuesday">Tu</th><th scope="col" abbr="Wednesday">We</th><th scope="col" abbr="Thursday">Th</th><th scope="col" abbr="Friday">Fr</th><th scope="col" abbr="Saturday">Sa</th><th scope="col" abbr="Sunday">Su</th></tr></thead>
    <tbody></tbody>
  </table>
</div>
```

`styles.css`

```css
/* tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html */
.cal { width: 100%; max-width: 340px; padding: 16px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cal-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.cal-title { margin: 0; font-size: 16px; }
.cal-picked { margin: 0; font-size: 13px; color: var(--ui-muted); }
.cal-grid { width: 100%; border-collapse: collapse; table-layout: fixed; }
.cal-grid th { padding-bottom: 6px; font-size: 12px; font-weight: 600; color: var(--ui-muted); }
.cal-grid td { padding: 2px; text-align: center; }
.cal-day {
  position: relative; width: 100%; aspect-ratio: 1; max-width: 40px;
  font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; color: var(--ui-text);
  background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.cal-day:hover { background: var(--ui-surface-2); }
.cal-day:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cal-day.is-today { font-weight: 800; color: var(--ui-accent); box-shadow: inset 0 0 0 1.5px var(--ui-accent); }
.cal-day[aria-pressed="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cal-day.has-event::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: currentColor; }
```

`script.js`

```js
/* tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html */
function setup(root) {
  const YEAR = 2026, MONTH = 11; // December (0-based)
  const TODAY = 9;
  const EVENTS = { 3: 1, 9: 2, 14: 1, 22: 3, 31: 1 };
  const tbody = root.querySelector('tbody');
  const picked = root.querySelector('.cal-picked');
  const days = new Date(YEAR, MONTH + 1, 0).getDate();
  const offset = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7; // Monday first
  const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const buttons = [];
  let row;
  for (let i = 0; i < offset + days; i++) {
    if (i % 7 === 0) { row = tbody.insertRow(); }
    const cell = row.insertCell();
    if (i < offset) continue;
    const d = i - offset + 1;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cal-day' + (d === TODAY ? ' is-today' : '') + (EVENTS[d] ? ' has-event' : '');
    b.textContent = d;
    b.tabIndex = d === TODAY ? 0 : -1;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', fmt.format(new Date(YEAR, MONTH, d)) + (d === TODAY ? ', today' : '') + (EVENTS[d] ? ', ' + EVENTS[d] + (EVENTS[d] > 1 ? ' events' : ' event') : ''));
    cell.append(b);
    buttons.push(b);
  }
  const focusDay = (d) => {
    const i = Math.max(0, Math.min(days - 1, d - 1));
    buttons.forEach((b, n) => (b.tabIndex = n === i ? 0 : -1));
    buttons[i].focus();
  };
  const select = (b) => {
    buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    picked.textContent = b.getAttribute('aria-label').split(',')[0];
  };
  const onKey = (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
    if (step) { e.preventDefault(); focusDay(i + 1 + step); }
    else if (e.key === 'Home') { e.preventDefault(); focusDay(i + 1 - ((i + offset) % 7)); }
    else if (e.key === 'End') { e.preventDefault(); focusDay(i + 1 + (6 - ((i + offset) % 7))); }
  };
  const onClick = (e) => { const b = e.target.closest('.cal-day'); if (b) { select(b); focusDay(buttons.indexOf(b) + 1); } };
  tbody.addEventListener('keydown', onKey);
  tbody.addEventListener('click', onClick);
  return () => { tbody.removeEventListener('keydown', onKey); tbody.removeEventListener('click', onClick); };
}

document.querySelectorAll(".cal").forEach(setup);
```

## React

`CalendarMonth.jsx`

```jsx
/* tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html */
import { useEffect, useRef } from 'react';
import './CalendarMonth.css';

function setup(root) {
  const YEAR = 2026, MONTH = 11; // December (0-based)
  const TODAY = 9;
  const EVENTS = { 3: 1, 9: 2, 14: 1, 22: 3, 31: 1 };
  const tbody = root.querySelector('tbody');
  const picked = root.querySelector('.cal-picked');
  const days = new Date(YEAR, MONTH + 1, 0).getDate();
  const offset = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7; // Monday first
  const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const buttons = [];
  let row;
  for (let i = 0; i < offset + days; i++) {
    if (i % 7 === 0) { row = tbody.insertRow(); }
    const cell = row.insertCell();
    if (i < offset) continue;
    const d = i - offset + 1;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cal-day' + (d === TODAY ? ' is-today' : '') + (EVENTS[d] ? ' has-event' : '');
    b.textContent = d;
    b.tabIndex = d === TODAY ? 0 : -1;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', fmt.format(new Date(YEAR, MONTH, d)) + (d === TODAY ? ', today' : '') + (EVENTS[d] ? ', ' + EVENTS[d] + (EVENTS[d] > 1 ? ' events' : ' event') : ''));
    cell.append(b);
    buttons.push(b);
  }
  const focusDay = (d) => {
    const i = Math.max(0, Math.min(days - 1, d - 1));
    buttons.forEach((b, n) => (b.tabIndex = n === i ? 0 : -1));
    buttons[i].focus();
  };
  const select = (b) => {
    buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    picked.textContent = b.getAttribute('aria-label').split(',')[0];
  };
  const onKey = (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
    if (step) { e.preventDefault(); focusDay(i + 1 + step); }
    else if (e.key === 'Home') { e.preventDefault(); focusDay(i + 1 - ((i + offset) % 7)); }
    else if (e.key === 'End') { e.preventDefault(); focusDay(i + 1 + (6 - ((i + offset) % 7))); }
  };
  const onClick = (e) => { const b = e.target.closest('.cal-day'); if (b) { select(b); focusDay(buttons.indexOf(b) + 1); } };
  tbody.addEventListener('keydown', onKey);
  tbody.addEventListener('click', onClick);
  return () => { tbody.removeEventListener('keydown', onKey); tbody.removeEventListener('click', onClick); };
}

export function CalendarMonth() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="cal">
      <div className="cal-head">
        <h3 className="cal-title" aria-live="polite">December 2026</h3>
        <p className="cal-picked">Pick a day</p>
      </div>
      <table className="cal-grid" role="grid" aria-label="December 2026">
        <thead><tr><th scope="col" abbr="Monday">Mo</th><th scope="col" abbr="Tuesday">Tu</th><th scope="col" abbr="Wednesday">We</th><th scope="col" abbr="Thursday">Th</th><th scope="col" abbr="Friday">Fr</th><th scope="col" abbr="Saturday">Sa</th><th scope="col" abbr="Sunday">Su</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
```

`CalendarMonth.css`

```css
/* tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html */
.cal { width: 100%; max-width: 340px; padding: 16px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cal-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.cal-title { margin: 0; font-size: 16px; }
.cal-picked { margin: 0; font-size: 13px; color: var(--ui-muted); }
.cal-grid { width: 100%; border-collapse: collapse; table-layout: fixed; }
.cal-grid th { padding-bottom: 6px; font-size: 12px; font-weight: 600; color: var(--ui-muted); }
.cal-grid td { padding: 2px; text-align: center; }
.cal-day {
  position: relative; width: 100%; aspect-ratio: 1; max-width: 40px;
  font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; color: var(--ui-text);
  background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.cal-day:hover { background: var(--ui-surface-2); }
.cal-day:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cal-day.is-today { font-weight: 800; color: var(--ui-accent); box-shadow: inset 0 0 0 1.5px var(--ui-accent); }
.cal-day[aria-pressed="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cal-day.has-event::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: currentColor; }
```

## Vue

`CalendarMonth.vue`

```vue
<!-- tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const YEAR = 2026, MONTH = 11; // December (0-based)
  const TODAY = 9;
  const EVENTS = { 3: 1, 9: 2, 14: 1, 22: 3, 31: 1 };
  const tbody = root.querySelector('tbody');
  const picked = root.querySelector('.cal-picked');
  const days = new Date(YEAR, MONTH + 1, 0).getDate();
  const offset = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7; // Monday first
  const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const buttons = [];
  let row;
  for (let i = 0; i < offset + days; i++) {
    if (i % 7 === 0) { row = tbody.insertRow(); }
    const cell = row.insertCell();
    if (i < offset) continue;
    const d = i - offset + 1;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cal-day' + (d === TODAY ? ' is-today' : '') + (EVENTS[d] ? ' has-event' : '');
    b.textContent = d;
    b.tabIndex = d === TODAY ? 0 : -1;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', fmt.format(new Date(YEAR, MONTH, d)) + (d === TODAY ? ', today' : '') + (EVENTS[d] ? ', ' + EVENTS[d] + (EVENTS[d] > 1 ? ' events' : ' event') : ''));
    cell.append(b);
    buttons.push(b);
  }
  const focusDay = (d) => {
    const i = Math.max(0, Math.min(days - 1, d - 1));
    buttons.forEach((b, n) => (b.tabIndex = n === i ? 0 : -1));
    buttons[i].focus();
  };
  const select = (b) => {
    buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    picked.textContent = b.getAttribute('aria-label').split(',')[0];
  };
  const onKey = (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
    if (step) { e.preventDefault(); focusDay(i + 1 + step); }
    else if (e.key === 'Home') { e.preventDefault(); focusDay(i + 1 - ((i + offset) % 7)); }
    else if (e.key === 'End') { e.preventDefault(); focusDay(i + 1 + (6 - ((i + offset) % 7))); }
  };
  const onClick = (e) => { const b = e.target.closest('.cal-day'); if (b) { select(b); focusDay(buttons.indexOf(b) + 1); } };
  tbody.addEventListener('keydown', onKey);
  tbody.addEventListener('click', onClick);
  return () => { tbody.removeEventListener('keydown', onKey); tbody.removeEventListener('click', onClick); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="cal">
    <div class="cal-head">
      <h3 class="cal-title" aria-live="polite">December 2026</h3>
      <p class="cal-picked">Pick a day</p>
    </div>
    <table class="cal-grid" role="grid" aria-label="December 2026">
      <thead><tr><th scope="col" abbr="Monday">Mo</th><th scope="col" abbr="Tuesday">Tu</th><th scope="col" abbr="Wednesday">We</th><th scope="col" abbr="Thursday">Th</th><th scope="col" abbr="Friday">Fr</th><th scope="col" abbr="Saturday">Sa</th><th scope="col" abbr="Sunday">Su</th></tr></thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.cal { width: 100%; max-width: 340px; padding: 16px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cal-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.cal-title { margin: 0; font-size: 16px; }
.cal-picked { margin: 0; font-size: 13px; color: var(--ui-muted); }
.cal-grid { width: 100%; border-collapse: collapse; table-layout: fixed; }
.cal-grid th { padding-bottom: 6px; font-size: 12px; font-weight: 600; color: var(--ui-muted); }
.cal-grid td { padding: 2px; text-align: center; }
.cal-day {
  position: relative; width: 100%; aspect-ratio: 1; max-width: 40px;
  font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; color: var(--ui-text);
  background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.cal-day:hover { background: var(--ui-surface-2); }
.cal-day:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cal-day.is-today { font-weight: 800; color: var(--ui-accent); box-shadow: inset 0 0 0 1.5px var(--ui-accent); }
.cal-day[aria-pressed="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cal-day.has-event::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: currentColor; }
</style>
```

## Svelte

`CalendarMonth.svelte`

```svelte
<!-- tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html -->
<script>
  import { onMount } from 'svelte';
  import './CalendarMonth.css';

  let node;

  function setup(root) {
    const YEAR = 2026, MONTH = 11; // December (0-based)
    const TODAY = 9;
    const EVENTS = { 3: 1, 9: 2, 14: 1, 22: 3, 31: 1 };
    const tbody = root.querySelector('tbody');
    const picked = root.querySelector('.cal-picked');
    const days = new Date(YEAR, MONTH + 1, 0).getDate();
    const offset = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7; // Monday first
    const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    const buttons = [];
    let row;
    for (let i = 0; i < offset + days; i++) {
      if (i % 7 === 0) { row = tbody.insertRow(); }
      const cell = row.insertCell();
      if (i < offset) continue;
      const d = i - offset + 1;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cal-day' + (d === TODAY ? ' is-today' : '') + (EVENTS[d] ? ' has-event' : '');
      b.textContent = d;
      b.tabIndex = d === TODAY ? 0 : -1;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', fmt.format(new Date(YEAR, MONTH, d)) + (d === TODAY ? ', today' : '') + (EVENTS[d] ? ', ' + EVENTS[d] + (EVENTS[d] > 1 ? ' events' : ' event') : ''));
      cell.append(b);
      buttons.push(b);
    }
    const focusDay = (d) => {
      const i = Math.max(0, Math.min(days - 1, d - 1));
      buttons.forEach((b, n) => (b.tabIndex = n === i ? 0 : -1));
      buttons[i].focus();
    };
    const select = (b) => {
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      picked.textContent = b.getAttribute('aria-label').split(',')[0];
    };
    const onKey = (e) => {
      const i = buttons.indexOf(document.activeElement);
      if (i < 0) return;
      const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
      if (step) { e.preventDefault(); focusDay(i + 1 + step); }
      else if (e.key === 'Home') { e.preventDefault(); focusDay(i + 1 - ((i + offset) % 7)); }
      else if (e.key === 'End') { e.preventDefault(); focusDay(i + 1 + (6 - ((i + offset) % 7))); }
    };
    const onClick = (e) => { const b = e.target.closest('.cal-day'); if (b) { select(b); focusDay(buttons.indexOf(b) + 1); } };
    tbody.addEventListener('keydown', onKey);
    tbody.addEventListener('click', onClick);
    return () => { tbody.removeEventListener('keydown', onKey); tbody.removeEventListener('click', onClick); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="cal">
  <div class="cal-head">
    <h3 class="cal-title" aria-live="polite">December 2026</h3>
    <p class="cal-picked">Pick a day</p>
  </div>
  <table class="cal-grid" role="grid" aria-label="December 2026">
    <thead><tr><th scope="col" abbr="Monday">Mo</th><th scope="col" abbr="Tuesday">Tu</th><th scope="col" abbr="Wednesday">We</th><th scope="col" abbr="Thursday">Th</th><th scope="col" abbr="Friday">Fr</th><th scope="col" abbr="Saturday">Sa</th><th scope="col" abbr="Sunday">Su</th></tr></thead>
    <tbody></tbody>
  </table>
</div>
```

`CalendarMonth.css`

```css
/* tearsheet calendar-month vf2b6f548 · https://qusaialjbali.github.io/tearsheet/zine/parts/calendar-month.html */
.cal { width: 100%; max-width: 340px; padding: 16px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cal-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.cal-title { margin: 0; font-size: 16px; }
.cal-picked { margin: 0; font-size: 13px; color: var(--ui-muted); }
.cal-grid { width: 100%; border-collapse: collapse; table-layout: fixed; }
.cal-grid th { padding-bottom: 6px; font-size: 12px; font-weight: 600; color: var(--ui-muted); }
.cal-grid td { padding: 2px; text-align: center; }
.cal-day {
  position: relative; width: 100%; aspect-ratio: 1; max-width: 40px;
  font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; color: var(--ui-text);
  background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.cal-day:hover { background: var(--ui-surface-2); }
.cal-day:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cal-day.is-today { font-weight: 800; color: var(--ui-accent); box-shadow: inset 0 0 0 1.5px var(--ui-accent); }
.cal-day[aria-pressed="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cal-day.has-event::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: currentColor; }
```
