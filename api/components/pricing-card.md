# Pricing card (Tearsheet, Sections)

Plan card with price, feature list and a single call to action.

**Why it works:** Say what happens after the click (“Start free trial”) and answer the top worry right below it (“No card required”).

**Checked:** axe clean in light and dark; tightest text contrast 5.35:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet pricing-card v2ee6510b · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-card.html -->
<div class="pricing">
  <div class="pricing-head">
    <p class="pricing-plan">Pro</p>
    <span class="pricing-tag">Most popular</span>
  </div>
  <p class="pricing-price"><span class="pricing-amount">$12</span><span class="pricing-period">per user / month</span></p>
  <p class="pricing-desc">For small teams that ship fast.</p>
  <ul class="pricing-features">
    <li>Unlimited projects</li>
    <li>Version history for 1 year</li>
    <li>Custom domains</li>
    <li>Priority email support</li>
  </ul>
  <a class="pricing-cta" href="#">Start free trial</a>
  <p class="pricing-note">14 days free · No card required</p>
</div>
```

`styles.css`

```css
/* tearsheet pricing-card v2ee6510b · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-card.html */
.pricing {
  width: 100%;
  max-width: 320px;
  padding: 28px;
  background: var(--ui-surface);
  border: 2px solid var(--ui-accent);
  border-radius: 16px;
  box-shadow: var(--ui-shadow);
}
.pricing-head { display: flex; align-items: center; justify-content: space-between; }
.pricing-plan { margin: 0; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.pricing-tag {
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 999px;
}
.pricing-price { display: flex; align-items: baseline; gap: 8px; margin: 16px 0 4px; }
.pricing-amount { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; color: var(--ui-text); }
.pricing-period { font-size: 14px; color: var(--ui-muted); }
.pricing-desc { margin: 0 0 20px; font-size: 15px; color: var(--ui-muted); }
.pricing-features { display: grid; gap: 10px; margin: 0 0 24px; padding: 0; list-style: none; }
.pricing-features li { display: flex; gap: 10px; font-size: 15px; color: var(--ui-text); }
.pricing-features li::before {
  content: "";
  width: 16px;
  height: 16px;
  flex: none;
  margin-top: 3px;
  background: var(--ui-success);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
.pricing-cta {
  display: block;
  padding: 12px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border-radius: var(--ui-radius-sm);
}
.pricing-cta:hover { background: var(--ui-accent-hover); }
.pricing-cta:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.pricing-note { margin: 10px 0 0; font-size: 13px; text-align: center; color: var(--ui-muted); }
```

## React

`PricingCard.jsx`

```jsx
/* tearsheet pricing-card v2ee6510b · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-card.html */
import './PricingCard.css';

export function PricingCard() {
  return (
    <div className="pricing">
      <div className="pricing-head">
        <p className="pricing-plan">Pro</p>
        <span className="pricing-tag">Most popular</span>
      </div>
      <p className="pricing-price"><span className="pricing-amount">$12</span><span className="pricing-period">per user / month</span></p>
      <p className="pricing-desc">For small teams that ship fast.</p>
      <ul className="pricing-features">
        <li>Unlimited projects</li>
        <li>Version history for 1 year</li>
        <li>Custom domains</li>
        <li>Priority email support</li>
      </ul>
      <a className="pricing-cta" href="#">Start free trial</a>
      <p className="pricing-note">14 days free · No card required</p>
    </div>
  );
}
```

`PricingCard.css`

```css
/* tearsheet pricing-card v2ee6510b · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-card.html */
.pricing {
  width: 100%;
  max-width: 320px;
  padding: 28px;
  background: var(--ui-surface);
  border: 2px solid var(--ui-accent);
  border-radius: 16px;
  box-shadow: var(--ui-shadow);
}
.pricing-head { display: flex; align-items: center; justify-content: space-between; }
.pricing-plan { margin: 0; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.pricing-tag {
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 999px;
}
.pricing-price { display: flex; align-items: baseline; gap: 8px; margin: 16px 0 4px; }
.pricing-amount { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; color: var(--ui-text); }
.pricing-period { font-size: 14px; color: var(--ui-muted); }
.pricing-desc { margin: 0 0 20px; font-size: 15px; color: var(--ui-muted); }
.pricing-features { display: grid; gap: 10px; margin: 0 0 24px; padding: 0; list-style: none; }
.pricing-features li { display: flex; gap: 10px; font-size: 15px; color: var(--ui-text); }
.pricing-features li::before {
  content: "";
  width: 16px;
  height: 16px;
  flex: none;
  margin-top: 3px;
  background: var(--ui-success);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
.pricing-cta {
  display: block;
  padding: 12px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border-radius: var(--ui-radius-sm);
}
.pricing-cta:hover { background: var(--ui-accent-hover); }
.pricing-cta:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.pricing-note { margin: 10px 0 0; font-size: 13px; text-align: center; color: var(--ui-muted); }
```

## Vue

`PricingCard.vue`

```vue
<!-- tearsheet pricing-card v2ee6510b · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-card.html -->
<template>
  <div class="pricing">
    <div class="pricing-head">
      <p class="pricing-plan">Pro</p>
      <span class="pricing-tag">Most popular</span>
    </div>
    <p class="pricing-price"><span class="pricing-amount">$12</span><span class="pricing-period">per user / month</span></p>
    <p class="pricing-desc">For small teams that ship fast.</p>
    <ul class="pricing-features">
      <li>Unlimited projects</li>
      <li>Version history for 1 year</li>
      <li>Custom domains</li>
      <li>Priority email support</li>
    </ul>
    <a class="pricing-cta" href="#">Start free trial</a>
    <p class="pricing-note">14 days free · No card required</p>
  </div>
</template>

<style scoped>
.pricing {
  width: 100%;
  max-width: 320px;
  padding: 28px;
  background: var(--ui-surface);
  border: 2px solid var(--ui-accent);
  border-radius: 16px;
  box-shadow: var(--ui-shadow);
}
.pricing-head { display: flex; align-items: center; justify-content: space-between; }
.pricing-plan { margin: 0; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.pricing-tag {
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 999px;
}
.pricing-price { display: flex; align-items: baseline; gap: 8px; margin: 16px 0 4px; }
.pricing-amount { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; color: var(--ui-text); }
.pricing-period { font-size: 14px; color: var(--ui-muted); }
.pricing-desc { margin: 0 0 20px; font-size: 15px; color: var(--ui-muted); }
.pricing-features { display: grid; gap: 10px; margin: 0 0 24px; padding: 0; list-style: none; }
.pricing-features li { display: flex; gap: 10px; font-size: 15px; color: var(--ui-text); }
.pricing-features li::before {
  content: "";
  width: 16px;
  height: 16px;
  flex: none;
  margin-top: 3px;
  background: var(--ui-success);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
.pricing-cta {
  display: block;
  padding: 12px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border-radius: var(--ui-radius-sm);
}
.pricing-cta:hover { background: var(--ui-accent-hover); }
.pricing-cta:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.pricing-note { margin: 10px 0 0; font-size: 13px; text-align: center; color: var(--ui-muted); }
</style>
```

## Svelte

`PricingCard.svelte`

```svelte
<!-- tearsheet pricing-card v2ee6510b · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-card.html -->
<div class="pricing">
  <div class="pricing-head">
    <p class="pricing-plan">Pro</p>
    <span class="pricing-tag">Most popular</span>
  </div>
  <p class="pricing-price"><span class="pricing-amount">$12</span><span class="pricing-period">per user / month</span></p>
  <p class="pricing-desc">For small teams that ship fast.</p>
  <ul class="pricing-features">
    <li>Unlimited projects</li>
    <li>Version history for 1 year</li>
    <li>Custom domains</li>
    <li>Priority email support</li>
  </ul>
  <a class="pricing-cta" href="#">Start free trial</a>
  <p class="pricing-note">14 days free · No card required</p>
</div>

<style>
.pricing {
  width: 100%;
  max-width: 320px;
  padding: 28px;
  background: var(--ui-surface);
  border: 2px solid var(--ui-accent);
  border-radius: 16px;
  box-shadow: var(--ui-shadow);
}
.pricing-head { display: flex; align-items: center; justify-content: space-between; }
.pricing-plan { margin: 0; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.pricing-tag {
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 999px;
}
.pricing-price { display: flex; align-items: baseline; gap: 8px; margin: 16px 0 4px; }
.pricing-amount { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; color: var(--ui-text); }
.pricing-period { font-size: 14px; color: var(--ui-muted); }
.pricing-desc { margin: 0 0 20px; font-size: 15px; color: var(--ui-muted); }
.pricing-features { display: grid; gap: 10px; margin: 0 0 24px; padding: 0; list-style: none; }
.pricing-features li { display: flex; gap: 10px; font-size: 15px; color: var(--ui-text); }
.pricing-features li::before {
  content: "";
  width: 16px;
  height: 16px;
  flex: none;
  margin-top: 3px;
  background: var(--ui-success);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
.pricing-cta {
  display: block;
  padding: 12px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border-radius: var(--ui-radius-sm);
}
.pricing-cta:hover { background: var(--ui-accent-hover); }
.pricing-cta:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.pricing-note { margin: 10px 0 0; font-size: 13px; text-align: center; color: var(--ui-muted); }
</style>
```
