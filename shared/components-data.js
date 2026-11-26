/* Tearsheet — data and content: tables, charts, calendar, tree, chat, comments, code, kanban, carousel, lightbox. */
(function () {
  const SR = '.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }';
  const I = (d) => '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  window.COMPONENTS.push(
    /* ───────── Sortable table ───────── */
    {
      id: 'sortable-table',
      name: 'Sortable table',
      category: 'Data',
      description: 'Click a column header to sort; click again to reverse. Row checkboxes select, with a select-all.',
      notes: 'Headers are real buttons inside the <th>, and aria-sort tells screen readers the current order. The select-all box goes “mixed” when only some rows are picked.',
      layout: 'full',
      root: '.st-wrap',
      html: `<div class="st-wrap">
  <table class="st">
    <caption>Team members <span class="st-picked" aria-live="polite"></span></caption>
    <thead>
      <tr>
        <th scope="col" class="st-check"><input type="checkbox" aria-label="Select all members"></th>
        <th scope="col" aria-sort="ascending"><button type="button" data-key="name">Name</button></th>
        <th scope="col"><button type="button" data-key="role">Role</button></th>
        <th scope="col" class="num"><button type="button" data-key="tasks">Open tasks</button></th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Amara"></td><td>Amara</td><td>Designer</td><td class="num">7</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Bo"></td><td>Bo</td><td>Engineer</td><td class="num">12</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Chiara"></td><td>Chiara</td><td>Product</td><td class="num">3</td></tr>
      <tr><td class="st-check"><input type="checkbox" aria-label="Select Dev"></td><td>Dev</td><td>Engineer</td><td class="num">9</td></tr>
    </tbody>
  </table>
</div>`,
      css: `.st-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.st { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.st caption { padding: 16px 18px 8px; text-align: start; font-size: 16px; font-weight: 700; }
.st-picked { margin-left: 8px; font-size: 13px; font-weight: 600; color: var(--ui-accent); }
.st th, .st td { padding: 10px 18px; text-align: start; border-bottom: 1px solid var(--ui-border); }
.st tbody tr:last-child td { border-bottom: 0; }
.st tbody tr:has(input:checked) { background: var(--ui-accent-soft); }
.st .num { text-align: right; font-variant-numeric: tabular-nums; }
.st .st-check { width: 44px; padding-right: 0; }
.st input { width: 18px; height: 18px; accent-color: var(--ui-accent); }
.st th button {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 6px; margin: -4px -6px;
  font: inherit; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--ui-muted); background: none; border: 0; border-radius: 6px; cursor: pointer;
}
.st th.num button { flex-direction: row-reverse; }
.st th button::after { content: ""; width: 0; height: 0; border: 4px solid transparent; opacity: 0.4; border-top-color: currentColor; margin-top: 4px; }
.st th[aria-sort] button { color: var(--ui-text); }
.st th[aria-sort] button::after { opacity: 1; }
.st th[aria-sort="ascending"] button::after { border-top-color: transparent; border-bottom-color: currentColor; margin: -4px 0 0; }
.st th button:hover { color: var(--ui-text); background: var(--ui-surface-2); }
.st th button:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
      setup: `const tbody = root.querySelector('tbody');
const all = root.querySelector('thead input');
const picked = root.querySelector('.st-picked');
const heads = [...root.querySelectorAll('th button')];
const col = { name: 1, role: 2, tasks: 3 };

const sort = (btn) => {
  const th = btn.closest('th');
  const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
  root.querySelectorAll('th[aria-sort]').forEach((h) => h.removeAttribute('aria-sort'));
  th.setAttribute('aria-sort', dir);
  const i = col[btn.dataset.key];
  const rows = [...tbody.rows].sort((a, b) => {
    const x = a.cells[i].textContent, y = b.cells[i].textContent;
    const cmp = isNaN(x) ? x.localeCompare(y) : Number(x) - Number(y);
    return dir === 'ascending' ? cmp : -cmp;
  });
  tbody.append(...rows);
};
const sync = () => {
  const boxes = [...tbody.querySelectorAll('input')];
  const n = boxes.filter((b) => b.checked).length;
  all.checked = n === boxes.length;
  all.indeterminate = n > 0 && n < boxes.length;
  picked.textContent = n ? n + ' selected' : '';
};
const onAll = () => { tbody.querySelectorAll('input').forEach((b) => (b.checked = all.checked)); sync(); };
const onHead = (e) => sort(e.currentTarget);
heads.forEach((b) => b.addEventListener('click', onHead));
all.addEventListener('change', onAll);
tbody.addEventListener('change', sync);
return () => {
  heads.forEach((b) => b.removeEventListener('click', onHead));
  all.removeEventListener('change', onAll);
  tbody.removeEventListener('change', sync);
};`,
    },

    /* ───────── Bar chart ───────── */
    {
      id: 'bar-chart',
      name: 'Bar chart',
      category: 'Data',
      description: 'Horizontal bars drawn with plain HTML and CSS, every value printed next to its bar.',
      notes: 'The numbers are real text, so the chart is readable without colour or sight, and nothing needs a chart library. Sort bars by value unless the categories have a natural order.',
      html: `<figure class="bars">
  <figcaption>Visits by source, last 30 days</figcaption>
  <ul class="bars-list">
    <li style="--v: 100%"><span class="bars-name">Search</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">12,480</span></li>
    <li style="--v: 64%"><span class="bars-name">Direct</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">7,990</span></li>
    <li style="--v: 41%"><span class="bars-name">Newsletter</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">5,120</span></li>
    <li style="--v: 22%"><span class="bars-name">Social</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">2,740</span></li>
    <li style="--v: 9%"><span class="bars-name">Other</span><span class="bars-track"><span class="bars-fill"></span></span><span class="bars-val">1,130</span></li>
  </ul>
</figure>`,
      css: `.bars { width: 100%; max-width: 460px; margin: 0; }
.bars figcaption { margin-bottom: 14px; font-size: 15px; font-weight: 700; }
.bars-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.bars-list li { display: grid; grid-template-columns: 90px 1fr 64px; align-items: center; gap: 12px; font-size: 14px; }
.bars-name { color: var(--ui-muted); }
.bars-track { height: 14px; background: var(--ui-surface-2); border-radius: 4px; overflow: hidden; }
.bars-fill { display: block; height: 100%; width: var(--v); background: var(--ui-accent); border-radius: 4px; animation: bars-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; transform-origin: left; }
.bars-list li:nth-child(n + 2) .bars-fill { opacity: 0.8; }
.bars-val { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
@keyframes bars-grow { from { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) { .bars-fill { animation: none; } }`,
    },

    /* ───────── Line chart ───────── */
    {
      id: 'line-chart',
      name: 'Line chart',
      category: 'Data',
      description: 'A lightweight SVG line chart with gridlines, axis labels and a highlighted latest point.',
      notes: 'The SVG has a title and a description that state the trend in words, and the data is offered as a table for anyone who needs exact values.',
      html: `<figure class="line">
  <figcaption>Weekly sign-ups</figcaption>
  <svg class="line-svg" viewBox="0 0 400 200" role="img" aria-labelledby="line-t line-d">
    <title id="line-t">Weekly sign-ups, 8 weeks</title>
    <desc id="line-d">Sign-ups rose from 120 in week 1 to 310 in week 8, with a dip in week 5.</desc>
    <g class="line-grid"><path d="M40 20H390M40 70H390M40 120H390M40 170H390"/></g>
    <g class="line-y"><text x="32" y="24">300</text><text x="32" y="74">200</text><text x="32" y="124">100</text><text x="32" y="174">0</text></g>
    <path class="line-area" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34V170H40Z"/>
    <path class="line-path" d="M40 110L90 98L140 86L190 72L240 92L290 60L340 44L390 34"/>
    <circle class="line-dot" cx="390" cy="34" r="5"/>
    <g class="line-x"><text x="40" y="192">W1</text><text x="190" y="192">W4</text><text x="390" y="192">W8</text></g>
  </svg>
  <details class="line-data">
    <summary>Show data</summary>
    <div class="line-table" tabindex="0" role="region" aria-label="Weekly sign-ups as a table"><table><tbody><tr><th scope="row">Week</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th scope="row">Sign-ups</th><td>120</td><td>144</td><td>168</td><td>196</td><td>156</td><td>220</td><td>252</td><td>310</td></tr></tbody></table></div>
  </details>
</figure>`,
      css: `.line { width: 100%; max-width: 480px; margin: 0; }
.line figcaption { margin-bottom: 8px; font-size: 15px; font-weight: 700; }
.line-svg { display: block; width: 100%; height: auto; overflow: visible; }
.line-grid path { stroke: var(--ui-border); stroke-width: 1; }
.line-y text, .line-x text { font-size: 12px; fill: var(--ui-muted); font-variant-numeric: tabular-nums; }
.line-y text { text-anchor: end; }
.line-x text { text-anchor: middle; }
.line-area { fill: var(--ui-accent); opacity: 0.12; }
.line-path { fill: none; stroke: var(--ui-accent); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 600; animation: line-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
.line-dot { fill: var(--ui-surface); stroke: var(--ui-accent); stroke-width: 3; }
@keyframes line-draw { from { stroke-dashoffset: 600; } }
.line-data { margin-top: 8px; font-size: 13px; }
.line-data summary { cursor: pointer; color: var(--ui-accent); font-weight: 600; }
.line-table { max-width: 100%; margin-top: 8px; overflow-x: auto; }
.line-table:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.line-data table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
.line-data th, .line-data td { padding: 4px 8px; border: 1px solid var(--ui-border); }
@media (prefers-reduced-motion: reduce) { .line-path { animation: none; } }`,
    },

    /* ───────── Donut chart ───────── */
    {
      id: 'donut-chart',
      name: 'Donut chart',
      category: 'Data',
      description: 'A CSS conic-gradient donut with a total in the middle and a legend that carries the real numbers.',
      notes: 'Keep donuts to five slices or fewer. The legend repeats every value as text and uses patterns of position and order, not colour alone.',
      html: `<figure class="donut">
  <div class="donut-ring" role="img" aria-label="Storage used: 48 of 100 gigabytes. Photos 24, Video 14, Documents 6, Other 4.">
    <span class="donut-total"><b>48</b> of 100 GB</span>
  </div>
  <figcaption>
    <ul class="donut-legend">
      <li><i style="--c: var(--ui-accent)"></i>Photos <b>24 GB</b></li>
      <li><i style="--c: #0d9488"></i>Video <b>14 GB</b></li>
      <li><i style="--c: #c2410c"></i>Documents <b>6 GB</b></li>
      <li><i style="--c: #a855f7"></i>Other <b>4 GB</b></li>
    </ul>
  </figcaption>
</figure>`,
      css: `.donut { display: flex; flex-wrap: wrap; align-items: center; gap: 28px; margin: 0; }
.donut-ring {
  position: relative; display: grid; place-items: center; width: 170px; aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(var(--ui-accent) 0 24%, #0d9488 0 38%, #c2410c 0 44%, #a855f7 0 48%, var(--ui-surface-2) 0);
}
.donut-ring::before { content: ""; position: absolute; inset: 22px; border-radius: 50%; background: var(--ui-bg); }
.donut-total { position: relative; display: grid; text-align: center; font-size: 13px; color: var(--ui-muted); }
.donut-total b { font-size: 34px; line-height: 1; color: var(--ui-text); font-variant-numeric: tabular-nums; }
.donut-legend { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.donut-legend li { display: grid; grid-template-columns: 14px 1fr auto; align-items: center; gap: 10px; min-width: 180px; }
.donut-legend i { width: 14px; height: 14px; border-radius: 4px; background: var(--c); }
.donut-legend b { font-variant-numeric: tabular-nums; }`,
    },

    /* ───────── Sparkline stats ───────── */
    {
      id: 'sparkline-stats',
      name: 'Sparkline stats',
      category: 'Data',
      description: 'Compact metric tiles, each with a tiny trend line and its change spelled out.',
      notes: 'A sparkline shows shape, not values, so the number and the change sit next to it as text. Mark whether the change is good or bad in words.',
      layout: 'full',
      html: `<div class="spark-row">
  <article class="spark">
    <p class="spark-label">Revenue</p>
    <p class="spark-value">$24.8k</p>
    <svg class="spark-line up" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24L14 20L28 22L42 15L57 17L71 10L85 8L100 3"/></svg>
    <p class="spark-delta good">Up 8% this month</p>
  </article>
  <article class="spark">
    <p class="spark-label">Churn</p>
    <p class="spark-value">2.1%</p>
    <svg class="spark-line" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10L14 12L28 9L42 14L57 15L71 18L85 20L100 22"/></svg>
    <p class="spark-delta good">Down 0.4 points, good</p>
  </article>
  <article class="spark">
    <p class="spark-label">Response time</p>
    <p class="spark-value">340 ms</p>
    <svg class="spark-line bad" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22L14 21L28 22L42 18L57 19L71 12L85 10L100 6"/></svg>
    <p class="spark-delta bad">Up 60 ms, slower</p>
  </article>
</div>`,
      css: `.spark-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.spark { padding: 16px 18px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.spark p { margin: 0; }
.spark-label { font-size: 13px; font-weight: 600; color: var(--ui-muted); }
.spark-value { margin: 2px 0 8px !important; font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }
.spark-line { display: block; width: 100%; height: 34px; }
.spark-line path { fill: none; stroke: var(--ui-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
.spark-line.bad path { stroke: var(--ui-danger); }
.spark-delta { margin-top: 8px !important; font-size: 13px; font-weight: 600; }
.spark-delta.good { color: var(--ui-success); }
.spark-delta.bad { color: var(--ui-danger); }`,
    },

    /* ───────── Calendar ───────── */
    {
      id: 'calendar-month',
      name: 'Month calendar',
      category: 'Data',
      description: 'A month grid with today marked, event dots, and arrow-key navigation between days.',
      notes: 'It uses the ARIA grid pattern: one day is tabbable, arrow keys move by day and week, Enter selects. Each day button reads its full date and how many events it has.',
      root: '.cal',
      html: `<div class="cal">
  <div class="cal-head">
    <h3 class="cal-title" aria-live="polite">December 2026</h3>
    <p class="cal-picked">Pick a day</p>
  </div>
  <table class="cal-grid" role="grid" aria-label="December 2026">
    <thead><tr><th scope="col" abbr="Monday">Mo</th><th scope="col" abbr="Tuesday">Tu</th><th scope="col" abbr="Wednesday">We</th><th scope="col" abbr="Thursday">Th</th><th scope="col" abbr="Friday">Fr</th><th scope="col" abbr="Saturday">Sa</th><th scope="col" abbr="Sunday">Su</th></tr></thead>
    <tbody></tbody>
  </table>
</div>`,
      css: `.cal { width: 100%; max-width: 340px; padding: 16px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cal-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.cal-title { margin: 0; font-size: 16px; }
.cal-picked { margin: 0; font-size: 13px; color: var(--ui-muted); }
.cal-grid { width: 100%; border-collapse: collapse; table-layout: fixed; }
.cal-grid th { padding-bottom: 6px; font-size: 12px; font-weight: 600; color: var(--ui-muted); }
.cal-grid td { padding: 2px; text-align: center; }
.cal-day {
  position: relative; width: 100%; aspect-ratio: 1; max-width: 40px;
  font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; color: var(--ui-text);
  background: none; border: 0; border-radius: 50%; cursor: pointer;
}
.cal-day:hover { background: var(--ui-surface-2); }
.cal-day:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.cal-day.is-today { font-weight: 800; color: var(--ui-accent); box-shadow: inset 0 0 0 1.5px var(--ui-accent); }
.cal-day[aria-pressed="true"] { color: var(--ui-accent-text); background: var(--ui-accent); }
.cal-day.has-event::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: currentColor; }`,
      setup: `const YEAR = 2026, MONTH = 11; // December (0-based)
const TODAY = 9;
const EVENTS = { 3: 1, 9: 2, 14: 1, 22: 3, 31: 1 };
const tbody = root.querySelector('tbody');
const picked = root.querySelector('.cal-picked');
const days = new Date(YEAR, MONTH + 1, 0).getDate();
const offset = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7; // Monday first
const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const buttons = [];
let row;
for (let i = 0; i < offset + days; i++) {
  if (i % 7 === 0) { row = tbody.insertRow(); }
  const cell = row.insertCell();
  if (i < offset) continue;
  const d = i - offset + 1;
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'cal-day' + (d === TODAY ? ' is-today' : '') + (EVENTS[d] ? ' has-event' : '');
  b.textContent = d;
  b.tabIndex = d === TODAY ? 0 : -1;
  b.setAttribute('aria-pressed', 'false');
  b.setAttribute('aria-label', fmt.format(new Date(YEAR, MONTH, d)) + (d === TODAY ? ', today' : '') + (EVENTS[d] ? ', ' + EVENTS[d] + (EVENTS[d] > 1 ? ' events' : ' event') : ''));
  cell.append(b);
  buttons.push(b);
}
const focusDay = (d) => {
  const i = Math.max(0, Math.min(days - 1, d - 1));
  buttons.forEach((b, n) => (b.tabIndex = n === i ? 0 : -1));
  buttons[i].focus();
};
const select = (b) => {
  buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  picked.textContent = b.getAttribute('aria-label').split(',')[0];
};
const onKey = (e) => {
  const i = buttons.indexOf(document.activeElement);
  if (i < 0) return;
  const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
  if (step) { e.preventDefault(); focusDay(i + 1 + step); }
  else if (e.key === 'Home') { e.preventDefault(); focusDay(i + 1 - ((i + offset) % 7)); }
  else if (e.key === 'End') { e.preventDefault(); focusDay(i + 1 + (6 - ((i + offset) % 7))); }
};
const onClick = (e) => { const b = e.target.closest('.cal-day'); if (b) { select(b); focusDay(buttons.indexOf(b) + 1); } };
tbody.addEventListener('keydown', onKey);
tbody.addEventListener('click', onClick);
return () => { tbody.removeEventListener('keydown', onKey); tbody.removeEventListener('click', onClick); };`,
    },

    /* ───────── Tree view ───────── */
    {
      id: 'file-tree',
      name: 'File tree',
      category: 'Data',
      description: 'A nested folder tree built from <details>, with file and folder icons and no JavaScript.',
      notes: 'Each folder is a native disclosure, so it works with keyboard and screen readers out of the box. For thousands of nodes, switch to the full ARIA tree pattern with roving focus.',
      html: `<nav class="tree" aria-label="Project files">
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
</nav>`,
      css: `.tree { width: 100%; max-width: 300px; padding: 10px; font-size: 14px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
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
.tree-file[aria-current="page"] { color: var(--ui-accent); font-weight: 600; background: var(--ui-accent-soft); }`,
    },

    /* ───────── Description list ───────── */
    {
      id: 'description-list',
      name: 'Details list',
      category: 'Data',
      description: 'Label-and-value pairs for an order or a profile, with one value you can edit in place.',
      notes: 'Use a <dl> for key-value data so the pairs stay connected for screen readers. Right-align nothing here: these are words, not numbers.',
      html: `<dl class="dl">
  <div><dt>Order</dt><dd>#20418</dd></div>
  <div><dt>Placed</dt><dd><time datetime="2026-11-21">21 November 2026</time></dd></div>
  <div><dt>Status</dt><dd><span class="dl-badge">Shipped</span></dd></div>
  <div><dt>Delivery address</dt><dd>12 Harbour Street<br>Leith, Edinburgh EH6 6QZ</dd></div>
  <div><dt>Payment</dt><dd>Card ending 4421 <a href="#" class="dl-edit">Change</a></dd></div>
</dl>`,
      css: `.dl { width: 100%; max-width: 480px; margin: 0; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.dl div { display: grid; grid-template-columns: 150px 1fr; gap: 12px; padding: 12px 18px; }
.dl div + div { border-top: 1px solid var(--ui-border); }
.dl dt { font-size: 14px; color: var(--ui-muted); }
.dl dd { margin: 0; font-size: 14px; font-weight: 500; }
.dl-badge { padding: 2px 10px; font-size: 12px; font-weight: 600; color: var(--ui-success); background: var(--ui-success-soft); border-radius: 999px; }
.dl-edit { margin-left: 8px; font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }
@media (max-width: 420px) { .dl div { grid-template-columns: 1fr; gap: 2px; } }`,
    },

    /* ───────── Chat thread ───────── */
    {
      id: 'chat-thread',
      name: 'Chat thread',
      category: 'Content',
      description: 'Message bubbles with grouping, timestamps, a typing indicator and a composer that sends.',
      notes: 'The message list is a log (role="log") so new messages are announced. Sent messages align right and carry the same text colour contrast as received ones.',
      root: '.chat',
      html: `<section class="chat" aria-label="Chat with Lina">
  <div role="log" aria-live="polite" aria-label="Messages"><ol class="chat-log">
    <li class="msg them"><p>Hey! Did the new button styles land?</p><time datetime="09:41">09:41</time></li>
    <li class="msg me"><p>Yes, all four formats are in.</p></li>
    <li class="msg me"><p>Want me to send the React one?</p><time datetime="09:42">09:42</time></li>
    <li class="msg them typing" aria-label="Lina is typing"><span></span><span></span><span></span></li>
  </ol></div>
  <form class="chat-send">
    <label class="sr-only" for="chat-in">Message</label>
    <input id="chat-in" type="text" placeholder="Write a message" autocomplete="off" enterkeyhint="send">
    <button type="submit" aria-label="Send message"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10 17 3l-4 14-3-6-7-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
  </form>
</section>`,
      css: `${SR}
.chat { display: grid; width: 100%; max-width: 380px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); overflow: hidden; }
.chat-log { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 16px; list-style: none; }
.msg { max-width: 78%; }
.msg p { margin: 0; padding: 9px 13px; font-size: 14px; line-height: 1.4; border-radius: 16px; }
.msg time { display: block; margin: 3px 6px 8px; font-size: 12px; color: var(--ui-muted); }
.them { align-self: flex-start; }
.them p { background: var(--ui-surface-2); border-bottom-left-radius: 4px; }
.me { align-self: flex-end; text-align: right; }
.me p { color: var(--ui-accent-text); background: var(--ui-accent); border-bottom-right-radius: 4px; text-align: start; }
.typing { display: flex; gap: 4px; padding: 12px 14px; background: var(--ui-surface-2); border-radius: 16px 16px 16px 4px; }
.typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--ui-muted); animation: typing 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes typing { 30% { transform: translateY(-4px); opacity: 0.6; } }
.chat-send { display: flex; gap: 8px; padding: 10px; border-top: 1px solid var(--ui-border); }
.chat-send input { flex: 1; min-width: 0; padding: 10px 14px; font: inherit; font-size: 14px; color: var(--ui-text); background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.chat-send input:focus { outline: none; box-shadow: var(--ui-focus); }
.chat-send button { display: grid; place-items: center; width: 40px; height: 40px; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: 50%; cursor: pointer; }
.chat-send button svg { width: 18px; height: 18px; }
.chat-send button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
@media (prefers-reduced-motion: reduce) { .typing span { animation: none; } }`,
      setup: `const form = root.querySelector('.chat-send');
const input = form.querySelector('input');
const log = root.querySelector('.chat-log');
const typing = root.querySelector('.typing');
const onSubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.className = 'msg me';
  const p = document.createElement('p');
  p.textContent = text;
  const t = document.createElement('time');
  const now = new Date();
  t.textContent = now.toTimeString().slice(0, 5);
  t.dateTime = t.textContent;
  li.append(p, t);
  log.insertBefore(li, typing);
  input.value = '';
};
form.addEventListener('submit', onSubmit);
return () => form.removeEventListener('submit', onSubmit);`,
    },

    /* ───────── Comment thread ───────── */
    {
      id: 'comment-thread',
      name: 'Comment thread',
      category: 'Content',
      description: 'A discussion with one level of replies, author badges, relative times and quiet actions.',
      notes: 'Nest replies only one level deep; deeper threads become unreadable on phones. The reply button says who you are replying to.',
      html: `<section class="comments" aria-label="Comments">
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
</section>`,
      css: `.comments { width: 100%; max-width: 520px; }
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
.cmt-actions button:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
    },

    /* ───────── Code block ───────── */
    {
      id: 'code-block',
      name: 'Code block',
      category: 'Content',
      description: 'A file-tabbed code snippet with line numbers, a highlighted line and a copy button.',
      notes: 'Line numbers are CSS counters, so copying the code never copies the numbers. The block scrolls sideways instead of wrapping, and is focusable so keyboard users can scroll it.',
      root: '.codeblock',
      html: `<figure class="codeblock">
  <figcaption><span>tokens.css</span><button class="cb-copy" type="button">Copy</button></figcaption>
  <pre tabindex="0"><code><span class="ln">:root &#123;</span>
<span class="ln">  --ui-accent: #4f46e5;</span>
<span class="ln is-hl">  --ui-radius: 12px;</span>
<span class="ln">  --ui-focus: 0 0 0 3px rgb(79 70 229 / 0.4);</span>
<span class="ln">&#125;</span></code></pre>
</figure>`,
      css: `.codeblock { width: 100%; max-width: 520px; margin: 0; overflow: hidden; background: #16161c; border-radius: var(--ui-radius); }
.codeblock figcaption { display: flex; justify-content: space-between; align-items: center; padding: 8px 8px 8px 16px; font-family: ui-monospace, Consolas, monospace; font-size: 12px; color: #a1a1aa; border-bottom: 1px solid #2a2a33; }
.cb-copy { padding: 5px 12px; font: inherit; font-size: 12px; font-weight: 700; color: #e4e4e7; background: #2a2a33; border: 0; border-radius: 6px; cursor: pointer; }
.cb-copy:hover { background: #3a3a45; }
.cb-copy:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.codeblock pre { margin: 0; padding: 14px 0; overflow-x: auto; counter-reset: ln; font-family: ui-monospace, Consolas, monospace; font-size: 13px; line-height: 1.7; color: #e4e4e7; }
.codeblock pre:focus-visible { outline: none; box-shadow: inset var(--ui-focus); }
.ln { display: inline-block; min-width: 100%; padding-right: 16px; counter-increment: ln; }
.ln::before { content: counter(ln); display: inline-block; width: 2.5em; margin-right: 1em; text-align: right; color: #52525b; user-select: none; }
.ln.is-hl { background: rgb(129 140 248 / 0.16); box-shadow: inset 3px 0 0 #818cf8; }`,
      setup: `const btn = root.querySelector('.cb-copy');
const code = root.querySelector('code');
let t;
const onCopy = async () => {
  // join lines explicitly so line breaks survive in every framework
  const text = [...code.querySelectorAll('.ln')].map((l) => l.textContent).join('\\n');
  try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; }
  catch (e) { btn.textContent = 'Press Ctrl+C'; }
  clearTimeout(t);
  t = setTimeout(() => (btn.textContent = 'Copy'), 1600);
};
btn.addEventListener('click', onCopy);
return () => { clearTimeout(t); btn.removeEventListener('click', onCopy); };`,
    },

    /* ───────── Kanban column ───────── */
    {
      id: 'kanban-column',
      name: 'Kanban column',
      category: 'Content',
      description: 'A board column of task cards with labels, assignees, due dates and a quick add.',
      notes: 'Drag and drop should never be the only way to move a card: give each card a menu or a “Move to” control as the keyboard path.',
      html: `<section class="kanban" aria-labelledby="kb-title">
  <header class="kb-head"><h3 id="kb-title">In progress</h3><span class="kb-count">3</span></header>
  <ul class="kb-cards">
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag design">Design</span></p>
      <p class="kb-name">Dark mode for the settings page</p>
      <p class="kb-meta"><time datetime="2026-12-02">Due 2 Dec</time><span class="kb-av" title="Amara">A</span></p>
    </li>
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag bug">Bug</span><span class="kb-tag">Forms</span></p>
      <p class="kb-name">Date picker loses focus after closing</p>
      <p class="kb-meta"><time datetime="2026-11-28" class="kb-late">Due tomorrow</time><span class="kb-av alt" title="Bo">B</span></p>
    </li>
    <li class="kb-card">
      <p class="kb-tags"><span class="kb-tag">Docs</span></p>
      <p class="kb-name">Write the toast usage notes</p>
      <p class="kb-meta"><span>No due date</span><span class="kb-av" title="Chiara">C</span></p>
    </li>
  </ul>
  <button class="kb-add" type="button">${I('M10 4v12M4 10h12')} Add a card</button>
</section>`,
      css: `.kanban { width: 100%; max-width: 300px; padding: 12px; background: var(--ui-surface-2); border-radius: var(--ui-radius); }
.kb-head { display: flex; align-items: center; gap: 8px; padding: 2px 4px 10px; }
.kb-head h3 { margin: 0; font-size: 14px; }
.kb-count { padding: 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface); border-radius: 999px; }
.kb-cards { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.kb-card { padding: 12px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-sm); box-shadow: 0 1px 2px rgb(0 0 0 / 0.06); }
.kb-card p { margin: 0; }
.kb-tags { display: flex; gap: 4px; margin-bottom: 6px !important; }
.kb-tag { padding: 1px 8px; font-size: 12px; font-weight: 700; color: var(--ui-muted); background: var(--ui-surface-2); border-radius: 4px; }
.kb-tag.design { color: var(--ui-accent); background: var(--ui-accent-soft); }
.kb-tag.bug { color: var(--ui-danger); background: var(--ui-danger-soft); }
.kb-name { font-size: 14px; font-weight: 600; line-height: 1.35; }
.kb-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 10px !important; font-size: 12px; color: var(--ui-muted); }
.kb-late { color: var(--ui-warning); font-weight: 700; }
.kb-av { display: grid; place-items: center; width: 22px; height: 22px; font-size: 12px; font-weight: 700; color: #fff; background: #4f46e5; border-radius: 50%; }
.kb-av.alt { background: #0f766e; }
.kb-add { display: flex; align-items: center; gap: 6px; width: 100%; margin-top: 8px; padding: 8px; font: inherit; font-size: 13px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.kb-add svg { width: 16px; height: 16px; }
.kb-add:hover { color: var(--ui-text); background: var(--ui-surface); }
.kb-add:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
    },

    /* ───────── Carousel ───────── */
    {
      id: 'carousel',
      name: 'Carousel',
      category: 'Content',
      description: 'A swipeable row of slides with previous/next buttons and a slide counter. It never auto-advances.',
      notes: 'Native scroll-snap does the swiping. Autoplay is deliberately absent: moving content people did not start is a WCAG failure and most visitors never see slide 3 anyway.',
      layout: 'full',
      root: '.carousel',
      html: `<section class="carousel" aria-roledescription="carousel" aria-label="Three days in Lisbon">
  <div class="car-track" tabindex="0">
    <article class="car-slide" aria-roledescription="slide" aria-label="1 of 4"><p class="car-q">Day 1: ride tram 28 up to the castle before the crowds.</p><p class="car-who">Alfama · morning</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="2 of 4"><p class="car-q">Day 2: custard tarts in Belém, then the river walk back.</p><p class="car-who">Belém · all day</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="3 of 4"><p class="car-q">Day 3: a day trip to the palaces of Sintra.</p><p class="car-who">Sintra · 40 min by train</p></article>
    <article class="car-slide" aria-roledescription="slide" aria-label="4 of 4"><p class="car-q">Last night: fado in a tiny restaurant, booked ahead.</p><p class="car-who">Bairro Alto · evening</p></article>
  </div>
  <div class="car-ctrl">
    <button class="car-btn" type="button" data-dir="-1" aria-label="Previous slide">${I('m12 5-5 5 5 5')}</button>
    <span class="car-count" aria-live="polite">1 / 4</span>
    <button class="car-btn" type="button" data-dir="1" aria-label="Next slide">${I('m8 5 5 5-5 5')}</button>
  </div>
</section>`,
      css: `.carousel { width: 100%; }
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
@media (prefers-reduced-motion: reduce) { .car-track { scroll-behavior: auto; } }`,
      setup: `const track = root.querySelector('.car-track');
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
return () => { prev.removeEventListener('click', go); next.removeEventListener('click', go); track.removeEventListener('scroll', onScroll); };`,
    },

    /* ───────── Lightbox gallery ───────── */
    {
      id: 'lightbox',
      name: 'Lightbox gallery',
      category: 'Content',
      description: 'A thumbnail grid that opens each picture large in a dialog, with arrow keys to flip through.',
      notes: 'Thumbnails are buttons named after the picture. The open view is a <dialog>, so focus is trapped and returns to the thumbnail you came from. Replace the drawn art with your <img> tags.',
      minHeight: 420,
      root: '.gallery',
      html: `<div class="gallery">
  <ul class="gal-grid">
    <li><button type="button" class="gal-thumb" aria-label="Open: Dunes at dusk"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#f4c08b"/><circle cx="118" cy="38" r="16" fill="#fff3d6"/><path d="M0 86Q40 60 80 84T160 76V120H0Z" fill="#d9874a"/><path d="M0 100Q50 84 100 102T160 98V120H0Z" fill="#a85a2c"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: Lake and pines"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#bfe1ea"/><path d="M0 72 30 40 50 60 80 26 110 58 130 44 160 70V120H0Z" fill="#5d8aa8"/><rect y="78" width="160" height="42" fill="#3f6f8a"/><path d="M20 78 28 56 36 78ZM132 78 140 52 148 78Z" fill="#1f4d3a"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: City at night"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#1e1b4b"/><circle cx="34" cy="28" r="10" fill="#fde68a"/><path d="M0 120V70h22V50h20v30h16V40h26v50h18V62h22v26h14V58h22v62Z" fill="#312e81"/><path d="M66 50h4v4h-4ZM74 58h4v4h-4ZM104 70h4v4h-4ZM132 66h4v4h-4Z" fill="#fde68a"/></svg></button></li>
    <li><button type="button" class="gal-thumb" aria-label="Open: Meadow flowers"><svg viewBox="0 0 160 120" aria-hidden="true"><rect width="160" height="120" fill="#e0f2d0"/><rect y="70" width="160" height="50" fill="#7fb069"/><circle cx="30" cy="76" r="6" fill="#ff6b9a"/><circle cx="62" cy="86" r="5" fill="#ffd166"/><circle cx="96" cy="74" r="6" fill="#ff6b9a"/><circle cx="128" cy="90" r="5" fill="#fff"/><circle cx="80" cy="100" r="5" fill="#ffd166"/></svg></button></li>
  </ul>
  <dialog class="gal-dialog" aria-label="Picture viewer">
    <div class="gal-stage"></div>
    <p class="gal-cap"></p>
    <div class="gal-nav">
      <button type="button" data-step="-1" aria-label="Previous picture">${I('m12 5-5 5 5 5')}</button>
      <button type="button" data-close aria-label="Close viewer">${I('m5 5 10 10M15 5 5 15')}</button>
      <button type="button" data-step="1" aria-label="Next picture">${I('m8 5 5 5-5 5')}</button>
    </div>
  </dialog>
</div>`,
      css: `.gallery { width: 100%; max-width: 460px; }
.gal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 0; padding: 0; list-style: none; }
.gal-thumb { display: block; width: 100%; padding: 0; border: 0; border-radius: var(--ui-radius-sm); overflow: hidden; cursor: zoom-in; background: none; }
.gal-thumb svg { display: block; width: 100%; height: auto; transition: transform 0.3s; }
@media (prefers-reduced-motion: reduce) { .gal-thumb svg { transition: none; } }
.gal-thumb:hover svg { transform: scale(1.04); }
.gal-thumb:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.gal-dialog { width: min(640px, calc(100vw - 32px)); padding: 12px; color: #fff; background: #111114; border: 0; border-radius: 14px; }
.gal-dialog::backdrop { background: rgb(0 0 0 / 0.75); }
.gal-stage svg { display: block; width: 100%; height: auto; border-radius: 8px; }
.gal-cap { margin: 10px 4px; font-size: 14px; }
.gal-nav { display: flex; justify-content: center; gap: 10px; }
.gal-nav button { display: grid; place-items: center; width: 42px; height: 42px; color: #fff; background: #2a2a33; border: 0; border-radius: 50%; cursor: pointer; }
.gal-nav svg { width: 18px; height: 18px; }
.gal-nav button:focus-visible { outline: none; box-shadow: 0 0 0 3px #818cf8; }`,
      setup: `const thumbs = [...root.querySelectorAll('.gal-thumb')];
const dialog = root.querySelector('.gal-dialog');
const stage = root.querySelector('.gal-stage');
const cap = root.querySelector('.gal-cap');
let at = 0;
const show = (i) => {
  at = (i + thumbs.length) % thumbs.length;
  stage.innerHTML = thumbs[at].innerHTML;
  cap.textContent = thumbs[at].getAttribute('aria-label').replace('Open: ', '') + ' · ' + (at + 1) + ' of ' + thumbs.length;
};
const onThumb = (e) => { show(thumbs.indexOf(e.currentTarget)); dialog.showModal(); };
const onDialog = (e) => {
  const step = e.target.closest('[data-step]');
  if (step) show(at + Number(step.dataset.step));
  else if (e.target.closest('[data-close]') || e.target === dialog) dialog.close();
};
const onKey = (e) => {
  if (e.key === 'ArrowRight') show(at + 1);
  else if (e.key === 'ArrowLeft') show(at - 1);
};
const onClose = () => thumbs[at].focus();
thumbs.forEach((t) => t.addEventListener('click', onThumb));
dialog.addEventListener('click', onDialog);
dialog.addEventListener('keydown', onKey);
dialog.addEventListener('close', onClose);
return () => {
  thumbs.forEach((t) => t.removeEventListener('click', onThumb));
  dialog.removeEventListener('click', onDialog);
  dialog.removeEventListener('keydown', onKey);
  dialog.removeEventListener('close', onClose);
};`,
    }
  );
})();
