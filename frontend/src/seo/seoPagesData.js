export const SITE_NAME = 'Presidentielles 2027'
export const SITE_URL = 'https://milardv.github.io/presidentielle2027'

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
    relatedLinks: [
      candidatePath
        ? { label: 'Voir la fiche détaillée', href: candidatePath }
        : { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Comparer les sondages', href: '/polls' },
      { label: 'Retour à l’accueil', href: '/' },
    ],
  }
}

export const seoPages = [
  {
    slug: 'presidentielle-2027',
    title: 'Presidentielle 2027 : candidats, sondages, date et intentions de vote',
    description:
      'Presidentielle 2027 : suivez les candidats potentiels, les sondages, les intentions de vote, les profils, les interventions et les dynamiques de campagne au meme endroit.',
    heroEyebrow: 'Guide 2027',
    heroTitle: 'Presidentielle 2027 : le point d’entree pour suivre la campagne',
    heroIntro:
      'Cette page sert de hub editorial pour comprendre la presidentielle 2027, les candidats, les sondages, les intentions de vote et les grandes questions qui structurent la campagne.',
    queries: [
      'presidentielle 2027',
      'election presidentielle 2027',
      'qui sera president en 2027',
      'qui sera candidat 2027',
    ],
    summary: [
      'Une vue claire des candidats deja declares, conditionnels ou testes dans les sondages.',
      'Un acces direct aux sondages, aux intentions de vote et aux profils detailles.',
      'Des pages de contexte pour les questions les plus recherchees sur Google autour de 2027.',
    ],
    sections: [
      {
        title: 'Pourquoi cette page repond a la requete presidentielle 2027',
        paragraphs: [
          'Les internautes qui cherchent presidentielle 2027 veulent en general trois choses: savoir qui peut etre candidat, comprendre ou en sont les sondages, et suivre les temps forts de campagne sans multiplier les sources.',
          'Le site Presidentielles a ete structure pour repondre exactement a ce besoin: une home de synthese, une page sondages, des fiches candidats, des videos, des tweets et une analyse du reseau politique de chaque profil.',
        ],
      },
      {
        title: 'Ce que vous pouvez consulter ensuite',
        paragraphs: [
          'Si votre objectif est de savoir qui est en tete, la page sondages reste la meilleure entree. Si vous cherchez plutot un nom precis, les pages dediees a Bardella, Le Pen, Attal, Edouard Philippe, Melenchon ou Glucksmann renvoient vers leurs fiches completes.',
          'Le site couvre aussi les grandes questions de contexte: quand aura lieu la presidentielle 2027, qui peut se presenter, comment se deroule l’election et si Emmanuel Macron peut ou non se representer.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Ou voir les candidats a la presidentielle 2027 ?',
        answer:
          'La home du site centralise les principaux candidats suivis avec leur statut, leurs profils et leurs sources. Les pages SEO candidates renvoient ensuite vers les fiches detaillees.',
      },
      {
        question: 'Ou voir les sondages de la presidentielle 2027 ?',
        answer:
          'La page sondages du site regroupe les intentions de vote par institut et par scenario. Elle est reliee depuis cette page et depuis l’accueil.',
      },
      {
        question: 'Cette page dit-elle deja qui gagnera en 2027 ?',
        answer:
          'Non. Elle renvoie vers les donnees utiles pour suivre la campagne, mais ne presente pas un vainqueur certain. Les dynamiques restent evolutives tant que l’election n’est pas tenue.',
      },
    ],
    relatedLinks: [
      { label: 'Voir l’accueil principal', href: '/' },
      { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
    ],
  },
  {
    slug: 'sondage-presidentielle-2027',
    title: 'Sondage presidentielle 2027 : intentions de vote, classement et dynamique',
    description:
      'Retrouvez les sondages presidentielle 2027, les intentions de vote, les classements par scenario et les instituts suivis par le site.',
    heroEyebrow: 'Sondages 2027',
    heroTitle: 'Sondage presidentielle 2027 : lire les intentions de vote sans se perdre',
    heroIntro:
      'Cette page cible toutes les recherches liees aux sondages presidentielle 2027, aux intentions de vote et aux scenarios institut par institut.',
    queries: [
      'presidentielle 2027 sondage',
      'sondage presidentielle 2027',
      'intentions de vote 2027',
      'sondages presidentielle 2027 en direct',
      'classement candidats presidentielle 2027',
      'sondage IFOP presidentielle 2027',
      'qui va gagner presidentielle 2027',
      'probabilite victoire presidentielle 2027',
    ],
    summary: [
      'Une vue par institut et par scenario, sans noyer la lecture.',
      'Un classement moyen pour repérer la hierarchie du moment.',
      'Un lien direct vers la page sondages dynamique du site.',
    ],
    sections: [
      {
        title: 'Comment lire un sondage presidentielle 2027',
        paragraphs: [
          'Un sondage teste un ou plusieurs scenarios. La bonne lecture consiste a comparer les instituts, la date de terrain, la composition du scenario et l’ecart entre les candidats, plutot qu’a surinterpreter une seule enquete.',
          'Le site affiche un scenario principal par institut et resserre les autres scenarios pour garder une lecture claire. Cela permet de voir rapidement qui mene, qui progresse, et quels duels ou triangulations sont les plus testes.',
        ],
      },
      {
        title: 'Que faire de la requete sondage IFOP presidentielle 2027',
        paragraphs: [
          'La requete IFOP est frequente parce que l’institut reste une reference dans le debat public. Mais il faut toujours replacer IFOP dans un ensemble plus large: OpinionWay, Harris Interactive, Cluster17, Elabe et les autres instituts peuvent faire varier la photo selon leur scenario.',
          'La page sondages de Presidentielles a ete pensee dans cet esprit: comparer les etudes disponibles sans les confondre, et garder une synthese utile meme quand plusieurs scenarios coexistent.',
        ],
      },
      {
        title: 'Qui va gagner la presidentielle 2027 ?',
        paragraphs: [
          'Le site ne pretend pas donner une prediction definitive. En revanche, il montre les tendances, les ecarts, le rythme des publications et les candidats les plus cites dans les scenarios actuels.',
          'Pour une lecture solide, il faut croiser les intentions de vote, la dynamique media, les alliances possibles et le niveau de structuration de chaque candidature.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Ou voir les derniers sondages presidentielle 2027 ?',
        answer:
          'La meilleure entree reste la page sondages du site, qui consolide les etudes par institut, par date de terrain et par scenario.',
      },
      {
        question: 'Le site affiche-t-il une probabilite de victoire ?',
        answer:
          'Pas comme un modele predicitif ferme. Le site montre plutot les intentions de vote, les classements et les dynamiques comparees, ce qui permet une lecture plus prudente.',
      },
      {
        question: 'Les sondages sont-ils mis a jour automatiquement ?',
        answer:
          'Oui, les donnees sont stockees en base puis relues par le front. L’objectif est de rendre la page rapide, claire et stable.',
      },
    ],
    relatedLinks: [
      { label: 'Ouvrir la page sondages', href: '/polls' },
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Retour au guide presidentielle 2027', href: '/presidentielle-2027/' },
    ],
  },
  {
    slug: 'candidats-presidentielle-2027',
    title: 'Candidats presidentielle 2027 : liste, profils et statuts',
    description:
      'Qui sont les candidats a la presidentielle 2027 ? Retrouvez les profils suivis, leur statut, leurs positions et les liens utiles pour comprendre la campagne.',
    heroEyebrow: 'Candidats',
    heroTitle: 'Candidats presidentielle 2027 : qui est vraiment en lice ?',
    heroIntro:
      'Cette page editorialise la requete candidats presidentielle 2027 et renvoie vers les fiches completes des profils les plus suivis.',
    queries: [
      'candidats presidentielle 2027',
      'qui sera candidat 2027',
      'qui peut se presenter en 2027',
    ],
    summary: [
      'Des profils deja declares, des candidatures conditionnelles et des noms testes dans les sondages.',
      'Des fiches detaillees avec positions, interventions et sources.',
      'Un maillage vers les pages individuelles les plus recherchees.',
    ],
    sections: [
      {
        title: 'Comment le site classe les candidats 2027',
        paragraphs: [
          'Le site distingue les profils declares, les candidatures conditionnelles et les personnalites qui structurent deja les scenarii de sondages sans declaration ferme. Cette nuance est essentielle pour ne pas confondre activite politique et candidature formelle.',
          'Chaque fiche candidat rassemble un resume, l’evolution des positions, les interventions medias, les videos, les tweets et une page d’analyse. L’objectif n’est pas seulement de lister des noms, mais de donner du contexte et des sources.',
        ],
      },
      {
        title: 'Quels noms reviennent le plus dans les recherches 2027',
        paragraphs: [
          'Parmi les requetes les plus frequentes, on retrouve Bardella 2027, Le Pen 2027, Attal president 2027, Edouard Philippe 2027, Melenchon 2027, Zemmour 2027 et Glucksmann 2027. Chacun de ces profils dispose ou disposera d’une page cible dans le site.',
          'Le maillage interne a ete concu pour permettre a Google comme aux lecteurs de passer facilement d’une requete generale a une page plus specialisee.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Tous les noms de sondages sont-ils de vrais candidats ?',
        answer:
          'Non. Certains sont deja declares, d’autres restent des possibilites politiques ou des candidatures conditionnelles. Le site fait cette distinction dans chaque fiche.',
      },
      {
        question: 'Comment savoir qui est officiellement candidat ?',
        answer:
          'Le site indique un statut pour chaque profil. Ce statut est plus utile qu’une simple liste, car il montre si la candidature est declaree, conditionnelle ou seulement testee.',
      },
      {
        question: 'Ou voir le detail d’un candidat ?',
        answer:
          'Chaque page cible renvoie vers une fiche complete avec positions, interventions, videos, tweets et analyse.',
      },
    ],
    relatedLinks: [
      { label: 'Voir l’accueil des candidats', href: '/' },
      { label: 'Jordan Bardella 2027', href: '/bardella-2027/' },
      { label: 'Gabriel Attal 2027', href: '/attal-president-2027/' },
    ],
  },
  {
    slug: 'quand-aura-lieu-la-presidentielle-2027',
    title: 'Quand aura lieu la presidentielle 2027 ? Date, calendrier et rythme du scrutin',
    description:
      'Quand aura lieu la presidentielle 2027 ? Ce que l’on sait du calendrier, de la date probable du scrutin et de l’organisation des deux tours.',
    heroEyebrow: 'Calendrier',
    heroTitle: 'Quand aura lieu la presidentielle 2027 ?',
    heroIntro:
      'Au 11 mars 2026, les dates exactes de l’election presidentielle 2027 ne sont pas encore fixees par decret. Cette page resume ce que l’on peut dire utilement et proprement.',
    queries: [
      'quand aura lieu la presidentielle 2027',
      'date election presidentielle 2027',
    ],
    summary: [
      'Les dates exactes ne sont pas encore officielles au 11 mars 2026.',
      'L’election doit se tenir au printemps 2027.',
      'Le decret de convocation precise formellement le calendrier du premier et du second tour.',
    ],
    sections: [
      {
        title: 'Ce que l’on peut dire sans surpromettre',
        paragraphs: [
          'La prochaine election presidentielle francaise doit se tenir en 2027. En pratique, le scrutin a lieu au printemps et comporte deux tours separes de quatorze jours.',
          'En revanche, au 11 mars 2026, le calendrier officiel n’est pas encore publie. Il faut donc eviter d’annoncer une date ferme tant que le decret de convocation n’est pas paru.',
        ],
      },
      {
        title: 'Pourquoi Google cherche deja la date',
        paragraphs: [
          'La requete monte tres tot parce que la date structure toute la campagne: collecte des parrainages, declarations, publications de sondages et calendrier media. Cette page sert justement a donner une reponse precise sans inventer de date non encore oficialisee.',
          'Pour suivre la suite logique, la meilleure page complementaire est la page sondages, puis la page expliquant comment se deroule l’election presidentielle.',
        ],
      },
    ],
    faqs: [
      {
        question: 'La date du premier tour 2027 est-elle officielle ?',
        answer:
          'Non, pas encore au 11 mars 2026. La date exacte sera fixee et annoncee officiellement dans le calendrier electoral.',
      },
      {
        question: 'Combien de temps separe les deux tours ?',
        answer:
          'Le second tour intervient quatorze jours apres le premier.',
      },
      {
        question: 'Ou suivre les candidats pendant l’attente du calendrier officiel ?',
        answer:
          'Le site renvoie vers les fiches candidats et les sondages, qui restent les meilleurs points d’entree tant que la date n’est pas encore formalisee.',
      },
    ],
    relatedLinks: [
      { label: 'Comment se deroule l’election presidentielle', href: '/comment-se-deroule-election-presidentielle/' },
      { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Retour au guide 2027', href: '/presidentielle-2027/' },
    ],
  },
  {
    slug: 'qui-peut-se-presenter-en-2027',
    title: 'Qui peut se presenter en 2027 ? Conditions pour etre candidat a la presidentielle',
    description:
      'Qui peut se presenter en 2027 ? Conditions d’age, nationalite, droits civiques et parrainages pour l’election presidentielle francaise.',
    heroEyebrow: 'Regles',
    heroTitle: 'Qui peut se presenter en 2027 ?',
    heroIntro:
      'Cette page repond a la requete qui peut se presenter en 2027 avec une reponse claire, utile et sourcable pour la presidentielle francaise.',
    queries: [
      'qui peut se presenter en 2027',
      'conditions candidature presidentielle 2027',
    ],
    summary: [
      'Il faut pouvoir reunir les conditions constitutionnelles et legals de candidature.',
      'Le filtre politique decisif reste le systeme de parrainages.',
      'La page candidats du site montre ensuite qui est effectivement suivi dans la campagne.',
    ],
    sections: [
      {
        title: 'Les conditions a retenir',
        paragraphs: [
          'Pour se presenter a l’election presidentielle, il faut etre francais, avoir au moins 18 ans, jouir de ses droits civiques et remplir les obligations declarees pour la candidature.',
          'Surtout, il faut obtenir 500 presentations d’elus provenant d’au moins 30 departements ou collectivites d’outre-mer, sans que plus d’un dixieme des presentateurs provienne du meme territoire. C’est le verrou pratique le plus important.',
        ],
      },
      {
        title: 'Pourquoi la question revient aussi souvent',
        paragraphs: [
          'La distinction entre popularite mediatique et capacite reelle a se presenter est essentielle. Beaucoup de personnalites sont citees dans le debat public, mais toutes ne disposent pas de la structure politique ou territoriale pour franchir le cap des parrainages.',
          'C’est pour cela que le site ne se contente pas d’un nom ou d’un sondage: il remet chaque candidature potentielle dans un contexte politique plus large.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Faut-il 500 parrainages pour etre candidat ?',
        answer:
          'Oui. Les 500 presentations d’elus constituent un filtre central de l’election presidentielle francaise.',
      },
      {
        question: 'Peut-on etre candidat simplement parce qu’on est teste dans les sondages ?',
        answer:
          'Non. Etre teste dans les sondages ne dispense pas des conditions juridiques et politiques de candidature.',
      },
      {
        question: 'Ou voir les profils qui comptent vraiment pour 2027 ?',
        answer:
          'La page candidats du site et les fiches detaillees permettent de distinguer les candidatures structurees des simples hypothese de debat.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Voir les sondages', href: '/polls' },
      { label: 'Comprendre le scrutin', href: '/comment-se-deroule-election-presidentielle/' },
    ],
  },
  {
    slug: 'macron-peut-il-se-representer-en-2027',
    title: 'Macron peut-il se representer en 2027 ?',
    description:
      'Macron peut-il se representer en 2027 ? Reponse courte, base constitutionnelle et contexte politique autour de la limitation a deux mandats consecutifs.',
    heroEyebrow: 'Constitution',
    heroTitle: 'Macron peut-il se representer en 2027 ?',
    heroIntro:
      'La reponse courte est non, sauf changement institutionnel majeur. Cette page explique pourquoi de facon simple et sans ambiguite.',
    queries: [
      'macron peut-il se representer en 2027',
      'macron 2027',
    ],
    summary: [
      'L’article 6 de la Constitution limite l’exercice a deux mandats consecutifs.',
      'Emmanuel Macron a ete elu en 2017 puis en 2022.',
      'En l’etat actuel du droit, il ne peut donc pas etre candidat en 2027.',
    ],
    sections: [
      {
        title: 'La logique constitutionnelle',
        paragraphs: [
          'Depuis la revision constitutionnelle, nul ne peut exercer plus de deux mandats consecutifs de president de la Republique. Emmanuel Macron ayant ete elu en 2017 puis reelu en 2022, un nouveau mandat consecutif en 2027 n’est pas possible dans le cadre actuel.',
          'Dire les choses ainsi est plus rigoureux que de parler d’une impossibilite politique abstraite: c’est avant tout une consequence de la Constitution, pas une simple hypothese de campagne.',
        ],
      },
      {
        title: 'Pourquoi la question reste importante pour 2027',
        paragraphs: [
          'Parce qu’elle structure toute la recomposition du camp macroniste. Si Emmanuel Macron ne peut pas etre candidat en 2027, la question devient celle de la succession: Attal, Edouard Philippe, Darmanin, ou d’autres profils susceptibles de revendiquer l’heritage ou la rupture.',
          'Le site traite cette question par les sondages, les fiches candidats et les pages dediees aux principaux noms cites pour 2027.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Emmanuel Macron peut-il faire un troisieme mandat consecutif ?',
        answer:
          'Non, pas en l’etat actuel de l’article 6 de la Constitution.',
      },
      {
        question: 'Pourquoi voit-on encore la requete Macron 2027 ?',
        answer:
          'Parce que la question de son influence, de sa succession et de son camp politique reste centrale meme sans candidature possible.',
      },
      {
        question: 'Qui peut recuperer son espace politique ?',
        answer:
          'Les recherches se concentrent surtout sur Gabriel Attal, Edouard Philippe et d’autres personnalites du bloc central ou de la droite gouvernementale.',
      },
    ],
    relatedLinks: [
      { label: 'Gabriel Attal 2027', href: '/attal-president-2027/' },
      { label: 'Edouard Philippe 2027', href: '/edouard-philippe-2027/' },
      { label: 'Voir les sondages', href: '/polls' },
    ],
  },
  {
    slug: 'comment-se-deroule-election-presidentielle',
    title: 'Comment se deroule l’election presidentielle ? Regles, tours et qualification',
    description:
      'Comment se deroule l’election presidentielle francaise ? Deux tours, qualification, campagne, parrainages et logique du scrutin presidentiel.',
    heroEyebrow: 'Mode d’emploi',
    heroTitle: 'Comment se deroule l’election presidentielle ?',
    heroIntro:
      'Cette page explique le fonctionnement de l’election presidentielle francaise de facon claire pour les internautes qui veulent comprendre les regles avant de suivre 2027.',
    queries: [
      'comment se deroule l election presidentielle',
      'regles election presidentielle france',
    ],
    summary: [
      'Le scrutin se joue en deux tours.',
      'Les deux premiers du premier tour se qualifient pour le second.',
      'Le vainqueur du second tour devient president de la Republique.',
    ],
    sections: [
      {
        title: 'Le schema general du scrutin',
        paragraphs: [
          'Au premier tour, tous les candidats qualifies se presentent. Si aucun n’obtient la majorite absolue des suffrages exprimes, un second tour oppose les deux candidats arrives en tete.',
          'Le second tour tranche entre ces deux finalistes. Cette logique explique pourquoi les sondages de premier tour, les reserves de voix et les reports sont aussi surveilles dans la campagne presidentielle.',
        ],
      },
      {
        title: 'Pourquoi cette page est utile pour 2027',
        paragraphs: [
          'Une grande partie des recherches autour de 2027 melange candidats, calendrier, regles et sondages. Cette page sert de point d’ordre: comprendre d’abord le mecanisme, puis lire correctement les scenarios et les rapports de force.',
          'Pour un suivi plus concret de la campagne 2027, il faut ensuite consulter la page sondages et les fiches des candidats les plus cites.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Combien y a-t-il de tours a l’election presidentielle ?',
        answer:
          'Deux tours, sauf victoire au premier tour avec majorite absolue des suffrages exprimes, ce qui n’arrive pas dans les configurations contemporaines.',
      },
      {
        question: 'Qui se qualifie pour le second tour ?',
        answer:
          'Les deux candidats arrives en tete au premier tour.',
      },
      {
        question: 'Pourquoi les reports de voix comptent-ils autant ?',
        answer:
          'Parce qu’entre les deux tours, le scrutin devient un duel. Les electorats elimines du premier tour deviennent alors decisifs.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Voir les candidats', href: '/' },
      { label: 'Quand aura lieu la presidentielle 2027', href: '/quand-aura-lieu-la-presidentielle-2027/' },
    ],
  },
  {
    slug: 'simulateur-presidentielle-2027',
    title: 'Simulateur presidentielle 2027 : comparer les candidats et les scenarios',
    description:
      'Simulateur presidentielle 2027 : page d’entree pour comparer les candidats, les scenarios de sondages et les dynamiques de campagne.',
    heroEyebrow: 'Comparaison',
    heroTitle: 'Simulateur presidentielle 2027 : comparer au lieu de deviner',
    heroIntro:
      'Le site n’expose pas encore un simulateur mathematique complet, mais il sert deja de comparateur de campagne: candidats, scenarios de sondages, videos, tweets et attention media.',
    queries: [
      'simulateur presidentielle 2027',
      'comparateur presidentielle 2027',
    ],
    summary: [
      'Comparer les candidats sur leurs profils et leurs interventions.',
      'Comparer les scenarios de sondages institut par institut.',
      'Suivre les dynamiques media sans sortir du site.',
    ],
    sections: [
      {
        title: 'Pourquoi cette page existe',
        paragraphs: [
          'La requete simulateur presidentielle 2027 traduit un besoin de comparaison, pas seulement un besoin de prediction. Cette page oriente donc vers les bons outils disponibles aujourd’hui sur le site.',
          'Le visiteur peut comparer les profils, suivre les intentions de vote et lire les pages dediees aux candidats qui structurent deja la conversation publique.',
        ],
      },
      {
        title: 'Ce que le site sait deja faire',
        paragraphs: [
          'La page sondages donne un classement lisible par institut et par scenario. Les fiches candidats donnent les positions, interventions, videos, tweets et analyses de reseau.',
          'Cette combinaison constitue deja une base solide de comparaison. Un simulateur plus poussé pourra etre ajoute ensuite sans changer l’architecture de contenu.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Le site propose-t-il un simulateur de second tour ?',
        answer:
          'Pas encore sous la forme d’un outil de projection interactif complet. En revanche, il permet deja de comparer les scenarios testes par les instituts.',
      },
      {
        question: 'Ou commencer pour comparer les candidats ?',
        answer:
          'La page sondages puis les fiches candidats constituent aujourd’hui le chemin le plus utile.',
      },
      {
        question: 'Pourquoi parler de simulateur si l’outil n’est pas complet ?',
        answer:
          'Parce que l’intention de recherche est avant tout comparative. La page repond a cette attente sans promettre un modele predictif trompeur.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les sondages', href: '/polls' },
      { label: 'Voir les candidats', href: '/' },
      { label: 'Guide presidentielle 2027', href: '/presidentielle-2027/' },
    ],
  },
  candidatePage({
    slug: 'bardella-2027',
    title: 'Bardella 2027 : candidature, sondages et scenario presidentielle',
    description:
      'Bardella 2027 : comprendre la place de Jordan Bardella dans les sondages, sa relation avec Marine Le Pen et son poids dans les scenarios 2027.',
    heroTitle: 'Bardella 2027 : pourquoi Jordan Bardella compte deja dans la campagne',
    heroIntro:
      'La requete Bardella 2027 renvoie a une question simple: Jordan Bardella est-il un candidat central, un recours ou une hypothese conditionnelle ? Cette page oriente vers sa fiche et vers les sondages.',
    queries: ['bardella 2027', 'jordan bardella 2027', 'qui va gagner presidentielle 2027'],
    summary: [
      'Un profil cle du bloc RN dans les sondages.',
      'Une page utile pour lire sa relation politique avec Marine Le Pen.',
      'Un lien direct vers sa fiche complete et les scenarios de vote.',
    ],
    candidatePath: '/candidats/jordan-bardella',
    sections: [
      {
        title: 'Pourquoi la requete Bardella 2027 est si forte',
        paragraphs: [
          'Jordan Bardella incarne a la fois une candidature proprement envisagee dans certains scenarios et une variable de remplacement ou de projection pour l’espace politique du Rassemblement national.',
          'Les internautes cherchent donc a savoir s’il est simplement teste dans les sondages ou s’il devient une hypothese politique majeure. Le site replace cette question dans les sondages et les sources disponibles.',
        ],
      },
      {
        title: 'Que regarder en priorite',
        paragraphs: [
          'Il faut observer ses performances dans les intentions de vote, le type de scenario dans lequel il est teste et la nature de sa relation avec Marine Le Pen. C’est exactement ce que documentent la fiche candidat et la page sondages.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Jordan Bardella est-il officiellement candidat en 2027 ?',
        answer:
          'Le site indique son statut exact sur sa fiche. L’important est de distinguer declaration ferme, scenario conditionnel et simple test d’institut.',
      },
      {
        question: 'Pourquoi Bardella et Le Pen sont-ils souvent lies dans les recherches ?',
        answer:
          'Parce qu’ils occupent le meme espace politique et que certains scenarios font de Bardella une hypothese alternative ou complementaire.',
      },
      {
        question: 'Ou voir ses sondages ?',
        answer:
          'La page sondages et sa fiche detaillee donnent les deux lectures utiles.',
      },
    ],
  }),
  candidatePage({
    slug: 'le-pen-2027',
    title: 'Le Pen 2027 : candidature, statut et place dans les sondages',
    description:
      'Le Pen 2027 : suivre la situation politique de Marine Le Pen, son statut pour 2027 et sa place dans les intentions de vote.',
    heroTitle: 'Le Pen 2027 : un nom central pour lire la campagne',
    heroIntro:
      'La requete Le Pen 2027 reste l’une des plus fortes de l’espace politique francais. Cette page sert de pont entre la recherche Google, la fiche candidate et la lecture des sondages.',
    queries: ['le pen 2027', 'marine le pen 2027', 'sondage presidentielle 2027'],
    summary: [
      'Un nom majeur des requetes 2027.',
      'Une lecture a croiser entre statut personnel, bloc politique et scenarios de sondages.',
      'Un acces direct a la fiche complete et a la page sondages.',
    ],
    candidatePath: '/candidats/marine-le-pen',
    sections: [
      {
        title: 'Pourquoi la requete Le Pen 2027 est structurante',
        paragraphs: [
          'Marine Le Pen reste un point de repere pour lire l’ensemble du paysage 2027. Meme lorsque d’autres noms montent, son statut, sa capacite de candidature et l’effet de sa presence ou de son absence dans les scenarios changent l’interpretation des rapports de force.',
          'Le site traite cette question en montrant les sources, les scenarii et les evolutions de position plutot qu’en s’en tenant a un simple nom.',
        ],
      },
      {
        title: 'Quel usage faire de cette page',
        paragraphs: [
          'Si vous cherchez a comprendre son statut et son positionnement, ouvrez d’abord la fiche candidate. Si vous cherchez a savoir comment sa presence modifie la hierarchie 2027, la page sondages est la meilleure entree.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Marine Le Pen est-elle suivie dans les sondages 2027 ?',
        answer:
          'Oui, la page sondages du site permet de voir dans quels scenarios elle apparait et avec quels niveaux.',
      },
      {
        question: 'Pourquoi comparer Le Pen et Bardella ?',
        answer:
          'Parce que leurs scenarios se repondent souvent dans les recherches et dans l’espace politique du RN.',
      },
      {
        question: 'Ou lire ses positions et interventions ?',
        answer:
          'La fiche candidate concentre justement les positions, interventions, videos et tweets.',
      },
    ],
  }),
  candidatePage({
    slug: 'attal-president-2027',
    title: 'Attal president 2027 : candidature, ligne politique et sondages',
    description:
      'Attal president 2027 : suivre Gabriel Attal, son positionnement, ses ambitions pour 2027 et sa place dans les sondages.',
    heroTitle: 'Attal president 2027 : pourquoi Gabriel Attal cristallise la succession',
    heroIntro:
      'La requete Attal president 2027 ne cherche pas seulement un nom: elle cherche la place de Gabriel Attal dans l’apres-Macron. Cette page renvoie vers sa fiche detaillee et les sondages.',
    queries: ['attal president 2027', 'gabriel attal 2027', 'macron succession 2027'],
    summary: [
      'Un profil cle de la succession du bloc central.',
      'Une lecture croisee entre sondages, style politique et reseau d’alliances.',
      'Une fiche detaillee a consulter ensuite.',
    ],
    candidatePath: '/candidats/gabriel-attal',
    sections: [
      {
        title: 'Pourquoi Gabriel Attal est si recherche',
        paragraphs: [
          'Depuis la fermeture constitutionnelle de la voie Macron 2027, Gabriel Attal apparait comme l’un des principaux points de fixation de la succession. C’est ce qui rend la requete Attal president 2027 si frequente.',
          'Pour la lire correctement, il faut regarder a la fois son positionnement politique, sa capacite de rassemblement et sa place dans les scenarios de vote.',
        ],
      },
      {
        title: 'Ce que le site apporte sur Attal 2027',
        paragraphs: [
          'La fiche Attal rassemble les positions, interventions medias, videos, tweets et analyse de reseau. Elle permet de depasser le simple bruit de campagne pour comprendre sa construction de candidature.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Gabriel Attal est-il deja candidat ?',
        answer:
          'Le site indique son statut en clair sur sa fiche. C’est le bon endroit pour distinguer declaration, intention et scenario de sondage.',
      },
      {
        question: 'Pourquoi Attal est-il souvent relie a Macron 2027 ?',
        answer:
          'Parce qu’il fait partie des profils qui peuvent capter une partie de l’electorat, du reseau ou de l’espace politique du macronisme apres 2022.',
      },
      {
        question: 'Ou voir ses videos et ses tweets ?',
        answer:
          'La fiche Attal renvoie vers des onglets videos et tweets dedies.',
      },
    ],
  }),
  candidatePage({
    slug: 'edouard-philippe-2027',
    title: 'Edouard Philippe 2027 : candidature, profil et sondages',
    description:
      'Edouard Philippe 2027 : suivre sa candidature, son profil politique, ses positions et sa place dans les intentions de vote.',
    heroTitle: 'Edouard Philippe 2027 : un profil de pivot pour la presidentielle',
    heroIntro:
      'Edouard Philippe 2027 reste une recherche structurante du camp central et de la droite gouvernementale. Cette page sert de porte d’entree avant la fiche detaillee.',
    queries: ['edouard philippe 2027', 'philippe 2027', 'candidat centre droit 2027'],
    summary: [
      'Un candidat deja installe dans l’imaginaire 2027.',
      'Une lecture utile entre declaration, bloc politique et intentions de vote.',
      'Une fiche detaillee pour les positions, interventions et analyses.',
    ],
    candidatePath: '/candidats/edouard-philippe',
    sections: [
      {
        title: 'Pourquoi Edouard Philippe pese autant',
        paragraphs: [
          'Edouard Philippe dispose d’un niveau d’identification eleve, d’une image d’ancien Premier ministre et d’une capacite a etre teste comme profil de stabilite. Cela explique la persistance de la requete Edouard Philippe 2027.',
          'Le site permet de relier cette notoriete a des donnees plus utiles: sa fiche, ses videos, ses tweets et ses niveaux dans les sondages.',
        ],
      },
      {
        title: 'Comment lire sa candidature',
        paragraphs: [
          'Il faut regarder sa ligne politique propre, son autonomie par rapport au macronisme et sa capacite a capter un espace central ou de droite moderee. Les analyses du site ont ete organisees pour cette lecture.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Edouard Philippe est-il en campagne pour 2027 ?',
        answer:
          'La fiche detaillee du site permet de voir son statut, ses signaux politiques et ses prises de position recentes.',
      },
      {
        question: 'Pourquoi le comparer a Gabriel Attal ?',
        answer:
          'Parce qu’ils occupent tous deux une partie de l’espace post-Macron, mais avec des styles, reseaux et bases politiques differents.',
      },
      {
        question: 'Ou voir ses interventions ?',
        answer:
          'La fiche Edouard Philippe rassemble interventions medias, videos et tweets.',
      },
    ],
  }),
  candidatePage({
    slug: 'melenchon-2027',
    title: 'Melenchon 2027 : candidature, ligne politique et role a gauche',
    description:
      'Melenchon 2027 : comprendre son positionnement, son role dans la gauche 2027 et sa place dans les scenarios de sondages.',
    heroTitle: 'Melenchon 2027 : un acteur qui continue de structurer la gauche',
    heroIntro:
      'La requete Melenchon 2027 vise autant sa candidature eventuelle que sa capacite a structurer le jeu a gauche. Cette page renvoie vers sa fiche detaillee et les scenarios de sondages.',
    queries: ['melenchon 2027', 'jean luc melenchon 2027', 'gauche 2027'],
    summary: [
      'Une figure centrale du debat a gauche.',
      'Une lecture a mener avec les sondages et la strategie d’alliance.',
      'Une fiche detaillee pour ses positions, ses interventions et son reseau.',
    ],
    candidatePath: '/candidats/jean-luc-melenchon',
    sections: [
      {
        title: 'Pourquoi la requete Melenchon 2027 reste forte',
        paragraphs: [
          'Jean-Luc Melenchon conserve un pouvoir de structuration du debat a gauche: candidature directe, influence strategique, pression sur les alliances ou concurrence avec d’autres profils. C’est ce qui maintient son nom tres haut dans les recherches.',
          'Le site suit cette centralite au travers de sa fiche, de ses interventions et de la lecture de son reseau politique.',
        ],
      },
      {
        title: 'Que faut-il regarder en priorite',
        paragraphs: [
          'Le point cle consiste a observer le rapport entre sa ligne politique, l’espace insoumis et la facon dont les instituts le testent par rapport aux autres profils de gauche. La page sondages permet justement cette comparaison.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Jean-Luc Melenchon est-il suivi dans les sondages 2027 ?',
        answer:
          'Oui, lorsqu’il apparait dans les scenarios suivis, la page sondages permet de le comparer aux autres candidatures de gauche.',
      },
      {
        question: 'Pourquoi Melenchon est-il compare a Glucksmann ?',
        answer:
          'Parce qu’ils incarnent deux styles, deux coalitions et deux trajectoires distinctes de la gauche pour 2027.',
      },
      {
        question: 'Ou voir ses prises de parole ?',
        answer:
          'La fiche Melenchon renvoie vers les interventions, les videos et les tweets recents.',
      },
    ],
  }),
  candidatePage({
    slug: 'zemmour-2027',
    title: 'Zemmour 2027 : retour politique, sondages et place dans le debat',
    description:
      'Zemmour 2027 : suivre sa place dans les scenarios de sondages et comprendre son role dans l’espace politique de droite radicale.',
    heroTitle: 'Zemmour 2027 : pourquoi Eric Zemmour reste une requete de campagne',
    heroIntro:
      'La requete Zemmour 2027 continue d’exister parce qu’elle touche a la fragmentation de la droite radicale et a la concurrence entre plusieurs figures du meme espace politique.',
    queries: ['zemmour 2027', 'eric zemmour 2027', 'droite radicale 2027'],
    summary: [
      'Un nom qui continue a structurer certaines recherches 2027.',
      'Une lecture a mener surtout par les sondages et la recomposition de son espace politique.',
      'Une orientation vers les scenarios et les pages des autres candidats de cet espace.',
    ],
    candidatePath: null,
    sections: [
      {
        title: 'Pourquoi la requete existe encore',
        paragraphs: [
          'Eric Zemmour reste present dans les comparaisons, dans certaines hypothese de sondages et dans les raisonnements sur la dispersion ou la recomposition des droites. Meme sans etre la figure la plus probable du scrutin, son nom continue donc de compter dans le referencement 2027.',
          'Cette page a surtout pour role d’orienter la recherche vers les pages les plus utiles du site: sondages, Bardella 2027, Le Pen 2027 et vue generale sur les candidats.',
        ],
      },
      {
        title: 'Que faut-il regarder',
        paragraphs: [
          'Plutot qu’une simple intuition, il faut regarder si Zemmour apparait dans les scenarios suivis, a quel niveau et dans quel rapport de force avec les autres candidatures de droite radicale.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Eric Zemmour est-il present sur le site ?',
        answer:
          'Le site suit surtout les profils les plus structurants en base, mais la page sondages permet de reperer les scenarios ou son nom peut apparaitre.',
      },
      {
        question: 'Pourquoi relier Zemmour a Bardella et Le Pen ?',
        answer:
          'Parce qu’ils se disputent une partie d’un meme espace de lecture politique dans les requetes 2027.',
      },
      {
        question: 'Ou voir sa place dans les intentions de vote ?',
        answer:
          'La page sondages est la meilleure entree pour cette lecture.',
      },
    ],
  }),
  candidatePage({
    slug: 'glucksmann-2027',
    title: 'Glucksmann 2027 : candidature, espace politique et dynamique',
    description:
      'Glucksmann 2027 : suivre Raphael Glucksmann, sa trajectoire, son espace politique et sa place dans les scenarios presidentiels.',
    heroTitle: 'Glucksmann 2027 : pourquoi Raphael Glucksmann attire les recherches',
    heroIntro:
      'La requete Glucksmann 2027 cherche a mesurer sa capacite a devenir une candidature de gauche sociale-democrate ou europeenne capable d’exister seule.',
    queries: ['glucksmann 2027', 'raphael glucksmann 2027', 'gauche sociale democrate 2027'],
    summary: [
      'Un profil qui monte dans de nombreuses discussions 2027.',
      'Une lecture utile entre positionnement ideologique, potentiel electoral et strategie d’autonomie.',
      'Une fiche detaillee pour suivre ses positions, interventions et videos.',
    ],
    candidatePath: '/candidats/raphael-glucksmann',
    sections: [
      {
        title: 'Pourquoi la requete Glucksmann 2027 est en hausse',
        paragraphs: [
          'Raphael Glucksmann cristallise une partie des attentes autour d’une offre de gauche pro-europeenne, sociale-democrate et autonome. Cela suffit a faire de son nom une requete recurrente bien avant l’echeance.',
          'Le site suit cette dynamique avec une fiche dediee, des interventions, des videos, des tweets et une lecture de son espace politique.',
        ],
      },
      {
        title: 'Comment lire son profil',
        paragraphs: [
          'Il faut observer a la fois son positionnement propre, sa capacite de rassemblement a gauche et son exposition mediatique. C’est justement le croisement propose par la fiche candidat et la page sondages.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Raphael Glucksmann est-il deja candidat ?',
        answer:
          'Le site indique son statut exact sur sa fiche, ce qui permet d’eviter les approximations entre speculation et candidature assumee.',
      },
      {
        question: 'Pourquoi le comparer a Melenchon ?',
        answer:
          'Parce que la gauche 2027 se lit souvent a travers cette tension entre lignes, electorats et strategies concurrentes.',
      },
      {
        question: 'Ou voir ses prises de parole ?',
        answer:
          'La fiche Glucksmann regroupe les interventions, videos et tweets recents.',
      },
    ],
  }),
]

export function getSeoPageBySlug(slug) {
  return seoPages.find((page) => page.slug === slug) || null
}
