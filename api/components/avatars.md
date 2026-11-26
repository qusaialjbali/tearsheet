# Avatar group (Tearsheet, Content)

Overlapping initials avatars with an overflow count.

**Why it works:** Give the group an accessible name and each avatar a title, so the people are known even when only initials show.

**Checked:** axe clean in light and dark; tightest text contrast 5.17:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet avatars vca4cafa7 · https://qusaialjbali.github.io/tearsheet/zine/parts/avatars.html -->
<div class="avatars" role="group" aria-label="Project members">
  <span class="avatar" title="Ada Lovelace">AL</span>
  <span class="avatar" title="Grace Hopper">GH</span>
  <span class="avatar" title="Alan Turing">AT</span>
  <span class="avatar" title="Katherine Johnson">KJ</span>
  <span class="avatar avatar-more" title="3 more members">+3</span>
</div>
```

`styles.css`

```css
/* tearsheet avatars vca4cafa7 · https://qusaialjbali.github.io/tearsheet/zine/parts/avatars.html */
.avatars { display: flex; }
.avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-left: -10px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  border-radius: 50%;
  border: 3px solid var(--ui-bg);
  background: #4f46e5;
}
.avatar:first-child { margin-left: 0; }
.avatar:nth-child(2) { background: #0f766e; }
.avatar:nth-child(3) { background: #c2410c; }
.avatar:nth-child(4) { background: #be185d; }
.avatar-more.avatar { color: var(--ui-text); background: var(--ui-surface-2); }
```

## React

`Avatars.jsx`

```jsx
/* tearsheet avatars vca4cafa7 · https://qusaialjbali.github.io/tearsheet/zine/parts/avatars.html */
import './Avatars.css';

export function Avatars() {
  return (
    <div className="avatars" role="group" aria-label="Project members">
      <span className="avatar" title="Ada Lovelace">AL</span>
      <span className="avatar" title="Grace Hopper">GH</span>
      <span className="avatar" title="Alan Turing">AT</span>
      <span className="avatar" title="Katherine Johnson">KJ</span>
      <span className="avatar avatar-more" title="3 more members">+3</span>
    </div>
  );
}
```

`Avatars.css`

```css
/* tearsheet avatars vca4cafa7 · https://qusaialjbali.github.io/tearsheet/zine/parts/avatars.html */
.avatars { display: flex; }
.avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-left: -10px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  border-radius: 50%;
  border: 3px solid var(--ui-bg);
  background: #4f46e5;
}
.avatar:first-child { margin-left: 0; }
.avatar:nth-child(2) { background: #0f766e; }
.avatar:nth-child(3) { background: #c2410c; }
.avatar:nth-child(4) { background: #be185d; }
.avatar-more.avatar { color: var(--ui-text); background: var(--ui-surface-2); }
```

## Vue

`Avatars.vue`

```vue
<!-- tearsheet avatars vca4cafa7 · https://qusaialjbali.github.io/tearsheet/zine/parts/avatars.html -->
<template>
  <div class="avatars" role="group" aria-label="Project members">
    <span class="avatar" title="Ada Lovelace">AL</span>
    <span class="avatar" title="Grace Hopper">GH</span>
    <span class="avatar" title="Alan Turing">AT</span>
    <span class="avatar" title="Katherine Johnson">KJ</span>
    <span class="avatar avatar-more" title="3 more members">+3</span>
  </div>
</template>

<style scoped>
.avatars { display: flex; }
.avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-left: -10px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  border-radius: 50%;
  border: 3px solid var(--ui-bg);
  background: #4f46e5;
}
.avatar:first-child { margin-left: 0; }
.avatar:nth-child(2) { background: #0f766e; }
.avatar:nth-child(3) { background: #c2410c; }
.avatar:nth-child(4) { background: #be185d; }
.avatar-more.avatar { color: var(--ui-text); background: var(--ui-surface-2); }
</style>
```

## Svelte

`Avatars.svelte`

```svelte
<!-- tearsheet avatars vca4cafa7 · https://qusaialjbali.github.io/tearsheet/zine/parts/avatars.html -->
<div class="avatars" role="group" aria-label="Project members">
  <span class="avatar" title="Ada Lovelace">AL</span>
  <span class="avatar" title="Grace Hopper">GH</span>
  <span class="avatar" title="Alan Turing">AT</span>
  <span class="avatar" title="Katherine Johnson">KJ</span>
  <span class="avatar avatar-more" title="3 more members">+3</span>
</div>

<style>
.avatars { display: flex; }
.avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-left: -10px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  border-radius: 50%;
  border: 3px solid var(--ui-bg);
  background: #4f46e5;
}
.avatar:first-child { margin-left: 0; }
.avatar:nth-child(2) { background: #0f766e; }
.avatar:nth-child(3) { background: #c2410c; }
.avatar:nth-child(4) { background: #be185d; }
.avatar-more.avatar { color: var(--ui-text); background: var(--ui-surface-2); }
</style>
```
