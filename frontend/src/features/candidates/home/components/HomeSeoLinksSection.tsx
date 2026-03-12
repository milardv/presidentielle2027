import { ArrowRight } from 'lucide-react'
import { accentizeFrenchCopy } from '../../../../seo/frenchCopy.js'
import { seoPages } from '../../../../seo/seoPagesData.js'
import { withBasePath } from '../../../../seo/site'

const faqLinks = [
  {
    slug: 'quand-aura-lieu-la-presidentielle-2027',
    question: 'Quand aura lieu la présidentielle 2027 ?',
    summary: 'Retrouvez les dates probables du premier tour, du second tour et les jalons institutionnels à connaître.',
  },
  {
    slug: 'qui-peut-se-presenter-en-2027',
    question: 'Qui peut se présenter en 2027 ?',
    summary: 'Conditions d’éligibilité, parrainages et points de droit à vérifier avant qu’une candidature soit réellement possible.',
  },
  {
    slug: 'macron-peut-il-se-representer-en-2027',
    question: 'Emmanuel Macron peut-il se représenter en 2027 ?',
    summary: 'Réponse juridique simple sur la limitation des mandats consécutifs et ses conséquences pour 2027.',
  },
  {
    slug: 'comment-se-deroule-election-presidentielle',
    question: 'Comment se déroule l’élection présidentielle ?',
    summary: 'Un rappel clair du scrutin à deux tours, du rôle des parrainages et de la campagne officielle.',
  },
  {
    slug: 'sondage-presidentielle-2027',
    question: 'Où en sont les sondages de la présidentielle 2027 ?',
    summary: 'Instituts, scénarios testés, intentions de vote et méthode de lecture pour comprendre les écarts.',
  },
  {
    slug: 'candidats-presidentielle-2027',
    question: 'Qui sont les candidats déjà cités pour 2027 ?',
    summary: 'Un panorama des profils déclarés, conditionnels ou régulièrement testés dans les enquêtes d’opinion.',
  },
]

const featuredPages = faqLinks
  .map((entry) => ({
    ...entry,
    page: seoPages.find((page) => page.slug === entry.slug) ?? null,
  }))
  .filter((entry): entry is (typeof entry & { page: NonNullable<typeof entry.page> }) => entry.page !== null)

export function HomeSeoLinksSection() {
  return (
    <section className="pb-12 pt-8 sm:pt-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="hero-reveal text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Questions courantes</p>
        <h2 className="hero-reveal hero-reveal-delay-1 mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          Les repères utiles pour comprendre 2027
        </h2>
        <p className="hero-reveal hero-reveal-delay-2 mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Ces pages répondent directement aux questions les plus fréquentes sur la prochaine présidentielle et restent reliées aux profils et aux sondages du site.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-5xl space-y-4">
        {featuredPages.map(({ slug, question, summary, page }, index) => (
          <a
            key={slug}
            href={withBasePath(`/${slug}/`)}
            className="candidate-card-reveal group flex items-start justify-between gap-4 rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_20px_42px_rgba(15,23,42,0.08)] sm:p-6"
            style={{ animationDelay: `${280 + index * 70}ms` }}
          >
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                {accentizeFrenchCopy(page.heroEyebrow)}
              </p>
              <h3 className="mt-2 text-lg font-black tracking-tight text-slate-950 sm:text-xl">{question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {accentizeFrenchCopy(summary)}
              </p>
            </div>

            <span className="mt-1 inline-flex shrink-0 items-center justify-center rounded-full bg-primary/10 p-2 text-primary transition group-hover:bg-primary group-hover:text-white">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
