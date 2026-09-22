import { doc, getDoc, increment, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { quizQuestions } from '../data/quizData.js'
import type { QuizAnswerCode, QuizAnswerDistribution, QuizStats } from '../data/quizStatsTypes'
import { answerCode, type QuizAnswers, type QuizResult } from '../features/quiz/quizEngine'

const STATS_DOC = doc(db, 'quiz_stats_2027', 'global')
const ANSWER_CODES: QuizAnswerCode[] = ['a', 'b', 'c', 'd', 'x']

export async function recordQuizCompletion(result: QuizResult, answers: QuizAnswers): Promise<void> {
  const top = result.matches[0]
  if (!top) {
    return
  }

  const answerIncrements: Record<string, Record<string, ReturnType<typeof increment>>> = {}
  for (const question of quizQuestions) {
    answerIncrements[question.id] = { [answerCode(answers[question.id] ?? null)]: increment(1) }
  }

  await setDoc(
    STATS_DOC,
    {
      completed: increment(1),
      topCounts: { [top.candidate.id]: increment(1) },
      personas: { [result.persona.key]: increment(1) },
      answers: answerIncrements,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

function parseDistribution(value: unknown): QuizAnswerDistribution {
  const distribution: QuizAnswerDistribution = { a: 0, b: 0, c: 0, d: 0, x: 0 }
  if (typeof value === 'object' && value !== null) {
    for (const code of ANSWER_CODES) {
      const count = (value as Record<string, unknown>)[code]
      if (typeof count === 'number') {
        distribution[code] = count
      }
    }
  }
  return distribution
}

export async function getQuizStats(): Promise<QuizStats> {
  const snapshot = await getDoc(STATS_DOC)
  const data = snapshot.exists() ? snapshot.data() : {}

  const topCounts: Record<string, number> = {}
  if (typeof data.topCounts === 'object' && data.topCounts !== null) {
    for (const [candidateId, count] of Object.entries(data.topCounts as Record<string, unknown>)) {
      if (typeof count === 'number') {
        topCounts[candidateId] = count
      }
    }
  }

  const answers: Record<string, QuizAnswerDistribution> = {}
  for (const question of quizQuestions) {
    answers[question.id] = parseDistribution(
      typeof data.answers === 'object' && data.answers !== null ? (data.answers as Record<string, unknown>)[question.id] : null,
    )
  }

  return {
    completed: typeof data.completed === 'number' ? data.completed : 0,
    topCounts,
    answers,
  }
}
