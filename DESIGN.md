# DESIGN.md — CBS Rugby Football Club Website Redesign
> Agent-friendly design specification for Google Stitch.
> This file defines the complete brand system, page architecture, and component specs for the CBS RFC website redesign.
> Use this as the authoritative source of truth for all design decisions.

---

## 1. PROJECT IDENTITY

**Client:** Columbia Business School Rugby Football Club (CBS RFC)
**URL:** cbs-rugby.com
**Tagline:** The Oldest Club at CBS
**Founded:** 1968
**Type:** Student athletic club + 501(c)(3) nonprofit
**Location:** New York City (Columbia University, Morningside Heights)

**Core Brand Tension:** This is a rugby team AND an MBA club. The design must hold both truths simultaneously — athletic energy and professional credibility. Think the visual language of a serious rugby program (All Blacks, Saracens) fused with the polish of a top-tier business school. It should feel like something an investment banker would be proud to show a sponsor, and something a rugby player would feel fired up by.

**One-sentence design brief:** Confident, kinetic, and precise — a site that earns respect from the first scroll.

---

## 2. BRAND ASSETS

**Logo:** CBS RFC crest (provided as asset — use as uploaded). The crest is the primary mark. A wordmark "CBS RFC" may be used in navigation contexts where the crest is too small.

