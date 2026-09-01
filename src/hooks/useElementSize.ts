"use client";

import { useCallback, useState, type RefCallback } from "react";

export type ElementSize = { width: number; height: number };

/**
 * Dimensions réelles d'un élément, arrondies au pixel et tenues à jour au
 * redimensionnement.
 *
 * Sert aux cotes du vocabulaire « outil de design » : une cote qui affiche une
 * valeur inventée trahit le propos, elle doit mesurer pour de vrai.
 *
 * Rend `null` tant que rien n'est mesuré — c'est le cas au rendu serveur et à
 * l'hydratation, ce qui évite toute divergence.
 */
export function useElementSize<T extends HTMLElement>(): [
  RefCallback<T>,
  ElementSize | null,
] {
  const [size, setSize] = useState<ElementSize | null>(null);

  const ref = useCallback<RefCallback<T>>((node) => {
    if (!node) return;

    // Première mesure synchrone, au commit : le ResizeObserver ne rend la main
    // qu'à la frame suivante, ce qui laisserait la cote vide le temps d'un
    // affichage.
    const rect = node.getBoundingClientRect();
    setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });

    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0];
      setSize({
        width: Math.round(box.inlineSize),
        height: Math.round(box.blockSize),
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
