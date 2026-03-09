import type { PollCandidateAggregate, PollScenario, VotingIntentPoll } from '../data/pollTypes'
import { DesktopAppTabs } from '../components/DesktopAppTabs'
import { HomeAlert } from '../features/candidates/home/components/HomeAlert'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { formatFrenchDate } from '../features/candidates/shared/candidateUi'
import { PollsMobileNav } from '../features/polls/components/PollsMobileNav'
import { usePolls } from '../features/polls/hooks/usePolls'
import { appNavItems } from '../navigation/appNavItems'

function formatScore(score: number): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: score % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(score)
}

function PollSummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{detail}</p>
    </article>
  )
}

function PollsLoadingState() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 py-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`poll-loading-${index}`}
          className="h-32 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse"
        />
      ))}
    </section>
  )
}

function ScenarioTopThree({ scenario }: { scenario: PollScenario }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-slate-900 dark:text-white">{scenario.label}</p>
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{scenario.id}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {scenario.scores.slice(0, 3).map((score, index) => (
          <div key={`${scenario.id}-${score.candidateId}`} className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">#{index + 1}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{score.candidateName}</p>
            <p className="mt-1 text-xl font-black text-primary">{formatScore(score.score)}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompactScenarioCard({ scenario }: { scenario: PollScenario }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/30 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{scenario.label}</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{scenario.id}</p>
        </div>
        {scenario.leader ? (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            {scenario.leader.candidateName} {formatScore(scenario.leader.score)}%
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {scenario.scores.slice(0, 3).map((score, index) => (
          <span
            key={`${scenario.id}-${score.candidateId}`}
            className="inline-flex rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
          >
            #{index + 1} {score.candidateName} {formatScore(score.score)}%
          </span>
        ))}
      </div>
    </div>
  )
}

function PollStudyCard({ poll }: { poll: VotingIntentPoll }) {
  const featuredScenario = poll.scenarios[0] ?? null
  const secondaryScenarios = poll.scenarios.slice(1)

  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              {poll.pollster}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {poll.scenarios.length} scenarios
            </span>
          </div>
          <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Terrain du {formatFrenchDate(poll.fieldworkStart)} au {formatFrenchDate(poll.fieldworkEnd)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Echantillon de {poll.sampleSize.toLocaleString('fr-FR')} personnes. Source publique :{' '}
            <a className="font-semibold text-primary hover:underline" href={poll.sourceUrl} target="_blank" rel="noreferrer">
              {poll.sourceLabel}
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {featuredScenario ? <ScenarioTopThree key={`${poll.id}-${featuredScenario.id}`} scenario={featuredScenario} /> : null}

        {secondaryScenarios.length > 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/25 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Autres scénarios résumés
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {secondaryScenarios.length} scenario{secondaryScenarios.length > 1 ? 's' : ''} compacté{secondaryScenarios.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {secondaryScenarios.map((scenario) => (
                <CompactScenarioCard key={`${poll.id}-${scenario.id}`} scenario={scenario} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function CandidateLeaderboard({ candidates }: { candidates: PollCandidateAggregate[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Moyenne des scenarios</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">Hiérarchie moyenne</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Moyenne simple sur l'ensemble des scenarios stockés. Ce n'est pas une projection electorale, mais un repere de niveau dans les tests publics disponibles.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-[minmax(0,1.4fr)_120px_120px] bg-slate-50 dark:bg-slate-950/40 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
          <span>Candidat</span>
          <span>Moyenne</span>
          <span>1res places</span>
        </div>
        {candidates.slice(0, 8).map((candidate) => (
          <div
            key={candidate.candidateId}
            className="grid grid-cols-[minmax(0,1.4fr)_120px_120px] items-center gap-3 border-t border-slate-200 dark:border-slate-800 px-4 py-3"
          >
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{candidate.candidateName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.scenarioCount} scenarios comptabilisés</p>
            </div>
            <p className="text-lg font-black text-primary">{formatScore(candidate.averageScore)}%</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{candidate.leaderCount}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function LatestStudySpotlight({ poll }: { poll: VotingIntentPoll | null }) {
  if (poll === null) {
    return null
  }

  const featuredScenario = poll.scenarios[0] ?? null
  const secondaryScenarios = poll.scenarios.slice(1)

  return (
    <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-5 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">Dernier terrain disponible</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
        {poll.pollster} - fin de terrain le {formatFrenchDate(poll.fieldworkEnd)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {poll.scenarios.length} scenarios en base, avec un echantillon de {poll.sampleSize.toLocaleString('fr-FR')} personnes.
      </p>
      {featuredScenario ? (
        <div className="mt-4 rounded-xl border border-emerald-200/70 dark:border-emerald-900/50 bg-white/80 dark:bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{featuredScenario.label}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {featuredScenario.scores.slice(0, 3).map((score) => (
              <span
                key={`${featuredScenario.id}-${score.candidateId}`}
                className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300"
              >
                {score.candidateName} {formatScore(score.score)}%
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {secondaryScenarios.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {secondaryScenarios.map((scenario) => (
            <span
              key={`${poll.id}-${scenario.id}`}
              className="inline-flex rounded-full border border-emerald-200/80 dark:border-emerald-900/50 bg-white/80 dark:bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {scenario.label}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default function Polls() {
  const {
    polls,
    isLoading,
    loadError,
    totalStudies,
    totalScenarios,
    latestFieldworkEnd,
    dataLastUpdated,
    pollsterCount,
    latestStudy,
    topCandidates,
    keyTakeaways,
  } = usePolls()

  const lastFieldworkLabel = latestFieldworkEnd ? formatFrenchDate(latestFieldworkEnd) : 'Non disponible'
  const dataLastUpdatedLabel = dataLastUpdated ? formatFrenchDate(dataLastUpdated) : 'Non disponible'
  const meanLeader = topCandidates[0]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Sondage</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">Sondages d'intention de vote 2027</h1>
            </div>
            <div className="flex flex-col items-end gap-3">
              <DesktopAppTabs items={appNavItems} className="shadow-none" />
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 px-4 py-3 text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Maj base</p>
                <p className="mt-1 text-sm font-semibold">{dataLastUpdatedLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-28 md:pb-16 py-6 space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PollSummaryCard
            label="Etudes"
            value={String(totalStudies)}
            detail={`${pollsterCount} instituts differents consultés.`}
          />
          <PollSummaryCard
            label="Scenarios"
            value={String(totalScenarios)}
            detail="Nombre de configurations de premier tour comparables."
          />
          <PollSummaryCard
            label="Dernier terrain"
            value={lastFieldworkLabel}
            detail="Date de fin de terrain de l'etude la plus recente stockee."
          />
          <PollSummaryCard
            label="Leader moyen"
            value={meanLeader ? `${meanLeader.candidateName} ${formatScore(meanLeader.averageScore)}%` : 'N/A'}
            detail="Moyenne simple sur l'ensemble des scenarios disponibles."
          />
        </section>

        {loadError && <HomeAlert tone="error" message={loadError} />}
        {isLoading && <PollsLoadingState />}

        {!isLoading && !loadError && (
          <>
            <LatestStudySpotlight poll={latestStudy} />

            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Resume clair</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">Ce qu'il faut retenir</h2>
              <div className="mt-5 grid gap-3">
                {keyTakeaways.map((takeaway, index) => (
                  <div key={`takeaway-${index}`} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 px-4 py-3">
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{takeaway}</p>
                  </div>
                ))}
              </div>
            </section>

            <CandidateLeaderboard candidates={topCandidates} />

            <section className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">Scénarios</h2>
                </div>
              </div>

              {polls.map((poll) => (
                <PollStudyCard key={poll.id} poll={poll} />
              ))}
            </section>
          </>
        )}
      </main>

      <PollsMobileNav />
      <HomeDesktopFooter />
    </div>
  )
}
