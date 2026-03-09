import { DesktopAppTabs } from '../components/DesktopAppTabs'
import { MobileAppNav } from '../components/MobileAppNav'
import { appNavItems } from '../navigation/appNavItems'
import { useAuthSession } from '../features/auth/hooks/useAuthSession'
import { ProfileAuthCard } from '../features/candidates/profile/components/ProfileAuthCard'

export default function PersonalProfile() {
  const {
    user,
    isLoading,
    isSigningIn,
    authError,
    profileSyncStatus,
    signIn,
    signOut,
  } = useAuthSession()

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Profil</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Mon espace personnel</h1>
          </div>
          <DesktopAppTabs items={appNavItems} className="shadow-none" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-28 md:pb-16 py-8 space-y-4">
        <ProfileAuthCard
          user={user}
          isLoading={isLoading}
          isSigningIn={isSigningIn}
          errorMessage={authError}
          onSignIn={signIn}
          onSignOut={signOut}
        />

        {profileSyncStatus === 'error' ? (
          <p className="px-1 text-sm text-amber-700 dark:text-amber-400">
            Certaines fonctions personnelles peuvent être indisponibles pour le moment.
          </p>
        ) : null}
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
