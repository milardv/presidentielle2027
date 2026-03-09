import { useState } from 'react'
import {
  Activity,
  CalendarRange,
  Minus,
  Newspaper,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import type { CandidateMediaAttention, CandidateMediaAttentionPoint } from '../../../../data/candidateMediaAttentionTypes'
import { formatFrenchDate } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileMediaAttentionSectionProps {
  mediaAttention: CandidateMediaAttention | null
  isLoading: boolean
  loadError: string | null
}

interface ChartPoint extends CandidateMediaAttentionPoint {
  x: number
  y: number
  score: number
}

const chartWidth = 760
const chartHeight = 240
const chartPaddingX = 18
const chartPaddingTop = 20
const chartPaddingBottom = 28

function getProviderLabel(provider: CandidateMediaAttention['provider']): string {
  return provider === 'mediacloud' ? 'Media Cloud' : 'GDELT'
}

function formatTimeSpan(value: string): string {
  const normalizedValue = value.trim().toLowerCase()

  if (normalizedValue === '3months') {
    return '3 mois'
  }

  if (normalizedValue === '1month') {
    return '1 mois'
  }

  return value
}

function formatScore(value: number): string {
  return `${Math.round(value)}/100`
}

function formatRatio(value: number | null | undefined): string | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null
  }

  return `${value.toLocaleString('fr-FR', {
    maximumFractionDigits: 3,
    minimumFractionDigits: value < 0.1 ? 3 : 1,
  })}%`
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function createChartPoints(points: CandidateMediaAttentionPoint[]): ChartPoint[] {
  if (points.length === 0) {
    return []
  }

  const peakValue = Math.max(...points.map((point) => point.value), 1)
  const usableWidth = chartWidth - chartPaddingX * 2
  const usableHeight = chartHeight - chartPaddingTop - chartPaddingBottom

  if (points.length === 1) {
    const score = clampScore((points[0].value / peakValue) * 100)

    return [
      {
        ...points[0],
        x: chartWidth / 2,
        y: chartPaddingTop + usableHeight * (1 - score / 100),
        score,
      },
    ]
  }

  return points.map((point, index) => {
    const score = clampScore((point.value / peakValue) * 100)

    return {
      ...point,
      x: chartPaddingX + (usableWidth * index) / (points.length - 1),
      y: chartPaddingTop + usableHeight * (1 - score / 100),
      score,
    }
  })
}

function buildLinePath(points: ChartPoint[]): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function buildAreaPath(points: ChartPoint[]): string {
  if (points.length === 0) {
    return ''
  }

  if (points.length === 1) {
    const point = points[0]
    const baseline = chartHeight - chartPaddingBottom
    return `M ${point.x - 1} ${baseline} L ${point.x} ${point.y} L ${point.x + 1} ${baseline} Z`
  }

  const baseline = chartHeight - chartPaddingBottom
  const linePath = buildLinePath(points)
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]

  return `${linePath} L ${lastPoint.x} ${baseline} L ${firstPoint.x} ${baseline} Z`
}

function getDateTicks(points: ChartPoint[]): ChartPoint[] {
  if (points.length <= 2) {
    return points
  }

  const middlePoint = points[Math.floor((points.length - 1) / 2)]
  return [points[0], middlePoint, points[points.length - 1]]
}

function getTrendTone(delta: number): {
  label: string
  icon: LucideIcon
  badgeClassName: string
} {
  if (delta >= 6) {
    return {
      label: 'En hausse',
      icon: TrendingUp,
      badgeClassName:
        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300',
    }
  }

  if (delta <= -6) {
    return {
      label: 'En baisse',
      icon: TrendingDown,
      badgeClassName:
        'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300',
    }
  }

  return {
    label: 'Stable',
    icon: Minus,
    badgeClassName:
      'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300',
  }
}

