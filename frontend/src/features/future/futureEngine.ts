import type { FutureIndicator } from '../../data/futureIndicators.js'

export { buildCandidateFutureModel, projectIndicator } from './futureModel.js'
export type { CandidateFutureModel, CategoryProjection, IndicatorProjection, LeverContribution } from './futureModel.js'

export function formatIndicatorValue(value: number, indicator: FutureIndicator): string {
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: indicator.decimals,
    maximumFractionDigits: indicator.decimals,
  })
}

export function formatDelta(value: number, indicator: FutureIndicator): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '±'
  return `${sign}${formatIndicatorValue(Math.abs(value), indicator)}`
}

export function formatLeverValue(value: number, unit: string): string {
  const formatted = Number.isInteger(value) ? `${value}` : value.toLocaleString('fr-FR', { maximumFractionDigits: 2 })
  const signed = value > 0 && !unit.startsWith('intensité') && !unit.startsWith('position') ? `+${formatted}` : formatted
  return `${signed} ${unit}`
}
