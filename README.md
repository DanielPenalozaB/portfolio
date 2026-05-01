# Daniel Penaloza — Portfolio

Personal portfolio designed in Figma and built with Astro. Features orbital skill animations, bilingual content (EN/ES), dark mode, interactive dot grid, GSAP-powered transitions, View Transitions API, and project case studies.

**Live:** [danielpenalozab.com](https://danielpenalozab.com)

## Tech Stack

- **Astro** — Static site generation with island architecture
- **React** — Interactive islands (canvas dot grid, WebGL light rays)
- **TailwindCSS v4** — Utility-first styling with custom dark mode variant
- **GSAP** — Orbital animations, profile card tilt, scroll reveals
- **TypeScript** — Type safety across components and i18n
- **Nginx** — Production server with gzip and immutable asset caching
- **Docker** — Multi-stage build for deployment via Coolify

## Features

- Orbital skill animation with per-ring hover deceleration
- Interactive dot grid canvas with cursor proximity reactions
- Class-based dark mode with FOUC prevention and React bridge via MutationObserver
- Full i18n (English/Spanish) with type-safe translation keys
- Content collections for projects and blog posts with Zod schema validation
- View Transitions API with morph animations between project cards and detail pages
- Scroll-triggered reveal animations with `prefers-reduced-motion` respect
- Tool & technology grid with blur-on-hover sibling effect
- Project detail pages with rich markdown case studies
- Responsive design with mobile navigation and touch interactions
- SEO optimized with OpenGraph, JSON-LD, canonical URLs, sitemap, and RSS

## Project Structure

```
src/
├── components/      # Astro + React interactive islands
├── content/
│   ├── blog/        # Blog posts (Markdown)
│   └── projects/
│       ├── en/      # English project content
│       └── es/      # Spanish project content
├── data/            # Typed constants (tools, orbits, nav links)
├── i18n/
│   ├── locales/     # en.ts, es.ts translation files
│   └── index.ts     # getLocaleFromUrl, useTranslations, getLocalizedPath
├── layouts/         # Layout, BlogPost, ProjectDetail
├── pages/           # File-based routing with locale prefixes
└── styles/          # Global CSS with Tailwind directives
```

## Getting Started

```bash
npm install
npm run dev
```

Open [localhost:4321](http://localhost:4321).

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npx astro check` | Run type checking |

## Deployment

The site deploys as a Docker container via Coolify.

```bash
docker build -t portfolio .
docker run -p 8080:8080 portfolio
```

The multi-stage Dockerfile builds with Node 22 and serves with Nginx Alpine. Static assets under `/_astro/` are cached with immutable headers for 1 year.

## License

MIT
