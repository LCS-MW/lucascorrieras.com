import type { SectionIntro } from "@/content/types";

/**
 * Trois projets fictifs.
 *
 * Aucun client n'est derrière : ce sont des exercices, faits pour montrer une
 * manière de travailler. C'est dit en toutes lettres sur la page comme sur
 * chaque fiche. Le jour où un vrai projet les remplace, la mention `status`
 * disparaît avec lui.
 *
 * `demo` pointe vers le site de démonstration correspondant, sous `/demo`, et
 * `preview` vers sa capture — c'est le même écran, pas une illustration.
 */
export const projects = {
  intro: {
    index: "04",
    title: "Réalisations",
    note: "Trois projets conçus de bout en bout, sans commanditaire. Ils montrent une façon de traiter un métier, pas une liste de clients.",
  } satisfies SectionIntro,

  /** Titre de la section « réponses » sur chaque fiche projet. */
  answersTitle: "Ce que le site en fait",

  /** Lien vers la démonstration, depuis la fiche projet. */
  demoLabel: "Ouvrir le site de démonstration",

  notice:
    "Ces trois projets sont des concepts. Ils n’ont pas été commandés et ne sont pas en ligne. Je préfère le dire que laisser croire à un portfolio de clients.",

  items: [
    {
      slug: "atelier-vernet",
      demo: "/demo/atelier-vernet",
      preview: "/realisations/atelier-vernet.webp",
      previewAlt:
        "Accueil du site Atelier Vernet : titre en serif sur fond crème, palette bois.",
      name: "Atelier Vernet",
      trade: "Menuiserie sur mesure",
      status: "Concept",
      year: "2026",
      summary:
        "Un menuisier dont le travail se voit mal en photo de catalogue. Le site montre les pièces en grand et raconte comment elles sont faites.",
      metaDescription:
        "Concept de site pour un atelier de menuiserie sur mesure : mise en valeur des pièces, explication du travail, demande de devis.",
      intent:
        "Un artisan qui travaille bien a un problème simple : la qualité d’un assemblage ne se voit pas sur une vignette. Il faut de la place.",
      problem: {
        title: "Le point de départ",
        body: "Les sites de menuisiers montrent souvent douze photos minuscules et un numéro de téléphone. Le visiteur ne voit ni le niveau de finition, ni ce que coûte une pièce, ni combien de temps il faut attendre. Il appelle un concurrent qui le dit.",
      },
      answers: [
        {
          title: "Des pièces montrées en grand",
          body: "Une pièce par écran, en pleine largeur. On voit le fil du bois et l’assemblage. C’est ce qui fait la différence de prix, donc c’est ce qu’on montre.",
        },
        {
          title: "Le travail expliqué",
          body: "Chaque pièce dit son essence, son délai de fabrication et sa fourchette de prix. Le visiteur sait à quoi s’attendre avant d’appeler.",
        },
        {
          title: "Une demande de devis courte",
          body: "Quatre champs. Ce que vous voulez, où, quand, comment vous joindre. Un formulaire long fait fuir les gens pressés.",
        },
      ],
      specs: [
        { label: "Pages", value: "5" },
        { label: "Format", value: "Site vitrine" },
        { label: "État", value: "Concept" },
      ],
    },
    {
      slug: "maison-tessier",
      demo: "/demo/maison-tessier",
      preview: "/realisations/maison-tessier.webp",
      previewAlt:
        "Accueil du site Maison Tessier : minimum de convives, budget et zone affichés d’emblée.",
      name: "Maison Tessier",
      trade: "Traiteur",
      status: "Concept",
      year: "2026",
      summary:
        "Un traiteur qui perdait des demandes faute de réponses claires. Le site répond avant qu’on ait à téléphoner.",
      metaDescription:
        "Concept de site pour un traiteur : formules lisibles, disponibilités, réponses aux questions posées avant chaque devis.",
      intent:
        "La plupart des appels reçus par un traiteur posent les trois mêmes questions. Un site utile y répond sans décrocher.",
      problem: {
        title: "Le point de départ",
        body: "Combien de personnes minimum, quel budget par tête, est-ce que vous vous déplacez jusque chez moi. Tant que ces réponses ne sont pas écrites, chaque demande commence par un appel qui n’aboutit pas.",
      },
      answers: [
        {
          title: "Les formules affichées",
          body: "Chaque formule dit son prix par personne, son nombre minimum de convives et ce qu’elle comprend exactement. Rien à deviner.",
        },
        {
          title: "La zone de déplacement",
          body: "Une carte simple avec le rayon couvert. Un visiteur hors zone le voit tout de suite et ne perd pas son temps.",
        },
        {
          title: "Les dates encore libres",
          body: "Les périodes chargées sont annoncées. Une demande arrive avec une date réaliste, ce qui évite un aller-retour.",
        },
      ],
      specs: [
        { label: "Pages", value: "6" },
        { label: "Format", value: "Site sur mesure" },
        { label: "État", value: "Concept" },
      ],
    },
    {
      slug: "studio-halage",
      demo: "/demo/studio-halage",
      preview: "/realisations/studio-halage.webp",
      previewAlt:
        "Boutique Studio Halage : grille de pièces émaillées sur fond sombre.",
      name: "Studio Halage",
      trade: "Céramique",
      status: "Concept",
      year: "2026",
      summary:
        "Un atelier de céramique qui vend en ligne des pièces uniques. Chaque objet a sa fiche, ses défauts assumés et son stock réel.",
      metaDescription:
        "Concept de boutique en ligne pour un atelier de céramique : pièces uniques, stock réel, fiches produit dessinées pour l’artisanat.",
      intent:
        "Vendre des pièces uniques ne marche pas comme vendre des tailles de t-shirts. Une pièce vendue disparaît, et c’est très bien.",
      problem: {
        title: "Le point de départ",
        body: "Les boutiques en ligne standard supposent qu’un produit existe en plusieurs exemplaires identiques. Une pièce tournée à la main, non. Le stock est à un, les couleurs varient d’une cuisson à l’autre, et ces écarts font partie de ce qu’on achète.",
      },
      answers: [
        {
          title: "Une fiche par pièce",
          body: "Ses dimensions réelles, sa contenance, son poids. Les variations de la cuisson sont expliquées au lieu d’être cachées.",
        },
        {
          title: "Un stock qui dit la vérité",
          body: "Une pièce vendue s’affiche comme vendue, avec la date de la prochaine fournée. Personne ne commande un objet qui n’existe plus.",
        },
        {
          title: "Une gestion tenable seul",
          body: "Ajouter une pièce prend deux minutes depuis un téléphone, photo comprise. Un atelier d’une personne ne peut pas y passer sa soirée.",
        },
      ],
      specs: [
        { label: "Pages", value: "Boutique complète" },
        { label: "Format", value: "Boutique en ligne" },
        { label: "État", value: "Concept" },
      ],
    },
  ],
} as const;

export type Project = (typeof projects.items)[number];

export function findProject(slug: string): Project | undefined {
  return projects.items.find((project) => project.slug === slug);
}
