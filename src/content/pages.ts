import { home } from "@/content/home";
import { site } from "@/content/site";

import type { PageContent } from "@/content/types";

/**
 * En-tête et métadonnées de chaque page. Un seul `h1` par page, et c'est
 * celui déclaré ici : aucune section n'a le droit d'en poser un second.
 */
export const pages = {
  home: {
    kicker: "Accueil",
    metaTitle: `${site.name} — ${site.role}`,
    metaDescription: site.description,
    // Le h1 de l'accueil vit dans `home.ts` : il est encadré par le cadre de
    // sélection et animé par la séquence d'entrée. Une seule source.
    h1: home.hero.title,
    lead: home.hero.lead,
  } satisfies PageContent,

  services: {
    kicker: "Trois formats",
    metaTitle: "Services",
    metaDescription:
      "Site vitrine, site sur mesure ou boutique en ligne. Trois formats, un seul interlocuteur, des prix annoncés à l’avance.",
    h1: "Trois façons de travailler ensemble",
    lead: "Le bon format dépend de ce que vous vendez et de qui doit vous trouver. Voici ce que comprend chacun. Le prix se fixe sur votre projet, pas sur une grille.",
  } satisfies PageContent,

  work: {
    kicker: "Un site, trois exercices",
    metaTitle: "Réalisations",
    metaDescription:
      "Le portail de la mairie de Sommeval, en ligne. Et trois sites conçus de bout en bout pour la menuiserie, la restauration et la céramique.",
    h1: "Réalisations",
    lead: "Un site commandé, conçu et mis en ligne. Puis trois exercices, pour montrer ce que ça donne sur d’autres métiers.",
  } satisfies PageContent,

  approach: {
    kicker: "Quatre différences",
    metaTitle: "Approche",
    metaDescription:
      "Une seule personne, rien d’acheté, des sites légers, et un code qui vous appartient. Quatre différences vérifiables.",
    h1: "Ce qui change quand une seule personne s’en occupe",
    lead: "Quatre différences concrètes avec ce qui se pratique habituellement. Chacune se vérifie sur le site livré.",
  } satisfies PageContent,

  contact: {
    kicker: "Sans engagement",
    metaTitle: "Contact",
    metaDescription:
      "Décrivez votre projet en quelques lignes. Je réponds à chaque demande, puis on prend un appel sans engagement.",
    h1: "Parlons de votre projet",
    lead: "Écrivez-moi en quelques lignes. Je réponds à chaque demande et je vous propose un appel.",
  } satisfies PageContent,
} as const;
