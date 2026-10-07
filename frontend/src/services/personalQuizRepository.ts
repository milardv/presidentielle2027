import { deleteField, doc, onSnapshot, serverTimestamp, setDoc, updateDoc, type Unsubscribe } from 'firebase/firestore'
import { quizQuestions } from '../data/quizData.js'
import { db } from '../firebase'
import { decodeAnswers, encodeAnswers, type QuizAnswers, type QuizResult } from '../features/quiz/quizEngine'

export interface SavedQuizMatch {
  candidateId: string
  name: string
  score: number
}

export interface SavedPersonalQuizResult {
  answersCode: string
  savedAt: number
  answeredCount: number
  personaTitle: string
  personaTagline: string
  institutionsReformer: boolean
  matches: SavedQuizMatch[]
}

function parseSavedQuiz(value: unknown): SavedPersonalQuizResult | null {
  if (!value || typeof value !== 'object') return null
  const raw = value as Record<string, unknown>
  if (typeof raw.answersCode !== 'string' || !decodeAnswers(raw.answersCode)) return null
  if (typeof raw.savedAt !== 'number' || !Number.isFinite(raw.savedAt)) return null
  if (typeof raw.personaTitle !== 'string' || typeof raw.personaTagline !== 'string' || typeof raw.institutionsReformer !== 'boolean') return null
  if (!Array.isArray(raw.matches)) return null
  const matches = raw.matches.filter((match): match is SavedQuizMatch => {
    if (!match || typeof match !== 'object') return false
    const entry = match as Record<string, unknown>
    return typeof entry.candidateId === 'string' && typeof entry.name === 'string' && typeof entry.score === 'number' && Number.isFinite(entry.score) && entry.score >= 0 && entry.score <= 100
  }).slice(0, 3)
  const answeredCount = [...raw.answersCode].filter((code) => code !== 'x').length
  return { answersCode: raw.answersCode, savedAt: raw.savedAt, answeredCount, personaTitle: raw.personaTitle, personaTagline: raw.personaTagline, institutionsReformer: raw.institutionsReformer, matches }
}

export function subscribeToPersonalQuizResult(uid: string, onNext: (result: SavedPersonalQuizResult | null) => void, onError: (error: unknown) => void): Unsubscribe {
  return onSnapshot(doc(db, 'users', uid), (snapshot) => onNext(parseSavedQuiz(snapshot.data()?.personalQuizResult)), onError)
}

export async function savePersonalQuizResult(uid: string, result: QuizResult, answers: QuizAnswers): Promise<void> {
  const answersCode = encodeAnswers(answers)
  if (!decodeAnswers(answersCode) || result.answeredCount < 6 || result.matches.length === 0) throw new Error('invalid-personal-quiz-result')
  const saved: SavedPersonalQuizResult = {
    answersCode,
    savedAt: Date.now(),
    answeredCount: quizQuestions.filter((question) => answers[question.id] !== null && answers[question.id] !== undefined).length,
    personaTitle: result.persona.title,
    personaTagline: result.persona.tagline,
    institutionsReformer: result.institutionsReformer,
    matches: result.matches.slice(0, 3).map(({ candidate, score }) => ({ candidateId: candidate.id, name: candidate.name, score })),
  }
  await setDoc(doc(db, 'users', uid), { personalQuizResult: saved, updatedAt: serverTimestamp() }, { merge: true })
}

export async function clearPersonalQuizResult(uid: string): Promise<void> {
  await updateDoc(doc(db, 'users', uid), { personalQuizResult: deleteField(), updatedAt: serverTimestamp() })
}
