/* Tearsheet — component library data.
 * Each component has: id, name, category, description, notes (accessibility/usage),
 * html, css, optional js (vanilla), and optional react / vue / svelte overrides
 * for interactive components. Non-interactive components are converted
 * automatically by app.js. In vue/svelte overrides, __CSS__ is replaced with the CSS.
 */

window.TOKENS_CSS = `/* Tearsheet design tokens — include once, globally.
   Switch themes with <html data-theme="dark">. */
*, *::before, *::after { box-sizing: border-box; }

:root {
  --ui-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --ui-bg: #ffffff;
  --ui-surface: #ffffff;
  --ui-surface-2: #f4f4f5;
  --ui-text: #18181b;
  --ui-muted: #5b5b66;
  --ui-border: #e4e4e7;
  --ui-border-strong: #8e8e99;
  --ui-accent: #4f46e5;
  --ui-accent-hover: #4338ca;
  --ui-accent-soft: #eef2ff;
  --ui-accent-text: #ffffff;
  --ui-success: #15803d;
  --ui-success-soft: #f0fdf4;
  --ui-warning: #b45309;
  --ui-warning-soft: #fffbeb;
  --ui-danger: #c81e1e;
  --ui-danger-soft: #fef2f2;
  --ui-danger-text: #ffffff;
  --ui-radius: 12px;
  --ui-radius-sm: 8px;
  --ui-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 4px 16px rgb(0 0 0 / 0.06);
  --ui-shadow-lg: 0 12px 40px rgb(0 0 0 / 0.18);
  --ui-focus: 0 0 0 3px rgb(79 70 229 / 0.4);
}

[data-theme="dark"] {
  --ui-bg: #0f0f12;
  --ui-surface: #18181c;
  --ui-surface-2: #232329;
  --ui-text: #f4f4f5;
  --ui-muted: #a1a1aa;
  --ui-border: #2e2e35;
  --ui-border-strong: #6b6b76;
  --ui-accent: #818cf8;
  --ui-accent-hover: #a5b4fc;
  --ui-accent-soft: #1e1b4b;
  --ui-accent-text: #0f0f12;
  --ui-success: #4ade80;
  --ui-success-soft: #052e16;
  --ui-warning: #fbbf24;
  --ui-warning-soft: #2a1d05;
  --ui-danger: #f87171;
  --ui-danger-soft: #2d0f0f;
  --ui-danger-text: #0f0f12;
  --ui-shadow: 0 1px 2px rgb(0 0 0 / 0.4), 0 4px 16px rgb(0 0 0 / 0.3);
  --ui-shadow-lg: 0 12px 40px rgb(0 0 0 / 0.5);
  --ui-focus: 0 0 0 3px rgb(129 140 248 / 0.5);
}`;

const BTN_CSS = `.btn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 18px;
  min-height: 40px;
  border-radius: var(--ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: var(--ui-accent); color: var(--ui-accent-text); }
.btn-primary:hover:not(:disabled) { background: var(--ui-accent-hover); }
.btn-secondary { background: var(--ui-surface); color: var(--ui-text); border-color: var(--ui-border); }
.btn-secondary:hover:not(:disabled) { background: var(--ui-surface-2); }
.btn-danger { background: var(--ui-danger); color: var(--ui-danger-text); }
.btn-danger:hover:not(:disabled) { filter: brightness(0.92); }`;

