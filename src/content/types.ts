/**
 * Formes partagées par les fichiers de contenu. Chaque fichier les vérifie
 * avec `satisfies`, ce qui garde le typage strict sans perdre les valeurs
 * littérales à la lecture.
 */

/** Un lien d'action : bouton, appel à l'action, lien de navigation. */
export type Action = {
  label: string;
  href: string;
};

/** En-tête de section : numéro en mono, titre, phrase de cadrage. */
export type SectionIntro = {
  index: string;
  title: string;
  note: string;
};

/**
 * Étiquette technique. Rendue dans la voix utilitaire (mono, majuscules), à
 * l'écart du texte courant : c'est le seul endroit où un terme de métier a le
 * droit d'apparaître.
 */
export type TechSpec = string;

/** Métadonnées et en-tête d'une page. Un seul h1 par page, c'est celui-ci. */
export type PageContent = {
  /** Titre d'onglet et de partage. Le nom du site est ajouté par le layout. */
  metaTitle: string;
  /** Étiquette mono au-dessus du titre. Situe la page en trois mots. */
  kicker: string;
  metaDescription: string;
  h1: string;
  lead: string;
};
