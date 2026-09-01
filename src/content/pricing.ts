/* ===========================================================================
 *  VALEURS COMMERCIALES — À AJUSTER AVANT MISE EN LIGNE
 * ===========================================================================
 *
 *  Seul fichier du site où figurent des montants, des délais et des durées
 *  d'engagement. Aucun de ces chiffres n'est écrit ailleurs : les textes qui
 *  les mentionnent les reprennent d'ici. Changer un prix ou un délai se fait
 *  donc à un seul endroit.
 *
 *  Les trois offres restent sur devis — aucun montant par carte. Un « à
 *  partir de X » par offre fixe l'attente de l'acheteur, et tout devis
 *  au-dessus se lit ensuite comme une augmentation.
 *
 *  Un seul chiffre est public : `floor`, le plancher sous lequel aucun projet
 *  n'est pris. Il ne sert pas à comparer, il sert à qualifier — quelqu'un qui
 *  cherche un site à 300 € repart de lui-même, et celui qui reste sait déjà
 *  dans quel ordre de grandeur on parle.
 *
 *  Ne remettez ici ni délai de livraison global, ni durée de corrections
 *  incluses : la date est donnée projet par projet dans la proposition, et le
 *  site ne doit promettre aucun service après livraison.
 *
 * ======================================================================== */

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Montant en euros, sans centimes. */
export function formatPrice(amount: number): string {
  return euros.format(amount);
}

export const pricing = {
  /** Prix plancher de chaque offre. `null` = sur devis, pas de montant affiché. */
  from: {
    vitrine: null,
    surMesure: null,
    boutique: null,
  },

  /**
   * Plancher affiché. Aucun projet n'est pris en dessous.
   *
   * C'est le seul montant public du site : il apparaît en une phrase sous les
   * trois offres, jamais sur une carte.
   */
  floor: 1000,

  /** Durée du premier échange, annoncé comme gratuit et sans engagement. */
  call: {
    minutes: 30,
  },
} as const;

/** « à partir de 1 500 € », ou « Sur devis » si aucun montant n'est fixé. */
export function fromLabel(amount: number | null): string {
  return amount === null ? "Sur devis" : `À partir de ${formatPrice(amount)}`;
}

/** Le plancher, mis en forme pour le texte courant. */
export const floorLabel = formatPrice(pricing.floor);
