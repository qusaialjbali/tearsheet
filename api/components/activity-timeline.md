# Activity timeline (Tearsheet, Content)

A vertical feed of events with machine-readable times.

**Why it works:** Wrap times in <time datetime="…"> so they can be parsed and localised. Newest first, unless the story is a process.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet activity-timeline v8be89136 · https://qusaialjbali.github.io/tearsheet/zine/parts/activity-timeline.html -->
<ol class="timeline">
  <li class="tl-item tl-accent">
    <p class="tl-title"><strong>Maya</strong> published version 2.4</p>
    <time class="tl-time" datetime="2026-11-23T09:12">Today, 9:12</time>
  </li>
  <li class="tl-item">
    <p class="tl-title"><strong>Leo</strong> merged “Fix focus ring in dark mode”</p>
    <time class="tl-time" datetime="2026-11-22T17:40">Yesterday, 17:40</time>
  </li>
  <li class="tl-item">
    <p class="tl-title"><strong>Sam</strong> opened an issue about the tooltip on touch screens</p>
    <time class="tl-time" datetime="2026-11-21T11:05">21 Nov, 11:05</time>
  </li>
  <li class="tl-item">
    <p class="tl-title">Project created</p>
    <time class="tl-time" datetime="2026-11-20T08:00">20 Nov, 08:00</time>
  </li>
</ol>
```

`styles.css`

```css
/* tearsheet activity-timeline v8be89136 · https://qusaialjbali.github.io/tearsheet/zine/parts/activity-timeline.html */
.timeline { width: 100%; max-width: 420px; margin: 0; padding: 0; list-style: none; }
.tl-item { position: relative; padding: 0 0 22px 28px; }
.tl-item::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: -6px;
  width: 2px;
  background: var(--ui-border);
}
.tl-item:last-child::before { display: none; }
.tl-item::after {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border-strong);
}
.tl-accent::after { background: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.tl-title { margin: 0; font-size: 15px; color: var(--ui-text); }
.tl-time { font-size: 13px; color: var(--ui-muted); }
```

## React

`ActivityTimeline.jsx`

```jsx
/* tearsheet activity-timeline v8be89136 · https://qusaialjbali.github.io/tearsheet/zine/parts/activity-timeline.html */
import './ActivityTimeline.css';

export function ActivityTimeline() {
  return (
    <ol className="timeline">
      <li className="tl-item tl-accent">
        <p className="tl-title"><strong>Maya</strong> published version 2.4</p>
        <time className="tl-time" dateTime="2026-11-23T09:12">Today, 9:12</time>
      </li>
      <li className="tl-item">
        <p className="tl-title"><strong>Leo</strong> merged “Fix focus ring in dark mode”</p>
        <time className="tl-time" dateTime="2026-11-22T17:40">Yesterday, 17:40</time>
      </li>
      <li className="tl-item">
        <p className="tl-title"><strong>Sam</strong> opened an issue about the tooltip on touch screens</p>
        <time className="tl-time" dateTime="2026-11-21T11:05">21 Nov, 11:05</time>
      </li>
      <li className="tl-item">
        <p className="tl-title">Project created</p>
        <time className="tl-time" dateTime="2026-11-20T08:00">20 Nov, 08:00</time>
      </li>
    </ol>
  );
}
```

`ActivityTimeline.css`

```css
/* tearsheet activity-timeline v8be89136 · https://qusaialjbali.github.io/tearsheet/zine/parts/activity-timeline.html */
.timeline { width: 100%; max-width: 420px; margin: 0; padding: 0; list-style: none; }
.tl-item { position: relative; padding: 0 0 22px 28px; }
.tl-item::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: -6px;
  width: 2px;
  background: var(--ui-border);
}
.tl-item:last-child::before { display: none; }
.tl-item::after {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border-strong);
}
.tl-accent::after { background: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.tl-title { margin: 0; font-size: 15px; color: var(--ui-text); }
.tl-time { font-size: 13px; color: var(--ui-muted); }
```

## Vue

`ActivityTimeline.vue`

```vue
<!-- tearsheet activity-timeline v8be89136 · https://qusaialjbali.github.io/tearsheet/zine/parts/activity-timeline.html -->
<template>
  <ol class="timeline">
    <li class="tl-item tl-accent">
      <p class="tl-title"><strong>Maya</strong> published version 2.4</p>
      <time class="tl-time" datetime="2026-11-23T09:12">Today, 9:12</time>
    </li>
    <li class="tl-item">
      <p class="tl-title"><strong>Leo</strong> merged “Fix focus ring in dark mode”</p>
      <time class="tl-time" datetime="2026-11-22T17:40">Yesterday, 17:40</time>
    </li>
    <li class="tl-item">
      <p class="tl-title"><strong>Sam</strong> opened an issue about the tooltip on touch screens</p>
      <time class="tl-time" datetime="2026-11-21T11:05">21 Nov, 11:05</time>
    </li>
    <li class="tl-item">
      <p class="tl-title">Project created</p>
      <time class="tl-time" datetime="2026-11-20T08:00">20 Nov, 08:00</time>
    </li>
  </ol>
</template>

<style scoped>
.timeline { width: 100%; max-width: 420px; margin: 0; padding: 0; list-style: none; }
.tl-item { position: relative; padding: 0 0 22px 28px; }
.tl-item::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: -6px;
  width: 2px;
  background: var(--ui-border);
}
.tl-item:last-child::before { display: none; }
.tl-item::after {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border-strong);
}
.tl-accent::after { background: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.tl-title { margin: 0; font-size: 15px; color: var(--ui-text); }
.tl-time { font-size: 13px; color: var(--ui-muted); }
</style>
```

## Svelte

`ActivityTimeline.svelte`

```svelte
<!-- tearsheet activity-timeline v8be89136 · https://qusaialjbali.github.io/tearsheet/zine/parts/activity-timeline.html -->
<ol class="timeline">
  <li class="tl-item tl-accent">
    <p class="tl-title"><strong>Maya</strong> published version 2.4</p>
    <time class="tl-time" datetime="2026-11-23T09:12">Today, 9:12</time>
  </li>
  <li class="tl-item">
    <p class="tl-title"><strong>Leo</strong> merged “Fix focus ring in dark mode”</p>
    <time class="tl-time" datetime="2026-11-22T17:40">Yesterday, 17:40</time>
  </li>
  <li class="tl-item">
    <p class="tl-title"><strong>Sam</strong> opened an issue about the tooltip on touch screens</p>
    <time class="tl-time" datetime="2026-11-21T11:05">21 Nov, 11:05</time>
  </li>
  <li class="tl-item">
    <p class="tl-title">Project created</p>
    <time class="tl-time" datetime="2026-11-20T08:00">20 Nov, 08:00</time>
  </li>
</ol>

<style>
.timeline { width: 100%; max-width: 420px; margin: 0; padding: 0; list-style: none; }
.tl-item { position: relative; padding: 0 0 22px 28px; }
.tl-item::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: -6px;
  width: 2px;
  background: var(--ui-border);
}
.tl-item:last-child::before { display: none; }
.tl-item::after {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border-strong);
}
.tl-accent::after { background: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.tl-title { margin: 0; font-size: 15px; color: var(--ui-text); }
.tl-time { font-size: 13px; color: var(--ui-muted); }
</style>
```
