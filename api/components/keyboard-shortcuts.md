# Keyboard shortcuts (Tearsheet, Content)

A shortcut cheat sheet with properly styled <kbd> keys.

**Why it works:** Use the <kbd> element for keys. Show the platform-correct modifier (Ctrl on Windows, ⌘ on Mac) when you can detect it.

**Checked:** axe clean in light and dark; tightest text contrast 16.1:1 (needs 4.5:1); 0 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet keyboard-shortcuts vfffc5f7b · https://qusaialjbali.github.io/tearsheet/zine/parts/keyboard-shortcuts.html -->
<dl class="shortcuts">
  <div class="shortcut"><dt>Search everything</dt><dd><kbd>Ctrl</kbd><kbd>K</kbd></dd></div>
  <div class="shortcut"><dt>Copy component</dt><dd><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>C</kbd></dd></div>
  <div class="shortcut"><dt>Switch theme</dt><dd><kbd>Shift</kbd><kbd>D</kbd></dd></div>
  <div class="shortcut"><dt>Close dialog</dt><dd><kbd>Esc</kbd></dd></div>
</dl>
```

`styles.css`

```css
/* tearsheet keyboard-shortcuts vfffc5f7b · https://qusaialjbali.github.io/tearsheet/zine/parts/keyboard-shortcuts.html */
.shortcuts { width: 100%; max-width: 380px; margin: 0; }
.shortcut { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; }
.shortcut + .shortcut { border-top: 1px solid var(--ui-border); }
.shortcut dt { font-size: 15px; color: var(--ui-text); }
.shortcut dd { display: flex; gap: 4px; margin: 0; }
kbd {
  min-width: 26px;
  padding: 3px 7px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-bottom-width: 3px;
  border-radius: 6px;
}
```

## React

`KeyboardShortcuts.jsx`

```jsx
/* tearsheet keyboard-shortcuts vfffc5f7b · https://qusaialjbali.github.io/tearsheet/zine/parts/keyboard-shortcuts.html */
import './KeyboardShortcuts.css';

export function KeyboardShortcuts() {
  return (
    <dl className="shortcuts">
      <div className="shortcut"><dt>Search everything</dt><dd><kbd>Ctrl</kbd><kbd>K</kbd></dd></div>
      <div className="shortcut"><dt>Copy component</dt><dd><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>C</kbd></dd></div>
      <div className="shortcut"><dt>Switch theme</dt><dd><kbd>Shift</kbd><kbd>D</kbd></dd></div>
      <div className="shortcut"><dt>Close dialog</dt><dd><kbd>Esc</kbd></dd></div>
    </dl>
  );
}
```

`KeyboardShortcuts.css`

```css
/* tearsheet keyboard-shortcuts vfffc5f7b · https://qusaialjbali.github.io/tearsheet/zine/parts/keyboard-shortcuts.html */
.shortcuts { width: 100%; max-width: 380px; margin: 0; }
.shortcut { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; }
.shortcut + .shortcut { border-top: 1px solid var(--ui-border); }
.shortcut dt { font-size: 15px; color: var(--ui-text); }
.shortcut dd { display: flex; gap: 4px; margin: 0; }
kbd {
  min-width: 26px;
  padding: 3px 7px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-bottom-width: 3px;
  border-radius: 6px;
}
```

## Vue

`KeyboardShortcuts.vue`

```vue
<!-- tearsheet keyboard-shortcuts vfffc5f7b · https://qusaialjbali.github.io/tearsheet/zine/parts/keyboard-shortcuts.html -->
<template>
  <dl class="shortcuts">
    <div class="shortcut"><dt>Search everything</dt><dd><kbd>Ctrl</kbd><kbd>K</kbd></dd></div>
    <div class="shortcut"><dt>Copy component</dt><dd><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>C</kbd></dd></div>
    <div class="shortcut"><dt>Switch theme</dt><dd><kbd>Shift</kbd><kbd>D</kbd></dd></div>
    <div class="shortcut"><dt>Close dialog</dt><dd><kbd>Esc</kbd></dd></div>
  </dl>
</template>

<style scoped>
.shortcuts { width: 100%; max-width: 380px; margin: 0; }
.shortcut { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; }
.shortcut + .shortcut { border-top: 1px solid var(--ui-border); }
.shortcut dt { font-size: 15px; color: var(--ui-text); }
.shortcut dd { display: flex; gap: 4px; margin: 0; }
kbd {
  min-width: 26px;
  padding: 3px 7px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-bottom-width: 3px;
  border-radius: 6px;
}
</style>
```

## Svelte

`KeyboardShortcuts.svelte`

```svelte
<!-- tearsheet keyboard-shortcuts vfffc5f7b · https://qusaialjbali.github.io/tearsheet/zine/parts/keyboard-shortcuts.html -->
<dl class="shortcuts">
  <div class="shortcut"><dt>Search everything</dt><dd><kbd>Ctrl</kbd><kbd>K</kbd></dd></div>
  <div class="shortcut"><dt>Copy component</dt><dd><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>C</kbd></dd></div>
  <div class="shortcut"><dt>Switch theme</dt><dd><kbd>Shift</kbd><kbd>D</kbd></dd></div>
  <div class="shortcut"><dt>Close dialog</dt><dd><kbd>Esc</kbd></dd></div>
</dl>

<style>
.shortcuts { width: 100%; max-width: 380px; margin: 0; }
.shortcut { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; }
.shortcut + .shortcut { border-top: 1px solid var(--ui-border); }
.shortcut dt { font-size: 15px; color: var(--ui-text); }
.shortcut dd { display: flex; gap: 4px; margin: 0; }
kbd {
  min-width: 26px;
  padding: 3px 7px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-bottom-width: 3px;
  border-radius: 6px;
}
</style>
```
