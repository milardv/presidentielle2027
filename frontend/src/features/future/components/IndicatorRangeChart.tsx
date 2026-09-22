import { FUTURE_HORIZON_YEAR } from '../../../data/futureIndicators.js'
import { formatIndicatorValue, type IndicatorProjection } from '../futureEngine'

interface IndicatorRangeChartProps {
  projection: IndicatorProjection
  accent: string
}

const WIDTH = 360
const HEIGHT = 150
const PAD_LEFT = 12
const PAD_RIGHT = 64
const PAD_TOP = 14
const PAD_BOTTOM = 26

export function IndicatorRangeChart({ projection, accent }: IndicatorRangeChartProps) {
  const { indicator, p10, p90, median, trend } = projection
  const history = indicator.history
  const todayYear = Number.parseInt(indicator.baseline.date.slice(0, 4), 10)
  const points = [...history.filter((point) => point.year < todayYear), { year: todayYear, value: indicator.baseline.value }]
  const years = points.map((point) => point.year)
  const minYear = Math.min(...years)
  const maxYear = FUTURE_HORIZON_YEAR
  const values = [...points.map((point) => point.value), p10, p90, median, trend]
  const rawMin = Math.min(...values)
  const rawMax = Math.max(...values)
  const padding = Math.max((rawMax - rawMin) * 0.15, indicator.decimals === 0 ? 1 : 0.1)
  const minValue = rawMin - padding
  const maxValue = rawMax + padding

  const x = (year: number) => PAD_LEFT + ((year - minYear) / (maxYear - minYear)) * (WIDTH - PAD_LEFT - PAD_RIGHT)
  const y = (value: number) => PAD_TOP + (1 - (value - minValue) / (maxValue - minValue)) * (HEIGHT - PAD_TOP - PAD_BOTTOM)

  const historyPath = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(point.year).toFixed(1)},${y(point.value).toFixed(1)}`).join(' ')
  const todayX = x(todayYear)
  const todayY = y(indicator.baseline.value)
  const endX = x(maxYear)
  const fan = `M${todayX.toFixed(1)},${todayY.toFixed(1)} L${endX.toFixed(1)},${y(p90).toFixed(1)} L${endX.toFixed(1)},${y(p10).toFixed(1)} Z`

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label={`Évolution de ${indicator.label} et projection ${FUTURE_HORIZON_YEAR}`}>
      <line x1={PAD_LEFT} x2={endX} y1={HEIGHT - PAD_BOTTOM} y2={HEIGHT - PAD_BOTTOM} stroke="#e2e8f0" />
      <line x1={todayX} x2={todayX} y1={PAD_TOP} y2={HEIGHT - PAD_BOTTOM} stroke="#cbd5e1" strokeDasharray="3 3" />

      <path d={fan} fill={accent} fillOpacity={0.16} />
      <line x1={todayX} y1={todayY} x2={endX} y2={y(trend)} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={todayX} y1={todayY} x2={endX} y2={y(median)} stroke={accent} strokeWidth={2.5} />

      <path d={historyPath} fill="none" stroke="#475569" strokeWidth={2} />
      {points.map((point) => (
        <circle key={point.year} cx={x(point.year)} cy={y(point.value)} r={point.year === todayYear ? 4 : 2.5} fill={point.year === todayYear ? '#0f172a' : '#64748b'} />
      ))}

      <circle cx={endX} cy={y(trend)} r={4} fill="#ffffff" stroke="#64748b" strokeWidth={1.5} />
      <circle cx={endX} cy={y(median)} r={5} fill={accent} />

      <text x={endX + 8} y={y(median) + 4} fontSize={12} fontWeight={800} fill={accent}>
        {formatIndicatorValue(median, indicator)}
      </text>
      <text x={endX + 8} y={y(trend) + (Math.abs(y(trend) - y(median)) < 12 ? (y(trend) >= y(median) ? 14 : -8) : 4)} fontSize={10} fill="#64748b">
        tend. {formatIndicatorValue(trend, indicator)}
      </text>

      {points.map((point, index) =>
        index === 0 || point.year === todayYear ? (
          <text key={`label-${point.year}`} x={x(point.year)} y={HEIGHT - 8} fontSize={10} fill="#94a3b8" textAnchor="middle">
            {point.year}
          </text>
        ) : null,
      )}
      <text x={endX} y={HEIGHT - 8} fontSize={10} fill="#94a3b8" textAnchor="middle">
        {maxYear}
      </text>
    </svg>
  )
}
