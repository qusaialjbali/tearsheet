# Vinyl player (Tearsheet, Weird)

A record player UI: press play and the record spins, the tonearm drops and the track time runs.

**Why it works:** The play button is a real toggle (aria-pressed) and the time is a progress bar. This demo simulates playback; connect it to an <audio> element’s play(), pause() and timeupdate to make it real.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html -->
<div class="vinyl">
  <div class="vinyl-deck" aria-hidden="true">
    <div class="vinyl-record"><div class="vinyl-label">SIDE A</div></div>
    <div class="vinyl-arm"></div>
  </div>
  <div class="vinyl-info">
    <p class="vinyl-title">Overprint</p>
    <p class="vinyl-artist">The Two Inks</p>
    <div class="vinyl-bar" role="progressbar" aria-label="Track position" aria-valuemin="0" aria-valuemax="204" aria-valuenow="0" aria-valuetext="0:00 of 3:24"><span></span></div>
    <p class="vinyl-time"><span class="vinyl-now">0:00</span><span>3:24</span></p>
    <button class="vinyl-play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 20 20" aria-hidden="true"><path class="ic-play" d="M6 4v12l10-6Z"/><path class="ic-pause" d="M5 4h3.5v12H5ZM11.5 4H15v12h-3.5Z"/></svg></button>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html */
