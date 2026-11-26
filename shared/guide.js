/* Guide behaviour shared by every world: theme toggle, saved checklist, contents highlight. */
(function () {
  const root = document.documentElement;
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    b.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('cui-theme', next);
      b.setAttribute('aria-pressed', String(next === 'dark'));
    });
  });

  const list = document.querySelector('[data-checklist]');
  if (list) {
    const key = 'cui-checklist';
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
    const counter = document.querySelector('[data-checklist-count]');
    const update = () => {
      if (counter) counter.textContent = boxes.filter((b) => b.checked).length + ' of ' + boxes.length + ' done';
    };
    boxes.forEach((box) => {
      box.checked = Boolean(saved[box.id]);
      box.addEventListener('change', () => {
        saved[box.id] = box.checked;
        localStorage.setItem(key, JSON.stringify(saved));
        update();
      });
    });
    document.querySelector('[data-checklist-reset]')?.addEventListener('click', () => {
      boxes.forEach((b) => (b.checked = false));
      localStorage.removeItem(key);
      update();
    });
    update();
  }

  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  if (links.length && 'IntersectionObserver' in window) {
    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(e.target.id)?.setAttribute('aria-current', 'true');
      }),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    byId.forEach((_, id) => document.getElementById(id) && io.observe(document.getElementById(id)));
  }
})();
