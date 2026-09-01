"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  awaitCommit,
  beginNavigation,
} from "@/components/motion/navigation-store";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

import type { ComponentProps, MouseEvent } from "react";

type Props = ComponentProps<typeof Link>;

/**
 * Lien interne enveloppé dans une transition de vue.
 *
 * ⚠️ Poser des `view-transition-name` ne suffit pas en navigation côté client :
 * le navigateur ne les exploite automatiquement qu'entre deux documents. Une
 * navigation React doit être explicitement enveloppée dans
 * `document.startViewTransition`.
 *
 * Et cela ne peut pas se faire depuis un écouteur posé sur `document` : le
 * gestionnaire de `<Link>` appelle `preventDefault()` avant que l'événement
 * n'y remonte, et tout garde sur `defaultPrevented` sort alors sans rien
 * faire. C'est pour ça que ce composant existe : il tient le clic lui-même et
 * appelle `router.push` à l'intérieur de la transition.
 *
 * Vérifié sur les versions installées — React 19.2.8 n'exporte aucun
 * `ViewTransition` et Next 16.3 n'a pas de clé `experimental.viewTransition`.
 * Le jour où l'un des deux arrive, ce fichier disparaît.
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;

    const target = typeof href === "string" ? href : (href.pathname ?? "");
    if (!target.startsWith("/")) return;

    const url = new URL(target, location.href);
    if (url.pathname === location.pathname) return;

    // On prend la main : sans ça, Next naviguerait de son côté et la
    // transition envelopperait une navigation déjà faite.
    event.preventDefault();

    // Marque la page suivante comme atteinte par navigation. Rien n'est rendu
    // ici : depuis que le soulignement est laissé au navigateur, il n'y a plus
    // de mouvement optimiste à déclencher avant la capture.
    beginNavigation();

    if (
      typeof document.startViewTransition !== "function" ||
      prefersReducedMotion()
    ) {
      router.push(target);
      return;
    }

    document.startViewTransition(() => {
      const committed = awaitCommit();
      router.push(target);
      return committed;
    });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
