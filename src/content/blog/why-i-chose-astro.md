---
title: "Why I Chose Astro and Why I'd Do It Again"
description: "A deep dive into building with Astro: the performance wins, the island architecture, and how it plays beautifully with React, GSAP, TailwindCSS and everything in between."
pubDate: 'May 01 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

When I started planning my portfolio, I had a clear goal: ship something fast, visually polished, and technically interesting — without drowning in framework complexity. After evaluating Next.js, SvelteKit, and even plain HTML with a build tool, I landed on **Astro**. Six months in, it's one of the best technical decisions I've made.

This post is a walkthrough of my experience — the good parts, the tricky parts, and why Astro's philosophy keeps winning me over.

---

## The Core Idea: Ship Less JavaScript

Astro's pitch is deceptively simple: **zero JavaScript by default**. Every page renders to static HTML at build time. If a component doesn't need interactivity, it ships no JS. Period.

This sounds like an obvious thing, but coming from Next.js where even a static page carries a hydration cost, the difference is dramatic. My portfolio's homepage ships under 50KB of JS — and most of that is the interactive canvas and GSAP animations that genuinely need it.

```astro
---
// This Astro component ships ZERO JavaScript to the browser.
// It runs entirely at build time.
const greeting = "Hi, I'm Daniel";
---

<h1>{greeting}</h1>
```

Compare that to a React component that does the same thing — the text is static, but React still ships its runtime to hydrate it. Astro just... doesn't.

---

## Islands Architecture: Use What You Need

The killer feature is **islands**. You can mix frameworks within a single page, and each interactive component hydrates independently. My portfolio uses:

- **Astro components** for everything static (header, footer, layout, sections)
- **React** for the DotGrid canvas and WebGL light rays
- **Pure JS** via `<script>` tags for GSAP animations and the dark mode toggle

Each React island loads only when needed:

```astro
<!-- Only hydrates when the component scrolls into view -->
<DotGrid client:visible baseColor="#F1F0F0" darkBaseColor="#1e1b18" />
```

The `client:visible` directive means the DotGrid doesn't even start loading until the user scrolls to it. On pages where it doesn't exist (like blog posts), zero React is shipped. This granularity is something monolithic frameworks simply can't match.

---

## Playing Nice with Others

One of my concerns going in was whether Astro would play well with the libraries I rely on. Short answer: it does.

### TailwindCSS v4

Tailwind integrates seamlessly. I'm using v4 with the Vite plugin, and the developer experience is identical to what you'd get in any other framework. The custom variant system works perfectly for class-based dark mode:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@custom-variant dark (&:where(.dark, .dark *));
```

### GSAP

GSAP works beautifully in Astro's `<script>` tags. Since these are standard ES modules that Astro bundles, you get full tree-shaking and can import only what you need. The orbital animations on my hero section are pure GSAP — no React wrapper needed:

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

### React (When You Actually Need It)

For genuinely interactive components — the canvas-based dot grid, the WebGL effects — React slots in perfectly as an island. The mental model is clear: Astro handles the page, React handles the widget.

The only challenge was bridging Astro's theme state to React islands. Since they hydrate independently, React components don't automatically know when dark mode toggles. I solved it with a `MutationObserver` watching the `<html>` class:

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

Not the prettiest pattern, but it's reliable and framework-agnostic.

---

## Content Collections: Type-Safe Markdown

Astro's content collections are genuinely excellent. You define a schema, and every markdown file gets validated and typed at build time:

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

If a frontmatter field is missing or the wrong type, the build fails with a clear error — not a runtime crash. This is especially valuable for my bilingual setup where content exists in `en/` and `es/` directories. I can trust that both language versions conform to the same shape.

---

## The i18n Story

Astro doesn't ship a built-in i18n solution, which initially felt like a gap. But it turned out to be a feature. I built a lightweight typed system in about 50 lines:

```typescript
export type TranslationKey = keyof typeof en;

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    return languages[locale][key] ?? languages[defaultLocale][key] ?? key;
  };
}
```

The English locale defines the `TranslationKey` type. If I add a key to `en.ts` and forget to add it to `es.ts`, TypeScript won't complain — but the fallback chain handles it gracefully. If I typo a key in a component, the build fails. Best of both worlds.

File-based routing with locale prefixes (`/projects/portfolio` vs `/es/projects/portfolio`) just works with Astro's page structure. No router configuration, no middleware.

---

## View Transitions

Astro's built-in View Transitions API support is remarkably easy to enable. One component in the head:

```astro
<ClientRouter />
```

And suddenly you have SPA-like navigation with smooth page transitions. Adding morph animations between pages is just a `transition:name` attribute:

```astro
<!-- In the project card -->
<img transition:name={`project-img-${slug}`} ... />

<!-- In the project detail page — same name, Astro morphs between them -->
<img transition:name={`project-img-${slug}`} ... />
```

The project image smoothly scales and repositions from the card to the detail page. No animation library needed, no manual FLIP calculations.

The main gotcha: module scripts only run once with view transitions. Any DOM setup needs to hook into `astro:page-load`:

```javascript
function initOrbitalHero() { /* ... */ }
initOrbitalHero();
document.addEventListener("astro:page-load", initOrbitalHero);
```

Once you internalize that pattern, everything works smoothly.

---

## The Tricky Parts

It's not all sunshine. A few things caught me off guard:

### Scoped Styles Can Surprise You

Astro scopes `<style>` blocks to the component by default. If you write global CSS expecting it to cascade into child components, it won't. The `is:global` escape hatch works, but you need to be intentional about when to use it vs. Tailwind utility classes.

### React Islands Are Isolated

This is by design, but it means no shared React context between islands. Each one is its own mini-app. If two islands need to share state, you're reaching for DOM events, custom events, or observable patterns rather than React context. For my use case this was fine — the DotGrid and WebGL effects are independent — but it's worth knowing upfront.

### Build Errors Can Be Cryptic

When a content collection schema fails or an import path is wrong, the error messages occasionally point to generated files rather than your source. It's gotten better over time, but occasionally you'll be hunting through Vite's module graph to figure out what went wrong.

---

## The Numbers

Here's what matters in the end:

| Metric | Score |
| ------ | ----- |
| Lighthouse Performance | 98 |
| Lighthouse Accessibility | 100 |
| Total JS (homepage) | ~48KB |
| Time to Interactive | 0.8s |
| Build time (26 pages) | 2.8s |

For a site with GSAP animations, a React canvas, WebGL effects, dark mode, and full i18n — those numbers are absurd. And they're effortless. I didn't optimize for them; Astro's architecture just produces them naturally.

---

## Would I Use It for Everything?

No. Astro excels at **content-driven sites** where most of the page is static and interactivity is localized. Portfolios, blogs, documentation, marketing sites, landing pages — these are Astro's sweet spot.

For a highly interactive app like SaveSphere (my finance tracker), I'd still reach for SvelteKit or Next.js. When every component needs state and the page is more app than document, the islands model adds overhead without much benefit.

But for this portfolio? Astro was the right call. It let me ship a site that's fast by default, add interactivity exactly where I needed it, and avoid the framework tax that makes most developer portfolios ironically slow.

---

## Final Thoughts

Astro's philosophy — **ship less, use what you need, make the default path fast** — aligns perfectly with how I think about web development. It doesn't try to be everything. It's not replacing your favorite UI framework. It's giving you a better way to compose them.

If you're building something where content comes first and interactivity comes second, give Astro a serious look. The developer experience is excellent, the output is lean, and the ecosystem is mature enough that you won't hit walls.

The web already has too many slow sites. Astro makes it easy to not add to the pile.
