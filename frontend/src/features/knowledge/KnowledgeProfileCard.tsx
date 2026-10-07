import { useEffect, useState } from 'react'
import { ArrowRight, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { subscribeToKnowledgeBestScore, type KnowledgeBestScore } from '../../services/knowledgeScoreRepository'

export function KnowledgeProfileCard({ userId }: { userId: string }) {
  const [best, setBest] = useState<KnowledgeBestScore | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => subscribeToKnowledgeBestScore(userId, (value) => { setBest(value); setError(false) }, () => setError(true)), [userId])

  return (
    <section className="knowledge-profile-card">
      <Trophy size={25} aria-hidden="true" />
      <div>
        <h2>{best ? `${best.score.toLocaleString('fr-FR')} points : votre record` : 'Votre défi de connaissances'}</h2>
        <p>{error ? 'Record momentanément indisponible.' : best ? `${best.answered} questions jouées · ${best.masteredCategoryIds.length} badge${best.masteredCategoryIds.length > 1 ? 's' : ''} de maîtrise. Vos réponses détaillées restent sur votre appareil.` : 'Testez 100 notions clés et enregistrez votre meilleur score ici.'}</p>
      </div>
      <Link to="/defi">{best ? 'Rejouer' : 'Commencer'} <ArrowRight size={16} aria-hidden="true" /></Link>
    </section>
  )
}
