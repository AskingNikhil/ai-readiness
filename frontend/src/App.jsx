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
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
      {/* Navbar */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #ebecee', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(180deg, #ee2c3c 0%, #da202f 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>AI</span>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#212835', letterSpacing: '-0.3px' }}>
              AI Readiness Analyzer
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#586274', fontWeight: '500' }}>
            Powered by Claude
          </span>
        </div>
      </header>

      {/* Hero banner */}
      {!report && !isLoading && (
        <div style={{ background: 'linear-gradient(135deg, #212835 0%, #2e3a50 100%)', padding: '48px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#ee2c3c', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Resume Intelligence
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#fff', margin: '0 0 12px', lineHeight: '1.2' }}>
            Discover Your AI Readiness Score
          </h1>
          <p style={{ fontSize: '15px', color: '#a0aab8', maxWidth: '520px', margin: '0 auto', lineHeight: '1.6' }}>
            Upload your resume and get a role-calibrated AI readiness assessment across 5 dimensions — in under 30 seconds.
          </p>
        </div>
      )}

      {/* Main content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {!report && !isLoading && (
          <>
            <FileUpload onSubmit={handleSubmit} isLoading={isLoading} />
            {apiError && (
              <div style={{ marginTop: '16px', maxWidth: '640px', margin: '16px auto 0', backgroundColor: '#fff5f5', border: '1px solid #fcd5d8', borderRadius: '8px', padding: '14px 18px', fontSize: '14px', color: '#be2330' }}>
                {apiError}
              </div>
            )}
          </>
        )}

        {isLoading && <LoadingSpinner />}

        {report && !isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ReportCard report={report} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
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

            <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
              <button
                onClick={handleReset}
                style={{ padding: '10px 28px', borderRadius: '6px', border: '1.5px solid #bfbfbf', backgroundColor: '#fff', color: '#586274', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.target.style.borderColor = '#ee2c3c'}
                onMouseLeave={e => e.target.style.borderColor = '#bfbfbf'}
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #ebecee', backgroundColor: '#fff', padding: '20px 24px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '12px', color: '#586274', margin: 0 }}>
          AI Readiness Analyzer · Built with Claude (Anthropic) · React · FastAPI
        </p>
      </footer>
    </div>
  )
}
