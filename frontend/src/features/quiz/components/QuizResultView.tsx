import { Check, Copy, ExternalLink, Link2, RotateCcw, Share2, X } from 'lucide-react'
import { useState } from 'react'
import type { Candidate } from '../../../data/candidateTypes'
import { QUIZ_FEEDBACK_URL } from '../../../data/quizData.js'
import { SITE_URL, withBasePath } from '../../../seo/site'
import { getCandidateInitials, getCandidatePartyAccentColor } from '../../candidates/shared/candidateUi'
import { buildResultPath, buildShareText, type QuizAnswers, type QuizMatch, type QuizResult } from '../quizEngine'

interface QuizResultViewProps {
  result: QuizResult
  answers: QuizAnswers
  onRestart: () => void
}

function Portrait({ candidate, size }: { candidate: Candidate; size: 'lg' | 'md' | 'sm' }) {
  const dimension = size === 'lg' ? 'h-28 w-28 sm:h-32 sm:w-32' : size === 'md' ? 'h-20 w-20' : 'h-10 w-10'
  const accent = getCandidatePartyAccentColor(candidate.party)

  return candidate.photoUrl ? (
    <img
      src={candidate.photoUrl}
      alt={`Portrait de ${candidate.name}`}
      className={`${dimension} rounded-[1.6rem] border-4 object-cover shadow-xl`}
      style={{ borderColor: accent }}
      loading="lazy"
    />
  ) : (
    <div
      className={`${dimension} flex items-center justify-center rounded-[1.6rem] border-4 bg-slate-800 text-xl font-black text-white shadow-xl`}
      style={{ borderColor: accent }}
    >
      {getCandidateInitials(candidate.name)}
    </div>
  )
}

function PodiumCard({ match, rank }: { match: QuizMatch; rank: 1 | 2 | 3 }) {
  const isFirst = rank === 1
  const medal = rank === 1 ? 'Votre match' : rank === 2 ? '2e' : '3e'

  return (
    <a
      href={withBasePath(`/candidats/${match.candidate.id}/`)}
      className={`group flex flex-col items-center rounded-[1.8rem] border bg-white p-5 text-center transition hover:-translate-y-0.5 hover:shadow-xl ${
        isFirst ? 'border-primary/40 shadow-[0_24px_60px_rgba(26,34,127,0.18)] sm:-mt-6 sm:p-7' : 'border-slate-200 shadow-sm'
      }`}
    >
      <span
        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
          isFirst ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {medal}
      </span>
      <div className="mt-4">
        <Portrait candidate={match.candidate} size={isFirst ? 'lg' : 'md'} />
      </div>
      <p className={`mt-4 font-black tracking-tight text-slate-950 ${isFirst ? 'text-2xl' : 'text-lg'}`}>{match.candidate.name}</p>
      <p className="mt-1 text-xs font-semibold text-slate-500">{match.candidate.party}</p>
      <p className={`mt-3 font-black tabular-nums ${isFirst ? 'text-5xl text-primary' : 'text-3xl text-slate-800'}`}>{match.score} %</p>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">compatibilité</p>
    </a>
  )
}

