# ŌKUMA.dev

A lightweight, responsive project showcase for [OkumaDock](https://github.com/Okumai/OkumaDock), [OkumaLaunchpad](https://github.com/Okumai/OkumaLaunchpad), and [OkumaBar](https://github.com/Okumai/OkumaBar).

Built with Vite, vanilla JavaScript, and CSS. No backend, API keys, or environment variables required.

## Local development

Requires Node.js 20.19+ or 22.12+ (Node.js 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open the address printed by Vite (normally http://localhost:5173).

```sh
npm test          # Check translation completeness
npm run build    # Generate dist/
npm run preview  # Preview the production build
```

## Languages

English is the default for a first visit, regardless of browser language. The header selector supports:

- English (`en`)
- Japanese (`ja`)
- Korean (`ko`)
- Simplified Chinese (`zh-Hans`)
- Traditional Chinese (`zh-Hant`)

The selected language is saved in localStorage under `okuma-language`. If storage is blocked, switching still works for the current page. Visible page copy, document language, title, and description update together. Project names and illustrative technical labels remain unchanged.

Translations live in `src/locales.js`. This is a single-page client-side language switcher, not five separately indexed localized URLs.

## Deploy to Vercel

1. Push this directory to a new GitHub repository, for example `Okumai/okuma.dev`.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the root directory at the repository root. `vercel.json` specifies:
   - Framework: **Vite**
   - Build command: **npm run build**
   - Output directory: **dist**
4. Deploy. No environment variables are needed.
5. In **Project → Settings → Domains**, add `okuma.dev`.
6. Follow the exact DNS records shown by Vercel at your domain provider. If adding `www.okuma.dev`, configure it to redirect to `okuma.dev`.
7. Vercel provisions HTTPS after DNS verification. Later pushes to the production branch trigger new deployments.

CLI alternative (requires a Vercel account):

```sh
npx vercel
npx vercel --prod
```

Deployment and DNS configuration are not performed by this repository.

## Editing

- `src/main.js`: page structure, project links, and inline SVG/CSS interface illustrations. Header and footer use the ŌKUMA.dev wordmark; navigation contains Projects and GitHub only.
- `src/projects.js`: category and project registry. The existing tools belong to Omarchy exclusively. To add another category, add an entry with a unique ID, a name, description/compatibility translation keys, and project entries; add the translation keys to all five dictionaries. Category navigation and sections render automatically. New project types also need their card illustration in `src/main.js`.
- `src/locales.js`: all five translation dictionaries.
- `src/style.css`: colors, typography, desktop illustrations, and responsive layouts.
- `public/favicon.svg`: brand favicon.
- `public/robots.txt` and `public/sitemap.xml`: search-engine discovery.
- `index.html`: initial English metadata and canonical domain.
- `vercel.json`: deployment settings and basic security headers.

The desktop previews are **illustrations**, not actual project screenshots. Project descriptions are based on the three local repositories' READMEs. These are independent community projects for Omarchy's Quickshell desktop, not standalone applications or official Omarchy projects. Installation requirements remain in the individual project repositories.

Google Fonts supplies DM Sans and Manrope; system fonts are used when that service is unavailable. No analytics or tracking scripts are included. The language preference is stored locally in the browser.
