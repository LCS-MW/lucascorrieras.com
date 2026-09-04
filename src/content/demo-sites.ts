import type { Action, SectionIntro } from "@/content/types";

/**
 * Les trois sites de démonstration.
 *
 * Ils ne sont pas des réalisations et ne figurent pas dans `projects.ts` :
 * aucun client n'est derrière. Leur place est auprès de l'offre, là où le
 * visiteur se demande « un site vitrine, ça donne quoi ? », et non sur une
 * page qui s'appelle Réalisations.
 *
 * Ils sont choisis pour s'opposer, pas pour se ressembler. Trois registres de
 * direction artistique : l'ordinaire, le haut de gamme, le petit commerce. Ce
 * qu'ils démontrent n'est pas un style, c'est l'amplitude — savoir s'abstenir
 * quand le sujet ne demande rien vaut autant que savoir en faire quand il le
 * demande.
 */
export const demoSites = {
  intro: {
    index: "02",
    title: "À quoi ça ressemble",
    note: "Trois métiers, trois registres. Ce ne sont pas des clients : ce sont trois sites complets faits pour montrer l’amplitude.",
  } satisfies SectionIntro,

  notice:
    "Ces trois sites sont des exercices. Aucun n’a été commandé et aucune entreprise ne se cache derrière. Les noms, les prix et les chiffres sont inventés.",

  action: "Ouvrir le site",

  /**
   * Renvoi vers l'étude de cas, qui n'est pas de la même nature que ces trois
   * démonstrations : là-bas l'entreprise était réelle et le site est parti en
   * ligne. Le lien est posé après les trois, pas avant, parce qu'il répond à
   * la question suivante — « d'accord, mais qu'est-ce qu'il y a dessous ? ».
   */
  caseStudy: {
    href: "/demonstrations/carte-restaurant",
    label: "Voir une construction complète, démontée pièce par pièce",
  } satisfies Action,

  items: [
    {
      slug: "vasseur-plomberie",
      name: "Vasseur",
      trade: "Plomberie et chauffage",
      register: "Le registre courant",
      summary:
        "Le numéro de téléphone est l’élément le plus visible de la page. Un bandeau d’urgence, trois encadrés de prestations, une liste de communes. Rien à remarquer, tout à trouver.",
      preview: "/realisations/vasseur.webp",
      previewAlt:
        "Accueil du site Vasseur : bandeau bleu, bouton d’appel, encadrés de prestations sur fond gris.",
    },
    {
      slug: "cardot-ebenisterie",
      name: "Cardot",
      trade: "Ébénisterie d’art",
      register: "Le registre haut de gamme",
      summary:
        "Aucune barre de navigation, aucun bouton plein, un titre de sept rem. La hiérarchie se fait au blanc et à l’échelle. Ce qui vend ici, c’est ce qu’on ne met pas.",
      preview: "/realisations/cardot.webp",
      previewAlt:
        "Accueil du site Cardot : immense titre en didone sur fond crème, bandeau de bois pleine largeur.",
    },
    {
      slug: "miellerie-othe",
      name: "Miellerie du Pays d’Othe",
      trade: "Vente directe",
      register: "Le registre boutique",
      summary:
        "Une grille de produits où le prix arrive juste après le nom, le calendrier des marchés, les horaires de la ferme. Chaleureux, direct, sans prétention graphique.",
      preview: "/realisations/othe.webp",
      previewAlt:
        "Accueil de la Miellerie du Pays d’Othe : bandeau ambre, cartes de pots de miel avec leurs prix.",
    },
  ],
} as const;
