import { ExternalLink, Swords } from 'lucide-react'
import type { Candidate } from '../../../data/candidateTypes'
import type { PollCandidateScore } from '../../../data/pollTypes'
import type { SecondRoundMatchup } from '../../../data/secondRoundPollTypes'
import { formatFrenchDate, getCandidateInitials, getCandidatePartyAccentColor } from '../../candidates/shared/candidateUi'

interface SecondRoundSectionProps {
  matchups: SecondRoundMatchup[]
  candidatesById: Map<string, Candidate>
  isLoading: boolean
  loadError: string | null
}

function formatPercent(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1).replace('.', ',')
}

function CandidateBar({
  score,
  candidate,
  isWinner,
}: {
  score: PollCandidateScore
  candidate: Candidate | undefined
  isWinner: boolean
}) {
  const accent = candidate ? getCandidatePartyAccentColor(candidate.party) : '#64748b'

  return (
    <div className="flex items-center gap-3">
      {candidate?.photoUrl ? (
        <img src={candidate.photoUrl} alt="" className="h-10 w-10 shrink-0 rounded-2xl object-cover" loading="lazy" />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-xs font-bold text-white">
          {getCandidateInitials(score.candidateName)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className={`truncate text-sm ${isWinner ? 'font-black text-slate-950' : 'font-semibold text-slate-600'}`}>
            {score.candidateName}
          </p>
          <p className={`text-lg tabular-nums ${isWinner ? 'font-black text-slate-950' : 'font-bold text-slate-500'}`}>
            {formatPercent(score.score)} %
          </p>
        </div>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full" style={{ width: `${Math.min(score.score, 100)}%`, backgroundColor: accent }} />
        </div>
      </div>
    </div>
  )
}

function MatchupCard({ matchup, candidatesById }: { matchup: SecondRoundMatchup; candidatesById: Map<string, Candidate> }) {
  const { latestPoll } = matchup
  const fieldworkLabel =
    latestPoll.fieldworkStart === latestPoll.fieldworkEnd
      ? formatFrenchDate(latestPoll.fieldworkEnd)
      : `${formatFrenchDate(latestPoll.fieldworkStart)} – ${formatFrenchDate(latestPoll.fieldworkEnd)}`

  return (
    <article className="flex flex-col rounded-[1.8rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Duel testé</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">{matchup.label}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-slate-600">
          {matchup.polls.length} sondage{matchup.polls.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {latestPoll.scores.map((score) => (
          <CandidateBar
            key={score.candidateId}
            score={score}
            candidate={candidatesById.get(score.candidateId)}
            isWinner={latestPoll.winnerId === score.candidateId}
          />
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Dernier sondage : <span className="font-semibold text-slate-700">{latestPoll.pollster}</span>, terrain {fieldworkLabel}
        {latestPoll.sampleSize > 0 ? `, ${latestPoll.sampleSize.toLocaleString('fr-FR')} personnes` : ''}.{' '}
        <a
          href={latestPoll.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          Source <ExternalLink className="h-3 w-3" />
        </a>
      </p>

      {matchup.polls.length > 1 ? (
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Moyenne sur {matchup.polls.length} sondages
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {matchup.averages.map((average) => `${average.candidateName} ${formatPercent(average.score)} %`).join(' – ')}
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
            {matchup.polls.slice(1, 4).map((poll) => (
              <li key={poll.id} className="flex items-center justify-between gap-3">
                <span className="truncate">
                  {poll.pollster} · {formatFrenchDate(poll.fieldworkEnd)}
                </span>
                <span className="shrink-0 tabular-nums font-semibold text-slate-700">
                  {poll.scores.map((score) => `${formatPercent(score.score)}`).join(' – ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}

export function SecondRoundSection({ matchups, candidatesById, isLoading, loadError }: SecondRoundSectionProps) {
  if (!isLoading && !loadError && matchups.length === 0) {
    return null
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <Swords className="h-4 w-4" /> Second tour
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Duels de second tour testés</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
          Les instituts testent plusieurs finales possibles face à Marine Le Pen. Chaque carte affiche le dernier sondage publié
          et la moyenne simple des enquêtes disponibles pour ce duel.
        </p>
      </div>

      {loadError ? <p className="mt-6 text-sm text-rose-600">{loadError}</p> : null}
      {isLoading ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="h-56 animate-pulse rounded-[1.8rem] bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {matchups.map((matchup) => (
            <MatchupCard key={matchup.id} matchup={matchup} candidatesById={candidatesById} />
          ))}
        </div>
      )}
    </section>
  )
}
