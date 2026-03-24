/**
 * Minimal .env loader — only used locally (Netlify sets env vars natively)
 */
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../.env');
if (!fs.existsSync(envPath)) return;
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
});
