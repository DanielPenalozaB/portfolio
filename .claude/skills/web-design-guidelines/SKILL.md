---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with the Web Interface Guidelines.

## How It Works

1. Read the rules in `GUIDELINES.md` next to this file (a pinned, vendored snapshot).
2. Read the specified files (or ask the user for files/pattern).
3. Check them against every rule in `GUIDELINES.md`.
4. Output findings in the terse `file:line` format it specifies.

Do not fetch the guidelines from the network. The upstream skill pulls them from a moving
`main` branch on every run; this copy is pinned on purpose so the instructions can't change
underneath the agent.

## Provenance

- Skill: vercel-labs/agent-skills@1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62 (`skills/web-design-guidelines`), modified to read locally.
- Rules: vercel-labs/web-interface-guidelines@434b7f91364665f2f733b310ec54809bf8f37937 (`command.md`), MIT.

To update, review the upstream diff and replace `GUIDELINES.md` deliberately.
