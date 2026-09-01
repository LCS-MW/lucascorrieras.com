import type { ReactNode } from "react";

export type SectionTone = "paper" | "soft" | "accent" | "depth";

type SectionProps = {
  id?: string;
  labelledBy?: string;
  tone?: SectionTone;
  /** Calque posé sous le contenu, sur toute la largeur. Sert au balayage. */
  overlay?: ReactNode;
  /**
   * Étire la section sur la hauteur restante. Réservé aux pages courtes —
   * erreurs — où le pied doit rester en bas de l'écran : sans ça, la section
   * s'arrête à son contenu et son filet de séparation flotte au milieu du
   * vide, loin du pied qu'il est censé annoncer.
   *
   * Suppose un parent en colonne flexible.
   */
  fill?: boolean;
  children: ReactNode;
};

/**
 * Sections alternées, séparées au filet d'un pixel. Jamais à l'ombre.
 *
 * L'alternance se joue entre `paper` et `soft` — un bleu très pâle plutôt
 * qu'un gris. `accent` est réservé à un seul bloc de tout le site, `depth` à
 * l'appel à l'action final.
 */
const TONE = {
  paper: "bg-paper border-rule border-b",
  soft: "bg-accent-soft border-rule border-b",
  accent: "bg-accent text-paper",
  depth: "bg-depth text-paper",
} as const;

export function Section({
  id,
  labelledBy,
  tone = "paper",
  overlay,
  fill = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      // Signale les fonds sombres au CSS : l'anneau de focus et la sélection
      // y basculent au papier, l'accent n'y ayant que 2,3:1.
      data-tone={tone === "accent" || tone === "depth" ? "dark" : undefined}
      className={`relative px-6 py-24 md:px-12 md:py-32 ${fill ? "flex-1" : ""} ${TONE[tone]}`}
    >
      {overlay}
      <div className="relative mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
