import { site } from "@/content/site";

import type { PageContent } from "@/content/types";
import type { Metadata } from "next";

/**
 * Métadonnées d'une page. Le titre passe par le gabarit du layout, le
 * canonique et les balises de partage sont dérivés du chemin : aucune page
 * n'a à les réécrire.
 */
export function pageMetadata(
  page: PageContent,
  path: string,
  options: { absoluteTitle?: boolean } = {},
): Metadata {
  return {
    // L'accueil porte déjà le nom du site dans son titre : le gabarit du
    // layout l'ajouterait une seconde fois.
    title: options.absoluteTitle
      ? { absolute: page.metaTitle }
      : page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: path,
      siteName: site.name,
      title: `${page.metaTitle} — ${site.name}`,
      description: page.metaDescription,
    },
  };
}
