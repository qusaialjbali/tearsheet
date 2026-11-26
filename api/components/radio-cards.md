# Radio cards (Tearsheet, Forms)

Big, scannable choice cards built on native radio buttons.

**Why it works:** The whole card is the label, so the click target is huge. Arrow keys move between options because they are real radios in one group.

**Checked:** axe clean in light and dark; tightest text contrast 5.99:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet radio-cards v27c9c3d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/radio-cards.html -->
<fieldset class="plans">
  <legend class="plans-legend">Choose a plan</legend>
  <label class="plan">
    <input type="radio" name="plan" value="hobby">
    <span class="plan-name">Hobby</span>
    <span class="plan-meta">1 project · community help</span>
    <span class="plan-price">Free</span>
  </label>
  <label class="plan">
    <input type="radio" name="plan" value="pro" checked>
    <span class="plan-name">Pro</span>
    <span class="plan-meta">Unlimited projects · email help</span>
    <span class="plan-price">$12/mo</span>
  </label>
  <label class="plan">
    <input type="radio" name="plan" value="team">
    <span class="plan-name">Team</span>
    <span class="plan-meta">Shared workspace · priority help</span>
    <span class="plan-price">$29/mo</span>
  </label>
</fieldset>
```

`styles.css`

```css
/* tearsheet radio-cards v27c9c3d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/radio-cards.html */
.plans { display: grid; gap: 10px; width: 100%; max-width: 420px; margin: 0; padding: 0; border: 0; }
.plans-legend { margin-bottom: 8px; padding: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.plan {
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 14px;
  align-items: center;
  padding: 14px 16px;
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.plan:hover { border-color: var(--ui-border-strong); }
.plan input {
  grid-row: span 2;
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 50%;
  transition: border-width 0.15s, border-color 0.15s;
}
.plan input:checked { border: 6px solid var(--ui-accent); }
.plan:has(input:checked) { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.plan:has(input:focus-visible) { box-shadow: var(--ui-focus); }
.plan-name { font-weight: 600; color: var(--ui-text); }
.plan-meta { grid-column: 2; font-size: 13px; color: var(--ui-muted); }
.plan-price { grid-row: 1 / span 2; grid-column: 3; font-weight: 700; color: var(--ui-text); font-variant-numeric: tabular-nums; }
```

## React

`RadioCards.jsx`

```jsx
/* tearsheet radio-cards v27c9c3d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/radio-cards.html */
import './RadioCards.css';

export function RadioCards() {
  return (
    <fieldset className="plans">
      <legend className="plans-legend">Choose a plan</legend>
      <label className="plan">
        <input type="radio" name="plan" defaultValue="hobby" />
        <span className="plan-name">Hobby</span>
        <span className="plan-meta">1 project · community help</span>
        <span className="plan-price">Free</span>
      </label>
      <label className="plan">
        <input type="radio" name="plan" defaultValue="pro" defaultChecked />
        <span className="plan-name">Pro</span>
        <span className="plan-meta">Unlimited projects · email help</span>
        <span className="plan-price">$12/mo</span>
      </label>
      <label className="plan">
        <input type="radio" name="plan" defaultValue="team" />
        <span className="plan-name">Team</span>
        <span className="plan-meta">Shared workspace · priority help</span>
        <span className="plan-price">$29/mo</span>
      </label>
    </fieldset>
  );
}
```

`RadioCards.css`

```css
/* tearsheet radio-cards v27c9c3d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/radio-cards.html */
.plans { display: grid; gap: 10px; width: 100%; max-width: 420px; margin: 0; padding: 0; border: 0; }
.plans-legend { margin-bottom: 8px; padding: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.plan {
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 14px;
  align-items: center;
  padding: 14px 16px;
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.plan:hover { border-color: var(--ui-border-strong); }
.plan input {
  grid-row: span 2;
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 50%;
  transition: border-width 0.15s, border-color 0.15s;
}
.plan input:checked { border: 6px solid var(--ui-accent); }
.plan:has(input:checked) { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.plan:has(input:focus-visible) { box-shadow: var(--ui-focus); }
.plan-name { font-weight: 600; color: var(--ui-text); }
.plan-meta { grid-column: 2; font-size: 13px; color: var(--ui-muted); }
.plan-price { grid-row: 1 / span 2; grid-column: 3; font-weight: 700; color: var(--ui-text); font-variant-numeric: tabular-nums; }
```

## Vue

`RadioCards.vue`

```vue
<!-- tearsheet radio-cards v27c9c3d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/radio-cards.html -->
<template>
  <fieldset class="plans">
    <legend class="plans-legend">Choose a plan</legend>
    <label class="plan">
      <input type="radio" name="plan" value="hobby">
      <span class="plan-name">Hobby</span>
      <span class="plan-meta">1 project · community help</span>
      <span class="plan-price">Free</span>
    </label>
    <label class="plan">
      <input type="radio" name="plan" value="pro" checked>
      <span class="plan-name">Pro</span>
      <span class="plan-meta">Unlimited projects · email help</span>
      <span class="plan-price">$12/mo</span>
    </label>
    <label class="plan">
      <input type="radio" name="plan" value="team">
      <span class="plan-name">Team</span>
      <span class="plan-meta">Shared workspace · priority help</span>
      <span class="plan-price">$29/mo</span>
    </label>
  </fieldset>
</template>

<style scoped>
.plans { display: grid; gap: 10px; width: 100%; max-width: 420px; margin: 0; padding: 0; border: 0; }
.plans-legend { margin-bottom: 8px; padding: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.plan {
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 14px;
  align-items: center;
  padding: 14px 16px;
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.plan:hover { border-color: var(--ui-border-strong); }
.plan input {
  grid-row: span 2;
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 50%;
  transition: border-width 0.15s, border-color 0.15s;
}
.plan input:checked { border: 6px solid var(--ui-accent); }
.plan:has(input:checked) { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.plan:has(input:focus-visible) { box-shadow: var(--ui-focus); }
.plan-name { font-weight: 600; color: var(--ui-text); }
.plan-meta { grid-column: 2; font-size: 13px; color: var(--ui-muted); }
.plan-price { grid-row: 1 / span 2; grid-column: 3; font-weight: 700; color: var(--ui-text); font-variant-numeric: tabular-nums; }
</style>
```

## Svelte

`RadioCards.svelte`

```svelte
<!-- tearsheet radio-cards v27c9c3d2 · https://qusaialjbali.github.io/tearsheet/zine/parts/radio-cards.html -->
<fieldset class="plans">
  <legend class="plans-legend">Choose a plan</legend>
  <label class="plan">
    <input type="radio" name="plan" value="hobby">
    <span class="plan-name">Hobby</span>
    <span class="plan-meta">1 project · community help</span>
    <span class="plan-price">Free</span>
  </label>
  <label class="plan">
    <input type="radio" name="plan" value="pro" checked>
    <span class="plan-name">Pro</span>
    <span class="plan-meta">Unlimited projects · email help</span>
    <span class="plan-price">$12/mo</span>
  </label>
  <label class="plan">
    <input type="radio" name="plan" value="team">
    <span class="plan-name">Team</span>
    <span class="plan-meta">Shared workspace · priority help</span>
    <span class="plan-price">$29/mo</span>
  </label>
</fieldset>

<style>
.plans { display: grid; gap: 10px; width: 100%; max-width: 420px; margin: 0; padding: 0; border: 0; }
.plans-legend { margin-bottom: 8px; padding: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.plan {
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 14px;
  align-items: center;
  padding: 14px 16px;
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.plan:hover { border-color: var(--ui-border-strong); }
.plan input {
  grid-row: span 2;
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 50%;
  transition: border-width 0.15s, border-color 0.15s;
}
.plan input:checked { border: 6px solid var(--ui-accent); }
.plan:has(input:checked) { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.plan:has(input:focus-visible) { box-shadow: var(--ui-focus); }
.plan-name { font-weight: 600; color: var(--ui-text); }
.plan-meta { grid-column: 2; font-size: 13px; color: var(--ui-muted); }
.plan-price { grid-row: 1 / span 2; grid-column: 3; font-weight: 700; color: var(--ui-text); font-variant-numeric: tabular-nums; }
</style>
```
