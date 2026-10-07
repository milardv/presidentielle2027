import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Cloud, RotateCcw, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { MobileAppNav } from '../components/MobileAppNav'
import { knowledgeTermNotes } from '../data/knowledgeGlossary'
import { knowledgeCategories, knowledgeQuestions, knowledgeRewards } from '../data/knowledgeQuestions'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { useAuthSession } from '../features/auth/hooks/useAuthSession'
import { CategoryBadgeMark, JourneyBadgeMark, JourneyBadgeTile } from '../features/knowledge/JourneyBadge'
import {
  createKnowledgeSession, createQuestionOrder, getKnowledgeStats, getShuffledOptions,
  loadKnowledgeSession, persistKnowledgeSession, resumeKnowledgeSession, type KnowledgeSession,
} from '../features/knowledge/knowledgeGame'
import { appNavItems } from '../navigation/appNavItems'
import { signInWithGoogle } from '../services/authService'
import { saveKnowledgeBestScore, subscribeToKnowledgeBestScore, type KnowledgeBestScore } from '../services/knowledgeScoreRepository'
import { saveKnowledgeProgress, subscribeToKnowledgeProgress } from '../services/knowledgeProgressRepository'
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
  return 'Impossible d’enregistrer pour le moment. Votre progression reste sur cet appareil.'
}

