/* Tearsheet — site settings you are expected to edit.
 *
 * DONATE_URL: your Buy Me a Coffee page, e.g. 'https://buymeacoffee.com/yourname'.
 * While it is empty, every donation link on the site stays hidden, so nobody
 * ever lands on a dead link. Everything on the site is free either way.
 */
const DONATE_URL = '';

(function () {
  document.querySelectorAll('[data-donate]').forEach((el) => {
    if (!DONATE_URL) {
      el.hidden = true;
      return;
    }
    const link = el.matches('a') ? el : el.querySelector('a');
    if (link) link.href = DONATE_URL;
  });
})();
