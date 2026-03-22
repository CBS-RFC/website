# CBS RFC Website — Claude Code Build Prompt
> Paste this entire file into Claude Code to begin the build session.
> Do not skip any section. Each section is load-bearing.

---

## WHO YOU ARE AND WHAT YOU ARE BUILDING

You are building the production website for the **Columbia Business School Rugby Football Club (CBS RFC)** — the oldest club at Columbia Business School, founded in 1968, a registered 501(c)(3) nonprofit.

The design has already been completed in Google Stitch and is approved. Your job is NOT to make design decisions — it is to faithfully implement the approved design, wire up all functionality, integrate all backend services, and produce a production-ready website that can be deployed to Netlify.

**The approved Stitch HTML files are in `/stitch-exports/`.** Treat them as the visual specification. Every layout, color, font, and component decision is already made. Do not deviate from the design without being explicitly asked.

---

## CRITICAL PRINCIPLE: LONG-TERM MAINTAINABILITY

This website will be maintained by future CBS RFC presidents who may have limited technical experience. **Every content update must be achievable by editing a single, clearly labeled file — never by touching page HTML directly.**

This principle governs every architectural decision in this build. When in doubt, ask: "Could the next president update this without knowing HTML?" If the answer is no, extract it to a content file.

---

## TECH STACK

- **Language:** Vanilla HTML, CSS, JavaScript — no frameworks
- **CSS:** Tailwind CSS — installed as npm package, compiled to single CSS file (NOT CDN)
- **JavaScript:** Vanilla ES6+ — modular, one JS file per concern
- **Forms:** Netlify Forms — no backend required
- **Events:** Google Calendar API — all event displays pull from Google Calendar
- **Hosting:** Netlify — continuous deployment from GitHub
- **Build tool:** npm scripts only — no Webpack, no Vite, no unnecessary complexity

---

## PROJECT FOLDER STRUCTURE

Create this exact folder structure. Every folder and file serves a specific purpose documented below.

```
cbs-rfc-website/
│
├── index.html                  ← Home page
├── about.html                  ← About page
├── events.html                 ← Events page
├── rugby-world-cup.html        ← RWC 2026 page
├── alumni.html                 ← Alumni page
├── recruits.html               ← Recruits page
├── sponsors.html               ← Sponsors page
├── media.html                  ← Media/Gallery page
├── 404.html                    ← Custom 404 page
│
├── _content/                   ← ★ ALL EDITABLE CONTENT LIVES HERE ★
│   ├── site.json               ← Global site info (club name, email, socials, copyright year)
│   ├── featured-event.json     ← Controls the homepage RWC/featured event banner
│   ├── leadership.json         ← Leadership team roster (names, titles, photo paths)
│   ├── sponsors.json           ← Current sponsors (name, logo path, tier, URL)
│   ├── alumni.json             ← Featured alumni profiles
│   ├── recruits.json           ← Practice schedule, player quotes
│   ├── rwc.json                ← RWC page content (teams, schedule, FAQ)
│   └── README.md               ← Plain-English guide for non-technical editors
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   │   ├── cbs-rfc-crest.png       ← Main crest (provided)
│   │   │   └── cbs-rfc-wordmark.png    ← Wordmark variant
│   │   ├── heroes/                     ← Full-bleed hero background photos
│   │   │   ├── home-hero.jpg
│   │   │   ├── about-hero.jpg
│   │   │   ├── events-hero.jpg
│   │   │   ├── rwc-hero.jpg
│   │   │   ├── alumni-hero.jpg
│   │   │   ├── recruits-hero.jpg
│   │   │   ├── sponsors-hero.jpg       ← Optional, or use solid navy
│   │   │   └── media-hero.jpg
│   │   ├── team/                       ← Leadership headshots
│   │   │   ├── joe-mozden.jpg
│   │   │   ├── ryan-downey.jpg
│   │   │   └── [one file per leader]
│   │   ├── gallery/                    ← Media page photos
│   │   │   ├── matches/
│   │   │   ├── social/
│   │   │   ├── alumni-game/
│   │   │   ├── rwc/
│   │   │   └── training/
│   │   ├── sponsors/                   ← Sponsor logos
│   │   │   └── [sponsor-name].png
│   │   └── og-image.jpg                ← Social media preview image (1200x630px)
│   │
│   ├── css/
│   │   ├── tailwind.css                ← Tailwind source (input)
│   │   └── main.css                    ← Compiled output (never edit directly)
│   │
│   └── js/
│       ├── nav.js                      ← Mobile hamburger, sticky nav behavior
│       ├── animations.js               ← Scroll-triggered fade-ins, stagger reveals
│       ├── calendar.js                 ← Google Calendar API → event cards
│       ├── countdown.js                ← RWC countdown timer
│       ├── gallery.js                  ← Media page filter tabs, lightbox
│       ├── events-filter.js            ← Events page filter tabs
│       └── content-loader.js          ← Reads _content/*.json and renders to page
│
├── _includes/                  ← Shared HTML snippets (nav, footer)
│   ├── nav.html                ← Global navigation (single source of truth)
│   └── footer.html             ← Global footer (single source of truth)
│
├── netlify.toml                ← Netlify configuration (redirects, headers, forms)
├── tailwind.config.js          ← Tailwind config (colors, fonts — matches Stitch design system)
├── package.json                ← npm scripts for build
└── .gitignore
```

