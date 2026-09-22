import { AlertTriangle, Telescope } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { MobileAppNav } from '../components/MobileAppNav'
import { FUTURE_HORIZON_YEAR, FUTURE_MODEL_UPDATED_AT, futureIndicators, policyLevers, type PolicyLeverId } from '../data/futureIndicators.js'
import { CandidateProfileTabs } from '../features/candidates/profile/components/CandidateProfileTabs'
import { ProfileErrorState } from '../features/candidates/profile/components/ProfileErrorState'
import { ProfileLoadingState } from '../features/candidates/profile/components/ProfileLoadingState'
import { ProfilePageHeader } from '../features/candidates/profile/components/ProfilePageHeader'
import { useCandidateProfile } from '../features/candidates/profile/hooks/useCandidateProfile'
import { formatFrenchDate, getCandidatePartyAccentColor } from '../features/candidates/shared/candidateUi'
import { FutureCategoryList } from '../features/future/components/FutureCategoryList'
import { buildCandidateFutureModel, formatLeverValue } from '../features/future/futureEngine'
import { appNavItems } from '../navigation/appNavItems'
import { buildCandidateFutureSeo, candidateFuturePath } from '../seo/candidateSeo.js'
import { SeoHead } from '../seo/SeoHead'
import { buildCanonicalUrl } from '../seo/site'

export default function CandidateFuture() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const { candidate, isLoading, loadError } = useCandidateProfile(candidateId)
  const model = useMemo(() => (candidateId ? buildCandidateFutureModel(candidateId) : null), [candidateId])

  if (isLoading) {
    return <ProfileLoadingState />
  }

  if (loadError || !candidate) {
    return <ProfileErrorState errorMessage={loadError ?? 'Candidat indisponible.'} />
  }

  const seo = buildCandidateFutureSeo(candidate)
  const accent = getCandidatePartyAccentColor(candidate.party)
  const firstName = candidate.name.split(' ')[0]

  return (
    <div className="relative min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <SeoHead
        title={seo.title}
        description={seo.description}
        path={candidateFuturePath(candidate)}
        keywords={seo.keywords}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AnalysisNewsArticle',
          headline: seo.title,
          description: seo.description,
          url: buildCanonicalUrl(candidateFuturePath(candidate)),
          inLanguage: 'fr-FR',
          dateModified: FUTURE_MODEL_UPDATED_AT,
          about: { '@type': 'Person', name: candidate.name },
        }}
      />
      <ProfilePageHeader />

      <main className="relative w-full pb-16 sm:pb-24">
        <CandidateProfileTabs candidateId={candidate.id} />

        <div className="space-y-6 p-4 sm:p-6">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
            <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>
              <Telescope className="h-4 w-4" /> La France dans 5 ans
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              La France en {FUTURE_HORIZON_YEAR} si le programme de {candidate.name} est appliqué à la lettre
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {futureIndicators.length} indicateurs mesurables, projetés à la fin du mandat à partir de leur tendance actuelle et des leviers du programme, avec un
              intervalle de confiance à 80 %. Chaque indicateur détaille sa méthode de calcul et ses sources.
            </p>

            {model ? (
              <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-700">{model.improving} indicateur{model.improving > 1 ? 's' : ''} en mieux que la tendance</span>
                <span className="rounded-full bg-rose-100 px-3 py-1.5 text-rose-700">{model.worsening} en moins bien</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">{model.neutral} sans écart significatif</span>
              </div>
            ) : null}

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Exercice de projection, pas de prédiction : le modèle est linéaire, ignore les chocs externes et suppose que tout le programme est voté et appliqué dès 2027.
                Les leviers sont estimés par la rédaction à partir des programmes publiés ; les élasticités viennent de la littérature économique (Insee, COR, OFCE, OCDE) et sont
                volontairement prudentes. Mis à jour le {formatFrenchDate(FUTURE_MODEL_UPDATED_AT)}.
              </p>
            </div>
          </section>

          {model ? (
            <>
              <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 dark:border-slate-800 dark:bg-slate-900/80 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Hypothèses retenues pour {firstName}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{model.levers.notes}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(Object.entries(model.levers.values) as Array<[PolicyLeverId, number]>).map(([lever, value]) => (
                    <span
                      key={lever}
                      title={model.evidence[lever]?.statement ?? policyLevers[lever].description}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        value === 0 ? 'border-slate-200 text-slate-400' : 'border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {policyLevers[lever].label} : {formatLeverValue(value, policyLevers[lever].unit)}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Les positions « issues du quiz » reprennent la grille du quiz « Quel candidat vous correspond ? » ; les autres sont lues dans le programme. Survolez un levier pour lire
                  l’engagement retenu ; la méthode de calcul de chaque indicateur détaille la déclaration, sa source et le raisonnement.
                </p>
              </section>

              <FutureCategoryList categories={model.categories} candidateFirstName={firstName} accent={accent} evidence={model.evidence} />
            </>
          ) : (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Pas de projection disponible pour ce profil : {candidate.name} ne se présente pas à l’élection.
            </section>
          )}
        </div>
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
