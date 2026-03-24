/**
 * inject-env.js
 * Reads GOOGLE_API_KEY and GOOGLE_CALENDAR_ID from environment variables
 * and writes them into _content/site.json before the CSS build runs.
 */

const fs = require('fs');
const path = require('path');

// Load .env file locally (Netlify sets these directly as env vars)
try {
  require('./load-env');
} catch (e) {
  // In Netlify, env vars are already set — no .env file needed
}

const siteJsonPath = path.join(__dirname, '../_content/site.json');
const site = JSON.parse(fs.readFileSync(siteJsonPath, 'utf8'));

const apiKey = process.env.GOOGLE_API_KEY;
const calId  = process.env.GOOGLE_CALENDAR_ID;

if (apiKey)  site.google_api_key       = apiKey;
if (calId)   site.google_calendar_id   = calId;

fs.writeFileSync(siteJsonPath, JSON.stringify(site, null, 2));
console.log('✓ site.json updated with environment variables');
