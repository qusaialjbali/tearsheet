# Toast notification (Tearsheet, Feedback)

Non-blocking confirmation that appears briefly in a live region and can be dismissed.

**Why it works:** Toasts are for low-stakes confirmations. Never put the only copy of an error or an essential action in a toast; it disappears. Keep a live region in the page from load so screen readers announce new toasts.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet toast vf4d3440b · https://qusaialjbali.github.io/tearsheet/zine/parts/toast.html -->
<button class="btn btn-primary" type="button" data-toast="Changes saved">Save changes</button>

<div class="toast-region" role="region" aria-label="Notifications" aria-live="polite"></div>
```

`styles.css`

```css
/* tearsheet toast vf4d3440b · https://qusaialjbali.github.io/tearsheet/zine/parts/toast.html */
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.toast-region {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  display: grid;
  gap: 10px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  padding: 12px 12px 12px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: var(--ui-radius-sm);
  box-shadow: var(--ui-shadow-lg);
  animation: toast-in 0.2s ease-out;
}
.toast-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  color: #fff;
  background: var(--ui-success);
}
.toast-msg { flex: 1; }
.toast-close {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 1;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 6px;
  opacity: 0.7;
  cursor: pointer;
}
.toast-close:hover { opacity: 1; background: rgb(127 127 127 / 0.2); }
.toast-close:focus-visible { outline: none; box-shadow: var(--ui-focus); opacity: 1; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(10px); }
}
@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}
```

`script.js`

```js
/* tearsheet toast vf4d3440b · https://qusaialjbali.github.io/tearsheet/zine/parts/toast.html */
const region = document.querySelector('.toast-region');

function showToast(message, duration = 4000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML =
    '<span class="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
    '<span class="toast-msg"></span>' +
    '<button class="toast-close" type="button" aria-label="Dismiss"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>';
  toast.querySelector('.toast-msg').textContent = message;

  const remove = () => toast.remove();
  toast.querySelector('.toast-close').addEventListener('click', remove);
  region.append(toast);
  setTimeout(remove, duration);
}

document.querySelectorAll('[data-toast]').forEach((btn) => {
  btn.addEventListener('click', () => showToast(btn.dataset.toast));
});
```

## React

`Toast.jsx`

```jsx
/* tearsheet toast vf4d3440b · https://qusaialjbali.github.io/tearsheet/zine/parts/toast.html */
import { useState } from 'react';
import './Toast.css';

export function ToastDemo() {
  const [toasts, setToasts] = useState([]);

  const dismiss = (id) => setToasts((list) => list.filter((t) => t.id !== id));

  const showToast = (message, duration = 4000) => {
    const id = crypto.randomUUID();
    setToasts((list) => [...list, { id, message }]);
    setTimeout(() => dismiss(id), duration);
  };

  return (
    <>
      <button className="btn btn-primary" type="button" onClick={() => showToast('Changes saved')}>
        Save changes
      </button>

      <div className="toast-region" role="region" aria-label="Notifications" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span className="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span className="toast-msg">{t.message}</span>
            <button className="toast-close" type="button" aria-label="Dismiss" onClick={() => dismiss(t.id)}>
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
```

`Toast.css`

```css
/* tearsheet toast vf4d3440b · https://qusaialjbali.github.io/tearsheet/zine/parts/toast.html */
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.toast-region {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  display: grid;
  gap: 10px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  padding: 12px 12px 12px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: var(--ui-radius-sm);
  box-shadow: var(--ui-shadow-lg);
  animation: toast-in 0.2s ease-out;
}
.toast-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  color: #fff;
  background: var(--ui-success);
}
.toast-msg { flex: 1; }
.toast-close {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 1;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 6px;
  opacity: 0.7;
  cursor: pointer;
}
.toast-close:hover { opacity: 1; background: rgb(127 127 127 / 0.2); }
.toast-close:focus-visible { outline: none; box-shadow: var(--ui-focus); opacity: 1; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(10px); }
}
@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}
```

## Vue

`Toast.vue`

```vue
<!-- tearsheet toast vf4d3440b · https://qusaialjbali.github.io/tearsheet/zine/parts/toast.html -->
<script setup>
import { ref } from 'vue';

const toasts = ref([]);

function dismiss(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}
function showToast(message, duration = 4000) {
  const id = crypto.randomUUID();
  toasts.value.push({ id, message });
  setTimeout(() => dismiss(id), duration);
}
</script>

<template>
  <button class="btn btn-primary" type="button" @click="showToast('Changes saved')">Save changes</button>

  <div class="toast-region" role="region" aria-label="Notifications" aria-live="polite">
    <div v-for="t in toasts" :key="t.id" class="toast">
      <span class="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span class="toast-msg">{{ t.message }}</span>
      <button class="toast-close" type="button" aria-label="Dismiss" @click="dismiss(t.id)"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.toast-region {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  display: grid;
  gap: 10px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  padding: 12px 12px 12px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: var(--ui-radius-sm);
  box-shadow: var(--ui-shadow-lg);
  animation: toast-in 0.2s ease-out;
}
.toast-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  color: #fff;
  background: var(--ui-success);
}
.toast-msg { flex: 1; }
.toast-close {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 1;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 6px;
  opacity: 0.7;
  cursor: pointer;
}
.toast-close:hover { opacity: 1; background: rgb(127 127 127 / 0.2); }
.toast-close:focus-visible { outline: none; box-shadow: var(--ui-focus); opacity: 1; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(10px); }
}
@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}
</style>
```

## Svelte

`Toast.svelte`

```svelte
<!-- tearsheet toast vf4d3440b · https://qusaialjbali.github.io/tearsheet/zine/parts/toast.html -->
<script>
  let toasts = [];

  function dismiss(id) {
    toasts = toasts.filter((t) => t.id !== id);
  }
  function showToast(message, duration = 4000) {
    const id = crypto.randomUUID();
    toasts = [...toasts, { id, message }];
    setTimeout(() => dismiss(id), duration);
  }
</script>

<button class="btn btn-primary" type="button" on:click={() => showToast('Changes saved')}>Save changes</button>

<div class="toast-region" role="region" aria-label="Notifications" aria-live="polite">
  {#each toasts as t (t.id)}
    <div class="toast">
      <span class="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span class="toast-msg">{t.message}</span>
      <button class="toast-close" type="button" aria-label="Dismiss" on:click={() => dismiss(t.id)}><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
  {/each}
</div>

<style>
.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.toast-region {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  display: grid;
  gap: 10px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  padding: 12px 12px 12px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: var(--ui-radius-sm);
  box-shadow: var(--ui-shadow-lg);
  animation: toast-in 0.2s ease-out;
}
.toast-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  color: #fff;
  background: var(--ui-success);
}
.toast-msg { flex: 1; }
.toast-close {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 1;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 6px;
  opacity: 0.7;
  cursor: pointer;
}
.toast-close:hover { opacity: 1; background: rgb(127 127 127 / 0.2); }
.toast-close:focus-visible { outline: none; box-shadow: var(--ui-focus); opacity: 1; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(10px); }
}
@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}
</style>
```
