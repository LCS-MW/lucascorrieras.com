import { TransitionLink } from "@/components/motion/TransitionLink";

import { footer } from "@/content/nav";
import { site } from "@/content/site";

/**
 * Le pied ne dessine plus son propre filet supérieur.
 *
 * Il en avait un, et la section qui le précède en dessine déjà un en bas :
 * deux traits d'un pixel collés, soit une séparation de deux pixels là où
 * tout le reste du site est à un. Mesuré sur `/contact`,
 * `/mentions-legales`, `/confidentialite` et `/cgv`.
 *
 * Après un bloc `accent` ou `depth`, qui n'ont pas de bordure, la séparation
 * est portée par le changement de fond — c'est déjà le cas partout ailleurs
 * entre ces blocs.
 */
export function SiteFooter() {
  return (
    <footer aria-label={footer.label} className="px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
        <div>
          <p className="font-mono text-label text-ink uppercase">{site.name}</p>
          <p className="text-sm text-ink-2 mt-4 max-w-xs">{footer.tagline}</p>
        </div>

        {footer.columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="font-mono text-label text-ink-2 uppercase">
              {column.title}
            </p>
            <ul className="mt-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="text-sm text-ink hover:text-accent inline-block py-1.5 transition-colors"
                  >
                    <span className="link-underline">{link.label}</span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-rule mx-auto mt-16 flex max-w-5xl flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-t pt-6">
        <p className="font-mono text-label text-ink-2 uppercase">
          {site.domain}
        </p>

        <nav aria-label="Informations légales" className="flex gap-6">
          {footer.legal.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="font-mono text-label text-ink-2 hover:text-ink uppercase transition-colors"
            >
              <span className="link-underline">{link.label}</span>
            </TransitionLink>
          ))}
        </nav>

        <p className="font-mono text-label text-ink-2 uppercase">{site.area}</p>
      </div>
    </footer>
  );
}
