# Tabs (Tearsheet, Navigation)

Accessible tabs following the WAI-ARIA pattern, with arrow-key navigation and roving tabindex.

**Why it works:** Tab key moves into the tab list then out to the panel; arrow keys move between tabs. Use tabs for peer views of the same thing, not for steps.

**Checked:** axe clean in light and dark; tightest text contrast 6.28:1 (needs 4.5:1); 2 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet tabs v274d49f5 · https://qusaialjbali.github.io/tearsheet/zine/parts/tabs.html -->
<div class="tabs" data-tabs>
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button class="tab" role="tab" id="tab-0" aria-controls="panel-0" aria-selected="true">Profile</button>
    <button class="tab" role="tab" id="tab-1" aria-controls="panel-1" aria-selected="false" tabindex="-1">Security</button>
    <button class="tab" role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">Billing</button>
  </div>
  <div class="tab-panel" role="tabpanel" id="panel-0" aria-labelledby="tab-0" tabindex="0">Update your name, photo and bio.</div>
  <div class="tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0" hidden>Change your password and turn on two-factor sign-in.</div>
  <div class="tab-panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" hidden>Manage your plan, payment method and invoices.</div>
</div>
```

`styles.css`

```css
/* tearsheet tabs v274d49f5 · https://qusaialjbali.github.io/tearsheet/zine/parts/tabs.html */
.tabs { width: 100%; max-width: 480px; }
.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--ui-border);
}
.tab {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;
  margin-bottom: -1px;
  color: var(--ui-muted);
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
}
.tab:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.tab[aria-selected="true"] { color: var(--ui-accent); border-bottom-color: var(--ui-accent); }
.tab:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tab-panel { padding: 18px 2px; font-size: 15px; color: var(--ui-text); }
.tab-panel:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 6px; }
```

`script.js`

```js
/* tearsheet tabs v274d49f5 · https://qusaialjbali.github.io/tearsheet/zine/parts/tabs.html */
document.querySelectorAll('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];

  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -i, End: tabs.length - 1 - i };
      if (!(e.key in keys)) return;
      e.preventDefault();
      select(tabs[(i + keys[e.key] + tabs.length) % tabs.length]);
    });
  });
});
```

## React

`Tabs.jsx`

```jsx
/* tearsheet tabs v274d49f5 · https://qusaialjbali.github.io/tearsheet/zine/parts/tabs.html */
import { useRef, useState } from 'react';
import './Tabs.css';

const TABS = [
  { label: 'Profile', content: 'Update your name, photo and bio.' },
  { label: 'Security', content: 'Change your password and turn on two-factor sign-in.' },
  { label: 'Billing', content: 'Manage your plan, payment method and invoices.' },
];

export function Tabs() {
  const [active, setActive] = useState(0);
  const buttons = useRef([]);

  const select = (i) => {
    setActive(i);
    buttons.current[i]?.focus();
  };

  const onKeyDown = (e) => {
    const keys = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: TABS.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select((keys[e.key] + TABS.length) % TABS.length);
  };

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label="Account settings" onKeyDown={onKeyDown}>
        {TABS.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => (buttons.current[i] = el)}
            className="tab"
            role="tab"
            id={'tab-' + i}
            aria-controls={'panel-' + i}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t.label}
          className="tab-panel"
          role="tabpanel"
          id={'panel-' + i}
          aria-labelledby={'tab-' + i}
          tabIndex={0}
          hidden={active !== i}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
```

`Tabs.css`

```css
/* tearsheet tabs v274d49f5 · https://qusaialjbali.github.io/tearsheet/zine/parts/tabs.html */
.tabs { width: 100%; max-width: 480px; }
.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--ui-border);
}
.tab {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;
  margin-bottom: -1px;
  color: var(--ui-muted);
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
}
.tab:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.tab[aria-selected="true"] { color: var(--ui-accent); border-bottom-color: var(--ui-accent); }
.tab:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tab-panel { padding: 18px 2px; font-size: 15px; color: var(--ui-text); }
.tab-panel:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 6px; }
```

## Vue

`Tabs.vue`

```vue
<!-- tearsheet tabs v274d49f5 · https://qusaialjbali.github.io/tearsheet/zine/parts/tabs.html -->
<script setup>
import { ref } from 'vue';

