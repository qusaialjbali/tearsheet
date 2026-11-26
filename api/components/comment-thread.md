# Comment thread (Tearsheet, Content)

A discussion with one level of replies, author badges, relative times and quiet actions.

**Why it works:** Nest replies only one level deep; deeper threads become unreadable on phones. The reply button says who you are replying to.

**Checked:** axe clean in light and dark; tightest text contrast 5.35:1 (needs 4.5:1); 4 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet comment-thread v2d1de446 · https://qusaialjbali.github.io/tearsheet/zine/parts/comment-thread.html -->
<section class="comments" aria-label="Comments">
  <article class="cmt">
    <span class="cmt-av" aria-hidden="true">RK</span>
    <div class="cmt-body">
      <p class="cmt-meta"><b>Rosa K.</b> <span class="cmt-badge">Author</span> <time datetime="2026-11-25">2 days ago</time></p>
      <p>Should the toast stay on screen longer when it contains an Undo button?</p>
      <p class="cmt-actions"><button type="button">Reply to Rosa</button><button type="button" aria-pressed="false">Like · 4</button></p>
      <article class="cmt reply">
        <span class="cmt-av alt" aria-hidden="true">TM</span>
        <div class="cmt-body">
          <p class="cmt-meta"><b>Tomás M.</b> <time datetime="2026-11-26">1 day ago</time></p>
          <p>Yes. And pause the timer while it has focus or the pointer is over it, so nobody loses the undo.</p>
          <p class="cmt-actions"><button type="button">Reply to Tomás</button><button type="button" aria-pressed="false">Like · 9</button></p>
        </div>
      </article>
    </div>
  </article>
