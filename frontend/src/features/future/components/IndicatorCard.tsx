import { ArrowDownRight, ArrowUpRight, BookOpen, Calculator, ExternalLink, FileText, Minus, Quote, Sigma } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LEVER_KIND_LABELS, type LeverEvidence } from '../../../data/candidateLeverEvidence.js'
import { FUTURE_HORIZON_YEAR, literatureSources, type PolicyLeverId } from '../../../data/futureIndicators.js'
import { formatDelta, formatIndicatorValue, formatLeverValue, type IndicatorProjection, type LeverContribution } from '../futureEngine'
import { IndicatorRangeChart } from './IndicatorRangeChart'

const Z_80 = 1.2816

interface IndicatorCardProps {
  projection: IndicatorProjection
  candidateFirstName: string
  accent: string
  evidence: Partial<Record<PolicyLeverId, LeverEvidence>>
}

const kindTone: Record<LeverEvidence['kind'], string> = {
  programme: 'bg-amber-100 text-amber-800',
  quiz: 'bg-sky-100 text-sky-800',
  derive: 'bg-violet-100 text-violet-800',
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{children}</p>
}

function SourceLink({ source, fichePath, candidateFirstName }: { source: LeverEvidence['source']; fichePath: string; candidateFirstName: string }) {
  if (source) {
    return (
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
        {source.label}
        {source.date ? <span className="font-normal text-slate-400"> · {source.date}</span> : null} <ExternalLink className="h-3 w-3" />
      </a>
    )
  }
  return (
    <Link to={fichePath} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
      Lecture du programme par la rédaction · sources de la fiche de {candidateFirstName}
    </Link>
  )
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

function EvidenceItem({ entry, evidence, candidateFirstName, indicator }: { entry: LeverContribution; evidence: LeverEvidence | undefined; candidateFirstName: string; indicator: IndicatorProjection['indicator'] }) {
  return (
    <li className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/60">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-slate-800 dark:text-slate-100">{entry.label}</span>
        {evidence ? <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${kindTone[evidence.kind]}`}>{LEVER_KIND_LABELS[evidence.kind]}</span> : null}
        <span className="ml-auto text-xs font-bold tabular-nums text-slate-600 dark:text-slate-300">
          {formatLeverValue(entry.value, entry.unit)} → {formatDelta(entry.contribution, indicator)} {indicator.unit}
        </span>
      </div>
      {evidence ? (
        <>
          <p className="mt-2 flex gap-2 text-sm text-slate-700 dark:text-slate-200">
            <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>{evidence.statement}</span>
          </p>
          {evidence.components.length ? (
            <ul className="mt-2 space-y-1 pl-5 text-xs text-slate-600 dark:text-slate-300">
              {evidence.components.map((component) => (
                <li key={component.theme}>
                  <span className="font-semibold">{component.theme}</span> : « {component.question} » → {component.stanceLabel} ({component.stance > 0 ? '+' : ''}{component.stance})
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-1.5 pl-5 text-xs text-slate-500">{evidence.detail}</p>
          {evidence.excerpt ? <p className="mt-1.5 pl-5 text-xs italic text-slate-500">« {evidence.excerpt} »</p> : null}
          <p className="mt-1.5 flex items-start gap-1.5 pl-5 text-xs">
            <FileText className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
            <SourceLink source={evidence.source} fichePath={evidence.fichePath} candidateFirstName={candidateFirstName} />
          </p>
        </>
      ) : (
        <p className="mt-2 text-xs text-slate-500">Aucune déclaration référencée pour ce levier.</p>
      )}
    </li>
  )
}

export function IndicatorCard({ projection, candidateFirstName, accent, evidence }: IndicatorCardProps) {
  const { indicator } = projection
  const activeContributions = projection.contributions.filter((entry) => entry.value !== 0)
  const inactiveContributions = projection.contributions.filter((entry) => entry.value === 0)
  const totalVariance = projection.sigma ** 2
  const trendShare = totalVariance ? (indicator.trend.sigma ** 2 / totalVariance) * 100 : 100
  const sumContributions = activeContributions.reduce((sum, entry) => sum + entry.contribution, 0)
  const rawMedian = indicator.trend.value + sumContributions
  const clamped = Math.abs(rawMedian - projection.median) > 10 ** -indicator.decimals / 2

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
        <div className="space-y-5 px-4 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <div>
            <StepTitle>1. Point de départ</StepTitle>
            <p className="mt-1">
              {formatIndicatorValue(indicator.baseline.value, indicator)} {indicator.unit} ({indicator.baseline.label}).{' '}
              <a href={indicator.baseline.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                {indicator.baseline.source.label} <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          <div>
            <StepTitle>2. Tendance sans changement de politique</StepTitle>
            <p className="mt-1">
              {formatIndicatorValue(indicator.trend.value, indicator)} en {FUTURE_HORIZON_YEAR}, incertitude ± {formatIndicatorValue(indicator.trend.sigma, indicator)} (écart-type). {indicator.trend.rationale}
            </p>
          </div>

          <div>
            <StepTitle>3. Déclarations et sources sur lesquelles on se base</StepTitle>
            <p className="mt-1 text-xs text-slate-500">
              Chaque levier qui agit sur cet indicateur est rattaché à l’engagement du programme ou à la position publique qui le justifie, puis traduit en une valeur chiffrée.
              Quand la fiche documente l’engagement, la source est citée ; sinon la valeur est une lecture éditoriale du programme, à vérifier dans les sources de la fiche.
            </p>
            {activeContributions.length ? (
              <ul className="mt-3 space-y-2">
                {activeContributions.map((entry) => (
                  <EvidenceItem key={entry.lever} entry={entry} evidence={evidence[entry.lever]} candidateFirstName={candidateFirstName} indicator={indicator} />
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-slate-500">Aucun levier du programme de {candidateFirstName} n’agit sur cet indicateur : la projection suit la tendance.</p>
            )}
            {inactiveContributions.length ? (
              <p className="mt-2 text-xs text-slate-400">
                Leviers neutres pour {candidateFirstName} : {inactiveContributions.map((entry) => `${entry.label.toLowerCase()} (${evidence[entry.lever]?.statement ?? 'aucune mesure'})`).join(' · ')}.
              </p>
            ) : null}
          </div>

          <div>
            <StepTitle>4. Élasticités retenues</StepTitle>
            <p className="mt-1 text-xs text-slate-500">
              Effet cumulé à l’horizon {FUTURE_HORIZON_YEAR} d’une unité de levier, avec l’écart-type traduisant la dispersion des études. Les références renvoient aux institutions dont les
              travaux donnent l’ordre de grandeur, pas à un document unique.
            </p>
            <table className="mt-2 w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.12em] text-slate-400">
                  <th className="py-1.5 pr-2 font-bold">Levier</th>
                  <th className="py-1.5 pr-2 font-bold">Effet par unité</th>
                  <th className="py-1.5 pr-2 font-bold">Références</th>
                  <th className="py-1.5 font-bold">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {[...activeContributions, ...inactiveContributions].map((entry) => {
                  const effect = indicator.effects.find((item) => item.lever === entry.lever)
                  return (
                    <tr key={entry.lever} className={`border-t border-slate-200/80 align-top ${entry.value === 0 ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                      <td className="py-2 pr-2">
                        <p className="font-semibold">{entry.label}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{entry.note}</p>
                      </td>
                      <td className="py-2 pr-2 tabular-nums whitespace-nowrap">
                        {formatDelta(entry.perUnit, indicator)} ± {formatIndicatorValue(effect?.sigma ?? 0, indicator)}
                        <p className="text-[10px] text-slate-400">par {entry.unit}</p>
                      </td>
                      <td className="py-2 pr-2">
                        <span className="flex flex-wrap gap-1">
                          {(effect?.refs ?? []).map((key) => {
                            const reference = literatureSources[key]
                            return reference ? (
                              <a key={key} href={reference.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 hover:underline dark:bg-slate-700 dark:text-slate-200">
                                <BookOpen className="h-2.5 w-2.5" /> {reference.label}
                              </a>
                            ) : null
                          })}
                        </span>
                      </td>
                      <td className="py-2 font-bold tabular-nums">{entry.value === 0 ? '—' : formatDelta(entry.contribution, indicator)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div>
            <StepTitle>5. Raisonnement probabiliste</StepTitle>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <strong>Linéarité et additivité.</strong> Chaque levier agit indépendamment des autres et proportionnellement à sa valeur : contribution = valeur × effet par unité.
                Médiane = tendance + somme des contributions = {formatIndicatorValue(indicator.trend.value, indicator)} {formatDelta(sumContributions, indicator)} ={' '}
                <strong>{formatIndicatorValue(projection.median, indicator)}</strong>
                {clamped ? ` (valeur brute ${formatIndicatorValue(rawMedian, indicator)}, ramenée dans la plage plausible ${indicator.bounds[0]} à ${indicator.bounds[1]})` : ''}.
              </li>
              <li>
                <strong>Incertitudes indépendantes et gaussiennes.</strong> L’incertitude de la tendance et celle de chaque élasticité sont modélisées par des lois normales indépendantes.
                Leurs variances s’additionnent : σ² = σ²(tendance) + Σ (valeur × σ(élasticité))².
              </li>
              <li>
                <strong>Écart-type combiné : {formatIndicatorValue(projection.sigma, indicator)}.</strong> Part de chaque source dans l’incertitude totale :
                <span className="mt-1 flex flex-wrap gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/70 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                    <Sigma className="h-2.5 w-2.5" /> tendance {trendShare.toFixed(0)} %
                  </span>
                  {activeContributions
                    .filter((entry) => entry.sigma > 0)
                    .sort((a, b) => b.sigma - a.sigma)
                    .map((entry) => (
                      <span key={entry.lever} className="inline-flex items-center gap-1 rounded-full bg-slate-200/70 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                        <Sigma className="h-2.5 w-2.5" /> {entry.label.toLowerCase()} {totalVariance ? ((entry.sigma ** 2 / totalVariance) * 100).toFixed(0) : 0} %
                      </span>
                    ))}
                </span>
              </li>
              <li>
                <strong>Intervalle à 80 %.</strong> Sous la loi normale, 80 % des tirages tombent à ± {Z_80.toFixed(2)} écart-type de la médiane : P10 = {formatIndicatorValue(projection.p10, indicator)},
                P90 = {formatIndicatorValue(projection.p90, indicator)}. Il reste une chance sur dix que la réalité soit en dessous de P10, et une sur dix qu’elle soit au-dessus de P90.
              </li>
              <li>
                <strong>Lecture du verdict.</strong> L’écart à la tendance ({formatDelta(projection.deltaVsTrend, indicator)}) n’est jugé significatif que s’il dépasse 15 % de l’incertitude de la tendance
                ({formatIndicatorValue(indicator.trend.sigma * 0.15, indicator)}) ; en dessous, l’indicateur est affiché « comme la tendance ».
              </li>
            </ol>
          </div>

          <p className="text-[11px] text-slate-400">
            Modèle linéaire indicatif : il ne capture ni les interactions entre mesures, ni les chocs externes (crise financière, énergie, géopolitique), ni la capacité réelle à faire voter le programme.
            Les déclarations citées sont celles connues à la date de mise à jour du modèle ; un programme définitif peut les modifier.
          </p>
        </div>
      </details>
    </article>
  )
}
