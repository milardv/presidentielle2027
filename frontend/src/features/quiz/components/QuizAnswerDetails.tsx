import { Check, Minus, X } from 'lucide-react'
import { useState } from 'react'
import { candidateStances, quizAnswerOptions, quizQuestions } from '../../../data/quizData.js'
import { getCandidateInitials } from '../../candidates/shared/candidateUi'
import type { QuizAnswers, QuizMatch } from '../quizEngine'

interface QuizAnswerDetailsProps {
  podium: QuizMatch[]
  answers: QuizAnswers
}

const stanceLabels: Record<string, string> = {
  '-2': 'Fermement contre',
  '-1': 'Plutôt contre',
  '0': 'Position nuancée',
  '1': 'Plutôt pour',
  '2': 'Fermement pour',
}

const toneChip: Record<string, string> = {
  rose: 'bg-rose-100 text-rose-700',
  orange: 'bg-orange-100 text-orange-700',
  sky: 'bg-sky-100 text-sky-700',
  emerald: 'bg-emerald-100 text-emerald-700',
}

function stanceChipClass(stance: number): string {
  if (stance <= -2) return toneChip.rose
  if (stance === -1) return toneChip.orange
  if (stance === 0) return 'bg-slate-100 text-slate-600'
  if (stance === 1) return toneChip.sky
  return toneChip.emerald
}

function Verdict({ distance }: { distance: number | null }) {
  if (distance === null) {
    return <span className="text-xs font-semibold text-slate-400">—</span>
  }
  if (distance <= 1) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
        <Check className="h-3.5 w-3.5" /> Proches
      </span>
    )
  }
  if (distance === 2) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
        <Minus className="h-3.5 w-3.5" /> Nuance
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
      <X className="h-3.5 w-3.5" /> Opposés
    </span>
  )
}

export function QuizAnswerDetails({ podium, answers }: QuizAnswerDetailsProps) {
  const [selectedId, setSelectedId] = useState(podium[0]?.candidate.id ?? '')
  const selected = podium.find((match) => match.candidate.id === selectedId) ?? podium[0]

  if (!selected) {
    return null
  }

  const stances = candidateStances[selected.candidate.id] ?? {}

  return (
    <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Le détail, question par question</p>
      <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">Vos réponses face au podium</h3>

      <div className="mt-4 flex flex-wrap gap-2">
        {podium.map((match, index) => {
          const isActive = match.candidate.id === selected.candidate.id
          return (
            <button
              key={match.candidate.id}
              type="button"
              onClick={() => setSelectedId(match.candidate.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold transition ${
                isActive ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              {match.candidate.photoUrl ? (
                <img src={match.candidate.photoUrl} alt="" className="h-6 w-6 rounded-full object-cover" loading="lazy" />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] text-white">
                  {getCandidateInitials(match.candidate.name)}
                </span>
              )}
              {index + 1}. {match.candidate.name} · {match.score} %
            </button>
          )
        })}
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.12em] text-slate-400">
              <th className="py-2 pr-3 font-bold">Sujet</th>
              <th className="py-2 pr-3 font-bold">Vous</th>
              <th className="py-2 pr-3 font-bold">{selected.candidate.name}</th>
              <th className="py-2 font-bold">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {quizQuestions.map((question) => {
              const answer = answers[question.id] ?? null
              const stance = stances[question.id] ?? null
              const option = quizAnswerOptions.find((entry) => entry.value === answer)
              const distance = answer !== null && stance !== null ? Math.abs(answer - stance) : null

              return (
                <tr key={question.id} className="border-t border-slate-200/80 align-top">
                  <td className="py-3 pr-3">
                    <p className="font-bold text-slate-900">{question.theme}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{question.agreeLabel} ?</p>
                  </td>
                  <td className="py-3 pr-3">
                    {option ? (
                      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${toneChip[option.tone]}`}>{option.label}</span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">Sans avis</span>
                    )}
                  </td>
                  <td className="py-3 pr-3">
                    {stance !== null ? (
                      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${stanceChipClass(stance)}`}>{stanceLabels[String(stance)]}</span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">Position non établie</span>
                    )}
                  </td>
                  <td className="py-3">
                    <Verdict distance={distance} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        « Proches » : au plus un cran d’écart sur l’échelle en quatre niveaux ; « Opposés » : trois crans ou plus. Les positions des candidats sont estimées à
        partir de leurs programmes et déclarations, sourcés dans leur fiche.
      </p>
    </section>
  )
}
