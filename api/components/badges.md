# Badges (Tearsheet, Content)

Compact status labels in neutral, accent and semantic tones.

**Why it works:** Badges label things; they are not buttons. Keep text to one or two words.

**Checked:** axe clean in light and dark; tightest text contrast 4.79:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet badges vdb6d9bde · https://qusaialjbali.github.io/tearsheet/zine/parts/badges.html -->
<div class="badges">
  <span class="badge">Draft</span>
  <span class="badge badge-accent">New</span>
  <span class="badge badge-success"><span class="badge-dot" aria-hidden="true"></span>Active</span>
  <span class="badge badge-warning">Pending</span>
  <span class="badge badge-danger">Failed</span>
</div>
```

`styles.css`

```css
/* tearsheet badges vdb6d9bde · https://qusaialjbali.github.io/tearsheet/zine/parts/badges.html */
.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.badge {
  --tone: var(--ui-muted);
  --tone-soft: var(--ui-surface-2);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--tone);
  background: var(--tone-soft);
  border-radius: 999px;
}
.badge-accent { --tone: var(--ui-accent); --tone-soft: var(--ui-accent-soft); }
.badge-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.badge-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.badge-danger { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
```

## React

`Badges.jsx`

```jsx
/* tearsheet badges vdb6d9bde · https://qusaialjbali.github.io/tearsheet/zine/parts/badges.html */
import './Badges.css';

export function Badges() {
  return (
    <div className="badges">
      <span className="badge">Draft</span>
      <span className="badge badge-accent">New</span>
      <span className="badge badge-success"><span className="badge-dot" aria-hidden="true"></span>Active</span>
      <span className="badge badge-warning">Pending</span>
      <span className="badge badge-danger">Failed</span>
    </div>
  );
}
```

`Badges.css`

```css
/* tearsheet badges vdb6d9bde · https://qusaialjbali.github.io/tearsheet/zine/parts/badges.html */
.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.badge {
  --tone: var(--ui-muted);
  --tone-soft: var(--ui-surface-2);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--tone);
  background: var(--tone-soft);
  border-radius: 999px;
}
.badge-accent { --tone: var(--ui-accent); --tone-soft: var(--ui-accent-soft); }
.badge-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.badge-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.badge-danger { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
```

## Vue

`Badges.vue`

```vue
<!-- tearsheet badges vdb6d9bde · https://qusaialjbali.github.io/tearsheet/zine/parts/badges.html -->
<template>
  <div class="badges">
    <span class="badge">Draft</span>
    <span class="badge badge-accent">New</span>
    <span class="badge badge-success"><span class="badge-dot" aria-hidden="true"></span>Active</span>
    <span class="badge badge-warning">Pending</span>
    <span class="badge badge-danger">Failed</span>
  </div>
</template>

<style scoped>
.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.badge {
  --tone: var(--ui-muted);
  --tone-soft: var(--ui-surface-2);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--tone);
  background: var(--tone-soft);
  border-radius: 999px;
}
.badge-accent { --tone: var(--ui-accent); --tone-soft: var(--ui-accent-soft); }
.badge-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.badge-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.badge-danger { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
</style>
```

## Svelte

`Badges.svelte`

```svelte
<!-- tearsheet badges vdb6d9bde · https://qusaialjbali.github.io/tearsheet/zine/parts/badges.html -->
<div class="badges">
  <span class="badge">Draft</span>
  <span class="badge badge-accent">New</span>
  <span class="badge badge-success"><span class="badge-dot" aria-hidden="true"></span>Active</span>
  <span class="badge badge-warning">Pending</span>
  <span class="badge badge-danger">Failed</span>
</div>

<style>
.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.badge {
  --tone: var(--ui-muted);
  --tone-soft: var(--ui-surface-2);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--tone);
  background: var(--tone-soft);
  border-radius: 999px;
}
.badge-accent { --tone: var(--ui-accent); --tone-soft: var(--ui-accent-soft); }
.badge-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.badge-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.badge-danger { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
</style>
```
