import { tessier } from "@/content/demos/tessier";
import { tessierDisplay, tessierText } from "@/lib/demo-fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  // Titre absolu : une démo ne doit pas porter le nom du site principal.
  title: { absolute: tessier.meta.title },
  description: tessier.meta.description,
};

const { hero, answers, menus, occasions, availability, quote, nav } = tessier;

export default function MaisonTessierDemo() {
  return (
    <div
      className={`demo demo-tessier ${tessierDisplay.variable} ${tessierText.variable}`}
    >
      <header className="border-b border-[var(--d-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-6 md:px-10">
          <span className="demo-display text-[1.6rem] tracking-tight">
            {nav.brand}
          </span>
          <nav className="flex gap-8 text-[0.82rem] text-[var(--d-muted)]">
            {nav.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* ---- Accroche ---------------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:px-10 md:pt-28">
          <p className="text-[0.82rem] tracking-[0.14em] text-[var(--d-accent)] uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="demo-display mt-8 max-w-4xl text-[clamp(2.8rem,7.5vw,5.6rem)] leading-[1.02] tracking-[-0.01em] text-balance">
            {hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-[1.15rem] leading-relaxed text-[var(--d-muted)]">
            {hero.lead}
          </p>
          <span className="mt-10 inline-block rounded-full bg-[var(--d-accent)] px-8 py-4 font-medium text-[var(--d-bg)]">
            {hero.action}
          </span>
        </section>

        {/* ---- Répondu avant l'appel : le cœur du site --------------------- */}
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
          <h2 className="demo-display text-[1.9rem] tracking-tight">
            {answers.title}
          </h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-2 lg:grid-cols-4">
            {answers.items.map((item) => (
              <div key={item.question} className="bg-[var(--d-surface)] p-7">
                <dt className="text-[0.95rem] text-[var(--d-muted)]">
                  {item.question}
                </dt>
                <dd>
                  <p className="demo-display mt-4 text-[2.1rem] leading-none text-[var(--d-accent)]">
                    {item.answer}
                  </p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--d-muted)]">
                    {item.detail}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---- Formules ---------------------------------------------------- */}
        <section className="bg-[var(--d-surface)] px-6 py-24 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[0.82rem] tracking-[0.14em] text-[var(--d-accent)] uppercase">
              {menus.index}
            </p>
            <h2 className="demo-display mt-4 text-[clamp(2rem,4vw,3.1rem)] tracking-tight">
              {menus.title}
            </h2>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[var(--d-muted)]">
              {menus.note}
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {menus.items.map((item) => (
                <article
                  key={item.name}
                  className={`flex flex-col rounded-[10px] border p-8 ${
                    item.featured
                      ? "border-[var(--d-accent)] bg-[var(--d-bg)] shadow-[0_10px_30px_-12px_rgba(187,62,19,0.35)]"
                      : "border-[var(--d-line)] bg-[var(--d-bg)]"
                  }`}
                >
                  <h3 className="demo-display text-[1.7rem] tracking-tight">
                    {item.name}
                  </h3>
                  <p className="demo-display mt-3 text-[2rem] leading-none text-[var(--d-accent)]">
                    {item.price}
                  </p>
                  <p className="mt-2 text-[0.85rem] text-[var(--d-muted)]">
                    À partir de {item.min}
                  </p>
                  <p className="mt-5 text-[1rem] leading-relaxed text-[var(--d-muted)]">
                    {item.summary}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-[var(--d-line)] pt-6">
                    {item.includes.map((line) => (
                      <li key={line} className="flex gap-3 text-[0.95rem]">
                        <span
                          aria-hidden="true"
                          className="text-[var(--d-accent)]"
                        >
                          ·
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Occasions et disponibilités --------------------------------- */}
        <section className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:px-10 md:py-28">
          <div>
            <p className="text-[0.82rem] tracking-[0.14em] text-[var(--d-accent)] uppercase">
              {occasions.index}
            </p>
            <h2 className="demo-display mt-4 text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-tight">
              {occasions.title}
            </h2>
            <dl className="mt-10 divide-y divide-[var(--d-line)] border-y border-[var(--d-line)]">
              {occasions.items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between gap-8 py-5"
                >
                  <dt className="demo-display text-[1.3rem]">{item.name}</dt>
                  <dd className="max-w-xs text-right text-[0.95rem] text-[var(--d-muted)]">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="demo-display text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-tight">
              {availability.title}
            </h2>
            <p className="mt-4 text-[0.95rem] text-[var(--d-muted)]">
              {availability.note}
            </p>
            <div className="mt-10 space-y-7">
              {availability.months.map((month) => (
                <div key={month.name}>
                  <p className="text-[0.82rem] tracking-[0.14em] text-[var(--d-muted)] uppercase">
                    {month.name}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {month.open.map((day) => (
                      <span
                        key={day}
                        className="rounded-full border border-[var(--d-accent)] px-4 py-1.5 text-[0.9rem] text-[var(--d-accent)]"
                      >
                        {day}
                      </span>
                    ))}
                    {month.taken.map((day) => (
                      <span
                        key={day}
                        className="rounded-full border border-[var(--d-line)] px-4 py-1.5 text-[0.9rem] text-[var(--d-muted)] line-through"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Devis ------------------------------------------------------- */}
        <section className="bg-[var(--d-ink)] px-6 py-24 text-[var(--d-bg)] md:px-10 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-[0.82rem] tracking-[0.14em] uppercase opacity-70">
                {quote.index}
              </p>
              <h2 className="demo-display mt-4 text-[clamp(2rem,4vw,3rem)] tracking-tight">
                {quote.title}
              </h2>
              <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed opacity-80">
                {quote.lead}
              </p>
            </div>

            <form className="grid gap-5 sm:grid-cols-2">
              {quote.fields.map((field, index) => (
                <label
                  key={field.label}
                  className={index > 2 ? "sm:col-span-2" : "block"}
                >
                  <span className="text-[0.8rem] tracking-[0.12em] uppercase opacity-70">
                    {field.label}
                  </span>
                  <input
                    type="text"
                    placeholder={field.hint}
                    className="mt-2 w-full rounded-[8px] border border-[#6a4436] bg-[#4a2a1e] px-4 py-3 text-[1rem] placeholder:text-[#b08a78] focus:border-[#e8734a] focus:outline-none"
                  />
                </label>
              ))}
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="rounded-full bg-[#e8734a] px-8 py-4 font-medium text-[var(--d-ink)]"
                >
                  {quote.action}
                </button>
                <p className="mt-4 text-[0.9rem] opacity-70">
                  {quote.reassurance}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
