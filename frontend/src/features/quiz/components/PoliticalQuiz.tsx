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
  ArrowRight,
  Timer,
  Users,
  Vote,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { analytics } from '../../../firebase'
import { quizAnswerOptions, quizQuestions, type QuizAnswerValue } from '../../../data/quizData.js'
import { recordQuizCompletion } from '../../../services/quizStatsRepository'
import { useCandidates } from '../../candidates/home/hooks/useCandidates'
import { computeQuizResult, type QuizAnswers } from '../quizEngine'
import { QuizResultView } from './QuizResultView'
import { QuizStatement } from './QuizStatement'

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
  const changingQuestion = useRef(false)

  const question = quizQuestions[index]
  const result = useMemo(
    () => (stage === 'result' && candidates.length > 0 ? computeQuizResult(answers, candidates) : null),
    [answers, candidates, stage],
  )

  const goTo = useCallback((nextIndex: number, nextAnswers: QuizAnswers) => {
    if (changingQuestion.current) return
    changingQuestion.current = true
    setTransition('out')
    window.setTimeout(() => {
      if (nextIndex >= quizQuestions.length) {
        setStage('result')
        if (analytics) {
          logEvent(analytics, 'quiz_completed', { answered: Object.values(nextAnswers).filter((value) => value !== null).length })
        }
        if (candidates.length > 0) {
          recordQuizCompletion(computeQuizResult(nextAnswers, candidates), nextAnswers).catch((error: unknown) => {
            console.warn('Quiz stats not recorded', error)
          })
        }
      } else {
        setIndex(nextIndex)
      }
      setTransition('in')
      changingQuestion.current = false
    }, 160)
  }, [candidates])

  const answer = useCallback(
    (value: QuizAnswerValue | null) => {
      const nextAnswers = { ...answers, [question.id]: value }
      setAnswers(nextAnswers)
      goTo(index + 1, nextAnswers)
    },
    [answers, goTo, index, question],
  )

  const restart = () => {
    changingQuestion.current = false
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
      if (document.body.dataset.glossaryOpen) return
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
      <div className="edition-quiz-intro">
        <div className="edition-quiz-intro-content">
          <div className="edition-quiz-seal" aria-hidden="true"><Vote size={30} /></div>
          <h2>Et vous, où vous situez-vous dans la campagne ?</h2>
          <p>14 prises de position. Quelques minutes pour confronter vos idées aux positions publiques des candidats, et découvrir vos accords comme vos désaccords.</p>
          <div className="edition-quiz-facts"><span><Timer size={16} /> Environ 2 minutes</span><span>Sans inscription</span><span>Résultat partageable</span></div>
          <button type="button" onClick={restart} className="edition-quiz-start">Commencer le quiz <ArrowRight size={19} /></button>
        </div>
        <div className="edition-quiz-decor" aria-hidden="true"><span>POUR</span><span>CONTRE</span><span>À NUANCER</span><i>Vos idées méritent mieux qu’une étiquette.</i></div>
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
  const progress = ((index + 1) / quizQuestions.length) * 100

  return (
    <div className="edition-quiz-question">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="edition-question-icon">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="edition-question-theme">{question.theme}</p>
            <p className="edition-question-count">
              Question {index + 1} sur {quizQuestions.length}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="edition-question-back"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Précédent
        </button>
      </div>

      <div className="edition-quiz-progress" role="progressbar" aria-label="Progression du quiz" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={quizQuestions.length}>
        <div style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <div
        className={`edition-question-body ${transition === 'out' ? 'is-leaving' : ''}`}
        key={question.id}
      >
        <QuizStatement
          question={question}
          className="edition-question-statement"
          chipsClassName="mt-3"
        />

        <div className="edition-answer-grid">
          {quizAnswerOptions.map((option, optionIndex) => (
            <button
              key={option.value}
              type="button"
              onClick={() => answer(option.value)}
              className={`edition-answer edition-answer-${option.tone} ${toneClasses[option.tone]}`}
            >
              <span className="edition-answer-key">{optionIndex + 1}</span>
              <span className="edition-answer-short">{option.short}</span>
              <span className="edition-answer-label">{option.label}</span>
            </button>
          ))}
        </div>

        <div className="edition-question-footer">
          <button type="button" onClick={() => answer(null)} className="edition-skip">
            Sans avis, passer cette question
          </button>
          <span className="hidden sm:block">Raccourcis : 1 à 4 pour répondre, retour arrière pour revenir</span>
        </div>
      </div>
    </div>
  )
}