.vinyl { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 20px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 18px; }
.vinyl-deck { position: relative; width: 190px; height: 190px; }
.vinyl-record {
  display: grid; place-items: center; width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, transparent 0 30%, #111 31%), repeating-radial-gradient(circle, #1a1a1a 0 2px, #0b0b0b 2px 4px);
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.35);
  animation: vinyl-spin 1.8s linear infinite; animation-play-state: paused;
}
.vinyl-label { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; font-size: 12px; font-weight: 800; letter-spacing: 0.02em; color: #1b1b20; background: radial-gradient(circle, #1b1b20 0 3px, #ff48b0 4px); }
.vinyl-arm { position: absolute; top: -6px; right: -6px; width: 10px; height: 120px; border-radius: 6px; background: linear-gradient(#cfd0d4, #8f9096); transform-origin: 50% 8px; transform: rotate(-8deg); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.vinyl-arm::after { content: ""; position: absolute; bottom: -4px; left: -4px; width: 18px; height: 22px; border-radius: 4px; background: #3a3a40; }
.vinyl.is-playing .vinyl-record { animation-play-state: running; }
.vinyl.is-playing .vinyl-arm { transform: rotate(22deg); }
@keyframes vinyl-spin { to { transform: rotate(360deg); } }
.vinyl-info { width: 200px; }
.vinyl-info p { margin: 0; }
.vinyl-title { font-size: 20px; font-weight: 800; }
.vinyl-artist { margin-bottom: 14px !important; color: var(--ui-muted); }
.vinyl-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.vinyl-bar span { display: block; height: 100%; width: 0; background: var(--ui-accent); }
.vinyl-time { display: flex; justify-content: space-between; margin: 6px 0 12px !important; font-size: 12px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.vinyl-play { display: grid; place-items: center; width: 52px; height: 52px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.vinyl-play svg { width: 22px; height: 22px; fill: currentColor; }
.vinyl-play .ic-pause, .vinyl-play[aria-pressed="true"] .ic-play { display: none; }
.vinyl-play[aria-pressed="true"] .ic-pause { display: block; }
.vinyl-play:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .vinyl-record { animation: none; } .vinyl-arm { transition: none; } }
```

`script.js`

```js
/* tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html */
function setup(root) {
  const play = root.querySelector('.vinyl-play');
  const bar = root.querySelector('.vinyl-bar');
  const fill = bar.querySelector('span');
  const now = root.querySelector('.vinyl-now');
  const LENGTH = 204;
  let t = 0, timer;
  const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  const render = () => {
    fill.style.width = (t / LENGTH) * 100 + '%';
    now.textContent = fmt(t);
    bar.setAttribute('aria-valuenow', Math.floor(t));
    bar.setAttribute('aria-valuetext', fmt(t) + ' of ' + fmt(LENGTH));
  };
  const toggle = () => {
    const on = play.getAttribute('aria-pressed') !== 'true';
    play.setAttribute('aria-pressed', String(on));
    play.setAttribute('aria-label', on ? 'Pause' : 'Play');
    root.classList.toggle('is-playing', on);
    clearInterval(timer);
    // swap this simulated clock for audio.play() / audio.pause() and the timeupdate event
    if (on) timer = setInterval(() => { t = (t + 1) % LENGTH; render(); }, 1000);
  };
  play.addEventListener('click', toggle);
  render();
  return () => { clearInterval(timer); play.removeEventListener('click', toggle); };
}

document.querySelectorAll(".vinyl").forEach(setup);
```

## React

`VinylPlayer.jsx`

```jsx
/* tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html */
import { useEffect, useRef } from 'react';
import './VinylPlayer.css';

function setup(root) {
  const play = root.querySelector('.vinyl-play');
  const bar = root.querySelector('.vinyl-bar');
  const fill = bar.querySelector('span');
  const now = root.querySelector('.vinyl-now');
  const LENGTH = 204;
  let t = 0, timer;
  const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  const render = () => {
    fill.style.width = (t / LENGTH) * 100 + '%';
    now.textContent = fmt(t);
    bar.setAttribute('aria-valuenow', Math.floor(t));
    bar.setAttribute('aria-valuetext', fmt(t) + ' of ' + fmt(LENGTH));
  };
  const toggle = () => {
    const on = play.getAttribute('aria-pressed') !== 'true';
    play.setAttribute('aria-pressed', String(on));
    play.setAttribute('aria-label', on ? 'Pause' : 'Play');
    root.classList.toggle('is-playing', on);
    clearInterval(timer);
    // swap this simulated clock for audio.play() / audio.pause() and the timeupdate event
    if (on) timer = setInterval(() => { t = (t + 1) % LENGTH; render(); }, 1000);
  };
  play.addEventListener('click', toggle);
  render();
  return () => { clearInterval(timer); play.removeEventListener('click', toggle); };
}

export function VinylPlayer() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <div ref={ref} className="vinyl">
      <div className="vinyl-deck" aria-hidden="true">
        <div className="vinyl-record"><div className="vinyl-label">SIDE A</div></div>
        <div className="vinyl-arm"></div>
      </div>
      <div className="vinyl-info">
        <p className="vinyl-title">Overprint</p>
        <p className="vinyl-artist">The Two Inks</p>
        <div className="vinyl-bar" role="progressbar" aria-label="Track position" aria-valuemin="0" aria-valuemax="204" aria-valuenow="0" aria-valuetext="0:00 of 3:24"><span></span></div>
        <p className="vinyl-time"><span className="vinyl-now">0:00</span><span>3:24</span></p>
        <button className="vinyl-play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 20 20" aria-hidden="true"><path className="ic-play" d="M6 4v12l10-6Z"/><path className="ic-pause" d="M5 4h3.5v12H5ZM11.5 4H15v12h-3.5Z"/></svg></button>
      </div>
    </div>
  );
}
```

`VinylPlayer.css`

```css
/* tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html */
.vinyl { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 20px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 18px; }
.vinyl-deck { position: relative; width: 190px; height: 190px; }
.vinyl-record {
  display: grid; place-items: center; width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, transparent 0 30%, #111 31%), repeating-radial-gradient(circle, #1a1a1a 0 2px, #0b0b0b 2px 4px);
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.35);
  animation: vinyl-spin 1.8s linear infinite; animation-play-state: paused;
}
.vinyl-label { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; font-size: 12px; font-weight: 800; letter-spacing: 0.02em; color: #1b1b20; background: radial-gradient(circle, #1b1b20 0 3px, #ff48b0 4px); }
.vinyl-arm { position: absolute; top: -6px; right: -6px; width: 10px; height: 120px; border-radius: 6px; background: linear-gradient(#cfd0d4, #8f9096); transform-origin: 50% 8px; transform: rotate(-8deg); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.vinyl-arm::after { content: ""; position: absolute; bottom: -4px; left: -4px; width: 18px; height: 22px; border-radius: 4px; background: #3a3a40; }
.vinyl.is-playing .vinyl-record { animation-play-state: running; }
.vinyl.is-playing .vinyl-arm { transform: rotate(22deg); }
@keyframes vinyl-spin { to { transform: rotate(360deg); } }
.vinyl-info { width: 200px; }
.vinyl-info p { margin: 0; }
.vinyl-title { font-size: 20px; font-weight: 800; }
.vinyl-artist { margin-bottom: 14px !important; color: var(--ui-muted); }
.vinyl-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.vinyl-bar span { display: block; height: 100%; width: 0; background: var(--ui-accent); }
.vinyl-time { display: flex; justify-content: space-between; margin: 6px 0 12px !important; font-size: 12px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.vinyl-play { display: grid; place-items: center; width: 52px; height: 52px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.vinyl-play svg { width: 22px; height: 22px; fill: currentColor; }
.vinyl-play .ic-pause, .vinyl-play[aria-pressed="true"] .ic-play { display: none; }
.vinyl-play[aria-pressed="true"] .ic-pause { display: block; }
.vinyl-play:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .vinyl-record { animation: none; } .vinyl-arm { transition: none; } }
```

## Vue

`VinylPlayer.vue`

```vue
<!-- tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const play = root.querySelector('.vinyl-play');
  const bar = root.querySelector('.vinyl-bar');
  const fill = bar.querySelector('span');
  const now = root.querySelector('.vinyl-now');
  const LENGTH = 204;
  let t = 0, timer;
  const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  const render = () => {
    fill.style.width = (t / LENGTH) * 100 + '%';
    now.textContent = fmt(t);
    bar.setAttribute('aria-valuenow', Math.floor(t));
    bar.setAttribute('aria-valuetext', fmt(t) + ' of ' + fmt(LENGTH));
  };
  const toggle = () => {
    const on = play.getAttribute('aria-pressed') !== 'true';
    play.setAttribute('aria-pressed', String(on));
    play.setAttribute('aria-label', on ? 'Pause' : 'Play');
    root.classList.toggle('is-playing', on);
    clearInterval(timer);
    // swap this simulated clock for audio.play() / audio.pause() and the timeupdate event
    if (on) timer = setInterval(() => { t = (t + 1) % LENGTH; render(); }, 1000);
  };
  play.addEventListener('click', toggle);
  render();
  return () => { clearInterval(timer); play.removeEventListener('click', toggle); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="el" class="vinyl">
    <div class="vinyl-deck" aria-hidden="true">
      <div class="vinyl-record"><div class="vinyl-label">SIDE A</div></div>
      <div class="vinyl-arm"></div>
    </div>
    <div class="vinyl-info">
      <p class="vinyl-title">Overprint</p>
      <p class="vinyl-artist">The Two Inks</p>
      <div class="vinyl-bar" role="progressbar" aria-label="Track position" aria-valuemin="0" aria-valuemax="204" aria-valuenow="0" aria-valuetext="0:00 of 3:24"><span></span></div>
      <p class="vinyl-time"><span class="vinyl-now">0:00</span><span>3:24</span></p>
      <button class="vinyl-play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 20 20" aria-hidden="true"><path class="ic-play" d="M6 4v12l10-6Z"/><path class="ic-pause" d="M5 4h3.5v12H5ZM11.5 4H15v12h-3.5Z"/></svg></button>
    </div>
  </div>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.vinyl { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 20px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 18px; }
.vinyl-deck { position: relative; width: 190px; height: 190px; }
.vinyl-record {
  display: grid; place-items: center; width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, transparent 0 30%, #111 31%), repeating-radial-gradient(circle, #1a1a1a 0 2px, #0b0b0b 2px 4px);
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.35);
  animation: vinyl-spin 1.8s linear infinite; animation-play-state: paused;
}
.vinyl-label { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; font-size: 12px; font-weight: 800; letter-spacing: 0.02em; color: #1b1b20; background: radial-gradient(circle, #1b1b20 0 3px, #ff48b0 4px); }
.vinyl-arm { position: absolute; top: -6px; right: -6px; width: 10px; height: 120px; border-radius: 6px; background: linear-gradient(#cfd0d4, #8f9096); transform-origin: 50% 8px; transform: rotate(-8deg); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.vinyl-arm::after { content: ""; position: absolute; bottom: -4px; left: -4px; width: 18px; height: 22px; border-radius: 4px; background: #3a3a40; }
.vinyl.is-playing .vinyl-record { animation-play-state: running; }
.vinyl.is-playing .vinyl-arm { transform: rotate(22deg); }
@keyframes vinyl-spin { to { transform: rotate(360deg); } }
.vinyl-info { width: 200px; }
.vinyl-info p { margin: 0; }
.vinyl-title { font-size: 20px; font-weight: 800; }
.vinyl-artist { margin-bottom: 14px !important; color: var(--ui-muted); }
.vinyl-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.vinyl-bar span { display: block; height: 100%; width: 0; background: var(--ui-accent); }
.vinyl-time { display: flex; justify-content: space-between; margin: 6px 0 12px !important; font-size: 12px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.vinyl-play { display: grid; place-items: center; width: 52px; height: 52px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.vinyl-play svg { width: 22px; height: 22px; fill: currentColor; }
.vinyl-play .ic-pause, .vinyl-play[aria-pressed="true"] .ic-play { display: none; }
.vinyl-play[aria-pressed="true"] .ic-pause { display: block; }
.vinyl-play:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .vinyl-record { animation: none; } .vinyl-arm { transition: none; } }
</style>
```

## Svelte

`VinylPlayer.svelte`

```svelte
<!-- tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html -->
<script>
  import { onMount } from 'svelte';
  import './VinylPlayer.css';

  let node;

  function setup(root) {
    const play = root.querySelector('.vinyl-play');
    const bar = root.querySelector('.vinyl-bar');
    const fill = bar.querySelector('span');
    const now = root.querySelector('.vinyl-now');
    const LENGTH = 204;
    let t = 0, timer;
    const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
    const render = () => {
      fill.style.width = (t / LENGTH) * 100 + '%';
      now.textContent = fmt(t);
      bar.setAttribute('aria-valuenow', Math.floor(t));
      bar.setAttribute('aria-valuetext', fmt(t) + ' of ' + fmt(LENGTH));
    };
    const toggle = () => {
      const on = play.getAttribute('aria-pressed') !== 'true';
      play.setAttribute('aria-pressed', String(on));
      play.setAttribute('aria-label', on ? 'Pause' : 'Play');
      root.classList.toggle('is-playing', on);
      clearInterval(timer);
      // swap this simulated clock for audio.play() / audio.pause() and the timeupdate event
      if (on) timer = setInterval(() => { t = (t + 1) % LENGTH; render(); }, 1000);
    };
    play.addEventListener('click', toggle);
    render();
    return () => { clearInterval(timer); play.removeEventListener('click', toggle); };
  }

  onMount(() => setup(node));
</script>

<div bind:this={node} class="vinyl">
  <div class="vinyl-deck" aria-hidden="true">
    <div class="vinyl-record"><div class="vinyl-label">SIDE A</div></div>
    <div class="vinyl-arm"></div>
  </div>
  <div class="vinyl-info">
    <p class="vinyl-title">Overprint</p>
    <p class="vinyl-artist">The Two Inks</p>
    <div class="vinyl-bar" role="progressbar" aria-label="Track position" aria-valuemin="0" aria-valuemax="204" aria-valuenow="0" aria-valuetext="0:00 of 3:24"><span></span></div>
    <p class="vinyl-time"><span class="vinyl-now">0:00</span><span>3:24</span></p>
    <button class="vinyl-play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 20 20" aria-hidden="true"><path class="ic-play" d="M6 4v12l10-6Z"/><path class="ic-pause" d="M5 4h3.5v12H5ZM11.5 4H15v12h-3.5Z"/></svg></button>
  </div>
</div>
```

`VinylPlayer.css`

```css
/* tearsheet vinyl-player v35972aae · https://qusaialjbali.github.io/tearsheet/zine/parts/vinyl-player.html */
.vinyl { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 20px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 18px; }
.vinyl-deck { position: relative; width: 190px; height: 190px; }
.vinyl-record {
  display: grid; place-items: center; width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, transparent 0 30%, #111 31%), repeating-radial-gradient(circle, #1a1a1a 0 2px, #0b0b0b 2px 4px);
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.35);
  animation: vinyl-spin 1.8s linear infinite; animation-play-state: paused;
}
.vinyl-label { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; font-size: 12px; font-weight: 800; letter-spacing: 0.02em; color: #1b1b20; background: radial-gradient(circle, #1b1b20 0 3px, #ff48b0 4px); }
.vinyl-arm { position: absolute; top: -6px; right: -6px; width: 10px; height: 120px; border-radius: 6px; background: linear-gradient(#cfd0d4, #8f9096); transform-origin: 50% 8px; transform: rotate(-8deg); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.vinyl-arm::after { content: ""; position: absolute; bottom: -4px; left: -4px; width: 18px; height: 22px; border-radius: 4px; background: #3a3a40; }
.vinyl.is-playing .vinyl-record { animation-play-state: running; }
.vinyl.is-playing .vinyl-arm { transform: rotate(22deg); }
@keyframes vinyl-spin { to { transform: rotate(360deg); } }
.vinyl-info { width: 200px; }
.vinyl-info p { margin: 0; }
.vinyl-title { font-size: 20px; font-weight: 800; }
.vinyl-artist { margin-bottom: 14px !important; color: var(--ui-muted); }
.vinyl-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.vinyl-bar span { display: block; height: 100%; width: 0; background: var(--ui-accent); }
.vinyl-time { display: flex; justify-content: space-between; margin: 6px 0 12px !important; font-size: 12px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.vinyl-play { display: grid; place-items: center; width: 52px; height: 52px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.vinyl-play svg { width: 22px; height: 22px; fill: currentColor; }
.vinyl-play .ic-pause, .vinyl-play[aria-pressed="true"] .ic-play { display: none; }
.vinyl-play[aria-pressed="true"] .ic-pause { display: block; }
.vinyl-play:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .vinyl-record { animation: none; } .vinyl-arm { transition: none; } }
```
