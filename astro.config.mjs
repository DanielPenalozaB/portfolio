// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://danielpenalozab.com",
  integrations: [mdx(), sitemap(), react()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    // "auto" inlines small stylesheets and links large ones so browsers can cache them
    // across pages instead of re-downloading ~80 KB of CSS inside every HTML document.
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});