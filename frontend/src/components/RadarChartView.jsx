import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
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
    <div className="ug-card" style={{ padding: '28px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212835', margin: '0 0 20px' }}>Capability Radar</h3>
      <ResponsiveContainer width="100%" height={270}>
        <RadarChart data={data}>
          <PolarGrid stroke="#ebecee" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 11, fill: '#586274', fontFamily: 'Inter, sans-serif' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: '#bfbfbf' }}
            tickCount={5}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#ee2c3c"
            fill="#ee2c3c"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value) => [`${value} / 100`, 'Score']}
            contentStyle={{
              borderRadius: '6px',
              fontSize: '12px',
              border: '1px solid #ebecee',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
