export const CANDIDATE_DATA_LAST_UPDATED = '2026-09-22'
export const ELECTION_FIRST_ROUND_DATE = '2027-04-18'
export const ELECTION_SECOND_ROUND_DATE = '2027-05-02'
export const ELECTION_DECREE_DATE = '2026-07-01'

const ACCESS_DATE = CANDIDATE_DATA_LAST_UPDATED

function src(label, url, date) {
  return { label, url, date }
}

function wiki(slug) {
  return src('Wikipédia', `https://fr.wikipedia.org/wiki/${slug}`, ACCESS_DATE)
}

const shared = {
  listeTouteleurope: src(
    'Toute l’Europe',
    'https://www.touteleurope.eu/vie-politique-des-etats-membres/presidentielle-2027-qui-sont-les-candidats-deja-declares/',
    '2026-09-18',
  ),
  listeLcp: src(
    'LCP',
    'https://lcp.fr/actualites/presidentielle-2027-la-liste-des-candidats-deja-en-lice-et-des-pretendants-436373',
    '2026-09-16',
  ),
  listeCnews: src(
    'CNews',
    'https://www.cnews.fr/france/2026-06-09/presidentielle-2027-qui-sont-les-candidats-deja-en-lice-1621746',
    '2026-06-09',
  ),
  listePublicSenat: src(
    'Public Sénat',
    'https://www.publicsenat.fr/actualites/politique/presidentielle-de-2027-qui-sont-les-candidats-declares-ou-presque-a-lelection',
    ACCESS_DATE,
  ),
  candidaturesWiki: src(
    'Wikipédia',
    'https://fr.wikipedia.org/wiki/Candidatures_%C3%A0_l%27%C3%A9lection_pr%C3%A9sidentielle_fran%C3%A7aise_de_2027',
    ACCESS_DATE,
  ),
  primaireChoisir2027: src(
    'Toute l’Europe',
    'https://www.touteleurope.eu/vie-politique-des-etats-membres/presidentielle-2027-qui-sont-les-candidats-a-la-primaire-organisee-par-le-parti-socialiste-place-publique-et-la-gauche-republicaine-et-socialiste/',
    '2026-09-16',
  ),
  primaireUnitaireWiki: src(
    'Wikipédia',
    'https://fr.wikipedia.org/wiki/Primaire_de_la_gauche_unitaire_de_2026',
    ACCESS_DATE,
  ),
  droitePublicSenat: src(
    'Public Sénat',
    'https://www.publicsenat.fr/actualites/politique/presidentielle-retailleau-attal-bertrand-philippe-les-candidatures-se-multiplient-a-droite-et-au-centre-mais-lhypothese-dune-primaire-divise-tou',
    ACCESS_DATE,
  ),
  philippeRetailleauAfp: src(
    'Boursorama / AFP',
    'https://www.boursorama.com/actualite-economique/actualites/presidentielle-philippe-tend-la-main-a-la-droite-et-au-centre-retailleau-la-refuse-b6c13d84f1aad7e9f933889e195f4b91',
    '2026-09-08',
  ),
  datesInfoGouv: src(
    'info.gouv.fr',
    'https://www.info.gouv.fr/actualite/presidentielle-2027-date-a-retenir-et-informations-cles',
    '2026-07-01',
  ),
}

const lePenSources = {
  rts: src(
    'RTS',
    'https://www.rts.ch/info/monde/2026/article/condamnee-en-appel-marine-le-pen-pourra-se-presenter-en-2027-29296439.html',
    '2026-07-07',
  ),
  publicSenat: src(
    'Public Sénat',
    'https://www.publicsenat.fr/actualites/politique/direct-suivez-le-delibere-du-proces-en-appel-de-marine-le-pen',
    '2026-07-07',
  ),
  franceinfo: src(
    'franceinfo',
    'https://www.franceinfo.fr/replay-jt/franceinfo/21h-minuit/23-heures/presidentielle-2027-condamnee-marine-le-pen-se-declare-candidate_8098967.html',
    '2026-07-07',
  ),
  touteleurope: src(
    'Toute l’Europe',
    'https://www.touteleurope.eu/vie-politique-des-etats-membres/proces-des-assistants-du-rn-marine-le-pen-condamnee-en-appel-mais-eligible-a-l-election-presidentielle-2027/',
    '2026-07-07',
  ),
  apPremiereInstance: src('AP News', 'https://apnews.com/article/83fb47af7aff36576c6a5f7caee141f2', '2025-03-31'),
  apAppel: src('AP News', 'https://apnews.com/article/1f06183468c669d99093634ba7472c72', '2026-01-13'),
  wiki: wiki('Marine_Le_Pen'),
}

const bardellaSources = {
  parisien: src(
    'Le Parisien',
    'https://www.leparisien.fr/politique/jordan-bardella-si-elle-est-empêchée-je-serai-le-candidat-de-marine-le-pen-pour-2027-26-04-2025-NRBRMBWVBNAZNL6JR7JQWHZQQM.php',
    '2025-04-26',
  ),
  franceinfoTicket: src(
    'franceinfo',
    'https://www.franceinfo.fr/politique/front-national/affaire-des-assistants-fn-au-parlement-europeen/presidentielle-2027-si-l-ineligibilite-de-marine-le-pen-est-confirmee-en-appel-la-candidate-prevoit-de-passer-la-main-a-jordan-bardella-des-septembre-2026_7189587.html',
    '2026-02-26',
  ),
  wiki: wiki('Jordan_Bardella'),
}

const philippeSources = {
  tf1: src(
    'TF1 Info',
    'https://www.tf1info.fr/politique/elections-crise-politique-2027-edouard-philippe-se-declare-candidat-a-la-prochaine-election-presidentielle-2317754.html',
    '2024-09-03',
  ),
  lemonde: src(
    'Le Monde',
    'https://www.lemonde.fr/politique/article/2024/06/21/edouard-philippe-acte-la-rupture-avec-emmanuel-macron-le-president-de-la-republique-a-tue-la-majorite_6242156_823448.html',
    '2024-06-21',
  ),
  gouv: src(
    'info.gouv.fr',
    'https://www.info.gouv.fr/les-anciens-premiers-et-premieres-ministres-de-la-ve-republique/edouard-philippe',
    '2025-11-04',
  ),
  darmanin: src(
    'France 3 Hauts-de-France',
    'https://france3-regions.franceinfo.fr/hauts-de-france/nord-0/tourcoing/presidentielle-2027-gerald-darmanin-se-propose-d-etre-l-aiguillon-social-d-edouard-philippe-dans-la-course-a-l-elysee-et-renonce-officiellement-a-sa-propre-candidature-3403093.html',
    '2026-08-17',
  ),
  wiki: wiki('%C3%89douard_Philippe'),
}

const attalSources = {
  assembly: src('Assemblée nationale', 'https://www.assemblee-nationale.fr/dyn/deputes/PA722190', '2026-03-11'),
  path2027: src(
    'TF1 Info',
    'https://www.tf1info.fr/politique/election-presidentielle-2027-attal-souhaite-proposer-un-chemin-aux-francais-pour-2027-2381173.html',
    '2025-07-05',
  ),
  speech2027: src(
    'TF1 Info',
    'https://www.tf1info.fr/politique/discours-gabriel-attal-je-savais-que-la-france-en-paierait-le-prix-attal-tacle-macron-sur-la-dissolution-et-pose-des-jalons-pour-2027-2395927.html',
    '2025-09-21',
  ),
  wiki: wiki('Gabriel_Attal'),
}

const melenchonSources = {
  official: src(
    'La France insoumise',
    'https://lafranceinsoumise.fr/les-parlementaires-de-la-france-insoumise/jeanlucmelenchon/',
    '2020-09-24',
  ),
  insoumise2027: src(
    'RMC BFMTV',
    'https://rmc.bfmtv.com/actualites/politique/le-ps-n-est-plus-notre-allie-il-y-aura-une-candidature-insoumise-en-2027-annonce-melenchon_AV-202502160097.html',
    '2025-02-16',
  ),
  strategy: src('Jean-Luc Mélenchon', 'https://melenchon.fr/wp-content/uploads/2026/02/1.-COMMENT-FAIRE-E2.pdf', '2026-02-10'),
  wiki: wiki('Jean-Luc_M%C3%A9lenchon'),
}

const glucksmannSources = {
  official: src('Place publique', 'https://place-publique.eu/nos-elus/raphael-glucksmann/', '2021-03-17'),
  primaireRefus: src(
    'Le Monde',
    'https://www.lemonde.fr/politique/article/2025/05/23/raphael-glucksmann-sur-l-election-presidentielle-de-2027-je-ne-participerai-pas-a-une-primaire_6608026_823448.html',
    '2025-05-23',
  ),
  platform: src(
    'Le Monde',
    'https://www.lemonde.fr/en/politics/article/2025/06/24/raphael-glucksmann-sets-out-policy-platform-for-2027-french-presidential-election_6742671_5.html',
    '2025-06-24',
  ),
  wiki: wiki('Rapha%C3%ABl_Glucksmann'),
}

const retailleauSources = {
  lr: src('Les Républicains', 'https://republicains.fr/actualites/2025/06/30/bruno-retailleau-conseil-national-lr/', '2025-06-30'),
  tf1: src(
    'TF1 Info',
    'https://www.tf1info.fr/politique/bruno-retailleau-candidat-a-la-presidentielle-2027-il-sera-l-invite-du-20h-de-tf1-ce-soir-2424402.html',
    '2026-02-12',
  ),
  senate: src('Sénat', 'https://www.senat.fr/senateur/retailleau_bruno14266k.html', ACCESS_DATE),
  wiki: wiki('Bruno_Retailleau'),
}

