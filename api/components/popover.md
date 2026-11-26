# Popover (Tearsheet, Overlays)

A small anchored card for extra detail, using the native popover attribute: no JavaScript.

**Why it works:** The browser handles opening, light-dismiss (click outside) and Esc. Unlike a tooltip it can hold links and buttons, so it is fine on touch screens.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet popover v73e97584 · https://qusaialjbali.github.io/tearsheet/zine/parts/popover.html -->
<div class="pop-demo">
  <button class="pop-trigger" type="button" popovertarget="pop-share">Who can see this?</button>
  <div class="pop" id="pop-share" popover>
    <p class="pop-title">Visible to your team</p>
    <p class="pop-text">Everyone in “Design” can view and comment. Only editors can make changes.</p>
    <button class="pop-close" type="button" popovertarget="pop-share" popovertargetaction="hide">Got it</button>
  </div>
</div>
```

`styles.css`

```css
/* tearsheet popover v73e97584 · https://qusaialjbali.github.io/tearsheet/zine/parts/popover.html */
.pop-demo { position: relative; }
.pop-trigger {
  font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-accent);
  background: none; border: 0; padding: 6px 4px; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px; cursor: pointer;
}
.pop-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.pop {
  width: 280px; margin: auto; padding: 16px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.pop:popover-open { animation: pop-in 0.18s ease-out; }
@media (prefers-reduced-motion: reduce) { .pop:popover-open { animation: none; } }
@keyframes pop-in { from { opacity: 0; transform: translateY(6px); } }
.pop-title { margin: 0 0 4px; font-weight: 700; }
.pop-text { margin: 0 0 12px; font-size: 14px; color: var(--ui-muted); }
.pop-close {
  padding: 7px 12px; font: inherit; font-size: 13px; font-weight: 600;
  color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 6px; cursor: pointer;
}
.pop-close:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## React

`Popover.jsx`

```jsx
/* tearsheet popover v73e97584 · https://qusaialjbali.github.io/tearsheet/zine/parts/popover.html */
import './Popover.css';

export function Popover() {
  return (
    <div className="pop-demo">
      <button className="pop-trigger" type="button" popoverTarget="pop-share">Who can see this?</button>
      <div className="pop" id="pop-share" popover>
        <p className="pop-title">Visible to your team</p>
        <p className="pop-text">Everyone in “Design” can view and comment. Only editors can make changes.</p>
        <button className="pop-close" type="button" popoverTarget="pop-share" popoverTargetAction="hide">Got it</button>
      </div>
    </div>
  );
}
```

`Popover.css`

```css
/* tearsheet popover v73e97584 · https://qusaialjbali.github.io/tearsheet/zine/parts/popover.html */
.pop-demo { position: relative; }
.pop-trigger {
  font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-accent);
  background: none; border: 0; padding: 6px 4px; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px; cursor: pointer;
}
.pop-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.pop {
  width: 280px; margin: auto; padding: 16px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.pop:popover-open { animation: pop-in 0.18s ease-out; }
@media (prefers-reduced-motion: reduce) { .pop:popover-open { animation: none; } }
@keyframes pop-in { from { opacity: 0; transform: translateY(6px); } }
.pop-title { margin: 0 0 4px; font-weight: 700; }
.pop-text { margin: 0 0 12px; font-size: 14px; color: var(--ui-muted); }
.pop-close {
  padding: 7px 12px; font: inherit; font-size: 13px; font-weight: 600;
  color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 6px; cursor: pointer;
}
.pop-close:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`Popover.vue`

```vue
<!-- tearsheet popover v73e97584 · https://qusaialjbali.github.io/tearsheet/zine/parts/popover.html -->
<template>
  <div class="pop-demo">
    <button class="pop-trigger" type="button" popovertarget="pop-share">Who can see this?</button>
    <div class="pop" id="pop-share" popover>
      <p class="pop-title">Visible to your team</p>
      <p class="pop-text">Everyone in “Design” can view and comment. Only editors can make changes.</p>
      <button class="pop-close" type="button" popovertarget="pop-share" popovertargetaction="hide">Got it</button>
    </div>
  </div>
</template>

<style scoped>
.pop-demo { position: relative; }
.pop-trigger {
  font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-accent);
  background: none; border: 0; padding: 6px 4px; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px; cursor: pointer;
}
.pop-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.pop {
  width: 280px; margin: auto; padding: 16px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.pop:popover-open { animation: pop-in 0.18s ease-out; }
@media (prefers-reduced-motion: reduce) { .pop:popover-open { animation: none; } }
@keyframes pop-in { from { opacity: 0; transform: translateY(6px); } }
.pop-title { margin: 0 0 4px; font-weight: 700; }
.pop-text { margin: 0 0 12px; font-size: 14px; color: var(--ui-muted); }
.pop-close {
  padding: 7px 12px; font: inherit; font-size: 13px; font-weight: 600;
  color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 6px; cursor: pointer;
}
.pop-close:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`Popover.svelte`

```svelte
<!-- tearsheet popover v73e97584 · https://qusaialjbali.github.io/tearsheet/zine/parts/popover.html -->
<div class="pop-demo">
  <button class="pop-trigger" type="button" popovertarget="pop-share">Who can see this?</button>
  <div class="pop" id="pop-share" popover>
    <p class="pop-title">Visible to your team</p>
    <p class="pop-text">Everyone in “Design” can view and comment. Only editors can make changes.</p>
    <button class="pop-close" type="button" popovertarget="pop-share" popovertargetaction="hide">Got it</button>
  </div>
</div>

<style>
.pop-demo { position: relative; }
.pop-trigger {
  font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-accent);
  background: none; border: 0; padding: 6px 4px; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 4px; cursor: pointer;
}
.pop-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.pop {
  width: 280px; margin: auto; padding: 16px;
  color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); box-shadow: var(--ui-shadow-lg);
}
.pop:popover-open { animation: pop-in 0.18s ease-out; }
@media (prefers-reduced-motion: reduce) { .pop:popover-open { animation: none; } }
@keyframes pop-in { from { opacity: 0; transform: translateY(6px); } }
.pop-title { margin: 0 0 4px; font-weight: 700; }
.pop-text { margin: 0 0 12px; font-size: 14px; color: var(--ui-muted); }
.pop-close {
  padding: 7px 12px; font: inherit; font-size: 13px; font-weight: 600;
  color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 6px; cursor: pointer;
}
.pop-close:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```
