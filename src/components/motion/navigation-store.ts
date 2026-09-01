/**
 * Le peu d'état de navigation qui doit vivre hors de React.
 *
 * Deux informations seulement, et aucune n'est rendue : le lien qui déclenche
 * la transition et la page qui arrive ne se connaissent pas, et faire remonter
 * ça jusqu'au layout pour le redescendre ensuite coûterait plus cher que le
 * module.
 */

/** Résout la promesse rendue à `startViewTransition`. */
let commit: (() => void) | null = null;

let arrivedByNavigation = false;

/**
 * Vrai une seule fois, si la page courante a été atteinte par une navigation
 * interne. Sert à décaler son entrée derrière la transition — au premier
 * chargement il n'y a pas de transition, donc pas de décalage.
 */
export function consumeArrivedByNavigation(): boolean {
  const value = arrivedByNavigation;
  arrivedByNavigation = false;
  return value;
}

/** Appelé au clic, avant que la route ait changé. */
export function beginNavigation() {
  arrivedByNavigation = true;
}

/**
 * Promesse rendue à `startViewTransition` : la transition retient sa capture
 * jusqu'à ce que la nouvelle route soit rendue.
 *
 * Le garde-fou évite qu'une navigation qui n'aboutit pas laisse la page figée
 * sous l'instantané.
 */
export function awaitCommit(): Promise<void> {
  return new Promise((resolve) => {
    const guard = window.setTimeout(resolve, 1200);
    commit = () => {
      window.clearTimeout(guard);
      resolve();
    };
  });
}

/** Appelé quand la nouvelle route est rendue. */
export function endNavigation() {
  commit?.();
  commit = null;
}
