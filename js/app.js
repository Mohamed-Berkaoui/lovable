/* ============================================================
   LOVABLE PRESENTATION – App Controller (app.js)
   ============================================================
   Handles:
   - Slide navigation (keyboard, click, touch)
   - Progress bar updates
   - Slide counter
   - Smooth transitions
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const slides       = document.querySelectorAll('.slide');
  const progressBar  = document.querySelector('.progress-bar');
  const slideCounter = document.querySelector('.slide-counter');
  const btnPrev      = document.getElementById('btn-prev');
  const btnNext      = document.getElementById('btn-next');

  /* ---------- State ---------- */
  let currentSlide = 0;
  const totalSlides = slides.length;

  /* ---------- Initialise ---------- */
  function init() {
    if (totalSlides === 0) return; // Not in presentation mode

    updateSlide();
    bindEvents();
  }

  /* ---------- Update Slide View ---------- */
  function updateSlide() {
    // Toggle active class on all slides
    slides.forEach(function (slide, index) {
      slide.classList.toggle('active', index === currentSlide);
    });

    // Update progress bar width
    if (progressBar) {
      const pct = ((currentSlide + 1) / totalSlides) * 100;
      progressBar.style.width = pct + '%';
    }

    // Update counter text
    if (slideCounter) {
      slideCounter.textContent = (currentSlide + 1) + ' / ' + totalSlides;
    }

    // Enable / disable nav buttons
    if (btnPrev) btnPrev.disabled = currentSlide === 0;
    if (btnNext) btnNext.disabled = currentSlide === totalSlides - 1;
  }

  /* ---------- Navigation Helpers ---------- */
  function goNext() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlide();
    }
  }

  function goPrev() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  }

  function goTo(index) {
    if (index >= 0 && index < totalSlides) {
      currentSlide = index;
      updateSlide();
    }
  }

  /* ---------- Event Bindings ---------- */
  function bindEvents() {
    // Arrow buttons
    if (btnPrev) btnPrev.addEventListener('click', goPrev);
    if (btnNext) btnNext.addEventListener('click', goNext);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
      // Home / End shortcuts
      if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      if (e.key === 'End')  { e.preventDefault(); goTo(totalSlides - 1); }
    });

    // Touch / Swipe support
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      const dx = e.changedTouches[0].screenX - touchStartX;
      const dy = e.changedTouches[0].screenY - touchStartY;

      // Only register horizontal swipes (ignore vertical scroll)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goNext();  // Swipe left  → next
        else        goPrev();  // Swipe right → prev
      }
    }, { passive: true });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', init);
})();
