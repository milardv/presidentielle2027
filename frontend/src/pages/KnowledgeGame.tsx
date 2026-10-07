import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, RotateCcw, Sparkles, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { MobileAppNav } from '../components/MobileAppNav'
import { knowledgeCategories, knowledgeQuestions, knowledgeRewards } from '../data/knowledgeQuestions'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { useAuthSession } from '../features/auth/hooks/useAuthSession'
import {
  createKnowledgeSession, createQuestionOrder, getKnowledgeStats, getShuffledOptions,
  loadKnowledgeSession, persistKnowledgeSession, type KnowledgeSession,
} from '../features/knowledge/knowledgeGame'
import { appNavItems } from '../navigation/appNavItems'
import { signInWithGoogle } from '../services/authService'
import { saveKnowledgeBestScore, subscribeToKnowledgeBestScore, type KnowledgeBestScore } from '../services/knowledgeScoreRepository'
import { upsertUserProfile } from '../services/userProfileRepository'
import { SeoHead } from '../seo/SeoHead'
import { knowledgeRouteSeo } from '../seo/appRoutesSeo.js'
import { buildCanonicalUrl } from '../seo/site'

function formatScore(value: number) { return new Intl.NumberFormat('fr-FR').format(value) }

const knowledgeJsonLd = { '@context': 'https://schema.org', '@type': 'Quiz', name: 'Le Grand Décryptage', description: '100 questions de connaissances civiques en 10 manches.', url: buildCanonicalUrl('/defi/'), inLanguage: 'fr-FR', isAccessibleForFree: true, numberOfQuestions: 100 }

function getSaveError(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : ''
  if (code === 'auth/popup-closed-by-user') return 'Connexion annulée. Votre progression reste sur cet appareil.'
  if (code === 'auth/popup-blocked') return 'Le navigateur a bloqué la fenêtre Google. Autorisez les fenêtres puis réessayez.'
  if (code === 'permission-denied') return 'La base de données a refusé l’enregistrement. Votre progression reste sur cet appareil.'
  return 'Impossible d’enregistrer le score pour le moment. Votre progression reste sur cet appareil.'
}

