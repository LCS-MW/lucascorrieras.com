import { features } from "@/content/features";

import type { Action } from "@/content/types";

/**
 * L'entrée « Réalisations » est insérée par condition, pas masquée en CSS :
 * un lien caché reste dans l'arbre d'accessibilité, dans l'ordre de
 * tabulation et dans le HTML lu par un moteur.
 */
const work: Action = { href: "/realisations", label: "Réalisations" };

const mainLinks: Action[] = [
  { href: "/services", label: "Services" },
  ...(features.realisations ? [work] : []),
  { href: "/approche", label: "Approche" },
  { href: "/contact", label: "Contact" },
];

export const nav = {
  label: "Navigation principale",
  brand: "Lucas Corrieras",
  /** Premier élément focalisable de la page. */
  skip: { href: "#contenu", label: "Aller au contenu" },
  links: mainLinks,
};

export const footer = {
  label: "Pied de page",
  tagline:
    "Sites sur mesure pour les artisans, les commerçants et les indépendants.",
  columns: [
    {
      title: "Le site",
      links: [
        { href: "/services", label: "Services" },
        ...(features.realisations ? [work] : []),
        { href: "/approche", label: "Approche" },
      ] satisfies Action[],
    },
    {
      title: "Parler du projet",
      links: [{ href: "/contact", label: "Contact" }] satisfies Action[],
    },
  ],

  /**
   * Bas de page, sur la ligne du domaine. Les mentions légales sont
   * obligatoires et doivent être accessibles depuis toutes les pages — d'où
   * le pied de page plutôt qu'une colonne de navigation.
   */
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/cgv", label: "CGV" },
  ] satisfies Action[],
};
