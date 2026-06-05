// Theli — staggered reveal (load + scroll) + subtle hero-watermark parallax.
// Pure progressive enhancement; honors prefers-reduced-motion.
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Staggered reveals ----
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target;
        var delay = el.dataset.d ? +el.dataset.d : 0;
        setTimeout(function () { el.classList.add('in'); }, delay);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  // Hero items get a gentle cascade.
  document.querySelectorAll('.hero .reveal').forEach(function (el, i) { el.dataset.d = i * 90; });

  // Grid groups cascade their children as the group scrolls into view.
  ['.steps', '.features-grid'].forEach(function (sel) {
    var group = document.querySelector(sel);
    if (!group) return;
    Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, i) {
      el.dataset.d = i * 75;
    });
  });

  Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (el) { io.observe(el); });

  // ---- Subtle hero-watermark parallax ----
  if (!reduce) {
    var wm = document.querySelector('.hero-watermark');
    if (wm) {
      var ticking = false;
      var update = function () {
        var y = window.scrollY || window.pageYOffset || 0;
        if (y < 1000) wm.style.transform = 'translate3d(0,' + (y * 0.14).toFixed(1) + 'px,0)';
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      update();
    }
  }
})();
