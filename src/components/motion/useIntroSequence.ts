"use client";

import {
  prefersReducedMotion,
  useReducedMotion,
} from "@/hooks/useReducedMotion";
import { EASE, gsap, loadSplitText, useGSAP } from "@/lib/gsap";

import type SplitText from "gsap/SplitText";

/**
 * Repères de la séquence, en secondes. Les gestes se recouvrent volontairement :
 * lus bout à bout ils feraient une liste, superposés ils font un geste.
 * Total ≈ 1,44 s.
 */
const CUE = {
  rule: 0,
  frame: 0.18,
  frameLabel: 0.48,
  handles: 0.52,
  cote: 0.66,
  title: 0.72,
} as const;

const FRAME_EDGE_DURATION = 0.16;
const FRAME_EDGE_OFFSET = 0.09;

/** Le premier geste du visiteur lui rend la main. */
const SKIP_EVENTS = ["wheel", "touchmove", "keydown", "scroll"] as const;

/**
 * Séquence d'entrée de l'accueil.
 *
 * Ordre : le filet de navigation se trace, le cadre de sélection se dessine
 * dans le sens horaire, les poignées d'angle tombent en cascade, la cote se
 * révèle, puis le titre monte ligne par ligne sous masque.
 *
 * Trois choix structurants :
 * - Les états de départ sont posés en CSS (`[data-intro-from]`), pas ici.
 *   Les poser en JS ferait peindre les éléments visibles avant l'hydratation,
 *   soit un flash à chaque chargement.
 * - Le découpage n'a lieu qu'une fois `document.fonts.ready` résolu. Découper
 *   en lignes avant que Bricolage Grotesque soit chargé donnerait des retours
 *   à la ligne calculés sur la police de repli, donc faux.
 * - SplitText est chargé à la demande, en parallèle des polices. Il ne sert
 *   qu'ici : il n'a rien à faire dans le bundle des autres pages.
 *
 * @param root — portée `useGSAP`, l'élément qui contient l'en-tête et le hero.
 * On reçoit l'élément et non une ref : ce hook est chargé dynamiquement, son
 * effet de mise en page s'exécuterait avant que la ref du parent soit
 * attachée, et la portée serait vide.
 */
export function useIntroSequence(root: HTMLElement): void {
  const reducedMotion = useReducedMotion();

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return;

      const staged = root.querySelectorAll<HTMLElement>("[data-intro-from]");

      // Mouvement réduit : état final immédiat. On ne ralentit pas la
      // séquence, on ne la joue pas. La préférence est relue ici et non prise
      // dans `reducedMotion` : au premier rendu client, le hook rend encore la
      // valeur du serveur.
      if (prefersReducedMotion()) {
        gsap.set(staged, { opacity: 1, scaleX: 1, scaleY: 1 });
        return;
      }

      const pick = (name: string) =>
        root.querySelectorAll<HTMLElement>(`[data-intro="${name}"]`);

      const title = root.querySelector<HTMLElement>('[data-intro="title"]');
      const edges = Array.from(pick("frame-edge"));
      if (!title || edges.length !== 4) return;

      let timeline: gsap.core.Timeline | null = null;
      let split: SplitText | null = null;
      let cancelled = false;

      const abort = new AbortController();

      const skip = contextSafe(() => {
        if (!timeline || timeline.progress() === 1) return;
        // On rembobine vers la fin plutôt que d'y sauter : le geste reste
        // lisible, mais il libère la vue tout de suite.
        timeline.pause();
        gsap.to(timeline, {
          progress: 1,
          duration: 0.22,
          ease: EASE.feedback,
          overwrite: true,
        });
        abort.abort();
      });

      // Le constructeur reste synchrone : `contextSafe` ne rattrape que les
      // animations créées sans await. Tout ce qui s'attend est résolu avant.
      const build = contextSafe((Split: typeof SplitText) => {
        if (cancelled) return;

        split = Split.create(title, {
          type: "lines",
          mask: "lines",
          linesClass: "intro-line",
        });

        const tl = gsap.timeline({
          defaults: { ease: EASE.reveal },
          onComplete: () => {
            // Le titre retrouve son balisage d'origine : plus de wrappers de
            // découpage, donc pas de relignage cassé au redimensionnement.
            split?.revert();
            split = null;
            abort.abort();
          },
        });

        // 1. Le filet de navigation se trace.
        tl.fromTo(
          pick("rule"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.42, ease: EASE.travel },
          CUE.rule,
        );

        // 2. Le cadre de sélection se dessine, sens horaire, sans accélération :
        //    c'est un tracé d'outil, pas un mouvement organique.
        edges.forEach((edge, index) => {
          const axis = index % 2 === 0 ? "scaleX" : "scaleY";
          tl.fromTo(
            edge,
            { [axis]: 0 },
            { [axis]: 1, duration: FRAME_EDGE_DURATION, ease: "none" },
            CUE.frame + index * FRAME_EDGE_OFFSET,
          );
        });

        tl.fromTo(
          pick("frame-label"),
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          CUE.frameLabel,
        );

        // 3. Les poignées d'angle tombent en cascade.
        tl.fromTo(
          pick("handle"),
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.2, stagger: 0.05 },
          CUE.handles,
        );

        // 4. La cote se révèle.
        tl.fromTo(
          pick("cote-line"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.28, ease: EASE.travel },
          CUE.cote,
        );
        tl.fromTo(
          pick("cote-mark"),
          { opacity: 0 },
          { opacity: 1, duration: 0.24 },
          CUE.cote + 0.08,
        );

        // 5. Le titre monte ligne par ligne sous masque.
        tl.fromTo(
          title,
          { opacity: 0 },
          { opacity: 1, duration: 0.15 },
          CUE.title,
        );
        tl.fromTo(
          split.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, stagger: 0.06 },
          CUE.title,
        );

        timeline = tl;

        for (const event of SKIP_EVENTS) {
          window.addEventListener(event, skip, {
            passive: true,
            signal: abort.signal,
          });
        }
      });

      void Promise.all([document.fonts.ready, loadSplitText()]).then(
        ([, Split]) => build(Split),
      );

      return () => {
        cancelled = true;
        abort.abort();
        timeline?.kill();
        split?.revert();
      };
    },
    { scope: root, dependencies: [reducedMotion, root] },
  );
}
