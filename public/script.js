// Reveal-on-scroll animation
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// "Site under construction" notice: shown once per browser session
(function () {
  var box = document.getElementById('notice');
  var ok = document.getElementById('notice-ok');
  if (!box || !ok) return;
  var seen = false;
  try { seen = sessionStorage.getItem('noticeSeen') === '1'; } catch (e) {}
  if (seen) return;
  box.hidden = false;
  document.body.style.overflow = 'hidden';
  ok.focus();
  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
    try { sessionStorage.setItem('noticeSeen', '1'); } catch (e) {}
  }
  ok.addEventListener('click', close);
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
})();
