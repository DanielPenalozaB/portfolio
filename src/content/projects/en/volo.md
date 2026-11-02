---
title: "Volo"
description: "A gym companion app for building workout routines by body section, tracking nutrition, viewing exercise tutorials with targeted muscle groups, and recording weight progress over time."
image: "/images/projects/volo/front.png"
tags: ["Flutter", "FastAPI", "Python", "Mobile"]
order: 4
url: "/projects/volo"
repo: ""
---

## Overview

Volo is a mobile gym companion that takes the guesswork out of training. In one app, you can build structured routines, follow exercise tutorials that show which muscles each exercise works, track what you eat, and chart your weight over time. The idea is that you shouldn't need a personal trainer to find your way around a gym.

## The problem

Most people who go to the gym run into the same frustrations:

- Without a plan, workouts end up random and don't get results
- There are hundreds of exercises, and it's hard to know which ones target what you need
- Routines, nutrition, and progress usually live in separate apps
- Without tracking your weight over time, you can't tell whether you're improving

I wanted one app that handled all four, with a clean mobile interface and nothing to distract you.

## Goals

- Build a cross-platform mobile app with Flutter for iOS and Android
- Organize the routine builder by body section (push, pull, legs, and so on)
- Show exercise tutorials with animated highlighting of the muscles involved
- Track nutrition with a breakdown of macros
- Log weight and show the trend in charts
- Keep the app fast and usable offline, since gyms often have bad reception

## Tech stack

| Technology | Role |
| ---------- | ---- |
| **Flutter** | Cross-platform mobile UI framework |
| **Dart** | Application logic and state management |
| **FastAPI** | Python backend for API and data processing |
| **PostgreSQL** | Database for users, routines, and exercise library |
| **SQLite** | Local device storage for offline support |
| **Matplotlib** | Server-side progress chart generation |

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

The app works offline first. On first load, routines and exercise data are copied to a local SQLite database, so users can finish a whole workout without a connection, and their data syncs once they're back online.

## Features

### Routines by body section

Users build routines around the muscle groups they want to work:

| Section | Example Exercises |
| ------- | ----------------- |
| **Push** | Bench press, overhead press, tricep dips |
| **Pull** | Deadlift, barbell rows, pull-ups |
| **Legs** | Squats, leg press, Romanian deadlifts |
| **Core** | Planks, cable crunches, hanging leg raises |
| **Arms** | Bicep curls, skull crushers, hammer curls |

Each routine supports:

- Any exercise order
- Sets, reps, and weight for each exercise
- A rest timer between sets
- Notes on each exercise

### Exercise library with tutorials

The library has more than 200 exercises, and each one includes:

- Step-by-step written instructions
- Animated diagrams of the primary and secondary muscles worked
- Common mistakes to avoid
- Alternatives when you don't have the right equipment

### Nutrition tracker

Daily food logging includes:

- A breakdown of protein, carbs, and fats
- Calories compared with your daily target
- Meals grouped into breakfast, lunch, dinner, and snacks
- Quick-add for foods you log often
- Weekly and monthly nutrition summaries

### Weight tracking

A separate section records your body weight over time:

- Daily weigh-ins
- A trend line that smooths out daily fluctuations
- Goals with a projected timeline
- Weekly averages, which reduce the noise from water weight
- An optional timeline of progress photos

### Workout mode

Starting a routine switches the app into a focused workout screen:

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

## Problems I had to solve

### Syncing data that was recorded offline

Gyms are known for poor reception, so the app had to work fully offline and then sync without losing data or creating conflicts. Sync uses last-write-wins, resolving conflicts by timestamp. Local SQLite stores all workout data with a `synced` flag, and a background isolate tries to sync every 30 seconds whenever there's a connection. The important actions, like creating routines and logging sets, never depend on the network.

### Showing which muscles an exercise works

This needed clear, consistent anatomy drawings that change with the selected exercise. I made a set of SVG body maps where each muscle group can be addressed on its own. Every exercise maps to primary muscle IDs (highlighted) and secondary ones (dimmed), and Flutter's SVG rendering paints the right groups, so I didn't need dozens of separate illustrations.

### Managing Flutter state as the app grew

Once routines, nutrition, progress, and workout mode were all in place, state management across the app got complicated. I moved to Riverpod for dependency injection and state management, giving each feature its own providers with clear boundaries. The active workout's state lives in a `StateNotifier` that saves to local storage, so a workout survives the app being killed halfway through.

### A rest timer you can trust

In a real gym, a rest timer that drifts or stops when the app goes to the background is useless. The timer runs in a Flutter `Isolate` and uses local notifications for alerts in the background. It works out the remaining time from a saved start timestamp instead of counting down, so it stays accurate no matter what the operating system does to the app.

## Data model (simplified)

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

## Performance

| Metric | Target | Achieved |
| ------ | ------ | -------- |
| App cold start | < 2s | 1.4s |
| Routine load (offline) | < 100ms | 45ms |
| Sync cycle | < 3s | ~1.8s |
| Exercise search | < 200ms | 90ms |
| Frame rate (animations) | 60fps | 60fps |

## What I learned

1. Designing for offline use from the start is much easier than adding it later, and it forces a clean split between local state and the server's data.
2. Flutter and FastAPI work well together. Flutter's hot reload and FastAPI's generated OpenAPI docs made the development loop very fast.
3. A gym app needs big touch targets. With sweaty hands and quick glances between sets, buttons have to be large, contrast has to be high, and mistakes have to be easy to undo.
4. SVG muscle maps scale well. One set of vector assets works on every screen size and density, and coloring them in code replaced dozens of static images.
5. Rest timers are harder than they look. Running in the background, notification permissions, and staying accurate through the operating system's lifecycle events took more engineering than I expected.

## What's next

- [ ] Social features: sharing routines and following friends' progress
- [ ] AI-suggested routines based on goals and history
- [ ] An Apple Watch and Wear OS companion for tracking active workouts
- [ ] Exercise form checks through the camera, using pose estimation
- [ ] Automatic weight logging from smart scales
