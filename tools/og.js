/* Renders tools/og.html to og.png (1200×630) with a local Chrome or Edge in headless mode.
 * Run: node tools/og.js   Set BROWSER to a browser executable if it is not found. */
'use strict';
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const candidates = [
  process.env.BROWSER,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const browser = candidates.find((p) => fs.existsSync(p));
if (!browser) throw new Error('No Chrome or Edge found. Set BROWSER=/path/to/browser.');

const out = path.join(__dirname, '..', 'og.png');
execFileSync(browser, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1200,630', '--screenshot=' + out, pathToFileURL(path.join(__dirname, 'og.html')).href,
], { stdio: 'inherit' });
console.log('wrote og.png');