const darmaninSources = {
  renoncement: philippeSources.darmanin,
  orange: src(
    'Orange Actu / AFP',
    'https://actu.orange.fr/france/presidentielle-2027-gerald-darmanin-renonce-a-se-presenter-et-accorde-son-soutien-a-edouard-philippe-magic-CNT000002rn9da.html',
    '2026-08-17',
  ),
  participates: src(
    'TF1 Info',
    'https://www.tf1info.fr/politique/gerald-darmanin-participera-d-une-maniere-ou-d-une-autre-a-l-election-presidentielle-de-2027-2350560.html',
    '2025-02-13',
  ),
  populaires: src('Les Populaires', 'https://les-populaires.fr/', ACCESS_DATE),
  wiki: wiki('G%C3%A9rald_Darmanin'),
}

const bertrandSources = {
  bfm: src(
    'BFMTV',
    'https://www.bfmtv.com/politique/les-republicains/presidentielle-2027-xavier-bertrand-estime-que-laurent-wauquiez-n-est-pas-le-candidat-naturel-de-lr_AV-202402040392.html',
    '2024-02-04',
  ),
  wiki: wiki('Xavier_Bertrand'),
}

const tondelierSources = {
  tf1: src(
    'TF1 Info',
    'https://www.tf1info.fr/politique/l-ecologiste-marine-tondelier-annonce-sa-candidature-a-la-presidentielle-2027-2402175.html',
    '2025-10-22',
  ),
  designation: src(
    'Les Écologistes',
    'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-l-election-presidentielle',
    '2025-12-08',
  ),
  cnews: src(
    'CNews',
    'https://www.cnews.fr/france/2026-09-09/presidentielle-2027-en-colere-marine-tondelier-se-dit-echaudee-par-le-choix',
    '2026-09-09',
  ),
  referendum: src(
    'Journal du Net',
    'https://www.journaldunet.com/business/action-publique/1555211-referendum-interne-des-ecologistes-sur-la-candidature-de-marine-tondelier-a-la-presidentielle-de-2027/',
    '2026-09-22',
  ),
  wiki: wiki('Marine_Tondelier'),
}

const ruffinSources = {
  parisien: src(
    'Le Parisien',
    'https://www.leparisien.fr/elections/presidentielle/election-presidentielle-2027-francois-ruffin-annonce-sa-candidature-a-la-primaire-de-la-gauche-26-01-2026-4C6463HLG5FYPODM3EGI5JSQBI.php',
    '2026-01-26',
  ),
  rtl: src(
    'RTL',
    'https://www.rtl.fr/actu/politique/les-infos-de-6h-francois-ruffin-lance-son-nouveau-parti-debout-en-vue-de-la-presidentielle-de-2027-7900519942',
    '2025-06-28',
  ),
  horsPrimaire: src('L’Insoumission', 'https://linsoumission.fr/2026/04/28/ruffin-tondelier-union-echec-2027/', '2026-04-28'),
  wiki: wiki('Fran%C3%A7ois_Ruffin'),
}

const bathoSources = {
  official: src(
    'Génération Écologie',
    'https://www.generationecologie.fr/2025/11/26/je-suis-candidate-a-lelection-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner/',
    '2025-11-26',
  ),
  assembly: src('Assemblée nationale', 'https://www.assemblee-nationale.fr/dyn/deputes/PA335999', '2026-02-15'),
  wiki: wiki('Delphine_Batho'),
}

const arthaudSources = {
  parisien: src(
    'Le Parisien',
    'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
    '2025-12-08',
  ),
  tf1: src(
    'TF1 Info',
    'https://www.tf1info.fr/politique/presidentielle-2027-nathalie-arthaud-officiellement-candidate-pour-la-4e-fois-2411489.html',
    '2025-12-08',
  ),
  wiki: wiki('Nathalie_Arthaud'),
}

const villepinSources = {
  rts: src(
    'RTS',
    'https://www.rts.ch/info/monde/2025/article/dominique-de-villepin-lance-un-parti-pour-la-presidentielle-2027-28923750.html',
    '2025-06-24',
  ),
  wiki: wiki('Dominique_de_Villepin'),
}

const CLOUDINARY = 'https://res.cloudinary.com/dagxzno9s/image/upload'

function commonsCredit(author, license, licenseUrl, fileName) {
  return {
    author,
    license,
    ...(licenseUrl ? { licenseUrl } : {}),
    sourceUrl: `https://commons.wikimedia.org/wiki/File:${fileName}`,
  }
}

const CC_BY_SA_4 = 'https://creativecommons.org/licenses/by-sa/4.0'
const CC_BY_SA_3 = 'https://creativecommons.org/licenses/by-sa/3.0'
const CC_BY_SA_2 = 'https://creativecommons.org/licenses/by-sa/2.0'
const CC_BY_4 = 'https://creativecommons.org/licenses/by/4.0'
const CC0 = 'https://creativecommons.org/publicdomain/zero/1.0/deed.fr'

