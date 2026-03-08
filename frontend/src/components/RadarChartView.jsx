import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export default function RadarChartView({ scores }) {
  const data = [
    { dimension: 'AI Awareness',    score: Math.round(scores.ai_awareness) },
    { dimension: 'AI Adaptability', score: Math.round(scores.ai_adaptability) },
    { dimension: 'AI Application',  score: Math.round(scores.ai_application) },
    { dimension: 'AI Creation',     score: Math.round(scores.ai_creation) },
    { dimension: 'Data Fluency',    score: Math.round(scores.data_fluency) },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Capability Radar</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 11, fill: '#6b7280' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: '#9ca3af' }}
            tickCount={5}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value) => [`${value} / 100`, 'Score']}
            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
