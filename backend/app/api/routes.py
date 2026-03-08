from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from app.core.analyzer import analyze
from app.core.parser import parse_resume
from app.core.reporter import build_report
from app.models.schemas import ReportResponse

router = APIRouter()

ALLOWED_CONTENT_TYPES = {"application/pdf", "text/plain"}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB


@router.post("/api/analyze", response_model=ReportResponse)
async def analyze_resume(
    file: UploadFile | None = File(default=None),
    resume_text: str | None = Form(default=None),
):
    """
    Analyze a resume for AI readiness.
    Accepts either a PDF/text file upload OR raw pasted text, not both.
    """
    if file is None and not resume_text:
        raise HTTPException(
            status_code=422,
            detail="Provide either a file upload (PDF or .txt) or paste resume text.",
        )

    if file is not None:
        if file.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=415,
                detail=f"Unsupported file type '{file.content_type}'. Upload a PDF or plain text file.",
            )
        file_bytes = await file.read()
        if len(file_bytes) > MAX_FILE_SIZE_BYTES:
            raise HTTPException(status_code=413, detail="File too large. Maximum size is 10 MB.")
        text = parse_resume(file_bytes, file.content_type)
    else:
        text = resume_text.strip()

    if len(text) < 50:
        raise HTTPException(
            status_code=422,
            detail="Resume text is too short to analyze. Please provide a complete resume.",
        )

    analysis = analyze(text)
    report = build_report(analysis)
    return report
