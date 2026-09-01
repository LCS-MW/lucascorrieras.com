"use client";

import { ErrorState } from "@/components/sections/ErrorState";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Button } from "@/components/ui/Button";
import { errors } from "@/content/errors";
import { nav } from "@/content/nav";

/**
 * Frontière d'erreur du site.
 *
 * Attrape ce qui casse pendant le rendu d'une page ou d'un composant client.
 * Obligatoirement un composant client : c'est React qui la monte, à la place
 * de la branche fautive.
 *
 * `error.message` n'est jamais affiché — en production, Next le remplace de
 * toute façon par un message générique, et le montrer reviendrait à exposer
 * l'intérieur du site à un visiteur qui n'en a que faire. `error.digest`, lui,
 * est un identifiant opaque : il ne dit rien et permet de retrouver la trace
 * côté serveur si quelqu'un le recopie.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { failure } = errors;

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
          label={failure.label}
          code={failure.code}
          title={failure.title}
          lead={failure.lead}
          note={
            error.digest
              ? `${failure.digestLabel} · ${error.digest}`
              : undefined
          }
        >
          <button
            type="button"
            onClick={reset}
            className="bg-accent text-paper border-accent hover:bg-ink hover:border-ink inline-flex items-center rounded-sm border px-6 py-3 text-base font-medium transition-colors duration-150"
          >
            {failure.retry}
          </button>
          <Button href={failure.contact.href} variant="secondary">
            {failure.contact.label}
          </Button>
        </ErrorState>
      </main>

      <SiteFooter />
    </div>
  );
}
