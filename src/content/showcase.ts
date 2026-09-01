import type { SectionIntro } from "@/content/types";

/**
 * Section « maquette vers site ».
 *
 * Les deux états sont superposés dans le composant et interpolés par la
 * variable CSS `--showcase-progress` (0 = maquette annotée, 1 = site fini).
 * Rien n'est un fondu entre deux images : chaque propriété se calcule à partir
 * de cette seule valeur, ce qui rend la transition continue et réversible.
 *
 * Le pilotage de cette variable au scroll est un travail à part.
 */
export const showcase = {
  intro: {
    index: "03",
    title: "De la maquette au site",
    note: "Le même écran, du plan annoté au résultat livré. C’est le passage que la plupart des gens ne voient jamais.",
  } satisfies SectionIntro,

  states: {
    from: "Maquette",
    to: "Site en ligne",
  },

  /**
   * L'écran est une illustration : il est retiré de l'arbre d'accessibilité
   * et remplacé par cette description, qui dit la même chose en une phrase.
   */
  description:
    "Une page de menuisier passe de son plan annoté à sa version livrée. Le plan montre des blocs gris, des contours pointillés, des cotes et des libellés. La version livrée a ses couleurs, ses titres et son contenu.",

  /** Faux écran de site, utilisé comme sujet de la démonstration. */
  screen: {
    header: {
      label: "En-tête",
      cote: "64",
      brand: "Atelier Vernet",
      links: ["Réalisations", "L’atelier", "Contact"],
    },
    hero: {
      label: "Accroche",
      cote: "480 × 260",
      title: "Du bois travaillé pour durer trente ans",
      body: "Escaliers, bibliothèques et agencements dessinés puis fabriqués dans notre atelier, à la pièce.",
      action: "Demander un devis",
    },
    cards: {
      label: "Trois blocs",
      cote: "3 × 160",
      items: [
        { title: "Sur mesure", body: "Rien n’est repris d’un catalogue." },
        {
          title: "Bois locaux",
          body: "Chêne et frêne sciés à moins de 80 km.",
        },
        {
          title: "Garantie 10 ans",
          body: "Sur les assemblages et les finitions.",
        },
      ],
    },
  },
} as const;
