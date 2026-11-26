# Text field (Tearsheet, Forms)

Labelled input with helper text and an error state wired up with aria-describedby.

**Why it works:** Always use a visible <label>; placeholders vanish while typing. Link hints and errors with aria-describedby and flag errors with aria-invalid.

**Checked:** axe clean in light and dark; tightest text contrast 5.73:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet text-field v7756d5d8 · https://qusaialjbali.github.io/tearsheet/zine/parts/text-field.html -->
<div class="form-stack">
  <div class="field">
    <label class="field-label" for="email">Email</label>
    <input class="field-input" id="email" type="email" placeholder="you@example.com" autocomplete="email" aria-describedby="email-hint">
    <p class="field-hint" id="email-hint">We’ll never share your email.</p>
  </div>
  <div class="field">
    <label class="field-label" for="password">Password</label>
    <input class="field-input" id="password" type="password" autocomplete="new-password" aria-invalid="true" aria-describedby="password-error">
    <p class="field-error" id="password-error">Use at least 8 characters.</p>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet text-field v7756d5d8 · https://qusaialjbali.github.io/tearsheet/zine/parts/text-field.html */
.form-stack {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 360px;
}
.field { display: grid; gap: 6px; }
.field-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.field-input {
  font: inherit;
  font-size: 15px;
  padding: 10px 12px;
  min-height: 42px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input::placeholder { color: var(--ui-muted); opacity: 0.8; }
.field-input:hover { border-color: var(--ui-text); }
.field-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.field-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.field-hint, .field-error { margin: 0; font-size: 13px; }
.field-hint { color: var(--ui-muted); }
.field-error { color: var(--ui-danger); font-weight: 500; }
.field-error::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  vertical-align: -2px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
```

## React

`TextField.jsx`

```jsx
/* tearsheet text-field v7756d5d8 · https://qusaialjbali.github.io/tearsheet/zine/parts/text-field.html */
import './TextField.css';

export function TextField() {
  return (
    <div className="form-stack">
      <div className="field">
        <label className="field-label" htmlFor="email">Email</label>
        <input className="field-input" id="email" type="email" placeholder="you@example.com" autoComplete="email" aria-describedby="email-hint" />
        <p className="field-hint" id="email-hint">We’ll never share your email.</p>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="password">Password</label>
        <input className="field-input" id="password" type="password" autoComplete="new-password" aria-invalid="true" aria-describedby="password-error" />
        <p className="field-error" id="password-error">Use at least 8 characters.</p>
      </div>
    </div>
  );
}
```

`TextField.css`

```css
/* tearsheet text-field v7756d5d8 · https://qusaialjbali.github.io/tearsheet/zine/parts/text-field.html */
.form-stack {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 360px;
}
.field { display: grid; gap: 6px; }
.field-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.field-input {
  font: inherit;
  font-size: 15px;
  padding: 10px 12px;
  min-height: 42px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input::placeholder { color: var(--ui-muted); opacity: 0.8; }
.field-input:hover { border-color: var(--ui-text); }
.field-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.field-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.field-hint, .field-error { margin: 0; font-size: 13px; }
.field-hint { color: var(--ui-muted); }
.field-error { color: var(--ui-danger); font-weight: 500; }
.field-error::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  vertical-align: -2px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
```

## Vue

`TextField.vue`

```vue
<!-- tearsheet text-field v7756d5d8 · https://qusaialjbali.github.io/tearsheet/zine/parts/text-field.html -->
<template>
  <div class="form-stack">
    <div class="field">
      <label class="field-label" for="email">Email</label>
      <input class="field-input" id="email" type="email" placeholder="you@example.com" autocomplete="email" aria-describedby="email-hint">
      <p class="field-hint" id="email-hint">We’ll never share your email.</p>
    </div>
    <div class="field">
      <label class="field-label" for="password">Password</label>
      <input class="field-input" id="password" type="password" autocomplete="new-password" aria-invalid="true" aria-describedby="password-error">
      <p class="field-error" id="password-error">Use at least 8 characters.</p>
    </div>
  </div>
</template>

<style scoped>
.form-stack {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 360px;
}
.field { display: grid; gap: 6px; }
.field-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.field-input {
  font: inherit;
  font-size: 15px;
  padding: 10px 12px;
  min-height: 42px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input::placeholder { color: var(--ui-muted); opacity: 0.8; }
.field-input:hover { border-color: var(--ui-text); }
.field-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.field-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.field-hint, .field-error { margin: 0; font-size: 13px; }
.field-hint { color: var(--ui-muted); }
.field-error { color: var(--ui-danger); font-weight: 500; }
.field-error::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  vertical-align: -2px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
</style>
```

## Svelte

`TextField.svelte`

```svelte
<!-- tearsheet text-field v7756d5d8 · https://qusaialjbali.github.io/tearsheet/zine/parts/text-field.html -->
<div class="form-stack">
  <div class="field">
    <label class="field-label" for="email">Email</label>
    <input class="field-input" id="email" type="email" placeholder="you@example.com" autocomplete="email" aria-describedby="email-hint">
    <p class="field-hint" id="email-hint">We’ll never share your email.</p>
  </div>
  <div class="field">
    <label class="field-label" for="password">Password</label>
    <input class="field-input" id="password" type="password" autocomplete="new-password" aria-invalid="true" aria-describedby="password-error">
    <p class="field-error" id="password-error">Use at least 8 characters.</p>
  </div>
</div>

<style>
.form-stack {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 360px;
}
.field { display: grid; gap: 6px; }
.field-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.field-input {
  font: inherit;
  font-size: 15px;
  padding: 10px 12px;
  min-height: 42px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input::placeholder { color: var(--ui-muted); opacity: 0.8; }
.field-input:hover { border-color: var(--ui-text); }
.field-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.field-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.field-hint, .field-error { margin: 0; font-size: 13px; }
.field-hint { color: var(--ui-muted); }
.field-error { color: var(--ui-danger); font-weight: 500; }
.field-error::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  vertical-align: -2px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
</style>
```
