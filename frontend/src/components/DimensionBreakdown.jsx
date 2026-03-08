const DIMENSIONS = [
  { key: 'ai_awareness',    label: 'AI Awareness',     description: 'Understanding of AI/ML concepts and tools' },
  { key: 'ai_adaptability', label: 'AI Adaptability',  description: 'Learning new tech, experimentation, innovation' },
  { key: 'ai_application',  label: 'AI Application',   description: 'Using AI/automation tools in professional work' },
  { key: 'ai_creation',     label: 'AI Creation',      description: 'Building AI/ML systems, models, or integrations' },
  { key: 'data_fluency',    label: 'Data Fluency',     description: 'Working with analytics, metrics, experiments' },
]

function scoreColor(score) {
  if (score >= 75) return 'bg-emerald-500'
  if (score >= 55) return 'bg-blue-500'
  if (score >= 35) return 'bg-yellow-500'
  return 'bg-red-400'
}

export default function DimensionBreakdown({ scores, contributions, weights }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-lg font-bold text-gray-800 mb-1">Dimension Breakdown</h3>
      <p className="text-xs text-gray-400 mb-6">Weights are role-adjusted for your detected profile</p>
      <div className="space-y-5">
        {DIMENSIONS.map(({ key, label, description }) => {
          const score = Math.round(scores[key])
          const contrib = contributions[label]
          const weight = weights?.[label]
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-semibold text-gray-700 shrink-0">{label}</span>
                  {weight !== undefined && (
                    <span className="text-xs font-medium bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full shrink-0">
                      {weight}% weight
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {contrib !== undefined && (
                    <span className="text-xs text-gray-400">(+{contrib.toFixed(1)} pts)</span>
                  )}
                  <span className="text-sm font-bold text-gray-700">{score}/100</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-1.5">{description}</p>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${scoreColor(score)}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
