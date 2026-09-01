"use client";

import { useIntroSequence } from "@/components/motion/useIntroSequence";

/**
 * Enveloppe minimale autour de la séquence d'entrée, chargée dynamiquement.
 *
 * Elle n'existe que pour donner un point d'attache à `next/dynamic` : c'est le
 * fait de la charger à part qui garde GSAP, `useGSAP` et SplitText hors du
 * bundle des pages qui n'ont pas de cadre de sélection à animer.
 *
 * Elle reçoit l'élément de portée déjà monté, pas une ref : montée en enfant,
 * son effet de mise en page s'exécuterait avant l'attachement de la ref du
 * parent.
 */
export function IntroRunner({ root }: { root: HTMLElement }) {
  useIntroSequence(root);
  return null;
}
