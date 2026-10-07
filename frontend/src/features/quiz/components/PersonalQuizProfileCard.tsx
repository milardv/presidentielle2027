import { useEffect, useState } from 'react'
import { ArrowRight, RotateCcw, Trash2, Vote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clearPersonalQuizResult, subscribeToPersonalQuizResult, type SavedPersonalQuizResult } from '../../../services/personalQuizRepository'

export function PersonalQuizProfileCard({ userId }: { userId: string }) {
  const [result, setResult] = useState<SavedPersonalQuizResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => subscribeToPersonalQuizResult(userId, (value) => { setResult(value); setIsLoading(false); setError(null) }, () => { setIsLoading(false); setError('Votre résultat est momentanément indisponible.') }), [userId])

  const remove = async () => {
    setIsDeleting(true)
    setError(null)
    try {
      await clearPersonalQuizResult(userId)
      setResult(null)
      setConfirmDelete(false)
    } catch {
      setError('Suppression impossible pour le moment. Réessayez.')
    } finally {
      setIsDeleting(false)
    }
  }

  const top = result?.matches[0]
  const resultPath = result && top ? `/quiz/resultat/${top.candidateId}/?r=${result.answersCode}` : '/quiz'

  return (
    <section className="profile-feature profile-quiz" aria-labelledby="profile-quiz-title">
      <h2 id="profile-quiz-title"><Vote size={25} aria-hidden="true" /> Votre résultat au quiz</h2>
      {isLoading ? <p className="profile-feature-muted" role="status">Chargement de votre résultat…</p> : null}
      {!isLoading && !result && !error ? (
        <div className="profile-empty">
          <p>Votre résultat apparaîtra ici lorsque vous choisirez de l’enregistrer à la fin du quiz.</p>
          <Link to="/quiz">Faire le quiz d’opinions <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      ) : null}
      {result ? (
        <>
          <div className="profile-quiz-persona"><span>Votre profil</span><strong>{result.personaTitle}{result.institutionsReformer ? ' · Réformateur des institutions' : ''}</strong><p>{result.personaTagline}</p></div>
          {top ? <div className="profile-quiz-match"><div><span>Votre première compatibilité</span><strong>{top.name}</strong></div><b>{top.score}<small> %</small></b></div> : null}
          {result.matches.length > 1 ? <ol className="profile-quiz-ranking">{result.matches.slice(1).map((match, index) => <li key={match.candidateId}><span>{index + 2}.</span><strong>{match.name}</strong><b>{match.score} %</b></li>)}</ol> : null}
          <p className="profile-feature-muted">{result.answeredCount} réponses sur 14 · Enregistré le {new Date(result.savedAt).toLocaleDateString('fr-FR')}. Résultat calculé lors de l’enregistrement ; les positions des candidats peuvent évoluer.</p>
          <div className="profile-feature-actions"><Link to={resultPath}>Voir le détail de mes réponses <ArrowRight size={17} aria-hidden="true" /></Link><Link to="/quiz"><RotateCcw size={15} aria-hidden="true" /> Refaire le quiz</Link></div>
          <div className="profile-data-control">{confirmDelete ? <div><span>Effacer vos réponses et ce résultat du profil ?</span><button type="button" onClick={() => void remove()} disabled={isDeleting}>{isDeleting ? 'Suppression…' : 'Oui, effacer'}</button><button type="button" onClick={() => setConfirmDelete(false)}>Annuler</button></div> : <button type="button" onClick={() => setConfirmDelete(true)}><Trash2 size={14} aria-hidden="true" /> Effacer ce résultat</button>}</div>
        </>
      ) : null}
      {error ? <p className="profile-feature-error" role="alert">{error}</p> : null}
    </section>
  )
}
