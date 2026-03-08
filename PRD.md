# Product Requirements Document
## AI Readiness Resume Analyzer

**Version:** 1.0
**Status:** In Development
**Owner:** ClaudeMaster
**Last Updated:** March 2026

---

## 1. Overview

### 1.1 Product Summary
The AI Readiness Resume Analyzer is a web-based tool that evaluates how prepared a professional is to work in an AI-driven environment, based solely on their resume. It accepts a PDF or plain-text resume and returns a structured AI Readiness Report — including an overall score, a five-dimension breakdown, role-calibrated weights, and actionable insights.

### 1.2 Problem Statement
Organizations are accelerating AI adoption across every function, yet there is no standardized, role-neutral way to assess a candidate's AI readiness from a resume. Existing screening methods rely on keyword matching (e.g., "ChatGPT", "Python") which fails to capture implicit signals of AI readiness — such as workflow automation, data-driven decision making, or a track record of technology adoption. This results in:

- Hiring teams undervaluing strong AI-ready candidates who don't use buzzwords
- Candidates lacking structured feedback on where they stand
- L&D teams unable to baseline workforce AI readiness consistently

### 1.3 Opportunity
A semantic, role-calibrated AI readiness assessment tool can serve multiple use cases across the talent lifecycle — from hiring to upskilling — by surfacing structured, evidence-based signals that traditional resume review misses.

---

## 2. Goals & Success Metrics

### 2.1 Product Goals
| Goal | Description |
|------|-------------|
| **Accuracy** | Scores reflect actual AI readiness, not just keyword frequency |
| **Role relevance** | Scores are calibrated to what matters for each professional role |
| **Speed** | Full analysis completed in under 30 seconds |
| **Actionability** | Output gives candidates and reviewers clear next steps |
| **Extensibility** | Easy to add new roles, dimensions, or scoring logic |

### 2.2 Success Metrics (v1.0)
| Metric | Target |
|--------|--------|
| Analysis completion time | < 30 seconds per resume |
| Role detection accuracy | > 85% correct role classification |
| User-rated score accuracy | > 75% of users find score "accurate" or "mostly accurate" |
| Improvement suggestion usefulness | > 70% of users find suggestions "actionable" |
| Error rate (500s) | < 1% of requests |

---

## 3. User Personas

### Persona 1 — Recruiter / Hiring Manager
**Name:** Priya, Senior Talent Acquisition Manager
**Context:** Screens 50–100 resumes per open role. Wants to quickly identify AI-forward candidates without manually reading every resume.
**Needs:** Fast, structured signal on AI readiness; results she can share with hiring panels
**Pain point:** Can't tell from a resume whether a candidate actually uses AI in their work

### Persona 2 — HR / L&D Leader
**Name:** Marcus, Head of Learning & Development
**Context:** Responsible for upskilling a 200-person organization. Needs to identify AI skill gaps across teams.
**Needs:** Consistent, role-calibrated baseline scores; gap analysis to design training programs
**Pain point:** No standard way to measure AI readiness across diverse functions

### Persona 3 — Job Seeker / Candidate
**Name:** Aisha, Marketing Manager with 8 years of experience
**Context:** Applying to AI-forward companies. Unsure if her resume signals enough AI readiness.
**Needs:** A clear score, specific gaps, and concrete suggestions to improve before applying
**Pain point:** No benchmark to understand where she stands

### Persona 4 — Business Leader
**Name:** David, VP of Operations
**Context:** Building out a team and wants to ensure new hires can work in an AI-augmented environment.
**Needs:** Quick pre-screening signal on AI readiness before committing to interviews
**Pain point:** AI readiness isn't captured in traditional job assessments

---

## 4. Scope

### 4.1 In Scope (v1.0)
- Resume input via PDF upload or plain text paste
- LLM-based semantic analysis (Claude claude-sonnet-4-6)
- Role detection across 8 professional categories
- 5-dimension scoring with role-adjusted weights
- Overall AI Readiness Score (0–100) and category
- Strengths, gaps, and improvement suggestions
- Key signals detected from resume
- Radar chart and dimension breakdown visualization
- React-based web frontend
- FastAPI backend with REST API

### 4.2 Out of Scope (v1.0)
- User authentication / accounts
- Resume history or longitudinal tracking
- Bulk / batch resume processing
- ATS integrations (Greenhouse, Lever, Workday)
- PDF report export
- Multi-language resume support
- Mobile-native app
- Custom weight configuration by organization

---

## 5. Functional Requirements

### 5.1 Resume Input

| ID | Requirement | Priority |
|----|-------------|----------|
| F-01 | System shall accept PDF files up to 10 MB | P0 |
| F-02 | System shall accept plain text input via paste | P0 |
| F-03 | System shall extract readable text from PDF using PyMuPDF | P0 |
| F-04 | System shall reject unsupported file types with a clear error message | P0 |
| F-05 | System shall reject resumes shorter than 50 characters | P0 |
| F-06 | Upload UI shall support drag-and-drop and file browser selection | P1 |

### 5.2 Analysis Engine

