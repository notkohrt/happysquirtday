# happy squirtday

Minimal static birthday page: original Ricardo Milos dancing GIF, with the visible caption `happy squirtday brandon <3` in white Times New Roman.

The HTML title, og:title and twitter:title are independently set to `pegging is not gay`. This preview title is not rendered in the page body or preview image.

## Editing

Edit birthday.json. `caption` controls visible text; `previewTitle` controls sharing and browser titles. `image` points to the original animated asset. Install dependencies with npm install, then run npm run build (Playwright Chromium must be installed, or set BROWSER_CHANNEL=msedge).

The build writes static index.html and a 1200 x 630 JPEG preview with a content-versioned filename. The GIF is preserved unchanged; social cards use a static JPEG for compatibility.

GIF source: https://giphy.com/gifs/ricardo-milos-f3e3vLxB7TOuIxDVrX

## Hosting and previews

GitHub Pages publishes the main branch root of notkohrt/happysquirtday. CNAME retains happysquirtday.co.uk. Upload/commit the generated HTML, new assets and configuration together.

Open Graph and Twitter metadata are in the initial HTML, with matching titles, descriptions, absolute image URLs, image dimensions, MIME type and alt text. robots.txt permits crawling. No JavaScript or login is needed.

The preview image uses the public raw.githubusercontent.com HTTPS asset URL because the custom domain's HTTPS certificate failed validation during the October 15, 2026 check. Canonical and og:url retain the intended HTTPS custom domain. Repair/enable the domain's HTTPS certificate in GitHub Pages before relying on secure-link unfurls. Once HTTPS works, socialImageBaseUrl can be changed to https://happysquirtday.co.uk/ and the site rebuilt.

Metadata validation does not prove an actual iMessage or Discord card rendered. Platforms can cache old previews; existing messages may not refresh. The static JPEG preview intentionally contains the birthday caption, not the separate preview title.