window.COMPONENTS = [
  /* ───────────────────────── Buttons ───────────────────────── */
  {
    id: 'buttons',
    name: 'Buttons',
    category: 'Actions',
    description: 'Primary, secondary, ghost and destructive buttons with hover, focus and disabled states.',
    notes: 'Use one primary button per view. Label with a verb (“Save changes”, not “Submit”). Use <button> for actions and <a> for navigation.',
    html: `<div class="btn-row">
  <button class="btn btn-primary" type="button">Save changes</button>
  <button class="btn btn-secondary" type="button">Cancel</button>
  <button class="btn btn-ghost" type="button">Learn more</button>
  <button class="btn btn-danger" type="button">Delete</button>
  <button class="btn btn-primary" type="button" disabled>Disabled</button>
</div>`,
    css: `.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
${BTN_CSS}
.btn-ghost { background: transparent; color: var(--ui-accent); }
.btn-ghost:hover:not(:disabled) { background: var(--ui-accent-soft); }`,
  },

  /* ───────────────────────── Text field ───────────────────────── */
  {
    id: 'text-field',
    name: 'Text field',
    category: 'Forms',
    description: 'Labelled input with helper text and an error state wired up with aria-describedby.',
    notes: 'Always use a visible <label>; placeholders vanish while typing. Link hints and errors with aria-describedby and flag errors with aria-invalid.',
    html: `<div class="form-stack">
  <div class="field">
    <label class="field-label" for="email">Email</label>
    <input class="field-input" id="email" type="email" placeholder="you@example.com" autocomplete="email" aria-describedby="email-hint">
    <p class="field-hint" id="email-hint">We’ll never share your email.</p>
  </div>
  <div class="field">
    <label class="field-label" for="password">Password</label>
    <input class="field-input" id="password" type="password" autocomplete="new-password" aria-invalid="true" aria-describedby="password-error">
    <p class="field-error" id="password-error">Use at least 8 characters.</p>
  </div>
</div>`,
    css: `.form-stack {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 360px;
}
.field { display: grid; gap: 6px; }
.field-label { font-size: 14px; font-weight: 600; color: var(--ui-text); }
.field-input {
  font: inherit;
  font-size: 15px;
  padding: 10px 12px;
  min-height: 42px;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border-strong);
  border-radius: var(--ui-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input::placeholder { color: var(--ui-muted); opacity: 0.8; }
.field-input:hover { border-color: var(--ui-text); }
.field-input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.field-input[aria-invalid="true"] { border-color: var(--ui-danger); }
.field-hint, .field-error { margin: 0; font-size: 13px; }
.field-hint { color: var(--ui-muted); }
.field-error { color: var(--ui-danger); font-weight: 500; }
.field-error::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  vertical-align: -2px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M10 2.8 18 17H2Z%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linejoin=%27round%27/%3E%3Cpath d=%27M10 8v4M10 14.5v.5%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}`,
  },

  /* ───────────────────────── Checkbox & switch ───────────────────────── */
  {
    id: 'checkbox-switch',
    name: 'Checkbox & switch',
    category: 'Forms',
    description: 'Custom-styled native checkboxes and a toggle switch. Keyboard and screen-reader support stays native.',
    notes: 'Checkboxes are for choices submitted later; switches are for settings that apply instantly. The whole label is clickable, giving a large target.',
    html: `<div class="choices">
  <label class="check">
    <input type="checkbox" checked>
    <span>Email me product updates</span>
  </label>
  <label class="check">
    <input type="checkbox">
    <span>I agree to the terms</span>
  </label>
  <label class="switch">
    <input type="checkbox" role="switch" checked>
    <span class="switch-track" aria-hidden="true"></span>
    <span>Notifications</span>
  </label>
</div>`,
    css: `.choices { display: grid; gap: 14px; }
.check, .switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
}
.check input {
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;
  border: 1.5px solid var(--ui-border-strong);
  border-radius: 6px;
  background: var(--ui-surface);
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}
.check input::after {
  content: "";
  width: 5px;
  height: 10px;
  border: solid var(--ui-accent-text);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px) scale(0);
  transition: transform 0.12s;
}
.check input:checked { background: var(--ui-accent); border-color: var(--ui-accent); }
.check input:checked::after { transform: rotate(45deg) translate(-1px, -1px) scale(1); }
.check input:focus-visible { outline: none; box-shadow: var(--ui-focus); }

.switch input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.switch-track {
  position: relative;
  width: 42px;
  height: 24px;
  flex: none;
  border-radius: 999px;
  background: var(--ui-border-strong);
  transition: background-color 0.2s;
}
.switch-track::after {
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
.switch input:checked + .switch-track { background: var(--ui-accent); }
.switch input:checked + .switch-track::after { transform: translateX(18px); }
.switch input:focus-visible + .switch-track { box-shadow: var(--ui-focus); }

@media (prefers-reduced-motion: reduce) {
  .switch-track, .switch-track::after, .check input::after { transition: none; }
}`,
  },

  /* ───────────────────────── Card ───────────────────────── */
  {
    id: 'card',
    name: 'Card',
    category: 'Content',
    description: 'Content card with media, eyebrow, title, summary and a link footer.',
    notes: 'Keep one clear link per card. Put the meta line (category, read time) above the title as a quick scanning aid.',
    html: `<article class="card">
  <div class="card-media" aria-hidden="true"></div>
  <div class="card-body">
    <p class="card-eyebrow">Guide · 6 min read</p>
    <h3 class="card-title">Designing forms people finish</h3>
    <p class="card-text">Labels, errors and layout patterns that cut abandonment without adding friction.</p>
  </div>
  <div class="card-footer">
    <a class="card-link" href="#">Read article <span aria-hidden="true">→</span></a>
  </div>
</article>`,
    css: `.card {
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow);
}
.card-media {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(circle at 30% 40%, var(--ui-accent) 0 18%, transparent 19%),
    linear-gradient(135deg, var(--ui-accent-soft), var(--ui-surface-2));
}
.card-body { padding: 20px 20px 8px; }
.card-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
}
.card-title { margin: 0 0 8px; font-size: 19px; line-height: 1.3; color: var(--ui-text); }
.card-text { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.card-footer { padding: 12px 20px 20px; }
.card-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent);
  text-decoration: none;
  border-radius: 4px;
}
.card-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.card-link:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
  },

  /* ───────────────────────── Alerts ───────────────────────── */
  {
    id: 'alerts',
    name: 'Alerts',
    category: 'Feedback',
    description: 'Info, success, warning and error banners. Each pairs color with an icon and text, so meaning never relies on color alone.',
    notes: 'Use role="status" for polite updates and role="alert" only for urgent errors; alert interrupts screen readers.',
    html: `<div class="alerts">
  <div class="alert alert-info" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9v5M10 6v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">New version available</p>
      <p class="alert-text">Refresh the page to get the latest features.</p>
    </div>
  </div>
  <div class="alert alert-success" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m6.5 10.2 2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div>
      <p class="alert-title">Payment received</p>
      <p class="alert-text">A receipt is on its way to your inbox.</p>
    </div>
  </div>
  <div class="alert alert-warning" role="status">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 18 17H2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">Storage almost full</p>
      <p class="alert-text">You’ve used 92% of your plan. Free up space or upgrade.</p>
    </div>
  </div>
  <div class="alert alert-error" role="alert">
    <svg class="alert-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m7.2 7.2 5.6 5.6M12.8 7.2l-5.6 5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    <div>
      <p class="alert-title">Couldn’t save your changes</p>
      <p class="alert-text">Check your connection and try again.</p>
    </div>
  </div>
</div>`,
    css: `.alerts { display: grid; gap: 12px; width: 100%; max-width: 520px; }
.alert {
  --tone: var(--ui-accent);
  --tone-soft: var(--ui-accent-soft);
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: var(--ui-radius-sm);
  background: var(--tone-soft);
  border: 1px solid color-mix(in srgb, var(--tone) 30%, transparent);
  border-left: 4px solid var(--tone);
}
.alert-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.alert-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.alert-error { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.alert-icon { width: 20px; height: 20px; flex: none; margin-top: 1px; color: var(--tone); }
.alert-title { margin: 0; font-size: 15px; font-weight: 600; color: var(--ui-text); }
.alert-text { margin: 2px 0 0; font-size: 14px; color: var(--ui-muted); }`,
  },

  /* ───────────────────────── Badges ───────────────────────── */
  {
    id: 'badges',
    name: 'Badges',
    category: 'Content',
    description: 'Compact status labels in neutral, accent and semantic tones.',
    notes: 'Badges label things; they are not buttons. Keep text to one or two words.',
    html: `<div class="badges">
  <span class="badge">Draft</span>
  <span class="badge badge-accent">New</span>
  <span class="badge badge-success"><span class="badge-dot" aria-hidden="true"></span>Active</span>
  <span class="badge badge-warning">Pending</span>
  <span class="badge badge-danger">Failed</span>
</div>`,
    css: `.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.badge {
  --tone: var(--ui-muted);
  --tone-soft: var(--ui-surface-2);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--tone);
  background: var(--tone-soft);
  border-radius: 999px;
}
.badge-accent { --tone: var(--ui-accent); --tone-soft: var(--ui-accent-soft); }
.badge-success { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.badge-warning { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.badge-danger { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }`,
  },

  /* ───────────────────────── Tabs ───────────────────────── */
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Accessible tabs following the WAI-ARIA pattern, with arrow-key navigation and roving tabindex.',
    notes: 'Tab key moves into the tab list then out to the panel; arrow keys move between tabs. Use tabs for peer views of the same thing, not for steps.',
    html: `<div class="tabs" data-tabs>
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button class="tab" role="tab" id="tab-0" aria-controls="panel-0" aria-selected="true">Profile</button>
    <button class="tab" role="tab" id="tab-1" aria-controls="panel-1" aria-selected="false" tabindex="-1">Security</button>
    <button class="tab" role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">Billing</button>
  </div>
  <div class="tab-panel" role="tabpanel" id="panel-0" aria-labelledby="tab-0" tabindex="0">Update your name, photo and bio.</div>
  <div class="tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0" hidden>Change your password and turn on two-factor sign-in.</div>
  <div class="tab-panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" hidden>Manage your plan, payment method and invoices.</div>
</div>`,
    css: `.tabs { width: 100%; max-width: 480px; }
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
.tab-panel:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 6px; }`,
    js: `document.querySelectorAll('[data-tabs]').forEach((root) => {
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
});`,
    react: `import { useRef, useState } from 'react';
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
}`,
    vue: `<script setup>
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
__CSS__
</style>`,
    svelte: `<script>
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
__CSS__
</style>`,
  },

  /* ───────────────────────── Modal ───────────────────────── */
  {
    id: 'modal',
    name: 'Modal dialog',
    category: 'Overlays',
    description: 'Confirmation dialog built on the native <dialog> element: focus trapping, Esc to close and a backdrop come built in.',
    notes: 'Name the action in the confirm button (“Delete project”), not “OK”. Clicking the backdrop or pressing Esc cancels. Focus returns to the trigger on close.',
    minHeight: 380,
    html: `<button class="btn btn-primary" type="button" data-open-modal="delete-dialog">Delete project…</button>

<dialog class="modal" id="delete-dialog" aria-labelledby="modal-title">
  <form method="dialog" class="modal-body">
    <h2 class="modal-title" id="modal-title">Delete project?</h2>
    <p class="modal-text">This permanently removes “Website redesign” and all of its files. This can’t be undone.</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" value="cancel">Cancel</button>
      <button class="btn btn-danger" value="confirm">Delete project</button>
    </div>
  </form>
</dialog>`,
    css: `${BTN_CSS}
.modal {
  width: min(440px, calc(100vw - 32px));
  padding: 0;
  color: var(--ui-text);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.modal::backdrop { background: rgb(0 0 0 / 0.45); backdrop-filter: blur(2px); }
.modal[open] { animation: modal-in 0.18s ease-out; }
.modal-body { padding: 24px; }
.modal-title { margin: 0 0 8px; font-size: 19px; }
.modal-text { margin: 0 0 24px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }

@keyframes modal-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
}
@media (prefers-reduced-motion: reduce) {
  .modal[open] { animation: none; }
}`,
    js: `document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.openModal);
  trigger.addEventListener('click', () => dialog.showModal());
  // Close when the backdrop (the dialog element itself) is clicked
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close('cancel');
  });
  dialog.addEventListener('close', () => {
    console.log('Dialog result:', dialog.returnValue);
  });
});`,
    react: `import { useRef } from 'react';
