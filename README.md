# AI Development Capstone

## Overview

This repository is part of the **FlyRank Frontend AI Engineering Internship**. It tracks weekly deliverables across a multi-week capstone arc, starting with environment setup (FE-01) and progressing through AI-assisted workflow drills (FE-03), and eventually into a full Next.js/React capstone application.

The goal is to learn how to work effectively with AI coding tools (Claude Code / Cursor) while building production-quality frontend features — and to document what works, what breaks, and what conventions emerge along the way.

## Weekly Milestones

| Week | Code    | Deliverable                                     | Status      |
|------|---------|-------------------------------------------------|-------------|
| 1    | FE-01   | Environment & AI toolchain setup                | ✅ Complete |
| 2    | FE-03   | AI-assisted workflow drill (vague vs precise)   | ✅ Complete |
| 3    | FE-04   | Capstone scaffold (Next.js/React)               | ✅ Complete |
| 4    | FE-05   | Accessible components (Playground)              | ✅ Complete |
| 4    | FE-06   | AI provider config & chat route handler         | ✅ Complete |
| 5    | FE-07   | Tool results & structured output in UI          | ✅ Complete |
| 6    | FE-08   | Error boundary, actionable empty state, retry guard | ✅ Complete |
| 6    | FE-09   | Testing pass — Vitest, RTL, Playwright, CI      | ✅ Complete |

## Tech Stack & Prerequisites

- **Runtime**: Node.js (LTS)
- **Language**: TypeScript / JavaScript (ES6+)
- **Framework**: React (Vite for drills, Next.js for capstone)
- **Version control**: Git + GitHub
- **Editor**: Visual Studio Code
- **AI tooling**: Claude Code

## Project Structure

```
├── README.md          # This file
├── CLAUDE.md          # AI coding rules and project conventions
├── WORKFLOW.md        # Comparison write-up for FE-03 drill
├── TESTING.md         # Test documentation
├── LICENSE
├── .gitignore
├── archive/           # Week 1-2 Vanilla JS & React drills
├── components/        # Chat UI and visual components
├── lib/               # AI config, model, and tools
└── app/               # Next.js capstone application
    ├── api/chat/route.ts # AI route handler
    └── audit/         # Audit tool page
```

## Testing

Run component tests locally with:
```bash
npm test
```

Run end-to-end tests locally with:
```bash
npm run test:e2e
```
*Note: GitHub Actions CI runs the full suite automatically on every push.*

## Installation

```bash
npm install
```

## Branches

- **main** — canonical, contains shared scaffolds and documentation
- **round-1-vague** — FE-03 Round 1: settings form built from a single vague prompt
- **round-2-precise** — FE-03 Round 2: settings form built from a precise, constrained prompt with tests

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## About SiteScope AI

SiteScope AI is an advanced, AI-powered web accessibility and SEO auditor built for the FlyRank AI Capstone. 

- **Auditing engine**: Instantly scans your provided URL to extract critical performance, accessibility, and SEO heuristics (such as missing alt text, heading hierarchy issues, and metadata length constraints).
- **Intelligent interpretations**: Powered by the `@ai-sdk/google` integration (using Gemini Flash), it translates raw statistics into actionable, plain-language insights and recommendations.
- **Beautiful UI**: Designed with a sleek, dark-mode, glassmorphic aesthetic to deliver audit reports that are not only informative but visually stunning.

Feel free to paste any URL into the chat to get a comprehensive, real-time breakdown of your site's health and find out exactly what you need to fix to improve your ranking and user experience!

## AI Tools

### auditPage
- **Input:** `{ url: string }`
- **Output (success):** `{ url, title, description, h1Count, totalImages, imagesMissingAlt, checks, score }`
- **Output (failure):** `{ error: string }`
- **Purpose:** Fetches raw HTML for a given URL and extracts basic SEO/accessibility signals (title tag, meta description, heading structure, canonical, viewport, image alt-text coverage).

## Button Motion System (FE-AA1)

A live demo of a state-machine-driven button with full lifecycle animation
lives at `/demo/button` (components/demo/SendButton.tsx).

**States:** idle → hover/focus → loading → success/error → back to idle

**Duration & easing choices:**
- Hover/focus transitions use 150ms ease-out for immediate responsiveness
  and a tactile feel.
- The loading-to-success handoff uses a 200ms crossfade on opacity and
  scale rather than an instant swap, so the icon change reads as
  continuous rather than jarring.
- The error state uses a custom shake keyframe capped at 400ms total —
  long enough to register as intentional negative feedback, short enough
  not to feel punishing.
- The button uses a fixed minimum width to contain the fading text/spinner
  without triggering layout-affecting width animations (only
  transform/opacity are animated, per the compositor-friendly requirement).

**Accessibility:** Under `prefers-reduced-motion`, the shake animation and
transition durations are removed, but the visual feedback (red/green tint,
"Retry" label) still applies instantly — feedback is never silently lost,
only the motion itself is reduced.

**Forced triggers:** the demo page includes explicit "Force Success" and
"Force Error" buttons (not just the random 20% failure chance) so reviewers
can see both outcomes on demand.
