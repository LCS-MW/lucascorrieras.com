"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useLenis } from "@/components/motion/LenisProvider";
import { endNavigation } from "@/components/motion/navigation-store";

/**
 * Clôture des transitions de page.
 *
 * La transition elle-même est déclenchée par `TransitionLink`, au clic. Ce
 * composant ne fait que la refermer quand la nouvelle route est rendue, et
 * remettre le défilement en haut.
 *
 * L'en-tête, la barre de lecture et le pied de page portent leur propre
 * `view-transition-name` : ils sont exclus de l'instantané du contenu et ne
 * bougent pas. Seul `main` transite.
 *
 */
export function PageTransitions() {
  const pathname = usePathname();
  const lenis = useLenis();

  // La nouvelle route est rendue : on clôt la transition et l'état de
  // navigation, et on remet le défilement en haut. Lenis garde sa propre
  // position cible — sans ça, il ramènerait la page où elle était.
  useEffect(() => {
    endNavigation();
    // Les deux : Lenis tient sa propre position cible et la rendrait sans
    // cela, mais il n'écrit qu'à la prochaine image de son ticker. Le
    // `scrollTo` natif remet la page en haut tout de suite, y compris si le
    // ticker est en attente.
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
