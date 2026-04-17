# Ahir Portfolio

Static production-ready portfolio site based on `project.md`.

## Files

- `index.html`: main single-page sales portfolio
- `contact.html`: dedicated contact page
- `styles.css`: responsive visual system and layout
- `script.js`: navigation, reveal animations, year, and static contact form mailto behavior
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

## Before Upload

Replace these values across the files:

- `https://your-domain.com` with your real domain
- `Ahir` or `Ahir Web Studio` with your preferred public name
- The labelled project placeholders with real work when available

Use this command to find all editable placeholders:

```bash
rg "your-domain|placeholder|approved for public use"
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

## Contact Form

The contact form is intentionally static and opens the visitor's email app with a prefilled message.

If your hosting provider supports forms, replace the JavaScript mailto flow with the provider's form action. Netlify, Formspree, Basin, and Getform are common options.
