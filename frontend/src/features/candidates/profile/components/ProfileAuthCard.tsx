import type { User } from 'firebase/auth'
import { LogOut, UserRound } from 'lucide-react'

interface ProfileAuthCardProps {
  user: User | null
  isLoading: boolean
  isSigningIn: boolean
  errorMessage: string | null
  onSignIn: () => Promise<void>
  onSignOut: () => Promise<void>
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="profile-google-icon">
      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3C33.66 32.66 29.3 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.95 3.03l5.66-5.66C34.09 6.05 29.28 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z" />
      <path fill="#FF3D00" d="M6.31 14.69l6.57 4.82A11.95 11.95 0 0 1 24 12c3.06 0 5.84 1.15 7.95 3.03l5.66-5.66C34.09 6.05 29.28 4 24 4 16.32 4 9.66 8.34 6.31 14.69z" />
      <path fill="#4CAF50" d="M24 44c5.18 0 9.9-1.98 13.46-5.19l-6.22-5.27A11.93 11.93 0 0 1 24 36c-5.28 0-9.62-3.32-11.3-8.02l-6.53 5.03C9.48 39.53 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3a11.95 11.95 0 0 1-4.06 5.54l.01-.01 6.22 5.27C37.03 39.07 44 34 44 24c0-1.34-.14-2.65-.39-3.92z" />
    </svg>
  )
}

export function ProfileAuthCard({ user, isLoading, isSigningIn, errorMessage, onSignIn, onSignOut }: ProfileAuthCardProps) {
  const displayName = user?.displayName?.trim() || user?.email?.split('@')[0] || 'Votre profil'
  const firstName = displayName.split(' ')[0]

  return (
    <section className="profile-identity" aria-label="Compte personnel">
      {user ? (
        <>
          {user.photoURL ? <img className="profile-avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" /> : <span className="profile-avatar profile-avatar-fallback" aria-hidden="true">{displayName.charAt(0).toUpperCase()}</span>}
          <div className="profile-identity-copy"><h2>Bonjour {firstName}.</h2><p>{user.email} · Votre espace personnel</p></div>
          <button type="button" onClick={() => void onSignOut()}><LogOut size={16} aria-hidden="true" /> Se déconnecter</button>
        </>
      ) : (
        <>
          <div className="profile-avatar profile-avatar-fallback" aria-hidden="true"><UserRound size={27} strokeWidth={1.6} /></div>
          <div className="profile-identity-copy"><h2>Un espace à votre image.</h2><p>Connectez-vous pour retrouver vos résultats, vos badges et vos candidats suivis.</p></div>
          <button type="button" className="profile-signin" onClick={() => void onSignIn()} disabled={isLoading || isSigningIn}><GoogleIcon /> {isLoading || isSigningIn ? 'Connexion…' : 'Continuer avec Google'}</button>
        </>
      )}
      {errorMessage ? <p className="profile-identity-error" role="alert">{errorMessage}</p> : null}
    </section>
  )
}
