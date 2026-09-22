export type QuizAnswerCode = 'a' | 'b' | 'c' | 'd' | 'x'

export type QuizAnswerDistribution = Record<QuizAnswerCode, number>

export interface QuizStats {
  completed: number
  topCounts: Record<string, number>
  answers: Record<string, QuizAnswerDistribution>
}
