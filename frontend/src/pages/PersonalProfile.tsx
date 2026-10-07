import { useMemo } from 'react'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { MobileAppNav } from '../components/MobileAppNav'
import { isAdminEmail } from '../config/admin'
import { AdminVideoRefreshPanel } from '../features/auth/components/AdminVideoRefreshPanel'
import { FavoriteCandidatesSection } from '../features/auth/components/FavoriteCandidatesSection'
import { FavoriteMediaAttentionSection } from '../features/auth/components/FavoriteMediaAttentionSection'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { useAuthSession } from '../features/auth/hooks/useAuthSession'
import { useFavoriteCandidateMediaAttention } from '../features/auth/hooks/useFavoriteCandidateMediaAttention'
import { useFavoriteCandidates } from '../features/auth/hooks/useFavoriteCandidates'
import { ProfileAuthCard } from '../features/candidates/profile/components/ProfileAuthCard'
import { KnowledgeProfileCard } from '../features/knowledge/KnowledgeProfileCard'
import { PersonalQuizProfileCard } from '../features/quiz/components/PersonalQuizProfileCard'
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
    <div className="edition-page profile-page min-h-screen">
      <SeoHead
        title="Profil personnel | Présidentielles 2027"
        description="Vos résultats aux quiz, badges de connaissances et candidats suivis sur Présidentielles 2027."
        path="/profile"
        noindex
      />
      <AppSiteHeader containerClassName="w-full" />

      <main className="profile-main">
        <header className="profile-intro"><div><h1>Votre dossier personnel<span>.</span></h1><p>Vos idées, ce que vous avez appris et les personnalités que vous suivez, réunis au même endroit.</p></div></header>

        <ProfileAuthCard
          user={user}
          isLoading={isLoading}
          isSigningIn={isSigningIn}
          errorMessage={authError}
          onSignIn={signIn}
          onSignOut={signOut}
        />

        {user ? <div className="profile-results" key={user.uid}><PersonalQuizProfileCard userId={user.uid} /><KnowledgeProfileCard userId={user.uid} /></div> : null}

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

        {user ? <FavoriteMediaAttentionSection candidates={favoriteCandidates} mediaAttentions={favoriteMediaAttentions} isLoading={isFavoritesLoading || isFavoriteMediaAttentionLoading} errorMessage={favoriteMediaAttentionError} /> : null}

        {isAdmin && user?.email ? <AdminVideoRefreshPanel adminEmail={user.email} /> : null}

        {profileSyncStatus === 'error' ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            Certaines fonctions personnelles peuvent être temporairement indisponibles.
          </p>
        ) : null}
      </main>

      <HomeDesktopFooter />
      <MobileAppNav items={appNavItems} />
    </div>
  )
}