| ID | Requirement | Priority |
|----|-------------|----------|
| F-07 | System shall use Claude claude-sonnet-4-6 via tool_use for structured output | P0 |
| F-08 | System shall detect the primary professional role from the resume | P0 |
| F-09 | System shall score 5 dimensions on a 0–100 scale | P0 |
| F-10 | System shall use semantic reasoning, not keyword matching alone | P0 |
| F-11 | System shall infer implicit signals (e.g., Zapier → automation, A/B testing → experimentation) | P0 |
| F-12 | System shall return a role confidence score (0–1) | P1 |
| F-13 | Analysis shall complete within 30 seconds under normal conditions | P0 |

### 5.3 Scoring Engine

| ID | Requirement | Priority |
|----|-------------|----------|
| F-14 | System shall apply role-specific weights to compute an overall score | P0 |
| F-15 | Overall score shall be computed as Σ(dimension_score × role_weight) | P0 |
| F-16 | Weight matrix shall cover 8 professional roles × 5 dimensions | P0 |
| F-17 | All weights per role shall sum to 100% | P0 |
| F-18 | System shall assign a readiness category based on overall score | P0 |
| F-19 | Dimension weights for the detected role shall be included in the API response | P1 |

### 5.4 Report Output

| ID | Requirement | Priority |
|----|-------------|----------|
| F-20 | Report shall include overall score, category, detected role, and role confidence | P0 |
| F-21 | Report shall include scores for all 5 dimensions | P0 |
| F-22 | Report shall include role-adjusted weights per dimension | P0 |
| F-23 | Report shall include weighted score contribution per dimension | P1 |
| F-24 | Report shall include at least 2 strengths, 2 gaps, and 2 improvement suggestions | P0 |
| F-25 | Report shall include a 2–3 sentence candidate summary | P1 |
| F-26 | Report shall include key signals detected from the resume | P1 |

### 5.5 Frontend UI

| ID | Requirement | Priority |
|----|-------------|----------|
| F-27 | UI shall display overall score prominently with category badge | P0 |
| F-28 | UI shall display a radar chart of the 5 dimension scores | P0 |
| F-29 | UI shall display a dimension breakdown with progress bars | P0 |
| F-30 | UI shall display role-adjusted weight badges per dimension | P1 |
| F-31 | UI shall display strengths, gaps, and suggestions in collapsible sections | P0 |
| F-32 | UI shall display a loading state while analysis is running | P0 |
| F-33 | UI shall display clear error messages on failure | P0 |
| F-34 | UI shall allow user to analyze another resume without page refresh | P1 |
| F-35 | UI shall be responsive on desktop and tablet | P1 |

---

## 6. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NF-01 | API response time (p95) | < 30 seconds |
| NF-02 | Frontend load time | < 2 seconds |
| NF-03 | API error rate | < 1% |
| NF-04 | CORS configured for frontend origin | Required |
| NF-05 | API key stored in environment variable, never in code | Required |
| NF-06 | File size limit enforced server-side | 10 MB max |
| NF-07 | Graceful error handling with user-friendly messages | Required |

---

## 7. AI Readiness Dimensions

### Dimension Definitions

| Dimension | Definition | Example Signals |
|-----------|-----------|-----------------|
| **AI Awareness** | Understanding of AI/ML tools, concepts, or technologies | Mentions GPT, LLMs, ML concepts; follows AI trends |
| **AI Adaptability** | Learning new technologies, innovation, experimentation | Adopted new tools quickly, led process improvement, ran pilots |
| **AI Application** | Using automation, AI tools, or data-driven systems in work | Used Zapier, ChatGPT, Salesforce AI, automated workflows |
| **AI Creation** | Building AI/ML systems, models, integrations, or AI products | Trained models, built APIs, developed ML pipelines |
| **Data Fluency** | Working with analytics, experiments, metrics, decision systems | A/B testing, dashboards, SQL, KPIs, data-driven decisions |

### Scoring Rubric (per dimension)

| Score Range | Evidence Level |
|-------------|---------------|
| 0–20 | No evidence at all |
| 21–40 | Minimal or indirect evidence |
| 41–60 | Some demonstrated capability, occasional use |
| 61–80 | Clear, recurring evidence of capability |
| 81–100 | Expert-level, extensive and varied evidence |

---

## 8. Role-Based Weight Matrix

Weights reflect how important each dimension is for a given professional role. All weights sum to 100% per role.

| Role | AI Awareness | AI Adaptability | AI Application | AI Creation | Data Fluency |
|------|:---:|:---:|:---:|:---:|:---:|
| Engineer | 15% | 20% | 25% | **30%** | 10% |
| Product Manager | 20% | **25%** | 20% | 20% | 15% |
| Marketing | **25%** | 20% | 15% | 10% | **30%** |
| HR / Recruiter | 20% | **25%** | 15% | 10% | **30%** |
| Finance | 15% | 15% | 20% | 15% | **35%** |
| Operations | 20% | **25%** | **25%** | 10% | 20% |
| Business / Sales | **25%** | 20% | 20% | 15% | 20% |
| Data Scientist | 10% | 15% | 20% | **35%** | 20% |

