import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ProfileAnchorNav } from '../features/candidates/profile/components/ProfileAnchorNav'
import { ProfileBioSection } from '../features/candidates/profile/components/ProfileBioSection'
import { ProfileErrorState } from '../features/candidates/profile/components/ProfileErrorState'
import { ProfileHeroSection } from '../features/candidates/profile/components/ProfileHeroSection'
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

  const viewModel = useMemo(
    () => (candidate ? buildProfileCandidateViewModel(candidate) : null),
    [candidate],
  )

  if (isLoading) {
    return <ProfileLoadingState />
  }

  if (loadError || candidate === null || viewModel === null) {
    return <ProfileErrorState errorMessage={loadError ?? 'Candidat indisponible.'} />
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      <ProfilePageHeader />

      <main className="max-w-4xl mx-auto pb-16 sm:pb-24">
        <ProfileHeroSection candidate={candidate} />
        <ProfileAnchorNav />

        <div className="p-4 sm:p-6 space-y-8">
          <ProfileBioSection candidate={candidate} />
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
