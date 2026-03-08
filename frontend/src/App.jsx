import { useState } from 'react'
import { analyzeResume } from './api/analyze'
import FileUpload from './components/FileUpload'
import LoadingSpinner from './components/LoadingSpinner'
import ReportCard from './components/ReportCard'
import DimensionBreakdown from './components/DimensionBreakdown'
import RadarChartView from './components/RadarChartView'
import InsightsPanel from './components/InsightsPanel'

export default function App() {
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (file, text) => {
    setIsLoading(true)
    setApiError('')
    setReport(null)
    try {
      const result = await analyzeResume(file, text)
      setReport(result)
    } catch (err) {
      const detail = err.response?.data?.detail
      setApiError(
        typeof detail === 'string'
          ? detail
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setReport(null)
    setApiError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          AI Readiness Analyzer
        </h1>
        <p className="text-gray-500 mt-2 text-sm max-w-lg mx-auto">
          Powered by Claude — evaluates how AI-ready a candidate is based on their resume.
        </p>
      </header>

      {!report && !isLoading && (
        <>
          <FileUpload onSubmit={handleSubmit} isLoading={isLoading} />
          {apiError && (
            <div className="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
              {apiError}
            </div>
          )}
        </>
      )}

      {isLoading && <LoadingSpinner />}

      {report && !isLoading && (
        <div className="max-w-4xl mx-auto space-y-6">
          <ReportCard report={report} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DimensionBreakdown
              scores={report.dimension_scores}
              contributions={report.weighted_dimension_contributions}
              weights={report.dimension_weights}
            />
            <RadarChartView scores={report.dimension_scores} />
          </div>

          <InsightsPanel
            strengths={report.strengths}
            gaps={report.gaps}
            suggestions={report.improvement_suggestions}
            signals={report.key_signals}
          />

          <div className="text-center pb-4">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Analyze Another Resume
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
