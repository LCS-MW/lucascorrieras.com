"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { DURATION, EASE } from "@/lib/motion-tokens";

/**
 * Point d'entrée unique de GSAP.
 *
 * ⚠️ Ce module tire GSAP avec lui. Aucun composant monté sur toutes les pages
 * ne doit l'importer statiquement : il se charge par `import()` depuis un
 * effet, ou depuis un composant lui-même chargé dynamiquement. C'est ce qui
 * garde le moteur d'animation hors du bundle des pages qui n'animent rien.
 *
 * Les plugins optionnels s'obtiennent par les chargeurs ci-dessous, jamais par
 * un import direct : ils enregistrent le plugin au passage et mémorisent la
 * promesse, donc un plugin n'est ni téléchargé ni enregistré deux fois.
 */
gsap.registerPlugin(useGSAP);
gsap.defaults({ ease: EASE.reveal, duration: DURATION.reveal });

/**
 * Le moteur est chargé. Ce drapeau est la seule condition sous laquelle un
 * état de départ masqué a le droit d'exister en CSS : si ce module n'est
 * jamais évalué — chunk en échec, JavaScript coupé — l'attribut n'apparaît
 * pas et le contenu reste lisible.
 */
if (typeof document !== "undefined") {
  document.documentElement.dataset.gsap = "";
}

type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type SplitTextType = typeof import("gsap/SplitText").SplitText;

let scrollTrigger: Promise<ScrollTriggerType> | null = null;
let splitText: Promise<SplitTextType> | null = null;

/** ScrollTrigger, enregistré à la première demande. */
export function loadScrollTrigger(): Promise<ScrollTriggerType> {
  scrollTrigger ??= import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  });
  return scrollTrigger;
}

/** SplitText, enregistré à la première demande. Utilisé par l'accueil seul. */
export function loadSplitText(): Promise<SplitTextType> {
  splitText ??= import("gsap/SplitText").then(({ SplitText }) => {
    gsap.registerPlugin(SplitText);
    return SplitText;
  });
  return splitText;
}

/** Résolu quand le document a fini de charger. */
function whenLoaded(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) =>
    window.addEventListener("load", () => resolve(), { once: true }),
  );
}

let textReady: Promise<SplitTextType> | null = null;

/**
 * Le découpage de texte est possible : polices chargées et SplitText en place.
 *
 * Distinct de `whenMotionReady` : une séquence jouée au chargement n'a pas
 * besoin d'attendre les images, seulement les polices — découper en lignes
 * avant elles donnerait des retours à la ligne faux. Faire attendre `load` à
 * une entrée de page la retarderait pour rien.
 */
export function whenTextReady(): Promise<SplitTextType> {
  textReady ??= Promise.all([document.fonts.ready, loadSplitText()]).then(
    ([, SplitText]) => SplitText,
  );
  return textReady;
}

let motionReady: Promise<{
  ScrollTrigger: ScrollTriggerType;
  SplitText: SplitTextType;
}> | null = null;

/**
 * Le moteur est prêt : plugins chargés **et** mise en page stabilisée.
 *
 * Attendre les polices ne suffit pas. Tant que les images ne sont pas
 * arrivées et que l'écran épinglé n'a pas posé sa cale, le document est plus
 * court qu'il ne sera : les bornes calculées à ce moment-là tombent au-dessus
 * du scroll courant et les déclencheurs partent tous en même temps, hors de
 * l'écran. C'est ce qui figeait les révélations.
 *
 * Marque aussi `<html data-motion="ready">` : c'est la seule condition sous
 * laquelle un état de départ masqué a le droit de s'appliquer. Si un import
 * échoue, l'attribut n'est jamais posé et le contenu reste visible.
 */
export function whenMotionReady() {
  motionReady ??= Promise.all([
    document.fonts.ready,
    whenLoaded(),
    loadScrollTrigger(),
    loadSplitText(),
  ]).then(([, , ScrollTrigger, SplitText]) => {
    document.documentElement.dataset.motion = "ready";
    return { ScrollTrigger, SplitText };
  });
  return motionReady;
}

export { DURATION, EASE } from "@/lib/motion-tokens";
export { gsap, useGSAP };
