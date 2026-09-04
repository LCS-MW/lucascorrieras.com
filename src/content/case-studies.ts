import type { PageContent, SectionIntro, TechSpec } from "@/content/types";

/**
 * Étude de cas d'une construction complète.
 *
 * Ce fichier n'est pas `projects.ts` et ne doit pas le devenir. La règle posée
 * là-bas tient : une réalisation est un site commandé, conçu et mis en ligne.
 * Ici, le site a bien été construit et mis en ligne, mais la commande n'est
 * jamais venue. C'est une proposition, et la page le dit dès la première
 * phrase plutôt que de laisser le visiteur le déduire.
 *
 * Ce n'est pas non plus une démonstration au sens de `demo-sites.ts` : là-bas
 * les entreprises sont inventées et les chiffres aussi. Ici tout est réel, y
 * compris l'adresse en ligne et l'API qui répond.
 */

/** Un calque de la pile, du plus visible au plus enfoui. */
export type Layer = {
  /** Identifie le calque en CSS et relie son étiquette à son texte. */
  id: string;
  /** Étiquette de calque, en voix utilitaire. */
  label: string;
  /** Cote affichée à côté de l'étiquette. */
  cote: string;
  /** Quel visuel le calque porte. Le composant en décide le rendu. */
  visual: string;
  /** Titre du temps de lecture, quand la caméra se pose dessus. */
  title: string;
  /** Ce que le calque change pour le restaurant, en langage de visiteur. */
  body: string;
  /** Étiquettes techniques, à l'écart du texte courant. */
  specs: TechSpec[];
};

/**
 * Extrait réel renvoyé par l'API du projet, relevé sur `/api/plats`.
 *
 * L'ordre des clés est celui de la réponse. Les quatre dernières — la
 * description et les trois adresses d'images — sont remplacées par des points
 * de suspension, et rien d'autre n'est retouché : un extrait présenté comme
 * « ce qu'elle renvoie réellement » qui aurait été réordonné pour faire joli
 * ne serait plus un extrait.
 *
 * C'est du texte et non une capture, pour trois raisons : le poids est nul, le
 * contenu reste lisible au lecteur d'écran et indexable, et l'adresse du
 * serveur n'a pas à être affichée sur un site commercial.
 */
const API_EXTRAIT = `{
  "@id": "/api/plats/101",
  "@type": "Plat",
  "id": 101,
  "prix": "22",
  "category": "entree",
  "allergenes": ["molluscs", "nuts"],
  "isVisible": true,
  "vues": 1,
  "nom": "Carpaccio de Saint-Jacques",
  ...
}`;