export const candidates2027 = [
  {
    id: 'marine-le-pen',
    name: 'Marine Le Pen',
    bloc: 'Extrême droite',
    party: 'Rassemblement national',
    status: 'declared',
    statusLabel: 'Déclarée',
    summary:
      'Déclarée candidate le 7 juillet 2026, le soir de sa condamnation en appel, elle reste éligible : sa peine ferme d’inéligibilité (15 mois) était déjà purgée. Elle forme un « ticket » avec Jordan Bardella, annoncé comme Premier ministre.',
    themes: ['Immigration', 'Souveraineté', 'Pouvoir d’achat'],
    priority: 1,
    photoUrl: `${CLOUDINARY}/v1773268680/presidentielles/candidats/marine-le-pen.jpg`,
    currentRole: 'Présidente du groupe RN à l’Assemblée nationale',
    biography: [
      'Figure centrale du Rassemblement national depuis 2011, Marine Le Pen a été finaliste des présidentielles de 2017 et de 2022.',
      'Condamnée en première instance le 31 mars 2025 dans l’affaire des assistants parlementaires européens (cinq ans d’inéligibilité avec exécution provisoire), elle a vu la cour d’appel de Paris ramener cette peine, le 7 juillet 2026, à 45 mois dont 30 avec sursis : les 15 mois fermes, décomptés depuis 2025, étaient purgés fin juin 2026.',
      'Le même soir, au 20H de TF1, elle a annoncé sa candidature pour 2027 et son pourvoi en cassation, en présentant un ticket avec Jordan Bardella pour Matignon.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary:
          'Elle se déclare candidate le 7 juillet 2026 et présente un « ticket » Le Pen-Bardella : elle à l’Élysée, lui à Matignon.',
        source: lePenSources.franceinfo,
      },
      {
        topic: 'Situation judiciaire',
        summary:
          'Condamnée en appel à trois ans de prison dont un ferme sous bracelet électronique, 100 000 euros d’amende et 45 mois d’inéligibilité dont 30 avec sursis ; elle se pourvoit en cassation.',
        source: lePenSources.publicSenat,
      },
      {
        topic: 'Éligibilité',
        summary:
          'La partie ferme de l’inéligibilité, exécutée depuis le jugement de 2025, a expiré le 30 juin 2026 : elle peut se présenter aux 18 avril et 2 mai 2027.',
        source: lePenSources.touteleurope,
      },
    ],
    timeline: [
      {
        date: '2025-03-31',
        title: 'Condamnation en première instance',
        description: 'Le tribunal prononce cinq ans d’inéligibilité avec exécution provisoire.',
        source: lePenSources.apPremiereInstance,
      },
      {
        date: '2026-01-13',
        title: 'Ouverture du procès en appel',
        description: 'Le procès d’appel s’ouvre à Paris avec un enjeu présidentiel explicite.',
        source: lePenSources.apAppel,
      },
      {
        date: '2026-07-07',
        title: 'Arrêt de la cour d’appel',
        description:
          'Peine d’inéligibilité ramenée à 45 mois dont 30 avec sursis ; la partie ferme est déjà purgée, elle redevient éligible.',
        source: lePenSources.rts,
      },
      {
        date: '2026-07-07',
        title: 'Déclaration de candidature',
        description: 'Au 20H de TF1, elle annonce sa candidature et un ticket avec Jordan Bardella.',
        source: lePenSources.franceinfo,
      },
    ],
    sources: [
      lePenSources.franceinfo,
      lePenSources.publicSenat,
      lePenSources.rts,
      lePenSources.touteleurope,
      lePenSources.apPremiereInstance,
      lePenSources.wiki,
    ],
  },
  {
    id: 'edouard-philippe',
    name: 'Édouard Philippe',
    bloc: 'Centre droit',
    party: 'Horizons',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Ancien Premier ministre (2017-2020), candidat déclaré depuis le 3 septembre 2024. Rallié par Gérald Darmanin en août 2026, il « tend la main » à la droite et au centre, mais refuse toute primaire.',
    themes: ['Institutions', 'Réindustrialisation', 'Sécurité'],
    priority: 2,
    photoUrl: `${CLOUDINARY}/v1773268943/presidentielles/candidats/edouard-philippe.jpg`,
    currentRole: 'Maire du Havre et président de Horizons',
    biography: [
      'Né le 28 novembre 1970 à Rouen, Édouard Philippe est haut fonctionnaire de formation puis élu local au Havre.',
      'Premier ministre de mai 2017 à juillet 2020, il a ensuite structuré son parti Horizons et a été le premier grand candidat déclaré pour 2027, dès septembre 2024.',
      'À la rentrée 2026, il engrange le soutien de Gérald Darmanin et propose un rassemblement de la droite et du centre autour de sa candidature, sans passer par une primaire.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il a officialisé sa candidature le 3 septembre 2024 en promettant des « changements majeurs, systémiques ».',
        source: philippeSources.tf1,
      },
      {
        topic: 'Rassemblement droite-centre',
        summary:
          'Le 8 septembre 2026, il tend la main à la droite et au centre ; Bruno Retailleau, candidat désigné de LR, la refuse.',
        source: shared.philippeRetailleauAfp,
      },
      {
        topic: 'Soutien de Gérald Darmanin',
        summary: 'Le 17 août 2026, Gérald Darmanin renonce à sa propre candidature et se propose d’être son « aiguillon social ».',
        source: philippeSources.darmanin,
      },
    ],
    timeline: [
      {
        date: '2017-05-15',
        title: 'Nomination à Matignon',
        description: 'Emmanuel Macron le nomme Premier ministre.',
        source: philippeSources.gouv,
      },
      {
        date: '2024-06-21',
        title: 'Rupture politique avec Macron',
        description: 'Il acte publiquement sa prise de distance stratégique.',
        source: philippeSources.lemonde,
      },
      {
        date: '2024-09-03',
        title: 'Déclaration de candidature',
        description: 'Il annonce être candidat à la prochaine élection présidentielle.',
        source: philippeSources.tf1,
      },
      {
        date: '2026-08-17',
        title: 'Ralliement de Gérald Darmanin',
        description: 'Le garde des Sceaux renonce à 2027 et annonce faire campagne à ses côtés.',
        source: philippeSources.darmanin,
      },
      {
        date: '2026-09-08',
        title: 'Main tendue à la droite et au centre',
        description: 'Il appelle au rassemblement ; Bruno Retailleau décline.',
        source: shared.philippeRetailleauAfp,
      },
    ],
    sources: [philippeSources.tf1, shared.philippeRetailleauAfp, philippeSources.darmanin, philippeSources.gouv, philippeSources.wiki],
  },
  {
    id: 'bruno-retailleau',
    name: 'Bruno Retailleau',
    bloc: 'Droite',
    party: 'Les Républicains',
    status: 'declared',
    statusLabel: 'Désigné par LR',
    summary:
      'Président des Républicains, désigné candidat du parti par les adhérents le 19 avril 2026. Il refuse la main tendue d’Édouard Philippe et porte une ligne de droite d’autorité.',
    themes: ['Sécurité', 'Immigration', 'Droite d’autorité'],
    priority: 3,
    photoUrl: `${CLOUDINARY}/v1773268669/presidentielles/candidats/bruno-retailleau.jpg`,
    currentRole: 'Président des Républicains et sénateur de Vendée',
    biography: [
      'Né en 1960, Bruno Retailleau s’est imposé comme l’une des principales figures de la droite conservatrice au Sénat.',
      'Ancien ministre de l’Intérieur, élu président des Républicains en mai 2025, il a été désigné candidat de LR à la présidentielle par un vote des adhérents le 19 avril 2026.',
      'Face à Édouard Philippe et Gabriel Attal au centre, et à Xavier Bertrand et David Lisnard à droite, il défend une candidature LR autonome sans primaire élargie.',
    ],
    keyPositions: [
      {
        topic: 'Désignation LR',
        summary: 'Les adhérents des Républicains l’ont investi candidat le 19 avril 2026 lors d’une consultation interne.',
        source: shared.listeLcp,
      },
      {
        topic: 'Refus du rassemblement derrière Philippe',
        summary: 'Le 8 septembre 2026, il refuse la main tendue d’Édouard Philippe à la droite et au centre.',
        source: shared.philippeRetailleauAfp,
      },
      {
        topic: 'Ligne politique',
        summary: 'Il assume une droite d’autorité très marquée sur les enjeux régaliens : sécurité, immigration, ordre.',
        source: retailleauSources.tf1,
      },
    ],
    timeline: [
      {
        date: '2025-05-18',
        title: 'Élection à la présidence de LR',
        description: 'Il prend la tête des Républicains et restructure le parti autour de sa ligne.',
        source: retailleauSources.wiki,
      },
      {
        date: '2026-02-12',
        title: 'Candidature assumée',
        description: 'Il confirme au 20H de TF1 vouloir être candidat en 2027.',
        source: retailleauSources.tf1,
      },
      {
        date: '2026-04-19',
        title: 'Désignation par les adhérents LR',
        description: 'Le vote interne des Républicains l’investit officiellement.',
        source: shared.candidaturesWiki,
      },
      {
        date: '2026-09-08',
        title: 'Refus de la main tendue de Philippe',
        description: 'Il maintient une candidature LR distincte du bloc central.',
        source: shared.philippeRetailleauAfp,
      },
    ],
    sources: [shared.listeLcp, shared.philippeRetailleauAfp, retailleauSources.tf1, retailleauSources.lr, retailleauSources.senate, retailleauSources.wiki],
  },
  {
    id: 'gabriel-attal',
    name: 'Gabriel Attal',
    bloc: 'Centre',
    party: 'Renaissance',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Ancien Premier ministre et patron de Renaissance, il a officialisé sa candidature le 22 mai 2026 et dispute à Édouard Philippe l’héritage du bloc central.',
    themes: ['Bloc central', 'Réforme', 'Autorité'],
    priority: 4,
    photoUrl: `${CLOUDINARY}/v1773268672/presidentielles/candidats/gabriel-attal.jpg`,
    currentRole: 'Secrétaire général de Renaissance et président du groupe Ensemble pour la République',
    biography: [
      'Né en 1989, Gabriel Attal a occupé plusieurs postes ministériels avant de devenir Premier ministre en janvier 2024.',
      'Après Matignon, il a pris la tête du groupe macroniste à l’Assemblée et le secrétariat général de Renaissance, d’où il a préparé sa projection nationale.',
      'Il a déclaré sa candidature le 22 mai 2026 : le bloc central se retrouve avec deux candidats, lui et Édouard Philippe.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il officialise sa candidature le 22 mai 2026, après avoir dit vouloir « proposer un chemin aux Français ».',
        source: shared.listeTouteleurope,
      },
      {
        topic: 'Relecture de la dissolution',
        summary: 'Il critique la dissolution de 2024 pour poser ses propres jalons politiques.',
        source: attalSources.speech2027,
      },
      {
        topic: 'Contrôle de l’appareil central',
        summary: 'Il cumule la présidence du groupe à l’Assemblée et la direction de Renaissance.',
        source: attalSources.assembly,
      },
    ],
    timeline: [
      {
        date: '2024-01-09',
        title: 'Nomination à Matignon',
        description: 'Il devient Premier ministre et prend une dimension nationale de premier plan.',
        source: attalSources.wiki,
      },
      {
        date: '2025-07-05',
        title: 'Projection publique sur 2027',
        description: 'Il dit vouloir proposer un chemin aux Français pour 2027.',
        source: attalSources.path2027,
      },
      {
        date: '2026-05-22',
        title: 'Déclaration de candidature',
        description: 'Il annonce officiellement sa candidature à l’élection présidentielle.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.listeTouteleurope, shared.listeLcp, attalSources.speech2027, attalSources.path2027, attalSources.assembly, attalSources.wiki],
  },
  {
    id: 'jean-luc-melenchon',
    name: 'Jean-Luc Mélenchon',
    bloc: 'Gauche radicale',
    party: 'La France insoumise',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Chef de file de La France insoumise, il a annoncé le 3 mai 2026 sa quatrième candidature consécutive, hors de toute primaire.',
    themes: ['Union populaire', 'Rupture', 'Institutions'],
    priority: 5,
    photoUrl: `${CLOUDINARY}/v1773268676/presidentielles/candidats/jean-luc-melenchon.jpg`,
    currentRole: 'Chef de file de La France insoumise',
    biography: [
      'Né en 1951, Jean-Luc Mélenchon est une figure majeure de la gauche radicale française depuis plusieurs décennies.',
      'Fondateur de La France insoumise, il a été candidat en 2012, 2017 et 2022, frôlant le second tour lors de cette dernière élection.',
      'Après avoir écarté toute primaire, il a officialisé le 3 mai 2026 une quatrième candidature.',
    ],
    keyPositions: [
      {
        topic: 'Quatrième candidature',
        summary: 'Il confirme le 3 mai 2026 qu’il sera sur la ligne de départ pour la quatrième fois consécutive.',
        source: shared.listeTouteleurope,
      },
      {
        topic: 'Refus de la primaire',
        summary: 'Dès février 2025, il annonçait une candidature insoumise indépendante de toute alliance avec le PS.',
        source: melenchonSources.insoumise2027,
      },
      {
        topic: 'Préparation programmatique',
        summary: 'Il a publié début 2026 un document stratégique structurant le débat de fond autour de 2027.',
        source: melenchonSources.strategy,
      },
    ],
    timeline: [
      {
        date: '2016-02-10',
        title: 'Lancement de La France insoumise',
        description: 'Il installe un mouvement autonome dont il demeure la figure centrale.',
        source: melenchonSources.wiki,
      },
      {
        date: '2025-02-16',
        title: 'Annonce d’une candidature insoumise',
        description: 'Il confirme que LFI aura son propre candidat en 2027.',
        source: melenchonSources.insoumise2027,
      },
      {
        date: '2026-05-03',
        title: 'Déclaration de candidature',
        description: 'Il officialise sa quatrième candidature présidentielle.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.listeTouteleurope, melenchonSources.insoumise2027, melenchonSources.strategy, melenchonSources.official, melenchonSources.wiki],
  },
  {
    id: 'raphael-glucksmann',
    name: 'Raphaël Glucksmann',
    bloc: 'Centre gauche',
    party: 'Place publique',
    status: 'declared_primary',
    statusLabel: 'Candidat primaire « Choisir 2027 »',
    summary:
      'Député européen et coprésident de Place publique, il a rejoint le 23 août 2026 la primaire « Choisir 2027 » organisée par le PS, Place publique et la GRS (votes les 9-10 et 16-17 octobre 2026).',
    themes: ['Europe', 'Réindustrialisation', 'Social-démocratie'],
    priority: 6,
    photoUrl: `${CLOUDINARY}/v1773268684/presidentielles/candidats/raphael-glucksmann.jpg`,
    currentRole: 'Député européen et coprésident de Place publique',
    biography: [
      'Né en 1979, Raphaël Glucksmann s’est d’abord imposé comme essayiste avant de conduire les listes PS-Place publique aux européennes de 2019 et 2024.',
      'Après avoir longtemps refusé l’idée d’une primaire, il a accepté de concourir dans « Choisir 2027 », la primaire fermée de l’arc social-démocrate, face à Olivier Faure, Jérôme Guedj, Emmanuel Maurel et Ségolène Royal.',
      'Son opposition à l’élargissement de cette primaire aux écologistes et à François Ruffin lui vaut de vives critiques à gauche.',
    ],
    keyPositions: [
      {
        topic: 'Primaire « Choisir 2027 »',
        summary: 'Il entre en lice le 23 août 2026 ; le premier tour se tient les 9-10 octobre, le second les 16-17 octobre.',
        source: shared.primaireChoisir2027,
      },
      {
        topic: 'Périmètre de la primaire',
        summary: 'Il défend une primaire limitée à l’arc social-démocrate, ce que Marine Tondelier et François Ruffin dénoncent.',
        source: tondelierSources.cnews,
      },
      {
        topic: 'Plateforme économique',
        summary: 'Réindustrialisation, réforme de la gouvernance des entreprises et justice sociale structurent sa plateforme.',
        source: glucksmannSources.platform,
      },
    ],
    timeline: [
      {
        date: '2024-06-09',
        title: 'Tête de liste PS-Place publique',
        description: 'Il reconduit son ancrage européen à la tête de la liste commune de centre gauche.',
        source: glucksmannSources.wiki,
      },
      {
        date: '2025-05-23',
        title: 'Refus d’une primaire',
        description: 'Il ferme alors la porte à toute primaire de la gauche.',
        source: glucksmannSources.primaireRefus,
      },
      {
        date: '2026-08-23',
        title: 'Entrée dans la primaire « Choisir 2027 »',
        description: 'Il rejoint la primaire du PS, de Place publique et de la GRS.',
        source: shared.primaireChoisir2027,
      },
    ],
    sources: [shared.primaireChoisir2027, tondelierSources.cnews, glucksmannSources.platform, glucksmannSources.primaireRefus, glucksmannSources.official, glucksmannSources.wiki],
  },
  {
    id: 'eric-zemmour',
    name: 'Éric Zemmour',
    bloc: 'Extrême droite',
    party: 'Reconquête',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Président de Reconquête et candidat en 2022 (7,07 %), il a confirmé le 17 septembre 2026 qu’il serait candidat en 2027, soutenu par Sarah Knafo.',
    themes: ['Immigration', 'Identité', 'Union des droites'],
    priority: 7,
    photoUrl: `${CLOUDINARY}/v1790073765/presidentielles/candidats/eric-zemmour.jpg`,
    photoCredit: commonsCredit('Anh De France', 'CC0', CC0, 'Portrait_d%27%C3%89ric_Zemmour,_avril_2022.jpg'),
    currentRole: 'Président de Reconquête',
    biography: [
      'Né en 1958, Éric Zemmour est journaliste et essayiste avant de fonder Reconquête fin 2021.',
      'Candidat en 2022, il a obtenu 7,07 % des voix au premier tour.',
      'Le 17 septembre 2026, il a confirmé une nouvelle candidature ; Sarah Knafo a renoncé à la sienne pour le soutenir.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il annonce le 17 septembre 2026 qu’il sera candidat, l’hypothèse d’une primaire des droites étant écartée.',
        source: shared.listeTouteleurope,
      },
      {
        topic: 'Union des droites',
        summary: 'Il continue de plaider pour une union des droites tout en concurrençant directement le RN.',
        source: shared.listeLcp,
      },
      {
        topic: 'Soutien de Sarah Knafo',
        summary: 'L’eurodéputée Reconquête renonce à une candidature propre et le soutient.',
        source: shared.listeLcp,
      },
    ],
    timeline: [
      {
        date: '2021-12-05',
        title: 'Fondation de Reconquête',
        description: 'Il lance son parti lors de son premier grand meeting.',
        source: wiki('%C3%89ric_Zemmour'),
      },
      {
        date: '2022-04-10',
        title: 'Premier tour 2022',
        description: 'Il obtient 7,07 % des suffrages.',
        source: wiki('%C3%89ric_Zemmour'),
      },
      {
        date: '2026-09-17',
        title: 'Déclaration de candidature 2027',
        description: 'Il confirme qu’il sera candidat à l’élection présidentielle.',
        source: shared.listeTouteleurope,
      },
    ],
    sources: [shared.listeTouteleurope, shared.listeLcp, shared.candidaturesWiki, wiki('%C3%89ric_Zemmour')],
  },
  {
    id: 'xavier-bertrand',
    name: 'Xavier Bertrand',
    bloc: 'Droite',
    party: 'Nous France',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Président des Hauts-de-France, il a confirmé sa candidature le 26 août 2026 avec son mouvement Nous France, en dehors de la désignation LR de Bruno Retailleau, et refuse toute primaire.',
    themes: ['Droite populaire', 'Sécurité', 'Ancrage territorial'],
    priority: 8,
    photoUrl: `${CLOUDINARY}/v1773268685/presidentielles/candidats/xavier-bertrand.jpg`,
    currentRole: 'Président de la région Hauts-de-France',
    biography: [
      'Né en 1965, Xavier Bertrand a occupé plusieurs fonctions ministérielles avant de présider la région Hauts-de-France depuis 2016.',
      'Il affichait dès février 2024 son intention de se présenter en 2027 et contestait l’idée d’un « candidat naturel » à droite.',
      'Après la désignation de Bruno Retailleau par LR, il a confirmé le 26 août 2026 une candidature autonome portée par son mouvement Nous France.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il confirme sa candidature le 26 août 2026 et refuse de participer à une primaire.',
        source: shared.listeLcp,
      },
      {
        topic: 'Ligne anti-RN à droite',
        summary: 'Il veut éviter un scénario écrit d’avance en faveur du Rassemblement national.',
        source: bertrandSources.bfm,
      },
      {
        topic: 'Concurrence avec Retailleau',
        summary: 'Sa candidature s’ajoute à celles de Retailleau et Lisnard dans une droite divisée sur la primaire.',
        source: shared.droitePublicSenat,
      },
    ],
    timeline: [
      {
        date: '2016-01-04',
        title: 'Présidence des Hauts-de-France',
        description: 'Il prend la présidence du conseil régional.',
        source: bertrandSources.wiki,
      },
      {
        date: '2024-02-04',
        title: 'Intention de candidature',
        description: 'Il confirme publiquement vouloir se présenter en 2027.',
        source: bertrandSources.bfm,
      },
      {
        date: '2026-08-26',
        title: 'Candidature confirmée',
        description: 'Il officialise sa candidature avec Nous France, hors LR.',
        source: shared.listeLcp,
      },
    ],
    sources: [shared.listeLcp, shared.listeTouteleurope, shared.droitePublicSenat, bertrandSources.bfm, bertrandSources.wiki],
  },
  {
    id: 'david-lisnard',
    name: 'David Lisnard',
    bloc: 'Droite',
    party: 'Nouvelle Énergie',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Maire de Cannes et président de l’Association des maires de France, il a quitté LR et déclaré sa candidature le 31 mars 2026 avec son mouvement Nouvelle Énergie.',
    themes: ['Libertés', 'Décentralisation', 'Dépense publique'],
    priority: 9,
    photoUrl: `${CLOUDINARY}/v1790073765/presidentielles/candidats/david-lisnard.jpg`,
    photoCredit: commonsCredit('Frantogian', 'CC BY-SA 3.0', CC_BY_SA_3, 'David_Lisnard_-_2013.jpg'),
    currentRole: 'Maire de Cannes et président de l’Association des maires de France',
    biography: [
      'Né en 1969, David Lisnard est maire de Cannes depuis 2014 et président de l’Association des maires de France depuis 2021.',
      'Fondateur du mouvement Nouvelle Énergie, il défend une droite libérale, décentralisatrice et attachée à la réduction de la dépense publique.',
      'Il a quitté Les Républicains fin mars 2026 et officialisé sa candidature le 31 mars, tout en restant favorable à une primaire de la droite.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il annonce sa candidature le 31 mars 2026 après avoir quitté LR.',
        source: shared.listeTouteleurope,
      },
      {
        topic: 'Primaire à droite',
        summary: 'Avec Darmanin et Wauquiez, il figure parmi les partisans d’une primaire, refusée par Bertrand et Philippe.',
        source: shared.droitePublicSenat,
      },
      {
        topic: 'Ancrage local',
        summary: 'Il s’appuie sur son mandat cannois et sur la présidence de l’AMF pour incarner la voix des élus locaux.',
        source: wiki('David_Lisnard'),
      },
    ],
    timeline: [
      {
        date: '2014-04-04',
        title: 'Élection à la mairie de Cannes',
        description: 'Il succède à Bernard Brochand.',
        source: wiki('David_Lisnard'),
      },
      {
        date: '2021-11-17',
        title: 'Présidence de l’AMF',
        description: 'Il est élu président de l’Association des maires de France.',
        source: wiki('David_Lisnard'),
      },
      {
        date: '2026-03-31',
        title: 'Déclaration de candidature',
        description: 'Il quitte LR et se déclare candidat à la présidentielle.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.listeTouteleurope, shared.listeLcp, shared.droitePublicSenat, wiki('David_Lisnard')],
  },
  {
    id: 'fabien-roussel',
    name: 'Fabien Roussel',
    bloc: 'Gauche',
    party: 'Parti communiste français',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Secrétaire national du PCF et candidat en 2022, sa candidature a été validée par le parti le 6 septembre 2026.',
    themes: ['Travail', 'Salaires', 'Énergie'],
    priority: 10,
    photoUrl: `${CLOUDINARY}/v1790073766/presidentielles/candidats/fabien-roussel.jpg`,
    photoCredit: commonsCredit('Zouhair Nakara', 'CC BY-SA 4.0', CC_BY_SA_4, 'Roussel_Fabien_1.jpg'),
    currentRole: 'Secrétaire national du Parti communiste français',
    biography: [
      'Né en 1969, Fabien Roussel dirige le Parti communiste français depuis 2018.',
      'Candidat en 2022 (2,28 %), il a perdu son siège de député du Nord lors des législatives de 2024.',
      'Le PCF a validé le 6 septembre 2026 sa nouvelle candidature, hors des primaires de la gauche.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Le PCF officialise sa candidature le 6 septembre 2026.',
        source: shared.listeTouteleurope,
      },
      {
        topic: 'Gauche du travail',
        summary: 'Il met en avant le travail, les salaires et une écologie fondée sur le nucléaire et l’industrie.',
        source: wiki('Fabien_Roussel'),
      },
      {
        topic: 'Hors primaire',
        summary: 'Il ne participe ni à la primaire socialiste ni à la primaire unitaire, désormais enterrée.',
        source: shared.listeLcp,
      },
    ],
    timeline: [
      {
        date: '2018-11-25',
        title: 'Secrétaire national du PCF',
        description: 'Il succède à Pierre Laurent à la tête du parti.',
        source: wiki('Fabien_Roussel'),
      },
      {
        date: '2022-04-10',
        title: 'Premier tour 2022',
        description: 'Il obtient 2,28 % des suffrages.',
        source: wiki('Fabien_Roussel'),
      },
      {
        date: '2026-09-06',
        title: 'Candidature validée par le PCF',
        description: 'Le parti officialise sa candidature pour 2027.',
        source: shared.listeTouteleurope,
      },
    ],
    sources: [shared.listeTouteleurope, shared.listeLcp, shared.candidaturesWiki, wiki('Fabien_Roussel')],
  },
  {
    id: 'marine-tondelier',
    name: 'Marine Tondelier',
    bloc: 'Écologistes',
    party: 'Les Écologistes',
    status: 'conditional',
    statusLabel: 'Maintenue, référendum interne en décembre',
    summary:
      'Désignée par les Écologistes en décembre 2025 pour une primaire unitaire aujourd’hui enterrée, elle est exclue de la primaire PS. Sa candidature est maintenue provisoirement ; un référendum interne des adhérents (10-13 décembre 2026) tranchera.',
    themes: ['Écologie', 'Union de la gauche', 'Démocratie'],
    priority: 11,
    photoUrl: `${CLOUDINARY}/v1773268682/presidentielles/candidats/marine-tondelier.jpg`,
    currentRole: 'Secrétaire nationale des Écologistes',
    biography: [
      'Née en 1986, Marine Tondelier est élue locale du Pas-de-Calais et dirige Les Écologistes depuis décembre 2022.',
      'Candidate déclarée en octobre 2025 et désignée par son parti avec 86 % des voix, elle misait sur la primaire de la gauche unitaire du 11 octobre 2026, abandonnée de fait après le vote des adhérents PS du 9 juillet 2026 en faveur d’une primaire fermée.',
      'Écartée de « Choisir 2027 », elle se dit « échaudée » par le « choix tragique » du PS ; le conseil fédéral des Écologistes maintient provisoirement sa candidature et renvoie la décision finale à un référendum interne du 10 au 13 décembre 2026.',
    ],
    keyPositions: [
      {
        topic: 'Candidature en suspens',
        summary:
          'Motion adoptée à 69,44 % maintenant provisoirement sa candidature ; les adhérents trancheront par référendum du 10 au 13 décembre 2026 entre candidature autonome et retrait.',
        source: tondelierSources.referendum,
      },
      {
        topic: 'Exclusion de la primaire PS',
        summary: 'Elle dénonce le refus de Raphaël Glucksmann d’ouvrir la primaire au-delà de l’arc social-démocrate.',
        source: tondelierSources.cnews,
      },
      {
        topic: 'Légitimité interne',
        summary: 'Elle a été désignée candidate des Écologistes avec 86 % des voix en décembre 2025.',
        source: tondelierSources.designation,
      },
    ],
    timeline: [
      {
        date: '2025-10-22',
        title: 'Annonce de candidature',
        description: 'Annonce officielle dans Le Nouvel Obs puis au 20H de TF1.',
        source: tondelierSources.tf1,
      },
      {
        date: '2025-12-08',
        title: 'Désignation interne',
        description: 'Victoire interne avec 86 % des voix.',
        source: tondelierSources.designation,
      },
      {
        date: '2026-07-09',
        title: 'Le PS enterre la primaire unitaire',
        description: 'Les adhérents socialistes votent à 55,5 % pour une primaire réservée à l’arc social-démocrate.',
        source: shared.primaireUnitaireWiki,
      },
      {
        date: '2026-12-10',
        title: 'Référendum interne des Écologistes',
        description: 'Les adhérents décident, du 10 au 13 décembre, du maintien ou du retrait de sa candidature.',
        source: tondelierSources.referendum,
      },
    ],
    sources: [tondelierSources.referendum, tondelierSources.cnews, shared.primaireUnitaireWiki, tondelierSources.designation, tondelierSources.tf1, tondelierSources.wiki],
  },
  {
    id: 'francois-ruffin',
    name: 'François Ruffin',
    bloc: 'Gauche',
    party: 'Debout !',
    status: 'declared',
    statusLabel: 'Déclaré (hors primaire)',
    summary:
      'Député de la Somme et fondateur de Debout !, candidat à la primaire unitaire aujourd’hui enterrée, il maintient sa candidature et se dit « toujours prêt » à participer à la primaire socialiste dont il est exclu.',
    themes: ['Pouvoir d’achat', 'Justice fiscale', 'Union de la gauche'],
    priority: 12,
    photoUrl: `${CLOUDINARY}/v1773268671/presidentielles/candidats/francois-ruffin.jpg`,
    currentRole: 'Député de la Somme et fondateur du mouvement Debout !',
    biography: [
      'Né en 1975, François Ruffin est journaliste de formation et député de la Somme.',
      'Il a lancé son mouvement Debout ! en juin 2025 et annoncé en janvier 2026 sa candidature à la primaire de la gauche unitaire.',
      'Cette primaire ayant été abandonnée de fait à l’été 2026, il poursuit une candidature autonome tout en critiquant le périmètre fermé de la primaire socialiste.',
    ],
    keyPositions: [
      {
        topic: 'Candidature maintenue',
        summary: 'Le 9 septembre 2026, il se dit « toujours prêt » à rejoindre la primaire social-démocrate et reproche à Glucksmann d’avoir « peur des électeurs ».',
        source: tondelierSources.cnews,
      },
      {
        topic: 'Candidature populaire',
        summary: 'Il dit candidater pour les travailleurs essentiels et place le pouvoir d’achat au centre.',
        source: ruffinSources.parisien,
      },
      {
        topic: 'Structuration politique',
        summary: 'Il a lancé Debout ! pour disposer d’un appareil national avant 2027.',
        source: ruffinSources.rtl,
      },
    ],
    timeline: [
      {
        date: '2025-06-28',
        title: 'Lancement de Debout !',
        description: 'Son mouvement national est lancé à Paris.',
        source: ruffinSources.rtl,
      },
      {
        date: '2026-01-26',
        title: 'Candidature à la primaire unitaire',
        description: 'Il officialise sa participation à la primaire de la gauche prévue le 11 octobre.',
        source: ruffinSources.parisien,
      },
      {
        date: '2026-07-09',
        title: 'Primaire unitaire enterrée',
        description: 'Le vote des adhérents PS pour une primaire fermée met fin de fait au processus unitaire.',
        source: shared.primaireUnitaireWiki,
      },
    ],
    sources: [tondelierSources.cnews, ruffinSources.horsPrimaire, ruffinSources.parisien, ruffinSources.rtl, shared.primaireUnitaireWiki, ruffinSources.wiki],
  },
  {
    id: 'olivier-faure',
    name: 'Olivier Faure',
    bloc: 'Gauche',
    party: 'Parti socialiste',
    status: 'declared_primary',
    statusLabel: 'Candidat primaire « Choisir 2027 »',
    summary:
      'Premier secrétaire du PS, il a annoncé le 30 août 2026 sa candidature à la primaire « Choisir 2027 », après que les adhérents ont désavoué son projet de primaire ouverte à toute la gauche.',
    themes: ['Union de la gauche', 'Justice sociale', 'Services publics'],
    priority: 13,
    photoUrl: `${CLOUDINARY}/v1790073767/presidentielles/candidats/olivier-faure.png`,
    photoCredit: commonsCredit('KimiRaikkonen3', 'Domaine public', null, 'OF_MATIGNON_-_MAXIME_CLAM_(cropped).png'),
    currentRole: 'Premier secrétaire du Parti socialiste et député de Seine-et-Marne',
    biography: [
      'Né en 1968, Olivier Faure dirige le Parti socialiste depuis 2018 et siège à l’Assemblée nationale pour la Seine-et-Marne.',
      'Il portait le projet d’une primaire de toute la gauche non mélenchoniste, lancé en novembre 2025 avec Marine Tondelier et François Ruffin.',
      'Le 9 juillet 2026, les adhérents du PS ont voté à 55,5 % pour une primaire fermée ; il s’y est finalement porté candidat le 30 août.',
    ],
    keyPositions: [
      {
        topic: 'Primaire « Choisir 2027 »',
        summary: 'Il entre en lice le 30 août 2026 face à Glucksmann, Guedj, Maurel et Royal.',
        source: shared.primaireChoisir2027,
      },
      {
        topic: 'Primaire ouverte désavouée',
        summary: 'Les adhérents socialistes ont rejeté son approche ouverte au profit d’une primaire réservée à l’arc social-démocrate.',
        source: shared.primaireUnitaireWiki,
      },
      {
        topic: 'Direction du PS',
        summary: 'Il conduit le parti depuis 2018 et l’a reconstruit après la déroute de 2017.',
        source: wiki('Olivier_Faure'),
      },
    ],
    timeline: [
      {
        date: '2018-04-07',
        title: 'Premier secrétaire du PS',
        description: 'Il prend la direction du Parti socialiste.',
        source: wiki('Olivier_Faure'),
      },
      {
        date: '2026-07-09',
        title: 'Vote des adhérents pour une primaire fermée',
        description: '55,5 % des adhérents rejettent la primaire ouverte qu’il défendait.',
        source: shared.primaireUnitaireWiki,
      },
      {
        date: '2026-08-30',
        title: 'Candidature à « Choisir 2027 »',
        description: 'Il annonce sa participation à la primaire socialiste.',
        source: shared.primaireChoisir2027,
      },
    ],
    sources: [shared.primaireChoisir2027, shared.primaireUnitaireWiki, shared.listeTouteleurope, wiki('Olivier_Faure')],
  },
  {
    id: 'segolene-royal',
    name: 'Ségolène Royal',
    bloc: 'Gauche',
    party: 'Parti socialiste',
    status: 'declared_primary',
    statusLabel: 'Candidate primaire « Choisir 2027 »',
    summary:
      'Finaliste de la présidentielle 2007, elle a annoncé le 10 juillet 2026 sa candidature à la primaire socialiste « Choisir 2027 ».',
    themes: ['Écologie', 'Démocratie participative', 'Ordre juste'],
    priority: 14,
    photoUrl: `${CLOUDINARY}/v1790073769/presidentielles/candidats/segolene-royal.jpg`,
    photoCredit: commonsCredit('Jackolan1', 'CC BY-SA 3.0', CC_BY_SA_3, 'Royal_Toulouse_2012.JPG'),
    currentRole: 'Ancienne ministre, ancienne présidente de la région Poitou-Charentes',
    biography: [
      'Née en 1953, Ségolène Royal a été plusieurs fois ministre et candidate du PS à la présidentielle de 2007 (46,94 % au second tour).',
      'Ancienne présidente de Poitou-Charentes et ministre de l’Écologie de 2014 à 2017, elle fut ambassadrice chargée des pôles.',
      'Elle a été la première à se déclarer, le 10 juillet 2026, pour la primaire « Choisir 2027 ».',
    ],
    keyPositions: [
      {
        topic: 'Primaire « Choisir 2027 »',
        summary: 'Première candidate déclarée à la primaire, le 10 juillet 2026.',
        source: shared.primaireChoisir2027,
      },
      {
        topic: 'Expérience présidentielle',
        summary: 'Elle a déjà porté les couleurs du PS au second tour de 2007 face à Nicolas Sarkozy.',
        source: wiki('S%C3%A9gol%C3%A8ne_Royal'),
      },
      {
        topic: 'Écologie et démocratie participative',
        summary: 'Ses marqueurs historiques restent l’écologie de gouvernement et la démocratie participative.',
        source: wiki('S%C3%A9gol%C3%A8ne_Royal'),
      },
    ],
    timeline: [
      {
        date: '2007-05-06',
        title: 'Second tour de la présidentielle 2007',
        description: 'Elle obtient 46,94 % face à Nicolas Sarkozy.',
        source: wiki('S%C3%A9gol%C3%A8ne_Royal'),
      },
      {
        date: '2026-07-10',
        title: 'Candidature à la primaire',
        description: 'Elle annonce sa candidature à « Choisir 2027 ».',
        source: shared.primaireChoisir2027,
      },
    ],
    sources: [shared.primaireChoisir2027, shared.listeLcp, shared.candidaturesWiki, wiki('S%C3%A9gol%C3%A8ne_Royal')],
  },
  {
    id: 'jerome-guedj',
    name: 'Jérôme Guedj',
    bloc: 'Gauche',
    party: 'Parti socialiste',
    status: 'declared_primary',
    statusLabel: 'Candidat primaire « Choisir 2027 »',
    summary:
      'Député socialiste de l’Essonne, il a rejoint la primaire « Choisir 2027 » le 23 août 2026.',
    themes: ['Laïcité', 'Protection sociale', 'République'],
    priority: 15,
    photoUrl: `${CLOUDINARY}/v1790073770/presidentielles/candidats/jerome-guedj.jpg`,
    photoCredit: commonsCredit('Audrey AK', 'CC BY-SA 2.0', CC_BY_SA_2, 'J%C3%A9r%C3%B4me_Guedj_2010.jpg'),
    currentRole: 'Député de l’Essonne',
    biography: [
      'Né en 1972, Jérôme Guedj est député de l’Essonne et ancien président du conseil général du département.',
      'Figure de l’aile laïque et républicaine du PS, il s’est fait connaître par ses travaux sur la protection sociale et le grand âge.',
      'Il a rejoint la primaire « Choisir 2027 » le 23 août 2026.',
    ],
    keyPositions: [
      {
        topic: 'Primaire « Choisir 2027 »',
        summary: 'Il entre dans la primaire socialiste le 23 août 2026.',
        source: shared.primaireChoisir2027,
      },
      {
        topic: 'Laïcité et République',
        summary: 'Il incarne une ligne laïque et républicaine ferme au sein du PS.',
        source: wiki('J%C3%A9r%C3%B4me_Guedj'),
      },
    ],
    timeline: [
      {
        date: '2022-06-19',
        title: 'Élu député de l’Essonne',
        description: 'Il retrouve l’Assemblée nationale.',
        source: wiki('J%C3%A9r%C3%B4me_Guedj'),
      },
      {
        date: '2026-08-23',
        title: 'Entrée dans la primaire',
        description: 'Il rejoint « Choisir 2027 ».',
        source: shared.primaireChoisir2027,
      },
    ],
    sources: [shared.primaireChoisir2027, shared.candidaturesWiki, wiki('J%C3%A9r%C3%B4me_Guedj')],
  },
  {
    id: 'emmanuel-maurel',
    name: 'Emmanuel Maurel',
    bloc: 'Gauche',
    party: 'Gauche républicaine et socialiste',
    status: 'declared_primary',
    statusLabel: 'Candidat primaire « Choisir 2027 »',
    summary:
      'Député du Val-d’Oise et fondateur de la Gauche républicaine et socialiste, il est entré le 4 septembre 2026 dans la primaire « Choisir 2027 ».',
    themes: ['Souveraineté', 'Industrie', 'République sociale'],
    priority: 16,
    photoUrl: `${CLOUDINARY}/v1790073771/presidentielles/candidats/emmanuel-maurel.jpg`,
    photoCredit: commonsCredit('Echwander', 'CC BY-SA 4.0', CC_BY_SA_4, 'Emmanuel_Maurel_en_2016.jpg'),
    currentRole: 'Député du Val-d’Oise et animateur de la GRS',
    biography: [
      'Né en 1973, Emmanuel Maurel a quitté le PS en 2018 pour fonder la Gauche républicaine et socialiste.',
      'Ancien député européen, il est élu député du Val-d’Oise en 2024.',
      'La GRS coorganise la primaire « Choisir 2027 », dans laquelle il s’est porté candidat le 4 septembre 2026.',
    ],
    keyPositions: [
      {
        topic: 'Primaire « Choisir 2027 »',
        summary: 'Il annonce sa candidature le 4 septembre 2026.',
        source: shared.primaireChoisir2027,
      },
      {
        topic: 'Souverainisme de gauche',
        summary: 'Il défend une gauche républicaine, industrielle et critique des traités européens.',
        source: wiki('Emmanuel_Maurel'),
      },
    ],
    timeline: [
      {
        date: '2019-02-03',
        title: 'Fondation de la GRS',
        description: 'Il crée la Gauche républicaine et socialiste après son départ du PS.',
        source: wiki('Emmanuel_Maurel'),
      },
      {
        date: '2026-09-04',
        title: 'Entrée dans la primaire',
        description: 'Il rejoint « Choisir 2027 ».',
        source: shared.primaireChoisir2027,
      },
    ],
    sources: [shared.primaireChoisir2027, shared.candidaturesWiki, wiki('Emmanuel_Maurel')],
  },
  {
    id: 'bernard-cazeneuve',
    name: 'Bernard Cazeneuve',
    bloc: 'Centre gauche',
    party: 'La Convention',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Ancien Premier ministre (2016-2017) et fondateur de La Convention, il a déclaré sa candidature le 16 juillet 2026 en contournant la primaire socialiste.',
    themes: ['Laïcité', 'Autorité de l’État', 'Social-démocratie'],
    priority: 17,
    photoUrl: `${CLOUDINARY}/v1790073772/presidentielles/candidats/bernard-cazeneuve.jpg`,
    photoCredit: commonsCredit('Jérémy Barande', 'CC BY-SA 2.0', CC_BY_SA_2, 'Bernard_Cazeneuve,_(42399145362)_(cropped).jpg'),
    currentRole: 'Ancien Premier ministre, président de La Convention',
    biography: [
      'Né en 1963, Bernard Cazeneuve a été ministre de l’Intérieur puis Premier ministre de décembre 2016 à mai 2017.',
      'Il a quitté le PS en 2022 pour fonder La Convention, mouvement social-démocrate attaché à la laïcité et à l’autorité de l’État.',
      'Il a présenté son projet et déclaré sa candidature le 16 juillet 2026, sans passer par la primaire « Choisir 2027 ».',
    ],
    keyPositions: [
      {
        topic: 'Candidature hors primaire',
        summary: 'Il se déclare le 16 juillet 2026 et refuse de se soumettre à la primaire socialiste.',
        source: shared.listeLcp,
      },
      {
        topic: 'Social-démocratie d’ordre',
        summary: 'Il défend une gauche de gouvernement, laïque et attachée à l’autorité de l’État.',
        source: wiki('Bernard_Cazeneuve'),
      },
    ],
    timeline: [
      {
        date: '2016-12-06',
        title: 'Nomination à Matignon',
        description: 'Il succède à Manuel Valls comme Premier ministre.',
        source: wiki('Bernard_Cazeneuve'),
      },
      {
        date: '2026-07-16',
        title: 'Déclaration de candidature',
        description: 'Il présente son projet et se déclare candidat.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.listeLcp, shared.listeTouteleurope, shared.candidaturesWiki, wiki('Bernard_Cazeneuve')],
  },
  {
    id: 'karim-bouamrane',
    name: 'Karim Bouamrane',
    bloc: 'Gauche',
    party: 'Parti socialiste',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Maire socialiste de Saint-Ouen-sur-Seine, il a déclaré sa candidature le 9 juin 2026, en dehors de la primaire « Choisir 2027 ».',
    themes: ['Égalité territoriale', 'Sécurité', 'République'],
    priority: 18,
    photoUrl: `${CLOUDINARY}/v1790073773/presidentielles/candidats/karim-bouamrane.jpg`,
    photoCredit: commonsCredit('Oumma', 'CC BY 4.0', CC_BY_4, 'Karim_Bouamrane_en_2026_(cropped).jpg'),
    currentRole: 'Maire de Saint-Ouen-sur-Seine',
    biography: [
      'Maire de Saint-Ouen-sur-Seine depuis 2020, Karim Bouamrane s’est fait connaître par sa gestion de la ville-hôte du village olympique de 2024.',
      'Membre du PS, il porte un discours républicain mêlant égalité territoriale, sécurité et fierté des banlieues.',
      'Il a déclaré sa candidature le 9 juin 2026 et ne participe pas à la primaire socialiste.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il se déclare candidat le 9 juin 2026.',
        source: shared.listeCnews,
      },
      {
        topic: 'Hors primaire',
        summary: 'Il figure parmi les socialistes candidats en dehors de « Choisir 2027 », avec Bernard Cazeneuve.',
        source: shared.listeTouteleurope,
      },
    ],
    timeline: [
      {
        date: '2020-07-03',
        title: 'Élection à la mairie de Saint-Ouen',
        description: 'Il devient maire de Saint-Ouen-sur-Seine.',
        source: wiki('Karim_Bouamrane'),
      },
      {
        date: '2026-06-09',
        title: 'Déclaration de candidature',
        description: 'Il annonce sa candidature à la présidentielle.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.listeTouteleurope, shared.listeCnews, shared.candidaturesWiki, wiki('Karim_Bouamrane')],
  },
  {
    id: 'delphine-batho',
    name: 'Delphine Batho',
    bloc: 'Écologie',
    party: 'Génération Écologie',
    status: 'declared',
    statusLabel: 'Déclarée',
    summary:
      'Députée des Deux-Sèvres et cheffe de Génération Écologie, elle a annoncé sa candidature le 26 novembre 2025 pour un bulletin écologiste autonome.',
    themes: ['Écologie de gouvernement', 'Décroissance', 'Énergie'],
    priority: 19,
    photoUrl: `${CLOUDINARY}/v1773268670/presidentielles/candidats/delphine-batho.jpg`,
    currentRole: 'Députée des Deux-Sèvres et coordinatrice de Génération Écologie',
    biography: [
      'Née en 1973 à Paris, Delphine Batho est députée des Deux-Sèvres et siège au groupe Écologiste et Social.',
      'Elle a été ministre de l’Écologie en 2012-2013.',
      'Depuis novembre 2025, elle porte une candidature autonome de Génération Écologie pour la présidentielle 2027.',
    ],
    keyPositions: [
      {
        topic: 'Bulletin écologiste autonome',
        summary: 'Elle défend la présence d’une candidature écologiste distincte au premier tour.',
        source: bathoSources.official,
      },
      {
        topic: 'Écologie de gouvernement',
        summary: 'Sa ligne consiste à reconstruire une écologie capable de gouverner avec des ruptures programmatiques.',
        source: bathoSources.official,
      },
    ],
    timeline: [
      {
        date: '2013-07-02',
        title: 'Fin de fonctions ministérielles',
        description: 'Un décret met fin à ses fonctions de ministre de l’Écologie.',
        source: src('Legifrance', 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000027650341', '2013-07-02'),
      },
      {
        date: '2025-11-26',
        title: 'Annonce de candidature 2027',
        description: 'Génération Écologie officialise sa candidature présidentielle.',
        source: bathoSources.official,
      },
    ],
    sources: [bathoSources.official, bathoSources.assembly, shared.listeTouteleurope, bathoSources.wiki],
  },
  {
    id: 'nathalie-arthaud',
    name: 'Nathalie Arthaud',
    bloc: 'Extrême gauche',
    party: 'Lutte ouvrière',
    status: 'declared',
    statusLabel: 'Déclarée',
    summary: 'Porte-parole de Lutte ouvrière, elle a annoncé le 8 décembre 2025 sa quatrième candidature présidentielle.',
    themes: ['Salaires', 'Monde du travail', 'Anticapitalisme'],
    priority: 20,
    photoUrl: `${CLOUDINARY}/v1773268683/presidentielles/candidats/nathalie-arthaud.jpg`,
    currentRole: 'Porte-parole de Lutte ouvrière et enseignante',
    biography: [
      'Née en 1970, Nathalie Arthaud est enseignante en économie-gestion et militante de Lutte ouvrière depuis sa jeunesse.',
      'Elle est devenue la porte-parole du parti en 2008 après Arlette Laguiller.',
      'Candidate en 2012, 2017 et 2022, elle a annoncé une nouvelle candidature pour 2027.',
    ],
    keyPositions: [
      {
        topic: 'Voix du monde du travail',
        summary: 'Elle justifie sa candidature par la défense explicite des travailleurs et travailleuses.',
        source: arthaudSources.parisien,
      },
      {
        topic: 'Programme social radical',
        summary: 'LO met en avant l’interdiction des licenciements, la hausse des salaires et l’expropriation des banques.',
        source: arthaudSources.tf1,
      },
    ],
    timeline: [
      {
        date: '2008-12-08',
        title: 'Porte-parole de Lutte ouvrière',
        description: 'Elle succède à Arlette Laguiller comme figure nationale du parti.',
        source: arthaudSources.wiki,
      },
      {
        date: '2025-12-08',
        title: 'Annonce pour 2027',
        description: 'LO officialise sa candidature pour la quatrième fois.',
        source: arthaudSources.parisien,
      },
    ],
    sources: [arthaudSources.parisien, arthaudSources.tf1, shared.listeTouteleurope, arthaudSources.wiki],
  },
  {
    id: 'nicolas-dupont-aignan',
    name: 'Nicolas Dupont-Aignan',
    bloc: 'Droite souverainiste',
    party: 'Debout la France',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Président de Debout la France et candidat en 2012, 2017 et 2022, il a officialisé le 19 septembre 2026 une quatrième candidature.',
    themes: ['Souveraineté', 'Référendum', 'Sécurité'],
    priority: 21,
    photoUrl: `${CLOUDINARY}/v1790073773/presidentielles/candidats/nicolas-dupont-aignan.jpg`,
    photoCredit: commonsCredit('Debout la France', 'CC BY-SA 4.0', CC_BY_SA_4, 'Nicolas_Dupont-Aignan,_homme_politique_fran%C3%A7ais.jpg'),
    currentRole: 'Président de Debout la France',
    biography: [
      'Né en 1961, Nicolas Dupont-Aignan a fondé Debout la France et a longtemps été maire d’Yerres et député de l’Essonne.',
      'Il a été candidat en 2012, 2017 et 2022 (2,06 %).',
      'Il a officialisé une nouvelle candidature le 19 septembre 2026.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il se déclare candidat le 19 septembre 2026.',
        source: shared.candidaturesWiki,
      },
      {
        topic: 'Souverainisme gaulliste',
        summary: 'Il défend la sortie des traités européens contraignants et le recours au référendum.',
        source: wiki('Nicolas_Dupont-Aignan'),
      },
    ],
    timeline: [
      {
        date: '2022-04-10',
        title: 'Premier tour 2022',
        description: 'Il obtient 2,06 % des suffrages.',
        source: wiki('Nicolas_Dupont-Aignan'),
      },
      {
        date: '2026-09-19',
        title: 'Déclaration de candidature',
        description: 'Il officialise sa quatrième candidature.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.candidaturesWiki, shared.listeTouteleurope, wiki('Nicolas_Dupont-Aignan')],
  },
  {
    id: 'florian-philippot',
    name: 'Florian Philippot',
    bloc: 'Droite souverainiste',
    party: 'Les Patriotes',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Président des Patriotes et ancien numéro deux du FN, il s’est déclaré candidat le 9 mai 2026 après avoir échoué à réunir les parrainages en 2022.',
    themes: ['Frexit', 'Souveraineté', 'Libertés'],
    priority: 22,
    photoUrl: `${CLOUDINARY}/v1790073774/presidentielles/candidats/florian-philippot.jpg`,
    photoCredit: commonsCredit('Thomas Bresson', 'CC BY 4.0', CC_BY_4, '2022-04-16_16-49-26_MAM-Paris_02.jpg'),
    currentRole: 'Président des Patriotes',
    biography: [
      'Né en 1981, Florian Philippot a été vice-président du Front national avant de fonder Les Patriotes en 2017.',
      'Il n’avait pas obtenu les 500 parrainages nécessaires en 2022.',
      'Il s’est déclaré candidat pour 2027 le 9 mai 2026.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Il annonce sa candidature le 9 mai 2026.',
        source: shared.candidaturesWiki,
      },
      {
        topic: 'Frexit',
        summary: 'La sortie de l’Union européenne et de l’euro reste son marqueur central.',
        source: wiki('Florian_Philippot'),
      },
    ],
    timeline: [
      {
        date: '2017-09-29',
        title: 'Fondation des Patriotes',
        description: 'Il quitte le FN et lance son propre parti.',
        source: wiki('Florian_Philippot'),
      },
      {
        date: '2026-05-09',
        title: 'Déclaration de candidature',
        description: 'Il se déclare candidat à la présidentielle 2027.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.candidaturesWiki, shared.listeTouteleurope, wiki('Florian_Philippot')],
  },
  {
    id: 'francois-asselineau',
    name: 'François Asselineau',
    bloc: 'Souverainiste',
    party: 'Union populaire républicaine',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Président de l’UPR et candidat en 2017 (0,92 %), il est déclaré depuis le 31 août 2023 et défend la sortie de l’UE, de l’euro et de l’OTAN.',
    themes: ['Frexit', 'Indépendance nationale', 'Institutions'],
    priority: 23,
    photoUrl: `${CLOUDINARY}/v1790073775/presidentielles/candidats/francois-asselineau.jpg`,
    photoCredit: commonsCredit('Union populaire républicaine', 'CC BY-SA 4.0', CC_BY_SA_4, 'Fran%C3%A7ois_ASSELINEAU.jpg'),
    currentRole: 'Président de l’Union populaire républicaine',
    biography: [
      'Né en 1957, François Asselineau est haut fonctionnaire et fondateur de l’Union populaire républicaine en 2007.',
      'Candidat en 2017, il a obtenu 0,92 % des voix ; il n’a pas réuni les parrainages en 2022.',
      'Il a annoncé sa candidature pour 2027 dès le 31 août 2023.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary: 'Déclaré depuis le 31 août 2023, il est l’un des premiers candidats officiels.',
        source: shared.candidaturesWiki,
      },
      {
        topic: 'Sortie de l’UE, de l’euro et de l’OTAN',
        summary: 'Le programme de l’UPR repose sur l’article 50 du traité sur l’Union européenne.',
        source: wiki('Fran%C3%A7ois_Asselineau'),
      },
    ],
    timeline: [
      {
        date: '2017-04-23',
        title: 'Premier tour 2017',
        description: 'Il obtient 0,92 % des suffrages.',
        source: wiki('Fran%C3%A7ois_Asselineau'),
      },
      {
        date: '2023-08-31',
        title: 'Déclaration de candidature 2027',
        description: 'Il annonce sa candidature près de quatre ans avant le scrutin.',
        source: shared.candidaturesWiki,
      },
    ],
    sources: [shared.candidaturesWiki, shared.listeTouteleurope, wiki('Fran%C3%A7ois_Asselineau')],
  },
  {
    id: 'dominique-de-villepin',
    name: 'Dominique de Villepin',
    bloc: 'Centre droit',
    party: 'La France humaniste',
    status: 'intent',
    statusLabel: 'Candidature pressentie',
    summary:
      'Ancien Premier ministre (2005-2007), il a lancé La France humaniste en juin 2025 pour préparer 2027. Non officiellement déclaré, il travaille à réunir les 500 parrainages.',
    themes: ['Diplomatie', 'Unité républicaine', 'Institutions'],
    priority: 24,
    photoUrl: `${CLOUDINARY}/v1790073776/presidentielles/candidats/dominique-de-villepin.jpg`,
    photoCredit: commonsCredit('Georges Seguin (Okki)', 'CC BY-SA 3.0', CC_BY_SA_3, 'Dominique_de_Villepin_20100330_Salon_du_livre_de_Paris_2_cropped.jpg'),
    currentRole: 'Ancien Premier ministre, fondateur de La France humaniste',
    biography: [
      'Né en 1953, Dominique de Villepin a été ministre des Affaires étrangères, de l’Intérieur, puis Premier ministre de 2005 à 2007.',
      'Revenu dans le débat public par ses prises de position internationales, il a lancé le 24 juin 2025 le mouvement La France humaniste.',
      'À la rentrée 2026, il n’est pas formellement déclaré mais cherche à réunir les 500 présentations d’élus.',
    ],
    keyPositions: [
      {
        topic: 'La France humaniste',
        summary: 'Il lance en juin 2025 un « mouvement d’idées et de citoyens » comme étape vers 2027.',
        source: villepinSources.rts,
      },
      {
        topic: 'Parrainages',
        summary: 'Il figure parmi les prétendants qui cherchent encore leurs 500 parrainages.',
        source: shared.listeLcp,
      },
    ],
    timeline: [
      {
        date: '2005-05-31',
        title: 'Nomination à Matignon',
        description: 'Il devient Premier ministre de Jacques Chirac.',
        source: villepinSources.wiki,
      },
      {
        date: '2025-06-24',
        title: 'Lancement de La France humaniste',
        description: 'Il crée son mouvement en vue de la présidentielle.',
        source: villepinSources.rts,
      },
    ],
    sources: [villepinSources.rts, shared.listeLcp, shared.listePublicSenat, villepinSources.wiki],
  },
  {
    id: 'jordan-bardella',
    name: 'Jordan Bardella',
    bloc: 'Extrême droite',
    party: 'Rassemblement national',
    status: 'not_running',
    statusLabel: 'Non candidat — ticket Le Pen-Bardella',
    summary:
      'Président du RN, longtemps « plan B » en cas d’inéligibilité de Marine Le Pen, il n’est finalement pas candidat : depuis le 7 juillet 2026, il est présenté comme le futur Premier ministre d’un ticket avec elle.',
    themes: ['RN', 'Matignon', 'Europe'],
    priority: 25,
    photoUrl: `${CLOUDINARY}/v1773268679/presidentielles/candidats/jordan-bardella.jpg`,
    currentRole: 'Président du Rassemblement national et député européen',
    biography: [
      'Né en 1995, Jordan Bardella est député européen depuis 2019 et président du Rassemblement national depuis novembre 2022.',
      'Pendant la procédure judiciaire visant Marine Le Pen, il était identifié comme candidat de remplacement, avec un passage de relais envisagé dès septembre 2026 en cas de confirmation de l’inéligibilité.',
      'La cour d’appel ayant rendu Marine Le Pen éligible le 7 juillet 2026, il n’est pas candidat et incarne le volet Matignon du « ticket » RN.',
    ],
    keyPositions: [
      {
        topic: 'Ticket Le Pen-Bardella',
        summary: 'Marine Le Pen l’annonce comme Premier ministre si les Français leur accordent leur confiance.',
        source: lePenSources.franceinfo,
      },
      {
        topic: 'Ancien plan B',
        summary: 'Il devait reprendre la candidature dès septembre 2026 si l’inéligibilité était confirmée en appel.',
        source: bardellaSources.franceinfoTicket,
      },
      {
        topic: 'Loyauté affichée',
        summary: 'Dès avril 2025, il affirmait que Marine Le Pen restait sa candidate et qu’il ne la remplacerait qu’en cas d’empêchement.',
        source: bardellaSources.parisien,
      },
    ],
    timeline: [
      {
        date: '2022-11-05',
        title: 'Élection à la présidence du RN',
        description: 'Il prend officiellement la tête du parti.',
        source: bardellaSources.wiki,
      },
      {
        date: '2025-04-26',
        title: 'Candidature conditionnelle',
        description: 'Il confirme qu’il serait candidat si Marine Le Pen était empêchée.',
        source: bardellaSources.parisien,
      },
      {
        date: '2026-07-07',
        title: 'Ticket avec Marine Le Pen',
        description: 'Éligible, Marine Le Pen se déclare et le présente comme futur Premier ministre.',
        source: lePenSources.franceinfo,
      },
    ],
    sources: [lePenSources.franceinfo, bardellaSources.franceinfoTicket, bardellaSources.parisien, bardellaSources.wiki],
  },
  {
    id: 'gerald-darmanin',
    name: 'Gérald Darmanin',
    bloc: 'Centre droit',
    party: 'Populaires',
    status: 'not_running',
    statusLabel: 'Non candidat — soutien d’Édouard Philippe',
    summary:
      'Garde des Sceaux et fondateur du mouvement Populaires, il a renoncé le 17 août 2026 à se présenter pour « ne pas rajouter de la division » et soutient Édouard Philippe, dont il veut être l’« aiguillon social ».',
    themes: ['Justice', 'Droite sociale', 'Rassemblement'],
    priority: 26,
    photoUrl: `${CLOUDINARY}/v1773268673/presidentielles/candidats/gerald-darmanin.jpg`,
    currentRole: 'Garde des Sceaux, ministre de la Justice',
    biography: [
      'Né en 1982, Gérald Darmanin a bâti sa trajectoire entre Tourcoing et des responsabilités ministérielles de premier plan, à l’Intérieur puis à la Justice.',
      'Il a longtemps entretenu une ambition présidentielle, affirmant début 2026 se sentir « capable » d’être le candidat de son camp.',
      'Le 17 août 2026, il a renoncé à sa candidature et annoncé faire campagne aux côtés d’Édouard Philippe, réunissant ses soutiens à Tourcoing le 30 août en sa présence.',
    ],
    keyPositions: [
      {
        topic: 'Renoncement et soutien à Philippe',
        summary: 'Le 17 août 2026, il renonce à 2027 pour « ne pas rajouter de la division » et se rallie à Édouard Philippe.',
        source: darmaninSources.orange,
      },
      {
        topic: '« Aiguillon social »',
        summary: 'Il entend peser sur la ligne sociale du candidat Horizons.',
        source: darmaninSources.renoncement,
      },
      {
        topic: 'Mouvement Populaires',
        summary: 'Son mouvement reste un relais pour une droite sociale au sein du rassemblement derrière Philippe.',
        source: darmaninSources.populaires,
      },
    ],
    timeline: [
      {
        date: '2024-09-29',
        title: 'Lancement de Populaires',
        description: 'Il lance son propre mouvement politique.',
        source: darmaninSources.wiki,
      },
      {
        date: '2025-02-13',
        title: 'Ambition affichée',
        description: 'Il indique qu’il participera « d’une manière ou d’une autre » à la présidentielle.',
        source: darmaninSources.participates,
      },
      {
        date: '2026-08-17',
        title: 'Renoncement',
        description: 'Il renonce à se présenter et soutient Édouard Philippe.',
        source: darmaninSources.orange,
      },
      {
        date: '2026-08-30',
        title: 'Rentrée politique à Tourcoing',
        description: 'Il réunit ses soutiens en présence d’Édouard Philippe.',
        source: darmaninSources.renoncement,
      },
    ],
    sources: [darmaninSources.orange, darmaninSources.renoncement, darmaninSources.participates, darmaninSources.populaires, darmaninSources.wiki],
  },
].map((candidate) => ({ ...candidate, dataLastUpdated: CANDIDATE_DATA_LAST_UPDATED }))

export const electionCalendar = {
  firstRound: ELECTION_FIRST_ROUND_DATE,
  secondRound: ELECTION_SECOND_ROUND_DATE,
  decree: ELECTION_DECREE_DATE,
  mandateEnd: '2027-05-13',
  source: shared.datesInfoGouv,
}

export function getCandidate2027ById(candidateId) {
  return candidates2027.find((candidate) => candidate.id === candidateId) ?? null
}

export function isRunningStatus(status) {
  return status !== 'not_running'
}
