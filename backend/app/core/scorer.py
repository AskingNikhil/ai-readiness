from app.models.schemas import DimensionScores, RoleType

# Role-based weight matrix.
# Each row must sum to 1.0.
# Reflects how each dimension is weighted for different professional roles.
WEIGHT_MATRIX: dict[str, dict[str, float]] = {
    RoleType.Engineer: {
        "ai_awareness":    0.15,
        "ai_adaptability": 0.20,
        "ai_application":  0.25,
        "ai_creation":     0.30,
        "data_fluency":    0.10,
    },
    RoleType.ProductManager: {
        "ai_awareness":    0.20,
        "ai_adaptability": 0.25,
        "ai_application":  0.20,
        "ai_creation":     0.20,
        "data_fluency":    0.15,
    },
    RoleType.Marketing: {
        "ai_awareness":    0.25,
        "ai_adaptability": 0.20,
        "ai_application":  0.15,
        "ai_creation":     0.10,
        "data_fluency":    0.30,
    },
    RoleType.HR: {
        "ai_awareness":    0.20,
        "ai_adaptability": 0.25,
        "ai_application":  0.15,
        "ai_creation":     0.10,
        "data_fluency":    0.30,
    },
    RoleType.Finance: {
        "ai_awareness":    0.15,
        "ai_adaptability": 0.15,
        "ai_application":  0.20,
        "ai_creation":     0.15,
        "data_fluency":    0.35,
    },
    RoleType.Operations: {
        "ai_awareness":    0.20,
        "ai_adaptability": 0.25,
        "ai_application":  0.25,
        "ai_creation":     0.10,
        "data_fluency":    0.20,
    },
    RoleType.Business: {
        "ai_awareness":    0.25,
        "ai_adaptability": 0.20,
        "ai_application":  0.20,
        "ai_creation":     0.15,
        "data_fluency":    0.20,
    },
    RoleType.DataScientist: {
        "ai_awareness":    0.10,
        "ai_adaptability": 0.15,
        "ai_application":  0.20,
        "ai_creation":     0.35,
        "data_fluency":    0.20,
    },
}

DIMENSION_LABELS = {
    "ai_awareness":    "AI Awareness",
    "ai_adaptability": "AI Adaptability",
    "ai_application":  "AI Application",
    "ai_creation":     "AI Creation",
    "data_fluency":    "Data Fluency",
}

CATEGORY_THRESHOLDS = [
    (85, "AI Native"),
    (70, "AI Advanced"),
    (50, "AI Practitioner"),
    (30, "AI Curious"),
    (0,  "AI Unaware"),
]


def get_dimension_weights(role: RoleType) -> dict[str, float]:
    """Return weight percentages (0–100) per dimension label for a given role."""
    return {
        DIMENSION_LABELS[dim]: round(w * 100)
        for dim, w in WEIGHT_MATRIX[role].items()
    }


def compute_overall_score(scores: DimensionScores, role: RoleType) -> tuple[float, dict[str, float]]:
    """
    Compute the weighted overall AI readiness score for a given role.
    Returns (overall_score, weighted_contributions_per_dimension).
    """
    weights = WEIGHT_MATRIX[role]
    contributions: dict[str, float] = {}
    total = 0.0

    for dim, weight in weights.items():
        raw = getattr(scores, dim)
        contribution = round(raw * weight, 2)
        contributions[DIMENSION_LABELS[dim]] = contribution
        total += contribution

    return round(total, 1), contributions


def get_category(score: float) -> str:
    for threshold, label in CATEGORY_THRESHOLDS:
        if score >= threshold:
            return label
    return "AI Unaware"
