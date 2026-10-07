import { useEffect, useState } from 'react'
import { ArrowRight, BookmarkCheck, CloudUpload } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { signInWithGoogle, subscribeToAuthState } from '../../../services/authService'
import { savePersonalQuizResult, subscribeToPersonalQuizResult, type SavedPersonalQuizResult } from '../../../services/personalQuizRepository'
import { upsertUserProfile } from '../../../services/userProfileRepository'
import { encodeAnswers, type QuizAnswers, type QuizResult } from '../quizEngine'
import { getAuthErrorMessage } from '../../auth/utils/authErrors'

export function SaveQuizResultPanel({ result, answers }: { result: QuizResult; answers: QuizAnswers }) {
  const [user, setUser] = useState<User | null>(null)
  const [saved, setSaved] = useState<SavedPersonalQuizResult | null>(null)
  const [savedOwner, setSavedOwner] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const answersCode = encodeAnswers(answers)
  const visibleSaved = user?.uid === savedOwner ? saved : null
  const isCurrentSaved = visibleSaved?.answersCode === answersCode

  useEffect(() => subscribeToAuthState(setUser), [])
  useEffect(() => {
    if (!user) return
    return subscribeToPersonalQuizResult(user.uid, (value) => { setSaved(value); setSavedOwner(user.uid) }, () => setError('Impossible de lire le résultat enregistré pour le moment.'))
  }, [user])

  const save = async () => {
    if (isSaving) return
    setIsSaving(true)
    setError(null)
    try {
      const activeUser = user ?? await signInWithGoogle()
      await upsertUserProfile(activeUser.uid, {
        displayName: activeUser.displayName ?? 'Utilisateur présidentielles',
        email: activeUser.email ?? '',
        photoUrl: activeUser.photoURL,
        providerId: activeUser.providerData[0]?.providerId ?? 'google.com',
      })
      await savePersonalQuizResult(activeUser.uid, result, answers)
      setSavedOwner(activeUser.uid)
      setSaved({
        answersCode,
        savedAt: Date.now(),
        answeredCount: result.answeredCount,
        personaTitle: result.persona.title,
        personaTagline: result.persona.tagline,
        institutionsReformer: result.institutionsReformer,
        matches: result.matches.slice(0, 3).map(({ candidate, score }) => ({ candidateId: candidate.id, name: candidate.name, score })),
      })
    } catch (cause) {
      const code = cause && typeof cause === 'object' && 'code' in cause ? String(cause.code) : ''
      setError(code.startsWith('auth/') ? getAuthErrorMessage(cause) : 'Enregistrement impossible pour le moment. Réessayez depuis cette page.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="profile-quiz-save" aria-label="Enregistrer mon résultat">
      <div className="profile-quiz-save-icon">{isCurrentSaved ? <BookmarkCheck size={24} aria-hidden="true" /> : <CloudUpload size={24} aria-hidden="true" />}</div>
      <div className="profile-quiz-save-copy">
        <h3>{isCurrentSaved ? 'Ce résultat est dans votre profil.' : 'Retrouvez ce résultat dans votre profil.'}</h3>
        <p>{isCurrentSaved ? 'Vos réponses et votre classement sont enregistrés dans votre espace personnel.' : 'Enregistrez volontairement vos réponses et votre classement dans votre espace personnel. Vous pourrez les consulter et les effacer.'}</p>
        {error ? <p className="profile-quiz-save-error" role="alert">{error}</p> : null}
      </div>
      {isCurrentSaved ? <Link to="/profile">Voir mon profil <ArrowRight size={17} aria-hidden="true" /></Link> : <button type="button" onClick={() => void save()} disabled={isSaving}>{isSaving ? 'Enregistrement…' : user ? visibleSaved ? 'Remplacer mon résultat' : 'Enregistrer mon résultat' : 'Me connecter et enregistrer'} <ArrowRight size={17} aria-hidden="true" /></button>}
    </section>
  )
}