import './Modal.css';

export function Modal({ onConfirm }) {
  const dialog = useRef(null);

  const handleClose = () => {
    if (dialog.current.returnValue === 'confirm') onConfirm?.();
  };

  return (
    <>
      <button className="btn btn-primary" type="button" onClick={() => dialog.current.showModal()}>
        Delete project…
      </button>

      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onClose={handleClose}
        onClick={(e) => e.target === dialog.current && dialog.current.close('cancel')}
      >
        <form method="dialog" className="modal-body">
          <h2 className="modal-title" id="modal-title">Delete project?</h2>
          <p className="modal-text">
            This permanently removes “Website redesign” and all of its files. This can’t be undone.
          </p>
          <div className="modal-actions">
            <button className="btn btn-secondary" value="cancel">Cancel</button>
            <button className="btn btn-danger" value="confirm">Delete project</button>
          </div>
        </form>
      </dialog>
    </>
  );
}`,
    vue: `<script setup>
import { ref } from 'vue';

const emit = defineEmits(['confirm']);
const dialog = ref(null);

function onClose() {
  if (dialog.value.returnValue === 'confirm') emit('confirm');
}
function onBackdrop(e) {
  if (e.target === dialog.value) dialog.value.close('cancel');
}
</script>

<template>
  <button class="btn btn-primary" type="button" @click="dialog.showModal()">Delete project…</button>

  <dialog ref="dialog" class="modal" aria-labelledby="modal-title" @close="onClose" @click="onBackdrop">
    <form method="dialog" class="modal-body">
      <h2 class="modal-title" id="modal-title">Delete project?</h2>
      <p class="modal-text">This permanently removes “Website redesign” and all of its files. This can’t be undone.</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" value="cancel">Cancel</button>
        <button class="btn btn-danger" value="confirm">Delete project</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
