"use client";

import { useRef, type ReactNode } from "react";

import { SCENES, type SceneName } from "@/components/motion/scenes";
import {
  prefersReducedMotion,
  useReducedMotion,
} from "@/hooks/useReducedMotion";
import { gsap, useGSAP, whenMotionReady } from "@/lib/gsap";

import type SplitText from "gsap/SplitText";

/**
 * Portée d'une scène. Le composant rend lui-même l'élément de portée, donc sa
 * ref est attachée avant son propre effet de mise en page — contrairement à un
 * hook monté dans un enfant, qui trouverait la portée vide.
 *
 * Les enfants restent des Server Components : ils traversent ce composant sans
 * en être importés. Seule la logique d'animation part côté client.
 */
export function Scene({
  name,
  children,
}: {
  name: SceneName;
  children: ReactNode;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe) return;

      // Mouvement réduit : on ne construit rien. Aucun état de départ n'est
      // posé — ni en CSS, ni en JS — donc il n'y a rien à défaire : le contenu
      // est déjà à sa place.
      if (prefersReducedMotion()) return;

      let cancelled = false;
      let teardown: void | (() => void);
      const splits: SplitText[] = [];

      // Le constructeur reste synchrone : `contextSafe` ne rattrape que les
      // animations créées sans await. Tout ce qui s'attend est résolu avant.
      const build = contextSafe(
        (
          Split: typeof SplitText,
          ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
        ) => {
          if (cancelled) return;

          teardown = SCENES[name]({
            root,
            gsap,
            ScrollTrigger,
            q: (selector) => root.querySelector<HTMLElement>(selector),
            qa: (selector) =>
              Array.from(root.querySelectorAll<HTMLElement>(selector)),
            revertSplits: () => {
              for (const split of splits) split.revert();
              splits.length = 0;
            },
            splitLines: (element) => {
              const split = Split.create(element, {
                type: "lines",
                mask: "lines",
                linesClass: "intro-line",
              });
              splits.push(split);
              return split.lines;
            },
          });
        },
      );

      // On attend que le moteur soit prêt *et* la mise en page stabilisée.
      // Construire plus tôt calculerait les bornes sur un document encore
      // court : les déclencheurs partiraient tous en même temps, hors écran.
      void whenMotionReady().then(({ SplitText, ScrollTrigger }) => {
        build(SplitText, ScrollTrigger);
        // Les autres scènes se construisent en parallèle et peuvent décaler
        // la page ; on redemande les mesures une fois la nôtre en place.
        ScrollTrigger.refresh();
      });

      return () => {
        cancelled = true;
        teardown?.();
        for (const split of splits) split.revert();
      };
    },
    { scope, dependencies: [reducedMotion, name] },
  );

  return (
    <div ref={scope} data-scene={name}>
      {children}
    </div>
  );
}