const tabs = [
  { label: 'Profile', content: 'Update your name, photo and bio.' },
  { label: 'Security', content: 'Change your password and turn on two-factor sign-in.' },
  { label: 'Billing', content: 'Manage your plan, payment method and invoices.' },
];
const active = ref(0);
const buttons = ref([]);

function select(i) {
  active.value = i;
  buttons.value[i]?.focus();
}

function onKeyDown(e) {
  const keys = { ArrowRight: active.value + 1, ArrowLeft: active.value - 1, Home: 0, End: tabs.length - 1 };
  if (!(e.key in keys)) return;
  e.preventDefault();
  select((keys[e.key] + tabs.length) % tabs.length);
}
</script>

<template>
  <div class="tabs">
    <div class="tab-list" role="tablist" aria-label="Account settings" @keydown="onKeyDown">
      <button
        v-for="(t, i) in tabs"
        :key="t.label"
        :ref="(el) => (buttons[i] = el)"
        class="tab"
        role="tab"
        :id="'tab-' + i"
        :aria-controls="'panel-' + i"
        :aria-selected="active === i"
        :tabindex="active === i ? 0 : -1"
        @click="select(i)"
      >
        {{ t.label }}
      </button>
    </div>
    <div
      v-for="(t, i) in tabs"
      :key="t.label"
      v-show="active === i"
      class="tab-panel"
      role="tabpanel"
      :id="'panel-' + i"
      :aria-labelledby="'tab-' + i"
      tabindex="0"
    >
      {{ t.content }}
    </div>
  </div>
</template>

<style scoped>
.tabs { width: 100%; max-width: 480px; }
.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--ui-border);
}
.tab {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;
  margin-bottom: -1px;
  color: var(--ui-muted);
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
}
.tab:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.tab[aria-selected="true"] { color: var(--ui-accent); border-bottom-color: var(--ui-accent); }
.tab:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tab-panel { padding: 18px 2px; font-size: 15px; color: var(--ui-text); }
.tab-panel:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 6px; }
</style>
```

## Svelte

`Tabs.svelte`

```svelte
<!-- tearsheet tabs v274d49f5 · https://qusaialjbali.github.io/tearsheet/zine/parts/tabs.html -->
<script>
  const tabs = [
    { label: 'Profile', content: 'Update your name, photo and bio.' },
    { label: 'Security', content: 'Change your password and turn on two-factor sign-in.' },
    { label: 'Billing', content: 'Manage your plan, payment method and invoices.' },
  ];
  let active = 0;
  let buttons = [];

  function select(i) {
    active = i;
    buttons[i]?.focus();
  }

  function onKeyDown(e) {
    const keys = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select((keys[e.key] + tabs.length) % tabs.length);
  }
</script>

<div class="tabs">
  <div class="tab-list" role="tablist" aria-label="Account settings" on:keydown={onKeyDown}>
    {#each tabs as t, i}
      <button
        bind:this={buttons[i]}
        class="tab"
        role="tab"
        id={'tab-' + i}
        aria-controls={'panel-' + i}
        aria-selected={active === i}
        tabindex={active === i ? 0 : -1}
        on:click={() => select(i)}
      >
        {t.label}
      </button>
    {/each}
  </div>
  {#each tabs as t, i}
    <div class="tab-panel" role="tabpanel" id={'panel-' + i} aria-labelledby={'tab-' + i} tabindex="0" hidden={active !== i}>
      {t.content}
    </div>
  {/each}
</div>

<style>
.tabs { width: 100%; max-width: 480px; }
.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--ui-border);
}
.tab {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;
  margin-bottom: -1px;
  color: var(--ui-muted);
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
}
.tab:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.tab[aria-selected="true"] { color: var(--ui-accent); border-bottom-color: var(--ui-accent); }
.tab:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tab-panel { padding: 18px 2px; font-size: 15px; color: var(--ui-text); }
.tab-panel:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 6px; }
</style>
```
