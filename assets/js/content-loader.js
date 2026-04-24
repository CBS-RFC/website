/**
 * content-loader.js
 *
 * 1. Loads _includes/nav.html and footer.html into every page
 * 2. Reads _content/site.json to populate footer data
 * 3. Reads page-specific JSON files and renders content slots
 *
 * This is the most critical file in the project.
 * Every content update flows through here.
 */

(async function () {
  // ── 1. INJECT NAV & FOOTER ──────────────────────────────────────────────

  async function loadInclude(id, path) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${path}`);
      el.innerHTML = await res.text();
    } catch (e) {
      console.warn('Include load error:', e);
    }
  }

  await Promise.all([
    loadInclude('nav-placeholder', 'assets/../_includes/nav.html'),
    loadInclude('footer-placeholder', 'assets/../_includes/footer.html'),
  ]);

  // Init nav behavior (hamburger, active state)
  if (typeof window.initNav === 'function') window.initNav();

  // ── 2. LOAD site.json ───────────────────────────────────────────────────

  let site = {};
  try {
    const res = await fetch('_content/site.json');
    site = await res.json();
  } catch (e) {
    console.warn('Could not load site.json', e);
  }

  // Footer dynamic values
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const emailAddr = document.getElementById('footer-email-address');
  if (emailAddr && site.email) emailAddr.textContent = site.email;

  const emailLink = document.getElementById('footer-email-link');
  if (emailLink && site.email) emailLink.href = `mailto:${site.email}`;

  const igLink = document.getElementById('footer-instagram');
  if (igLink && site.instagram) igLink.href = site.instagram;

  const fbLink = document.getElementById('footer-facebook');
  if (fbLink && site.facebook) fbLink.href = site.facebook;

  // ── 3. RENDER CONTENT SLOTS ─────────────────────────────────────────────

  async function loadContent(key) {
    const res = await fetch(`_content/${key}.json`);
    if (!res.ok) throw new Error(`Cannot load _content/${key}.json`);
    return res.json();
  }

  // ── Featured Event (index.html) ─────────────────────────────────────────
  const featuredSlot = document.getElementById('featured-event-section');
  if (featuredSlot) {
    try {
      const fe = await loadContent('featured-event');
      if (fe.active) {
        featuredSlot.style.removeProperty('display');
        featuredSlot.innerHTML = `
          <section class="bg-[#050505] py-24 relative overflow-hidden" data-animate>
            <div class="max-w-7xl mx-auto px-8 relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
              <div class="flex flex-col">
                <h2 class="font-bebas-neue text-[10vw] md:text-8xl leading-none text-white tracking-tighter">
                  MBA RUGBY /<br/>WORLD CUP /<br/><span class="text-tertiary-container">2026</span>
                </h2>
                <div class="mt-8 flex flex-wrap gap-6 font-barlow-condensed text-white/70 uppercase tracking-[0.2em] text-lg">
                  <span class="text-white">${fe.subtitle || ''}</span>
                  <span class="text-tertiary-container">•</span>
                  <span class="text-white">${fe.description || ''}</span>
                </div>
                ${fe.sponsor ? `<p class="mt-5 font-barlow-condensed uppercase tracking-[0.25em] text-white/60 text-xl">${fe.sponsor}</p>` : ''}
              </div>
              <div class="pb-4">
                <a href="${fe.cta_url}" class="inline-block border-2 border-tertiary-container text-tertiary-container px-12 py-5 font-barlow-condensed font-bold uppercase tracking-widest text-xl hover:bg-tertiary-container hover:text-primary transition-all group">
                  ${fe.cta_text} <span class="inline-block transition-transform group-hover:translate-x-2">→</span>
                </a>
              </div>
            </div>
          </section>`;
      } else {
        featuredSlot.style.display = 'none';
      }
    } catch (e) {
      featuredSlot.style.display = 'none';
      console.warn('featured-event load error', e);
    }
  }

  // ── Leadership Grid (about.html) ─────────────────────────────────────────
  const leadershipGrid = document.getElementById('leadership-grid');
  if (leadershipGrid) {
    try {
      const data = await loadContent('leadership');
      leadershipGrid.innerHTML = data.leadership.map(person => `
        <div class="relative bg-surface-container-high group" data-animate>
          <div class="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 bg-outline-variant">
            <img alt="${person.name}"
                 class="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500"
                 src="${person.photo}"
                 onerror="this.src='assets/images/team/placeholder.jpg'"/>
          </div>
          <div class="p-6">
            <h5 class="font-barlow-condensed text-xl font-bold text-primary uppercase">${person.name}</h5>
            <p class="font-manrope text-xs text-tertiary font-bold tracking-widest uppercase mt-1">${person.title}</p>
            ${person.linkedin ? `<a href="${person.linkedin}" target="_blank" rel="noopener" class="inline-block mt-2 text-secondary hover:text-primary text-xs font-manrope transition-colors">LinkedIn →</a>` : ''}
          </div>
        </div>`).join('');
    } catch (e) {
      console.warn('leadership load error', e);
    }
  }

  // ── Sponsor Logos (sponsors.html / rwc page) ─────────────────────────────
  const sponsorLogos = document.getElementById('sponsor-logos');
  if (sponsorLogos) {
    try {
      const data = await loadContent('sponsors');
      if (data.sponsors.length === 0) {
        sponsorLogos.innerHTML = `
          <p class="font-barlow-condensed uppercase tracking-widest text-outline text-center col-span-full py-12">
            Sponsors to be confirmed shortly. Contact us to become a partner.
          </p>`;
      } else {
        const titleSponsors = data.sponsors.filter(s => s.tier === 'title');
        const otherSponsors = data.sponsors.filter(s => s.tier !== 'title');
        let html = '';

        if (titleSponsors.length > 0) {
          html += `<div class="col-span-full mb-4" data-animate>
            <p class="font-bebas-neue text-3xl text-primary text-center mb-4 tracking-widest">Title Sponsor</p>
            <div class="flex justify-center">
            ${titleSponsors.map(s => `
              <a href="${s.url}" target="_blank" rel="noopener" style="max-width:56rem;width:100%;"
                 class="flex flex-col items-center justify-center py-6 px-8 bg-primary hover:bg-primary/90 transition-all group border-t-4 border-tertiary-container">
                <img src="${s.logo}" alt="${s.name}" class="h-14 w-auto object-contain"
                     onerror="this.style.display='none'"/>
              </a>`).join('')}
            </div>
          </div>`;
        }

        if (otherSponsors.length > 0) {
          const tierLabels = { gold: 'Team Sponsor', silver: 'Community Sponsor', bronze: 'Community Sponsor' };
          const grouped = {};
          otherSponsors.forEach(s => { (grouped[s.tier] = grouped[s.tier] || []).push(s); });
          Object.entries(grouped).forEach(([tier, sponsors]) => {
            html += `<div class="col-span-full mt-6 mb-2" data-animate>
              <p class="font-bebas-neue text-2xl text-primary text-center tracking-widest">${tierLabels[tier] || tier}</p>
            </div>`;
            html += `<div class="col-span-full flex justify-center" data-animate>` +
              sponsors.map(s => `
              <a href="${s.url}" target="_blank" rel="noopener" style="max-width:56rem;width:100%;"
                 class="filter grayscale hover:grayscale-0 transition-all duration-500 flex justify-center items-center p-6 group border border-surface-container-highest">
                <img src="${s.logo}" alt="${s.name}" class="h-24 w-auto object-contain"
                     onerror="this.parentElement.innerHTML='<span class=\\'font-barlow-condensed text-sm uppercase text-on-surface-variant\\'>${s.name}</span>'"/>
              </a>`).join('') +
              `</div>`;
          });
        }

        sponsorLogos.innerHTML = html;
      }
    } catch (e) {
      console.warn('sponsors load error', e);
    }
  }

  // ── Sponsor Tier Cards (sponsors.html) ───────────────────────────────────
  const sponsorTiers = document.getElementById('sponsor-tier-cards');
  if (sponsorTiers) {
    try {
      const data = await loadContent('sponsors');
      const tierOrder = ['gold', 'silver', 'bronze'];
      sponsorTiers.innerHTML = tierOrder.map(tier => {
        const t = data.tiers[tier];
        const isGold = tier === 'gold';
        return `
          <div class="${isGold ? 'bg-primary text-white border-t-4 border-tertiary-container' : 'bg-surface border-t-4 border-primary'} p-10 relative" data-animate>
            ${isGold ? '<div class="absolute top-4 right-4 bg-tertiary-container text-primary font-barlow-condensed font-bold text-xs tracking-widest px-3 py-1 uppercase">FEATURED</div>' : ''}
            <h3 class="font-bebas-neue text-3xl ${isGold ? 'text-tertiary-container' : 'text-primary'} mb-2 uppercase">${t.label}</h3>
            <p class="font-barlow-condensed uppercase tracking-widest text-sm mb-6 ${isGold ? 'text-white/60' : 'text-on-surface-variant'}">${tier.toUpperCase()} TIER</p>
            <ul class="space-y-3">
              ${t.benefits.map(b => `
                <li class="flex items-start gap-3 font-manrope text-sm ${isGold ? 'text-white/80' : 'text-on-surface-variant'}">
                  <span class="material-symbols-outlined text-tertiary-container text-base mt-0.5 shrink-0">check_circle</span>
                  ${b}
                </li>`).join('')}
            </ul>
          </div>`;
      }).join('');
    } catch (e) {
      console.warn('sponsor tiers load error', e);
    }
  }

  // ── Alumni Profiles (alumni.html) ─────────────────────────────────────────
  const alumniProfiles = document.getElementById('alumni-profiles');
  if (alumniProfiles) {
    try {
      const data = await loadContent('alumni');
      alumniProfiles.innerHTML = data.featured_alumni.map((a, i) => `
        <div class="group relative bg-surface overflow-hidden" data-animate data-animate-delay="${i * 100}">
          <div class="aspect-[3/4] overflow-hidden bg-surface-container-highest">
            <img alt="${a.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                 src="${a.photo}" onerror="this.src='assets/images/team/placeholder.jpg'"/>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80"></div>
          <div class="absolute bottom-0 left-0 p-8 w-full">
            <span class="text-surface/20 text-8xl font-bebas-neue absolute -top-12 -left-4 z-0">${String(i+1).padStart(2,'0')}</span>
            <h3 class="text-3xl text-tertiary-container font-bebas-neue relative z-10">${a.name}</h3>
            <p class="text-surface font-barlow-condensed uppercase tracking-widest text-sm relative z-10">${a.current_role}</p>
            <p class="text-surface/60 font-barlow-condensed uppercase tracking-wider text-xs mt-1 relative z-10">${a.graduation_year}</p>
          </div>
        </div>`).join('');
    } catch (e) {
      console.warn('alumni load error', e);
    }
  }

  // ── Alumni Quotes (alumni.html) ───────────────────────────────────────────
  const alumniQuote = document.getElementById('alumni-feature-quote');
  if (alumniQuote) {
    try {
      const data = await loadContent('alumni');
      const first = data.featured_alumni[0];
      if (first) {
        alumniQuote.innerHTML = `
          <div class="relative p-8 bg-surface-container-low border-l-4 border-tertiary-container" data-animate>
            <span class="material-symbols-outlined text-tertiary-container text-6xl absolute -top-8 left-8 bg-surface px-2">format_quote</span>
            <p class="font-barlow-condensed italic text-2xl text-primary leading-snug">"${first.quote}"</p>
            <p class="mt-4 font-manrope font-bold text-on-surface text-sm">${first.name.toUpperCase()}, ${first.graduation_year}</p>
          </div>`;
      }
    } catch (e) {
      console.warn('alumni quote load error', e);
    }
  }

  // ── RWC Teams Grid (rugby-world-cup.html) ─────────────────────────────────
  const rwcTeams = document.getElementById('rwc-teams-grid');
  if (rwcTeams) {
    try {
      const data = await loadContent('rwc');
      rwcTeams.innerHTML = data.teams.map((team, i) => {
        if (team.confirmed) {
          return `
            <div class="bg-surface border-b-4 border-tertiary-container p-6 flex flex-col items-center text-center gap-4 group" data-animate data-animate-delay="${(i % 5) * 100}">
              ${team.logo
                ? `<img src="${team.logo}" alt="${team.name}" class="h-16 w-auto object-contain"/>`
                : `<div class="w-16 h-16 bg-primary flex items-center justify-center">
                     <span class="material-symbols-outlined text-tertiary-container text-3xl">sports_rugby</span>
                   </div>`}
              <h4 class="font-barlow-condensed font-bold text-primary uppercase tracking-wide text-sm">${team.name}</h4>
              <span style="${team.division === 'womens' ? 'background:#9333ea;color:#fff' : 'background:#1d4ed8;color:#fff'}" class="font-barlow-condensed text-xs font-bold uppercase tracking-widest px-3 py-1">${team.division === 'womens' ? "WOMEN'S" : "MEN'S"}</span>
            </div>`;
        } else {
          return `
            <div class="bg-surface-container border-b-4 border-outline-variant p-6 flex flex-col items-center text-center gap-4 opacity-50" data-animate data-animate-delay="${(i % 5) * 100}">
              <div class="w-16 h-16 bg-surface-container-highest flex items-center justify-center border-2 border-dashed border-outline-variant">
                <span class="material-symbols-outlined text-outline text-3xl">help_outline</span>
              </div>
              <h4 class="font-barlow-condensed font-bold text-outline uppercase tracking-wide text-sm">TBA</h4>
              <span class="font-barlow-condensed text-xs font-bold uppercase tracking-widest text-outline border border-outline px-3 py-1">UNCONFIRMED</span>
            </div>`;
        }
      }).join('');
    } catch (e) {
      console.warn('rwc teams load error', e);
    }
  }

  // ── RWC FAQ Accordion (rugby-world-cup.html) ──────────────────────────────
  const rwcFaq = document.getElementById('rwc-faq');
  if (rwcFaq) {
    try {
      const data = await loadContent('rwc');
      rwcFaq.innerHTML = data.faq.map((item, i) => `
        <div class="border-b border-outline-variant" data-animate>
          <button class="w-full flex items-center justify-between py-6 text-left group faq-toggle"
                  aria-expanded="false" aria-controls="faq-answer-${i}">
            <span class="font-barlow-condensed font-bold text-xl text-primary uppercase tracking-wide group-hover:text-tertiary-container transition-colors">${item.question}</span>
            <span class="material-symbols-outlined text-primary group-hover:text-tertiary-container transition-all faq-icon text-2xl shrink-0 ml-4">add</span>
          </button>
          <div id="faq-answer-${i}" class="overflow-hidden max-h-0 transition-all duration-300 faq-answer" role="region">
            <p class="font-manrope text-on-surface-variant leading-relaxed pb-6">${item.answer}</p>
          </div>
        </div>`).join('');

      // FAQ accordion logic
      rwcFaq.addEventListener('click', (e) => {
        const btn = e.target.closest('.faq-toggle');
        if (!btn) return;
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        // Close all
        rwcFaq.querySelectorAll('.faq-toggle').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.style.maxHeight = '0';
          b.querySelector('.faq-icon').textContent = 'add';
        });
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.textContent = 'remove';
        }
      });
    } catch (e) {
      console.warn('rwc faq load error', e);
    }
  }

  // ── Practice Schedule (recruits.html) ────────────────────────────────────
  const practiceSchedule = document.getElementById('practice-schedule');
  if (practiceSchedule) {
    try {
      const data = await loadContent('recruits');
      practiceSchedule.innerHTML = data.practice_schedule.map(s => `
        <div class="flex gap-4 items-start" data-animate>
          <div class="shrink-0 w-10 h-10 bg-tertiary-container flex items-center justify-center">
            <span class="material-symbols-outlined text-primary text-xl">calendar_today</span>
          </div>
          <div>
            <p class="font-barlow-condensed font-bold text-primary uppercase text-xl tracking-wide">${s.team} — ${s.days}</p>
            <p class="font-manrope text-on-surface-variant text-sm">${s.location}</p>
          </div>
        </div>`).join('');
    } catch (e) {
      console.warn('practice schedule load error', e);
    }
  }

  // ── Player Quotes (recruits.html) ─────────────────────────────────────────
  const playerQuotes = document.getElementById('player-quotes');
  if (playerQuotes) {
    try {
      const data = await loadContent('recruits');
      playerQuotes.innerHTML = data.player_quotes.map((q, i) => {
        const isMiddle = i === 1;
        return `
          <div class="${isMiddle ? 'bg-primary text-surface' : 'bg-surface-container-highest'} p-10 relative" data-animate data-animate-delay="${i * 100}">
            <span class="material-symbols-outlined text-tertiary-container text-6xl absolute -top-4 -left-2 opacity-30" style="font-variation-settings: 'FILL' 1;">format_quote</span>
            <p class="font-barlow-condensed text-xl italic ${isMiddle ? 'text-surface' : 'text-primary'} leading-snug mb-8 relative z-10">"${q.quote}"</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 ${isMiddle ? 'bg-tertiary-container' : 'bg-primary'} overflow-hidden">
                <img src="${q.photo}" alt="${q.name}" class="w-full h-full object-cover"
                     onerror="this.parentElement.innerHTML=''"/>
              </div>
              <div>
                <p class="font-bebas-neue text-lg leading-none ${isMiddle ? 'text-surface' : ''}">${q.name}</p>
                <p class="font-barlow-condensed text-sm uppercase font-bold ${isMiddle ? 'text-surface/70' : 'text-on-surface-variant'}">${q.year}</p>
              </div>
            </div>
          </div>`;
      }).join('');
    } catch (e) {
      console.warn('player quotes load error', e);
    }
  }

  // ── Gallery Photos (media.html) ───────────────────────────────────────────
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    try {
      const data = await loadContent('gallery');
      galleryGrid.innerHTML = data.photos.map((photo, i) => {
        const sizes = ['masonry-item-tall', 'masonry-item-short', 'masonry-item-medium'];
        const size = sizes[i % sizes.length];
        return `
          <div class="${size} relative group overflow-hidden bg-surface-container-highest cursor-pointer gallery-item"
               data-category="${photo.category}"
               data-src="${photo.src}"
               data-caption="${photo.caption}"
               tabindex="0" role="button" aria-label="View: ${photo.caption}">
            <img alt="${photo.caption}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 src="${photo.src}" loading="lazy" onerror="this.parentElement.style.display='none'"/>
            <div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div>
                <p class="text-tertiary-container font-barlow-condensed text-xs tracking-widest uppercase">${photo.category.replace('-', ' ')}</p>
                <h4 class="text-surface font-bebas-neue text-xl uppercase">${photo.caption}</h4>
              </div>
            </div>
          </div>`;
      }).join('');
    } catch (e) {
      console.warn('gallery load error', e);
    }
  }

  // ── Upcoming Events on Index (index.html) ─────────────────────────────────
  const eventsPreview = document.getElementById('events-preview');
  if (eventsPreview) {
    // calendar.js will handle this
    // Provide placeholder markup until calendar loads
    eventsPreview.dataset.calendarPreview = 'true';
  }

  // ── Past Results (events.html) ────────────────────────────────────────────
  const resultsTable = document.getElementById('results-table');
  if (resultsTable) {
    try {
      const data = await loadContent('results');
      if (!data.results || data.results.length === 0) {
        resultsTable.innerHTML = `<p class="font-barlow-condensed uppercase tracking-widest text-outline text-center py-12">No results recorded yet.</p>`;
      } else {
        const resultStyles = {
          W: { style: 'background:#15803d;color:#fff', label: 'W' },
          L: { style: 'background:#b91c1c;color:#fff', label: 'L' },
          D: { style: 'background:#6b7280;color:#fff', label: 'D' },
        };
        resultsTable.innerHTML = `
          <div class="overflow-x-auto">
            <table class="w-full font-barlow-condensed text-sm md:text-base">
              <thead>
                <tr class="bg-primary text-white uppercase tracking-widest text-xs md:text-sm">
                  <th class="text-left px-4 py-3 font-bold">Date</th>
                  <th class="text-left px-4 py-3 font-bold">Opponent</th>
                  <th class="text-left px-4 py-3 font-bold hidden md:table-cell">Competition</th>
                  <th class="text-center px-4 py-3 font-bold">Result</th>
                </tr>
              </thead>
              <tbody>
                ${data.results.map((r, i) => {
                  const s = resultStyles[r.result] || resultStyles.D;
                  const d = new Date(r.date);
                  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
                  const rowBg = i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low';
                  return `
                    <tr class="${rowBg} border-b border-outline-variant/20 hover:bg-surface-container transition-colors">
                      <td class="px-4 py-4 text-on-surface-variant font-semibold whitespace-nowrap">${dateStr}</td>
                      <td class="px-4 py-4 text-primary font-bold uppercase">${r.opponent}</td>
                      <td class="px-4 py-4 text-on-surface-variant hidden md:table-cell uppercase tracking-wide">${r.competition}</td>
                      <td class="px-4 py-4 text-center">
                        <span style="${s.style}" class="inline-block w-8 h-8 leading-8 text-center font-bold text-sm">${s.label}</span>
                      </td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>`;
      }
    } catch (e) {
      resultsTable.innerHTML = `<p class="font-barlow-condensed uppercase tracking-widest text-outline text-center py-12">Results coming soon.</p>`;
      console.warn('results load error', e);
    }
  }

  // ── Scroll animations ─────────────────────────────────────────────────────
  if (typeof window.initAnimations === 'function') {
    window.initAnimations();
  }

})();
