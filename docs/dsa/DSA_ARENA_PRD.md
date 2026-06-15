# DSA Arena — Product Requirements Document

## Overview
DSA Arena is a comprehensive Data Structures & Algorithms learning and assessment platform built inside Dev Resource Hub. It combines AI coaching, live coding challenges, rankings, and interview simulations into a single experience.

## Routes
- `/dsa` — Main hub with mode selection (Tutor/Assessment), stats, quick links
- `/dsa/tutor` — AI Tutor mode with concept explanations, hints, and step-by-step guidance
- `/dsa/assessment` — AI Examiner "Dave" with timed challenges and performance scoring
- `/dsa/arena` — Room Arena system with create/join rooms and live code editor
- `/dsa/leaderboard` — Global leaderboard with ranking tiers and player stats
- `/dsa/roadmaps` — Structured learning paths from beginner to advanced
- `/dsa/topics` — Browse all DSA topics with progress tracking
- `/dsa/challenges` — Practice problems with difficulty, topic, and company filters
- `/dsa/rankings` — Tier-based ranking system with player distribution

## Key Features
- **Mode Selection**: Tutor Mode for learning, Assessment Mode for interviews
- **AI Tutor**: Interactive chat with concept explanations, code examples, hints
- **AI Examiner**: Timed assessment with MCQs, coding, debugging, optimization questions
- **Room Arena**: Create/join rooms, live coding, real-time competition
- **Code Editor**: Language selector (10 languages), test cases, run/reset
- **Leaderboard & Rankings**: 8 tiers (Bronze → Legend), global/college/friends filters
- **Achievements**: 6 achievements with unlock conditions
- **Roadmaps**: 4 structured learning paths with topics, projects, timelines

## Design
- Dark theme with glassmorphism and neon gradients
- Animated UI with framer-motion
- Responsive: desktop, tablet, mobile
- Static export compatible (Next.js output: export)
