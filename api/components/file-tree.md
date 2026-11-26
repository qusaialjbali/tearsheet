# File tree (Tearsheet, Data)

A nested folder tree built from <details>, with file and folder icons and no JavaScript.

**Why it works:** Each folder is a native disclosure, so it works with keyboard and screen readers out of the box. For thousands of nodes, switch to the full ARIA tree pattern with roving focus.

**Checked:** axe clean in light and dark; tightest text contrast 5.35:1 (needs 4.5:1); 9 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet file-tree vc0a3d540 · https://qusaialjbali.github.io/tearsheet/zine/parts/file-tree.html -->
<nav class="tree" aria-label="Project files">
  <ul>
    <li><details open><summary>src</summary>
      <ul>
        <li><details open><summary>components</summary>
          <ul>
            <li><a href="#" class="tree-file">Button.jsx</a></li>
            <li><a href="#" class="tree-file" aria-current="page">Modal.jsx</a></li>
            <li><a href="#" class="tree-file">Tabs.jsx</a></li>
          </ul>
        </details></li>
        <li><details><summary>styles</summary>
          <ul><li><a href="#" class="tree-file">tokens.css</a></li></ul>
        </details></li>
        <li><a href="#" class="tree-file">main.js</a></li>
      </ul>
    </details></li>
    <li><a href="#" class="tree-file">package.json</a></li>
    <li><a href="#" class="tree-file">README.md</a></li>
  </ul>
</nav>
```

`styles.css`

```css
/* tearsheet file-tree vc0a3d540 · https://qusaialjbali.github.io/tearsheet/zine/parts/file-tree.html */
.tree { width: 100%; max-width: 300px; padding: 10px; font-size: 14px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tree ul { margin: 0; padding: 0; list-style: none; }
.tree ul ul { margin-left: 12px; padding-left: 8px; border-left: 1px solid var(--ui-border); }
.tree summary, .tree-file {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  color: var(--ui-text); text-decoration: none; border-radius: 6px; cursor: pointer; list-style: none;
}
.tree summary::-webkit-details-marker { display: none; }
.tree summary::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-accent);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree-file::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-muted);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree summary:hover, .tree-file:hover { background: var(--ui-surface-2); }
.tree summary:focus-visible, .tree-file:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tree-file[aria-current="page"] { color: var(--ui-accent); font-weight: 600; background: var(--ui-accent-soft); }
```

## React

`FileTree.jsx`

```jsx
/* tearsheet file-tree vc0a3d540 · https://qusaialjbali.github.io/tearsheet/zine/parts/file-tree.html */
import './FileTree.css';

