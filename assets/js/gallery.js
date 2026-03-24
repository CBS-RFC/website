/**
 * gallery.js — Media page filter tabs + native lightbox
 * Works with gallery items rendered by content-loader.js
 */

(function () {

  // ── Filter Tabs ───────────────────────────────────────────────────────────

  function initFilters() {
    const filterBtns = document.querySelectorAll('[data-gallery-filter]');
    const galleryEl  = document.getElementById('gallery-grid');
    if (!filterBtns.length || !galleryEl) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.galleryFilter;

        // Update active button styles
        filterBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-surface');
          b.classList.add('border', 'border-outline-variant', 'text-primary');
        });
        btn.classList.add('bg-primary', 'text-surface');
        btn.classList.remove('border', 'border-outline-variant', 'text-primary');

        // Show/hide items
        const items = galleryEl.querySelectorAll('.gallery-item');
        items.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────

  let lightboxPhotos = [];
  let currentIndex   = 0;

  function buildLightbox() {
    if (document.getElementById('lightbox')) return;

    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo lightbox');
    lb.innerHTML = `
      <button id="lb-close" class="absolute top-4 right-6 text-white text-4xl font-light z-10 hover:text-tertiary-container transition-colors" aria-label="Close lightbox">×</button>
      <button id="lb-prev"  class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-tertiary-container transition-colors z-10" aria-label="Previous photo">
        <span class="material-symbols-outlined text-5xl">chevron_left</span>
      </button>
      <div class="flex flex-col items-center gap-4 max-w-screen-xl w-full px-16">
        <img id="lb-img" src="" alt="" class="max-w-full max-h-[80vh] object-contain shadow-2xl"/>
        <p id="lb-caption" class="font-barlow-condensed uppercase tracking-widest text-white/70 text-sm text-center"></p>
      </div>
      <button id="lb-next"  class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-tertiary-container transition-colors z-10" aria-label="Next photo">
        <span class="material-symbols-outlined text-5xl">chevron_right</span>
      </button>`;

    document.body.appendChild(lb);

    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lb-prev').addEventListener('click', () => navigate(-1));
    document.getElementById('lb-next').addEventListener('click', () => navigate(1));

    // Close on backdrop click
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   navigate(-1);
      if (e.key === 'ArrowRight')  navigate(1);
    });
  }

  function openLightbox(photos, index) {
    lightboxPhotos = photos;
    currentIndex   = index;
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    showPhoto(currentIndex);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
    showPhoto(currentIndex);
  }

  function showPhoto(i) {
    const photo = lightboxPhotos[i];
    if (!photo) return;
    document.getElementById('lb-img').src     = photo.src;
    document.getElementById('lb-img').alt     = photo.caption || '';
    document.getElementById('lb-caption').textContent = photo.caption || '';
  }

  // ── Attach gallery item click handlers ────────────────────────────────────

  function initGalleryClicks() {
    const galleryEl = document.getElementById('gallery-grid');
    if (!galleryEl) return;

    // Wait for content-loader to populate items, then attach
    function attach() {
      const items = galleryEl.querySelectorAll('.gallery-item');
      if (!items.length) { setTimeout(attach, 200); return; }

      const photos = Array.from(items).map(item => ({
        src:     item.dataset.src,
        caption: item.dataset.caption,
      }));

      items.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(photos, i));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') openLightbox(photos, i);
        });
      });
    }

    attach();
  }

  // ── Init ──────────────────────────────────────────────────────────────────

  function init() {
    buildLightbox();
    initFilters();
    initGalleryClicks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
