import type {
  CandidateNetworkRelation,
  CandidateParcoursStep,
  CandidateThemeHighlight,
} from './candidateTypes'

interface CandidateInsights {
  themeHighlights: CandidateThemeHighlight[]
  network: CandidateNetworkRelation[]
  parcours: CandidateParcoursStep[]
}

export const candidateInsightsById: Record<string, CandidateInsights> = {
  'edouard-philippe': {
    themeHighlights: [
      {
        theme: 'Institutions',
        analysis:
          'Il assume une offre institutionnelle de rupture avec des changements qu’il qualifie de systémiques pour 2027.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
      {
        theme: 'Réindustrialisation',
        analysis:
          'Son discours de campagne met en avant une relance économique appuyée sur les territoires et la capacité de production nationale.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
      {
        theme: 'Coalition de centre-droit',
        analysis:
          'Il construit une ligne autonome vis-à-vis du macronisme pour agréger une coalition différenciée.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/06/21/edouard-philippe-acte-la-rupture-avec-emmanuel-macron-le-president-de-la-republique-a-tue-la-majorite_6242156_823448.html',
          date: '2024-06-21',
        },
      },
    ],
    network: [
      {
        actor: 'Horizons',
        role: 'Président du parti',
        relation: 'Pointe d’appui organisationnelle nationale pour la préparation de 2027.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Horizons_(parti_politique)',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Ville du Havre',
        role: 'Maire',
        relation: 'Ancrage local historique utilisé comme vitrine de gestion exécutive.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/%C3%89douard_Philippe',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Etat (Matignon)',
        role: 'Ancien Premier ministre',
        relation: 'Capital d’expérience gouvernementale revendiqué dans son positionnement présidentiel.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2025-11-04',
        },
      },
    ],
    parcours: [
      {
        period: '2010-2017',
        role: 'Maire',
        institution: 'Ville du Havre',
        summary: 'Première phase de mandat municipal avant son entrée à Matignon.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/%C3%89douard_Philippe',
          date: '2026-03-08',
        },
      },
      {
        period: '2017-2020',
        role: 'Premier ministre',
        institution: 'Gouvernement français',
        summary: 'Dirige le gouvernement durant le premier quinquennat d’Emmanuel Macron.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2025-11-04',
        },
      },
      {
        period: '2020-aujourd’hui',
        role: 'Maire / chef de parti',
        institution: 'Le Havre et Horizons',
        summary: 'Retour local et structuration nationale avec déclaration de candidature en 2024.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
    ],
  },
  'xavier-bertrand': {
    themeHighlights: [
      {
        theme: 'Droite gouvernementale',
        analysis:
          'Il revendique une offre de droite de gouvernement et refuse l’idée d’un candidat LR désigné d’avance.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        theme: 'Ancrage territorial',
        analysis:
          'La présidence des Hauts-de-France est centrale dans son argumentaire de proximité et de gestion.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        theme: 'Rapport de force interne à droite',
        analysis:
          'La compétition avec Laurent Wauquiez structure déjà la pré-campagne de la droite pour 2027.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/03/29/chez-les-republicains-le-match-pour-la-presidentielle-de-2027-est-deja-lance-entre-wauquiez-et-bertrand_6224794_823448.html',
          date: '2024-03-29',
        },
      },
    ],
    network: [
      {
        actor: 'Région Hauts-de-France',
        role: 'Président',
        relation: 'Base électorale et institutionnelle majeure de son positionnement national.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Les Républicains',
        role: 'Figure de la primaire potentielle',
        relation: 'Positionné face à d’autres leaders LR pour l’investiture ou la légitimité de candidature.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        actor: 'Anciens gouvernements',
        role: 'Ex-ministre',
        relation: 'Ressource de crédibilité sur l’expérience d’Etat dans sa projection 2027.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
    ],
    parcours: [
      {
        period: '2004-2012',
        role: 'Ministre',
        institution: 'Gouvernements français',
        summary: 'Occupe plusieurs portefeuilles ministériels, dont Santé et Travail.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        period: '2016-aujourd’hui',
        role: 'Président de région',
        institution: 'Hauts-de-France',
        summary: 'Consolide un profil d’exécutif local avec réélection en 2021.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        period: '2024-2027',
        role: 'Prétendant à la présidentielle',
        institution: 'Camp de droite',
        summary: 'Annonce son intention de candidature et ouvre la bataille interne à droite.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
    ],
  },
  'nathalie-arthaud': {
    themeHighlights: [
      {
        theme: 'Salaires et emploi',
        analysis:
          'Elle pousse une ligne de hausse des salaires et d’interdiction des licenciements au nom du monde du travail.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-nathalie-arthaud-officiellement-candidate-pour-la-4e-fois-2411489.html',
          date: '2025-12-08',
        },
      },
      {
        theme: 'Anticapitalisme',
        analysis:
          'Elle maintient une orientation anticapitaliste avec des propositions de rupture sur la propriété du capital.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
      {
        theme: 'Représentation des travailleurs',
        analysis:
          'Elle justifie sa candidature comme une représentation explicite des classes populaires et salariées.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
    ],
    network: [
      {
        actor: 'Lutte Ouvrière',
        role: 'Porte-parole nationale',
        relation: 'Figure nationale du parti après Arlette Laguiller.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Militantisme syndical et ouvrier',
        role: 'Base militante',
        relation: 'Ancrage continu dans les réseaux militants de LO.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
      {
        actor: 'Campagnes présidentielles LO',
        role: 'Candidate récurrente',
        relation: 'Continuités de candidature 2012, 2017, 2022 puis 2027.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2026-03-08',
        },
      },
    ],
    parcours: [
      {
        period: 'Avant 2008',
        role: 'Enseignante / militante',
        institution: 'Education nationale et LO',
        summary: 'Combine activité professionnelle et engagement politique trotskiste.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2008',
        role: 'Porte-parole',
        institution: 'Lutte Ouvrière',
        summary: 'Succède a Arlette Laguiller comme visage national du mouvement.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2026-03-08',
        },
      },
      {
        period: '2012-2027',
        role: 'Candidate présidentielle',
        institution: 'Élections nationales',
        summary: 'Quatrième cycle présidentiel annonce pour 2027.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-nathalie-arthaud-officiellement-candidate-pour-la-4e-fois-2411489.html',
          date: '2025-12-08',
        },
      },
    ],
  },
  'delphine-batho': {
    themeHighlights: [
      {
        theme: 'Écologie de gouvernement',
        analysis:
          'Elle revendique une écologie qui gouverne avec une plateforme programmatique autonome.',
        source: {
          label: 'Génération Écologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        theme: 'Décroissance et sobriété',
        analysis:
          'Elle articule l’écologie politique autour d’une transformation économique de long terme.',
        source: {
          label: 'Génération Écologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        theme: 'Transition énergétique',
        analysis:
          'Son profil conserve une forte coloration énergie-environnement issue de son passage ministériel.',
        source: {
          label: 'Legifrance',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
          date: '2013-07-02',
        },
      },
    ],
    network: [
      {
        actor: 'Génération Écologie',
        role: 'Coordinatrice nationale',
        relation: 'Structure partisane de sa candidature autonome pour 2027.',
        source: {
          label: 'Génération Écologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        actor: 'Assemblée nationale',
        role: 'Députée des Deux-Sèvres',
        relation: 'Ancrage parlementaire actif dans le groupe Écologiste et Social.',
        source: {
          label: 'Assemblée nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
      {
        actor: 'Ancien ministère de l’Écologie',
        role: 'Ex-ministre',
        relation: 'Expérience exécutive revendiquée dans sa crédibilité de candidate.',
        source: {
          label: 'Legifrance',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
          date: '2013-07-02',
        },
      },
    ],
    parcours: [
      {
        period: '2007-2024',
        role: 'Députée',
        institution: 'Assemblée nationale',
        summary: 'Cycle parlementaire long, interrompu puis relancé avec retour au Palais Bourbon.',
        source: {
          label: 'Assemblée nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
      {
        period: '2012-2013',
        role: 'Ministre de l’Écologie',
        institution: 'Gouvernement français',
        summary: 'Passée par l’exécutif national sur les dossiers énergétiques et environnementaux.',
        source: {
          label: 'Legifrance',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
          date: '2013-07-02',
        },
      },
      {
        period: '2025-2027',
        role: 'Candidate présidentielle',
        institution: 'Génération Écologie',
        summary: 'Annonce une candidature écologiste autonome pour la présidentielle.',
        source: {
          label: 'Génération Écologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
    ],
  },
  'marine-tondelier': {
    themeHighlights: [
      {
        theme: 'Écologie politique',
        analysis:
          'Elle présente la candidature écologiste comme porte d’entrée d’un projet de transformation nationale.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/l-ecologiste-marine-tondelier-annonce-sa-candidature-a-la-presidentielle-2027-2402175.html',
          date: '2025-10-22',
        },
      },
      {
        theme: 'Union de la gauche',
        analysis:
          'Sa stratégie assume un passage par la primaire unitaire de la gauche en 2026.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
      {
        theme: 'Légitimité democratique interne',
        analysis:
          'Sa désignation interne très large consolide son statut de candidate écologiste pour la sequence 2027.',
        source: {
          label: 'Les Écologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
    ],
    network: [
      {
        actor: 'Les Écologistes',
        role: 'Secrétaire nationale',
        relation: 'Direction du parti et maillage militant national.',
        source: {
          label: 'Les Écologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
      {
        actor: 'Primaire de la gauche',
        role: 'Candidate déclarée',
        relation: 'Inscription dans une architecture d’alliance au-dela du seul parti écologiste.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
      {
        actor: 'Ancrage local (Pas-de-Calais)',
        role: 'Élue locale',
        relation: 'Base territoriale historique qui nourrit son profil national.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Tondelier',
          date: '2026-03-08',
        },
      },
    ],
    parcours: [
      {
        period: 'Avant 2022',
        role: 'Élue locale et cadre écologiste',
        institution: 'Pas-de-Calais',
        summary: 'Parcours territorial et militant dans un contexte local très polarisé.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Tondelier',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2022',
        role: 'Secrétaire nationale',
        institution: 'Les Écologistes',
        summary: 'Prend la tête du parti au congrès de décembre 2022.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Tondelier',
          date: '2026-03-08',
        },
      },
      {
        period: '2025-2027',
        role: 'Candidate écologiste',
        institution: 'Sequence présidentielle',
        summary: 'Annonce sa candidature puis obtient la désignation interne avant la primaire 2026.',
        source: {
          label: 'Les Écologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
    ],
  },
  'francois-ruffin': {
    themeHighlights: [
      {
        theme: 'Pouvoir d’achat',
        analysis:
          'Il axe sa candidature primaire sur les bas salaires et les travailleurs essentiels.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
      {
        theme: 'Union de la gauche',
        analysis:
          'Il se positionne comme point de convergence d’une offre de gauche unitaire pour 2027.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/02/francois-ruffin-propose-d-incarner-une-union-de-la-gauche-pour-la-presidentielle-de-2027_6589773_823448.html',
          date: '2025-04-02',
        },
      },
      {
        theme: 'Justice sociale',
        analysis:
          'Son discours combine conflictualité sociale, redistribution et critique des inégalités.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
    ],
    network: [
      {
        actor: 'Assemblée nationale',
        role: 'Député de la Somme',
        relation: 'Base parlementaire de sa visibilité nationale.',
        source: {
          label: 'Assemblée nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722142',
          date: '2026-02-15',
        },
      },
      {
        actor: 'Mouvement Debout',
        role: 'Fondateur',
        relation: 'Appareil militant et politique lancé pour structurer sa campagne 2027.',
        source: {
          label: 'RTL',
          url: 'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
          date: '2025-06-28',
        },
      },
      {
        actor: 'Primaire de la gauche',
        role: 'Candidat',
        relation: 'Participation annoncée au processus de désignation unitaire.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
    ],
    parcours: [
      {
        period: 'Avant 2017',
        role: 'Journaliste / auteur',
        institution: 'Presse et documentaire',
        summary: 'Trajectoire médiatique et militante avant entrée au Parlement.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Ruffin',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2017',
        role: 'Député',
        institution: 'Assemblée nationale',
        summary: 'Mandats successifs dans la Somme, avec forte exposition parlementaire.',
        source: {
          label: 'Assemblée nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722142',
          date: '2026-02-15',
        },
      },
      {
        period: '2025-2027',
        role: 'Chef de mouvement et candidat primaire',
        institution: 'Debout / gauche unitaire',
        summary: 'Lance Debout puis officialise sa candidature à la primaire de gauche.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
    ],
  },
  'marine-le-pen': {
    themeHighlights: [
      {
        theme: 'Stratégie judiciaire et électorale',
        analysis:
          'La priorité immédiate est la bataille en appel qui conditionne sa capacité juridique à concourir en 2027.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/1f06183468c669d99093634ba7472c72',
          date: '2026-01-13',
        },
      },
      {
        theme: 'Leadership RN sous contrainte',
        analysis:
          'Elle maintient la ligne du RN mais intègre un scénario de remplacement si l’inéligibilité est confirmée.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
      {
        theme: 'Condition de candidature 2027',
        analysis:
          'Elle indique explicitement ses lignes rouges de campagne selon les modalités de peine éventuellement confirmées.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/fa548e0280837fa277d9b5627846a93c',
          date: '2026-02-26',
        },
      },
    ],
    network: [
      {
        actor: 'Rassemblement national',
        role: 'Figure centrale historique',
        relation: 'Pivot politique du parti, même avec transfert potentiel de candidature.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Groupe RN à l’Assemblée nationale',
        role: 'Présidente de groupe',
        relation: 'Relais institutionnel principal de sa ligne politique nationale.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Jordan Bardella',
        role: 'Scénario de remplacement',
        relation: 'Le tandem Le Pen-Bardella structure la gestion du risque d’inéligibilité.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
    ],
    parcours: [
      {
        period: '2011-2022',
        role: 'Présidente du FN puis du RN',
        institution: 'Rassemblement national',
        summary: 'Prend la tête du parti, puis organise sa normalisation électorale.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        period: '2017 et 2022',
        role: 'Finaliste présidentielle',
        institution: 'Élection présidentielle',
        summary: 'Accède a deux reprises au second tour face a Emmanuel Macron.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        period: '2025-2026',
        role: 'Sequence judiciaire décisive',
        institution: 'Procedure pénale et appel',
        summary: 'Condamnée en première instance, appel en cours avec verdict attendu le 7 juillet 2026.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/7648655db3ec0db4cd8f70024382a3ff',
          date: '2026-02-11',
        },
      },
    ],
  },
  'jordan-bardella': {
    themeHighlights: [
      {
        theme: 'Succession conditionnelle RN',
        analysis:
          'Il réaffirme que Marine Le Pen reste prioritaire, tout en actant sa disponibilité en cas d’empêchement.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empêchée-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
      {
        theme: 'Projection présidentielle personnelle',
        analysis:
          'Sa communication combine loyautés internes et préparation explicite d’une option Bardella pour 2027.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
      {
        theme: 'Dimension européenne',
        analysis:
          'Son profil est structure par son mandat d’eurodéputé et son exposition dans l’arena européenne.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
    ],
    network: [
      {
        actor: 'Rassemblement national',
        role: 'Président du parti',
        relation: 'Contrôle de l’appareil partisan et de la stratégie électorale RN.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Parlement européen',
        role: 'Eurodepute',
        relation: 'Relais institutionnel cle dans sa trajectoire nationale.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Tandem avec Marine Le Pen',
        role: 'Plan B assume',
        relation: 'L’architecture de campagne RN prévoit son basculement possible en candidature principale.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empêchée-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
    ],
    parcours: [
      {
        period: '2019',
        role: 'Eurodepute',
        institution: 'Parlement européen',
        summary: 'Entre au Parlement européen et gagne une forte exposition médiatique.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2022',
        role: 'Président du RN',
        institution: 'Rassemblement national',
        summary: 'Prend officiellement la direction du parti après la phase d’intérim.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
      {
        period: '2025-2027',
        role: 'Candidat conditionnel',
        institution: 'Sequence présidentielle RN',
        summary: 'Affirme sa disponibilité si Marine Le Pen est inéligible après appel.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empêchée-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
    ],
  },
}
