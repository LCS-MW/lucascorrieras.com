import { Section } from "@/components/ui/Section";

import type { ReactNode } from "react";

/**
 * Corps commun aux pages d'erreur.
 *
 * Le seul motif emprunté au vocabulaire de mesure est la cote, posée une fois
 * en bas : un trait tendu entre deux repères, qui mesure ce qui devrait être
 * là et affiche le code à la place. Le cadre de sélection, lui, reste au hero
 * — c'est sa condition pour rester un signe et non un ornement.
 *
 * Aucun attribut `data-enter` ni `data-intro` : leurs états masqués vivent en
 * CSS sous `html[data-gsap]`, et une page d'erreur atteinte après qu'une autre
 * a chargé le moteur se retrouverait masquée sans rien pour la révéler.
 */
export function ErrorState({
  label,
  code,
  title,
  lead,
  children,
  note,
}: {
  label: string;
  code: string;
  title: string;
  lead: string;
  /** Boutons de sortie. */
  children: ReactNode;
  /** Ligne technique discrète, sous les boutons. */
  note?: ReactNode;
}) {
  return (
    <Section fill>
      <div className="flex items-center gap-5">
        <span className="font-mono text-label text-accent uppercase">
          {label}
        </span>
        <span aria-hidden="true" className="bg-rule h-px flex-1" />
      </div>

      <h1 className="font-display text-display text-ink mt-7 max-w-3xl text-balance">
        {title}
      </h1>

      <p className="text-xl text-ink-2 mt-8 max-w-xl">{lead}</p>

      <div className="mt-12 flex flex-wrap gap-4">{children}</div>

      {note ? (
        <p className="font-mono text-label text-ink-2 mt-8 uppercase">{note}</p>
      ) : null}

      {/* La cote. Deux repères, un trait, et la mesure au milieu : ici elle ne
          relève aucune dimension, elle affiche le code de l'erreur. */}
      <div aria-hidden="true" className="relative mt-24 h-2 max-w-xl">
        <span className="bg-rule absolute top-1 left-0 h-px w-full" />
        <span className="bg-accent absolute top-0 left-0 h-2 w-px" />
        <span className="bg-accent absolute top-0 right-0 h-2 w-px" />
        <span className="bg-paper font-mono text-label text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 uppercase">
          {code}
        </span>
      </div>
    </Section>
  );
}
