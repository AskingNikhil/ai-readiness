import json
import os

import anthropic
from dotenv import load_dotenv

from app.models.schemas import DimensionScores, LLMAnalysisResult, RoleType

load_dotenv()

_client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

SYSTEM_PROMPT = """You are an expert resume analyst specializing in AI readiness evaluation.

Your task is to analyze a resume and assess how prepared the individual is to work in an AI-driven environment.

IMPORTANT PRINCIPLES:
- Use semantic understanding, NOT just keyword matching.
- Infer implicit signals: e.g., Zapier/IFTTT → workflow automation capability; A/B testing → experimentation mindset; SQL analytics → data fluency; CI/CD pipelines → automation capability; Salesforce/CRM customization → AI application.
- Consider the candidate's domain — an HR professional using ATS analytics is showing AI readiness even without coding skills.
- Score each dimension on a 0–100 scale using this rubric:
  0–20:  No evidence at all
  21–40: Minimal or indirect evidence
  41–60: Some demonstrated capability, occasional use
  61–80: Clear, recurring evidence of capability
  81–100: Expert-level, extensive and varied evidence

ROLE DETECTION:
Infer the primary professional role from job titles, responsibilities, and experience. Choose the single best-fitting role from: Engineer, ProductManager, Marketing, HR, Finance, Operations, Business, DataScientist.

FIVE DIMENSIONS TO SCORE:
1. AI Awareness: Understanding of AI/ML tools, concepts, and technologies
2. AI Adaptability: Evidence of learning new technologies, experimentation, innovation, process improvement
3. AI Application: Using automation, AI tools, or data-driven systems in professional work
4. AI Creation: Building AI/ML systems, models, integrations, or AI-enabled products
5. Data Fluency: Working with analytics, experiments, metrics, or decision-support systems

Be thorough but honest — avoid inflating scores when evidence is limited."""

ANALYSIS_TOOL = {
    "name": "submit_ai_readiness_analysis",
    "description": "Submit the structured AI readiness analysis for the provided resume.",
    "input_schema": {
        "type": "object",
        "properties": {
            "detected_role": {
                "type": "string",
                "enum": ["Engineer", "ProductManager", "Marketing", "HR", "Finance", "Operations", "Business", "DataScientist"],
                "description": "Primary professional role inferred from resume"
            },
            "role_confidence": {
                "type": "number",
                "description": "Confidence in role detection, 0.0 to 1.0"
            },
            "dimension_scores": {
                "type": "object",
                "properties": {
                    "ai_awareness":    {"type": "number", "description": "Score 0-100"},
                    "ai_adaptability": {"type": "number", "description": "Score 0-100"},
                    "ai_application":  {"type": "number", "description": "Score 0-100"},
                    "ai_creation":     {"type": "number", "description": "Score 0-100"},
                    "data_fluency":    {"type": "number", "description": "Score 0-100"}
                },
                "required": ["ai_awareness", "ai_adaptability", "ai_application", "ai_creation", "data_fluency"]
            },
            "key_signals": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Specific signals found (tools, practices, achievements that indicate AI readiness)"
            },
            "strengths": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Strong AI readiness aspects demonstrated"
            },
            "gaps": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Missing or weak AI readiness aspects"
            },
            "improvement_suggestions": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Concrete, actionable suggestions to improve AI readiness"
            },
            "candidate_summary": {
                "type": "string",
                "description": "2-3 sentence professional profile of the candidate"
            }
        },
        "required": [
            "detected_role", "role_confidence", "dimension_scores",
            "key_signals", "strengths", "gaps", "improvement_suggestions", "candidate_summary"
        ]
    }
}


def analyze(resume_text: str) -> LLMAnalysisResult:
    """Send resume text to Claude and return structured AI readiness analysis."""
    user_prompt = f"""Please analyze the following resume and evaluate the candidate's AI readiness across all five dimensions.

<resume_text>
{resume_text}
</resume_text>

Analyze the resume carefully. Identify both explicit and implicit signals of AI readiness. Score each dimension 0-100 based on the evidence. Provide specific, honest observations."""

    response = _client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        tools=[ANALYSIS_TOOL],
        tool_choice={"type": "any"},
        messages=[{"role": "user", "content": user_prompt}],
    )

    # Extract tool use result
    tool_use_block = next(b for b in response.content if b.type == "tool_use")
    data = tool_use_block.input

    return LLMAnalysisResult(
        detected_role=RoleType(data["detected_role"]),
        role_confidence=float(data["role_confidence"]),
        dimension_scores=DimensionScores(**data["dimension_scores"]),
        key_signals=data["key_signals"],
        strengths=data["strengths"],
        gaps=data["gaps"],
        improvement_suggestions=data["improvement_suggestions"],
        candidate_summary=data["candidate_summary"],
    )
