import { pricing } from "@/content/pricing";
import { site } from "@/content/site";

/**
 * Page contact. Pas de formulaire pour l'instant : un formulaire qui n'envoie
 * rien coûte plus cher qu'une adresse mail qui marche. Il viendra quand il y
 * aura de quoi le recevoir.
 *
 * Le téléphone, lui, n'attend qu'un numéro dans `site.ts`. Il est monté avant
 * le courriel parce que la cible du site — artisans, commerçants — appelle
 * plus qu'elle n'écrit, et parce qu'un lien `mailto:` sur un mobile sans
 * messagerie configurée ne mène nulle part.
 *
 * Aucun délai de réponse chiffré : un délai garanti est un engagement de
 * service qu'une personne seule ne tient pas tous les mois de l'année.
 */
export const contact = {
  emailLabel: "Par mail",
  email: site.email,

  phoneLabel: "Par téléphone",
  phone: site.phone,
  phoneAction: "Appeler",

  areaLabel: "Zone d’intervention",
  area: site.area,

  // « Suivi : je réponds à chaque demande » a été retiré de la fiche : c'est
  // mot pour mot ce que dit déjà l'accroche de la page, et la quatrième
  // entrée renvoyait seule à la ligne dans une grille de trois colonnes.

  checklist: {
    title: "Ce qu’il est utile de me dire",
    note: "Rien d’obligatoire. Plus le message est précis, plus ma réponse l’est.",
    items: [
      "Votre métier et où vous exercez",
      "Ce que le site doit permettre : être trouvé, montrer votre travail, vendre",
      "Si vous avez déjà un site, et ce qui ne vous convient pas dedans",
      "Votre échéance, si vous en avez une",
      "Le budget que vous aviez en tête, même approximatif",
    ],
  },

  next: {
    title: "Ce qui se passe ensuite",
    steps: [
      "Je lis votre message et je vous réponds, même si c’est pour vous orienter vers quelqu’un d’autre.",
      `Si le projet me semble tenir, on prend ${pricing.call.minutes} minutes au téléphone.`,
      "Vous recevez un prix ferme et un délai par écrit. À vous de voir.",
    ],
  },
} as const;
