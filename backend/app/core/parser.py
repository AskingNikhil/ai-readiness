import fitz  # PyMuPDF


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract plain text from PDF bytes using PyMuPDF."""
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    pages = []
    for page in doc:
        pages.append(page.get_text())
    doc.close()
    return "\n".join(pages).strip()


def extract_text_from_txt(file_bytes: bytes) -> str:
    """Decode plain text bytes to string."""
    return file_bytes.decode("utf-8", errors="ignore").strip()


def parse_resume(file_bytes: bytes, content_type: str) -> str:
    """Dispatch to the correct extractor based on content type."""
    if content_type == "application/pdf":
        return extract_text_from_pdf(file_bytes)
    # text/plain and any other text formats
    return extract_text_from_txt(file_bytes)
