export const SITE_NAME = 'Présidentielles 2027'
export const SITE_URL = 'https://electionpresidentielle2027.com'
export const SITE_LOGO_PATH = '/site-logo.svg'
export const SITE_FAVICON_PATH = '/favicon.svg'
export const SITE_SOCIAL_IMAGE_PATH = '/site-social-card.svg'

const LAST_EDITORIAL_UPDATE = '2026-09-22'

function candidatePage({
  slug,
  title,
  description,
  heroTitle,
  heroIntro,
  queries,
  summary,
  candidatePath,
  sections,
  faqs,
  updatedAt = LAST_EDITORIAL_UPDATE,
}) {
  return {
    slug,
    title,
    description,
    heroEyebrow: 'Candidat 2027',
    heroTitle,
    heroIntro,
    queries,
    summary,
    sections,
    faqs,
    updatedAt,
    relatedLinks: [
      candidatePath
        ? { label: 'Voir la fiche détaillée', href: `${candidatePath}/` }
        : { label: 'Voir les sondages 2027', href: '/polls/' },
      { label: 'Tous les candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Comparer les sondages', href: '/polls/' },
    ],
  }
}

export const seoPages = [
  {
    slug: 'presidentielle-2027',
    title: 'Présidentielle 2027 : candidats, sondages, dates et intentions de vote',
    description:
      'Présidentielle 2027 : dates officielles (18 avril et 2 mai 2027), candidats déclarés, primaires en cours, sondages et règles utiles pour suivre la campagne.',
    heroEyebrow: 'Guide 2027',
    heroTitle: 'Présidentielle 2027 : ce qu’il faut savoir à la rentrée 2026',
    heroIntro:
      'Les dates sont fixées : premier tour le 18 avril 2027, second tour le 2 mai. Une vingtaine de candidatures sont déjà déclarées, de Marine Le Pen à Jean-Luc Mélenchon en passant par Édouard Philippe, Gabriel Attal et Bruno Retailleau, tandis que la gauche social-démocrate se départage dans une primaire en octobre.',
    queries: ['présidentielle 2027', 'élection présidentielle 2027', 'qui sera président en 2027', 'qui sera candidat 2027'],
    summary: [
      'Le décret du 1er juillet 2026 a fixé le premier tour au 18 avril 2027 et le second au 2 mai 2027.',
      'Plus de vingt personnalités sont officiellement candidates ; d’autres passent par une primaire ou cherchent encore leurs parrainages.',
      'Le mandat d’Emmanuel Macron s’achève le 13 mai 2027 et il ne peut pas se représenter.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    sections: [
      {
        title: 'Ce que l’on sait déjà sur 2027',
        paragraphs: [
          'Le calendrier est officiel depuis le Conseil des ministres du 1er juillet 2026 : les Français voteront les dimanches 18 avril et 2 mai 2027. Le paysage est exceptionnellement fragmenté, avec une trentaine de prétendants identifiés, bien au-delà des douze candidats de 2022.',
          'Plusieurs blocs sont désormais lisibles. À l’extrême droite, Marine Le Pen, redevenue éligible après l’arrêt d’appel du 7 juillet 2026, forme un ticket avec Jordan Bardella, et Éric Zemmour est candidat. Au centre et à droite, Édouard Philippe, Gabriel Attal, Bruno Retailleau, Xavier Bertrand et David Lisnard se disputent un même espace. À gauche, Jean-Luc Mélenchon, Fabien Roussel, François Ruffin et Bernard Cazeneuve sont déclarés, pendant que le PS, Place publique et la GRS désignent leur champion via la primaire « Choisir 2027 ».',
        ],
      },
      {
        title: 'Comment se faire une idée fiable de la course',
        paragraphs: [
          'Le bon réflexe consiste à croiser plusieurs éléments : le statut réel de chaque candidat, les sondages les plus récents, les thèmes sur lesquels il prend position, et sa capacité à réunir les 500 parrainages d’élus, indispensables pour figurer sur la liste officielle publiée par le Conseil constitutionnel courant mars 2027.',
          'Suivre 2027 ne consiste pas seulement à demander qui est en tête aujourd’hui. Il faut aussi regarder qui peut durer, qui peut élargir sa base, et qui peut transformer une visibilité médiatique en candidature réellement compétitive au premier tour.',
        ],
      },
      {
        title: 'Les prochaines étapes du calendrier',
        paragraphs: [
          'Octobre 2026 : primaire « Choisir 2027 » du PS, de Place publique et de la GRS (9-10 octobre, puis 16-17 octobre en cas de second tour) entre Olivier Faure, Raphaël Glucksmann, Jérôme Guedj, Emmanuel Maurel et Ségolène Royal. Décembre 2026 : référendum interne des Écologistes (10-13 décembre) sur le maintien de la candidature de Marine Tondelier.',
          'Début 2027 : décret de convocation des électeurs, collecte des parrainages, puis publication de la liste officielle des candidats par le Conseil constitutionnel. Avril 2027 : campagne officielle, premier tour le 18 avril, second tour le 2 mai. Le nouveau président entre en fonction au plus tard le 13 mai 2027.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Quand a lieu la présidentielle 2027 ?',
        answer:
          'Le premier tour se tient le dimanche 18 avril 2027 et le second tour le dimanche 2 mai 2027, selon le décret adopté en Conseil des ministres le 1er juillet 2026.',
      },
      {
        question: 'Qui est déjà candidat à la présidentielle 2027 ?',
        answer:
          'Parmi les candidats déclarés figurent Marine Le Pen, Édouard Philippe, Gabriel Attal, Bruno Retailleau, Jean-Luc Mélenchon, Éric Zemmour, Xavier Bertrand, David Lisnard, Fabien Roussel, François Ruffin, Bernard Cazeneuve, Karim Bouamrane, Delphine Batho, Nathalie Arthaud, Nicolas Dupont-Aignan, Florian Philippot et François Asselineau. Cinq autres se départagent dans la primaire socialiste d’octobre.',
      },
      {
        question: 'Où voir les sondages de la présidentielle 2027 ?',
        answer:
          'Les sondages doivent être lus institut par institut, scénario par scénario, avec attention à la date de terrain. Notre page sondages compare les enquêtes IFOP, Elabe, OpinionWay, Harris et Cluster17.',
      },
      {
        question: 'Peut-on déjà savoir qui gagnera en 2027 ?',
        answer:
          'Non. À sept mois du scrutin, les données permettent surtout d’identifier les candidats les plus solides, les blocs les plus structurés et les duels de second tour les plus probables, pas de désigner un vainqueur certain.',
      },
    ],
    relatedLinks: [
      { label: 'Liste complète des candidats', href: '/candidats-presidentielle-2027/' },
      { label: 'Voir les sondages 2027', href: '/polls/' },
      { label: 'Quand aura lieu la présidentielle 2027 ?', href: '/quand-aura-lieu-la-presidentielle-2027/' },
    ],
  },
  {
    slug: 'sondage-presidentielle-2027',
    title: 'Sondage présidentielle 2027 : intentions de vote, classement et dynamique',
    description:
      'Sondage présidentielle 2027 : ce que disent vraiment les intentions de vote, comment comparer les instituts et ce qu’on peut déjà déduire des scénarios testés.',
    heroEyebrow: 'Sondages 2027',
    heroTitle: 'Sondage présidentielle 2027 : ce que montrent vraiment les intentions de vote',
    heroIntro:
      'À la rentrée 2026, les sondages de premier tour placent Marine Le Pen nettement en tête (32 à 35 %), devant Jean-Luc Mélenchon et Édouard Philippe (14 à 17 %), puis Raphaël Glucksmann, Gabriel Attal et Bruno Retailleau. Au second tour, les duels testés face à Marine Le Pen sont serrés ou favorables au RN. Pour bien lire ces chiffres, il faut comparer les instituts, les dates de terrain et les scénarios testés.',
    queries: [
      'présidentielle 2027 sondage',
      'sondage présidentielle 2027',
      'intentions de vote 2027',
      'sondages présidentielle 2027 en direct',
      'classement candidats présidentielle 2027',
      'sondage IFOP présidentielle 2027',
      'qui va gagner présidentielle 2027',
      'probabilité victoire présidentielle 2027',
    ],
    summary: [
      'Marine Le Pen domine le premier tour dans toutes les enquêtes de septembre 2026 (Harris Interactive, Ipsos, OpinionWay, Elabe).',
      'La deuxième place se joue entre Jean-Luc Mélenchon et Édouard Philippe, avec Raphaël Glucksmann et Gabriel Attal en embuscade.',
      'Un sondage vaut surtout par sa date, son institut et la composition exacte de son scénario : comparez avant de conclure.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    pollSnapshot: true,
    sections: [
      {
        title: 'Où en sont les intentions de vote à la rentrée 2026 ?',
        paragraphs: [
          'Les enquêtes publiées début septembre 2026 convergent : Marine Le Pen, redevenue éligible et déclarée depuis le 7 juillet, recueille entre 32 et 35 % des intentions de vote au premier tour selon les scénarios. Jean-Luc Mélenchon (15 à 17 %) et Édouard Philippe (14 à 17 %) se disputent la qualification pour le second tour, devant Raphaël Glucksmann (9 à 13 %), Gabriel Attal (8 à 13 %) et Bruno Retailleau (6 à 10 %).',
          'Au second tour, les duels testés face à Marine Le Pen donnent des résultats serrés : Édouard Philippe est le mieux placé pour la battre, tandis que Gabriel Attal et Jean-Luc Mélenchon sont donnés perdants dans les dernières enquêtes. Le tableau ci-dessous reprend les derniers sondages publiés, avec leurs sources.',
        ],
      },
      {
        title: 'Ce que disent vraiment les sondages 2027',
        paragraphs: [
          'Une intention de vote ne mesure pas un résultat futur certain. Elle mesure une situation donnée, à une date donnée, dans un scénario précis. Changer un nom dans le tableau, modifier l’offre politique ou déplacer le terrain de quelques semaines suffit parfois à faire bouger l’ordre d’arrivée.',
          'La bonne question n’est donc pas seulement qui est premier. Il faut aussi regarder qui est régulièrement bien placé, qui plafonne, qui progresse selon les configurations, et quels candidats existent surtout dans un scénario particulier.',
        ],
      },
      {
        title: 'Comment comparer IFOP, Harris, OpinionWay, Elabe ou Cluster17',
        paragraphs: [
          'Chaque institut apporte sa propre photographie. Les différences peuvent venir de la méthode, de la date de terrain, du wording ou simplement du scénario testé. C’est pourquoi il faut comparer plusieurs études au lieu de transformer un seul sondage en verdict.',
          'Lorsqu’un nom revient en tête dans plusieurs enquêtes, ou lorsqu’un même bloc politique reste durablement haut quel que soit l’institut, on tient déjà une information plus robuste qu’un classement isolé publié un jour donné.',
        ],
      },
      {
        title: 'Peut-on déjà savoir qui va gagner ?',
        paragraphs: [
          'Non. À l’automne 2026, il est encore trop tôt pour confondre intentions de vote et résultat final. La primaire socialiste d’octobre, le référendum interne des Écologistes en décembre et la course aux parrainages peuvent encore modifier l’offre de premier tour.',
          'En revanche, les sondages permettent déjà d’identifier les candidats les plus visibles, les plus testés et les plus capables d’entrer dans une course crédible au premier tour.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Qui est en tête des sondages pour la présidentielle 2027 ?',
        answer:
          'Marine Le Pen, avec 32 à 35 % des intentions de vote de premier tour dans les enquêtes de septembre 2026, loin devant Jean-Luc Mélenchon et Édouard Philippe (14 à 17 %).',
      },
      {
        question: 'Qui peut battre Marine Le Pen au second tour ?',
        answer:
          'Dans les duels testés à l’été 2026, Édouard Philippe est le candidat le plus proche d’une victoire face à Marine Le Pen (46 à 49 % selon les instituts, contre 51 à 54 % pour elle), alors que Gabriel Attal (45 %) et Jean-Luc Mélenchon sont nettement distancés.',
      },
      {
        question: 'Où voir les derniers sondages présidentielle 2027 ?',
        answer:
          'Notre page sondages compile toutes les enquêtes publiées (Ifop, Ipsos, Elabe, OpinionWay, Harris Interactive, Odoxa, Cluster17…) avec leur lien source, leur date de terrain et leur échantillon, pour le premier comme pour le second tour.',
      },
      {
        question: 'Le site affiche-t-il une probabilité de victoire ?',
        answer:
          'Pas sous la forme d’une prédiction fermée. Une campagne aussi ouverte se lit mieux par tendances, hiérarchie de candidats et répétition des scénarios que par promesse de certitude.',
      },
      {
        question: 'Les sondages sont-ils mis à jour automatiquement ?',
        answer:
          'Oui. Les données sont stockées en base puis relues par le front pour garder un affichage rapide, stable et facile à comparer dans le temps.',
      },
    ],
    relatedLinks: [
      { label: 'Ouvrir la page sondages', href: '/polls/' },
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Retour au guide présidentielle 2027', href: '/presidentielle-2027/' },
    ],
  },
  {
    slug: 'candidats-presidentielle-2027',
    title: 'Candidats présidentielle 2027 : liste complète, partis et statuts',
    description:
      'Liste des candidats à la présidentielle 2027 mise à jour : candidats déclarés, primaires en cours, candidatures pressenties et renoncements, avec parti, date de déclaration et fiche détaillée.',
    heroEyebrow: 'Candidats',
    heroTitle: 'Candidats présidentielle 2027 : la liste complète et à jour',
    heroIntro:
      'Plus de vingt personnalités sont officiellement candidates à l’élection des 18 avril et 2 mai 2027, cinq autres se départagent dans la primaire socialiste « Choisir 2027 », et quelques prétendants cherchent encore leurs parrainages. Le tableau ci-dessous distingue les candidatures déclarées, conditionnelles et abandonnées.',
    queries: [
      'candidats présidentielle 2027',
      'liste des candidats à la présidentielle 2027',
      'candidats déclarés 2027',
      'combien de candidats présidentielle 2027',
      'qui peut se présenter en 2027',
    ],
    summary: [
      'Tous les noms cités pour 2027 n’ont pas le même statut : déclaré, en primaire, pressenti ou retiré.',
      'Pour figurer sur la liste officielle, chaque candidat devra réunir 500 parrainages d’élus début 2027.',
      'Le tableau et les fiches sont mis à jour à chaque déclaration ou retrait de candidature.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    candidateTable: true,
    sections: [
      {
        title: 'Les candidats déclarés bloc par bloc',
        paragraphs: [
          'Extrême droite et souverainistes : Marine Le Pen (RN, déclarée le 7 juillet 2026 en ticket avec Jordan Bardella), Éric Zemmour (Reconquête, 17 septembre 2026), Nicolas Dupont-Aignan (DLF), Florian Philippot (Les Patriotes) et François Asselineau (UPR). Droite et centre : Édouard Philippe (Horizons, soutenu par Gérald Darmanin), Gabriel Attal (Renaissance, 22 mai 2026), Bruno Retailleau (désigné par LR le 19 avril 2026), Xavier Bertrand (Nous France, 26 août 2026) et David Lisnard (Nouvelle Énergie, 31 mars 2026).',
          'Gauche : Jean-Luc Mélenchon (LFI, 3 mai 2026), Fabien Roussel (PCF, 6 septembre 2026), François Ruffin (Debout !), Bernard Cazeneuve (La Convention, 16 juillet 2026), Karim Bouamrane (PS, 9 juin 2026), Delphine Batho (Génération Écologie) et Nathalie Arthaud (Lutte ouvrière). Marine Tondelier (Les Écologistes) maintient provisoirement sa candidature, soumise à un référendum interne du 10 au 13 décembre 2026.',
        ],
      },
      {
        title: 'Les primaires et les candidatures encore ouvertes',
        paragraphs: [
          'La primaire « Choisir 2027 », organisée par le PS, Place publique et la Gauche républicaine et socialiste, oppose Olivier Faure, Raphaël Glucksmann, Jérôme Guedj, Emmanuel Maurel et Ségolène Royal. Premier tour les 9 et 10 octobre 2026, second tour les 16 et 17 octobre. La primaire de la gauche unitaire prévue le 11 octobre a été abandonnée de fait après le vote des adhérents PS du 9 juillet 2026.',
          'Parmi les candidatures pressenties : Dominique de Villepin (La France humaniste) cherche ses parrainages ; François Hollande doit se prononcer en décembre ; Bruno Le Maire et Élisabeth Borne réfléchissent. À l’inverse, Gérald Darmanin (rallié à Édouard Philippe), Sarah Knafo (soutien d’Éric Zemmour), Clémentine Autain et Benjamin Lucas ont renoncé, et Jordan Bardella n’est pas candidat.',
        ],
      },
      {
        title: 'Comment reconnaître une candidature crédible',
        paragraphs: [
          'Une candidature crédible ne repose pas seulement sur la notoriété. Elle suppose une capacité d’organisation, des relais territoriaux, des prises de position cohérentes et, surtout, l’obtention des 500 présentations d’élus issus d’au moins 30 départements ou collectivités.',
          'En 2022, douze candidats seulement figuraient sur la liste officielle. Avec une trentaine de prétendants identifiés pour 2027, la course aux parrainages du début 2027 fera le tri.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Combien de candidats à la présidentielle 2027 ?',
        answer:
          'Au 22 septembre 2026, plus de vingt personnalités sont officiellement déclarées et cinq autres concourent dans la primaire socialiste. La liste définitive, fixée par le Conseil constitutionnel courant mars 2027 après vérification des 500 parrainages, sera nettement plus courte : douze candidats en 2022, seize au maximum en 2002.',
      },
      {
        question: 'Marine Le Pen est-elle candidate en 2027 ?',
        answer:
          'Oui. Condamnée en appel le 7 juillet 2026 à 45 mois d’inéligibilité dont 30 avec sursis, elle avait déjà purgé la partie ferme depuis le jugement de 2025 : elle est éligible et s’est déclarée le soir même, en ticket avec Jordan Bardella pour Matignon.',
      },
      {
        question: 'Jordan Bardella est-il candidat ?',
        answer:
          'Non. Il devait remplacer Marine Le Pen si son inéligibilité était confirmée en appel. Elle étant éligible, il n’est pas candidat et est présenté comme son futur Premier ministre.',
      },
      {
        question: 'Comment savoir qui est officiellement candidat ?',
        answer:
          'Jusqu’en mars 2027, « candidat » signifie candidat déclaré. Seule la liste publiée par le Conseil constitutionnel après validation des parrainages fait foi. Nos fiches précisent pour chacun le statut, la date de déclaration et les sources.',
      },
    ],
    relatedLinks: [
      { label: 'Primaires de la gauche 2027', href: '/primaire-gauche-presidentielle-2027/' },
      { label: 'Qui peut se présenter en 2027 ?', href: '/qui-peut-se-presenter-en-2027/' },
      { label: 'Voir les sondages', href: '/polls/' },
    ],
  },
  {
    slug: 'quand-aura-lieu-la-presidentielle-2027',
    title: 'Quand aura lieu la présidentielle 2027 ? Dates officielles des deux tours',
    description:
      'Présidentielle 2027 : premier tour le dimanche 18 avril 2027, second tour le dimanche 2 mai 2027. Dates fixées par décret le 1er juillet 2026, calendrier des parrainages et fin du mandat Macron.',
    heroEyebrow: 'Calendrier',
    heroTitle: 'Quand aura lieu la présidentielle 2027 ?',
    heroIntro:
      'La réponse est officielle depuis le 1er juillet 2026 : le premier tour de l’élection présidentielle se tiendra le dimanche 18 avril 2027 et le second tour le dimanche 2 mai 2027. Le mandat d’Emmanuel Macron s’achève le 13 mai 2027 à minuit.',
    queries: ['quand aura lieu la présidentielle 2027', 'date élections présidentielles 2027', 'date présidentielle 2027 premier tour'],
    summary: [
      'Premier tour : dimanche 18 avril 2027.',
      'Second tour : dimanche 2 mai 2027, quatorze jours plus tard.',
      'Dates fixées par décret en Conseil des ministres le 1er juillet 2026 ; fin du mandat le 13 mai 2027.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    sections: [
      {
        title: 'Les dates officielles',
        paragraphs: [
          'Le gouvernement a adopté le 1er juillet 2026 le décret fixant les dates de l’élection présidentielle : premier tour le dimanche 18 avril 2027, second tour le dimanche 2 mai 2027. Ce calendrier respecte la Constitution, qui impose que l’élection ait lieu entre vingt et trente-cinq jours avant l’expiration du mandat en cours.',
          'Emmanuel Macron, élu en mai 2017 et réélu en avril 2022, achève son second mandat le 13 mai 2027 à minuit. Son successeur prendra ses fonctions au plus tard à cette date.',
        ],
      },
      {
        title: 'Le calendrier avant le vote',
        paragraphs: [
          'Début 2027, le décret de convocation des électeurs ouvrira la période de collecte des 500 parrainages d’élus. Le Conseil constitutionnel publiera ensuite la liste officielle des candidats, attendue vers la mi-mars 2027, puis la campagne officielle s’ouvrira début avril avec l’égalité stricte des temps de parole.',
          'D’ici là, plusieurs échéances structurent la pré-campagne : primaire socialiste « Choisir 2027 » les 9-10 et 16-17 octobre 2026, référendum interne des Écologistes du 10 au 13 décembre 2026 et décisions attendues de plusieurs prétendants, dont François Hollande en décembre.',
        ],
      },
      {
        title: 'Où et comment voter',
        paragraphs: [
          'Le vote se déroule dans le bureau de vote de la commune d’inscription. Pour voter au premier tour, il faut être inscrit sur les listes électorales ; l’inscription en ligne reste possible jusqu’au sixième mercredi précédant le scrutin. Les Français de l’étranger votent dans les consulats.',
          'Le vote par procuration est ouvert à tout électeur, avec une démarche possible en ligne. Les horaires sont fixés par préfecture, généralement de 8 h à 19 h, jusqu’à 20 h dans les grandes villes.',
        ],
      },
    ],
    faqs: [
      {
        question: 'La date du premier tour 2027 est-elle officielle ?',
        answer:
          'Oui. Le décret adopté en Conseil des ministres le 1er juillet 2026 fixe le premier tour au dimanche 18 avril 2027 et le second tour au dimanche 2 mai 2027.',
      },
      {
        question: 'Combien de temps sépare les deux tours ?',
        answer: 'Quatorze jours : le second tour a lieu le deuxième dimanche suivant le premier tour.',
      },
      {
        question: 'Quand se termine le mandat d’Emmanuel Macron ?',
        answer:
          'Le 13 mai 2027 à minuit. Il ne peut pas se représenter, l’article 6 de la Constitution interdisant plus de deux mandats consécutifs.',
      },
      {
        question: 'Jusqu’à quand peut-on s’inscrire sur les listes électorales ?',
        answer:
          'En règle générale jusqu’au sixième vendredi précédant le premier tour, soit début mars 2027 pour une inscription en ligne. Les dates précises seront confirmées par le décret de convocation des électeurs.',
      },
    ],
    relatedLinks: [
      { label: 'Comment se déroule l’élection présidentielle', href: '/comment-se-deroule-election-presidentielle/' },
      { label: 'Liste des candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Retour au guide 2027', href: '/presidentielle-2027/' },
    ],
  },
  {
    slug: 'qui-peut-se-presenter-en-2027',
    title: 'Qui peut se présenter en 2027 ? Conditions pour être candidat à la présidentielle',
    description:
      'Qui peut se présenter en 2027 ? Conditions légales de candidature, rôle décisif des 500 parrainages et cas particuliers comme l’éligibilité de Marine Le Pen.',
    heroEyebrow: 'Règles',
    heroTitle: 'Qui peut se présenter en 2027 ?',
    heroIntro:
      'En théorie, tout citoyen français remplissant les conditions légales peut briguer l’Élysée. En pratique, la vraie barrière est politique : il faut aussi obtenir 500 présentations d’élus avant la mi-mars 2027. Avec une trentaine de prétendants, ce filtre sera décisif.',
    queries: ['qui peut se présenter en 2027', 'conditions candidature présidentielle 2027', '500 parrainages présidentielle 2027'],
    summary: [
      'Être connu ne suffit pas pour devenir candidat à la présidentielle.',
      'Il faut remplir les conditions légales de base et obtenir 500 présentations d’élus issus de 30 départements.',
      'Une condamnation à l’inéligibilité empêche de se présenter tant que la peine ferme n’est pas purgée.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    sections: [
      {
        title: 'La réponse courte',
        paragraphs: [
          'Peut se présenter à l’élection présidentielle un citoyen français âgé d’au moins 18 ans, inscrit sur les listes électorales, jouissant de ses droits civiques et n’étant pas frappé d’inéligibilité.',
          'Le point décisif, en pratique, est l’obtention de 500 présentations d’élus (maires, parlementaires, conseillers régionaux et départementaux, etc.) provenant d’au moins 30 départements ou collectivités d’outre-mer, sans qu’un même département dépasse un dixième du total.',
        ],
      },
      {
        title: 'Le cas de l’inéligibilité : l’exemple Marine Le Pen',
        paragraphs: [
          'Une peine d’inéligibilité interdit de se présenter pendant sa durée. Marine Le Pen, condamnée en première instance en mars 2025 à cinq ans d’inéligibilité avec exécution provisoire, a vu la cour d’appel ramener cette peine, le 7 juillet 2026, à 45 mois dont 30 avec sursis : la partie ferme, décomptée depuis 2025, était purgée fin juin 2026.',
          'Elle est donc éligible pour 2027 malgré une condamnation à trois ans de prison dont un ferme sous bracelet électronique, et malgré son pourvoi en cassation. Le cas illustre que c’est la peine d’inéligibilité, et non la condamnation pénale en elle-même, qui conditionne le droit à se présenter.',
        ],
      },
      {
        title: 'Pourquoi tout le monde ne peut pas réellement aller au bout',
        paragraphs: [
          'Une notoriété médiatique, un bon sondage ou une forte présence sur les réseaux ne suffisent pas. Pour devenir un candidat réel, il faut une organisation, des relais territoriaux et la capacité de convaincre des élus de parrainer la candidature. Florian Philippot et François Asselineau, par exemple, n’avaient pas réuni les 500 signatures en 2022.',
          'C’est pour cela qu’il existe toujours un écart entre les personnalités dont on parle beaucoup et celles qui ont une chance concrète d’être officiellement sur la ligne de départ en avril 2027.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Faut-il 500 parrainages pour être candidat ?',
        answer:
          'Oui. L’obtention de 500 présentations d’élus issus d’au moins 30 départements constitue la condition la plus déterminante pour transformer une ambition en candidature effective.',
      },
      {
        question: 'Quel âge faut-il avoir pour se présenter ?',
        answer: 'Au moins 18 ans le jour du scrutin, comme pour toute élection nationale depuis 2011.',
      },
      {
        question: 'Une personne condamnée peut-elle se présenter ?',
        answer:
          'Oui, sauf si elle est frappée d’une peine d’inéligibilité en cours d’exécution. C’est ce qui explique que Marine Le Pen soit éligible en 2027 malgré sa condamnation en appel.',
      },
      {
        question: 'Quels profils ont vraiment une chance de compter en 2027 ?',
        answer:
          'Ce sont généralement ceux qui combinent notoriété nationale, appareil politique, relais territoriaux et capacité à exister durablement dans les sondages et le débat public.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Marine Le Pen 2027', href: '/le-pen-2027/' },
      { label: 'Comprendre le scrutin', href: '/comment-se-deroule-election-presidentielle/' },
    ],
  },
  {
    slug: 'macron-peut-il-se-representer-en-2027',
    title: 'Macron peut-il se représenter en 2027 ? Troisième mandat, 2032, démission : réponses',
    description:
      'Macron peut-il se représenter en 2027 ? Non : l’article 6 de la Constitution interdit plus de deux mandats consécutifs. Réponses claires sur un troisième mandat, une candidature en 2032, une démission ou une guerre.',
    heroEyebrow: 'Constitution',
    heroTitle: 'Macron peut-il se représenter en 2027 ?',
    heroIntro:
      'La réponse courte est non. En l’état de l’article 6 de la Constitution, Emmanuel Macron, élu en 2017 et réélu en 2022, ne peut pas exercer un troisième mandat consécutif. Son mandat s’achève le 13 mai 2027 et il ne figurera pas sur les bulletins des 18 avril et 2 mai 2027.',
    queries: [
      'macron peut-il se représenter en 2027',
      'macron peut-il faire 3 mandats',
      'macron peut-il se représenter en 2032',
      'si macron démissionne peut-il se représenter',
      'macron 2027',
    ],
    summary: [
      'L’article 6 de la Constitution limite l’exercice à deux mandats consécutifs depuis la révision de 2008.',
      'Emmanuel Macron a déjà été élu en 2017 puis en 2022 : il ne peut pas être candidat en 2027.',
      'Rien ne lui interdit en revanche de se représenter en 2032, après une interruption.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    sections: [
      {
        title: 'La réponse juridique',
        paragraphs: [
          'L’article 6 de la Constitution, dans sa rédaction issue de la révision du 23 juillet 2008, dispose que « nul ne peut exercer plus de deux mandats consécutifs ». Emmanuel Macron ayant été élu une première fois en 2017 puis réélu en 2022, une candidature en 2027 reviendrait à briguer un troisième mandat consécutif, ce que le texte interdit.',
          'Ce point ne relève pas d’une interprétation politique flottante. C’est une conséquence directe du droit constitutionnel en vigueur, et le Conseil constitutionnel, qui contrôle les candidatures, ne pourrait pas enregistrer la sienne.',
        ],
      },
      {
        title: 'Trois mandats, 2032, démission : les cas particuliers',
        paragraphs: [
          'La limite ne porte que sur les mandats consécutifs. Emmanuel Macron pourrait donc légalement se présenter en 2032, ou lors de toute élection ultérieure, après avoir quitté l’Élysée en 2027. Trois mandats au total sont possibles, à condition qu’ils ne s’enchaînent pas.',
          'Une démission ne changerait rien : une élection anticipée organisée avant la fin de son second mandat reviendrait toujours à solliciter un troisième mandat consécutif. Selon la lecture dominante des constitutionnalistes, il ne pourrait pas y être candidat. Quant à l’hypothèse d’une guerre, la Constitution ne prévoit aucune prolongation automatique du mandat présidentiel : l’article 16 confère des pouvoirs exceptionnels mais ne modifie pas la durée du mandat, et seule une révision constitutionnelle pourrait décaler l’échéance.',
        ],
      },
      {
        title: 'Pourquoi la question reste centrale malgré tout',
        paragraphs: [
          'Même sans candidature possible, Emmanuel Macron continue de peser sur 2027 par la question de sa succession. Son ancien Premier ministre Gabriel Attal est candidat depuis le 22 mai 2026, tout comme Édouard Philippe, en rupture avec lui depuis 2024 et rallié par Gérald Darmanin.',
          'Demander si Macron peut se représenter revient souvent, en réalité, à demander qui héritera du bloc central, qui s’en démarquera et comment cette succession redessinera le premier tour du 18 avril 2027.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Emmanuel Macron peut-il faire un troisième mandat ?',
        answer:
          'Pas de manière consécutive. L’article 6 de la Constitution interdit plus de deux mandats consécutifs ; un troisième mandat ne serait possible qu’après une interruption, donc au plus tôt en 2032.',
      },
      {
        question: 'Macron peut-il se représenter en 2032 ?',
        answer:
          'Oui, juridiquement. La limite constitutionnelle ne vise que les mandats consécutifs. Rien n’interdit à un ancien président de se représenter après avoir quitté ses fonctions pendant au moins un mandat.',
      },
      {
        question: 'Si Macron démissionne, peut-il se représenter en 2027 ?',
        answer:
          'Non, selon la lecture dominante. Une élection anticipée provoquée par sa démission viserait toujours à lui confier un troisième mandat consécutif, ce que l’article 6 interdit. La démission n’efface pas les mandats déjà exercés.',
      },
      {
        question: 'Macron peut-il rester président en cas de guerre ?',
        answer:
          'La Constitution ne prévoit aucune prolongation automatique du mandat en cas de guerre. L’article 16 donne des pouvoirs exceptionnels au président mais ne modifie pas la durée de son mandat. Seule une révision constitutionnelle pourrait repousser l’élection.',
      },
      {
        question: 'Quand se termine le mandat d’Emmanuel Macron ?',
        answer: 'Le 13 mai 2027 à minuit. L’élection de son successeur a lieu les 18 avril et 2 mai 2027.',
      },
      {
        question: 'Qui peut occuper cet espace politique en 2027 ?',
        answer:
          'Gabriel Attal (Renaissance) et Édouard Philippe (Horizons) sont tous deux candidats déclarés et se disputent l’héritage du bloc central, face à Bruno Retailleau à droite.',
      },
    ],
    relatedLinks: [
      { label: 'Gabriel Attal 2027', href: '/attal-president-2027/' },
      { label: 'Édouard Philippe 2027', href: '/edouard-philippe-2027/' },
      { label: 'Quand aura lieu la présidentielle 2027 ?', href: '/quand-aura-lieu-la-presidentielle-2027/' },
    ],
  },
  {
    slug: 'comment-se-deroule-election-presidentielle',
    title: 'Comment se déroule l’élection présidentielle ? Règles, tours et qualification',
    description:
      'Comment se déroule l’élection présidentielle française ? Deux tours (18 avril et 2 mai 2027), parrainages, qualification, majorité absolue et logique du scrutin expliqués simplement.',
    heroEyebrow: 'Mode d’emploi',
    heroTitle: 'Comment se déroule l’élection présidentielle ?',
    heroIntro:
      'L’élection présidentielle française se déroule en deux tours : tous les candidats qualifiés au premier, puis les deux premiers au second si personne n’obtient la majorité absolue dès le départ. En 2027, les Français votent le 18 avril puis le 2 mai.',
    queries: ['comment se déroule l’élection présidentielle', 'règles élection présidentielle france', 'déroulement présidentielle 2027'],
    summary: [
      'Le scrutin se joue en deux tours, à quatorze jours d’intervalle.',
      'Les deux premiers du premier tour se qualifient pour le second.',
      'Le vainqueur du second tour devient président de la République pour cinq ans.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    sections: [
      {
        title: 'Avant le vote : parrainages et liste officielle',
        paragraphs: [
          'Pour être candidat, il faut réunir 500 présentations d’élus issus d’au moins 30 départements, transmises au Conseil constitutionnel, qui publie la liste officielle des candidats environ un mois avant le premier tour. La campagne officielle s’ouvre ensuite, avec égalité stricte des temps de parole dans les médias audiovisuels.',
          'En 2022, douze candidats figuraient sur cette liste ; pour 2027, une trentaine de prétendants sont identifiés à la rentrée 2026, ce qui rend la course aux parrainages particulièrement sélective.',
        ],
      },
      {
        title: 'Le premier tour',
        paragraphs: [
          'Au premier tour, tous les candidats officiellement qualifiés sont en compétition. Si l’un d’entre eux recueille la majorité absolue des suffrages exprimés, il est élu immédiatement.',
          'Dans les faits, ce cas ne s’est jamais produit sous la Ve République. Le premier tour sert donc surtout à sélectionner les deux finalistes et à mesurer le poids réel de chaque bloc politique.',
        ],
      },
      {
        title: 'Pourquoi le second tour change tout',
        paragraphs: [
          'Une fois les deux finalistes connus, l’élection devient un duel. Les électeurs des candidats éliminés doivent alors arbitrer, se reporter, s’abstenir ou voter blanc, ce qui modifie fortement la logique du scrutin.',
          'C’est pour cela que la lecture de 2027 ne peut pas s’arrêter au premier tour : il faut aussi regarder les réserves de voix, les compatibilités politiques et les rejets réciproques.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Combien y a-t-il de tours à l’élection présidentielle ?',
        answer: 'Deux, sauf si un candidat obtient dès le premier tour la majorité absolue des suffrages exprimés, ce qui n’est jamais arrivé.',
      },
      {
        question: 'Qui se qualifie pour le second tour ?',
        answer: 'Les deux candidats arrivés en tête au premier tour se qualifient pour le second.',
      },
      {
        question: 'Quelles sont les dates des deux tours en 2027 ?',
        answer: 'Premier tour le dimanche 18 avril 2027, second tour le dimanche 2 mai 2027.',
      },
      {
        question: 'Pourquoi les reports de voix comptent-ils autant ?',
        answer: 'Parce qu’entre les deux tours, les électorats des candidats éliminés deviennent décisifs pour faire basculer l’élection.',
      },
    ],
    relatedLinks: [
      { label: 'Quand aura lieu la présidentielle 2027', href: '/quand-aura-lieu-la-presidentielle-2027/' },
      { label: 'Qui peut se présenter en 2027 ?', href: '/qui-peut-se-presenter-en-2027/' },
      { label: 'Voir les sondages 2027', href: '/polls/' },
    ],
  },
  {
    slug: 'primaire-gauche-presidentielle-2027',
    title: 'Primaire de la gauche 2027 : « Choisir 2027 », candidats, dates et résultats',
    description:
      'Primaire de la gauche pour la présidentielle 2027 : dates de « Choisir 2027 » (9-10 et 16-17 octobre 2026), candidats Faure, Glucksmann, Guedj, Maurel et Royal, abandon de la primaire unitaire et situation de Tondelier, Ruffin et Mélenchon.',
    heroEyebrow: 'Primaires',
    heroTitle: 'Primaire de la gauche 2027 : qui, quand, comment ?',
    heroIntro:
      'La gauche arrive divisée à la présidentielle 2027. La primaire unitaire du 11 octobre est enterrée ; à sa place, le PS, Place publique et la GRS organisent « Choisir 2027 », une primaire fermée à cinq candidats les 9-10 et 16-17 octobre 2026. Jean-Luc Mélenchon, Fabien Roussel, François Ruffin et Bernard Cazeneuve sont candidats en dehors.',
    queries: ['primaire gauche 2027', 'primaire ps 2027', 'choisir 2027 primaire', 'primaire présidentielle 2027 candidats', 'résultat primaire gauche 2027'],
    summary: [
      '« Choisir 2027 » : premier tour les 9-10 octobre 2026, second tour les 16-17 octobre, entre Faure, Glucksmann, Guedj, Maurel et Royal.',
      'La primaire de la gauche unitaire prévue le 11 octobre a été abandonnée de fait après le vote des adhérents PS du 9 juillet 2026.',
      'Mélenchon, Roussel, Ruffin, Cazeneuve et Bouamrane sont candidats hors primaire ; Tondelier attend un référendum interne en décembre.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    sections: [
      {
        title: '« Choisir 2027 » : la primaire du PS, de Place publique et de la GRS',
        paragraphs: [
          'Le premier tour se déroule les 9 et 10 octobre 2026, le second, si aucun candidat n’obtient la majorité, les 16 et 17 octobre. Peuvent voter les adhérents des partis organisateurs et les sympathisants inscrits sur la plateforme commune contre une participation de 15 euros (10 euros à tarif réduit), jusqu’à trois jours avant le scrutin.',
          'Cinq candidats sont en lice : Ségolène Royal (déclarée le 10 juillet 2026), Raphaël Glucksmann et Jérôme Guedj (23 août), Olivier Faure (30 août) et Emmanuel Maurel (4 septembre). Des débats télévisés sont programmés le 23 septembre sur LCI, le 1er octobre sur France 2 et France Inter, puis sur BFMTV début octobre.',
        ],
      },
      {
        title: 'Pourquoi la primaire unitaire a échoué',
        paragraphs: [
          'Lancée le 15 novembre 2025 par Marine Tondelier, Olivier Faure, François Ruffin et Clémentine Autain, la primaire de la gauche unitaire devait désigner le 11 octobre 2026 un candidat commun de la gauche non mélenchoniste. Jean-Luc Mélenchon et, dans un premier temps, Raphaël Glucksmann avaient refusé d’y participer.',
          'Le processus s’est effondré à l’été 2026 : retrait de Benjamin Lucas le 7 juillet, puis de Clémentine Autain le 11 juillet, et surtout vote des adhérents socialistes, le 9 juillet, à 55,5 % en faveur d’une primaire réservée à l’arc social-démocrate. Marine Tondelier et François Ruffin, écartés, dénoncent le « choix tragique » du PS et la position de Raphaël Glucksmann.',
        ],
      },
      {
        title: 'Les candidats de gauche hors primaire',
        paragraphs: [
          'Jean-Luc Mélenchon (LFI) a officialisé le 3 mai 2026 sa quatrième candidature. Fabien Roussel (PCF) a été investi le 6 septembre 2026. François Ruffin (Debout !) maintient sa candidature tout en se disant « toujours prêt » à rejoindre la primaire socialiste. Bernard Cazeneuve (La Convention) et Karim Bouamrane (PS, maire de Saint-Ouen) sont candidats sans passer par « Choisir 2027 ».',
          'Chez les Écologistes, la candidature de Marine Tondelier est maintenue provisoirement ; un référendum interne des adhérents, du 10 au 13 décembre 2026, tranchera entre candidature autonome et retrait au profit d’un autre candidat. Delphine Batho (Génération Écologie) et Nathalie Arthaud (Lutte ouvrière) complètent l’offre à gauche.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Quand a lieu la primaire de la gauche 2027 ?',
        answer:
          'La primaire « Choisir 2027 » du PS, de Place publique et de la GRS se tient les 9 et 10 octobre 2026 pour le premier tour, puis les 16 et 17 octobre pour le second tour éventuel.',
      },
      {
        question: 'Qui sont les candidats à la primaire « Choisir 2027 » ?',
        answer: 'Olivier Faure, Raphaël Glucksmann, Jérôme Guedj, Emmanuel Maurel et Ségolène Royal.',
      },
      {
        question: 'Mélenchon participe-t-il à la primaire ?',
        answer:
          'Non. Jean-Luc Mélenchon a toujours refusé toute primaire et a officialisé sa propre candidature le 3 mai 2026.',
      },
      {
        question: 'Marine Tondelier est-elle candidate ?',
        answer:
          'Sa candidature est maintenue provisoirement par les Écologistes, mais elle est exclue de « Choisir 2027 ». Un référendum interne des adhérents, du 10 au 13 décembre 2026, décidera de son maintien ou de son retrait.',
      },
      {
        question: 'Qui peut voter à la primaire « Choisir 2027 » ?',
        answer:
          'Les adhérents des partis organisateurs et les sympathisants qui s’inscrivent sur la plateforme commune en versant 15 euros (10 euros à tarif réduit), jusqu’à trois jours avant le vote.',
      },
    ],
    relatedLinks: [
      { label: 'Raphaël Glucksmann 2027', href: '/glucksmann-2027/' },
      { label: 'Jean-Luc Mélenchon 2027', href: '/melenchon-2027/' },
      { label: 'Liste des candidats 2027', href: '/candidats-presidentielle-2027/' },
    ],
  },
  {
    slug: 'simulateur-presidentielle-2027',
    title: 'Simulateur présidentielle 2027 : comparer les candidats et les scénarios',
    description:
      'Simulateur présidentielle 2027 : ce qu’on peut vraiment comparer aujourd’hui entre candidats, scénarios de sondages et blocs politiques.',
    heroEyebrow: 'Comparaison',
    heroTitle: 'Simulateur présidentielle 2027 : ce qu’on peut comparer sérieusement',
    heroIntro:
      'Il n’existe pas encore de simulateur crédible capable de prédire 2027 avec certitude. En revanche, on peut déjà comparer les scénarios de premier tour, les candidats testés et les grands équilibres politiques.',
    queries: ['simulateur présidentielle 2027', 'comparateur présidentielle 2027'],
    summary: [
      'Le plus utile aujourd’hui est de comparer les scénarios, pas de promettre une prédiction définitive.',
      'Les intentions de vote permettent de lire les rapports de force par candidat et par bloc.',
      'Un bon comparateur montre les écarts, les variantes de scénario et les dynamiques, pas un faux verdict figé.',
    ],
    updatedAt: LAST_EDITORIAL_UPDATE,
    sections: [
      {
        title: 'Ce qu’un simulateur peut vraiment montrer à l’automne 2026',
        paragraphs: [
          'À ce stade, un outil sérieux ne peut pas dire qui sera élu en 2027. En revanche, il peut comparer les candidats présents dans les sondages, observer comment un scénario change quand un nom entre ou sort (Le Pen ou Bardella, Philippe ou Attal, Glucksmann ou Faure), et mesurer quels blocs restent les plus solides.',
          'C’est déjà beaucoup : cela permet de voir qui pèse réellement, qui n’existe que dans certains cas de figure et quels duels deviennent crédibles selon les configurations testées.',
        ],
      },
      {
        title: 'Ce qu’il ne faut pas promettre',
        paragraphs: [
          'Un simulateur honnête ne doit pas transformer des données encore incomplètes en prophétie. La primaire socialiste d’octobre et la course aux parrainages de début 2027 modifieront encore l’offre, et la campagne réelle changera les rapports de force.',
          'La bonne approche consiste donc à comparer, hiérarchiser et observer les tendances, plutôt qu’à faire croire qu’un algorithme sait déjà qui gagnera la présidentielle 2027.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Existe-t-il déjà un simulateur fiable de second tour pour 2027 ?',
        answer:
          'Pas au sens d’un outil capable de prédire sérieusement l’issue finale. En revanche, les scénarios de sondages permettent déjà de comparer plusieurs configurations de premier tour et d’anticiper certains équilibres.',
      },
      {
        question: 'Par quoi faut-il commencer pour comparer les candidats ?',
        answer:
          'Le plus utile est de partir des intentions de vote, puis de regarder le statut réel du candidat, son bloc politique et sa capacité à exister au-delà d’un simple test de sondage.',
      },
      {
        question: 'À quoi sert alors cette page ?',
        answer:
          'Elle sert à répondre à la vraie question derrière le mot simulateur : quels candidats comparer, quels scénarios regarder et quelles limites garder en tête avant de tirer des conclusions trop tôt.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les sondages', href: '/polls/' },
      { label: 'Voir les candidats', href: '/candidats-presidentielle-2027/' },
      { label: 'Guide présidentielle 2027', href: '/presidentielle-2027/' },
    ],
  },
  candidatePage({
    slug: 'le-pen-2027',
    title: 'Le Pen 2027 : candidate déclarée, verdict d’appel, éligibilité et sondages',
    description:
      'Marine Le Pen est candidate à la présidentielle 2027 : déclarée le 7 juillet 2026 après l’arrêt d’appel qui la rend éligible, en ticket avec Jordan Bardella. Peine, pourvoi en cassation et place dans les sondages.',
    heroTitle: 'Le Pen 2027 : éligible, déclarée, en ticket avec Bardella',
    heroIntro:
      'Le 7 juillet 2026, la cour d’appel de Paris a ramené la peine d’inéligibilité de Marine Le Pen à 45 mois dont 30 avec sursis : la partie ferme, exécutée depuis 2025, était déjà purgée. Le soir même, elle s’est déclarée candidate au 20H de TF1, en présentant Jordan Bardella comme futur Premier ministre.',
    queries: ['le pen 2027', 'marine le pen 2027', 'marine le pen candidate 2027', 'marine le pen éligible', 'verdict le pen appel'],
    summary: [
      'Candidate déclarée depuis le 7 juillet 2026, elle est éligible pour les 18 avril et 2 mai 2027.',
      'Condamnée en appel à trois ans de prison dont un ferme sous bracelet électronique et 100 000 euros d’amende, elle se pourvoit en cassation.',
      'Le ticket Le Pen-Bardella structure toute la lecture du bloc national.',
    ],
    candidatePath: '/candidats/marine-le-pen',
    sections: [
      {
        title: 'Ce qu’a décidé la cour d’appel',
        paragraphs: [
          'En première instance, le 31 mars 2025, le tribunal correctionnel de Paris avait prononcé cinq ans d’inéligibilité avec exécution provisoire dans l’affaire des assistants parlementaires européens du FN, ce qui excluait de fait Marine Le Pen de 2027. Le procès en appel s’est tenu de janvier à février 2026.',
          'Le 7 juillet 2026, la cour d’appel l’a condamnée à trois ans de prison dont deux avec sursis (la partie ferme sous bracelet électronique), 100 000 euros d’amende et 45 mois d’inéligibilité dont 30 avec sursis. Les 15 mois fermes, décomptés depuis mars 2025, avaient expiré le 30 juin 2026 : elle est donc éligible, tout en ayant annoncé un pourvoi en cassation.',
        ],
      },
      {
        title: 'Ce que change sa candidature',
        paragraphs: [
          'Sa présence réorganise immédiatement le premier tour. Jordan Bardella, longtemps préparé comme remplaçant avec un passage de relais envisagé dès septembre 2026, n’est plus candidat et devient le volet Matignon d’un « ticket » assumé.',
          'À l’extrême droite, elle affronte Éric Zemmour, candidat depuis le 17 septembre 2026, ainsi que les souverainistes Nicolas Dupont-Aignan et Florian Philippot. Face à elle, le centre et la droite arrivent divisés entre Édouard Philippe, Gabriel Attal, Bruno Retailleau, Xavier Bertrand et David Lisnard.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Marine Le Pen est-elle candidate à la présidentielle 2027 ?',
        answer:
          'Oui. Elle a annoncé sa candidature le 7 juillet 2026 au 20H de TF1, quelques heures après l’arrêt de la cour d’appel qui la rend éligible.',
      },
      {
        question: 'Marine Le Pen peut-elle se présenter malgré sa condamnation ?',
        answer:
          'Oui. La partie ferme de sa peine d’inéligibilité (15 mois) a été purgée entre mars 2025 et juin 2026 grâce à l’exécution provisoire ; le reste (30 mois) est assorti du sursis. Le pourvoi en cassation ne l’empêche pas de se présenter.',
      },
      {
        question: 'Quel rôle pour Jordan Bardella ?',
        answer:
          'Il n’est pas candidat. Marine Le Pen le présente comme son futur Premier ministre dans un « ticket » président-Premier ministre.',
      },
      {
        question: 'Devra-t-elle porter un bracelet électronique pendant la campagne ?',
        answer:
          'La cour d’appel a ordonné que l’année de prison ferme soit exécutée sous surveillance électronique. Les modalités et le calendrier d’exécution dépendent du pourvoi en cassation et des décisions du juge de l’application des peines.',
      },
    ],
  }),
  candidatePage({
    slug: 'bardella-2027',
    title: 'Bardella 2027 : pourquoi Jordan Bardella n’est pas candidat (ticket Le Pen-Bardella)',
    description:
      'Bardella 2027 : Jordan Bardella n’est pas candidat à la présidentielle. Marine Le Pen, éligible depuis le 7 juillet 2026, le présente comme futur Premier ministre. Ce qu’il faut savoir sur le ticket RN et les sondages.',
    heroTitle: 'Bardella 2027 : de « plan B » à futur Premier ministre',
    heroIntro:
      'Jordan Bardella devait être le candidat du RN si l’inéligibilité de Marine Le Pen avait été confirmée en appel, avec un passage de relais prévu dès septembre 2026. L’arrêt du 7 juillet 2026 l’ayant rendue éligible, il n’est pas candidat : il incarne le volet Matignon du ticket Le Pen-Bardella.',
    queries: ['bardella 2027', 'jordan bardella 2027', 'bardella candidat 2027', 'bardella premier ministre'],
    summary: [
      'Il n’est pas candidat à l’élection des 18 avril et 2 mai 2027.',
      'Marine Le Pen le présente comme futur Premier ministre en cas de victoire.',
      'Ses scores dans les scénarios de sondage restent un indicateur du poids propre du RN.',
    ],
    candidatePath: '/candidats/jordan-bardella',
    sections: [
      {
        title: 'Pourquoi il n’est finalement pas candidat',
        paragraphs: [
          'Depuis avril 2025, Jordan Bardella répétait que Marine Le Pen restait sa candidate et qu’il ne la remplacerait qu’en cas d’empêchement. Le RN avait même planifié un basculement dès septembre 2026 si la cour d’appel confirmait l’inéligibilité.',
          'La cour d’appel de Paris a ramené le 7 juillet 2026 la peine d’inéligibilité à une durée déjà purgée. Marine Le Pen s’est déclarée le soir même et a officialisé un « ticket » : elle à l’Élysée, lui à Matignon.',
        ],
      },
      {
        title: 'Pourquoi son nom compte encore dans les sondages',
        paragraphs: [
          'Les instituts continuent de tester des scénarios avec Jordan Bardella, ce qui permet de mesurer le poids propre du RN indépendamment de la personne de Marine Le Pen. Un écart entre les deux configurations en dit long sur la sociologie de l’électorat national.',
          'Président du parti et député européen, il reste la figure la plus exposée du RN auprès des jeunes électeurs et un acteur central de la campagne, même sans être sur le bulletin.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Jordan Bardella est-il candidat en 2027 ?',
        answer:
          'Non. Marine Le Pen, redevenue éligible le 7 juillet 2026, est la candidate du RN. Jordan Bardella est présenté comme son futur Premier ministre.',
      },
      {
        question: 'Pourquoi parlait-on de Bardella comme candidat ?',
        answer:
          'Parce qu’il devait remplacer Marine Le Pen si sa peine de cinq ans d’inéligibilité prononcée en 2025 avait été confirmée en appel. Ce scénario ne s’est pas réalisé.',
      },
      {
        question: 'Bardella pourrait-il redevenir candidat ?',
        answer:
          'Seulement en cas d’empêchement de Marine Le Pen avant la clôture des candidatures. Son pourvoi en cassation ne remet pas en cause son éligibilité pour 2027.',
      },
    ],
  }),
  candidatePage({
    slug: 'attal-president-2027',
    title: 'Attal président 2027 : candidature déclarée, ligne politique et sondages',
    description:
      'Gabriel Attal est candidat à la présidentielle 2027 depuis le 22 mai 2026. Ligne politique, duel avec Édouard Philippe pour l’héritage du bloc central et lecture de ses sondages.',
    heroTitle: 'Attal président 2027 : candidat déclaré face à Philippe',
    heroIntro:
      'Gabriel Attal a officialisé sa candidature le 22 mai 2026. Ancien Premier ministre et patron de Renaissance, il dispute à Édouard Philippe, soutenu par Gérald Darmanin, l’héritage du bloc central. La vraie question n’est plus sa visibilité, mais sa capacité à s’imposer comme le candidat du centre.',
    queries: ['attal président 2027', 'gabriel attal 2027', 'attal candidat 2027', 'macron succession 2027'],
    summary: [
      'Candidat déclaré depuis le 22 mai 2026.',
      'Deux candidats issus du bloc central, Attal et Philippe, s’affrontent sans primaire.',
      'Ses sondages n’ont de sens que rapportés à Édouard Philippe et à Bruno Retailleau.',
    ],
    candidatePath: '/candidats/gabriel-attal',
    sections: [
      {
        title: 'Une candidature assumée depuis mai 2026',
        paragraphs: [
          'Après avoir dit vouloir « proposer un chemin aux Français » à l’été 2025 et critiqué la dissolution de 2024, Gabriel Attal a franchi le pas le 22 mai 2026. Il s’appuie sur la direction de Renaissance et sur la présidence du groupe Ensemble pour la République à l’Assemblée nationale.',
          'Sa candidature acte une rupture : Emmanuel Macron ne pouvant pas se représenter, deux de ses anciens Premiers ministres se présentent l’un contre l’autre au premier tour.',
        ],
      },
      {
        title: 'Ce qui décidera de sa crédibilité',
        paragraphs: [
          'Il faut regarder son niveau dans les scénarios face à Édouard Philippe, sa capacité à parler au-delà du noyau macroniste, et son positionnement vis-à-vis de Bruno Retailleau à droite. Le ralliement de Gérald Darmanin à Philippe le 17 août 2026 a réduit son espace.',
          'Un candidat crédible pour 2027 n’est pas seulement un nom connu : c’est un profil capable de durer, de structurer un discours et de rester compétitif dans plusieurs hypothèses de premier tour.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Gabriel Attal est-il candidat à la présidentielle 2027 ?',
        answer: 'Oui. Il a officialisé sa candidature le 22 mai 2026.',
      },
      {
        question: 'Pourquoi Attal et Philippe sont-ils tous deux candidats ?',
        answer:
          'Le bloc central n’a pas organisé de primaire. Édouard Philippe, déclaré dès septembre 2024, refuse cette idée ; Gabriel Attal a donc lancé sa propre candidature.',
      },
      {
        question: 'Où voir ses vidéos et ses tweets ?',
        answer:
          'Sa fiche détaillée rassemble ses interventions, ses positions sourcées et sa présence dans les intentions de vote.',
      },
    ],
  }),
  candidatePage({
    slug: 'edouard-philippe-2027',
    title: 'Édouard Philippe 2027 : candidature, soutien de Darmanin et sondages',
    description:
      'Édouard Philippe 2027 : candidat déclaré depuis septembre 2024, rallié par Gérald Darmanin en août 2026, il tend la main à la droite et au centre mais refuse toute primaire. Profil, ligne et sondages.',
    heroTitle: 'Édouard Philippe 2027 : le candidat du rassemblement droite-centre ?',
    heroIntro:
      'Premier grand candidat déclaré, dès le 3 septembre 2024, Édouard Philippe a engrangé le 17 août 2026 le soutien de Gérald Darmanin et a tendu la main, le 8 septembre, à la droite et au centre. Bruno Retailleau a décliné, Gabriel Attal est candidat contre lui : le rassemblement reste à construire.',
    queries: ['édouard philippe 2027', 'philippe 2027', 'edouard philippe candidat', 'candidat centre droit 2027'],
    summary: [
      'Candidat déclaré depuis le 3 septembre 2024, il refuse l’idée d’une primaire.',
      'Gérald Darmanin a renoncé à sa candidature pour le soutenir et se veut son « aiguillon social ».',
      'Ses scores n’ont de sens qu’en regard d’Attal, de Retailleau et de Bertrand.',
    ],
    candidatePath: '/candidats/edouard-philippe',
    sections: [
      {
        title: 'Pourquoi il apparaît comme un pivot',
        paragraphs: [
          'Édouard Philippe combine une identification nationale élevée, une image d’ancien Premier ministre et une capacité à rassurer une partie de l’électorat modéré. En rupture avec Emmanuel Macron depuis juin 2024, il a construit Horizons comme un outil autonome.',
          'Le ralliement de Gérald Darmanin, qui a réuni ses soutiens à Tourcoing le 30 août 2026 en sa présence, lui apporte un relais dans la droite sociale et populaire.',
        ],
      },
      {
        title: 'Un rassemblement encore incomplet',
        paragraphs: [
          'Le 8 septembre 2026, il a appelé la droite et le centre à se rassembler derrière sa candidature. Bruno Retailleau, désigné par les adhérents LR, a immédiatement refusé ; Xavier Bertrand et David Lisnard maintiennent leurs candidatures ; Gabriel Attal est candidat depuis mai.',
          'Sa capacité à dominer cet espace dans les sondages, puis à agréger au second tour, sera l’un des enjeux centraux de la campagne.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Édouard Philippe est-il candidat en 2027 ?',
        answer: 'Oui. Il a officialisé sa candidature le 3 septembre 2024, le premier parmi les grandes figures nationales.',
      },
      {
        question: 'Qui soutient Édouard Philippe ?',
        answer:
          'Gérald Darmanin a renoncé à sa propre candidature le 17 août 2026 pour le soutenir. Horizons et une partie de la droite modérée constituent son socle.',
      },
      {
        question: 'Pourquoi le comparer à Gabriel Attal ?',
        answer:
          'Parce qu’ils sont tous deux anciens Premiers ministres d’Emmanuel Macron et candidats au premier tour, visant en partie le même électorat.',
      },
    ],
  }),
  candidatePage({
    slug: 'retailleau-2027',
    title: 'Retailleau 2027 : candidat désigné par LR, ligne politique et sondages',
    description:
      'Bruno Retailleau est le candidat des Républicains pour la présidentielle 2027, désigné par les adhérents le 19 avril 2026. Ligne de droite d’autorité, refus de la main tendue d’Édouard Philippe et lecture de ses sondages.',
    heroTitle: 'Retailleau 2027 : le candidat de LR face à une droite éclatée',
    heroIntro:
      'Président des Républicains, Bruno Retailleau a été investi par les adhérents du parti le 19 avril 2026. Il refuse la main tendue d’Édouard Philippe et défend une candidature de droite autonome, alors que Xavier Bertrand et David Lisnard se présentent aussi en dehors de LR.',
    queries: ['retailleau 2027', 'bruno retailleau 2027', 'retailleau candidat présidentielle', 'candidat lr 2027'],
    summary: [
      'Désigné candidat des Républicains le 19 avril 2026 par un vote des adhérents.',
      'Il a refusé le 8 septembre 2026 le rassemblement proposé par Édouard Philippe.',
      'La droite arrive divisée : Retailleau (LR), Bertrand (Nous France), Lisnard (Nouvelle Énergie).',
    ],
    candidatePath: '/candidats/bruno-retailleau',
    sections: [
      {
        title: 'Un candidat investi par son parti',
        paragraphs: [
          'Élu président des Républicains en mai 2025 après son passage au ministère de l’Intérieur, Bruno Retailleau a été désigné candidat à la présidentielle par une consultation des adhérents le 19 avril 2026. C’est la seule investiture partisane formelle à droite.',
          'Sa ligne est celle d’une droite d’autorité : sécurité, maîtrise de l’immigration, ordre républicain, avec un discours de continuité doctrinale plutôt que de rupture personnelle.',
        ],
      },
      {
        title: 'Le refus du rassemblement derrière Philippe',
        paragraphs: [
          'Le 8 septembre 2026, Édouard Philippe a tendu la main à la droite et au centre ; Bruno Retailleau a décliné, préférant maintenir une offre LR distincte du bloc central. La droite reste par ailleurs divisée sur l’idée d’une primaire, défendue par David Lisnard et Laurent Wauquiez mais refusée par Xavier Bertrand et Édouard Philippe.',
          'Sa capacité à devancer Bertrand et Lisnard dans les sondages, puis à rivaliser avec Philippe et Attal pour l’accès au second tour, sera la clé de sa campagne.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Bruno Retailleau est-il candidat en 2027 ?',
        answer: 'Oui. Il a été désigné candidat des Républicains par un vote des adhérents le 19 avril 2026.',
      },
      {
        question: 'Y aura-t-il une primaire à droite ?',
        answer:
          'Rien n’est acquis. Lisnard, Wauquiez et Darmanin y étaient favorables, mais Bertrand et Philippe la refusent. À ce stade, Retailleau, Bertrand et Lisnard sont tous trois candidats.',
      },
      {
        question: 'Pourquoi Retailleau refuse-t-il de soutenir Édouard Philippe ?',
        answer:
          'Il défend une candidature de droite autonome, distincte de l’héritage macroniste que représente à ses yeux le bloc central.',
      },
    ],
  }),
  candidatePage({
    slug: 'melenchon-2027',
    title: 'Mélenchon 2027 : quatrième candidature, ligne politique et rôle à gauche',
    description:
      'Jean-Luc Mélenchon est candidat à la présidentielle 2027, déclaré le 3 mai 2026 pour une quatrième candidature consécutive, hors de toute primaire. Ligne, stratégie et poids dans les sondages.',
    heroTitle: 'Mélenchon 2027 : une quatrième candidature hors primaire',
    heroIntro:
      'Jean-Luc Mélenchon a officialisé le 3 mai 2026 sa quatrième candidature consécutive. Fidèle à son refus de toute primaire, il affronte une gauche éclatée entre la primaire socialiste « Choisir 2027 », Fabien Roussel, François Ruffin et les écologistes.',
    queries: ['mélenchon 2027', 'jean-luc mélenchon 2027', 'mélenchon candidat 2027', 'gauche 2027'],
    summary: [
      'Candidat déclaré depuis le 3 mai 2026, pour la quatrième fois consécutive.',
      'Il refuse toute primaire et revendique une candidature insoumise autonome.',
      'Sa performance se lit face à la gauche social-démocrate et écologiste divisée.',
    ],
    candidatePath: '/candidats/jean-luc-melenchon',
    sections: [
      {
        title: 'Pourquoi il reste incontournable',
        paragraphs: [
          'Jean-Luc Mélenchon conserve une capacité rare à structurer le débat à gauche. Sa ligne politique, sa base militante et sa place dans l’espace insoumis continuent de peser sur tout l’équilibre de ce camp, d’autant qu’il avait frôlé le second tour en 2022.',
          'Dès février 2025, il annonçait une candidature insoumise indépendante du PS ; il a publié début 2026 un document stratégique puis officialisé sa candidature le 3 mai 2026.',
        ],
      },
      {
        title: 'Ce qu’il faut regarder pour le juger',
        paragraphs: [
          'Il faut observer sa relation avec les autres forces de gauche, la manière dont les instituts le testent face au vainqueur de la primaire « Choisir 2027 », et la capacité de sa ligne à tenir face à des offres concurrentes plus social-démocrates, écologistes ou populistes.',
          'Mélenchon 2027 ne se lit pas seulement en points de sondage. Il se lit aussi en capacité de polarisation, de rassemblement ou de division d’une gauche qui n’a pas réussi à s’unir.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Jean-Luc Mélenchon est-il candidat en 2027 ?',
        answer: 'Oui. Il a officialisé sa quatrième candidature le 3 mai 2026.',
      },
      {
        question: 'Participe-t-il à une primaire de la gauche ?',
        answer: 'Non. Il a toujours refusé toute primaire et ne participe pas à « Choisir 2027 ».',
      },
      {
        question: 'Pourquoi Mélenchon est-il souvent comparé à Glucksmann ?',
        answer:
          'Parce qu’ils représentent deux lignes opposées de la gauche : une gauche de rupture d’un côté, une gauche pro-européenne et social-démocrate de l’autre.',
      },
    ],
  }),
  candidatePage({
    slug: 'zemmour-2027',
    title: 'Zemmour 2027 : candidature déclarée, Reconquête et place dans les sondages',
    description:
      'Éric Zemmour est candidat à la présidentielle 2027, déclaré le 17 septembre 2026 avec le soutien de Sarah Knafo. Ce que pèse Reconquête face au RN et comment lire ses sondages.',
    heroTitle: 'Zemmour 2027 : de nouveau candidat face au RN',
    heroIntro:
      'Éric Zemmour a confirmé le 17 septembre 2026 qu’il serait candidat à la présidentielle 2027, l’hypothèse d’une primaire des droites étant écartée. Sarah Knafo a renoncé à sa propre candidature pour le soutenir. Son score en 2022 : 7,07 %.',
    queries: ['zemmour 2027', 'éric zemmour 2027', 'zemmour candidat 2027', 'reconquête 2027'],
    summary: [
      'Candidat déclaré depuis le 17 septembre 2026.',
      'Il concurrence directement le ticket Le Pen-Bardella à l’extrême droite.',
      'Sa place se lit par rapport au RN et à la capacité de cet électorat à se concentrer sur une seule candidature.',
    ],
    candidatePath: '/candidats/eric-zemmour',
    sections: [
      {
        title: 'Une seconde candidature',
        paragraphs: [
          'Fondateur de Reconquête fin 2021, Éric Zemmour avait obtenu 7,07 % au premier tour de 2022. Après avoir reconnu qu’une primaire des droites était improbable, il a officialisé sa candidature le 17 septembre 2026.',
          'Sarah Knafo, eurodéputée et figure montante du parti, a écarté une candidature personnelle pour le soutenir.',
        ],
      },
      {
        title: 'Comment lire sa place en 2027',
        paragraphs: [
          'La bonne question est de savoir s’il conserve un socle identifiable face à une Marine Le Pen redevenue éligible et à un RN structuré autour du ticket Le Pen-Bardella. Nicolas Dupont-Aignan et Florian Philippot se disputent aussi l’espace souverainiste.',
          'S’il existe marginalement dans les enquêtes, sa fonction devient surtout interprétative ; s’il retrouve une capacité à perturber l’équilibre du bloc national, il redevient un facteur politique concret.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Éric Zemmour est-il candidat en 2027 ?',
        answer: 'Oui. Il a confirmé sa candidature le 17 septembre 2026.',
      },
      {
        question: 'Sarah Knafo est-elle candidate ?',
        answer: 'Non. Elle a renoncé à une candidature propre et soutient Éric Zemmour.',
      },
      {
        question: 'Pourquoi le comparer à Bardella et à Le Pen ?',
        answer:
          'Parce qu’ils se disputent une partie du même espace électoral, et que leur rapport de force dit beaucoup sur la structure du premier tour.',
      },
    ],
  }),
  candidatePage({
    slug: 'glucksmann-2027',
    title: 'Glucksmann 2027 : candidat à la primaire « Choisir 2027 », dates et enjeux',
    description:
      'Raphaël Glucksmann est candidat à la primaire socialiste « Choisir 2027 » (9-10 et 16-17 octobre 2026) face à Faure, Guedj, Maurel et Royal. Pourquoi il a accepté une primaire, ce que pèse sa ligne pro-européenne et comment lire ses sondages.',
    heroTitle: 'Glucksmann 2027 : favori d’une primaire qu’il refusait',
    heroIntro:
      'Longtemps opposé à toute primaire, Raphaël Glucksmann a rejoint le 23 août 2026 « Choisir 2027 », la primaire fermée du PS, de Place publique et de la GRS. Il y affronte Olivier Faure, Jérôme Guedj, Emmanuel Maurel et Ségolène Royal, les 9-10 puis 16-17 octobre 2026.',
    queries: ['glucksmann 2027', 'raphaël glucksmann 2027', 'glucksmann primaire', 'gauche sociale-démocrate 2027'],
    summary: [
      'Candidat à la primaire « Choisir 2027 » depuis le 23 août 2026.',
      'Il défend une primaire limitée à l’arc social-démocrate, excluant Tondelier et Ruffin.',
      'La clé est de savoir s’il peut élargir au-delà d’un public urbain, européen et réformiste.',
    ],
    candidatePath: '/candidats/raphael-glucksmann',
    sections: [
      {
        title: 'Pourquoi il a finalement accepté une primaire',
        paragraphs: [
          'En mai 2025, Raphaël Glucksmann excluait de participer à une primaire de la gauche. Le vote des adhérents socialistes du 9 juillet 2026 en faveur d’une primaire réservée à l’arc social-démocrate a changé la donne : un périmètre restreint, sans LFI, sans les écologistes ni François Ruffin, correspond à son espace politique.',
          'Il s’y est engagé le 23 août 2026. Marine Tondelier et François Ruffin lui reprochent d’avoir verrouillé ce périmètre et « enterré » la primaire unitaire.',
        ],
      },
      {
        title: 'Ce qu’il faut regarder pour le juger',
        paragraphs: [
          'Il faut d’abord suivre le résultat de la primaire, les 9-10 et 16-17 octobre 2026. En cas de victoire, la question sera sa capacité à rassembler au-delà de la social-démocratie face à Jean-Luc Mélenchon, Fabien Roussel et François Ruffin, tous candidats hors primaire.',
          'Sa plateforme repose sur la réindustrialisation, la réforme de la gouvernance des entreprises, la justice sociale et une ligne résolument pro-européenne.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Raphaël Glucksmann est-il candidat en 2027 ?',
        answer:
          'Il est candidat à la primaire « Choisir 2027 ». S’il la remporte, il sera le candidat commun du PS, de Place publique et de la GRS.',
      },
      {
        question: 'Quand a lieu la primaire ?',
        answer: 'Premier tour les 9 et 10 octobre 2026, second tour éventuel les 16 et 17 octobre 2026.',
      },
      {
        question: 'Pourquoi le comparer à Mélenchon ?',
        answer:
          'Parce qu’ils représentent deux lignes différentes pour la gauche 2027, avec des électorats, des stratégies et des horizons de coalition distincts.',
      },
    ],
  }),
  candidatePage({
    slug: 'villepin-2027',
    title: 'Villepin 2027 : candidature pressentie, La France humaniste et parrainages',
    description:
      'Dominique de Villepin candidat en 2027 ? L’ancien Premier ministre a lancé La France humaniste en juin 2025 et cherche ses 500 parrainages sans candidature officielle. Statut, ligne politique et perspectives.',
    heroTitle: 'Villepin 2027 : une candidature pressentie, pas encore déclarée',
    heroIntro:
      'Dominique de Villepin a lancé le 24 juin 2025 le mouvement La France humaniste comme étape vers la présidentielle. À la rentrée 2026, il n’est toujours pas formellement candidat mais travaille à réunir les 500 présentations d’élus, en se positionnant comme candidat de l’unité républicaine.',
    queries: ['villepin 2027', 'dominique de villepin candidat', 'villepin présidentielle 2027', 'la france humaniste'],
    summary: [
      'Statut : candidature pressentie, non officiellement déclarée au 22 septembre 2026.',
      'Son mouvement La France humaniste, lancé en juin 2025, prépare la collecte des parrainages.',
      'Il occupe un espace de centre-droit gaulliste, distinct de Philippe, Attal et Retailleau.',
    ],
    candidatePath: '/candidats/dominique-de-villepin',
    sections: [
      {
        title: 'Un retour par les idées',
        paragraphs: [
          'Premier ministre de 2005 à 2007 après avoir dirigé les Affaires étrangères et l’Intérieur, Dominique de Villepin est revenu dans le débat public par ses prises de position sur les questions internationales. Le 24 juin 2025, il a annoncé la création de La France humaniste, « mouvement d’idées et de citoyens ».',
          'Début 2026, il affirmait vouloir « être présent pour cette grande bataille ». Les listes de prétendants établies à la rentrée 2026 le classent parmi les candidatures pressenties cherchant encore leurs parrainages.',
        ],
      },
      {
        title: 'Quel espace pour lui ?',
        paragraphs: [
          'Le centre-droit est encombré : Édouard Philippe, Gabriel Attal, Bruno Retailleau, Xavier Bertrand et David Lisnard sont déjà déclarés. Dominique de Villepin mise sur une stature internationale et un discours d’unité républicaine pour se distinguer.',
          'Sans parti implanté ni élus locaux en nombre, la collecte des 500 parrainages début 2027 sera le véritable test de sa candidature.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Dominique de Villepin est-il candidat en 2027 ?',
        answer:
          'Pas officiellement. Il a lancé La France humaniste en vue de 2027 et cherche ses parrainages, mais n’a pas formellement déclaré sa candidature au 22 septembre 2026.',
      },
      {
        question: 'Qu’est-ce que La France humaniste ?',
        answer:
          'Un mouvement politique lancé le 24 juin 2025 par Dominique de Villepin, dirigé par Benoît Jimenez (UDI), conçu comme un tremplin vers l’élection présidentielle.',
      },
      {
        question: 'Peut-il réunir 500 parrainages ?',
        answer:
          'C’est l’inconnue principale. Sans appareil partisan implanté, il devra convaincre des maires et des élus locaux au-delà des clivages, ce qui a échoué à plusieurs personnalités connues en 2022.',
      },
    ],
  }),
]

export function getSeoPageBySlug(slug) {
  return seoPages.find((page) => page.slug === slug) || null
}
