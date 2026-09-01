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
   * Éteint. Le portail de la mairie de Sommeval reste dans le dossier, avec sa
   * fiche complète et sa capture : il ne représente plus le niveau actuel et
   * sera remplacé, pas jeté. Rallumer cette ligne suffit à tout remettre —
   * l'entrée de navigation, le lien de pied de page, la section d'accueil, les
   * deux routes, leurs images de partage et les entrées du plan du site.
   *
   * Les trois démonstrations ne dépendent pas de cet interrupteur : elles
   * vivent auprès de l'offre, sur `/services` et sur l'accueil, et restent
   * visibles.
   */
  realisations: false,
} as const;
