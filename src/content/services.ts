import { floorLabel, pricing } from "@/content/pricing";

import type { SectionIntro } from "@/content/types";

/**
 * Les trois offres. Le texte visible parle de ce que le client obtient, et
 * seulement de ça.
 *
 * Il y avait ici une ligne de pile technique sous la boutique — « Shopify en
 * back-office · Next.js en façade ». Retirée : le visiteur est un artisan, ces
 * mots ne lui disent rien, et une seule carte sur trois en portait une, ce qui
 * poussait son prix plus bas que celui des deux autres.
 */
export const services = {
  intro: {
    index: "01",
    title: "Trois façons de travailler ensemble",
    note: "Le bon format dépend de ce que vous vendez et de qui doit vous trouver. On en parle avant de choisir.",
  } satisfies SectionIntro,

  /**
   * La seule phrase du site qui porte un montant. Placée sous les trois
   * offres, pas dessus : elle répond à la question qu'on se pose après avoir
   * lu ce qu'on obtient, pas avant.
   */
  floorNote: `Les projets démarrent à ${floorLabel}. Le montant exact dépend du nombre de pages et de ce que le site doit savoir faire. Il est arrêté par écrit avant de commencer.`,

  items: [
    {
      slug: "vitrine",
      name: "Site vitrine",
      summary:
        "Être trouvé, être compris, être contacté. Le nécessaire, fait correctement.",
      body: "Vos métiers, vos réalisations, vos horaires et vos coordonnées. Un visiteur qui arrive comprend en dix secondes ce que vous faites et comment vous joindre.",
      includes: [
        "Trois à cinq pages",
        "Vos textes et vos photos mis en forme",
        "Formulaire de contact qui arrive dans votre boîte mail",
        "Vos informations d’entreprise lisibles par Google",
      ],
      from: pricing.from.vitrine,
    },
    {
      slug: "sur-mesure",
      name: "Site sur mesure",
      summary: "Quand votre activité ne rentre pas dans cinq pages standard.",
      body: "Chaque page est dessinée pour ce que vous vendez. La structure, les animations et le rythme de lecture suivent votre métier, pas un gabarit.",
      includes: [
        "Nombre de pages arrêté dans la proposition",
        "Mise en page dessinée de bout en bout",
        "Animations pensées une par une, jamais décoratives",
        "Vos textes retravaillés pour le web",
      ],
      from: pricing.from.surMesure,
    },
    {
      slug: "boutique",
      name: "Boutique en ligne",
      summary: "Vendre en ligne sans changer votre façon de travailler.",
      body: "Vous gérez vos produits, vos stocks et vos commandes depuis un tableau de bord fait pour ça. La boutique que voient vos clients, elle, est construite sur mesure.",
      includes: [
        "Tableau de bord de gestion complet",
        "Paiement et livraison configurés",
        "Fiches produit dessinées pour vos articles",
        "Formation à la prise en main",
      ],
      from: pricing.from.boutique,
    },
  ],
} as const;
