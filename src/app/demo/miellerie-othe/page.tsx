import { othe } from "@/content/demos/othe";
import { otheDisplay, otheText } from "@/lib/demo-fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  // Titre absolu : une démo ne doit pas porter le nom du site principal.
  title: { absolute: othe.meta.title },
  description: othe.meta.description,
};

const { nav, hero, shop, markets, farm, contact, footer } = othe;

/**
 * Registre boutique. Le troisième écart de la série.
 *
 * Ni la neutralité du plombier, ni la retenue de l'ébéniste : des angles
 * largement adoucis, des ambres, et une grille de produits où le prix arrive
 * juste après le nom. Une petite production qui vend en direct n'a pas besoin
 * d'être élégante, elle a besoin qu'on sache combien coûte un pot et où le
 * trouver samedi matin.
 */
export default function MiellerieDemo() {
  return (
    <div
      className={`demo demo-othe ${otheDisplay.variable} ${otheText.variable}`}
    >
      <header className="border-b border-[var(--d-line)] bg-[var(--d-card)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <span className="demo-display text-[1.2rem] leading-tight font-bold">
            {nav.brand}
          </span>
          <nav className="hidden gap-6 text-[0.95rem] text-[var(--d-muted)] md:flex">
            {nav.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </nav>
          <span className="demo-display rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.95rem] font-semibold text-[var(--d-card)]">
            {nav.action}
          </span>
        </div>
      </header>

      <main>
        {/* ---- Accroche : un bandeau chaud, une phrase, un bouton -------- */}
        <section className="bg-[var(--d-surface)]">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <p className="demo-display text-[0.85rem] font-semibold tracking-[0.14em] text-[var(--d-honey-3)] uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="demo-display mt-5 max-w-3xl text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-bold">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-[var(--d-muted)]">
              {hero.lead}
            </p>
            <span className="demo-display mt-9 inline-block rounded-full bg-[var(--d-ink)] px-8 py-3.5 font-semibold text-[var(--d-card)]">
              {hero.action}
            </span>
          </div>
        </section>

        {/* ---- Les pots : le prix juste après le nom --------------------- */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="demo-display text-[1.8rem] font-bold">{shop.title}</h2>
          <p className="mt-3 max-w-2xl text-[var(--d-muted)]">{shop.lead}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shop.items.map((item, index) => (
              <article
                key={item.name}
                className="overflow-hidden rounded-[14px] border border-[var(--d-line)] bg-[var(--d-card)]"
              >
                {/* Le pot, suggéré : un dégradé de miel dans un cadre carré. */}
                <div
                  aria-hidden="true"
                  className="flex aspect-square items-end justify-center p-5"
                  style={{
                    backgroundImage: `linear-gradient(${150 + index * 18}deg, var(--d-honey-1) 0%, var(--d-honey-2) 55%, var(--d-honey-3) 130%)`,
                  }}
                >
                  <span className="demo-display rounded-full bg-[var(--d-card)] px-3 py-1 text-[0.75rem] font-semibold">
                    {item.weight}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="demo-display text-[1.2rem] font-bold">
                      {item.name}
                    </h3>
                    <p className="demo-display text-[1.2rem] font-bold text-[var(--d-honey-3)]">
                      {item.price}
                    </p>
                  </div>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--d-muted)]">
                    {item.note}
                  </p>
                  <p className="mt-4 inline-block rounded-full bg-[var(--d-surface)] px-3 py-1 text-[0.78rem] font-semibold">
                    {item.stock}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Marchés : trois lignes, jour, lieu, horaire --------------- */}
        <section className="border-y border-[var(--d-line)] bg-[var(--d-surface)]">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="demo-display text-[1.8rem] font-bold">
              {markets.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--d-muted)]">
              {markets.lead}
            </p>

            <ul className="mt-8 space-y-3">
              {markets.rows.map((row) => (
                <li
                  key={row.day}
                  className="flex flex-wrap items-baseline gap-x-6 gap-y-1 rounded-[12px] bg-[var(--d-card)] px-6 py-5"
                >
                  <span className="demo-display w-24 text-[1.05rem] font-bold">
                    {row.day}
                  </span>
                  <span className="flex-1 text-[1rem]">{row.place}</span>
                  <span className="text-[0.95rem] font-semibold text-[var(--d-honey-3)]">
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- La miellerie : texte et trois chiffres -------------------- */}
        <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="demo-display text-[1.8rem] font-bold">
              {farm.title}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-[var(--d-muted)]">
              {farm.body}
            </p>
            <span className="demo-display mt-7 inline-block rounded-full border-2 border-[var(--d-ink)] px-7 py-3 font-semibold">
              {farm.action}
            </span>
          </div>

          <dl className="grid grid-cols-3 gap-4">
            {farm.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[14px] bg-[var(--d-surface)] px-4 py-7 text-center"
              >
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="demo-display block text-[2rem] leading-none font-bold text-[var(--d-honey-3)]">
                    {fact.value}
                  </span>
                  <span className="mt-2 block text-[0.85rem] text-[var(--d-muted)]">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---- Contact --------------------------------------------------- */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="rounded-[18px] bg-[var(--d-ink)] px-8 py-10 text-[var(--d-card)] md:px-10">
            <h2 className="demo-display text-[1.6rem] font-bold">
              {contact.title}
            </h2>
            <p className="mt-3 max-w-xl opacity-80">{contact.body}</p>
            <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              <p className="demo-display text-[1.3rem] font-bold">
                {contact.phone}
              </p>
              <p className="text-[1.05rem] opacity-90">{contact.email}</p>
              <p className="text-[1.05rem] opacity-90">{contact.address}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--d-line)]">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4 px-6 py-8 text-[0.85rem] text-[var(--d-muted)]">
          <p>{footer.note}</p>
          <p className="flex gap-5">
            {footer.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
