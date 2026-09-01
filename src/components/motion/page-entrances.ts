import { EASE } from "@/lib/motion-tokens";

import type { gsap as Gsap } from "gsap";

/**
 * Une entrée par page, et chacune a son ordre.
 *
 * Réutiliser un seul fondu partout revient à dire que toutes les pages sont
 * la même. Ici l'ordre suit ce que la page raconte : un catalogue commence par
 * poser son étagère, une galerie par son titre, un argumentaire garde sa
 * réponse pour la fin.
 *
 * Aucune n'utilise ScrollTrigger : ce sont des séquences de chargement, elles
 * n'attendent que les polices.
 */

export type EntranceApi = {
  root: HTMLElement;
  /** Décalage appliqué à toute la séquence, en secondes. */
  delay: number;
  gsap: typeof Gsap;
  splitLines: (element: Element) => Element[];
  /** Rend au titre son balisage d'origine une fois la séquence jouée. */
  revertSplits: () => void;
  q: (selector: string) => HTMLElement | null;
  qa: (selector: string) => HTMLElement[];
};

const beat = {
  label(api: EntranceApi, tl: gsap.core.Timeline, at: number) {
    const el = api.q('[data-enter="label"]');
    if (el) tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at);
  },

  rule(api: EntranceApi, tl: gsap.core.Timeline, at: number) {
    const el = api.q('[data-enter="rule"]');
    if (el) {
      tl.fromTo(
        el,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, ease: EASE.travel },
        at,
      );
    }
  },

  title(api: EntranceApi, tl: gsap.core.Timeline, at: number) {
    const el = api.q('[data-enter="title"]');
    if (!el) return;
    const lines = api.splitLines(el);
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.18 }, at);
    tl.fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.66, stagger: 0.06 },
      at,
    );
  },

  lead(api: EntranceApi, tl: gsap.core.Timeline, at: number) {
    const el = api.q('[data-enter="lead"]');
    if (el) tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.45 }, at);
  },

  body(api: EntranceApi, tl: gsap.core.Timeline, at: number) {
    const els = api.qa('[data-enter="body"]');
    if (els.length) {
      tl.fromTo(
        els,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.08 },
        at,
      );
    }
  },
} as const;

/**
 * Toute séquence rend son balisage à la fin.
 *
 * Les lignes découpées par SplitText figent le retour à la ligne calculé au
 * moment de la mesure. Les garder après coup, c'est garder ce découpage pour
 * toujours : au moindre redimensionnement, le titre reste coupé selon une
 * largeur qui n'existe plus.
 */
const timeline = (api: EntranceApi) =>
  api.gsap.timeline({
    delay: api.delay,
    defaults: { ease: EASE.reveal },
    onComplete: api.revertSplits,
  });

export const PAGE_ENTRANCES = {
  /** Catalogue : le filet se trace comme une étagère, le reste s'y pose. */
  services(api: EntranceApi) {
    const tl = timeline(api);
    beat.rule(api, tl, 0);
    beat.label(api, tl, 0.18);
    beat.title(api, tl, 0.3);
    beat.lead(api, tl, 0.6);
    beat.body(api, tl, 0.75);
  },

  /** Galerie : le titre arrive d'abord, le libellé vient le souligner après. */
  work(api: EntranceApi) {
    const tl = timeline(api);
    beat.title(api, tl, 0);
    beat.label(api, tl, 0.42);
    beat.rule(api, tl, 0.48);
    beat.lead(api, tl, 0.6);
    beat.body(api, tl, 0.72);
  },

  /** Argumentaire : la question est posée, le titre y répond en dernier. */
  approach(api: EntranceApi) {
    const tl = timeline(api);
    beat.label(api, tl, 0);
    beat.rule(api, tl, 0.08);
    beat.lead(api, tl, 0.32);
    beat.title(api, tl, 0.5);
    beat.body(api, tl, 0.9);
  },

  /** Invitation : le titre, puis tout de suite de quoi répondre. */
  contact(api: EntranceApi) {
    const tl = timeline(api);
    beat.title(api, tl, 0);
    beat.body(api, tl, 0.35);
    beat.label(api, tl, 0.55);
    beat.rule(api, tl, 0.6);
    beat.lead(api, tl, 0.7);
  },

  /** Fiche : l'étiquette situe le projet avant qu'on le nomme. */
  project(api: EntranceApi) {
    const tl = timeline(api);
    beat.label(api, tl, 0);
    beat.rule(api, tl, 0.06);
    beat.title(api, tl, 0.24);
    beat.body(api, tl, 0.62);
    beat.lead(api, tl, 0.74);
  },
} as const;

export type EntranceName = keyof typeof PAGE_ENTRANCES;
