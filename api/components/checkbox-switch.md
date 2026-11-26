# Checkbox & switch (Tearsheet, Forms)

Custom-styled native checkboxes and a toggle switch. Keyboard and screen-reader support stays native.

**Why it works:** Checkboxes are for choices submitted later; switches are for settings that apply instantly. The whole label is clickable, giving a large target.

**Checked:** axe clean in light and dark; tightest text contrast 17.41:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet checkbox-switch v8c0af3c4 · https://qusaialjbali.github.io/tearsheet/zine/parts/checkbox-switch.html -->
<div class="choices">
  <label class="check">
    <input type="checkbox" checked>
    <span>Email me product updates</span>
  </label>
  <label class="check">
    <input type="checkbox">
    <span>I agree to the terms</span>
  </label>
  <label class="switch">
    <input type="checkbox" role="switch" checked>
    <span class="switch-track" aria-hidden="true"></span>
    <span>Notifications</span>
  </label>
</div>
```

`styles.css`

```css
/* tearsheet checkbox-switch v8c0af3c4 · https://qusaialjbali.github.io/tearsheet/zine/parts/checkbox-switch.html */
.choices { display: grid; gap: 14px; }
.check, .switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
}
.check input {
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 6px;
  background: var(--ui-surface);
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}
.check input::after {
  content: "";
  width: 5px;
  height: 10px;
  border: solid var(--ui-accent-text);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px) scale(0);
  transition: transform 0.12s;
}
.check input:checked { background: var(--ui-accent); border-color: var(--ui-accent); }
.check input:checked::after { transform: rotate(45deg) translate(-1px, -1px) scale(1); }
.check input:focus-visible { outline: none; box-shadow: var(--ui-focus); }

.switch input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.switch-track {
  position: relative;
  width: 42px;
  height: 24px;
  flex: none;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.switch-track::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.switch input:checked + .switch-track { background: var(--ui-accent); }
.switch input:checked + .switch-track::after { transform: translateX(18px); }
.switch input:focus-visible + .switch-track { box-shadow: var(--ui-focus); }

@media (prefers-reduced-motion: reduce) {
  .switch-track, .switch-track::after, .check input::after { transition: none; }
}
```

## React

`CheckboxSwitch.jsx`

```jsx
/* tearsheet checkbox-switch v8c0af3c4 · https://qusaialjbali.github.io/tearsheet/zine/parts/checkbox-switch.html */
import './CheckboxSwitch.css';

export function CheckboxSwitch() {
  return (
    <div className="choices">
      <label className="check">
        <input type="checkbox" defaultChecked />
        <span>Email me product updates</span>
      </label>
      <label className="check">
        <input type="checkbox" />
        <span>I agree to the terms</span>
      </label>
      <label className="switch">
        <input type="checkbox" role="switch" defaultChecked />
        <span className="switch-track" aria-hidden="true"></span>
        <span>Notifications</span>
      </label>
    </div>
  );
}
```

`CheckboxSwitch.css`

```css
/* tearsheet checkbox-switch v8c0af3c4 · https://qusaialjbali.github.io/tearsheet/zine/parts/checkbox-switch.html */
.choices { display: grid; gap: 14px; }
.check, .switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
}
.check input {
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 6px;
  background: var(--ui-surface);
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}
.check input::after {
  content: "";
  width: 5px;
  height: 10px;
  border: solid var(--ui-accent-text);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px) scale(0);
  transition: transform 0.12s;
}
.check input:checked { background: var(--ui-accent); border-color: var(--ui-accent); }
.check input:checked::after { transform: rotate(45deg) translate(-1px, -1px) scale(1); }
.check input:focus-visible { outline: none; box-shadow: var(--ui-focus); }

.switch input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.switch-track {
  position: relative;
  width: 42px;
  height: 24px;
  flex: none;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.switch-track::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.switch input:checked + .switch-track { background: var(--ui-accent); }
.switch input:checked + .switch-track::after { transform: translateX(18px); }
.switch input:focus-visible + .switch-track { box-shadow: var(--ui-focus); }

@media (prefers-reduced-motion: reduce) {
  .switch-track, .switch-track::after, .check input::after { transition: none; }
}
```

## Vue

`CheckboxSwitch.vue`

```vue
<!-- tearsheet checkbox-switch v8c0af3c4 · https://qusaialjbali.github.io/tearsheet/zine/parts/checkbox-switch.html -->
<template>
  <div class="choices">
    <label class="check">
      <input type="checkbox" checked>
      <span>Email me product updates</span>
    </label>
    <label class="check">
      <input type="checkbox">
      <span>I agree to the terms</span>
    </label>
    <label class="switch">
      <input type="checkbox" role="switch" checked>
      <span class="switch-track" aria-hidden="true"></span>
      <span>Notifications</span>
    </label>
  </div>
</template>

<style scoped>
.choices { display: grid; gap: 14px; }
.check, .switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
}
.check input {
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 6px;
  background: var(--ui-surface);
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}
.check input::after {
  content: "";
  width: 5px;
  height: 10px;
  border: solid var(--ui-accent-text);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px) scale(0);
  transition: transform 0.12s;
}
.check input:checked { background: var(--ui-accent); border-color: var(--ui-accent); }
.check input:checked::after { transform: rotate(45deg) translate(-1px, -1px) scale(1); }
.check input:focus-visible { outline: none; box-shadow: var(--ui-focus); }

.switch input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.switch-track {
  position: relative;
  width: 42px;
  height: 24px;
  flex: none;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.switch-track::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.switch input:checked + .switch-track { background: var(--ui-accent); }
.switch input:checked + .switch-track::after { transform: translateX(18px); }
.switch input:focus-visible + .switch-track { box-shadow: var(--ui-focus); }

@media (prefers-reduced-motion: reduce) {
  .switch-track, .switch-track::after, .check input::after { transition: none; }
}
</style>
```

## Svelte

`CheckboxSwitch.svelte`

```svelte
<!-- tearsheet checkbox-switch v8c0af3c4 · https://qusaialjbali.github.io/tearsheet/zine/parts/checkbox-switch.html -->
<div class="choices">
  <label class="check">
    <input type="checkbox" checked>
    <span>Email me product updates</span>
  </label>
  <label class="check">
    <input type="checkbox">
    <span>I agree to the terms</span>
  </label>
  <label class="switch">
    <input type="checkbox" role="switch" checked>
    <span class="switch-track" aria-hidden="true"></span>
    <span>Notifications</span>
  </label>
</div>

<style>
.choices { display: grid; gap: 14px; }
.check, .switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
}
.check input {
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 6px;
  background: var(--ui-surface);
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}
.check input::after {
  content: "";
  width: 5px;
  height: 10px;
  border: solid var(--ui-accent-text);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px) scale(0);
  transition: transform 0.12s;
}
.check input:checked { background: var(--ui-accent); border-color: var(--ui-accent); }
.check input:checked::after { transform: rotate(45deg) translate(-1px, -1px) scale(1); }
.check input:focus-visible { outline: none; box-shadow: var(--ui-focus); }

.switch input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.switch-track {
  position: relative;
  width: 42px;
  height: 24px;
  flex: none;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.switch-track::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.switch input:checked + .switch-track { background: var(--ui-accent); }
.switch input:checked + .switch-track::after { transform: translateX(18px); }
.switch input:focus-visible + .switch-track { box-shadow: var(--ui-focus); }

@media (prefers-reduced-motion: reduce) {
  .switch-track, .switch-track::after, .check input::after { transition: none; }
}
</style>
```
