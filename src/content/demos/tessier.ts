/** Contenu du site de démonstration Maison Tessier. Traiteur. */
export const tessier = {
  meta: {
    title: "Maison Tessier — Traiteur",
    description:
      "Formules, minimums, budget par personne et zone de déplacement. Tout est écrit : vous n’avez pas à téléphoner pour le savoir.",
  },

  nav: {
    brand: "Maison Tessier",
    links: ["Formules", "Occasions", "Devis"],
  },

  hero: {
    eyebrow: "Traiteur · Vallée de la Loire",
    title: "Vous n’avez pas à appeler pour savoir combien ça coûte",
    lead: "Les trois questions qu’on nous pose au téléphone ont leur réponse écrite sur cette page. Vous saurez en une minute si nous sommes faits pour votre réception.",
    action: "Demander un devis",
  },

  /** Le cœur du site : répondre avant l'appel. */
  answers: {
    title: "Répondu avant que vous décrochiez",
    items: [
      {
        question: "À partir de combien de personnes ?",
        answer: "25 convives",
        detail:
          "En dessous, nous vous orientons vers un confrère qui le fait mieux que nous.",
      },
      {
        question: "Quel budget par personne ?",
        answer: "38 – 72 €",
        detail:
          "Selon la formule, service et matériel compris. Boissons en sus.",
      },
      {
        question: "Jusqu’où vous déplacez-vous ?",
        answer: "60 km",
        detail:
          "Autour de Tours. Au-delà, comptez 1,20 € du kilomètre aller-retour.",
      },
      {
        question: "Combien de temps à l’avance ?",
        answer: "6 semaines",
        detail: "Trois mois de mai à septembre, qui est notre période chargée.",
      },
    ],
  },

  menus: {
    index: "01",
    title: "Trois formules",
    note: "Elles se composent avec vous. Ce sont des points de départ, pas des cases.",
    items: [
      {
        name: "Cocktail dînatoire",
        price: "38 € / pers.",
        min: "25 convives",
        summary:
          "Douze pièces salées, trois sucrées, servies debout sur trois heures.",
        includes: [
          "Douze pièces salées par personne",
          "Trois pièces sucrées",
          "Vaisselle et mange-debout",
          "Deux personnes en service",
        ],
        featured: false,
      },
      {
        name: "Repas assis",
        price: "58 € / pers.",
        min: "30 convives",
        summary:
          "Entrée, plat, fromage, dessert. Le classique, fait sérieusement.",
        includes: [
          "Quatre services",
          "Pain de la boulangerie Marceau",
          "Nappage, vaisselle, verrerie",
          "Un serveur pour vingt convives",
        ],
        featured: true,
      },
      {
        name: "Grande table",
        price: "72 € / pers.",
        min: "40 convives",
        summary:
          "Plats posés au centre, servis en continu. On mange comme à la maison, en plus grand.",
        includes: [
          "Six plats en partage",
          "Découpe à la table",
          "Vaisselle en grès de Ligré",
          "Chef présent sur place",
        ],
        featured: false,
      },
    ],
  },

  occasions: {
    index: "02",
    title: "Ce pour quoi on nous appelle",
    items: [
      {
        name: "Mariages",
        detail: "De 40 à 180 convives. Un seul mariage par week-end.",
      },
      {
        name: "Repas d’entreprise",
        detail: "Sur site, y compris sans cuisine sur place.",
      },
      { name: "Anniversaires", detail: "À la maison ou en salle louée." },
      { name: "Obsèques", detail: "Prévenus la veille, nous nous organisons." },
    ],
  },

  availability: {
    title: "Dates encore libres",
    note: "Mis à jour chaque lundi. Une date grisée est déjà prise.",
    months: [
      { name: "Septembre", open: ["5", "12", "19"], taken: ["26"] },
      { name: "Octobre", open: ["3", "10", "24", "31"], taken: ["17"] },
      { name: "Novembre", open: ["7", "14", "21", "28"], taken: [] },
    ],
  },

  quote: {
    index: "03",
    title: "Demande de devis",
    lead: "Cinq champs. Vous recevez un chiffrage écrit sous deux jours ouvrés, sans qu’on ait eu à se parler.",
    fields: [
      { label: "Date de la réception", type: "date", hint: "" },
      { label: "Nombre de convives", type: "number", hint: "Minimum 25" },
      { label: "Commune", type: "text", hint: "Pour vérifier la zone" },
      {
        label: "Formule envisagée",
        type: "select",
        hint: "Cocktail, repas assis, grande table",
      },
      {
        label: "Votre adresse électronique",
        type: "email",
        hint: "C’est là que part le devis",
      },
    ],
    action: "Recevoir mon devis",
    reassurance: "Aucun engagement. Nous ne rappelons que si vous le demandez.",
  },
} as const;