__CSS__
</style>`,
    svelte: `<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let dialog;

  function onClose() {
    if (dialog.returnValue === 'confirm') dispatch('confirm');
  }
  function onBackdrop(e) {
    if (e.target === dialog) dialog.close('cancel');
  }
</script>

<button class="btn btn-primary" type="button" on:click={() => dialog.showModal()}>Delete project…</button>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} class="modal" aria-labelledby="modal-title" on:close={onClose} on:click={onBackdrop}>
  <form method="dialog" class="modal-body">
    <h2 class="modal-title" id="modal-title">Delete project?</h2>
    <p class="modal-text">This permanently removes “Website redesign” and all of its files. This can’t be undone.</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" value="cancel">Cancel</button>
      <button class="btn btn-danger" value="confirm">Delete project</button>
    </div>
  </form>
</dialog>

<style>
__CSS__
</style>`,
  },

  /* ───────────────────────── Accordion ───────────────────────── */
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Content',
    description: 'Zero-JavaScript FAQ accordion built on <details> and <summary>.',
    notes: 'Native <details> is keyboard and screen-reader accessible out of the box, and browser find-in-page can search inside closed panels.',
    html: `<div class="accordion">
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
</div>`,
    css: `.accordion {
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
.accordion-content p { margin: 0; }`,
  },

  /* ───────────────────────── Navbar ───────────────────────── */
  {
    id: 'navbar',
    name: 'Navigation bar',
    category: 'Navigation',
    description: 'Responsive site header with brand, links, actions and a no-JS mobile menu.',
    notes: 'Mark the current page with aria-current="page". Keep top-level links to about five to seven, with plain names people would search for.',
    layout: 'full',
    html: `<header class="nav">
  <a class="nav-brand" href="#"><span class="nav-logo" aria-hidden="true"></span>Acme</a>
  <nav class="nav-main" aria-label="Main">
    <ul class="nav-links">
      <li><a href="#" aria-current="page">Product</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </nav>
  <div class="nav-actions">
    <a class="nav-signin" href="#">Sign in</a>
    <a class="nav-cta" href="#">Get started</a>
    <details class="nav-menu">
      <summary aria-label="Menu"><span></span></summary>
      <ul>
        <li><a href="#" aria-current="page">Product</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Docs</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Sign in</a></li>
      </ul>
    </details>
  </div>
</header>`,
    css: `.nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.nav a { color: inherit; text-decoration: none; border-radius: 6px; }
.nav a:focus-visible, .nav summary:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nav-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; }
.nav-logo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--ui-accent), var(--ui-accent-hover));
}
.nav-links { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }
.nav-links a, .nav-signin {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-muted);
}
.nav-links a:hover, .nav-signin:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.nav-links a[aria-current="page"] { color: var(--ui-text); font-weight: 600; }
.nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nav-cta {
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-accent-text) !important;
  background: var(--ui-accent);
}
.nav-cta:hover { background: var(--ui-accent-hover); }

