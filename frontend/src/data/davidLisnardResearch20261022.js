// Research checked on 2026-10-22. Dates on sources are publication dates;
// undated biographies use the consultation date. Campaign accounts are labelled.
const source = (label, url, date = '2026-10-22') => ({ label, url, date })
export const lisnardResearchSources = {
  biography: source('Nouvelle Énergie · biographie de campagne', 'https://www.unenouvelleenergie.fr/david-lisnard/'),
  roots: source('LaREF · notice biographique', 'https://archive.laref.org/david-lisnard/'),
  wiki: source('Wikipédia · repères biographiques recoupés', 'https://fr.wikipedia.org/wiki/David_Lisnard'),
  amf: source('AMF · résultats de l’élection', 'https://www.amf.asso.fr/documents-david-lisnard-elu-la-presidence-amf/40989', '2021-11-17'),
  municipal: source('Ville de Cannes · installation du conseil municipal', 'https://cannes.com/fr/index/actualites/annee-2026/mars/seance-d-installation-du-conseil-municipal-de-cannes.html', '2026-03-23'),
  candidature: source('LCP · annonce sur France 2', 'https://lcp.fr/actualites/je-suis-candidat-david-lisnard-quitte-lr-et-relance-le-debat-sur-une-primaire-a-droite', '2026-04-01'),
  childhood: source('Nouvelle Énergie · compte rendu de l’entretien Empreintes', 'https://www.unenouvelleenergie.fr/david-lisnard-dans-empreintes-sur-le-figaro-je-veux-faire-gagner-la-belle-france-celle-des-gens-qui-bossent-et-qui-veulent-sen-sortir/', '2026-10-15'),
  crayon: source('Nouvelle Énergie · compte rendu de l’entretien au Crayon', 'https://www.unenouvelleenergie.fr/david-lisnard-au-crayon-letat-providence-est-mort-il-faut-inventer-un-nouveau-modele/', '2026-10-15'),
  bfm: source('Nouvelle Énergie · entretien BFMTV du 10 octobre', 'https://www.unenouvelleenergie.fr/david-lisnard-sur-bfmtv-retablir-lordre-liberer-lecole-redresser-la-france/', '2026-10-15'),
  rmc: source('Nouvelle Énergie · entretien BFMTV–RMC du 13 octobre', 'https://www.unenouvelleenergie.fr/david-lisnard-sur-bfmtv-et-rmc-lhyper-bureaucratisation-et-lhyper-centralisation-sont-en-train-de-flinguer-nos-enfants/', '2026-10-14'),
  lci: source('Le Parisien avec AFP · échange sur LCI', 'https://www.leparisien.fr/politique/je-men-fous-david-lisnard-sagace-apres-avoir-ete-interroge-sur-le-17-octobre-1961-20-10-2026-67QQ72XSNJGMBHDQG3MQNZYXKM.php', '2026-10-20'),
  amfDebate: source('Le Monde · critiques à l’AMF et réponse de David Lisnard', 'https://www.lemonde.fr/politique/article/2026/10/21/des-maires-de-gauche-reprochent-a-david-lisnard-ses-propos-sur-le-massacre-du-17-octobre-1961_6798298_823448.html', '2026-10-21'),
}
const s = lisnardResearchSources

