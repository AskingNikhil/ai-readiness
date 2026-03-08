const DIMENSIONS = [
  { key: 'ai_awareness',    label: 'AI Awareness',     description: 'Understanding of AI/ML concepts and tools' },
  { key: 'ai_adaptability', label: 'AI Adaptability',  description: 'Learning new tech, experimentation, innovation' },
  { key: 'ai_application',  label: 'AI Application',   description: 'Using AI/automation tools in professional work' },
  { key: 'ai_creation',     label: 'AI Creation',      description: 'Building AI/ML systems, models, or integrations' },
  { key: 'data_fluency',    label: 'Data Fluency',     description: 'Working with analytics, metrics, experiments' },
]

function barColor(score) {
  if (score >= 75) return '#0a9044'
  if (score >= 55) return '#ee2c3c'
  if (score >= 35) return '#c4811d'
  return '#bfbfbf'
}

export default function DimensionBreakdown({ scores, contributions, weights }) {
  return (
    <div className="ug-card" style={{ padding: '28px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212835', margin: '0 0 4px' }}>Dimension Breakdown</h3>
      <p style={{ fontSize: '12px', color: '#586274', margin: '0 0 24px' }}>Weights are role-adjusted for your detected profile</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {DIMENSIONS.map(({ key, label, description }) => {
          const score = Math.round(scores[key])
          const contrib = contributions[label]
          const weight = weights?.[label]
          return (
            <div key={key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#212835' }}>{label}</span>
                  {weight !== undefined && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor: '#fcf0f1',
                      color: '#ee2c3c',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>
                      {weight}% weight
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '8px' }}>
                  {contrib !== undefined && (
                    <span style={{ fontSize: '11px', color: '#bfbfbf' }}>+{contrib.toFixed(1)} pts</span>
                  )}
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#212835' }}>{score}/100</span>
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#586274', margin: '0 0 6px' }}>{description}</p>
              <div style={{ width: '100%', backgroundColor: '#f7f7f7', borderRadius: '4px', height: '6px', border: '1px solid #ebecee' }}>
                <div style={{
                  height: '6px',
                  borderRadius: '4px',
                  backgroundColor: barColor(score),
                  width: `${score}%`,
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
