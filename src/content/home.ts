import { features } from "@/content/features";

import type { Action } from "@/content/types";

export const home = {
  hero: {
    eyebrow: "Designer et développeur, en indépendant",
    frame: {
      layer: "H1 / Accroche",
      unit: "px",
      /* La poignée de largeur du cadre. `grabLabel` est son nom accessible,
         `grabHint` l'invite montrée dans la marge au survol — sans elle,
         personne ne devine que le bord se tire. */
      grabLabel: "Largeur du cadre du titre",
      grabHint: "Tirez le bord",
      marginLabel: "Marge",
    },
    title: "Conçu et codé par la même personne",
    lead: "Pas d’agence entre nous, pas de sous-traitance, pas de thème acheté et rhabillé aux couleurs de votre entreprise. Vous parlez à la personne qui dessine vos pages et qui écrit le site derrière.",
    actions: {
      primary: { label: "Parler de votre projet", href: "/contact" },
      /* Dérivé de l'interrupteur, pas recopié : ce bouton a déjà pointé une
         fois vers une rubrique éteinte, donc vers une 404, parce que les deux
         valeurs vivaient à deux endroits. */
      secondary: features.realisations
        ? { label: "Voir les réalisations", href: "/realisations" }
        : { label: "Voir les services", href: "/services" },
    } satisfies Record<string, Action>,
  },
} as const;
