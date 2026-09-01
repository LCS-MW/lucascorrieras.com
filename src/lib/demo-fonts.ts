import {
  DM_Sans,
  Fraunces,
  Instrument_Serif,
  Inter,
  Karla,
  Space_Grotesk,
} from "next/font/google";

/**
 * Polices des sites de démonstration.
 *
 * Volontairement séparées de `lib/fonts` : ce sont trois identités étrangères
 * au site principal, et elles ne doivent pas peser sur ses pages. next/font ne
 * charge une famille que là où elle est utilisée — ces six-là ne partent donc
 * jamais avec l'accueil.
 */

/** Atelier Vernet — menuiserie. Serif à empattements marqués, texte neutre. */
export const vernetDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--dv-display",
});

export const vernetText = Karla({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--dv-text",
});

/** Maison Tessier — traiteur. Serif de titrage étroit, grotesque humaniste. */
export const tessierDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--dt-display",
});

export const tessierText = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--dt-text",
});

/** Studio Halage — céramique. Grotesque technique sur fond sombre. */
export const halageDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--dh-display",
});

export const halageText = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--dh-text",
});
