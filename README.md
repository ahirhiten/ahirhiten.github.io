# Hiten Portfolio

Static production-ready portfolio site based on `project.md`.

## Files

- `index.html`: main single-page sales portfolio
- `contact.html`: dedicated contact page
- `styles.css`: responsive visual system and layout
- `script.js`: navigation, reveal animations, year, and Web3Forms contact form submission
- `assets/favicon.svg`: site icon
- `assets/og-image.svg`: social preview image
- `assets/og-image.png`: social preview image for platforms that do not reliably render SVG previews
- `assets/project-launch.svg`: generated SaaS project visual
- `assets/project-local.svg`: generated local business project visual
- `assets/project-growth.svg`: generated B2B project visual
- `robots.txt`: crawler rules
- `sitemap.xml`: sitemap
- `404.html`: simple missing-page fallback
- `_headers`: Netlify/Cloudflare Pages style security and cache headers
- `_redirects`: Netlify style SPA-safe fallback rules

## Production URL

GitHub Pages target:

- `https://hiten-ahir30.github.io/`
- repository name: `hiten-ahir30.github.io`

## Before Upload

Replace these values only if you move off GitHub Pages or change branding:

- `Ahir` or `Ahir Web Studio` with your preferred public name
- The labelled project placeholders with real work when available

Use this command to find all editable placeholders:

```bash
rg "placeholder|approved for public use|Ahir"
```

## Upload

This site has no build step. Upload only these production files and folders:

- `index.html`
- `contact.html`
- `404.html`
- `styles.css`
- `script.js`
- `site.webmanifest`
- `robots.txt`
- `sitemap.xml`
- `.nojekyll`
- `_headers`
- `_redirects`
- `assets/`

Do not upload `project.md`, backup HTML files, or backup asset folders.

Static hosts that work well:

- Netlify
- Vercel static project
- Cloudflare Pages
- GitHub Pages
- cPanel or shared hosting public folder

The entry file is `index.html`.

For GitHub Pages user-site deployment:

1. Create the repository `Hiten-ahir30/hiten-ahir30.github.io`.
2. Push the `main` branch to `origin`.
3. GitHub Pages will serve the site automatically from the repo root.

## Contact Form

The contact form submits through Web3Forms and keeps the existing UI unchanged.

Before going live:

1. Create a free Web3Forms account and copy your access key.
2. Open `contact.html`.
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your real key in the hidden `access_key` input.

The submit flow is handled in `script.js` with a direct POST request to the Web3Forms endpoint, so no backend is required.
