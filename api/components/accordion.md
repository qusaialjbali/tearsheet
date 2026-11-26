# Accordion (Tearsheet, Content)

Zero-JavaScript FAQ accordion built on <details> and <summary>.

**Why it works:** Native <details> is keyboard and screen-reader accessible out of the box, and browser find-in-page can search inside closed panels.

**Checked:** axe clean in light and dark; tightest text contrast 6.7:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet accordion v2e8deb1f · https://qusaialjbali.github.io/tearsheet/zine/parts/accordion.html -->
<div class="accordion">
  <details class="accordion-item" open>
    <summary>Can I use these components commercially?</summary>
    <div class="accordion-content">
      <p>Yes. Copy them into any project, paid or free, with no attribution required.</p>
    </div>
  </details>
  <details class="accordion-item">
    <summary>Do I need a build step?</summary>
    <div class="accordion-content">
      <p>No. The HTML/CSS versions work in a plain file. Framework versions drop into any React, Vue or Svelte project.</p>
    </div>
  </details>
  <details class="accordion-item">
    <summary>How do I change the colors?</summary>
    <div class="accordion-content">
      <p>Edit the design tokens. Every component reads from the same CSS custom properties.</p>
    </div>
  </details>
</div>
```

`styles.css`

```css
/* tearsheet accordion v2e8deb1f · https://qusaialjbali.github.io/tearsheet/zine/parts/accordion.html */
.accordion {
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  background: var(--ui-surface);
  overflow: hidden;
}
.accordion-item + .accordion-item { border-top: 1px solid var(--ui-border); }
.accordion-item summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--ui-text);
  cursor: pointer;
  list-style: none;
}
.accordion-item summary::-webkit-details-marker { display: none; }
.accordion-item summary::after {
  content: "";
  width: 8px;
  height: 8px;
  flex: none;
  border: solid var(--ui-muted);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transition: transform 0.2s;
}
.accordion-item[open] summary::after { transform: rotate(-135deg); }
.accordion-item summary:hover { background: var(--ui-surface-2); }
.accordion-item summary:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.accordion-content { padding: 0 20px 16px; font-size: 15px; line-height: 1.6; color: var(--ui-muted); }
.accordion-content p { margin: 0; }
```

## React

`Accordion.jsx`

```jsx
/* tearsheet accordion v2e8deb1f · https://qusaialjbali.github.io/tearsheet/zine/parts/accordion.html */
import './Accordion.css';

export function Accordion() {
  return (
    <div className="accordion">
      <details className="accordion-item" open>
        <summary>Can I use these components commercially?</summary>
        <div className="accordion-content">
          <p>Yes. Copy them into any project, paid or free, with no attribution required.</p>
        </div>
      </details>
      <details className="accordion-item">
        <summary>Do I need a build step?</summary>
        <div className="accordion-content">
          <p>No. The HTML/CSS versions work in a plain file. Framework versions drop into any React, Vue or Svelte project.</p>
        </div>
      </details>
      <details className="accordion-item">
        <summary>How do I change the colors?</summary>
        <div className="accordion-content">
          <p>Edit the design tokens. Every component reads from the same CSS custom properties.</p>
        </div>
      </details>
    </div>
  );
}
```

`Accordion.css`

```css
/* tearsheet accordion v2e8deb1f · https://qusaialjbali.github.io/tearsheet/zine/parts/accordion.html */
.accordion {
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  background: var(--ui-surface);
  overflow: hidden;
}
.accordion-item + .accordion-item { border-top: 1px solid var(--ui-border); }
.accordion-item summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--ui-text);
  cursor: pointer;
  list-style: none;
}
.accordion-item summary::-webkit-details-marker { display: none; }
.accordion-item summary::after {
  content: "";
  width: 8px;
  height: 8px;
  flex: none;
  border: solid var(--ui-muted);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transition: transform 0.2s;
}
.accordion-item[open] summary::after { transform: rotate(-135deg); }
.accordion-item summary:hover { background: var(--ui-surface-2); }
.accordion-item summary:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.accordion-content { padding: 0 20px 16px; font-size: 15px; line-height: 1.6; color: var(--ui-muted); }
.accordion-content p { margin: 0; }
```

## Vue

`Accordion.vue`

```vue
<!-- tearsheet accordion v2e8deb1f · https://qusaialjbali.github.io/tearsheet/zine/parts/accordion.html -->
<template>
  <div class="accordion">
    <details class="accordion-item" open>
      <summary>Can I use these components commercially?</summary>
      <div class="accordion-content">
        <p>Yes. Copy them into any project, paid or free, with no attribution required.</p>
      </div>
    </details>
    <details class="accordion-item">
      <summary>Do I need a build step?</summary>
      <div class="accordion-content">
        <p>No. The HTML/CSS versions work in a plain file. Framework versions drop into any React, Vue or Svelte project.</p>
      </div>
    </details>
    <details class="accordion-item">
      <summary>How do I change the colors?</summary>
      <div class="accordion-content">
        <p>Edit the design tokens. Every component reads from the same CSS custom properties.</p>
      </div>
    </details>
  </div>
</template>

<style scoped>
.accordion {
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  background: var(--ui-surface);
  overflow: hidden;
}
.accordion-item + .accordion-item { border-top: 1px solid var(--ui-border); }
.accordion-item summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--ui-text);
  cursor: pointer;
  list-style: none;
}
.accordion-item summary::-webkit-details-marker { display: none; }
.accordion-item summary::after {
  content: "";
  width: 8px;
  height: 8px;
  flex: none;
  border: solid var(--ui-muted);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transition: transform 0.2s;
}
.accordion-item[open] summary::after { transform: rotate(-135deg); }
.accordion-item summary:hover { background: var(--ui-surface-2); }
.accordion-item summary:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.accordion-content { padding: 0 20px 16px; font-size: 15px; line-height: 1.6; color: var(--ui-muted); }
.accordion-content p { margin: 0; }
</style>
```

## Svelte

`Accordion.svelte`

```svelte
<!-- tearsheet accordion v2e8deb1f · https://qusaialjbali.github.io/tearsheet/zine/parts/accordion.html -->
<div class="accordion">
  <details class="accordion-item" open>
    <summary>Can I use these components commercially?</summary>
    <div class="accordion-content">
      <p>Yes. Copy them into any project, paid or free, with no attribution required.</p>
    </div>
  </details>
  <details class="accordion-item">
    <summary>Do I need a build step?</summary>
    <div class="accordion-content">
      <p>No. The HTML/CSS versions work in a plain file. Framework versions drop into any React, Vue or Svelte project.</p>
    </div>
  </details>
  <details class="accordion-item">
    <summary>How do I change the colors?</summary>
    <div class="accordion-content">
      <p>Edit the design tokens. Every component reads from the same CSS custom properties.</p>
    </div>
  </details>
</div>

<style>
.accordion {
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  background: var(--ui-surface);
  overflow: hidden;
}
.accordion-item + .accordion-item { border-top: 1px solid var(--ui-border); }
.accordion-item summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--ui-text);
  cursor: pointer;
  list-style: none;
}
.accordion-item summary::-webkit-details-marker { display: none; }
.accordion-item summary::after {
  content: "";
  width: 8px;
  height: 8px;
  flex: none;
  border: solid var(--ui-muted);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transition: transform 0.2s;
}
.accordion-item[open] summary::after { transform: rotate(-135deg); }
.accordion-item summary:hover { background: var(--ui-surface-2); }
.accordion-item summary:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.accordion-content { padding: 0 20px 16px; font-size: 15px; line-height: 1.6; color: var(--ui-muted); }
.accordion-content p { margin: 0; }
</style>
```
