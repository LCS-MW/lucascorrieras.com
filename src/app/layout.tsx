import type { Metadata, Viewport } from "next";

import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

/**
 * Layout racine réduit au strict minimum : document, polices, métadonnées de
 * base.
 *
 * Tout le reste — en-tête, pied de page, smooth scroll, séquence d'entrée —
 * vit dans le groupe `(site)`. Les démos sous `/demo` sont des sites à part
 * entière : elles ne doivent hériter ni de la charrue du site principal, ni de
 * son identité visuelle.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.domain,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F2F3EF",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
