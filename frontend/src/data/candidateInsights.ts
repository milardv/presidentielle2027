import type {
  CandidateNetworkRelation,
  CandidateParcoursStep,
  CandidateThemeHighlight,
} from './candidates'

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
          'Il assume une offre institutionnelle de rupture avec des changements qu il qualifie de systemiques pour 2027.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
      {
        theme: 'Reindustrialisation',
        analysis:
          'Son discours de campagne met en avant une relance economique appuyee sur les territoires et la capacite de production nationale.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
          date: '2024-09-03',
        },
      },
      {
        theme: 'Coalition de centre-droit',
        analysis:
          'Il construit une ligne autonome vis a vis du macronisme pour agreger une coalition differenciee.',
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
        role: 'President du parti',
        relation: 'Pointe d appui organisationnelle nationale pour la preparation de 2027.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Horizons_(parti_politique)',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Ville du Havre',
        role: 'Maire',
        relation: 'Ancrage local historique utilise comme vitrine de gestion executive.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/%C3%89douard_Philippe',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Etat (Matignon)',
        role: 'Ancien Premier ministre',
        relation: 'Capital d experience gouvernementale revendique dans son positionnement presidentiel.',
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
        summary: 'Premiere phase de mandat municipal avant son entree a Matignon.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/%C3%89douard_Philippe',
          date: '2026-03-08',
        },
      },
      {
        period: '2017-2020',
        role: 'Premier ministre',
        institution: 'Gouvernement francais',
        summary: 'Dirige le gouvernement durant le premier quinquennat d Emmanuel Macron.',
        source: {
          label: 'info.gouv.fr',
          url: 'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
          date: '2025-11-04',
        },
      },
      {
        period: '2020-aujourd hui',
        role: 'Maire / chef de parti',
        institution: 'Le Havre et Horizons',
        summary: 'Retour local et structuration nationale avec declaration de candidature en 2024.',
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
          'Il revendique une offre de droite de gouvernement et refuse l idee d un candidat LR designe d avance.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        theme: 'Ancrage territorial',
        analysis:
          'La presidence des Hauts-de-France est centrale dans son argumentaire de proximite et de gestion.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        theme: 'Rapport de force interne a droite',
        analysis:
          'La competition avec Laurent Wauquiez structure deja la pre-campagne de la droite pour 2027.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2024/03/29/chez-les-republicains-le-match-pour-la-presidentielle-de-2027-est-deja-lance-entre-wauquiez-et-bertrand_6224794_823448.html',
          date: '2024-03-29',
        },
      },
    ],
    network: [
      {
        actor: 'Region Hauts-de-France',
        role: 'President',
        relation: 'Base electorale et institutionnelle majeure de son positionnement national.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Les Republicains',
        role: 'Figure de la primaire potentielle',
        relation: 'Positionne face a d autres leaders LR pour l investiture ou la legitimite de candidature.',
        source: {
          label: 'BFMTV',
          url: 'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
          date: '2024-02-04',
        },
      },
      {
        actor: 'Anciens gouvernements',
        role: 'Ex-ministre',
        relation: 'Ressource de credibilite sur l experience d Etat dans sa projection 2027.',
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
        institution: 'Gouvernements francais',
        summary: 'Occupe plusieurs portefeuilles ministeriels, dont Sante et Travail.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        period: '2016-aujourd hui',
        role: 'President de region',
        institution: 'Hauts-de-France',
        summary: 'Consolide un profil d executif local avec reelection en 2021.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Xavier_Bertrand',
          date: '2026-03-08',
        },
      },
      {
        period: '2024-2027',
        role: 'Pretendant a la presidentielle',
        institution: 'Camp de droite',
        summary: 'Annonce son intention de candidature et ouvre la bataille interne a droite.',
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
          'Elle pousse une ligne de hausse des salaires et d interdiction des licenciements au nom du monde du travail.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-nathalie-arthaud-officiellement-candidate-pour-la-4e-fois-2411489.html',
          date: '2025-12-08',
        },
      },
      {
        theme: 'Anticapitalisme',
        analysis:
          'Elle maintient une orientation anticapitaliste avec des propositions de rupture sur la propriete du capital.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
      {
        theme: 'Representation des travailleurs',
        analysis:
          'Elle justifie sa candidature comme une representation explicite des classes populaires et salariees.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
    ],
    network: [
      {
        actor: 'Lutte Ouvriere',
        role: 'Porte-parole nationale',
        relation: 'Figure nationale du parti apres Arlette Laguiller.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Militantisme syndical et ouvrier',
        role: 'Base militante',
        relation: 'Ancrage continu dans les reseaux militants de LO.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
          date: '2025-12-08',
        },
      },
      {
        actor: 'Campagnes presidentielles LO',
        role: 'Candidate recurrente',
        relation: 'Continuites de candidature 2012, 2017, 2022 puis 2027.',
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
        summary: 'Combine activite professionnelle et engagement politique trotskiste.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2008',
        role: 'Porte-parole',
        institution: 'Lutte Ouvriere',
        summary: 'Succede a Arlette Laguiller comme visage national du mouvement.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud',
          date: '2026-03-08',
        },
      },
      {
        period: '2012-2027',
        role: 'Candidate presidentielle',
        institution: 'Elections nationales',
        summary: 'Quatrieme cycle presidentiel annonce pour 2027.',
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
        theme: 'Ecologie de gouvernement',
        analysis:
          'Elle revendique une ecologie qui gouverne avec une plateforme programmatique autonome.',
        source: {
          label: 'Generation Ecologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        theme: 'Decroissance et sobriete',
        analysis:
          'Elle articule l ecologie politique autour d une transformation economique de long terme.',
        source: {
          label: 'Generation Ecologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        theme: 'Transition energetique',
        analysis:
          'Son profil conserve une forte coloration energie-environnement issue de son passage ministeriel.',
        source: {
          label: 'Legifrance',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
          date: '2013-07-02',
        },
      },
    ],
    network: [
      {
        actor: 'Generation Ecologie',
        role: 'Coordinatrice nationale',
        relation: 'Structure partisane de sa candidature autonome pour 2027.',
        source: {
          label: 'Generation Ecologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
      {
        actor: 'Assemblee nationale',
        role: 'Deputee des Deux-Sevres',
        relation: 'Ancrage parlementaire actif dans le groupe Ecologiste et Social.',
        source: {
          label: 'Assemblee nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
      {
        actor: 'Ancien ministere de l Ecologie',
        role: 'Ex-ministre',
        relation: 'Experience executive revendiquee dans sa credibilite de candidate.',
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
        role: 'Deputee',
        institution: 'Assemblee nationale',
        summary: 'Cycle parlementaire long, interrompu puis relance avec retour au Palais Bourbon.',
        source: {
          label: 'Assemblee nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999',
          date: '2026-02-15',
        },
      },
      {
        period: '2012-2013',
        role: 'Ministre de l Ecologie',
        institution: 'Gouvernement francais',
        summary: 'Passee par l executif national sur les dossiers energetiques et environnementaux.',
        source: {
          label: 'Legifrance',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341',
          date: '2013-07-02',
        },
      },
      {
        period: '2025-2027',
        role: 'Candidate presidentielle',
        institution: 'Generation Ecologie',
        summary: 'Annonce une candidature ecologiste autonome pour la presidentielle.',
        source: {
          label: 'Generation Ecologie',
          url: 'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
          date: '2025-11-26',
        },
      },
    ],
  },
  'marine-tondelier': {
    themeHighlights: [
      {
        theme: 'Ecologie politique',
        analysis:
          'Elle presente la candidature ecologiste comme porte d entree d un projet de transformation nationale.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/l-ecologiste-marine-tondelier-annonce-sa-candidature-a-la-presidentielle-2027-2402175.html',
          date: '2025-10-22',
        },
      },
      {
        theme: 'Union de la gauche',
        analysis:
          'Sa strategie assume un passage par la primaire unitaire de la gauche en 2026.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
      {
        theme: 'Legitimite democratique interne',
        analysis:
          'Sa designation interne tres large consolide son statut de candidate ecologiste pour la sequence 2027.',
        source: {
          label: 'Les Ecologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
    ],
    network: [
      {
        actor: 'Les Ecologistes',
        role: 'Secretaire nationale',
        relation: 'Direction du parti et maillage militant national.',
        source: {
          label: 'Les Ecologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
      {
        actor: 'Primaire de la gauche',
        role: 'Candidate declaree',
        relation: 'Inscription dans une architecture d alliance au-dela du seul parti ecologiste.',
        source: {
          label: 'TF1 Info',
          url: 'https://www.tf1info.fr/politique/presidentielle-2027-on-connait-la-date-de-la-primaire-de-la-gauche-unitaire-2420603.html',
          date: '2026-01-24',
        },
      },
      {
        actor: 'Ancrage local (Pas-de-Calais)',
        role: 'Elue locale',
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
        role: 'Elue locale et cadre ecologiste',
        institution: 'Pas-de-Calais',
        summary: 'Parcours territorial et militant dans un contexte local tres polarise.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Tondelier',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2022',
        role: 'Secretaire nationale',
        institution: 'Les Ecologistes',
        summary: 'Prend la tete du parti au congres de decembre 2022.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Tondelier',
          date: '2026-03-08',
        },
      },
      {
        period: '2025-2027',
        role: 'Candidate ecologiste',
        institution: 'Sequence presidentielle',
        summary: 'Annonce sa candidature puis obtient la designation interne avant la primaire 2026.',
        source: {
          label: 'Les Ecologistes',
          url: 'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
          date: '2025-12-08',
        },
      },
    ],
  },
  'francois-ruffin': {
    themeHighlights: [
      {
        theme: 'Pouvoir d achat',
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
          'Il se positionne comme point de convergence d une offre de gauche unitaire pour 2027.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/02/francois-ruffin-propose-d-incarner-une-union-de-la-gauche-pour-la-presidentielle-de-2027_6589773_823448.html',
          date: '2025-04-02',
        },
      },
      {
        theme: 'Justice sociale',
        analysis:
          'Son discours combine conflictualite sociale, redistribution et critique des inegalites.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
          date: '2026-01-26',
        },
      },
    ],
    network: [
      {
        actor: 'Assemblee nationale',
        role: 'Depute de la Somme',
        relation: 'Base parlementaire de sa visibilite nationale.',
        source: {
          label: 'Assemblee nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722142',
          date: '2026-02-15',
        },
      },
      {
        actor: 'Mouvement Debout',
        role: 'Fondateur',
        relation: 'Appareil militant et politique lance pour structurer sa campagne 2027.',
        source: {
          label: 'RTL',
          url: 'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
          date: '2025-06-28',
        },
      },
      {
        actor: 'Primaire de la gauche',
        role: 'Candidat',
        relation: 'Participation annoncee au processus de designation unitaire.',
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
        summary: 'Trajectoire mediatique et militante avant entree au Parlement.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Ruffin',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2017',
        role: 'Depute',
        institution: 'Assemblee nationale',
        summary: 'Mandats successifs dans la Somme, avec forte exposition parlementaire.',
        source: {
          label: 'Assemblee nationale',
          url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722142',
          date: '2026-02-15',
        },
      },
      {
        period: '2025-2027',
        role: 'Chef de mouvement et candidat primaire',
        institution: 'Debout / gauche unitaire',
        summary: 'Lance Debout puis officialise sa candidature a la primaire de gauche.',
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
        theme: 'Strategie judiciaire et electorale',
        analysis:
          'La priorite immediate est la bataille en appel qui conditionne sa capacite juridique a concourir en 2027.',
        source: {
          label: 'AP News',
          url: 'https://apnews.com/article/1f06183468c669d99093634ba7472c72',
          date: '2026-01-13',
        },
      },
      {
        theme: 'Leadership RN sous contrainte',
        analysis:
          'Elle maintient la ligne du RN mais integre un scenario de remplacement si l ineligibilite est confirmee.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
      {
        theme: 'Condition de candidature 2027',
        analysis:
          'Elle indique explicitement ses lignes rouges de campagne selon les modalites de peine eventuellement confirmees.',
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
        relation: 'Pivot politique du parti, meme avec transfert potentiel de candidature.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Groupe RN a l Assemblee nationale',
        role: 'Presidente de groupe',
        relation: 'Relais institutionnel principal de sa ligne politique nationale.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Jordan Bardella',
        role: 'Scenario de remplacement',
        relation: 'Le tandem Le Pen-Bardella structure la gestion du risque d ineligibilite.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
    ],
    parcours: [
      {
        period: '2011-2022',
        role: 'Presidente du FN puis du RN',
        institution: 'Rassemblement national',
        summary: 'Prend la tete du parti, puis organise sa normalisation electorale.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        period: '2017 et 2022',
        role: 'Finaliste presidentielle',
        institution: 'Election presidentielle',
        summary: 'Accede a deux reprises au second tour face a Emmanuel Macron.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Marine_Le_Pen',
          date: '2026-03-08',
        },
      },
      {
        period: '2025-2026',
        role: 'Sequence judiciaire decisive',
        institution: 'Procedure penale et appel',
        summary: 'Condamnee en premiere instance, appel en cours avec verdict attendu le 7 juillet 2026.',
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
          'Il reaffirme que Marine Le Pen reste prioritaire, tout en actant sa disponibilite en cas d empechement.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empechee-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
      {
        theme: 'Projection presidentielle personnelle',
        analysis:
          'Sa communication combine loyautes internes et preparation explicite d une option Bardella pour 2027.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
      {
        theme: 'Dimension europeenne',
        analysis:
          'Son profil est structure par son mandat d eurodepute et son exposition dans l arena europeenne.',
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
        role: 'President du parti',
        relation: 'Controle de l appareil partisan et de la strategie electorale RN.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
      {
        actor: 'Parlement europeen',
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
        relation: 'L architecture de campagne RN prevoit son basculement possible en candidature principale.',
        source: {
          label: 'Le Monde',
          url: 'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
          date: '2025-04-26',
        },
      },
    ],
    parcours: [
      {
        period: '2019',
        role: 'Eurodepute',
        institution: 'Parlement europeen',
        summary: 'Entre au Parlement europeen et gagne une forte exposition mediatique.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
      {
        period: 'Depuis 2022',
        role: 'President du RN',
        institution: 'Rassemblement national',
        summary: 'Prend officiellement la direction du parti apres la phase d interim.',
        source: {
          label: 'Wikipedia',
          url: 'https://fr.wikipedia.org/wiki/Jordan_Bardella',
          date: '2026-03-08',
        },
      },
      {
        period: '2025-2027',
        role: 'Candidat conditionnel',
        institution: 'Sequence presidentielle RN',
        summary: 'Affirme sa disponibilite si Marine Le Pen est ineligible apres appel.',
        source: {
          label: 'Le Parisien',
          url: 'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empechee-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
          date: '2025-04-26',
        },
      },
    ],
  },
}
