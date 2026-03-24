/**
 * animations.js — Scroll-triggered fade-in animations
 * Observes all [data-animate] elements and adds 'animate-in' class when visible
 */

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// Run on DOM ready, or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  // Will be called again by content-loader after includes are injected
  initAnimations();
}

// Export for content-loader.js
window.initAnimations = initAnimations;
