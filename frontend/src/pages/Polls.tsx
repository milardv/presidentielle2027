import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  BarChart3,
  Building2,
  CalendarClock,
  ChevronRight,
  FileStack,
  Lightbulb,
  Microscope,
  Sparkles,
  Users2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Candidate } from '../data/candidateTypes'
import type { PollCandidateAggregate, PollScenario, VotingIntentPoll } from '../data/pollTypes'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { HomeAlert } from '../features/candidates/home/components/HomeAlert'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { useCandidates } from '../features/candidates/home/hooks/useCandidates'
import {
  formatFrenchDate,
  getCandidateInitials,
  getCandidatePartyAccentColor,
} from '../features/candidates/shared/candidateUi'
import { PollsMobileNav } from '../features/polls/components/PollsMobileNav'
import { usePolls } from '../features/polls/hooks/usePolls'
import { SeoHead } from '../seo/SeoHead'

type PollTimeframe = '6m' | '1y' | 'total'

interface PollTrendPoint {
  date: string
  x: number
  y: number
  value: number
}

interface PollTrendSeries {
  candidateId: string
  candidateName: string
  accentColor: string
  latestValue: number
  party: string
  photoUrl?: string
  points: PollTrendPoint[]
}

interface RawPollTrendPoint {
  date: string
  x: number
  value: number
}

interface RawPollTrendSeries {
  candidateId: string
  candidateName: string
  accentColor: string
  latestValue: number
  party: string
  photoUrl?: string
  points: RawPollTrendPoint[]
}

const leftCandidateIds = new Set([
  'nathalie-arthaud',
  'philippe-poutou',
  'fabien-roussel',
  'jean-luc-melenchon',
  'francois-ruffin',
  'olivier-faure',
  'francois-hollande',
  'raphael-glucksmann',
  'marine-tondelier',
])

const trendChartWidth = 960
const trendChartHeight = 320
const trendChartPaddingX = 26
const trendChartPaddingTop = 22
const trendChartPaddingBottom = 34

function formatScore(score: number): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: score % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(score)
}

function parseIsoDate(value: string | null): Date | null {
  if (!value) {
    return null
  }

  const normalizedValue = value.trim()
  if (!normalizedValue) {
    return null
  }

  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)
    ? new Date(`${normalizedValue}T12:00:00Z`)
    : new Date(normalizedValue)

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

function getRelativeDateLabel(value: string | null): string {
  const parsedDate = parseIsoDate(value)
  if (parsedDate === null) {
    return 'Date indisponible'
  }

  const today = new Date()
  const nowUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  const targetUtc = Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate())
  const differenceInDays = Math.max(0, Math.round((nowUtc - targetUtc) / (24 * 60 * 60 * 1000)))

  if (differenceInDays === 0) {
    return "Aujourd'hui"
  }

  if (differenceInDays === 1) {
    return 'Il y a 1 jour'
  }

  return `Il y a ${differenceInDays} jours`
}

function normalizePartyName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function getPartyShortLabel(party: string): string {
  const normalizedParty = normalizePartyName(party)

  if (normalizedParty.includes('rassemblement national')) {
    return 'RN'
  }

  if (normalizedParty.includes('france insoumise')) {
    return 'LFI'
  }

  if (normalizedParty.includes('republicains')) {
    return 'LR'
  }

  if (normalizedParty.includes('place publique')) {
    return 'PP'
  }

  if (normalizedParty.includes('lutte ouvriere')) {
    return 'LO'
  }

  if (normalizedParty.includes('generation ecologie')) {
    return 'GE'
  }

  if (normalizedParty.includes('ecologistes')) {
    return 'ÉCO'
  }

  if (normalizedParty.includes('renaissance')) {
    return 'REN'
  }

  if (normalizedParty.includes('horizons')) {
    return 'HOR'
  }

  if (normalizedParty.includes('populaires')) {
    return 'POP'
  }

  return party.slice(0, 4).toUpperCase()
}

function buildCandidateAverages(polls: VotingIntentPoll[]): PollCandidateAggregate[] {
  const aggregates = new Map<
    string,
    { candidateName: string; totalScore: number; scenarioCount: number; leaderCount: number }
  >()

  polls.forEach((poll) => {
    poll.scenarios.forEach((scenario) => {
      scenario.scores.forEach((score) => {
        const current =
          aggregates.get(score.candidateId) ??
          ({ candidateName: score.candidateName, totalScore: 0, scenarioCount: 0, leaderCount: 0 } as const)

        aggregates.set(score.candidateId, {
          candidateName: score.candidateName,
          totalScore: current.totalScore + score.score,
          scenarioCount: current.scenarioCount + 1,
          leaderCount:
            current.leaderCount + (scenario.leader?.candidateId === score.candidateId ? 1 : 0),
        })
      })
    })
  })

  return [...aggregates.entries()]
    .map(([candidateId, aggregate]) => ({
      candidateId,
      candidateName: aggregate.candidateName,
      averageScore: aggregate.totalScore / aggregate.scenarioCount,
      scenarioCount: aggregate.scenarioCount,
      leaderCount: aggregate.leaderCount,
    }))
    .sort((first, second) => second.averageScore - first.averageScore)
}

