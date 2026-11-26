/* Tearsheet — experimental components.
 * Playful, physical, a little unhinged, and still keyboard-operable and reduced-motion aware.
 * Every one uses `setup` + `root`, so core.js generates React, Vue and Svelte versions.
 */
(function () {
  const W = 'Experimental';
  const REDUCE = "const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;";

  window.COMPONENTS.push(
    /* ───────── Magnetic button ───────── */
    {
      id: 'magnetic-button',
      name: 'Magnetic button',
      category: W,
      wild: true,
      description: 'The button leans toward your cursor before you reach it, and its label lags behind for depth.',
      notes: 'The pull only starts inside the stage around the button, so it never chases people across the page. Motion is skipped entirely for reduced-motion users.',
      root: '.magnet-stage',
      html: `<div class="magnet-stage">
  <button class="magnet" type="button"><span class="magnet-label">Hover me</span></button>
</div>`,
      css: `.magnet-stage { display: inline-grid; place-items: center; padding: 56px; }
.magnet {
  display: grid;
  place-items: center;
  width: 148px;
  height: 148px;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.2);
  transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4), box-shadow 0.3s;
}
.magnet-label { display: block; transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4); }
.magnet:hover { box-shadow: 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 16px 40px rgb(0 0 0 / 0.28); }
.magnet:active { scale: 0.94; }`,
      setup: `${REDUCE}
if (reduce) return;
const button = root.querySelector('.magnet');
const label = root.querySelector('.magnet-label');

const move = (e) => {
  const r = button.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width / 2);
  const y = e.clientY - (r.top + r.height / 2);
  button.style.transform = 'translate(' + x * 0.35 + 'px, ' + y * 0.35 + 'px)';
  label.style.transform = 'translate(' + x * 0.15 + 'px, ' + y * 0.15 + 'px)';
};
const reset = () => {
  button.style.transform = '';
  label.style.transform = '';
};

root.addEventListener('pointermove', move);
root.addEventListener('pointerleave', reset);
return () => {
  root.removeEventListener('pointermove', move);
  root.removeEventListener('pointerleave', reset);
};`,
    },

    /* ───────── Split-flap display ───────── */
    {
      id: 'split-flap',
      name: 'Split-flap board',
      category: W,
      wild: true,
      description: 'An airport departures board: every letter clatters through the alphabet until it lands.',
      notes: 'Screen readers get the finished message once through a live region; the flipping cells are hidden from them. With reduced motion, letters swap instantly.',
      root: '.flap-board',
      html: `<div class="flap-board" data-words="FREE UI|SHIP IT|NO LOGIN|COPY ME">
  <p class="flap-row" aria-hidden="true"></p>
  <p class="flap-sr" aria-live="polite"></p>
  <button class="flap-next" type="button">Next message</button>
</div>`,
      css: `.flap-board {
  display: grid;
  justify-items: center;
  gap: 18px;
  padding: 26px 24px 22px;
  background: #121214;
  border-radius: 14px;
  box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.06), 0 12px 30px rgb(0 0 0 / 0.3);
}
.flap-row { display: flex; gap: 5px; margin: 0; perspective: 300px; }
.flap {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 62px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 36px;
  font-weight: 700;
  color: #f3f0e6;
  background: linear-gradient(#2a2a2e 50%, #232326 50%);
  border-radius: 5px;
  box-shadow: 0 2px 0 #000;
}
.flap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: #0a0a0b;
}
.flap.is-flip { animation: flap 0.09s ease-in; }
@keyframes flap {
  from { transform: rotateX(-70deg); filter: brightness(0.6); }
}
.flap-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.flap-next {
  padding: 8px 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #121214;
  background: #f5c518;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.flap-next:focus-visible { outline: 3px solid #f5c518; outline-offset: 3px; }
@media (max-width: 480px) {
  .flap { width: 30px; height: 44px; font-size: 24px; }
  .flap-row { gap: 3px; }
}`,
      setup: `${REDUCE}
const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const words = root.dataset.words.split('|');
const row = root.querySelector('.flap-row');
const sr = root.querySelector('.flap-sr');
const next = root.querySelector('.flap-next');
const length = Math.max(...words.map((w) => w.length));
let index = 0;
let timers = [];

row.textContent = '';
const cells = Array.from({ length }, () => {
  const cell = document.createElement('span');
  cell.className = 'flap';
  cell.textContent = ' ';
  row.append(cell);
  return cell;
});

const show = (word) => {
  sr.textContent = word;
  timers.forEach(clearInterval);
  timers = [];
  const target = word.padEnd(length, ' ');
  cells.forEach((cell, i) => {
    const goal = target[i];
    if (reduce) {
      cell.textContent = goal;
      return;
    }
    let pos = Math.max(0, CHARS.indexOf(cell.textContent));
    const t = setInterval(() => {
      if (cell.textContent === goal) return clearInterval(t);
      pos = (pos + 1) % CHARS.length;
      cell.textContent = CHARS[pos];
      cell.classList.remove('is-flip');
      void cell.offsetWidth;
      cell.classList.add('is-flip');
    }, 40 + i * 7);
    timers.push(t);
  });
};
const onNext = () => {
  index = (index + 1) % words.length;
  show(words[index]);
};

next.addEventListener('click', onNext);
show(words[0]);
return () => {
  timers.forEach(clearInterval);
  next.removeEventListener('click', onNext);
};`,
    },

    /* ───────── Odometer ───────── */
    {
      id: 'odometer',
      name: 'Odometer counter',
      category: W,
      wild: true,
      description: 'A mechanical counter whose digit wheels roll into place, each a beat after the last.',
      notes: 'The real number lives in a live region for assistive tech. Leading zeros are dimmed, like an old meter.',
      root: '.odo',
      html: `<div class="odo">
  <p class="odo-label">Tickets sold</p>
  <div class="odo-digits" aria-hidden="true"></div>
  <p class="odo-sr" aria-live="polite"></p>
  <div class="odo-actions">
    <button class="odo-btn" type="button" data-add="1">Sell 1</button>
    <button class="odo-btn" type="button" data-add="250">Sell 250</button>
  </div>
</div>`,
      css: `.odo { display: grid; justify-items: center; gap: 14px; }
.odo-label { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ui-muted); }
.odo-digits {
  display: flex;
  gap: 4px;
  padding: 10px;
  background: var(--ui-text);
  border-radius: 12px;
}
.odo-digit {
  height: 64px;
  width: 44px;
  overflow: hidden;
  background: var(--ui-bg);
  border-radius: 6px;
  box-shadow: inset 0 8px 10px -6px rgb(0 0 0 / 0.35), inset 0 -8px 10px -6px rgb(0 0 0 / 0.35);
}
.odo-digit.is-lead { opacity: 0.35; }
.odo-reel { display: grid; transition: transform 0.9s cubic-bezier(0.2, 0.85, 0.25, 1.05); }
.odo-reel span {
  display: grid;
  place-items: center;
  height: 64px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 38px;
  font-weight: 700;
  color: var(--ui-text);
}
.odo-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.odo-actions { display: flex; gap: 8px; }
.odo-btn {
  padding: 9px 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.odo-btn:hover { background: var(--ui-surface-2); }
.odo-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .odo-reel { transition: none; } }`,
      setup: `const digitsEl = root.querySelector('.odo-digits');
const sr = root.querySelector('.odo-sr');
const buttons = root.querySelectorAll('.odo-btn');
const PLACES = 6;
let value = 1287;

digitsEl.textContent = '';
const reels = Array.from({ length: PLACES }, (_, i) => {
  const digit = document.createElement('div');
  digit.className = 'odo-digit';
  const reel = document.createElement('div');
  reel.className = 'odo-reel';
  reel.style.transitionDelay = (PLACES - i) * 70 + 'ms';
  for (let n = 0; n < 10; n++) {
    const s = document.createElement('span');
    s.textContent = n;
    reel.append(s);
  }
  digit.append(reel);
  digitsEl.append(digit);
  return reel;
});

const render = () => {
  const text = String(value % 10 ** PLACES).padStart(PLACES, '0');
  const firstSignificant = text.search(/[1-9]/);
  reels.forEach((reel, i) => {
    reel.style.transform = 'translateY(' + -Number(text[i]) * 64 + 'px)';
    reel.parentElement.classList.toggle('is-lead', firstSignificant === -1 ? i < PLACES - 1 : i < firstSignificant);
  });
  sr.textContent = value.toLocaleString() + ' tickets sold';
};
const onAdd = (e) => {
  value += Number(e.currentTarget.dataset.add);
  render();
};

buttons.forEach((b) => b.addEventListener('click', onAdd));
render();
return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));`,
    },

    /* ───────── Holographic card ───────── */
    {
      id: 'holo-card',
      name: 'Holographic card',
      category: W,
      wild: true,
      description: 'A foil membership card that tilts in 3D and throws a moving rainbow sheen as you move across it.',
      notes: 'Keyboard users can tilt it with the arrow keys once it has focus. Reduced motion keeps a still foil and no tilt.',
      root: '.holo',
      html: `<div class="holo" tabindex="0" role="img" aria-label="Holographic membership card for Ada Lovelace, member number 000417">
  <div class="holo-shine" aria-hidden="true"></div>
  <div class="holo-chip" aria-hidden="true"></div>
  <p class="holo-brand" aria-hidden="true">TEARSHEET</p>
  <div class="holo-foot" aria-hidden="true">
    <p class="holo-name">Ada Lovelace</p>
    <p class="holo-meta">Member No. 000417</p>
  </div>
</div>`,
      css: `.holo {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  position: relative;
  width: 320px;
  aspect-ratio: 1.586;
  padding: 22px 24px;
  overflow: hidden;
  color: #fff;
  border-radius: 18px;
  background:
    radial-gradient(120% 120% at 0% 0%, #3b2a7a, transparent 60%),
    radial-gradient(120% 120% at 100% 100%, #0f6b78, transparent 60%),
    #17152b;
  box-shadow: 0 24px 50px -12px rgb(0 0 0 / 0.5);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: grab;
}
.holo.is-active { transition: transform 0.08s linear; }
.holo:focus-visible { outline: 3px solid var(--ui-accent); outline-offset: 4px; }
.holo-shine {
  position: absolute;
  inset: 0;
  mix-blend-mode: color-dodge;
  opacity: 0.55;
  background:
    radial-gradient(circle at var(--mx) var(--my), rgb(255 255 255 / 0.7), transparent 38%),
    linear-gradient(115deg, #ff3cac 0%, #f5d300 20%, #2bd2ff 40%, #8bff7a 60%, #ff3cac 80%, #f5d300 100%);
  background-size: 100% 100%, 300% 300%;
  background-position: center, var(--mx) var(--my);
  pointer-events: none;
}
.holo-chip {
  width: 44px;
  height: 34px;
  border-radius: 7px;
  background: linear-gradient(135deg, #f7e29b, #c9a24a);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.2);
}
.holo-brand { position: absolute; top: 22px; right: 24px; margin: 0; font-weight: 800; letter-spacing: 0.24em; font-size: 14px; }
.holo-foot { position: absolute; left: 24px; bottom: 20px; }
.holo-name { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.02em; }
.holo-meta { margin: 2px 0 0; font-size: 12px; opacity: 0.75; letter-spacing: 0.08em; font-variant-numeric: tabular-nums; }`,
      setup: `${REDUCE}
if (reduce) return;

const set = (px, py) => {
  root.style.setProperty('--ry', (px - 0.5) * 24 + 'deg');
  root.style.setProperty('--rx', (0.5 - py) * 24 + 'deg');
  root.style.setProperty('--mx', px * 100 + '%');
  root.style.setProperty('--my', py * 100 + '%');
};
let kx = 0.5;
let ky = 0.5;

const onMove = (e) => {
  const r = root.getBoundingClientRect();
  root.classList.add('is-active');
  set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
};
const onLeave = () => {
  root.classList.remove('is-active');
  set(0.5, 0.5);
};
const onKey = (e) => {
  const step = { ArrowLeft: [-0.1, 0], ArrowRight: [0.1, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1] }[e.key];
  if (!step) return;
  e.preventDefault();
  kx = Math.min(1, Math.max(0, kx + step[0]));
  ky = Math.min(1, Math.max(0, ky + step[1]));
  set(kx, ky);
};

root.addEventListener('pointermove', onMove);
root.addEventListener('pointerleave', onLeave);
root.addEventListener('keydown', onKey);
return () => {
  root.removeEventListener('pointermove', onMove);
  root.removeEventListener('pointerleave', onLeave);
  root.removeEventListener('keydown', onKey);
};`,
    },

    /* ───────── Scramble text ───────── */
    {
      id: 'scramble-text',
      name: 'Decoder text',
      category: W,
      wild: true,
      description: 'A headline that decrypts itself from noise, one letter locking in at a time.',
      notes: 'The real sentence sits in visually hidden text and the scrambled copy is aria-hidden, so screen readers never hear the noise. It plays on hover and on the button, never on its own loop.',
      root: '.decode',
      html: `<div class="decode">
  <p class="decode-text"><span class="decode-sr">Design is how it works</span><span class="decode-show" aria-hidden="true">Design is how it works</span></p>
  <button class="decode-btn" type="button">Decode again</button>
</div>`,
      css: `.decode { display: grid; justify-items: center; gap: 16px; }
.decode-text {
  margin: 0;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ui-text);
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  cursor: default;
}
.decode-noise { color: var(--ui-accent); }
.decode-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.decode-btn {
  padding: 8px 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: none;
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.decode-btn:hover { background: var(--ui-surface-2); }
.decode-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
      setup: `${REDUCE}
const GLYPHS = '!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ';
const textEl = root.querySelector('.decode-text');
const span = textEl.querySelector('.decode-show');
const button = root.querySelector('.decode-btn');
const text = span.textContent;
let raf;

const run = () => {
  if (reduce) return;
  cancelAnimationFrame(raf);
  let frame = 0;
  const tick = () => {
    const frag = document.createDocumentFragment();
    let done = true;
    [...text].forEach((ch, i) => {
      if (ch === ' ' || frame > i * 2 + 8) {
        frag.append(ch);
      } else {
        done = false;
        const noise = document.createElement('span');
        noise.className = 'decode-noise';
        noise.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        frag.append(noise);
      }
    });
    span.replaceChildren(frag);
    frame++;
    if (!done) raf = requestAnimationFrame(tick);
  };
  tick();
};

textEl.addEventListener('pointerenter', run);
button.addEventListener('click', run);
run();
return () => {
  cancelAnimationFrame(raf);
  textEl.removeEventListener('pointerenter', run);
  button.removeEventListener('click', run);
};`,
    },

    /* ───────── Hold to confirm ───────── */
    {
      id: 'hold-to-confirm',
      name: 'Hold to confirm',
      category: W,
      wild: true,
      description: 'A destructive button you have to press and hold, so a stray click can never delete anything.',
      notes: 'Works with mouse, touch, Space and Enter. Letting go early cancels. Tell people they need to hold, right next to the button.',
      root: '.hold-demo',
      html: `<div class="hold-demo">
  <button class="hold" type="button" aria-describedby="hold-hint">
    <span class="hold-fill" aria-hidden="true"></span>
    <span class="hold-label">Hold to delete</span>
  </button>
  <p class="hold-hint" id="hold-hint">Press and hold for 1.5 seconds</p>
</div>`,
      css: `.hold-demo { display: grid; justify-items: center; gap: 10px; }
.hold {
  position: relative;
  overflow: hidden;
  min-width: 220px;
  padding: 14px 24px;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  color: var(--ui-danger);
  background: var(--ui-danger-soft);
  border: 2px solid var(--ui-danger);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.hold:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.hold-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-danger);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-out;
}
.hold.is-holding .hold-fill { transform: scaleX(1); transition: transform 1.5s linear; }
.hold-label { position: relative; transition: color 0.2s; }
.hold.is-holding .hold-label, .hold.is-done .hold-label { color: var(--ui-danger-text); }
.hold.is-done .hold-fill { transform: scaleX(1); }
.hold.is-holding { animation: hold-shake 0.12s 1.1s 3; }
@keyframes hold-shake { 50% { translate: 2px 0; } }
.hold-hint { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .hold.is-holding { animation: none; } }`,
      setup: `const button = root.querySelector('.hold');
const label = root.querySelector('.hold-label');
const original = label.textContent;
let timer;
let resetTimer;

const start = () => {
  if (button.classList.contains('is-done')) return;
  button.classList.add('is-holding');
  timer = setTimeout(() => {
    button.classList.remove('is-holding');
    button.classList.add('is-done');
    label.textContent = 'Deleted';
    resetTimer = setTimeout(() => {
      button.classList.remove('is-done');
      label.textContent = original;
    }, 2200);
  }, 1500);
};
const cancel = () => {
  clearTimeout(timer);
  button.classList.remove('is-holding');
};
const onKeyDown = (e) => {
  if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
    e.preventDefault();
    start();
  }
};
const onKeyUp = (e) => {
  if (e.key === ' ' || e.key === 'Enter') cancel();
};

button.addEventListener('pointerdown', start);
button.addEventListener('pointerup', cancel);
button.addEventListener('pointerleave', cancel);
button.addEventListener('keydown', onKeyDown);
button.addEventListener('keyup', onKeyUp);
return () => {
  clearTimeout(timer);
  clearTimeout(resetTimer);
  button.removeEventListener('pointerdown', start);
  button.removeEventListener('pointerup', cancel);
  button.removeEventListener('pointerleave', cancel);
  button.removeEventListener('keydown', onKeyDown);
  button.removeEventListener('keyup', onKeyUp);
};`,
    },

    /* ───────── Elastic string slider ───────── */
    {
      id: 'string-slider',
      name: 'Elastic string slider',
      category: W,
      wild: true,
      description: 'A slider drawn as a guitar string: drag the thumb up or down and it bends, let go and it twangs back.',
      notes: 'A real range input sits on top, so arrow keys, screen readers and forms all work. Keyboard changes give the string a small pluck; reduced motion keeps it straight.',
      root: '.string',
      html: `<div class="string">
  <div class="string-head">
    <label for="tension">Tension</label>
    <output class="string-value" for="tension">50</output>
  </div>
  <div class="string-track">
    <svg class="string-svg" aria-hidden="true"><path class="string-path"/></svg>
    <input class="string-input" id="tension" type="range" min="0" max="100" value="50">
    <span class="string-thumb" aria-hidden="true"></span>
  </div>
</div>`,
      css: `.string { width: 100%; max-width: 420px; }
.string-head { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.string-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.string-track { position: relative; height: 90px; }
.string-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.string-path { fill: none; stroke: var(--ui-text); stroke-width: 2.5; stroke-linecap: round; }
.string-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: grab;
}
.string-input:active { cursor: grabbing; }
.string-thumb {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border-radius: 50%;
  background: var(--ui-accent);
  border: 3px solid var(--ui-bg);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
  pointer-events: none;
}
.string-input:focus-visible ~ .string-thumb { box-shadow: var(--ui-focus), 0 2px 8px rgb(0 0 0 / 0.3); }`,
      setup: `${REDUCE}
const input = root.querySelector('.string-input');
const output = root.querySelector('.string-value');
const track = root.querySelector('.string-track');
const path = root.querySelector('.string-path');
const thumb = root.querySelector('.string-thumb');
let bend = 0;
let velocity = 0;
let dragging = false;
let raf;

const pad = 12;
const draw = () => {
  const w = track.clientWidth;
  const h = track.clientHeight;
  const mid = h / 2;
  const pct = (input.value - input.min) / (input.max - input.min);
  const x = pad + pct * (w - pad * 2);
  const y = mid + bend;
  path.setAttribute('d', 'M' + pad + ' ' + mid + ' Q' + (pad + x) / 2 + ' ' + y + ' ' + x + ' ' + y + ' Q' + (x + w - pad) / 2 + ' ' + y + ' ' + (w - pad) + ' ' + mid);
  thumb.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  output.textContent = input.value;
};
const spring = () => {
  cancelAnimationFrame(raf);
  const step = () => {
    velocity = (velocity - bend * 0.18) * 0.86;
    bend += velocity;
    draw();
    if (Math.abs(bend) > 0.2 || Math.abs(velocity) > 0.2) raf = requestAnimationFrame(step);
    else {
      bend = 0;
      draw();
    }
  };
  raf = requestAnimationFrame(step);
};
const onDown = () => {
  dragging = true;
  cancelAnimationFrame(raf);
};
const onMove = (e) => {
  if (!dragging || reduce) return;
  const r = track.getBoundingClientRect();
  bend = Math.max(-34, Math.min(34, e.clientY - (r.top + r.height / 2)));
  draw();
};
const onUp = () => {
  if (!dragging) return;
  dragging = false;
  if (!reduce) spring();
};
const onKey = () => {
  if (reduce) return;
  velocity = 7;
  spring();
};

input.addEventListener('pointerdown', onDown);
input.addEventListener('input', draw);
input.addEventListener('keydown', onKey);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);
const ro = new ResizeObserver(draw);
ro.observe(track);
draw();
return () => {
  cancelAnimationFrame(raf);
  ro.disconnect();
  input.removeEventListener('pointerdown', onDown);
  input.removeEventListener('input', draw);
  input.removeEventListener('keydown', onKey);
  window.removeEventListener('pointermove', onMove);
  window.removeEventListener('pointerup', onUp);
};`,
    },

    /* ───────── Orbit menu ───────── */
    {
      id: 'orbit-menu',
      name: 'Orbit menu',
      category: W,
      wild: true,
      description: 'A floating action button that bursts six actions into orbit around itself.',
      notes: 'Closed items are hidden from the tab order. Esc closes and returns focus to the button. Each item has a text label, not just an icon.',
      minHeight: 340,
      root: '.orbit',
      html: `<div class="orbit">
  <ul class="orbit-items" id="orbit-items">
    <li style="--i: 0"><button class="orbit-item" type="button" aria-label="Photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 1"><button class="orbit-item" type="button" aria-label="Note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 11h6M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
    <li style="--i: 2"><button class="orbit-item" type="button" aria-label="Link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
    <li style="--i: 3"><button class="orbit-item" type="button" aria-label="Location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 4"><button class="orbit-item" type="button" aria-label="Music"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></li>
    <li style="--i: 5"><button class="orbit-item" type="button" aria-label="Event"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M9 3v5M15 3v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></li>
  </ul>
  <button class="orbit-toggle" type="button" aria-expanded="false" aria-controls="orbit-items" aria-label="Quick add"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
</div>`,
      css: `.orbit { position: relative; display: grid; place-items: center; width: 260px; height: 260px; }
.orbit-items { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
.orbit-items li {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  transform: rotate(calc(var(--i) * 60deg)) translateY(0) rotate(calc(var(--i) * -60deg)) scale(0.4);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.2s, visibility 0.35s;
  transition-delay: calc((5 - var(--i)) * 20ms);
}
.orbit.is-open .orbit-items li {
  transform: rotate(calc(var(--i) * 60deg)) translateY(-96px) rotate(calc(var(--i) * -60deg)) scale(1);
  opacity: 1;
  visibility: visible;
  transition-delay: calc(var(--i) * 40ms);
}
.orbit-item {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  box-shadow: var(--ui-shadow);
  cursor: pointer;
}
.orbit-item svg { width: 22px; height: 22px; }
.orbit-item:hover { color: var(--ui-accent); scale: 1.1; }
.orbit-item:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.orbit-toggle {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.25);
  cursor: pointer;
}
.orbit-toggle svg { width: 28px; height: 28px; transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1); }
.orbit.is-open .orbit-toggle svg { transform: rotate(135deg); }
.orbit-toggle:focus-visible { outline: none; box-shadow: var(--ui-focus), 0 10px 24px rgb(0 0 0 / 0.25); }
@media (prefers-reduced-motion: reduce) {
  .orbit-items li, .orbit-toggle svg { transition-duration: 0.01s; transition-delay: 0s !important; }
}`,
      setup: `const toggle = root.querySelector('.orbit-toggle');
