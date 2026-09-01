import { vernet } from "@/content/demos/vernet";
import { vernetDisplay, vernetText } from "@/lib/demo-fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  // Titre absolu : une démo ne doit pas porter le nom du site principal.
  title: { absolute: vernet.meta.title },
  description: vernet.meta.description,
};

const { hero, craft, work, contact, nav } = vernet;

export default function AtelierVernetDemo() {
  return (
    <div
      className={`demo demo-vernet ${vernetDisplay.variable} ${vernetText.variable}`}
    >
      <header className="border-b border-[var(--d-line)]">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-8 px-6 py-6 md:px-10">
          <span className="demo-display text-[1.35rem] font-bold tracking-tight">
            {nav.brand}
          </span>
          <nav className="flex gap-8 text-[0.8rem] tracking-[0.16em] text-[var(--d-muted)] uppercase">
            {nav.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* ---- Accroche ---------------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
          <p className="text-[0.8rem] tracking-[0.16em] text-[var(--d-accent)] uppercase">
            {hero.eyebrow}
          </p>

          <h1 className="demo-display mt-8 max-w-4xl text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-balance">
            {hero.title}
          </h1>

          <p className="mt-10 max-w-xl text-[1.15rem] leading-relaxed text-[var(--d-muted)]">
            {hero.lead}
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <span className="rounded-[3px] bg-[var(--d-accent)] px-7 py-3.5 font-medium text-[var(--d-bg)]">
              {hero.actions.primary}
            </span>
            <span className="rounded-[3px] border border-[var(--d-ink)] px-7 py-3.5 font-medium">
              {hero.actions.secondary}
            </span>
          </div>

          <dl className="mt-20 grid gap-10 border-t border-[var(--d-line)] pt-10 sm:grid-cols-3">
            {hero.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="demo-display text-[2.4rem] leading-none font-bold text-[var(--d-accent)]">
                  {fact.value}
                </dt>
                <dd className="mt-3 text-[0.95rem] text-[var(--d-muted)]">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---- Savoir-faire ------------------------------------------------ */}
        <section className="bg-[var(--d-surface)] px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-baseline gap-6">
              <span className="demo-display text-[1.1rem] text-[var(--d-accent)]">
                {craft.index}
              </span>
              <h2 className="demo-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold tracking-tight">
                {craft.title}
              </h2>
            </div>

            <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
              {craft.items.map((item) => (
                <article key={item.title}>
                  <h3 className="demo-display text-[1.45rem] font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-[var(--d-muted)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Réalisations, en grand ------------------------------------- */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-baseline gap-6">
              <span className="demo-display text-[1.1rem] text-[var(--d-accent)]">
                {work.index}
              </span>
              <h2 className="demo-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold tracking-tight">
                {work.title}
              </h2>
            </div>
            <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--d-muted)]">
              {work.note}
            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {work.pieces.map((piece) => (
                <figure
                  key={piece.name}
                  className={piece.span ? "md:col-span-2" : undefined}
                >
                  <div
                    className={`wood ${piece.wood} w-full ${piece.span ? "aspect-[21/9]" : "aspect-[4/3]"} rounded-[3px]`}
                  />
                  <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                    <h3 className="demo-display text-[1.55rem] font-semibold">
                      {piece.name}
                    </h3>
                    <p className="text-[0.8rem] tracking-[0.16em] text-[var(--d-accent)] uppercase">
                      {piece.price}
                    </p>
                  </figcaption>
                  <p className="mt-2 text-[0.8rem] tracking-[0.14em] text-[var(--d-muted)] uppercase">
                    {piece.essence} · {piece.size} · {piece.lead}
                  </p>
                  <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-[var(--d-muted)]">
                    {piece.note}
                  </p>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Contact ----------------------------------------------------- */}
        <section className="bg-[var(--d-ink)] px-6 py-24 text-[var(--d-bg)] md:px-10 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
            <div>
              <div className="flex items-baseline gap-6">
                <span className="demo-display text-[1.1rem] text-[#c9945c]">
                  {contact.index}
                </span>
                <h2 className="demo-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold tracking-tight">
                  {contact.title}
                </h2>
              </div>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed opacity-80">
                {contact.lead}
              </p>

              <address className="mt-12 space-y-2 text-[1rem] not-italic opacity-80">
                {contact.address.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="pt-2">{contact.address.phone}</p>
                <p className="pt-4 text-[0.9rem] opacity-70">
                  {contact.address.hours}
                </p>
              </address>
            </div>

            <form className="space-y-6">
              {contact.fields.map((field) => (
                <label key={field.label} className="block">
                  <span className="text-[0.8rem] tracking-[0.14em] uppercase opacity-70">
                    {field.label}
                  </span>
                  <input
                    type="text"
                    placeholder={field.hint}
                    className="mt-2 w-full border-b border-[#5a483a] bg-transparent pb-3 text-[1.05rem] placeholder:text-[#8a7663] focus:border-[#c9945c] focus:outline-none"
                  />
                </label>
              ))}
              <button
                type="button"
                className="mt-4 rounded-[3px] bg-[#c9945c] px-7 py-3.5 font-medium text-[var(--d-ink)]"
              >
                {contact.action}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
