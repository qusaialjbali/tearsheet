# Typewriter terminal (Tearsheet, Weird)

A terminal window that types out a short session line by line, with a blinking caret and a replay.

**Why it works:** The full transcript is real text for screen readers from the start; only the visual copy is typed. Reduced motion shows it all at once.

**Checked:** axe clean in light and dark; tightest text contrast 6.56:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html -->
<figure class="term">
  <div class="term-bar" aria-hidden="true"><i></i><i></i><i></i><span>zsh</span></div>
  <pre class="term-sr">$ npx tearsheet add modal
Fetched modal (HTML, React, Vue, Svelte)
$ open Modal.jsx
Done. No install needed, honestly.</pre>
  <pre class="term-screen" aria-hidden="true"></pre>
  <button class="term-replay" type="button">Replay</button>
</figure>
```

`styles.css`

```css
/* tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html */
.term { width: 100%; max-width: 460px; margin: 0; overflow: hidden; background: #0f1115; border-radius: 12px; box-shadow: 0 18px 40px -16px rgb(0 0 0 / 0.5); }
.term-bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: #1b1e25; }
.term-bar i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.term-bar i:nth-child(2) { background: #febc2e; }
.term-bar i:nth-child(3) { background: #28c840; }
.term-bar span { margin-left: auto; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #9ca3af; }
.term-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.term-screen { min-height: 120px; margin: 0; padding: 16px; font-family: ui-monospace, Consolas, monospace; font-size: 14px; line-height: 1.7; color: #e5e7eb; white-space: pre-wrap; }
.term-screen .cmd { color: #86efac; }
.term-caret { display: inline-block; width: 8px; height: 1.1em; margin-left: 1px; vertical-align: -2px; background: #e5e7eb; animation: term-blink 1s steps(1) infinite; }
@keyframes term-blink { 50% { opacity: 0; } }
.term-replay { display: block; margin: 0 16px 14px auto; padding: 6px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e5e7eb; background: #262a33; border: 0; border-radius: 6px; cursor: pointer; }
.term-replay:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
@media (prefers-reduced-motion: reduce) { .term-caret { animation: none; } }
```

`script.js`

```js
/* tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html */
function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = root.querySelector('.term-sr').textContent.split('\n');
  const screen = root.querySelector('.term-screen');
  const replay = root.querySelector('.term-replay');
  let timer;
  const caret = () => { const c = document.createElement('span'); c.className = 'term-caret'; return c; };
  const render = (upTo) => {
    screen.replaceChildren();
    let left = upTo;
    for (const line of lines) {
      if (left <= 0) break;
      const shown = line.slice(0, left);
      left -= line.length + 1;
      const span = document.createElement('span');
      if (line.startsWith('$')) span.className = 'cmd';
      span.textContent = shown;
      screen.append(span, left > 0 ? '\n' : '');
    }
    screen.append(caret());
  };
  const total = lines.join('\n').length;
  const play = () => {
    clearTimeout(timer);
    if (reduce) return render(total);
    let i = 0;
    const tick = () => {
      render(++i);
      if (i < total) timer = setTimeout(tick, lines.join('\n')[i - 1] === '\n' ? 380 : 28 + Math.random() * 40);
    };
    tick();
  };
  replay.addEventListener('click', play);
  play();
  return () => { clearTimeout(timer); replay.removeEventListener('click', play); };
}

document.querySelectorAll(".term").forEach(setup);
```

## React

`TypewriterTerminal.jsx`

```jsx
/* tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html */
import { useEffect, useRef } from 'react';
import './TypewriterTerminal.css';

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = root.querySelector('.term-sr').textContent.split('\n');
  const screen = root.querySelector('.term-screen');
  const replay = root.querySelector('.term-replay');
  let timer;
  const caret = () => { const c = document.createElement('span'); c.className = 'term-caret'; return c; };
  const render = (upTo) => {
    screen.replaceChildren();
    let left = upTo;
    for (const line of lines) {
      if (left <= 0) break;
      const shown = line.slice(0, left);
      left -= line.length + 1;
      const span = document.createElement('span');
      if (line.startsWith('$')) span.className = 'cmd';
      span.textContent = shown;
      screen.append(span, left > 0 ? '\n' : '');
    }
    screen.append(caret());
  };
  const total = lines.join('\n').length;
  const play = () => {
    clearTimeout(timer);
    if (reduce) return render(total);
    let i = 0;
    const tick = () => {
      render(++i);
      if (i < total) timer = setTimeout(tick, lines.join('\n')[i - 1] === '\n' ? 380 : 28 + Math.random() * 40);
    };
    tick();
  };
  replay.addEventListener('click', play);
  play();
  return () => { clearTimeout(timer); replay.removeEventListener('click', play); };
}

export function TypewriterTerminal() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <figure ref={ref} className="term">
      <div className="term-bar" aria-hidden="true"><i></i><i></i><i></i><span>zsh</span></div>
      <pre className="term-sr">$ npx tearsheet add modal
    Fetched modal (HTML, React, Vue, Svelte)
    $ open Modal.jsx
    Done. No install needed, honestly.</pre>
      <pre className="term-screen" aria-hidden="true"></pre>
      <button className="term-replay" type="button">Replay</button>
    </figure>
  );
}
```

`TypewriterTerminal.css`

```css
/* tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html */
.term { width: 100%; max-width: 460px; margin: 0; overflow: hidden; background: #0f1115; border-radius: 12px; box-shadow: 0 18px 40px -16px rgb(0 0 0 / 0.5); }
.term-bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: #1b1e25; }
.term-bar i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.term-bar i:nth-child(2) { background: #febc2e; }
.term-bar i:nth-child(3) { background: #28c840; }
.term-bar span { margin-left: auto; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #9ca3af; }
.term-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.term-screen { min-height: 120px; margin: 0; padding: 16px; font-family: ui-monospace, Consolas, monospace; font-size: 14px; line-height: 1.7; color: #e5e7eb; white-space: pre-wrap; }
.term-screen .cmd { color: #86efac; }
.term-caret { display: inline-block; width: 8px; height: 1.1em; margin-left: 1px; vertical-align: -2px; background: #e5e7eb; animation: term-blink 1s steps(1) infinite; }
@keyframes term-blink { 50% { opacity: 0; } }
.term-replay { display: block; margin: 0 16px 14px auto; padding: 6px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e5e7eb; background: #262a33; border: 0; border-radius: 6px; cursor: pointer; }
.term-replay:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
@media (prefers-reduced-motion: reduce) { .term-caret { animation: none; } }
```

## Vue

`TypewriterTerminal.vue`

```vue
<!-- tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = root.querySelector('.term-sr').textContent.split('\n');
  const screen = root.querySelector('.term-screen');
  const replay = root.querySelector('.term-replay');
  let timer;
  const caret = () => { const c = document.createElement('span'); c.className = 'term-caret'; return c; };
  const render = (upTo) => {
    screen.replaceChildren();
    let left = upTo;
    for (const line of lines) {
      if (left <= 0) break;
      const shown = line.slice(0, left);
      left -= line.length + 1;
      const span = document.createElement('span');
      if (line.startsWith('$')) span.className = 'cmd';
      span.textContent = shown;
      screen.append(span, left > 0 ? '\n' : '');
    }
    screen.append(caret());
  };
  const total = lines.join('\n').length;
  const play = () => {
    clearTimeout(timer);
    if (reduce) return render(total);
    let i = 0;
    const tick = () => {
      render(++i);
      if (i < total) timer = setTimeout(tick, lines.join('\n')[i - 1] === '\n' ? 380 : 28 + Math.random() * 40);
    };
    tick();
  };
  replay.addEventListener('click', play);
  play();
  return () => { clearTimeout(timer); replay.removeEventListener('click', play); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <figure ref="el" class="term">
    <div class="term-bar" aria-hidden="true"><i></i><i></i><i></i><span>zsh</span></div>
    <pre class="term-sr">$ npx tearsheet add modal
  Fetched modal (HTML, React, Vue, Svelte)
  $ open Modal.jsx
  Done. No install needed, honestly.</pre>
    <pre class="term-screen" aria-hidden="true"></pre>
    <button class="term-replay" type="button">Replay</button>
  </figure>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.term { width: 100%; max-width: 460px; margin: 0; overflow: hidden; background: #0f1115; border-radius: 12px; box-shadow: 0 18px 40px -16px rgb(0 0 0 / 0.5); }
.term-bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: #1b1e25; }
.term-bar i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.term-bar i:nth-child(2) { background: #febc2e; }
.term-bar i:nth-child(3) { background: #28c840; }
.term-bar span { margin-left: auto; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #9ca3af; }
.term-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.term-screen { min-height: 120px; margin: 0; padding: 16px; font-family: ui-monospace, Consolas, monospace; font-size: 14px; line-height: 1.7; color: #e5e7eb; white-space: pre-wrap; }
.term-screen .cmd { color: #86efac; }
.term-caret { display: inline-block; width: 8px; height: 1.1em; margin-left: 1px; vertical-align: -2px; background: #e5e7eb; animation: term-blink 1s steps(1) infinite; }
@keyframes term-blink { 50% { opacity: 0; } }
.term-replay { display: block; margin: 0 16px 14px auto; padding: 6px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e5e7eb; background: #262a33; border: 0; border-radius: 6px; cursor: pointer; }
.term-replay:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
@media (prefers-reduced-motion: reduce) { .term-caret { animation: none; } }
</style>
```

## Svelte

`TypewriterTerminal.svelte`

```svelte
<!-- tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html -->
<script>
  import { onMount } from 'svelte';
  import './TypewriterTerminal.css';

  let node;

  function setup(root) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = root.querySelector('.term-sr').textContent.split('\n');
    const screen = root.querySelector('.term-screen');
    const replay = root.querySelector('.term-replay');
    let timer;
    const caret = () => { const c = document.createElement('span'); c.className = 'term-caret'; return c; };
    const render = (upTo) => {
      screen.replaceChildren();
      let left = upTo;
      for (const line of lines) {
        if (left <= 0) break;
        const shown = line.slice(0, left);
        left -= line.length + 1;
        const span = document.createElement('span');
        if (line.startsWith('$')) span.className = 'cmd';
        span.textContent = shown;
        screen.append(span, left > 0 ? '\n' : '');
      }
      screen.append(caret());
    };
    const total = lines.join('\n').length;
    const play = () => {
      clearTimeout(timer);
      if (reduce) return render(total);
      let i = 0;
      const tick = () => {
        render(++i);
        if (i < total) timer = setTimeout(tick, lines.join('\n')[i - 1] === '\n' ? 380 : 28 + Math.random() * 40);
      };
      tick();
    };
    replay.addEventListener('click', play);
    play();
    return () => { clearTimeout(timer); replay.removeEventListener('click', play); };
  }

  onMount(() => setup(node));
</script>

<figure bind:this={node} class="term">
  <div class="term-bar" aria-hidden="true"><i></i><i></i><i></i><span>zsh</span></div>
  <pre class="term-sr">$ npx tearsheet add modal
Fetched modal (HTML, React, Vue, Svelte)
$ open Modal.jsx
Done. No install needed, honestly.</pre>
  <pre class="term-screen" aria-hidden="true"></pre>
  <button class="term-replay" type="button">Replay</button>
</figure>
```

`TypewriterTerminal.css`

```css
/* tearsheet typewriter-terminal v0fcd340d · https://qusaialjbali.github.io/tearsheet/zine/parts/typewriter-terminal.html */
.term { width: 100%; max-width: 460px; margin: 0; overflow: hidden; background: #0f1115; border-radius: 12px; box-shadow: 0 18px 40px -16px rgb(0 0 0 / 0.5); }
.term-bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: #1b1e25; }
.term-bar i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.term-bar i:nth-child(2) { background: #febc2e; }
.term-bar i:nth-child(3) { background: #28c840; }
.term-bar span { margin-left: auto; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #9ca3af; }
.term-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.term-screen { min-height: 120px; margin: 0; padding: 16px; font-family: ui-monospace, Consolas, monospace; font-size: 14px; line-height: 1.7; color: #e5e7eb; white-space: pre-wrap; }
.term-screen .cmd { color: #86efac; }
.term-caret { display: inline-block; width: 8px; height: 1.1em; margin-left: 1px; vertical-align: -2px; background: #e5e7eb; animation: term-blink 1s steps(1) infinite; }
@keyframes term-blink { 50% { opacity: 0; } }
.term-replay { display: block; margin: 0 16px 14px auto; padding: 6px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e5e7eb; background: #262a33; border: 0; border-radius: 6px; cursor: pointer; }
.term-replay:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
@media (prefers-reduced-motion: reduce) { .term-caret { animation: none; } }
```
