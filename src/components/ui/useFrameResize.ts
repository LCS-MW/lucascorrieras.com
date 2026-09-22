"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Pas du clavier, en pixels. Majuscule enfoncée : dix fois plus. */
const PAS = 16;
const PAS_RAPIDE = 160;

/**
 * Le geste n'est offert qu'au-dessus de cette largeur et à la souris fine. En
 * dessous, le cadre occupe déjà presque toute la colonne et il ne reste pas
 * assez de course pour que tirer veuille dire quelque chose ; au doigt, la
 * poignée se disputerait le glissement avec le défilement de la page.
 *
 * La même condition est écrite dans `globals.css`, qui cache la poignée. Les
 * deux décrivent le même fait : ici on rend la largeur à la feuille de style,
 * là on retire l'objet à saisir.
 */
const OFFERT = "(width >= 64rem) and (hover: hover) and (pointer: fine)";

export type Bornes = { min: number; max: number };

/**
 * Rend le cadre de sélection réellement redimensionnable en largeur.
 *
 * Les quatre poignées d'angle du cadre ressemblent depuis toujours à des
 * poignées de redimensionnement sans en être : c'est le seul endroit du site
 * où le vocabulaire d'outil promet un geste qu'il ne tient pas. Ici il le
 * tient, et la cote sous le cadre cesse d'être une mesure passive — elle
 * change parce que le visiteur a tiré dessus.
 *
 * **Les deux bornes sont mesurées, jamais écrites.**
 *
 * - Le minimum est la largeur `min-content` du cadre, c'est-à-dire son mot le
 *   plus long. Le coder en dur le rendrait faux à la première retouche du
 *   titre, ou tant que la police de repli est affichée — à 1440 le mot
 *   « personne » fait 461 px, mais rien ne garantit qu'il les fera demain.
 * - Le maximum est la marge de page : le cadre s'arrête exactement là où
 *   s'arrête le contenu de la section, donc il ne peut jamais créer de
 *   défilement horizontal.
 *
 * Pendant le glissement, la largeur est écrite directement en propriété
 * personnalisée, sans passer par un état React : un glissement doit suivre le
 * doigt au pixel près. L'état n'est synchronisé qu'au relâchement, pour
 * `aria-valuenow`. La cote, elle, se mesure toute seule — c'est déjà le
 * `ResizeObserver` de `useElementSize` qui la tient à jour.
 */
