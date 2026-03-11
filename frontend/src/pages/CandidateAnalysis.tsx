import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { MobileAppNav } from '../components/MobileAppNav'
import { CandidateAnalysisAnchorNav } from '../features/candidates/profile/components/CandidateAnalysisAnchorNav'
import { CandidateProfileTabs } from '../features/candidates/profile/components/CandidateProfileTabs'
import { ProfileErrorState } from '../features/candidates/profile/components/ProfileErrorState'
import { ProfileLoadingState } from '../features/candidates/profile/components/ProfileLoadingState'
import { ProfileMediaAttentionSection } from '../features/candidates/profile/components/ProfileMediaAttentionSection'
import { ProfileNetworkSection } from '../features/candidates/profile/components/ProfileNetworkSection'
import { ProfilePageHeader } from '../features/candidates/profile/components/ProfilePageHeader'
import { ProfileParcoursSection } from '../features/candidates/profile/components/ProfileParcoursSection'
import { ProfileStyleSection } from '../features/candidates/profile/components/ProfileStyleSection'
import { ProfileThemeHighlightsSection } from '../features/candidates/profile/components/ProfileThemeHighlightsSection'
import { useCandidateMediaAttention } from '../features/candidates/profile/hooks/useCandidateMediaAttention'
import { useCandidateProfile } from '../features/candidates/profile/hooks/useCandidateProfile'
import { buildProfileCandidateViewModel } from '../features/candidates/profile/utils/profileCandidateViewModel'
import { getCandidateInitials } from '../features/candidates/shared/candidateUi'
import { appNavItems } from '../navigation/appNavItems'
import { SeoHead } from '../seo/SeoHead'

export default function CandidateAnalysis() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const { candidate, isLoading, loadError } = useCandidateProfile(candidateId)
  const {
    mediaAttention,
    isLoading: isMediaAttentionLoading,
    loadError: mediaAttentionLoadError,
  } = useCandidateMediaAttention(candidateId)

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
    <div className="relative min-h-screen bg-background-light font-display text-slate-900">
      <SeoHead
        title={`${candidate.name} 2027 : analyse média et réseau`}
        description={`Analyse média, réseau, thèmes et parcours de ${candidate.name} dans le suivi Présidentielles 2027.`}
        path={`/candidats/${candidate.id}/analysis`}
        noindex
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.12),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.10),_transparent_22%)]" />
      <ProfilePageHeader />

      <main className="relative w-full pb-16 sm:pb-24">
        <CandidateProfileTabs candidateId={candidate.id} />

        <section className="mx-4 mt-6 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/92 shadow-[0_22px_60px_rgba(15,23,42,0.10)] sm:mx-6">
          <div className="relative grid gap-6 p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center sm:p-8">
            <div className="flex items-start gap-4">
              {candidate.photoUrl ? (
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="h-20 w-20 rounded-[1.6rem] object-cover shadow-sm sm:h-24 sm:w-24"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-slate-800 to-slate-700 text-xl font-bold text-white shadow-sm sm:h-24 sm:w-24">
                  {getCandidateInitials(candidate.name)}
                </div>
              )}

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Analyse candidat</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{candidate.name}</h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Lecture analytique de son attention média, de ses thèmes, de son réseau, de son parcours et de son style politique.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CandidateAnalysisAnchorNav />

        <div className="space-y-8 p-4 sm:p-6">
          <ProfileMediaAttentionSection
            mediaAttention={mediaAttention}
            isLoading={isMediaAttentionLoading}
            loadError={mediaAttentionLoadError}
          />
          <ProfileThemeHighlightsSection candidateId={candidate.id} entries={viewModel.themeHighlights} />
          <ProfileNetworkSection
            candidateId={candidate.id}
            candidateName={candidate.name}
            candidateParty={candidate.party}
            candidatePhotoUrl={candidate.photoUrl}
            entries={viewModel.networkEntries}
          />
          <ProfileParcoursSection candidateId={candidate.id} entries={viewModel.parcoursEntries} />
          <ProfileStyleSection candidateId={candidate.id} entries={viewModel.styleEntries} />
        </div>
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
