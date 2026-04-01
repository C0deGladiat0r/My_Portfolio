/* ================================================
   VINAY TIWARI PORTFOLIO — script.js
   ================================================ */

// ── Navbar: scroll state + mobile toggle ───────
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const open = navLinks.classList.contains('open');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = open ? '0' : '';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Smooth scroll ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 75, behavior: 'smooth' });
    }
  });
});

// ── Active nav link ────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionIO.observe(s));

// ── Scroll Reveal ──────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const idx = siblings.filter(c => c.classList.contains('reveal')).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 70);
      revealIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => revealIO.observe(el));

// ── Counter Animation ──────────────────────────
function animateCount(el, target, isFloat, suffix) {
  const dur   = 1600;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = (isFloat ? (ease * target).toFixed(2) : Math.round(ease * target)) + (suffix || '');
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hstat-n').forEach(el => {
        animateCount(
          el,
          parseFloat(el.dataset.target),
          el.dataset.float === '1',
          el.dataset.suffix || ''
        );
      });
      statsIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsWrap = document.querySelector('.hero-stats');
if (statsWrap) statsIO.observe(statsWrap);

// ── Typed Text Effect ──────────────────────────
const roles = [
  'AI & ML Enthusiast',
  'Java Developer',
  'Problem Solver',
  'Full-Stack Builder',
  'CSE Student'
];

let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  if (!typedEl) return;
  const word = roles[rIdx];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; return setTimeout(typeLoop, 2000); }
    setTimeout(typeLoop, 80);
  } else {
    typedEl.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
    setTimeout(typeLoop, 45);
  }
}

// Start typed effect after hero loads
setTimeout(typeLoop, 900);

// ── Hero image fallback ────────────────────────
// If the image fails to load (e.g. path issue), show initials placeholder
document.querySelectorAll('.hero-img, .about-img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width:100%; aspect-ratio:4/5; border-radius:16px;
      background: linear-gradient(135deg, #e8f0fe, #fef3f0);
      display:flex; align-items:center; justify-content:center;
      font-family:'Playfair Display',serif; font-size:5rem; font-weight:700;
      color:#e8533a; letter-spacing:-0.02em;
    `;
    placeholder.textContent = 'VT';
    this.parentElement.insertBefore(placeholder, this);
  });
});

// ── Photo: ensure correct src ──────────────────
// Sometimes relative paths work differently; normalise
document.querySelectorAll('.hero-img, .about-img').forEach(img => {
  if (!img.src || img.src === window.location.href) {
    img.src = 'Vinay_Photo_2.png';
  }
});

// ── Console Easter Egg ─────────────────────────
console.log('%c👋 Hey, curious dev!', 'font-size:18px; font-weight:bold; color:#e8533a;');
console.log('%cThis is Vinay Tiwari\'s portfolio — vinaytiwari1512@gmail.com', 'font-size:13px; color:#6b7280;');