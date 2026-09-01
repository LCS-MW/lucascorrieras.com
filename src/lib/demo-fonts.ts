import {
  Archivo,
  Barlow,
  Bodoni_Moda,
  Jost,
  Nunito_Sans,
  Outfit,
} from "next/font/google";

/**
 * Polices des sites de démonstration.
 *
 * Volontairement séparées de `lib/fonts` : ce sont trois identités étrangères
 * au site principal, et elles ne doivent pas peser sur ses pages. next/font ne
 * charge une famille que sur les routes qui la déclarent.
 *
 * Les trois paires sont choisies pour s'opposer, pas pour se compléter : le
 * registre courant, le registre haut de gamme et le registre boutique doivent
 * se reconnaître à la typographie avant même la couleur.
 */

/* --- Vasseur : le registre courant ---------------------------------------
   Une grotesque neutre pour les titres, une autre pour le texte. Aucune
   personnalité typographique : c'est le sujet de cette démo. Un plombier n'a
   pas besoin qu'on remarque sa police, il a besoin qu'on trouve son numéro. */

export const vasseurDisplay = Archivo({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-vasseur-display",
});

export const vasseurText = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-vasseur-text",
});

/* --- Cardot : le registre haut de gamme ----------------------------------
   Un didone à très fort contraste, dessiné pour les grandes tailles et pour
   le blanc autour. Le texte est une géométrique fine, presque effacée : sur
   ce registre, ce qui compte est ce qu'on ne met pas. */

export const cardotDisplay = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-cardot-display",
});

export const cardotText = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-cardot-text",
});

/* --- Pays d'Othe : la petite boutique ------------------------------------
   Deux sans-serif aux formes ouvertes et arrondies. Aucune prétention
   graphique : le sujet est un pot de miel avec son prix dessus. */

export const otheDisplay = Outfit({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-othe-display",
});

export const otheText = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-othe-text",
});
