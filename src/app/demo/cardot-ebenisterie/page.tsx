import { cardot } from "@/content/demos/cardot";
import { cardotDisplay, cardotText } from "@/lib/demo-fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  // Titre absolu : une démo ne doit pas porter le nom du site principal.
  title: { absolute: cardot.meta.title },
  description: cardot.meta.description,
};

const { nav, hero, statement, pieces, quote, method, contact } = cardot;

/**
 * Registre haut de gamme, construit par soustraction.
 *
 * Pas de barre de navigation, pas un seul bouton plein, aucun bandeau de
 * chiffres. La hiérarchie tient à l'échelle typographique et au blanc : un
 * titre à 7 rem, un texte à 1 rem, et beaucoup de vide entre les deux. Les
 * liens sont des mots soulignés d'un filet.
 *
 * C'est l'opposé exact de la démonstration « plomberie », et c'est le but :
 * la même main doit pouvoir produire les deux.
 */
export default function CardotDemo() {
  return (
    <div
      className={`demo demo-cardot ${cardotDisplay.variable} ${cardotText.variable}`}
    >
      {/* ---- Bandeau : la marque seule, rien d'autre --------------------- */}
      <header className="mx-auto flex max-w-6xl items-baseline justify-between gap-8 px-6 pt-10 md:px-12">
        <div>
          <span className="demo-display block text-[1.5rem] leading-none tracking-[0.02em]">
            {nav.brand}
          </span>
          <span className="mt-2 block text-[0.7rem] font-light tracking-[0.28em] text-[var(--d-muted)] uppercase">
            {nav.trade}
          </span>
        </div>
        <span className="border-b border-[var(--d-ink)] pb-1 text-[0.8rem] font-light tracking-[0.16em] uppercase">
          {nav.contact}
        </span>
      </header>

      <main>
        {/* ---- Accroche : le titre occupe la page ------------------------ */}
        <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:px-12 md:pt-40">
          <h1 className="demo-display max-w-4xl text-[clamp(3rem,9vw,7rem)] leading-[0.92] font-normal tracking-[-0.01em]">
            {hero.title}
          </h1>

          {/* Accroche décalée à droite : la colonne de gauche reste vide,
              c'est elle qui donne le registre. */}
          <div className="mt-16 grid gap-8 md:grid-cols-12">
            <p className="text-[1.05rem] leading-[1.9] font-light text-[var(--d-muted)] md:col-start-7 md:col-end-12">
              {hero.lead}
            </p>
          </div>
        </section>

        {/* ---- Pleine largeur : la matière ------------------------------- */}
        <figure className="mt-8">
          <div
            aria-hidden="true"
            className="h-[38vh] min-h-[260px] w-full"
            style={{
              backgroundImage:
                "linear-gradient(105deg, var(--d-wood-3) 0%, var(--d-wood-2) 42%, var(--d-wood-1) 100%)",
            }}
          />
          <figcaption className="mx-auto max-w-6xl px-6 pt-4 text-[0.75rem] font-light tracking-[0.18em] text-[var(--d-muted)] uppercase md:px-12">
            {hero.caption}
          </figcaption>
        </figure>

        {/* ---- L'atelier : étiquette à gauche, texte à droite ------------ */}
        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
          <p className="text-[0.75rem] font-light tracking-[0.28em] text-[var(--d-accent)] uppercase md:col-span-3">
            {statement.label}
          </p>
          <div className="space-y-8 md:col-start-5 md:col-end-12">
            {statement.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.25rem] leading-[1.75] font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* ---- Pièces : trois colonnes décalées verticalement ------------ */}
        <section className="mx-auto max-w-6xl px-6 pb-28 md:px-12 md:pb-40">
          <p className="text-[0.75rem] font-light tracking-[0.28em] text-[var(--d-accent)] uppercase">
            {pieces.label}
          </p>

          <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {pieces.items.map((piece, index) => (
              <figure
                key={piece.name}
                className={
                  index === 1 ? "md:mt-24" : index === 2 ? "md:mt-12" : ""
                }
              >
                <div
                  aria-hidden="true"
                  className="aspect-[3/4] w-full"
                  style={{
                    backgroundImage: `linear-gradient(${160 + index * 25}deg, var(--d-wood-${index + 1}) 0%, var(--d-surface) 140%)`,
                  }}
                />
                <figcaption className="mt-6">
                  <h2 className="demo-display text-[1.6rem] leading-tight">
                    {piece.name}
                  </h2>
                  <p className="mt-3 text-[0.9rem] font-light text-[var(--d-muted)]">
                    {piece.wood}
                  </p>
                  <p className="mt-1 text-[0.75rem] font-light tracking-[0.18em] text-[var(--d-accent)] uppercase">
                    {piece.year}
                  </p>
                  <p className="mt-5 text-[0.95rem] leading-relaxed font-light">
                    {piece.note}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---- Citation : une seule phrase sur toute la largeur ---------- */}
        <section className="border-y border-[var(--d-line)] bg-[var(--d-surface)]">
          <blockquote className="mx-auto max-w-5xl px-6 py-28 md:px-12 md:py-36">
            <p className="demo-display text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.25] italic">
              « {quote.text} »
            </p>
            <footer className="mt-10 text-[0.75rem] font-light tracking-[0.28em] text-[var(--d-muted)] uppercase">
              {quote.author}
            </footer>
          </blockquote>
        </section>

        {/* ---- Méthode : trois colonnes, filets fins --------------------- */}
        <section className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
          <p className="text-[0.75rem] font-light tracking-[0.28em] text-[var(--d-accent)] uppercase">
            {method.label}
          </p>

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {method.steps.map((step) => (
              <div
                key={step.title}
                className="border-t border-[var(--d-ink)] pt-6"
              >
                <h2 className="demo-display text-[1.5rem]">{step.title}</h2>
                <p className="mt-4 text-[0.98rem] leading-[1.8] font-light text-[var(--d-muted)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ---- Pied : coordonnées, sans encadré ------------------------------ */}
      <footer className="border-t border-[var(--d-line)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-12 md:px-12">
          <p className="text-[0.75rem] font-light tracking-[0.28em] text-[var(--d-accent)] uppercase md:col-span-3">
            {contact.label}
          </p>
          <div className="space-y-2 text-[1.05rem] font-light md:col-start-5 md:col-end-9">
            <p>{contact.address}</p>
            <p>{contact.phone}</p>
            <p className="border-b border-[var(--d-ink)] inline-block pb-0.5">
              {contact.email}
            </p>
          </div>
          <p className="text-[0.9rem] font-light text-[var(--d-muted)] md:col-start-10 md:col-end-13">
            {contact.note}
          </p>
        </div>
      </footer>
    </div>
  );
}
