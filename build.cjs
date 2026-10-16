// One configuration file updates the page, metadata and captioned social image.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
process.chdir(__dirname);
const c = JSON.parse(fs.readFileSync('birthday.json', 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const version = crypto.createHash('sha256').update(JSON.stringify(c)).update(fs.readFileSync(c.image)).digest('hex').slice(0, 12);
const preview = `assets/social-${version}.jpg`;
const socialURL = new URL(preview, c.socialImageBaseUrl || c.url).href;
const previewTitle = c.previewTitle || c.caption;
const alt = `${c.imageAlt}, with the caption: ${c.caption}`;
const html = `<!doctype html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(previewTitle)}</title>
  <meta name="description" content="${esc(c.description)}">
  <link rel="canonical" href="${esc(c.url)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="happy squirtday">
  <meta property="og:title" content="${esc(previewTitle)}">
  <meta property="og:description" content="${esc(c.description)}">
  <meta property="og:url" content="${esc(c.url)}">
  <meta property="og:image" content="${esc(socialURL)}">
  <meta property="og:image:secure_url" content="${esc(socialURL)}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(alt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(previewTitle)}">
  <meta name="twitter:description" content="${esc(c.description)}">
  <meta name="twitter:image" content="${esc(socialURL)}">
  <meta name="twitter:image:alt" content="${esc(alt)}">
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; background: #000; }
    body { min-height: 100vh; min-height: 100svh; display: grid; place-items: center; }
    main { position: relative; width: min(100vw, 177.7778vh, 1280px); width: min(100vw, 177.7778svh, 1280px); container-type: inline-size; }
    img { width: 100%; height: auto; display: block; }
    h1 { position: absolute; inset: auto 3% 6%; margin: 0; color: #fff; text-align: center; font-family: "Times New Roman", Times, serif; font-size: 7.2vw; font-size: 7.2cqw; line-height: 1.02; font-weight: 700; text-shadow: 1px 2px 2px #000; overflow-wrap: anywhere; }
  </style>
</head>
<body>
  <main>
    <img src="${esc(c.image)}" alt="${esc(c.imageAlt)}" width="${c.imageWidth || 1280}" height="${c.imageHeight || 720}" fetchpriority="high">
    <h1>${esc(c.caption)}</h1>
  </main>
</body>
</html>
`;
fs.writeFileSync('index.html', html);
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.resolve('index.html')).href);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('img').evaluate(img => img.decode());
    await page.screenshot({ path: preview, type: 'jpeg', quality: 92 });
    console.log(`Built index.html and ${preview}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
