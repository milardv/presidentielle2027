import { BookOpen, Info, X } from 'lucide-react'
import { useEffect, useId, useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { QuizQuestion } from '../../../data/quizData.js'
import { getQuestionTerms, type QuizQuestionTerm } from '../../../data/quizGlossary.js'

interface QuizStatementProps {
  question: QuizQuestion
  className?: string
  /** Shows the row of tappable chips under the statement: the mobile-friendly entry point. */
  showChips?: boolean
  chipsClassName?: string
}

type Segment = { text: string; term?: QuizQuestionTerm }

function splitStatement(statement: string, terms: QuizQuestionTerm[]): Segment[] {
  const positions = terms
    .map((term) => ({ term, index: statement.indexOf(term.match) }))
    .filter((entry) => entry.index >= 0)
    .sort((a, b) => a.index - b.index)
  const segments: Segment[] = []
  let cursor = 0
  for (const { term, index } of positions) {
    if (index < cursor) continue
    if (index > cursor) segments.push({ text: statement.slice(cursor, index) })
    segments.push({ text: term.match, term })
    cursor = index + term.match.length
  }
  if (cursor < statement.length) segments.push({ text: statement.slice(cursor) })
  return segments
}

function GlossarySheet({ terms, activeId, onSelect, onClose }: { terms: QuizQuestionTerm[]; activeId: string; onSelect: (id: string) => void; onClose: () => void }) {
  const active = terms.find((term) => term.id === activeId) ?? terms[0]
  const titleId = useId()

  useEffect(() => {
    document.body.dataset.glossaryOpen = 'true'
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      delete document.body.dataset.glossaryOpen
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey, true)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <button type="button" aria-label="Fermer" onClick={onClose} className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-h-[85vh] overflow-y-auto rounded-t-[1.8rem] bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl animate-[glossarySheetIn_.22s_ease-out] sm:max-w-md sm:rounded-[1.8rem] sm:p-6 dark:bg-slate-900"
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-200 sm:hidden" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
              <BookOpen className="h-3.5 w-3.5" /> De quoi parle-t-on ?
            </p>
            <h3 id={titleId} className="mt-1.5 text-xl font-black tracking-tight text-slate-950 dark:text-white">
              {active.term}
            </h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">{active.definition}</p>
        {terms.length > 1 ? (
          <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Autres termes de cette affirmation</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {terms.map((term) => (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => onSelect(term.id)}
                  className={`min-h-[2.5rem] rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                    term.id === active.id ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-primary/50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'
                  }`}
                >
                  {term.term}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <p className="mt-4 text-[11px] leading-relaxed text-slate-400">Définitions neutres rédigées pour situer le débat ; elles ne préjugent pas de la bonne réponse.</p>
        <button type="button" onClick={onClose} className="mt-4 w-full rounded-2xl bg-primary py-3.5 text-base font-black text-white sm:hidden">
          Compris
        </button>
      </div>
    </div>,
    document.body,
  )
}

function TermButton({ term, children, onOpen }: { term: QuizQuestionTerm; children: ReactNode; onOpen: () => void }) {
  const [hover, setHover] = useState(false)
  const tooltipId = useId()

  return (
    <span className="relative inline">
      <span
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onOpen()
          }
        }}
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-describedby={hover ? tooltipId : undefined}
        aria-label={`${children} : ${term.term}, afficher la définition`}
        className="box-decoration-clone cursor-help rounded-sm underline decoration-primary/50 decoration-dotted decoration-2 underline-offset-[5px] transition hover:bg-primary/10 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        {children}
        <Info className="ml-0.5 inline h-[0.6em] w-[0.6em] -translate-y-[0.35em] text-primary/70" aria-hidden="true" />
      </span>
      {hover ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute left-0 top-full z-40 mt-2 block w-72 max-w-[80vw] rounded-2xl border border-slate-200 bg-white p-3 text-left text-sm font-medium normal-case leading-snug tracking-normal text-slate-700 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-primary">{term.term}</span>
          <span className="mt-1 block">{term.short}</span>
          <span className="mt-1.5 block text-[11px] font-semibold text-slate-400">Cliquer pour la définition complète</span>
        </span>
      ) : null}
    </span>
  )
}

export function QuizStatement({ question, className = '', showChips = true, chipsClassName = '' }: QuizStatementProps) {
  const terms = useMemo(() => getQuestionTerms(question.id), [question.id])
  const segments = useMemo(() => splitStatement(question.statement, terms), [question.statement, terms])
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <>
      <p className={className}>
        {segments.map((segment, index) =>
          segment.term ? (
            <TermButton key={`${segment.term.id}-${index}`} term={segment.term} onOpen={() => setOpenId(segment.term!.id)}>
              {segment.text}
            </TermButton>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
      {showChips && terms.length ? (
        <div className={`flex flex-wrap items-center gap-2 ${chipsClassName}`}>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            <BookOpen className="h-3.5 w-3.5" /> C’est quoi ?
          </span>
          {terms.map((term) => (
            <button
              key={term.id}
              type="button"
              onClick={() => setOpenId(term.id)}
              className="min-h-[2.25rem] rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary"
            >
              {term.term}
            </button>
          ))}
        </div>
      ) : null}
      {openId ? <GlossarySheet terms={terms} activeId={openId} onSelect={setOpenId} onClose={() => setOpenId(null)} /> : null}
    </>
  )
}
