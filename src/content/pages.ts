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
    kicker: "Trois concepts",
    metaTitle: "Réalisations",
    metaDescription:
      "Trois projets conçus de bout en bout : menuiserie, traiteur, céramique. Des concepts, présentés comme tels.",
    h1: "Réalisations",
    lead: "Trois projets menés du premier croquis au site complet, sans commanditaire. Ils montrent une façon de traiter un métier.",
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
