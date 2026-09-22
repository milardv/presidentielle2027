import { candidateStances } from './quizData.js'

// Editorial levers per candidate, read from programmes and public commitments.
// Each lever carries the declaration it rests on and, when the fiche documents it, the topic of the
// sourced key position backing it (see candidateLeverEvidence.js). `topics` does the same for quiz levers.
// fiscalImpulse in points of GDP per year (positive = larger deficit), retirementAge in years vs 64,
// smicHike in real %, other levers on the scales described in futureIndicators.policyLevers.
export const candidatePolicyLeverDetails = {
  'marine-le-pen': {
    notes: 'Retour à 62 ans avec carrières longues, TVA à 5,5 % sur l’énergie, hausse des budgets régaliens et hospitaliers, financés en partie par des économies revendiquées sur l’immigration et la fraude dont le rendement est incertain.',
    levers: {
      fiscalImpulse: { value: 1.2, statement: 'TVA à 5,5 % sur l’énergie, hausse des budgets régaliens et hospitaliers, financés par des économies revendiquées sur l’immigration et la fraude au rendement incertain.' },
      retirementAge: { value: -2, statement: 'Retour à 62 ans avec dispositif carrières longues (départ à 60 ans pour ceux qui ont commencé tôt).' },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: 1, statement: 'Hausse annoncée du budget hospitalier et revalorisation des soignants.' },
      prisonBuilding: { value: 2, statement: 'Programme massif de places de prison et exécution des peines.' },
    },
  },
  'edouard-philippe': {
    notes: 'Priorité affichée au redressement des comptes, allongement de la durée d’activité, stabilité fiscale ; poursuite du plan de construction de places de prison.',
    levers: {
      fiscalImpulse: { value: -0.8, statement: 'Priorité affichée au redressement des comptes publics : consolidation d’environ 0,8 point de PIB par an.' },
      retirementAge: { value: 1, statement: 'Allongement de la durée d’activité au-delà de la réforme de 2023.' },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: 0 },
      prisonBuilding: { value: 1, statement: 'Poursuite du plan de 15 000 places de prison.' },
    },
  },
  'bruno-retailleau': {
    notes: 'Baisse de la dépense publique et des impôts de production, maintien de la réforme des retraites, programme pénitentiaire massif et durcissement pénal.',
    levers: {
      fiscalImpulse: { value: -0.7, statement: 'Baisse de la dépense publique et des impôts de production, avec un effort net de consolidation.', topic: 'Ligne politique' },
      retirementAge: { value: 0 },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: 0 },
      prisonBuilding: { value: 2, statement: 'Programme pénitentiaire massif et durcissement pénal.', topic: 'Ligne politique' },
    },
    topics: { justiceRepressive: 'Ligne politique', immigrationRestriction: 'Ligne politique' },
  },
  'gabriel-attal': {
    notes: 'Continuité budgétaire du bloc central avec consolidation progressive, maintien de la réforme de 2023, effort ciblé sur l’école.',
    levers: {
      fiscalImpulse: { value: -0.5, statement: 'Continuité budgétaire du bloc central avec consolidation progressive.' },
      retirementAge: { value: 0 },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 1, statement: 'Effort ciblé sur l’école (effectifs, revalorisation).' },
      healthInvestment: { value: 0 },
      prisonBuilding: { value: 1, statement: 'Poursuite du plan de 15 000 places.' },
    },
  },
  'jean-luc-melenchon': {
    notes: 'Retraite à 60 ans, SMIC à 1 600 € net, planification écologique et embauches massives dans les services publics, financés par le retour de l’ISF et une hausse de la fiscalité du capital ; solde net fortement déficitaire selon les chiffrages indépendants.',
    levers: {
      fiscalImpulse: { value: 2.5, statement: 'Planification écologique, embauches massives dans les services publics et hausse des dépenses sociales ; solde net fortement déficitaire selon les chiffrages indépendants.', topic: 'Préparation programmatique' },
      retirementAge: { value: -4, statement: 'Retraite à 60 ans.', topic: 'Préparation programmatique' },
      smicHike: { value: 14, statement: 'SMIC porté à 1 600 € net.', topic: 'Préparation programmatique' },
      taxWealth: { value: 2, statement: 'Retour de l’ISF et hausse de la fiscalité du capital.', topic: 'Préparation programmatique' },
      educationInvestment: { value: 2, statement: 'Recrutements massifs d’enseignants et revalorisation.', topic: 'Préparation programmatique' },
      healthInvestment: { value: 2, statement: 'Plan d’embauches à l’hôpital et fin de la tarification à l’activité.', topic: 'Préparation programmatique' },
      prisonBuilding: { value: 0 },
    },
  },
  'raphael-glucksmann': {
    notes: 'Investissement dans la réindustrialisation et la défense européenne, taxe Zucman, retour partiel sur la réforme des retraites.',
    levers: {
      fiscalImpulse: { value: 0.8, statement: 'Investissement dans la réindustrialisation et la défense européenne.', topic: 'Plateforme économique' },
      retirementAge: { value: -1, statement: 'Retour partiel sur la réforme des retraites.' },
      smicHike: { value: 3, statement: 'Hausse modérée du SMIC et des bas salaires.', topic: 'Plateforme économique' },
      taxWealth: { value: 2, statement: 'Taxe Zucman sur les très hauts patrimoines.', topic: 'Plateforme économique' },
      educationInvestment: { value: 1, statement: 'Effort sur l’école et la formation.' },
      healthInvestment: { value: 1, statement: 'Renforcement de l’hôpital public.' },
      prisonBuilding: { value: 0 },
    },
  },
  'eric-zemmour': {
    notes: 'Baisses d’impôts financées par des coupes dans les dépenses sociales et liées à l’immigration, programme pénitentiaire, maintien de l’âge de départ.',
    levers: {
      fiscalImpulse: { value: -0.3, statement: 'Baisses d’impôts financées par des coupes dans les dépenses sociales et liées à l’immigration.' },
      retirementAge: { value: 0 },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: -1, statement: 'Coupes assumées dans certaines dépenses de santé (AME notamment).' },
      prisonBuilding: { value: 2, statement: 'Programme pénitentiaire massif.' },
    },
  },
  'xavier-bertrand': {
    notes: 'Droite sociale : baisse ciblée des charges, fermeté pénale et construction de prisons, sans remise en cause de la réforme des retraites.',
    levers: {
      fiscalImpulse: { value: -0.3, statement: 'Baisse ciblée des charges sur le travail.' },
      retirementAge: { value: 0 },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: 0 },
      prisonBuilding: { value: 2, statement: 'Construction de prisons et fermeté pénale.' },
    },
  },
  'david-lisnard': {
    notes: 'Réduction forte de la dépense publique et du nombre de fonctionnaires, décentralisation, allongement de l’activité, programme pénitentiaire.',
    levers: {
      fiscalImpulse: { value: -1.2, statement: 'Réduction forte de la dépense publique et du nombre de fonctionnaires.' },
      retirementAge: { value: 1, statement: 'Allongement de l’activité au-delà de 64 ans.' },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: -1, statement: 'Baisse des effectifs publics touchant aussi l’Éducation nationale.' },
      healthInvestment: { value: -1, statement: 'Réduction des dépenses publiques incluant le périmètre de la santé.' },
      prisonBuilding: { value: 2, statement: 'Programme pénitentiaire massif.' },
    },
  },
  'fabien-roussel': {
    notes: 'Retraite à 60 ans, SMIC à 1 600 € net, nationalisations dans l’énergie, hausse des salaires publics, financés par la fiscalité du capital.',
    levers: {
      fiscalImpulse: { value: 2, statement: 'Hausse des salaires publics, nationalisations dans l’énergie et services publics renforcés.', topic: 'Gauche du travail' },
      retirementAge: { value: -4, statement: 'Retraite à 60 ans.', topic: 'Gauche du travail' },
      smicHike: { value: 14, statement: 'SMIC porté à 1 600 € net.', topic: 'Gauche du travail' },
      taxWealth: { value: 2, statement: 'Fiscalité du capital renforcée pour financer le programme.', topic: 'Gauche du travail' },
      educationInvestment: { value: 2, statement: 'Recrutements dans l’Éducation nationale.' },
      healthInvestment: { value: 2, statement: 'Plan hôpital et embauches de soignants.' },
      prisonBuilding: { value: 0 },
    },
    topics: { nuclearRelaunch: 'Gauche du travail', ecologyIntensity: 'Gauche du travail' },
  },
  'marine-tondelier': {
    notes: 'Investissement climatique massif, abrogation de la réforme des retraites, ISF climatique, hausse du SMIC.',
    levers: {
      fiscalImpulse: { value: 1.5, statement: 'Investissement climatique massif.' },
      retirementAge: { value: -2, statement: 'Abrogation de la réforme des retraites, retour à 62 ans.' },
      smicHike: { value: 10, statement: 'Hausse du SMIC.' },
      taxWealth: { value: 2, statement: 'ISF climatique.' },
      educationInvestment: { value: 2, statement: 'Effort sur l’école.' },
      healthInvestment: { value: 2, statement: 'Effort sur l’hôpital et la prévention.' },
      prisonBuilding: { value: 0 },
    },
  },
  'francois-ruffin': {
    notes: 'Retraite à 60 ans pour les métiers pénibles, SMIC à 1 600 € net, protectionnisme et services publics de proximité.',
    levers: {
      fiscalImpulse: { value: 2, statement: 'Services publics de proximité et protectionnisme.', topic: 'Candidature populaire' },
      retirementAge: { value: -4, statement: 'Retraite à 60 ans pour les métiers pénibles.' },
      smicHike: { value: 14, statement: 'SMIC à 1 600 € net.', topic: 'Candidature populaire' },
      taxWealth: { value: 2, statement: 'Hausse de la fiscalité du patrimoine.' },
      educationInvestment: { value: 1, statement: 'Effort sur l’école.' },
      healthInvestment: { value: 2, statement: 'Services publics de santé de proximité.' },
      prisonBuilding: { value: 0 },
    },
  },
  'olivier-faure': {
    notes: 'Abrogation de la réforme des retraites, taxe Zucman, plan école et hôpital.',
    levers: {
      fiscalImpulse: { value: 1.2, statement: 'Plan école et hôpital.' },
      retirementAge: { value: -2, statement: 'Abrogation de la réforme des retraites, retour à 62 ans.' },
      smicHike: { value: 5, statement: 'Hausse du SMIC.' },
      taxWealth: { value: 2, statement: 'Taxe Zucman.' },
      educationInvestment: { value: 2, statement: 'Plan école.' },
      healthInvestment: { value: 2, statement: 'Plan hôpital.' },
      prisonBuilding: { value: 0 },
    },
  },
  'segolene-royal': {
    notes: 'Retour à 62 ans, écologie et démocratie participative, fiscalité du patrimoine renforcée de façon ciblée.',
    levers: {
      fiscalImpulse: { value: 0.8, statement: 'Écologie et services publics.', topic: 'Écologie et démocratie participative' },
      retirementAge: { value: -2, statement: 'Retour à 62 ans.' },
      smicHike: { value: 5, statement: 'Hausse du SMIC.' },
      taxWealth: { value: 1, statement: 'Fiscalité du patrimoine renforcée de façon ciblée.' },
      educationInvestment: { value: 1, statement: 'Effort sur l’école.' },
      healthInvestment: { value: 1, statement: 'Effort sur la santé.' },
      prisonBuilding: { value: 0 },
    },
    topics: { ecologyIntensity: 'Écologie et démocratie participative', institutionsReform: 'Écologie et démocratie participative' },
  },
  'jerome-guedj': {
    notes: 'Protection sociale et grand âge, abrogation de la réforme des retraites, taxe Zucman.',
    levers: {
      fiscalImpulse: { value: 1, statement: 'Protection sociale et grand âge.' },
      retirementAge: { value: -2, statement: 'Abrogation de la réforme des retraites.' },
      smicHike: { value: 5, statement: 'Hausse du SMIC.' },
      taxWealth: { value: 2, statement: 'Taxe Zucman.' },
      educationInvestment: { value: 1, statement: 'Effort sur l’école.' },
      healthInvestment: { value: 2, statement: 'Grand âge et hôpital.' },
      prisonBuilding: { value: 0 },
    },
  },
  'emmanuel-maurel': {
    notes: 'Souverainisme de gauche : réindustrialisation publique, retraite à 60 ans, hausse du SMIC, désobéissance aux règles budgétaires européennes.',
    levers: {
      fiscalImpulse: { value: 1.5, statement: 'Réindustrialisation publique et désobéissance aux règles budgétaires européennes.', topic: 'Souverainisme de gauche' },
      retirementAge: { value: -4, statement: 'Retraite à 60 ans.' },
      smicHike: { value: 10, statement: 'Hausse du SMIC.' },
      taxWealth: { value: 2, statement: 'Fiscalité du capital renforcée.' },
      educationInvestment: { value: 1, statement: 'Effort sur l’école.' },
      healthInvestment: { value: 2, statement: 'Effort sur l’hôpital.' },
      prisonBuilding: { value: 0 },
    },
    topics: { europeExit: 'Souverainisme de gauche' },
  },
  'bernard-cazeneuve': {
    notes: 'Social-démocratie de gouvernement : sérieux budgétaire, autorité de l’État, effort mesuré sur l’école et la santé.',
    levers: {
      fiscalImpulse: { value: 0, statement: 'Sérieux budgétaire : mesures nouvelles financées.', topic: 'Social-démocratie d’ordre' },
      retirementAge: { value: 0 },
      smicHike: { value: 0 },
      taxWealth: { value: 1, statement: 'Contribution ciblée des plus aisés.' },
      educationInvestment: { value: 1, statement: 'Effort mesuré sur l’école.' },
      healthInvestment: { value: 1, statement: 'Effort mesuré sur la santé.' },
      prisonBuilding: { value: 1, statement: 'Autorité de l’État et poursuite du plan de places de prison.', topic: 'Social-démocratie d’ordre' },
    },
    topics: { justiceRepressive: 'Social-démocratie d’ordre' },
  },
  'karim-bouamrane': {
    notes: 'Égalité territoriale, sécurité du quotidien et investissement dans les quartiers, financés par une fiscalité ciblée.',
    levers: {
      fiscalImpulse: { value: 0.5, statement: 'Investissement dans les quartiers et l’égalité territoriale.' },
      retirementAge: { value: -1, statement: 'Retour partiel sur la réforme des retraites.' },
      smicHike: { value: 3, statement: 'Hausse modérée du SMIC.' },
      taxWealth: { value: 1, statement: 'Fiscalité ciblée sur les plus aisés.' },
      educationInvestment: { value: 1, statement: 'Effort sur l’école dans les quartiers.' },
      healthInvestment: { value: 1, statement: 'Effort sur la santé de proximité.' },
      prisonBuilding: { value: 1, statement: 'Sécurité du quotidien, poursuite du plan de places.' },
    },
  },
  'delphine-batho': {
    notes: 'Écologie de rupture : sortie du nucléaire, sobriété, fiscalité écologique et patrimoniale.',
    levers: {
      fiscalImpulse: { value: 1, statement: 'Sobriété et investissement dans la transition.', topic: 'Écologie de gouvernement' },
      retirementAge: { value: -2, statement: 'Retour à 62 ans.' },
      smicHike: { value: 5, statement: 'Hausse du SMIC.' },
      taxWealth: { value: 2, statement: 'Fiscalité écologique et patrimoniale.', topic: 'Écologie de gouvernement' },
      educationInvestment: { value: 1, statement: 'Effort sur l’école.' },
      healthInvestment: { value: 1, statement: 'Effort sur la santé environnementale.' },
      prisonBuilding: { value: 0 },
    },
    topics: { ecologyIntensity: 'Écologie de gouvernement', nuclearRelaunch: 'Écologie de gouvernement' },
  },
  'nathalie-arthaud': {
    notes: 'Programme de rupture : interdiction des licenciements, SMIC à 2 000 €, expropriation des banques ; hors du cadre des chiffrages classiques.',
    levers: {
      fiscalImpulse: { value: 3, statement: 'Interdiction des licenciements, hausse générale des salaires, expropriation des banques ; hors du cadre des chiffrages classiques.', topic: 'Programme social radical' },
      retirementAge: { value: -4, statement: 'Retraite à 60 ans.', topic: 'Programme social radical' },
      smicHike: { value: 25, statement: 'SMIC à 2 000 €.', topic: 'Programme social radical' },
      taxWealth: { value: 2, statement: 'Prise sur les profits et le capital.', topic: 'Programme social radical' },
      educationInvestment: { value: 1, statement: 'Embauches dans les services publics.' },
      healthInvestment: { value: 2, statement: 'Embauches massives à l’hôpital.' },
      prisonBuilding: { value: 0 },
    },
  },
  'nicolas-dupont-aignan': {
    notes: 'Souverainisme : sortie des traités européens contraignants, retour à 62 ans, baisse des impôts et fermeté pénale.',
    levers: {
      fiscalImpulse: { value: 0.8, statement: 'Baisse des impôts et sortie des traités contraignants.', topic: 'Souverainisme gaulliste' },
      retirementAge: { value: -2, statement: 'Retour à 62 ans.' },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: 1, statement: 'Effort sur l’hôpital.' },
      prisonBuilding: { value: 2, statement: 'Fermeté pénale et construction de prisons.' },
    },
    topics: { europeExit: 'Souverainisme gaulliste', institutionsReform: 'Souverainisme gaulliste' },
  },
  'florian-philippot': {
    notes: 'Frexit et sortie de l’euro, retour à 62 ans, baisse de la TVA sur l’énergie.',
    levers: {
      fiscalImpulse: { value: 1, statement: 'Baisse de la TVA sur l’énergie, hors cadre budgétaire européen.', topic: 'Frexit' },
      retirementAge: { value: -2, statement: 'Retour à 62 ans.' },
      smicHike: { value: 0 },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: 1, statement: 'Effort sur l’hôpital.' },
      prisonBuilding: { value: 1, statement: 'Poursuite du plan de places.' },
    },
    topics: { europeExit: 'Frexit' },
  },
  'francois-asselineau': {
    notes: 'Sortie de l’UE, de l’euro et de l’OTAN par l’article 50, renationalisations, retour à 62 ans.',
    levers: {
      fiscalImpulse: { value: 0.5, statement: 'Renationalisations et sortie du cadre budgétaire européen.', topic: 'Sortie de l’UE, de l’euro et de l’OTAN' },
      retirementAge: { value: -2, statement: 'Retour à 62 ans.' },
      smicHike: { value: 5, statement: 'Hausse du SMIC.' },
      taxWealth: { value: 0 },
      educationInvestment: { value: 0 },
      healthInvestment: { value: 1, statement: 'Effort sur l’hôpital.' },
      prisonBuilding: { value: 1, statement: 'Poursuite du plan de places.' },
    },
    topics: { europeExit: 'Sortie de l’UE, de l’euro et de l’OTAN' },
  },
  'dominique-de-villepin': {
    notes: 'Gaullisme social et pro-européen : sérieux budgétaire, contribution accrue des plus aisés, priorité à l’école et à la diplomatie.',
    levers: {
      fiscalImpulse: { value: -0.2, statement: 'Sérieux budgétaire avec priorité à l’école et à la diplomatie.', topic: 'La France humaniste' },
      retirementAge: { value: 0 },
      smicHike: { value: 0 },
      taxWealth: { value: 1, statement: 'Contribution accrue des plus aisés.' },
      educationInvestment: { value: 1, statement: 'Priorité à l’école.', topic: 'La France humaniste' },
      healthInvestment: { value: 0 },
      prisonBuilding: { value: 1, statement: 'Poursuite du plan de places.' },
    },
  },
}

function stance(candidateId, questionId) {
  return candidateStances[candidateId]?.[questionId] ?? 0
}

export function getCandidatePolicyLevers(candidateId) {
  const details = candidatePolicyLeverDetails[candidateId]
  if (!details) {
    return null
  }
  const editorial = Object.fromEntries(Object.entries(details.levers).map(([lever, entry]) => [lever, entry.value]))

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
    notes: details.notes,
  }
}

export const candidatesWithPolicyLevers = Object.keys(candidatePolicyLeverDetails)
