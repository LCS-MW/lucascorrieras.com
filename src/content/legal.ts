import { site } from "@/content/site";

/* ===========================================================================
 *  MENTIONS LÉGALES — VALEURS À RENSEIGNER AVANT MISE EN LIGNE
 * ===========================================================================
 *
 *  Les mentions légales sont obligatoires en France pour un site
 *  professionnel (LCEN du 21 juin 2004, article 6-III). Un site qui n'en a
 *  pas est en infraction ; un site qui en publie de fausses l'est davantage.
 *
 *  Les champs marqués `À COMPLÉTER` ci-dessous font échouer `npm run build`
 *  tant qu'ils n'ont pas été remplis — voir `assertLegalComplete()`. Le
 *  serveur de développement, lui, fonctionne normalement.
 *
 *  Pour les retirer : effacer l'appel dans la page. Mais publier des mentions
 *  légales inventées est pire que ne pas en avoir.
 *
 * ======================================================================== */

export const PLACEHOLDER = "À COMPLÉTER";

export const legal = {
  /** Éditeur du site : la personne ou la société responsable. */
  editor: {
    /** Nom et prénom pour une entreprise individuelle, raison sociale sinon. */
    name: site.name,
    status: "Entrepreneur individuel (micro-entreprise)",
    /**
     * ⚠️ Le site actuellement en ligne avait retiré cette adresse — le
     * commentaire « Adresse supprimée comme demandé » est toujours dans son
     * code. Elle est remise ici parce que la LCEN l'impose pour une
     * entreprise individuelle. Si vous ne voulez pas publier une adresse
     * personnelle, la voie légale est une société de domiciliation, pas
     * l'omission.
     */
    address: `${site.street}, ${site.locality}`,
    /** 14 chiffres. Absent de l'ancien site, fourni séparément. */
    siret: "100 827 690 00015",
    /** Micro-entreprise en franchise en base. */
    vat: "TVA non applicable, article 293 B du CGI",
    email: site.email,
    /** Reprend `site.phone` s'il est renseigné. */
    phone: site.phone,
    /** Pour une entreprise individuelle, c'est l'éditeur lui-même. */
    publisher: site.name,
  },

  /**
   * Hébergeur. Ces valeurs sont celles de Vercel, qui sert déjà le domaine.
   * À corriger en cas de changement d'hébergeur.
   */
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
} as const;

/**
 * Échoue la compilation de production tant qu'un champ obligatoire porte
 * encore son marqueur. Appelée depuis la page des mentions légales, donc au
 * moment où Next la prérend.
 */
export function assertLegalComplete(): void {
  if (process.env.NODE_ENV !== "production") return;

  const missing = Object.entries(legal.editor)
    .filter(([, value]) => value === PLACEHOLDER)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Mentions légales incomplètes : ${missing.join(", ")}.\n` +
        `Renseignez ces champs dans src/content/legal.ts avant de construire ` +
        `pour la production. Publier des mentions légales inventées expose ` +
        `plus que ne pas en publier.`,
    );
  }
}