**Photography:** Real action photography (rugby matches, team photos, social events, Governor's Island) will be placed in all image slots. Design all image containers with strong aspect ratios and overlay treatments. Assume high-quality, vibrant photography throughout.

---

## 3. COLOR SYSTEM

Use CSS custom properties throughout. Never hardcode color values.

```css
:root {
  /* Primary Palette */
  --color-navy:        #003865;   /* Columbia Navy — dominant brand color */
  --color-blue:        #75B2DD;   /* Columbia Blue — secondary brand color */
  --color-blue-light:  #A8CCE8;   /* Light sky — tints, backgrounds */

  /* Neutrals */
  --color-black:       #0A0A0A;   /* Near-black — hero sections, high contrast */
  --color-white:       #FFFFFF;   /* White — primary background */
  --color-surface:     #F4F6F9;   /* Off-white — card backgrounds, alternating sections */
  --color-border:      #D9E2EC;   /* Subtle border */

  /* Text */
  --color-text-primary:   #0D1B2A; /* Deep navy-black — body text */
  --color-text-secondary: #4A5568; /* Mid grey — captions, secondary labels */
  --color-text-inverse:   #FFFFFF; /* White — text on dark backgrounds */

  /* Accent */
  --color-gold:        #C9A84C;   /* Warm gold — CTAs, highlights, awards */
  --color-gold-light:  #F0D9A0;   /* Light gold — hover states, subtle accents */

  /* Semantic */
  --color-win:         #2D6A4F;   /* Match result — win */
  --color-loss:        #B5161A;   /* Match result — loss */
  --color-draw:        #5C5C5C;   /* Match result — draw */
}
```

**Color Usage Rules:**
- `--color-navy` dominates hero sections, the sticky nav, and footer
- `--color-white` is the default page background for all interior content sections
- `--color-surface` alternates with white for section rhythm
- `--color-gold` is used exclusively for primary CTA buttons, key stat callouts, and accent lines — never overused
- `--color-blue` is used for links, tags, secondary buttons, and decorative elements
- Dark sections (navy or near-black) must have adequate contrast — all text on dark backgrounds uses `--color-text-inverse`

---

## 4. TYPOGRAPHY

**Display Font:** `Bebas Neue` — all-caps, condensed, powerful. Used for hero headlines, section numbers, and stat callouts. Conveys athletic prestige.

**Heading Font:** `Barlow Condensed` SemiBold / Bold — versatile condensed sans for subheadings, card titles, nav items, and labels. Bridges athletic and professional.

**Body Font:** `DM Sans` Regular / Medium — clean, readable, contemporary. Used for all paragraph text, form labels, descriptions.

**Monospace (accent):** `DM Mono` — used sparingly for stat numbers, dates, and data displays.

```css
:root {
  --font-display:   'Bebas Neue', 'Arial Narrow', sans-serif;
  --font-heading:   'Barlow Condensed', 'Arial Narrow', sans-serif;
  --font-body:      'DM Sans', system-ui, sans-serif;
  --font-mono:      'DM Mono', 'Courier New', monospace;
}
```

**Type Scale:**
```css
:root {
  --text-xs:    0.75rem;   /* 12px — labels, tags */
  --text-sm:    0.875rem;  /* 14px — captions, footnotes */
  --text-base:  1rem;      /* 16px — body copy */
  --text-lg:    1.125rem;  /* 18px — lead text */
  --text-xl:    1.25rem;   /* 20px — card titles */
  --text-2xl:   1.5rem;    /* 24px — section subheads */
  --text-3xl:   2rem;      /* 32px — H2 */
  --text-4xl:   2.75rem;   /* 44px — H1 */
  --text-5xl:   4rem;      /* 64px — display */
  --text-hero:  7rem;      /* 112px — hero headline, Bebas Neue only */
}
```

**Typography Rules:**
- Hero headlines: `--font-display`, `--text-hero`, all-caps, letter-spacing `-0.01em`
- Section headings (H2): `--font-display`, `--text-5xl`, all-caps
- Card headings: `--font-heading`, `--text-xl` to `--text-2xl`, SemiBold
- Body copy: `--font-body`, `--text-base`, line-height `1.7`
- Stat numbers: `--font-mono` or `--font-display`, oversized, `--color-gold` or `--color-blue`
- Navigation: `--font-heading`, `--text-sm`, uppercase, letter-spacing `0.1em`

---

## 5. SPACING & LAYOUT

```css
:root {
  --space-1:   0.25rem;  /*  4px */
  --space-2:   0.5rem;   /*  8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */

  --section-padding-y:  var(--space-24);   /* Standard vertical section padding */
  --section-padding-x:  var(--space-8);    /* Standard horizontal padding (mobile) */
  --container-max:      1280px;            /* Max content width */
  --container-narrow:   860px;             /* Narrow content (editorial sections) */

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-full: 9999px;
}
```

**Grid System:**
- Desktop: 12-column grid, `--space-8` gutter
- Tablet: 8-column grid, `--space-6` gutter
- Mobile: 4-column grid (effectively single column), `--space-4` gutter

---

## 6. MOTION & INTERACTION

**Philosophy:** Motion should feel like the site is alive, not restless. Every animation has a purpose.

**Scroll animations:** Elements fade up and in as they enter the viewport. Use `opacity: 0 → 1` + `translateY(24px → 0)`, duration `600ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)`. Stagger sibling elements by `80ms` each.

**Hover states:**
- Cards: subtle `translateY(-4px)` lift + box-shadow deepens
- Buttons: background shifts, subtle scale `1.02`
- Navigation links: color transition + a short gold underline slides in from left
- Images in cards: scale `1.04` on the inner image (overflow hidden on container)

**Page transitions:** Smooth fade between pages, `300ms`.

**Hero:** Subtle parallax on background image (moves at `0.3x` scroll speed). Headline text animates in with a staggered word reveal on load.

**Reduced motion:** All animations respect `prefers-reduced-motion: reduce`.

---

## 7. COMPONENT LIBRARY

### 7.1 Navigation (Global — Sticky)

**Desktop:**
- Full-width sticky header, `--color-navy` background, `80px` height
- Left: CBS RFC crest + wordmark in `--color-white`
- Center: Navigation links — `HOME | ABOUT | EVENTS | ALUMNI | RECRUITS | SPONSORS | MEDIA | RWC 2026`
- Right: CTA button "JOIN THE CLUB" — gold filled (`--color-gold` bg, `--color-navy` text), `--radius-full`, `--font-heading` uppercase
- On scroll past hero: nav adds a subtle `box-shadow` to indicate elevation
- Active page: link has a `--color-gold` underline

**Mobile:**
- Same header, crest + wordmark only (no links)
- Hamburger icon (right side) opens full-screen overlay
- Overlay: `--color-navy` bg, links stacked vertically, large `--font-display` type
- CTA button at bottom of overlay

**RWC 2026 nav item:** Styled with a subtle `--color-gold` dot or badge to draw attention — it's a marquee event.

---

### 7.2 Buttons

```
PRIMARY:    bg --color-gold,       text --color-navy,  hover: bg --color-gold-light
SECONDARY:  bg transparent,        text --color-navy,  border 2px --color-navy,  hover: bg --color-navy, text white
GHOST:      bg transparent,        text --color-blue,  underline on hover
INVERSE:    bg --color-white,      text --color-navy,  hover: bg --color-blue-light   (for dark section backgrounds)
DANGER:     bg --color-loss,       text white
```

All buttons: `--font-heading`, uppercase, letter-spacing `0.08em`, `--radius-full`, `padding: 14px 32px`, transition `200ms`.

---

### 7.3 Cards

**Event Card:**
- White background, `--radius-lg`, subtle border `--color-border`
- Top: full-width image (16:9), with a color-coded category tag overlaid bottom-left
- Category tag colors: Matches = `--color-navy`, Social = `--color-blue`, Practice = `--color-surface` + navy text, Special = `--color-gold`
- Body: date (mono, small, `--color-text-secondary`), title (`--font-heading`, bold), description (2 lines max), "Learn More →" link in `--color-blue`
- Hover: lift + image scale

**Leadership Card:**
- Square or portrait image, fills top 60% of card
- Bottom: name (`--font-heading`, bold), title (`--font-body`, small, `--color-text-secondary`)
- Hover: subtle navy overlay on image with a thin gold border

**Alumni Profile Card:**
- Circular headshot, centered
- Name, graduation year (CBS '20), current role + company
- Pull quote in italic, `--color-text-secondary`
- Thin gold left-border accent

**Sponsor/Partner Card:**
- White bg, centered logo (greyscale default, color on hover)
- Company name below, tier badge top-right
- Border: `1px --color-border`, hover: border shifts to `--color-gold`

---

### 7.4 Stats Bar

Horizontal band, `--color-navy` background, `80px` height.
4 stats displayed as: `[NUMBER] [LABEL]` — e.g., `EST. 1968`, `55+ YEARS`, `14 TEAMS`, `501(c)(3)`.
Font: `--font-display` for numbers, `--font-heading` for labels.
Color: numbers in `--color-gold`, labels in `--color-text-inverse`.
Subtle `|` dividers between stats.

---

### 7.5 Section Headers

Each content section starts with:
- Optional: small all-caps label in `--color-blue`, `--font-heading`, letter-spacing `0.2em` (e.g., "OUR STORY")
- H2 in `--font-display`, `--text-5xl`, `--color-navy` (or `--color-white` on dark backgrounds)
- Optional: short lead paragraph in `--font-body`, `--text-lg`, max-width `600px`
- Optional: decorative element — a short `4px` gold horizontal rule below the label

---

### 7.6 Forms

**Inputs:**
- Full-width, `--radius-md`, `border: 1.5px --color-border`
- Focus state: `border-color: --color-blue`, subtle `box-shadow` in `--color-blue` at low opacity
- Label: above input, `--font-heading`, uppercase, `--text-sm`, `--color-text-secondary`
- Placeholder: `--color-text-secondary` at 60% opacity

**Form Wrapper:**
- White card, `--radius-lg`, generous padding (`--space-12`)
- Section headline above form
- Submit button: PRIMARY style, full-width on mobile

**Backend:** All forms use **Netlify Forms**. Include `netlify` attribute on form element and hidden `form-name` input. No raw Google Form embeds.

---

### 7.7 Photo Grid (Media Page)

- Masonry grid layout, 3 columns desktop, 2 tablet, 1 mobile
- Hover: dark overlay fades in with caption text and a small expand icon
- Filter bar above grid: pill-shaped filter tabs, active state = `--color-navy` bg, white text
- Lazy loading on all images

---

### 7.8 Accordion (FAQ)

- Clean, borderless rows separated by `1px --color-border` lines
- Question: `--font-heading`, bold, `--text-lg`
- Answer: `--font-body`, `--text-base`, `--color-text-secondary`, revealed with smooth `max-height` transition
- Toggle icon: `+` rotates to `×` on open, in `--color-gold`

---

### 7.9 Sponsorship Tier Table

Three-column card layout (not a data table). Cards side by side.

**Tiers:**
- Bronze — Community Partner
- Silver — Team Partner
- Gold — Premier Partner (visually elevated: `--color-navy` background, gold accents, "FEATURED" badge)

Each card: tier name, contribution level placeholder, bullet list of benefits, CTA button.

---

## 8. PAGE SPECIFICATIONS

---

### PAGE 1: HOME (`/`)

**Purpose:** Command attention instantly. Communicate identity. Drive three actions: join, explore events, learn more.

**Section 1 — Hero**
- Full viewport height (`100vh`)
- Background: full-bleed action rugby photography with `--color-black` overlay at `55%` opacity
- Foreground layout: centered or left-aligned
- Eyebrow text: `THE OLDEST CLUB AT CBS` — `--font-heading`, uppercase, `--color-gold`, letter-spacing `0.3em`, `--text-sm`
- Headline: `COLUMBIA BUSINESS SCHOOL` + line break + `RUGBY FC` — `--font-display`, `--text-hero`, `--color-white`
- Subheadline: `Building tradition, teamwork, and community on and off the pitch since 1968.` — `--font-body`, `--text-lg`, `--color-text-inverse` at 85% opacity, max-width `540px`
- Two CTAs side by side: "JOIN THE CLUB" (PRIMARY) and "OUR STORY" (INVERSE outlined)
- Bottom of hero: scroll-down indicator (animated chevron)
- On load: staggered text reveal — eyebrow first, then headline word-by-word, then subhead, then buttons

**Section 2 — Stats Bar**
- 4 stats: `EST. 1968` | `55+ YEARS OF TRADITION` | `14 TEAMS — RWC 2026` | `501(c)(3) NONPROFIT`
- Full-width, `--color-navy` background

**Section 3 — RWC 2026 Feature**
- This section must feel like a marquee announcement, not a sidebar
- Full-width, dark background (`--color-black` or deep navy), with a subtle diagonal texture or noise overlay
- Left side: bold type treatment — `MBA RUGBY` / `WORLD CUP` / `2026` in stacked `--font-display`, very large, `--color-white` with `--color-gold` accent on "2026"
- Right side: key details — date (`April 25, 2026`), location (`Governor's Island, NYC`), format (`14 Teams. 1 Champion.`) — in clean `--font-body`
- CTA: "EVENT DETAILS →" (INVERSE button)
- Optional: countdown timer component (days/hours/minutes to April 25)

**Section 4 — Who We Are**
- Two-column: large photo (left, slight negative margin or overlapping frame effect), text (right)
- Eyebrow: "WHO WE ARE"
- Heading: "More Than a Team. It's a Tradition."
- 2–3 short paragraphs from the About copy
- CTA: "Our Full Story →" (GHOST)

**Section 5 — Three Pillars**
- Background: `--color-surface`
- 3-column grid: COMPETE | CONNECT | LEAD
- Each pillar: large icon (line style, `--color-navy`), bold title (`--font-display`, `--text-3xl`), 2-sentence description
- COMPETE: national tournaments, Gotham Cup, international friendlies
- CONNECT: Hogfest, Alumni Game, Rugby Happy Hours
- LEAD: 501(c)(3), leadership team, values

**Section 6 — Upcoming Events Preview**
- Heading: "What's Coming Up"
- 3-column card grid using Event Card component
- Cards pulled from Google Calendar API (see backend spec)
- "View All Events →" link below grid

**Section 7 — Alumni Teaser**
- Dark background (`--color-navy`), full-width
- Left: pull-quote style — large italic `"From the Pitch to the Boardroom."` in `--font-body`, `--color-text-inverse`
- Right: short copy about alumni careers (finance, consulting, tech, entrepreneurship), CTA "Explore Alumni →" (INVERSE)

**Section 8 — Recruit CTA Banner**
- `--color-gold` background, `--color-navy` text — high contrast, energetic
- Headline: "Ready to Run With Us?"
- Subtext: "New students welcome. No prior rugby experience required."
- CTA: "Get Involved →" (SECONDARY, navy outlined on gold background)

**Footer** (appears on all pages — see Section 9)

---

### PAGE 2: ABOUT (`/about`)

**Purpose:** Full club story. Credibility for recruits, alumni, and sponsors.

**Section 1 — Page Hero (Narrow)**
- Height: `50vh`
- Background: team photo with navy overlay
- Headline: "ABOUT CBS RFC" (`--font-display`, `--text-5xl`, white)
- Subline: "The oldest club at Columbia Business School." (`--font-body`, `--text-lg`, white at 80%)

**Section 2 — Our Story**
- Two-column: left is a vertical timeline, right is narrative text
- Timeline milestones: 1968 (founding), key decade markers, RWC launch, present day
- Timeline style: vertical line in `--color-blue`, circular nodes in `--color-gold`, milestone text in `--font-heading`
- Narrative copy: club history, national competition, international friendlies, values

**Section 3 — Mission Callout**
- Centered, `--color-surface` background
- Very large italic pull-quote: `"More than a team — it's a tradition."` in `--font-body`, `--text-4xl`
- Supporting copy beneath

**Section 4 — Our Values**
- 4-column grid: LEADERSHIP | TEAMWORK | INTEGRITY | RESILIENCE
- Each: large number or icon accent, bold title (`--font-display`), 2-sentence description
- Background: `--color-navy`, text white, gold accents

**Section 5 — Leadership Team**
- Heading: "The Leadership Team"
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Uses Leadership Card component
- Current roster:
  - Joe Mozden — Men's Co-President
  - Ryan Downey — Men's Co-President
  - Will Cahill — Head Men's Coach
  - Heidi Liu — Women's Co-President
  - Bri "Breezy" Sharkey — Women's Co-President
  - Giacomo Tritto — Backs Coach
  - Andrew Schwartz — Forwards Coach
  - Matt Pieringer — VP of Events
  - Eric Puleio — Alumni Captain

---

### PAGE 3: EVENTS (`/events`)

**Purpose:** Single hub for all club activity.

**Section 1 — Page Hero (Narrow)**
- Height: `40vh`, action photo background with navy overlay
- Headline: "EVENTS" | Subline: "On the pitch and off it."

**Section 2 — Upcoming Events**
- Filter bar (pill tabs): ALL | MATCHES | SOCIAL | PRACTICE | SPECIAL EVENTS
- Filtering updates card grid without page reload (JavaScript)
- 3-column Event Card grid
- Cards fed by Google Calendar API integration

**Section 3 — Annual Events**
- Sub-heading: "Our Cornerstone Events"
- Three featured event blocks in a horizontal row, larger than standard cards:
  1. **Alumni Game** — annual tradition, CBS current players vs. alumni
  2. **Gotham Cup** — NYC MBA showdown: CBS vs. Wharton, NYU, Queens B
  3. **MBA Rugby World Cup** — links to `/rugby-world-cup` page
- Each block: full photo, title, one-sentence description, "Learn More →"

**Section 4 — Hogfest**
- Standalone callout for Hogfest (the Wharton social tradition)
- Fun, energetic tone — this is a beloved social event
- Photo + brief description + external Partiful/event link CTA

**Section 5 — Add to Calendar**
- Clean info section: "Stay in the Loop"
- Link/button to subscribe to CBS RFC Google Calendar
- Note: Do NOT embed the raw Google Calendar widget. Use the API for event cards above.

---

### PAGE 4: MBA RUGBY WORLD CUP 2026 (`/rugby-world-cup`)

**Purpose:** Marquee standalone event page. Cinematic. Could almost be its own microsite.

**Design Note:** This page should feel visually distinct from the rest of the site — darker, more dramatic, higher production value. Think event landing page energy.

**Section 1 — Full-Viewport Hero**
- `100vh`, near-black background, dramatic photography or dark atmospheric texture
- Possible treatment: horizontal scan-line texture overlay at low opacity
- Eyebrow: `CBS RFC PRESENTS` — `--color-gold`, uppercase, small, letter-spacing heavy
- Headline (stacked, massive):
  ```
  MBA RUGBY
  WORLD CUP
  2026
  ```
  `--font-display`, as large as possible, `--color-white`
- "2026" or "WORLD CUP" optionally in `--color-gold` for contrast break
- Key details below: `April 25, 2026  ·  Governor's Island, New York City  ·  14 Teams. 1 Champion.`
- CTA: "Event Information" (PRIMARY — gold button)
- Countdown timer: Days / Hours / Minutes / Seconds until April 25

**Section 2 — The Event**
- Two-column: photo left, details right
- What it is: international MBA rugby tournament, CBS as host
- Location highlight: Governor's Island, NYC — describe the venue, perhaps a small map embed or illustration

**Section 3 — Participating Teams**
- Heading: "The Field"
- Grid of 14 team slots (logo + school name)
- Unconfirmed slots show as placeholder cards: navy bg, "TBA" text
- Visual: the grid should look like a tournament bracket or a team wall

**Section 4 — Tournament Format**
- Visual bracket or timeline
- Group stages → knockout rounds → final
- Clean, legible, visual-first

**Section 5 — Schedule**
- Day-of schedule cards: time blocks, matches, events
- Clean, minimal, tabular or card layout

**Section 6 — FAQ**
- Accordion component
- Questions about: attending, competing, registration, location, logistics

**Section 7 — Contact / Register CTA**
- Dark section, gold accents
- "Interested in Competing or Attending?"
- Email + registration form or external link

---

### PAGE 5: ALUMNI (`/alumni`)

**Purpose:** Reconnect alumni, collect database entries, tell legacy stories.

**Section 1 — Page Hero (Narrow)**
- Dark background, rugby action or social event photo
- Headline: "FROM THE PITCH TO THE BOARDROOM"
- Subline: "CBS RFC alumni carry the values of rugby into every chapter of their careers."

**Section 2 — The Alumni Story**
- Editorial two-column section
- Left: large atmospheric photo (alumni game, team gathering)
- Right: copy about alumni careers — finance, consulting, technology, entrepreneurship, non-profit, global corporations, startups

**Section 3 — Featured Alumni Profiles**
- 3 Alumni Profile Cards (component defined above)
- Placeholder content for now — slots for photo, name, CBS graduation year, current role, quote
- Background: `--color-surface`

**Section 4 — The Alumni Game**
- Full-width feature section
- Photo, description of the annual Alumni Game tradition
- Date TBD placeholder
- CTA: "Join Us This Year →"

**Section 5 — Alumni by Era (Optional)**
- Tabbed or accordion interface
- Tabs: 1960s–70s | 1980s–90s | 2000s | 2010s | 2020s
- Each era: number of known players, notable achievements (placeholder)
- This section celebrates legacy depth

**Section 6 — Stay Connected Form**
- Heading: "Keep the Legacy Going"
- Subhead: "Help us build the CBS RFC alumni database."
- Form fields: Full Name, CBS Graduation Year (dropdown), Current Role, Company, LinkedIn URL, Email, "Tell us about yourself" (textarea)
- Netlify Form — submissions notify club email
- Form wrapper uses standard Form component

---

### PAGE 6: RECRUITS (`/recruits`)

**Purpose:** Convert incoming and current CBS students into club members. High-energy, low-barrier.

**Section 1 — Page Hero**
- Full-width, `65vh`
- Action photo background, energetic
- Headline: "RUN WITH US." (`--font-display`, large)
- Subline: "No rugby experience needed. Just show up."
- CTA: "Get Started →" scrolls to form

**Section 2 — Why Join?**
- 4-column grid of value tiles
- Tile 1: "Make Lifelong Friends" — rugby builds bonds that outlast MBA
- Tile 2: "Compete at Every Level" — Gotham Cup, national tournaments, international friendlies
- Tile 3: "Join a 55-Year Tradition" — oldest club at CBS, Est. 1968
- Tile 4: "All Are Welcome" — beginners to experienced players, men's and women's teams
- Tile style: white bg, icon top, bold title, 2-sentence copy, no CTA needed

**Section 3 — What to Expect**
- Visual step-by-step (horizontal stepper on desktop, vertical on mobile):
  1. Fill out the form below
  2. Come to a practice (we'll send you details)
  3. Meet the team — you're in
- Clean, friendly, `--color-surface` background

**Section 4 — Practice Info**
- Info block: When and where
- Day(s), time, location (field address)
- "Add to Calendar" CTA

**Section 5 — Player Quotes**
- 2 pull-quote cards from current players
- Photo, name, year, quote
- Placeholder slots for real content

**Section 6 — Signup Form**
- Heading: "Get Started"
- Fields: Full Name, Email, Phone (optional), "Any rugby experience?" (dropdown: None / A little / Experienced), "Which team?" (dropdown: Men's / Women's / Either / Not sure yet), Message (optional textarea)
- Submit: "Join the Team →" (PRIMARY button)
- Netlify Form

---

### PAGE 7: SPONSORS (`/sponsors`)

**Purpose:** Attract and acknowledge sponsors. This page must read as professional, investment-grade.

**Design Note:** This page leans more toward the professional side of the brand spectrum. Think clean, corporate-adjacent — a sponsor should feel comfortable seeing their logo here.

**Section 1 — Page Hero (Narrow)**
- Navy background, no photo needed (cleaner, more professional)
- Headline: "PARTNER WITH CBS RFC"
- Subline: "Connect your brand with Columbia Business School's most storied athletic club."

**Section 2 — Why Sponsor Us?**
- 4-column grid, `--color-surface` background
- Tile 1: "Access an Elite MBA Network" — direct connection to Columbia MBAs, future business leaders
- Tile 2: "Brand Visibility at the RWC" — 14 teams, Governor's Island, NYC
- Tile 3: "Support Student Leadership" — 501(c)(3) nonprofit, tax-deductible
- Tile 4: "55 Years of Tradition" — align with the oldest CBS club, genuine institutional credibility

**Section 3 — Sponsorship Tiers**
- Three-column card layout using Sponsorship Tier component
- Bronze — Community Partner (entry level)
- Silver — Team Partner (mid tier, most popular indicator)
- Gold — Premier Partner (elevated card design, navy bg, gold accents, featured badge)
- Each tier: name, contribution level (TBD placeholder), benefit bullets, CTA "Become a Partner"

**Section 4 — Current Partners**
- Heading: "Our Partners"
- Logo grid, 3–4 logos per row, greyscale default, color on hover
- 2 confirmed sponsor slots (logos TBD) + room to grow
- Clean, minimal — logos speak for themselves

**Section 5 — Become a Partner CTA**
- Dark section (`--color-navy`)
- Heading: "Let's Build Something Together"
- Copy: brief pitch for prospective sponsors
- Contact form or email CTA: Netlify Form with fields — Company Name, Contact Name, Email, "Tell us about your interest" textarea
- Or: direct email link as primary CTA

---

### PAGE 8: MEDIA (`/media`)

**Purpose:** Show the culture. Photos from matches, social events, and traditions.

**Section 1 — Page Hero (Narrow)**
- Action photo background
- Headline: "ON THE PITCH & OFF IT"
- Subline: "Photos, moments, and memories from CBS RFC."

**Section 2 — Featured Album**
- Full-width spotlight for the most recent major event (e.g., most recent match or social event)
- Large hero image, event name, brief caption, "View Full Album →" CTA

**Section 3 — Photo Grid**
- Filter bar (pill tabs): ALL | MATCHES | SOCIAL | ALUMNI GAME | RWC | TRAINING
- Masonry grid (3 columns desktop, 2 tablet, 1 mobile)
- Hover: dark overlay with caption text + expand icon
- Lazy loading

**Section 4 — Video (Optional)**
- If video content exists: YouTube/Vimeo embed, styled with thumbnail cover
- Section heading: "In Action"
- Placeholder if no current video

**Section 5 — Follow Us**
- Instagram-row social proof: 6 placeholder image tiles in a row
- CTA: "Follow @CBSRugbyFC →" (links to Instagram)
- Subtext: "Stay up to date with matches, events, and highlights"

---

## 9. GLOBAL FOOTER

**Background:** `--color-navy`
**Layout:** 4-column grid (desktop), stacked (mobile)

**Column 1:** CBS RFC crest + wordmark, "Est. 1968" below, short tagline: "The oldest club at Columbia Business School."

**Column 2 — Quick Links:**
Home | About | Events | Alumni | Recruits | Sponsors | Media | RWC 2026

**Column 3 — Contact:**
Email: [club email]
Instagram: @CBSRugbyFC
Facebook: CBS Rugby FC
LinkedIn: CBS RFC

**Column 4 — Info:**
Columbia Business School
New York City
501(c)(3) Nonprofit Organization
[Tax ID placeholder]

**Bottom bar:** `--color-black`, full-width, `--text-xs`
"© 2025 Columbia Business School Rugby Football Club. All rights reserved."

---

## 10. RESPONSIVE BREAKPOINTS

```
Mobile:   < 640px   — single column, hamburger nav, stacked sections
Tablet:   640–1024px — 2-column grids, condensed nav
Desktop:  1024–1280px — full layouts
Wide:     > 1280px  — max-width container centered, generous side margins
```

**Mobile-specific rules:**
- Hero headline: reduce to `--text-5xl` (from `--text-hero`)
- Stats bar: 2×2 grid instead of horizontal row
- All multi-column grids collapse to single column
- Navigation: hamburger only, full-screen overlay
- CTAs: full-width buttons
- Cards: full-width, stack vertically
- Touch targets: minimum `44px` height

---

## 11. BACKEND & INTEGRATION NOTES

> These are NOT design concerns for Stitch, but are documented here for Claude Code handoff.

**Google Calendar API:**
- All event displays (homepage preview strip, events page card grid) pull from Google Calendar API
- No raw Google Calendar widget embeds anywhere on the site
- Events are displayed using the custom Event Card component defined above
- API key management via environment variables

**Netlify Forms:**
- All forms (Recruits signup, Alumni reconnect, Sponsors inquiry) use Netlify Forms
- Form elements include `netlify` attribute and `data-netlify="true"`
- Hidden `input[name="form-name"]` in each form
- Submissions routed to club email via Netlify notifications

**Hosting:**
- GitHub repository → Netlify continuous deployment
- Custom domain: cbs-rugby.com

**RWC 2026:**
- The separately-hosted Netlify app for RWC event info should be absorbed into the main site
- All RWC content lives at `/rugby-world-cup` within the main site
- No external redirect to a separate URL

---

## 12. DESIGN PRIORITIES FOR STITCH

When generating designs, prioritize these pages first in order:

1. **Home** — most important, establishes the entire visual system
2. **Rugby World Cup 2026** — marquee event, cinematic treatment
3. **About** — leadership team, timeline, values
4. **Sponsors** — professional tone, tier table
5. **Events** — card grid, filter bar
6. **Recruits** — energetic, conversion-focused
7. **Alumni** — legacy storytelling, form
8. **Media** — photo grid, gallery

---

## 13. REFERENCE AESTHETIC BENCHMARKS

When making visual decisions, reference the feeling of:
- **All Blacks (allblacks.com):** Athletic prestige, dark backgrounds, bold typography, confident
- **Saracens RFC:** Club professionalism, team culture pride
- **Columbia University athletics:** Institutional credibility, navy and blue palette
- **Stripe.com:** Clean professional layout, typographic confidence
- **Nike editorial:** Kinetic energy, oversized type, strong imagery

Avoid: generic sports template aesthetics, purple gradients, stock-photo feel, cluttered layouts, weak typography.

---

*End of DESIGN.md — CBS Rugby Football Club Website Redesign*
*Prepared for: Google Stitch (design generation) + Claude Code (development)*
*Version: 1.0 | March 2026*
