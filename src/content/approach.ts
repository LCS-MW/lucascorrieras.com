import type { SectionIntro } from "@/content/types";

/**
 * Quatre différences, formulées comme des faits contrôlables. Aucune ne
 * demande de croire sur parole : chacune se vérifie sur le site livré.
 *
 * Elles parlent de la manière de construire, jamais du résultat qu'on
 * obtiendrait : une audience, un classement ou un taux de conversion ne se
 * promettent pas.
 */
export const approach = {
  intro: {
    index: "05",
    title: "Ce qui change",
    note: "Quatre différences concrètes avec ce qui se pratique habituellement.",
  } satisfies SectionIntro,

  items: [
    {
      title: "Une seule personne",
      body: "Vous n’expliquez votre métier qu’une fois. Celui qui vous écoute est celui qui dessine, et celui qui écrit le code. Rien ne se perd entre deux interlocuteurs.",
    },
    {
      title: "Rien d’acheté, tout dessiné",
      body: "Pas de thème repris et rhabillé. Votre site ne ressemble pas à celui de votre concurrent, parce qu’il n’en partage pas la base.",
    },
    {
      title: "Rapide parce que léger",
      body: "Le site n’embarque que ce qu’il affiche : pas de bibliothèque chargée pour trois effets, pas d’image envoyée plus grande qu’elle ne s’affiche. La vitesse vient de là, pas d’un réglage posé en fin de chantier.",
    },
    {
      title: "Vous restez propriétaire",
      body: "Le code, le nom de domaine et les comptes sont à votre nom dès le départ. Vous pouvez confier le site à quelqu’un d’autre sans rien avoir à demander.",
    },
  ],
} as const;
