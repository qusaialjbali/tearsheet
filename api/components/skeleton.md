# Skeleton loader (Tearsheet, Feedback)

Shimmering placeholder that mirrors the shape of the content it stands in for.

**Why it works:** Match the real layout so nothing jumps when content arrives. The shimmer stops for people who prefer reduced motion.

**Checked:** axe clean in light and dark; 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet skeleton v5d6312b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/skeleton.html -->
<div class="skeleton-card" role="status" aria-busy="true" aria-label="Loading post">
  <div class="skeleton skeleton-avatar"></div>
  <div class="skeleton-lines">
    <div class="skeleton skeleton-line skeleton-short"></div>
    <div class="skeleton skeleton-line"></div>
    <div class="skeleton skeleton-line skeleton-medium"></div>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet skeleton v5d6312b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/skeleton.html */
.skeleton-card {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.skeleton {
  background: linear-gradient(90deg, var(--ui-surface-2) 25%, var(--ui-border) 37%, var(--ui-surface-2) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 6px;
}
.skeleton-avatar { width: 44px; height: 44px; flex: none; border-radius: 50%; }
.skeleton-lines { display: grid; gap: 10px; flex: 1; align-content: center; }
.skeleton-line { height: 12px; }
.skeleton-short { width: 40%; }
.skeleton-medium { width: 70%; }

@keyframes shimmer {
  from { background-position: 100% 50%; }
  to { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
```

## React

`Skeleton.jsx`

```jsx
/* tearsheet skeleton v5d6312b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/skeleton.html */
import './Skeleton.css';

export function Skeleton() {
  return (
    <div className="skeleton-card" role="status" aria-busy="true" aria-label="Loading post">
      <div className="skeleton skeleton-avatar"></div>
      <div className="skeleton-lines">
        <div className="skeleton skeleton-line skeleton-short"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line skeleton-medium"></div>
      </div>
    </div>
  );
}
```

`Skeleton.css`

```css
/* tearsheet skeleton v5d6312b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/skeleton.html */
.skeleton-card {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.skeleton {
  background: linear-gradient(90deg, var(--ui-surface-2) 25%, var(--ui-border) 37%, var(--ui-surface-2) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 6px;
}
.skeleton-avatar { width: 44px; height: 44px; flex: none; border-radius: 50%; }
.skeleton-lines { display: grid; gap: 10px; flex: 1; align-content: center; }
.skeleton-line { height: 12px; }
.skeleton-short { width: 40%; }
.skeleton-medium { width: 70%; }

@keyframes shimmer {
  from { background-position: 100% 50%; }
  to { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
```

## Vue

`Skeleton.vue`

```vue
<!-- tearsheet skeleton v5d6312b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/skeleton.html -->
<template>
  <div class="skeleton-card" role="status" aria-busy="true" aria-label="Loading post">
    <div class="skeleton skeleton-avatar"></div>
    <div class="skeleton-lines">
      <div class="skeleton skeleton-line skeleton-short"></div>
      <div class="skeleton skeleton-line"></div>
      <div class="skeleton skeleton-line skeleton-medium"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.skeleton {
  background: linear-gradient(90deg, var(--ui-surface-2) 25%, var(--ui-border) 37%, var(--ui-surface-2) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 6px;
}
.skeleton-avatar { width: 44px; height: 44px; flex: none; border-radius: 50%; }
.skeleton-lines { display: grid; gap: 10px; flex: 1; align-content: center; }
.skeleton-line { height: 12px; }
.skeleton-short { width: 40%; }
.skeleton-medium { width: 70%; }

@keyframes shimmer {
  from { background-position: 100% 50%; }
  to { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
</style>
```

## Svelte

`Skeleton.svelte`

```svelte
<!-- tearsheet skeleton v5d6312b3 · https://qusaialjbali.github.io/tearsheet/zine/parts/skeleton.html -->
<div class="skeleton-card" role="status" aria-busy="true" aria-label="Loading post">
  <div class="skeleton skeleton-avatar"></div>
  <div class="skeleton-lines">
    <div class="skeleton skeleton-line skeleton-short"></div>
    <div class="skeleton skeleton-line"></div>
    <div class="skeleton skeleton-line skeleton-medium"></div>
  </div>
</div>

<style>
.skeleton-card {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.skeleton {
  background: linear-gradient(90deg, var(--ui-surface-2) 25%, var(--ui-border) 37%, var(--ui-surface-2) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 6px;
}
.skeleton-avatar { width: 44px; height: 44px; flex: none; border-radius: 50%; }
.skeleton-lines { display: grid; gap: 10px; flex: 1; align-content: center; }
.skeleton-line { height: 12px; }
.skeleton-short { width: 40%; }
.skeleton-medium { width: 70%; }

@keyframes shimmer {
  from { background-position: 100% 50%; }
  to { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
</style>
```
