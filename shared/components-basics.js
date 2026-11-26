/* Tearsheet — more everyday components.
 * Interactive ones use `setup` (body of function setup(root)) plus `root` (a CSS selector
 * for the component's single root element). core.js wraps setup() for React, Vue and Svelte.
 */
(function () {
  const SR = `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}`;

  const CHEVRON = '<svg class="select-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  window.COMPONENTS.push(
    /* ───────── Select ───────── */
    {
      id: 'select',
      name: 'Select',
      category: 'Forms',
      description: 'A native select restyled to match the text field, with a drawn chevron.',
      notes: 'Keep the native <select>: it gets the right picker on every phone, works with autofill and needs no JavaScript. Use it for 5 to 15 options; fewer than 5 read better as radios.',
      html: `<div class="select-field">
  <label class="select-label" for="country">Country</label>
  <div class="select-wrap">
    <select class="select" id="country" autocomplete="country-name">
      <option>Canada</option>
      <option>Germany</option>
      <option>Japan</option>
      <option>Jordan</option>
      <option>Mexico</option>
      <option>United Kingdom</option>
    </select>
    ${CHEVRON}
  </div>
</div>`,
      css: `.select-field { display: grid; gap: 6px; width: 100%; max-width: 320px; }
.select-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.select-wrap { position: relative; }
.select {
  appearance: none;
  width: 100%;
  min-height: 42px;
  padding: 10px 40px 10px 12px;
  font: inherit;
  font-size: 15px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
}
.select:hover { border-color: var(--ui-text); }
.select:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 18px;
  height: 18px;
  color: var(--ui-muted);
  transform: translateY(-50%);
  pointer-events: none;
}`,
    },

    /* ───────── Radio cards ───────── */
    {
      id: 'radio-cards',
      name: 'Radio cards',
      category: 'Forms',
      description: 'Big, scannable choice cards built on native radio buttons.',
      notes: 'The whole card is the label, so the click target is huge. Arrow keys move between options because they are real radios in one group.',
      html: `<fieldset class="plans">
  <legend class="plans-legend">Choose a plan</legend>
  <label class="plan">
    <input type="radio" name="plan" value="hobby">
    <span class="plan-name">Hobby</span>
    <span class="plan-meta">1 project · community help</span>
    <span class="plan-price">Free</span>
  </label>
  <label class="plan">
    <input type="radio" name="plan" value="pro" checked>
    <span class="plan-name">Pro</span>
    <span class="plan-meta">Unlimited projects · email help</span>
    <span class="plan-price">$12/mo</span>
  </label>
  <label class="plan">
    <input type="radio" name="plan" value="team">
    <span class="plan-name">Team</span>
    <span class="plan-meta">Shared workspace · priority help</span>
    <span class="plan-price">$29/mo</span>
  </label>
</fieldset>`,
      css: `.plans { display: grid; gap: 10px; width: 100%; max-width: 420px; margin: 0; padding: 0; border: 0; }
.plans-legend { margin-bottom: 8px; padding: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.plan {
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 14px;
  align-items: center;
  padding: 14px 16px;
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.plan:hover { border-color: var(--ui-border-strong); }
.plan input {
  grid-row: span 2;
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 50%;
  transition: border-width 0.15s, border-color 0.15s;
}
.plan input:checked { border: 6px solid var(--ui-accent); }
.plan:has(input:checked) { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.plan:has(input:focus-visible) { box-shadow: var(--ui-focus); }
.plan-name { font-weight: 600; color: var(--ui-text); }
.plan-meta { grid-column: 2; font-size: 13px; color: var(--ui-muted); }
.plan-price { grid-row: 1 / span 2; grid-column: 3; font-weight: 700; color: var(--ui-text); font-variant-numeric: tabular-nums; }`,
    },

    /* ───────── Segmented control ───────── */
    {
      id: 'segmented-control',
      name: 'Segmented control',
      category: 'Forms',
      description: 'Switch between two to four views. Radios underneath, so it works without JavaScript.',
      notes: 'Best for mutually exclusive views of the same content (List / Board / Calendar). For more than four options use tabs or a select.',
      html: `<fieldset class="segmented">
  <legend class="sr-only">View</legend>
  <label><input type="radio" name="view" value="list" checked><span>List</span></label>
  <label><input type="radio" name="view" value="board"><span>Board</span></label>
  <label><input type="radio" name="view" value="calendar"><span>Calendar</span></label>
</fieldset>`,
      css: `${SR}
.segmented {
  display: inline-flex;
  gap: 2px;
  margin: 0;
  padding: 4px;
  background: var(--ui-surface-2);
  border: 0;
  border-radius: calc(var(--ui-radius-sm) + 4px);
}
.segmented label { position: relative; }
.segmented input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.segmented span {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-muted);
  border-radius: var(--ui-radius-sm);
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.segmented label:hover span { color: var(--ui-text); }
.segmented input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.12); }
.segmented input:focus-visible + span { box-shadow: var(--ui-focus); }`,
    },

    /* ───────── Range slider ───────── */
    {
      id: 'range-slider',
      name: 'Range slider',
      category: 'Forms',
      description: 'Native range input with a filled track and a live value readout.',
      notes: 'Sliders are for approximate values where the change is previewed live (volume, brightness). For exact numbers use a number field.',
      root: '.range',
      html: `<div class="range">
  <div class="range-head">
    <label for="volume">Volume</label>
    <output class="range-value" for="volume">40</output>
  </div>
  <input class="range-input" id="volume" type="range" min="0" max="100" value="40">
</div>`,
      css: `.range { width: 100%; max-width: 360px; }
.range-head { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.range-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.range-input {
  --fill: 40%;
  appearance: none;
  width: 100%;
  height: 6px;
  margin: 0;
  border-radius: 999px;
  background: linear-gradient(var(--ui-accent), var(--ui-accent)) 0 / var(--fill) 100% no-repeat, var(--ui-surface-2);
  cursor: pointer;
}
.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.25);
}
.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--ui-accent);
}
.range-input:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
      setup: `const input = root.querySelector('.range-input');
const output = root.querySelector('.range-value');

const update = () => {
  const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
  input.style.setProperty('--fill', pct + '%');
  output.textContent = input.value;
};

input.addEventListener('input', update);
update();
return () => input.removeEventListener('input', update);`,
    },

    /* ───────── Number stepper ───────── */
    {
      id: 'number-stepper',
      name: 'Number stepper',
      category: 'Forms',
      description: 'Minus and plus buttons around a number field, clamped to a range.',
      notes: 'People can still type a number directly. The buttons disable at the limits instead of silently doing nothing.',
      root: '.stepper',
      html: `<div class="stepper">
  <label class="stepper-label" for="guests">Guests</label>
  <div class="stepper-control">
    <button class="stepper-btn" type="button" data-step="-1" aria-label="Fewer guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <input class="stepper-input" id="guests" type="number" inputmode="numeric" min="1" max="12" value="2">
    <button class="stepper-btn" type="button" data-step="1" aria-label="More guests"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
</div>`,
      css: `.stepper { display: grid; gap: 6px; }
.stepper-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.stepper-control {
  display: inline-flex;
  align-items: center;
  width: max-content;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.stepper-control:focus-within { border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.stepper-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--ui-text);
  background: none;
  border: 0;
  cursor: pointer;
}
.stepper-btn svg { width: 18px; height: 18px; }
.stepper-btn:hover:not(:disabled) { background: var(--ui-surface-2); }
.stepper-btn:disabled { color: var(--ui-border-strong); cursor: not-allowed; }
.stepper-btn:focus-visible { outline: 2px solid var(--ui-accent); outline-offset: -2px; }
.stepper-input {
  width: 56px;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--ui-text);
  background: none;
  border: 0;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}
.stepper-input:focus { outline: none; }
.stepper-input::-webkit-inner-spin-button, .stepper-input::-webkit-outer-spin-button { appearance: none; margin: 0; }`,
      setup: `const input = root.querySelector('.stepper-input');
const [minus, plus] = root.querySelectorAll('[data-step]');
const clamp = (v) => Math.min(Number(input.max), Math.max(Number(input.min), v));

const sync = () => {
  minus.disabled = Number(input.value) <= Number(input.min);
  plus.disabled = Number(input.value) >= Number(input.max);
};
const onStep = (e) => {
  input.value = clamp((Number(input.value) || 0) + Number(e.currentTarget.dataset.step));
  sync();
};
const onChange = () => {
  input.value = clamp(Number(input.value) || Number(input.min));
  sync();
};

minus.addEventListener('click', onStep);
plus.addEventListener('click', onStep);
input.addEventListener('change', onChange);
sync();
return () => {
  minus.removeEventListener('click', onStep);
  plus.removeEventListener('click', onStep);
  input.removeEventListener('change', onChange);
};`,
    },

    /* ───────── Dropdown menu ───────── */
    {
      id: 'dropdown-menu',
      name: 'Dropdown menu',
      category: 'Overlays',
      description: 'An actions menu built on <details>, with icons and a separated destructive item.',
      notes: 'Group items, put destructive actions last and visually apart. For a full keyboard menu pattern (arrow keys, typeahead) add the WAI-ARIA menu button script.',
      minHeight: 300,
      html: `<details class="menu">
  <summary class="menu-trigger">Options <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
  <div class="menu-list">
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>Rename</button>
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>Duplicate</button>
    <button class="menu-item" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13V3M6 7l4-4 4 4M4 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Share</button>
    <hr class="menu-sep">
    <button class="menu-item menu-danger" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Delete</button>
  </div>
</details>`,
      css: `.menu { position: relative; display: inline-block; }
.menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  cursor: pointer;
  list-style: none;
}
.menu-trigger::-webkit-details-marker { display: none; }
.menu-trigger svg { width: 16px; height: 16px; transition: transform 0.2s; }
.menu[open] .menu-trigger svg { transform: rotate(180deg); }
.menu-trigger:hover { background: var(--ui-surface-2); }
.menu-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.menu-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  min-width: 200px;
  padding: 6px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  font: inherit;
  font-size: 14px;
  text-align: start;
  color: var(--ui-text);
  background: none;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.menu-item svg { width: 18px; height: 18px; color: var(--ui-muted); }
.menu-item:hover, .menu-item:focus-visible { outline: none; background: var(--ui-surface-2); }
.menu-danger, .menu-danger svg { color: var(--ui-danger); }
.menu-sep { margin: 6px 4px; border: 0; border-top: 1px solid var(--ui-border); }`,
    },

    /* ───────── Steps indicator ───────── */
    {
      id: 'steps-indicator',
      name: 'Steps indicator',
      category: 'Navigation',
      description: 'Checkout-style progress through a fixed sequence, with done, current and upcoming steps.',
      notes: 'Mark the current step with aria-current="step" and tell screen readers which steps are complete in words, not only with a check mark.',
      layout: 'full',
      html: `<ol class="steps">
  <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Cart <span class="sr-only">(completed)</span></span></li>
  <li class="step is-done"><span class="step-dot"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="step-label">Shipping <span class="sr-only">(completed)</span></span></li>
  <li class="step is-current" aria-current="step"><span class="step-dot">3</span><span class="step-label">Payment</span></li>
  <li class="step"><span class="step-dot">4</span><span class="step-label">Review</span></li>
</ol>`,
      css: `${SR}
.steps { display: flex; max-width: 560px; margin: 0 auto; padding: 0; list-style: none; }
.step {
  position: relative;
  flex: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ui-muted);
}
.step + .step::before {
  content: "";
  position: absolute;
  top: 15px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--ui-border);
}
.step.is-done + .step::before { background: var(--ui-accent); }
.step-dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border);
}
.step-dot svg { width: 16px; height: 16px; }
.step.is-done .step-dot { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.step.is-current .step-dot { color: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.step.is-current .step-label { font-weight: 700; color: var(--ui-text); }
.step.is-done .step-label { color: var(--ui-text); }`,
    },

    /* ───────── Stat group ───────── */
    {
      id: 'stat-group',
      name: 'Stat group',
      category: 'Content',
      description: 'A row of key numbers with labelled change, built as a description list.',
      notes: 'Say whether a change is good or bad in words; an up arrow is not always good news. Use tabular figures so digits line up.',
      layout: 'full',
      html: `<dl class="stats">
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
</dl>`,
      css: `.stats {
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
.stat-bad { color: var(--ui-danger); }`,
    },

    /* ───────── Dropzone ───────── */
    {
      id: 'file-dropzone',
      name: 'File dropzone',
      category: 'Forms',
      description: 'Drag files in or click to browse. A real file input underneath keeps it keyboard accessible.',
      notes: 'State the accepted types and size limit before people try. The visually hidden input stays focusable, and the whole zone shows its focus ring.',
      root: '.drop',
      html: `<label class="drop">
  <input class="drop-input" type="file" multiple accept="image/*,.pdf">
  <svg class="drop-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="drop-title">Drop files here or <u>browse</u></span>
  <span class="drop-hint">PNG, JPG or PDF, up to 10 MB each</span>
  <span class="drop-files" aria-live="polite"></span>
</label>`,
      css: `.drop {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 6px;
  width: 100%;
  max-width: 440px;
  padding: 32px 24px;
  text-align: center;
  background: var(--ui-surface);
  border: 2px dashed var(--ui-border-strong);
  border-radius: var(--ui-radius);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}
.drop:hover, .drop.is-over { border-color: var(--ui-accent); background: var(--ui-accent-soft); }
.drop:focus-within { box-shadow: var(--ui-focus); }
.drop-input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.drop-icon { width: 36px; height: 36px; margin-bottom: 6px; color: var(--ui-accent); }
.drop-title { font-weight: 600; color: var(--ui-text); }
.drop-title u { color: var(--ui-accent); text-underline-offset: 3px; }
.drop-hint { font-size: 13px; color: var(--ui-muted); }
.drop-files:not(:empty) {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface-2);
  border-radius: 999px;
}`,
      setup: `const input = root.querySelector('.drop-input');
const list = root.querySelector('.drop-files');

const show = () => {
  const names = [...input.files].map((f) => f.name);
  list.textContent = names.length ? names.length + ' selected: ' + names.join(', ') : '';
};
const over = (e) => {
  e.preventDefault();
  root.classList.add('is-over');
};
const leave = () => root.classList.remove('is-over');
const drop = (e) => {
  e.preventDefault();
  leave();
  input.files = e.dataTransfer.files;
  show();
};

root.addEventListener('dragover', over);
root.addEventListener('dragleave', leave);
root.addEventListener('drop', drop);
input.addEventListener('change', show);
return () => {
  root.removeEventListener('dragover', over);
  root.removeEventListener('dragleave', leave);
  root.removeEventListener('drop', drop);
  input.removeEventListener('change', show);
};`,
    },

    /* ───────── Star rating ───────── */
    {
      id: 'star-rating',
      name: 'Star rating',
      category: 'Forms',
      description: 'Five-star rating with hover preview, made of radio buttons and zero JavaScript.',
      notes: 'Each star is a labelled radio, so arrow keys work and screen readers announce “3 stars”. Stars are drawn with a CSS mask, not a font.',
      html: `<fieldset class="rating">
  <legend class="rating-legend">Rate this component</legend>
  <div class="rating-stars">
    <input type="radio" name="rating" id="star5" value="5"><label for="star5" title="5 stars"><span class="sr-only">5 stars</span></label>
    <input type="radio" name="rating" id="star4" value="4" checked><label for="star4" title="4 stars"><span class="sr-only">4 stars</span></label>
    <input type="radio" name="rating" id="star3" value="3"><label for="star3" title="3 stars"><span class="sr-only">3 stars</span></label>
    <input type="radio" name="rating" id="star2" value="2"><label for="star2" title="2 stars"><span class="sr-only">2 stars</span></label>
    <input type="radio" name="rating" id="star1" value="1"><label for="star1" title="1 star"><span class="sr-only">1 star</span></label>
  </div>
</fieldset>`,
      css: `${SR}
.rating { margin: 0; padding: 0; border: 0; }
.rating-legend { margin-bottom: 8px; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.rating-stars { display: inline-flex; flex-direction: row-reverse; gap: 4px; }
.rating-stars input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.rating-stars label {
  width: 34px;
  height: 34px;
  cursor: pointer;
  border-radius: 6px;
  background: var(--ui-border-strong);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E") center / 88% no-repeat;
  transition: background-color 0.12s, transform 0.12s;
}
.rating-stars input:checked ~ label,
.rating-stars label:hover,
.rating-stars label:hover ~ label { background: #f5a524; }
.rating-stars:has(label:hover) label:not(:hover):not(:has(~ label:hover)) { background: var(--ui-border-strong); }
.rating-stars label:hover { transform: scale(1.12); }
.rating-stars input:focus-visible + label { outline: 3px solid var(--ui-accent); outline-offset: 2px; }`,
    },

    /* ───────── One-time code ───────── */
    {
      id: 'otp-input',
      name: 'One-time code',
      category: 'Forms',
      description: 'Six-box verification code that auto-advances, handles backspace and accepts a pasted or autofilled code.',
      notes: 'autocomplete="one-time-code" lets phones offer the SMS code. Pasting a full code into any box fills them all, so nobody has to type six times.',
      root: '.otp',
      html: `<div class="otp">
  <p class="otp-label" id="otp-label">Enter the 6-digit code we sent you</p>
  <div class="otp-boxes" role="group" aria-labelledby="otp-label">
    <input class="otp-box" inputmode="numeric" autocomplete="one-time-code" aria-label="Digit 1">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 2">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 3">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 4">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 5">
    <input class="otp-box" inputmode="numeric" aria-label="Digit 6">
  </div>
</div>`,
      css: `.otp { display: grid; gap: 12px; justify-items: start; }
.otp-label { margin: 0; font-size: 14px; font-weight: 600; color: var(--ui-text); }
.otp-boxes { display: flex; gap: 8px; }
.otp-box {
  width: 48px;
  height: 58px;
  font: inherit;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1.5px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  caret-color: var(--ui-accent);
  font-variant-numeric: tabular-nums;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.otp-box:nth-child(3) { margin-right: 10px; }
.otp-box:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.otp.is-complete .otp-box { border-color: var(--ui-success); }`,
      setup: `const boxes = [...root.querySelectorAll('.otp-box')];

const fill = (start, digits) => {
  digits.slice(0, boxes.length - start).forEach((d, k) => (boxes[start + k].value = d));
  const next = Math.min(start + digits.length, boxes.length - 1);
  boxes[next].focus();
  root.classList.toggle('is-complete', boxes.every((b) => b.value));
};
const onInput = (e) => {
  const i = boxes.indexOf(e.target);
  const digits = e.target.value.replace(/\\D/g, '').split('');
  e.target.value = '';
  if (digits.length) fill(i, digits);
  else root.classList.remove('is-complete');
};
const onKeyDown = (e) => {
  const i = boxes.indexOf(e.target);
  if (e.key === 'Backspace' && !e.target.value && i > 0) boxes[i - 1].focus();
  if (e.key === 'ArrowLeft' && i > 0) boxes[i - 1].focus();
  if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
};
const onPaste = (e) => {
  e.preventDefault();
  const digits = e.clipboardData.getData('text').replace(/\\D/g, '').split('');
  if (digits.length) fill(boxes.indexOf(e.target), digits);
};

boxes.forEach((b) => {
  b.addEventListener('input', onInput);
  b.addEventListener('keydown', onKeyDown);
  b.addEventListener('paste', onPaste);
});
return () => boxes.forEach((b) => {
  b.removeEventListener('input', onInput);
  b.removeEventListener('keydown', onKeyDown);
  b.removeEventListener('paste', onPaste);
});`,
    },

    /* ───────── Copy field ───────── */
    {
      id: 'copy-field',
      name: 'Copy field',
      category: 'Forms',
      description: 'Read-only value with a copy button that confirms in place and announces it.',
      notes: 'Confirm the copy right where people looked, and say it to screen readers through a live region. If the clipboard is blocked, the text gets selected instead.',
      root: '.copy-field',
      html: `<div class="copy-field">
  <label class="copy-label" for="invite-link">Invite link</label>
  <div class="copy-row">
    <input class="copy-input" id="invite-link" type="text" readonly value="https://example.com/invite/7Hq2-kX9p">
    <button class="copy-button" type="button"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 4H6a2 2 0 0 0-2 2v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span class="copy-text">Copy</span></button>
  </div>
  <span class="copy-status" aria-live="polite"></span>
</div>`,
      css: `.copy-field { display: grid; gap: 6px; width: 100%; max-width: 420px; }
.copy-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.copy-row {
  display: flex;
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
}
.copy-input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  font: inherit;
  font-size: 14px;
  color: var(--ui-text);
  background: none;
  border: 0;
  text-overflow: ellipsis;
}
.copy-input:focus { outline: none; }
.copy-row:focus-within { box-shadow: var(--ui-focus); }
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 0;
  border-left: 1px solid var(--ui-border-strong);
  border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
  cursor: pointer;
}
.copy-button svg { width: 16px; height: 16px; }
.copy-button:hover { background: var(--ui-surface-2); }
.copy-button:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--ui-accent); }
.copy-field.is-copied .copy-button { color: var(--ui-success); }
.copy-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }`,
      setup: `const input = root.querySelector('.copy-input');