function buildKeyTakeaways(
  topCandidates: PollCandidateAggregate[],
  latestStudy: VotingIntentPoll | null,
  totalScenarios: number,
): string[] {
  const leader = topCandidates[0]
  const runnerUp = topCandidates[1]
  const leftLeader = topCandidates.find((candidate) => leftCandidateIds.has(candidate.candidateId))
  const takeaways: string[] = []

  if (leader) {
    takeaways.push(
      `${leader.candidateName} domine l'échantillon avec ${leader.averageScore.toFixed(1)}% en moyenne sur ${leader.scenarioCount} scénarios et ${leader.leaderCount} arrivées en tête.`,
    )
  }

  if (leader && runnerUp) {
    takeaways.push(
      `${runnerUp.candidateName} suit à ${runnerUp.averageScore.toFixed(1)}% de moyenne, soit ${Math.abs(leader.averageScore - runnerUp.averageScore).toFixed(1)} points derrière la tête moyenne.`,
    )
  }

  if (leftLeader) {
    takeaways.push(
      `À gauche, ${leftLeader.candidateName} ressort comme le profil le plus haut avec ${leftLeader.averageScore.toFixed(1)}% de moyenne sur ${leftLeader.scenarioCount} scénarios testés.`,
    )
  }

  if (latestStudy) {
    const latestLeaders = latestStudy.scenarios
      .slice(0, 2)
      .map((scenario) => scenario.label)
      .join(' ; ')

    takeaways.push(
      `Dernier terrain disponible (${latestStudy.pollster}, ${latestStudy.fieldworkEnd}) : ${latestLeaders || `${totalScenarios} scénarios enregistrés`}.`,
    )
  }

  return takeaways.slice(0, 4)
}

function filterPollsByTimeframe(polls: VotingIntentPoll[], timeframe: PollTimeframe): VotingIntentPoll[] {
  if (timeframe === 'total' || polls.length === 0) {
    return polls
  }

  const latestDate = parseIsoDate(polls[0]?.fieldworkEnd ?? null)
  if (latestDate === null) {
    return polls
  }

  const cutoffDate = new Date(latestDate)
  cutoffDate.setUTCMonth(cutoffDate.getUTCMonth() - (timeframe === '6m' ? 6 : 12))

  return polls.filter((poll) => {
    const pollDate = parseIsoDate(poll.fieldworkEnd)
    return pollDate !== null && pollDate >= cutoffDate
  })
}

function buildTrendPath(points: PollTrendPoint[]): string {
  if (points.length === 0) {
    return ''
  }

  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function buildPollTrendOverlay(
  polls: VotingIntentPoll[],
  trackedCandidateIds: string[],
  candidatesById: Map<string, Candidate>,
): {
  series: PollTrendSeries[]
  dates: string[]
  chartMax: number
} {
  const trackedCandidateIdSet = new Set(trackedCandidateIds)
  const dates = [...new Set(polls.map((poll) => poll.fieldworkEnd))].sort((first, second) =>
    first.localeCompare(second),
  )

  if (trackedCandidateIdSet.size === 0 || dates.length === 0) {
    return {
      series: [],
      dates: [],
      chartMax: 10,
    }
  }

  const aggregatesByDate = new Map<
    string,
    Map<string, { candidateName: string; totalScore: number; count: number }>
  >()

  polls.forEach((poll) => {
    const dateAggregate = aggregatesByDate.get(poll.fieldworkEnd) ?? new Map()

    poll.scenarios.forEach((scenario) => {
      scenario.scores.forEach((score) => {
        if (!trackedCandidateIdSet.has(score.candidateId)) {
          return
        }

        const current = dateAggregate.get(score.candidateId) ?? {
          candidateName: score.candidateName,
          totalScore: 0,
          count: 0,
        }

        dateAggregate.set(score.candidateId, {
          candidateName: current.candidateName,
          totalScore: current.totalScore + score.score,
          count: current.count + 1,
        })
      })
    })

    aggregatesByDate.set(poll.fieldworkEnd, dateAggregate)
  })

  const usableWidth = trendChartWidth - trendChartPaddingX * 2
  const usableHeight = trendChartHeight - trendChartPaddingTop - trendChartPaddingBottom
  const xPositionByDate = new Map(
    dates.map((date, index) => [
      date,
      dates.length === 1
        ? trendChartWidth / 2
        : trendChartPaddingX + (usableWidth * index) / Math.max(1, dates.length - 1),
    ]),
  )

  let maxValue = 0

  const rawSeries: RawPollTrendSeries[] = []

  trackedCandidateIds.forEach((candidateId) => {
      const candidate = candidatesById.get(candidateId) ?? null
      const points = dates.flatMap((date) => {
        const aggregate = aggregatesByDate.get(date)?.get(candidateId)
        if (!aggregate || aggregate.count === 0) {
          return []
        }

        const averageValue = aggregate.totalScore / aggregate.count
        maxValue = Math.max(maxValue, averageValue)

        return [
          {
            date,
            x: xPositionByDate.get(date) ?? trendChartPaddingX,
            y: 0,
            value: averageValue,
          },
        ]
      })

      if (points.length === 0) {
        return
      }

      rawSeries.push({
        candidateId,
        candidateName: candidate?.name ?? candidateId,
        accentColor: getCandidatePartyAccentColor(candidate?.party ?? ''),
        latestValue: points[points.length - 1]?.value ?? 0,
        party: candidate?.party ?? '',
        photoUrl: candidate?.photoUrl,
        points,
    })
  })

  const chartMax = Math.max(10, Math.ceil(maxValue / 5) * 5)

  return {
    series: rawSeries.map((entry): PollTrendSeries => ({
      ...entry,
      points: entry.points.map((point) => ({
        ...point,
        y: trendChartPaddingTop + usableHeight * (1 - point.value / chartMax),
      })),
    })),
    dates,
    chartMax,
  }
}

function PollSummaryCard({
  label,
  value,
  detail,
  icon,
  highlight = false,
}: {
  label: string
  value: string
  detail: string
  icon: ReactNode
  highlight?: boolean
}) {
  const cardClassName = highlight
    ? 'border-primary/20 bg-primary/[0.08] ring-1 ring-primary/25'
    : 'border-slate-200 bg-white'

  const labelClassName = highlight ? 'text-primary' : 'text-slate-400'
  const valueClassName = highlight ? 'text-primary' : 'text-slate-950'

  return (
    <article className={`rounded-[1.6rem] border p-5 shadow-sm ${cardClassName}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${labelClassName}`}>{label}</p>
          <p className={`mt-3 text-3xl font-black tracking-tight ${valueClassName}`}>{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          {icon}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{detail}</p>
    </article>
  )
}

function PollsLoadingState() {
  return (
    <section className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1.55fr)_380px]">
      <div className="h-[38rem] animate-pulse rounded-[2rem] border border-slate-200 bg-white" />
      <div className="h-[38rem] animate-pulse rounded-[2rem] border border-slate-200 bg-white" />
    </section>
  )
}