export const carteRestaurant = {
  slug: "carte-restaurant",

  page: {
    metaTitle: "Carte de restaurant, du dessin à la mise en ligne",
    kicker: "Étude de cas",
    metaDescription:
      "Une carte de restaurant en ligne, construite de bout en bout : site public, interface de gestion, base de données et API. Le détail de ce qu’il y a derrière un écran.",
    h1: "Ce qu’il y a derrière un écran",
    lead: "Une carte de restaurant qui se modifie depuis un navigateur, sans appeler personne. Voici la même page, démontée pièce par pièce.",
  } satisfies PageContent,

  /**
   * Le cadre est posé avant tout le reste. Un visiteur qui apprend en fin de
   * page que le projet n'a pas eu de suite a déjà lu ce qui précède comme une
   * référence commerciale.
   */
  frame: {
    label: "Statut",
    body: "Ce site a été construit pour un restaurant qui étudiait un projet. Il n’a pas donné suite. Je le montre quand même, parce qu’il est terminé, en ligne, et qu’il montre exactement ce que je livre. Rien n’y est simulé : l’adresse fonctionne, la carte se charge depuis une base de données, et l’interface de gestion existe.",
    action: { label: "Ouvrir le site", href: "https://carte-vitrine-fullstack.vercel.app" },
  },

  explode: {
    intro: {
      index: "01",
      title: "La page, démontée",
      note: "Un site n’est pas une image. C’est un empilement de calques dont la moitié ne se voit jamais. Faites défiler : la pile s’ouvre, puis on la traverse.",
    } satisfies SectionIntro,

    /**
     * Décrit la pile pour qui ne voit pas l'écran. Les sept calques sont
     * ensuite énumérés en texte réel, donc ce paragraphe dit la forme, pas le
     * contenu.
     */
    description:
      "Schéma en perspective : les sept calques qui composent le site du restaurant, empilés puis écartés les uns des autres, de la page visible jusqu’aux serveurs qui la font tourner.",

    /** Étiquette de l'axe, dans la voix utilitaire. */
    axis: { near: "Ce qu’on voit", far: "Ce qui fait tourner" },

    /** Textes de remplacement des deux seules captures de la pile. */
    alts: {
      accueil:
        "Page d’accueil du site : le titre « Le Restaurant » sur fond crème, avec un motif de feuillage au trait et une barre de navigation entrées, plats, desserts.",
      carte:
        "Deux fiches de plats côte à côte : une photo, le nom du plat et sa description.",
    },
  },

  /**
   * Les sept calques, du plus visible au plus enfoui. L'ordre est celui de la
   * traversée : la caméra part de la page et s'enfonce jusqu'aux conteneurs.
   *
   * Chaque chiffre cité est relevé dans le projet réel, pas estimé :
   *   - 9 plats, 3 par catégorie      → GET /api/plats, totalItems et category
   *   - 9 allergènes distincts        → union des tableaux `allergenes`
   *   - 2 entrées d'administration    → MenuItem dans src/Controller/Admin
   *   - 4 conteneurs                  → services de docker-compose.yml
   * Ne pas les modifier sans les relever à nouveau.
   */
  layers: [
    {
      id: "ecran",
      label: "Le premier écran",
      cote: "01",
      visual: "capture-accueil",
      title: "Ce qu’on voit en arrivant",
      body: "Le nom du restaurant, une phrase, et le sommaire de la carte juste en dessous. Un client qui cherche le menu avant de réserver sait où aller dès la première seconde.",
      specs: ["Next.js", "Rendu côté serveur"],
    },
    {
      id: "navigation",
      label: "La navigation",
      cote: "02",
      visual: "schema-nav",
      title: "Trois entrées, pas une de plus",
      body: "Entrées, plats, desserts. Un menu de restaurant n’a pas besoin d’autre chose, et chaque lien descend directement à sa section au lieu de recharger une page.",
      specs: ["3 ancres", "Barre toujours visible"],
    },
    {
      id: "carte",
      label: "La carte",
      cote: "03",
      visual: "capture-carte",
      title: "Neuf plats, aucun codé en dur",
      body: "Trois entrées, trois plats, trois desserts. Leurs photos, leurs prix et leurs allergènes viennent tous de la base. Retirer un plat de la carte du soir prend le temps de décocher une case.",
      specs: ["9 plats", "3 par catégorie"],
    },
    {
      id: "api",
      label: "L’API",
      cote: "04",
      visual: "code-api",
      title: "La partie qu’on ne voit jamais",
      body: "Entre la base et la page, une API sert les données dans un format standard. C’est elle qui permettra d’ajouter une commande en ligne ou une application, sans rien reconstruire.",
      specs: ["Symfony", "API Platform", "JSON-LD"],
    },
    {
      id: "base",
      label: "La base",
      cote: "05",
      visual: "schema-base",
      title: "Une seule table, bien remplie",
      body: "Un plat, c’est une ligne : un nom, un prix, une catégorie, une photo, une liste d’allergènes et une case « visible ». Neuf allergènes différents sont gérés, avec les noms officiels européens.",
      specs: ["PostgreSQL", "9 allergènes normalisés"],
    },
    {
      id: "gestion",
      label: "La gestion",
      cote: "06",
      visual: "schema-gestion",
      title: "Le restaurant reprend la main",
      body: "Une interface protégée par mot de passe, où l’on ajoute un plat, on téléverse sa photo et on le publie. C’est la différence entre un site qu’il faut faire modifier et un site dont on est propriétaire.",
      specs: ["EasyAdmin", "Accès protégé"],
    },
    {
      id: "hebergement",
      label: "L’hébergement",
      cote: "07",
      visual: "schema-hebergement",
      title: "Quatre machines qui n’en font qu’une",
      body: "La base, le serveur, le routeur d’adresses et le site public tournent chacun dans leur boîte. C’est ce qui permet de remonter l’ensemble à l’identique ailleurs, sans repartir de zéro.",
      specs: ["Docker", "4 conteneurs"],
    },
  ] satisfies Layer[],

  /** Le bloc de code du calque « API ». */
  api: {
    caption: "Réponse de /api/plats, premier élément",
    code: API_EXTRAIT,
  },

  /**
   * Structure réelle de l'interface de gestion, relevée dans le code du projet :
   * les deux entrées de menu viennent du tableau de bord EasyAdmin, les champs
   * de l'entité `Plat` et de sa traduction.
   *
   * L'écran lui-même est protégé par authentification : il ne peut pas être
   * capturé, et fabriquer une fausse capture d'un back-office serait
   * exactement le genre de preuve inventée que le reste du site s'interdit.
   *
   * ⚠️ Une première version listait quatre tables — Plats, Catégories,
   * Allergènes, Photos — dont trois n'existent pas. Le projet a une seule
   * entité métier, `Plat` : la catégorie est un champ texte, les allergènes un
   * tableau, la photo un fichier joint. Ne pas réinventer ce schéma sans
   * relire `backend/src/Entity/`.
   */
  gestion: {
    caption: "Structure de l’interface de gestion",
    menuLabel: "Le menu",
    menu: ["Tableau de bord", "Carte & Plats"],
    fieldsLabel: "Ce qu’on remplit pour un plat",
    fields: ["Nom", "Description", "Prix", "Catégorie", "Allergènes", "Photo", "Visible"],
  },

  /** Les trois catégories et leur compte, relevés sur l'API. */
  base: {
    caption: "Table « plat », neuf lignes",
    columns: ["Nom", "Prix", "Catégorie", "Allergènes", "Visible"],
    counts: [
      { label: "Entrées", value: "3" },
      { label: "Plats", value: "3" },
      { label: "Desserts", value: "3" },
    ],
  },

  /** Les quatre services de `docker-compose.yml`, dans l'ordre du fichier. */
  hebergement: {
    caption: "Quatre conteneurs",
    /**
     * Noms exacts des services de `docker-compose.yml`, et un rôle en un mot.
     * Les rôles sont courts à dessein : la vignette met son contenu en page à
     * sa taille réduite avant d'être agrandie par la caméra, donc une étiquette
     * qui ne tient pas là se retrouve tronquée même en gros plan.
     */
    services: [
      { name: "database", role: "Base" },
      { name: "backend", role: "Serveur" },
      { name: "nginx", role: "Routeur" },
      { name: "frontend", role: "Site" },
    ],
  },

  /** Les trois ancres de la barre de navigation du site décrit. */
  navigation: {
    caption: "Les trois ancres",
    items: ["Entrées", "Plats", "Desserts"],
  },

  stack: {
    intro: {
      index: "03",
      title: "Ce qui tourne derrière",
      note: "L’inventaire complet, pour ceux que ça intéresse.",
    } satisfies SectionIntro,
    items: [
      { label: "Site public", value: "Next.js, rendu serveur, déployé sur Vercel" },
      { label: "Serveur", value: "Symfony avec API Platform, API en JSON-LD" },
      { label: "Base de données", value: "PostgreSQL" },
      { label: "Gestion", value: "EasyAdmin, accès protégé, téléversement d’images" },
      { label: "Environnement", value: "Docker, un conteneur par service" },
      {
        label: "Ce que je referais",
        value:
          "Les photos de plats partent en pleine résolution : 1,7 Mio à elles seules, sur 2 Mio de page. C’est le premier chantier d’une v2.",
      },
    ],
  },
} as const;
