import { useEffect, useState } from 'react'
import { ArrowRight, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { JourneyBadgeMark } from './JourneyBadge'
import type { KnowledgeSession } from './knowledgeGame'
import { subscribeToKnowledgeBestScore, type KnowledgeBestScore } from '../../services/knowledgeScoreRepository'
import { subscribeToKnowledgeProgress } from '../../services/knowledgeProgressRepository'

export function KnowledgeProfileCard({ userId }: { userId: string }) {
  const [best, setBest] = useState<KnowledgeBestScore | null>(null)
  const [progress, setProgress] = useState<KnowledgeSession | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const stopBest = subscribeToKnowledgeBestScore(userId, (value) => { setBest(value); setError(false) }, () => setError(true))
    const stopProgress = subscribeToKnowledgeProgress(userId, (value) => { setProgress(value); setError(false) }, () => setError(true))
    return () => { stopBest(); stopProgress() }
  }, [userId])

  return (
    <section className="knowledge-profile-card">
      {progress ? <JourneyBadgeMark index={Math.floor(progress.answers.length / 10) - 1} size="profile" /> : <Trophy size={25} aria-hidden="true" />}
      <div>
        <h2>{best ? `${best.score.toLocaleString('fr-FR')} points : votre record` : progress ? 'Votre partie sauvegardée' : 'Votre défi de connaissances'}</h2>
        <p>{error ? 'Parcours momentanément indisponible.' : progress ? `${progress.answers.length} questions terminées · badge ${Math.floor(progress.answers.length / 10)} obtenu. ${progress.answers.length === 100 ? 'Votre bilan est disponible sur cet appareil ou un autre.' : 'Reprenez votre partie sur cet appareil ou un autre.'}` : best ? `${best.answered} questions jouées · ${best.masteredCategoryIds.length} maîtrise${best.masteredCategoryIds.length > 1 ? 's' : ''}.` : 'Testez 100 notions clés et enregistrez votre meilleur score ici.'}</p>
      </div>
      <Link to="/defi">{progress?.answers.length === 100 ? 'Voir mon bilan' : progress ? 'Reprendre' : best ? 'Rejouer' : 'Commencer'} <ArrowRight size={16} aria-hidden="true" /></Link>
    </section>
  )
}
