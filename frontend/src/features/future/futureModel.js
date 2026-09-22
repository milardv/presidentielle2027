import { getCandidateLeverEvidence } from '../../data/candidateLeverEvidence.js'
import { getCandidatePolicyLevers } from '../../data/candidatePolicyLevers.js'
import { futureCategories, futureIndicators, policyLevers } from '../../data/futureIndicators.js'

const Z_80 = 1.2816

function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value))
}

function roundTo(value, decimals) {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

// Normal approximation: median = trend + Σ lever × elasticity, variance = σ²(trend) + Σ (lever × σ(elasticity))².
export function projectIndicator(indicator, levers) {
  const contributions = indicator.effects.map((effect) => {
    const value = levers[effect.lever] ?? 0
    return {
      lever: effect.lever,
      label: policyLevers[effect.lever].label,
      unit: policyLevers[effect.lever].unit,
      value,
      perUnit: effect.perUnit,
      contribution: value * effect.perUnit,
      sigma: Math.abs(value) * effect.sigma,
      note: effect.note,
    }
  })

  const rawMedian = indicator.trend.value + contributions.reduce((sum, entry) => sum + entry.contribution, 0)
  const sigma = Math.sqrt(indicator.trend.sigma ** 2 + contributions.reduce((sum, entry) => sum + entry.sigma ** 2, 0))
  const median = clamp(rawMedian, indicator.bounds)
  const deltaVsTrend = median - indicator.trend.value
  const threshold = indicator.trend.sigma * 0.15

  return {
    indicator,
    today: indicator.baseline.value,
    trend: indicator.trend.value,
    median: roundTo(median, indicator.decimals),
    p10: roundTo(clamp(rawMedian - Z_80 * sigma, indicator.bounds), indicator.decimals),
    p90: roundTo(clamp(rawMedian + Z_80 * sigma, indicator.bounds), indicator.decimals),
    sigma,
    deltaVsTrend: roundTo(deltaVsTrend, indicator.decimals),
    deltaVsToday: roundTo(median - indicator.baseline.value, indicator.decimals),
    improvesVsTrend:
      Math.abs(deltaVsTrend) < threshold ? null : indicator.higherIsBetter ? deltaVsTrend > 0 : deltaVsTrend < 0,
    contributions,
  }
}

export function buildCandidateFutureModel(candidateId) {
  const levers = getCandidatePolicyLevers(candidateId)
  if (!levers) {
    return null
  }

  const categories = futureCategories.map((category) => {
    const projections = futureIndicators
      .filter((indicator) => indicator.category === category.id)
      .map((indicator) => projectIndicator(indicator, levers.values))
    return {
      category,
      projections,
      improving: projections.filter((projection) => projection.improvesVsTrend === true).length,
      worsening: projections.filter((projection) => projection.improvesVsTrend === false).length,
    }
  })

  const improving = categories.reduce((sum, category) => sum + category.improving, 0)
  const worsening = categories.reduce((sum, category) => sum + category.worsening, 0)

  return {
    levers,
    evidence: getCandidateLeverEvidence(candidateId) ?? {},
    categories,
    improving,
    worsening,
    neutral: futureIndicators.length - improving - worsening,
  }
}
