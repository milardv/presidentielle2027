export type CandidateStatus = 'declared' | 'declared_primary' | 'intent' | 'conditional'

export interface CandidateSource {
  label: string
  url: string
  date: string
}

export interface CandidatePosition {
  topic: string
  summary: string
  source: CandidateSource
}

export interface CandidateTimelineEvent {
  date: string
  title: string
  description: string
  source: CandidateSource
}

export interface Candidate {
  id: string
  name: string
  photoUrl: string
  bloc: string
  party: string
  status: CandidateStatus
  statusLabel: string
  summary: string
  themes: string[]
  priority: number
  currentRole: string
  biography: string[]
  keyPositions: CandidatePosition[]
  timeline: CandidateTimelineEvent[]
  sources: CandidateSource[]
}

export const candidateDataLastUpdated = '2026-03-08'

export const knownCandidates2027: Candidate[] = [
  {
    id: 'edouard-philippe',
    name: 'Edouard Philippe',
    bloc: 'Centre droit',
    party: 'Horizons',
    status: 'declared',
    statusLabel: 'Declare',
    summary:
      'Ancien Premier ministre (2017-2020), il a officialise sa candidature le 3 septembre 2024.',
    themes: ['Institutions', 'Reindustrialisation', 'Securite'],
    priority: 1,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Edouard_Philippe_en_2025.png',
    currentRole: 'Maire du Havre et president de Horizons',
    biography: [
      'Ne le 28 novembre 1970 a Rouen, Edouard Philippe est haut-fonctionnaire de formation puis elu local au Havre.',
      'Il a ete Premier ministre de mai 2017 a juillet 2020, puis est redevenu maire du Havre et a structure son parti Horizons.',
      'Depuis 2024, il assume publiquement une trajectoire autonome en vue de la presidentielle de 2027.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary:
          'Il dit preparer une offre "massive" avec des "changements majeurs, systemiques" pour 2027.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
      {
        topic: 'Autonomie vis-a-vis du macronisme',
        summary:
          'Il revendique une rupture politique avec Emmanuel Macron et parle de coalition nouvelle.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/06/21/edouard-philippe-acte-la-rupture-avec-emmanuel-macron-le-president-de-la-republique-a-tue-la-majorite_6242156_823448.html',
          date: '2024-06-21',
        },
      },
      {
        topic: 'Ancrage executif et local',
        summary:
          'Son parcours combine experience gouvernementale nationale et gestion municipale au Havre.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2025-11-04',
        },
      },
    ],
    timeline: [
      {
        date: '2017-05-15',
        title: 'Nomination a Matignon',
        description: 'Emmanuel Macron le nomme Premier ministre.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2017-05-15',
        },
      },
      {
        date: '2020-07-01',
        title: 'Fin de la periode a Matignon',
        description: 'Son mandat de Premier ministre s acheve en juillet 2020.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2020-07-01',
        },
      },
      {
        date: '2024-06-21',
        title: 'Rupture politique avec Macron',
        description: 'Il acte publiquement sa prise de distance strategique.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/06/21/edouard-philippe-acte-la-rupture-avec-emmanuel-macron-le-president-de-la-republique-a-tue-la-majorite_6242156_823448.html',
          date: '2024-06-21',
        },
      },
      {
        date: '2024-09-03',
        title: 'Declaration de candidature',
        description: 'Il annonce etre candidat a la prochaine election presidentielle.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
    ],
    sources: [
      {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
        date: '2024-09-03',
      },
      {
        label: 'info.gouv.fr',
        url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
        date: '2025-11-04',
      },
      {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2024/06/21/edouard-philippe-acte-la-rupture-avec-emmanuel-macron-le-president-de-la-republique-a-tue-la-majorite_6242156_823448.html',
        date: '2024-06-21',
      },
    ],
  },
  {
    id: 'xavier-bertrand',
    name: 'Xavier Bertrand',
    bloc: 'Droite',
    party: 'Les Republicains',
    status: 'intent',
    statusLabel: 'Intention declaree',
    summary:
      'President des Hauts-de-France, il a annonce en fevrier 2024 son intention de se presenter en 2027.',
    themes: ['Droite populaire', 'Securite', 'Ancrage territorial'],
    priority: 2,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/97/Xavier_Bertrand_-_2025_%28cropped%29.jpg',
    currentRole: 'President de la region Hauts-de-France',
    biography: [
      'Ne en 1965, Xavier Bertrand a occupe plusieurs fonctions ministerielles avant de s imposer comme chef de l executif regional dans les Hauts-de-France.',
      'Il preside la region depuis janvier 2016 et a ete reelu en 2021.',
      'Dans la perspective de 2027, il se positionne sur une ligne de droite gouvernementale et anti-RN.',
    ],
    keyPositions: [
      {
        topic: 'Presidentielle 2027',
        summary:
          'Il assume son intention de candidature et veut eviter un scenario ecrit d avance en faveur du RN.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        topic: 'Ligne LR',
        summary:
          'Il conteste l idee d un "candidat naturel" et defend une logique de selection ouverte a droite.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        topic: 'Rapport de force interne a LR',
        summary:
          'Son duel strategique avec Laurent Wauquiez est installe tres en amont de 2027.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/03/29/chez-les-republicains-le-match-pour-la-presidentielle-de-2027-est-deja-lance-entre-wauquiez-et-bertrand_6224794_823448.html',
          date: '2024-03-29',
        },
      },
    ],
    timeline: [
      {
        date: '2016-01-04',
        title: 'Prise de fonction dans les Hauts-de-France',
        description: 'Il prend la presidence du conseil regional.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2016-01-04',
        },
      },
      {
        date: '2021-06-27',
        title: 'Reelection regionale',
        description: 'Il est reconduit a la tete de la region.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2021-06-27',
        },
      },
      {
        date: '2024-02-04',
        title: 'Intention de candidature 2027',
        description: 'Il confirme publiquement vouloir se presenter.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        date: '2024-03-29',
        title: 'Course LR ouverte',
        description: 'Le duel Bertrand-Wauquiez pour 2027 est deja analyse comme central.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/03/29/chez-les-republicains-le-match-pour-la-presidentielle-de-2027-est-deja-lance-entre-wauquiez-et-bertrand_6224794_823448.html',
          date: '2024-03-29',
        },
      },
    ],
    sources: [
      {
        label: 'BFMTV',
        url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
        date: '2024-02-04',
      },
      {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2024/03/29/chez-les-republicains-le-match-pour-la-presidentielle-de-2027-est-deja-lance-entre-wauquiez-et-bertrand_6224794_823448.html',
        date: '2024-03-29',
      },
      {
        label: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Xavier_Bertrand',
        date: '2026-03-02',
      },
    ],
  },
  {
    id: 'nathalie-arthaud',
    name: 'Nathalie Arthaud',
    bloc: 'Extreme gauche',
    party: 'Lutte Ouvriere',
    status: 'declared',
    statusLabel: 'Declaree',
    summary:
      'Porte-parole de Lutte Ouvriere, elle a annonce le 8 decembre 2025 sa quatrieme candidature presidentielle.',
    themes: ['Salaires', 'Monde du travail', 'Anticapitalisme'],
    priority: 3,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/Nathalie_Arthaud_%28LO%29_19-05-2024.jpg',
    currentRole: 'Porte-parole de Lutte Ouvriere et enseignante',
    biography: [
      'Nee en 1970, Nathalie Arthaud est enseignante en economie-communication et militante LO depuis sa jeunesse.',
      'Elle est devenue la porte-parole de Lutte Ouvriere en 2008 apres Arlette Laguiller.',
      'Elle a deja ete candidate en 2012, 2017 et 2022 avant d annoncer une nouvelle candidature pour 2027.',
    ],
    keyPositions: [
      {
        topic: 'Voix du monde du travail',
        summary:
          'Elle justifie sa candidature par la defense explicite des travailleurs et travailleuses.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
      {
        topic: 'Programme social radical',
        summary:
          'LO met en avant interdiction des licenciements, hausse des salaires et expropriation des banques.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-nathalie-arthaud-officiellement-candidate-pour-la-4e-fois-2411489.html',
          date: '2025-12-08',
        },
      },
      {
        topic: 'Critique de la ligne institutionnelle',
        summary:
          'Elle denonce la "guerre sociale" et les arbitrages budgetaires militaires.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
    ],
    timeline: [
      {
        date: '2008-12-08',
        title: 'Porte-parole de Lutte Ouvriere',
        description: 'Elle succede a Arlette Laguiller comme figure nationale du parti.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2008-12-08',
        },
      },
      {
        date: '2012-04-22',
        title: 'Premiere candidature presidentielle',
        description: 'Premiere participation de Nathalie Arthaud a une presidentielle.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2012-04-22',
        },
      },
      {
        date: '2025-12-08',
        title: 'Annonce pour 2027',
        description: 'LO officialise sa candidature pour la quatrieme fois.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
      {
        date: '2026-03-08',
        title: 'Campagne 2027 en structuration',
        description: 'Elle maintient une ligne LO centree sur salaires et conflictualite sociale.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-nathalie-arthaud-officiellement-candidate-pour-la-4e-fois-2411489.html',
          date: '2025-12-08',
        },
      },
    ],
    sources: [
      {
        label: 'Le Parisien',
        url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
        date: '2025-12-08',
      },
      {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/presidentielle-2027-nathalie-arthaud-officiellement-candidate-pour-la-4e-fois-2411489.html',
        date: '2025-12-08',
      },
      {
        label: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Nathalie_Arthaud',
        date: '2024-09-01',
      },
    ],
  },
  {
    id: 'delphine-batho',
    name: 'Delphine Batho',
    bloc: 'Ecologie',
    party: 'Generation Ecologie',
    status: 'declared',
    statusLabel: 'Declaree',
    summary:
      'Deputee des Deux-Sevres et cheffe de Generation Ecologie, elle a annonce sa candidature le 26 novembre 2025.',
    themes: ['Ecologie de gouvernement', 'Decroissance', 'Energie'],
    priority: 4,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Delphine_Batho_%28cropped%29.png',
    currentRole: 'Deputee des Deux-Sevres et coordinatrice de Generation Ecologie',
    biography: [
      'Nee en 1973 a Paris, Delphine Batho est deputee des Deux-Sevres (2e circonscription) et siege au groupe Ecologiste et Social.',
      'Elle a ete ministre de l Ecologie en 2012-2013.',
      'En 2025, elle porte une candidature autonome de Generation Ecologie pour la presidentielle 2027.',
    ],
    keyPositions: [
      {
        topic: 'Bulletin ecologiste autonome',
        summary:
          'Elle defend la presence d une candidature ecologiste distincte au premier tour.',
        source: {
          label: 'Generation Ecologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        topic: 'Ecologie de gouvernement',
        summary:
          'Sa ligne consiste a reconstruire une ecologie capable de gouverner avec des ruptures programmatiques.',
        source: {
          label: 'Generation Ecologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        topic: 'Ancrage institutionnel',
        summary:
          'Elle combine un profil parlementaire actuel et une experience ministerielle passee.',
        source: {
          label: 'Assemblee nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
    ],
    timeline: [
      {
        date: '2013-07-02',
        title: 'Fin de fonctions ministerielles',
        description: 'Un decret met fin a ses fonctions de ministre de l Ecologie.',
        source: {
          label: 'Legifrance',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
          date: '2013-07-02',
        },
      },
      {
        date: '2024-07-01',
        title: 'Mandat parlementaire en cours',
        description: 'Elle est deputee de la 2e circonscription des Deux-Sevres.',
        source: {
          label: 'Assemblee nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
      {
        date: '2025-11-26',
        title: 'Annonce de candidature 2027',
        description: 'Generation Ecologie officialise sa candidature presidentielle.',
        source: {
          label: 'Generation Ecologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
    ],
    sources: [
      {
        label: 'Generation Ecologie',
        url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
        date: '2025-11-26',
      },
      {
        label: 'Assemblee nationale',
        url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
        date: '2026-02-15',
      },
      {
        label: 'Legifrance',
        url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
        date: '2013-07-02',
      },
    ],
  },
  {
    id: 'marine-tondelier',
    name: 'Marine Tondelier',
    bloc: 'Ecologistes',
    party: 'Les Ecologistes',
    status: 'declared_primary',
    statusLabel: 'Designee en interne',
    summary:
      'Secretaire nationale des Ecologistes, elle a officialise sa candidature en octobre 2025 et gagne la designation interne en decembre.',
    themes: ['Ecologie', 'Union de la gauche', 'Democratie'],
    priority: 5,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/20210819_tondelier.m-cr3.jpg',
    currentRole: 'Secretaire nationale des Ecologistes',
    biography: [
      'Nee en 1986, Marine Tondelier est une elue locale du Pas-de-Calais et une responsable nationale de l ecologie politique.',
      'Elle dirige Les Ecologistes depuis le congres de decembre 2022.',
      'Elle se positionne pour 2027 via une primaire de la gauche prevue en 2026.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary:
          'Elle presente sa candidature comme un "acte d amour pour la France" et affirme croire a une victoire de son camp.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/l-ecologiste-marine-tondelier-annonce-sa-candidature-a-la-presidentielle-2027-2402175.html',
          date: '2025-10-22',
        },
      },
      {
        topic: 'Legitimite interne',
        summary:
          'Elle est designee candidate des Ecologistes avec 86% des voix (54% de participation).',
        source: {
          label: 'Les Ecologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
      {
        topic: 'Strategie de primaire',
        summary:
          'Elle s inscrit dans le cadre d une primaire de la gauche fixee au 11 octobre 2026.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
    ],
    timeline: [
      {
        date: '2022-12-10',
        title: 'Prise de fonction nationale',
        description: 'Elle devient secretaire nationale des Ecologistes.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Marine_Tondelier',
          date: '2022-12-10',
        },
      },
      {
        date: '2025-10-22',
        title: 'Annonce de candidature',
        description: 'Annonce officielle dans Le Nouvel Obs puis au 20H de TF1.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/l-ecologiste-marine-tondelier-annonce-sa-candidature-a-la-presidentielle-2027-2402175.html',
          date: '2025-10-22',
        },
      },
      {
        date: '2025-12-08',
        title: 'Designation interne',
        description: 'Victoire interne avec 86% face a Waleed Mouhali.',
        source: {
          label: 'Les Ecologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
      {
        date: '2026-10-11',
        title: 'Primaire de la gauche (calendrier)',
        description: 'Date annoncee pour le scrutin de designation unitaire.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
    ],
    sources: [
      {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/l-ecologiste-marine-tondelier-annonce-sa-candidature-a-la-presidentielle-2027-2402175.html',
        date: '2025-10-22',
      },
      {
        label: 'Les Ecologistes',
        url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
        date: '2025-12-08',
      },
      {
        label: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Marine_Tondelier',
        date: '2026-02-20',
      },
      {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
        date: '2026-01-24',
      },
    ],
  },
  {
    id: 'francois-ruffin',
    name: 'Francois Ruffin',
    bloc: 'Gauche',
    party: 'Debout',
    status: 'declared_primary',
    statusLabel: 'Candidat primaire',
    summary:
      'Depute de la Somme et fondateur de Debout, il annonce sa candidature a la primaire de la gauche en janvier 2026.',
    themes: ['Pouvoir d achat', 'Justice fiscale', 'Union de la gauche'],
    priority: 6,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Fran%C3%A7ois_Ruffin_%28cropped%29.jpg',
    currentRole: 'Depute de la Somme et fondateur du mouvement Debout',
    biography: [
      'Ne en 1975 a Calais, Francois Ruffin est journaliste de formation et depute de la Somme.',
      'Son profil politique combine activite parlementaire, travail de terrain et production mediatique militante.',
      'Depuis 2025, il structure une offre nationale via son mouvement Debout en vue de 2027.',
    ],
    keyPositions: [
      {
        topic: 'Candidature populaire',
        summary:
          'Il dit candidater pour les travailleurs essentiels et place le pouvoir d achat au centre.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
      {
        topic: 'Structuration politique',
        summary:
          'Il lance Debout pour disposer d un appareil national avant 2027.',
        source: {
          label: 'RTL',
          url: 'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
          date: '2025-06-28',
        },
      },
      {
        topic: 'Primaire unitaire',
        summary:
          'Il confirme participer a la primaire de gauche prevue le 11 octobre 2026.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
    ],
    timeline: [
      {
        date: '2025-04-02',
        title: 'Offre d union pour 2027',
        description: 'Il propose d incarner une union de la gauche autour de sa campagne.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/02/francois-ruffin-propose-d-incarner-une-union-de-la-gauche-pour-la-presidentielle-de-2027_6589773_823448.html',
          date: '2025-04-02',
        },
      },
      {
        date: '2025-06-28',
        title: 'Lancement de Debout',
        description: 'Son mouvement national est lance a Paris.',
        source: {
          label: 'RTL',
          url: 'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
          date: '2025-06-28',
        },
      },
      {
        date: '2026-01-26',
        title: 'Annonce de candidature a la primaire',
        description: 'Il officialise sa participation a la primaire de la gauche.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
      {
        date: '2026-10-11',
        title: 'Primaire de la gauche (calendrier)',
        description: 'Date retenue pour la designation de la candidature unitaire.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
    ],
    sources: [
      {
        label: 'Le Parisien',
        url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
        date: '2026-01-26',
      },
      {
        label: 'Assemblee nationale',
        url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722142',
        date: '2026-02-15',
      },
      {
        label: 'RTL',
        url: 'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
        date: '2025-06-28',
      },
      {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2025/04/02/francois-ruffin-propose-d-incarner-une-union-de-la-gauche-pour-la-presidentielle-de-2027_6589773_823448.html',
        date: '2025-04-02',
      },
    ],
  },
  {
    id: 'marine-le-pen',
    name: 'Marine Le Pen',
    bloc: 'Extreme droite',
    party: 'Rassemblement national',
    status: 'conditional',
    statusLabel: 'Conditionnel (appel en cours)',
    summary:
      'Sa candidature 2027 depend du verdict en appel apres une condamnation avec ineligibilite de 5 ans en 2025.',
    themes: ['Immigration', 'Souverainete', 'Pouvoir d achat'],
    priority: 7,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Marine_Le_Pen_2025_%28cropped%29.jpg',
    currentRole: 'Presidente du groupe RN a l Assemblee nationale',
    biography: [
      'Figure centrale du RN depuis 2011, Marine Le Pen a ete finaliste des presidentielles 2017 et 2022.',
      'En mars 2025, elle est condamnee dans l affaire des assistants parlementaires europeens avec une peine d ineligibilite immediate.',
      'La sequence d appel 2026 est decisive pour sa presence au scrutin presidentiel de 2027.',
    ],
    keyPositions: [
      {
        topic: 'Strategie judiciaire',
        summary:
          'Elle conteste le jugement, fait appel et soutient que la procedure est politiquement orientee.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/83fb47af7aff36576c6a5f7caee141f2',
          date: '2025-03-31',
        },
      },
      {
        topic: 'Condition pour 2027',
        summary:
          'Elle indique qu elle ne fera pas campagne si le port d un bracelet electronique est confirme en appel.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/fa548e0280837fa277d9b5627846a93c',
          date: '2026-02-26',
        },
      },
      {
        topic: 'Plan de succession',
        summary:
          'Le RN prepare un scenario de remplacement avec Jordan Bardella si elle est ineligible.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
    ],
    timeline: [
      {
        date: '2025-03-31',
        title: 'Condamnation en premiere instance',
        description:
          'Le tribunal prononce une ineligibilite de cinq ans avec effet immediat, susceptible de bloquer 2027.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/83fb47af7aff36576c6a5f7caee141f2',
          date: '2025-03-31',
        },
      },
      {
        date: '2026-01-13',
        title: 'Ouverture du proces en appel',
        description: 'Le proces d appel s ouvre a Paris avec enjeu presidentiel explicite.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/1f06183468c669d99093634ba7472c72',
          date: '2026-01-13',
        },
      },
      {
        date: '2026-02-03',
        title: 'Requisitions du parquet en appel',
        description: 'Le parquet requiert a nouveau cinq ans d ineligibilite.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/726408584ad5126901fd101f6ccf47d9',
          date: '2026-02-03',
        },
      },
      {
        date: '2026-07-07',
        title: 'Verdict d appel attendu',
        description: 'La date de verdict d appel est annoncee au 7 juillet 2026.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/7648655db3ec0db4cd8f70024382a3ff',
          date: '2026-02-11',
        },
      },
    ],
    sources: [
      {
        label: 'AP News',
        url: 'https://apnews.com/article/83fb47af7aff36576c6a5f7caee141f2',
        date: '2025-03-31',
      },
      {
        label: 'AP News',
        url: 'https://apnews.com/article/1f06183468c669d99093634ba7472c72',
        date: '2026-01-13',
      },
      {
        label: 'AP News',
        url: 'https://apnews.com/article/726408584ad5126901fd101f6ccf47d9',
        date: '2026-02-03',
      },
      {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
        date: '2025-04-26',
      },
    ],
  },
  {
    id: 'jordan-bardella',
    name: 'Jordan Bardella',
    bloc: 'Extreme droite',
    party: 'Rassemblement national',
    status: 'conditional',
    statusLabel: 'Plan B RN',
    summary:
      'President du RN depuis 2022, il confirme qu il serait candidat en 2027 si Marine Le Pen etait empechee.',
    themes: ['RN', 'Succession', 'Europe'],
    priority: 8,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/MEP_Jordan_Bardella.jpg',
    currentRole: 'President du Rassemblement national et eurodepute',
    biography: [
      'Ne en 1995, Jordan Bardella est eurodepute depuis 2019.',
      'Il a ete elu president du RN en novembre 2022 apres une phase d interim.',
      'Avec la procedure judiciaire de Marine Le Pen, il est desormais explicitement identifie comme option presidentielle de remplacement.',
    ],
    keyPositions: [
      {
        topic: 'Ticket Le Pen-Bardella',
        summary:
          'Il affirme que Marine Le Pen reste sa candidate, mais dit etre pret a la remplacer si elle est empechee.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empechee-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
      {
        topic: 'Preparation personnelle',
        summary:
          'Il dit se preparer activement tout en maintenant une ligne de tandem avec Marine Le Pen.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
      {
        topic: 'Profil institutionnel',
        summary:
          'Il cumule la presidence du RN et un mandat d eurodepute, avec une exposition nationale croissante.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-06',
        },
      },
    ],
    timeline: [
      {
        date: '2019-07-02',
        title: 'Entree au Parlement europeen',
        description: 'Il devient eurodepute apres la campagne europeenne RN.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Jordan_Bardella',
          date: '2019-07-02',
        },
      },
      {
        date: '2022-11-05',
        title: 'Election a la presidence du RN',
        description: 'Il prend officiellement la tete du parti.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Jordan_Bardella',
          date: '2022-11-05',
        },
      },
      {
        date: '2025-04-26',
        title: 'Annonce de candidature conditionnelle',
        description: 'Il confirme qu il serait candidat si Marine Le Pen est empechee.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empechee-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
      {
        date: '2025-11-11',
        title: 'Scenario Bardella relance au RN',
        description: 'La piste Bardella est presentee comme evidente en cas de condamnation confirmee de Le Pen.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/11/11/presidentielle-2027-si-marine-le-pen-est-condamnee-en-appel-la-candidature-de-jordan-bardella-est-une-evidence-estime-sebastien-chenu_6601824_823448.html',
          date: '2025-11-11',
        },
      },
    ],
    sources: [
      {
        label: 'Le Parisien',
        url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empechee-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
        date: '2025-04-26',
      },
      {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
        date: '2025-04-26',
      },
      {
        label: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Jordan_Bardella',
        date: '2026-03-06',
      },
      {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2025/11/11/presidentielle-2027-si-marine-le-pen-est-condamnee-en-appel-la-candidature-de-jordan-bardella-est-une-evidence-estime-sebastien-chenu_6601824_823448.html',
        date: '2025-11-11',
      },
    ],
  },
]
