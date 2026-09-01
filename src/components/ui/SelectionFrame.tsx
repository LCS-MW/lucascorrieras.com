"use client";

import { type ReactNode } from "react";

import { useElementSize } from "@/hooks/useElementSize";

type SelectionFrameProps = {
  /** Étiquette de calque, en haut à gauche. */
  layer: string;
  /** Unité affichée dans la cote. */
  unit: string;
  children: ReactNode;
};

/** Poignées d'angle, dans le sens horaire — l'ordre porte la cascade d'entrée. */
const HANDLES = [
  "-top-1 -left-1",
  "-top-1 -right-1",
  "-right-1 -bottom-1",
  "-bottom-1 -left-1",
] as const;

/**
 * Un calque sélectionné dans un outil de design : filet d'accent, quatre
 * poignées d'angle, étiquette de calque, cote dimensionnelle réelle.
 *
 * Motif volontairement réservé au hero. Il ne doit pas se répéter ailleurs,
 * sinon il devient une décoration et perd son sens.
 *
 * Les attributs `data-intro-*` déclarent l'état de départ (posé en CSS pour
 * éviter tout flash) et servent de cibles à la séquence d'entrée.
 */
export function SelectionFrame({ layer, unit, children }: SelectionFrameProps) {
  const [frameRef, size] = useElementSize<HTMLDivElement>();

  return (
    <div className="relative">
      <span
        aria-hidden="true"
        data-intro="frame-label"
        data-intro-from="fade"
        className="font-mono text-label text-accent absolute -top-5 left-0 uppercase"
      >
        {layer}
      </span>

      <div ref={frameRef} className="relative px-4 py-5 md:px-6 md:py-7">
        {/* Filets du cadre, tracés dans le sens horaire. */}
        <span
          aria-hidden="true"
          data-intro="frame-edge"
          data-intro-from="scale-x"
          className="bg-accent pointer-events-none absolute top-0 left-0 h-px w-full origin-left"
        />
        <span
          aria-hidden="true"
          data-intro="frame-edge"
          data-intro-from="scale-y"
          className="bg-accent pointer-events-none absolute top-0 right-0 h-full w-px origin-top"
        />
        <span
          aria-hidden="true"
          data-intro="frame-edge"
          data-intro-from="scale-x"
          className="bg-accent pointer-events-none absolute bottom-0 left-0 h-px w-full origin-right"
        />
        <span
          aria-hidden="true"
          data-intro="frame-edge"
          data-intro-from="scale-y"
          className="bg-accent pointer-events-none absolute top-0 left-0 h-full w-px origin-bottom"
        />

        {HANDLES.map((position) => (
          <span
            key={position}
            aria-hidden="true"
            data-intro="handle"
            data-intro-from="pop"
            className={`border-accent bg-paper pointer-events-none absolute size-2 border ${position}`}
          />
        ))}

        {children}
      </div>

      {/* Cote dimensionnelle : mesurée, jamais écrite en dur. */}
      <div aria-hidden="true" className="relative mt-3 h-2">
        <span
          data-intro="cote-line"
          data-intro-from="scale-x"
          className="bg-accent absolute top-1 left-0 h-px w-full origin-left"
        />
        <span
          data-intro="cote-mark"
          data-intro-from="fade"
          className="bg-accent absolute top-0 left-0 h-2 w-px"
        />
        <span
          data-intro="cote-mark"
          data-intro-from="fade"
          className="bg-accent absolute top-0 right-0 h-2 w-px"
        />
        <span
          data-intro="cote-mark"
          data-intro-from="fade"
          className="bg-paper font-mono text-label text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 uppercase"
        >
          {size ? `${size.width} × ${size.height} ${unit}` : ""}
        </span>
      </div>
    </div>
  );
}
