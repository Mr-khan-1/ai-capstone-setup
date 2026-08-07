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
| 6    | FE-08   | Future capstone enhancements                    | ⬜ Upcoming |

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
└── app/               # Next.js capstone application
```

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
