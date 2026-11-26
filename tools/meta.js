/* Head tags for sharing and search: favicon, canonical URL and the social card.
 * Shared by build-guides.js and build-pages.js; the issue pages carry the same block by hand. */
'use strict';
const SITE = 'https://qusaialjbali.github.io/tearsheet';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

module.exports = function meta({ path, title, description, up = '../' }) {
  const url = SITE + '/' + path;
  return [
    '<link rel="icon" href="' + up + 'favicon.svg" type="image/svg+xml">',
    '<link rel="author" href="' + up + 'humans.txt" type="text/plain">',
    '<link rel="canonical" href="' + url + '">',
    '<meta name="theme-color" content="#f6f6f2">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Tearsheet">',
    '<meta property="og:title" content="' + esc(title) + '">',
    '<meta property="og:description" content="' + esc(description) + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:image" content="' + SITE + '/og.png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Tearsheet: interface parts you can tear out and keep, in HTML, React, Vue and Svelte.">',
    '<meta name="twitter:card" content="summary_large_image">',
  ].map((l) => '  ' + l).join('\n');
};
module.exports.SITE = SITE;
module.exports.esc = esc;
