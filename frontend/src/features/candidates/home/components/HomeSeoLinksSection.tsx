import { ArrowRight } from 'lucide-react'
import { accentizeFrenchCopy } from '../../../../seo/frenchCopy.js'
import { seoPages } from '../../../../seo/seoPagesData.js'
import { withBasePath } from '../../../../seo/site'

const featuredPageSlugs = [
  'presidentielle-2027',
  'sondage-presidentielle-2027',
  'candidats-presidentielle-2027',
  'quand-aura-lieu-la-presidentielle-2027',
  'bardella-2027',
  'le-pen-2027',
  'attal-president-2027',
  'edouard-philippe-2027',
]
const featuredPages = featuredPageSlugs
  .map((slug) => seoPages.find((page) => page.slug === slug) ?? null)
  .filter((page) => page !== null)

export function HomeSeoLinksSection() {
  return (
    <section className="pb-6">
      <details className="group rounded-[2rem] border border-slate-200/80 bg-white/94 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:hidden sm:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Questions les plus recherchées</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Présidentielle 2027, sondages, candidats, date et grands noms
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Ouvrir pour voir les pages d’entrée SEO et les liens vers les sujets les plus recherchés.
            </p>
          </div>
          <span className="shrink-0 text-sm font-black uppercase tracking-[0.16em] text-primary transition group-open:rotate-45">
            +
          </span>
        </summary>

        <div className="border-t border-slate-200/80 px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {featuredPages.map((page) => (
              <a
                key={page.slug}
                href={withBasePath(`/${page.slug}/`)}
                className="group rounded-[1.4rem] border border-slate-200/80 bg-slate-50/80 p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{accentizeFrenchCopy(page.heroEyebrow)}</p>
                <h3 className="mt-2 text-base font-black tracking-tight text-slate-950">{accentizeFrenchCopy(page.heroTitle)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{accentizeFrenchCopy(page.description)}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Ouvrir la page
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </details>
    </section>
  )
}
