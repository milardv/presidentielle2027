import type { User } from 'firebase/auth'

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
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5" role="img">
      <path
        fill="#FFC107"
        d="M43.61 20.08H42V20H24v8h11.3C33.66 32.66 29.3 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.95 3.03l5.66-5.66C34.09 6.05 29.28 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z"
      />
      <path
        fill="#FF3D00"
        d="M6.31 14.69l6.57 4.82A11.95 11.95 0 0 1 24 12c3.06 0 5.84 1.15 7.95 3.03l5.66-5.66C34.09 6.05 29.28 4 24 4 16.32 4 9.66 8.34 6.31 14.69z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.18 0 9.9-1.98 13.46-5.19l-6.22-5.27A11.93 11.93 0 0 1 24 36c-5.28 0-9.62-3.32-11.3-8.02l-6.53 5.03C9.48 39.53 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.61 20.08H42V20H24v8h11.3a11.95 11.95 0 0 1-4.06 5.54l.01-.01 6.22 5.27C37.03 39.07 44 34 44 24c0-1.34-.14-2.65-.39-3.92z"
      />
    </svg>
  )
}

export function ProfileAuthCard({
  user,
  isLoading,
  isSigningIn,
  errorMessage,
  onSignIn,
  onSignOut,
}: ProfileAuthCardProps) {
  const displayName = user?.displayName?.trim() || 'Profil personnel'
  const firstName = displayName.split(' ')[0] || displayName

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-primary/12 via-transparent to-amber-200/30 dark:to-amber-400/10 pointer-events-none" />

      {user ? (
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-sm">
                  {(displayName || user.email || 'P').charAt(0).toUpperCase()}
                </div>
              )}

              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Votre profil</p>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Bonjour {firstName}
                </h2>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Vous êtes connecté avec Google. Votre espace personnel est prêt.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void onSignOut()}
              className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Déconnexion
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Nom</p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{displayName}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Adresse e-mail</p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white break-all">
                {user.email ?? 'Non renseignée'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col gap-6">
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Profil personnel</p>
            <h2 className="max-w-xl text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Connectez-vous avec Google
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Accédez à votre espace personnel en une étape, avec une connexion simple et claire.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => void onSignIn()}
              disabled={isLoading || isSigningIn}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 dark:bg-white px-5 py-3 text-sm font-semibold text-white dark:text-slate-900 shadow-sm hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            >
              <GoogleIcon />
              {isLoading || isSigningIn ? 'Connexion...' : 'Continuer avec Google'}
            </button>
            <p className="text-xs text-slate-400">Aucun formulaire à remplir.</p>
          </div>
        </div>
      )}

      {errorMessage ? <p className="relative mt-4 text-sm font-medium text-red-600 dark:text-red-400">{errorMessage}</p> : null}
    </section>
  )
}
