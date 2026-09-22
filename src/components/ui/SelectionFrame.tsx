"use client";

import { type ReactNode } from "react";

import { useFrameResize } from "@/components/ui/useFrameResize";
import { useElementSize } from "@/hooks/useElementSize";

type SelectionFrameProps = {
  /** Étiquette de calque, en haut à gauche. */
  layer: string;
  /** Unité affichée dans la cote. */
  unit: string;
  /** Nom accessible de la poignée de largeur. */
  grabLabel: string;
  /** Invite affichée dans la marge au survol du cadre. */
  grabHint: string;
  /** Libellé de la cote de marge. */
  marginLabel: string;
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
 * poignées d'angle, étiquette de calque, cote dimensionnelle réelle — et un
 * bord droit qu'on peut réellement attraper pour changer la largeur.
 *
 * Ce dernier point est le cœur du composant. Les poignées d'angle ont
 * longtemps ressemblé à des poignées de redimensionnement sans en être :
 * c'était le seul endroit du site où le vocabulaire d'outil promettait un
 * geste qu'il ne tenait pas. Le bord droit le tient maintenant, et la cote
 * cesse d'être une mesure posée là — elle change parce qu'on a tiré dessus.
 *
 * Motif volontairement réservé au hero. Il ne doit pas se répéter ailleurs,
 * sinon il devient une décoration et perd son sens.
 *
 * Les attributs `data-intro-*` déclarent l'état de départ (posé en CSS pour
 * éviter tout flash) et servent de cibles à la séquence d'entrée.
 */
export function SelectionFrame({
  layer,
  unit,
  grabLabel,
  grabHint,
  marginLabel,
  children,
}: SelectionFrameProps) {
  const [frameRef, size] = useElementSize<HTMLDivElement>();
  const { ref: wrapRef, bornes, poignee } = useFrameResize();

  /* La marge restante est une soustraction de deux mesures, jamais un nombre
     écrit : c'est elle qui rend le geste lisible, parce qu'on voit fondre ce
     qu'on est en train de consommer. */
  const marge = bornes && size ? Math.max(0, bornes.max - size.width) : null;

  return (
    <div ref={wrapRef} data-cadre className="relative">
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

        {/* La poignée de largeur. `separator` et non `slider` : ce qu'elle
            déplace est une limite entre le cadre et sa marge, pas une valeur
            dans une échelle. Elle est dans le parcours clavier — flèches,
            Origine, Fin, et Entrée pour revenir à la largeur de départ. */}
        <div
          role="separator"
          tabIndex={0}
          aria-orientation="vertical"
          aria-label={grabLabel}
          aria-valuenow={size?.width}
          aria-valuemin={bornes?.min}
          aria-valuemax={bornes?.max}
          data-poignee-largeur
          {...poignee}
        />

        <span aria-hidden="true" data-cadre-invite className="font-mono">
          {grabHint}
        </span>
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

        {/* Cote de la marge restante. Sa largeur se déduit en CSS de celle du
            cadre : rien n'est écrit ici à chaque image du glissement. */}
        <span data-marge-cote>
          <span data-marge-filet />
          <span data-marge-mark />
          <span data-marge-valeur className="font-mono">
            {marge === null ? "" : `${marginLabel} ${marge} ${unit}`}
          </span>
        </span>
      </div>
    </div>
  );
}
