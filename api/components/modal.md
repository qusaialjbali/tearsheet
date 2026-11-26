# Modal dialog (Tearsheet, Overlays)

Confirmation dialog built on the native <dialog> element: focus trapping, Esc to close and a backdrop come built in.

**Why it works:** Name the action in the confirm button (“Delete project”), not “OK”. Clicking the backdrop or pressing Esc cancels. Focus returns to the trigger on close.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet modal vd8d64a4f · https://qusaialjbali.github.io/tearsheet/zine/parts/modal.html -->
<button class="btn btn-primary" type="button" data-open-modal="delete-dialog">Delete project…</button>

<dialog class="modal" id="delete-dialog" aria-labelledby="modal-title">
  <form method="dialog" class="modal-body">
    <h2 class="modal-title" id="modal-title">Delete project?</h2>
    <p class="modal-text">This permanently removes “Website redesign” and all of its files. This can’t be undone.</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" value="cancel">Cancel</button>
      <button class="btn btn-danger" value="confirm">Delete project</button>
    </div>
  </form>
</dialog>
```

`styles.css`

```css
/* tearsheet modal vd8d64a4f · https://qusaialjbali.github.io/tearsheet/zine/parts/modal.html */
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
.modal {
  width: min(440px, calc(100vw - 32px));
  padding: 0;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.modal::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }
.modal[open] { animation: modal-in 0.18s ease-out; }
.modal-body { padding: 24px; }
.modal-title { margin: 0 0 8px; font-size: 19px; }
.modal-text { margin: 0 0 24px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }

@keyframes modal-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
}
@media (prefers-reduced-motion: reduce) {
  .modal[open] { animation: none; }
}
```

`script.js`

```js
/* tearsheet modal vd8d64a4f · https://qusaialjbali.github.io/tearsheet/zine/parts/modal.html */
document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.openModal);
  trigger.addEventListener('click', () => dialog.showModal());
  // Close when the backdrop (the dialog element itself) is clicked
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close('cancel');
  });
  dialog.addEventListener('close', () => {
    console.log('Dialog result:', dialog.returnValue);
  });
});
```

## React

`Modal.jsx`

```jsx
/* tearsheet modal vd8d64a4f · https://qusaialjbali.github.io/tearsheet/zine/parts/modal.html */
import { useRef } from 'react';
import './Modal.css';

export function Modal({ onConfirm }) {
  const dialog = useRef(null);

  const handleClose = () => {
    if (dialog.current.returnValue === 'confirm') onConfirm?.();
  };

  return (
    <>
      <button className="btn btn-primary" type="button" onClick={() => dialog.current.showModal()}>
        Delete project…
      </button>

      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onClose={handleClose}
        onClick={(e) => e.target === dialog.current && dialog.current.close('cancel')}
      >
        <form method="dialog" className="modal-body">
          <h2 className="modal-title" id="modal-title">Delete project?</h2>
          <p className="modal-text">
            This permanently removes “Website redesign” and all of its files. This can’t be undone.
          </p>
          <div className="modal-actions">
            <button className="btn btn-secondary" value="cancel">Cancel</button>
            <button className="btn btn-danger" value="confirm">Delete project</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
```

`Modal.css`

```css
/* tearsheet modal vd8d64a4f · https://qusaialjbali.github.io/tearsheet/zine/parts/modal.html */
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
.modal {
  width: min(440px, calc(100vw - 32px));
  padding: 0;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.modal::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }
.modal[open] { animation: modal-in 0.18s ease-out; }
.modal-body { padding: 24px; }
.modal-title { margin: 0 0 8px; font-size: 19px; }
.modal-text { margin: 0 0 24px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }

@keyframes modal-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
}
@media (prefers-reduced-motion: reduce) {
  .modal[open] { animation: none; }
}
```

## Vue

`Modal.vue`

```vue
<!-- tearsheet modal vd8d64a4f · https://qusaialjbali.github.io/tearsheet/zine/parts/modal.html -->
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['confirm']);
const dialog = ref(null);

function onClose() {
  if (dialog.value.returnValue === 'confirm') emit('confirm');
}
function onBackdrop(e) {
  if (e.target === dialog.value) dialog.value.close('cancel');
}
</script>

<template>
  <button class="btn btn-primary" type="button" @click="dialog.showModal()">Delete project…</button>

  <dialog ref="dialog" class="modal" aria-labelledby="modal-title" @close="onClose" @click="onBackdrop">
    <form method="dialog" class="modal-body">
      <h2 class="modal-title" id="modal-title">Delete project?</h2>
      <p class="modal-text">This permanently removes “Website redesign” and all of its files. This can’t be undone.</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" value="cancel">Cancel</button>
        <button class="btn btn-danger" value="confirm">Delete project</button>
      </div>
    </form>
  </dialog>
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
.modal {
  width: min(440px, calc(100vw - 32px));
  padding: 0;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.modal::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }
.modal[open] { animation: modal-in 0.18s ease-out; }
.modal-body { padding: 24px; }
.modal-title { margin: 0 0 8px; font-size: 19px; }
.modal-text { margin: 0 0 24px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }

@keyframes modal-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
}
@media (prefers-reduced-motion: reduce) {
  .modal[open] { animation: none; }
}
</style>
```

## Svelte

`Modal.svelte`

```svelte
<!-- tearsheet modal vd8d64a4f · https://qusaialjbali.github.io/tearsheet/zine/parts/modal.html -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let dialog;

  function onClose() {
    if (dialog.returnValue === 'confirm') dispatch('confirm');
  }
  function onBackdrop(e) {
    if (e.target === dialog) dialog.close('cancel');
  }
</script>

<button class="btn btn-primary" type="button" on:click={() => dialog.showModal()}>Delete project…</button>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} class="modal" aria-labelledby="modal-title" on:close={onClose} on:click={onBackdrop}>
  <form method="dialog" class="modal-body">
    <h2 class="modal-title" id="modal-title">Delete project?</h2>
    <p class="modal-text">This permanently removes “Website redesign” and all of its files. This can’t be undone.</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" value="cancel">Cancel</button>
      <button class="btn btn-danger" value="confirm">Delete project</button>
    </div>
  </form>
</dialog>

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
.modal {
  width: min(440px, calc(100vw - 32px));
  padding: 0;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.modal::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }
.modal[open] { animation: modal-in 0.18s ease-out; }
.modal-body { padding: 24px; }
.modal-title { margin: 0 0 8px; font-size: 19px; }
.modal-text { margin: 0 0 24px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }

@keyframes modal-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
}
@media (prefers-reduced-motion: reduce) {
  .modal[open] { animation: none; }
}
</style>
```
