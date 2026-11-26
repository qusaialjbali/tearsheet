# Alerts (Tearsheet, Feedback)

Info, success, warning and error banners. Each pairs color with an icon and text, so meaning never relies on color alone.

**Why it works:** Use role="status" for polite updates and role="alert" only for urgent errors; alert interrupts screen readers.

**Checked:** axe clean in light and dark; tightest text contrast 5.81:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet alerts v6df2fcfc · https://qusaialjbali.github.io/tearsheet/zine/parts/alerts.html -->
<div class="alerts">
  <div class="alert alert-info" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9v5M10 6v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">New version available</p>
      <p class="alert-text">Refresh the page to get the latest features.</p>
    </div>
  </div>
  <div class="alert alert-success" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m6.5 10.2 2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div>
      <p class="alert-title">Payment received</p>
      <p class="alert-text">A receipt is on its way to your inbox.</p>
    </div>
  </div>
  <div class="alert alert-warning" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 18 17H2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">Storage almost full</p>
      <p class="alert-text">You’ve used 92% of your plan. Free up space or upgrade.</p>
    </div>
  </div>
  <div class="alert alert-error" role="alert">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m7.2 7.2 5.6 5.6M12.8 7.2l-5.6 5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">Couldn’t save your changes</p>
      <p class="alert-text">Check your connection and try again.</p>
    </div>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet alerts v6df2fcfc · https://qusaialjbali.github.io/tearsheet/zine/parts/alerts.html */
