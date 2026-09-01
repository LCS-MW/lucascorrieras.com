import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Inter_Tight,
} from "next/font/google";

/**
 * Polices auto-hébergées par next/font : les fichiers sont servis depuis notre
 * domaine, sans requête vers Google au runtime. Les métriques de repli sont
 * ajustées automatiquement, ce qui garde le CLS à 0 pendant le chargement.
 *
 * Chaque police expose une variable CSS consommée par les tokens `--font-*`
 * déclarés dans `src/app/globals.css`.
 */

/** Display — titres. Fonte variable, utilisée au poids 600. */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
});

/** Texte courant — poids 400 et 500 uniquement, en instances statiques. */
export const fontText = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter-tight",
});

/** Utilitaire — libellés, cotes, étiquettes techniques. Un seul poids. */
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

/** À poser sur `<html>` pour rendre les trois variables disponibles partout. */
export const fontVariables = [
  fontDisplay.variable,
  fontText.variable,
  fontMono.variable,
].join(" ");
