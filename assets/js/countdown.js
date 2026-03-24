/**
 * countdown.js — RWC countdown timer
 * Reads countdown_target from _content/featured-event.json
 */

(async function () {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  let targetDate;
  try {
    const res = await fetch('_content/featured-event.json');
    const data = await res.json();
    targetDate = data.countdown_target;
  } catch (e) {
    console.warn('countdown.js: could not load featured-event.json', e);
    return;
  }

  if (!targetDate) return;

  const target = new Date(targetDate);

  function updateCountdown() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      countdownEl.innerHTML = `
        <div class="text-center">
          <p class="font-bebas-neue text-5xl text-tertiary-container">EVENT COMPLETE</p>
          <p class="font-barlow-condensed uppercase tracking-widest text-white/60 mt-2">Thank you to all participants. See you next year.</p>
        </div>`;
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    countdownEl.innerHTML = `
      <div class="flex flex-wrap justify-center gap-8 md:gap-16">
        ${[
          ['DAYS',    days],
          ['HOURS',   hours],
          ['MINUTES', minutes],
          ['SECONDS', seconds],
        ].map(([label, val]) => `
          <div class="flex flex-col items-center">
            <span class="countdown-digit">${label === 'DAYS' ? days : pad(val)}</span>
            <span class="countdown-label">${label}</span>
          </div>`).join('')}
      </div>`;

    setTimeout(updateCountdown, 1000);
  }

  updateCountdown();
})();
