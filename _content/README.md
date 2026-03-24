# CBS RFC Website — Content Editor Guide

**Welcome, future CBS RFC president.** This folder contains every piece of content on the website. You update a file here, the website updates automatically. You never need to touch any HTML.

---

## The Golden Rule

> **Edit files in this `_content/` folder only. Never open or edit `.html` files.**

If something looks broken or you're not sure, ask someone technical before editing HTML. The HTML files are the structure — the JSON files here are the words and images.

---

## What Each File Controls

### `site.json` — Global Info (affects every page)
Controls the club name, email address, and social media links that appear in the footer and across the site.

**Fields:**
- `email` — The club contact email. Update this when the contact email changes.
- `instagram` — Full URL to the Instagram page (e.g. `https://instagram.com/cbsrugbyfc`)
- `facebook` — Full URL to the Facebook page
- `google_calendar_id` — Your Google Calendar ID (see setup guide below)
- `google_api_key` — Your Google Calendar API key

---

### `featured-event.json` — RWC / Featured Event Banner (Home page)

Controls the big dark section on the homepage that promotes the RWC or any major event.

**To turn the banner ON:** Set `"active": true`
**To turn the banner OFF:** Set `"active": false` — the section disappears from the homepage completely.

**For RWC 2027:** Update `title`, `subtitle`, `description`, `countdown_target` (use format `"2027-04-XX T09:00:00"`), and `cta_url`. Then set `active` to `true`.

---

### `leadership.json` — Leadership Team (About page)

Controls the leadership cards on the About page. Each person is one entry in the list.

**To add a new leader:**
1. Add a photo to `assets/images/team/` — name it `firstname-lastname.jpg`
2. Add a new entry to the `leadership` list:
```json
{
  "name": "First Last",
  "title": "Their Title",
  "photo": "assets/images/team/firstname-lastname.jpg",
  "linkedin": "https://linkedin.com/in/theirprofile"
}
```

**To remove a leader:** Delete their entry from the list. Also delete their photo from `assets/images/team/` if you want to clean up.

**To update a title:** Just change the `"title"` field.

---

### `sponsors.json` — Sponsors (Sponsors page)

Controls which sponsors appear on the Sponsors page, and what tier they are.

**To add a new sponsor:**
1. Add their logo image to `assets/images/sponsors/` — name it `company-name.png`
2. Add an entry to the `sponsors` list:
```json
{
  "name": "Company Name",
  "logo": "assets/images/sponsors/company-name.png",
  "url": "https://www.theirwebsite.com",
  "tier": "gold"
}
```
Tier options: `"gold"`, `"silver"`, `"bronze"`

**To remove a sponsor:** Delete their entry from the `sponsors` list.

**The `tiers` section** (gold, silver, bronze benefits) only needs to be updated if the benefits packages change.

---

### `alumni.json` — Featured Alumni (Alumni page)

Controls the featured alumni profile cards on the Alumni page.

**To add a featured alumnus:**
1. Optionally add their photo to `assets/images/team/`
2. Add an entry:
```json
{
  "name": "First Last",
  "graduation_year": "CBS '22",
  "current_role": "Title, Company",
  "photo": "assets/images/team/their-photo.jpg",
  "quote": "Their quote about CBS RFC."
}
```
If you don't have a photo, use `"assets/images/team/placeholder.jpg"`.

---

### `recruits.json` — Recruits Page

**`practice_schedule`** — Controls the practice info section. Update days, time, and location here when the schedule changes.

**`player_quotes`** — Controls the testimonial cards. To update a quote, change the `quote`, `name`, and `year` fields.

---

### `rwc.json` — MBA Rugby World Cup Page

Controls the entire RWC 2026 page:
- `date`, `location`, `tagline` — The main event details
- `teams` — List of participating teams. Set `"confirmed": true` for confirmed teams, `"confirmed": false` for TBA slots.
- `faq` — The FAQ accordion at the bottom of the page.

**For RWC 2027:** Update the year, date, location, and team list here. The whole page updates.

---

### `gallery.json` — Media Gallery (Media page)

Controls which photos appear in the media gallery.

**To add new photos:**
1. Drop the photo files into the right subfolder inside `assets/images/gallery/`:
   - `matches/` — game action shots
   - `social/` — social events
   - `alumni-game/` — alumni game
   - `rwc/` — world cup
   - `training/` — practice sessions
2. Add an entry to `gallery.json`:
```json
{ "src": "assets/images/gallery/matches/your-photo.jpg", "category": "matches", "caption": "Description of photo" }
```

That's it — the photo will appear in the gallery with the right filter tab.

---

## If Something Breaks

1. **Check your JSON syntax** — JSON is strict. Every string needs double quotes, every entry needs a comma after it (except the last one), and all brackets must be closed. Use a free tool like [jsonlint.com](https://jsonlint.com) to check your JSON.

2. **GitHub repository:** All the code is on GitHub. If a change causes a problem, you can revert it there.

3. **Netlify:** The site is hosted on Netlify. Netlify will auto-deploy whenever you push to GitHub. You can see deploy status at [netlify.com](https://netlify.com).

4. **When in doubt, ask a technical friend** before editing any `.html`, `.js`, or `.css` files.

---

*This guide was written for the CBS RFC president of 2026 and beyond. The club has been running since 1968 — the website should be easy enough to last just as long.*