.nav-menu { display: none; }
.nav-menu summary {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  list-style: none;
}
.nav-menu summary::-webkit-details-marker { display: none; }
.nav-menu summary span,
.nav-menu summary span::before,
.nav-menu summary span::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ui-text);
  border-radius: 2px;
  position: relative;
}
.nav-menu summary span::before, .nav-menu summary span::after { content: ""; position: absolute; }
.nav-menu summary span::before { top: -6px; }
.nav-menu summary span::after { top: 6px; }
.nav-menu ul {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-lg);
}
.nav-menu li a { display: block; padding: 12px; font-weight: 500; }
.nav-menu li a:hover { background: var(--ui-surface-2); }

@media (max-width: 720px) {
  .nav-main, .nav-signin { display: none; }
  .nav-menu { display: block; }
}`,
  },

  /* ───────────────────────── Toast ───────────────────────── */
  {
    id: 'toast',
    name: 'Toast notification',
    category: 'Feedback',
    description: 'Non-blocking confirmation that appears briefly in a live region and can be dismissed.',
    notes: 'Toasts are for low-stakes confirmations. Never put the only copy of an error or an essential action in a toast; it disappears. Keep a live region in the page from load so screen readers announce new toasts.',
    minHeight: 260,
    html: `<button class="btn btn-primary" type="button" data-toast="Changes saved">Save changes</button>

<div class="toast-region" role="region" aria-label="Notifications" aria-live="polite"></div>`,
    css: `${BTN_CSS}
.toast-region {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  display: grid;
  gap: 10px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  padding: 12px 12px 12px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: var(--ui-radius-sm);
  box-shadow: var(--ui-shadow-lg);
  animation: toast-in 0.2s ease-out;
}
.toast-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  color: #fff;
  background: var(--ui-success);
}
.toast-msg { flex: 1; }
.toast-close {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 1;
  color: inherit;
  background: none;
  border: 0;
  border-radius: 6px;
  opacity: 0.7;
  cursor: pointer;
}
.toast-close:hover { opacity: 1; background: rgb(127 127 127 / 0.2); }
.toast-close:focus-visible { outline: none; box-shadow: var(--ui-focus); opacity: 1; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(10px); }
}
@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}`,
    js: `const region = document.querySelector('.toast-region');

function showToast(message, duration = 4000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML =
    '<span class="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
    '<span class="toast-msg"></span>' +
    '<button class="toast-close" type="button" aria-label="Dismiss"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>';
  toast.querySelector('.toast-msg').textContent = message;

  const remove = () => toast.remove();
  toast.querySelector('.toast-close').addEventListener('click', remove);
  region.append(toast);
  setTimeout(remove, duration);
}

document.querySelectorAll('[data-toast]').forEach((btn) => {
  btn.addEventListener('click', () => showToast(btn.dataset.toast));
});`,
    react: `import { useState } from 'react';
import './Toast.css';

