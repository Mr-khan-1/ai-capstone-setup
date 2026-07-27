# AI Development Capstone

## Overview

This repository is part of the **FlyRank Frontend AI Engineering Internship**. It tracks weekly deliverables across a multi-week capstone arc, starting with environment setup (FE-01) and progressing through AI-assisted workflow drills (FE-03), and eventually into a full Next.js/React capstone application.

The goal is to learn how to work effectively with AI coding tools (Claude Code / Cursor) while building production-quality frontend features — and to document what works, what breaks, and what conventions emerge along the way.

## Weekly Milestones

| Week | Code    | Deliverable                                   | Status      |
|------|---------|-----------------------------------------------|-------------|
| 1    | FE-01   | Environment & AI toolchain setup              | ✅ Complete |
| 2    | FE-03   | AI-assisted workflow drill (vague vs precise)  | 🔄 Active  |
| 3    | FE-04   | Capstone scaffold (Next.js/React)             | ⬜ Upcoming |

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
