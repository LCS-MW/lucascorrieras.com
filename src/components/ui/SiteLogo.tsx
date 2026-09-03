"use client";

import { useRef } from "react";

import { TransitionLink } from "@/components/motion/TransitionLink";
import { useLogoSelection } from "@/components/ui/useLogoSelection";
import { nav } from "@/content/nav";

/** Point d'ancrage de chaque poignée, en unités du viewBox. */
const CORNERS = [
  { id: "tl", path: "M1 19V1h18", x: -4, y: -4 },
  { id: "tr", path: "M539 1h18v18", x: 552, y: -4 },
  { id: "br", path: "M539 83h18V65", x: 552, y: 78 },
  { id: "bl", path: "M1 65v18h18", x: -4, y: 78 },
] as const;

/**
 * Logotype du site, en lien vers l'accueil.
 *
 * Le tracé est celui du fichier validé (`assets/`), les métadonnées C2PA en
 * moins : huit kilo-octets de manifeste sur chaque page valent moins que la
 * provenance, qui reste attachée au fichier source dans le dépôt.
 *
 * Deux différences avec le fichier d'origine, toutes deux nécessaires :
 * - la police est appelée par `var(--font-mono)`. `'IBM Plex Mono'` ne résout
 *   rien ici : next/font sert la fonte sous un nom de famille généré, et le
 *   lettrage retomberait sur la monospace du système ;
 * - chaque crochet est isolé dans son groupe, avec sa poignée. C'est ce qui
 *   permet de les animer un par un.
 *
 * Le rendu est entièrement en HTML : sans JavaScript le logo s'affiche, et le
 * survol change quand même de couleur.
 */
export function SiteLogo() {
  const link = useRef<HTMLAnchorElement>(null);

  useLogoSelection(link);

  return (
    <TransitionLink ref={link} href="/" className="site-logo-link">
      <svg
        role="img"
        aria-label={nav.brand}
        viewBox="0 0 558 84"
        width="558"
        height="84"
        fill="none"
        className="site-logo"
      >
        {CORNERS.map((corner) => (
          <g key={corner.id} data-logo-corner={corner.id}>
            <path
              d={corner.path}
              strokeWidth="2"
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
            {/* La poignée pleine : ce que devient un cadre de sélection quand
                on l'attrape. Elle est centrée sur l'angle, donc l'échelle part
                du point exact du crochet. */}
            <rect
              data-logo-handle
              x={corner.x}
              y={corner.y}
              width="10"
              height="10"
            />
          </g>
        ))}

        <text
          x="26"
          y="54"
          textLength="506"
          lengthAdjust="spacing"
          fontSize="40"
          letterSpacing="10.4"
        >
          {nav.brand.toUpperCase()}
        </text>
      </svg>
    </TransitionLink>
  );
}