const items = root.querySelectorAll('.orbit-item');

const setOpen = (open) => {
  root.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close quick add' : 'Quick add');
};
const onToggle = () => setOpen(!root.classList.contains('is-open'));
const onKey = (e) => {
  if (e.key === 'Escape' && root.classList.contains('is-open')) {
    setOpen(false);
    toggle.focus();
  }
};
const onItem = () => {
  setOpen(false);
  toggle.focus();
};

toggle.addEventListener('click', onToggle);
root.addEventListener('keydown', onKey);
items.forEach((i) => i.addEventListener('click', onItem));
return () => {
  toggle.removeEventListener('click', onToggle);
  root.removeEventListener('keydown', onKey);
  items.forEach((i) => i.removeEventListener('click', onItem));
};`,
    },

    /* ───────── Scratch card ───────── */
    {
      id: 'scratch-card',
      name: 'Scratch card',
      category: W,
      wild: true,
      description: 'Scratch off a foil layer with your cursor or finger to reveal a hidden code.',
      notes: 'The prize text is real text underneath (screen readers can read it), and “Reveal without scratching” gives keyboard users the same result.',
      root: '.scratch',
      html: `<div class="scratch">
  <div class="scratch-card">
    <p class="scratch-prize"><span>Your discount code</span><strong>TEAR-25</strong></p>
    <canvas class="scratch-foil" aria-hidden="true"></canvas>
  </div>
  <button class="scratch-reveal" type="button">Reveal without scratching</button>
