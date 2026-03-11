import { ChevronRight } from 'lucide-react'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { MobileAppNav } from '../components/MobileAppNav'
import { appNavItems } from '../navigation/appNavItems'
import { accentizeFrenchCopy } from '../seo/frenchCopy.js'
import { SeoHead } from '../seo/SeoHead'
import { getSeoPageBySlug } from '../seo/seoPagesData.js'
import { buildCanonicalUrl, withBasePath } from '../seo/site'

interface SeoLandingPageProps {
  pageSlug: string
}

interface SeoLandingContent {
  slug: string
  title: string
  description: string
  heroEyebrow: string
  heroTitle: string
  heroIntro: string
  queries: string[]
  summary: string[]
  sections: Array<{
    title: string
    paragraphs: string[]
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  relatedLinks: Array<{
    label: string
    href: string
  }>
}

function buildFaqSchema(page: SeoLandingContent) {
  return {
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export default function SeoLandingPage({ pageSlug }: SeoLandingPageProps) {
  const page = getSeoPageBySlug(pageSlug) as SeoLandingContent | null

  if (!page) {
    return null
  }

  const displayTitle = accentizeFrenchCopy(page.title)
  const displayDescription = accentizeFrenchCopy(page.description)
  const displayHeroIntro = accentizeFrenchCopy(page.heroIntro)

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <SeoHead
        title={displayTitle}
        description={displayDescription}
        path={`/${page.slug}/`}
        keywords={page.queries.map((query) => accentizeFrenchCopy(query))}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: displayTitle,
            description: displayDescription,
            url: buildCanonicalUrl(`/${page.slug}/`),
            inLanguage: 'fr-FR',
          },
          buildFaqSchema(page),
        ]}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.12),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_28%),radial-gradient(circle_at_40%_40%,_rgba(245,158,11,0.10),_transparent_24%)]" />

      <AppSiteHeader containerClassName="w-full" />

      <main className="relative flex w-full flex-col gap-8 px-4 py-8 pb-28 md:pb-16">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/94 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{displayHeroIntro}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {page.queries.map((query) => (
              <span
                key={query}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                {accentizeFrenchCopy(query)}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
            <div className="space-y-4">
              {page.sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[1.6rem] border border-slate-200/80 bg-slate-50/75 p-5"
                >
                  <h2 className="text-lg font-black tracking-tight text-slate-950">{accentizeFrenchCopy(section.title)}</h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{accentizeFrenchCopy(paragraph)}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <aside className="space-y-4">
              <section className="rounded-[1.6rem] border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">A retenir</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                  {page.summary.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{accentizeFrenchCopy(item)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[1.6rem] border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Aller plus loin</p>
                <div className="mt-4 grid gap-3">
                  {page.relatedLinks.map((link) => (
                    <a
                      key={`${page.slug}-${link.href}`}
                      href={withBasePath(link.href)}
                      className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      <span>{accentizeFrenchCopy(link.label)}</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/94 p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">FAQ</p>
          <div className="mt-5 grid gap-4">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/75 p-5">
                <h2 className="text-base font-black tracking-tight text-slate-950">{accentizeFrenchCopy(faq.question)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{accentizeFrenchCopy(faq.answer)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
