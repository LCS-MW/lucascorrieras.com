import type { Action } from "@/content/types";

/**
 * Pages d'erreur.
 *
 * Une page d'erreur n'a qu'un travail : ne pas être un cul-de-sac. Elle dit
 * ce qui s'est passé sans jargon, ne reproche rien au visiteur, et redonne
 * une porte à pousser. Le reste est de la décoration sur un échec.
 *
 * Aucun message technique n'est montré. Sur une erreur d'exécution, seul
 * l'identifiant de trace apparaît — il ne dit rien de l'intérieur du site et
 * c'est ce qui permet de retrouver la panne si quelqu'un le recopie.
 */
export const errors = {
  /** Adresse inconnue, ou page retirée. */
  notFound: {
    label: "Page introuvable",
    code: "404",
    title: "Cette adresse ne mène nulle part.",
    lead: "Soit elle a été mal recopiée, soit la page n’existe plus. Rien de grave. Voici par où reprendre.",
    actions: {
      primary: { label: "Retour à l’accueil", href: "/" },
      secondary: { label: "Voir les services", href: "/services" },
    } satisfies Record<string, Action>,
  },

  /** Erreur d'exécution attrapée par la frontière d'erreur. */
  failure: {
    label: "Erreur inattendue",
    code: "500",
    title: "Quelque chose a cassé de mon côté.",
    lead: "Ce n’est pas vous. Une erreur s’est produite pendant l’affichage de cette page. Réessayez. Si ça recommence, écrivez-moi et je regarde.",
    retry: "Réessayer",
    contact: { label: "M’écrire", href: "/contact" } satisfies Action,
    /** Précède l'identifiant de trace, quand il existe. */
    digestLabel: "Référence",
  },

  /** Panne avant même le chargement du document. */
  fatal: {
    label: "Erreur",
    code: "500",
    title: "Le site n’a pas pu s’afficher.",
    lead: "Une erreur s’est produite avant le chargement de la page. Rechargez : dans la plupart des cas, ça suffit.",
    retry: "Recharger la page",
  },
} as const;
