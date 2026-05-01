---
title: "Volo"
description: "A gym companion app for building workout routines by body section, tracking nutrition, viewing exercise tutorials with targeted muscle groups, and recording weight progress over time."
image: "/images/projects/volo/front.png"
tags: ["Flutter", "FastAPI", "Python", "Mobile"]
url: "/projects/volo"
repo: ""
---

## Overview

Volo is a mobile-first gym companion designed to remove the guesswork from training. It helps users **build structured routines**, follow exercise tutorials with muscle group targeting, track nutritional intake, and visualize their weight progress over time — all in one streamlined app.

> The gym shouldn't require a personal trainer to navigate. Volo puts expert-level routine building in everyone's pocket.

---

## The Problem

Most gym-goers face a common set of frustrations:

- **No structure** — Walking into the gym without a plan leads to random, ineffective workouts
- **Information overload** — Hundreds of exercises exist, but which ones target what you need?
- **Fragmented tools** — Separate apps for routines, nutrition, and progress tracking creates friction
- **No progression** — Without tracking weight over time, it's impossible to know if you're improving

I wanted a single app that addresses all four problems with a clean, distraction-free mobile experience.

---

## Goals

- Build a cross-platform mobile app with Flutter for iOS and Android
- Design a routine builder organized by body sections (push, pull, legs, etc.)
- Include exercise tutorials with animated muscle group highlighting
- Implement a nutrition tracker with macro breakdowns
- Create a weight progress log with visual trend charts
- Deliver a fast, offline-capable experience for gym environments

---

## Tech Stack

| Technology | Role |
| ---------- | ---- |
| **Flutter** | Cross-platform mobile UI framework |
| **Dart** | Application logic and state management |
| **FastAPI** | Python backend for API and data processing |
| **PostgreSQL** | Database for users, routines, and exercise library |
| **SQLite** | Local device storage for offline support |
| **Matplotlib** | Server-side progress chart generation |

---

## Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Flutter App    │────▶│   FastAPI        │────▶│  PostgreSQL  │
│   (iOS/Android)  │◀────│   /api/v1/*      │◀────│              │
└────────┬─────────┘     └──────────────────┘     └──────────────┘
         │
         ▼
┌──────────────────┐
│   SQLite Local   │
│   (Offline Cache)│
└──────────────────┘
```

The app follows an **offline-first** strategy — routines and exercise data sync to local SQLite on first load. Users can complete full workouts without connectivity; data syncs when connection resumes.

---

## Key Features

### Routine Builder by Body Section

Users create routines organized by muscle group targeting:

| Section | Example Exercises |
| ------- | ----------------- |
| **Push** | Bench press, overhead press, tricep dips |
| **Pull** | Deadlift, barbell rows, pull-ups |
| **Legs** | Squats, leg press, Romanian deadlifts |
| **Core** | Planks, cable crunches, hanging leg raises |
| **Arms** | Bicep curls, skull crushers, hammer curls |

Each routine supports:
- Custom exercise ordering
- Set/rep/weight configuration per exercise
- Rest timer between sets
- Notes per exercise

### Exercise Library with Tutorials

A comprehensive database of 200+ exercises, each featuring:

- Step-by-step text instructions
- Animated muscle group diagrams showing primary and secondary muscles
- Common mistakes to avoid
- Suggested alternatives for equipment limitations

### Nutrition Tracker

Daily food logging with:

- Macro breakdown (protein, carbs, fats)
- Calorie tracking against daily targets
- Meal categorization (breakfast, lunch, dinner, snacks)
- Quick-add for frequently logged foods
- Weekly/monthly nutrition summaries

### Weight Progress Tracking

A dedicated section for recording body weight over time:

- Daily weigh-in logging
- Trend line chart smoothing daily fluctuations
- Goal setting with projected timeline
- Weekly averages to reduce noise from water weight
- Progress photos timeline (optional)

### Active Workout Mode

When a routine is started, the app enters a focused workout mode:

```
┌─────────────────────────────┐
│  Bench Press          3/4   │
│  ─────────────────────────  │
│  Set 1: 80kg × 10 ✓        │
│  Set 2: 85kg × 8  ✓        │
│  Set 3: 85kg × _  ← active │
│  Set 4: 80kg × 10           │
│  ─────────────────────────  │
│  Rest: 1:23 remaining       │
│  [Complete Set]             │
└─────────────────────────────┘
```

---

## Challenges & Solutions

### Challenge: Offline-First Data Sync

Gym environments have notoriously poor connectivity. The app needed to work fully offline, then sync without data loss or conflicts.

**Solution:** Implemented a **last-write-wins** sync strategy with timestamp-based conflict resolution. Local SQLite stores all workout data with a `synced` flag. A background isolate attempts sync every 30 seconds when connectivity is available. Critical operations (creating routines, logging sets) never depend on network.

### Challenge: Muscle Group Visualization

Showing which muscles an exercise targets required clear, consistent anatomical illustrations that respond to the selected exercise.

**Solution:** Created a set of **SVG body maps** with individually addressable muscle groups. Each exercise maps to primary (highlighted) and secondary (dimmed) muscle IDs. Flutter's SVG rendering paints the relevant groups, producing a clear visual without requiring dozens of individual illustrations.

### Challenge: Flutter State Management at Scale

As features grew (routines + nutrition + progress + workout mode), managing state across the app became complex.

**Solution:** Adopted **Riverpod** for dependency injection and state management. Each feature domain has its own providers with clear boundaries. The active workout state uses a `StateNotifier` that persists to local storage, surviving app kills mid-workout.

### Challenge: Rest Timer Accuracy

A rest timer that drifts or stops when the app is backgrounded is useless in a real gym scenario.

**Solution:** Used Flutter's `Isolate` for timer computation and local notifications for background alerts. The timer calculates remaining time from a stored start timestamp rather than counting down, ensuring accuracy regardless of app lifecycle events.

---

## Data Model (Simplified)

```python
class Routine(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    section: str  # "push" | "pull" | "legs" | "core" | "arms"
    exercises: list[RoutineExercise]

class RoutineExercise(BaseModel):
    exercise_id: UUID
    order: int
    sets: int
    target_reps: int
    target_weight: float | None
    rest_seconds: int

class WorkoutLog(BaseModel):
    id: UUID
    routine_id: UUID
    started_at: datetime
    completed_at: datetime | None
    sets: list[SetLog]

class SetLog(BaseModel):
    exercise_id: UUID
    set_number: int
    weight: float
    reps: int
    completed_at: datetime
```

---

## Performance

| Metric | Target | Achieved |
| ------ | ------ | -------- |
| App cold start | < 2s | 1.4s |
| Routine load (offline) | < 100ms | 45ms |
| Sync cycle | < 3s | ~1.8s |
| Exercise search | < 200ms | 90ms |
| Frame rate (animations) | 60fps | 60fps |

---

## Lessons Learned

1. **Offline-first changes everything** — Designing for offline from day one is vastly easier than retrofitting. It forces clean separation between local state and remote truth.
2. **Flutter + FastAPI is a great combo** — Flutter's hot reload speed and FastAPI's auto-generated OpenAPI docs make the development loop extremely fast.
3. **Gym UX needs big touch targets** — Sweaty hands and quick glances between sets mean buttons need to be large, contrast needs to be high, and interactions need to be forgiving.
4. **SVG muscle maps scale beautifully** — One set of vector assets works across all screen sizes and densities, with programmatic coloring replacing dozens of static images.
5. **Rest timers are deceptively complex** — Background execution, notification permissions, and timer accuracy across OS lifecycle events required more engineering than expected.

---

## What's Next

- [ ] Social features (share routines, follow friends' progress)
- [ ] AI-powered routine suggestions based on goals and history
- [ ] Apple Watch / Wear OS companion for active workout tracking
- [ ] Exercise form check via device camera and pose estimation
- [ ] Integration with smart scales for automatic weight logging
