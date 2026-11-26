# Settings list (Tearsheet, Content)

Rows of settings mixing toggles, links to sub-pages and a destructive action.

**Why it works:** Toggles apply instantly; rows with a chevron open another page. Keep the destructive action last and in its own colour.

**Checked:** axe clean in light and dark; tightest text contrast 5.73:1 (needs 4.5:1); 4 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet settings-list v8ec9dedd · https://qusaialjbali.github.io/tearsheet/zine/parts/settings-list.html -->
<ul class="settings">
  <li class="setting">
    <div class="setting-text">
      <p class="setting-title" id="set-email">Email notifications</p>
      <p class="setting-desc">Weekly summary and security alerts</p>
    </div>
    <label class="set-switch"><input type="checkbox" role="switch" checked aria-labelledby="set-email"><span aria-hidden="true"></span></label>
  </li>
  <li class="setting">
    <a class="setting-link" href="#">
      <span class="setting-text">
        <span class="setting-title">Two-factor sign-in</span>
        <span class="setting-desc">Not set up</span>
      </span>
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </li>
  <li class="setting">
    <a class="setting-link" href="#">
      <span class="setting-text">
        <span class="setting-title">Language</span>
        <span class="setting-desc">English (UK)</span>
      </span>
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </li>
  <li class="setting">
    <a class="setting-link setting-danger" href="#"><span class="setting-title">Delete account</span></a>
  </li>