export function FileTree() {
  return (
    <nav className="tree" aria-label="Project files">
      <ul>
        <li><details open><summary>src</summary>
          <ul>
            <li><details open><summary>components</summary>
              <ul>
                <li><a href="#" className="tree-file">Button.jsx</a></li>
                <li><a href="#" className="tree-file" aria-current="page">Modal.jsx</a></li>
                <li><a href="#" className="tree-file">Tabs.jsx</a></li>
              </ul>
            </details></li>
            <li><details><summary>styles</summary>
              <ul><li><a href="#" className="tree-file">tokens.css</a></li></ul>
            </details></li>
            <li><a href="#" className="tree-file">main.js</a></li>
          </ul>
        </details></li>
        <li><a href="#" className="tree-file">package.json</a></li>
        <li><a href="#" className="tree-file">README.md</a></li>
      </ul>
    </nav>
  );
}
```

`FileTree.css`

```css
/* tearsheet file-tree vc0a3d540 · https://qusaialjbali.github.io/tearsheet/zine/parts/file-tree.html */
.tree { width: 100%; max-width: 300px; padding: 10px; font-size: 14px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tree ul { margin: 0; padding: 0; list-style: none; }
.tree ul ul { margin-left: 12px; padding-left: 8px; border-left: 1px solid var(--ui-border); }
.tree summary, .tree-file {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  color: var(--ui-text); text-decoration: none; border-radius: 6px; cursor: pointer; list-style: none;
}
.tree summary::-webkit-details-marker { display: none; }
.tree summary::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-accent);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree-file::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-muted);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree summary:hover, .tree-file:hover { background: var(--ui-surface-2); }
.tree summary:focus-visible, .tree-file:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tree-file[aria-current="page"] { color: var(--ui-accent); font-weight: 600; background: var(--ui-accent-soft); }
```

## Vue

`FileTree.vue`

```vue
<!-- tearsheet file-tree vc0a3d540 · https://qusaialjbali.github.io/tearsheet/zine/parts/file-tree.html -->
<template>
  <nav class="tree" aria-label="Project files">
    <ul>
      <li><details open><summary>src</summary>
        <ul>
          <li><details open><summary>components</summary>
            <ul>
              <li><a href="#" class="tree-file">Button.jsx</a></li>
              <li><a href="#" class="tree-file" aria-current="page">Modal.jsx</a></li>
              <li><a href="#" class="tree-file">Tabs.jsx</a></li>
            </ul>
          </details></li>
          <li><details><summary>styles</summary>
            <ul><li><a href="#" class="tree-file">tokens.css</a></li></ul>
          </details></li>
          <li><a href="#" class="tree-file">main.js</a></li>
        </ul>
      </details></li>
      <li><a href="#" class="tree-file">package.json</a></li>
      <li><a href="#" class="tree-file">README.md</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.tree { width: 100%; max-width: 300px; padding: 10px; font-size: 14px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tree ul { margin: 0; padding: 0; list-style: none; }
.tree ul ul { margin-left: 12px; padding-left: 8px; border-left: 1px solid var(--ui-border); }
.tree summary, .tree-file {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  color: var(--ui-text); text-decoration: none; border-radius: 6px; cursor: pointer; list-style: none;
}
.tree summary::-webkit-details-marker { display: none; }
.tree summary::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-accent);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree-file::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-muted);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree summary:hover, .tree-file:hover { background: var(--ui-surface-2); }
.tree summary:focus-visible, .tree-file:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tree-file[aria-current="page"] { color: var(--ui-accent); font-weight: 600; background: var(--ui-accent-soft); }
</style>
```

## Svelte

`FileTree.svelte`

```svelte
<!-- tearsheet file-tree vc0a3d540 · https://qusaialjbali.github.io/tearsheet/zine/parts/file-tree.html -->
<nav class="tree" aria-label="Project files">
  <ul>
    <li><details open><summary>src</summary>
      <ul>
        <li><details open><summary>components</summary>
          <ul>
            <li><a href="#" class="tree-file">Button.jsx</a></li>
            <li><a href="#" class="tree-file" aria-current="page">Modal.jsx</a></li>
            <li><a href="#" class="tree-file">Tabs.jsx</a></li>
          </ul>
        </details></li>
        <li><details><summary>styles</summary>
          <ul><li><a href="#" class="tree-file">tokens.css</a></li></ul>
        </details></li>
        <li><a href="#" class="tree-file">main.js</a></li>
      </ul>
    </details></li>
    <li><a href="#" class="tree-file">package.json</a></li>
    <li><a href="#" class="tree-file">README.md</a></li>
  </ul>
</nav>

<style>
.tree { width: 100%; max-width: 300px; padding: 10px; font-size: 14px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tree ul { margin: 0; padding: 0; list-style: none; }
.tree ul ul { margin-left: 12px; padding-left: 8px; border-left: 1px solid var(--ui-border); }
.tree summary, .tree-file {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  color: var(--ui-text); text-decoration: none; border-radius: 6px; cursor: pointer; list-style: none;
}
.tree summary::-webkit-details-marker { display: none; }
.tree summary::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-accent);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5Z'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree-file::before {
  content: ""; width: 16px; height: 16px; flex: none; background: var(--ui-muted);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='black' stroke-width='1.6'%3E%3Cpath d='M5 2.5h6.5L15.5 6.5V17a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM11.5 2.5v4h4'/%3E%3C/svg%3E") center / contain no-repeat;
}
.tree summary:hover, .tree-file:hover { background: var(--ui-surface-2); }
.tree summary:focus-visible, .tree-file:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tree-file[aria-current="page"] { color: var(--ui-accent); font-weight: 600; background: var(--ui-accent-soft); }
</style>
```
