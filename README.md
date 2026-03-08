<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 200" width="900" height="200">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1a0c"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <linearGradient id="acc5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4ade80"/>
      <stop offset="100%" style="stop-color:#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="900" height="200" fill="url(#bg5)" rx="12"/>
  <!-- Pipeline stages -->
  <rect x="660" y="60" width="50" height="30" rx="4" fill="#4ade8020" stroke="#4ade8050" stroke-width="1"/>
  <text x="685" y="79" font-family="monospace" font-size="8" fill="#4ade80" text-anchor="middle">Discover</text>
  <line x1="710" y1="75" x2="720" y2="75" stroke="#4ade8050" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="720" y="60" width="46" height="30" rx="4" fill="#22d3ee20" stroke="#22d3ee50" stroke-width="1"/>
  <text x="743" y="79" font-family="monospace" font-size="8" fill="#22d3ee" text-anchor="middle">Score</text>
  <line x1="766" y1="75" x2="776" y2="75" stroke="#22d3ee50" stroke-width="1.5"/>
  <rect x="776" y="60" width="44" height="30" rx="4" fill="#a78bfa20" stroke="#a78bfa50" stroke-width="1"/>
  <text x="798" y="79" font-family="monospace" font-size="8" fill="#a78bfa" text-anchor="middle">Tailor</text>
  <line x1="820" y1="75" x2="830" y2="75" stroke="#a78bfa50" stroke-width="1.5"/>
  <rect x="830" y="60" width="44" height="30" rx="4" fill="#f472b620" stroke="#f472b650" stroke-width="1"/>
  <text x="852" y="79" font-family="monospace" font-size="8" fill="#f472b6" text-anchor="middle">Apply</text>
  <!-- Checkmarks -->
  <text x="685" y="118" font-family="monospace" font-size="10" fill="#4ade80" text-anchor="middle">✓ Indeed</text>
  <text x="685" y="133" font-family="monospace" font-size="10" fill="#4ade80" text-anchor="middle">✓ LinkedIn</text>
  <text x="685" y="148" font-family="monospace" font-size="10" fill="#4ade80" text-anchor="middle">✓ Glassdoor</text>
  <text x="800" y="118" font-family="monospace" font-size="10" fill="#22d3ee" text-anchor="middle">✓ Auto-fill</text>
  <text x="800" y="133" font-family="monospace" font-size="10" fill="#22d3ee" text-anchor="middle">✓ Submit</text>
  <text x="800" y="148" font-family="monospace" font-size="10" fill="#22d3ee" text-anchor="middle">✓ Track</text>
  <!-- Title -->
  <text x="50" y="95" font-family="'Courier New', monospace" font-size="42" font-weight="bold" fill="url(#acc5)">ApplyPilot</text>
  <text x="50" y="133" font-family="monospace" font-size="14" fill="#6b7280">Agentic AI · Autonomous Job Applier · Multi-board</text>
</svg>

# ApplyPilot

> **Agentic AI-powered autonomous job application system — from job discovery to form submission, hands-free**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Agentic AI](https://img.shields.io/badge/Agentic-AI-7C3AED?style=flat-square&logo=openai&logoColor=white)]()
[![Automation](https://img.shields.io/badge/Browser-Automation-FF6B35?style=flat-square)]()
[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=flat-square)]()

</div>

---

## Overview

**ApplyPilot** is an agentic AI pipeline that automates the entire job application process — from discovering relevant job postings across multiple boards, to scoring fit with your resume, tailoring application materials, and autonomously filling and submitting application forms.

It's designed for the modern job seeker: intelligent enough to filter, personalize, and apply — so you focus on interviews, not forms.

---

## Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│                          ApplyPilot Pipeline                          │
│                                                                       │
│  Stage 1          Stage 2          Stage 3        Stage 4             │
│  ┌──────────┐    ┌────────────┐     ┌──────────┐    ┌──────────────┐  │
│  │  Job     │───▶│  AI        │───▶│  Resume  │──▶│  Autonomous  │  │
│  │ Discovery│    │  Scoring   │     │  Tailor  │    │  Form Submit │  │
│  │          │    │  1-10      │     │  per Job │    │              │  │
│  │ 5 Boards │    │  + Filter  │     │+ Cover   │    │ Playwright / │  │
│  │ +Workday │    │  Threshold │     │  Letter  │    │  Puppeteer   │  │
│  └──────────┘    └────────────┘     └──────────┘    └──────────────┘  │
│                                                                       │
│  Boards: Indeed · LinkedIn · Glassdoor · ZipRecruiter · Google Jobs   │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Key Features

- **Multi-board Job Discovery** — Scrapes 5 major job boards + 48 Workday portals
- **AI Fit Scoring** — Rates each job 1–10 against your resume and preferences
- **Resume Tailoring** — Automatically rewrites your resume per job (no fabrication)
- **Cover Letter Generation** — Produces personalized, role-specific cover letters
- **Autonomous Form Filling** — AI agent navigates application forms and submits
- **Parallel Execution** — Multi-threaded discovery and multi-browser apply
- **Dashboard** — HTML results dashboard to track all applications

---

## Pipeline Commands

```bash
# Install
pip install applypilot

# First-time setup (resume, preferences, API keys)
applypilot init

# Verify setup
applypilot doctor

# Run full discovery + scoring + tailoring pipeline
applypilot run

# Launch autonomous application submission
applypilot apply

# Run in parallel (faster)
applypilot run --workers 4
applypilot apply --workers 3

# Preview without submitting
applypilot apply --dry-run

# View application dashboard
applypilot dashboard
```

---

## Tech Stack

| Category | Tools |
|---|---|
| Language | JavaScript / Node.js |
| AI Engine | Google Gemini / OpenAI GPT |
| Browser Automation | Playwright / Puppeteer |
| Job Scraping | python-jobspy |
| Resume Processing | pdf-parse, docx |
| CLI | Commander.js |

---

## Project Structure

```
ApplyPilot/
├── src/
│  ├── assets/          # Static assets
│  ├── components/      # Reusable UI components
│  ├── context/         # React Context (AppContext for state/auth)
│  ├── pages/           # Application pages (Dashboards, Forms, Auth)
│  │   ├── WelcomePage.jsx
│  │   ├── LoginPage.jsx
│  │   ├── JobSeekerDashboardPage.jsx
│  │   ├── RecruiterDashboardPage.jsx
│  │   └── ...
│  └── utils/           # Utility functions
├──── App.jsx          # Main application component with Routing
├──── main.jsx         # Entry point
├── package.json
└── README.md
```

---

## Configuration

```json
{
  "jobTitle": "Data Scientist",
  "location": "Remote",
  "minScore": 7,
  "skills": ["Python", "ML", "SQL"],
  "resume": "./resume.pdf",
  "apiKey": "your-gemini-key"
}
```

---

## Author

**Akshat C. Kulkarni**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/akshatckulkarni)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)](https://github.com/Akshat-C-Kulkarni)

---

<div align="center"><sub>Built with JavaScript · Node.js · Agentic AI · Browser Automation</sub></div>
