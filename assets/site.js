const swedishLangLink = document.getElementById('swedish-lang');
const englishLangLink = document.getElementById('english-lang');

if (window.location.href.includes('/sv')) {
  swedishLangLink.classList.add('hidden');
} else {
  englishLangLink.classList.add('hidden');
}
const nav = document.querySelector('.nav');
const fabBurger = document.querySelector('.burger-fixed');

// Drawer/backdrop
const backdrop = document.querySelector('.backdrop');
const drawer = document.querySelector('.drawer');

function openDrawer() {
  requestAnimationFrame(() => {
    backdrop.classList.add('show');
    drawer.classList.add('open');
  });
  fabBurger.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.classList.remove('show');
  fabBurger.setAttribute('aria-expanded', 'false');
}
function toggleDrawer() {
  if (drawer.classList.contains('open')) closeDrawer(); else openDrawer();
}

fabBurger.addEventListener('click', toggleDrawer);
backdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

// Smooth scroll for internal anchors + close drawer
document.addEventListener('click', function (e) {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const el = document.querySelector(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeDrawer();
  }
});

// Fade-in header (background + logo) while burger stays fixed in place
const threshold = 10; // px
function onScroll() {
  if (window.scrollY > threshold) {
    nav.classList.add('show');
  } else {
    nav.classList.remove('show');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // initial

// Scroll reveal using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  })
}, { threshold: .14, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Progressive reveal of hero content for a subtle entrance
window.addEventListener('load', () => {
  const heroChildren = document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .tagline, .hero .cta');
  heroChildren.forEach((el, i) => {
    el.style.opacity = 0; el.style.transform = 'translateY(18px)'; el.style.transition = 'all .9s ease';
    setTimeout(() => { el.style.opacity = 1; el.style.transform = 'none' }, 180 + i * 120);
  })
});

// HERO PARALLAX — extra strong
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    if (rect.bottom <= 0 || rect.top >= vh) return;

    const travel = vh + rect.height;
    const progress = (vh - rect.top) / travel; // 0..1
    // much stronger: up to -400px shift
    const offset = 400 * progress;

    hero.style.setProperty('--parallax', offset + 'px');
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
})();

(function () {
  try {
    const saved = localStorage.getItem('langPref'); // 'en' | 'sv'
    if (saved) return;

    const prefersSV = (navigator.languages || [navigator.language || ''])
      .some(l => l && l.toLowerCase().startsWith('sv'));

    const onSV = location.pathname.startsWith('/sv/');
    const onEN = location.pathname.startsWith('/en/') || location.pathname === '/';

    if (prefersSV && onEN) {
      const bar = document.createElement('div');
      bar.style.position = 'fixed';
      bar.style.inset = 'auto 0 0 0';
      bar.style.padding = '12px';
      bar.style.background = '#111';
      bar.style.color = '#fff';
      bar.style.textAlign = 'center';
      bar.style.zIndex = '9999';
      bar.innerHTML = `
                    Vill du se sidan på svenska?
                    <button id="go-sv" style="margin-left:8px">Ja, byt till svenska</button>
                    <button id="stay-en" style="margin-left:8px">Nej tack</button>
                `;
      document.body.appendChild(bar);
      document.getElementById('go-sv').onclick = () => {
        localStorage.setItem('langPref', 'sv');
        location.href = '/sv/';
      };
      document.getElementById('stay-en').onclick = () => {
        localStorage.setItem('langPref', 'en');
        bar.remove();
      };
    }
  } catch (e) { }
})();