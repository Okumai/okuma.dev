# ŌKUMA.dev

**AI-native products. Human by design.**

ŌKUMA.dev is an independent home for thoughtful products, open-source experiments, and tools that make everyday work feel simpler. It brings projects together in one place, with a focus on exploring AI-native products grounded in real human needs.

**Website domain:** [okuma.dev](https://okuma.dev) · **GitHub:** [Okumai](https://github.com/Okumai)

## The idea

Technology should serve people, not add complexity. ŌKUMA.dev reflects that approach: clear information, considered details, and a quiet visual identity that lets the work speak for itself.

The website is designed to grow beyond a single platform or type of tool. Projects are organized by category, giving current open-source work a home while leaving room for future products and experiments.

AI-native products describe the brand’s direction—not a claim that every listed project includes AI features. The current collection consists of Omarchy desktop extensions.

## Project collection

Each project card introduces the tool, highlights its key features, and links directly to its source code and documentation.

### Omarchy

Three focused tools for **Omarchy’s Quickshell-based system desktop**:

| Project | Purpose | Highlights |
| --- | --- | --- |
| [OkumaDock](https://github.com/Okumai/OkumaDock) | Keep favorite and running applications within reach. | Persistent pins, drag-to-reorder, and live theme colors for tiling and scrolling workspaces. |
| [OkumaLaunchpad](https://github.com/Okumai/OkumaLaunchpad) | Browse and launch applications from a fullscreen grid. | Application search, keyboard navigation, and optional touchpad gestures. |
| [OkumaBar](https://github.com/Okumai/OkumaBar) | Bring essential desktop information into a considered top-bar layout. | Custom clock, weather, workspace, and memory widgets. |

These are independent community projects, **not official Omarchy projects, standalone applications, or tools for arbitrary Linux desktops**. Check each repository for installation instructions and compatibility requirements.

The desktop visuals on the website are interface **illustrations**, not actual project screenshots.

## Website experience

- **Category-based discovery:** the current Omarchy collection is grouped together, with a structure that supports additional categories as new projects are added.
- **A restrained visual identity:** warm off-white surfaces, muted greens, custom interface illustrations, and consistent ŌKUMA.dev branding.
- **Responsive layouts:** project cards and navigation adapt to desktop, tablet, and mobile screens.
- **A custom language picker:** a coordinated dropdown with current-language indicators, keyboard support, Escape-to-close, and outside-click dismissal.
- **Direct access to the work:** source code and documentation links for every project, plus a link to the author’s GitHub profile.

## Five languages, one home

English is the default on a first visit, regardless of browser language. Visitors can switch to:

| Language | Locale |
| --- | --- |
| English | `en` |
| 日本語 | `ja` |
| 한국어 | `ko` |
| 简体中文 | `zh-Hans` |
| 繁體中文 | `zh-Hant` |

Navigation, introductions, project descriptions, feature labels, and supporting copy switch together. The document language, page title, and description also update to match. Project names and illustrative technical labels remain unchanged.

The selected language is remembered locally in the browser. If browser storage is unavailable, switching still works for the current page. Localization is client-side on a single URL; the site does not publish five separately indexed language pages.

## Openness and privacy

The three featured Omarchy projects publish their code under the MIT license. Their individual repositories contain the applicable license notices and contribution information.

The website includes no analytics or tracking scripts. It stores only the language preference in localStorage under `okuma-language`. DM Sans and Manrope are loaded from Google Fonts, with system-font fallbacks when that service is unavailable.

## Development

The site uses **Vite, vanilla JavaScript, and CSS**. No backend, API keys, or environment variables are required.

Use Node.js 20.19+ or 22.12+; Node.js 24 LTS is recommended.

```sh
npm ci
npm run dev
```

Open the address printed by Vite, normally `http://localhost:5173`.

```sh
npm test          # Validate translations and the category registry
npm run build    # Generate the production site in dist/
npm run preview  # Preview the production build
```

### Content structure

| File | Responsibility |
| --- | --- |
| `src/projects.js` | Project categories and their project entries. |
| `src/locales.js` | All five translation dictionaries. |
| `src/main.js` | Page rendering, interface illustrations, and language-picker behavior. |
| `src/style.css` | Visual identity and responsive layouts. |
| `public/` | Favicon, robots.txt, and sitemap. |
| `index.html` | Initial English metadata and canonical domain. |

To add a category, register it in `src/projects.js` and provide its description and compatibility text in every locale. Navigation and category sections render from that registry. New projects also need their translated card content and an appropriate illustration in `src/main.js`.

### Hosting

The production output is a static site. Vercel settings are included in `vercel.json`: import this repository with **Vite** as the framework, **`npm run build`** as the build command, and **`dist`** as the output directory. No environment variables are needed.

To use `okuma.dev`, add the domain in the Vercel project settings and follow the DNS instructions provided there. Repository configuration alone does not deploy the site or configure the domain.
