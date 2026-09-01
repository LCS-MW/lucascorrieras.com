/**
 * Démonstration — miellerie.
 *
 * Registre petite boutique. Une production familiale qui vend en direct, sur
 * les marchés et à la ferme. Le site doit dire trois choses : ce qu'on vend,
 * combien ça coûte, et où on nous trouve samedi matin.
 *
 * Aucun client derrière : tous les noms, prix, marchés et chiffres sont
 * inventés.
 */
export const othe = {
  meta: {
    title: "Miellerie du Pays d’Othe · Miels de l’Aube",
    description:
      "Miels récoltés dans le Pays d’Othe : acacia, tilleul, forêt et toutes fleurs. Vente à la miellerie et sur les marchés de l’Aube.",
  },

  nav: {
    brand: "Miellerie du Pays d’Othe",
    links: ["Nos miels", "Les marchés", "La miellerie"],
    action: "Où nous trouver",
  },

  hero: {
    eyebrow: "Récolte 2026",
    title: "Nos miels viennent d’ici, et de nulle part ailleurs.",
    lead: "Quatre-vingts ruches posées entre Aix-en-Othe et Chaource. On récolte, on met en pot, on vend. Il n’y a personne entre les abeilles et vous.",
    action: "Voir les miels",
  },

  shop: {
    title: "Nos miels",
    lead: "Pots de 250 g et 500 g. Les prix sont les mêmes à la miellerie et sur les marchés.",
    items: [
      {
        name: "Acacia",
        note: "Très doux, presque transparent. Reste liquide longtemps.",
        weight: "500 g",
        price: "12,50 €",
        stock: "En stock",
      },
      {
        name: "Tilleul",
        note: "Franc et mentholé. Le préféré de ceux qui trouvent l’acacia trop sage.",
        weight: "500 g",
        price: "11,00 €",
        stock: "En stock",
      },
      {
        name: "Forêt",
        note: "Sombre, corsé, un peu résineux. Récolte de fin d’été.",
        weight: "500 g",
        price: "13,00 €",
        stock: "Dernier lot",
      },
      {
        name: "Toutes fleurs",
        note: "Ce que les abeilles ont trouvé au printemps. Change chaque année.",
        weight: "500 g",
        price: "9,50 €",
        stock: "En stock",
      },
    ],
  },

  markets: {
    title: "Les marchés",
    lead: "On y est toute l’année, sauf en août. Le stand est toujours au même endroit.",
    rows: [
      {
        day: "Mercredi",
        place: "Aix-en-Othe · place de la Halle",
        time: "8 h – 12 h 30",
      },
      {
        day: "Samedi",
        place: "Troyes · marché des Halles",
        time: "7 h – 13 h",
      },
      {
        day: "Dimanche",
        place: "Chaource · place de l’Église",
        time: "8 h – 12 h",
      },
    ],
  },

  farm: {
    title: "À la miellerie",
    body: "On ouvre la boutique le vendredi après-midi et le samedi matin. Vous pouvez voir la salle d’extraction, goûter avant d’acheter, et repartir avec vos pots consignés.",
    facts: [
      { value: "80", label: "ruches" },
      { value: "6", label: "communes" },
      { value: "1976", label: "première récolte" },
    ],
    action: "Voir le plan",
  },

  contact: {
    title: "Nous joindre",
    body: "Pour une commande, un cadeau d’entreprise ou juste une question sur un miel.",
    phone: "03 25 00 00 00",
    email: "bonjour@miellerie-pays-othe.fr",
    address: "4 route de Villemaur, 10160 Aix-en-Othe",
  },

  footer: {
    note: "Miellerie familiale depuis 1976 · Vente directe uniquement",
    links: ["Mentions légales", "Confidentialité"],
  },
} as const;
