import { useState } from 'react'

function Section({ title, icon, items, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <span className="font-semibold text-gray-700 flex items-center gap-2">
          <span>{icon}</span> {title}
          <span className="ml-1 text-xs font-normal text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200">
            {items.length}
          </span>
        </span>
        <span className="text-gray-400 text-sm">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="divide-y divide-gray-50">
          {items.map((item, i) => (
            <li key={i} className="px-5 py-3 text-sm text-gray-600 flex gap-2">
              <span className="text-gray-300 flex-shrink-0 mt-0.5">•</span>
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
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Insights</h3>
      <div className="space-y-3">
        <Section title="Strengths" icon="✅" items={strengths} defaultOpen={true} />
        <Section title="Gaps" icon="⚠️" items={gaps} defaultOpen={true} />
        <Section title="Suggestions" icon="💡" items={suggestions} defaultOpen={true} />
        <Section title="Key Signals Detected" icon="🔍" items={signals} defaultOpen={false} />
      </div>
    </div>
  )
}
