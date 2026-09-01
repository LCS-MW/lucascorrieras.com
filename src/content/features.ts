/* ===========================================================================
 *  CE QUE LE SITE AFFICHE — INTERRUPTEURS DE CONTENU
 * ===========================================================================
 *
 *  Un site vitrine ment surtout par omission inverse : en montrant ce qu'il
 *  n'a pas encore. Ce fichier tient les parties qui dépendent d'un état réel
 *  de l'activité, et qui doivent rester éteintes tant que cet état n'est pas
 *  atteint.
 *
 *  Rallumer une entrée suffit : la navigation, le pied de page, l'accueil, le
 *  plan du site et les routes concernées la lisent tous ici.
 *
 * ======================================================================== */

export const features = {
  /**
   * Section et pages « Réalisations ».
   *
   * Éteint tant qu'aucun site n'a été livré à un client. Les trois projets du
   * dossier sont des concepts : les présenter sous le mot « réalisations »
   * laisse entendre une commande qui n'a pas eu lieu, quelle que soit
   * l'étiquette posée à côté.
   *
   * Les trois démonstrations restent en ligne sous `/demo/`, en `noindex` et
   * sans lien depuis le site : ce sont des URL à envoyer à un prospect, pas
   * une galerie publique.
   */
  realisations: false,
} as const;
