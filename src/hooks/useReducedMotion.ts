"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Lecture synchrone de la préférence, hors du cycle de rendu.
 *
 * À utiliser dans tout effet de mise en page qui démarre une animation :
 * `useReducedMotion()` rend encore la valeur du serveur (`false`) au premier
 * rendu client, et un `useLayoutEffect` s'exécute avant que la vraie valeur
 * arrive. Sans cette relecture, une séquence démarre pour être annulée juste
 * après — soit exactement ce que la préférence demande d'éviter.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return prefersReducedMotion();
}

/**
 * Le serveur ne connaît pas la préférence du visiteur : on rend le cas
 * majoritaire, puis `useSyncExternalStore` réconcilie après l'hydratation.
 * Aucune divergence d'hydratation n'est signalée en console.
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * `true` si le visiteur a demandé à réduire les animations. Le retour est
 * réactif : basculer la préférence système remet à jour les composants sans
 * rechargement.
 *
 * Convention du site : quand c'est `true`, on va directement à l'état final —
 * on ne ralentit pas l'animation, on la supprime.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
