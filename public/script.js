
const nav = document.getElementById('nav');
document.getElementById('burger').addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// scroll reveal
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 })
  : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// active nav link by section
const links = [...nav.querySelectorAll('a')];
const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
if ('IntersectionObserver' in window) {
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && map.has(e.target.id)) {
      links.forEach(l => l.classList.remove('active'));
      map.get(e.target.id).classList.add('active');
    }
  }), { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id], footer[id]').forEach(s => so.observe(s));
}
