---
title: "Portfolio"
description: "Personal portfolio designed in Figma and built with Astro, featuring orbital skill animations, i18n support, dark mode, interactive dot grid, and GSAP-powered transitions."
image: "/images/projects/portfolio/front.png"
tags: ["Astro", "TailwindCSS", "GSAP", "Figma"]
repo: "https://github.com/danielpenalozab/portfolio"
url: "/projects/portfolio"
---

## Overview

This portfolio is my digital home — a place to showcase not just what I build, but _how_ I build it. Every interaction, animation, and layout decision was intentional, designed from scratch in Figma and brought to life with Astro's island architecture.

> A portfolio should practice what it preaches. If you claim to care about performance and design, your own site should prove it.

---

## The Problem

Most developer portfolios fall into two camps: either they're over-engineered React SPAs that take seconds to load, or they're static templates with no personality. I wanted something in between — **blazing fast**, visually distinctive, and technically interesting without sacrificing accessibility or performance.

---

## Goals

- Design a unique visual identity from scratch in Figma
- Achieve near-perfect Lighthouse scores across all categories
- Support full internationalization (English/Spanish)
- Implement smooth, performant animations that respect `prefers-reduced-motion`
- Build with a modern stack that keeps bundle size minimal
- Ensure full accessibility compliance (WCAG 2.1 AA)

---

## Tech Stack

| Technology         | Role                                                 |
| ------------------ | ---------------------------------------------------- |
| **Astro**          | Static site framework with island architecture       |
| **TailwindCSS v4** | Utility-first styling with custom dark mode variant  |
| **GSAP**           | Imperative animations for orbital motion and reveals |
| **React**          | Interactive islands (DotGrid canvas, WebGL effects)  |
| **TypeScript**     | Type safety across components and i18n system        |
| **Figma**          | Full design system and prototyping                   |

---

## Architecture

The site follows Astro's content-driven approach with a custom i18n layer:

```
src/
├── components/     # Astro + React interactive islands
├── content/        # Markdown collections (blog, projects)
├── i18n/           # Type-safe translation system
│   ├── locales/    # en.ts, es.ts
│   └── index.ts    # getLocaleFromUrl, useTranslations
├── layouts/        # Layout, BlogPost, ProjectDetail
├── pages/          # File-based routing with locale prefixes
└── styles/         # Global CSS with Tailwind directives
```

The i18n system uses **typed translation keys** derived from the English locale, ensuring compile-time safety when adding or using translations. Content collections support locale-prefixed IDs (`en/portfolio`, `es/portfolio`) for seamless bilingual content.

---

## Key Features

### Orbital Skill Animation

The hero section features skills orbiting in concentric rings, animated with GSAP. Each orbit has its own speed and direction, creating a living, breathing visualization of my tech stack.

### Interactive Dot Grid

A React-powered canvas renders thousands of dots that react to cursor proximity with configurable resistance. The component uses `requestAnimationFrame` with an `IntersectionObserver` to pause when off-screen, ensuring zero wasted cycles.

### Dark Mode with FOUC Prevention

Class-based dark mode with a synchronous inline script that reads `localStorage` before the first paint, preventing any flash of unstyled content. A `MutationObserver` bridges the theme state to React islands.

### Reveal Animations

Scroll-triggered reveal animations using `IntersectionObserver` with staggered delays. Elements fade and translate into view as the user scrolls, with graceful degradation for users who prefer reduced motion.

---

## Challenges & Solutions

### Challenge: Theme Reactivity in React Islands

Astro's island architecture means React components hydrate independently. When the user toggles dark mode via the Astro header, React islands had no way to know.

**Solution:** A `MutationObserver` watches the `<html>` element's class list for `dark` changes, updating React state to trigger re-renders with the correct theme colors.

### Challenge: i18n Without a Framework

Rather than pulling in a heavy i18n library, I built a lightweight typed system. The challenge was keeping translations type-safe while supporting dynamic locale resolution from URLs.

**Solution:** The `en.ts` locale serves as the source of truth for `TranslationKey` types. A `useTranslations(locale)` function returns a typed `t()` helper, and `getLocalizedPath()` handles URL locale switching.

### Challenge: Performance with Heavy Animations

GSAP orbital animations and canvas rendering can strain lower-end devices. The site needed to look impressive without being unusable.

**Solution:** `prefers-reduced-motion` media queries disable animations entirely for users who opt out. Canvas animations pause via `IntersectionObserver` when scrolled out of view. The result: 60fps on modern hardware, graceful fallback everywhere else.

---

## Performance

| Metric         | Score |
| -------------- | ----- |
| Performance    | 98    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

---

## Lessons Learned

1. **Design first, code second** — Having a complete Figma design before writing any code eliminated decision paralysis during development.
2. **Islands architecture is powerful** — Astro's approach of shipping zero JS by default and hydrating only interactive components keeps the bundle tiny.
3. **Accessibility is a feature, not an afterthought** — Building with a11y in mind from day one (skip links, ARIA labels, keyboard nav) is far easier than retrofitting.
4. **Simple i18n can be type-safe** — You don't need a heavyweight framework to get compile-time translation key safety.

---

## What's Next

- [ ] Add project case study narratives with rich media
- [ ] Implement view transitions between pages
- [ ] Add a contact form with serverless function backend
- [ ] Integrate analytics with privacy-respecting tooling
- [ ] Create an RSS feed for blog posts
