/* Burger menu — standalone (does not depend on any other script). */
(function () {
  function init() {
    var btn = document.getElementById('burger'), menu = document.getElementById('menu');
    if (!btn || !menu) return;
    var closing = null;
    function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }
    function set(open) {
      clearTimeout(closing);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
      if (open) {
        menu.hidden = false;
        void menu.offsetWidth;            // force reflow so the transition runs
        menu.classList.add('open');
      } else {
        menu.classList.remove('open');
        closing = setTimeout(function () { if (!isOpen()) menu.hidden = true; }, 320);
      }
    }
    btn.addEventListener('click', function (e) { e.preventDefault(); set(!isOpen()); });
    menu.addEventListener('click', function (e) { var a = e.target.closest ? e.target.closest('a') : null; if (a) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) { set(false); btn.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 1040 && isOpen()) set(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
