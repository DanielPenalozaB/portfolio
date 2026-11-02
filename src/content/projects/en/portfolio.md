---
title: "Portfolio"
description: "Personal portfolio designed in Figma and built with Astro, featuring orbital skill animations, i18n support, dark mode, interactive dot grid, and GSAP-powered transitions."
image: "/images/projects/portfolio/front.png"
tags: ["Astro", "TailwindCSS", "GSAP", "Figma"]
order: 1
repo: "https://github.com/danielpenalozab/portfolio"
url: "/projects/portfolio"
---

## Overview

This portfolio shows what I build and how I build it. I designed it from scratch in Figma and built it with Astro's island architecture. If a site claims to care about performance and design, it should prove it, so I held this one to that standard.

## The problem

Most developer portfolios fall into one of two groups: React single-page apps that take seconds to load, or static templates with no personality. I wanted something in between: very fast and visually distinctive, still interesting to build, and without giving up accessibility or performance.

## Design

Everything started in Figma, from the layout grid and color palette to the orbital animation and how the page breaks into components. Having the whole design system ready before writing code kept development focused and fast.

![Figma design files for the portfolio](/images/projects/portfolio/portfolio-figma-design.webp)

## Goals

- Design a visual identity from scratch in Figma
- Reach near-perfect Lighthouse scores in every category
- Support English and Spanish throughout
- Keep animations smooth and respect `prefers-reduced-motion`
- Keep the JavaScript bundle small
- Meet WCAG 2.1 AA accessibility

## Tech stack

| Technology         | Role                                                 |
| ------------------ | ---------------------------------------------------- |
| **Astro**          | Static site framework with island architecture       |
| **TailwindCSS v4** | Utility-first styling with custom dark mode variant  |
| **GSAP**           | Imperative animations for orbital motion and reveals |
| **React**          | Interactive islands (DotGrid canvas, WebGL effects)  |
| **TypeScript**     | Type safety across components and i18n system        |
| **Figma**          | Full design system and prototyping                   |

## Architecture

The site follows Astro's content-driven structure, with my own i18n layer on top:

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

Translation keys are typed from the English locale, so using a key that doesn't exist fails at compile time. Content collections use locale-prefixed IDs (`en/portfolio`, `es/portfolio`), which keeps both languages side by side.

## Features

### Orbital skill animation

The hero shows my skills orbiting in concentric rings, animated with GSAP. Each ring has its own speed and direction.

### Interactive dot grid

A React canvas draws thousands of dots that react when the cursor gets close. It runs on `requestAnimationFrame` and uses an `IntersectionObserver` to pause while it's off screen, so it doesn't spend cycles on something nobody can see.

### Dark mode without a flash

Dark mode is class-based. A small inline script reads `localStorage` before the first paint, so the page never flashes the wrong theme, and a `MutationObserver` passes theme changes on to the React islands.

### Reveal animations

Sections fade and slide into view as you scroll, using an `IntersectionObserver` with staggered delays. If you prefer reduced motion, the content simply appears.

## Problems I had to solve

### Theme changes in React islands

In Astro, React islands hydrate independently, so when someone toggled dark mode from the Astro header, the islands never found out. A `MutationObserver` now watches the `dark` class on `<html>` and updates React state, which re-renders the islands with the right colors.

### i18n without a library

I didn't want to pull in a heavy i18n library, so I wrote a small typed system. The hard part was keeping translations type-safe while reading the locale from the URL. The `en.ts` locale defines the `TranslationKey` type, `useTranslations(locale)` returns a typed `t()` helper, and `getLocalizedPath()` builds the link to the other language.

### Heavy animations on slower devices

The GSAP orbits and the canvas can strain lower-end devices, and the site still had to be usable there. When `prefers-reduced-motion` is set, the animations are turned off completely, and the canvas pauses through an `IntersectionObserver` whenever it scrolls out of view. On modern hardware it runs at 60fps.

## Performance

PageSpeed Insights on the homepage, November 2, 2026:

| Metric         | Mobile | Desktop |
| -------------- | ------ | ------- |
| Performance    | 100    | 100     |
| Accessibility  | 100    | 100     |
| Best Practices | 100    | 100     |
| SEO            | 100    | 100     |

## What I learned

1. Finishing the Figma design before writing code meant I wasn't making design decisions halfway through building a component.
2. Islands keep the bundle small: Astro ships no JavaScript by default and hydrates only the interactive parts.
3. Building accessibility in from the first day (skip links, ARIA labels, keyboard navigation) is much easier than adding it later.
4. A small i18n setup can be type-safe without a large framework.

## What's next

- [ ] Add a contact form backed by a serverless function
- [ ] Add analytics with privacy-respecting tooling