export function useFrameResize() {
  const [bornes, setBornes] = useState<Bornes | null>(null);
  const [largeur, setLargeur] = useState<number | null>(null);

  const enveloppe = useRef<HTMLDivElement | null>(null);
  const bornesRef = useRef<Bornes | null>(null);
  const largeurRef = useRef<number | null>(null);

  const ref = useCallback((node: HTMLDivElement | null) => {
    enveloppe.current = node;
  }, []);

  /** Pose la largeur sans repasser par React. Rend la valeur retenue. */
  const poser = useCallback((valeur: number | null) => {
    const hote = enveloppe.current;
    if (!hote) return null;

    if (valeur === null) {
      hote.style.removeProperty("--cadre");
      largeurRef.current = null;
      return null;
    }

    const limites = bornesRef.current;
    const retenue = limites
      ? Math.round(Math.min(Math.max(valeur, limites.min), limites.max))
      : Math.round(valeur);

    hote.style.setProperty("--cadre", `${retenue}px`);
    largeurRef.current = retenue;
    return retenue;
  }, []);

  useEffect(() => {
    const hote = enveloppe.current;
    const section = hote?.closest("section");
    if (!hote || !section) return;

    const mesurer = () => {
      /* Le geste n'est plus offert : on rend la largeur à la feuille de style.
         Sans ça, un cadre élargi à 1 100 px sur grand écran survivrait au
         passage en fenêtre étroite, et le hero n'aurait plus la largeur que sa
         mise en page lui donne. Une largeur en ligne l'emporterait sur toute
         règle CSS — c'est donc ici, et pas dans une media query, que ça se
         défait. */
      if (!window.matchMedia(OFFERT).matches) {
        if (largeurRef.current !== null) {
          poser(null);
          setLargeur(null);
        }
        bornesRef.current = null;
        setBornes(null);
        return;
      }

      /* Le minimum est demandé au navigateur plutôt que calculé : `min-content`
         est exactement la largeur du mot le plus long, approche et police
         réellement rendue comprises. La largeur courante est reposée dans la
         foulée, avant peinture — le passage n'est jamais visible. */
      const avant = hote.style.getPropertyValue("--cadre");
      hote.style.setProperty("--cadre", "min-content");
      const min = Math.ceil(hote.getBoundingClientRect().width);
      if (avant) hote.style.setProperty("--cadre", avant);
      else hote.style.removeProperty("--cadre");

      const boiteSection = section.getBoundingClientRect();
      const remplissage = parseFloat(
        getComputedStyle(section).paddingRight || "0",
      );
      const gauche = hote.getBoundingClientRect().left;
      const max = Math.floor(boiteSection.right - remplissage - gauche);

      const limites = { min, max: Math.max(min, max) };
      bornesRef.current = limites;
      setBornes(limites);

      /* Après un redimensionnement, la largeur retenue peut être devenue plus
         grande que la marge disponible : on la ramène dans les bornes plutôt
         que de laisser le cadre pousser le document. */
      if (largeurRef.current !== null) {
        setLargeur(poser(largeurRef.current));
      }
    };

    mesurer();

    const observateur = new ResizeObserver(mesurer);
    observateur.observe(section);

    /* Avant Bricolage Grotesque, le mot le plus long est mesuré sur la police
       de repli : le minimum serait faux de plusieurs dizaines de pixels. */
    void document.fonts.ready.then(mesurer);

    const pointeur = window.matchMedia(OFFERT);
    pointeur.addEventListener("change", mesurer);

    /* En plus de l'observateur : mesuré, celui-ci pouvait mettre jusqu'à une
       seconde à rendre la main au redimensionnement. Le plafond réel est en
       CSS et n'attend personne — ce qui se joue ici n'est que la fraîcheur du
       chiffre affiché et de `aria-valuemax`. */
    window.addEventListener("resize", mesurer, { passive: true });

    return () => {
      observateur.disconnect();
      pointeur.removeEventListener("change", mesurer);
      window.removeEventListener("resize", mesurer);
    };
  }, [poser]);

  /* ---- Le glissement ---------------------------------------------------- */

  const onPointerDown = useCallback(
    (evenement: React.PointerEvent<HTMLElement>) => {
      const hote = enveloppe.current;
      if (!hote || evenement.button !== 0 || !bornesRef.current) return;

      const poignee = evenement.currentTarget;
      const departX = evenement.clientX;
      const departLargeur = hote.getBoundingClientRect().width;

      evenement.preventDefault();
      poignee.setPointerCapture(evenement.pointerId);
      document.documentElement.dataset.cadreTire = "";

      const glisser = (suite: PointerEvent) => {
        poser(departLargeur + (suite.clientX - departX));
      };

      const relacher = () => {
        poignee.removeEventListener("pointermove", glisser);
        poignee.removeEventListener("pointerup", relacher);
        poignee.removeEventListener("pointercancel", relacher);
        delete document.documentElement.dataset.cadreTire;
        setLargeur(largeurRef.current);
      };

      poignee.addEventListener("pointermove", glisser);
      poignee.addEventListener("pointerup", relacher);
      poignee.addEventListener("pointercancel", relacher);
    },
    [poser],
  );

  /* ---- Le clavier -------------------------------------------------------
     Une poignée qui ne répondrait qu'à la souris serait un élément interactif
     hors du parcours clavier : le site s'interdit ça partout ailleurs. */

  const onKeyDown = useCallback(
    (evenement: React.KeyboardEvent<HTMLElement>) => {
      const hote = enveloppe.current;
      const limites = bornesRef.current;
      if (!hote || !limites) return;

      const courante = hote.getBoundingClientRect().width;
      const pas = evenement.shiftKey ? PAS_RAPIDE : PAS;

      const cible = (() => {
        switch (evenement.key) {
          case "ArrowLeft":
            return courante - pas;
          case "ArrowRight":
            return courante + pas;
          case "Home":
            return limites.min;
          case "End":
            return limites.max;
          case "Enter":
          case " ":
            return "defaut" as const;
          default:
            return null;
        }
      })();

      if (cible === null) return;
      evenement.preventDefault();

      if (cible === "defaut") {
        poser(null);
        setLargeur(null);
        return;
      }
      setLargeur(poser(cible));
    },
    [poser],
  );

  /** Double-clic sur la poignée : retour à la largeur de la feuille de style. */
  const onDoubleClick = useCallback(() => {
    poser(null);
    setLargeur(null);
  }, [poser]);

  return {
    ref,
    bornes,
    largeur,
    poignee: { onPointerDown, onKeyDown, onDoubleClick },
  };
}
