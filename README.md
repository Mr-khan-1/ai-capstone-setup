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
├── index.html         # Vanilla JS settings form (Week 2 baseline)
├── script.js
├── styles.css
└── drill/             # React + TypeScript sandbox (Week 2 drill)
```

## Installation

```bash
npm install
```

## Branches

- **main** — canonical, contains shared scaffolds and documentation
- **round-1-vague** — FE-03 Round 1: settings form built from a single vague prompt
- **round-2-precise** — FE-03 Round 2: settings form built from a precise, constrained prompt with tests