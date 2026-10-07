import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { knowledgeCategories, knowledgeRewards } from '../../data/knowledgeQuestions'
import { CategoryBadgeMark, JourneyBadgeMark } from './JourneyBadge'
import { getKnowledgeStats, loadKnowledgeSession, type KnowledgeSession } from './knowledgeGame'
import { subscribeToKnowledgeBestScore, type KnowledgeBestScore } from '../../services/knowledgeScoreRepository'
import { subscribeToKnowledgeProgress, type KnowledgeAchievements } from '../../services/knowledgeProgressRepository'

export function KnowledgeProfileCard({ userId }: { userId: string }) {
  const [best, setBest] = useState<KnowledgeBestScore | null>(null)
  const [progress, setProgress] = useState<KnowledgeSession | null>(null)
  const [localSession] = useState<KnowledgeSession | null>(loadKnowledgeSession)
  const [achievements, setAchievements] = useState<KnowledgeAchievements>({ journeyBadgeCount: 0, masteredCategoryIds: [] })
  const [bestLoaded, setBestLoaded] = useState(false)
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const stopBest = subscribeToKnowledgeBestScore(userId, (value) => { setBest(value); setBestLoaded(true) }, () => { setError(true); setBestLoaded(true) })
    const stopProgress = subscribeToKnowledgeProgress(userId, (value, earned) => { setProgress(value); setAchievements(earned); setProgressLoaded(true) }, () => { setError(true); setProgressLoaded(true) })
    return () => { stopBest(); stopProgress() }
  }, [userId])

  const currentSession = progress && localSession?.seed === progress.seed && localSession.answers.length > progress.answers.length ? localSession : progress
  const current = currentSession ? getKnowledgeStats(currentSession.answers) : null
  const isLoading = !bestLoaded || !progressLoaded
  const displayScore = current?.score ?? best?.score ?? 0
  const answered = current?.answered ?? best?.answered ?? 0
  const journeyCount = Math.max(achievements.journeyBadgeCount, Math.floor((currentSession?.answers.length ?? 0) / 10), Math.floor((best?.answered ?? 0) / 10))
  const categoryIds = new Set([...achievements.masteredCategoryIds, ...(current?.mastered.map((item) => item.id) ?? []), ...(best?.masteredCategoryIds ?? [])])
  const mastered = knowledgeCategories.filter((item) => categoryIds.has(item.id))

  return (
    <section className="profile-feature profile-knowledge" aria-labelledby="profile-knowledge-title">
      <h2 id="profile-knowledge-title"><BookOpen size={25} aria-hidden="true" /> Vos connaissances clés</h2>
      {isLoading ? <p className="profile-feature-muted" role="status">Chargement de votre parcours…</p> : null}
      {!isLoading && (progress || best || !error) ? (
        <>
          <div className="profile-knowledge-score"><div><strong>{displayScore}</strong><span>points {current ? 'sur votre partie en cours' : best ? 'pour votre record enregistré' : 'pour commencer'}</span></div><div><b>{answered}<small> / 100</small></b><span>questions parcourues</span></div></div>
          {progress ? <p className="profile-feature-muted">{current?.correct} bonne{current?.correct === 1 ? '' : 's'} réponse{current?.correct === 1 ? '' : 's'} sur {answered} · {Math.round((current?.correct ?? 0) / answered * 100)} % de réussite à ce stade.{currentSession === localSession ? ` Dernier palier sauvegardé : ${progress.answers.length} questions.` : ''}</p> : best ? <p className="profile-feature-muted">Votre record porte sur {best.answered} questions. Sauvegardez un palier pour voir votre partie en cours ici.</p> : <p className="profile-feature-muted">Aucun palier sauvegardé pour l’instant. Le premier badge arrive après 10 questions.</p>}
          {best && current ? <p className="profile-knowledge-best"><Trophy size={15} aria-hidden="true" /> Votre record : {best.score} points sur {best.answered} questions</p> : null}
          <div className="profile-feature-actions"><Link to="/defi">{progress?.answers.length === 100 ? 'Voir mon bilan' : progress ? 'Reprendre ma partie' : 'Jouer au Grand Décryptage'} <ArrowRight size={17} aria-hidden="true" /></Link></div>
          <div className="profile-knowledge-collection"><div className="profile-knowledge-subhead"><h3>Votre collection</h3><span>{journeyCount} / 10 badges de parcours</span></div><div className="profile-journey-grid">{knowledgeRewards.map((reward, index) => <div key={reward} className={`profile-journey-item${index >= journeyCount ? ' is-locked' : ''}`}><JourneyBadgeMark index={index} size="tile" locked={index >= journeyCount} /><span>{reward}</span></div>)}</div></div>
          <div className="profile-mastery-collection"><div className="profile-knowledge-subhead"><h3>Badges de maîtrise</h3><span>{mastered.length} / 10 thèmes</span></div>{mastered.length ? <div>{mastered.map((item) => <span key={item.id}><CategoryBadgeMark title={item.title} color={item.color} />{item.title}</span>)}</div> : <p className="profile-feature-muted">Un badge de thème se débloque avec 7 bonnes réponses sur ses 10 questions.</p>}</div>
          {current && current.answered > 0 ? <div className="profile-knowledge-themes"><h3>Votre parcours par thème</h3><div>{current.categories.map((item) => <div key={item.id} className="profile-theme-row"><span>{item.title}</span><div className="profile-theme-track" aria-label={`${item.correct} bonnes réponses sur ${item.answered} en ${item.title}`}><i style={{ width: `${item.correct * 10}%`, background: item.color }} /></div><strong>{item.correct} / {item.answered}</strong></div>)}</div></div> : null}
        </>
      ) : null}
      {error ? <p className="profile-feature-error" role="alert">Une partie de votre parcours est indisponible pour le moment.</p> : null}
    </section>
  )
}
