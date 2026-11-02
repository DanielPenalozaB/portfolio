# Vendored agent skills

Copied from the commits below after a manual review (no hooks, no telemetry, no binary
downloads, no auto-install). Update by reviewing the upstream diff, never by auto-pulling.

| Skill | Source | Commit | License |
|---|---|---|---|
| frontend-design | anthropics/skills `skills/frontend-design` | ca45fc496a3436251f191354091d557da31c15b5 | Apache-2.0 (LICENSE.txt) |
| webapp-testing | anthropics/skills `skills/webapp-testing` | ca45fc496a3436251f191354091d557da31c15b5 | Apache-2.0 (LICENSE.txt). Local Playwright scripts only. |
| review-animations, animation-performance, improve-animations | emilkowalski/skills | a81dbca07f2217b7103e510c0f13f8d5b017afc9 | MIT |
| humanizer | blader/humanizer (SKILL.md only) | 0ef9fe5bc3572734fd3ae6c448fe00a30cd5dcf0 | MIT |
| web-design-guidelines | vercel-labs/agent-skills + vercel-labs/web-interface-guidelines | 1a2c79d / 434b7f9 | MIT. Modified: rules vendored instead of fetched from `main` at runtime. |

Deliberately not installed: find-skills (agent-driven `npx skills add -g -y`, CLI telemetry),
ponytail (always-on prompt hooks, per-turn usage ledger), impeccable plugin (hooks on every
edit, downloads a native binary), taste-skill (overlaps frontend-design, very large),
addyosmani/agent-skills (overlaps workspace workflow and built-in /code-review, /simplify).