---

## 9. Readiness Categories

| Score Range | Category | Description |
|-------------|----------|-------------|
| 85–100 | **AI Native** | Deep AI integration in work; capable of building or leading AI-driven systems |
| 70–85 | **AI Advanced** | Strong ability to integrate AI into workflows and build AI-enabled systems |
| 50–70 | **AI Practitioner** | Uses AI tools or automation in workflows; demonstrates data-driven work |
| 30–50 | **AI Curious** | Some exposure to AI tools or concepts; limited real-world application |
| 0–30 | **AI Unaware** | Little to no evidence of AI awareness or usage in professional work |

---

## 10. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                    │
│  FileUpload → API Call → Report Dashboard                │
└───────────────────────┬─────────────────────────────────┘
                        │ POST /api/analyze (multipart)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend (FastAPI)                      │
│                                                          │
│  ┌─────────┐   ┌──────────┐   ┌────────┐   ┌────────┐  │
│  │  Parser │ → │ Analyzer │ → │ Scorer │ → │Reporter│  │
│  │(PyMuPDF)│   │ (Claude) │   │(Matrix)│   │        │  │
│  └─────────┘   └──────────┘   └────────┘   └────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
              Anthropic API (claude-sonnet-4-6)
```

### Component Responsibilities

| Component | File | Responsibility |
|-----------|------|----------------|
| Parser | `core/parser.py` | Extract text from PDF or plain text |
| Analyzer | `core/analyzer.py` | Single Claude tool_use call → structured JSON |
| Scorer | `core/scorer.py` | Apply role weight matrix, compute overall score |
| Reporter | `core/reporter.py` | Assemble final ReportResponse |
| Schemas | `models/schemas.py` | Pydantic data contracts for all I/O |
| Routes | `api/routes.py` | FastAPI endpoint, validation, error handling |

---

## 11. API Contract

### `POST /api/analyze`

**Request:** `multipart/form-data`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Conditional | PDF or .txt resume (max 10 MB) |
| `resume_text` | string | Conditional | Plain text resume |

One of `file` or `resume_text` must be provided.

**Response:** `200 OK`
```json
{
  "overall_score": 72.5,
  "category": "AI Advanced",
  "detected_role": "Engineer",
  "role_confidence": 0.92,
  "dimension_scores": {
    "ai_awareness": 78,
    "ai_adaptability": 80,
    "ai_application": 85,
    "ai_creation": 65,
    "data_fluency": 60
  },
  "dimension_weights": {
    "AI Awareness": 15,
    "AI Adaptability": 20,
    "AI Application": 25,
    "AI Creation": 30,
    "Data Fluency": 10
  },
  "weighted_dimension_contributions": {
    "AI Awareness": 11.7,
    "AI Adaptability": 16.0,
    "AI Application": 21.25,
    "AI Creation": 19.5,
    "Data Fluency": 6.0
  },
  "strengths": ["..."],
  "gaps": ["..."],
  "improvement_suggestions": ["..."],
  "candidate_summary": "...",
  "key_signals": ["..."]
}
```

**Error Responses:**
| Code | Condition |
|------|-----------|
| 422 | No file or text provided; text too short |
| 413 | File exceeds 10 MB |
| 415 | Unsupported file type |
| 500 | Analysis failure (LLM or internal error) |

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Claude API latency spike | Medium | High | Set max_tokens conservatively; show loading state |
| Incorrect role detection | Medium | Medium | Return confidence score; allow future manual override |
| Score inflation / deflation bias | Medium | High | Explicit scoring rubric in system prompt; test with diverse resumes |
| API key exposure | Low | Critical | Stored in `.env`, never committed; rotate if exposed |
| PDF parsing failure (scanned/image PDFs) | Medium | Medium | Return clear error; suggest text paste fallback |
| Anthropic rate limits | Low | Medium | Implement retry with exponential backoff in v1.1 |

---

## 13. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Should role detection be user-overridable? (e.g., user says "I'm a PM" even if Claude detects Engineer) | PM | Open |
| 2 | What's the right minimum resume length threshold? (currently 50 chars) | PM / Eng | Open |
| 3 | Should scores be calibrated against a benchmark population? | PM / Data | Future |
| 4 | Is a "hybrid role" weight (e.g., 60% Engineer + 40% PM) needed? | PM | Future |
| 5 | Should we log anonymized scores for aggregate analytics? | PM / Legal | Open |

---

## 14. Future Roadmap

### v1.1
- Retry logic for Anthropic API rate limits
- Better error messaging for image-only PDFs
- Manual role override option in UI

### v1.2
- User accounts and resume history
- PDF report export
- "Compare to peers" benchmark score

### v2.0
- Batch resume upload and comparison
- ATS integration (Greenhouse, Lever)
- Team / org-level AI readiness dashboard
- Custom weight configuration per organization
- Interview question generator based on gaps

---

*Document Owner: ClaudeMaster · Built with Claude (Anthropic) · React · FastAPI*
