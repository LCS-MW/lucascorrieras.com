/**
 * Démonstration — ébénisterie d'art.
 *
 * Registre haut de gamme. Le site d'un atelier dont une pièce se compte en
 * mois de travail : peu de mots, beaucoup de blanc, aucune promesse de prix.
 * Ce qui vend ici n'est pas l'argument mais la retenue.
 *
 * Aucun client derrière : tous les noms, pièces et dates sont inventés.
 */
export const cardot = {
  meta: {
    title: "Cardot · Ébénisterie d’art",
    description:
      "Atelier d’ébénisterie d’art. Pièces uniques dessinées et fabriquées à la commande, en bois massif.",
  },

  nav: {
    brand: "Cardot",
    trade: "Ébénisterie d’art",
    contact: "Prendre rendez-vous",
  },

  hero: {
    title: "Une pièce, un an, une main.",
    lead: "L’atelier ne produit pas de série. Chaque meuble est dessiné pour un lieu, fabriqué en bois massif, et signé.",
    caption: "Cabinet en noyer et sycomore · Commande privée · 2024",
  },

  statement: {
    label: "L’atelier",
    body: [
      "Fondé en 1976, l’atelier travaille pour des particuliers, des architectes et deux musées. Il n’emploie personne : les pièces sortent d’un établi et d’une paire de mains.",
      "On ne prend pas plus de quatre commandes par an. C’est ce qui permet de passer trois semaines sur un tiroir sans avoir à s’en excuser.",
    ],
  },

  pieces: {
    label: "Pièces récentes",
    items: [
      {
        name: "Cabinet Perrin",
        wood: "Noyer, sycomore, ébène de Macassar",
        year: "2024",
        note: "Trente-deux tiroirs, aucun ferrage visible. Ouverture au doigt.",
      },
      {
        name: "Table Sénone",
        wood: "Chêne de tranche, plateau d’un seul tenant",
        year: "2023",
        note: "Quatre mètres, sans entretoise. La portée tient par l’assemblage.",
      },
      {
        name: "Secrétaire Vau",
        wood: "Poirier étuvé, laiton patiné",
        year: "2023",
        note: "Marqueterie de paille sur l’abattant, posée brin par brin.",
      },
    ],
  },

  quote: {
    text: "Le bois ne pardonne pas la précipitation. Il ne pardonne pas non plus l’à-peu-près, mais ça, on l’apprend plus tôt.",
    author: "Henri Cardot",
  },

  method: {
    label: "Comment on travaille",
    steps: [
      {
        title: "La visite",
        body: "On regarde le lieu, la lumière, ce qui existe déjà. Un meuble dessiné hors de son mur est un meuble raté.",
      },
      {
        title: "Le dessin",
        body: "Un plan à l’échelle, puis un essai d’assemblage grandeur nature. Rien n’est lancé avant votre accord.",
      },
      {
        title: "L’établi",
        body: "De six mois à deux ans selon la pièce. Vous êtes invité à venir la voir avancer autant que vous le souhaitez.",
      },
    ],
  },

  contact: {
    label: "L’atelier",
    address: "Chemin de la Scierie, 10210 Chaource",
    phone: "03 25 00 00 00",
    email: "atelier@cardot-ebenisterie.fr",
    note: "Visites sur rendez-vous, du mardi au vendredi.",
  },
} as const;
