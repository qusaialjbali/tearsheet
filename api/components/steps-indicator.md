# Steps indicator (Tearsheet, Navigation)

Checkout-style progress through a fixed sequence, with done, current and upcoming steps.

**Why it works:** Mark the current step with aria-current="step" and tell screen readers which steps are complete in words, not only with a check mark.

**Checked:** axe clean in light and dark; tightest text contrast 17.41:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet steps-indicator v992839fe · https://qusaialjbali.github.io/tearsheet/zine/parts/steps-indicator.html -->
<ol class="steps">
  <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Cart <span class="sr-only">(completed)</span></span></li>
  <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Shipping <span class="sr-only">(completed)</span></span></li>
  <li class="step is-current" aria-current="step"><span class="step-dot">3</span><span class="step-label">Payment</span></li>
  <li class="step"><span class="step-dot">4</span><span class="step-label">Review</span></li>
</ol>
```

`styles.css`

```css
/* tearsheet steps-indicator v992839fe · https://qusaialjbali.github.io/tearsheet/zine/parts/steps-indicator.html */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.steps { display: flex; max-width: 560px; margin: 0 auto; padding: 0; list-style: none; }
.step {
  position: relative;
  flex: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ui-muted);
}
.step + .step::before {
  content: "";
  position: absolute;
  top: 15px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--ui-border);
}
.step.is-done + .step::before { background: var(--ui-accent); }
.step-dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border);
}
.step-dot svg { width: 16px; height: 16px; }
.step.is-done .step-dot { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.step.is-current .step-dot { color: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.step.is-current .step-label { font-weight: 700; color: var(--ui-text); }
.step.is-done .step-label { color: var(--ui-text); }
```

## React

`StepsIndicator.jsx`

```jsx
/* tearsheet steps-indicator v992839fe · https://qusaialjbali.github.io/tearsheet/zine/parts/steps-indicator.html */
import './StepsIndicator.css';

export function StepsIndicator() {
  return (
    <ol className="steps">
      <li className="step is-done"><span className="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="step-label">Cart <span className="sr-only">(completed)</span></span></li>
      <li className="step is-done"><span className="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="step-label">Shipping <span className="sr-only">(completed)</span></span></li>
      <li className="step is-current" aria-current="step"><span className="step-dot">3</span><span className="step-label">Payment</span></li>
      <li className="step"><span className="step-dot">4</span><span className="step-label">Review</span></li>
    </ol>
  );
}
```

`StepsIndicator.css`

```css
/* tearsheet steps-indicator v992839fe · https://qusaialjbali.github.io/tearsheet/zine/parts/steps-indicator.html */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.steps { display: flex; max-width: 560px; margin: 0 auto; padding: 0; list-style: none; }
.step {
  position: relative;
  flex: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ui-muted);
}
.step + .step::before {
  content: "";
  position: absolute;
  top: 15px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--ui-border);
}
.step.is-done + .step::before { background: var(--ui-accent); }
.step-dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border);
}
.step-dot svg { width: 16px; height: 16px; }
.step.is-done .step-dot { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.step.is-current .step-dot { color: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.step.is-current .step-label { font-weight: 700; color: var(--ui-text); }
.step.is-done .step-label { color: var(--ui-text); }
```

## Vue

`StepsIndicator.vue`

```vue
<!-- tearsheet steps-indicator v992839fe · https://qusaialjbali.github.io/tearsheet/zine/parts/steps-indicator.html -->
<template>
  <ol class="steps">
    <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Cart <span class="sr-only">(completed)</span></span></li>
    <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Shipping <span class="sr-only">(completed)</span></span></li>
    <li class="step is-current" aria-current="step"><span class="step-dot">3</span><span class="step-label">Payment</span></li>
    <li class="step"><span class="step-dot">4</span><span class="step-label">Review</span></li>
  </ol>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.steps { display: flex; max-width: 560px; margin: 0 auto; padding: 0; list-style: none; }
.step {
  position: relative;
  flex: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ui-muted);
}
.step + .step::before {
  content: "";
  position: absolute;
  top: 15px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--ui-border);
}
.step.is-done + .step::before { background: var(--ui-accent); }
.step-dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border);
}
.step-dot svg { width: 16px; height: 16px; }
.step.is-done .step-dot { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.step.is-current .step-dot { color: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.step.is-current .step-label { font-weight: 700; color: var(--ui-text); }
.step.is-done .step-label { color: var(--ui-text); }
</style>
```

## Svelte

`StepsIndicator.svelte`

```svelte
<!-- tearsheet steps-indicator v992839fe · https://qusaialjbali.github.io/tearsheet/zine/parts/steps-indicator.html -->
<ol class="steps">
  <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Cart <span class="sr-only">(completed)</span></span></li>
  <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Shipping <span class="sr-only">(completed)</span></span></li>
  <li class="step is-current" aria-current="step"><span class="step-dot">3</span><span class="step-label">Payment</span></li>
  <li class="step"><span class="step-dot">4</span><span class="step-label">Review</span></li>
</ol>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.steps { display: flex; max-width: 560px; margin: 0 auto; padding: 0; list-style: none; }
.step {
  position: relative;
  flex: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ui-muted);
}
.step + .step::before {
  content: "";
  position: absolute;
  top: 15px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--ui-border);
}
.step.is-done + .step::before { background: var(--ui-accent); }
.step-dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border);
}
.step-dot svg { width: 16px; height: 16px; }
.step.is-done .step-dot { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.step.is-current .step-dot { color: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.step.is-current .step-label { font-weight: 700; color: var(--ui-text); }
.step.is-done .step-label { color: var(--ui-text); }
</style>
```
