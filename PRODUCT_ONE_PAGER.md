# AI Readiness Resume Analyzer — Product One Pager

**Product:** AI Readiness Resume Analyzer
**Owner:** ClaudeMaster
**Date:** March 2026
**Status:** v1.0 — Live

---

## The Problem

Organizations are rapidly integrating AI into every function — engineering, marketing, HR, finance, and operations. Yet hiring decisions are still made without a structured way to assess whether a candidate can operate effectively in an AI-driven environment.

The challenge is two-fold:

1. **For hiring teams:** Traditional resume screening misses AI readiness signals. A marketer who runs A/B experiments and automates campaigns with AI tools is far more ready than one who isn't — but this rarely surfaces in a standard resume review.

2. **For candidates:** There is no standard, role-neutral definition of "AI readiness." An engineer and an HR manager require fundamentally different AI skills, yet both need to function in AI-augmented workplaces.

The result: companies hire for past experience, not future capability — and candidates have no structured way to benchmark themselves.

---

## The Idea

**AI Readiness Resume Analyzer** is a tool that takes any resume — from any domain — and produces a structured, role-calibrated AI readiness report in under 30 seconds.

It moves beyond keyword matching ("does the resume say ChatGPT?") to semantic understanding — inferring capability from how a person has worked, not just what tools they've listed.

---

## Who Is It For?

| User | Use Case |
|------|----------|
| **Recruiters / Hiring Managers** | Quickly assess AI readiness of applicants before interviews |
| **HR / L&D Teams** | Identify skill gaps across the workforce for upskilling programs |
| **Candidates** | Self-assess and understand where to improve before applying |
| **Business Leaders** | Benchmark team AI readiness across departments |

---

## What It Does

The tool accepts a resume (PDF or text) and returns a structured **AI Readiness Report** with:

- **Overall AI Readiness Score** (0–100)
- **Readiness Category** — AI Unaware / Curious / Practitioner / Advanced / Native
- **5 Dimension Scores** — each scored 0–100
- **Role-Adjusted Weights** — scores are weighted differently depending on the detected professional role
- **Strengths & Gaps** — specific, evidence-based observations
- **Improvement Suggestions** — actionable next steps

---

## The Five Dimensions

| Dimension | What It Measures |
|-----------|-----------------|
| **AI Awareness** | Understanding of AI/ML concepts, tools, and trends |
| **AI Adaptability** | Evidence of learning new technology, experimentation, process innovation |
| **AI Application** | Use of AI tools, automation, or data-driven systems in actual work |
| **AI Creation** | Building AI/ML systems, models, integrations, or AI-enabled products |
| **Data Fluency** | Working with analytics, metrics, A/B experiments, or decision systems |

---

## Why Role-Adjusted Scoring Matters

A one-size-fits-all score is meaningless. An HR manager who uses AI for talent analytics and recruitment automation is highly AI-ready for their role — even if they've never trained a model. Penalizing them on "AI Creation" would produce a misleading score.

The system detects the candidate's professional role and applies a role-specific weight matrix:

| Role | Highest-Weighted Dimension | Rationale |
|------|---------------------------|-----------|
| Engineer | AI Creation (30%) | Building AI systems is the primary value-add |
| Product Manager | AI Adaptability (25%) | Integrating AI into products requires learning agility |
| Marketing | Data Fluency + AI Awareness (30%/25%) | Data-driven campaigns and AI tool usage are critical |
| HR / Recruiter | Data Fluency + AI Adaptability (30%/25%) | Analytics-driven hiring and process innovation |
| Finance | Data Fluency (35%) | Forecasting, modeling, and automation are core |
| Operations | Adaptability + Application (25%/25%) | Process optimization and automation drive value |
| Business / Sales | AI Awareness (25%) | Understanding AI to position and sell effectively |
| Data Scientist | AI Creation (35%) | Model building is the primary skill |

This means the same resume produces a different score depending on the role — which is by design.

---

## How It Works (Implementation Summary)

```
Resume (PDF / Text)
        ↓
  Text Extraction (PyMuPDF)
        ↓
  Semantic Analysis (Claude claude-sonnet-4-6)
  — Role detection
  — 5 dimension scores (0–100 each)
  — Signal extraction (explicit + implicit)
  — Strengths, gaps, suggestions
        ↓
  Role-Based Scoring Engine
  — Applies weight matrix
  — Computes weighted overall score
        ↓
  AI Readiness Report (JSON → React UI)
```

**Key design principle:** The system uses LLM-based semantic reasoning, not keyword matching. A candidate who "optimized supply chain workflows using automated tracking dashboards" scores on AI Application even without mentioning "AI" explicitly.

**Tech Stack:** Python (FastAPI) + Claude API (backend) · React + Vite + Recharts (frontend)

---

## Scoring Rubric

| Score | Category | What It Means |
|-------|----------|---------------|
| 85–100 | AI Native | Deep AI integration; capable of leading AI-driven work |
| 70–85 | AI Advanced | Strong ability to integrate AI into workflows and systems |
| 50–70 | AI Practitioner | Uses AI tools and data-driven approaches regularly |
| 30–50 | AI Curious | Some exposure; limited real-world AI application |
| 0–30 | AI Unaware | Little to no evidence of AI awareness or usage |

---

## What Makes This Different

| Traditional Resume Screening | AI Readiness Analyzer |
|-----------------------------|----------------------|
| Keyword search ("Python", "ChatGPT") | Semantic inference of capability |
| Role-agnostic | Role-calibrated scoring |
| Binary (has skill / doesn't) | Graduated 0–100 scoring per dimension |
| No structured output | Structured report with evidence |
| Slow, manual | < 30 seconds, automated |

---

## Current State & Limitations

**What's working:**
- PDF and text resume input
- Claude-powered semantic analysis
- Role detection across 8 professional categories
- 5-dimension scoring with role-adjusted weights
- React dashboard with radar chart, dimension breakdown, and insights

**Known limitations:**
- Role detection limited to 8 categories (no hybrid/cross-functional roles yet)
- No candidate history or longitudinal tracking
- No bulk processing / batch upload
- No authentication or user accounts

---

## Potential Next Steps

1. **Batch analysis** — upload multiple resumes, compare candidates side-by-side
2. **Candidate profiles** — save and track readiness over time
3. **ATS integration** — plug into existing hiring workflows (Greenhouse, Lever)
4. **Team dashboard** — benchmark AI readiness across a department or org
5. **Custom weight configuration** — allow companies to define their own dimension weights per role
6. **Interview question generator** — auto-generate targeted questions based on gaps

---

*Built with Claude (Anthropic) · React · FastAPI*