export function QuizResultView({ result, answers, onRestart }: QuizResultViewProps) {
  const [copied, setCopied] = useState(false)
  const top = result.matches[0]
  const shareUrl = `${SITE_URL}${buildResultPath(result, answers)}`
  const shareText = buildShareText(result)
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copiez ce lien :', shareUrl)
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title: 'Mon match présidentielle 2027', text: shareText, url: shareUrl })
    } catch {
      /* user dismissed */
    }
  }

  if (!top) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center">
        <p className="text-lg font-bold text-slate-900">Pas assez de réponses pour trouver un match.</p>
        <p className="mt-2 text-sm text-slate-500">Répondez à au moins six affirmations pour obtenir un résultat.</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white"
        >
          <RotateCcw className="h-4 w-4" /> Refaire le quiz
        </button>
      </div>
    )
  }

  const podium = result.matches.slice(0, 3)
  const ordered = podium.length === 3 ? [podium[1], podium[0], podium[2]] : podium
  const ranks: Array<1 | 2 | 3> = podium.length === 3 ? [2, 1, 3] : podium.map((_, index) => (index + 1) as 1 | 2 | 3)

  return (
    <div className="space-y-6">
      <div className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${result.persona.gradient} p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8`}>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/80">Votre profil politique</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          {result.persona.title}
          {result.institutionsReformer ? <span className="ml-2 align-middle text-base font-bold text-white/85">+ réformateur des institutions</span> : null}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">{result.persona.tagline}</p>
        <p className="mt-4 text-xs text-white/70">
          {result.answeredCount} réponses sur {Object.keys(answers).length} affirmations · comparées aux positions publiques de {result.matches.length} candidats.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 sm:items-end sm:pt-6">
        {ordered.map((match, index) => (
          <PodiumCard key={match.candidate.id} match={match} rank={ranks[index]} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Pourquoi {top.candidate.name} ?</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Vous êtes proches sur <span className="font-bold text-slate-900">{top.agreements.length}</span> sujets sur {top.comparedQuestions} comparés
            {top.disagreements.length > 0 ? (
              <>
                , en désaccord net sur <span className="font-bold text-slate-900">{top.disagreements.length}</span>.
              </>
            ) : (
              '. Aucun désaccord frontal : c’est presque suspect.'
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {top.agreements.slice(0, 6).map((question) => (
              <span key={question.id} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <Check className="h-3.5 w-3.5" /> {question.theme}
              </span>
            ))}
            {top.disagreements.slice(0, 4).map((question) => (
              <span key={question.id} className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
                <X className="h-3.5 w-3.5" /> {question.theme}
              </span>
            ))}
          </div>
          <a
            href={withBasePath(`/candidats/${top.candidate.id}/`)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            Lire sa fiche sourcée <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        <section className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Partager mon résultat</p>
          <div className="mt-4 flex flex-col gap-2">
            {canNativeShare ? (
              <button
                type="button"
                onClick={nativeShare}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
              >
                <Share2 className="h-4 w-4" /> Partager
              </button>
            ) : null}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Partager sur X
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-600 bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} {copied ? 'Lien copié !' : 'Copier le lien'}
            </button>
          </div>
          {result.antiMatch ? (
            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              Le bulletin le plus éloigné de vous : <span className="font-bold text-slate-700">{result.antiMatch.candidate.name}</span> ({result.antiMatch.score} %).
            </p>
          ) : null}
        </section>
      </div>

      <details className="group rounded-[1.8rem] border border-slate-200 bg-white p-6">
        <summary className="cursor-pointer list-none text-sm font-bold text-slate-900">
          Voir le classement complet ({result.matches.length} candidats)
        </summary>
        <ol className="mt-4 space-y-2">
          {result.matches.map((match, index) => (
            <li key={match.candidate.id} className="flex items-center gap-3">
              <span className="w-6 text-right text-xs font-bold text-slate-400">{index + 1}</span>
              <Portrait candidate={match.candidate} size="sm" />
              <a href={withBasePath(`/candidats/${match.candidate.id}/`)} className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800 hover:text-primary">
                {match.candidate.name} <span className="text-xs font-normal text-slate-400">· {match.candidate.party}</span>
              </a>
              <div className="hidden h-2 w-32 overflow-hidden rounded-full bg-slate-100 sm:block">
                <div className="h-full rounded-full" style={{ width: `${match.score}%`, backgroundColor: getCandidatePartyAccentColor(match.candidate.party) }} />
              </div>
              <span className="w-12 text-right text-sm font-black tabular-nums text-slate-900">{match.score} %</span>
            </li>
          ))}
        </ol>
      </details>

      <div className="flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
        <p className="max-w-2xl leading-relaxed">
          Les positions des candidats sont estimées à partir de leurs programmes et déclarations publiques (voir les fiches). Ce quiz mesure une proximité d’opinions, pas une intention de vote.{' '}
          <a href={QUIZ_FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
            Signaler une erreur
          </a>
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:border-primary hover:text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Refaire le quiz
        </button>
        <span className="sr-only">
          <Copy className="h-3 w-3" />
        </span>
      </div>
    </div>
  )
}
