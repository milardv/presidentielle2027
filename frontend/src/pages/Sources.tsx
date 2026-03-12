import type { ReactNode } from 'react'
import { ArrowUpRight, BookOpenText, Database, Landmark, RadioTower, ShieldCheck } from 'lucide-react'
import { AppSiteHeader } from '../components/AppSiteHeader'
import type { SourceInventoryEntry } from '../data/sourceInventoryTypes'
import { HomeAlert } from '../features/candidates/home/components/HomeAlert'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { HomeMobileNav } from '../features/candidates/home/components/HomeMobileNav'
import { formatFrenchDate } from '../features/candidates/shared/candidateUi'
import { useSourceInventory } from '../features/sources/hooks/useSourceInventory'
import { SeoHead } from '../seo/SeoHead'

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{detail}</p>
    </article>
  )
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: ReactNode
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
          {icon}
          {eyebrow}
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function SourceCard({
  entry,
  countLabel,
}: {
  entry: SourceInventoryEntry
  countLabel: string
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-950">{entry.label}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{entry.domain}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
            {entry.referenceCount} {countLabel}
          </span>
          {entry.latestDate ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
              {formatFrenchDate(entry.latestDate)}
            </span>
          ) : null}
        </div>
      </div>

      {entry.detail ? <p className="mt-3 text-sm leading-relaxed text-slate-500">{entry.detail}</p> : null}

      <a
        href={entry.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        Ouvrir la source
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </article>
  )
}

function SourceSection({
  icon,
  eyebrow,
  title,
  description,
  entries,
  countLabel,
}: {
  icon: ReactNode
  eyebrow: string
  title: string
  description: string
  entries: SourceInventoryEntry[]
  countLabel: string
}) {
  return (
    <section className="mt-10 space-y-5">
      <SectionHeader icon={icon} eyebrow={eyebrow} title={title} description={description} />
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {entries.map((entry) => (
          <SourceCard key={entry.url} entry={entry} countLabel={countLabel} />
        ))}
      </div>
    </section>
  )
}

function SourcesLoadingState() {
  return (
    <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={`source-loading-${index}`} className="h-40 rounded-2xl border border-slate-200 bg-white animate-pulse" />
      ))}
    </section>
  )
}

export default function Sources() {
  const { inventory, isLoading, loadError } = useSourceInventory()

  const lastUpdatedLabel = inventory?.lastUpdated ? formatFrenchDate(inventory.lastUpdated) : 'Non disponible'

  return (
    <div className="relative min-h-screen bg-background-light font-display text-slate-900">
      <SeoHead
        title="Sources et méthodologie - Présidentielles 2027"
        description="Toutes les sources utilisées pour les profils candidats, les sondages, les vidéos, les tweets, les courbes média et les pages explicatives de Présidentielles 2027."
        path="/sources"
        keywords={[
          'sources présidentielle 2027',
          'méthodologie présidentielle 2027',
          'sources sondages présidentielle 2027',
          'sources candidats présidentielle 2027',
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Sources et méthodologie - Présidentielles 2027',
          description:
            'Inventaire des sources éditoriales, institutionnelles et techniques utilisées pour alimenter les données du site.',
          inLanguage: 'fr-FR',
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.10),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),_transparent_28%),radial-gradient(circle_at_50%_20%,_rgba(245,158,11,0.08),_transparent_24%)]" />

      <AppSiteHeader />

      <main className="relative w-full px-4 pb-28 md:pb-24">
        <section className="mx-auto mt-6 w-full rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Transparence des données</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Sources utilisées pour les profils, les sondages et les courbes média
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Cette page recense les sources actuellement utilisées par le site. Les fiches candidats et les sondages
              sont lus depuis Firestore, et cet inventaire est reconstruit à partir des références réellement
              enregistrées en base, complétées par les fournisseurs de données et les repères institutionnels employés
              dans les imports et les pages explicatives.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <SummaryCard
              label="Sources uniques"
              value={inventory ? `${inventory.totalUniqueSources}` : '...'}
              detail="Liens distincts actuellement recensés sur l'ensemble du site."
            />
            <SummaryCard
              label="Profils candidats"
              value={inventory ? `${inventory.candidateSources.length}` : '...'}
              detail={inventory ? `${inventory.candidateReferenceCount} références stockées dans les fiches.` : 'Compilation des références éditoriales des candidats.'}
            />
            <SummaryCard
              label="Sondages"
              value={inventory ? `${inventory.pollStudyCount}` : '...'}
              detail="Études de vote enregistrées dans la collection Firestore."
            />
            <SummaryCard
              label="Domaines"
              value={inventory ? `${inventory.domainCount}` : '...'}
              detail="Nombre de domaines distincts mobilisés par les données et la méthodologie."
            />
            <SummaryCard
              label="Mise à jour"
              value={lastUpdatedLabel}
              detail="Dernière date de mise à jour connue remontée par les collections candidats et sondages."
            />
          </div>
        </section>

        {loadError ? <div className="mt-6"><HomeAlert tone="error" message={loadError} /></div> : null}

        {isLoading && <SourcesLoadingState />}

        {!isLoading && inventory ? (
          <>
            <SourceSection
              icon={<Database className="h-4 w-4" />}
              eyebrow="Méthode"
              title="Fournisseurs et pipelines de données"
              description="Ces sources décrivent comment les données sont collectées, enrichies ou hébergées avant d’être servies par l’application."
              entries={inventory.methodologySources}
              countLabel="usage"
            />

            <SourceSection
              icon={<BookOpenText className="h-4 w-4" />}
              eyebrow="Profils candidats"
              title="Sources présentes dans les fiches candidats"
              description="Références actuellement stockées dans les biographies, positions, parcours, réseaux, interventions et compléments d’enfance des candidats."
              entries={inventory.candidateSources}
              countLabel="mentions"
            />

            <SourceSection
              icon={<RadioTower className="h-4 w-4" />}
              eyebrow="Sondages"
              title="Sources des études d’intention de vote"
              description="Chaque étude conserve son lien public d’origine. Cette liste est dédupliquée et comptabilise le nombre d’études reliées à chaque source."
              entries={inventory.pollSources}
              countLabel="études"
            />

            <SourceSection
              icon={<ShieldCheck className="h-4 w-4" />}
              eyebrow="Comptes X"
              title="Sources de vérification des comptes publics"
              description="Références utilisées pour associer les comptes X officiels aux fiches candidats avant collecte des posts publics."
              entries={inventory.xVerificationSources}
              countLabel="vérification"
            />

            <SourceSection
              icon={<Landmark className="h-4 w-4" />}
              eyebrow="Cadre électoral"
              title="Sources institutionnelles et juridiques"
              description="Références utilisées pour les pages explicatives sur la date du scrutin, les règles de candidature, la rééligibilité et le fonctionnement de l’élection."
              entries={inventory.institutionalSources}
              countLabel="référence"
            />
          </>
        ) : null}
      </main>

      <HomeMobileNav />
      <HomeDesktopFooter />
    </div>
  )
}
