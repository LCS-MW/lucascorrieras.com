/** Contenu du site de démonstration Atelier Vernet. Menuiserie sur mesure. */
export const vernet = {
  meta: {
    title: "Atelier Vernet — Menuiserie sur mesure",
    description:
      "Escaliers, bibliothèques et agencements dessinés puis fabriqués à la pièce, en chêne, frêne et noyer.",
  },

  nav: {
    brand: "Atelier Vernet",
    links: ["Savoir-faire", "Réalisations", "Contact"],
  },

  hero: {
    eyebrow: "Menuiserie sur mesure · Depuis 1994",
    title: "Du bois travaillé pour durer trente ans",
    lead: "Escaliers, bibliothèques et agencements dessinés puis fabriqués dans notre atelier, pièce par pièce. Ni panneau, ni placage, ni visserie apparente.",
    actions: {
      primary: "Voir les réalisations",
      secondary: "Demander un devis",
    },
    facts: [
      { value: "31", label: "ans d’atelier" },
      { value: "3", label: "compagnons" },
      { value: "80 km", label: "rayon d’approvisionnement" },
    ],
  },

  craft: {
    index: "I",
    title: "Ce qui change quand c’est fait à la main",
    items: [
      {
        title: "Assemblages à tenon et mortaise",
        body: "Pas de vis, pas d’équerre métallique. Le bois tient par sa géométrie, et il continue de tenir quand il travaille avec les saisons.",
      },
      {
        title: "Bois sciés à moins de 80 km",
        body: "Chêne, frêne et noyer d’une scierie du département. Nous savons de quelle parcelle vient chaque grume et depuis combien de temps elle sèche.",
      },
      {
        title: "Séchage de dix-huit mois",
        body: "Le bois passe un an et demi sous abri avant d’être débité. C’est ce qui évite qu’un plateau se voile deux hivers plus tard.",
      },
      {
        title: "Finitions à l’huile dure",
        body: "Une finition qui se répare au chiffon. Une rayure se reprend chez vous en dix minutes, sans ponceuse et sans nous rappeler.",
      },
    ],
  },

  work: {
    index: "II",
    title: "Réalisations",
    note: "Chaque pièce dit son essence, son délai de fabrication et sa fourchette de prix. Vous savez à quoi vous attendre avant de nous appeler.",
    pieces: [
      {
        name: "Escalier deux quarts tournants",
        wood: "wood-noyer",
        essence: "Noyer massif",
        size: "14 marches · 2,90 m",
        lead: "9 semaines",
        price: "12 000 – 16 000 €",
        note: "Limon central sculpté dans une seule pièce. Aucune marche rapportée.",
        span: true,
      },
      {
        name: "Bibliothèque toute hauteur",
        wood: "wood-chene",
        essence: "Chêne de pays",
        size: "4,20 × 2,70 m",
        lead: "6 semaines",
        price: "7 500 – 9 000 €",
        note: "Montants rainurés, tablettes réglables au centimètre.",
        span: false,
      },
      {
        name: "Îlot de cuisine",
        wood: "wood-frene",
        essence: "Frêne olivier",
        size: "2,40 × 1,10 m",
        lead: "7 semaines",
        price: "8 000 – 11 000 €",
        note: "Plateau d’un seul tenant, dosse conservée sur le chant long.",
        span: false,
      },
      {
        name: "Verrière d’atelier",
        wood: "wood-noyer",
        essence: "Noyer et acier",
        size: "3,60 × 2,40 m",
        lead: "5 semaines",
        price: "5 500 – 7 000 €",
        note: "Traverses en bois, montants en acier noirci à la cire.",
        span: true,
      },
    ],
  },

  contact: {
    index: "III",
    title: "Parlons de votre pièce",
    lead: "Dites-nous ce que vous voulez, où, et pour quand. Nous répondons sous trois jours avec une fourchette et un délai.",
    fields: [
      {
        label: "Ce que vous voulez faire faire",
        hint: "Escalier, bibliothèque, agencement…",
      },
      { label: "Où", hint: "Commune ou code postal" },
      { label: "Pour quand", hint: "Une date approximative suffit" },
      { label: "Comment vous joindre", hint: "Téléphone ou courriel" },
    ],
    action: "Envoyer la demande",
    address: {
      lines: ["12 chemin des Scieries", "38160 Saint-Marcellin"],
      phone: "04 76 00 00 00",
      hours: "Atelier ouvert du lundi au vendredi, 8 h – 17 h",
    },
  },
} as const;
