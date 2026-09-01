import type { SectionIntro } from "@/content/types";

/**
 * Les sites réellement commandés, conçus et mis en ligne. Rien d'autre.
 *
 * Les exercices vivent dans `demo-sites.ts` et s'affichent auprès de l'offre,
 * pas ici : un site qu'on a inventé pour montrer une manière de travailler
 * n'est pas une réalisation, quelle que soit l'étiquette posée à côté.
 *
 * `demo` pointe vers le site en ligne, et `preview` vers sa capture : c'est le
 * même écran, pas une illustration.
 */
export const projects = {
  intro: {
    index: "06",
    title: "Réalisation",
    note: "Un site commandé, conçu et mis en ligne. Au singulier, parce qu’il n’y en a qu’un.",
  } satisfies SectionIntro,

  /** Titre de la section « réponses » sur chaque fiche projet. */
  answersTitle: "Ce que le site en fait",

  items: [
    {
      slug: "mairie-sommeval",
      demo: "https://sae301.mmi24b11.mmi-troyes.fr",
      demoLabel: "Ouvrir le site",
      preview: "/realisations/mairie-sommeval.webp",
      previewAlt:
        "Accueil du portail de la mairie de Sommeval : photo du village, actualités, horaires d’ouverture et météo du jour.",
      name: "Mairie de Sommeval",
      trade: "Commune de l’Aube",
      status: "En ligne",
      year: "2026",
      summary:
        "Le portail d’une commune de quelques centaines d’habitants : actualités, informations pratiques, horaires et espace de gestion. Mené seul, du maquettage à la mise en production.",
      metaDescription:
        "Portail de la mairie de Sommeval : actualités, informations pratiques, horaires et espace de gestion. Projet mené seul du maquettage à la mise en production.",

      context:
        "Projet mené dans le cadre de ma formation en BUT MMI à Troyes, pour un commanditaire réel. Le site est en ligne.",

      intent:
        "Une commune de quelques centaines d’habitants n’a ni service communication ni budget d’agence. Elle a pourtant les mêmes obligations qu’une grande ville : publier ses actualités, ses horaires et ses démarches, et rester accessible à tout le monde.",
      problem: {
        title: "Le point de départ",
        body: "Le site précédent tournait sous WordPress. Les informations les plus consultées — les horaires d’ouverture, la dernière actualité — étaient aussi les plus pénibles à changer, et il fallait quelqu’un qui sache s’en servir. Dans une commune de cette taille, ce n’est le métier de personne.",
      },
      answers: [
        {
          title: "Maquetté avant d’être développé",
          body: "Les écrans ont été dessinés et arrêtés avant la première ligne de code. C’est la méthode que j’applique aux projets suivants : on discute sur un plan, pas sur un site à moitié construit.",
        },
        {
          title: "Ce qu’on cherche vraiment, en haut",
          body: "Les horaires n’affichent pas un tableau : ils disent si la mairie est ouverte maintenant. Les actualités, la météo et le planning de la salle communale tiennent sur le premier écran, parce que ce sont les trois raisons d’aller sur le site.",
        },
        {
          title: "Un espace de gestion pour la mairie",
          body: "Les actualités, les horaires et les documents se modifient depuis un tableau de bord. Personne n’a besoin de me rappeler pour publier une annonce.",
        },
        {
          title: "L’accessibilité prise à l’endroit",
          body: "Un service public doit être utilisable par tout le monde, et la loi l’impose. Contrastes, navigation au clavier, textes de remplacement : traités pendant la conception, pas ajoutés à la fin. Le site publie sa déclaration d’accessibilité.",
        },
      ],
      specs: [
        { label: "Commanditaire", value: "Mairie de Sommeval" },
        { label: "Rôle", value: "Conception et développement" },
        { label: "État", value: "En ligne" },
      ],
    },
  ],
} as const;

export type Project = (typeof projects.items)[number];

/** Les sites réellement commandés et mis en ligne. */
export const built = projects.items;

export function findProject(slug: string): Project | undefined {
  return projects.items.find((project) => project.slug === slug);
}
