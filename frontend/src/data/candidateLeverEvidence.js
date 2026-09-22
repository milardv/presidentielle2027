import { getCandidate2027ById } from './candidates2027.js'
import { candidatePolicyLeverDetails } from './candidatePolicyLevers.js'
import { policyLevers } from './futureIndicators.js'
import { candidateStances, quizQuestions } from './quizData.js'

// What a lever value means when no specific measure was found in the programme.
const neutralStatements = {
  fiscalImpulse: 'Aucune impulsion budgétaire nette identifiée : les mesures nouvelles sont présentées comme financées.',
  retirementAge: 'Pas de remise en cause de l’âge légal de 64 ans issu de la loi de 2023.',
  smicHike: 'Pas de hausse du SMIC promise au-delà de l’indexation automatique sur les prix.',
  taxWealth: 'Pas de hausse annoncée de la fiscalité du patrimoine ou des très hauts revenus.',
  educationInvestment: 'Pas d’effort supplémentaire, ni de baisse assumée, identifié pour l’école.',
  healthInvestment: 'Pas d’effort supplémentaire, ni de coupe, identifié pour le système de santé.',
  prisonBuilding: 'Pas de programme immobilier pénitentiaire significatif dans le programme.',
}

function signed(value) {
  const formatted = value.toLocaleString('fr-FR', { maximumFractionDigits: 2 })
  return value > 0 ? `+${formatted}` : formatted
}

const stanceLabels = {
  '-2': 'Pas du tout d’accord',
  '-1': 'Plutôt pas d’accord',
  '0': 'Position non tranchée ou non établie',
  '1': 'Plutôt d’accord',
  '2': 'Tout à fait d’accord',
}

export const LEVER_KIND_LABELS = {
  programme: 'Lu dans le programme',
  quiz: 'Position du quiz',
  derive: 'Dérivé du quiz',
}

function findPositionSource(candidate, topic) {
  if (!candidate || !topic) {
    return null
  }
  const position = candidate.keyPositions?.find((entry) => entry.topic === topic)
  if (position) {
    return { source: position.source, excerpt: position.summary }
  }
  const highlight = candidate.themeHighlights?.find((entry) => entry.theme === topic)
  return highlight ? { source: highlight.source, excerpt: highlight.analysis } : null
}

function quizEvidence(candidate, candidateId, leverId, questionId, value, backing) {
  const question = quizQuestions.find((entry) => entry.id === questionId)
  return {
    lever: leverId,
    kind: 'quiz',
    value,
    statement: question ? `Affirmation du quiz : « ${question.statement} »` : policyLevers[leverId].description,
    detail: `${stanceLabels[String(value)]} (${signed(value)} sur une échelle de -2 à +2), position estimée à partir du programme, des votes et des déclarations publiques.`,
    source: backing?.source ?? null,
    excerpt: backing?.excerpt ?? null,
    fichePath: `/candidats/${candidateId}/`,
    components: [],
  }
}

function derivedEvidence(candidateId, leverId, value, formula, componentIds, stances, backing) {
  const components = componentIds.map((questionId) => {
    const question = quizQuestions.find((entry) => entry.id === questionId)
    const stance = stances[questionId] ?? 0
    return {
      question: question?.statement ?? questionId,
      theme: question?.theme ?? questionId,
      stance,
      stanceLabel: stanceLabels[String(stance)],
    }
  })
  return {
    lever: leverId,
    kind: 'derive',
    value,
    statement: policyLevers[leverId].description,
    detail: formula,
    source: backing?.source ?? null,
    excerpt: backing?.excerpt ?? null,
    fichePath: `/candidats/${candidateId}/`,
    components,
  }
}

/**
 * For each lever of a candidate: the declaration or programme measure it rests on, the source that
 * documents it (a sourced position of the fiche when available, otherwise the fiche itself), and how
 * the value was derived. Returns null when the candidate has no projection.
 */
export function getCandidateLeverEvidence(candidateId) {
  const details = candidatePolicyLeverDetails[candidateId]
  if (!details) {
    return null
  }
  const candidate = getCandidate2027ById(candidateId)
  const stances = candidateStances[candidateId] ?? {}
  const backing = (topic) => findPositionSource(candidate, topic)

  const evidence = {}
  for (const [leverId, entry] of Object.entries(details.levers)) {
    const positionBacking = backing(entry.topic)
    evidence[leverId] = {
      lever: leverId,
      kind: 'programme',
      value: entry.value,
      statement: entry.statement ?? neutralStatements[leverId],
      detail: entry.value === 0 ? 'Levier neutre : aucune contribution à la projection.' : `Traduit en ${policyLevers[leverId].label.toLowerCase()} : ${signed(entry.value)} ${policyLevers[leverId].unit}.`,
      source: positionBacking?.source ?? null,
      excerpt: positionBacking?.excerpt ?? null,
      fichePath: `/candidats/${candidateId}/`,
      components: [],
    }
  }

  const quizLevers = { immigrationRestriction: 'immigration', justiceRepressive: 'justice', ecologyIntensity: 'ecologie', nuclearRelaunch: 'nucleaire' }
  for (const [leverId, questionId] of Object.entries(quizLevers)) {
    evidence[leverId] = quizEvidence(candidate, candidateId, leverId, questionId, stances[questionId] ?? 0, backing(details.topics?.[leverId]))
  }

  const proportionnelle = stances.proportionnelle ?? 0
  const ric = stances.ric ?? 0
  evidence.institutionsReform = derivedEvidence(
    candidateId,
    'institutionsReform',
    Math.max(0, Math.round((proportionnelle + ric) / 2)),
    `Moyenne arrondie des positions « proportionnelle » (${proportionnelle}) et « RIC » (${ric}), bornée à zéro : (${proportionnelle} + ${ric}) / 2 → ${Math.max(0, Math.round((proportionnelle + ric) / 2))}.`,
    ['proportionnelle', 'ric'],
    stances,
    backing(details.topics?.institutionsReform),
  )

  const europe = stances.europe ?? 0
  evidence.europeExit = derivedEvidence(
    candidateId,
    'europeExit',
    europe <= -2 ? 2 : europe === -1 ? 1 : 0,
    `Position « rester pleinement dans l’UE et l’euro » = ${europe} : -2 → rupture (2), -1 → désobéissance ou renégociation conflictuelle (1), sinon maintien (0).`,
    ['europe'],
    stances,
    backing(details.topics?.europeExit),
  )

  return evidence
}
