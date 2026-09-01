import { TransitionLink } from "@/components/motion/TransitionLink";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./demo.css";

/**
 * Les démonstrations ne sont pas indexées et n'apparaissent pas au sitemap :
 * ce sont des exercices, pas des pages du site. Le `noindex` est posé ici et
 * hérité par les trois.
 *
 * `robots.txt` continue d'autoriser l'exploration : interdire le passage
 * empêcherait les moteurs de lire ce `noindex`.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      {/* En fin de flux, jamais en surimpression : une bannière fixe se
          retrouverait sur les captures qui servent de vignettes. */}
      <aside className="bg-paper text-ink border-rule border-t px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-label text-ink-2 uppercase">
            Démonstration — projet fictif, aucun client derrière
          </p>
          <TransitionLink
            href="/realisations"
            className="font-mono text-label text-accent uppercase"
          >
            <span className="link-underline">
              Retour au site de Lucas Corrieras
            </span>
          </TransitionLink>
        </div>
      </aside>
    </>
  );
}