</div>`,
      css: `.scratch { display: grid; justify-items: center; gap: 12px; }
.scratch-card {
  position: relative;
  width: 300px;
  height: 160px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--ui-accent-soft);
  border: 2px dashed var(--ui-accent);
}
.scratch-prize {
  display: grid;
  place-content: center;
  gap: 4px;
  height: 100%;
  margin: 0;
  text-align: center;
  color: var(--ui-text);
}
.scratch-prize span { font-size: 13px; color: var(--ui-muted); }
.scratch-prize strong { font-size: 28px; letter-spacing: 0.06em; color: var(--ui-accent); }
.scratch-foil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: none;
  transition: opacity 0.6s;
}
.scratch.is-done .scratch-foil { opacity: 0; pointer-events: none; }
.scratch-reveal {
  padding: 6px 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-accent);
  background: none;
  border: 0;
  border-radius: 6px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.scratch-reveal:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
      setup: `const canvas = root.querySelector('.scratch-foil');
const reveal = root.querySelector('.scratch-reveal');
const ctx = canvas.getContext('2d');
let drawing = false;
let last = null;
let strokes = 0;

const paint = () => {
  const r = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = r.width * dpr;
  canvas.height = r.height * dpr;
  ctx.scale(dpr, dpr);
  const g = ctx.createLinearGradient(0, 0, r.width, r.height);
  g.addColorStop(0, '#b8bcc6');
  g.addColorStop(0.5, '#e9ebf0');
  g.addColorStop(1, '#9ea3ad');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, r.width, r.height);
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.font = '700 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCRATCH HERE', r.width / 2, r.height / 2 + 5);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
};
const cleared = () => {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let clear = 0;
  for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
  return clear / (data.length / 64);
};
const point = (e) => {
  const r = canvas.getBoundingClientRect();
  return [e.clientX - r.left, e.clientY - r.top];
};
const onDown = (e) => {
  drawing = true;
  last = point(e);
  canvas.setPointerCapture(e.pointerId);
};
const onMove = (e) => {
  if (!drawing) return;
  const p = point(e);
  ctx.beginPath();
  ctx.moveTo(last[0], last[1]);
  ctx.lineTo(p[0], p[1]);
  ctx.stroke();
  last = p;
  if (++strokes % 12 === 0 && cleared() > 0.5) root.classList.add('is-done');
};
const onUp = () => (drawing = false);
const onReveal = () => root.classList.add('is-done');

paint();
canvas.addEventListener('pointerdown', onDown);
canvas.addEventListener('pointermove', onMove);
canvas.addEventListener('pointerup', onUp);
reveal.addEventListener('click', onReveal);
return () => {
  canvas.removeEventListener('pointerdown', onDown);
  canvas.removeEventListener('pointermove', onMove);
  canvas.removeEventListener('pointerup', onUp);
  reveal.removeEventListener('click', onReveal);
};`,
    },

    /* ───────── Liquid progress ───────── */
    {
      id: 'liquid-progress',
      name: 'Liquid progress',
      category: W,
      wild: true,
      description: 'A round tank that fills with a rolling wave as progress changes.',
      notes: 'It is still a role="progressbar" with a value, so the meaning never depends on the animation. The number changes colour exactly at the waterline so it stays readable. The wave stops for reduced motion.',
      root: '.liquid',
      html: `<div class="liquid">
  <div class="liquid-tank" role="progressbar" aria-label="Daily water goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
    <span class="liquid-value" aria-hidden="true">45%</span>
    <svg class="liquid-wave" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z"/></svg>
    <div class="liquid-fill" aria-hidden="true"><span class="liquid-value">45%</span></div>
  </div>
  <div class="liquid-actions">
    <button class="liquid-btn" type="button" data-add="-15" aria-label="Remove 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <button class="liquid-btn" type="button" data-add="15" aria-label="Add 15 percent"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
</div>`,
      css: `.liquid { display: grid; justify-items: center; gap: 14px; }
.liquid-tank {
  --level: 45%;
  position: relative;
  width: 168px;
  height: 168px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--ui-surface-2);
  border: 4px solid var(--ui-surface);
  box-shadow: 0 0 0 2px var(--ui-accent), inset 0 6px 14px rgb(0 0 0 / 0.08);
}
.liquid-value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 34px;
  font-weight: 800;
  color: var(--ui-text);
  font-variant-numeric: tabular-nums;
}
.liquid-fill {
  position: absolute;
  inset: 0;
  background: var(--ui-accent);
  clip-path: inset(calc(100% - var(--level)) 0 0 0);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.liquid-fill .liquid-value { color: var(--ui-accent-text); }
.liquid-wave {
  position: absolute;
  left: 0;
  bottom: calc(var(--level) - 1px);
  width: 200%;
  height: 12px;
  fill: var(--ui-accent);
  transition: bottom 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  animation: liquid-roll 2.4s linear infinite;
}
@keyframes liquid-roll { to { transform: translateX(-50%); } }
.liquid-actions { display: flex; gap: 8px; }
.liquid-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: 50%;
  cursor: pointer;
}
.liquid-btn svg { width: 18px; height: 18px; }
.liquid-btn:hover { background: var(--ui-surface-2); }
.liquid-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) {
  .liquid-wave { animation: none; }
  .liquid-fill, .liquid-wave { transition: none; }
}`,
      setup: `const tank = root.querySelector('.liquid-tank');
const labels = root.querySelectorAll('.liquid-value');
const buttons = root.querySelectorAll('.liquid-btn');
let level = Number(tank.getAttribute('aria-valuenow'));

const render = () => {
  tank.style.setProperty('--level', level + '%');
  tank.setAttribute('aria-valuenow', level);
  labels.forEach((l) => (l.textContent = level + '%'));
};
const onAdd = (e) => {
  level = Math.min(100, Math.max(0, level + Number(e.currentTarget.dataset.add)));
  render();
};

buttons.forEach((b) => b.addEventListener('click', onAdd));
render();
return () => buttons.forEach((b) => b.removeEventListener('click', onAdd));`,
    },

    /* ───────── Rotary knob ───────── */
    {
      id: 'rotary-knob',
      name: 'Rotary knob',
      category: W,
      wild: true,
      description: 'An amp-style dial you twist by dragging around it, scrolling, or with the arrow keys. It goes to eleven.',
      notes: 'It is an ARIA slider: arrows, Home, End and Page keys all work, and the value is announced. Dragging follows the angle of your pointer around the centre.',
      root: '.knob-wrap',
      html: `<div class="knob-wrap">
  <div class="knob" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="11" aria-valuenow="5">
    <div class="knob-dial"><span class="knob-mark"></span></div>
  </div>
  <p class="knob-readout"><span class="knob-num">5</span> / 11</p>
</div>`,
      css: `.knob-wrap { display: grid; justify-items: center; gap: 10px; }
.knob {
  position: relative;
  display: grid;
  place-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  cursor: grab;
  touch-action: none;
}
.knob-tick {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 12px;
  margin: -6px 0 0 -1.5px;
  border-radius: 2px;
  background: var(--ui-border-strong);
  transform: rotate(var(--a)) translateY(-80px);
  transition: background-color 0.15s;
}
.knob-tick.is-on { background: var(--ui-accent); }
.knob-dial {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #4a4a52, #19191c 70%);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.35), inset 0 2px 1px rgb(255 255 255 / 0.15);
  transition: transform 0.15s ease-out;
}
.knob-mark {
  position: absolute;
  left: 50%;
  top: 12px;
  width: 4px;
  height: 26px;
  margin-left: -2px;
  border-radius: 2px;
  background: #f5c518;
}
.knob:focus-visible { outline: none; }
.knob:focus-visible .knob-dial { box-shadow: var(--ui-focus), 0 12px 24px rgb(0 0 0 / 0.35); }
.knob:active { cursor: grabbing; }
.knob-readout { margin: 0; font-size: 15px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.knob-num { font-size: 26px; font-weight: 800; color: var(--ui-text); }`,
      setup: `const knob = root.querySelector('.knob');
const dial = root.querySelector('.knob-dial');
const num = root.querySelector('.knob-num');
const MAX = Number(knob.getAttribute('aria-valuemax'));
let value = Number(knob.getAttribute('aria-valuenow'));
let dragging = false;

const ticks = Array.from({ length: MAX + 1 }, (_, i) => {
  const t = document.createElement('span');
  t.className = 'knob-tick';
  t.setAttribute('aria-hidden', 'true');
  t.style.setProperty('--a', -135 + (i / MAX) * 270 + 'deg');
  knob.prepend(t);
  return t;
});

const set = (v) => {
  value = Math.min(MAX, Math.max(0, Math.round(v)));
  ticks.forEach((t, i) => t.classList.toggle('is-on', i <= value));
  dial.style.transform = 'rotate(' + (-135 + (value / MAX) * 270) + 'deg)';
  knob.setAttribute('aria-valuenow', value);
  knob.setAttribute('aria-valuetext', value === MAX ? value + ', this one goes to eleven' : String(value));
  num.textContent = value;
};
const fromPointer = (e) => {
  const r = knob.getBoundingClientRect();
  let angle = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI;
  angle = Math.max(-135, Math.min(135, angle));
  set(((angle + 135) / 270) * MAX);
};
const onDown = (e) => {
  dragging = true;
  knob.setPointerCapture(e.pointerId);
  fromPointer(e);
};
const onMove = (e) => dragging && fromPointer(e);
const onUp = () => (dragging = false);
const onWheel = (e) => {
  e.preventDefault();
  set(value + (e.deltaY < 0 ? 1 : -1));
};
const onKey = (e) => {
  const map = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 3, PageDown: -3 };
  if (e.key in map) set(value + map[e.key]);
  else if (e.key === 'Home') set(0);
  else if (e.key === 'End') set(MAX);
  else return;
  e.preventDefault();
};

knob.addEventListener('pointerdown', onDown);
knob.addEventListener('pointermove', onMove);
knob.addEventListener('pointerup', onUp);
knob.addEventListener('wheel', onWheel, { passive: false });
knob.addEventListener('keydown', onKey);
set(value);
return () => {
  knob.removeEventListener('pointerdown', onDown);
  knob.removeEventListener('pointermove', onMove);
  knob.removeEventListener('pointerup', onUp);
  knob.removeEventListener('wheel', onWheel);
  knob.removeEventListener('keydown', onKey);
};`,
    },

    /* ───────── Password creature ───────── */
    {
      id: 'password-creature',
      name: 'Password creature',
      category: W,
      wild: true,
      description: 'A little creature that covers its eyes while you type a password, peeks when you show it, and grins as it gets stronger.',
      notes: 'The real feedback is the text under the meter, announced politely as it changes. The creature is decoration and is hidden from screen readers.',
      root: '.critter',
      html: `<div class="critter" data-score="0">
  <svg class="critter-face" viewBox="0 0 120 110" aria-hidden="true">
    <circle class="critter-body" cx="60" cy="62" r="44"/>
    <g class="critter-eyes"><circle cx="44" cy="54" r="6"/><circle cx="76" cy="54" r="6"/></g>
    <path class="critter-mouth" d="M46 78 Q60 78 74 78"/>
    <g class="critter-paws"><ellipse cx="42" cy="56" rx="15" ry="11"/><ellipse cx="78" cy="56" rx="15" ry="11"/></g>
  </svg>
  <label class="critter-label" for="new-password">Create a password</label>
  <div class="critter-row">
    <input class="critter-input" id="new-password" type="password" autocomplete="new-password" aria-describedby="critter-status">
    <button class="critter-show" type="button" aria-pressed="false">Show</button>
  </div>
  <div class="critter-meter" aria-hidden="true"><span></span></div>
  <p class="critter-status" id="critter-status" aria-live="polite">Use 12 or more characters, with a mix of letters, numbers and symbols.</p>
</div>`,
      css: `.critter {
  --tone: var(--ui-border-strong);
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 340px;
}
.critter[data-score="1"] { --tone: var(--ui-danger); }
.critter[data-score="2"] { --tone: var(--ui-warning); }
.critter[data-score="3"] { --tone: var(--ui-warning); }
.critter[data-score="4"] { --tone: var(--ui-success); }
.critter[data-score="5"] { --tone: var(--ui-success); }
.critter-face { width: 108px; justify-self: center; overflow: visible; }
.critter-body { fill: var(--tone); transition: fill 0.3s; }
.critter-eyes circle { fill: var(--ui-text); transition: transform 0.2s; }
.critter-mouth { fill: none; stroke: var(--ui-text); stroke-width: 4; stroke-linecap: round; transition: d 0.3s; }
.critter-paws ellipse { fill: var(--tone); stroke: var(--ui-text); stroke-width: 2.5; filter: brightness(1.1); }
.critter-paws { transform: translateY(46px); transition: transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1); }
.critter.is-shy .critter-paws { transform: translateY(0); }
.critter.is-peek .critter-paws { transform: translateY(12px); }
.critter-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.critter-row {
  display: flex;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.critter-row:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.critter-input { flex: 1; min-width: 0; padding: 10px 12px; font: inherit; font-size: 15px; color: var(--ui-text); background: none; border: 0; }
.critter-input:focus { outline: none; }
.critter-show {
  padding: 0 14px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  color: var(--ui-accent);
  background: none;
  border: 0;
  cursor: pointer;
}
.critter-show:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -4px; border-radius: 6px; }
.critter-meter { height: 6px; overflow: hidden; border-radius: 999px; background: var(--ui-surface-2); }
.critter-meter span { display: block; height: 100%; width: calc(var(--fill, 0) * 20%); background: var(--tone); transition: width 0.3s, background-color 0.3s; }
.critter-status { margin: 0; font-size: 13px; color: var(--ui-muted); }
@media (prefers-reduced-motion: reduce) { .critter-paws, .critter-mouth { transition: none; } }`,
      setup: `const input = root.querySelector('.critter-input');
const show = root.querySelector('.critter-show');
const status = root.querySelector('.critter-status');
const mouth = root.querySelector('.critter-mouth');
const eyes = root.querySelectorAll('.critter-eyes circle');
const meter = root.querySelector('.critter-meter');
const LABELS = [
  'Use 12 or more characters, with a mix of letters, numbers and symbols.',
  'Too weak. Make it longer.',
  'Weak. Add numbers or symbols.',
  'Okay. A few more characters would help.',
  'Strong password.',
  'Excellent. Even the creature is impressed.',
];

const score = (pw) => {
  if (!pw) return 0;
  let s = 1;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(5, s);
};
const mood = () => {
  const hidden = input.type === 'password';
  const focused = document.activeElement === input;
  root.classList.toggle('is-shy', hidden && focused);
  root.classList.toggle('is-peek', !hidden && focused);
};
const update = () => {
  const s = score(input.value);
  root.dataset.score = s;
  meter.style.setProperty('--fill', s);
  status.textContent = LABELS[s];
  mouth.setAttribute('d', 'M46 78 Q60 ' + (70 + s * 4) + ' 74 78');
  const look = Math.min(input.value.length, 20) * 0.35 - 3.5;
  eyes.forEach((e) => (e.style.transform = 'translateX(' + look + 'px)'));
};
const onShow = () => {
  const reveal = input.type === 'password';
  input.type = reveal ? 'text' : 'password';
  show.textContent = reveal ? 'Hide' : 'Show';
  show.setAttribute('aria-pressed', String(reveal));
  input.focus();
  mood();
};

input.addEventListener('input', update);
input.addEventListener('focus', mood);
input.addEventListener('blur', mood);
show.addEventListener('click', onShow);
update();
return () => {
  input.removeEventListener('input', update);
  input.removeEventListener('focus', mood);
  input.removeEventListener('blur', mood);
  show.removeEventListener('click', onShow);
};`,
    }
  );
})();
