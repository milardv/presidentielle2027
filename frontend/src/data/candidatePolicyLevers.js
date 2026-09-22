import { candidateStances } from './quizData.js'

// Editorial levers per candidate, read from programmes and public commitments (see the candidate's fiche).
// fiscalImpulse in points of GDP per year (positive = larger deficit), retirementAge in years vs 64,
// smicHike in real %, other levers on the scales described in futureIndicators.policyLevers.
const editorialLevers = {
  'marine-le-pen': {
    fiscalImpulse: 1.2, retirementAge: -2, smicHike: 0, taxWealth: 0, educationInvestment: 0, healthInvestment: 1, prisonBuilding: 2,
    notes: 'Retour à 62 ans avec carrières longues, TVA à 5,5 % sur l’énergie, hausse des budgets régaliens et hospitaliers, financés en partie par des économies revendiquées sur l’immigration et la fraude dont le rendement est incertain.',
  },
  'edouard-philippe': {
    fiscalImpulse: -0.8, retirementAge: 1, smicHike: 0, taxWealth: 0, educationInvestment: 0, healthInvestment: 0, prisonBuilding: 1,
    notes: 'Priorité affichée au redressement des comptes, allongement de la durée d’activité, stabilité fiscale ; poursuite du plan de construction de places de prison.',
  },
  'bruno-retailleau': {
    fiscalImpulse: -0.7, retirementAge: 0, smicHike: 0, taxWealth: 0, educationInvestment: 0, healthInvestment: 0, prisonBuilding: 2,
    notes: 'Baisse de la dépense publique et des impôts de production, maintien de la réforme des retraites, programme pénitentiaire massif et durcissement pénal.',
  },
  'gabriel-attal': {
    fiscalImpulse: -0.5, retirementAge: 0, smicHike: 0, taxWealth: 0, educationInvestment: 1, healthInvestment: 0, prisonBuilding: 1,
    notes: 'Continuité budgétaire du bloc central avec consolidation progressive, maintien de la réforme de 2023, effort ciblé sur l’école.',
  },
  'jean-luc-melenchon': {
    fiscalImpulse: 2.5, retirementAge: -4, smicHike: 14, taxWealth: 2, educationInvestment: 2, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Retraite à 60 ans, SMIC à 1 600 € net, planification écologique et embauches massives dans les services publics, financés par le retour de l’ISF et une hausse de la fiscalité du capital ; solde net fortement déficitaire selon les chiffrages indépendants.',
  },
  'raphael-glucksmann': {
    fiscalImpulse: 0.8, retirementAge: -1, smicHike: 3, taxWealth: 2, educationInvestment: 1, healthInvestment: 1, prisonBuilding: 0,
    notes: 'Investissement dans la réindustrialisation et la défense européenne, taxe Zucman, retour partiel sur la réforme des retraites.',
  },
  'eric-zemmour': {
    fiscalImpulse: -0.3, retirementAge: 0, smicHike: 0, taxWealth: 0, educationInvestment: 0, healthInvestment: -1, prisonBuilding: 2,
    notes: 'Baisses d’impôts financées par des coupes dans les dépenses sociales et liées à l’immigration, programme pénitentiaire, maintien de l’âge de départ.',
  },
  'xavier-bertrand': {
    fiscalImpulse: -0.3, retirementAge: 0, smicHike: 0, taxWealth: 0, educationInvestment: 0, healthInvestment: 0, prisonBuilding: 2,
    notes: 'Droite sociale : baisse ciblée des charges, fermeté pénale et construction de prisons, sans remise en cause de la réforme des retraites.',
  },
  'david-lisnard': {
    fiscalImpulse: -1.2, retirementAge: 1, smicHike: 0, taxWealth: 0, educationInvestment: -1, healthInvestment: -1, prisonBuilding: 2,
    notes: 'Réduction forte de la dépense publique et du nombre de fonctionnaires, décentralisation, allongement de l’activité, programme pénitentiaire.',
  },
  'fabien-roussel': {
    fiscalImpulse: 2.0, retirementAge: -4, smicHike: 14, taxWealth: 2, educationInvestment: 2, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Retraite à 60 ans, SMIC à 1 600 € net, nationalisations dans l’énergie, hausse des salaires publics, financés par la fiscalité du capital.',
  },
  'marine-tondelier': {
    fiscalImpulse: 1.5, retirementAge: -2, smicHike: 10, taxWealth: 2, educationInvestment: 2, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Investissement climatique massif, abrogation de la réforme des retraites, ISF climatique, hausse du SMIC.',
  },
  'francois-ruffin': {
    fiscalImpulse: 2.0, retirementAge: -4, smicHike: 14, taxWealth: 2, educationInvestment: 1, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Retraite à 60 ans pour les métiers pénibles, SMIC à 1 600 € net, protectionnisme et services publics de proximité.',
  },
  'olivier-faure': {
    fiscalImpulse: 1.2, retirementAge: -2, smicHike: 5, taxWealth: 2, educationInvestment: 2, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Abrogation de la réforme des retraites, taxe Zucman, plan école et hôpital.',
  },
  'segolene-royal': {
    fiscalImpulse: 0.8, retirementAge: -2, smicHike: 5, taxWealth: 1, educationInvestment: 1, healthInvestment: 1, prisonBuilding: 0,
    notes: 'Retour à 62 ans, écologie et démocratie participative, fiscalité du patrimoine renforcée de façon ciblée.',
  },
  'jerome-guedj': {
    fiscalImpulse: 1.0, retirementAge: -2, smicHike: 5, taxWealth: 2, educationInvestment: 1, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Protection sociale et grand âge, abrogation de la réforme des retraites, taxe Zucman.',
  },
  'emmanuel-maurel': {
    fiscalImpulse: 1.5, retirementAge: -4, smicHike: 10, taxWealth: 2, educationInvestment: 1, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Souverainisme de gauche : réindustrialisation publique, retraite à 60 ans, hausse du SMIC, désobéissance aux règles budgétaires européennes.',
  },
  'bernard-cazeneuve': {
    fiscalImpulse: 0, retirementAge: 0, smicHike: 0, taxWealth: 1, educationInvestment: 1, healthInvestment: 1, prisonBuilding: 1,
    notes: 'Social-démocratie de gouvernement : sérieux budgétaire, autorité de l’État, effort mesuré sur l’école et la santé.',
  },
  'karim-bouamrane': {
    fiscalImpulse: 0.5, retirementAge: -1, smicHike: 3, taxWealth: 1, educationInvestment: 1, healthInvestment: 1, prisonBuilding: 1,
    notes: 'Égalité territoriale, sécurité du quotidien et investissement dans les quartiers, financés par une fiscalité ciblée.',
  },
  'delphine-batho': {
    fiscalImpulse: 1.0, retirementAge: -2, smicHike: 5, taxWealth: 2, educationInvestment: 1, healthInvestment: 1, prisonBuilding: 0,
    notes: 'Écologie de rupture : sortie du nucléaire, sobriété, fiscalité écologique et patrimoniale.',
  },
  'nathalie-arthaud': {
    fiscalImpulse: 3.0, retirementAge: -4, smicHike: 25, taxWealth: 2, educationInvestment: 1, healthInvestment: 2, prisonBuilding: 0,
    notes: 'Programme de rupture : interdiction des licenciements, SMIC à 2 000 €, expropriation des banques ; hors du cadre des chiffrages classiques.',
  },
  'nicolas-dupont-aignan': {
    fiscalImpulse: 0.8, retirementAge: -2, smicHike: 0, taxWealth: 0, educationInvestment: 0, healthInvestment: 1, prisonBuilding: 2,
    notes: 'Souverainisme : sortie des traités européens contraignants, retour à 62 ans, baisse des impôts et fermeté pénale.',
  },
  'florian-philippot': {
    fiscalImpulse: 1.0, retirementAge: -2, smicHike: 0, taxWealth: 0, educationInvestment: 0, healthInvestment: 1, prisonBuilding: 1,
    notes: 'Frexit et sortie de l’euro, retour à 62 ans, baisse de la TVA sur l’énergie.',
  },
  'francois-asselineau': {
    fiscalImpulse: 0.5, retirementAge: -2, smicHike: 5, taxWealth: 0, educationInvestment: 0, healthInvestment: 1, prisonBuilding: 1,
    notes: 'Sortie de l’UE, de l’euro et de l’OTAN par l’article 50, renationalisations, retour à 62 ans.',
  },
  'dominique-de-villepin': {
    fiscalImpulse: -0.2, retirementAge: 0, smicHike: 0, taxWealth: 1, educationInvestment: 1, healthInvestment: 0, prisonBuilding: 1,
    notes: 'Gaullisme social et pro-européen : sérieux budgétaire, contribution accrue des plus aisés, priorité à l’école et à la diplomatie.',
  },
}

