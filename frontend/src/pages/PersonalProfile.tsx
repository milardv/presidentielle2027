import { useMemo } from 'react'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { MobileAppNav } from '../components/MobileAppNav'
import { isAdminEmail } from '../config/admin'
import { AdminVideoRefreshPanel } from '../features/auth/components/AdminVideoRefreshPanel'
import { FavoriteCandidatesSection } from '../features/auth/components/FavoriteCandidatesSection'
import { FavoriteMediaAttentionSection } from '../features/auth/components/FavoriteMediaAttentionSection'
import { useAuthSession } from '../features/auth/hooks/useAuthSession'
import { useFavoriteCandidateMediaAttention } from '../features/auth/hooks/useFavoriteCandidateMediaAttention'
import { useFavoriteCandidates } from '../features/auth/hooks/useFavoriteCandidates'
import { ProfileAuthCard } from '../features/candidates/profile/components/ProfileAuthCard'
import { appNavItems } from '../navigation/appNavItems'
import { SeoHead } from '../seo/SeoHead'

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
  const favoriteCandidateIds = useMemo(
    () => favoriteCandidates.map((candidate) => candidate.id),
    [favoriteCandidates],
  )
  const {
    mediaAttentions: favoriteMediaAttentions,
    isLoading: isFavoriteMediaAttentionLoading,
    loadError: favoriteMediaAttentionError,
  } = useFavoriteCandidateMediaAttention(favoriteCandidateIds)
  const isAdmin = isAdminEmail(user?.email)

  return (
    <div className="min-h-screen bg-background-light text-slate-900 font-display dark:bg-background-dark dark:text-slate-100">
      <SeoHead
        title="Profil personnel | Présidentielles 2027"
        description="Espace personnel pour suivre vos candidats favoris sur Présidentielles 2027."
        path="/profile"
        noindex
      />
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(26,34,127,0.12),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.10),_transparent_35%)] pointer-events-none" />

      <AppSiteHeader containerClassName="max-w-5xl" />

      <main className="relative mx-auto flex max-w-5xl flex-col gap-5 px-4 py-8 pb-28 md:pb-16">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/92 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Profil</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Mon espace personnel</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Connexion simple, profil clair, et vos candidats suivis au même endroit.
          </p>
        </section>

        <ProfileAuthCard
          user={user}
          isLoading={isLoading}
          isSigningIn={isSigningIn}
          errorMessage={authError}
          onSignIn={signIn}
          onSignOut={signOut}
        />

        {user ? (
          <FavoriteMediaAttentionSection
            candidates={favoriteCandidates}
            mediaAttentions={favoriteMediaAttentions}
            isLoading={isFavoritesLoading || isFavoriteMediaAttentionLoading}
            errorMessage={favoriteMediaAttentionError}
          />
        ) : null}

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
            Certaines fonctions personnelles peuvent être temporairement indisponibles.
          </p>
        ) : null}
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
