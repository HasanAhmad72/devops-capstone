/* ====================================================
   DEVOPS CAPSTONE — script.js
   ==================================================== */

/* ---- Navbar: scroll shrink + active link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Shrink navbar on scroll
  if (window.scrollY > 30) {
    navbar.style.background = 'rgba(7,11,20,0.95)';
  } else {
    navbar.style.background = 'rgba(7,11,20,0.7)';
  }

  // Highlight active nav link
  let currentId = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) currentId = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
});

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
  });
});

/* ---- Animated counters ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }

  requestAnimationFrame(step);
}

// Trigger counters when they enter viewport
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ---- Scroll reveal (fade-in-up) on all cards/sections ---- */
const revealEls = document.querySelectorAll(
  '.card, .stack-item, .pipeline-step, .hero-stats, .contact-form-wrapper'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.05) + 's';
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// Add CSS class toggle for revealed state
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

/* ---- Pipeline step: click to highlight ---- */
document.querySelectorAll('.pipeline-step').forEach(step => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.pipeline-step').forEach(s => s.style.borderColor = '');
    step.style.borderColor = 'rgba(99,179,237,0.6)';
    step.style.boxShadow = '0 0 30px rgba(99,179,237,0.2)';
  });
});

/* ---- Contact form handler ---- */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  // Animate button
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = 'Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, #4fd1c5, #63b3ed)';
    successMsg.style.display = 'block';
    document.getElementById('contact-form').reset();

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.background = '';
      successMsg.style.display = 'none';
    }, 4000);
  }, 1200);
}

/* ---- Smooth cursor glow effect on hero ---- */
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroSection.style.setProperty('--mx', x + '%');
    heroSection.style.setProperty('--my', y + '%');
  });
}

/* ---- Page load animation ---- */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%c🚀 DevOps Capstone App', 'font-size:16px;font-weight:bold;color:#63b3ed;');
console.log('%cRunning on: Kubernetes + Docker + Git + GitHub', 'color:#8892a4;font-size:12px;');
