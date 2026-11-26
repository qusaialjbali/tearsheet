/* Tearsheet — page sections: bigger building blocks for landing pages and sites.
 * Demo copy is for a fictional product called “Pocketsplit”, a shared budgeting app. Replace it with yours.
 */
(function () {
  const S = 'Sections';
  const I = (d) => '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const BTN = `.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 46px; padding: 0 22px; font: inherit; font-size: 15px; font-weight: 600; text-decoration: none;
  border: 1px solid transparent; border-radius: var(--ui-radius-sm); cursor: pointer;
}
.btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.btn-primary { color: var(--ui-accent-text); background: var(--ui-accent); }
.btn-primary:hover { background: var(--ui-accent-hover); }
.btn-secondary { color: var(--ui-text); background: var(--ui-surface); border-color: var(--ui-border-strong); }
.btn-secondary:hover { background: var(--ui-surface-2); }`;
  const SEC = (cls) => '.' + cls + ' { width: 100%; padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px); background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }';

  window.COMPONENTS.push(
    /* ───────── Hero, centred ───────── */
    {
      id: 'hero-centered',
      name: 'Hero, centred',
      category: S,
      layout: 'full',
      description: 'An opening section with one clear promise, a short explanation and one main action.',
      notes: 'One primary button, one quiet secondary link. The line under the buttons answers the first worry (cost, card, commitment) before anyone has to ask.',
      html: `<section class="hero-c">
  <h1>Split costs without the awkward spreadsheet.</h1>
  <p class="hero-c-lede">Pocketsplit keeps a running total for trips, flats and teams, and tells everyone exactly who owes what.</p>
  <div class="hero-c-actions">
    <a class="btn btn-primary" href="#">Start a shared budget</a>
    <a class="btn btn-secondary" href="#">See how it works</a>
  </div>
  <p class="hero-c-note">Free for up to 5 people · No card needed</p>
</section>`,
      css: `${BTN}
${SEC('hero-c')}
.hero-c { text-align: center; }
.hero-c h1 { max-width: 16ch; margin: 0 auto 16px; font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-c-lede { max-width: 52ch; margin: 0 auto 28px; font-size: clamp(16px, 2vw, 19px); color: var(--ui-muted); }
.hero-c-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.hero-c-note { margin: 16px 0 0; font-size: 14px; color: var(--ui-muted); }`,
    },

    /* ───────── Hero with signup ───────── */
    {
      id: 'hero-signup',
      name: 'Hero with signup',
      category: S,
      layout: 'full',
      description: 'A hero whose main action is a working email field, with an honest product preview beside it.',
      notes: 'Putting the first form field in the hero removes a whole page from the funnel. The preview shows the real thing working, not an abstract illustration.',
      root: '.hero-s',
      html: `<section class="hero-s">
  <div class="hero-s-copy">
    <h1>Know who owes what, instantly.</h1>
    <p>Add an expense in two taps. Pocketsplit does the maths and settles up in the fewest payments.</p>
    <form class="hero-s-form" novalidate>
      <label class="sr-only" for="hero-email">Email</label>
      <input id="hero-email" type="email" placeholder="you@example.com" autocomplete="email" required>
      <button class="btn btn-primary" type="submit">Get started</button>
    </form>
    <p class="hero-s-msg" aria-live="polite">Free for groups up to 5. We never share your email.</p>
  </div>
  <div class="hero-s-shot" aria-label="Example: Lisbon trip balance" role="img">
    <p class="shot-title">Lisbon trip <span>4 people</span></p>
    <ul>
      <li><span>Maya paid dinner</span><b>€84.00</b></li>
      <li><span>Leo paid train</span><b>€46.40</b></li>
      <li><span>Sam paid museum</span><b>€32.00</b></li>
    </ul>
    <p class="shot-settle">Sam owes Maya <b>€21.10</b></p>
  </div>
</section>`,
      css: `${BTN}
${SEC('hero-s')}
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.hero-s { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; align-items: center; }
.hero-s h1 { margin: 0 0 14px; font-size: clamp(30px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance; }
.hero-s-copy > p { margin: 0 0 22px; font-size: 17px; color: var(--ui-muted); max-width: 46ch; }
.hero-s-form { display: flex; flex-wrap: wrap; gap: 8px; }
.hero-s-form input { flex: 1 1 200px; min-height: 46px; padding: 0 14px; font: inherit; font-size: 15px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.hero-s-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.hero-s-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.hero-s-msg { margin: 10px 0 0 !important; font-size: 13px !important; }
.hero-s-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.hero-s-msg.is-ok { color: var(--ui-success); font-weight: 600; }
.hero-s-shot { padding: 20px; background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: 16px; box-shadow: var(--ui-shadow-lg); rotate: 1.5deg; }
.shot-title { display: flex; justify-content: space-between; margin: 0 0 12px; font-weight: 700; }
.shot-title span { font-size: 13px; font-weight: 500; color: var(--ui-muted); }
.hero-s-shot ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hero-s-shot li { display: flex; justify-content: space-between; padding: 10px 12px; font-size: 14px; background: var(--ui-surface-2); border-radius: 8px; font-variant-numeric: tabular-nums; }
.shot-settle { margin: 12px 0 0; padding: 10px 12px; font-size: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 8px; }`,
      setup: `const form = root.querySelector('form');
const input = form.querySelector('input');
const msg = root.querySelector('.hero-s-msg');
const onSubmit = (e) => {
  e.preventDefault();
  const ok = input.checkValidity() && input.value;
  input.setAttribute('aria-invalid', String(!ok));
  msg.className = 'hero-s-msg ' + (ok ? 'is-ok' : 'is-error');
  msg.textContent = ok ? 'Check your inbox for a sign-in link.' : 'Enter an email like name@example.com.';
  if (!ok) input.focus();
};
form.addEventListener('submit', onSubmit);
return () => form.removeEventListener('submit', onSubmit);`,
    },

    /* ───────── Feature grid ───────── */
    {
      id: 'feature-grid',
      name: 'Feature grid',
      category: S,
      layout: 'full',
      description: 'Six features as short, scannable blocks, each leading with what it does for the reader.',
      notes: 'Write the heading as the benefit (“Settle in one tap”), not the feature name. Six is a comfortable maximum; more and nobody reads them.',
      html: `<section class="features">
  <h2>Everything a shared budget needs</h2>
  <ul class="feat-grid">
    <li><span class="feat-icon">${I('M12 3v18M7 8h7.5a3.5 3.5 0 0 1 0 7H8')}</span><h3>Settle in one tap</h3><p>Pocketsplit finds the fewest payments to square everyone up.</p></li>
    <li><span class="feat-icon">${I('M4 7h16M4 12h10M4 17h7')}</span><h3>Split any way</h3><p>Evenly, by shares, by exact amounts or by percentage.</p></li>
    <li><span class="feat-icon">${I('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18')}</span><h3>Any currency</h3><p>Spend in yen, settle in euros, at the day’s real rate.</p></li>
    <li><span class="feat-icon">${I('M6 3h9l3 3v15H6ZM9 12h6M9 16h4')}</span><h3>Snap the receipt</h3><p>Photos are attached to the expense, so nobody argues later.</p></li>
    <li><span class="feat-icon">${I('M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2')}</span><h3>Works offline</h3><p>Add expenses on the mountain; they sync when you are back.</p></li>
    <li><span class="feat-icon">${I('M5 11V8a7 7 0 0 1 14 0v3M5 11h14v10H5Z')}</span><h3>Private by default</h3><p>Only people in a group can see it. No ads, ever.</p></li>
  </ul>
</section>`,
      css: `${SEC('features')}
.features h2 { margin: 0 0 32px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px 32px; margin: 0; padding: 0; list-style: none; }
.feat-icon { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 14px; color: var(--ui-accent); background: var(--ui-accent-soft); border-radius: 12px; }
.feat-icon svg { width: 22px; height: 22px; }
.feat-grid h3 { margin: 0 0 6px; font-size: 17px; }
.feat-grid p { margin: 0; font-size: 15px; color: var(--ui-muted); }`,
    },

    /* ───────── Testimonial ───────── */
    {
      id: 'testimonial',
      name: 'Testimonial',
      category: S,
      layout: 'full',
      description: 'One large, specific quote with the person’s name, role and a photo slot.',
      notes: 'One real, specific quote beats a wall of vague ones. Only use quotes from real people who agreed to it; the one here is placeholder text for a fictional app.',
      html: `<section class="testi">
  <figure>
    <blockquote><p>“We used to settle our flat’s bills on a whiteboard. Pocketsplit sorted four months of mess in one evening.”</p></blockquote>
    <figcaption>
      <span class="testi-photo" aria-hidden="true">NA</span>
      <span><b>Your customer’s name</b><br>Their role, their company</span>
    </figcaption>
  </figure>
</section>`,
      css: `${SEC('testi')}
.testi figure { max-width: 760px; margin: 0 auto; }
.testi blockquote { margin: 0; }
.testi blockquote p { margin: 0; font-size: clamp(22px, 3.2vw, 34px); font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; text-wrap: balance; }
.testi figcaption { display: flex; align-items: center; gap: 14px; margin-top: 24px; font-size: 15px; color: var(--ui-muted); }
.testi figcaption b { color: var(--ui-text); }
.testi-photo { display: grid; place-items: center; width: 52px; height: 52px; flex: none; font-weight: 700; color: #fff; background: linear-gradient(135deg, #f97316, #db2777); border-radius: 50%; }`,
    },

    /* ───────── Logo strip ───────── */
    {
      id: 'logo-strip',
      name: 'Logo strip',
      category: S,
      layout: 'full',
      description: 'A quiet row of customer logos under a plain label, greyed so it never competes with the content.',
      notes: 'Only show logos you have permission to show. These are made-up wordmarks. Keep logos monochrome and the same visual weight.',
      html: `<section class="logos" aria-labelledby="logos-title">
  <p id="logos-title">Used by teams at (example names)</p>
  <ul>
    <li class="lg1">northwind</li>
    <li class="lg2">GLOBEX</li>
    <li class="lg3">Initech</li>
    <li class="lg4">umbra&amp;co</li>
    <li class="lg5">HOOLI</li>
  </ul>
</section>`,
      css: `.logos { width: 100%; padding: 28px 20px; text-align: center; }
.logos p { margin: 0 0 18px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: var(--ui-muted); }
.logos ul { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 18px 44px; margin: 0; padding: 0; list-style: none; color: var(--ui-muted); opacity: 0.85; }
.logos li { font-size: 22px; }
.lg1 { font-weight: 800; letter-spacing: -0.04em; }
.lg2 { font-weight: 900; letter-spacing: 0.12em; font-size: 18px !important; }
.lg3 { font-family: Georgia, serif; font-style: italic; }
.lg4 { font-weight: 300; letter-spacing: 0.02em; }
.lg5 { font-weight: 700; font-family: ui-monospace, Consolas, monospace; }`,
    },

    /* ───────── FAQ ───────── */
    {
      id: 'faq-section',
      name: 'FAQ section',
      category: S,
      layout: 'full',
      description: 'Questions people actually ask, in two columns: a heading and contact route on one side, answers on the other.',
      notes: 'Write questions in the reader’s words. Always end with a way to ask something that is not listed. <details> keeps it accessible and searchable with Ctrl+F.',
      html: `<section class="faq">
  <div class="faq-intro">
    <h2>Questions, answered</h2>
    <p>Can’t find yours? <a href="#">Ask us</a>. A person replies within a day.</p>
  </div>
  <div class="faq-list">
    <details open><summary>Is it really free?</summary><p>Yes, for groups of up to five people. Bigger groups pay $3 a month per group, not per person.</p></details>
    <details><summary>Do my friends need an account?</summary><p>No. Share a link and they can view and add expenses as a guest.</p></details>
    <details><summary>Can I export my data?</summary><p>Any time, as CSV or PDF. If you leave, your data leaves with you.</p></details>
    <details><summary>Which currencies do you support?</summary><p>All 160 ISO currencies, converted at the daily reference rate.</p></details>
  </div>
</section>`,
      css: `${SEC('faq')}
.faq { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px; }
.faq h2 { margin: 0 0 10px; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; }
.faq-intro p { margin: 0; color: var(--ui-muted); }
.faq-intro a { color: var(--ui-accent); font-weight: 600; text-underline-offset: 3px; }
.faq-list details { border-bottom: 1px solid var(--ui-border); }
.faq-list summary { display: flex; justify-content: space-between; gap: 16px; padding: 16px 0; font-weight: 600; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: "+"; font-size: 22px; line-height: 1; color: var(--ui-muted); transition: transform 0.2s; }
.faq-list details[open] summary::after { transform: rotate(45deg); }
.faq-list summary:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.faq-list p { margin: 0 0 16px; color: var(--ui-muted); }`,
    },

    /* ───────── CTA band ───────── */
    {
      id: 'cta-band',
      name: 'Call-to-action band',
      category: S,
      layout: 'full',
      description: 'A closing band in the accent colour that repeats the main action once more.',
      notes: 'Use it at the end of a long page, once. Repeat the same action as the hero, not a new one, and keep the reassurance line.',
      html: `<section class="cta-band">
  <div>
    <h2>Your next trip, already settled.</h2>
    <p>Set up a group in under a minute. Free for up to five people.</p>
  </div>
  <a class="cta-band-btn" href="#">Start a shared budget</a>
</section>`,
      css: `.cta-band {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px 32px;
  width: 100%; padding: clamp(28px, 5vw, 48px); color: var(--ui-accent-text); background: var(--ui-accent); border-radius: var(--ui-radius);
}
.cta-band h2 { margin: 0 0 6px; font-size: clamp(22px, 3vw, 32px); letter-spacing: -0.02em; }
.cta-band p { margin: 0; opacity: 0.9; }
.cta-band-btn {
  display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; font-weight: 700; text-decoration: none;
  color: var(--ui-accent); background: var(--ui-accent-text); border-radius: var(--ui-radius-sm);
}
.cta-band-btn:hover { opacity: 0.92; }
.cta-band-btn:focus-visible { outline: 3px solid var(--ui-accent-text); outline-offset: 3px; }`,
    },

    /* ───────── Newsletter ───────── */
    {
      id: 'newsletter',
      name: 'Newsletter signup',
      category: S,
      layout: 'full',
      description: 'An email signup that says exactly what you will get and how often, with inline validation.',
      notes: 'Say what is in it and how often (“one email a month”). No pre-ticked boxes, and the privacy line is right next to the button, not in a footer.',
      root: '.news',
      html: `<section class="news">
  <h2>One useful email a month</h2>
  <p>New components, one design rule explained, nothing else. Unsubscribe in one click.</p>
  <form class="news-form" novalidate>
    <label class="sr-only" for="news-email">Email address</label>
    <input id="news-email" type="email" placeholder="you@example.com" autocomplete="email" required aria-describedby="news-msg">
    <button type="submit">Subscribe</button>
  </form>
  <p class="news-msg" id="news-msg" aria-live="polite">We only use your email for this newsletter.</p>
</section>`,
      css: `${SEC('news')}
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.news { text-align: center; }
.news h2 { margin: 0 0 8px; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.02em; }
.news > p { margin: 0 auto 20px; max-width: 46ch; color: var(--ui-muted); }
.news-form { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 440px; margin: 0 auto; }
.news-form input { flex: 1 1 220px; min-height: 46px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.news-form input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.news-form input[aria-invalid="true"] { border-color: var(--ui-danger); }
.news-form button { min-height: 46px; padding: 0 22px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.news-form button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.news-msg { margin: 10px 0 0; font-size: 13px; color: var(--ui-muted); }
.news-msg.is-error { color: var(--ui-danger); font-weight: 600; }
.news-msg.is-ok { color: var(--ui-success); font-weight: 600; }`,
      setup: `const form = root.querySelector('form');
const input = form.querySelector('input');
const msg = root.querySelector('.news-msg');
const onSubmit = (e) => {
  e.preventDefault();
  const ok = Boolean(input.value) && input.checkValidity();
  input.setAttribute('aria-invalid', String(!ok));
  msg.className = 'news-msg ' + (ok ? 'is-ok' : 'is-error');
  msg.textContent = ok ? 'Almost done: confirm the link we just emailed you.' : 'That email looks incomplete. Try name@example.com.';
  if (!ok) input.focus();
};
form.addEventListener('submit', onSubmit);
return () => form.removeEventListener('submit', onSubmit);`,
    },

    /* ───────── Comparison table ───────── */
    {
      id: 'comparison-table',
      name: 'Plan comparison',
      category: S,
      layout: 'full',
      description: 'Plans side by side with yes/no marks that read as words to screen readers, and the recommended plan marked.',
      notes: 'Each tick and cross has hidden text (“Included”, “Not included”), so the table makes sense without seeing the icons. The recommended column is labelled in words, not just colour.',
      html: `<div class="cmp-wrap">
  <table class="cmp">
    <caption>Compare plans</caption>
    <thead>
      <tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col">Free</th><th scope="col" class="cmp-rec">Group <span>Recommended</span></th><th scope="col">Team</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">People per group</th><td>5</td><td class="cmp-rec">25</td><td>Unlimited</td></tr>
      <tr><th scope="row">Receipt photos</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Multi-currency</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Export to CSV</th><td><span class="y"><span class="sr-only">Included</span></span></td><td class="cmp-rec"><span class="y"><span class="sr-only">Included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Admin controls</th><td><span class="n"><span class="sr-only">Not included</span></span></td><td class="cmp-rec"><span class="n"><span class="sr-only">Not included</span></span></td><td><span class="y"><span class="sr-only">Included</span></span></td></tr>
      <tr><th scope="row">Price</th><td>$0</td><td class="cmp-rec">$3 / month</td><td>$12 / month</td></tr>
    </tbody>
  </table>
</div>`,
      css: `.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.cmp-wrap { width: 100%; overflow-x: auto; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.cmp { width: 100%; min-width: 480px; border-collapse: collapse; font-size: 15px; }
.cmp caption { padding: 18px 20px 6px; text-align: start; font-size: 18px; font-weight: 700; }
.cmp th, .cmp td { padding: 13px 20px; text-align: center; border-bottom: 1px solid var(--ui-border); }
.cmp tbody th { text-align: start; font-weight: 500; color: var(--ui-muted); }
.cmp thead th { font-size: 16px; }
.cmp tbody tr:last-child > * { border-bottom: 0; font-weight: 700; color: var(--ui-text); }
.cmp-rec { background: var(--ui-accent-soft); }
thead .cmp-rec span { display: block; margin-top: 2px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ui-accent); }
.y, .n { display: inline-block; width: 20px; height: 20px; vertical-align: middle; background: var(--ui-success); }
.n { background: var(--ui-border-strong); }
.y { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='m4 10.5 4 4 8-9' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.n { -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10h10' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; }`,
    },

    /* ───────── Changelog ───────── */
    {
      id: 'changelog',
      name: 'Changelog',
      category: S,
      layout: 'full',
      description: 'Release notes grouped by date, each change tagged New, Improved or Fixed.',
      notes: 'Lead with what changed for the user, not the ticket title. Dates are machine-readable <time> elements so feeds and search engines understand them.',
      html: `<section class="changelog">
  <h2>What’s new</h2>
  <article class="cl-entry">
    <time datetime="2026-11-20">20 Nov 2026</time>
    <div>
      <h3>Version 3.2</h3>
      <ul>
        <li><span class="cl-tag new">New</span> Split by percentage, not just shares.</li>
        <li><span class="cl-tag imp">Improved</span> Receipts load twice as fast on slow connections.</li>
        <li><span class="cl-tag fix">Fixed</span> Totals no longer round the wrong way in yen.</li>
      </ul>
    </div>
  </article>
  <article class="cl-entry">
    <time datetime="2026-10-28">28 Oct 2026</time>
    <div>
      <h3>Version 3.1</h3>
      <ul>
        <li><span class="cl-tag new">New</span> Dark mode follows your system setting.</li>
        <li><span class="cl-tag fix">Fixed</span> Guests can now attach photos.</li>
      </ul>
    </div>
  </article>
</section>`,
      css: `${SEC('changelog')}
.changelog h2 { margin: 0 0 24px; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.cl-entry { display: grid; grid-template-columns: 130px 1fr; gap: 20px; padding: 20px 0; border-top: 1px solid var(--ui-border); }
.cl-entry time { font-size: 14px; font-weight: 600; color: var(--ui-muted); }
.cl-entry h3 { margin: 0 0 10px; font-size: 17px; }
.cl-entry ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.cl-entry li { font-size: 15px; }
.cl-tag { display: inline-block; min-width: 76px; margin-right: 8px; padding: 1px 8px; text-align: center; font-size: 12px; font-weight: 700; border-radius: 999px; }
.cl-tag.new { color: var(--ui-accent); background: var(--ui-accent-soft); }
.cl-tag.imp { color: var(--ui-success); background: var(--ui-success-soft); }
.cl-tag.fix { color: var(--ui-warning); background: var(--ui-warning-soft); }
@media (max-width: 520px) { .cl-entry { grid-template-columns: 1fr; gap: 6px; } }`,
    },

    /* ───────── Footer ───────── */
    {
      id: 'site-footer',
      name: 'Site footer',
      category: S,
      layout: 'full',
      description: 'A footer with the brand line, grouped links, a language picker and the legal row.',
      notes: 'Group links under short headings people scan for (Product, Company, Help). Keep the legal links and the copyright on their own quiet row.',
      html: `<footer class="sfoot">
  <div class="sfoot-top">
    <div class="sfoot-brand">
      <p class="sfoot-logo">Pocketsplit</p>
      <p>Shared budgets without the awkward maths.</p>
    </div>
    <nav class="sfoot-cols" aria-label="Footer">
      <div><h3>Product</h3><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Changelog</a></li></ul></div>
      <div><h3>Company</h3><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li></ul></div>
      <div><h3>Help</h3><ul><li><a href="#">Support</a></li><li><a href="#">Status</a></li><li><a href="#">Contact</a></li></ul></div>
    </nav>
  </div>
  <div class="sfoot-bottom">
    <p>© 2026 Pocketsplit Ltd.</p>
    <ul><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Cookies</a></li></ul>
    <label class="sfoot-lang"><span class="sr-only">Language</span>
      <select><option>English</option><option>Español</option><option>Deutsch</option><option>العربية</option></select>
    </label>
  </div>
</footer>`,
      css: `.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.sfoot { width: 100%; padding: 40px clamp(20px, 4vw, 40px) 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.sfoot a { color: var(--ui-muted); text-decoration: none; }
.sfoot a:hover { color: var(--ui-text); text-decoration: underline; text-underline-offset: 3px; }
.sfoot a:focus-visible { outline: none; box-shadow: var(--ui-focus); border-radius: 4px; }
.sfoot-top { display: grid; grid-template-columns: minmax(200px, 1fr) 2fr; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--ui-border); }
.sfoot-logo { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.03em; color: var(--ui-text) !important; }
.sfoot-brand p { margin: 0; font-size: 14px; color: var(--ui-muted); }
.sfoot-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; }
.sfoot-cols h3 { margin: 0 0 10px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; }
.sfoot-cols ul, .sfoot-bottom ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.sfoot-bottom { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; padding-top: 20px; font-size: 13px; color: var(--ui-muted); }
.sfoot-bottom p { margin: 0; }
.sfoot-bottom ul { display: flex; gap: 18px; font-size: 13px; }
.sfoot-lang { margin-left: auto; }
.sfoot-lang select { padding: 6px 10px; font: inherit; font-size: 13px; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: 6px; }
@media (max-width: 600px) { .sfoot-top { grid-template-columns: 1fr; } .sfoot-lang { margin-left: 0; } }`,
    },

    /* ───────── 404 ───────── */
    {
      id: 'not-found',
      name: '404 page',
      category: S,
      layout: 'full',
      description: 'A not-found page that admits the mistake, offers a search and the three most likely destinations.',
      notes: 'Do not blame the visitor. Give them a search box and the few places they most likely meant to go, and log 404s so you can fix the broken links.',
      html: `<section class="nf">
  <p class="nf-code" aria-hidden="true">404</p>
  <h1>That page has wandered off.</h1>
  <p class="nf-text">The link may be old, or we moved something. Try a search, or head somewhere useful.</p>
  <form class="nf-search" role="search">
    <label class="sr-only" for="nf-q">Search the site</label>
    <input id="nf-q" type="search" placeholder="Search the site">
    <button type="submit">Search</button>
  </form>
  <ul class="nf-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Help centre</a></li>
    <li><a href="#">Contact support</a></li>
  </ul>
</section>`,
      css: `.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
${SEC('nf')}
.nf { text-align: center; }
.nf-code { margin: 0; font-size: clamp(72px, 14vw, 140px); font-weight: 900; line-height: 0.9; letter-spacing: -0.05em; color: var(--ui-accent); }
.nf h1 { margin: 16px 0 8px; font-size: clamp(24px, 3.4vw, 36px); letter-spacing: -0.02em; }
.nf-text { max-width: 44ch; margin: 0 auto 24px; color: var(--ui-muted); }
.nf-search { display: flex; gap: 8px; max-width: 420px; margin: 0 auto 20px; }
.nf-search input { flex: 1; min-width: 0; min-height: 44px; padding: 0 14px; font: inherit; color: var(--ui-text); background: var(--ui-bg); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.nf-search input:focus { outline: none; border-color: var(--ui-accent); box-shadow: var(--ui-focus); }
.nf-search button { padding: 0 18px; font: inherit; font-weight: 700; color: var(--ui-accent-text); background: var(--ui-accent); border: 0; border-radius: var(--ui-radius-sm); cursor: pointer; }
.nf-search button:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.nf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; margin: 0; padding: 0; list-style: none; }
.nf-links a { font-weight: 600; color: var(--ui-accent); text-underline-offset: 3px; }`,
    },

    /* ───────── Pricing tiers ───────── */
    {
      id: 'pricing-tiers',
      name: 'Pricing tiers',
      category: S,
      layout: 'full',
      description: 'Three plans side by side with a monthly/yearly switch that updates every price.',
      notes: 'Show the yearly saving as an amount, not a vague “save big”. The switch is a real radio pair, so it works with the keyboard and states its choice.',
      root: '.tiers',
      html: `<section class="tiers">
  <div class="tiers-head">
    <h2>Simple pricing</h2>
    <fieldset class="tiers-toggle">
      <legend class="sr-only">Billing period</legend>
      <label><input type="radio" name="bill" value="month" checked><span>Monthly</span></label>
      <label><input type="radio" name="bill" value="year"><span>Yearly <em>2 months free</em></span></label>
    </fieldset>
  </div>
  <div class="tiers-grid">
    <article class="tier"><h3>Free</h3><p class="tier-price"><b data-m="0" data-y="0">$0</b> <span>forever</span></p><p class="tier-for">Up to 5 people</p><a class="tier-btn" href="#">Start free</a></article>
    <article class="tier is-rec"><p class="tier-rec">Most groups pick this</p><h3>Group</h3><p class="tier-price"><b data-m="3" data-y="30">$3</b> <span class="per">per month</span></p><p class="tier-for">Up to 25 people · multi-currency</p><a class="tier-btn" href="#">Try Group free</a></article>
    <article class="tier"><h3>Team</h3><p class="tier-price"><b data-m="12" data-y="120">$12</b> <span class="per">per month</span></p><p class="tier-for">Unlimited people · admin controls</p><a class="tier-btn" href="#">Talk to us</a></article>
  </div>
</section>`,
      css: `.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.tiers { width: 100%; }
.tiers-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px; }
.tiers-head h2 { margin: 0; font-size: clamp(24px, 3vw, 32px); letter-spacing: -0.02em; }
.tiers-toggle { display: inline-flex; margin: 0; padding: 4px; background: var(--ui-surface-2); border: 0; border-radius: 999px; }
.tiers-toggle label { position: relative; }
.tiers-toggle input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.tiers-toggle span { display: block; padding: 8px 16px; font-size: 14px; font-weight: 600; color: var(--ui-muted); border-radius: 999px; }
.tiers-toggle em { font-style: normal; font-size: 12px; color: var(--ui-success); }
.tiers-toggle input:checked + span { color: var(--ui-text); background: var(--ui-surface); box-shadow: 0 1px 3px rgb(0 0 0 / 0.15); }
.tiers-toggle input:focus-visible + span { box-shadow: var(--ui-focus); }
.tiers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.tier { display: flex; flex-direction: column; padding: 24px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.tier.is-rec { border: 2px solid var(--ui-accent); }
.tier-rec { margin: -8px 0 8px; font-size: 12px; font-weight: 700; color: var(--ui-accent); }
.tier h3 { margin: 0; font-size: 18px; }
.tier-price { margin: 12px 0 4px; }
.tier-price b { font-size: 40px; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.tier-price span { font-size: 14px; color: var(--ui-muted); }
.tier-for { margin: 0 0 20px; flex: 1; font-size: 14px; color: var(--ui-muted); }
.tier-btn { display: block; padding: 11px; text-align: center; font-weight: 700; text-decoration: none; color: var(--ui-text); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); }
.is-rec .tier-btn { color: var(--ui-accent-text); background: var(--ui-accent); border-color: var(--ui-accent); }
.tier-btn:focus-visible { outline: none; box-shadow: var(--ui-focus); }`,
      setup: `const radios = root.querySelectorAll('input[name="bill"]');
const prices = root.querySelectorAll('[data-m]');
const pers = root.querySelectorAll('.per');
const update = () => {
  const yearly = root.querySelector('input[name="bill"]:checked').value === 'year';
  prices.forEach((p) => (p.textContent = '$' + (yearly ? p.dataset.y : p.dataset.m)));
  pers.forEach((p) => (p.textContent = yearly ? 'per year' : 'per month'));
};
radios.forEach((r) => r.addEventListener('change', update));
return () => radios.forEach((r) => r.removeEventListener('change', update));`,
    }
  );
})();
