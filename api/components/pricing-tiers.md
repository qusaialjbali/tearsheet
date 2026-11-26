# Pricing tiers (Tearsheet, Sections)

Three plans side by side with a monthly/yearly switch that updates every price.

**Why it works:** Show the yearly saving as an amount, not a vague “save big”. The switch is a real radio pair, so it works with the keyboard and states its choice.

**Checked:** axe clean in light and dark; tightest text contrast 4.56:1 (needs 4.5:1); 4 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html -->
<section class="tiers">
  <div class="tiers-head">
    <h2>Simple pricing</h2>
    <fieldset class="tiers-toggle">
      <legend class="sr-only">Billing period</legend>
      <label><input type="radio" name="bill" value="month" checked><span>Monthly</span></label>
      <label><input type="radio" name="bill" value="year"><span>Yearly <em>2 months free</em></span></label>
    </fieldset>
  </div>
  <div class="tiers-grid">
    <article class="tier"><h3>Free</h3><p class="tier-price"><b data-m="0" data-y="0">$0</b> <span>forever</span></p><p class="tier-for">Up to 5 people</p><a class="tier-btn" href="#">Start free</a></article>
    <article class="tier is-rec"><p class="tier-rec">Most groups pick this</p><h3>Group</h3><p class="tier-price"><b data-m="3" data-y="30">$3</b> <span class="per">per month</span></p><p class="tier-for">Up to 25 people · multi-currency</p><a class="tier-btn" href="#">Try Group free</a></article>
    <article class="tier"><h3>Team</h3><p class="tier-price"><b data-m="12" data-y="120">$12</b> <span class="per">per month</span></p><p class="tier-for">Unlimited people · admin controls</p><a class="tier-btn" href="#">Talk to us</a></article>
  </div>
</section>
```

`styles.css`

```css
/* tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.tiers { width: 100%; }
.tiers-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px; }
.tiers-head h2 { margin: 0; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.tiers-toggle { display: inline-flex; margin: 0; padding: 4px; background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.tiers-toggle label { position: relative; }
.tiers-toggle input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.tiers-toggle span { display: block; padding: 8px 16px; font-size: 14px; font-weight: 600; color: var(--ui-muted); border-radius: 999px; }
.tiers-toggle em { font-style: normal; font-size: 12px; color: var(--ui-success); }
.tiers-toggle input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.15); }
.tiers-toggle input:focus-visible + span { box-shadow: var(--ui-focus); }
.tiers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.tier { display: flex; flex-direction: column; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tier.is-rec { border: 2px solid var(--ui-accent); }
.tier-rec { margin: -8px 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); }
.tier h3 { margin: 0; font-size: 18px; }
.tier-price { margin: 12px 0 4px; }
.tier-price b { font-size: 40px; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.tier-price span { font-size: 14px; color: var(--ui-muted); }
.tier-for { margin: 0 0 20px; flex: 1; font-size: 14px; color: var(--ui-muted); }
.tier-btn { display: block; padding: 11px; text-align: center; font-weight: 700; text-decoration: none; color: var(--ui-text); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.is-rec .tier-btn { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.tier-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

`script.js`

```js
/* tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html */
function setup(root) {
  const radios = root.querySelectorAll('input[name="bill"]');
  const prices = root.querySelectorAll('[data-m]');
  const pers = root.querySelectorAll('.per');
  const update = () => {
    const yearly = root.querySelector('input[name="bill"]:checked').value === 'year';
    prices.forEach((p) => (p.textContent = '$' + (yearly ? p.dataset.y : p.dataset.m)));
    pers.forEach((p) => (p.textContent = yearly ? 'per year' : 'per month'));
  };
  radios.forEach((r) => r.addEventListener('change', update));
  return () => radios.forEach((r) => r.removeEventListener('change', update));
}

document.querySelectorAll(".tiers").forEach(setup);
```

## React

`PricingTiers.jsx`

```jsx
/* tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html */
import { useEffect, useRef } from 'react';
import './PricingTiers.css';

function setup(root) {
  const radios = root.querySelectorAll('input[name="bill"]');
  const prices = root.querySelectorAll('[data-m]');
  const pers = root.querySelectorAll('.per');
  const update = () => {
    const yearly = root.querySelector('input[name="bill"]:checked').value === 'year';
    prices.forEach((p) => (p.textContent = '$' + (yearly ? p.dataset.y : p.dataset.m)));
    pers.forEach((p) => (p.textContent = yearly ? 'per year' : 'per month'));
  };
  radios.forEach((r) => r.addEventListener('change', update));
  return () => radios.forEach((r) => r.removeEventListener('change', update));
}

