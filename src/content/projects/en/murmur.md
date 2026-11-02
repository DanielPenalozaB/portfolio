---
title: "Murmur"
description: "A local-first meeting recorder for macOS. It transcribes calls on-device with Whisper, recognizes speakers by voice, and writes notes, decisions and action items as Markdown, using a local LLM or your own API key."
image: "/images/projects/murmur/front.png"
tags: ["Rust", "Tauri", "Whisper", "macOS"]
order: 1
url: "/projects/murmur"
repo: "https://github.com/DanielPenalozaB/murmur"
---

## Overview

Murmur records and transcribes meetings on Teams, Google Meet, Slack and Zoom, entirely on your Mac. Transcription runs on-device with Whisper. Summaries and live questions use a local Qwen model through Ollama by default, or your own Claude or Gemini key if you choose that for a session. Audio never leaves the machine.

The point is to get meeting notes without uploading calls to anyone's server. It's a released app: four versions shipped between October 28 and November 2, 2026, across 38 merged pull requests, and it updates itself.

## What it does

- Shows a live transcript of your microphone and the call, including meetings that switch languages, and answers questions about the meeting while it's happening.
- Writes notes when the meeting ends: a summary, decisions, action items and open questions, each linked to the moment it was said, plus the recording so you can replay any moment. Every session is a Markdown file in a folder you choose, ready for Obsidian or any editor.
- Shows a small card and a notification when someone mentions your name or asks you something. ⌃⌥M marks a moment and ⌃⌥N adds a quick note without leaving the call.
- Collects action items from every meeting in one list, with yours first and overdue ones flagged. Ticking one off also ticks it in that meeting's notes.
- Recognizes speakers by voice. Name someone once and Murmur suggests their name in later meetings, and it flags names that don't match a voice.
- Notices when Teams, Slack, Zoom or a browser call starts using the microphone and offers to record. Nothing is recorded until you say so.
- Searches across every meeting, organized into notebooks.

## How it works

```
┌────────────── macOS ──────────────┐
│ Mic ── audiocap --source mic ─────┤ Swift helper, one
│ System ─ audiocap --source system ┤ process per channel:
│   (Core Audio process tap)        │ 16 kHz mono f32 on stdout
└─────────────────────────┼─────────┘
                          ▼
        murmur-audio: 100 ms frames per channel → WAV tracks + earshot VAD
                          │  SpeechChunk { channel, start_ms, samples }
                          ▼
        murmur-stt: whisper.cpp (whisper-rs, Metal) worker thread
                          │  Segment { start, end, channel, text }
                          ▼
        session actor (src-tauri, tokio) ── append ──► transcript (in memory + SQLite)
            │                    │                              │
            │ tauri::ipc::Channel│ Ask question                 │ Stop
            ▼                    ▼                              ▼
        React UI          murmur-llm: transcript prefix   diarize (sherpa-onnx) → summary
        (live lines)      + question → stream answer      → murmur-store writes .md/.txt
```

A small Swift helper captures the microphone and, through Core Audio process taps, the call's audio. Rust does everything else. Speaker identity works in two layers: during the call, the channel decides it (your mic is "Me", system audio is "Them"), and after the call, speaker embeddings split the other side into individual voices that you can name.

| Concern           | Choice                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| App shell         | Tauri 2                                                                |
| Interface         | React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, Zustand   |
| Audio capture     | Swift helper with AVAudioEngine and Core Audio process taps (macOS 14.4+) |
| Voice detection   | `earshot`, in pure Rust                                                |
| Transcription     | `whisper-rs` (whisper.cpp on Metal), large-v3-turbo                    |
| Speaker detection | `sherpa-onnx` with pyannote segmentation and NeMo TitaNet embeddings   |
| LLMs              | Ollama, Anthropic and Gemini, streamed over SSE with `reqwest`         |
| Storage           | Markdown files plus a SQLite index with full-text search (FTS5)        |
| Secrets           | macOS Keychain; API keys never reach the webview                       |

The Rust code is split into crates (`murmur-core`, `murmur-audio`, `murmur-stt`, `murmur-llm`, `murmur-store`) that depend only on the core types. Only the Tauri shell knows about Tauri, so the hard parts (audio, speech recognition, prompts) can be tested with `cargo test`.

## Problems I had to solve

### Too many speakers, or not?

An early 21-minute meeting came out with more than 49 speakers, which looked like the diarization was splitting people apart. Before tuning anything, I checked recent meetings against their real headcounts. Current diarization actually finds fewer speakers than attendees (15 against about 19 in one standup), every pair of different speakers scores below 0.62 similarity, and a real split of one person scores between 0.83 and 0.92. The meetings with huge speaker counts had been transcribed by an older version, so the fix was to re-transcribe them, not to change thresholds.

### Checking names against voices

Once speakers are remembered by voice, a wrong name can spread. The Speakers screen now reviews names: speakers who share a name but sound less than 50% alike are probably two people, and two saved voices that sound at least 60% alike but never appeared in the same meeting may be one. Correcting a name rebuilds the saved voice from the speakers still under it.

### A silent microphone in Teams

Four recordings came back with a microphone track of pure zeros for the whole call, while the call audio was fine. The microphone was a Bluetooth headset, and the same helper recorded it fine outside a call; the likely cause is that muting in Teams carries over to the headset. Murmur never mutes on its own, so I made it log stretches of digital silence along with the device, which makes this easy to spot next time.

### Logs that went nowhere

While debugging, I found that the app's tracing had no subscriber, so every warning was silently dropped. Warnings, errors and panics now go to a log file in `~/Library/Logs` with 1 MB rotation.

## Releases

Murmur ships as a `.dmg` for Apple silicon Macs on macOS 14.4 or later. On first run it downloads its speech models (about 770 MB) and asks for microphone and system audio access. Releases are built by a GitHub Actions workflow from a version tag, and since version 0.3.0 the app updates itself with signed updates. It isn't notarized by Apple yet.

The code is source-available under the PolyForm Shield license.
