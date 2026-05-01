---
title: "SaveSphere"
description: "A personal finances and budget tracker app with account management, categorized transactions, AI-powered financial advice, and insightful analytics to improve spending habits."
image: "/images/projects/savesphere/front.png"
tags: ["SvelteKit", "Go", "Chi", "AI"]
url: "/projects/savesphere"
repo: "https://github.com/DanielPenalozaB/savesphere"
---

## Overview

SaveSphere is a personal finance application designed to give users complete visibility and control over their spending habits. It combines traditional budget tracking with **AI-powered insights** that provide actionable financial advice based on real transaction patterns.

> The best budget app is the one you actually use. SaveSphere was built to make financial awareness effortless, not tedious.

---

## The Problem

Existing finance apps either overwhelm users with complexity (YNAB, Quicken) or oversimplify to the point of uselessness. Most critically, they _describe_ your spending but rarely _prescribe_ what to change. I wanted an app that would:

- Be fast and intuitive enough to log transactions in seconds
- Categorize spending automatically
- Provide AI-generated insights that actually help improve habits
- Work across multiple accounts and currencies

---

## Goals

- Build a performant full-stack application with SvelteKit and Go
- Implement AI-assisted financial advice using transaction history analysis
- Design an intuitive dashboard with meaningful analytics
- Support multiple accounts, categories, and recurring transactions
- Deliver sub-100ms API response times for core operations

---

## Tech Stack

| Technology | Role |
| ---------- | ---- |
| **SvelteKit** | Frontend framework with SSR and file-based routing |
| **Go** | Backend API service for high-performance data processing |
| **Chi** | Lightweight HTTP router for the Go API |
| **PostgreSQL** | Primary database for transactions and user data |
| **OpenAI API** | AI-powered financial insights and recommendations |
| **TailwindCSS** | UI styling with custom design tokens |

---

## Architecture

The application follows a clean separation between frontend and backend:

```
┌─────────────────┐     ┌─────────────────┐     ┌──────────────┐
│   SvelteKit     │────▶│   Go API (Chi)  │────▶│  PostgreSQL  │
│   Frontend      │◀────│   /api/v1/*     │◀────│              │
└─────────────────┘     └────────┬────────┘     └──────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   OpenAI API    │
                        │   (Insights)    │
                        └─────────────────┘
```

The Go backend handles all business logic, authentication, and data persistence. The AI layer processes transaction history asynchronously to generate periodic insights without blocking the main user flow.

---

## Key Features

### Multi-Account Management

Users can track finances across checking accounts, savings, credit cards, and cash — each with its own balance and transaction history. A unified dashboard aggregates totals across all accounts.

### Categorized Transactions

Every transaction is assigned a category (food, transport, entertainment, etc.) either manually or via smart suggestions. Categories power the analytics engine and AI recommendations.

### AI Financial Advisor

The standout feature: an AI assistant that analyzes spending patterns and provides personalized, actionable advice. It identifies trends like:

- Unusual spending spikes in specific categories
- Opportunities to save based on recurring patterns
- Monthly budget recommendations based on income and goals

### Analytics Dashboard

Visual breakdowns of spending by category, time period, and account. Includes:

- Monthly spending trends (line charts)
- Category distribution (donut charts)
- Income vs. expenses comparison
- Budget progress indicators

### Recurring Transactions

Support for scheduled transactions (rent, subscriptions, salary) that auto-populate on their due dates, keeping the ledger accurate without manual entry.

---

## Challenges & Solutions

### Challenge: Real-Time Balance Calculations

With thousands of transactions across multiple accounts, calculating balances needed to be instant. Naive approaches (summing all transactions per request) degraded quickly.

**Solution:** Implemented a **running balance** strategy where each transaction stores the resulting balance. Account balances are denormalized and updated transactionally, ensuring O(1) balance lookups while maintaining consistency.

### Challenge: Meaningful AI Insights

Early iterations of the AI feature produced generic advice ("spend less on dining out"). Users needed specific, contextual recommendations.

**Solution:** Engineered detailed prompts that include categorized monthly summaries, spending deltas, and user-defined goals. The AI now produces insights like: "Your grocery spending increased 23% this month compared to your 3-month average. Consider meal planning on Sundays — users with similar profiles save ~$80/month this way."

### Challenge: Go + SvelteKit Communication

Type safety between the Go API and SvelteKit frontend required careful coordination to prevent drift between request/response shapes.

**Solution:** Defined shared API contracts using OpenAPI specs, generating TypeScript types for the frontend and validating Go handlers against the same schema. Any contract change is caught at build time.

---

## Database Schema (Simplified)

```sql
CREATE TABLE accounts (
    id          UUID PRIMARY KEY,
    user_id     UUID REFERENCES users(id),
    name        VARCHAR(100) NOT NULL,
    type        VARCHAR(20) NOT NULL,
    balance     DECIMAL(12,2) DEFAULT 0,
    currency    VARCHAR(3) DEFAULT 'USD'
);

CREATE TABLE transactions (
    id          UUID PRIMARY KEY,
    account_id  UUID REFERENCES accounts(id),
    category_id UUID REFERENCES categories(id),
    amount      DECIMAL(12,2) NOT NULL,
    type        VARCHAR(10) NOT NULL, -- 'income' | 'expense'
    description TEXT,
    date        TIMESTAMP NOT NULL,
    balance     DECIMAL(12,2) NOT NULL
);
```

---

## Performance

| Metric | Target | Achieved |
| ------ | ------ | -------- |
| API response (p95) | < 100ms | 47ms |
| Dashboard load | < 1.5s | 1.1s |
| Transaction creation | < 200ms | 89ms |
| AI insight generation | < 5s | ~3.2s |

---

## Lessons Learned

1. **Go is excellent for financial APIs** — The type system catches precision errors at compile time, and goroutines handle concurrent balance calculations elegantly.
2. **AI features need guardrails** — Without structured prompts and output validation, LLM responses are too generic to be useful. Context engineering matters more than model choice.
3. **SvelteKit's reactivity shines for dashboards** — Derived stores and reactive declarations make chart updates feel instantaneous without manual state management.
4. **Start with the data model** — Getting the transaction/account schema right early prevented costly migrations later.

---

## What's Next

- [ ] Bank account sync via Plaid integration
- [ ] Budget goal setting with progress notifications
- [ ] Shared household accounts
- [ ] Mobile app with Flutter (shared backend)
- [ ] Export to CSV/PDF for tax season
