import { TransitionLink } from "@/components/motion/TransitionLink";

import { SiteNav } from "@/components/sections/SiteNav";
import { nav } from "@/content/nav";

/**
 * En-tête du site, monté dans le layout racine : il reste identique d'une page
 * à l'autre.
 *
 * Il est fixe et doublé d'une cale de hauteur constante. C'est ce qui permet
 * de le compacter au scroll sans jamais déplacer le contenu : seule sa hauteur
 * transite, la position des éléments n'est pas animée.
 *
 * Le filet du bas est le premier élément de la séquence d'entrée sur
 * l'accueil ; ailleurs il est simplement visible.
 */
export function SiteHeader() {
  return (
    <>
      <header data-header>
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-8 px-6 md:px-12">
          <TransitionLink
            href="/"
            className="font-mono text-label text-ink hover:text-accent inline-block py-2 whitespace-nowrap uppercase transition-colors"
          >
            <span className="link-underline">{nav.brand}</span>
          </TransitionLink>

          <SiteNav />
        </div>

        <div
          data-intro="rule"
          data-intro-from="scale-x"
          className="bg-rule absolute inset-x-0 bottom-0 h-px w-full origin-left"
        />
      </header>

      <div aria-hidden="true" data-header-spacer />
    </>
  );
}
