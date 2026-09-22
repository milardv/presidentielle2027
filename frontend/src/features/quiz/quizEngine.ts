import type { Candidate } from '../../data/candidateTypes'
import {
  candidateStances,
  quizPersonas,
  quizQuestions,
  type QuizAnswerValue,
  type QuizPersona,
  type QuizQuestion,
} from '../../data/quizData.js'

export type QuizAnswers = Record<string, QuizAnswerValue | null>

export interface QuizMatch {
  candidate: Candidate
  score: number
  comparedQuestions: number
  agreements: QuizQuestion[]
  disagreements: QuizQuestion[]
}

export interface QuizResult {
  matches: QuizMatch[]
  antiMatch: QuizMatch | null
  persona: QuizPersona & { key: string }
  answeredCount: number
  institutionsReformer: boolean
}

const ANSWER_CODES: Record<string, QuizAnswerValue | null> = { a: -2, b: -1, c: 1, d: 2, x: null }
const CODE_BY_ANSWER = new Map<QuizAnswerValue | null, string>([
  [-2, 'a'],
  [-1, 'b'],
  [1, 'c'],
  [2, 'd'],
  [null, 'x'],
])

export function answerCode(value: QuizAnswerValue | null): 'a' | 'b' | 'c' | 'd' | 'x' {
  return (CODE_BY_ANSWER.get(value) ?? 'x') as 'a' | 'b' | 'c' | 'd' | 'x'
}

export function encodeAnswers(answers: QuizAnswers): string {
  return quizQuestions.map((question) => CODE_BY_ANSWER.get(answers[question.id] ?? null) ?? 'x').join('')
}

export function decodeAnswers(code: string | null | undefined): QuizAnswers | null {
  if (!code || code.length !== quizQuestions.length || !/^[abcdx]+$/.test(code)) {
    return null
  }

  const answers: QuizAnswers = {}
  quizQuestions.forEach((question, index) => {
    answers[question.id] = ANSWER_CODES[code[index]] ?? null
  })
  return answers
}

function bucket(value: number, low: number, high: number): 'low' | 'mid' | 'high' {
  if (value <= low) return 'low'
  if (value >= high) return 'high'
  return 'mid'
}

function computePersona(answers: QuizAnswers): QuizPersona & { key: string } {
  let eco = 0
  let ecoCount = 0
  let soc = 0
  let socCount = 0

  for (const question of quizQuestions) {
    const answer = answers[question.id]
    if (answer === null || answer === undefined) continue
    if (question.axis.eco) {
      eco += (answer / 2) * question.axis.eco
      ecoCount += 1
    }
    if (question.axis.soc) {
      soc += (answer / 2) * question.axis.soc
      socCount += 1
    }
  }

  const ecoScore = ecoCount ? eco / ecoCount : 0
  const socScore = socCount ? soc / socCount : 0
  const ecoKey = { low: 'left', mid: 'center', high: 'right' }[bucket(ecoScore, -0.3, 0.3)]
  const socKey = { low: 'open', mid: 'center', high: 'order' }[bucket(socScore, -0.3, 0.3)]
  const key = `${socKey}-${ecoKey}`

  return { key, ...quizPersonas[key] }
}

export function computeQuizResult(answers: QuizAnswers, candidates: Candidate[]): QuizResult {
  const answered = quizQuestions.filter((question) => answers[question.id] !== null && answers[question.id] !== undefined)
  const matches: QuizMatch[] = []

  for (const candidate of candidates) {
    const stances = candidateStances[candidate.id]
    if (!stances || candidate.status === 'not_running') continue

    let total = 0
    let compared = 0
    const agreements: QuizQuestion[] = []
    const disagreements: QuizQuestion[] = []

    for (const question of answered) {
      const stance = stances[question.id]
      const answer = answers[question.id]
      if (stance === null || stance === undefined || answer === null || answer === undefined) continue
      const distance = Math.abs(answer - stance)
      total += 1 - distance / 4
      compared += 1
      if (distance <= 1) agreements.push(question)
      if (distance >= 3) disagreements.push(question)
    }

    if (compared < Math.min(6, answered.length)) continue

    matches.push({
      candidate,
      score: Math.round((total / compared) * 100),
      comparedQuestions: compared,
      agreements,
      disagreements,
    })
  }

  matches.sort((a, b) => b.score - a.score || a.candidate.priority - b.candidate.priority)

  const institutionsReformer =
    (answers.proportionnelle ?? 0) >= 1 && (answers.ric ?? 0) >= 1

  return {
    matches,
    antiMatch: matches.length > 3 ? matches[matches.length - 1] : null,
    persona: computePersona(answers),
    answeredCount: answered.length,
    institutionsReformer,
  }
}

export function buildResultPath(result: QuizResult, answers: QuizAnswers): string {
  const topId = result.matches[0]?.candidate.id ?? 'aucun'
  return `/quiz/resultat/${topId}/?r=${encodeAnswers(answers)}`
}

export function buildShareText(result: QuizResult): string {
  const top = result.matches[0]
  if (!top) {
    return 'J’ai fait le quiz présidentielle 2027. Et vous ?'
  }
  return `Mon match présidentielle 2027 : ${top.candidate.name} (${top.score} % de compatibilité). Profil « ${result.persona.title} ». Et vous ?`
}