---

## THE `_content/` SYSTEM — BUILD THIS CAREFULLY

This is the most important architectural decision in the entire project. Every piece of content that will change over time must live in `_content/`. The JavaScript `content-loader.js` reads these files on page load and injects content into pre-defined slots in the HTML.

**This means:** HTML pages contain structure and design. JSON files contain all words, names, numbers, and paths. Future editors touch JSON only.

### `_content/site.json`
```json
{
  "club_name": "CBS Rugby Football Club",
  "abbreviation": "CBS RFC",
  "founded": 1968,
  "tagline": "The Oldest Club at CBS",
  "email": "rugby@columbia.edu",
  "instagram": "https://instagram.com/cbsrugbyfc",
  "facebook": "https://facebook.com/CBSRugbyFootballClub",
  "linkedin": "",
  "copyright_year_start": 1968,
  "nonprofit_ein": "",
  "google_calendar_id": "YOUR_CALENDAR_ID_HERE",
  "google_api_key": "YOUR_API_KEY_HERE"
}
```

### `_content/featured-event.json`
```json
{
  "active": true,
  "title": "MBA Rugby World Cup 2026",
  "subtitle": "April 25, 2026 · Governor's Island, NYC",
  "description": "14 Teams. 1 Champion.",
  "cta_text": "Event Details",
  "cta_url": "/rugby-world-cup.html",
  "countdown_target": "2026-04-25T09:00:00",
  "background_style": "dark"
}
```
**When RWC 2026 ends:** Set `"active": false`. The homepage section disappears automatically.
**For RWC 2027:** Update the fields above and set `"active": true`. Done. No HTML touched.

### `_content/leadership.json`
```json
{
  "leadership": [
    {
      "name": "Joe Mozden",
      "title": "Men's Co-President",
      "photo": "assets/images/team/joe-mozden.jpg",
      "linkedin": ""
    },
    {
      "name": "Ryan Downey",
      "title": "Men's Co-President",
      "photo": "assets/images/team/ryan-downey.jpg",
      "linkedin": ""
    },
    {
      "name": "Will Cahill",
      "title": "Head Men's Coach",
      "photo": "assets/images/team/will-cahill.jpg",
      "linkedin": ""
    },
    {
      "name": "Heidi Liu",
      "title": "Women's Co-President",
      "photo": "assets/images/team/heidi-liu.jpg",
      "linkedin": ""
    },
    {
      "name": "Bri \"Breezy\" Sharkey",
      "title": "Women's Co-President",
      "photo": "assets/images/team/bri-sharkey.jpg",
      "linkedin": ""
    },
    {
      "name": "Giacomo Tritto",
      "title": "Backs Coach",
      "photo": "assets/images/team/giacomo-tritto.jpg",
      "linkedin": ""
    },
    {
      "name": "Andrew Schwartz",
      "title": "Forwards Coach",
      "photo": "assets/images/team/andrew-schwartz.jpg",
      "linkedin": ""
    },
    {
      "name": "Matt Pieringer",
      "title": "VP of Events",
      "photo": "assets/images/team/matt-pieringer.jpg",
      "linkedin": ""
    },
    {
      "name": "Eric Puleio",
      "title": "Alumni Captain",
      "photo": "assets/images/team/eric-puleio.jpg",
      "linkedin": ""
    }
  ]
}
```

