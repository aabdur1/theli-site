// Theli — staggered reveal on load + on scroll. Pure progressive enhancement.
(function () {
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target;
        var delay = (el.dataset.d ? +el.dataset.d : 0);
        setTimeout(function () { el.classList.add('in'); }, delay);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  // Give hero items a gentle cascade.
  document.querySelectorAll('.hero .reveal').forEach(function (el, i) {
    el.dataset.d = i * 90;
  });

  els.forEach(function (el) { io.observe(el); });
})();
