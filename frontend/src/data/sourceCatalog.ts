import type { SourceInventoryEntry } from './sourceInventoryTypes'

export const METHODOLOGY_SOURCES: SourceInventoryEntry[] = [
  {
    label: 'Wikipedia - Opinion polling for the 2027 French presidential election',
    url: 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2027_French_presidential_election',
    domain: 'en.wikipedia.org',
    referenceCount: 1,
    detail:
      "Matrice publique utilisée pour hydrater les études de sondage, tout en conservant pour chaque enquête son lien source d'origine.",
  },
  {
    label: 'GDELT DOC 2.0',
    url: 'https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/',
    domain: 'blog.gdeltproject.org',
    referenceCount: 1,
    detail:
      'Flux d’articles de presse utilisé pour repérer des interventions publiques et enrichir les fiches candidats.',
  },
  {
    label: 'Media Cloud Search API',
    url: 'https://www.mediacloud.org/documentation/search-api-guide',
    domain: 'www.mediacloud.org',
    referenceCount: 1,
    detail:
      'Source utilisée pour alimenter la courbe d’attention média et contextualiser les pics de couverture.',
  },
  {
    label: 'YouTube Data API v3',
    url: 'https://developers.google.com/youtube/v3/getting-started',
    domain: 'developers.google.com',
    referenceCount: 1,
    detail:
      'API utilisée pour récupérer les vidéos publiques liées aux candidats et les stocker en base avant affichage.',
  },
  {
    label: 'X.com - profils publics',
    url: 'https://x.com/',
    domain: 'x.com',
    referenceCount: 1,
    detail:
      'Pages publiques utilisées pour retrouver les derniers posts des candidats via un pipeline de collecte dédié.',
  },
  {
    label: 'Cloudinary',
    url: 'https://cloudinary.com/',
    domain: 'cloudinary.com',
    referenceCount: 1,
    detail:
      'Hébergement des portraits candidats utilisés par l’application, distinct des sources éditoriales.',
  },
]

export const INSTITUTIONAL_SOURCES: SourceInventoryEntry[] = [
  {
    label: 'Service-Public.fr',
    url: 'https://www.service-public.fr/particuliers/vosdroits/F1943',
    domain: 'www.service-public.fr',
    referenceCount: 1,
    detail: 'Repères juridiques grand public sur l’élection présidentielle et son déroulement.',
  },
  {
    label: 'Vie publique',
    url: 'https://www.vie-publique.fr/fiches/19494-comment-est-elu-le-president-de-la-republique',
    domain: 'www.vie-publique.fr',
    referenceCount: 1,
    detail: 'Explications de référence sur le calendrier, les règles et la mécanique institutionnelle du scrutin.',
  },
  {
    label: 'Conseil constitutionnel',
    url: 'https://presidentielle2022.conseil-constitutionnel.fr/tout-savoir/parrainages/index.html',
    domain: 'presidentielle2022.conseil-constitutionnel.fr',
    referenceCount: 1,
    detail: 'Source institutionnelle pour les règles de parrainage et les points de procédure électorale.',
  },
  {
    label: 'Légifrance - Constitution de 1958, article 6',
    url: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000019241002',
    domain: 'www.legifrance.gouv.fr',
    referenceCount: 1,
    detail: 'Référence légale sur la durée du mandat présidentiel et les conditions de rééligibilité.',
  },
]

export const X_VERIFICATION_SOURCES: SourceInventoryEntry[] = [
  {
    label: 'Site officiel Édouard Philippe',
    url: 'https://www.edouardphilippe.fr/',
    domain: 'www.edouardphilippe.fr',
    referenceCount: 1,
    detail: 'Vérification du compte X @EPhilippe_LH.',
  },
  {
    label: 'Wikidata Xavier Bertrand',
    url: 'https://www.wikidata.org/wiki/Q203793',
    domain: 'www.wikidata.org',
    referenceCount: 1,
    detail: 'Vérification du compte X @xavierbertrand.',
  },
  {
    label: 'Wikidata Nathalie Arthaud',
    url: 'https://www.wikidata.org/wiki/Q439490',
    domain: 'www.wikidata.org',
    referenceCount: 1,
    detail: 'Vérification du compte X @n_arthaud.',
  },
  {
    label: 'Wikidata Delphine Batho',
    url: 'https://www.wikidata.org/wiki/Q291385',
    domain: 'www.wikidata.org',
    referenceCount: 1,
    detail: 'Vérification du compte X @delphinebatho.',
  },
  {
    label: 'Site officiel Marine Tondelier',
    url: 'https://marinetondelier.fr/',
    domain: 'marinetondelier.fr',
    referenceCount: 1,
    detail: 'Vérification du compte X @marinetondelier.',
  },
  {
    label: 'Site officiel François Ruffin',
    url: 'https://francoisruffin.fr/',
    domain: 'francoisruffin.fr',
    referenceCount: 1,
    detail: 'Vérification du compte X @Francois_Ruffin.',
  },
  {
    label: 'Wikidata Marine Le Pen',
    url: 'https://www.wikidata.org/wiki/Q12927',
    domain: 'www.wikidata.org',
    referenceCount: 1,
    detail: 'Vérification du compte X @MLP_officiel.',
  },
  {
    label: 'Site officiel Jordan Bardella',
    url: 'https://jordanbardella.fr/',
    domain: 'jordanbardella.fr',
    referenceCount: 1,
    detail: 'Vérification du compte X @J_Bardella.',
  },
  {
    label: 'Wikidata Raphaël Glucksmann',
    url: 'https://www.wikidata.org/wiki/Q556149',
    domain: 'www.wikidata.org',
    referenceCount: 1,
    detail: 'Vérification du compte X @rglucks1.',
  },
  {
    label: 'Assemblée nationale',
    url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722190',
    domain: 'www.assemblee-nationale.fr',
    referenceCount: 1,
    detail: 'Vérification du compte X @GabrielAttal.',
  },
  {
    label: 'Site officiel Jean-Luc Mélenchon',
    url: 'https://melenchon.fr/',
    domain: 'melenchon.fr',
    referenceCount: 1,
    detail: 'Vérification du compte X @JLMelenchon.',
  },
  {
    label: 'Wikidata Bruno Retailleau',
    url: 'https://www.wikidata.org/wiki/Q2926942',
    domain: 'www.wikidata.org',
    referenceCount: 1,
    detail: 'Vérification du compte X @BrunoRetailleau.',
  },
  {
    label: 'Wikidata Gérald Darmanin',
    url: 'https://www.wikidata.org/wiki/Q3123610',
    domain: 'www.wikidata.org',
    referenceCount: 1,
    detail: 'Vérification du compte X @GDarmanin.',
  },
]
