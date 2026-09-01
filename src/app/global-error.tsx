"use client";

import { errors } from "@/content/errors";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

/**
 * Dernier filet : la panne a eu lieu dans le layout racine lui-même.
 *
 * Ce fichier remplace le document entier, `<html>` et `<body>` compris —
 * d'où leur présence ici, contrairement à toutes les autres pages.
 *
 * Volontairement dépouillé. Aucun en-tête, aucun pied, aucun composant
 * partagé : ce qui vient de casser, c'est précisément ce que ces composants
 * traversent. La page se limite au document, aux polices, aux jetons de
 * couleur et à un bouton. Moins il y a de pièces, plus il y a de chances
 * qu'elle s'affiche.
 *
 * `reset()` est reçu de React mais n'est pas utilisé : sur une erreur de
 * layout racine, il remonte le même arbre et échoue à nouveau presque à
 * chaque fois. Un rechargement complet repart d'une page blanche, ce qui est
 * la seule chose qui aide réellement à ce niveau.
 */
export default function GlobalError() {
  const { fatal } = errors;

  return (
    <html lang={site.lang} className={fontVariables}>
      <body className="bg-paper text-ink font-text">
        <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center px-6 py-24 md:px-12">
          <div className="flex items-center gap-5">
            <span className="font-mono text-label text-accent uppercase">
              {fatal.label} {fatal.code}
            </span>
            <span aria-hidden="true" className="bg-rule h-px flex-1" />
          </div>

          <h1 className="font-display text-display text-ink mt-7 text-balance">
            {fatal.title}
          </h1>

          <p className="text-xl text-ink-2 mt-8">{fatal.lead}</p>

          <div className="mt-12">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-accent text-paper border-accent hover:bg-ink hover:border-ink inline-flex items-center rounded-sm border px-6 py-3 text-base font-medium transition-colors duration-150"
            >
              {fatal.retry}
            </button>
          </div>

          <p className="font-mono text-label text-ink-2 mt-16 uppercase">
            {site.domain}
          </p>
        </main>
      </body>
    </html>
  );
}
