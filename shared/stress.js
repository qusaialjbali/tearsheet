/* Tearsheet stress tests: rewrite a rendered part so it can be checked under conditions real
 * products meet. Right-to-left layout, Arabic sample text, and text 40% longer than English
 * (roughly what German or Finnish needs). Used by the zine's preview toggles and by the CI
 * receipts check, so what people see is what was tested. Operates on a live document.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TearsheetStress = api;
})(typeof self !== 'undefined' ? self : this, function () {
  /* Real, common interface words. This is sample text for testing shaping, direction and
     length, not a translation. */
  const ARABIC = ['حفظ', 'إلغاء', 'الإعدادات', 'الملف الشخصي', 'رسالة', 'بحث', 'إرسال', 'تسجيل الدخول', 'الحساب', 'الإشعارات',
    'التالي', 'السابق', 'تحميل', 'حذف', 'تعديل', 'مشاركة', 'الصفحة الرئيسية', 'المساعدة', 'اشتراك', 'المزيد', 'تم', 'جديد',
    'الكل', 'اليوم', 'الطلبات', 'المنتجات', 'السعر', 'مجاني', 'إغلاق', 'فتح', 'البريد', 'كلمة المرور', 'تأكيد', 'المستخدم'];
  const ACCENT = { a: 'å', e: 'é', i: 'ï', o: 'ö', u: 'ü', c: 'ç', n: 'ñ', s: 'š', y: 'ý', A: 'Å', E: 'É', I: 'Ï', O: 'Ö', U: 'Ü', C: 'Ç', N: 'Ñ', S: 'Š' };
  const PAD = ['überlang', 'verlängert', 'erweitert', 'zusätzlich'];
  const SKIP = 'script,style,code,pre,kbd,samp,time,svg,textarea,[data-stress-skip]';

  function textNodes(doc) {
    const out = [];
    const walker = doc.createTreeWalker(doc.body, 4 /* NodeFilter.SHOW_TEXT */);
    let n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue.trim() || /^[\s\d.,:;%$€£+\-–—×·/()#@!?'"’“”…]+$/.test(n.nodeValue)) continue;
      if (n.parentElement && n.parentElement.closest(SKIP)) continue;
      out.push(n);
    }
    return out;
  }
  const keepEdges = (orig, inner) => orig.match(/^\s*/)[0] + inner + orig.match(/\s*$/)[0];

  /* Fills about the same number of characters with Arabic words; digits stay as they are. */
  function arabicLike(text, seed) {
    const target = text.trim().length;
    let out = '', i = seed;
    while (out.length < target) out += (out ? ' ' : '') + ARABIC[i++ % ARABIC.length];
    const digits = text.match(/\d+/);
    return keepEdges(text, digits ? out + ' ' + digits[0] : out);
  }
  function longer(text, seed) {
    const core = text.trim().replace(/[a-zA-Z]/g, (ch) => ACCENT[ch] || ch);
    let out = core, i = seed;
    while (out.length < Math.ceil(text.trim().length * 1.4)) out += ' ' + PAD[i++ % PAD.length];
    return keepEdges(text, out);
  }
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];

  function rewrite(doc, fn) {
    textNodes(doc).forEach((n, i) => (n.nodeValue = fn(n.nodeValue, i)));
    doc.querySelectorAll(ATTRS.map((a) => '[' + a + ']').join(',')).forEach((el, i) => {
      ATTRS.forEach((a) => { const v = el.getAttribute(a); if (v && v.trim()) el.setAttribute(a, fn(v, i).trim()); });
    });
  }

  return {
    /* Mirror the layout: the page becomes right-to-left. */
    rtl(doc) { doc.documentElement.setAttribute('dir', 'rtl'); },
    /* Right-to-left with Arabic sample text. */
    arabic(doc) { doc.documentElement.setAttribute('dir', 'rtl'); doc.documentElement.setAttribute('lang', 'ar'); rewrite(doc, arabicLike); },
    /* Every string about 40% longer, accented, as translations often are. */
    longText(doc) { rewrite(doc, longer); },
    /* True when something sticks out past the right or left edge of the page. */
    overflows(doc) {
      const W = doc.documentElement.clientWidth;
      const clipped = (el) => { for (let p = el.parentElement; p && p !== doc.body; p = p.parentElement) { const o = doc.defaultView.getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(o.overflowX)) return true; } return false; };
      return [...doc.body.querySelectorAll('*')].some((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return false;
        const cs = doc.defaultView.getComputedStyle(el);
        if (cs.position === 'fixed' || cs.visibility === 'hidden') return false;
        return (r.right > W + 1 || r.left < -1) && !clipped(el);
      });
    },
  };
});
