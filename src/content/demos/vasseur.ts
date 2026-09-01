/**
 * Démonstration — plomberie et chauffage.
 *
 * Registre courant. Le site qu'un artisan de quartier devrait avoir : on
 * trouve le numéro sans chercher, on sait ce qu'il fait, où il se déplace et
 * quand il répond. Rien d'autre.
 *
 * Aucun client derrière : tous les noms, chiffres et communes sont inventés.
 */
export const vasseur = {
  meta: {
    title: "Vasseur Plomberie Chauffage · Troyes et alentours",
    description:
      "Dépannage, installation et entretien de chauffage et de plomberie à Troyes et dans l’Aube. Devis gratuit, intervention rapide.",
  },

  nav: {
    brand: "Vasseur",
    trade: "Plomberie · Chauffage",
    links: ["Prestations", "Zone d’intervention", "Contact"],
    phone: "03 25 00 00 00",
    phoneLabel: "Appeler",
  },

  hero: {
    title: "Plombier chauffagiste à Troyes depuis 1998",
    lead: "Dépannage, installation et entretien. Je me déplace dans un rayon de 30 km autour de Troyes, du lundi au samedi.",
    actions: { primary: "Appeler maintenant", secondary: "Demander un devis" },
    reassurance: [
      "Devis gratuit et sans engagement",
      "Déplacement facturé au forfait, annoncé avant",
      "Artisan déclaré, assurance décennale",
    ],
  },

  urgent: {
    label: "Fuite ou panne de chauffage ?",
    body: "Appelez, je réponds moi-même. Si je ne peux pas venir dans la journée, je vous le dis tout de suite.",
    action: "03 25 00 00 00",
  },

  services: {
    title: "Ce que je fais",
    lead: "Trois domaines, et rien en dehors. Ce que je ne sais pas faire, je vous oriente vers quelqu’un qui le fait.",
    items: [
      {
        name: "Dépannage",
        body: "Fuite, canalisation bouchée, chauffe-eau en panne, radiateur froid.",
        points: ["Recherche de fuite", "Débouchage", "Remplacement en urgence"],
      },
      {
        name: "Installation",
        body: "Salle de bains complète, chaudière, chauffe-eau, réseau neuf ou refait.",
        points: [
          "Chaudière gaz et pompe à chaleur",
          "Salle de bains clés en main",
          "Mise aux normes",
        ],
      },
      {
        name: "Entretien",
        body: "La visite annuelle obligatoire, et le petit réglage qui évite la grosse panne.",
        points: [
          "Entretien de chaudière",
          "Contrat annuel",
          "Attestation fournie",
        ],
      },
    ],
  },

  area: {
    title: "Zone d’intervention",
    body: "Troyes et les communes dans un rayon de 30 km. Au-delà, appelez quand même : si c’est sur ma route, je passe.",
    towns: [
      "Troyes",
      "Sainte-Savine",
      "La Chapelle-Saint-Luc",
      "Saint-André-les-Vergers",
      "Pont-Sainte-Marie",
      "Barberey-Saint-Sulpice",
      "Bréviandes",
      "Rosières-près-Troyes",
    ],
  },

  hours: {
    title: "Horaires",
    lead: "Le téléphone sonne chez moi. Si je suis sous un évier, je rappelle en fin de journée.",
    rows: [
      { day: "Lundi au vendredi", value: "8 h – 12 h · 14 h – 18 h" },
      { day: "Samedi", value: "8 h – 12 h" },
      { day: "Dimanche", value: "Fermé" },
    ],
  },

  contact: {
    title: "Un devis, une question ?",
    body: "Appelez ou écrivez. Décrivez le problème en deux lignes et joignez une photo si vous en avez une : ça me fait gagner un déplacement, et vous aussi.",
    phone: "03 25 00 00 00",
    email: "contact@vasseur-plomberie.fr",
    address: "12 rue des Bas-Trévois, 10000 Troyes",
  },

  footer: {
    legal: "SIRET 000 000 000 00000 · Assurance décennale AXA n° 0000000",
    links: ["Mentions légales", "Politique de confidentialité"],
  },
} as const;
