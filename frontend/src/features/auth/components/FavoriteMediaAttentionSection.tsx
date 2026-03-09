import { useMemo, useState } from 'react'
import { Activity, TrendingUp } from 'lucide-react'
import type { CandidateMediaAttention } from '../../../data/candidateMediaAttentionTypes'
import type { Candidate } from '../../../data/candidateTypes'
import {
  formatFrenchDate,
  getCandidatePartyAccentColor,
  getCandidateInitials,
} from '../../candidates/shared/candidateUi'

interface FavoriteMediaAttentionSectionProps {
  candidates: Candidate[]
  mediaAttentions: CandidateMediaAttention[]
  isLoading: boolean
  errorMessage: string | null
}

interface OverlaySeriesPoint {
  date: string
  x: number
  y: number
  score: number
  rawValue: number
}

interface OverlaySeries {
  candidateId: string
  candidateName: string
  accentColor: string
  latestScore: number
  latestRawValue: number
  peakScore: number
  points: OverlaySeriesPoint[]
}

const chartWidth = 900
const chartHeight = 280
const chartPaddingX = 22
const chartPaddingTop = 20
const chartPaddingBottom = 34

function formatScore(value: number): string {
  return `${Math.round(value)}/100`
}

function buildSeriesPath(points: OverlaySeriesPoint[]): string {
  if (points.length === 0) {
    return ''
  }

  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function buildOverlaySeries(
  candidates: Candidate[],
  mediaAttentions: CandidateMediaAttention[],
): {
  series: OverlaySeries[]
  dates: string[]
} {
  const mediaAttentionByCandidateId = new Map(
    mediaAttentions.map((entry) => [entry.candidateId, entry]),
  )
  const dates = [...new Set(mediaAttentions.flatMap((entry) => entry.points.map((point) => point.date)))].sort(
    (first, second) => first.localeCompare(second),
  )

  if (dates.length === 0) {
    return {
      series: [],
      dates: [],
    }
  }

  const usableWidth = chartWidth - chartPaddingX * 2
  const usableHeight = chartHeight - chartPaddingTop - chartPaddingBottom
  const datePositionByValue = new Map(
    dates.map((date, index) => [
      date,
      dates.length === 1
        ? chartWidth / 2
        : chartPaddingX + (usableWidth * index) / Math.max(1, dates.length - 1),
    ]),
  )

  const series = candidates
    .map((candidate) => {
      const mediaAttention = mediaAttentionByCandidateId.get(candidate.id)
      if (!mediaAttention || mediaAttention.points.length === 0) {
        return null
      }

      const peakValue = Math.max(...mediaAttention.points.map((point) => point.value), 1)
      const points = mediaAttention.points.map((point) => {
        const score = Math.max(0, Math.min(100, (point.value / peakValue) * 100))
        const x = datePositionByValue.get(point.date) ?? chartPaddingX
        const y = chartPaddingTop + usableHeight * (1 - score / 100)

        return {
          date: point.date,
          x,
          y,
          score,
          rawValue: point.value,
        }
      })

      const latestPoint = points[points.length - 1]

      return {
        candidateId: candidate.id,
        candidateName: candidate.name,
        accentColor: getCandidatePartyAccentColor(candidate.party),
        latestScore: latestPoint?.score ?? 0,
        latestRawValue: latestPoint?.rawValue ?? 0,
        peakScore: 100,
        points,
      }
    })
    .filter((entry): entry is OverlaySeries => entry !== null)

  return {
    series,
    dates,
  }
}

function FavoriteMediaAttentionSkeleton() {
  return (
    <div className="h-[30rem] animate-pulse rounded-[2rem] border border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80" />
  )
}

export function FavoriteMediaAttentionSection({
  candidates,
  mediaAttentions,
  isLoading,
  errorMessage,
}: FavoriteMediaAttentionSectionProps) {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)

  const { series, dates } = useMemo(
    () => buildOverlaySeries(candidates, mediaAttentions),
    [candidates, mediaAttentions],
  )

  const hoverDate = hoveredDate
  const usableWidth = chartWidth - chartPaddingX * 2
  const hoverIndex = hoverDate ? dates.indexOf(hoverDate) : -1
  const hoverX =
    hoverIndex >= 0
      ? dates.length === 1
        ? chartWidth / 2
        : chartPaddingX + (usableWidth * hoverIndex) / Math.max(1, dates.length - 1)
      : null
  const hoveredSeries = series
    .map((entry) => {
      const hoveredPoint = hoverDate ? entry.points.find((point) => point.date === hoverDate) ?? null : null

      return {
        ...entry,
        hoveredPoint,
      }
    })
    .sort((first, second) => (second.hoveredPoint?.score ?? 0) - (first.hoveredPoint?.score ?? 0))

  if (candidates.length === 0) {
    return null
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/92 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/92">
      <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.10),_transparent_24%)]" />

      <div className="relative border-b border-slate-200/80 px-6 py-6 dark:border-slate-800 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Media Cloud</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-[2rem]">
              Attention média des candidats que vous suivez
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Superposition normalisée des courbes Media Cloud sur les trois derniers mois. Chaque ligne est ramenée à son propre pic pour comparer les dynamiques, pas les volumes bruts.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300">
            <Activity className="h-[16px] w-[16px] text-primary" />
            {series.length} courbe{series.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="relative p-6 sm:p-8">
        {isLoading ? <FavoriteMediaAttentionSkeleton /> : null}

        {!isLoading && errorMessage ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            {errorMessage}
          </p>
        ) : null}

        {!isLoading && !errorMessage && series.length === 0 ? (
          <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center dark:border-slate-700 dark:bg-slate-950/40">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <TrendingUp className="h-[24px] w-[24px]" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 dark:text-white">
              Courbes indisponibles pour le moment
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Les candidats suivis n’ont pas encore de courbe Media Cloud synchronisée.
            </p>
          </div>
        ) : null}

        {!isLoading && !errorMessage && series.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.9fr)]">
            <div className="rounded-[1.7rem] border border-slate-200/80 bg-slate-50/85 p-4 dark:border-slate-800 dark:bg-slate-950/45">
              <div
                className="relative"
                onMouseLeave={() => setHoveredDate(null)}
              >
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="h-72 w-full overflow-visible"
                  role="img"
                  aria-label="Superposition des courbes Media Cloud des candidats suivis"
                >
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

                  {hoverX !== null ? (
                    <line
                      x1={hoverX}
                      x2={hoverX}
                      y1={chartPaddingTop}
                      y2={chartHeight - chartPaddingBottom}
                      stroke="rgba(15,23,42,0.12)"
                      strokeDasharray="5 7"
                    />
                  ) : null}

                  {series.map((entry) => (
                    <path
                      key={`favorite-media-${entry.candidateId}`}
                      d={buildSeriesPath(entry.points)}
                      fill="none"
                      stroke={entry.accentColor}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={hoveredSeries[0]?.candidateId === entry.candidateId || hoverDate === null ? 0.98 : 0.72}
                    />
                  ))}

                  {hoveredSeries.map((entry) =>
                    entry.hoveredPoint ? (
                      <circle
                        key={`favorite-media-point-${entry.candidateId}-${entry.hoveredPoint.date}`}
                        cx={entry.hoveredPoint.x}
                        cy={entry.hoveredPoint.y}
                        r="5.5"
                        fill={entry.accentColor}
                        stroke="white"
                        strokeWidth="2.5"
                      />
                    ) : null,
                  )}

                  {dates.map((date, index) => {
                    const x =
                      dates.length === 1
                        ? chartWidth / 2
                        : chartPaddingX + (usableWidth * index) / Math.max(1, dates.length - 1)

                    return (
                      <rect
                        key={`favorite-media-hit-${date}`}
                        x={x - 6}
                        y={chartPaddingTop}
                        width="12"
                        height={chartHeight - chartPaddingTop - chartPaddingBottom}
                        fill="transparent"
                        onMouseEnter={() => setHoveredDate(date)}
                      />
                    )
                  })}
                </svg>

                {hoverDate && hoverX !== null ? (
                  <div
                    className="pointer-events-none absolute z-10 w-[min(18rem,calc(100%-0.5rem))] -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-[1.3rem] border border-slate-200/90 bg-white/96 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur dark:border-slate-700 dark:bg-slate-950/96"
                    style={{
                      left: `${Math.min(84, Math.max(16, (hoverX / chartWidth) * 100))}%`,
                      top: '1rem',
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Point suivi</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                      {formatFrenchDate(hoverDate)}
                    </p>
                    <div className="mt-3 grid gap-2">
                      {hoveredSeries.map((entry) =>
                        entry.hoveredPoint ? (
                          <div
                            key={`favorite-media-hover-${entry.candidateId}-${hoverDate}`}
                            className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50/90 px-3 py-2 dark:bg-slate-900/80"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: entry.accentColor }}
                              />
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                {entry.candidateName}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {formatScore(entry.hoveredPoint.score)}
                            </span>
                          </div>
                        ) : null,
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span>{dates[0] ? formatFrenchDate(dates[0]) : ''}</span>
                <span>{hoverDate ? formatFrenchDate(hoverDate) : ''}</span>
                <span>{dates[dates.length - 1] ? formatFrenchDate(dates[dates.length - 1]) : ''}</span>
              </div>

              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Passez la souris sur la courbe pour comparer le niveau relatif des candidats suivis à une date donnée.
              </p>
            </div>

            <div className="grid gap-3 content-start">
              {hoveredSeries.map((entry) => {
                const candidate = candidates.find((candidateEntry) => candidateEntry.id === entry.candidateId) ?? null

                return (
                  <article
                    key={`favorite-media-legend-${entry.candidateId}`}
                    className="rounded-[1.4rem] border border-slate-200/80 bg-white/92 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div className="flex items-center gap-3">
                      {candidate?.photoUrl ? (
                        <img
                          src={candidate.photoUrl}
                          alt={entry.candidateName}
                          className="h-12 w-12 rounded-2xl object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
                          {getCandidateInitials(entry.candidateName)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: entry.accentColor }}
                          />
                          <p className="truncate text-base font-bold tracking-tight text-slate-950 dark:text-white">
                            {entry.candidateName}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {candidate?.party ?? 'Sans etiquette'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50/90 px-3 py-2 dark:bg-slate-900/70">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Niveau actuel
                        </p>
                        <p className="mt-1 text-lg font-black tracking-tight text-slate-950 dark:text-white">
                          {formatScore(entry.latestScore)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-50/90 px-3 py-2 dark:bg-slate-900/70">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Aujourd&apos;hui dans le survol
                        </p>
                        <p className="mt-1 text-lg font-black tracking-tight text-slate-950 dark:text-white">
                          {entry.hoveredPoint ? formatScore(entry.hoveredPoint.score) : '—'}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
