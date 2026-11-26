# Carousel (Tearsheet, Content)

A swipeable row of slides with previous/next buttons and a slide counter. It never auto-advances.

**Why it works:** Native scroll-snap does the swiping. Autoplay is deliberately absent: moving content people did not start is a WCAG failure and most visitors never see slide 3 anyway.

**Checked:** axe clean in light and dark; tightest text contrast 5.99:1 (needs 4.5:1); 3 tab stops; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html -->
<section class="carousel" aria-roledescription="carousel" aria-label="Three days in Lisbon">
  <div class="car-track" tabindex="0">
    <article class="car-slide" aria-roledescription="slide" aria-label="1 of 4"><p class="car-q">Day 1: ride tram 28 up to the castle before the crowds.</p><p class="car-who">Alfama · morning</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="2 of 4"><p class="car-q">Day 2: custard tarts in Belém, then the river walk back.</p><p class="car-who">Belém · all day</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="3 of 4"><p class="car-q">Day 3: a day trip to the palaces of Sintra.</p><p class="car-who">Sintra · 40 min by train</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="4 of 4"><p class="car-q">Last night: fado in a tiny restaurant, booked ahead.</p><p class="car-who">Bairro Alto · evening</p></article>
  </div>
  <div class="car-ctrl">
    <button class="car-btn" type="button" data-dir="-1" aria-label="Previous slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <span class="car-count" aria-live="polite">1 / 4</span>
    <button class="car-btn" type="button" data-dir="1" aria-label="Next slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
