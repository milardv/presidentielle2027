import type { Candidate } from './candidateTypes'

export const candidateDataLastUpdated = '2026-03-08'

export const knownCandidates2027: Candidate[] = [
  {
    id: 'edouard-philippe',
    name: 'Édouard Philippe',
    bloc: 'Centre droit',
    party: 'Horizons',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Ancien Premier ministre (2017-2020), il a officialisé sa candidature le 3 septembre 2024.',
    themes: ['Institutions', 'Réindustrialisation', 'Sécurité'],
    priority: 1,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Edouard_Philippe_en_2025.png',
    currentRole: 'Maire du Havre et président de Horizons',
    biography: [
      'Né le 28 novembre 1970 à Rouen, Édouard Philippe est haut-fonctionnaire de formation puis élu local au Havre.',
      'Il a été Premier ministre de mai 2017 à juillet 2020, puis est redevenu maire du Havre et a structuré son parti Horizons.',
      'Depuis 2024, il assume publiquement une trajectoire autonome en vue de la présidentielle de 2027.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary:
          'Il dit préparer une offre "massive" avec des "changements majeurs, systémiques" pour 2027.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
      {
        topic: 'Autonomie vis-à-vis du macronisme',
        summary:
          'Il revendique une rupture politique avec Emmanuel Macron et parle de coalition nouvelle.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/06/21/edouard-philippe-acte-la-rupture-avec-emmanuel-macron-le-president-de-la-republique-a-tue-la-majorite_6242156_823448.html',
          date: '2024-06-21',
        },
      },
      {
        topic: 'Ancrage exécutif et local',
        summary:
          'Son parcours combine expérience gouvernementale nationale et gestion municipale au Havre.',
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
        title: 'Nomination à Matignon',
        description: 'Emmanuel Macron le nomme Premier ministre.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2017-05-15',
        },
      },
      {
        date: '2020-07-01',
        title: 'Fin de la période à Matignon',
        description: 'Son mandat de Premier ministre s’achève en juillet 2020.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2020-07-01',
        },
      },
      {
        date: '2024-06-21',
        title: 'Rupture politique avec Macron',
        description: 'Il acte publiquement sa prise de distance stratégique.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/06/21/edouard-philippe-acte-la-rupture-avec-emmanuel-macron-le-president-de-la-republique-a-tue-la-majorite_6242156_823448.html',
          date: '2024-06-21',
        },
      },
      {
        date: '2024-09-03',
        title: 'Déclaration de candidature',
        description: 'Il annonce être candidat à la prochaine élection présidentielle.',
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
    party: 'Les Républicains',
    status: 'intent',
    statusLabel: 'Intention déclarée',
    summary:
      'Président des Hauts-de-France, il a annoncé en février 2024 son intention de se présenter en 2027.',
    themes: ['Droite populaire', 'Sécurité', 'Ancrage territorial'],
    priority: 2,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/97/Xavier_Bertrand_-_2025_%28cropped%29.jpg',
    currentRole: 'Président de la région Hauts-de-France',
    biography: [
      'Né en 1965, Xavier Bertrand a occupé plusieurs fonctions ministérielles avant de s’imposer comme chef de l’exécutif régional dans les Hauts-de-France.',
      'Il préside la région depuis janvier 2016 et a été réélu en 2021.',
      'Dans la perspective de 2027, il se positionne sur une ligne de droite gouvernementale et anti-RN.',
    ],
    keyPositions: [
      {
        topic: 'Presidentielle 2027',
        summary:
          'Il assume son intention de candidature et veut éviter un scénario écrit d’avance en faveur du RN.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        topic: 'Ligne LR',
        summary:
          'Il conteste l’idée d’un "candidat naturel" et défend une logique de sélection ouverte à droite.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        topic: 'Rapport de force interne à LR',
        summary:
          'Son duel stratégique avec Laurent Wauquiez est installé très en amont de 2027.',
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
        description: 'Il prend la présidence du conseil régional.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2016-01-04',
        },
      },
      {
        date: '2021-06-27',
        title: 'Réélection régionale',
        description: 'Il est reconduit à la tête de la région.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2021-06-27',
        },
      },
      {
        date: '2024-02-04',
        title: 'Intention de candidature 2027',
        description: 'Il a confirmé publiquement vouloir se présenter.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        date: '2024-03-29',
        title: 'Course LR ouverte',
        description: 'Le duel Bertrand-Wauquiez pour 2027 est déjà analysé comme central.',
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
    party: 'Lutte Ouvrière',
    status: 'declared',
    statusLabel: 'Déclarée',
    summary:
      'Porte-parole de Lutte Ouvrière, elle a annoncé le 8 décembre 2025 sa quatrième candidature présidentielle.',
    themes: ['Salaires', 'Monde du travail', 'Anticapitalisme'],
    priority: 3,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/Nathalie_Arthaud_%28LO%29_19-05-2024.jpg',
    currentRole: 'Porte-parole de Lutte Ouvrière et enseignante',
    biography: [
      'Née en 1970, Nathalie Arthaud est enseignante en économie-communication et militante LO depuis sa jeunesse.',
      'Elle est devenue la porte-parole de Lutte Ouvrière en 2008 après Arlette Laguiller.',
      'Elle a déjà été candidate en 2012, 2017 et 2022 avant d’annoncer une nouvelle candidature pour 2027.',
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
        title: 'Porte-parole de Lutte Ouvrière',
        description: 'Elle succede a Arlette Laguiller comme figure nationale du parti.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2008-12-08',
        },
      },
      {
        date: '2012-04-22',
        title: 'Première candidature présidentielle',
        description: 'Première participation de Nathalie Arthaud à une présidentielle.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2012-04-22',
        },
      },
      {
        date: '2025-12-08',
        title: 'Annonce pour 2027',
        description: 'LO a officialisé sa candidature pour la quatrième fois.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
      {
        date: '2026-03-08',
        title: 'Campagne 2027 en structuration',
        description: 'Elle maintient une ligne LO centrée sur salaires et conflictualité sociale.',
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
    bloc: 'Écologie',
    party: 'Génération Écologie',
    status: 'declared',
    statusLabel: 'Déclarée',
    summary:
      'Députée des Deux-Sèvres et cheffe de Génération Écologie, elle a annoncé sa candidature le 26 novembre 2025.',
    themes: ['Écologie de gouvernement', 'Décroissance', 'Énergie'],
    priority: 4,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Delphine_Batho_%28cropped%29.png',
    currentRole: 'Députée des Deux-Sèvres et coordinatrice de Génération Écologie',
    biography: [
      'Née en 1973 à Paris, Delphine Batho est députée des Deux-Sèvres (2e circonscription) et siège au groupe Écologiste et Social.',
      'Elle a été ministre de l’Écologie en 2012-2013.',
      'En 2025, elle porte une candidature autonome de Génération Écologie pour la présidentielle 2027.',
    ],
    keyPositions: [
      {
        topic: 'Bulletin écologiste autonome',
        summary:
          'Elle défend la présence d’une candidature écologiste distincte au premier tour.',
        source: {
          label: 'Génération Écologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        topic: 'Écologie de gouvernement',
        summary:
          'Sa ligne consiste à reconstruire une écologie capable de gouverner avec des ruptures programmatiques.',
        source: {
          label: 'Génération Écologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        topic: 'Ancrage institutionnel',
        summary:
          'Elle combine un profil parlementaire actuel et une expérience ministérielle passée.',
        source: {
          label: 'Assemblée nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
    ],
    timeline: [
      {
        date: '2013-07-02',
        title: 'Fin de fonctions ministérielles',
        description: 'Un décret met fin à ses fonctions de ministre de l’Écologie.',
        source: {
          label: 'Legifrance',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
          date: '2013-07-02',
        },
      },
      {
        date: '2024-07-01',
        title: 'Mandat parlementaire en cours',
        description: 'Elle est députée de la 2e circonscription des Deux-Sèvres.',
        source: {
          label: 'Assemblée nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
      {
        date: '2025-11-26',
        title: 'Annonce de candidature 2027',
        description: 'Génération Écologie a officialisé sa candidature présidentielle.',
        source: {
          label: 'Génération Écologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
    ],
    sources: [
      {
        label: 'Génération Écologie',
        url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
        date: '2025-11-26',
      },
      {
        label: 'Assemblée nationale',
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
    bloc: 'Écologistes',
    party: 'Les Écologistes',
    status: 'declared_primary',
    statusLabel: 'Désignée en interne',
    summary:
      'Secrétaire nationale des Écologistes, elle a officialisé sa candidature en octobre 2025 et gagne la désignation interne en décembre.',
    themes: ['Écologie', 'Union de la gauche', 'Démocratie'],
    priority: 5,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/20210819_tondelier.m-cr3.jpg',
    currentRole: 'Secrétaire nationale des Écologistes',
    biography: [
      'Née en 1986, Marine Tondelier est une élue locale du Pas-de-Calais et une responsable nationale de l’écologie politique.',
      'Elle dirige Les Écologistes depuis le congrès de décembre 2022.',
      'Elle se positionne pour 2027 via une primaire de la gauche prévue en 2026.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary:
          'Elle présente sa candidature comme un "acte d’amour pour la France" et affirme croire à une victoire de son camp.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/l-ecologiste-marine-tondelier-annonce-sa-candidature-a-la-presidentielle-2027-2402175.html',
          date: '2025-10-22',
        },
      },
      {
        topic: 'Légitimité interne',
        summary:
          'Elle est désignée candidate des Écologistes avec 86 % des voix (54 % de participation).',
        source: {
          label: 'Les Écologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
      {
        topic: 'Stratégie de primaire',
        summary:
          'Elle s’inscrit dans le cadre d’une primaire de la gauche fixée au 11 octobre 2026.',
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
        description: 'Elle devient secrétaire nationale des Écologistes.',
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
          label: 'Les Écologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
      {
        date: '2026-10-11',
        title: 'Primaire de la gauche (calendrier)',
        description: 'Date annoncée pour le scrutin de désignation unitaire.',
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
        label: 'Les Écologistes',
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
    name: 'François Ruffin',
    bloc: 'Gauche',
    party: 'Debout',
    status: 'declared_primary',
    statusLabel: 'Candidat primaire',
    summary:
      'Député de la Somme et fondateur de Debout, il annonce sa candidature à la primaire de la gauche en janvier 2026.',
    themes: ['Pouvoir d’achat', 'Justice fiscale', 'Union de la gauche'],
    priority: 6,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Fran%C3%A7ois_Ruffin_%28cropped%29.jpg',
    currentRole: 'Député de la Somme et fondateur du mouvement Debout',
    biography: [
      'Né en 1975 à Calais, François Ruffin est journaliste de formation et député de la Somme.',
      'Son profil politique combine activité parlementaire, travail de terrain et production médiatique militante.',
      'Depuis 2025, il structure une offre nationale via son mouvement Debout en vue de 2027.',
    ],
    keyPositions: [
      {
        topic: 'Candidature populaire',
        summary:
          'Il dit candidater pour les travailleurs essentiels et place le pouvoir d’achat au centre.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
      {
        topic: 'Structuration politique',
        summary:
          'Il lance Debout pour disposer d’un appareil national avant 2027.',
        source: {
          label: 'RTL',
          url: 'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
          date: '2025-06-28',
        },
      },
      {
        topic: 'Primaire unitaire',
        summary:
          'Il a confirmé participer à la primaire de gauche prévue le 11 octobre 2026.',
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
        title: 'Offre d’union pour 2027',
        description: 'Il propose d’incarner une union de la gauche autour de sa campagne.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/02/francois-ruffin-propose-d-incarner-une-union-de-la-gauche-pour-la-presidentielle-de-2027_6589773_823448.html',
          date: '2025-04-02',
        },
      },
      {
        date: '2025-06-28',
        title: 'Lancement de Debout',
        description: 'Son mouvement national est lancé à Paris.',
        source: {
          label: 'RTL',
          url: 'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
          date: '2025-06-28',
        },
      },
      {
        date: '2026-01-26',
        title: 'Annonce de candidature à la primaire',
        description: 'Il a officialisé sa participation à la primaire de la gauche.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
      {
        date: '2026-10-11',
        title: 'Primaire de la gauche (calendrier)',
        description: 'Date retenue pour la désignation de la candidature unitaire.',
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
        label: 'Assemblée nationale',
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
      'Sa candidature 2027 dépend du verdict en appel après une condamnation avec inéligibilité de 5 ans en 2025.',
    themes: ['Immigration', 'Souveraineté', 'Pouvoir d’achat'],
    priority: 7,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Marine_Le_Pen_2025_%28cropped%29.jpg',
    currentRole: 'Présidente du groupe RN à l’Assemblée nationale',
    biography: [
      'Figure centrale du RN depuis 2011, Marine Le Pen a été finaliste des présidentielles 2017 et 2022.',
      'En mars 2025, elle est condamnée dans l’affaire des assistants parlementaires européens avec une peine d’inéligibilité immédiate.',
      'La séquence d’appel 2026 est décisive pour sa présence au scrutin présidentiel de 2027.',
    ],
    keyPositions: [
      {
        topic: 'Stratégie judiciaire',
        summary:
          'Elle conteste le jugement, fait appel et soutient que la procédure est politiquement orientée.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/83fb47af7aff36576c6a5f7caee141f2',
          date: '2025-03-31',
        },
      },
      {
        topic: 'Condition pour 2027',
        summary:
          'Elle indique qu’elle ne fera pas campagne si le port d’un bracelet electronique est confirmé en appel.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/fa548e0280837fa277d9b5627846a93c',
          date: '2026-02-26',
        },
      },
      {
        topic: 'Plan de succession',
        summary:
          'Le RN prépare un scénario de remplacement avec Jordan Bardella si elle est inéligible.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
    ],
    timeline: [
      {
        date: '2025-03-31',
        title: 'Condamnation en première instance',
        description:
          'Le tribunal prononce une inéligibilité de cinq ans avec effet immédiat, susceptible de bloquer 2027.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/83fb47af7aff36576c6a5f7caee141f2',
          date: '2025-03-31',
        },
      },
      {
        date: '2026-01-13',
        title: 'Ouverture du procès en appel',
        description: 'Le procès d’appel s’ouvre à Paris avec enjeu présidentiel explicite.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/1f06183468c669d99093634ba7472c72',
          date: '2026-01-13',
        },
      },
      {
        date: '2026-02-03',
        title: 'Requisitions du parquet en appel',
        description: 'Le parquet requiert à nouveau cinq ans d’inéligibilité.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/726408584ad5126901fd101f6ccf47d9',
          date: '2026-02-03',
        },
      },
      {
        date: '2026-07-07',
        title: 'Verdict d’appel attendu',
        description: 'La date de verdict d’appel est annoncée au 7 juillet 2026.',
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
        url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
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
      'Président du RN depuis 2022, il a confirmé qu’il serait candidat en 2027 si Marine Le Pen était empêchée.',
    themes: ['RN', 'Succession', 'Europe'],
    priority: 8,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/MEP_Jordan_Bardella.jpg',
    currentRole: 'Président du Rassemblement national et eurodéputé',
    biography: [
      'Né en 1995, Jordan Bardella est eurodéputé depuis 2019.',
      'Il a été élu président du RN en novembre 2022 après une phase d’intérim.',
      'Avec la procédure judiciaire de Marine Le Pen, il est désormais explicitement identifié comme option présidentielle de remplacement.',
    ],
    keyPositions: [
      {
        topic: 'Ticket Le Pen-Bardella',
        summary:
          'Il affirme que Marine Le Pen reste sa candidate, mais dit être prêt à la remplacer si elle est empêchée.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empêchée-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
      {
        topic: 'Préparation personnelle',
        summary:
          'Il dit se préparer activement tout en maintenant une ligne de tandem avec Marine Le Pen.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
      {
        topic: 'Profil institutionnel',
        summary:
          'Il cumule la présidence du RN et un mandat d’eurodéputé, avec une exposition nationale croissante.',
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
        title: 'Entree au Parlement européen',
        description: 'Il devient eurodéputé après la campagne européenne RN.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Jordan_Bardella',
          date: '2019-07-02',
        },
      },
      {
        date: '2022-11-05',
        title: 'Élection à la présidence du RN',
        description: 'Il prend officiellement la tête du parti.',
        source: {
          label: 'Wikipedia',
          url: 'https://en.wikipedia.org/wiki/Jordan_Bardella',
          date: '2022-11-05',
        },
      },
      {
        date: '2025-04-26',
        title: 'Annonce de candidature conditionnelle',
        description: 'Il a confirmé qu’il serait candidat si Marine Le Pen est empêchée.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empêchée-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
      {
        date: '2025-11-11',
        title: 'Scénario Bardella relancé au RN',
        description: 'La piste Bardella est présentée comme évidente en cas de condamnation confirmée de Le Pen.',
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
        url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empêchée-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
        date: '2025-04-26',
      },
      {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
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
