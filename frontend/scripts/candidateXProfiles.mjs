export const CANDIDATE_X_PROFILES = {
  'edouard-philippe': {
    username: 'EPhilippe_LH',
    source: 'https://www.edouardphilippe.fr/',
    sourceLabel: 'Site officiel Édouard Philippe',
  },
  'xavier-bertrand': {
    username: 'xavierbertrand',
    source: 'https://www.wikidata.org/wiki/Q203793',
    sourceLabel: 'Wikidata Xavier Bertrand',
  },
  'nathalie-arthaud': {
    username: 'n_arthaud',
    source: 'https://www.wikidata.org/wiki/Q439490',
    sourceLabel: 'Wikidata Nathalie Arthaud',
  },
  'delphine-batho': {
    username: 'delphinebatho',
    source: 'https://www.wikidata.org/wiki/Q291385',
    sourceLabel: 'Wikidata Delphine Batho',
  },
  'marine-tondelier': {
    username: 'marinetondelier',
    source: 'https://marinetondelier.fr/',
    sourceLabel: 'Site officiel Marine Tondelier',
  },
  'francois-ruffin': {
    username: 'Francois_Ruffin',
    source: 'https://francoisruffin.fr/',
    sourceLabel: 'Site officiel François Ruffin',
  },
  'marine-le-pen': {
    username: 'MLP_officiel',
    source: 'https://www.wikidata.org/wiki/Q12927',
    sourceLabel: 'Wikidata Marine Le Pen',
  },
  'jordan-bardella': {
    username: 'J_Bardella',
    source: 'https://jordanbardella.fr/',
    sourceLabel: 'Site officiel Jordan Bardella',
  },
  'raphael-glucksmann': {
    username: 'rglucks1',
    source: 'https://www.wikidata.org/wiki/Q556149',
    sourceLabel: 'Wikidata Raphaël Glucksmann',
  },
  'gabriel-attal': {
    username: 'GabrielAttal',
    source: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722190',
    sourceLabel: 'Assemblée nationale',
  },
  'jean-luc-melenchon': {
    username: 'JLMelenchon',
    source: 'https://melenchon.fr/',
    sourceLabel: 'Site officiel Jean-Luc Mélenchon',
  },
  'bruno-retailleau': {
    username: 'BrunoRetailleau',
    source: 'https://www.wikidata.org/wiki/Q2926942',
    sourceLabel: 'Wikidata Bruno Retailleau',
  },
  'gerald-darmanin': {
    username: 'GDarmanin',
    source: 'https://www.wikidata.org/wiki/Q3123610',
    sourceLabel: 'Wikidata Gérald Darmanin',
  },
}

export function getCandidateXProfile(candidateId) {
  return CANDIDATE_X_PROFILES[candidateId] ?? null
}
