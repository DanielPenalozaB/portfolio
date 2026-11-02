---
title: "YS Chic"
description: "A headless storefront for botanical skincare and clean makeup: a Nuxt 4 store on a Strapi 5 API with product variants, a promotion engine, prices recomputed on the server, and end-to-end tests that include accessibility."
image: "/images/projects/ecommerce/front.png"
tags: ["Nuxt", "Strapi", "TypeScript", "Playwright"]
order: 5
url: "/projects/ecommerce"
repo: "https://github.com/DanielPenalozaB/ecommerce"
---

## Overview

YS Chic is an online store for botanical skincare and clean makeup, built as a monorepo with a Nuxt 4 storefront and a Strapi 5 headless API. The interface implements a Google Stitch design ("Tienda Skincare y Maquillaje"), and the store runs in Colombian pesos.

The catalog, cart, promotions and checkout all work against the API, with demo data seeded on first boot. Payment isn't integrated yet, so checkout creates orders as pending.

## The storefront

- A home page built from Strapi's page builder, with a header, mega menu and footer that are also managed in Strapi
- A catalog by category with filters kept in the URL, plus search and new arrivals
- Product pages with variants for size, shade and scent, and `Product` structured data for search engines
- A makeup collection with a shade finder
- A step-by-step skin quiz that ends with your goals and recommends a routine
- Checkout, order confirmation, a favorites list and an account page

Every catalog page renders on the server for SEO. The cart and favorites live in Pinia stores saved to `localStorage`, and forms use vee-validate with the same Zod rules as the API.

## The commerce API

The Strapi content model covers products (simple, variable or bundles, with ingredients, clinical results and FAQs), variants with SKU, stock and low-stock thresholds, categories, brands, collections, skin concerns, ingredients, moderated reviews, shipping methods, samples and newsletter signups. Menus, pages and global settings like VAT and the free-shipping threshold are content too, so they can change without a deploy.

A few rules keep the store honest:

- Prices are always recalculated on the server. `POST /api/orders/quote` prices a cart (stock, promotions, gifts, shipping, samples and VAT), and checkout recalculates everything again before it creates the order.
- Every product has at least one variant, and a Strapi middleware keeps the product's price equal to its cheapest active variant so sorting and price filters stay correct.
- Stock is checked when quoting and reduced when an order is placed.
- The public role can't read orders, promotions, promotion codes or subscribers. Reviews come in as drafts for moderation, and every public endpoint validates its input with Zod.

### The promotion engine

Promotions can be a percentage, a fixed amount, free shipping, buy X get Y, or a free gift. They can apply to the whole order or to specific products, categories, collections or brands, with minimum subtotals or quantities, date windows, and global or per-customer limits. Automatic promotions run first by priority, then the customer's code. A code that can't be combined is rejected with a message instead of silently replacing a better automatic discount. Discounts are split across order lines, so each line knows what it actually costs.

## Stack

| Layer      | Technology                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| Storefront | Nuxt 4, TypeScript, Tailwind CSS v4, shadcn-vue, Pinia, vee-validate, Zod  |
| API        | Strapi 5 in TypeScript, Zod validation                                      |
| Database   | PostgreSQL in the Docker stack; throwaway SQLite databases in tests        |
| Deployment | Docker Compose with Postgres, Strapi, Nuxt and Caddy                       |
| Quality    | Airbnb ESLint, commitlint, lint-staged, GitHub Actions CI                  |

## Testing

| Layer                  | What it covers                                                        |
| ---------------------- | --------------------------------------------------------------------- |
| API unit               | The promotion engine, validation schemas and seed helpers              |
| API integration        | Permissions, catalog, quote and checkout, promotions, stock and moderation, against a real Strapi on a throwaway database |
| Storefront             | Variant logic, filters, the cart, forms and product cards             |
| End-to-end             | Shopping journeys, mobile layout and WCAG 2.1 AA accessibility checks with axe, in Playwright |

## What's next

- [ ] A Colombian payment provider (Wompi, Mercado Pago or PayU) with a signed webhook that marks orders as paid
- [ ] Customer accounts with order history and saved addresses
- [ ] Image storage on S3 or Cloudinary
- [ ] Search with Meilisearch or Algolia once the catalog grows
- [ ] Cached catalog pages that refresh when content is published
