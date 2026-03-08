from app.models.schemas import LLMAnalysisResult, ReportResponse
from app.core.scorer import compute_overall_score, get_category, get_dimension_weights


def build_report(analysis: LLMAnalysisResult) -> ReportResponse:
    """Combine LLM analysis and scoring into the final API response."""
    overall_score, weighted_contributions = compute_overall_score(
        analysis.dimension_scores, analysis.detected_role
    )

    return ReportResponse(
        overall_score=overall_score,
        category=get_category(overall_score),
        detected_role=analysis.detected_role.value,
        role_confidence=analysis.role_confidence,
        dimension_scores=analysis.dimension_scores,
        weighted_dimension_contributions=weighted_contributions,
        dimension_weights=get_dimension_weights(analysis.detected_role),
        strengths=analysis.strengths,
        gaps=analysis.gaps,
        improvement_suggestions=analysis.improvement_suggestions,
        candidate_summary=analysis.candidate_summary,
        key_signals=analysis.key_signals,
    )