export const lisnardVideos = [
  { videoId: 'Dpe_J7T0ztw', date: '2026-10-13', channel: 'David Lisnard', title: 'David Lisnard Face à Apolline de Malherbe mardi 13 octobre', excerpt: 'Il expose sur BFMTV–RMC sa réforme de l’école : choix des familles, autonomie des établissements et recrutement des enseignants. Il revient également sur les violences lycéennes et sur sa demande de primaire. Vidéo publiée sur son propre compte.', context: 'Entretien télévisé du 13 octobre ; compte rendu du mouvement publié le 14.', reference: s.rmc },
  { videoId: 'HAPGJIdAR3g', date: '2026-10-09', channel: 'Empreintes Le Figaro 2027', title: 'Le football, la littérature, son ambition… les confidences de David Lisnard', excerpt: 'Face à Vincent Trémolet de Villers, il raconte son enfance à Limoges, le commerce de ses parents et ses influences sportives et littéraires. Il expose sa conception de l’engagement et du pouvoir. Ce récit personnel est présenté comme son témoignage.', context: 'Entretien biographique ; compte rendu de campagne publié le 15 octobre.', reference: s.childhood },
  { videoId: 'SdILU6uwqTs', date: '2026-10-11', channel: 'Le Crayon', title: 'David Lisnard : son plan pour couper 200 milliards de dépenses publiques | Entretien', excerpt: 'Il présente un objectif de 200 milliards d’euros d’économies en rythme de croisière, un étage de retraite par capitalisation et sa réforme de l’école. Ces montants et effets attendus sont ses objectifs de campagne, pas des économies réalisées ni une évaluation indépendante.', context: 'Entretien programmatique ; compte rendu publié le 15 octobre.', reference: s.crayon },
  { videoId: 'cquciFhgHv0', date: '2026-10-12', channel: 'Nouvelle Énergie avec David Lisnard', title: 'David Lisnard sur BFMTV : « Il faut que ceux qui nous ont gouvernés ne gouvernent plus »', excerpt: 'Lors de l’entretien du 10 octobre sur BFMTV, il défend une intervention plus précoce contre les violences, l’autonomie scolaire et une primaire ouverte à droite et au centre. La vidéo est une republication sur la chaîne de son mouvement le 12 octobre.', context: 'Distinguer la diffusion télévisée du 10 octobre et la mise en ligne du 12.', reference: s.bfm },
]

