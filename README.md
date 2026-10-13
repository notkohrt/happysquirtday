# happy squirtday

Ready-to-host static website. Open index.html to view it. No runtime dependencies, scripts, buttons, confetti or tracking.

## Publish

Upload index.html, assets/, robots.txt, CNAME and .nojekyll to the root of the website. For GitHub Pages, put these files at the repository root and select that branch/root in Settings → Pages. CNAME specifies happysquirtday.co.uk; configure the domain's DNS for your hosting provider and enable HTTPS.

## Next birthday

Edit birthday.json (caption, description, image and imageAlt). Keep the domain URL unless moving the site. Install Node.js, then run:

```
npm install
npx playwright install chromium
npm run build
```

The build updates the static HTML and creates a captioned JPEG for social previews with a new filename when the configuration or source image changes. Upload both. No JavaScript needs to run for visitors or social crawlers. The build machine uses Times New Roman if installed, with Times/serif as fallbacks. This version was rendered on Windows with Times New Roman.

## Link previews

Open Graph and Twitter large-image metadata is embedded directly in the HTML. Both image tags use an absolute HTTPS URL at happysquirtday.co.uk. The JPEG is 1200 × 630 and includes the caption. The original uploaded photograph is preserved separately.

After deployment, both the homepage and the absolute og:image URL must return HTTP 200 publicly, without login or crawler blocking, with text/html and image/jpeg content types respectively. Ask the social platform to scrape again if it cached an older preview; a new image filename helps, but existing messages may retain cached previews. Platforms control the final card crop and appearance.

This downloadable package has not been deployed. Live social previews cannot be confirmed until the domain serves these files.
