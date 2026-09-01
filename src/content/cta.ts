import { pricing } from "@/content/pricing";

import type { Action } from "@/content/types";

/** Appel à l'action, sur fond sombre. Promet exactement ce qui se passe. */
export const cta = {
  label: "La suite",
  title: "Parlons de votre projet.",
  body: `Un appel de ${pricing.call.minutes} minutes, sans engagement. À la fin, vous savez si le projet tient debout, ce qu’il coûte et quand il peut être en ligne. Si je ne suis pas la bonne personne, je vous le dis.`,
  action: { label: "Demander un échange", href: "/contact" } satisfies Action,
  note: "Je réponds à chaque demande.",
} as const;
