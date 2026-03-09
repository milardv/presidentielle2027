import { DesktopAppTabs } from '../components/DesktopAppTabs'
import { MobileAppNav } from '../components/MobileAppNav'
import { isAdminEmail } from '../config/admin'
import { AdminVideoRefreshPanel } from '../features/auth/components/AdminVideoRefreshPanel'
import { FavoriteCandidatesSection } from '../features/auth/components/FavoriteCandidatesSection'
import { useAuthSession } from '../features/auth/hooks/useAuthSession'
import { useFavoriteCandidates } from '../features/auth/hooks/useFavoriteCandidates'
import { ProfileAuthCard } from '../features/candidates/profile/components/ProfileAuthCard'
import { appNavItems } from '../navigation/appNavItems'

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
  const {
    favoriteCandidates,
    isLoading: isFavoritesLoading,
    loadError: favoritesError,
    togglingCandidateId,
    toggleFavoriteCandidate,
  } = useFavoriteCandidates(user?.uid)
  const isAdmin = isAdminEmail(user?.email)

  return (
    <div className="min-h-screen bg-background-light text-slate-900 font-display dark:bg-background-dark dark:text-slate-100">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(26,34,127,0.12),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.10),_transparent_35%)] pointer-events-none" />

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/88 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/88">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Profil</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Mon espace personnel</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Connexion simple, profil clair, et vos candidats suivis au meme endroit.
            </p>
          </div>
          <DesktopAppTabs items={appNavItems} className="shadow-none" />
        </div>
      </header>

      <main className="relative mx-auto flex max-w-5xl flex-col gap-5 px-4 py-8 pb-28 md:pb-16">
        <ProfileAuthCard
          user={user}
          isLoading={isLoading}
          isSigningIn={isSigningIn}
          errorMessage={authError}
          onSignIn={signIn}
          onSignOut={signOut}
        />

        {user ? (
          <FavoriteCandidatesSection
            candidates={favoriteCandidates}
            isLoading={isFavoritesLoading}
            errorMessage={favoritesError}
            removingCandidateId={togglingCandidateId}
            onRemoveFavorite={(candidateId) => {
              void toggleFavoriteCandidate(candidateId)
            }}
          />
        ) : null}

        {isAdmin && user?.email ? <AdminVideoRefreshPanel adminEmail={user.email} /> : null}

        {profileSyncStatus === 'error' ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            Certaines fonctions personnelles peuvent etre temporairement indisponibles.
          </p>
        ) : null}
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
