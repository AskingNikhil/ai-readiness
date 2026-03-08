import axios from 'axios'

/**
 * Analyze a resume for AI readiness.
 * @param {File|null} file - PDF or text file (optional)
 * @param {string|null} resumeText - Pasted plain text (optional)
 * @returns {Promise<object>} ReportResponse
 */
export async function analyzeResume(file, resumeText) {
  const formData = new FormData()
  if (file) {
    formData.append('file', file)
  } else if (resumeText) {
    formData.append('resume_text', resumeText)
  }

  const response = await axios.post('/api/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}