const button = root.querySelector('.copy-button');
const text = root.querySelector('.copy-text');
const status = root.querySelector('.copy-status');
let timer;

const onClick = async () => {
  try {
    await navigator.clipboard.writeText(input.value);
    text.textContent = 'Copied';
    status.textContent = 'Link copied to clipboard';
    root.classList.add('is-copied');
    clearTimeout(timer);
    timer = setTimeout(() => {
      text.textContent = 'Copy';
      status.textContent = '';
      root.classList.remove('is-copied');
    }, 1800);
  } catch (err) {
    input.select();
  }
};

button.addEventListener('click', onClick);
return () => {
  clearTimeout(timer);
  button.removeEventListener('click', onClick);
};`,
    },

    /* ───────── Settings list ───────── */
    {
      id: 'settings-list',
      name: 'Settings list',
      category: 'Content',
      description: 'Rows of settings mixing toggles, links to sub-pages and a destructive action.',
      notes: 'Toggles apply instantly; rows with a chevron open another page. Keep the destructive action last and in its own colour.',
      html: `<ul class="settings">
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
</ul>`,
      css: `.settings {
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
.set-switch input:focus-visible + span { box-shadow: var(--ui-focus); }`,
    },

    /* ───────── Keyboard shortcuts ───────── */
    {
      id: 'keyboard-shortcuts',
      name: 'Keyboard shortcuts',
      category: 'Content',
      description: 'A shortcut cheat sheet with properly styled <kbd> keys.',
      notes: 'Use the <kbd> element for keys. Show the platform-correct modifier (Ctrl on Windows, ⌘ on Mac) when you can detect it.',
      html: `<dl class="shortcuts">
  <div class="shortcut"><dt>Search everything</dt><dd><kbd>Ctrl</kbd><kbd>K</kbd></dd></div>
  <div class="shortcut"><dt>Copy component</dt><dd><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>C</kbd></dd></div>
  <div class="shortcut"><dt>Switch theme</dt><dd><kbd>Shift</kbd><kbd>D</kbd></dd></div>
  <div class="shortcut"><dt>Close dialog</dt><dd><kbd>Esc</kbd></dd></div>
</dl>`,
      css: `.shortcuts { width: 100%; max-width: 380px; margin: 0; }
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
}`,
    },

    /* ───────── Timeline ───────── */
    {
      id: 'activity-timeline',
      name: 'Activity timeline',
      category: 'Content',
      description: 'A vertical feed of events with machine-readable times.',
      notes: 'Wrap times in <time datetime="…"> so they can be parsed and localised. Newest first, unless the story is a process.',
      html: `<ol class="timeline">
  <li class="tl-item tl-accent">
    <p class="tl-title"><strong>Maya</strong> published version 2.4</p>
    <time class="tl-time" datetime="2026-11-23T09:12">Today, 9:12</time>
  </li>
  <li class="tl-item">
    <p class="tl-title"><strong>Leo</strong> merged “Fix focus ring in dark mode”</p>
    <time class="tl-time" datetime="2026-11-22T17:40">Yesterday, 17:40</time>
  </li>
  <li class="tl-item">
    <p class="tl-title"><strong>Sam</strong> opened an issue about the tooltip on touch screens</p>
    <time class="tl-time" datetime="2026-11-21T11:05">21 Nov, 11:05</time>
  </li>
  <li class="tl-item">
    <p class="tl-title">Project created</p>
    <time class="tl-time" datetime="2026-11-20T08:00">20 Nov, 08:00</time>
  </li>
</ol>`,
      css: `.timeline { width: 100%; max-width: 420px; margin: 0; padding: 0; list-style: none; }
.tl-item { position: relative; padding: 0 0 22px 28px; }
.tl-item::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: -6px;
  width: 2px;
  background: var(--ui-border);
}
.tl-item:last-child::before { display: none; }
.tl-item::after {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ui-surface);
  border: 2px solid var(--ui-border-strong);
}
.tl-accent::after { background: var(--ui-accent); border-color: var(--ui-accent); box-shadow: 0 0 0 4px var(--ui-accent-soft); }
.tl-title { margin: 0; font-size: 15px; color: var(--ui-text); }
.tl-time { font-size: 13px; color: var(--ui-muted); }`,
    }
  );
})();
