"use client";

import {
  prefersReducedMotion,
  useReducedMotion,
} from "@/hooks/useReducedMotion";
import { DURATION, EASE, gsap, useGSAP } from "@/lib/gsap";

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
 * L'import statique de GSAP est sans effet sur le poids des pages : l'en-tête
 * est monté à l'intérieur de `<Scene>`, dans le layout `(site)`, qui tire déjà
 * le moteur sur toutes les pages. Mesuré : le JavaScript initial de `/cgv` est
 * identique avec et sans ce fichier.
 */
export function useLogoSelection(root: RefObject<HTMLElement | null>): void {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      // Relecture synchrone : au premier rendu client, `useReducedMotion` rend
      // encore la valeur du serveur. Sans elle on construirait une timeline
      // pour la jeter à la passe suivante.
      if (reduced || prefersReducedMotion()) return;

      const element = root.current;
      if (!element) return;

      const timeline = gsap.timeline({ paused: true });

      CORNERS.forEach((corner, index) => {
        const at = index * STAGGER;

        timeline.to(
          `[data-logo-corner="${corner}"]`,
          { ...AWAY[corner], duration: DURATION.ui, ease: EASE.ui },
          at,
        );

        // La poignée est centrée sur l'angle : son échelle part donc du point
        // exact du crochet, sans avoir à fixer d'origine.
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
    },
    { scope: root, dependencies: [reduced] },
  );
}
