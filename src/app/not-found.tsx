import { ErrorState } from "@/components/sections/ErrorState";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Button } from "@/components/ui/Button";
import { errors } from "@/content/errors";
import { nav } from "@/content/nav";

import type { Metadata } from "next";

/**
 * La surcharge `robots` n'est pas décorative. Next émet déjà son propre
 * `noindex` sur une page introuvable, mais le layout racine déclare
 * `index, follow` : sans elle, le document sort avec deux directives
 * contradictoires. Les moteurs retiennent la plus restrictive, donc le
 * résultat est correct — mais se reposer là-dessus, c'est publier une
 * contradiction et espérer qu'elle soit bien arbitrée.
 */
export const metadata: Metadata = {
  title: errors.notFound.label,
  robots: { index: false, follow: true },
};

/**
 * 404 du site entier.
 *
 * Placée à la racine et non dans le groupe `(site)` : une adresse qui ne
 * correspond à aucune route ne traverse aucun groupe, elle atterrit ici.
 * Les `notFound()` appelés depuis une page du site — `/realisations` tant que
 * la rubrique est éteinte — remontent au même endroit faute de fichier plus
 * proche. Un seul 404, donc, et il est le même partout.
 *
 * L'en-tête et le pied sont montés à la main plutôt qu'hérités : la charrue du
 * groupe embarque Lenis, la séquence d'entrée et les transitions de vue. Sur
 * la page qui s'affiche justement quand quelque chose a déjà échoué, moins il
 * y a de machinerie, plus la page a de chances de s'afficher.
 */
export default function NotFound() {
  const { notFound } = errors;

  return (
    // Colonne flexible : le pied reste collé en bas même sur un contenu
    // court, et la section s'étire jusqu'à lui — son filet de séparation
    // arrive donc au contact du pied et non au milieu du vide.
    <div className="bg-paper text-ink font-text flex min-h-svh flex-col">
      <a href={nav.skip.href} className="skip-link text-base font-medium">
        {nav.skip.label}
      </a>

      <SiteHeader />

      <main id="contenu" className="flex flex-1 flex-col">
        <ErrorState
          label={notFound.label}
          code={notFound.code}
          title={notFound.title}
          lead={notFound.lead}
        >
          <Button href={notFound.actions.primary.href}>
            {notFound.actions.primary.label}
          </Button>
          <Button href={notFound.actions.secondary.href} variant="secondary">
            {notFound.actions.secondary.label}
          </Button>
        </ErrorState>
      </main>

      <SiteFooter />
    </div>
  );
}
