"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

/**
 * La séquence elle-même vit dans un chunk à part. Sur `/services` ou
 * `/contact`, ce module n'est jamais demandé : ni GSAP, ni SplitText.
 */
const IntroRunner = dynamic(() =>
  import("@/components/motion/IntroRunner").then((m) => m.IntroRunner),
);

/**
 * Portée de la séquence d'entrée. Montée dans le layout racine, autour de
 * l'en-tête et du contenu : la séquence traverse les deux, elle ne peut donc
 * pas vivre dans l'un ou dans l'autre.
 *
 * Elle ne joue que sur l'accueil, seule page qui porte un cadre de sélection.
 * Ailleurs, `data-intro-root` disparaît, et avec lui les états de départ posés
 * en CSS : rien n'est jamais masqué sur les autres pages.
 *
 * La portée passe par un état plutôt que par une ref : le coureur est un
 * enfant, son effet de mise en page s'exécuterait avant l'attachement de la
 * ref et ne trouverait rien à animer. Ici, il n'est monté qu'une fois
 * l'élément réellement dans le document.
 *
 * Les enfants restent des Server Components : ils traversent ce composant
 * comme des enfants, ils n'en sont pas importés.
 */
export function IntroSequence({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const active = pathname === "/";
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setRoot} data-intro-root={active ? "" : undefined}>
      {active && root ? <IntroRunner root={root} /> : null}
      {children}
    </div>
  );
}
