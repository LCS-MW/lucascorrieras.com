/**
 * Noms de transition partagés entre deux pages.
 *
 * Il n'y en a qu'un, et c'est volontaire. Un nom partagé **déplace** l'élément
 * d'une page à l'autre au lieu de le dupliquer : il ne se pose que là où ce
 * déplacement est justement l'effet recherché. Posé sur un élément qui doit
 * rester en place — un libellé de navigation, par exemple — il le fait
 * disparaître de son emplacement pendant toute la durée de la transition.
 *
 * L'autre nom partagé du site, `soulignement`, est déclaré en CSS : il n'a pas
 * besoin d'être unique par élément, puisqu'un seul lien est actif à la fois.
 */

/** `atelier-vernet` → `apercu-atelier-vernet`. */
export function previewName(slug: string): string {
  return `apercu-${slug}`;
}