### `_content/sponsors.json`
```json
{
  "sponsors": [
    {
      "name": "Sponsor One",
      "logo": "assets/images/sponsors/sponsor-one.png",
      "url": "https://sponsor-one.com",
      "tier": "gold"
    },
    {
      "name": "Sponsor Two",
      "logo": "assets/images/sponsors/sponsor-two.png",
      "url": "https://sponsor-two.com",
      "tier": "silver"
    }
  ],
  "tiers": {
    "gold": {
      "label": "Premier Partner",
      "benefits": [
        "Logo on all match kits",
        "Homepage feature placement",
        "RWC 2026 presenting sponsor recognition",
        "Social media features",
        "Annual networking event invitation"
      ]
    },
    "silver": {
      "label": "Team Partner",
      "benefits": [
        "Logo on club website",
        "RWC 2026 sponsor recognition",
        "Social media mention",
        "Networking event invitation"
      ]
    },
    "bronze": {
      "label": "Community Partner",
      "benefits": [
        "Logo on club website",
        "Social media mention"
      ]
    }
  }
}
```

### `_content/rwc.json`
```json
{
  "year": 2026,
  "date": "April 25, 2026",
  "location": "Governor's Island, New York City",
  "tagline": "14 Teams. 1 Champion.",
  "teams": [
    { "name": "Columbia Business School", "confirmed": true, "logo": "" },
    { "name": "Wharton", "confirmed": true, "logo": "" },
    { "name": "Harvard Business School", "confirmed": false, "logo": "" },
    { "name": "NYU Stern", "confirmed": true, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" },
    { "name": "TBA", "confirmed": false, "logo": "" }
  ],
  "faq": [
    {
      "question": "Who can attend?",
      "answer": "The event is open to players, students, alumni, and supporters. Come cheer on your school."
    },
    {
      "question": "How do we register a team?",
      "answer": "Contact us at rugby@columbia.edu with your school name and roster."
    },
    {
      "question": "Where exactly is Governor's Island?",
      "answer": "Governor's Island is a short ferry ride from Lower Manhattan. Ferry details will be sent to registered teams and attendees."
    },
    {
      "question": "What is the tournament format?",
      "answer": "Group stage followed by knockout rounds, culminating in the final in the afternoon."
    }
  ]
}
```

### `_content/recruits.json`
```json
{
  "practice_schedule": [
    {
      "team": "Men's",
      "days": "Tuesday & Thursday",
      "time": "6:30 PM",
      "location": "Baker Athletics Complex, 218th St, Manhattan"
    },
    {
      "team": "Women's",
      "days": "Wednesday",
      "time": "6:00 PM",
      "location": "Baker Athletics Complex, 218th St, Manhattan"
    }
  ],
  "player_quotes": [
    {
      "quote": "I showed up not knowing a single rugby rule. Two weeks later I had a team. Two years later I had lifelong friends.",
      "name": "Placeholder Name",
      "year": "CBS '25",
      "photo": "assets/images/team/placeholder.jpg"
    },
    {
      "quote": "Nothing at CBS builds bonds faster than getting tackled together on a Tuesday night.",
      "name": "Placeholder Name",
      "year": "CBS '24",
      "photo": "assets/images/team/placeholder.jpg"
    }
  ]
}
```

### `_content/alumni.json`
```json
{
  "featured_alumni": [
    {
      "name": "Alumni Name",
      "graduation_year": "CBS '18",
      "current_role": "VP, Goldman Sachs",
      "photo": "assets/images/team/placeholder.jpg",
      "quote": "Rugby at CBS taught me more about leadership under pressure than any case study."
    },
    {
      "name": "Alumni Name",
      "graduation_year": "CBS '15",
      "current_role": "Founder & CEO, TechCo",
      "photo": "assets/images/team/placeholder.jpg",
      "quote": "The network I built on the pitch is still my most valuable professional asset."
    },
    {
      "name": "Alumni Name",
      "graduation_year": "CBS '20",
      "current_role": "Partner, McKinsey & Company",
      "photo": "assets/images/team/placeholder.jpg",
      "quote": "CBS RFC shaped how I show up as a leader every single day."
    }
  ]
}
```

### `_content/README.md`
Write this file in plain English. It is the instruction manual for future non-technical club presidents. It must explain:
- What each JSON file controls and which page it affects
- How to update the leadership roster (add a name, change a title, update a photo)
- How to turn the featured event on and off
- How to add a new sponsor
- How to add photos to the gallery (just drop files in the right folder)
- How to update practice schedule
- Never edit HTML files directly
- Who to contact if something breaks (link to GitHub repo, note about Netlify)

Make this README the most important file in the project. Write it as if explaining to someone who has never written code.

---

## BUILD INSTRUCTIONS — DO THESE IN ORDER

