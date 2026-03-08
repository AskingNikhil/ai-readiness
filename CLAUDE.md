# AI Readiness Resume Analyzer

## Project Overview
Full-stack app that analyzes resumes for AI readiness using Claude. Scores candidates across 5 dimensions with role-adjusted weights and generates a structured report.

## Stack
- **Backend**: Python 3.13, FastAPI, PyMuPDF, Anthropic SDK (`claude-sonnet-4-6`)
- **Frontend**: React 18, Vite, Tailwind CSS v4, Recharts, Axios

## Project Structure
```
ai_readiness/
├── backend/
│   ├── main.py                  # FastAPI app entry + CORS
│   ├── requirements.txt
│   ├── .env                     # ANTHROPIC_API_KEY (never commit)
│   └── app/
│       ├── api/routes.py        # POST /api/analyze endpoint
│       ├── core/
│       │   ├── parser.py        # PDF/text extraction (PyMuPDF)
│       │   ├── analyzer.py      # Claude tool_use call → structured JSON
│       │   ├── scorer.py        # Role-weight matrix + overall score
│       │   └── reporter.py      # Assembles ReportResponse
│       └── models/schemas.py    # All Pydantic models
└── frontend/
    ├── vite.config.js           # Proxies /api → localhost:8000
    └── src/
        ├── App.jsx
        ├── api/analyze.js       # Axios POST wrapper
        └── components/
            ├── FileUpload.jsx
            ├── ReportCard.jsx
            ├── DimensionBreakdown.jsx
            ├── RadarChartView.jsx
            ├── InsightsPanel.jsx
            └── LoadingSpinner.jsx
```

## Running Locally

### Backend
```bash
cd backend
# Create .env with your key (copy from .env.example)
python -m uvicorn main:app --reload
# Runs on http://localhost:8000
# API docs at http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## Key Architecture Decisions

### Single Claude Call
One `tool_use` call to `claude-sonnet-4-6` returns all analysis as structured JSON:
- Detected role + confidence
- 5 dimension scores (0–100 each)
- Key signals, strengths, gaps, improvement suggestions

### Role-Based Scoring
`scorer.py` applies a weight matrix (8 roles × 5 dimensions) to compute the overall score.
Weights are returned in the API response as `dimension_weights` (integer %) and displayed as badges in the UI.

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

**Overall score formula:** `Σ (dimension_score × role_weight)` — e.g. an Engineer scoring 70 on AI Creation contributes 21 pts (70 × 0.30).

### Score Categories
| Score | Category |
|-------|----------|
| 85–100 | AI Native |
| 70–85 | AI Advanced |
| 50–70 | AI Practitioner |
| 30–50 | AI Curious |
| 0–30 | AI Unaware |

## API

### `POST /api/analyze`
Accepts `multipart/form-data` with either:
- `file` — PDF or .txt upload (max 10 MB)
- `resume_text` — plain text string

Returns `ReportResponse` JSON with overall score, category, dimension breakdown, strengths, gaps, and suggestions.

## Environment Variables
| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key (required) |

## Notes
- Never commit `.env` to git
- The Anthropic client is initialized at module load — restart the server after changing `.env`
- Tailwind CSS v4 uses `@import "tailwindcss"` (no config file needed)
