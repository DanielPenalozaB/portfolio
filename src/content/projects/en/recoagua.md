---
title: "RecoAgua"
description: "My Systems Engineering thesis: a web platform that helps households in Cali collect and use rainwater, with interactive guides, a rainwater calculator, a map of the city's rainfall zones and gamified progress."
image: "/images/projects/recoagua/front.png"
tags: ["Next.js", "NestJS", "PostgreSQL", "Gamification"]
order: 3
url: "/projects/recoagua"
repo: "https://github.com/DanielPenalozaB/recoagua-fe"
---

## Overview

RecoAgua was my Systems Engineering thesis at UNIAJC (Institución Universitaria Antonio José Camacho), built with Ismael Yate Calderón and directed by Beatriz E. Marín. It's a web platform that helps households in Cali, Colombia, collect rainwater and use it where drinking water isn't needed, like flushing toilets, washing clothes and cleaning.

It supports households in four ways: interactive guides explain the topic, a calculator estimates how much rainwater a home could collect, a map shows the city's rainfall zones, and points, levels, badges and challenges keep people going. Administrators manage all of it from one panel.

It's live at [recoagua.com](https://recoagua.com), and the code lives in two repositories: the [frontend](https://github.com/DanielPenalozaB/recoagua-fe) and the [backend](https://github.com/DanielPenalozaB/recoagua-be).

## The problem

Cali's rivers get worse as they cross the city. Three of the four main rivers leave it with a water quality index rated "bad", and the city produces about half of the Cauca river's pollution. EMCALI's treatment plants take drinking water from those same rivers.

Before writing any code, we surveyed 410 households (95% confidence, 5% margin of error):

| Question                         | Result                                              |
| -------------------------------- | --------------------------------------------------- |
| Where does your water come from? | 88% from the municipal supply                       |
| How reliable is the service?     | 32% report interruptions                            |
| Do you store water?              | 56.6% in buckets, 12.2% in tanks, 19.5% not at all  |
| What do you use water for?       | Toilets 72.7%, laundry 65.4%, cleaning 55.9%        |
| Do you take steps to save water? | 43.9% don't                                         |
| How do you get online?           | 82.9% by phone; 75.8% have a low or mid-range phone |

Most household water goes to uses where rainwater works fine, and many homes already store water, just informally. What people lacked was knowledge and tools. The phone numbers settled the format: a light, mobile-first web app.

## How we built it

We used ICONIX for the software, which goes from use cases to robustness diagrams to design, and ADDIE for the educational content. That produced 26 use cases, a 13-screen prototype in Figma, and a trace from every requirement to its test.

| Layer      | Technology                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Frontend   | Next.js 16, React 19, TanStack Query and Table, React Hook Form with Zod, Tailwind CSS, Mapbox GL, Recharts |
| Backend    | NestJS, TypeORM, Swagger docs, rate limiting, email with Resend                                  |
| Database   | PostgreSQL                                                                                       |
| Security   | bcrypt for passwords, 1-hour JWTs with renewal, role guards, HTTPS                               |
| Deployment | Three Docker containers (frontend, API, database) on an Ubuntu VPS managed with Coolify          |

We compared each piece with alternatives. Next.js beat Angular and Vue because server rendering loads fast on low-end phones. NestJS beat Django and Rails for its modular structure and because it let us use TypeScript on both sides. PostgreSQL beat MySQL and MongoDB for full ACID transactions on a schema we didn't expect to change much.

```
Phone or browser ──HTTPS──▶ Next.js (SSR) ──▶ NestJS REST API ──▶ PostgreSQL
                    (three Docker containers on a VPS, deployed with Coolify)
```

## Features

### Interactive guides

Content is organized into guides, modules and blocks. A block can be text, a video, an image, a question, a quiz or an interactive exercise. Questions can be multiple choice, true or false, open-ended, matching or ordering, and the interactive exercises include drag and drop, sorting, fill in the blanks and simulations. Blocks and modules are worth points, and the platform tracks each user's progress through them. We wrote 4 guides with 8 modules and 33 blocks, 24 of which include check questions.

### Rainwater calculator

The calculator estimates how much rainwater a home could collect with `Volume = Rainfall × Area × Roof efficiency × System efficiency`. Rainfall comes from the user's zone, roof efficiency depends on the roofing material, and system efficiency accounts for losses. It also estimates availability, savings and CO₂. For example, a home in the south of the city (about 1,600 mm of rain a year) with a 50 m² green roof and a basic system could collect around 24,000 liters a year. It's an estimate for a scenario, not a measurement of water actually collected.

### Rainfall zone map

A Mapbox map shows the city's zones, grouped by region and city. Each zone has its average rainfall, altitude, average temperature, soil type and recommendations for collecting water there.

### Gamification

Users earn experience points by completing blocks and modules, move up through levels, unlock badges when they pass a threshold, and take on challenges. Challenges are educational, practical or community-based, and each one is rated easy, medium or hard.

### Admin panel

Administrators and moderators manage users, guides, modules and blocks, cities, regions and zones, and challenges, levels and badges from the same panel.

### Accounts

Sign-up includes email confirmation, and users can reset their password by email.

## Built for the phones people actually have

The survey shaped the interface. Since most people connect by phone, the layout is mobile-first and works down to 320 px wide. For low and mid-range phones, pages render on the server and stay light, with a goal of loading in under 3 seconds on 4G. Since 40% of respondents had at most a high school education, the language is plain and the main features are one tap from the home screen.

## Testing and validation

We documented 113 tests following IEEE 829: 95 functional, 13 non-functional and 5 unit tests with Jest, plus API checks in Postman. All of them passed after fixing the issues they found, such as an unclear sign-out button and missing sign-up notifications. We assessed quality against ISO/IEC 25010.

Then we tested it with people:

- 15 participants used Useberry to sign in, complete a guide, use the calculator, explore the map and review their profile. All 15 finished. 87% strongly agreed the guides and the map were easy to use, 80% the calculator, and 100% the profile.
- 10 first-semester engineering students and a professor completed 8 tasks in an exploratory session and rated each dimension between 6.5 and 7.0 out of 7.

These results show the platform works and is easy to use. They don't prove that households saved water or kept the habit; that would need a longer study.

## What's next

These come from the thesis's future work:

- [ ] A longitudinal study of whether households adopt the practices
- [ ] IoT sensors that report the water level in each tank
- [ ] A WCAG 2.1 accessibility audit
- [ ] Expanding to the rest of the metropolitan area
