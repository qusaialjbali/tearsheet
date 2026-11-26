# Stat group (Tearsheet, Content)

A row of key numbers with labelled change, built as a description list.

**Why it works:** Say whether a change is good or bad in words; an up arrow is not always good news. Use tabular figures so digits line up.

**Checked:** axe clean in light and dark; tightest text contrast 5.01:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet stat-group vaec28dcb · https://qusaialjbali.github.io/tearsheet/zine/parts/stat-group.html -->
<dl class="stats">
  <div class="stat">
    <dt>Visitors</dt>
    <dd class="stat-value">48,210</dd>
    <dd class="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Up 12.4% on last week</dd>
  </div>
  <div class="stat">
    <dt>Sign-ups</dt>
    <dd class="stat-value">1,284</dd>
    <dd class="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Up 3.1% on last week</dd>
  </div>
  <div class="stat">
    <dt>Average order</dt>
    <dd class="stat-value">$62.40</dd>
    <dd class="stat-delta stat-bad"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5.5 10.5 10 15l4.5-4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Down 4.8% on last week</dd>
  </div>
</dl>
```

`styles.css`

```css
/* tearsheet stat-group vaec28dcb · https://qusaialjbali.github.io/tearsheet/zine/parts/stat-group.html */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 0;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.stat { padding: 20px 22px; border-right: 1px solid var(--ui-border); margin-right: -1px; }
.stat dt { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.stat dd { margin: 0; }
.stat-value { margin-top: 4px !important; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.stat-delta { display: flex; align-items: center; gap: 4px; margin-top: 6px !important; font-size: 13px; font-weight: 600; }
.stat-delta svg { width: 16px; height: 16px; }
.stat-good { color: var(--ui-success); }
.stat-bad { color: var(--ui-danger); }
```

## React

`StatGroup.jsx`

```jsx
/* tearsheet stat-group vaec28dcb · https://qusaialjbali.github.io/tearsheet/zine/parts/stat-group.html */
import './StatGroup.css';

export function StatGroup() {
  return (
    <dl className="stats">
      <div className="stat">
        <dt>Visitors</dt>
        <dd className="stat-value">48,210</dd>
        <dd className="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Up 12.4% on last week</dd>
      </div>
      <div className="stat">
        <dt>Sign-ups</dt>
        <dd className="stat-value">1,284</dd>
        <dd className="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Up 3.1% on last week</dd>
      </div>
      <div className="stat">
        <dt>Average order</dt>
        <dd className="stat-value">$62.40</dd>
        <dd className="stat-delta stat-bad"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5.5 10.5 10 15l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Down 4.8% on last week</dd>
      </div>
    </dl>
  );
}
```

`StatGroup.css`

```css
/* tearsheet stat-group vaec28dcb · https://qusaialjbali.github.io/tearsheet/zine/parts/stat-group.html */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 0;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.stat { padding: 20px 22px; border-right: 1px solid var(--ui-border); margin-right: -1px; }
.stat dt { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.stat dd { margin: 0; }
.stat-value { margin-top: 4px !important; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.stat-delta { display: flex; align-items: center; gap: 4px; margin-top: 6px !important; font-size: 13px; font-weight: 600; }
.stat-delta svg { width: 16px; height: 16px; }
.stat-good { color: var(--ui-success); }
.stat-bad { color: var(--ui-danger); }
```

## Vue

`StatGroup.vue`

```vue
<!-- tearsheet stat-group vaec28dcb · https://qusaialjbali.github.io/tearsheet/zine/parts/stat-group.html -->
<template>
  <dl class="stats">
    <div class="stat">
      <dt>Visitors</dt>
      <dd class="stat-value">48,210</dd>
      <dd class="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Up 12.4% on last week</dd>
    </div>
    <div class="stat">
      <dt>Sign-ups</dt>
      <dd class="stat-value">1,284</dd>
      <dd class="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Up 3.1% on last week</dd>
    </div>
    <div class="stat">
      <dt>Average order</dt>
      <dd class="stat-value">$62.40</dd>
      <dd class="stat-delta stat-bad"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5.5 10.5 10 15l4.5-4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Down 4.8% on last week</dd>
    </div>
  </dl>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 0;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.stat { padding: 20px 22px; border-right: 1px solid var(--ui-border); margin-right: -1px; }
.stat dt { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.stat dd { margin: 0; }
.stat-value { margin-top: 4px !important; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.stat-delta { display: flex; align-items: center; gap: 4px; margin-top: 6px !important; font-size: 13px; font-weight: 600; }
.stat-delta svg { width: 16px; height: 16px; }
.stat-good { color: var(--ui-success); }
.stat-bad { color: var(--ui-danger); }
</style>
```

## Svelte

`StatGroup.svelte`

```svelte
<!-- tearsheet stat-group vaec28dcb · https://qusaialjbali.github.io/tearsheet/zine/parts/stat-group.html -->
<dl class="stats">
  <div class="stat">
    <dt>Visitors</dt>
    <dd class="stat-value">48,210</dd>
    <dd class="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Up 12.4% on last week</dd>
  </div>
  <div class="stat">
    <dt>Sign-ups</dt>
    <dd class="stat-value">1,284</dd>
    <dd class="stat-delta stat-good"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5.5 9.5 10 5l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Up 3.1% on last week</dd>
  </div>
  <div class="stat">
    <dt>Average order</dt>
    <dd class="stat-value">$62.40</dd>
    <dd class="stat-delta stat-bad"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5.5 10.5 10 15l4.5-4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Down 4.8% on last week</dd>
  </div>
</dl>

<style>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 0;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.stat { padding: 20px 22px; border-right: 1px solid var(--ui-border); margin-right: -1px; }
.stat dt { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.stat dd { margin: 0; }
.stat-value { margin-top: 4px !important; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.stat-delta { display: flex; align-items: center; gap: 4px; margin-top: 6px !important; font-size: 13px; font-weight: 600; }
.stat-delta svg { width: 16px; height: 16px; }
.stat-good { color: var(--ui-success); }
.stat-bad { color: var(--ui-danger); }
</style>
```
