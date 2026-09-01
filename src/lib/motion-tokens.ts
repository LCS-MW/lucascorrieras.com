/**
 * Vocabulaire de mouvement du site. Volontairement séparé de `lib/gsap` :
 * ce fichier n'importe rien, il peut donc être lu par n'importe quel module
 * sans traîner GSAP derrière lui.
 */

/**
 * Durées de référence, en secondes. Nommées par intention : on choisit ce que
 * l'animation fait, pas combien de temps elle dure.
 */
export const DURATION = {
  /** Retour à une action directe : survol, appui, bascule. */
  feedback: 0.18,
  /** Ouverture ou fermeture d'un élément d'interface. */
  ui: 0.4,
  /** Révélation d'un bloc à l'entrée dans le viewport. */
  reveal: 0.8,
  /** Grand déplacement qui conduit le regard d'un point à un autre. */
  travel: 1.1,
} as const;

/**
 * Eases nommés par intention, pour que deux sections écrites à six mois
 * d'écart bougent de la même manière. Pas de rebond, pas d'élastique : le
 * mouvement doit rester net.
 */
export const EASE = {
  /** Révélation : décélération franche, arrivée nette. */
  reveal: "power3.out",
  /** Interface : symétrique, pour un aller-retour lisible. */
  ui: "power2.inOut",
  /** Feedback : court et sec, la main doit sentir la réponse. */
  feedback: "power2.out",
  /** Déplacement long : départ très rapide, fin longue et posée. */
  travel: "expo.out",
  /** Mouvement continu, sans accélération ni fin. */
  continuous: "none",
} as const;

export type DurationName = keyof typeof DURATION;
export type EaseName = keyof typeof EASE;
