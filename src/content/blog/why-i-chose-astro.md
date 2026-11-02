---
title: "Why I Chose Astro and Why I'd Do It Again"
description: "A deep dive into building with Astro: the performance wins, the island architecture, and how it plays beautifully with React, GSAP, TailwindCSS and everything in between."
pubDate: 'May 01 2026'
updatedDate: 'Nov 02 2026'
heroImage: '../../assets/blog/why-i-chose-astro-cover.png'
---

When I started planning my portfolio, I wanted something fast and polished that was also interesting to build, without fighting a framework the whole way. I looked at Next.js, SvelteKit, and plain HTML with a build tool, and picked Astro. A couple of weeks in, it already felt like one of the best technical decisions I'd made, and I still think so.

## Shipping less JavaScript

Astro renders every page to static HTML at build time, and a component that doesn't need interactivity ships no JavaScript at all.

Coming from Next.js, where even a static page pays a hydration cost, that difference is big. My homepage ships about 110 KB of gzipped JS, and nearly all of it is the React runtime and WebGL code behind two interactive islands. The static content around them ships none.

```astro
---
// This Astro component ships ZERO JavaScript to the browser.
// It runs entirely at build time.
const greeting = "Hi, I'm Daniel";
---

<h1>{greeting}</h1>
```

A React component that rendered the same static text would still send the React runtime to hydrate it. Astro doesn't.

## Islands

The feature I lean on most is islands: you can mix frameworks on one page, and each interactive component hydrates on its own. My portfolio uses Astro components for everything static (header, footer, layout, sections), React for the DotGrid canvas and the WebGL light rays, and plain `<script>` tags for the GSAP animations and the dark mode toggle.

Each React island loads only when it's needed:

```astro
<!-- Only hydrates when the component scrolls into view -->
<DotGrid client:visible baseColor="#F1F0F0" darkBaseColor="#1e1b18" />
```

With `client:visible`, the DotGrid doesn't start loading until the user scrolls to it, and pages without it, like blog posts, ship no React at all. Frameworks that hydrate the whole page don't give you that kind of control.

## Working with my other libraries

I was worried Astro wouldn't get along with the libraries I rely on. It does.

### Tailwind CSS v4

I use Tailwind v4 through its Vite plugin, and it works the same way it would in any other framework. Its custom variant system handles class-based dark mode:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@custom-variant dark (&:where(.dark, .dark *));
```

### GSAP

GSAP runs fine inside Astro's `<script>` tags. Astro bundles them as standard ES modules, so tree-shaking works and you only import what you use. The orbital animations in my hero are plain GSAP with no React wrapper:

```astro
<script>
  import gsap from "gsap";

  const arms = document.querySelectorAll(".orbit-arm");
  arms.forEach((arm) => {
    gsap.to(arm, {
      rotation: "+=360",
      duration: parseFloat(arm.dataset.speed),
      repeat: -1,
      ease: "none",
    });
  });
</script>
```

### React, when I need it

For the parts that really are interactive, the canvas dot grid and the WebGL effects, React works well as an island. Astro handles the page and React handles the widget.

My one problem was getting the theme into the React islands. They hydrate independently, so they don't know when dark mode toggles. I solved it with a `MutationObserver` that watches the class on `<html>`:

```jsx
useEffect(() => {
  const observer = new MutationObserver(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}, []);
```

It isn't pretty, but it's reliable and doesn't depend on any framework.

## Content collections

Content collections are one of my favorite parts of Astro. You define a schema, and Astro validates and types every Markdown file at build time:

```typescript
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    url: z.string().optional(),
    repo: z.string().optional(),
  }),
});
```

If a frontmatter field is missing or has the wrong type, the build fails with a clear error instead of crashing at runtime. That matters for my bilingual setup, where content lives in `en/` and `es/` directories and both versions have to match the same schema.

## Translations

Astro handles locale routing in its config, but it has nothing built in for translating interface strings. That looked like a gap at first. In practice I liked writing my own: a small typed system of about 50 lines.

```typescript
export type TranslationKey = keyof typeof en;

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    return languages[locale][key] ?? languages[defaultLocale][key] ?? key;
  };
}
```

The English locale defines the `TranslationKey` type. If I add a key to `en.ts` and forget it in `es.ts`, TypeScript won't complain, but the fallback chain shows the English string instead. If I mistype a key in a component, the build fails.

The locale-prefixed routes (`/projects/portfolio` and `/es/projects/portfolio`) come straight from Astro's file-based pages plus one `i18n` block in the config, with no middleware.

## View transitions

Turning on Astro's View Transitions support takes one component in the head:

```astro
<ClientRouter />
```

That gives you SPA-style navigation with animated page changes. To morph an element from one page into another, give it the same `transition:name` on both:

```astro
<!-- In the project card -->
<img transition:name={`project-img-${slug}`} ... />

<!-- In the project detail page — same name, Astro morphs between them -->
<img transition:name={`project-img-${slug}`} ... />
```

The project image scales and moves from the card to the detail page without an animation library or manual FLIP calculations.

The catch is that module scripts only run once when view transitions are on, so any DOM setup has to hook into `astro:page-load`:

```javascript
function initOrbitalHero() { /* ... */ }
initOrbitalHero();
document.addEventListener("astro:page-load", initOrbitalHero);
```

Once I got used to that pattern, I stopped running into problems with it.

## What tripped me up

A few things caught me off guard.

### Scoped styles

Astro scopes `<style>` blocks to their component by default, so global CSS you expect to cascade into child components won't. `is:global` gets around that, but you have to decide each time whether to use it or reach for Tailwind classes instead.

### Isolated React islands

Islands don't share React context, because each one is its own small app. That's by design, and it means two islands that need shared state have to talk through DOM events or an observable instead. My DotGrid and WebGL effects are independent, so it didn't matter here, but it's worth knowing before you start.

### Confusing build errors

When a content collection schema fails or an import path is wrong, the error sometimes points at generated files instead of your source. It has improved, but now and then you'll still dig through Vite's module graph to find the real problem.

## The numbers

PageSpeed Insights on the homepage, November 2, 2026 (Lighthouse 13.6, lab data):

| Metric | Mobile | Desktop |
| ------ | ------ | ------- |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 0.9 s | 0.3 s |
| Largest Contentful Paint | 1.7 s | 0.6 s |

Mobile runs on an emulated Moto G Power with slow 4G throttling. The homepage ships about 110 KB of gzipped JavaScript, and a production build of all 16 pages takes around 2 seconds.

For a site with GSAP animations, a React canvas, WebGL effects, dark mode, and two languages, I'm happy with that. It took some work: I preloaded the hero image, served optimized WebP, switched the fonts to woff2, and fixed a few contrast and alt-text issues before every category reached 100. The site was already fast on Astro's defaults, though, so all of that was tuning.

## Would I use it for everything?

No. Astro is at its best on content-driven sites, where most of the page is static and the interactive parts are small: portfolios, blogs, documentation, marketing and landing pages.

For a highly interactive app like SaveSphere, my finance tracker, I'd still use SvelteKit or Next.js. When every component needs state and the page is more app than document, islands add overhead without much benefit.

For this portfolio it was the right call. The site is fast by default and has interactivity only where I put it. A lot of developer portfolios end up slow because of framework overhead, which is a little ironic for a page meant to show off what you can build.

If you're building something that's mostly content with a bit of interactivity, try Astro. Shipping less and adding only what each page needs is how I already like to work, and Astro makes that the default. It's pleasant to work with, and the ecosystem is mature enough that I never got stuck.