</section>
```

`styles.css`

```css
/* tearsheet comment-thread v2d1de446 · https://qusaialjbali.github.io/tearsheet/zine/parts/comment-thread.html */
.comments { width: 100%; max-width: 520px; }
.cmt { display: grid; grid-template-columns: 36px 1fr; gap: 12px; }
.cmt.reply { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--ui-border); }
.cmt-av { display: grid; place-items: center; width: 36px; height: 36px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.cmt-av.alt { background: #0f766e; }
.cmt-body > p { margin: 0 0 6px; font-size: 14px; line-height: 1.55; }
.cmt-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 13px !important; color: var(--ui-muted); }
.cmt-meta b { color: var(--ui-text); }
.cmt-badge { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px; }
.cmt-actions { display: flex; gap: 4px; }
.cmt-actions button { padding: 4px 8px; margin-left: -8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer; }
.cmt-actions button + button { margin-left: 0; }
.cmt-actions button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.cmt-actions button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## React

`CommentThread.jsx`

```jsx
/* tearsheet comment-thread v2d1de446 · https://qusaialjbali.github.io/tearsheet/zine/parts/comment-thread.html */
import './CommentThread.css';

export function CommentThread() {
  return (
    <section className="comments" aria-label="Comments">
      <article className="cmt">
        <span className="cmt-av" aria-hidden="true">RK</span>
        <div className="cmt-body">
          <p className="cmt-meta"><b>Rosa K.</b> <span className="cmt-badge">Author</span> <time dateTime="2026-11-25">2 days ago</time></p>
          <p>Should the toast stay on screen longer when it contains an Undo button?</p>
          <p className="cmt-actions"><button type="button">Reply to Rosa</button><button type="button" aria-pressed="false">Like · 4</button></p>
          <article className="cmt reply">
            <span className="cmt-av alt" aria-hidden="true">TM</span>
            <div className="cmt-body">
              <p className="cmt-meta"><b>Tomás M.</b> <time dateTime="2026-11-26">1 day ago</time></p>
              <p>Yes. And pause the timer while it has focus or the pointer is over it, so nobody loses the undo.</p>
              <p className="cmt-actions"><button type="button">Reply to Tomás</button><button type="button" aria-pressed="false">Like · 9</button></p>
            </div>
          </article>
        </div>
      </article>
    </section>
  );
}
```

`CommentThread.css`

```css
/* tearsheet comment-thread v2d1de446 · https://qusaialjbali.github.io/tearsheet/zine/parts/comment-thread.html */
.comments { width: 100%; max-width: 520px; }
.cmt { display: grid; grid-template-columns: 36px 1fr; gap: 12px; }
.cmt.reply { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--ui-border); }
.cmt-av { display: grid; place-items: center; width: 36px; height: 36px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.cmt-av.alt { background: #0f766e; }
.cmt-body > p { margin: 0 0 6px; font-size: 14px; line-height: 1.55; }
.cmt-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 13px !important; color: var(--ui-muted); }
.cmt-meta b { color: var(--ui-text); }
.cmt-badge { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px; }
.cmt-actions { display: flex; gap: 4px; }
.cmt-actions button { padding: 4px 8px; margin-left: -8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer; }
.cmt-actions button + button { margin-left: 0; }
.cmt-actions button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.cmt-actions button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
```

## Vue

`CommentThread.vue`

```vue
<!-- tearsheet comment-thread v2d1de446 · https://qusaialjbali.github.io/tearsheet/zine/parts/comment-thread.html -->
<template>
  <section class="comments" aria-label="Comments">
    <article class="cmt">
      <span class="cmt-av" aria-hidden="true">RK</span>
      <div class="cmt-body">
        <p class="cmt-meta"><b>Rosa K.</b> <span class="cmt-badge">Author</span> <time datetime="2026-11-25">2 days ago</time></p>
        <p>Should the toast stay on screen longer when it contains an Undo button?</p>
        <p class="cmt-actions"><button type="button">Reply to Rosa</button><button type="button" aria-pressed="false">Like · 4</button></p>
        <article class="cmt reply">
          <span class="cmt-av alt" aria-hidden="true">TM</span>
          <div class="cmt-body">
            <p class="cmt-meta"><b>Tomás M.</b> <time datetime="2026-11-26">1 day ago</time></p>
            <p>Yes. And pause the timer while it has focus or the pointer is over it, so nobody loses the undo.</p>
            <p class="cmt-actions"><button type="button">Reply to Tomás</button><button type="button" aria-pressed="false">Like · 9</button></p>
          </div>
        </article>
      </div>
    </article>
  </section>
</template>

<style scoped>
.comments { width: 100%; max-width: 520px; }
.cmt { display: grid; grid-template-columns: 36px 1fr; gap: 12px; }
.cmt.reply { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--ui-border); }
.cmt-av { display: grid; place-items: center; width: 36px; height: 36px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.cmt-av.alt { background: #0f766e; }
.cmt-body > p { margin: 0 0 6px; font-size: 14px; line-height: 1.55; }
.cmt-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 13px !important; color: var(--ui-muted); }
.cmt-meta b { color: var(--ui-text); }
.cmt-badge { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px; }
.cmt-actions { display: flex; gap: 4px; }
.cmt-actions button { padding: 4px 8px; margin-left: -8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer; }
.cmt-actions button + button { margin-left: 0; }
.cmt-actions button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.cmt-actions button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```

## Svelte

`CommentThread.svelte`

```svelte
<!-- tearsheet comment-thread v2d1de446 · https://qusaialjbali.github.io/tearsheet/zine/parts/comment-thread.html -->
<section class="comments" aria-label="Comments">
  <article class="cmt">
    <span class="cmt-av" aria-hidden="true">RK</span>
    <div class="cmt-body">
      <p class="cmt-meta"><b>Rosa K.</b> <span class="cmt-badge">Author</span> <time datetime="2026-11-25">2 days ago</time></p>
      <p>Should the toast stay on screen longer when it contains an Undo button?</p>
      <p class="cmt-actions"><button type="button">Reply to Rosa</button><button type="button" aria-pressed="false">Like · 4</button></p>
      <article class="cmt reply">
        <span class="cmt-av alt" aria-hidden="true">TM</span>
        <div class="cmt-body">
          <p class="cmt-meta"><b>Tomás M.</b> <time datetime="2026-11-26">1 day ago</time></p>
          <p>Yes. And pause the timer while it has focus or the pointer is over it, so nobody loses the undo.</p>
          <p class="cmt-actions"><button type="button">Reply to Tomás</button><button type="button" aria-pressed="false">Like · 9</button></p>
        </div>
      </article>
    </div>
  </article>
</section>

<style>
.comments { width: 100%; max-width: 520px; }
.cmt { display: grid; grid-template-columns: 36px 1fr; gap: 12px; }
.cmt.reply { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--ui-border); }
.cmt-av { display: grid; place-items: center; width: 36px; height: 36px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.cmt-av.alt { background: #0f766e; }
.cmt-body > p { margin: 0 0 6px; font-size: 14px; line-height: 1.55; }
.cmt-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 13px !important; color: var(--ui-muted); }
.cmt-meta b { color: var(--ui-text); }
.cmt-badge { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 999px; }
.cmt-actions { display: flex; gap: 4px; }
.cmt-actions button { padding: 4px 8px; margin-left: -8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer; }
.cmt-actions button + button { margin-left: 0; }
.cmt-actions button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.cmt-actions button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
</style>
```
