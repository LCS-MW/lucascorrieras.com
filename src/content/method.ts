import { pricing } from "@/content/pricing";

import type { SectionIntro } from "@/content/types";

/**
 * Quatre étapes, dans l'ordre où elles arrivent. Le modèle est la livraison
 * clé en main : le client intervient sur les deux premières, puis reçoit un
 * site fini.
 *
 * Rien ici ne doit engager une validation par étapes, un suivi du chantier en
 * temps réel ni un délai de correction après livraison. Ces engagements ne
 * sont pas tenables aux prix affichés, et un site qui les promet fait une
 * promesse qu'il ne pourra pas tenir.
 */
export const method = {
  intro: {
    index: "03",
    title: "Comment ça se passe",
    note: "Quatre étapes, dans cet ordre. Vous n’intervenez que sur les deux premières.",
  } satisfies SectionIntro,

  steps: [
    {
      number: "01",
      title: "On se parle",
      body: `Un appel de ${pricing.call.minutes} minutes. Vous décrivez votre activité et ce que le site doit faire. Je vous dis franchement si je suis la bonne personne.`,
      outcome: "Gratuit, sans engagement.",
    },
    {
      number: "02",
      title: "Une proposition ferme",
      body: "Vous recevez ce qui sera fait, pour quel prix et pour quelle date. Le prix ne bouge plus, sauf si vous changez le périmètre.",
      outcome: "Un seul prix, annoncé avant de commencer.",
    },
    {
      number: "03",
      title: "Je construis",
      body: "Je dessine et je développe le site. Vous n’avez rien à suivre ni à valider en cours de route, sauf si vous y tenez.",
      outcome: "Une maquette préalable est possible, sur demande.",
    },
    {
      number: "04",
      title: "Livraison clé en main",
      body: "Mise en ligne, nom de domaine, référencement de base, et une prise en main pour que vous soyez autonome. Le site est à vous, complètement.",
      outcome: "Vous repartez avec les accès et le code.",
    },
  ],
} as const;
