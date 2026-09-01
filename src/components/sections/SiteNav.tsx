"use client";

import { usePathname } from "next/navigation";

import { TransitionLink } from "@/components/motion/TransitionLink";
import { nav } from "@/content/nav";

/**
 * Navigation principale.
 *
 * Aucune mesure, aucun tween, aucun état : le soulignement est un élément rendu
 * **uniquement dans le lien actif**, et c'est le navigateur qui interpole sa
 * position et sa largeur d'une page à l'autre, parce qu'il porte le même
 * `view-transition-name` des deux côtés.
 *
 * Les libellés, eux, n'en portent aucun — volontairement. Un nom partagé
 * *déplace* l'élément au lieu de le dupliquer : le libellé quitterait la barre
 * pendant toute la transition, et le menu se viderait à chaque navigation. Les
 * quatre liens restent donc dans l'instantané de l'en-tête, immobiles.
 *
 * Le survol est un signal distinct de l'état actif : deux traits d'accent qui
 * viennent encadrer le libellé. Le lien actif n'y répond pas — il porte déjà
 * le soulignement, et rien ne sert à annoncer la page où l'on se trouve.
 */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label={nav.label}>
      <ul className="flex gap-5 md:gap-10">
        {nav.links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <li key={link.href}>
              <TransitionLink
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="nav-link font-mono text-label text-ink-2 relative inline-block py-2 uppercase"
              >
                {link.label}

                {active ? (
                  <span aria-hidden="true" className="nav-underline" />
                ) : null}
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
