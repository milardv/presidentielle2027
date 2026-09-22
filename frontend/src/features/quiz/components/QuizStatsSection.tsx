import { BarChart3, Users2 } from 'lucide-react'
import { useMemo } from 'react'
import type { Candidate } from '../../../data/candidateTypes'
import { quizAnswerOptions, quizQuestions } from '../../../data/quizData.js'
import type { QuizAnswerDistribution } from '../../../data/quizStatsTypes'
import { useCandidates } from '../../candidates/home/hooks/useCandidates'
import { getCandidateInitials, getCandidatePartyAccentColor } from '../../candidates/shared/candidateUi'
import { useQuizStats } from '../hooks/useQuizStats'

const answerBarColors: Record<string, string> = {
  rose: '#f43f5e',
  orange: '#fb923c',
  sky: '#0ea5e9',
  emerald: '#10b981',
}

const codeByValue: Record<number, 'a' | 'b' | 'c' | 'd'> = { [-2]: 'a', [-1]: 'b', [1]: 'c', [2]: 'd' }

function meanLabel(mean: number): string {
  if (mean <= -1.2) return 'Nettement contre'
  if (mean <= -0.4) return 'Plutôt contre'
  if (mean < 0.4) return 'Partagés'
  if (mean < 1.2) return 'Plutôt pour'
  return 'Nettement pour'
}

function CandidateRow({
  candidate,
  name,
  count,
  share,
  maxShare,
}: {
  candidate: Candidate | undefined
  name: string
  count: number
  share: number
  maxShare: number
}) {
  const accent = candidate ? getCandidatePartyAccentColor(candidate.party) : '#64748b'
  return (
    <li className="flex items-center gap-3">
      {candidate?.photoUrl ? (
        <img src={candidate.photoUrl} alt="" className="h-10 w-10 shrink-0 rounded-2xl object-cover" loading="lazy" />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-xs font-bold text-white">
          {getCandidateInitials(name)}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-sm font-bold text-slate-900">
            {name} {candidate ? <span className="text-xs font-normal text-slate-400">· {candidate.party}</span> : null}
          </p>
          <p className="shrink-0 text-sm font-black tabular-nums text-slate-900">
            {share.toFixed(share < 10 ? 1 : 0).replace('.', ',')} % <span className="text-xs font-semibold text-slate-400">({count})</span>
          </p>
        </div>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(share / maxShare) * 100}%`, backgroundColor: accent }} />
        </div>
      </div>
    </li>
  )
}

function AnswerDistributionRow({ questionId, distribution }: { questionId: string; distribution: QuizAnswerDistribution }) {
  const question = quizQuestions.find((entry) => entry.id === questionId)
  if (!question) return null

  const answered = quizAnswerOptions.reduce((sum, option) => sum + distribution[codeByValue[option.value]], 0)
  const total = answered + distribution.x
  const mean = answered > 0 ? quizAnswerOptions.reduce((sum, option) => sum + option.value * distribution[codeByValue[option.value]], 0) / answered : 0
  const agreeShare = answered > 0 ? ((distribution.c + distribution.d) / answered) * 100 : 0

  return (
    <li className="rounded-[1.4rem] border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{question.theme}</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-900">{question.statement}</p>
        </div>
        <p className="shrink-0 text-sm font-black text-slate-900 sm:text-right">
          {answered > 0 ? `${Math.round(agreeShare)} % d’accord` : 'Pas encore de réponse'}
          <span className="block text-xs font-semibold text-slate-500">{answered > 0 ? meanLabel(mean) : ''}</span>
        </p>
      </div>
      {answered > 0 ? (
        <>
          <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-slate-200">
            {quizAnswerOptions.map((option) => {
              const count = distribution[codeByValue[option.value]]
              const width = (count / answered) * 100
              return width > 0 ? (
                <div
                  key={option.value}
                  title={`${option.label} : ${Math.round(width)} %`}
                  className="h-full"
                  style={{ width: `${width}%`, backgroundColor: answerBarColors[option.tone] }}
                />
              ) : null
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500">
            {quizAnswerOptions.map((option) => (
              <span key={option.value} className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: answerBarColors[option.tone] }} />
                {option.short} {Math.round((distribution[codeByValue[option.value]] / answered) * 100)} %
              </span>
            ))}
            {distribution.x > 0 ? <span>Sans avis : {Math.round((distribution.x / total) * 100)} %</span> : null}
          </div>
        </>
      ) : null}
    </li>
  )
}

export function QuizStatsSection() {
  const { stats, isLoading, loadError } = useQuizStats()
  const { candidates } = useCandidates()
  const candidatesById = useMemo(() => new Map(candidates.map((candidate) => [candidate.id, candidate])), [candidates])

  const ranking = useMemo(() => {
    if (!stats) return []
    return Object.entries(stats.topCounts)
      .map(([candidateId, count]) => ({ candidateId, count, share: stats.completed > 0 ? (count / stats.completed) * 100 : 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }, [stats])
  const maxShare = ranking[0]?.share ?? 1

  return (
    <section id="stats" className="scroll-mt-24 space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              <BarChart3 className="h-4 w-4" /> Statistiques des participants
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Les candidats le plus souvent en tête</h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
            Part des participants pour qui chaque candidat ressort n°1 du quiz. Ce n’est pas un sondage : les répondants ne sont pas représentatifs des
            électeurs, et un même internaute peut refaire le test.
          </p>
        </div>

        {loadError ? <p className="mt-6 text-sm text-rose-600">{loadError}</p> : null}
        {isLoading ? (
          <div className="mt-6 space-y-3">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="h-10 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : stats && stats.completed > 0 ? (
          <>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              <Users2 className="h-3.5 w-3.5" /> {stats.completed.toLocaleString('fr-FR')} quiz terminés
            </p>
            <ol className="mt-5 space-y-4">
              {ranking.map((entry) => {
                const candidate = candidatesById.get(entry.candidateId)
                return (
                  <CandidateRow
                    key={entry.candidateId}
                    candidate={candidate}
                    name={candidate?.name ?? entry.candidateId}
                    count={entry.count}
                    share={entry.share}
                    maxShare={maxShare}
                  />
                )
              })}
            </ol>
          </>
        ) : loadError ? null : (
          <p className="mt-6 text-sm text-slate-500">Personne n’a encore terminé le quiz. Soyez le premier : votre résultat alimentera ce classement.</p>
        )}
      </div>

      {stats && stats.completed > 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Question par question</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Ce que répondent les participants</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
              Répartition des réponses pour chaque affirmation, du « pas du tout d’accord » (rose) au « tout à fait d’accord » (vert), et part de
              participants d’accord au total.
            </p>
          </div>
          <ul className="mt-6 grid gap-3 lg:grid-cols-2">
            {quizQuestions.map((question) => (
              <AnswerDistributionRow key={question.id} questionId={question.id} distribution={stats.answers[question.id]} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
