/**
 * events-filter.js — Events page filter tab UI behavior
 * The actual filtering is handled inside calendar.js via [data-filter] buttons.
 * This file ensures the first tab starts as active on page load.
 */

(function () {
  function initEventFilters() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    if (!filterBtns.length) return;

    // Set the 'ALL' button as active by default
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
      allBtn.classList.add('bg-primary', 'text-surface');
      allBtn.classList.remove('border', 'border-outline-variant');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEventFilters);
  } else {
    initEventFilters();
  }
})();
