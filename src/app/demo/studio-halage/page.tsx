import { halage } from "@/content/demos/halage";
import { halageDisplay, halageText } from "@/lib/demo-fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  // Titre absolu : une démo ne doit pas porter le nom du site principal.
  title: { absolute: halage.meta.title },
  description: halage.meta.description,
};

const { hero, shop, product, cart, nav } = halage;

export default function StudioHalageDemo() {
  return (
    <div
      className={`demo demo-halage ${halageDisplay.variable} ${halageText.variable}`}
    >
      <header className="border-b border-[var(--d-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-5 md:px-10">
          <span className="demo-display text-[1.1rem] font-bold tracking-[0.02em] uppercase">
            {nav.brand}
          </span>
          <nav className="flex gap-8 text-[0.85rem] text-[var(--d-muted)]">
            {nav.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* ---- Accroche ---------------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 md:px-10 md:pt-32">
          <p className="text-[0.78rem] tracking-[0.2em] text-[var(--d-accent)] uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="demo-display mt-8 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.03] font-medium tracking-[-0.02em] text-balance">
            {hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-[1.08rem] leading-relaxed text-[var(--d-muted)]">
            {hero.lead}
          </p>
          <span className="mt-10 inline-block border border-[var(--d-accent)] px-7 py-3.5 text-[0.9rem] tracking-[0.08em] text-[var(--d-accent)] uppercase">
            {hero.action}
          </span>
        </section>

        {/* ---- Grille produits --------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-[var(--d-line)] pb-6">
            <div className="flex items-baseline gap-5">
              <span className="text-[0.78rem] tracking-[0.2em] text-[var(--d-accent)]">
                {shop.index}
              </span>
              <h2 className="demo-display text-[1.9rem] font-medium tracking-tight">
                {shop.title}
              </h2>
            </div>
            <p className="text-[0.85rem] text-[var(--d-muted)]">
              {shop.nextBatch}
            </p>
          </div>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-[var(--d-muted)]">
            {shop.note}
          </p>

          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {shop.items.map((item) => (
              <li key={item.name}>
                {/* L'atténuation ne porte que sur le visuel : appliquée à
                    toute la carte, elle ramènerait le texte à 2,4:1. */}
                <div
                  className={`glaze ${item.glaze} aspect-square w-full ${
                    item.stock === 0 ? "opacity-40" : ""
                  }`}
                />

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="demo-display text-[1.2rem] font-medium">
                    {item.name}
                  </h3>
                  <p className="demo-display text-[1.1rem] text-[var(--d-accent)]">
                    {item.price}
                  </p>
                </div>

                <p className="mt-2 text-[0.78rem] tracking-[0.12em] text-[var(--d-muted)] uppercase">
                  {item.glazeName} · {item.size} · {item.volume}
                </p>

                <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--d-muted)]">
                  {item.flaw}
                </p>

                <p className="mt-4 text-[0.8rem] tracking-[0.12em] uppercase">
                  {item.stock === 0 ? (
                    <span className="text-[var(--d-muted)]">
                      {shop.soldLabel}
                    </span>
                  ) : (
                    <span className="text-[var(--d-accent)]">
                      {item.stock} en stock
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Fiche produit ----------------------------------------------- */}
        <section className="border-y border-[var(--d-line)] bg-[var(--d-surface)] px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-baseline gap-5">
              <span className="text-[0.78rem] tracking-[0.2em] text-[var(--d-accent)]">
                {product.index}
              </span>
              <h2 className="demo-display text-[1.9rem] font-medium tracking-tight">
                {product.title}
              </h2>
            </div>

            <div className="mt-14 grid gap-14 md:grid-cols-2">
              <div
                className={`glaze ${product.piece.glaze} aspect-[4/5] w-full`}
              />

              <div>
                <p className="text-[0.78rem] tracking-[0.2em] text-[var(--d-accent)] uppercase">
                  {product.piece.glazeName}
                </p>
                <h3 className="demo-display mt-4 text-[clamp(1.9rem,3.4vw,2.7rem)] font-medium tracking-tight">
                  {product.piece.name}
                </h3>
                <p className="demo-display mt-5 text-[1.9rem] text-[var(--d-accent)]">
                  {product.piece.price}
                </p>

                <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-[var(--d-muted)]">
                  {product.piece.description}
                </p>

                <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-[var(--d-line)] py-7">
                  {product.piece.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4"
                    >
                      <dt className="text-[0.88rem] text-[var(--d-muted)]">
                        {spec.label}
                      </dt>
                      <dd className="text-[0.88rem]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-9">
                  <h4 className="text-[0.8rem] tracking-[0.14em] text-[var(--d-accent)] uppercase">
                    {product.piece.flaws.title}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {product.piece.flaws.items.map((flaw) => (
                      <li
                        key={flaw}
                        className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--d-muted)]"
                      >
                        <span
                          aria-hidden="true"
                          className="text-[var(--d-accent)]"
                        >
                          —
                        </span>
                        <span>{flaw}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    className="bg-[var(--d-accent)] px-8 py-4 text-[0.9rem] tracking-[0.08em] text-[var(--d-bg)] uppercase"
                  >
                    {product.piece.action}
                  </button>
                  <p className="text-[0.85rem] text-[var(--d-muted)]">
                    {product.piece.stock} exemplaire, pièce unique
                  </p>
                </div>

                <p className="mt-6 text-[0.88rem] text-[var(--d-muted)]">
                  {product.piece.care}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Panier factice ---------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="flex items-baseline gap-5">
            <span className="text-[0.78rem] tracking-[0.2em] text-[var(--d-accent)]">
              {cart.index}
            </span>
            <h2 className="demo-display text-[1.9rem] font-medium tracking-tight">
              {cart.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-14 md:grid-cols-[1.4fr_1fr]">
            <ul className="divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
              {cart.lines.map((line) => (
                <li key={line.name} className="flex items-center gap-6 py-6">
                  <span className="glaze glaze-celadon size-16 shrink-0" />
                  <div className="flex-1">
                    <p className="demo-display text-[1.15rem] font-medium">
                      {line.name}
                    </p>
                    <p className="mt-1 text-[0.82rem] tracking-[0.12em] text-[var(--d-muted)] uppercase">
                      {line.glazeName} · quantité {line.quantity}
                    </p>
                  </div>
                  <p className="demo-display text-[1.15rem]">{line.price}</p>
                </li>
              ))}
            </ul>

            <div className="border border-[var(--d-line)] p-8">
              <dl className="space-y-4">
                {cart.summary.map((row) => (
                  <div key={row.label} className="flex justify-between gap-6">
                    <dt className="text-[0.95rem] text-[var(--d-muted)]">
                      {row.label}
                    </dt>
                    <dd className="text-[0.95rem]">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex items-baseline justify-between gap-6 border-t border-[var(--d-line)] pt-7">
                <p className="demo-display text-[1.15rem] font-medium">
                  {cart.total.label}
                </p>
                <p className="demo-display text-[1.9rem] text-[var(--d-accent)]">
                  {cart.total.value}
                </p>
              </div>

              <button
                type="button"
                className="mt-8 w-full bg-[var(--d-accent)] px-8 py-4 text-[0.9rem] tracking-[0.08em] text-[var(--d-bg)] uppercase"
              >
                {cart.action}
              </button>

              <p className="mt-5 text-[0.88rem] leading-relaxed text-[var(--d-muted)]">
                {cart.note}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
