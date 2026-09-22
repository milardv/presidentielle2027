import { logEvent } from 'firebase/analytics'
import {
  ArrowLeft,
  Atom,
  Coins,
  Factory,
  Gavel,
  Globe,
  Hourglass,
  Landmark,
  Leaf,
  PiggyBank,
  Scale,
  Shield,
  Sparkles,
  Timer,
  Users,
  Vote,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { analytics } from '../../../firebase'
import { quizAnswerOptions, quizQuestions, type QuizAnswerValue } from '../../../data/quizData.js'
import { useCandidates } from '../../candidates/home/hooks/useCandidates'
import { computeQuizResult, type QuizAnswers } from '../quizEngine'
import { QuizResultView } from './QuizResultView'

const icons: Record<string, LucideIcon> = {
  users: Users,
  hourglass: Hourglass,
  atom: Atom,
  coins: Coins,
  globe: Globe,
  gavel: Gavel,
  landmark: Landmark,
  vote: Vote,
  'piggy-bank': PiggyBank,
  wallet: Wallet,
  scale: Scale,
  shield: Shield,
  leaf: Leaf,
  factory: Factory,
}

const toneClasses: Record<string, string> = {
  rose: 'border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-500 hover:bg-rose-500 hover:text-white focus-visible:ring-rose-400',
  orange: 'border-orange-200 bg-orange-50 text-orange-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white focus-visible:ring-orange-400',
  sky: 'border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-500 hover:bg-sky-500 hover:text-white focus-visible:ring-sky-400',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white focus-visible:ring-emerald-400',
}

const themeGradients = [
  'from-primary/15 via-sky-100 to-white',
  'from-amber-100 via-orange-50 to-white',
  'from-emerald-100 via-teal-50 to-white',
  'from-rose-100 via-pink-50 to-white',
  'from-indigo-100 via-violet-50 to-white',
]

type QuizStage = 'intro' | 'question' | 'result'

interface PoliticalQuizProps {
  variant: 'embedded' | 'page'
  initialAnswers?: QuizAnswers | null
}

function emptyAnswers(): QuizAnswers {
  return Object.fromEntries(quizQuestions.map((question) => [question.id, null])) as QuizAnswers
}

export function PoliticalQuiz({ variant, initialAnswers = null }: PoliticalQuizProps) {
  const { candidates } = useCandidates()
  const [stage, setStage] = useState<QuizStage>(initialAnswers ? 'result' : 'intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers ?? emptyAnswers())
  const [transition, setTransition] = useState<'in' | 'out'>('in')

  const question = quizQuestions[index]
  const result = useMemo(
    () => (stage === 'result' && candidates.length > 0 ? computeQuizResult(answers, candidates) : null),
    [answers, candidates, stage],
  )

  const goTo = useCallback((nextIndex: number, nextAnswers: QuizAnswers) => {
    setTransition('out')
    window.setTimeout(() => {
      if (nextIndex >= quizQuestions.length) {
        setStage('result')
        if (analytics) {
          logEvent(analytics, 'quiz_completed', { answered: Object.values(nextAnswers).filter((value) => value !== null).length })
        }
      } else {
        setIndex(nextIndex)
      }
      setTransition('in')
    }, 160)
  }, [])

  const answer = useCallback(
    (value: QuizAnswerValue | null) => {
      const nextAnswers = { ...answers, [question.id]: value }
      setAnswers(nextAnswers)
      goTo(index + 1, nextAnswers)
    },
    [answers, goTo, index, question],
  )

  const restart = () => {
    setAnswers(emptyAnswers())
    setIndex(0)
    setStage('question')
    if (analytics) {
      logEvent(analytics, 'quiz_started', { variant })
    }
  }

  useEffect(() => {
    if (stage !== 'question') return
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      const option = quizAnswerOptions[Number.parseInt(event.key, 10) - 1]
      if (option) {
        answer(option.value)
      } else if (event.key === 'Backspace' && index > 0) {
        event.preventDefault()
        setIndex(index - 1)
      } else if (event.key === '0' || event.key.toLowerCase() === 'p') {
        answer(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, index, stage])

  useEffect(() => {
    if (stage === 'result' && variant === 'embedded') {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [stage, variant])

  if (stage === 'intro') {
    return (
      <div className="relative overflow-hidden rounded-[2.2rem] border border-primary/20 bg-gradient-to-br from-primary via-indigo-700 to-sky-600 p-6 text-white shadow-[0_30px_80px_rgba(26,34,127,0.28)] sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-amber-300/20 blur-2xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="h-3.5 w-3.5" /> Quiz présidentielle 2027
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Quel candidat vous correspond vraiment ?</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
              14 affirmations, 4 réponses possibles, zéro inscription. On compare vos réponses aux positions publiques des{' '}
              {Math.max(candidates.filter((candidate) => candidate.status !== 'not_running').length, 20)} candidats déclarés et on vous rend un profil… avec un peu d’humour.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/80">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
                <Timer className="h-3.5 w-3.5" /> 2 minutes
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5">Résultat partageable</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5">Aucune donnée enregistrée</span>
            </div>
          </div>
          <button
            type="button"
            onClick={restart}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black text-primary shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Lancer le quiz
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'result') {
    if (!result) {
      return (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Calcul de vos compatibilités…
        </div>
      )
    }
    return <QuizResultView result={result} answers={answers} onRestart={restart} />
  }

  const Icon = icons[question.icon] ?? Sparkles
  const progress = (index / quizQuestions.length) * 100
  const gradient = themeGradients[index % themeGradients.length]

  return (
    <div className={`relative overflow-hidden rounded-[2.2rem] border border-slate-200/80 bg-gradient-to-br ${gradient} p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] sm:p-8`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">{question.theme}</p>
            <p className="text-xs font-semibold text-slate-500">
              Question {index + 1} sur {quizQuestions.length}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600 disabled:opacity-40"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Précédent
        </button>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div
        className={`mt-6 transition-all duration-200 ${transition === 'in' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
        key={question.id}
      >
        <p className="min-h-[5.5rem] text-xl font-black leading-snug tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">{question.statement}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {quizAnswerOptions.map((option, optionIndex) => (
            <button
              key={option.value}
              type="button"
              onClick={() => answer(option.value)}
              className={`group flex min-h-[4.5rem] flex-col items-center justify-center rounded-2xl border-2 px-3 py-3 text-center transition focus-visible:outline-none focus-visible:ring-4 ${toneClasses[option.tone]}`}
            >
              <span className="text-base font-black">{option.short}</span>
              <span className="mt-0.5 text-[11px] font-semibold opacity-80">{option.label}</span>
              <span className="mt-1 hidden text-[10px] font-bold opacity-50 sm:block">touche {optionIndex + 1}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <button type="button" onClick={() => answer(null)} className="font-semibold underline-offset-2 hover:text-primary hover:underline">
            Sans avis, passer cette question
          </button>
          <span className="hidden sm:block">Raccourcis : 1 à 4 pour répondre, retour arrière pour revenir</span>
        </div>
      </div>
    </div>
  )
}
