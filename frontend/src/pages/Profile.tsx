import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthSession } from '../features/auth/hooks/useAuthSession'
import { useFavoriteCandidates } from '../features/auth/hooks/useFavoriteCandidates'
import { ProfileAnchorNav } from '../features/candidates/profile/components/ProfileAnchorNav'
import { ProfileBioSection } from '../features/candidates/profile/components/ProfileBioSection'
import { ProfileErrorState } from '../features/candidates/profile/components/ProfileErrorState'
import { ProfileHeroSection } from '../features/candidates/profile/components/ProfileHeroSection'
import { ProfileInterventionsSection } from '../features/candidates/profile/components/ProfileInterventionsSection'
import { ProfileLoadingState } from '../features/candidates/profile/components/ProfileLoadingState'
import { ProfileNetworkSection } from '../features/candidates/profile/components/ProfileNetworkSection'
import { ProfilePageHeader } from '../features/candidates/profile/components/ProfilePageHeader'
import { ProfileParcoursSection } from '../features/candidates/profile/components/ProfileParcoursSection'
import { ProfileSourcesSection } from '../features/candidates/profile/components/ProfileSourcesSection'
import { ProfileStyleSection } from '../features/candidates/profile/components/ProfileStyleSection'
import { ProfileThemeHighlightsSection } from '../features/candidates/profile/components/ProfileThemeHighlightsSection'
import { ProfileTimelineSection } from '../features/candidates/profile/components/ProfileTimelineSection'
import { useCandidateProfile } from '../features/candidates/profile/hooks/useCandidateProfile'
import { buildProfileCandidateViewModel } from '../features/candidates/profile/utils/profileCandidateViewModel'

export default function Profile() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const { candidate, isLoading, loadError } = useCandidateProfile(candidateId)
  const { user, signIn, isSigningIn } = useAuthSession()
  const {
    favoriteCandidateIds,
    loadError: favoriteLoadError,
    togglingCandidateId,
    toggleFavoriteCandidate,
  } = useFavoriteCandidates(user?.uid)
  const [shouldAutoFavoriteAfterSignIn, setShouldAutoFavoriteAfterSignIn] = useState(false)

  const viewModel = useMemo(
    () => (candidate ? buildProfileCandidateViewModel(candidate) : null),
    [candidate],
  )
  const isFavorite = candidate ? favoriteCandidateIds.includes(candidate.id) : false

  useEffect(() => {
    if (!shouldAutoFavoriteAfterSignIn) {
      return
    }

    if (!isSigningIn && !user) {
      setShouldAutoFavoriteAfterSignIn(false)
      return
    }

    if (!user || !candidate || isFavorite) {
      return
    }

    setShouldAutoFavoriteAfterSignIn(false)
    void toggleFavoriteCandidate(candidate.id)
  }, [candidate, isFavorite, isSigningIn, shouldAutoFavoriteAfterSignIn, toggleFavoriteCandidate, user])

  if (isLoading) {
    return <ProfileLoadingState />
  }

  if (loadError || candidate === null || viewModel === null) {
    return <ProfileErrorState errorMessage={loadError ?? 'Candidat indisponible.'} />
  }

  return (
    <div className="relative min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,_rgba(26,34,127,0.10),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.10),_transparent_26%)]" />
      <ProfilePageHeader />

      <main className="relative max-w-4xl mx-auto pb-16 sm:pb-24">
        <ProfileHeroSection
          candidate={candidate}
          isAuthenticated={Boolean(user)}
          isFavorite={isFavorite}
          isFavoritePending={isSigningIn || togglingCandidateId === candidate.id}
          favoriteError={favoriteLoadError}
          onToggleFavorite={() => {
            void toggleFavoriteCandidate(candidate.id)
          }}
          onSignIn={async () => {
            setShouldAutoFavoriteAfterSignIn(true)
            await signIn()
          }}
        />
        <ProfileAnchorNav />

        <div className="p-4 sm:p-6 space-y-8">
          <ProfileBioSection candidate={candidate} />
          <ProfileInterventionsSection candidateId={candidate.id} entries={candidate.interventions ?? []} />
          <ProfileTimelineSection candidateId={candidate.id} timeline={viewModel.timeline} />
          <ProfileThemeHighlightsSection candidateId={candidate.id} entries={viewModel.themeHighlights} />
          <ProfileNetworkSection candidateId={candidate.id} entries={viewModel.networkEntries} />
          <ProfileParcoursSection candidateId={candidate.id} entries={viewModel.parcoursEntries} />
          <ProfileStyleSection candidateId={candidate.id} entries={viewModel.styleEntries} />
          <ProfileSourcesSection sources={candidate.sources} />
        </div>
      </main>
    </div>
  )
}
