---
title: "RecoAgua"
description: "An educational platform for responsible water usage in Cali, Colombia. Features interactive guides, gamification with badges and challenges, a water consumption calculator, an interactive city map with zone indicators, and a full admin panel."
image: "/images/projects/recoagua/front.png"
tags: ["Next.js", "NestJS", "PostgreSQL", "Gamification"]
order: 2
url: "/projects/recoagua"
repo: "https://github.com/DanielPenalozaB/recoagua-fe"
---

## Overview

RecoAgua is an educational platform that promotes responsible water use in Cali, Colombia. It uses gamification, interactive tools, and local data to help people understand how much water they use and then use less.

## The problem

Cali goes through recurring periods of water stress, but most residents don't know their own consumption patterns. Conservation campaigns have mostly been passive, like posters and TV ads, and they change little about how people behave. The city needed:

- An engaging way to teach residents about water use
- Tools to measure personal consumption and reduce it
- Local data showing which neighborhoods face the highest risk
- A system that rewards people for saving water consistently

## Goals

- Build an educational platform that changes how people use water day to day
- Keep users coming back with badges, challenges, and leaderboards
- Build a water consumption calculator with personalized recommendations
- Map water stress zone by zone across the city
- Give administrators a complete content management panel
- Keep the platform usable for people at any level of technical skill

## Tech stack

| Technology | Role |
| ---------- | ---- |
| **Next.js** | Frontend with SSR for SEO and dynamic content |
| **NestJS** | Backend framework with modular architecture |
| **PostgreSQL** | Relational database for users, challenges, and zone data |
| **Leaflet** | Interactive city map with zone overlays |
| **Chart.js** | Consumption visualizations and progress charts |
| **TailwindCSS** | Responsive UI styling |
| **JWT** | Authentication for users and admin panel |

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

The NestJS backend is a modular monolith: each domain (users, challenges, zones, calculator) is its own module, with its own service, controller, and repository layers.

## Features

### Interactive guides

Step-by-step guides cover water conservation topics:

- Saving water at home
- Understanding your water bill
- Conservation by season
- Community initiatives

Each guide tracks your progress and awards XP when you finish it.

### Gamification

The engagement loop is built from these pieces:

| Element | Description |
| ------- | ----------- |
| **Badges** | Earned by completing guides, challenges, or milestones |
| **Challenges** | Time-limited tasks (e.g., "Reduce consumption 10% this week") |
| **XP & Levels** | Accumulated through all activities, unlocking new content |
| **Leaderboards** | Zone-based and city-wide rankings |

### Water consumption calculator

Users enter details about their household (number of residents, appliances, habits) and get:

- Their estimated daily and monthly water use in liters
- A comparison with the city average
- Personalized recommendations for using less
- Projected savings, in liters and in money

### Interactive city map

A Leaflet map of Cali shows:

- Zones colored by water stress level, from green to red
- Average consumption per zone
- Infrastructure status
- Historical trends when you hover over a zone

### Admin panel

Administrators get a complete CMS where they can:

- Create, edit, and publish educational guides
- Manage challenges and the criteria for each badge
- Monitor how users engage with the platform
- Update zone data and map indicators
- See analytics for the whole platform

## Problems I had to solve

### Gamification with substance

Plenty of "gamified" apps attach points to actions without any real progression, and people lose interest once the novelty wears off. In RecoAgua, rewards unlock things that are useful: new calculator features, advanced guides, and community challenges. Badges stand for real achievements; "Saved 1000L", for example, needs a reduction the app has tracked. Leaderboards are grouped by zone, which sets up friendly competition between neighborhoods.

### Accurate consumption estimates

Water use varies a lot with household size, climate, and infrastructure, so a generic calculator would be useless. I built a model with several factors, calibrated against Cali's municipal water data: number of residents, shower length and frequency, appliances such as washing machines and dishwashers, garden size, and seasonal rainfall. Its results are checked against anonymized billing data from the local utility.

### Map performance with dense zone data

Rendering hundreds of polygons with real-time data overlays made the map lag badly on phones. It now loads progressively: first the zone boundaries with cached colors, then detailed statistics when you zoom in or click. Switching the boundaries from GeoJSON to vector tiles cut the payload by 85%.

### Content workflow for admins

Administrators needed to write guides without technical knowledge, yet the guides needed rich formatting such as images, callouts, and embedded calculators. I built a block-based editor inspired by Notion. Admins put a guide together from predefined blocks (text, image, quiz, tip, calculator embed), and each block has its own validation and preview, so every guide comes out consistently formatted.

## Database schema (simplified)

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

## Impact

| Metric | Result |
| ------ | ------ |
| Registered users | 2,400+ |
| Guides completed | 8,500+ |
| Avg. reported reduction | 12% monthly consumption |
| Active challenge participants | 340/month |
| Admin-published guides | 45 |

## What I learned

1. Points alone don't change behavior. Tying rewards to real outcomes, like lower bills and visible community impact, is what keeps people engaged.
2. NestJS modules scaled well. The modular monolith kept the codebase organized as features grew, without the overhead of microservices.
3. Maps are expensive on mobile. For a map-heavy app aimed at phones, vector tiles and progressive loading were necessary.
4. Local data builds trust. People engaged more when they saw their own neighborhood's numbers instead of city-wide statistics.
5. The admin experience matters as much as the user's. If content creators can't publish easily, the platform stalls no matter how good the rest of it is.

## What's next

- [ ] Push notifications that remind users about active challenges
- [ ] Integration with the local water utility's billing API
- [ ] Forums for each zone where neighbors can share conservation tips
- [ ] An offline mode for areas with poor connectivity
- [ ] A school program with classroom challenges