### Step 1: Initialize the project

```bash
mkdir cbs-rfc-website
cd cbs-rfc-website
npm init -y
npm install -D tailwindcss
npx tailwindcss init
git init
```

Create `.gitignore`:
```
node_modules/
assets/css/main.css
.env
.DS_Store
```

### Step 2: Configure Tailwind

In `tailwind.config.js`, replicate the exact design system from the Stitch exports:

```javascript
module.exports = {
  content: ['./*.html', './_includes/*.html', './assets/js/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary':              '#002241',
        'primary-container':    '#003865',
        'tertiary-container':   '#C9A84C',
        'tertiary':             '#755B00',
        'surface':              '#FCF8F8',
        'surface-container-low':'#F6F3F2',
        'surface-container':    '#F0EDEC',
        'on-surface':           '#1C1B1B',
        'on-surface-variant':   '#42474F',
        'on-primary':           '#FFFFFF',
        'secondary':            '#1D648B',
        'outline-variant':      '#C2C6D0',
      },
      fontFamily: {
        'bebas-neue':       ['Bebas Neue', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
        'manrope':          ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0px',
        'lg':      '0px',
        'xl':      '0px',
        'full':    '9999px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
```

In `package.json` scripts:
```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/main.css --minify",
    "watch:css": "tailwindcss -i ./assets/css/tailwind.css -o ./assets/css/main.css --watch",
    "build": "npm run build:css",
    "dev": "npm run watch:css"
  }
}
```

### Step 3: Build shared includes

Create `_includes/nav.html` and `_includes/footer.html` as standalone HTML fragments. Every page includes them via a JavaScript include system (use fetch() to load and inject them into a `<div id="nav-placeholder">` and `<div id="footer-placeholder">`). This means nav and footer are edited in exactly ONE place forever.

Nav must include:
- CBS RFC crest logo (links to `index.html`)
- All 8 nav links with correct `href` paths
- Active page detection (highlight current page link in gold)
- "JOIN THE CLUB" CTA button linking to `recruits.html`
- Mobile hamburger menu — fully functional open/close with overlay

### Step 4: Build all 8 pages

For each page, take the Stitch HTML from `/stitch-exports/` and:

1. Replace the `<head>` with a standardized head block:
```html
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="[page-specific description]"/>
  <!-- Open Graph -->
  <meta property="og:title" content="[page title] | CBS RFC"/>
  <meta property="og:description" content="[description]"/>
  <meta property="og:image" content="assets/images/og-image.jpg"/>
  <meta property="og:type" content="website"/>
  <title>[Page Title] | CBS RFC</title>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>
  <!-- Compiled CSS -->
  <link rel="stylesheet" href="assets/css/main.css"/>
  <link rel="icon" href="assets/images/logo/cbs-rfc-crest.png"/>
</head>
```

2. Replace all `href="#"` nav links with correct paths
3. Replace ALL external Stitch image URLs (`lh3.googleusercontent.com/aida...`) with local asset paths
4. Replace CDN Tailwind script tag with compiled CSS link
5. Add `<div id="nav-placeholder"></div>` at top of body (nav injected here)
6. Add `<div id="footer-placeholder"></div>` at bottom of body
7. Add content slots with `data-content` attributes for JSON-driven sections (see below)
8. Add page-specific JS files at bottom of body

**Content slots pattern** — use this for all dynamic content:
```html
<!-- Leadership cards render here from _content/leadership.json -->
<div id="leadership-grid" data-content="leadership"></div>

<!-- Featured event renders here from _content/featured-event.json -->
<div id="featured-event-section" data-content="featured-event"></div>

<!-- Sponsor logos render here from _content/sponsors.json -->
<div id="sponsor-logos" data-content="sponsors"></div>
```

### Step 5: Build `content-loader.js`

This is the most important JS file. It:
1. Reads `_content/site.json` on every page load — populates footer email, social links, copyright year
2. On pages with `data-content` slots, fetches the relevant JSON and renders the appropriate HTML
3. Renders leadership cards from `leadership.json`
4. Shows/hides the featured event section based on `featured-event.json` `active` field
5. Renders sponsor logos from `sponsors.json`
6. Renders alumni profiles from `alumni.json`
7. Renders RWC teams grid from `rwc.json`
8. Renders RWC FAQ accordion from `rwc.json`
9. Renders practice schedule from `recruits.json`
10. Renders player quotes from `recruits.json`

Pattern for all renders:
```javascript
async function loadContent(key) {
  const res = await fetch(`_content/${key}.json`);
  const data = await res.json();
  return data;
}
```