function stance(candidateId, questionId) {
  return candidateStances[candidateId]?.[questionId] ?? 0
}

export function getCandidatePolicyLevers(candidateId) {
  const editorial = editorialLevers[candidateId]
  if (!editorial) {
    return null
  }

  const proportionnelle = stance(candidateId, 'proportionnelle')
  const ric = stance(candidateId, 'ric')
  const europe = stance(candidateId, 'europe')

  return {
    values: {
      fiscalImpulse: editorial.fiscalImpulse,
      retirementAge: editorial.retirementAge,
      smicHike: editorial.smicHike,
      taxWealth: editorial.taxWealth,
      educationInvestment: editorial.educationInvestment,
      healthInvestment: editorial.healthInvestment,
      prisonBuilding: editorial.prisonBuilding,
      immigrationRestriction: stance(candidateId, 'immigration'),
      justiceRepressive: stance(candidateId, 'justice'),
      ecologyIntensity: stance(candidateId, 'ecologie'),
      nuclearRelaunch: stance(candidateId, 'nucleaire'),
      institutionsReform: Math.max(0, Math.round((proportionnelle + ric) / 2)),
      europeExit: europe <= -2 ? 2 : europe === -1 ? 1 : 0,
    },
    notes: editorial.notes,
  }
}

export const candidatesWithPolicyLevers = Object.keys(editorialLevers)
