const CATEGORY_STYLES = {
  'AI Native':       { bg: 'bg-emerald-500', ring: 'ring-emerald-200', text: 'text-emerald-700', light: 'bg-emerald-50' },
  'AI Advanced':     { bg: 'bg-blue-500',    ring: 'ring-blue-200',    text: 'text-blue-700',    light: 'bg-blue-50' },
  'AI Practitioner': { bg: 'bg-yellow-500',  ring: 'ring-yellow-200',  text: 'text-yellow-700',  light: 'bg-yellow-50' },
  'AI Curious':      { bg: 'bg-orange-500',  ring: 'ring-orange-200',  text: 'text-orange-700',  light: 'bg-orange-50' },
  'AI Unaware':      { bg: 'bg-red-500',     ring: 'ring-red-200',     text: 'text-red-700',     light: 'bg-red-50' },
}

const ROLE_LABELS = {
  Engineer: 'Engineer',
  ProductManager: 'Product Manager',
  Marketing: 'Marketing',
  HR: 'HR / Recruiter',
  Finance: 'Finance',
  Operations: 'Operations',
  Business: 'Business / Sales',
  DataScientist: 'Data Scientist',
}

export default function ReportCard({ report }) {
  const style = CATEGORY_STYLES[report.category] ?? CATEGORY_STYLES['AI Curious']
  const score = Math.round(report.overall_score)
  const roleLabel = ROLE_LABELS[report.detected_role] ?? report.detected_role
  const confidence = Math.round(report.role_confidence * 100)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Score circle */}
        <div className={`relative w-36 h-36 flex-shrink-0 rounded-full ring-8 ${style.ring} flex flex-col items-center justify-center ${style.light}`}>
          <span className="text-4xl font-extrabold text-gray-800">{score}</span>
          <span className="text-xs text-gray-500 mt-0.5">out of 100</span>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${style.light} ${style.text} mb-3`}>
            {report.category}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{report.candidate_summary}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              Role: {roleLabel}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              Confidence: {confidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
