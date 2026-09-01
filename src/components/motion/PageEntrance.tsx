"use client";

import { useRef, type ReactNode } from "react";

import { consumeArrivedByNavigation } from "@/components/motion/navigation-store";
import {
  PAGE_ENTRANCES,
  type EntranceName,
} from "@/components/motion/page-entrances";
import {
  prefersReducedMotion,
  useReducedMotion,
} from "@/hooks/useReducedMotion";
import { gsap, useGSAP, whenTextReady } from "@/lib/gsap";

import type SplitText from "gsap/SplitText";

/**
 * Séquence d'entrée d'une page. À monter autour de son en-tête.
 *
 * Elle n'attend que les polices, pas le chargement complet : c'est du contenu
 * au-dessus de la ligne de flottaison, il ne doit pas patienter derrière les
 * images. L'état masqué vit en CSS sous `html[data-gsap]` — sur une navigation
 * interne l'attribut est déjà posé, la page suivante est donc masquée dès sa
 * première peinture et rien ne clignote.
 */
export function PageEntrance({
  name,
  children,
}: {
  name: EntranceName;
  children: ReactNode;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe) return;
      if (prefersReducedMotion()) return;

      let cancelled = false;
      const splits: SplitText[] = [];

      // Derrière la transition quand la page arrive par navigation : jouée
      // pendant, la séquence se déroulerait sous les instantanés figés, donc
      // invisible. La valeur suit le plus long groupe de transition — celui de
      // l'aperçu de projet, à 620 ms. La désaccorder, c'est soit manger le
      // début de la séquence, soit laisser un temps mort après la bascule.
      const delay = consumeArrivedByNavigation() ? 0.62 : 0;

      const build = contextSafe((Split: typeof SplitText) => {
        if (cancelled) return;
        PAGE_ENTRANCES[name]({
          delay,
          root,
          gsap,
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
      });

      void whenTextReady().then(build);

      return () => {
        cancelled = true;
        for (const split of splits) split.revert();
      };
    },
    { scope, dependencies: [reducedMotion, name] },
  );

  return <div ref={scope}>{children}</div>;
}
