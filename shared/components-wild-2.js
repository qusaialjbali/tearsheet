/* Tearsheet — more experiments. Still keyboard-operable and reduced-motion aware. */
(function () {
  const W = 'Experimental';
  const REDUCE = "const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;";

  window.COMPONENTS.push(
    /* ───────── Physics tags ───────── */
    {
      id: 'physics-tags',
      name: 'Throwable tags',
      category: W,
      wild: true,
      description: 'Tags fall into a box under gravity. Grab one, fling it, and watch the pile settle.',
      notes: 'The tags are a real list, so screen readers just read the words. “Shake” gives keyboard and touch users the same fun. With reduced motion the tags simply sit in a tidy row.',
      minHeight: 380,
      root: '.phys',
      html: `<div class="phys">
  <ul class="phys-box" aria-label="Topics">
    <li>HTML</li><li>CSS</li><li>React</li><li>Vue</li><li>Svelte</li><li>a11y</li><li>tokens</li><li>dark mode</li><li>free</li><li>zine</li>
  </ul>
  <button class="phys-shake" type="button">Shake the box</button>
</div>`,
      css: `.phys { display: grid; justify-items: center; gap: 12px; width: 100%; max-width: 460px; }
.phys-box {
  position: relative; width: 100%; height: 280px; margin: 0; padding: 0; list-style: none; overflow: hidden;
  background: var(--ui-surface); border: 2px solid var(--ui-border-strong); border-radius: var(--ui-radius);
  touch-action: none;
}
.phys-box li {
  position: absolute; left: 0; top: 0; padding: 8px 16px;
  font-size: 15px; font-weight: 700; white-space: nowrap; user-select: none; cursor: grab;
  color: var(--ui-accent-text); background: var(--ui-accent); border-radius: 999px;
  will-change: transform;
}
.phys-box li:nth-child(3n) { color: #fff; background: #db2777; }
.phys-box li:nth-child(3n + 1) { color: #fff; background: #0f766e; }
.phys-box li.is-held { cursor: grabbing; box-shadow: 0 10px 20px rgb(0 0 0 / 0.25); }
.phys.is-static .phys-box { display: flex; flex-wrap: wrap; align-content: flex-end; gap: 6px; padding: 10px; }
.phys.is-static .phys-box li { position: static; }
.phys-shake { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 600; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.phys-shake:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
      setup: `${REDUCE}
const box = root.querySelector('.phys-box');
const shake = root.querySelector('.phys-shake');
if (reduce) { root.classList.add('is-static'); return; }
const G = 0.45, BOUNCE = 0.35, FRICTION = 0.985;
const bodies = [...box.children].map((el, i) => ({
  el, w: el.offsetWidth, h: el.offsetHeight,
  x: 20 + ((i * 67) % Math.max(1, box.clientWidth - 120)), y: -60 - i * 50, vx: (Math.random() - 0.5) * 4, vy: 0,
}));
let held = null, last = null, raf = 0, still = 0;

const step = () => {
  const W = box.clientWidth, H = box.clientHeight;
  let energy = 0;
  bodies.forEach((b) => {
    if (b === held) return;
    b.vy += G; b.vx *= FRICTION; b.x += b.vx; b.y += b.vy;
    if (b.y + b.h > H) { b.y = H - b.h; b.vy *= -BOUNCE; b.vx *= 0.9; }
    if (b.x < 0) { b.x = 0; b.vx *= -BOUNCE; }
    if (b.x + b.w > W) { b.x = W - b.w; b.vx *= -BOUNCE; }
  });
  // separate overlapping tags along the shallower axis
  for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
    const a = bodies[i], b = bodies[j];
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ox <= 0 || oy <= 0) continue;
    const ma = a === held ? 0 : 1, mb = b === held ? 0 : 1;
    if (!ma && !mb) continue;
    const share = (m, n) => (m / (m + n || 1));
    if (oy < ox) {
      const dir = a.y < b.y ? -1 : 1;
      a.y += dir * oy * share(ma, mb); b.y -= dir * oy * share(mb, ma);
      const v = (a.vy + b.vy) / 2; if (ma) a.vy = v * 0.6; if (mb) b.vy = v * 0.6;
    } else {
      const dir = a.x < b.x ? -1 : 1;
      a.x += dir * ox * share(ma, mb); b.x -= dir * ox * share(mb, ma);
      const v = (a.vx + b.vx) / 2; if (ma) a.vx = v; if (mb) b.vx = v;
    }
  }
  bodies.forEach((b) => {
    energy += Math.abs(b.vx) + Math.abs(b.vy);
    const tilt = Math.max(-25, Math.min(25, b.vx * 3));
    b.el.style.transform = 'translate(' + b.x + 'px, ' + b.y + 'px) rotate(' + tilt + 'deg)';
  });
  still = energy < 0.6 && !held ? still + 1 : 0;
  raf = still > 40 ? 0 : requestAnimationFrame(step);
};
const wake = () => { still = 0; if (!raf) raf = requestAnimationFrame(step); };
const point = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
const onDown = (e) => {
  const b = bodies.find((x) => x.el === e.target.closest('li'));
  if (!b) return;
  held = b; last = point(e); b.vx = b.vy = 0;
  b.el.classList.add('is-held');
  box.setPointerCapture(e.pointerId);
  wake();
};
const onMove = (e) => {
  if (!held) return;
  const p = point(e);
  held.vx = p.x - last.x; held.vy = p.y - last.y;
  held.x += held.vx; held.y += held.vy;
  last = p;
};
const onUp = () => { if (!held) return; held.el.classList.remove('is-held'); held = null; wake(); };
const onShake = () => { bodies.forEach((b) => { b.vx += (Math.random() - 0.5) * 18; b.vy -= 8 + Math.random() * 10; }); wake(); };

box.addEventListener('pointerdown', onDown);
box.addEventListener('pointermove', onMove);
box.addEventListener('pointerup', onUp);
box.addEventListener('pointercancel', onUp);
shake.addEventListener('click', onShake);
wake();
return () => {
  cancelAnimationFrame(raf);
  box.removeEventListener('pointerdown', onDown);
  box.removeEventListener('pointermove', onMove);
  box.removeEventListener('pointerup', onUp);
  box.removeEventListener('pointercancel', onUp);
  shake.removeEventListener('click', onShake);
};`,
    },

    /* ───────── Gooey toggle ───────── */
    {
      id: 'gooey-toggle',
      name: 'Gooey switch',
      category: W,
      wild: true,
      description: 'A switch whose knob stretches like liquid as it slides, made with an SVG goo filter and zero JavaScript.',
      notes: 'Underneath it is a native checkbox with role="switch", so keyboard, forms and screen readers work as normal. The goo is two blobs, one lagging behind the other, melted together by the filter.',
      html: `<label class="goo">
  <input type="checkbox" role="switch" checked>
  <span class="goo-track" aria-hidden="true"><span class="goo-blobs"><i></i><i></i></span></span>
  <span class="goo-text">Airplane mode</span>
  <svg class="goo-defs" aria-hidden="true" focusable="false"><filter id="goo-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="3.5"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/></filter></svg>
</label>`,
      css: `.goo { display: inline-flex; align-items: center; gap: 14px; font-size: 16px; font-weight: 600; cursor: pointer; }
.goo input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.goo-defs { position: absolute; width: 0; height: 0; }
.goo-track { position: relative; width: 76px; height: 40px; border-radius: 999px; background: var(--ui-border-strong); transition: background-color 0.3s; }
.goo-blobs { position: absolute; inset: 0; filter: url(#goo-filter); }
.goo-blobs i { position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; background: #fff; transition: transform 0.35s cubic-bezier(0.5, 0, 0.3, 1); }
.goo-blobs i + i { transition-duration: 0.6s; }
.goo input:checked + .goo-track { background: var(--ui-accent); }
.goo input:checked + .goo-track i { transform: translateX(36px); }
.goo input:focus-visible + .goo-track { box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .goo-blobs i { transition-duration: 0.01s !important; } }`,
    },

    /* ───────── Slot machine ───────── */
    {
      id: 'slot-machine',
      name: 'Idea slot machine',
      category: W,
      wild: true,
      description: 'Three reels spin and land one by one on a random brief: a mood, a colour and a component to build.',
      notes: 'The result is written to a live region once the last reel stops. Reduced motion skips the spin and shows the result straight away.',
      root: '.slots',
      html: `<div class="slots">
  <div class="slots-window" aria-hidden="true">
    <div class="reel" data-words="Calm|Loud|Tiny|Wild|Polite|Moody"></div>
    <div class="reel" data-words="pink|blue|ink|lime|amber|violet"></div>
    <div class="reel" data-words="button|modal|chart|toast|menu|card"></div>
  </div>
  <p class="slots-result" aria-live="polite">Pull for a brief</p>
  <button class="slots-pull" type="button">Spin</button>
</div>`,
      css: `.slots { display: grid; justify-items: center; gap: 14px; }
.slots-window { display: flex; gap: 6px; padding: 10px; background: #1b1b20; border-radius: 16px; box-shadow: inset 0 3px 8px rgb(0 0 0 / 0.5); }
.reel { width: 110px; height: 56px; overflow: hidden; background: #fafaf7; border-radius: 8px; box-shadow: inset 0 10px 10px -8px rgb(0 0 0 / 0.4), inset 0 -10px 10px -8px rgb(0 0 0 / 0.4); }
.reel span { display: grid; place-items: center; height: 56px; font-size: 20px; font-weight: 800; color: #1b1b20; }
.slots-result { margin: 0; min-height: 1.5em; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.slots-pull { min-width: 120px; padding: 12px 24px; font: inherit; font-size: 15px; font-weight: 800; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 999px; cursor: pointer; box-shadow: 0 4px 0 var(--ui-accent-hover); }
.slots-pull:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ui-accent-hover); }
.slots-pull:disabled { opacity: 0.6; cursor: default; }
.slots-pull:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
      setup: `${REDUCE}
const reels = [...root.querySelectorAll('.reel')];
const result = root.querySelector('.slots-result');
const pull = root.querySelector('.slots-pull');
const H = 56, LOOPS = 5;
const words = reels.map((r) => r.dataset.words.split('|'));
// each reel gets a long strip of its words, repeated so it can spin several loops
const tracks = reels.map((r, i) => {
  const strip = document.createElement('div');
  for (let n = 0; n < LOOPS + 1; n++) words[i].forEach((w) => { const s = document.createElement('span'); s.textContent = w; strip.append(s); });
  r.replaceChildren(strip);
  return strip;
});
let timers = [];
const onPull = () => {
  pull.disabled = true;
  result.textContent = 'Spinning…';
  const picks = words.map((w) => Math.floor(Math.random() * w.length));
  tracks.forEach((t, i) => {
    t.style.transition = 'none';
    t.style.transform = 'translateY(0)';
    void t.offsetHeight;
    const target = (LOOPS * words[i].length + picks[i]) * H;
    t.style.transition = reduce ? 'none' : 'transform ' + (1.2 + i * 0.45) + 's cubic-bezier(0.16, 1, 0.3, 1)';
    t.style.transform = 'translateY(' + -target + 'px)';
  });
  timers.push(setTimeout(() => {
    result.textContent = picks.map((p, i) => words[i][p]).join(' ') + '. Go build it.';
    pull.disabled = false;
  }, reduce ? 0 : 1250 + 2 * 450));
};
pull.addEventListener('click', onPull);
return () => { timers.forEach(clearTimeout); pull.removeEventListener('click', onPull); };`,
    },

    /* ───────── Typewriter terminal ───────── */
    {
      id: 'typewriter-terminal',
      name: 'Typewriter terminal',
      category: W,
      wild: true,
      description: 'A terminal window that types out a short session line by line, with a blinking caret and a replay.',
      notes: 'The full transcript is real text for screen readers from the start; only the visual copy is typed. Reduced motion shows it all at once.',
      root: '.term',
      html: `<figure class="term">
  <div class="term-bar" aria-hidden="true"><i></i><i></i><i></i><span>zsh</span></div>
  <pre class="term-sr">$ npx tearsheet add modal
Fetched modal (HTML, React, Vue, Svelte)
$ open Modal.jsx
Done. No install needed, honestly.</pre>
  <pre class="term-screen" aria-hidden="true"></pre>
  <button class="term-replay" type="button">Replay</button>
</figure>`,
      css: `.term { width: 100%; max-width: 460px; margin: 0; overflow: hidden; background: #0f1115; border-radius: 12px; box-shadow: 0 18px 40px -16px rgb(0 0 0 / 0.5); }
.term-bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: #1b1e25; }
.term-bar i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.term-bar i:nth-child(2) { background: #febc2e; }
.term-bar i:nth-child(3) { background: #28c840; }
.term-bar span { margin-left: auto; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #9ca3af; }
.term-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.term-screen { min-height: 120px; margin: 0; padding: 16px; font-family: ui-monospace, Consolas, monospace; font-size: 14px; line-height: 1.7; color: #e5e7eb; white-space: pre-wrap; }
.term-screen .cmd { color: #86efac; }
.term-caret { display: inline-block; width: 8px; height: 1.1em; margin-left: 1px; vertical-align: -2px; background: #e5e7eb; animation: term-blink 1s steps(1) infinite; }
@keyframes term-blink { 50% { opacity: 0; } }
.term-replay { display: block; margin: 0 16px 14px auto; padding: 6px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e5e7eb; background: #262a33; border: 0; border-radius: 6px; cursor: pointer; }
.term-replay:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }
@media (prefers-reduced-motion: reduce) { .term-caret { animation: none; } }`,
      setup: `${REDUCE}
const lines = root.querySelector('.term-sr').textContent.split('\\n');
const screen = root.querySelector('.term-screen');
const replay = root.querySelector('.term-replay');
let timer;
const caret = () => { const c = document.createElement('span'); c.className = 'term-caret'; return c; };
const render = (upTo) => {
  screen.replaceChildren();
  let left = upTo;
  for (const line of lines) {
    if (left <= 0) break;
    const shown = line.slice(0, left);
    left -= line.length + 1;
    const span = document.createElement('span');
    if (line.startsWith('$')) span.className = 'cmd';
    span.textContent = shown;
    screen.append(span, left > 0 ? '\\n' : '');
  }
  screen.append(caret());
};
const total = lines.join('\\n').length;
const play = () => {
  clearTimeout(timer);
  if (reduce) return render(total);
  let i = 0;
  const tick = () => {
    render(++i);
    if (i < total) timer = setTimeout(tick, lines.join('\\n')[i - 1] === '\\n' ? 380 : 28 + Math.random() * 40);
  };
  tick();
};
replay.addEventListener('click', play);
play();
return () => { clearTimeout(timer); replay.removeEventListener('click', play); };`,
    },

    /* ───────── Vinyl player ───────── */
    {
      id: 'vinyl-player',
      name: 'Vinyl player',
      category: W,
      wild: true,
      description: 'A record player UI: press play and the record spins, the tonearm drops and the track time runs.',
      notes: 'The play button is a real toggle (aria-pressed) and the time is a progress bar. This demo simulates playback; connect it to an <audio> element’s play(), pause() and timeupdate to make it real.',
      root: '.vinyl',
      html: `<div class="vinyl">
  <div class="vinyl-deck" aria-hidden="true">
    <div class="vinyl-record"><div class="vinyl-label">SIDE A</div></div>
    <div class="vinyl-arm"></div>
  </div>
  <div class="vinyl-info">
    <p class="vinyl-title">Overprint</p>
    <p class="vinyl-artist">The Two Inks</p>
    <div class="vinyl-bar" role="progressbar" aria-label="Track position" aria-valuemin="0" aria-valuemax="204" aria-valuenow="0" aria-valuetext="0:00 of 3:24"><span></span></div>
    <p class="vinyl-time"><span class="vinyl-now">0:00</span><span>3:24</span></p>
    <button class="vinyl-play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 20 20" aria-hidden="true"><path class="ic-play" d="M6 4v12l10-6Z"/><path class="ic-pause" d="M5 4h3.5v12H5ZM11.5 4H15v12h-3.5Z"/></svg></button>
  </div>
</div>`,
      css: `.vinyl { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 20px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 18px; }
.vinyl-deck { position: relative; width: 190px; height: 190px; }
.vinyl-record {
  display: grid; place-items: center; width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, transparent 0 30%, #111 31%), repeating-radial-gradient(circle, #1a1a1a 0 2px, #0b0b0b 2px 4px);
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.35);
  animation: vinyl-spin 1.8s linear infinite; animation-play-state: paused;
}
.vinyl-label { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; font-size: 12px; font-weight: 800; letter-spacing: 0.02em; color: #1b1b20; background: radial-gradient(circle, #1b1b20 0 3px, #ff48b0 4px); }
.vinyl-arm { position: absolute; top: -6px; right: -6px; width: 10px; height: 120px; border-radius: 6px; background: linear-gradient(#cfd0d4, #8f9096); transform-origin: 50% 8px; transform: rotate(-8deg); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.vinyl-arm::after { content: ""; position: absolute; bottom: -4px; left: -4px; width: 18px; height: 22px; border-radius: 4px; background: #3a3a40; }
.vinyl.is-playing .vinyl-record { animation-play-state: running; }
.vinyl.is-playing .vinyl-arm { transform: rotate(22deg); }
@keyframes vinyl-spin { to { transform: rotate(360deg); } }
.vinyl-info { width: 200px; }
.vinyl-info p { margin: 0; }
.vinyl-title { font-size: 20px; font-weight: 800; }
.vinyl-artist { margin-bottom: 14px !important; color: var(--ui-muted); }
.vinyl-bar { height: 6px; background: var(--ui-surface-2); border-radius: 999px; overflow: hidden; }
.vinyl-bar span { display: block; height: 100%; width: 0; background: var(--ui-accent); }
.vinyl-time { display: flex; justify-content: space-between; margin: 6px 0 12px !important; font-size: 12px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.vinyl-play { display: grid; place-items: center; width: 52px; height: 52px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.vinyl-play svg { width: 22px; height: 22px; fill: currentColor; }
.vinyl-play .ic-pause, .vinyl-play[aria-pressed="true"] .ic-play { display: none; }
.vinyl-play[aria-pressed="true"] .ic-pause { display: block; }
.vinyl-play:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .vinyl-record { animation: none; } .vinyl-arm { transition: none; } }`,
      setup: `const play = root.querySelector('.vinyl-play');
const bar = root.querySelector('.vinyl-bar');
const fill = bar.querySelector('span');
const now = root.querySelector('.vinyl-now');
const LENGTH = 204;
let t = 0, timer;
const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
const render = () => {
  fill.style.width = (t / LENGTH) * 100 + '%';
  now.textContent = fmt(t);
  bar.setAttribute('aria-valuenow', Math.floor(t));
  bar.setAttribute('aria-valuetext', fmt(t) + ' of ' + fmt(LENGTH));
};
const toggle = () => {
  const on = play.getAttribute('aria-pressed') !== 'true';
  play.setAttribute('aria-pressed', String(on));
  play.setAttribute('aria-label', on ? 'Pause' : 'Play');
  root.classList.toggle('is-playing', on);
  clearInterval(timer);
  // swap this simulated clock for audio.play() / audio.pause() and the timeupdate event
  if (on) timer = setInterval(() => { t = (t + 1) % LENGTH; render(); }, 1000);
};
play.addEventListener('click', toggle);
render();
return () => { clearInterval(timer); play.removeEventListener('click', toggle); };`,
    },

    /* ───────── Ink bleed menu ───────── */
    {
      id: 'ink-bleed',
      name: 'Ink bleed menu',
      category: W,
      wild: true,
      description: 'Menu items flood with ink from exactly where your pointer enters, like a drop on blotting paper.',
      notes: 'The ink is a clip-path circle that grows from the pointer’s entry point; keyboard focus floods from the centre. The link text flips colour with it, so contrast holds the whole way.',
      root: '.bleed',
      html: `<nav class="bleed" aria-label="Sections">
  <a href="#"><span>Work</span></a>
  <a href="#"><span>Studio</span></a>
  <a href="#"><span>Journal</span></a>
  <a href="#"><span>Contact</span></a>
</nav>`,
      css: `.bleed { display: grid; width: 100%; max-width: 380px; border-top: 2px solid var(--ui-text); }
.bleed a {
  --x: 50%; --y: 50%;
  position: relative; display: block; overflow: hidden; padding: 16px 18px;
  font-size: clamp(22px, 4vw, 30px); font-weight: 800; letter-spacing: -0.02em; text-decoration: none;
  color: var(--ui-text); border-bottom: 2px solid var(--ui-text);
}
.bleed a::before {
  content: ""; position: absolute; inset: 0; background: var(--ui-text);
  clip-path: circle(0% at var(--x) var(--y)); transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.bleed a span { position: relative; transition: color 0.25s; }
.bleed a:hover::before, .bleed a:focus-visible::before { clip-path: circle(150% at var(--x) var(--y)); }
.bleed a:hover span, .bleed a:focus-visible span { color: var(--ui-bg); }
.bleed a:focus-visible { outline: none; }
@media (prefers-reduced-motion: reduce) { .bleed a::before { transition: none; } }`,
      setup: `const links = [...root.querySelectorAll('a')];
const onEnter = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px');
  e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px');
};
const onFocus = (e) => { e.currentTarget.style.setProperty('--x', '50%'); e.currentTarget.style.setProperty('--y', '50%'); };
links.forEach((a) => { a.addEventListener('pointerenter', onEnter); a.addEventListener('pointerleave', onEnter); a.addEventListener('focus', onFocus); });
return () => links.forEach((a) => { a.removeEventListener('pointerenter', onEnter); a.removeEventListener('pointerleave', onEnter); a.removeEventListener('focus', onFocus); });`,
    },

    /* ───────── Glitch text ───────── */
    {
      id: 'glitch-text',
      name: 'VHS glitch heading',
      category: W,
      wild: true,
      description: 'A heading that tears into red and cyan slices like a worn tape when you hover or press the button.',
      notes: 'The slices are pseudo-elements copying the text from data-text, so the heading is read once. It never glitches on its own, and reduced motion keeps it still.',
      root: '.glitch-demo',
      html: `<div class="glitch-demo">
  <h2 class="glitch" data-text="REWIND">REWIND</h2>
  <button class="glitch-btn" type="button">Glitch it</button>
</div>`,
      css: `.glitch-demo { display: grid; justify-items: center; gap: 14px; }
.glitch { position: relative; margin: 0; font-size: clamp(48px, 9vw, 84px); font-weight: 900; letter-spacing: 0.02em; color: var(--ui-text); }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.glitch::before { color: #ff2a6d; }
.glitch::after { color: #05d9e8; }
.glitch:hover::before, .glitch.is-on::before { opacity: 0.9; animation: glitch-a 0.6s steps(2) infinite; }
.glitch:hover::after, .glitch.is-on::after { opacity: 0.9; animation: glitch-b 0.5s steps(2) infinite; }
@keyframes glitch-a {
  0% { clip-path: inset(10% 0 70% 0); transform: translate(-6px, -2px); }
  33% { clip-path: inset(55% 0 20% 0); transform: translate(5px, 1px); }
  66% { clip-path: inset(30% 0 45% 0); transform: translate(-3px, 2px); }
  100% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -1px); }
}
@keyframes glitch-b {
  0% { clip-path: inset(65% 0 10% 0); transform: translate(6px, 2px); }
  50% { clip-path: inset(15% 0 60% 0); transform: translate(-5px, -2px); }
  100% { clip-path: inset(40% 0 35% 0); transform: translate(3px, 1px); }
}
.glitch-btn { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-text); background: var(--ui-surface); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); cursor: pointer; }
.glitch-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .glitch::before, .glitch::after { animation: none !important; opacity: 0 !important; } }`,
      setup: `const h = root.querySelector('.glitch');
const btn = root.querySelector('.glitch-btn');
let t;
const onClick = () => { h.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => h.classList.remove('is-on'), 900); };
btn.addEventListener('click', onClick);
return () => { clearTimeout(t); btn.removeEventListener('click', onClick); };`,
    },

    /* ───────── Ink trail ───────── */
    {
      id: 'ink-trail',
      name: 'Ink trail pad',
      category: W,
      wild: true,
      description: 'Move across the pad and leave a trail of ink dots that spread and fade like wet riso ink.',
      notes: 'Purely decorative, so the canvas is hidden from assistive tech and nothing depends on it. With reduced motion the dots stay put instead of spreading.',
      root: '.trail',
      html: `<figure class="trail">
  <canvas class="trail-canvas" aria-hidden="true"></canvas>
  <figcaption>Draw with your pointer or finger</figcaption>
</figure>`,
      css: `.trail { width: 100%; max-width: 460px; margin: 0; }
.trail-canvas { display: block; width: 100%; height: 240px; background: var(--ui-surface); border: 2px dashed var(--ui-border-strong); border-radius: var(--ui-radius); cursor: crosshair; touch-action: none; }
.trail figcaption { margin-top: 8px; text-align: center; font-size: 13px; color: var(--ui-muted); }`,
      setup: `${REDUCE}
const canvas = root.querySelector('canvas');
const ctx = canvas.getContext('2d');
const INKS = ['#ff48b0', '#0078bf'];
let dots = [], raf = 0, last = null;
const size = () => {
  const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  canvas.width = r.width * dpr; canvas.height = r.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};
const frame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'multiply';
  dots = dots.filter((d) => d.life > 0);
  dots.forEach((d) => {
    if (!reduce) { d.r += 0.25; d.life -= 0.012; }
    ctx.globalAlpha = Math.max(0, d.life) * 0.8;
    ctx.fillStyle = d.ink;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;
  raf = dots.length && !reduce ? requestAnimationFrame(frame) : 0;
};
const onMove = (e) => {
  const r = canvas.getBoundingClientRect();
  const p = { x: e.clientX - r.left, y: e.clientY - r.top };
  const dist = last ? Math.hypot(p.x - last.x, p.y - last.y) : 99;
  if (dist < 6) return;
  last = p;
  dots.push({ x: p.x, y: p.y, r: 3 + Math.random() * 4, life: 1, ink: INKS[dots.length % 2] });
  if (reduce) frame();
  else if (!raf) raf = requestAnimationFrame(frame);
};
const onLeave = () => (last = null);
size();
window.addEventListener('resize', size);
canvas.addEventListener('pointermove', onMove);
canvas.addEventListener('pointerleave', onLeave);
return () => {
  cancelAnimationFrame(raf);
  window.removeEventListener('resize', size);
  canvas.removeEventListener('pointermove', onMove);
  canvas.removeEventListener('pointerleave', onLeave);
};`,
    },

    /* ───────── Jelly button ───────── */
    {
      id: 'jelly-button',
      name: 'Jelly button',
      category: W,
      wild: true,
      description: 'A button that squashes and wobbles like jelly when you press it, then settles.',
      notes: 'The wobble plays after the click, never before, so it cannot delay the action. Reduced motion keeps a simple press state.',
      root: '.jelly-demo',
      html: `<div class="jelly-demo">
  <button class="jelly" type="button">Boing</button>
</div>`,
      css: `.jelly-demo { display: grid; place-items: center; padding: 20px; }
.jelly {
  padding: 18px 36px; font: inherit; font-size: 20px; font-weight: 900; letter-spacing: 0.02em;
  color: #1b1b20; background: #a3e635; border: 0; border-radius: 22px; cursor: pointer;
  box-shadow: 0 10px 0 -2px #65a30d, 0 18px 30px -10px rgb(0 0 0 / 0.35);
}
.jelly:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.jelly:active { transform: scale(0.96, 0.9); }
.jelly.is-wobbling { animation: jelly 0.7s both; }
@keyframes jelly {
  0% { transform: scale(1, 1); }
  25% { transform: scale(1.18, 0.82); }
  40% { transform: scale(0.88, 1.12); }
  55% { transform: scale(1.06, 0.94); }
  70% { transform: scale(0.97, 1.03); }
  85% { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); }
}
@media (prefers-reduced-motion: reduce) { .jelly.is-wobbling { animation: none; } }`,
      setup: `const btn = root.querySelector('.jelly');
const onClick = () => { btn.classList.remove('is-wobbling'); void btn.offsetWidth; btn.classList.add('is-wobbling'); };
const onEnd = () => btn.classList.remove('is-wobbling');
btn.addEventListener('click', onClick);
btn.addEventListener('animationend', onEnd);
return () => { btn.removeEventListener('click', onClick); btn.removeEventListener('animationend', onEnd); };`,
    },

    /* ───────── Flip cube tabs ───────── */
    {
      id: 'cube-tabs',
      name: 'Cube tabs',
      category: W,
      wild: true,
      description: 'Tabs where every panel is a face of a 3D cube that turns to show the one you pick.',
      notes: 'It is the standard tabs pattern (arrow keys, roving focus), so only the visible face is exposed; the other faces are inert. With reduced motion the cube snaps instead of turning.',
      minHeight: 360,
      root: '.cube',
      html: `<div class="cube">
  <div class="cube-tabs" role="tablist" aria-label="About the zine">
    <button role="tab" type="button" aria-selected="true" aria-controls="cf-0" id="ct-0">What</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-1" id="ct-1" tabindex="-1">Who</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-2" id="ct-2" tabindex="-1">How</button>
    <button role="tab" type="button" aria-selected="false" aria-controls="cf-3" id="ct-3" tabindex="-1">Why</button>
  </div>
  <div class="cube-scene">
    <div class="cube-body">
      <section class="cube-face f0" role="tabpanel" id="cf-0" aria-labelledby="ct-0"><b>What</b>Free interface parts, printed in four formats.</section>
      <section class="cube-face f1" role="tabpanel" id="cf-1" aria-labelledby="ct-1" inert><b>Who</b>Designers and developers, equally.</section>
      <section class="cube-face f2" role="tabpanel" id="cf-2" aria-labelledby="ct-2" inert><b>How</b>Pick a format, tear out the code, ship it.</section>
      <section class="cube-face f3" role="tabpanel" id="cf-3" aria-labelledby="ct-3" inert><b>Why</b>Because good defaults should be free.</section>
    </div>
  </div>
</div>`,
      css: `.cube { display: grid; justify-items: center; gap: 24px; }
.cube-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; max-width: 100%; padding: 4px; background: var(--ui-surface-2); border-radius: 22px; }
.cube-tabs button { padding: 8px 16px; font: inherit; font-size: 14px; font-weight: 700; color: var(--ui-muted); background: none; border: 0; border-radius: 999px; cursor: pointer; }
.cube-tabs button[aria-selected="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cube-tabs button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cube-scene { width: 200px; height: 200px; perspective: 700px; }
.cube-body { --turn: 0deg; position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: translateZ(-100px) rotateY(var(--turn)); transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.cube-face {
  position: absolute; inset: 0; display: grid; align-content: center; gap: 6px; padding: 22px;
  font-size: 15px; line-height: 1.35; color: #fff; border-radius: 14px; backface-visibility: hidden;
}
.cube-face b { font-size: 26px; }
.f0 { background: #4f46e5; transform: rotateY(0deg) translateZ(100px); }
.f1 { background: #db2777; transform: rotateY(90deg) translateZ(100px); }
.f2 { background: #0d9488; transform: rotateY(180deg) translateZ(100px); }
.f3 { background: #c2410c; transform: rotateY(270deg) translateZ(100px); }
@media (prefers-reduced-motion: reduce) { .cube-body { transition: none; } }`,
      setup: `const tabs = [...root.querySelectorAll('[role="tab"]')];
const faces = [...root.querySelectorAll('[role="tabpanel"]')];
const body = root.querySelector('.cube-body');
const select = (i, focus) => {
  tabs.forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; });
  faces.forEach((f, n) => (f.inert = n !== i));
  body.style.setProperty('--turn', -90 * i + 'deg');
  if (focus) tabs[i].focus();
};
const onClick = (e) => select(tabs.indexOf(e.currentTarget));
const onKey = (e) => {
  const i = tabs.indexOf(document.activeElement);
  const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (i < 0 || !d) return;
  e.preventDefault();
  select((i + d + tabs.length) % tabs.length, true);
};
tabs.forEach((t) => t.addEventListener('click', onClick));
root.addEventListener('keydown', onKey);
return () => { tabs.forEach((t) => t.removeEventListener('click', onClick)); root.removeEventListener('keydown', onKey); };`,
    }
  );
})();
