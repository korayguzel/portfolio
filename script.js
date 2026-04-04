const topbar = document.getElementById('topbar');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

// Sticky nav border on scroll
if (topbar) {
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// Scroll reveal
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));
}

// Active nav highlight
if (sections.length > 0 && navLinks.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach((section) => sectionObserver.observe(section));
}
