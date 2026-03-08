from enum import Enum
from pydantic import BaseModel, Field


class RoleType(str, Enum):
    Engineer = "Engineer"
    ProductManager = "ProductManager"
    Marketing = "Marketing"
    HR = "HR"
    Finance = "Finance"
    Operations = "Operations"
    Business = "Business"
    DataScientist = "DataScientist"


class DimensionScores(BaseModel):
    ai_awareness: float = Field(..., ge=0, le=100, description="Understanding of AI/ML tools and concepts")
    ai_adaptability: float = Field(..., ge=0, le=100, description="Learning new tech, experimentation, innovation")
    ai_application: float = Field(..., ge=0, le=100, description="Using automation/AI tools in professional work")
    ai_creation: float = Field(..., ge=0, le=100, description="Building AI/ML systems, models, or integrations")
    data_fluency: float = Field(..., ge=0, le=100, description="Working with analytics, metrics, experiments")


class LLMAnalysisResult(BaseModel):
    """Structured output returned by Claude after analyzing the resume."""
    detected_role: RoleType = Field(..., description="Primary professional role inferred from resume")
    role_confidence: float = Field(..., ge=0, le=1, description="Confidence score for role detection 0-1")
    dimension_scores: DimensionScores
    key_signals: list[str] = Field(..., description="Specific signals found in the resume (tools, practices, achievements)")
    strengths: list[str] = Field(..., description="Strong AI readiness aspects demonstrated in the resume")
    gaps: list[str] = Field(..., description="Missing or weak AI readiness aspects")
    improvement_suggestions: list[str] = Field(..., description="Concrete suggestions to improve AI readiness")
    candidate_summary: str = Field(..., description="2-3 sentence professional summary of the candidate")


class ReportResponse(BaseModel):
    """Final API response returned to the frontend."""
    overall_score: float = Field(..., ge=0, le=100)
    category: str = Field(..., description="AI Unaware / AI Curious / AI Practitioner / AI Advanced / AI Native")
    detected_role: str
    role_confidence: float
    dimension_scores: DimensionScores
    weighted_dimension_contributions: dict[str, float] = Field(
        ..., description="Each dimension's weighted contribution to the overall score"
    )
    dimension_weights: dict[str, int] = Field(
        ..., description="Weight % applied to each dimension for the detected role"
    )
    strengths: list[str]
    gaps: list[str]
    improvement_suggestions: list[str]
    candidate_summary: str
    key_signals: list[str]