export const lisnardResearch = {
  birthDate: '1969-02-02', birthYear: 1969, xUsername: 'davidlisnard',
  biography: [
    'Né le 2 février 1969 à Limoges, David Lisnard y passe une partie de son enfance avant de poursuivre sa scolarité à Cannes. Son père, Denis, est footballeur professionnel ; sa mère, Jacqueline, danseuse de ballet. Tous deux se reconvertissent ensuite dans le commerce. Les notices de LaREF et de Nouvelle Énergie décrivent également des attaches familiales anciennes à Cannes.',
    'Il fréquente les lycées Carnot puis Bristol à Cannes et sort diplômé de Sciences Po Bordeaux en 1992. Sa biographie de campagne mentionne des emplois saisonniers dès l’adolescence, puis des activités de rédaction et d’enseignement en préparation aux concours. Ces expériences précèdent ses fonctions électives.',
    'Dans Empreintes, diffusé en octobre 2026, il relie ses convictions au quotidien de ses parents commerçants à Limoges. Il évoque le football, la lecture, le rock et l’exigence transmise par le sport et la danse. Il s’agit de souvenirs et d’une interprétation personnelle de son parcours, et non d’une explication établie de son orientation politique.',
    'En 1996, il rejoint le cabinet de Jacques Pélissard, député-maire de Lons-le-Saunier. De retour à Cannes en 1999, il reprend des activités commerciales et travaille à Sophia Antipolis. Il participe à la campagne de Bernard Brochand et devient adjoint au maire en 2001, puis premier adjoint en 2008. Il exerce aussi des responsabilités au Palais des festivals et au sein du syndicat des eaux SICASIL.',
    'Maire de Cannes depuis 2014, il est reconduit en 2020 puis en 2026. La Ville annonce 81,1 % des suffrages dès le premier tour du 15 mars 2026 et son installation pour un troisième mandat le 21 mars. Élu président de l’Association des maires de France le 17 novembre 2021 avec 62,3 % des voix, il porte aussi la parole d’une organisation transpartisane.',
    'Après le déploiement national de Nouvelle Énergie en 2021, il publie notamment Ainsi va la France, manifeste libéral en 2025. Le 31 mars 2026, au journal de France 2, il annonce son départ des Républicains et sa candidature présidentielle. Il continue de réclamer une primaire ouverte de la droite et du centre : cette demande ne vaut pas désignation commune de ces formations.',
    'Ses prises de parole d’octobre 2026 associent réduction de la dépense publique, autonomie des établissements scolaires, capitalisation pour les retraites et fermeté sécuritaire. Sa réponse sur LCI, le 19 octobre, à une question sur le massacre du 17 octobre 1961 suscite une polémique. Il reconnaît ensuite la gravité des faits tout en disant vouloir traiter les violences présentes. Des responsables de gauche de l’AMF critiquent ses propos ; il défend la séparation entre ses positions de candidat et celles de l’association.',
    'Sources et méthode : mise à jour du 22 octobre 2026. Les souvenirs d’enfance sont attribués à ses entretiens ; les biographies du mouvement sont identifiées comme sources de campagne. Les résultats et annonces sont recoupés avec la Ville, l’AMF et la presse. Les résumés vidéo renvoient aux originaux et à leurs comptes rendus ; ils ne constituent pas une transcription intégrale.',
  ],
  childhoodCity: 'Limoges, puis Cannes pour la suite de sa scolarité', childhoodCitySource: s.wiki,
  parentBackground: [
    { relation: 'Père · Denis Lisnard', profession: 'Footballeur professionnel, notamment à l’AS Cannes et à Limoges, puis commerçant.', source: s.roots },
    { relation: 'Mère · Jacqueline', profession: 'Danseuse de ballet, puis commerçante avec son époux.', source: s.roots },
  ],
  childhoodInterests: [
    { label: 'Football · évoqué dans ses souvenirs personnels', source: s.childhood },
    { label: 'Lecture et littérature · notamment Goscinny et Romain Gary', source: s.childhood },
    { label: 'Musique et rock · influences racontées dans Empreintes', source: s.childhood },
  ],
  parcours: [
    { period: '1969 – années de formation', role: 'De Limoges à Cannes', institution: 'Famille et scolarité', summary: 'Enfance à Limoges ; études secondaires aux lycées Carnot puis Bristol à Cannes.', source: s.wiki },
    { period: '1992', role: 'Diplômé de Sciences Po Bordeaux', institution: 'Institut d’études politiques de Bordeaux', summary: 'Formation en sciences politiques avant ses activités professionnelles et son entrée en cabinet.', source: s.biography },
    { period: '1996 – 1999', role: 'Directeur de cabinet et attaché parlementaire', institution: 'Auprès de Jacques Pélissard · Lons-le-Saunier', summary: 'Première expérience auprès d’un député-maire, avant son retour à Cannes.', source: s.roots },
    { period: '1999 – 2016', role: 'Activités commerciales', institution: 'Cannes et Sophia Antipolis', summary: 'Retour aux commerces familiaux ; maintien d’une activité de commerçant jusqu’en 2016 selon les notices biographiques.', source: s.biography },
    { period: '2001 – 2014', role: 'Adjoint puis premier adjoint', institution: 'Ville de Cannes', summary: 'Élu sur la liste de Bernard Brochand, premier adjoint à partir de 2008.', source: s.biography },
    { period: 'Depuis 2014', role: 'Maire de Cannes', institution: 'Ville de Cannes', summary: 'Troisième mandat à partir de mars 2026, après les réélections de 2020 et 2026.', source: s.municipal },
    { period: 'Depuis novembre 2021', role: 'Président de l’AMF', institution: 'Association des maires de France', summary: 'Élu face à Philippe Laurent avec 62,3 % des voix. Cette fonction est distincte de sa candidature présidentielle.', source: s.amf },
    { period: 'Depuis mars 2026', role: 'Candidat déclaré à la présidentielle', institution: 'Nouvelle Énergie', summary: 'Annonce le 31 mars sur France 2 après son départ de LR ; favorable à une primaire ouverte.', source: s.candidature },
  ],
  keyPositions: [
    { topic: 'Dépenses publiques et travail', summary: 'Au Crayon, il vise 200 milliards d’euros d’économies en rythme de croisière et propose d’en rendre une partie sous forme de baisse des cotisations. Il s’agit d’un objectif politique, pas d’un gain vérifié.', source: s.crayon },
    { topic: 'Retraites', summary: 'Il défend un étage obligatoire de capitalisation. Les modalités de transition doivent être distinguées du principe annoncé.', source: s.crayon },
    { topic: 'École', summary: 'Il propose davantage d’autonomie pour les établissements et leurs recrutements, la fin de la sectorisation et un financement suivant le choix des familles.', source: s.rmc },
    { topic: 'Sécurité et manifestations', summary: 'Il distingue la liberté de manifester des dégradations et veut des interventions plus précoces contre les auteurs de violences.', source: s.bfm },
    { topic: 'Désignation à droite', summary: 'Candidat déclaré depuis le 31 mars 2026, il demande une primaire ouverte de la droite et du centre.', source: s.candidature },
  ],
  timeline: [
    { date: '1969-02-02', title: 'Naissance à Limoges', description: 'Une enfance en Haute-Vienne avant une scolarité poursuivie à Cannes.', source: s.wiki },
    { date: '2014-04-05', title: 'Premier mandat de maire de Cannes', description: 'Il succède à Bernard Brochand après avoir été son adjoint.', source: s.wiki },
    { date: '2021-11-17', title: 'Élection à la présidence de l’AMF', description: 'L’AMF publie un résultat de 62,3 % des voix.', source: s.amf },
    { date: '2026-03-15', title: 'Réélection municipale au premier tour', description: '81,1 % des suffrages selon la Ville ; installation du conseil le 21 mars.', source: s.municipal },
    { date: '2026-03-31', title: 'Départ de LR et candidature présidentielle', description: 'Annonce au journal de 20 heures de France 2, rapportée par LCP le lendemain.', source: s.candidature },
    { date: '2026-10-09', title: 'Entretien biographique dans Empreintes', description: 'Enfance, famille, lectures et ambition politique face à Vincent Trémolet de Villers.', source: source('YouTube · Empreintes Le Figaro 2027', 'https://www.youtube.com/watch?v=HAPGJIdAR3g', '2026-10-09') },
    { date: '2026-10-19', title: 'Échange controversé sur LCI', description: 'Interrogé sur le 17 octobre 1961, il répond avec irritation, puis reconnaît des faits graves en recentrant son propos sur l’actualité. Séquence rapportée par l’AFP le 20 octobre.', source: s.lci },
    { date: '2026-10-21', title: 'Débat sur l’expression du président de l’AMF', description: 'Des responsables de gauche critiquent ses propos ; il assure distinguer son expression de candidat de celle de l’association.', source: s.amfDebate },
  ],
  interventions: [
    { id: 'lisnard-lci-20261019', type: 'quote', title: 'LCI : un échange sur le 17 octobre 1961', excerpt: 'Le Parisien avec AFP rapporte sa réaction irritée à une question sur le massacre du 17 octobre 1961. Il qualifie ensuite les faits de graves et dramatiques, tout en voulant recentrer la discussion sur les violences actuelles. Compte rendu publié le 20 octobre.', context: 'Émission du 19 octobre ; récit de presse, pas transcription intégrale.', source: s.lci },
    { id: 'lisnard-amf-20261021', type: 'quote', title: 'AMF : critiques et réponse sur la séparation des rôles', excerpt: 'Jean-François Debat et André Laignel critiquent ses déclarations et demandent une clarification entre candidature et représentation des maires. David Lisnard répond qu’il sépare ses positions personnelles de celles de l’AMF.', context: 'Positions contradictoires rapportées par Le Monde.', source: s.amfDebate },
    ...lisnardVideos.map((video) => ({ id: `lisnard-youtube-${video.videoId}`, type: 'video', title: video.title, excerpt: video.excerpt, context: video.context, source: source(`YouTube · ${video.channel}`, `https://www.youtube.com/watch?v=${video.videoId}`, video.date) })),
    { id: 'lisnard-france2-20260331', type: 'quote', title: 'France 2 : l’annonce de candidature et le départ de LR', excerpt: 'Au 20 heures du 31 mars, il se déclare candidat et annonce son départ des Républicains. Il défend une primaire ouverte à droite. LCP restitue l’annonce et les réactions le 1er avril.', context: 'Date de l’intervention distincte de celle de l’article.', source: s.candidature },
  ],
  sources: Object.values(s),
  dataLastUpdated: '2026-10-22',
}