function PollsterChips({
  pollsters,
  activePollster,
  onSelectPollster,
}: {
  pollsters: string[]
  activePollster: string | null
  onSelectPollster: (pollster: string | null) => void
}) {
  if (pollsters.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onSelectPollster(null)}
        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold transition ${
          activePollster === null ? 'bg-primary text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:text-primary'
        }`}
      >
        Tous
      </button>
      {pollsters.map((pollster) => {
        const isActive = pollster === activePollster

        return (
          <button
            key={pollster}
            type="button"
            onClick={() => onSelectPollster(isActive ? null : pollster)}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold transition ${
              isActive ? 'bg-primary text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:text-primary'
            }`}
          >
            {pollster}
          </button>
        )
      })}
    </div>
  )
}

function FeaturedPollAvatarStack({
  scenario,
  candidatesById,
}: {
  scenario: PollScenario | null
  candidatesById: Map<string, Candidate>
}) {
  if (scenario === null) {
    return null
  }

  return (
    <div className="flex -space-x-3 overflow-hidden">
      {scenario.scores.slice(0, 4).map((score) => {
        const candidate = candidatesById.get(score.candidateId)
        const initials = getCandidateInitials(candidate?.name ?? score.candidateName)

        return candidate?.photoUrl ? (
          <img
            key={`${scenario.id}-${score.candidateId}`}
            src={candidate.photoUrl}
            alt={candidate.name}
            className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
          />
        ) : (
          <div
            key={`${scenario.id}-${score.candidateId}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[11px] font-black text-slate-600 shadow-sm"
          >
            {initials}
          </div>
        )
      })}

      {scenario.scores.length > 4 ? (
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-[11px] font-black text-white shadow-sm">
          +{scenario.scores.length - 4}
        </div>
      ) : null}
    </div>
  )
}

function FeaturedCandidateRow({
  score,
  rank,
  candidatesById,
}: {
  score: PollScenario['scores'][number]
  rank: number
  candidatesById: Map<string, Candidate>
}) {
  const candidate = candidatesById.get(score.candidateId)
  const party = candidate?.party ?? ''
  const accentColor = getCandidatePartyAccentColor(party)
  const partyLabel = party ? getPartyShortLabel(party) : null
  const candidateName = candidate?.name ?? score.candidateName

  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="h-2.5 w-2.5 flex-none rounded-full"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />

          {candidate?.photoUrl ? (
            <img src={candidate.photoUrl} alt={candidateName} className="h-10 w-10 flex-none rounded-full object-cover" />
          ) : (
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-600">
              {getCandidateInitials(candidateName)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-bold text-slate-900">{candidateName}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                #{rank}
              </span>
              {partyLabel ? (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{
                    backgroundColor: `${accentColor}18`,
                    color: accentColor,
                  }}
                >
                  {partyLabel}
                </span>
              ) : null}
            </div>
            {party ? <p className="truncate text-xs text-slate-500">{party}</p> : null}
          </div>
        </div>

        <p className="text-2xl font-black tracking-tight text-slate-950">{formatScore(score.score)}%</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${Math.min(score.score, 100)}%`,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}CC)`,
          }}
        />
      </div>
    </div>
  )
}

function CompactScenarioCard({
  scenario,
  candidatesById,
}: {
  scenario: PollScenario
  candidatesById: Map<string, Candidate>
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">{scenario.label}</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{scenario.id}</p>
        </div>
        {scenario.leader ? (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            {(candidatesById.get(scenario.leader.candidateId)?.name ?? scenario.leader.candidateName)} {formatScore(scenario.leader.score)}%
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {scenario.scores.slice(0, 3).map((score, index) => (
          <span
            key={`${scenario.id}-${score.candidateId}`}
            className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            #{index + 1} {(candidatesById.get(score.candidateId)?.name ?? score.candidateName)} {formatScore(score.score)}%
          </span>
        ))}
      </div>
    </div>
  )
}

function FeaturedPollCard({
  poll,
  candidatesById,
}: {
  poll: VotingIntentPoll | null
  candidatesById: Map<string, Candidate>
}) {
  if (poll === null) {
    return null
  }

  const featuredScenario = poll.scenarios[0] ?? null
  const secondaryScenarios = poll.scenarios.slice(1)
  const featuredScores = featuredScenario?.scores ?? []
  const visibleScores = featuredScores.slice(0, 6)
  const hiddenScores = featuredScores.slice(6)

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 border-b border-slate-100 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                {poll.pollster}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                {poll.scenarios.length} scénarios
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Premier tour
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Dernier sondage disponible
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Terrain du {formatFrenchDate(poll.fieldworkStart)} au {formatFrenchDate(poll.fieldworkEnd)} • Échantillon de{' '}
              {poll.sampleSize.toLocaleString('fr-FR')} personnes.
            </p>
            {featuredScenario ? <p className="mt-3 text-sm font-semibold text-slate-700">{featuredScenario.label}</p> : null}
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <FeaturedPollAvatarStack scenario={featuredScenario} candidatesById={candidatesById} />
            <a
              href={poll.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 transition hover:border-primary hover:text-primary"
            >
              {poll.sourceLabel}
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {visibleScores.map((score, index) => (
            <FeaturedCandidateRow
              key={`${poll.id}-${featuredScenario?.id}-${score.candidateId}`}
              score={score}
              rank={index + 1}
              candidatesById={candidatesById}
            />
          ))}
        </div>

        {hiddenScores.length > 0 ? (
          <details className="group mt-6 rounded-2xl border border-slate-200 bg-slate-50/90">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-slate-700 marker:hidden">
              <span>Voir le reste du classement du scénario</span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary transition group-open:rotate-45">+</span>
            </summary>
            <div className="grid gap-3 border-t border-slate-200 px-4 pb-4 pt-4 sm:grid-cols-2">
              {hiddenScores.map((score, index) => {
                const candidate = candidatesById.get(score.candidateId)
                const candidateName = candidate?.name ?? score.candidateName

                return (
                  <div key={`${poll.id}-hidden-${score.candidateId}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          #{visibleScores.length + index + 1} {candidateName}
                        </p>
                        {candidate?.party ? <p className="text-xs text-slate-500">{candidate.party}</p> : null}
                      </div>
                      <p className="text-lg font-black text-slate-950">{formatScore(score.score)}%</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </details>
        ) : null}

        {secondaryScenarios.length > 0 ? (
          <details className="group mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-slate-700 marker:hidden">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Autres scénarios</p>
                <p className="mt-1 text-xs text-slate-500">
                  {secondaryScenarios.length} scénario{secondaryScenarios.length > 1 ? 's' : ''} masqué{secondaryScenarios.length > 1 ? 's' : ''}
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary transition group-open:rotate-45">+</span>
            </summary>
            <div className="grid gap-3 border-t border-slate-200 px-4 pb-4 pt-4 xl:grid-cols-2">
              {secondaryScenarios.map((scenario) => (
                <CompactScenarioCard key={`${poll.id}-${scenario.id}`} scenario={scenario} candidatesById={candidatesById} />
              ))}
            </div>
          </details>
        ) : null}
      </div>
    </section>
  )
}

function TakeawayCard({
  title,
  description,
  icon,
  toneClassName,
}: {
  title: string
  description: string
  icon: ReactNode
  toneClassName: string
}) {
  return (
    <div className="flex gap-4">
      <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-2xl ${toneClassName}`}>{icon}</div>
      <div>
        <p className="font-bold leading-snug text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function PollInsightsPanel({
  latestStudy,
  keyTakeaways,
  totalStudies,
  totalScenarios,
  latestFieldworkEnd,
  dataLastUpdated,
}: {
  latestStudy: VotingIntentPoll | null
  keyTakeaways: string[]
  totalStudies: number
  totalScenarios: number
  latestFieldworkEnd: string | null
  dataLastUpdated: string | null
}) {
  const insightCards = [
    {
      title: 'Lecture du moment',
      description: keyTakeaways[0] ?? "La page consolide les études publiques disponibles sans produire de projection automatique.",
      icon: <Sparkles className="h-5 w-5" />,
      toneClassName: 'bg-primary/10 text-primary',
    },
    {
      title: 'Équilibre du rapport de force',
      description: keyTakeaways[1] ?? "Les écarts visibles restent très dépendants du scénario effectivement testé par chaque institut.",
      icon: <BarChart3 className="h-5 w-5" />,
      toneClassName: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Ce que disent vraiment les scénarios',
      description: keyTakeaways[2] ?? "La multiplication des configurations aide surtout à comprendre quels profils résistent le mieux selon l'offre politique.",
      icon: <Lightbulb className="h-5 w-5" />,
      toneClassName: 'bg-sky-100 text-sky-700',
    },
  ]

  return (
    <aside className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Microscope className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Analyse & points clés</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Lecture rapide</h2>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {insightCards.map((insight) => (
            <TakeawayCard
              key={insight.title}
              title={insight.title}
              description={insight.description}
              icon={insight.icon}
              toneClassName={insight.toneClassName}
            />
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Source du sondage mis en avant</p>
            {latestStudy ? (
              <a
                href={latestStudy.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                {latestStudy.sourceLabel}
                <ChevronRight className="h-4 w-4" />
              </a>
            ) : (
              <p className="mt-2 text-sm text-slate-500">Source indisponible.</p>
            )}
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Base de comparaison</p>
            <p className="mt-2 font-bold text-slate-900">
              {totalStudies} études • {totalScenarios} scénarios
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Dernier terrain clos {latestFieldworkEnd ? getRelativeDateLabel(latestFieldworkEnd).toLowerCase() : 'à date inconnue'}.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Link
            to="/sources"
            className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            <span>Méthodologie</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Base sondages</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {dataLastUpdated ? `Actualisée le ${formatFrenchDate(dataLastUpdated)}` : 'Mise à jour non disponible'}
            </p>
          </div>
        </div>
      </section>
    </aside>
  )
}

function CandidateLeaderboard({
  candidates,
  candidatesById,
}: {
  candidates: PollCandidateAggregate[]
  candidatesById: Map<string, Candidate>
}) {
  const displayedCandidates = candidates.slice(0, 8)
  const maxAverageScore = displayedCandidates[0]?.averageScore ?? 0

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Vue agrégée</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Classement moyen des scénarios</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
          Ce classement ne prédit pas le résultat final. Il donne un repère de niveau en moyenne simple, selon les scénarios de premier tour actuellement stockés.
        </p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {displayedCandidates.map((candidate, index) => {
          const candidateMeta = candidatesById.get(candidate.candidateId)
          const accentColor = getCandidatePartyAccentColor(candidateMeta?.party ?? '')
          const displayName = candidateMeta?.name ?? candidate.candidateName
          const relativeWidth = maxAverageScore > 0 ? (candidate.averageScore / maxAverageScore) * 100 : 0

          return (
            <article key={candidate.candidateId} className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-500 ring-1 ring-slate-200">
                  #{index + 1}
                </div>

                {candidateMeta?.photoUrl ? (
                  <img src={candidateMeta.photoUrl} alt={displayName} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-600">
                    {getCandidateInitials(displayName)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-bold text-slate-900">{displayName}</p>
                    {candidateMeta?.party ? (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          color: accentColor,
                        }}
                      >
                        {getPartyShortLabel(candidateMeta.party)}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-500">
                    {candidate.scenarioCount} scénarios • {candidate.leaderCount} première{candidate.leaderCount > 1 ? 's' : ''} place{candidate.leaderCount > 1 ? 's' : ''}
                  </p>
                </div>

                <p className="text-2xl font-black tracking-tight text-slate-950">{formatScore(candidate.averageScore)}%</p>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(10, relativeWidth)}%`,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}CC)`,
                  }}
                />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function PollTrendChartSection({
  polls,
  topCandidates,
  candidatesById,
  activePollster,
  timeframe,
  onTimeframeChange,
}: {
  polls: VotingIntentPoll[]
  topCandidates: PollCandidateAggregate[]
  candidatesById: Map<string, Candidate>
  activePollster: string | null
  timeframe: PollTimeframe
  onTimeframeChange: (timeframe: PollTimeframe) => void
}) {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)

  const timeframePolls = useMemo(() => filterPollsByTimeframe(polls, timeframe), [polls, timeframe])
  const trackedCandidateIds = useMemo(
    () => topCandidates.slice(0, 5).map((candidate) => candidate.candidateId),
    [topCandidates],
  )

  const { series, dates, chartMax } = useMemo(
    () => buildPollTrendOverlay(timeframePolls, trackedCandidateIds, candidatesById),
    [timeframePolls, trackedCandidateIds, candidatesById],
  )

  const usableWidth = trendChartWidth - trendChartPaddingX * 2
  const hoverIndex = hoveredDate ? dates.indexOf(hoveredDate) : -1
  const hoverX =
    hoverIndex >= 0
      ? dates.length === 1
        ? trendChartWidth / 2
        : trendChartPaddingX + (usableWidth * hoverIndex) / Math.max(1, dates.length - 1)
      : null

  const hoveredSeries = series
    .map((entry) => ({
      ...entry,
      hoveredPoint: hoveredDate ? entry.points.find((point) => point.date === hoveredDate) ?? null : null,
    }))
    .sort((first, second) => (second.hoveredPoint?.value ?? 0) - (first.hoveredPoint?.value ?? 0))

  const timeframes: Array<{ id: PollTimeframe; label: string }> = [
    { id: '6m', label: '6 mois' },
    { id: '1y', label: '1 an' },
    { id: 'total', label: 'Total' },
  ]

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Évolution agrégée</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Évolution des intentions de vote</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">
            Courbe agrégée à partir des scénarios actuellement stockés. Les lignes suivent les principaux candidats du moment en moyenne par date de terrain.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {activePollster ? (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Filtre {activePollster}
            </span>
          ) : null}
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            {timeframes.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => onTimeframeChange(entry.id)}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                  timeframe === entry.id ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'
                }`}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {series.length === 0 ? (
        <div className="mt-6 rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950">Courbe indisponible pour ce filtre</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Essaie un autre institut ou élargis la période pour retrouver suffisamment de points comparables.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.9fr)]">
          <div className="rounded-[1.7rem] border border-slate-200/80 bg-slate-50/85 p-4">
            <div className="relative" onMouseLeave={() => setHoveredDate(null)}>
              <svg
                viewBox={`0 0 ${trendChartWidth} ${trendChartHeight}`}
                className="h-80 w-full overflow-visible"
                role="img"
                aria-label="Évolution agrégée des intentions de vote"
              >
                {[0.25, 0.5, 0.75, 1].map((ratio) => {
                  const score = chartMax * ratio
                  const y = trendChartPaddingTop + (trendChartHeight - trendChartPaddingTop - trendChartPaddingBottom) * (1 - score / chartMax)

                  return (
                    <g key={`poll-trend-grid-${ratio}`}>
                      <line
                        x1={trendChartPaddingX}
                        x2={trendChartWidth - trendChartPaddingX}
                        y1={y}
                        y2={y}
                        stroke="rgba(148,163,184,0.18)"
                        strokeDasharray="4 8"
                      />
                      <text x={trendChartPaddingX} y={y - 6} fill="rgba(100,116,139,0.85)" fontSize="10" fontWeight="700">
                        {formatScore(score)}%
                      </text>
                    </g>
                  )
                })}

                {hoverX !== null ? (
                  <line
                    x1={hoverX}
                    x2={hoverX}
                    y1={trendChartPaddingTop}
                    y2={trendChartHeight - trendChartPaddingBottom}
                    stroke="rgba(15,23,42,0.14)"
                    strokeDasharray="5 7"
                  />
                ) : null}

                {series.map((entry) => (
                  <path
                    key={`poll-trend-${entry.candidateId}`}
                    d={buildTrendPath(entry.points)}
                    fill="none"
                    stroke={entry.accentColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={hoveredSeries[0]?.candidateId === entry.candidateId || hoveredDate === null ? 0.98 : 0.74}
                  />
                ))}

                {hoveredSeries.map((entry) =>
                  entry.hoveredPoint ? (
                    <circle
                      key={`poll-trend-point-${entry.candidateId}-${entry.hoveredPoint.date}`}
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
                      ? trendChartWidth / 2
                      : trendChartPaddingX + (usableWidth * index) / Math.max(1, dates.length - 1)

                  return (
                    <rect
                      key={`poll-trend-hit-${date}`}
                      x={x - 8}
                      y={trendChartPaddingTop}
                      width="16"
                      height={trendChartHeight - trendChartPaddingTop - trendChartPaddingBottom}
                      fill="transparent"
                      onMouseEnter={() => setHoveredDate(date)}
                    />
                  )
                })}
              </svg>

              {hoveredDate && hoverX !== null ? (
                <div
                  className="pointer-events-none absolute z-10 w-[min(18rem,calc(100%-0.5rem))] -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-[1.3rem] border border-slate-200/90 bg-white/96 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur"
                  style={{
                    left: `${Math.min(84, Math.max(16, (hoverX / trendChartWidth) * 100))}%`,
                    top: '1rem',
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Point suivi</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{formatFrenchDate(hoveredDate)}</p>
                  <div className="mt-3 grid gap-2">
                    {hoveredSeries.map((entry) =>
                      entry.hoveredPoint ? (
                        <div
                          key={`poll-trend-hover-${entry.candidateId}-${hoveredDate}`}
                          className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50/90 px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.accentColor }} />
                            <span className="text-sm font-semibold text-slate-700">{entry.candidateName}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">{formatScore(entry.hoveredPoint.value)}%</span>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              <span>{dates[0] ? formatFrenchDate(dates[0]) : ''}</span>
              <span>{hoveredDate ? formatFrenchDate(hoveredDate) : ''}</span>
              <span>{dates[dates.length - 1] ? formatFrenchDate(dates[dates.length - 1]) : ''}</span>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Passe la souris sur la courbe pour comparer les candidats à une date donnée. Le calcul agrège les scénarios stockés pour chaque fin de terrain.
            </p>
          </div>

          <div className="grid content-start gap-3">
            {hoveredSeries.map((entry) => (
              <article key={`poll-trend-legend-${entry.candidateId}`} className="rounded-[1.4rem] border border-slate-200/80 bg-white/92 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  {entry.photoUrl ? (
                    <img src={entry.photoUrl} alt={entry.candidateName} className="h-12 w-12 rounded-2xl object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                      {getCandidateInitials(entry.candidateName)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.accentColor }} />
                      <p className="truncate text-base font-bold tracking-tight text-slate-950">{entry.candidateName}</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{entry.party || 'Bloc non précisé'}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50/90 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Dernier niveau</p>
                    <p className="mt-1 text-lg font-black tracking-tight text-slate-950">{formatScore(entry.latestValue)}%</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50/90 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Dans le survol</p>
                    <p className="mt-1 text-lg font-black tracking-tight text-slate-950">
                      {entry.hoveredPoint ? `${formatScore(entry.hoveredPoint.value)}%` : '—'}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function PollStudyCard({
  poll,
  candidatesById,
}: {
  poll: VotingIntentPoll
  candidatesById: Map<string, Candidate>
}) {
  const featuredScenario = poll.scenarios[0] ?? null
  const secondaryScenarios = poll.scenarios.slice(1)

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              {poll.pollster}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              {poll.scenarios.length} scénarios
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
            Terrain du {formatFrenchDate(poll.fieldworkStart)} au {formatFrenchDate(poll.fieldworkEnd)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Échantillon de {poll.sampleSize.toLocaleString('fr-FR')} personnes. Source publique :{' '}
            <a className="font-semibold text-primary hover:underline" href={poll.sourceUrl} target="_blank" rel="noreferrer">
              {poll.sourceLabel}
            </a>
            .
          </p>
        </div>
      </div>

      {featuredScenario ? (
        <div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Scénario mis en avant</p>
              <p className="mt-2 text-base font-bold text-slate-900">{featuredScenario.label}</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 ring-1 ring-slate-200">
              {featuredScenario.id}
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {featuredScenario.scores.slice(0, 3).map((score, index) => {
              const candidate = candidatesById.get(score.candidateId)
              const accentColor = getCandidatePartyAccentColor(candidate?.party ?? '')
              const displayName = candidate?.name ?? score.candidateName

              return (
                <div key={`${poll.id}-${featuredScenario.id}-${score.candidateId}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">#{index + 1}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-900">{displayName}</p>
                  <p className="mt-2 text-2xl font-black" style={{ color: accentColor }}>
                    {formatScore(score.score)}%
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

      {secondaryScenarios.length > 0 ? (
        <details className="group mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-slate-700 marker:hidden">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Autres scénarios résumés</p>
              <p className="mt-1 text-xs text-slate-500">
                {secondaryScenarios.length} scénario{secondaryScenarios.length > 1 ? 's' : ''} compacté{secondaryScenarios.length > 1 ? 's' : ''}
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary transition group-open:rotate-45">+</span>
          </summary>
          <div className="grid gap-3 border-t border-slate-200 px-4 pb-4 pt-4 lg:grid-cols-2">
            {secondaryScenarios.map((scenario) => (
              <CompactScenarioCard key={`${poll.id}-${scenario.id}`} scenario={scenario} candidatesById={candidatesById} />
            ))}
          </div>
        </details>
      ) : null}
    </article>
  )
}

export default function Polls() {
  const { polls, isLoading, loadError, dataLastUpdated } = usePolls()
  const { candidates } = useCandidates()
  const [activePollster, setActivePollster] = useState<string | null>(null)
  const [trendTimeframe, setTrendTimeframe] = useState<PollTimeframe>('6m')

  const candidatesById = useMemo(
    () => new Map(candidates.map((candidate) => [candidate.id, candidate])),
    [candidates],
  )

  const pollsters = useMemo(() => [...new Set(polls.map((poll) => poll.pollster))].slice(0, 8), [polls])

  const filteredPolls = useMemo(
    () => (activePollster ? polls.filter((poll) => poll.pollster === activePollster) : polls),
    [activePollster, polls],
  )

  const totalStudies = filteredPolls.length
  const totalScenarios = useMemo(
    () => filteredPolls.reduce((total, poll) => total + poll.scenarios.length, 0),
    [filteredPolls],
  )
  const latestStudy = filteredPolls[0] ?? null
  const latestFieldworkEnd = latestStudy?.fieldworkEnd ?? null
  const pollsterCount = useMemo(() => new Set(filteredPolls.map((poll) => poll.pollster)).size, [filteredPolls])
  const topCandidates = useMemo(() => buildCandidateAverages(filteredPolls), [filteredPolls])
  const keyTakeaways = useMemo(
    () => buildKeyTakeaways(topCandidates, latestStudy, totalScenarios),
    [latestStudy, topCandidates, totalScenarios],
  )

  const lastFieldworkLabel = latestFieldworkEnd ? formatFrenchDate(latestFieldworkEnd) : 'Non disponible'
  const latestFieldworkRelativeLabel = getRelativeDateLabel(latestFieldworkEnd)
  const meanLeader = topCandidates[0]

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <SeoHead
        title="Sondage présidentielle 2027 : intentions de vote, classement et instituts"
        description="Sondage présidentielle 2027 : comparez les intentions de vote, les scénarios, les instituts et les dynamiques de campagne sur une page claire."
        path="/polls"
        keywords={[
          'sondage présidentielle 2027',
          'présidentielle 2027 sondage',
          'intentions de vote 2027',
          'sondage IFOP présidentielle 2027',
          'classement candidats présidentielle 2027',
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Sondages présidentielle 2027',
          description: 'Page de suivi des intentions de vote et des scénarios de sondages pour la présidentielle 2027.',
          inLanguage: 'fr-FR',
        }}
      />

      <AppSiteHeader containerClassName="w-full" />

      <main className="w-full space-y-8 px-4 py-8 pb-28 md:pb-16">
        <section className="rounded-[2.2rem] border border-slate-200/80 bg-white/92 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Sondages 2027</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Sondages d'intention de vote 2027
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Données compilées en toute transparence à partir des liens publics des instituts. La page met en avant le
                dernier terrain disponible, la hiérarchie moyenne des scénarios et les principaux points de lecture du moment.
              </p>
            </div>

            <Link
              to="/sources"
              className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              <FileStack className="h-4 w-4" />
              Méthodologie
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            <PollsterChips pollsters={pollsters} activePollster={activePollster} onSelectPollster={setActivePollster} />
            {activePollster ? (
              <p className="text-sm text-slate-500">
                Filtre actif : <span className="font-semibold text-slate-900">{activePollster}</span>. Les cartes, la courbe et le détail sont recalculés sur cet institut uniquement.
              </p>
            ) : null}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PollSummaryCard
            label="Instituts"
            value={String(pollsterCount)}
            detail={activePollster ? 'Filtre centré sur un seul institut.' : 'Instituts actuellement représentés dans la base de sondages.'}
            icon={<Building2 className="h-5 w-5" />}
          />
          <PollSummaryCard
            label="Scénarios"
            value={String(totalScenarios)}
            detail="Configurations de premier tour actuellement comparables."
            icon={<Users2 className="h-5 w-5" />}
          />
          <PollSummaryCard
            label="Dernier terrain"
            value={lastFieldworkLabel}
            detail={latestFieldworkRelativeLabel}
            icon={<CalendarClock className="h-5 w-5" />}
          />
          <PollSummaryCard
            label="Favori moyen"
            value={meanLeader ? meanLeader.candidateName : 'N/A'}
            detail={meanLeader ? `${formatScore(meanLeader.averageScore)}% de moyenne simple sur les scénarios.` : 'Aucune moyenne disponible.'}
            icon={<Sparkles className="h-5 w-5" />}
            highlight
          />
        </section>

        {loadError ? <HomeAlert tone="error" message={loadError} /> : null}
        {isLoading ? <PollsLoadingState /> : null}

        {!isLoading && !loadError ? (
          <>
            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_380px]">
              <FeaturedPollCard poll={latestStudy} candidatesById={candidatesById} />
              <PollInsightsPanel
                latestStudy={latestStudy}
                keyTakeaways={keyTakeaways}
                totalStudies={totalStudies}
                totalScenarios={totalScenarios}
                latestFieldworkEnd={latestFieldworkEnd}
                dataLastUpdated={dataLastUpdated}
              />
            </section>

            <PollTrendChartSection
              polls={filteredPolls}
              topCandidates={topCandidates}
              candidatesById={candidatesById}
              activePollster={activePollster}
              timeframe={trendTimeframe}
              onTimeframeChange={setTrendTimeframe}
            />

            <CandidateLeaderboard candidates={topCandidates} candidatesById={candidatesById} />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Toutes les études</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Détail par institut</h2>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                  Chaque institut n'affiche qu'un scénario principal par défaut. Les autres scénarios restent accessibles dans un bloc replié pour conserver une lecture compacte.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {filteredPolls.map((poll) => (
                  <PollStudyCard key={poll.id} poll={poll} candidatesById={candidatesById} />
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Transparence</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Ce que mesure la page</h2>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                  Les scores ci-dessus décrivent des tests publiés à un instant donné. Ils ne remplacent ni un second tour ni une projection de résultat final.
                </p>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-bold text-slate-900">Lecture d’un premier tour</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Les scénarios comparent des offres de candidature différentes. Une hausse ou une baisse dépend donc aussi des absences et des présences testées dans l’étude.
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-bold text-slate-900">Moyenne simple, pas modèle prédictif</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Le classement moyen agrège les scénarios disponibles pour donner un repère de niveau. Il ne corrige pas les biais de calendrier, d’échantillon ou de mode de recueil.
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <FileStack className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-bold text-slate-900">Sources publiques conservées</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Chaque étude conserve son lien public d’origine. Tu peux retrouver la méthode complète et l’inventaire des sources depuis la page dédiée.
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>

      <PollsMobileNav />
      <HomeDesktopFooter />
    </div>
  )
}
