(function () {
  var cb = document.getElementById('terms-ok');
  var go = document.getElementById('reg-go');
  var hint = document.getElementById('reg-hint');
  if (!cb || !go) return;
  function sync() {
    var ok = cb.checked;
    go.classList.toggle('disabled', !ok);
    go.setAttribute('aria-disabled', ok ? 'false' : 'true');
    if (hint) hint.style.visibility = ok ? 'hidden' : 'visible';
  }
  go.addEventListener('click', function (e) {
    if (!cb.checked) { e.preventDefault(); cb.focus(); }
  });
  cb.addEventListener('change', sync);
  sync();
})();