export function ProfileMediaAttentionSection({
  mediaAttention,
  isLoading,
  loadError,
}: ProfileMediaAttentionSectionProps) {
  const [isPeakTooltipVisible, setIsPeakTooltipVisible] = useState(false)

  if (isLoading) {
    return (
      <section id="media" className="scroll-mt-40">
        <ProfileSectionHeading icon="monitoring" title="Courbe d’attention média" />
        <div className="animate-pulse rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
          <div className="h-5 w-40 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-52 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800/80" />
        </div>
      </section>
    )
  }

  if (loadError) {
    return (
      <section id="media" className="scroll-mt-40">
        <ProfileSectionHeading icon="monitoring" title="Courbe d’attention média" />
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          {loadError}
        </div>
      </section>
    )
  }

  if (!mediaAttention || mediaAttention.points.length === 0) {
    return (
      <section id="media" className="scroll-mt-40">
        <ProfileSectionHeading icon="monitoring" title="Courbe d’attention média" />
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          Aucune courbe média disponible pour le moment. Lance un rafraichissement Media Cloud depuis le profil admin pour alimenter cette vue.
        </div>
      </section>
    )
  }

  const chartPoints = createChartPoints(mediaAttention.points)
  const peakPoint =
    chartPoints.reduce<ChartPoint | null>((currentPeak, point) => {
      if (currentPeak === null || point.value > currentPeak.value) {
        return point
      }

      return currentPeak
    }, null) ?? chartPoints[0]
  const latestPoint = chartPoints[chartPoints.length - 1]
  const previousPoint = chartPoints.length > 1 ? chartPoints[chartPoints.length - 2] : null
  const trendDelta = previousPoint ? latestPoint.score - previousPoint.score : 0
  const trendTone = getTrendTone(trendDelta)
  const TrendIcon = trendTone.icon
  const linePath = buildLinePath(chartPoints)
  const areaPath = buildAreaPath(chartPoints)
  const dateTicks = getDateTicks(chartPoints)
  const pointCountLabel = `${mediaAttention.pointCount} point${mediaAttention.pointCount > 1 ? 's' : ''}`
  const providerLabel = getProviderLabel(mediaAttention.provider)
  const peakContext =
    mediaAttention.peakContext && mediaAttention.peakContext.date === peakPoint.date
      ? mediaAttention.peakContext
      : {
          date: peakPoint.date,
          value: peakPoint.value,
          normalizedValue: peakPoint.normalizedValue,
          stories: [],
        }
  const peakTooltipLeft = `${Math.min(84, Math.max(16, (peakPoint.x / chartWidth) * 100))}%`
  const peakTooltipTop = `${Math.min(78, Math.max(18, (peakPoint.y / chartHeight) * 100))}%`
  const peakRatioLabel = formatRatio(peakContext?.normalizedValue)

  return (
    <section id="media" className="scroll-mt-40">
      <ProfileSectionHeading icon="monitoring" title="Courbe d’attention média" />

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/95 shadow-[0_18px_55px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/92">
        <div className="border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_36%)] px-5 py-5 dark:border-slate-800 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                Couverture presse
              </p>
              <h4 className="mt-2 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                Visibilité média du candidat dans la presse en ligne
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Lecture synthétique de l’attention portée au candidat dans {providerLabel}. L’échelle est relative au pic observé sur la période.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
                <Newspaper className="h-[13px] w-[13px]" />
                Source: {providerLabel}
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${trendTone.badgeClassName}`}
              >
                <TrendIcon className="h-[13px] w-[13px]" />
                {trendTone.label}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(15rem,0.9fr)]">
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/85 p-4 dark:border-slate-800 dark:bg-slate-950/45">
            <div className="relative">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="h-56 w-full overflow-visible"
                role="img"
                aria-label={`Courbe d'attention média de ${mediaAttention.candidateName}`}
              >
                <defs>
                  <linearGradient id="media-attention-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.34)" />
                    <stop offset="100%" stopColor="rgba(37,99,235,0.02)" />
                  </linearGradient>
                  <linearGradient id="media-attention-line" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>

                {[25, 50, 75, 100].map((score) => {
                  const y =
                    chartPaddingTop +
                    (chartHeight - chartPaddingTop - chartPaddingBottom) * (1 - score / 100)

                  return (
                    <line
                      key={score}
                      x1={chartPaddingX}
                      x2={chartWidth - chartPaddingX}
                      y1={y}
                      y2={y}
                      stroke="rgba(148,163,184,0.18)"
                      strokeDasharray="4 8"
                    />
                  )
                })}

                {areaPath ? <path d={areaPath} fill="url(#media-attention-fill)" /> : null}
                {linePath ? (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="url(#media-attention-line)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : null}

                <circle
                  cx={peakPoint.x}
                  cy={peakPoint.y}
                  r="8"
                  fill="#2563eb"
                  className={peakContext ? 'cursor-pointer' : undefined}
                  tabIndex={peakContext ? 0 : -1}
                  role={peakContext ? 'button' : undefined}
                  aria-label={
                    peakContext
                      ? `Afficher le contexte du pic média du ${formatFrenchDate(peakContext.date)}`
                      : undefined
                  }
                  onMouseEnter={() => {
                    if (peakContext) {
                      setIsPeakTooltipVisible(true)
                    }
                  }}
                  onMouseLeave={() => {
                    setIsPeakTooltipVisible(false)
                  }}
                  onFocus={() => {
                    if (peakContext) {
                      setIsPeakTooltipVisible(true)
                    }
                  }}
                  onBlur={() => {
                    setIsPeakTooltipVisible(false)
                  }}
                  onClick={() => {
                    if (peakContext) {
                      setIsPeakTooltipVisible((currentValue) => !currentValue)
                    }
                  }}
                />
                <circle
                  cx={peakPoint.x}
                  cy={peakPoint.y}
                  r="13"
                  fill="rgba(37,99,235,0.12)"
                  className={peakContext ? 'pointer-events-none' : undefined}
                />
                <circle
                  cx={latestPoint.x}
                  cy={latestPoint.y}
                  r="7"
                  fill="#14b8a6"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>

              {peakContext && isPeakTooltipVisible ? (
                <div
                  className="pointer-events-none absolute z-10 w-[min(20rem,calc(100%-0.5rem))] -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-[1.35rem] border border-slate-200/90 bg-white/96 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur dark:border-slate-700 dark:bg-slate-950/96"
                  style={{ left: peakTooltipLeft, top: peakTooltipTop }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Pic média</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                    {formatFrenchDate(peakContext.date)} · {peakContext.value} article{peakContext.value > 1 ? 's' : ''}
                  </p>
                  {peakRatioLabel ? (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Environ {peakRatioLabel} des articles du corpus ce jour-là.
                    </p>
                  ) : null}

                  <div className="mt-3 grid gap-2">
                    {peakContext.stories.length > 0 ? (
                      peakContext.stories.map((story) => (
                        <div
                          key={`${story.url}-${story.publishDate}`}
                          className="rounded-2xl bg-slate-50/90 px-3 py-2 dark:bg-slate-900/80"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                            {story.mediaName}
                          </p>
                          <p className="mt-1 text-sm leading-snug text-slate-700 dark:text-slate-200">
                            {story.title}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="rounded-2xl bg-slate-50/90 px-3 py-2 text-sm text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
                        Aucun titre explicatif disponible pour ce pic.
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {dateTicks.map((point) => (
                <span key={`${point.date}-${point.x}`}>{formatFrenchDate(point.date)}</span>
              ))}
            </div>
            {peakContext ? (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Survole le point bleu du pic pour voir les titres qui peuvent expliquer cette hausse.
              </p>
            ) : null}
          </div>

          <div className="grid gap-3">
            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Niveau actuel
                </span>
                <Activity className="h-[16px] w-[16px] text-primary" />
              </div>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {formatScore(latestPoint.score)}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Dernier point relevé le {formatFrenchDate(latestPoint.date)}.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Pic</span>
                <TrendingUp className="h-[16px] w-[16px] text-primary" />
              </div>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {formatScore(peakPoint.score)}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Pic observé le {formatFrenchDate(peakPoint.date)}.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Fenêtre
                </span>
                <CalendarRange className="h-[16px] w-[16px] text-primary" />
              </div>
              <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                {formatTimeSpan(mediaAttention.timeSpan)}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {pointCountLabel} agrégés, mise à jour le{' '}
                {formatFrenchDate(mediaAttention.dataLastUpdated ?? latestPoint.date)}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
