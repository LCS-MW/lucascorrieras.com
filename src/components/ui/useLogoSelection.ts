"use client";

import { useEffect } from "react";

import {
  prefersReducedMotion,
  useReducedMotion,
} from "@/hooks/useReducedMotion";

import type { RefObject } from "react";

/**
 * Les quatre coins, dans le sens horaire — le même ordre que la séquence
 * d'entrée de l'accueil, où le cadre de sélection se dessine. Le survol du
 * logo est un rappel de ce geste, pas un effet de plus.
 */
const CORNERS = ["tl", "tr", "br", "bl"] as const;

/**
 * Fuite de chaque coin, en unités du viewBox (558 × 84). La sélection s'ouvre
 * vers l'extérieur : vers l'intérieur elle viendrait mordre le lettrage, qui
 * n'est qu'à sept unités des crochets.
 *
 * 9 et 6 unités donnent, à la taille de l'en-tête, un peu plus de deux pixels
 * par coin — assez pour se voir sur un logo haut de vingt-deux pixels, assez
 * peu pour ne pas donner l'impression que l'en-tête bouge.
 */
const AWAY: Record<(typeof CORNERS)[number], { x: number; y: number }> = {
  tl: { x: -9, y: -6 },
  tr: { x: 9, y: -6 },
  br: { x: 9, y: 6 },
  bl: { x: -9, y: 6 },
};

/** Décalage entre deux coins : un balayage, pas quatre départs simultanés. */
const STAGGER = 0.05;
/** La poignée arrive juste après que son coin a commencé à s'écarter. */
const HANDLE_OFFSET = 0.06;
/** Durée d'une poignée, plus courte que l'écartement : elle doit le rattraper. */
const HANDLE_DURATION = 0.26;
/** On saisit à vitesse normale, on relâche plus vite : un lâcher ne se contemple pas. */
const RELEASE_SPEED = 1.35;

/**
 * Survol du logotype : la sélection est saisie.
 *
 * Les quatre crochets s'écartent en balayage horaire pendant qu'une poignée
 * pleine apparaît à chaque angle. C'est le geste d'un outil de dessin quand on
 * attrape un objet, et c'est la seule chose que ce crochet fait — le passage
 * du filet à l'accent est laissé au CSS, qui sait le faire sans JavaScript et
 * sous `prefers-reduced-motion`.
 *
 * ⚠️ Pas de `useGSAP()` ici, et ce n'est pas un oubli. Le hook vient de
 * `@gsap/react`, qui importe GSAP : l'importer statiquement met `lib/gsap`
 * dans le chunk de l'en-tête, donc évalué avant l'hydratation. Or ce module
 * pose `data-gsap` sur `<html>` dès son évaluation, et React trouve alors sur
 * la racine un attribut que le rendu serveur n'avait pas :
 *
 *   « A tree hydrated but some attributes of the server rendered HTML didn't
 *     match the client properties. »
 *
 * Reproduit puis levé en `next dev` sur l'accueil. Déplacer l'attribut dans un
 * effet n'est pas une option : il conditionne en CSS les états masqués de
 * départ, et il doit être posé avant la première peinture sous peine de faire
 * clignoter les blocs animés.
 *
 * On ouvre donc le contexte à la main après un `import()`, ce que `useGSAP`
 * fait de toute façon en interne : même portée, même nettoyage. Le module est
 * déjà en cache à ce moment-là, `LenisProvider` le demande dès l'hydratation.
 */
export function useLogoSelection(root: RefObject<HTMLElement | null>): void {
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    // Relecture synchrone : au premier rendu client, `useReducedMotion` rend
    // encore la valeur du serveur. Sans elle on construirait une timeline pour
    // la jeter à la passe suivante.
    if (reduced || prefersReducedMotion()) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;

    void import("@/lib/gsap").then(({ gsap, DURATION, EASE }) => {
      if (cancelled) return;

      const context = gsap.context(() => {
        const timeline = gsap.timeline({ paused: true });

        CORNERS.forEach((corner, index) => {
          const at = index * STAGGER;

          timeline.to(
            `[data-logo-corner="${corner}"]`,
            { ...AWAY[corner], duration: DURATION.ui, ease: EASE.ui },
            at,
          );

          // La poignée est centrée sur l'angle : son échelle part donc du
          // point exact du crochet, sans avoir à fixer d'origine.
          timeline.fromTo(
            `[data-logo-corner="${corner}"] [data-logo-handle]`,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: HANDLE_DURATION, ease: EASE.ui },
            at + HANDLE_OFFSET,
          );
        });

        const grab = () => timeline.timeScale(1).play();
        const release = () => timeline.timeScale(RELEASE_SPEED).reverse();

        // Au doigt il n'y a pas de survol : `pointerenter` part au toucher et
        // rien ne le rappelle ensuite — la sélection resterait ouverte.
        const onPointerEnter = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          grab();
        };

        element.addEventListener("pointerenter", onPointerEnter);
        element.addEventListener("pointerleave", release);
        element.addEventListener("focus", grab);
        element.addEventListener("blur", release);

        return () => {
          element.removeEventListener("pointerenter", onPointerEnter);
          element.removeEventListener("pointerleave", release);
          element.removeEventListener("focus", grab);
          element.removeEventListener("blur", release);
        };
      }, element);

      dispose = () => context.revert();
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [root, reduced]);
}
