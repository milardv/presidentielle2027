export interface QuizGlossaryTerm {
  term: string
  /** One line shown in the hover tooltip. */
  short: string
  /** Full explanation shown in the sheet. */
  definition: string
}

export interface QuizQuestionTerm extends QuizGlossaryTerm {
  id: string
  /** Exact fragment of the statement to highlight. */
  match: string
}

export const quizGlossaryTerms: Record<string, QuizGlossaryTerm>
export const quizQuestionTerms: Record<string, Array<{ id: string; match: string }>>
export function getQuestionTerms(questionId: string): QuizQuestionTerm[]
