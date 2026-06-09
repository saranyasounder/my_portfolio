// ── SCROLL REVEAL ─────────────────────────────────────
// Called after any dynamic content is injected
function initReveal() {
  document.querySelectorAll('.reveal:not(.observed)').forEach(el => {
    el.classList.add('observed');
    const rect = el.getBoundingClientRect();
    // Already in viewport — make visible immediately
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      revealObserver.observe(el);
    }
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// ── SKILL BAR ANIMATION ────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill[data-width]').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBars = document.getElementById('skillBars');
if (skillBars) skillObserver.observe(skillBars);

// Run on load for static content
window.addEventListener('load', initReveal);