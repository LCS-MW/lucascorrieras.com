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

/** Une pièce qui se détache de l'écran pendant l'éclatement. */
export type Piece = {
  /** Identifie la pièce en CSS et relie son étiquette à son bloc d'étude. */
  id: string;
  /** Étiquette de calque, en voix utilitaire. */
  label: string;
  /** Cote affichée à côté de l'étiquette. */
  cote: string;
  /** Titre du temps d'étude de cas correspondant. */
  title: string;
  /** Ce que la pièce prouve, en langage de visiteur. */
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
      note: "Un site n’est pas une image. C’est un empilement de pièces dont la moitié ne se voit jamais.",
    } satisfies SectionIntro,

    /**
     * Décrit la scène pour qui ne voit pas l'écran.
     *
     * Ne promet pas les quatre pièces : sous 48 rem elles ne sont pas rendues,
     * seul le portable l'est. Le texte renvoie donc à la section suivante, qui
     * les porte toutes, à toutes les largeurs.
     */
    description:
      "Schéma d’un ordinateur portable affichant la carte du restaurant, accompagné des quatre pièces qui le composent : le premier écran, la carte des plats, l’API qui sert les données et l’interface de gestion. Sur grand écran, elles se détachent au défilement. Chacune est détaillée dans la section suivante.",

    screen: {
      alt: "Page d’accueil du site : le titre « Le Restaurant » sur fond crème, avec un motif de feuillage au trait et une barre de navigation entrées, plats, desserts.",
      label: "Écran",
      cote: "1280 × 800",
    },

    carte: {
      alt: "Deux fiches de plats côte à côte : une photo, le nom du plat et sa description.",
    },
  },

  study: {
    intro: {
      index: "02",
      title: "Pièce par pièce",
      note: "Chaque morceau détaché, et ce qu’il change pour le restaurant.",
    } satisfies SectionIntro,
  },

  pieces: [
    {
      id: "ecran",
      label: "Premier écran",
      cote: "01",
      title: "Ce qu’on voit en arrivant",
      body: "Le nom du restaurant, une phrase, et le sommaire de la carte en bas de l’écran. Un client qui cherche le menu avant de réserver sait où aller dès la première seconde. Le reste de la page est de la décoration, et la décoration passe après.",
      specs: ["Next.js", "Rendu côté serveur", "Titre affiché en premier"],
    },
    {
      id: "carte",
      label: "La carte",
      cote: "02",
      title: "Neuf plats, aucun codé en dur",
      body: "Les plats, leurs photos, leurs prix et leurs allergènes viennent tous de la base. Changer un prix ne demande pas de me rappeler, et retirer un plat de la carte du soir prend le temps de décocher une case.",
      specs: ["PostgreSQL", "9 plats en base", "Allergènes normalisés"],
    },
    {
      id: "api",
      label: "L’API",
      cote: "03",
      title: "La partie qu’on ne voit jamais",
      body: "Entre la base et la page, il y a une API qui sert les données dans un format standard. C’est elle qui permettra plus tard d’ajouter une commande en ligne ou une application, sans rien reconstruire. Voici ce qu’elle renvoie réellement pour une entrée.",
      specs: ["Symfony", "API Platform", "JSON-LD"],
    },
    {
      id: "gestion",
      label: "Gestion",
      cote: "04",
      title: "Le restaurant reprend la main",
      body: "Une interface protégée par mot de passe, où l’on ajoute un plat, on téléverse sa photo et on le publie. C’est la différence entre un site qu’il faut faire modifier et un site dont on est propriétaire.",
      specs: ["EasyAdmin", "Accès protégé", "Téléversement d’images"],
    },
  ] satisfies Piece[],

  /** Le bloc de code de la pièce « API ». */
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
