import { useState } from 'react'

const SECTION_CONFIG = {
  Strengths:            { color: '#0a9044', bg: '#f0faf4', border: '#c6e8d4' },
  Gaps:                 { color: '#c4811d', bg: '#fffaf0', border: '#f5e0b0' },
  Suggestions:          { color: '#1a73e8', bg: '#f0f6ff', border: '#c5d9f8' },
  'Key Signals Detected': { color: '#586274', bg: '#f7f7f7', border: '#ebecee' },
}

function Section({ title, icon, items, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const cfg = SECTION_CONFIG[title] ?? SECTION_CONFIG['Key Signals Detected']

  return (
    <div style={{ border: `1px solid ${cfg.border}`, borderRadius: '8px', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          backgroundColor: cfg.bg,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '14px', color: '#212835' }}>
          <span>{icon}</span>
          {title}
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            backgroundColor: '#fff',
            color: cfg.color,
            padding: '1px 8px',
            borderRadius: '4px',
            border: `1px solid ${cfg.border}`,
          }}>
            {items.length}
          </span>
        </span>
        <span style={{ color: '#bfbfbf', fontSize: '12px' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', backgroundColor: '#fff' }}>
          {items.map((item, i) => (
            <li key={i} style={{
              padding: '12px 18px',
              fontSize: '13px',
              color: '#586274',
              lineHeight: '1.6',
              display: 'flex',
              gap: '10px',
              borderTop: i === 0 ? 'none' : '1px solid #f7f7f7',
            }}>
              <span style={{ color: cfg.color, flexShrink: 0, marginTop: '2px', fontWeight: '700' }}>–</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function InsightsPanel({ strengths, gaps, suggestions, signals }) {
  return (
    <div className="ug-card" style={{ padding: '28px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212835', margin: '0 0 20px' }}>Insights & Recommendations</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Section title="Strengths" icon="✅" items={strengths} defaultOpen={true} />
        <Section title="Gaps" icon="⚠️" items={gaps} defaultOpen={true} />
        <Section title="Suggestions" icon="💡" items={suggestions} defaultOpen={true} />
        <Section title="Key Signals Detected" icon="🔍" items={signals} defaultOpen={false} />
      </div>
    </div>
  )
}
