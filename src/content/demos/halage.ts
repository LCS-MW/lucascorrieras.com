/** Contenu du site de démonstration Studio Halage. Céramique, boutique. */
export const halage = {
  meta: {
    title: "Studio Halage — Céramique",
    description:
      "Pièces uniques tournées à la main. Stock réel, dimensions réelles, variations de cuisson assumées.",
  },

  nav: {
    brand: "Studio Halage",
    links: ["Boutique", "L’atelier", "Panier"],
  },

  hero: {
    eyebrow: "Atelier de céramique · Nantes",
    title: "Chaque pièce est seule de son espèce",
    lead: "Tourné, émaillé et cuit à l’atelier. Le stock affiché est le stock réel : quand une pièce part, elle ne revient pas.",
    action: "Voir les pièces disponibles",
  },

  shop: {
    index: "01",
    title: "Pièces disponibles",
    note: "Sept pièces sorties de la fournée du 12 août. La prochaine ouvre le 9 septembre.",
    items: [
      {
        name: "Bol à thé",
        glaze: "glaze-celadon",
        glazeName: "Céladon",
        price: "38 €",
        size: "Ø 11 · h. 7 cm",
        volume: "22 cl",
        stock: 1,
        flaw: "Coulure d’émail sur le pied, côté droit.",
      },
      {
        name: "Pichet à eau",
        glaze: "glaze-cendre",
        glazeName: "Cendre",
        price: "72 €",
        size: "Ø 13 · h. 21 cm",
        volume: "1,1 L",
        stock: 1,
        flaw: "Bec légèrement asymétrique, il verse droit.",
      },
      {
        name: "Assiette creuse",
        glaze: "glaze-terre",
        glazeName: "Terre",
        price: "44 €",
        size: "Ø 22 · h. 4 cm",
        volume: "50 cl",
        stock: 2,
        flaw: "Trois points de cuisson visibles au revers.",
      },
      {
        name: "Vase col étroit",
        glaze: "glaze-nuit",
        glazeName: "Nuit",
        price: "96 €",
        size: "Ø 14 · h. 28 cm",
        volume: "1,8 L",
        stock: 1,
        flaw: "Micro-craquelure d’émail sur la panse.",
      },
      {
        name: "Tasse à anse",
        glaze: "glaze-celadon",
        glazeName: "Céladon",
        price: "34 €",
        size: "Ø 8 · h. 9 cm",
        volume: "18 cl",
        stock: 0,
        flaw: "Anse posée à la main, prise plus large que la moyenne.",
      },
      {
        name: "Coupe basse",
        glaze: "glaze-terre",
        glazeName: "Terre",
        price: "58 €",
        size: "Ø 26 · h. 6 cm",
        volume: "90 cl",
        stock: 1,
        flaw: "Léger voile de four sur un tiers du marli.",
      },
    ],
    soldLabel: "Vendu",
    nextBatch: "Prochaine fournée le 9 septembre",
  },

  product: {
    index: "02",
    title: "Fiche d’une pièce",
    piece: {
      name: "Vase col étroit",
      glaze: "glaze-nuit",
      glazeName: "Émail Nuit",
      price: "96 €",
      stock: 1,
      description:
        "Tourné en grès chamotté, émaillé au bleu de four et cuit à 1 280 °C. Le col étroit tient une tige seule ; il n’est pas fait pour un bouquet.",
      specs: [
        { label: "Diamètre", value: "14 cm" },
        { label: "Hauteur", value: "28 cm" },
        { label: "Contenance", value: "1,8 L" },
        { label: "Poids", value: "1 340 g" },
        { label: "Terre", value: "Grès chamotté" },
        { label: "Cuisson", value: "1 280 °C, four à gaz" },
      ],
      flaws: {
        title: "Ce que vous verrez en le déballant",
        items: [
          "Une micro-craquelure d’émail sur la panse, côté gauche. Elle ne traverse pas la terre.",
          "Le bleu tire au vert sur le tiers bas : c’est la flamme du four, pas un défaut.",
          "Le pied est brut, non émaillé. Il râpe légèrement sur une table nue.",
        ],
      },
      action: "Ajouter au panier",
      care: "Lavage à la main. Ne passe pas au micro-ondes : la chamotte chauffe trop vite.",
    },
  },

  cart: {
    index: "03",
    title: "Panier",
    lines: [
      {
        name: "Vase col étroit",
        glazeName: "Émail Nuit",
        price: "96 €",
        quantity: 1,
      },
      { name: "Bol à thé", glazeName: "Céladon", price: "38 €", quantity: 1 },
    ],
    summary: [
      { label: "Sous-total", value: "134 €" },
      { label: "Emballage renforcé", value: "Offert" },
      { label: "Livraison France", value: "9 €" },
    ],
    total: { label: "Total", value: "143 €" },
    action: "Régler la commande",
    note: "Expédition sous cinq jours ouvrés, calée à la main dans du papier recyclé.",
  },
} as const;
