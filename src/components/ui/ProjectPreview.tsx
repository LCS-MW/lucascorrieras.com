import Image from "next/image";

import { previewName } from "@/lib/transition-names";

/**
 * Aperçu d'une réalisation : la capture réelle du site de démonstration,
 * recouverte d'un voile filaire qui se lève au survol.
 *
 * Le voile est franchement translucide : la capture doit se lire au repos,
 * l'interaction ne fait que dégager les repères posés par-dessus. Un voile
 * couvrant reviendrait à cacher le travail qu'on cherche à montrer. La bascule passe par
 * `--preview-progress`, poussé au survol par le CSS — donc jamais au doigt, où
 * il n'y a pas de survol et où l'aperçu s'affiche directement net.
 */
export function ProjectPreview({
  src,
  alt,
  slug,
  priority = false,
}: {
  src: string;
  alt: string;
  /**
   * Nomme l'aperçu pour la transition partagée : la carte de la grille et
   * l'en-tête de la fiche portent le même nom, ce qui suffit au navigateur pour
   * déplacer et redimensionner l'un vers l'autre.
   */
  slug: string;
  /** À poser sur la première carte : c'est l'élément LCP sur mobile. */
  priority?: boolean;
}) {
  return (
    <div
      data-preview
      style={{ viewTransitionName: previewName(slug) }}
      className="vt-apercu border-rule bg-paper relative aspect-[4/3] w-full overflow-hidden border"
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        sizes="(min-width: 768px) 30vw, 92vw"
        priority={priority}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <div
        aria-hidden="true"
        data-preview-wire
        className="bg-paper/35 absolute inset-0 flex flex-col gap-3 p-5"
      >
        <span className="bg-ink/25 block h-2 w-1/3" />
        <span className="border-accent/80 block h-1/3 w-full border border-dashed" />
        <span className="bg-ink/20 block h-2 w-4/5" />
        <span className="bg-ink/20 block h-2 w-3/5" />
        <div className="mt-auto flex gap-2">
          <span className="bg-accent/70 block h-6 w-1/3" />
        </div>
      </div>
    </div>
  );
}
