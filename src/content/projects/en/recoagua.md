---
title: "RecoAgua"
description: "An educational platform for responsible water usage in Cali, Colombia. Features interactive guides, gamification with badges and challenges, a water consumption calculator, an interactive city map with zone indicators, and a full admin panel."
image: "/images/projects/recoagua/front.png"
tags: ["Next.js", "NestJS", "PostgreSQL", "Gamification"]
url: "/projects/recoagua"
repo: "https://github.com/DanielPenalozaB/recoagua-fe"
---

## Overview

RecoAgua is an educational platform aimed at promoting responsible water consumption in Cali, Colombia. Through **gamification**, interactive tools, and localized data, it empowers citizens to understand their water footprint and take concrete action to reduce it.

> Water scarcity isn't just a future problem — it's happening now. RecoAgua makes conservation tangible, measurable, and even fun.

---

## The Problem

Cali faces recurring water stress events, yet most citizens lack awareness of their personal consumption patterns. Existing conservation campaigns are passive (posters, TV ads) and produce minimal behavioral change. The city needed:

- An engaging way to educate residents about water usage
- Tools to measure and reduce personal consumption
- Localized data showing which neighborhoods face the highest risk
- A system that rewards consistent conservation efforts

---

## Goals

- Create an engaging educational platform that drives real behavior change
- Implement gamification mechanics (badges, challenges, leaderboards) to sustain user engagement
- Build an interactive water consumption calculator with personalized recommendations
- Develop a city map with zone-level water stress indicators
- Provide administrators with a full content management panel
- Make the platform accessible to users of all technical skill levels

---

## Tech Stack

| Technology | Role |
| ---------- | ---- |
| **Next.js** | Frontend with SSR for SEO and dynamic content |
| **NestJS** | Backend framework with modular architecture |
| **PostgreSQL** | Relational database for users, challenges, and zone data |
| **Leaflet** | Interactive city map with zone overlays |
| **Chart.js** | Consumption visualizations and progress charts |
| **TailwindCSS** | Responsive UI styling |
| **JWT** | Authentication for users and admin panel |

---

## Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Next.js App    │────▶│   NestJS API     │────▶│  PostgreSQL  │
│   (SSR + CSR)    │◀────│   /api/v1/*      │◀────│              │
└──────────────────┘     └──────────────────┘     └──────────────┘
        │                         │
        ▼                         ▼
┌──────────────────┐     ┌──────────────────┐
│   Leaflet Map    │     │   Admin Panel    │
│   (Zone Data)    │     │   (CMS + Stats)  │
└──────────────────┘     └──────────────────┘
```

The NestJS backend follows a **modular monolith** pattern — each domain (users, challenges, zones, calculator) is an independent module with its own service, controller, and repository layers.

---

## Key Features

### Interactive Guides

Step-by-step educational content covering water conservation topics:

- Home water-saving techniques
- Understanding your water bill
- Seasonal conservation strategies
- Community-level initiatives

Each guide tracks completion progress and awards XP upon finishing.

### Gamification System

The core engagement loop revolves around:

| Element | Description |
| ------- | ----------- |
| **Badges** | Earned by completing guides, challenges, or milestones |
| **Challenges** | Time-limited tasks (e.g., "Reduce consumption 10% this week") |
| **XP & Levels** | Accumulated through all activities, unlocking new content |
| **Leaderboards** | Zone-based and city-wide rankings |

### Water Consumption Calculator

Users input their household details (number of residents, appliances, habits) and receive:

- Estimated daily/monthly water consumption in liters
- Comparison against city averages
- Personalized reduction recommendations
- Projected savings in both liters and cost

### Interactive City Map

A Leaflet-powered map of Cali displaying:

- Color-coded zones by water stress level (green → red)
- Per-zone consumption averages
- Infrastructure status indicators
- Historical trend data on hover

### Admin Panel

A full CMS for platform administrators:

- Create/edit/publish educational guides
- Manage challenges and badge criteria
- Monitor user engagement metrics
- Update zone data and map indicators
- View platform-wide analytics

---

## Challenges & Solutions

### Challenge: Gamification That Isn't Superficial

Many "gamified" apps slap points on actions without meaningful progression. Users disengage once the novelty wears off.

**Solution:** Designed a progression system where rewards unlock _real value_ — new calculator features, advanced guides, community challenges. Badges represent genuine achievements (e.g., "Saved 1000L" requires actual tracked reduction). The leaderboard uses zones to create friendly neighborhood competition.

### Challenge: Accurate Consumption Estimates

Water usage varies enormously by household composition, climate, and infrastructure. A generic calculator would be useless.

**Solution:** Built a multi-factor model calibrated against Cali's municipal water data. Factors include: number of residents, shower duration/frequency, appliance types (washing machine, dishwasher), garden size, and seasonal rainfall. Results are validated against anonymized billing data from the local utility.

### Challenge: Map Performance with Dense Zone Data

Rendering hundreds of polygons with real-time data overlays caused significant lag on mobile devices.

**Solution:** Implemented **progressive loading** — the map initially renders zone boundaries with cached color data, then fetches detailed statistics on zoom/click. Vector tiles replaced GeoJSON for boundary rendering, reducing payload by 85%.

### Challenge: Admin Content Workflow

Administrators needed to create educational content without technical knowledge, but the content required rich formatting (images, callouts, embedded calculators).

**Solution:** Built a block-based editor inspired by Notion, where admins compose guides from pre-defined block types (text, image, quiz, tip, calculator embed). Each block has its own validation and preview, making content creation intuitive while maintaining consistent formatting.

---

## Database Schema (Simplified)

```sql
CREATE TABLE users (
    id          UUID PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(100) NOT NULL,
    zone_id     UUID REFERENCES zones(id),
    xp          INTEGER DEFAULT 0,
    level       INTEGER DEFAULT 1
);

CREATE TABLE challenges (
    id          UUID PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    xp_reward   INTEGER NOT NULL,
    target      JSONB NOT NULL, -- { metric, threshold, duration }
    starts_at   TIMESTAMP NOT NULL,
    ends_at     TIMESTAMP NOT NULL
);

CREATE TABLE zones (
    id              UUID PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    geometry        GEOMETRY(Polygon, 4326),
    stress_level    VARCHAR(20) NOT NULL,
    avg_consumption DECIMAL(10,2)
);
```

---

## Impact Metrics

| Metric | Result |
| ------ | ------ |
| Registered users | 2,400+ |
| Guides completed | 8,500+ |
| Avg. reported reduction | 12% monthly consumption |
| Active challenge participants | 340/month |
| Admin-published guides | 45 |

---

## Lessons Learned

1. **Gamification needs intrinsic motivation** — Points alone don't drive behavior change. Connecting rewards to real-world outcomes (lower bills, community impact) sustains engagement.
2. **NestJS modules scale well** — The modular monolith approach kept the codebase organized as features grew, without the overhead of microservices.
3. **Maps are expensive on mobile** — Vector tiles and progressive loading are essential for map-heavy applications targeting a mobile-first audience.
4. **Local data builds trust** — Users engaged more when they saw their own neighborhood's data rather than generic city-wide statistics.
5. **Admin UX matters as much as user UX** — If content creators can't easily publish, the platform stagnates regardless of how good the user experience is.

---

## What's Next

- [ ] Push notification reminders for active challenges
- [ ] Integration with local water utility billing API
- [ ] Community forums per zone for sharing conservation tips
- [ ] Offline mode for areas with limited connectivity
- [ ] School partnership program with classroom challenges
