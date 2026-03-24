/**
 * calendar.js — Google Calendar API integration
 *
 * Reads API key + Calendar ID from _content/site.json
 * Renders event cards on:
 *   - index.html  (next 3 events in #events-preview)
 *   - events.html (all upcoming events in #events-list, filterable)
 */

(async function () {

  // Load site.json for credentials
  let site = {};
  try {
    const res = await fetch('_content/site.json');
    site = await res.json();
  } catch (e) {
    console.warn('calendar.js: could not load site.json', e);
    return;
  }

  const { google_calendar_id: calId, google_api_key: apiKey } = site;

  if (!calId || calId === 'YOUR_CALENDAR_ID_HERE' ||
      !apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    showCalendarPlaceholder();
    return;
  }

  // ── Fetch events ──────────────────────────────────────────────────────────

  async function fetchEvents(maxResults = 20) {
    const now = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events` +
      `?key=${apiKey}` +
      `&timeMin=${now}` +
      `&maxResults=${maxResults}` +
      `&singleEvents=true` +
      `&orderBy=startTime`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Calendar API error ${res.status}`);
    const data = await res.json();
    return data.items || [];
  }

  // ── Detect category from event title ────────────────────────────────────

  function getCategory(title) {
    const t = (title || '').toLowerCase();
    if (t.includes('match') || t.includes('game') || t.includes('vs') || t.includes(' v '))  return 'match';
    if (t.includes('practice') || t.includes('training') || t.includes('session'))            return 'practice';
    if (t.includes('social') || t.includes('dinner') || t.includes('bar') || t.includes('party') || t.includes('rhh')) return 'social';
    if (t.includes('world cup') || t.includes('rwc') || t.includes('tournament'))              return 'special';
    return 'special';
  }

  function getCategoryBadge(category) {
    const map = {
      match:    { bg: 'bg-tertiary-container', text: 'text-primary', label: 'MATCH' },
      social:   { bg: 'bg-primary',            text: 'text-white',   label: 'SOCIAL' },
      practice: { bg: 'bg-surface-container-highest', text: 'text-primary', label: 'PRACTICE' },
      special:  { bg: 'bg-tertiary-container', text: 'text-primary', label: 'SPECIAL' },
    };
    return map[category] || map.special;
  }

  function formatDate(event) {
    const start = event.start?.dateTime || event.start?.date;
    if (!start) return '';
    const d = new Date(start);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  }

  function formatTime(event) {
    const start = event.start?.dateTime;
    if (!start) return '';
    return new Date(start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  function googleCalLink(event) {
    const start = (event.start?.dateTime || event.start?.date || '').replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const end   = (event.end?.dateTime   || event.end?.date   || '').replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const text  = encodeURIComponent(event.summary || '');
    const loc   = encodeURIComponent(event.location || '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&location=${loc}`;
  }

  // ── Render homepage preview (3 cards) ────────────────────────────────────

  const previewEl = document.getElementById('events-preview');
  if (previewEl) {
    try {
      const events = await fetchEvents(3);
      if (events.length === 0) {
        previewEl.innerHTML = noEventsMessage();
        return;
      }
      previewEl.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${events.map(ev => eventPreviewCard(ev)).join('')}
      </div>`;
    } catch (e) {
      console.warn('Calendar fetch error:', e);
      previewEl.innerHTML = calendarErrorMessage();
    }
  }

  function eventPreviewCard(ev) {
    const cat = getCategory(ev.summary);
    const badge = getCategoryBadge(cat);
    return `
      <div class="group cursor-pointer">
        <div class="relative overflow-hidden aspect-video mb-6 bg-surface-container-highest">
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="material-symbols-outlined text-6xl text-outline-variant">event</span>
          </div>
          <div class="absolute top-4 left-4 ${badge.bg} ${badge.text} px-3 py-1 font-barlow-condensed font-bold text-sm tracking-widest uppercase">${badge.label}</div>
        </div>
        <p class="font-barlow-condensed font-bold text-primary tracking-[0.15em] mb-2 uppercase text-sm">${formatDate(ev)}</p>
        <h4 class="font-barlow-condensed font-bold text-2xl text-primary mb-3 group-hover:text-tertiary-container transition-colors uppercase">${ev.summary || 'Untitled Event'}</h4>
        <p class="font-manrope text-on-surface-variant line-clamp-2 text-sm">${ev.description || ev.location || ''}</p>
        <a href="${googleCalLink(ev)}" target="_blank" rel="noopener"
           class="inline-block mt-3 font-barlow-condensed font-bold text-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors">
          Add to Calendar →
        </a>
      </div>`;
  }

  // ── Render events page list ───────────────────────────────────────────────

  const eventsList = document.getElementById('events-list');
  if (eventsList) {
    try {
      const allEvents = await fetchEvents(50);

      function renderEventsList(filter) {
        const filtered = filter === 'all'
          ? allEvents
          : allEvents.filter(ev => getCategory(ev.summary) === filter);

        if (filtered.length === 0) {
          eventsList.innerHTML = `<p class="font-barlow-condensed uppercase tracking-widest text-outline text-center py-16">No events found in this category.</p>`;
          return;
        }

        eventsList.innerHTML = `<div class="flex flex-col border-t border-outline/20">
          ${filtered.map(ev => eventListItem(ev)).join('')}
        </div>`;
      }

      function eventListItem(ev) {
        const cat = getCategory(ev.summary);
        const badge = getCategoryBadge(cat);
        return `
          <div class="flex flex-col md:flex-row items-center py-10 border-b border-outline/20 group hover:bg-surface-container-lowest transition-colors px-4">
            <div class="w-full md:w-1/4 mb-4 md:mb-0">
              <div class="font-barlow-condensed font-bold text-3xl text-primary flex items-baseline gap-2">
                ${formatDate(ev)}
                ${formatTime(ev) ? `<span class="text-lg text-outline font-medium">| ${formatTime(ev)}</span>` : ''}
              </div>
            </div>
            <div class="w-full md:w-1/2 flex flex-col md:flex-row items-center gap-6">
              <span class="${badge.bg} ${badge.text} px-4 py-1 font-barlow-condensed font-bold text-xs tracking-widest uppercase shrink-0">${badge.label}</span>
              <div class="text-center md:text-left">
                <h3 class="font-barlow-condensed text-2xl font-bold text-primary uppercase leading-tight mb-1">${ev.summary || 'Untitled Event'}</h3>
                ${ev.location ? `<p class="text-on-surface-variant text-sm font-manrope">${ev.location}</p>` : ''}
              </div>
            </div>
            <div class="w-full md:w-1/4 flex justify-end mt-6 md:mt-0">
              <a href="${googleCalLink(ev)}" target="_blank" rel="noopener"
                 class="inline-flex items-center gap-2 font-barlow-condensed font-bold text-sm tracking-widest text-primary hover:text-tertiary transition-colors uppercase">
                Add to Cal <span class="material-symbols-outlined text-lg">arrow_right_alt</span>
              </a>
            </div>
          </div>`;
      }

      // Initial render
      renderEventsList('all');

      // Filter tabs
      document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('[data-filter]').forEach(b => {
            b.classList.remove('bg-primary', 'text-surface');
            b.classList.add('border', 'border-outline-variant');
          });
          btn.classList.add('bg-primary', 'text-surface');
          btn.classList.remove('border', 'border-outline-variant');
          renderEventsList(btn.dataset.filter);
        });
      });

    } catch (e) {
      console.warn('Calendar events list error:', e);
      eventsList.innerHTML = calendarErrorMessage();
    }
  }

  // ── Calendar subscribe button ─────────────────────────────────────────────
  const subBtn = document.getElementById('calendar-subscribe');
  if (subBtn && calId) {
    subBtn.href = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calId)}`;
  }

  // ── Utility messages ──────────────────────────────────────────────────────

  function noEventsMessage() {
    return `<p class="font-barlow-condensed uppercase tracking-widest text-outline text-center py-12 col-span-3">
      No upcoming events scheduled. Check back soon!
    </p>`;
  }

  function calendarErrorMessage() {
    return `<p class="font-barlow-condensed uppercase tracking-widest text-outline text-center py-12 col-span-3">
      Events calendar coming soon. Contact us at <a href="mailto:rugby@columbia.edu" class="text-secondary hover:underline">rugby@columbia.edu</a> for details.
    </p>`;
  }

  function showCalendarPlaceholder() {
    const targets = ['events-preview', 'events-list'].map(id => document.getElementById(id)).filter(Boolean);
    targets.forEach(el => {
      el.innerHTML = calendarErrorMessage();
    });
  }

})();