### Step 6: Build `calendar.js` — Google Calendar Integration

```javascript
// Fetches upcoming events from Google Calendar API
// Renders them as Event Cards on:
//   - index.html (next 3 events only, in "What's Coming Up" section)
//   - events.html (all upcoming events, filterable by category)

async function fetchEvents(calendarId, apiKey, maxResults = 10) {
  const now = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items || [];
}
```

Event card rendering must:
- Use category tags based on event title keywords (e.g. "match" → MATCH tag in gold, "social" → SOCIAL tag in navy, "practice" → PRACTICE tag)
- Display date in `BARLOW CONDENSED` uppercase format
- Display title, description (truncated to 2 lines), location
- Include "Add to Calendar" link per event (Google Calendar link)
- On events.html: be filterable by category (ALL | MATCHES | SOCIAL | PRACTICE | SPECIAL)

### Step 7: Build `countdown.js`

For `rugby-world-cup.html` — reads `countdown_target` from `_content/featured-event.json`:

```javascript
function updateCountdown(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;

  if (diff <= 0) {
    // Event has passed — hide countdown, show "Event Recap" message
    document.getElementById('countdown').innerHTML = '<p>The event has concluded. See you next year.</p>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Update DOM elements
}
setInterval(() => updateCountdown(targetDate), 1000);
```

### Step 8: Build `animations.js`

Scroll-triggered fade-in for all major sections:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

CSS in `tailwind.css`:
```css
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
[data-animate].animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

Add `data-animate` to every major section, card, and content block in the HTML.

### Step 9: Build Netlify Forms

All three forms use this pattern:

```html
<!-- Recruits form -->
<form name="recruits-signup" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="recruits-signup"/>
  <input type="hidden" name="bot-field" class="hidden"/>
  <!-- form fields -->
  <button type="submit">Join the Team →</button>
</form>

<!-- Alumni reconnect form -->
<form name="alumni-reconnect" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="alumni-reconnect"/>
  <!-- fields: Name, Graduation Year, Current Role, Company, LinkedIn, Email, Message -->
</form>

<!-- Sponsors inquiry form -->
<form name="sponsor-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="sponsor-inquiry"/>
  <!-- fields: Company Name, Contact Name, Email, Message -->
