import { ArrowRight, CalendarDays, Landmark, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HomeSummaryProps {
  totalCount: number
  declaredCount: number
  conditionalCount: number
  lastUpdateLabel: string
}

const ELYSEE_HERO_IMAGE_URL =
  'https://res.cloudinary.com/dagxzno9s/image/upload/f_auto,q_auto/v1773332875/presidentielles/site/elysee-home.png'

const summaryStats = (props: HomeSummaryProps) => [
  { label: 'Profils suivis', value: `${props.totalCount}`, icon: UsersRound },
  { label: 'Déclarés', value: `${props.declaredCount}`, icon: Landmark },
  { label: 'Conditionnels', value: `${props.conditionalCount}`, icon: UsersRound },
  { label: 'Mise à jour', value: props.lastUpdateLabel, icon: CalendarDays },
]

export function HomeSummary(props: HomeSummaryProps) {
  return (
    <section className="py-6 sm:py-8">
      <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <div className="grid xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <span className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Élections présidentielles 2027
            </span>

            <h1 className="hero-reveal hero-reveal-delay-1 mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-[3.25rem] lg:leading-[1.02]">
              Qui sont les candidats aux <span className="text-primary">présidentielles 2027</span> ?
            </h1>

            <p className="hero-reveal hero-reveal-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Suivez les candidatures, comparez les sondages et retrouvez en un seul endroit les profils, interventions,
              vidéos et signaux de campagne des principaux prétendants à l&apos;Élysée.
            </p>

            <div className="hero-reveal hero-reveal-delay-3 mt-7 flex flex-wrap gap-3">
              <a
                href="#home-candidates"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(236,91,19,0.22)] transition hover:bg-primary/92"
              >
                Voir les candidats
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/polls"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-primary/30 hover:text-primary"
              >
                Consulter les sondages
              </Link>
            </div>

            <div className="hero-reveal hero-reveal-delay-4 mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {summaryStats(props).map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.label}
                    className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-3 text-xl font-black tracking-tight text-slate-950">{stat.value}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="hero-image-reveal relative min-h-[22rem] border-t border-slate-200 xl:border-l xl:border-t-0">
            <img
              src={ELYSEE_HERO_IMAGE_URL}
              alt="Palais de l'Élysée"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/58" />
          </div>
        </div>
      </div>
    </section>
  )
}
