const CATEGORY_STYLES = {
  'AI Native':       { border: '#0a9044', bg: '#f0faf4', text: '#0a9044', badge: '#e6f7ed' },
  'AI Advanced':     { border: '#1a73e8', bg: '#f0f6ff', text: '#1a5dc8', badge: '#e8f0fe' },
  'AI Practitioner': { border: '#c4811d', bg: '#fffaf0', text: '#a06a0a', badge: '#fef6e4' },
  'AI Curious':      { border: '#d97706', bg: '#fff8f0', text: '#b45309', badge: '#fef3e2' },
  'AI Unaware':      { border: '#ee2c3c', bg: '#fff5f5', text: '#be2330', badge: '#fcd5d8' },
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

  const hasContact = report.candidate_name || report.candidate_email || report.candidate_phone

  return (
    <div className="ug-card" style={{ padding: '32px' }}>

      {/* Candidate identity strip */}
      {hasContact && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          backgroundColor: '#f7f7f7',
          border: '1px solid #ebecee',
          borderRadius: '8px',
          padding: '16px 20px',
          marginBottom: '28px',
        }}>
          {/* Avatar initials */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #ee2c3c 0%, #da202f 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>
              {report.candidate_name
                ? report.candidate_name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                : '?'}
            </span>
          </div>

          <div style={{ flex: 1, minWidth: '160px' }}>
            {report.candidate_name && (
              <p style={{ fontSize: '17px', fontWeight: '700', color: '#212835', margin: '0 0 6px', lineHeight: 1 }}>
                {report.candidate_name}
              </p>
            )}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {report.candidate_email && (
                <span style={{ fontSize: '13px', color: '#586274', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '14px' }}>✉️</span>
                  {report.candidate_email}
                </span>
              )}
              {report.candidate_phone && (
                <span style={{ fontSize: '13px', color: '#586274', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '14px' }}>📞</span>
                  {report.candidate_phone}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Score + info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
        {/* Score circle */}
        <div style={{
          width: '120px',
          height: '120px',
          flexShrink: 0,
          borderRadius: '50%',
          border: `4px solid ${style.border}`,
          backgroundColor: style.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '36px', fontWeight: '700', color: '#212835', lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: '11px', color: '#586274', marginTop: '2px' }}>out of 100</span>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 14px', borderRadius: '4px', fontSize: '13px', fontWeight: '600', backgroundColor: style.badge, color: style.text }}>
              {report.category}
            </span>
            <span style={{ padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', backgroundColor: '#f7f7f7', color: '#586274', border: '1px solid #ebecee' }}>
              {roleLabel}
            </span>
            <span style={{ padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', backgroundColor: '#f7f7f7', color: '#586274', border: '1px solid #ebecee' }}>
              {confidence}% confidence
            </span>
          </div>
          <p style={{ fontSize: '14px', color: '#586274', lineHeight: '1.7', margin: 0 }}>
            {report.candidate_summary}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #ebecee', margin: '24px 0' }} />

      {/* Score band legend */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[
          { label: 'AI Native', range: '85–100', color: '#0a9044' },
          { label: 'AI Advanced', range: '70–85', color: '#1a73e8' },
          { label: 'AI Practitioner', range: '50–70', color: '#c4811d' },
          { label: 'AI Curious', range: '30–50', color: '#d97706' },
          { label: 'AI Unaware', range: '0–30', color: '#ee2c3c' },
        ].map(({ label, range, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
            <span style={{ fontSize: '11px', color: label === report.category ? color : '#bfbfbf', fontWeight: label === report.category ? '600' : '400' }}>
              {label} ({range})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
