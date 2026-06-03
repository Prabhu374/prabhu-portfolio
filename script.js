// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Typed effect
const roles = [
  'Backend Developer',
  'Node.js Engineer',
  'Express.js Developer',
  'REST API Builder',
  'PostgreSQL Developer',
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = roles[ri];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

// Intersection Observer — fade-in + skill bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');

    // Animate skill bars inside this element
    entry.target.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });

    // Skill category delayed animation
    if (entry.target.classList.contains('skill-category')) {
      const delay = entry.target.dataset.delay || 0;
      entry.target.style.transitionDelay = delay + 'ms';
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.section-header, .about-grid, .skill-category, .timeline-card, .edu-card, .contact-card, .skill-bars'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => io.observe(s));