</form>
```

All form submissions show an inline success message — no redirect to a generic Netlify page.

### Step 10: Build `gallery.js`

For `media.html`:
- Filter tabs (ALL | MATCHES | SOCIAL | ALUMNI GAME | RWC | TRAINING)
- Filter works by reading `data-category` attribute on each photo item
- Clicking a photo opens a full-screen lightbox (build this natively — no jQuery, no external library)
- Lightbox: dark overlay, large image, caption, close button (×), prev/next arrows, keyboard navigation (Escape to close, arrow keys)

### Step 11: Configure Netlify

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/assets/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/assets/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Step 12: Build the 404 page

Simple, on-brand 404 page using the same nav/footer. Large Bebas Neue "404", subtext "This page went into touch.", CTA button back to homepage.

---

## PAGE-SPECIFIC NOTES

### `index.html` (Home)
- Featured event section ONLY renders if `featured-event.json` has `"active": true`
- If `active: false`, the section is completely hidden (not just empty — `display: none`)
- Upcoming events: render next 3 events from Google Calendar API
- Copyright year in footer: auto-generated from `site.json` `copyright_year_start` through current year (`new Date().getFullYear()`)

### `rugby-world-cup.html`
- Countdown timer auto-hides when date passes, replaced with "Event Complete" message
- Teams grid: confirmed teams show with logo/name, unconfirmed show as "TBA" placeholder cards in muted style
- This page's content should be almost entirely driven by `_content/rwc.json` so next year's president just updates the JSON for RWC 2027

### `events.html`
- Do NOT embed Google Calendar widget
- Fetch events from Google Calendar API, render as custom cards
- Category filter tabs update the visible cards via JavaScript (no page reload)
- Include a "Subscribe to CBS RFC Calendar" button — links to the Google Calendar subscribe URL

### `sponsors.html`
- Tier cards rendered from `sponsors.json`
- Sponsor logos rendered from `sponsors.json`
- If a tier has no current sponsors, that logo section shows a placeholder "Your logo here" card
- Gold tier card: navy background, gold accents, "FEATURED" badge

### `media.html`
- Photos load from `assets/images/gallery/` subfolders
- Each image needs a `data-category` attribute matching its folder name
- Build a simple image manifest system: a `_content/gallery.json` file listing all photo paths and categories (this way adding photos = updating the JSON, not editing HTML)

Add `_content/gallery.json` to the content system:
```json
{
  "photos": [
    { "src": "assets/images/gallery/matches/match-01.jpg", "category": "matches", "caption": "CBS vs Wharton, Gotham Cup 2024" },
    { "src": "assets/images/gallery/social/hogfest-2024.jpg", "category": "social", "caption": "Hogfest 2024" }
  ]
}
```

---

## THINGS TO NEVER DO

- Never put content text directly in HTML — all editable text goes in `_content/*.json`
- Never use external image URLs — all images must be local `assets/images/` paths
- Never use CDN Tailwind in production — compiled CSS only
- Never use jQuery or other heavy libraries
- Never use inline styles — Tailwind classes or `main.css` only
- Never hardcode the current year in copyright — use JavaScript
- Never edit `assets/css/main.css` directly — it is compiled output
- Never put Google API keys in client-side JS without restricting them in Google Cloud Console (restrict to your domain only)

---

## WHAT TO HAND BACK

When the build is complete, provide:

1. The complete folder structure with all files
2. Confirmation that `npm run build` completes without errors
3. A local preview showing all 8 pages render correctly
4. A checklist of things Joe needs to do before going live (see below)

---

## PRE-LAUNCH CHECKLIST FOR JOE

Claude Code: generate this as a separate `LAUNCH_CHECKLIST.md` file in the project root.

```markdown
# CBS RFC Website — Pre-Launch Checklist

## Content (you do these)
- [ ] Replace all placeholder photos in `assets/images/` with real photos
- [ ] Add real leadership headshots to `assets/images/team/`
- [ ] Update `_content/leadership.json` with correct photo filenames
- [ ] Add hero photos for each page to `assets/images/heroes/`
- [ ] Add sponsor logos to `assets/images/sponsors/`
- [ ] Update `_content/sponsors.json` with real sponsor names and logo paths
- [ ] Update `_content/recruits.json` with real practice schedule
- [ ] Update `_content/alumni.json` with real alumni profiles (or leave placeholders)
- [ ] Update `_content/rwc.json` with confirmed teams
- [ ] Add gallery photos to `assets/images/gallery/` subfolders
- [ ] Update `_content/gallery.json` with photo paths and captions
- [ ] Update `_content/site.json` with real email address and social media URLs
- [ ] Create `assets/images/og-image.jpg` (1200x630px, for social media sharing)

## Google Calendar API (you do these)
- [ ] Go to console.cloud.google.com
- [ ] Create a project called "CBS RFC Website"
- [ ] Enable Google Calendar API
- [ ] Create an API key — restrict it to your domain (cbs-rugby.com)
- [ ] Make your CBS RFC Google Calendar public (Calendar Settings → Access Permissions)
- [ ] Copy your Calendar ID (Calendar Settings → Integrate Calendar)
- [ ] Add Calendar ID and API Key to `_content/site.json`

## GitHub (you do these)
- [ ] Create new GitHub repo: `cbs-rfc-website` (public or private)
- [ ] Push the project: `git add . && git commit -m "Initial build" && git push`

## Netlify (you do these)
- [ ] Go to netlify.com, sign up with GitHub
- [ ] "Add new site" → "Import from GitHub" → select `cbs-rfc-website`
- [ ] Build command: `npm run build` | Publish directory: `.`
- [ ] Deploy — Netlify gives you a temporary URL (e.g. `cbs-rfc.netlify.app`)
- [ ] Test every page on the temporary URL
- [ ] Go to Domain Settings → Add custom domain: `cbs-rugby.com`
- [ ] Update DNS at your domain registrar (Netlify will give you instructions)
- [ ] Enable HTTPS (Netlify does this automatically via Let's Encrypt)
- [ ] Set up Form notifications: Netlify → Forms → each form → email notifications

## Final checks
- [ ] Test on mobile (iPhone Safari and Android Chrome)
- [ ] Test all forms submit correctly (check Netlify Forms dashboard)
- [ ] Confirm events load from Google Calendar
- [ ] Confirm countdown timer is ticking
- [ ] Confirm featured event shows/hides correctly
- [ ] Share with the team for feedback
- [ ] Go live 🏉
```

---

*End of Claude Code Build Prompt*
*Project: CBS RFC Website*
*Design source: Google Stitch exports in `/stitch-exports/`*
*Version: 1.0 | March 2026*
```