export default function KnowledgeGame() {
  const [session, setSession] = useState<KnowledgeSession | null>(loadKnowledgeSession)
  const [best, setBest] = useState<KnowledgeBestScore | null>(null)
  const [bestError, setBestError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthSession()
  const seed = session?.seed
  const order = useMemo(() => seed === undefined ? [] : createQuestionOrder(seed), [seed])
  const stats = getKnowledgeStats(session?.answers ?? [])
  const answered = session?.answers.length ?? 0
  const question = session ? order[session.phase === 'feedback' ? answered - 1 : answered] : null
  const category = question ? knowledgeCategories.find((item) => item.id === question.categoryId) : null
  const displayedOptions = question && session ? getShuffledOptions(question, session.seed) : []
  const selectedOptionIndex = session?.phase === 'feedback' ? session.answers.at(-1)?.selectedOptionIndex : undefined
  const latestCorrect = question && selectedOptionIndex !== undefined ? selectedOptionIndex === question.correctIndex : false
  const currentRound = Math.min(10, session?.phase === 'feedback' ? Math.max(1, Math.ceil(answered / 10)) : Math.floor(answered / 10) + 1)
  const lastRound = Math.ceil(answered / 10)
  const streak = session ? [...session.answers].reverse().findIndex((answer) => {
    const item = knowledgeQuestions.find((entry) => entry.id === answer.questionId)
    return item?.correctIndex !== answer.selectedOptionIndex
  }) : 0
  const currentStreak = session ? (streak === -1 ? session.answers.length : streak) : 0

  useEffect(() => {
    if (!user) return
    return subscribeToKnowledgeBestScore(user.uid, (value) => { setBest(value); setBestError(false) }, () => setBestError(true))
  }, [user])

  useEffect(() => {
    if (session?.phase !== 'feedback') return
    const frame = window.requestAnimationFrame(() => feedbackRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }))
    return () => window.cancelAnimationFrame(frame)
  }, [session?.phase, answered])

  const updateSession = (next: KnowledgeSession | null) => {
    persistKnowledgeSession(next)
    setSession(next)
    setSaveMessage(null)
    setSaveError(null)
  }

  const answerQuestion = (originalIndex: number) => {
    if (!session || session.phase !== 'playing' || !question) return
    updateSession({ ...session, answers: [...session.answers, { questionId: question.id, selectedOptionIndex: originalIndex }], phase: 'feedback' })
  }

  const advance = () => {
    if (!session || session.phase !== 'feedback') return
    const isCheckpoint = session.answers.length % 10 === 0
    updateSession({ ...session, phase: isCheckpoint ? 'checkpoint' : 'playing' })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const leaveCheckpoint = (stop: boolean) => {
    if (!session || session.phase !== 'checkpoint') return
    updateSession({ ...session, phase: stop || answered === 100 ? 'result' : 'playing', stopped: stop && answered < 100 })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const saveScore = async () => {
    if (!session || session.phase !== 'result' || isSaving) return
    setIsSaving(true)
    setSaveError(null)
    setSaveMessage(null)
    try {
      const activeUser: User = user ?? await signInWithGoogle()
      await upsertUserProfile(activeUser.uid, {
        displayName: activeUser.displayName ?? 'Utilisateur présidentielles',
        email: activeUser.email ?? '',
        photoUrl: activeUser.photoURL,
        providerId: activeUser.providerData[0]?.providerId ?? 'google.com',
      })
      const outcome = await saveKnowledgeBestScore(activeUser.uid, {
        score: stats.score, answered: stats.answered, correct: stats.correct,
        completed: stats.answered === 100,
        masteredCategoryIds: stats.mastered.map((item) => item.id),
      })
      setBest(outcome.best)
      setSaveMessage(outcome.saved ? 'Nouveau record enregistré dans votre profil.' : 'Votre meilleur score enregistré est déjà plus élevé.')
    } catch (error) {
      setSaveError(getSaveError(error))
    } finally {
      setIsSaving(false)
    }
  }

  const weakConcepts = session?.answers.flatMap((answer) => {
    const item = knowledgeQuestions.find((entry) => entry.id === answer.questionId)
    return item && answer.selectedOptionIndex !== item.correctIndex ? [item] : []
  }).slice(0, 3) ?? []

  return (
    <div className="edition-page knowledge-page">
      <SeoHead title={knowledgeRouteSeo.title} description={knowledgeRouteSeo.description} path={knowledgeRouteSeo.path} keywords={knowledgeRouteSeo.keywords} jsonLd={knowledgeJsonLd} />
      <AppSiteHeader />
      <main className="knowledge-main">
        <div className="knowledge-topline"><Link to="/quiz"><ArrowLeft size={16} aria-hidden="true" /> Les quiz</Link><span>Le Grand Décryptage · Édition 2027</span></div>

        {!session ? (
          <>
            <section className="knowledge-intro">
              <div className="knowledge-intro-copy"><p className="knowledge-overline">Un jeu de connaissances · Sans opinion à deviner</p><h1>Comprendre change <em>la donne.</em></h1><p className="knowledge-intro-lede">Le PIB, le climat, le droit du travail, les institutions… Saurez-vous reconnaître les mécanismes derrière les promesses ? Cent questions, dix manches, une explication après chaque réponse.</p><div className="knowledge-intro-actions"><button type="button" onClick={() => updateSession(createKnowledgeSession())}>Lancer la première manche <ArrowRight size={18} aria-hidden="true" /></button><span>Gratuit · À votre rythme · Sans compte</span></div></div>
              <div className="knowledge-intro-art" aria-hidden="true"><span className="knowledge-art-top">LE PARCOURS</span><strong>100</strong><span className="knowledge-art-bottom">questions<br />pour voir plus clair.</span><div className="knowledge-art-steps">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div></div>
            </section>
            <section className="knowledge-categories-intro"><div><h2>Dix portes d’entrée sur le débat public.</h2><p>Chaque manche traverse les dix thèmes. La réponse juste compte ; comprendre pourquoi compte davantage.</p></div><div className="knowledge-categories-list">{knowledgeCategories.map((item, index) => <div key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.title}</strong><span className="knowledge-category-dot" style={{ background: item.color }} /></div>)}</div></section>
          </>
        ) : null}

        {session && (session.phase === 'playing' || session.phase === 'feedback') && question && category ? (
          <div className="knowledge-play-layout">
            <aside className="knowledge-play-aside"><div className="knowledge-round-label">Manche {currentRound} / 10</div><h2>Votre parcours</h2><div className="knowledge-round-track" aria-label={`${answered} questions sur 100 terminées`}>{Array.from({ length: 10 }, (_, index) => <span key={index} className={index < Math.floor(answered / 10) ? 'is-done' : index === currentRound - 1 ? 'is-current' : ''} />)}</div><div className="knowledge-aside-score"><strong>{formatScore(stats.score)}</strong><span>points cumulés</span></div><p>{currentStreak > 1 ? `${currentStreak} bonnes réponses d’affilée.` : 'Une notion comprise vaut plus qu’un coup de chance.'}</p><div className="knowledge-aside-next"><span>Récompense suivante</span><strong>{knowledgeRewards[currentRound - 1]}</strong><small>{session.phase === 'feedback' && answered % 10 === 0 ? 'Palier prêt à débloquer' : `Dans ${10 - (answered % 10)} réponse${10 - (answered % 10) > 1 ? 's' : ''}`}</small></div></aside>
            <section className="knowledge-question-card" aria-labelledby="knowledge-question-title"><div className="knowledge-question-meta"><span className="knowledge-topic" style={{ '--topic-color': category.color } as React.CSSProperties}>{category.title}</span><span>Question {session.phase === 'feedback' ? answered : answered + 1} / 100</span></div><div className="knowledge-question-progress"><span style={{ width: `${answered}%` }} /></div><p className="knowledge-concept">Notion en jeu : {question.concept}</p><h1 id="knowledge-question-title">{question.prompt}</h1><div className="knowledge-options" role="group" aria-label="Choisir une réponse">{displayedOptions.map((option, index) => {
              const isCorrectOption = option.originalIndex === question.correctIndex
              const isSelected = option.originalIndex === selectedOptionIndex
              return <button key={option.originalIndex} type="button" disabled={session.phase === 'feedback'} className={`${session.phase === 'feedback' && isCorrectOption ? 'is-correct' : ''} ${session.phase === 'feedback' && isSelected && !isCorrectOption ? 'is-incorrect' : ''}`} onClick={() => answerQuestion(option.originalIndex)}><span>{String.fromCharCode(65 + index)}</span><strong>{option.text}</strong>{session.phase === 'feedback' && isCorrectOption ? <Check size={19} aria-hidden="true" /> : null}</button>
            })}</div>{session.phase === 'feedback' ? <div ref={feedbackRef} className={`knowledge-feedback ${latestCorrect ? 'is-right' : 'is-wrong'}`} role="status"><strong>{latestCorrect ? 'Bien vu. +10 points' : 'Pas tout à fait. Voici la clé.'}</strong><p>{question.explanation}</p><div className="knowledge-feedback-bottom"><div><span>Pour aller plus loin</span>{category.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight size={13} aria-hidden="true" /></a>)}</div><button type="button" onClick={advance}>{answered % 10 === 0 ? 'Voir mon palier' : 'Question suivante'} <ArrowRight size={17} aria-hidden="true" /></button></div></div> : <p className="knowledge-question-note">Choisissez une réponse. L’explication apparaît aussitôt.</p>}</section>
          </div>
        ) : null}

        {session?.phase === 'checkpoint' ? <section className="knowledge-checkpoint"><div className="knowledge-checkpoint-seal" aria-hidden="true"><Sparkles size={28} /><strong>{String(lastRound).padStart(2, '0')}</strong><span>PALIER</span></div><p className="knowledge-overline">Manche {lastRound} terminée · Récompense fictive débloquée</p><h1>{knowledgeRewards[lastRound - 1]}</h1><p className="knowledge-checkpoint-lede">Dix nouvelles notions traversées. Vous avez {stats.correct} bonne{stats.correct > 1 ? 's' : ''} réponse{stats.correct > 1 ? 's' : ''} sur {answered} et {formatScore(stats.score)} points.</p><div className="knowledge-checkpoint-progress">{Array.from({ length: 10 }, (_, index) => <span key={index} className={index < lastRound ? 'is-done' : ''} />)}</div><div className="knowledge-checkpoint-actions"><button type="button" className="knowledge-primary-button" onClick={() => leaveCheckpoint(false)}>{answered === 100 ? 'Voir mon bilan final' : 'Continuer l’aventure'} <ArrowRight size={18} aria-hidden="true" /></button>{answered < 100 ? <button type="button" className="knowledge-secondary-button" onClick={() => leaveCheckpoint(true)}>M’arrêter et voir mon bilan</button> : null}</div><p className="knowledge-small-note">Vous pourrez reprendre votre progression sur cet appareil.</p></section> : null}

        {session?.phase === 'result' ? <div className="knowledge-results"><section className="knowledge-result-hero"><div><p className="knowledge-overline">{answered === 100 ? 'Parcours complet' : `Pause après ${answered} questions`}</p><h1>Votre carte des connaissances.</h1><p>Un point de départ pour comprendre les choix publics, jamais une étiquette sur votre intelligence ou vos opinions.</p><div className="knowledge-result-actions">{answered < 100 ? <button type="button" className="knowledge-primary-button" onClick={() => { updateSession({ ...session, phase: 'playing', stopped: false }); window.scrollTo({ top: 0, behavior: 'instant' }) }}>Reprendre la manche suivante <ArrowRight size={17} /></button> : null}<button type="button" className="knowledge-secondary-button" onClick={() => { updateSession(createKnowledgeSession()); window.scrollTo({ top: 0, behavior: 'instant' }) }}><RotateCcw size={16} /> Rejouer depuis le début</button></div></div><div className="knowledge-result-score"><Trophy size={25} aria-hidden="true" /><strong>{formatScore(stats.score)}</strong><span>sur 1 000 points possibles</span><small>{stats.correct} bonnes réponses · {answered} questions jouées</small></div></section>
          <section className="knowledge-result-categories"><div className="knowledge-results-section-head"><div><h2>Votre bilan par thème</h2><p>Le badge d’un thème se gagne à partir de 7 bonnes réponses sur ses 10 questions.</p></div><span>{stats.mastered.length} / 10 badges</span></div><div className="knowledge-category-results">{stats.categories.map((item) => <div key={item.id} className="knowledge-category-result"><div className="knowledge-category-result-head"><span className="knowledge-category-dot" style={{ background: item.color }} /><strong>{item.title}</strong><span>{item.correct} / {item.answered}</span></div><div className="knowledge-category-bar" aria-label={`${item.correct} bonnes réponses sur ${item.answered} en ${item.title}`}><span style={{ width: `${item.correct * 10}%`, background: item.color }} /></div><p>{item.mastered ? 'Badge de maîtrise débloqué' : item.answered < 10 ? `${10 - item.answered} question${10 - item.answered > 1 ? 's' : ''} avant le bilan complet` : 'Encore quelques notions à consolider'}</p></div>)}</div></section>
          <div className="knowledge-result-lower"><section className="knowledge-result-rewards"><h2>Vos récompenses fictives</h2><p>Distinction du parcours : <strong>{answered === 100 ? 'Grand décodeur du débat' : 'Éclaireur du débat'}</strong>. Chaque palier franchi ajoute un sceau à votre passeport.</p><div>{knowledgeRewards.slice(0, Math.floor(answered / 10)).map((reward, index) => <span key={reward}><Sparkles size={15} aria-hidden="true" /> {index + 1}. {reward}</span>)}</div>{stats.mastered.length > 0 ? <p className="knowledge-result-badges">Maîtrises : {stats.mastered.map((item) => item.title).join(' · ')}</p> : null}</section><section className="knowledge-result-revise"><h2>Trois notions à revoir</h2>{weakConcepts.length ? <ul>{weakConcepts.map((item) => <li key={item.id}><BookOpen size={17} aria-hidden="true" /><div><strong>{item.concept}</strong><p>{item.explanation}</p></div></li>)}</ul> : <p>Aucune erreur dans cette partie : poursuivez pour explorer d’autres notions.</p>}</section></div>
          <section className="knowledge-save"><div><p className="knowledge-overline">Votre record, si vous le souhaitez</p><h2>Gardez votre meilleur score.</h2><p>Connectez-vous avec Google pour enregistrer ce résultat dans votre profil. Seul votre meilleur score et vos badges sont conservés ; vos réponses détaillées restent sur cet appareil.</p>{best ? <span className="knowledge-best">Record enregistré : {formatScore(best.score)} points sur {best.answered} questions</span> : null}{bestError ? <span className="knowledge-save-error">Impossible de lire votre record pour le moment.</span> : null}{saveMessage ? <span className="knowledge-save-success" role="status">{saveMessage}</span> : null}{saveError ? <span className="knowledge-save-error" role="alert">{saveError}</span> : null}</div><button type="button" onClick={() => void saveScore()} disabled={isSaving}>{isSaving ? 'Enregistrement…' : user ? 'Enregistrer mon score' : 'Me connecter et enregistrer'} <ChevronRight size={18} aria-hidden="true" /></button></section>
        </div> : null}
      </main>
      <HomeDesktopFooter />
      <MobileAppNav items={appNavItems} />
    </div>
  )
}