export function ToastDemo() {
  const [toasts, setToasts] = useState([]);

  const dismiss = (id) => setToasts((list) => list.filter((t) => t.id !== id));

  const showToast = (message, duration = 4000) => {
    const id = crypto.randomUUID();
    setToasts((list) => [...list, { id, message }]);
    setTimeout(() => dismiss(id), duration);
  };

  return (
    <>
      <button className="btn btn-primary" type="button" onClick={() => showToast('Changes saved')}>
        Save changes
      </button>

      <div className="toast-region" role="region" aria-label="Notifications" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span className="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span className="toast-msg">{t.message}</span>
            <button className="toast-close" type="button" aria-label="Dismiss" onClick={() => dismiss(t.id)}>
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}`,
    vue: `<script setup>
import { ref } from 'vue';

const toasts = ref([]);

function dismiss(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}
function showToast(message, duration = 4000) {
  const id = crypto.randomUUID();
  toasts.value.push({ id, message });
  setTimeout(() => dismiss(id), duration);
}
</script>

<template>
  <button class="btn btn-primary" type="button" @click="showToast('Changes saved')">Save changes</button>

  <div class="toast-region" role="region" aria-label="Notifications" aria-live="polite">
    <div v-for="t in toasts" :key="t.id" class="toast">
      <span class="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span class="toast-msg">{{ t.message }}</span>
      <button class="toast-close" type="button" aria-label="Dismiss" @click="dismiss(t.id)"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
  </div>
</template>

<style scoped>
__CSS__
</style>`,
    svelte: `<script>
  let toasts = [];

  function dismiss(id) {
    toasts = toasts.filter((t) => t.id !== id);
  }
  function showToast(message, duration = 4000) {
    const id = crypto.randomUUID();
    toasts = [...toasts, { id, message }];
    setTimeout(() => dismiss(id), duration);
  }
</script>

<button class="btn btn-primary" type="button" on:click={() => showToast('Changes saved')}>Save changes</button>

<div class="toast-region" role="region" aria-label="Notifications" aria-live="polite">
  {#each toasts as t (t.id)}
    <div class="toast">
      <span class="toast-icon" aria-hidden="true"><svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="m5 10.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span class="toast-msg">{t.message}</span>
      <button class="toast-close" type="button" aria-label="Dismiss" on:click={() => dismiss(t.id)}><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
  {/each}
</div>

<style>
__CSS__
</style>`,
  },

  /* ───────────────────────── Progress & spinner ───────────────────────── */
  {
    id: 'progress',
    name: 'Progress & spinner',
    category: 'Feedback',
    description: 'Determinate progress bar and an indeterminate spinner, both announced to assistive tech.',
    notes: 'Use a progress bar when you know how long something takes, a spinner for short unknown waits (under ~3 s), and skeletons for loading page content.',
    html: `<div class="progress-demo">
  <div class="progress-block">
    <div class="progress-head">
      <span id="upload-label">Uploading report.pdf</span>
      <span class="progress-value">64%</span>
    </div>
    <div class="progress" role="progressbar" aria-labelledby="upload-label" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: 64%"></div>
    </div>
  </div>
  <div class="loading" role="status">
    <span class="spinner" aria-hidden="true"></span>
    <span>Loading results…</span>
  </div>
</div>`,
    css: `.progress-demo { display: grid; gap: 28px; width: 100%; max-width: 400px; }
.progress-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-text);
}
.progress-value { color: var(--ui-muted); font-variant-numeric: tabular-nums; }
.progress {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--ui-surface-2);
}
.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: var(--ui-accent);
  transition: width 0.3s ease;
}
.loading { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ui-muted); }
.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2.5px solid var(--ui-surface-2);
  border-top-color: var(--ui-accent);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .spinner { animation-duration: 2s; }
}`,
  },

  /* ───────────────────────── Skeleton ───────────────────────── */
  {
    id: 'skeleton',
    name: 'Skeleton loader',
    category: 'Feedback',
    description: 'Shimmering placeholder that mirrors the shape of the content it stands in for.',
    notes: 'Match the real layout so nothing jumps when content arrives. The shimmer stops for people who prefer reduced motion.',
    html: `<div class="skeleton-card" role="status" aria-busy="true" aria-label="Loading post">
  <div class="skeleton skeleton-avatar"></div>
  <div class="skeleton-lines">
    <div class="skeleton skeleton-line skeleton-short"></div>
    <div class="skeleton skeleton-line"></div>
    <div class="skeleton skeleton-line skeleton-medium"></div>
  </div>