</section>
```

`styles.css`

```css
/* tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html */
.carousel { width: 100%; }
.car-track { display: grid; grid-auto-flow: column; grid-auto-columns: min(80%, 420px); gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 4px 4px 12px; scrollbar-width: none; }
.car-track::-webkit-scrollbar { display: none; }
.car-track:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: var(--ui-radius); }
.car-slide { scroll-snap-align: start; display: grid; align-content: space-between; min-height: 190px; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.car-slide:nth-child(odd) { background: var(--ui-accent-soft); border-color: transparent; }
.car-q { margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; }
.car-who { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
.car-ctrl { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 8px; }
.car-btn { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: 50%; cursor: pointer; }
.car-btn svg { width: 18px; height: 18px; }
.car-btn:disabled { opacity: 0.4; cursor: default; }
.car-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.car-count { min-width: 48px; text-align: center; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { .car-track { scroll-behavior: auto; } }
```

`script.js`

```js
/* tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html */
function setup(root) {
  const track = root.querySelector('.car-track');
  const slides = [...track.children];
  const [prev, next] = root.querySelectorAll('.car-btn');
  const count = root.querySelector('.car-count');
  const current = () => Math.round(track.scrollLeft / (slides[1].offsetLeft - slides[0].offsetLeft));
  const update = () => {
    const i = current();
    count.textContent = Math.min(i + 1, slides.length) + ' / ' + slides.length;
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  const go = (e) => {
    const i = Math.max(0, Math.min(slides.length - 1, current() + Number(e.currentTarget.dataset.dir)));
    track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft });
  };
  let t;
  const onScroll = () => { clearTimeout(t); t = setTimeout(update, 60); };
  prev.addEventListener('click', go);
  next.addEventListener('click', go);
  track.addEventListener('scroll', onScroll);
  update();
  return () => { prev.removeEventListener('click', go); next.removeEventListener('click', go); track.removeEventListener('scroll', onScroll); };
}

document.querySelectorAll(".carousel").forEach(setup);
```

## React

`Carousel.jsx`

```jsx
/* tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html */
import { useEffect, useRef } from 'react';
import './Carousel.css';

function setup(root) {
  const track = root.querySelector('.car-track');
  const slides = [...track.children];
  const [prev, next] = root.querySelectorAll('.car-btn');
  const count = root.querySelector('.car-count');
  const current = () => Math.round(track.scrollLeft / (slides[1].offsetLeft - slides[0].offsetLeft));
  const update = () => {
    const i = current();
    count.textContent = Math.min(i + 1, slides.length) + ' / ' + slides.length;
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  const go = (e) => {
    const i = Math.max(0, Math.min(slides.length - 1, current() + Number(e.currentTarget.dataset.dir)));
    track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft });
  };
  let t;
  const onScroll = () => { clearTimeout(t); t = setTimeout(update, 60); };
  prev.addEventListener('click', go);
  next.addEventListener('click', go);
  track.addEventListener('scroll', onScroll);
  update();
  return () => { prev.removeEventListener('click', go); next.removeEventListener('click', go); track.removeEventListener('scroll', onScroll); };
}

export function Carousel() {
  const ref = useRef(null);
  useEffect(() => setup(ref.current), []);

  return (
    <section ref={ref} className="carousel" aria-roledescription="carousel" aria-label="Three days in Lisbon">
      <div className="car-track" tabIndex={0}>
        <article className="car-slide" aria-roledescription="slide" aria-label="1 of 4"><p className="car-q">Day 1: ride tram 28 up to the castle before the crowds.</p><p className="car-who">Alfama · morning</p></article>
        <article className="car-slide" aria-roledescription="slide" aria-label="2 of 4"><p className="car-q">Day 2: custard tarts in Belém, then the river walk back.</p><p className="car-who">Belém · all day</p></article>
        <article className="car-slide" aria-roledescription="slide" aria-label="3 of 4"><p className="car-q">Day 3: a day trip to the palaces of Sintra.</p><p className="car-who">Sintra · 40 min by train</p></article>
        <article className="car-slide" aria-roledescription="slide" aria-label="4 of 4"><p className="car-q">Last night: fado in a tiny restaurant, booked ahead.</p><p className="car-who">Bairro Alto · evening</p></article>
      </div>
      <div className="car-ctrl">
        <button className="car-btn" type="button" data-dir="-1" aria-label="Previous slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <span className="car-count" aria-live="polite">1 / 4</span>
        <button className="car-btn" type="button" data-dir="1" aria-label="Next slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
    </section>
  );
}
```

`Carousel.css`

```css
/* tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html */
.carousel { width: 100%; }
.car-track { display: grid; grid-auto-flow: column; grid-auto-columns: min(80%, 420px); gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 4px 4px 12px; scrollbar-width: none; }
.car-track::-webkit-scrollbar { display: none; }
.car-track:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: var(--ui-radius); }
.car-slide { scroll-snap-align: start; display: grid; align-content: space-between; min-height: 190px; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.car-slide:nth-child(odd) { background: var(--ui-accent-soft); border-color: transparent; }
.car-q { margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; }
.car-who { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
.car-ctrl { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 8px; }
.car-btn { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: 50%; cursor: pointer; }
.car-btn svg { width: 18px; height: 18px; }
.car-btn:disabled { opacity: 0.4; cursor: default; }
.car-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.car-count { min-width: 48px; text-align: center; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { .car-track { scroll-behavior: auto; } }
```

## Vue

`Carousel.vue`

```vue
<!-- tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html -->
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const el = ref(null);
let cleanup;

function setup(root) {
  const track = root.querySelector('.car-track');
  const slides = [...track.children];
  const [prev, next] = root.querySelectorAll('.car-btn');
  const count = root.querySelector('.car-count');
  const current = () => Math.round(track.scrollLeft / (slides[1].offsetLeft - slides[0].offsetLeft));
  const update = () => {
    const i = current();
    count.textContent = Math.min(i + 1, slides.length) + ' / ' + slides.length;
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  const go = (e) => {
    const i = Math.max(0, Math.min(slides.length - 1, current() + Number(e.currentTarget.dataset.dir)));
    track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft });
  };
  let t;
  const onScroll = () => { clearTimeout(t); t = setTimeout(update, 60); };
  prev.addEventListener('click', go);
  next.addEventListener('click', go);
  track.addEventListener('scroll', onScroll);
  update();
  return () => { prev.removeEventListener('click', go); next.removeEventListener('click', go); track.removeEventListener('scroll', onScroll); };
}

onMounted(() => {
  cleanup = setup(el.value);
});
onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <section ref="el" class="carousel" aria-roledescription="carousel" aria-label="Three days in Lisbon">
    <div class="car-track" tabindex="0">
      <article class="car-slide" aria-roledescription="slide" aria-label="1 of 4"><p class="car-q">Day 1: ride tram 28 up to the castle before the crowds.</p><p class="car-who">Alfama · morning</p></article>
      <article class="car-slide" aria-roledescription="slide" aria-label="2 of 4"><p class="car-q">Day 2: custard tarts in Belém, then the river walk back.</p><p class="car-who">Belém · all day</p></article>
      <article class="car-slide" aria-roledescription="slide" aria-label="3 of 4"><p class="car-q">Day 3: a day trip to the palaces of Sintra.</p><p class="car-who">Sintra · 40 min by train</p></article>
      <article class="car-slide" aria-roledescription="slide" aria-label="4 of 4"><p class="car-q">Last night: fado in a tiny restaurant, booked ahead.</p><p class="car-who">Bairro Alto · evening</p></article>
    </div>
    <div class="car-ctrl">
      <button class="car-btn" type="button" data-dir="-1" aria-label="Previous slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <span class="car-count" aria-live="polite">1 / 4</span>
      <button class="car-btn" type="button" data-dir="1" aria-label="Next slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
  </section>
</template>

<!-- Not scoped: setup() creates elements at runtime that scoped styles would miss. -->
<style>
.carousel { width: 100%; }
.car-track { display: grid; grid-auto-flow: column; grid-auto-columns: min(80%, 420px); gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 4px 4px 12px; scrollbar-width: none; }
.car-track::-webkit-scrollbar { display: none; }
.car-track:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: var(--ui-radius); }
.car-slide { scroll-snap-align: start; display: grid; align-content: space-between; min-height: 190px; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.car-slide:nth-child(odd) { background: var(--ui-accent-soft); border-color: transparent; }
.car-q { margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; }
.car-who { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
.car-ctrl { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 8px; }
.car-btn { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: 50%; cursor: pointer; }
.car-btn svg { width: 18px; height: 18px; }
.car-btn:disabled { opacity: 0.4; cursor: default; }
.car-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.car-count { min-width: 48px; text-align: center; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { .car-track { scroll-behavior: auto; } }
</style>
```

## Svelte

`Carousel.svelte`

```svelte
<!-- tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html -->
<script>
  import { onMount } from 'svelte';
  import './Carousel.css';

  let node;

  function setup(root) {
    const track = root.querySelector('.car-track');
    const slides = [...track.children];
    const [prev, next] = root.querySelectorAll('.car-btn');
    const count = root.querySelector('.car-count');
    const current = () => Math.round(track.scrollLeft / (slides[1].offsetLeft - slides[0].offsetLeft));
    const update = () => {
      const i = current();
      count.textContent = Math.min(i + 1, slides.length) + ' / ' + slides.length;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    const go = (e) => {
      const i = Math.max(0, Math.min(slides.length - 1, current() + Number(e.currentTarget.dataset.dir)));
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft });
    };
    let t;
    const onScroll = () => { clearTimeout(t); t = setTimeout(update, 60); };
    prev.addEventListener('click', go);
    next.addEventListener('click', go);
    track.addEventListener('scroll', onScroll);
    update();
    return () => { prev.removeEventListener('click', go); next.removeEventListener('click', go); track.removeEventListener('scroll', onScroll); };
  }

  onMount(() => setup(node));
</script>

<section bind:this={node} class="carousel" aria-roledescription="carousel" aria-label="Three days in Lisbon">
  <div class="car-track" tabindex="0">
    <article class="car-slide" aria-roledescription="slide" aria-label="1 of 4"><p class="car-q">Day 1: ride tram 28 up to the castle before the crowds.</p><p class="car-who">Alfama · morning</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="2 of 4"><p class="car-q">Day 2: custard tarts in Belém, then the river walk back.</p><p class="car-who">Belém · all day</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="3 of 4"><p class="car-q">Day 3: a day trip to the palaces of Sintra.</p><p class="car-who">Sintra · 40 min by train</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="4 of 4"><p class="car-q">Last night: fado in a tiny restaurant, booked ahead.</p><p class="car-who">Bairro Alto · evening</p></article>
  </div>
  <div class="car-ctrl">
    <button class="car-btn" type="button" data-dir="-1" aria-label="Previous slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <span class="car-count" aria-live="polite">1 / 4</span>
    <button class="car-btn" type="button" data-dir="1" aria-label="Next slide"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
</section>
```

`Carousel.css`

```css
/* tearsheet carousel vb4b4594f · https://qusaialjbali.github.io/tearsheet/zine/parts/carousel.html */
.carousel { width: 100%; }
.car-track { display: grid; grid-auto-flow: column; grid-auto-columns: min(80%, 420px); gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 4px 4px 12px; scrollbar-width: none; }
.car-track::-webkit-scrollbar { display: none; }
.car-track:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: var(--ui-radius); }
.car-slide { scroll-snap-align: start; display: grid; align-content: space-between; min-height: 190px; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.car-slide:nth-child(odd) { background: var(--ui-accent-soft); border-color: transparent; }
.car-q { margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3; }
.car-who { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }
.car-ctrl { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 8px; }
.car-btn { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: 50%; cursor: pointer; }
.car-btn svg { width: 18px; height: 18px; }
.car-btn:disabled { opacity: 0.4; cursor: default; }
.car-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.car-count { min-width: 48px; text-align: center; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { .car-track { scroll-behavior: auto; } }
```
