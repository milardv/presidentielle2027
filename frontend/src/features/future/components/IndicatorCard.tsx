import { ArrowDownRight, ArrowUpRight, Calculator, ExternalLink, Minus } from 'lucide-react'
import { FUTURE_HORIZON_YEAR } from '../../../data/futureIndicators.js'
import { formatDelta, formatIndicatorValue, formatLeverValue, type IndicatorProjection } from '../futureEngine'
import { IndicatorRangeChart } from './IndicatorRangeChart'

interface IndicatorCardProps {
  projection: IndicatorProjection
  candidateFirstName: string
  accent: string
}

function DeltaBadge({ projection }: { projection: IndicatorProjection }) {
  const { improvesVsTrend, deltaVsTrend, indicator } = projection
  const tone =
    improvesVsTrend === null
      ? 'bg-slate-100 text-slate-600'
      : improvesVsTrend
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-rose-100 text-rose-700'
  const Icon = improvesVsTrend === null ? Minus : deltaVsTrend > 0 ? ArrowUpRight : ArrowDownRight
  const label = improvesVsTrend === null ? 'comme la tendance' : improvesVsTrend ? 'mieux que la tendance' : 'moins bien que la tendance'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${tone}`}>
      <Icon className="h-3.5 w-3.5" /> {formatDelta(deltaVsTrend, indicator)} · {label}
    </span>
  )
}

export function IndicatorCard({ projection, candidateFirstName, accent }: IndicatorCardProps) {
  const { indicator } = projection
  const activeContributions = projection.contributions.filter((entry) => entry.value !== 0)
  const inactiveContributions = projection.contributions.filter((entry) => entry.value === 0)

  return (
    <article className="flex flex-col rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">{indicator.label}</h4>
          <p className="text-xs font-semibold text-slate-500">{indicator.unit}</p>
        </div>
        <DeltaBadge projection={projection} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Aujourd’hui</p>
          <p className="mt-1 text-xl font-black tabular-nums text-slate-900 dark:text-white">{formatIndicatorValue(projection.today, indicator)}</p>
          <p className="text-[10px] text-slate-400">{indicator.baseline.label}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Tendance {FUTURE_HORIZON_YEAR}</p>
          <p className="mt-1 text-xl font-black tabular-nums text-slate-600 dark:text-slate-300">{formatIndicatorValue(projection.trend, indicator)}</p>
          <p className="text-[10px] text-slate-400">sans changement</p>
        </div>
        <div className="rounded-2xl p-3" style={{ backgroundColor: `${accent}1a` }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
            Avec {candidateFirstName}
          </p>
          <p className="mt-1 text-xl font-black tabular-nums" style={{ color: accent }}>
            {formatIndicatorValue(projection.median, indicator)}
          </p>
          <p className="text-[10px] text-slate-500">
            {formatIndicatorValue(projection.p10, indicator)} à {formatIndicatorValue(projection.p90, indicator)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <IndicatorRangeChart projection={projection} accent={accent} />
        <p className="mt-1 text-[11px] text-slate-400">
          Trait noir : historique observé · pointillés gris : tendance sans changement · zone colorée : intervalle à 80 % (P10–P90) avec le programme.
        </p>
      </div>

      <details className="group mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 dark:border-slate-700 dark:bg-slate-800/40">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-bold text-primary">
          <Calculator className="h-4 w-4" /> Voir la méthode de calcul
        </summary>
        <div className="space-y-4 px-4 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">1. Point de départ</p>
            <p className="mt-1">
              {formatIndicatorValue(indicator.baseline.value, indicator)} {indicator.unit} ({indicator.baseline.label}).{' '}
              <a href={indicator.baseline.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                {indicator.baseline.source.label} <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">2. Tendance sans changement de politique</p>
            <p className="mt-1">
              {formatIndicatorValue(indicator.trend.value, indicator)} en {FUTURE_HORIZON_YEAR}, incertitude ± {formatIndicatorValue(indicator.trend.sigma, indicator)} (écart-type). {indicator.trend.rationale}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">3. Effet des leviers du programme</p>
            <table className="mt-2 w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.12em] text-slate-400">
                  <th className="py-1.5 pr-2 font-bold">Levier</th>
                  <th className="py-1.5 pr-2 font-bold">Valeur retenue</th>
                  <th className="py-1.5 pr-2 font-bold">Effet par unité</th>
                  <th className="py-1.5 font-bold">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {[...activeContributions, ...inactiveContributions].map((entry) => (
                  <tr key={entry.lever} className={`border-t border-slate-200/80 align-top ${entry.value === 0 ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    <td className="py-2 pr-2">
                      <p className="font-semibold">{entry.label}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{entry.note}</p>
                    </td>
                    <td className="py-2 pr-2 tabular-nums">{formatLeverValue(entry.value, entry.unit)}</td>
                    <td className="py-2 pr-2 tabular-nums">
                      {formatDelta(entry.perUnit, indicator)} ± {formatIndicatorValue(indicator.effects.find((effect) => effect.lever === entry.lever)?.sigma ?? 0, indicator)}
                    </td>
                    <td className="py-2 font-bold tabular-nums">{entry.value === 0 ? '—' : formatDelta(entry.contribution, indicator)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">4. Résultat</p>
            <p className="mt-1">
              Médiane = tendance + somme des contributions = {formatIndicatorValue(projection.trend, indicator)}{' '}
              {formatDelta(projection.median - projection.trend, indicator)} = <strong>{formatIndicatorValue(projection.median, indicator)}</strong>. L’incertitude combine celle de la tendance et
              celle de chaque élasticité (racine de la somme des variances) : écart-type {formatIndicatorValue(projection.sigma, indicator)}, d’où un intervalle à 80 % de{' '}
              {formatIndicatorValue(projection.p10, indicator)} à {formatIndicatorValue(projection.p90, indicator)}.
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            Modèle linéaire indicatif : il ne capture ni les interactions entre mesures, ni les chocs externes (crise financière, énergie, géopolitique), ni la capacité réelle à faire voter le programme.
          </p>
        </div>
      </details>
    </article>
  )
}