.alerts { display: grid; gap: 12px; width: 100%; max-width: 520px; }
.alert {
  --tone: var(--ui-accent);
  --tone-soft: var(--ui-accent-soft);
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: var(--ui-radius-sm);
  background: var(--tone-soft);
  border: 1px solid color-mix(in srgb, var(--tone) 30%, transparent);
  border-left: 4px solid var(--tone);
}
.alert-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.alert-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.alert-error { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.alert-icon { width: 20px; height: 20px; flex: none; margin-top: 1px; color: var(--tone); }
.alert-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.alert-text { margin: 2px 0 0; font-size: 14px; color: var(--ui-muted); }
```

## React

`Alerts.jsx`

```jsx
/* tearsheet alerts v6df2fcfc · https://qusaialjbali.github.io/tearsheet/zine/parts/alerts.html */
import './Alerts.css';

export function Alerts() {
  return (
    <div className="alerts">
      <div className="alert alert-info" role="status">
        <svg className="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M10 9v5M10 6v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        <div>
          <p className="alert-title">New version available</p>
          <p className="alert-text">Refresh the page to get the latest features.</p>
        </div>
      </div>
      <div className="alert alert-success" role="status">
        <svg className="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="m6.5 10.2 2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div>
          <p className="alert-title">Payment received</p>
          <p className="alert-text">A receipt is on its way to your inbox.</p>
        </div>
      </div>
      <div className="alert alert-warning" role="status">
        <svg className="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 18 17H2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        <div>
          <p className="alert-title">Storage almost full</p>
          <p className="alert-text">You’ve used 92% of your plan. Free up space or upgrade.</p>
        </div>
      </div>
      <div className="alert alert-error" role="alert">
        <svg className="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="m7.2 7.2 5.6 5.6M12.8 7.2l-5.6 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        <div>
          <p className="alert-title">Couldn’t save your changes</p>
          <p className="alert-text">Check your connection and try again.</p>
        </div>
      </div>
    </div>
  );
}
```

`Alerts.css`

```css
/* tearsheet alerts v6df2fcfc · https://qusaialjbali.github.io/tearsheet/zine/parts/alerts.html */
.alerts { display: grid; gap: 12px; width: 100%; max-width: 520px; }
.alert {
  --tone: var(--ui-accent);
  --tone-soft: var(--ui-accent-soft);
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: var(--ui-radius-sm);
  background: var(--tone-soft);
  border: 1px solid color-mix(in srgb, var(--tone) 30%, transparent);
  border-left: 4px solid var(--tone);
}
.alert-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.alert-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.alert-error { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.alert-icon { width: 20px; height: 20px; flex: none; margin-top: 1px; color: var(--tone); }
.alert-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.alert-text { margin: 2px 0 0; font-size: 14px; color: var(--ui-muted); }
```

## Vue

`Alerts.vue`

```vue
<!-- tearsheet alerts v6df2fcfc · https://qusaialjbali.github.io/tearsheet/zine/parts/alerts.html -->
<template>
  <div class="alerts">
    <div class="alert alert-info" role="status">
      <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9v5M10 6v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      <div>
        <p class="alert-title">New version available</p>
        <p class="alert-text">Refresh the page to get the latest features.</p>
      </div>
    </div>
    <div class="alert alert-success" role="status">
      <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m6.5 10.2 2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div>
        <p class="alert-title">Payment received</p>
        <p class="alert-text">A receipt is on its way to your inbox.</p>
      </div>
    </div>
    <div class="alert alert-warning" role="status">
      <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 18 17H2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      <div>
        <p class="alert-title">Storage almost full</p>
        <p class="alert-text">You’ve used 92% of your plan. Free up space or upgrade.</p>
      </div>
    </div>
    <div class="alert alert-error" role="alert">
      <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m7.2 7.2 5.6 5.6M12.8 7.2l-5.6 5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      <div>
        <p class="alert-title">Couldn’t save your changes</p>
        <p class="alert-text">Check your connection and try again.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alerts { display: grid; gap: 12px; width: 100%; max-width: 520px; }
.alert {
  --tone: var(--ui-accent);
  --tone-soft: var(--ui-accent-soft);
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: var(--ui-radius-sm);
  background: var(--tone-soft);
  border: 1px solid color-mix(in srgb, var(--tone) 30%, transparent);
  border-left: 4px solid var(--tone);
}
.alert-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.alert-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.alert-error { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.alert-icon { width: 20px; height: 20px; flex: none; margin-top: 1px; color: var(--tone); }
.alert-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.alert-text { margin: 2px 0 0; font-size: 14px; color: var(--ui-muted); }
</style>
```

## Svelte

`Alerts.svelte`

```svelte
<!-- tearsheet alerts v6df2fcfc · https://qusaialjbali.github.io/tearsheet/zine/parts/alerts.html -->
<div class="alerts">
  <div class="alert alert-info" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9v5M10 6v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">New version available</p>
      <p class="alert-text">Refresh the page to get the latest features.</p>
    </div>
  </div>
  <div class="alert alert-success" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m6.5 10.2 2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div>
      <p class="alert-title">Payment received</p>
      <p class="alert-text">A receipt is on its way to your inbox.</p>
    </div>
  </div>
  <div class="alert alert-warning" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 18 17H2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">Storage almost full</p>
      <p class="alert-text">You’ve used 92% of your plan. Free up space or upgrade.</p>
    </div>
  </div>
  <div class="alert alert-error" role="alert">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m7.2 7.2 5.6 5.6M12.8 7.2l-5.6 5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">Couldn’t save your changes</p>
      <p class="alert-text">Check your connection and try again.</p>
    </div>
  </div>
</div>

<style>
.alerts { display: grid; gap: 12px; width: 100%; max-width: 520px; }
.alert {
  --tone: var(--ui-accent);
  --tone-soft: var(--ui-accent-soft);
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: var(--ui-radius-sm);
  background: var(--tone-soft);
  border: 1px solid color-mix(in srgb, var(--tone) 30%, transparent);
  border-left: 4px solid var(--tone);
}
.alert-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.alert-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.alert-error { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.alert-icon { width: 20px; height: 20px; flex: none; margin-top: 1px; color: var(--tone); }
.alert-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.alert-text { margin: 2px 0 0; font-size: 14px; color: var(--ui-muted); }
</style>
```