export default function KnowledgeGame() {
  const [session, setSession] = useState<KnowledgeSession | null>(loadKnowledgeSession)
  const [best, setBest] = useState<KnowledgeBestScore | null>(null)
  const [bestOwner, setBestOwner] = useState<string | null>(null)
  const [bestError, setBestError] = useState(false)
  const [cloudProgress, setCloudProgress] = useState<KnowledgeSession | null>(null)
  const [cloudOwner, setCloudOwner] = useState<string | null>(null)
  const [cloudError, setCloudError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingProgress, setIsSavingProgress] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [progressMessage, setProgressMessage] = useState<string | null>(null)
  const [progressError, setProgressError] = useState<string | null>(null)
  const [progressConflict, setProgressConflict] = useState<KnowledgeSession | null>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthSession()
  const seed = session?.seed
  const order = useMemo(() => seed === undefined ? [] : createQuestionOrder(seed), [seed])
  const stats = getKnowledgeStats(session?.answers ?? [])
  const answered = session?.answers.length ?? 0
  const question = session ? order[session.phase === 'feedback' ? answered - 1 : answered] : null
  const termNote = question ? knowledgeTermNotes[question.id] : null
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
  const roundCorrect = session?.answers.slice(-10).filter((answer) => {
    const item = knowledgeQuestions.find((entry) => entry.id === answer.questionId)
    return item?.correctIndex === answer.selectedOptionIndex
  }).length ?? 0
  const visibleCloudProgress = user?.uid === cloudOwner ? cloudProgress : null
  const visibleBest = user?.uid === bestOwner ? best : null
  const visibleProgressConflict = user?.uid === cloudOwner ? progressConflict : null
  const visibleProgressMessage = user?.uid === cloudOwner ? progressMessage : null
  const checkpointSaved = Boolean(user && session && visibleCloudProgress?.seed === session.seed && visibleCloudProgress.answers.length >= answered)
  const canResumeCloud = Boolean(user && visibleCloudProgress && (!session || visibleCloudProgress.seed !== session.seed || visibleCloudProgress.answers.length > answered))

  useEffect(() => {
    if (!user) return
    return subscribeToKnowledgeBestScore(user.uid, (value) => { setBest(value); setBestOwner(user.uid); setBestError(false) }, () => { setBestOwner(user.uid); setBestError(true) })
  }, [user])

  useEffect(() => {
    if (!user) return
    return subscribeToKnowledgeProgress(user.uid, (value) => { setCloudProgress(value); setCloudOwner(user.uid); setCloudError(false) }, () => { setCloudOwner(user.uid); setCloudError(true) })
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
    setProgressMessage(null)
    setProgressError(null)
    setProgressConflict(null)
  }

  const resumeCloud = () => {
    if (!visibleCloudProgress) return
    updateSession(resumeKnowledgeSession(visibleCloudProgress))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const saveProgress = async (overwrite = false) => {
    if (!session || session.phase !== 'checkpoint' || isSavingProgress) return
    setIsSavingProgress(true)
    setProgressMessage(null)
    setProgressError(null)
    try {
      const activeUser: User = user ?? await signInWithGoogle()
      await upsertUserProfile(activeUser.uid, {
        displayName: activeUser.displayName ?? 'Utilisateur présidentielles',
        email: activeUser.email ?? '',
        photoUrl: activeUser.photoURL,
        providerId: activeUser.providerData[0]?.providerId ?? 'google.com',
      })
      const outcome = await saveKnowledgeProgress(activeUser.uid, session, overwrite)
      if (outcome.saved) {
        setCloudProgress(outcome.progress)
        setCloudOwner(activeUser.uid)
        setProgressConflict(null)
        setProgressMessage(`Palier ${lastRound} sauvegardé. Vous pourrez reprendre sur un autre appareil.`)
      } else {
        setCloudProgress(outcome.progress)
        setCloudOwner(activeUser.uid)
        setProgressConflict(outcome.progress)
      }
    } catch (error) {
      setProgressError(getSaveError(error))
    } finally {
      setIsSavingProgress(false)
    }
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
      setBestOwner(activeUser.uid)
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

        {canResumeCloud && visibleCloudProgress ? (
          <section className="knowledge-cloud-resume" aria-label="Partie sauvegardée">
            <JourneyBadgeMark index={Math.floor(visibleCloudProgress.answers.length / 10) - 1} size="profile" />
            <div><strong>Votre partie sauvegardée vous attend.</strong><p>{visibleCloudProgress.answers.length} questions terminées · {visibleCloudProgress.answers.length === 100 ? 'votre bilan est prêt.' : 'reprenez au palier suivant, même sur cet appareil.'}</p></div>
            <button type="button" onClick={resumeCloud}>{visibleCloudProgress.answers.length === 100 ? 'Voir mon bilan' : 'Reprendre ma sauvegarde'} <ArrowRight size={16} aria-hidden="true" /></button>
          </section>
        ) : null}

        {!session ? (
          <>
            <section className="knowledge-intro">
              <div className="knowledge-intro-copy"><p className="knowledge-overline">Un jeu de connaissances · Sans opinion à deviner</p><h1>Comprendre change <em>la donne.</em></h1><p className="knowledge-intro-lede">Le PIB, le climat, le droit du travail, les institutions… Saurez-vous reconnaître les mécanismes derrière les promesses ? Cent questions, dix manches, une explication après chaque réponse et un badge tous les dix défis.</p><div className="knowledge-intro-actions"><button type="button" onClick={() => updateSession(createKnowledgeSession())}>Lancer la première manche <ArrowRight size={18} aria-hidden="true" /></button><span>Gratuit · À votre rythme · Sans compte</span></div></div>
              <div className="knowledge-intro-art" aria-hidden="true"><span className="knowledge-art-top">LE PARCOURS</span><strong>100</strong><span className="knowledge-art-bottom">questions<br />pour voir plus clair.</span><div className="knowledge-art-steps">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div></div>
            </section>
            <section className="knowledge-categories-intro"><div><h2>Dix portes d’entrée sur le débat public.</h2><p>Chaque manche traverse les dix thèmes. La réponse juste compte ; comprendre pourquoi compte davantage.</p></div><div className="knowledge-categories-list">{knowledgeCategories.map((item, index) => <div key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.title}</strong><span className="knowledge-category-dot" style={{ background: item.color }} /></div>)}</div></section>
          </>
        ) : null}

        {session && (session.phase === 'playing' || session.phase === 'feedback') && question && category ? (
          <div className="knowledge-play-layout">
            <aside className="knowledge-play-aside"><div className="knowledge-round-label">Manche {currentRound} / 10</div><h2>Votre parcours</h2><div className="knowledge-round-track" aria-label={`${answered} questions sur 100 terminées`}>{Array.from({ length: 10 }, (_, index) => <span key={index} className={index < Math.floor(answered / 10) ? 'is-done' : index === currentRound - 1 ? 'is-current' : ''} />)}</div><div className="knowledge-aside-score"><strong>{formatScore(stats.score)}</strong><span>points cumulés</span></div><p>{currentStreak > 1 ? `${currentStreak} bonnes réponses d’affilée.` : 'Une notion comprise vaut plus qu’un coup de chance.'}</p><div className="knowledge-aside-next"><span>Prochain badge</span><strong>{knowledgeRewards[currentRound - 1]}</strong><small>{session.phase === 'feedback' && answered % 10 === 0 ? 'Palier prêt à débloquer' : `Dans ${10 - (answered % 10)} réponse${10 - (answered % 10) > 1 ? 's' : ''}`}</small></div></aside>
            <section className="knowledge-question-card" aria-labelledby="knowledge-question-title"><div className="knowledge-question-meta"><span className="knowledge-topic" style={{ '--topic-color': category.color } as React.CSSProperties}>{category.title}</span><span>Question {session.phase === 'feedback' ? answered : answered + 1} / 100</span></div><div className="knowledge-question-progress"><span style={{ width: `${answered}%` }} /></div><p className="knowledge-concept">À vous de jouer</p><h1 id="knowledge-question-title">{question.prompt}</h1>{termNote ? <aside className="knowledge-term-note" aria-label={`Repère : ${termNote.term}`}><BookOpen size={18} aria-hidden="true" /><div><strong>{termNote.term}</strong><p>{termNote.definition}</p></div></aside> : null}<div className="knowledge-options" role="group" aria-label="Choisir une réponse">{displayedOptions.map((option, index) => {
              const isCorrectOption = option.originalIndex === question.correctIndex
              const isSelected = option.originalIndex === selectedOptionIndex
              return <button key={option.originalIndex} type="button" disabled={session.phase === 'feedback'} className={`${session.phase === 'feedback' && isCorrectOption ? 'is-correct' : ''} ${session.phase === 'feedback' && isSelected && !isCorrectOption ? 'is-incorrect' : ''}`} onClick={() => answerQuestion(option.originalIndex)}><span>{String.fromCharCode(65 + index)}</span><strong>{option.text}</strong>{session.phase === 'feedback' && isCorrectOption ? <Check size={19} aria-hidden="true" /> : null}</button>
            })}</div>{session.phase === 'feedback' ? <div ref={feedbackRef} className={`knowledge-feedback ${latestCorrect ? 'is-right' : 'is-wrong'}`} role="status"><span className="knowledge-feedback-concept">Notion clé : {question.concept}</span><strong>{latestCorrect ? 'Bien vu. +10 points' : 'Pas tout à fait. Voici la clé.'}</strong><p>{question.explanation}</p><div className="knowledge-feedback-bottom"><div><span>Pour aller plus loin</span>{category.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight size={13} aria-hidden="true" /></a>)}</div><button type="button" onClick={advance}>{answered % 10 === 0 ? 'Voir mon palier' : 'Question suivante'} <ArrowRight size={17} aria-hidden="true" /></button></div></div> : <p className="knowledge-question-note">Choisissez une réponse. L’explication apparaît aussitôt.</p>}</section>
          </div>
        ) : null}

        {session?.phase === 'checkpoint' ? (
          <section className="knowledge-checkpoint">
            <JourneyBadgeMark index={lastRound - 1} size="hero" />
            <p className="knowledge-overline">Bravo ! Manche {lastRound} terminée · Badge {lastRound} / 10</p>
            <h1>{knowledgeRewards[lastRound - 1]}</h1>
            <p className="knowledge-checkpoint-lede">
              {lastRound === 1 ? 'Votre premier badge est à vous.' : 'Un nouveau badge rejoint votre collection.'} Vous avez {roundCorrect} bonne{roundCorrect > 1 ? 's' : ''} réponse{roundCorrect > 1 ? 's' : ''} sur cette manche.
              <span>{formatScore(stats.score)} points au total.</span>
            </p>
            <div className="knowledge-checkpoint-progress">{Array.from({ length: 10 }, (_, index) => <span key={index} className={index < lastRound ? 'is-done' : ''} />)}</div>
            <div className="knowledge-checkpoint-save">
              <Cloud size={21} aria-hidden="true" />
              <div>
                <h2>{checkpointSaved ? 'Palier sauvegardé.' : 'Retrouvez votre partie partout.'}</h2>
                <p>{checkpointSaved ? 'Votre progression est liée à votre profil. Vous pourrez reprendre depuis un autre appareil.' : user ? 'Enregistrez ce palier dans votre profil pour le reprendre sur un autre appareil.' : 'Connectez-vous pour garder ce badge et reprendre au prochain palier sur un autre appareil.'}</p>
                {visibleProgressMessage ? <span className="knowledge-save-success" role="status">{visibleProgressMessage}</span> : null}
                {progressError ? <span className="knowledge-save-error" role="alert">{progressError}</span> : null}
                {cloudError && user?.uid === cloudOwner ? <span className="knowledge-save-error" role="alert">Impossible de lire votre progression enregistrée pour le moment.</span> : null}
                {visibleProgressConflict ? <div className="knowledge-progress-conflict"><p>Une partie plus avancée ({visibleProgressConflict.answers.length} questions) est déjà sauvegardée.</p><button type="button" onClick={resumeCloud}>Reprendre cette partie</button><button type="button" onClick={() => void saveProgress(true)} disabled={isSavingProgress}>Remplacer par ce palier</button></div> : null}
              </div>
              {!checkpointSaved && !visibleProgressConflict ? <button type="button" onClick={() => void saveProgress()} disabled={isSavingProgress}>{isSavingProgress ? 'Sauvegarde…' : user ? 'Sauvegarder ce palier' : 'Me connecter et sauvegarder'} <ArrowRight size={16} aria-hidden="true" /></button> : null}
            </div>
            <p className="knowledge-small-note">Votre partie reste aussi disponible sur cet appareil.</p>
            <div className="knowledge-checkpoint-actions">
              <button type="button" className="knowledge-primary-button" onClick={() => leaveCheckpoint(false)}>{answered === 100 ? 'Voir mon bilan final' : 'Continuer l’aventure'} <ArrowRight size={18} aria-hidden="true" /></button>
              {answered < 100 ? <button type="button" className="knowledge-secondary-button" onClick={() => leaveCheckpoint(true)}>M’arrêter et voir mon bilan</button> : null}
            </div>
          </section>
        ) : null}

        {session?.phase === 'result' ? <div className="knowledge-results"><section className="knowledge-result-hero"><div><p className="knowledge-overline">{answered === 100 ? 'Parcours complet' : `Pause après ${answered} questions`}</p><h1>Votre carte des connaissances.</h1><p>Un point de départ pour comprendre les choix publics, jamais une étiquette sur votre intelligence ou vos opinions.</p><div className="knowledge-result-actions">{answered < 100 ? <button type="button" className="knowledge-primary-button" onClick={() => { updateSession({ ...session, phase: 'playing', stopped: false }); window.scrollTo({ top: 0, behavior: 'instant' }) }}>Reprendre la manche suivante <ArrowRight size={17} /></button> : null}<button type="button" className="knowledge-secondary-button" onClick={() => { updateSession(createKnowledgeSession()); window.scrollTo({ top: 0, behavior: 'instant' }) }}><RotateCcw size={16} /> Rejouer depuis le début</button></div></div><div className="knowledge-result-score"><Trophy size={25} aria-hidden="true" /><strong>{formatScore(stats.score)}</strong><span>sur 1 000 points possibles</span><small>{stats.correct} bonnes réponses · {answered} questions jouées</small></div></section>
          <section className="knowledge-result-categories"><div className="knowledge-results-section-head"><div><h2>Votre bilan par thème</h2><p>Le badge d’un thème se gagne à partir de 7 bonnes réponses sur ses 10 questions.</p></div><span>{stats.mastered.length} / 10 badges</span></div><div className="knowledge-category-results">{stats.categories.map((item) => <div key={item.id} className={`knowledge-category-result ${item.mastered ? 'is-mastered' : ''}`}> <div className="knowledge-category-result-head"><span className="knowledge-category-dot" style={{ background: item.color }} /><strong>{item.title}</strong><span>{item.correct} / {item.answered}</span></div><div className="knowledge-category-bar" aria-label={`${item.correct} bonnes réponses sur ${item.answered} en ${item.title}`}><span style={{ width: `${item.correct * 10}%`, background: item.color }} /></div><p>{item.mastered ? <span className="knowledge-mastered-label"><CategoryBadgeMark title={item.title} color={item.color} /> Badge de maîtrise débloqué</span> : item.answered < 10 ? `${10 - item.answered} question${10 - item.answered > 1 ? 's' : ''} avant le bilan complet` : 'Encore quelques notions à consolider'}</p></div>)}</div></section>
          <div className="knowledge-result-lower"><section className="knowledge-result-rewards"><h2>Votre collection de badges</h2><p>Bravo pour le chemin parcouru ! Votre distinction : <strong>{answered === 100 ? 'Grand décodeur du débat' : 'Éclaireur du débat'}</strong>. Chaque palier franchi ajoute un sceau à votre passeport.</p><div className="knowledge-badge-collection">{knowledgeRewards.slice(0, Math.floor(answered / 10)).map((reward, index) => <JourneyBadgeTile key={reward} index={index} />)}</div>{stats.mastered.length > 0 ? <div className="knowledge-mastery-collection"><h3>Maîtrises débloquées</h3><div>{stats.mastered.map((item) => <span key={item.id}><CategoryBadgeMark title={item.title} color={item.color} />{item.title}</span>)}</div></div> : null}</section><section className="knowledge-result-revise"><h2>Trois notions à revoir</h2>{weakConcepts.length ? <ul>{weakConcepts.map((item) => <li key={item.id}><BookOpen size={17} aria-hidden="true" /><div><strong>{item.concept}</strong><p>{item.explanation}</p></div></li>)}</ul> : <p>Aucune erreur dans cette partie : poursuivez pour explorer d’autres notions.</p>}</section></div>
          <section className="knowledge-save"><div><p className="knowledge-overline">Votre record, si vous le souhaitez</p><h2>Gardez votre meilleur score.</h2><p>Connectez-vous avec Google pour enregistrer ce résultat dans votre profil. Votre meilleur score rejoint votre profil. Si vous avez sauvegardé un palier, les réponses de cette partie servent aussi à la reprendre.</p>{visibleBest ? <span className="knowledge-best">Record enregistré : {formatScore(visibleBest.score)} points sur {visibleBest.answered} questions</span> : null}{bestError && user?.uid === bestOwner ? <span className="knowledge-save-error">Impossible de lire votre record pour le moment.</span> : null}{saveMessage ? <span className="knowledge-save-success" role="status">{saveMessage}</span> : null}{saveError ? <span className="knowledge-save-error" role="alert">{saveError}</span> : null}</div><button type="button" onClick={() => void saveScore()} disabled={isSaving}>{isSaving ? 'Enregistrement…' : user ? 'Enregistrer mon score' : 'Me connecter et enregistrer'} <ChevronRight size={18} aria-hidden="true" /></button></section>
        </div> : null}
      </main>
      <HomeDesktopFooter />
      <MobileAppNav items={appNavItems} />
    </div>
  )
}