export function PricingTiers() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <section ref={ref} className="tiers">
      <div className="tiers-head">
        <h2>Simple pricing</h2>
        <fieldset className="tiers-toggle">
          <legend className="sr-only">Billing period</legend>
          <label><input type="radio" name="bill" defaultValue="month" defaultChecked /><span>Monthly</span></label>
          <label><input type="radio" name="bill" defaultValue="year" /><span>Yearly <em>2 months free</em></span></label>
        </fieldset>
      </div>
      <div className="tiers-grid">
        <article className="tier"><h3>Free</h3><p className="tier-price"><b data-m="0" data-y="0">$0</b> <span>forever</span></p><p className="tier-for">Up to 5 people</p><a className="tier-btn" href="#">Start free</a></article>
        <article className="tier is-rec"><p className="tier-rec">Most groups pick this</p><h3>Group</h3><p className="tier-price"><b data-m="3" data-y="30">$3</b> <span className="per">per month</span></p><p className="tier-for">Up to 25 people · multi-currency</p><a className="tier-btn" href="#">Try Group free</a></article>
        <article className="tier"><h3>Team</h3><p className="tier-price"><b data-m="12" data-y="120">$12</b> <span className="per">per month</span></p><p className="tier-for">Unlimited people · admin controls</p><a className="tier-btn" href="#">Talk to us</a></article>
      </div>
    </section>
  );
}
```

`PricingTiers.css`

```css
/* tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.tiers { width: 100%; }
.tiers-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px; }
.tiers-head h2 { margin: 0; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.tiers-toggle { display: inline-flex; margin: 0; padding: 4px; background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.tiers-toggle label { position: relative; }
.tiers-toggle input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.tiers-toggle span { display: block; padding: 8px 16px; font-size: 14px; font-weight: 600; color: var(--ui-muted); border-radius: 999px; }
.tiers-toggle em { font-style: normal; font-size: 12px; color: var(--ui-success); }
.tiers-toggle input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.15); }
.tiers-toggle input:focus-visible + span { box-shadow: var(--ui-focus); }
.tiers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.tier { display: flex; flex-direction: column; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tier.is-rec { border: 2px solid var(--ui-accent); }
.tier-rec { margin: -8px 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); }
.tier h3 { margin: 0; font-size: 18px; }
.tier-price { margin: 12px 0 4px; }
.tier-price b { font-size: 40px; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.tier-price span { font-size: 14px; color: var(--ui-muted); }
.tier-for { margin: 0 0 20px; flex: 1; font-size: 14px; color: var(--ui-muted); }
.tier-btn { display: block; padding: 11px; text-align: center; font-weight: 700; text-decoration: none; color: var(--ui-text); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.is-rec .tier-btn { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.tier-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`PricingTiers.vue`

```vue
<!-- tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const radios = root.querySelectorAll('input[name="bill"]');
  const prices = root.querySelectorAll('[data-m]');
  const pers = root.querySelectorAll('.per');
  const update = () => {
    const yearly = root.querySelector('input[name="bill"]:checked').value === 'year';
    prices.forEach((p) => (p.textContent = '$' + (yearly ? p.dataset.y : p.dataset.m)));
    pers.forEach((p) => (p.textContent = yearly ? 'per year' : 'per month'));
  };
  radios.forEach((r) => r.addEventListener('change', update));
  return () => radios.forEach((r) => r.removeEventListener('change', update));
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <section ref="el" class="tiers">
    <div class="tiers-head">
      <h2>Simple pricing</h2>
      <fieldset class="tiers-toggle">
        <legend class="sr-only">Billing period</legend>
        <label><input type="radio" name="bill" value="month" checked><span>Monthly</span></label>
        <label><input type="radio" name="bill" value="year"><span>Yearly <em>2 months free</em></span></label>
      </fieldset>
    </div>
    <div class="tiers-grid">
      <article class="tier"><h3>Free</h3><p class="tier-price"><b data-m="0" data-y="0">$0</b> <span>forever</span></p><p class="tier-for">Up to 5 people</p><a class="tier-btn" href="#">Start free</a></article>
      <article class="tier is-rec"><p class="tier-rec">Most groups pick this</p><h3>Group</h3><p class="tier-price"><b data-m="3" data-y="30">$3</b> <span class="per">per month</span></p><p class="tier-for">Up to 25 people · multi-currency</p><a class="tier-btn" href="#">Try Group free</a></article>
      <article class="tier"><h3>Team</h3><p class="tier-price"><b data-m="12" data-y="120">$12</b> <span class="per">per month</span></p><p class="tier-for">Unlimited people · admin controls</p><a class="tier-btn" href="#">Talk to us</a></article>
    </div>
  </section>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.tiers { width: 100%; }
.tiers-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px; }
.tiers-head h2 { margin: 0; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.tiers-toggle { display: inline-flex; margin: 0; padding: 4px; background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.tiers-toggle label { position: relative; }
.tiers-toggle input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.tiers-toggle span { display: block; padding: 8px 16px; font-size: 14px; font-weight: 600; color: var(--ui-muted); border-radius: 999px; }
.tiers-toggle em { font-style: normal; font-size: 12px; color: var(--ui-success); }
.tiers-toggle input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.15); }
.tiers-toggle input:focus-visible + span { box-shadow: var(--ui-focus); }
.tiers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.tier { display: flex; flex-direction: column; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tier.is-rec { border: 2px solid var(--ui-accent); }
.tier-rec { margin: -8px 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); }
.tier h3 { margin: 0; font-size: 18px; }
.tier-price { margin: 12px 0 4px; }
.tier-price b { font-size: 40px; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.tier-price span { font-size: 14px; color: var(--ui-muted); }
.tier-for { margin: 0 0 20px; flex: 1; font-size: 14px; color: var(--ui-muted); }
.tier-btn { display: block; padding: 11px; text-align: center; font-weight: 700; text-decoration: none; color: var(--ui-text); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.is-rec .tier-btn { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.tier-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`PricingTiers.svelte`

```svelte
<!-- tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html -->
<script>
  import { onMount } from 'svelte';
  import './PricingTiers.css';

  let node;

  function setup(root) {
    const radios = root.querySelectorAll('input[name="bill"]');
    const prices = root.querySelectorAll('[data-m]');
    const pers = root.querySelectorAll('.per');
    const update = () => {
      const yearly = root.querySelector('input[name="bill"]:checked').value === 'year';
      prices.forEach((p) => (p.textContent = '$' + (yearly ? p.dataset.y : p.dataset.m)));
      pers.forEach((p) => (p.textContent = yearly ? 'per year' : 'per month'));
    };
    radios.forEach((r) => r.addEventListener('change', update));
    return () => radios.forEach((r) => r.removeEventListener('change', update));
  }

  onMount(() => setup(node));
</script>

<section bind:this={node} class="tiers">
  <div class="tiers-head">
    <h2>Simple pricing</h2>
    <fieldset class="tiers-toggle">
      <legend class="sr-only">Billing period</legend>
      <label><input type="radio" name="bill" value="month" checked><span>Monthly</span></label>
      <label><input type="radio" name="bill" value="year"><span>Yearly <em>2 months free</em></span></label>
    </fieldset>
  </div>
  <div class="tiers-grid">
    <article class="tier"><h3>Free</h3><p class="tier-price"><b data-m="0" data-y="0">$0</b> <span>forever</span></p><p class="tier-for">Up to 5 people</p><a class="tier-btn" href="#">Start free</a></article>
    <article class="tier is-rec"><p class="tier-rec">Most groups pick this</p><h3>Group</h3><p class="tier-price"><b data-m="3" data-y="30">$3</b> <span class="per">per month</span></p><p class="tier-for">Up to 25 people · multi-currency</p><a class="tier-btn" href="#">Try Group free</a></article>
    <article class="tier"><h3>Team</h3><p class="tier-price"><b data-m="12" data-y="120">$12</b> <span class="per">per month</span></p><p class="tier-for">Unlimited people · admin controls</p><a class="tier-btn" href="#">Talk to us</a></article>
  </div>
</section>
```

`PricingTiers.css`

```css
/* tearsheet pricing-tiers v50b048c3 · https://qusaialjbali.github.io/tearsheet/zine/parts/pricing-tiers.html */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.tiers { width: 100%; }
.tiers-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px; }
.tiers-head h2 { margin: 0; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.tiers-toggle { display: inline-flex; margin: 0; padding: 4px; background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.tiers-toggle label { position: relative; }
.tiers-toggle input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.tiers-toggle span { display: block; padding: 8px 16px; font-size: 14px; font-weight: 600; color: var(--ui-muted); border-radius: 999px; }
.tiers-toggle em { font-style: normal; font-size: 12px; color: var(--ui-success); }
.tiers-toggle input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.15); }
.tiers-toggle input:focus-visible + span { box-shadow: var(--ui-focus); }
.tiers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.tier { display: flex; flex-direction: column; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tier.is-rec { border: 2px solid var(--ui-accent); }
.tier-rec { margin: -8px 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); }
.tier h3 { margin: 0; font-size: 18px; }
.tier-price { margin: 12px 0 4px; }
.tier-price b { font-size: 40px; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.tier-price span { font-size: 14px; color: var(--ui-muted); }
.tier-for { margin: 0 0 20px; flex: 1; font-size: 14px; color: var(--ui-muted); }
.tier-btn { display: block; padding: 11px; text-align: center; font-weight: 700; text-decoration: none; color: var(--ui-text); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.is-rec .tier-btn { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.tier-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```
