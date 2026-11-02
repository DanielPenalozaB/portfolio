---
title: "SaveSphere"
description: "A personal finances and budget tracker app with account management, categorized transactions, AI-powered financial advice, and insightful analytics to improve spending habits."
image: "/images/projects/savesphere/front.png"
tags: ["SvelteKit", "Go", "Chi", "AI"]
order: 3
url: "/projects/savesphere"
repo: "https://github.com/DanielPenalozaB/savesphere"
---

## Overview

SaveSphere is a personal finance app that shows users exactly where their money goes and helps them control it. Alongside regular budget tracking, it gives AI-generated advice based on each user's real transactions.

## The problem

Existing finance apps are either overwhelming (YNAB, Quicken) or so simple they stop being useful. Most of them also describe your spending without telling you what to change. I wanted an app that would:

- Let you log a transaction in a few seconds
- Categorize spending automatically
- Give AI-generated advice that helps you change habits
- Work across multiple accounts and currencies

## Goals

- Build a fast full-stack app with SvelteKit and Go
- Give AI-assisted financial advice by analyzing transaction history
- Design a clear dashboard with analytics that mean something
- Support multiple accounts, categories, and recurring transactions
- Keep API responses for core operations under 100ms

## Tech stack

| Technology | Role |
| ---------- | ---- |
| **SvelteKit** | Frontend framework with SSR and file-based routing |
| **Go** | Backend API service for high-performance data processing |
| **Chi** | Lightweight HTTP router for the Go API |
| **PostgreSQL** | Primary database for transactions and user data |
| **OpenAI API** | AI-powered financial insights and recommendations |
| **TailwindCSS** | UI styling with custom design tokens |

## Architecture

The frontend and backend are fully separate:

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

The Go backend handles all business logic, authentication, and data storage. The AI layer processes transaction history in the background to generate periodic insights, so it never slows down the main flow of the app.

## Features

### Multiple accounts

Users can track checking accounts, savings, credit cards, and cash, each with its own balance and transaction history. One dashboard adds up the totals across all of them.

### Categorized transactions

Each transaction gets a category (food, transport, entertainment, and so on), either by hand or from a suggestion. Categories feed both the analytics and the AI recommendations.

### AI financial advisor

This is the main feature: an AI assistant that analyzes spending patterns and gives personalized advice you can act on. It picks up things like:

- Unusual spikes in a particular category
- Chances to save based on recurring patterns
- Monthly budget recommendations based on income and goals

### Analytics dashboard

Charts break down spending by category, time period, and account:

- Monthly spending trends (line charts)
- Spending by category (donut charts)
- Income compared with expenses
- Progress against each budget

### Recurring transactions

Scheduled transactions such as rent, subscriptions, and salary are added automatically on their due dates, so the ledger stays accurate without manual entry.

## Problems I had to solve

### Balances that update instantly

With thousands of transactions across several accounts, balances had to be instant, and the naive approach of summing every transaction on each request slowed down quickly. Instead, each transaction stores the balance that results from it. Account balances are denormalized and updated inside the same database transaction, which keeps balance lookups O(1) and the data consistent.

### Useful AI advice

Early versions of the AI feature gave generic advice like "spend less on dining out", and users needed something specific to them. I rewrote the prompts to include categorized monthly summaries, changes in spending, and the user's own goals. Now the insights look like this: "Your grocery spending increased 23% this month compared to your 3-month average. Consider meal planning on Sundays — users with similar profiles save ~$80/month this way."

### Keeping Go and SvelteKit in sync

Keeping the Go API and the SvelteKit frontend type-safe took care, because request and response shapes could drift apart. The API contracts are defined once as OpenAPI specs: TypeScript types for the frontend are generated from them, and the Go handlers are validated against the same schema, so a contract change gets caught at build time.

## Database schema (simplified)

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

## Performance

| Metric | Target | Achieved |
| ------ | ------ | -------- |
| API response (p95) | < 100ms | 47ms |
| Dashboard load | < 1.5s | 1.1s |
| Transaction creation | < 200ms | 89ms |
| AI insight generation | < 5s | ~3.2s |

## What I learned

1. Go works well for financial APIs. Its type system catches precision errors at compile time, and goroutines handle concurrent balance calculations cleanly.
2. AI features need guardrails. Without structured prompts and output validation, LLM responses are too generic to be useful, and the context you give the model matters more than which model you pick.
3. SvelteKit's reactivity suits dashboards. Derived stores and reactive declarations make charts update instantly without manual state management.
4. Start with the data model. Getting the transaction and account schema right early saved me from expensive migrations later.

## What's next

- [ ] Bank account sync through Plaid
- [ ] Budget goals with progress notifications
- [ ] Shared household accounts
- [ ] A Flutter mobile app on the same backend
- [ ] CSV and PDF export for tax season
