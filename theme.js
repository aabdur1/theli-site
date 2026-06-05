// Theme: set before paint (no flash), then wire the toggle. CSP-safe (external, 'self').
(function () {
  var root = document.documentElement;
  function preferred() {
    try {
      var saved = localStorage.getItem('theli-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    try {
      if (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (e) {}
    return 'light';
  }
  root.setAttribute('data-theme', preferred());

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var motionOK = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    var animTimer;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (motionOK) {
        root.classList.add('theme-anim');
        clearTimeout(animTimer);
        animTimer = setTimeout(function () { root.classList.remove('theme-anim'); }, 500);
      }
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theli-theme', next); } catch (e) {}
    });
  });
})();
