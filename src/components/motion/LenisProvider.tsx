"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";

import {
  prefersReducedMotion,
  useReducedMotion,
} from "@/hooks/useReducedMotion";

import type Lenis from "lenis";

/* --------------------------------------------------------------------------
   Le smooth scroll est un système externe à React : une seule instance pour
   tout le document. On l'expose par un store d'abonnement plutôt que par un
   état, sinon le provider déclencherait un rendu en cascade à chaque montage.
   -------------------------------------------------------------------------- */

let instance: Lenis | null = null;
const listeners = new Set<() => void>();

function publish(next: Lenis | null): void {
  instance = next;
  for (const notify of listeners) notify();
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

const getSnapshot = (): Lenis | null => instance;
const getServerSnapshot = (): Lenis | null => null;

/**
 * Instance Lenis courante, ou `null` si le smooth scroll est désactivé
 * (mouvement réduit) ou pas encore chargé. Toujours tester la valeur :
 * `useLenis()?.scrollTo("#contact")`.
 */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Smooth scroll du site, monté une seule fois dans le layout racine.
 *
 * Lenis et GSAP sont chargés par `import()` depuis l'effet, jamais en haut du
 * module : ce composant est présent sur toutes les pages, un import statique
 * mettrait le moteur d'animation dans le bundle de chacune d'elles. Ici, rien
 * ne part sur le réseau avant l'hydratation, et rien du tout si le visiteur a
 * demandé à réduire les animations.
 *
 * Trois points importants au montage :
 * - `autoRaf: false` — Lenis ne lance pas sa propre boucle. C'est le ticker
 *   GSAP qui l'avance, donc une seule requestAnimationFrame pour tout le site.
 * - `lagSmoothing(0)` — sans ça, GSAP « rattrape » les images perdues et
 *   désynchronise la position Lenis de celle de ScrollTrigger.
 * - `ScrollTrigger.update` à chaque scroll — les déclencheurs suivent la
 *   position interpolée, pas la position native du navigateur.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Mouvement réduit : on rend la main au scroll natif, immédiat. On ne
    // ralentit pas l'interpolation, on la retire — et on ne télécharge même
    // pas de quoi la faire. Préférence relue ici : au premier rendu client,
    // `reducedMotion` vaut encore la valeur du serveur.
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    const start = async () => {
      const [{ default: Lenis }, { gsap, loadScrollTrigger }] =
        await Promise.all([import("lenis"), import("@/lib/gsap")]);
      const ScrollTrigger = await loadScrollTrigger();

      if (cancelled) return;

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        // Au doigt, on garde l'inertie du système : elle est mieux calibrée
        // que la nôtre et c'est ce que le visiteur attend sur mobile.
        syncTouch: false,
      });

      const handleScroll = () => ScrollTrigger.update();
      lenis.on("scroll", handleScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      publish(lenis);
      ScrollTrigger.refresh();

      teardown = () => {
        lenis.off("scroll", handleScroll);
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        publish(null);
      };
    };

    // On attend que le fil principal soit libre avant de télécharger quoi que
    // ce soit : le smooth scroll n'a aucune raison de disputer la bande
    // passante au premier rendu. Le `timeout` garantit qu'il s'installe même
    // sur une page qui ne devient jamais tout à fait inactive.
    const schedule =
      window.requestIdleCallback ??
      ((callback: IdleRequestCallback) => window.setTimeout(callback, 200));
    const unschedule = window.cancelIdleCallback ?? window.clearTimeout;

    const handle = schedule(() => void start(), { timeout: 2000 });

    return () => {
      cancelled = true;
      unschedule(handle);
      teardown?.();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