</div>`,
    css: `.skeleton-card {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.skeleton {
  background: linear-gradient(90deg, var(--ui-surface-2) 25%, var(--ui-border) 37%, var(--ui-surface-2) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 6px;
}
.skeleton-avatar { width: 44px; height: 44px; flex: none; border-radius: 50%; }
.skeleton-lines { display: grid; gap: 10px; flex: 1; align-content: center; }
.skeleton-line { height: 12px; }
.skeleton-short { width: 40%; }
.skeleton-medium { width: 70%; }

@keyframes shimmer {
  from { background-position: 100% 50%; }
  to { background-position: 0 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}`,
  },

  /* ───────────────────────── Avatars ───────────────────────── */
  {
    id: 'avatars',
    name: 'Avatar group',
    category: 'Content',
    description: 'Overlapping initials avatars with an overflow count.',
    notes: 'Give the group an accessible name and each avatar a title, so the people are known even when only initials show.',
    html: `<div class="avatars" role="group" aria-label="Project members">
  <span class="avatar" title="Ada Lovelace">AL</span>
  <span class="avatar" title="Grace Hopper">GH</span>
  <span class="avatar" title="Alan Turing">AT</span>
  <span class="avatar" title="Katherine Johnson">KJ</span>
  <span class="avatar avatar-more" title="3 more members">+3</span>
</div>`,
    css: `.avatars { display: flex; }
.avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-left: -10px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  border-radius: 50%;
  border: 3px solid var(--ui-bg);
  background: #4f46e5;
}
.avatar:first-child { margin-left: 0; }
.avatar:nth-child(2) { background: #0f766e; }
.avatar:nth-child(3) { background: #c2410c; }
.avatar:nth-child(4) { background: #be185d; }
.avatar-more.avatar { color: var(--ui-text); background: var(--ui-surface-2); }`,
  },

  /* ───────────────────────── Pricing ───────────────────────── */
  {
    id: 'pricing-card',
    name: 'Pricing card',
    category: 'Sections',
    description: 'Plan card with price, feature list and a single call to action.',
    notes: 'Say what happens after the click (“Start free trial”) and answer the top worry right below it (“No card required”).',
    html: `<div class="pricing">
  <div class="pricing-head">
    <p class="pricing-plan">Pro</p>
    <span class="pricing-tag">Most popular</span>
  </div>
  <p class="pricing-price"><span class="pricing-amount">$12</span><span class="pricing-period">per user / month</span></p>
  <p class="pricing-desc">For small teams that ship fast.</p>
  <ul class="pricing-features">
    <li>Unlimited projects</li>
    <li>Version history for 1 year</li>
    <li>Custom domains</li>
    <li>Priority email support</li>
  </ul>
  <a class="pricing-cta" href="#">Start free trial</a>
  <p class="pricing-note">14 days free · No card required</p>
</div>`,
    css: `.pricing {
  width: 100%;
  max-width: 320px;
  padding: 28px;
  background: var(--ui-surface);
  border: 2px solid var(--ui-accent);
  border-radius: 16px;
  box-shadow: var(--ui-shadow);
}
.pricing-head { display: flex; align-items: center; justify-content: space-between; }
.pricing-plan { margin: 0; font-size: 16px; font-weight: 700; color: var(--ui-text); }
.pricing-tag {
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 999px;
}
.pricing-price { display: flex; align-items: baseline; gap: 8px; margin: 16px 0 4px; }
.pricing-amount { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; color: var(--ui-text); }
.pricing-period { font-size: 14px; color: var(--ui-muted); }
.pricing-desc { margin: 0 0 20px; font-size: 15px; color: var(--ui-muted); }
.pricing-features { display: grid; gap: 10px; margin: 0 0 24px; padding: 0; list-style: none; }
.pricing-features li { display: flex; gap: 10px; font-size: 15px; color: var(--ui-text); }
.pricing-features li::before {
  content: "";
  width: 16px;
  height: 16px;
  flex: none;
  margin-top: 3px;
  background: var(--ui-success);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27m4 10.5 4 4 8-9%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center / contain no-repeat;
}
.pricing-cta {
  display: block;
  padding: 12px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: var(--ui-accent-text);
  background: var(--ui-accent);
  border-radius: var(--ui-radius-sm);
}
.pricing-cta:hover { background: var(--ui-accent-hover); }
.pricing-cta:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.pricing-note { margin: 10px 0 0; font-size: 13px; text-align: center; color: var(--ui-muted); }`,
  },

  /* ───────────────────────── Empty state ───────────────────────── */
  {
    id: 'empty-state',
    name: 'Empty state',
    category: 'Feedback',
    description: 'Explains why a view is empty and offers the next step.',
    notes: 'An empty screen is a chance to teach. Say what will appear here and give one clear way to get started.',
    html: `<div class="empty">
  <svg class="empty-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 14a4 4 0 0 1 4-4h9l4 5h15a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 22v10M19 27h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
  <h3 class="empty-title">No projects yet</h3>
  <p class="empty-text">Projects you create will show up here. Start from a template or a blank canvas.</p>
  <div class="empty-actions">
    <button class="btn btn-primary" type="button">New project</button>
    <button class="btn btn-secondary" type="button">Browse templates</button>
  </div>
</div>`,
    css: `${BTN_CSS}
.empty {
  display: grid;
  justify-items: center;
  max-width: 420px;
  padding: 40px 24px;
  text-align: center;
  border: 1.5px dashed var(--ui-border);
  border-radius: var(--ui-radius);
}
.empty-icon {
  width: 56px;
  height: 56px;
  padding: 10px;
  margin-bottom: 16px;
  color: var(--ui-accent);
  background: var(--ui-accent-soft);
  border-radius: 16px;
}
.empty-title { margin: 0 0 6px; font-size: 18px; color: var(--ui-text); }
.empty-text { margin: 0 0 20px; font-size: 15px; line-height: 1.55; color: var(--ui-muted); }
.empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }`,
  },

  /* ───────────────────────── Breadcrumb ───────────────────────── */
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    description: 'Shows where the page sits in the site hierarchy, using an ordered list.',
    notes: 'Separators are drawn with CSS so screen readers don’t read them out. The last item is the current page.',
    html: `<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Settings</a></li>
    <li><a href="#" aria-current="page">Notifications</a></li>
  </ol>
</nav>`,
    css: `.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}
.breadcrumb li + li::before {
  content: "/";
  margin: 0 10px;
  color: var(--ui-border-strong);
}
.breadcrumb a {
  color: var(--ui-muted);
  text-decoration: none;
  border-radius: 4px;
}
.breadcrumb a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.breadcrumb a:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.breadcrumb a[aria-current="page"] { color: var(--ui-text); font-weight: 600; pointer-events: none; }`,
  },

  /* ───────────────────────── Pagination ───────────────────────── */
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    description: 'Page links with previous/next, a current page and a gap for skipped pages.',
    notes: 'Give arrow-only links an aria-label. Use real links (with URLs) so pages can be bookmarked and opened in new tabs.',
    html: `<nav class="pagination" aria-label="Pagination">
  <a class="page" href="#" aria-label="Previous page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m12 5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  <a class="page" href="#">1</a>
  <a class="page" href="#" aria-current="page">2</a>
  <a class="page" href="#">3</a>
  <span class="page-gap" aria-hidden="true">…</span>
  <a class="page" href="#">12</a>
  <a class="page" href="#" aria-label="Next page"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
</nav>`,
    css: `.pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.page, .page-gap {
  display: grid;
  place-items: center;
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.page {
  color: var(--ui-text);
  text-decoration: none;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius-sm);
  background: var(--ui-surface);
}
.page:hover { background: var(--ui-surface-2); }
.page:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.page[aria-current="page"] { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.page-gap { color: var(--ui-muted); min-width: 24px; padding: 0; }`,
  },

  /* ───────────────────────── Tooltip ───────────────────────── */
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays',
    description: 'CSS-only tooltip that shows on hover and on keyboard focus.',
    notes: 'Tooltips hold short, non-essential hints. Touch screens have no hover, so never hide required information in one.',
    minHeight: 160,
    html: `<span class="tip">
  <button class="tip-trigger" type="button" aria-label="Billing help" aria-describedby="tip-billing">?</button>
  <span class="tip-bubble" role="tooltip" id="tip-billing">You’re billed on the 1st of each month.</span>
</span>`,
    css: `.tip { position: relative; display: inline-flex; }
.tip-trigger {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  font: inherit;
  font-weight: 700;
  color: var(--ui-muted);
  background: var(--ui-surface-2);
  border: 1px solid var(--ui-border);
  border-radius: 50%;
  cursor: help;
}
.tip-trigger:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.tip-bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  width: max-content;
  max-width: 240px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--ui-bg);
  background: var(--ui-text);
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s, transform 0.15s;
}
.tip-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border: 6px solid transparent;
  border-top-color: var(--ui-text);
  transform: translateX(-50%);
}
.tip:hover .tip-bubble,
.tip:focus-within .tip-bubble { opacity: 1; transform: translate(-50%, 0); }`,
  },

  /* ───────────────────────── Data table ───────────────────────── */
  {
    id: 'data-table',
    name: 'Data table',
    category: 'Content',
    description: 'Readable table with a caption, scoped headers, right-aligned numbers and status badges. Scrolls sideways on small screens.',
    notes: 'Right-align numbers and use tabular figures so digits line up. A <caption> names the table for screen-reader users.',
    layout: 'full',
    html: `<div class="table-wrap" tabindex="0" role="region" aria-labelledby="invoices-caption">
  <table class="table">
    <caption id="invoices-caption">Recent invoices</caption>
    <thead>
      <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Customer</th>
        <th scope="col">Status</th>
        <th scope="col" class="num">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>#1042</td>
        <td>Northwind Traders</td>
        <td><span class="status status-paid">Paid</span></td>
        <td class="num">$1,200.00</td>
      </tr>
      <tr>
        <td>#1041</td>
        <td>Globex Corp</td>
        <td><span class="status status-due">Due</span></td>
        <td class="num">$860.50</td>
      </tr>
      <tr>
        <td>#1040</td>
        <td>Initech</td>
        <td><span class="status status-late">Overdue</span></td>
        <td class="num">$3,075.00</td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `.table-wrap {
  width: 100%;
  overflow-x: auto;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.table-wrap:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.table { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.table caption {
  padding: 16px 20px 8px;
  font-size: 16px;
  font-weight: 700;
  text-align: start;
  color: var(--ui-text);
}
.table th, .table td { padding: 12px 16px; text-align: start; white-space: nowrap; }
.table th {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
  border-bottom: 1px solid var(--ui-border);
}
.table td { color: var(--ui-text); border-bottom: 1px solid var(--ui-border); }
.table tbody tr:last-child td { border-bottom: 0; }
.table tbody tr:hover { background: var(--ui-surface-2); }
.table .num { text-align: right; font-variant-numeric: tabular-nums; }
.status { padding: 3px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; }
.status-paid { color: var(--ui-success); background: var(--ui-success-soft); }
.status-due { color: var(--ui-warning); background: var(--ui-warning-soft); }
.status-late { color: var(--ui-danger); background: var(--ui-danger-soft); }`,
  },
];
