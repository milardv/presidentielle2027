import { knowledgeCategories, knowledgeQuestions, type KnowledgeQuestion } from '../../data/knowledgeQuestions'

export const GAME_STORAGE_KEY = 'presidentielle2027-knowledge-game-v1'
export const MASTERY_THRESHOLD = 7

export interface KnowledgeAnswer { questionId: string; selectedOptionIndex: number }
export interface KnowledgeSession {
  version: 1
  seed: number
  answers: KnowledgeAnswer[]
  phase: 'playing' | 'feedback' | 'checkpoint' | 'result'
  stopped: boolean
}

function hash(seed: number, value: string): number {
  let result = (seed ^ 2166136261) >>> 0
  for (let index = 0; index < value.length; index += 1) {
    result = Math.imul(result ^ value.charCodeAt(index), 16777619) >>> 0
  }
  return result
}

function shuffled<T>(items: T[], seed: number): T[] {
  const result = [...items]
  let state = seed || 1
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state + 0x6d2b79f5) >>> 0
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value)
    const target = Math.floor((((value ^ (value >>> 14)) >>> 0) / 4294967296) * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

export function createQuestionOrder(seed: number): KnowledgeQuestion[] {
  return Array.from({ length: 10 }, (_, round) =>
    shuffled(knowledgeQuestions.filter((question) => question.round === round + 1), hash(seed, `round-${round}`)),
  ).flat()
}

export function getShuffledOptions(question: KnowledgeQuestion, seed: number) {
  return shuffled(question.options.map((text, originalIndex) => ({ text, originalIndex })), hash(seed, question.id))
}

export function createKnowledgeSession(): KnowledgeSession {
  const random = new Uint32Array(1)
  crypto.getRandomValues(random)
  return { version: 1, seed: random[0], answers: [], phase: 'playing', stopped: false }
}

export function getKnowledgeStats(answers: KnowledgeAnswer[]) {
  const answerById = new Map(answers.map((answer) => [answer.questionId, answer.selectedOptionIndex]))
  const categories = knowledgeCategories.map((category) => {
    const categoryQuestions = knowledgeQuestions.filter((question) => question.categoryId === category.id)
    const answered = categoryQuestions.filter((question) => answerById.has(question.id))
    const correct = answered.filter((question) => answerById.get(question.id) === question.correctIndex).length
    return { ...category, answered: answered.length, correct, mastered: answered.length === 10 && correct >= MASTERY_THRESHOLD }
  })
  const correct = categories.reduce((sum, category) => sum + category.correct, 0)
  return { answered: answers.length, correct, score: correct * 10, categories, mastered: categories.filter((category) => category.mastered) }
}

export function parseKnowledgeSession(parsed: unknown): KnowledgeSession | null {
  if (!parsed || typeof parsed !== 'object') return null
  const value = parsed as Partial<KnowledgeSession>
  if (value.version !== 1 || typeof value.seed !== 'number' || !Number.isInteger(value.seed) || value.seed < 0 || value.seed > 0xffffffff || !Array.isArray(value.answers) || typeof value.stopped !== 'boolean') return null
  if (!['playing', 'feedback', 'checkpoint', 'result'].includes(value.phase ?? '')) return null
  const order = createQuestionOrder(value.seed)
  if (value.answers.length > order.length) return null
  if (!value.answers.every((answer, index) => answer && answer.questionId === order[index].id && Number.isInteger(answer.selectedOptionIndex) && answer.selectedOptionIndex >= 0 && answer.selectedOptionIndex < 4)) return null
  if (value.phase === 'feedback' && value.answers.length === 0) return null
  if (value.phase === 'checkpoint' && (value.answers.length === 0 || value.answers.length % 10 !== 0)) return null
  if (value.phase === 'playing' && value.answers.length === 100) return null
  if (value.phase === 'result' && value.answers.length === 0) return null
  return value as KnowledgeSession
}

export function loadKnowledgeSession(): KnowledgeSession | null {
  try {
    const stored = localStorage.getItem(GAME_STORAGE_KEY)
    return stored ? parseKnowledgeSession(JSON.parse(stored) as unknown) : null
  } catch {
    return null
  }
}

export function resumeKnowledgeSession(saved: KnowledgeSession): KnowledgeSession {
  return { ...saved, phase: saved.answers.length === 100 ? 'result' : 'playing', stopped: false }
}

export function persistKnowledgeSession(session: KnowledgeSession | null) {
  try {
    if (session) localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(session))
    else localStorage.removeItem(GAME_STORAGE_KEY)
  } catch { /* Le jeu reste utilisable si le stockage local est bloqué. */ }
}
