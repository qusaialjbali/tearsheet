# Chat thread (Tearsheet, Content)

Message bubbles with grouping, timestamps, a typing indicator and a composer that sends.

**Why it works:** The message list is a log (role="log") so new messages are announced. Sent messages align right and carry the same text colour contrast as received ones.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html -->
<section class="chat" aria-label="Chat with Lina">
  <div role="log" aria-live="polite" aria-label="Messages"><ol class="chat-log">
    <li class="msg them"><p>Hey! Did the new button styles land?</p><time datetime="09:41">09:41</time></li>
    <li class="msg me"><p>Yes, all four formats are in.</p></li>
    <li class="msg me"><p>Want me to send the React one?</p><time datetime="09:42">09:42</time></li>
    <li class="msg them typing" aria-label="Lina is typing"><span></span><span></span><span></span></li>
  </ol></div>
  <form class="chat-send">
    <label class="sr-only" for="chat-in">Message</label>
    <input id="chat-in" type="text" placeholder="Write a message" autocomplete="off" enterkeyhint="send">
    <button type="submit" aria-label="Send message"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10 17 3l-4 14-3-6-7-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
  </form>
</section>
```

`styles.css`

```css
/* tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.chat { display: grid; width: 100%; max-width: 380px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); overflow: hidden; }
.chat-log { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 16px; list-style: none; }
.msg { max-width: 78%; }
.msg p { margin: 0; padding: 9px 13px; font-size: 14px; line-height: 1.4; border-radius: 16px; }
.msg time { display: block; margin: 3px 6px 8px; font-size: 12px; color: var(--ui-muted); }
.them { align-self: flex-start; }
.them p { background: var(--ui-surface-2); border-bottom-left-radius: 4px; }
.me { align-self: flex-end; text-align: right; }
.me p { color: var(--ui-accent-text); background: var(--ui-accent); border-bottom-right-radius: 4px; text-align: start; }
.typing { display: flex; gap: 4px; padding: 12px 14px; background: var(--ui-surface-2); border-radius: 16px 16px 16px 4px; }
.typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--ui-muted); animation: typing 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes typing { 30% { transform: translateY(-4px); opacity: 0.6; } }
.chat-send { display: flex; gap: 8px; padding: 10px; border-top: 1px solid var(--ui-border); }
.chat-send input { flex: 1; min-width: 0; padding: 10px 14px; font: inherit; font-size: 14px; color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.chat-send input:focus { outline: none; box-shadow: var(--ui-focus); }
.chat-send button { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.chat-send button svg { width: 18px; height: 18px; }
.chat-send button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .typing span { animation: none; } }
```

`script.js`

```js
/* tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html */
function setup(root) {
  const form = root.querySelector('.chat-send');
  const input = form.querySelector('input');
  const log = root.querySelector('.chat-log');
  const typing = root.querySelector('.typing');
  const onSubmit = (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.className = 'msg me';
    const p = document.createElement('p');
    p.textContent = text;
    const t = document.createElement('time');
    const now = new Date();
    t.textContent = now.toTimeString().slice(0, 5);
    t.dateTime = t.textContent;
    li.append(p, t);
    log.insertBefore(li, typing);
    input.value = '';
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

document.querySelectorAll(".chat").forEach(setup);
```

## React

`ChatThread.jsx`

```jsx
/* tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html */
import { useEffect, useRef } from 'react';
import './ChatThread.css';

function setup(root) {
  const form = root.querySelector('.chat-send');
  const input = form.querySelector('input');
  const log = root.querySelector('.chat-log');
  const typing = root.querySelector('.typing');
  const onSubmit = (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.className = 'msg me';
    const p = document.createElement('p');
    p.textContent = text;
    const t = document.createElement('time');
    const now = new Date();
    t.textContent = now.toTimeString().slice(0, 5);
    t.dateTime = t.textContent;
    li.append(p, t);
    log.insertBefore(li, typing);
    input.value = '';
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

export function ChatThread() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <section ref={ref} className="chat" aria-label="Chat with Lina">
      <div role="log" aria-live="polite" aria-label="Messages"><ol className="chat-log">
        <li className="msg them"><p>Hey! Did the new button styles land?</p><time dateTime="09:41">09:41</time></li>
        <li className="msg me"><p>Yes, all four formats are in.</p></li>
        <li className="msg me"><p>Want me to send the React one?</p><time dateTime="09:42">09:42</time></li>
        <li className="msg them typing" aria-label="Lina is typing"><span></span><span></span><span></span></li>
      </ol></div>
      <form className="chat-send">
        <label className="sr-only" htmlFor="chat-in">Message</label>
        <input id="chat-in" type="text" placeholder="Write a message" autoComplete="off" enterKeyHint="send" />
        <button type="submit" aria-label="Send message"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10 17 3l-4 14-3-6-7-1Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg></button>
      </form>
    </section>
  );
}
```

`ChatThread.css`

```css
/* tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.chat { display: grid; width: 100%; max-width: 380px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); overflow: hidden; }
.chat-log { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 16px; list-style: none; }
.msg { max-width: 78%; }
.msg p { margin: 0; padding: 9px 13px; font-size: 14px; line-height: 1.4; border-radius: 16px; }
.msg time { display: block; margin: 3px 6px 8px; font-size: 12px; color: var(--ui-muted); }
.them { align-self: flex-start; }
.them p { background: var(--ui-surface-2); border-bottom-left-radius: 4px; }
.me { align-self: flex-end; text-align: right; }
.me p { color: var(--ui-accent-text); background: var(--ui-accent); border-bottom-right-radius: 4px; text-align: start; }
.typing { display: flex; gap: 4px; padding: 12px 14px; background: var(--ui-surface-2); border-radius: 16px 16px 16px 4px; }
.typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--ui-muted); animation: typing 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes typing { 30% { transform: translateY(-4px); opacity: 0.6; } }
.chat-send { display: flex; gap: 8px; padding: 10px; border-top: 1px solid var(--ui-border); }
.chat-send input { flex: 1; min-width: 0; padding: 10px 14px; font: inherit; font-size: 14px; color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.chat-send input:focus { outline: none; box-shadow: var(--ui-focus); }
.chat-send button { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.chat-send button svg { width: 18px; height: 18px; }
.chat-send button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .typing span { animation: none; } }
```

## Vue

`ChatThread.vue`

```vue
<!-- tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const form = root.querySelector('.chat-send');
  const input = form.querySelector('input');
  const log = root.querySelector('.chat-log');
  const typing = root.querySelector('.typing');
  const onSubmit = (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.className = 'msg me';
    const p = document.createElement('p');
    p.textContent = text;
    const t = document.createElement('time');
    const now = new Date();
    t.textContent = now.toTimeString().slice(0, 5);
    t.dateTime = t.textContent;
    li.append(p, t);
    log.insertBefore(li, typing);
    input.value = '';
  };
  form.addEventListener('submit', onSubmit);
  return () => form.removeEventListener('submit', onSubmit);
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <section ref="el" class="chat" aria-label="Chat with Lina">
    <div role="log" aria-live="polite" aria-label="Messages"><ol class="chat-log">
      <li class="msg them"><p>Hey! Did the new button styles land?</p><time datetime="09:41">09:41</time></li>
      <li class="msg me"><p>Yes, all four formats are in.</p></li>
      <li class="msg me"><p>Want me to send the React one?</p><time datetime="09:42">09:42</time></li>
      <li class="msg them typing" aria-label="Lina is typing"><span></span><span></span><span></span></li>
    </ol></div>
    <form class="chat-send">
      <label class="sr-only" for="chat-in">Message</label>
      <input id="chat-in" type="text" placeholder="Write a message" autocomplete="off" enterkeyhint="send">
      <button type="submit" aria-label="Send message"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10 17 3l-4 14-3-6-7-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
    </form>
  </section>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.chat { display: grid; width: 100%; max-width: 380px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); overflow: hidden; }
.chat-log { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 16px; list-style: none; }
.msg { max-width: 78%; }
.msg p { margin: 0; padding: 9px 13px; font-size: 14px; line-height: 1.4; border-radius: 16px; }
.msg time { display: block; margin: 3px 6px 8px; font-size: 12px; color: var(--ui-muted); }
.them { align-self: flex-start; }
.them p { background: var(--ui-surface-2); border-bottom-left-radius: 4px; }
.me { align-self: flex-end; text-align: right; }
.me p { color: var(--ui-accent-text); background: var(--ui-accent); border-bottom-right-radius: 4px; text-align: start; }
.typing { display: flex; gap: 4px; padding: 12px 14px; background: var(--ui-surface-2); border-radius: 16px 16px 16px 4px; }
.typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--ui-muted); animation: typing 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes typing { 30% { transform: translateY(-4px); opacity: 0.6; } }
.chat-send { display: flex; gap: 8px; padding: 10px; border-top: 1px solid var(--ui-border); }
.chat-send input { flex: 1; min-width: 0; padding: 10px 14px; font: inherit; font-size: 14px; color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.chat-send input:focus { outline: none; box-shadow: var(--ui-focus); }
.chat-send button { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.chat-send button svg { width: 18px; height: 18px; }
.chat-send button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .typing span { animation: none; } }
</style>
```

## Svelte

`ChatThread.svelte`

```svelte
<!-- tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html -->
<script>
  import { onMount } from 'svelte';
  import './ChatThread.css';

  let node;

  function setup(root) {
    const form = root.querySelector('.chat-send');
    const input = form.querySelector('input');
    const log = root.querySelector('.chat-log');
    const typing = root.querySelector('.typing');
    const onSubmit = (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      const li = document.createElement('li');
      li.className = 'msg me';
      const p = document.createElement('p');
      p.textContent = text;
      const t = document.createElement('time');
      const now = new Date();
      t.textContent = now.toTimeString().slice(0, 5);
      t.dateTime = t.textContent;
      li.append(p, t);
      log.insertBefore(li, typing);
      input.value = '';
    };
    form.addEventListener('submit', onSubmit);
    return () => form.removeEventListener('submit', onSubmit);
  }

  onMount(() => setup(node));
</script>

<section bind:this={node} class="chat" aria-label="Chat with Lina">
  <div role="log" aria-live="polite" aria-label="Messages"><ol class="chat-log">
    <li class="msg them"><p>Hey! Did the new button styles land?</p><time datetime="09:41">09:41</time></li>
    <li class="msg me"><p>Yes, all four formats are in.</p></li>
    <li class="msg me"><p>Want me to send the React one?</p><time datetime="09:42">09:42</time></li>
    <li class="msg them typing" aria-label="Lina is typing"><span></span><span></span><span></span></li>
  </ol></div>
  <form class="chat-send">
    <label class="sr-only" for="chat-in">Message</label>
    <input id="chat-in" type="text" placeholder="Write a message" autocomplete="off" enterkeyhint="send">
    <button type="submit" aria-label="Send message"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10 17 3l-4 14-3-6-7-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
  </form>
</section>
```

`ChatThread.css`

```css
/* tearsheet chat-thread v523d8c85 · https://qusaialjbali.github.io/tearsheet/zine/parts/chat-thread.html */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.chat { display: grid; width: 100%; max-width: 380px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); overflow: hidden; }
.chat-log { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 16px; list-style: none; }
.msg { max-width: 78%; }
.msg p { margin: 0; padding: 9px 13px; font-size: 14px; line-height: 1.4; border-radius: 16px; }
.msg time { display: block; margin: 3px 6px 8px; font-size: 12px; color: var(--ui-muted); }
.them { align-self: flex-start; }
.them p { background: var(--ui-surface-2); border-bottom-left-radius: 4px; }
.me { align-self: flex-end; text-align: right; }
.me p { color: var(--ui-accent-text); background: var(--ui-accent); border-bottom-right-radius: 4px; text-align: start; }
.typing { display: flex; gap: 4px; padding: 12px 14px; background: var(--ui-surface-2); border-radius: 16px 16px 16px 4px; }
.typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--ui-muted); animation: typing 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes typing { 30% { transform: translateY(-4px); opacity: 0.6; } }
.chat-send { display: flex; gap: 8px; padding: 10px; border-top: 1px solid var(--ui-border); }
.chat-send input { flex: 1; min-width: 0; padding: 10px 14px; font: inherit; font-size: 14px; color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.chat-send input:focus { outline: none; box-shadow: var(--ui-focus); }
.chat-send button { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.chat-send button svg { width: 18px; height: 18px; }
.chat-send button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .typing span { animation: none; } }
```
