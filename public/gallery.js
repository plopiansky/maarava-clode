(function () {
  var dataEl = document.getElementById('gal-data');
  var lb = document.getElementById('lb');
  if (!dataEl || !lb) return;
  var items = JSON.parse(dataEl.textContent || '[]');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var cur = 0;
  function show(i) {
    cur = (i + items.length) % items.length;
    var it = items[cur];
    img.src = it.src;
    img.alt = it.title;
    cap.textContent = it.title + (it.text ? ' – ' + it.text : '');
  }
  function open(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function close() { lb.hidden = true; document.body.style.overflow = ''; }
  document.querySelectorAll('.gal-btn').forEach(function (b) {
    b.addEventListener('click', function () { open(Number(b.dataset.i)); });
  });
  // RTL: "next" sits on the left edge
  lb.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur + 1);
    if (e.key === 'ArrowRight') show(cur - 1);
  });
})();
