# CBS RFC Website — Pre-Launch Checklist

## Content (you do these)
- [ ] Replace all placeholder photos in `assets/images/` with real photos
- [ ] Add real leadership headshots to `assets/images/team/`
  - [ ] `joe-mozden.jpg`
  - [ ] `ryan-downey.jpg`
  - [ ] `will-cahill.jpg`
  - [ ] `heidi-liu.jpg`
  - [ ] `bri-sharkey.jpg`
  - [ ] `giacomo-tritto.jpg`
  - [ ] `andrew-schwartz.jpg`
  - [ ] `matt-pieringer.jpg`
  - [ ] `eric-puleio.jpg`
  - [ ] `placeholder.jpg` (generic headshot for unset profiles)
- [ ] Update `_content/leadership.json` with correct photo filenames if different
- [ ] Add hero photos for each page to `assets/images/heroes/`
  - [ ] `home-hero.jpg` (full-bleed rugby action shot)
  - [ ] `about-hero.jpg`
  - [ ] `events-hero.jpg`
  - [ ] `rwc-hero.jpg`
  - [ ] `alumni-hero.jpg`
  - [ ] `recruits-hero.jpg`
  - [ ] `media-hero.jpg`
- [ ] Add sponsor logos to `assets/images/sponsors/`
- [ ] Update `_content/sponsors.json` with real sponsor names and logo paths
- [ ] Update `_content/recruits.json` with real practice schedule (days, times, location)
- [ ] Update `_content/alumni.json` with real alumni profiles (or keep placeholders until ready)
- [ ] Update `_content/rwc.json` with all confirmed teams and their logos
- [ ] Add gallery photos to `assets/images/gallery/` subfolders (`matches/`, `social/`, `alumni-game/`, `rwc/`, `training/`)
- [ ] Update `_content/gallery.json` with photo paths and captions
- [ ] Update `_content/site.json` with real email address and social media URLs
- [ ] Add CBS RFC crest logo to `assets/images/logo/cbs-rfc-crest.png`
- [ ] Create `assets/images/og-image.jpg` (1200×630px — used when sharing the site on social media)

## Google Calendar API (you do these)
- [ ] Go to [console.cloud.google.com](https://console.cloud.google.com)
- [ ] Create a project called "CBS RFC Website"
- [ ] Enable "Google Calendar API" in the API library
- [ ] Create an API key
  - Go to Credentials → Create Credentials → API Key
  - **IMPORTANT:** Restrict the key to your domain only (e.g. `cbs-rugby.com`)
- [ ] Make your CBS RFC Google Calendar public
  - Open Google Calendar → select your club calendar → Settings → Access Permissions → Check "Make available to public"
- [ ] Copy your **Calendar ID** (Calendar Settings → Integrate Calendar → Calendar ID — looks like `xxxxxx@group.calendar.google.com`)
- [ ] Add both values to `_content/site.json`:
  ```json
  "google_calendar_id": "paste-your-calendar-id-here",
  "google_api_key": "paste-your-api-key-here"
  ```

## GitHub (you do these)
- [ ] Create new GitHub repo: `cbs-rfc-website` (you can make it private)
- [ ] Push the project:
  ```bash
  git add .
  git commit -m "Initial build — CBS RFC website"
  git push
  ```

## Netlify (you do these)
- [ ] Go to [netlify.com](https://netlify.com), sign in with GitHub
- [ ] "Add new site" → "Import from GitHub" → select `cbs-rfc-website`
- [ ] Build settings:
  - **Build command:** `npm run build`
  - **Publish directory:** `.`
- [ ] Click Deploy — Netlify gives you a temporary URL (e.g. `cbs-rfc.netlify.app`)
- [ ] Test every page on the temporary URL before pointing the real domain
- [ ] Go to **Domain Settings** → Add custom domain: `cbs-rugby.com` (or whatever your domain is)
- [ ] Update DNS at your domain registrar with the records Netlify provides
- [ ] Enable HTTPS — Netlify does this automatically via Let's Encrypt (takes ~1 min)
- [ ] Set up **Form notifications**: Netlify → Forms → each form → Notifications → Email
  - Add recruits-signup notifications
  - Add alumni-reconnect notifications
  - Add sponsor-inquiry notifications

## Final Checks Before Going Live
- [ ] Test on mobile — both iPhone Safari and Android Chrome
- [ ] Test all three forms submit and show inline success message
- [ ] Confirm form submissions appear in Netlify → Forms dashboard
- [ ] Confirm events load from Google Calendar on Home and Events pages
- [ ] Confirm countdown timer is ticking on the RWC page
- [ ] Confirm featured event banner shows/hides correctly (set `active: false` to test)
- [ ] Confirm gallery filter tabs work on Media page
- [ ] Confirm gallery lightbox opens, closes, and navigates with keyboard
- [ ] Confirm leadership cards load on About page
- [ ] Check all nav links go to the correct pages
- [ ] Confirm active page highlight works in nav
- [ ] Test mobile hamburger menu opens and closes
- [ ] Check page loads fast (Netlify CDN should handle this)
- [ ] Share preview URL with the team for feedback
- [ ] **Go live 🏉**

---

*Questions? Email the web team or file an issue on the GitHub repository.*
