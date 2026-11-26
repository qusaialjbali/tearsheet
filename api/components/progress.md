# Progress & spinner (Tearsheet, Feedback)

Determinate progress bar and an indeterminate spinner, both announced to assistive tech.

**Why it works:** Use a progress bar when you know how long something takes, a spinner for short unknown waits (under ~3 s), and skeletons for loading page content.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet progress ve01cdc66 · https://qusaialjbali.github.io/tearsheet/zine/parts/progress.html -->
<div class="progress-demo">
  <div class="progress-block">
    <div class="progress-head">
      <span id="upload-label">Uploading report.pdf</span>
      <span class="progress-value">64%</span>
    </div>
    <div class="progress" role="progressbar" aria-labelledby="upload-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: 64%"></div>
    </div>
  </div>
  <div class="loading" role="status">
    <span class="spinner" aria-hidden="true"></span>
    <span>Loading results…</span>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet progress ve01cdc66 · https://qusaialjbali.github.io/tearsheet/zine/parts/progress.html */
.progress-demo { display: grid; gap: 28px; width: 100%; max-width: 400px; }
.progress-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-text);
}
.progress-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.progress {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--ui-surface-2);
}
.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: var(--ui-accent);
  transition: width 0.3s ease;
}
.loading { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ui-muted); }
.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2.5px solid var(--ui-surface-2);
  border-top-color: var(--ui-accent);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner { animation-duration: 2s; }
}
```

## React

`Progress.jsx`

```jsx
/* tearsheet progress ve01cdc66 · https://qusaialjbali.github.io/tearsheet/zine/parts/progress.html */
import './Progress.css';

export function Progress() {
  return (
    <div className="progress-demo">
      <div className="progress-block">
        <div className="progress-head">
          <span id="upload-label">Uploading report.pdf</span>
          <span className="progress-value">64%</span>
        </div>
        <div className="progress" role="progressbar" aria-labelledby="upload-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar" style={{ width: '64%' }}></div>
        </div>
      </div>
      <div className="loading" role="status">
        <span className="spinner" aria-hidden="true"></span>
        <span>Loading results…</span>
      </div>
    </div>
  );
}
```

`Progress.css`

```css
/* tearsheet progress ve01cdc66 · https://qusaialjbali.github.io/tearsheet/zine/parts/progress.html */
.progress-demo { display: grid; gap: 28px; width: 100%; max-width: 400px; }
.progress-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-text);
}
.progress-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.progress {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--ui-surface-2);
}
.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: var(--ui-accent);
  transition: width 0.3s ease;
}
.loading { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ui-muted); }
.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2.5px solid var(--ui-surface-2);
  border-top-color: var(--ui-accent);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner { animation-duration: 2s; }
}
```

## Vue

`Progress.vue`

```vue
<!-- tearsheet progress ve01cdc66 · https://qusaialjbali.github.io/tearsheet/zine/parts/progress.html -->
<template>
  <div class="progress-demo">
    <div class="progress-block">
      <div class="progress-head">
        <span id="upload-label">Uploading report.pdf</span>
        <span class="progress-value">64%</span>
      </div>
      <div class="progress" role="progressbar" aria-labelledby="upload-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: 64%"></div>
      </div>
    </div>
    <div class="loading" role="status">
      <span class="spinner" aria-hidden="true"></span>
      <span>Loading results…</span>
    </div>
  </div>
</template>

<style scoped>
.progress-demo { display: grid; gap: 28px; width: 100%; max-width: 400px; }
.progress-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-text);
}
.progress-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.progress {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--ui-surface-2);
}
.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: var(--ui-accent);
  transition: width 0.3s ease;
}
.loading { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ui-muted); }
.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2.5px solid var(--ui-surface-2);
  border-top-color: var(--ui-accent);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner { animation-duration: 2s; }
}
</style>
```

## Svelte

`Progress.svelte`

```svelte
<!-- tearsheet progress ve01cdc66 · https://qusaialjbali.github.io/tearsheet/zine/parts/progress.html -->
<div class="progress-demo">
  <div class="progress-block">
    <div class="progress-head">
      <span id="upload-label">Uploading report.pdf</span>
      <span class="progress-value">64%</span>
    </div>
    <div class="progress" role="progressbar" aria-labelledby="upload-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: 64%"></div>
    </div>
  </div>
  <div class="loading" role="status">
    <span class="spinner" aria-hidden="true"></span>
    <span>Loading results…</span>
  </div>
</div>

<style>
.progress-demo { display: grid; gap: 28px; width: 100%; max-width: 400px; }
.progress-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-text);
}
.progress-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.progress {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--ui-surface-2);
}
.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: var(--ui-accent);
  transition: width 0.3s ease;
}
.loading { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ui-muted); }
.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2.5px solid var(--ui-surface-2);
  border-top-color: var(--ui-accent);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner { animation-duration: 2s; }
}
</style>
```
