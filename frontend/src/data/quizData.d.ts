export type QuizAnswerValue = -2 | -1 | 1 | 2
export type QuizStance = -2 | -1 | 0 | 1 | 2

export interface QuizAnswerOption {
  value: QuizAnswerValue
  label: string
  short: string
  tone: 'rose' | 'orange' | 'sky' | 'emerald'
}

export interface QuizQuestion {
  id: string
  theme: string
  icon: string
  statement: string
  agreeLabel: string
  disagreeLabel: string
  axis: { eco?: 1 | -1; soc?: 1 | -1 }
}

export interface QuizPersona {
  title: string
  tagline: string
  gradient: string
}

export const QUIZ_UPDATED_AT: string
export const QUIZ_ANSWER_VALUES: QuizAnswerValue[]
export const QUIZ_FEEDBACK_URL: string
export const quizAnswerOptions: QuizAnswerOption[]
export const quizQuestions: QuizQuestion[]
export const candidateStances: Record<string, Record<string, QuizStance | null>>
export const quizPersonas: Record<string, QuizPersona>