</ul>
```

`styles.css`

```css
/* tearsheet settings-list v8ec9dedd · https://qusaialjbali.github.io/tearsheet/zine/parts/settings-list.html */
.settings {
  width: 100%;
  max-width: 460px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.setting { display: flex; align-items: center; gap: 16px; padding: 14px 18px; }
.setting + .setting { border-top: 1px solid var(--ui-border); }
.setting:has(.setting-link) { padding: 0; }
.setting-text { display: grid; gap: 2px; flex: 1; }
.setting-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.setting-desc { margin: 0; font-size: 13px; color: var(--ui-muted); }
.setting-link {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 18px;
  color: inherit;
  text-decoration: none;
}
.setting-link svg { width: 18px; height: 18px; color: var(--ui-muted); }
.setting-link:hover { background: var(--ui-surface-2); }
.setting-link:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.setting-danger .setting-title { color: var(--ui-danger); }
.set-switch { position: relative; display: inline-flex; cursor: pointer; }
.set-switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.set-switch span {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.set-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.set-switch input:checked + span { background: var(--ui-accent); }
.set-switch input:checked + span::after { transform: translateX(18px); }
.set-switch input:focus-visible + span { box-shadow: var(--ui-focus); }
```

## React

`SettingsList.jsx`

```jsx
/* tearsheet settings-list v8ec9dedd · https://qusaialjbali.github.io/tearsheet/zine/parts/settings-list.html */
import './SettingsList.css';

export function SettingsList() {
  return (
    <ul className="settings">
      <li className="setting">
        <div className="setting-text">
          <p className="setting-title" id="set-email">Email notifications</p>
          <p className="setting-desc">Weekly summary and security alerts</p>
        </div>
        <label className="set-switch"><input type="checkbox" role="switch" defaultChecked aria-labelledby="set-email" /><span aria-hidden="true"></span></label>
      </li>
      <li className="setting">
        <a className="setting-link" href="#">
          <span className="setting-text">
            <span className="setting-title">Two-factor sign-in</span>
            <span className="setting-desc">Not set up</span>
          </span>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </li>
      <li className="setting">
        <a className="setting-link" href="#">
          <span className="setting-text">
            <span className="setting-title">Language</span>
            <span className="setting-desc">English (UK)</span>
          </span>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </li>
      <li className="setting">
        <a className="setting-link setting-danger" href="#"><span className="setting-title">Delete account</span></a>
      </li>
    </ul>
  );
}
```

`SettingsList.css`

```css
/* tearsheet settings-list v8ec9dedd · https://qusaialjbali.github.io/tearsheet/zine/parts/settings-list.html */
.settings {
  width: 100%;
  max-width: 460px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.setting { display: flex; align-items: center; gap: 16px; padding: 14px 18px; }
.setting + .setting { border-top: 1px solid var(--ui-border); }
.setting:has(.setting-link) { padding: 0; }
.setting-text { display: grid; gap: 2px; flex: 1; }
.setting-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.setting-desc { margin: 0; font-size: 13px; color: var(--ui-muted); }
.setting-link {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 18px;
  color: inherit;
  text-decoration: none;
}
.setting-link svg { width: 18px; height: 18px; color: var(--ui-muted); }
.setting-link:hover { background: var(--ui-surface-2); }
.setting-link:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.setting-danger .setting-title { color: var(--ui-danger); }
.set-switch { position: relative; display: inline-flex; cursor: pointer; }
.set-switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.set-switch span {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.set-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.set-switch input:checked + span { background: var(--ui-accent); }
.set-switch input:checked + span::after { transform: translateX(18px); }
.set-switch input:focus-visible + span { box-shadow: var(--ui-focus); }
```

## Vue

`SettingsList.vue`

```vue
<!-- tearsheet settings-list v8ec9dedd · https://qusaialjbali.github.io/tearsheet/zine/parts/settings-list.html -->
<template>
  <ul class="settings">
    <li class="setting">
      <div class="setting-text">
        <p class="setting-title" id="set-email">Email notifications</p>
        <p class="setting-desc">Weekly summary and security alerts</p>
      </div>
      <label class="set-switch"><input type="checkbox" role="switch" checked aria-labelledby="set-email"><span aria-hidden="true"></span></label>
    </li>
    <li class="setting">
      <a class="setting-link" href="#">
        <span class="setting-text">
          <span class="setting-title">Two-factor sign-in</span>
          <span class="setting-desc">Not set up</span>
        </span>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </li>
    <li class="setting">
      <a class="setting-link" href="#">
        <span class="setting-text">
          <span class="setting-title">Language</span>
          <span class="setting-desc">English (UK)</span>
        </span>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </li>
    <li class="setting">
      <a class="setting-link setting-danger" href="#"><span class="setting-title">Delete account</span></a>
    </li>
  </ul>
</template>

<style scoped>
.settings {
  width: 100%;
  max-width: 460px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.setting { display: flex; align-items: center; gap: 16px; padding: 14px 18px; }
.setting + .setting { border-top: 1px solid var(--ui-border); }
.setting:has(.setting-link) { padding: 0; }
.setting-text { display: grid; gap: 2px; flex: 1; }
.setting-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.setting-desc { margin: 0; font-size: 13px; color: var(--ui-muted); }
.setting-link {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 18px;
  color: inherit;
  text-decoration: none;
}
.setting-link svg { width: 18px; height: 18px; color: var(--ui-muted); }
.setting-link:hover { background: var(--ui-surface-2); }
.setting-link:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.setting-danger .setting-title { color: var(--ui-danger); }
.set-switch { position: relative; display: inline-flex; cursor: pointer; }
.set-switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.set-switch span {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.set-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.set-switch input:checked + span { background: var(--ui-accent); }
.set-switch input:checked + span::after { transform: translateX(18px); }
.set-switch input:focus-visible + span { box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`SettingsList.svelte`

```svelte
<!-- tearsheet settings-list v8ec9dedd · https://qusaialjbali.github.io/tearsheet/zine/parts/settings-list.html -->
<ul class="settings">
  <li class="setting">
    <div class="setting-text">
      <p class="setting-title" id="set-email">Email notifications</p>
      <p class="setting-desc">Weekly summary and security alerts</p>
    </div>
    <label class="set-switch"><input type="checkbox" role="switch" checked aria-labelledby="set-email"><span aria-hidden="true"></span></label>
  </li>
  <li class="setting">
    <a class="setting-link" href="#">
      <span class="setting-text">
        <span class="setting-title">Two-factor sign-in</span>
        <span class="setting-desc">Not set up</span>
      </span>
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </li>
  <li class="setting">
    <a class="setting-link" href="#">
      <span class="setting-text">
        <span class="setting-title">Language</span>
        <span class="setting-desc">English (UK)</span>
      </span>
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </li>
  <li class="setting">
    <a class="setting-link setting-danger" href="#"><span class="setting-title">Delete account</span></a>
  </li>
</ul>

<style>
.settings {
  width: 100%;
  max-width: 460px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  overflow: hidden;
}
.setting { display: flex; align-items: center; gap: 16px; padding: 14px 18px; }
.setting + .setting { border-top: 1px solid var(--ui-border); }
.setting:has(.setting-link) { padding: 0; }
.setting-text { display: grid; gap: 2px; flex: 1; }
.setting-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.setting-desc { margin: 0; font-size: 13px; color: var(--ui-muted); }
.setting-link {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 18px;
  color: inherit;
  text-decoration: none;
}
.setting-link svg { width: 18px; height: 18px; color: var(--ui-muted); }
.setting-link:hover { background: var(--ui-surface-2); }
.setting-link:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.setting-danger .setting-title { color: var(--ui-danger); }
.set-switch { position: relative; display: inline-flex; cursor: pointer; }
.set-switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.set-switch span {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.set-switch span::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.2s;
}
.set-switch input:checked + span { background: var(--ui-accent); }
.set-switch input:checked + span::after { transform: translateX(18px); }
.set-switch input:focus-visible + span { box-shadow: var(--ui-focus); }
</style>
```
