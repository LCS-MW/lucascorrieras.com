import { vasseur } from "@/content/demos/vasseur";
import { vasseurDisplay, vasseurText } from "@/lib/demo-fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  // Titre absolu : une démo ne doit pas porter le nom du site principal.
  title: { absolute: vasseur.meta.title },
  description: vasseur.meta.description,
};

const { nav, hero, urgent, services, area, hours, contact, footer } = vasseur;

/**
 * Registre courant, et c'est tout le propos.
 *
 * Pas de grille éditoriale, pas d'échelle typographique spectaculaire, pas de
 * blanc tournant. Un bandeau bleu, des boîtes grises, un numéro de téléphone
 * qu'on trouve sans chercher. Les deux autres démonstrations montrent ce qu'on
 * sait faire quand le sujet le demande ; celle-ci montre qu'on sait s'en
 * abstenir quand il ne le demande pas.
 */
export default function VasseurDemo() {
  return (
    <div
      className={`demo demo-vasseur ${vasseurDisplay.variable} ${vasseurText.variable}`}
    >
      {/* ---- En-tête : le numéro est l'élément le plus visible ------------ */}
      <header className="border-b border-[var(--d-line)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <span className="demo-display block text-[1.4rem] leading-none font-bold">
              {nav.brand}
            </span>
            <span className="text-[0.8rem] text-[var(--d-muted)]">
              {nav.trade}
            </span>
          </div>

          <nav className="hidden gap-7 text-[0.95rem] text-[var(--d-muted)] md:flex">
            {nav.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </nav>

          <span className="demo-display rounded-[4px] bg-[var(--d-accent)] px-5 py-2.5 text-[1.05rem] font-semibold text-[var(--d-card)]">
            {nav.phoneLabel} {nav.phone}
          </span>
        </div>
      </header>

      <main>
        {/* ---- Accroche ---------------------------------------------------- */}
        <section className="bg-[var(--d-surface)] border-b border-[var(--d-line)]">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-5 md:py-16">
            <div className="md:col-span-3">
              <h1 className="demo-display text-[clamp(1.9rem,4vw,2.6rem)] leading-tight font-bold">
                {hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[var(--d-muted)]">
                {hero.lead}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="demo-display rounded-[4px] bg-[var(--d-accent)] px-6 py-3 font-semibold text-[var(--d-card)]">
                  {hero.actions.primary}
                </span>
                <span className="demo-display rounded-[4px] border-2 border-[var(--d-accent)] px-6 py-3 font-semibold text-[var(--d-accent)]">
                  {hero.actions.secondary}
                </span>
              </div>
            </div>

            <ul className="space-y-3 rounded-[6px] border border-[var(--d-line)] bg-[var(--d-card)] p-6 md:col-span-2">
              {hero.reassurance.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem]">
                  <span
                    aria-hidden="true"
                    className="mt-[0.35rem] size-2 shrink-0 rounded-full bg-[var(--d-accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- Bandeau d'urgence ------------------------------------------- */}
        <section className="bg-[var(--d-urgent)] text-[var(--d-card)]">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6">
            <div>
              <p className="demo-display text-[1.15rem] font-semibold">
                {urgent.label}
              </p>
              <p className="mt-1 max-w-xl text-[0.95rem] opacity-90">
                {urgent.body}
              </p>
            </div>
            <span className="demo-display rounded-[4px] bg-[var(--d-card)] px-6 py-3 text-[1.1rem] font-bold text-[var(--d-urgent)]">
              {urgent.action}
            </span>
          </div>
        </section>

        {/* ---- Prestations : trois boîtes, rien de plus --------------------- */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="demo-display text-[1.7rem] font-bold">
            {services.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--d-muted)]">
            {services.lead}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.items.map((service) => (
              <div
                key={service.name}
                className="rounded-[6px] border border-[var(--d-line)] bg-[var(--d-surface)] p-6"
              >
                <h3 className="demo-display text-[1.25rem] font-semibold">
                  {service.name}
                </h3>
                <p className="mt-3 text-[0.95rem] text-[var(--d-muted)]">
                  {service.body}
                </p>
                <ul className="mt-5 space-y-2 border-t border-[var(--d-line)] pt-5 text-[0.9rem]">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="text-[var(--d-accent)]"
                      >
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Zone et horaires : deux blocs côte à côte -------------------- */}
        <section className="border-y border-[var(--d-line)] bg-[var(--d-surface)]">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2">
            <div>
              <h2 className="demo-display text-[1.7rem] font-bold">
                {area.title}
              </h2>
              <p className="mt-3 text-[var(--d-muted)]">{area.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {area.towns.map((town) => (
                  <li
                    key={town}
                    className="rounded-[4px] border border-[var(--d-line)] bg-[var(--d-card)] px-3 py-1.5 text-[0.9rem]"
                  >
                    {town}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="demo-display text-[1.7rem] font-bold">
                {hours.title}
              </h2>
              <p className="mt-3 text-[var(--d-muted)]">{hours.lead}</p>
              <dl className="mt-6 divide-y divide-[var(--d-line)] rounded-[6px] border border-[var(--d-line)] bg-[var(--d-card)]">
                {hours.rows.map((row) => (
                  <div
                    key={row.day}
                    className="flex justify-between gap-4 px-5 py-3.5 text-[0.95rem]"
                  >
                    <dt className="text-[var(--d-muted)]">{row.day}</dt>
                    <dd className="font-medium">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---- Contact ------------------------------------------------------ */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[6px] border-2 border-[var(--d-accent)] p-8 md:p-10">
            <h2 className="demo-display text-[1.7rem] font-bold">
              {contact.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--d-muted)]">
              {contact.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="text-[0.85rem] text-[var(--d-muted)]">
                  Téléphone
                </p>
                <p className="demo-display text-[1.35rem] font-bold text-[var(--d-accent)]">
                  {contact.phone}
                </p>
              </div>
              <div>
                <p className="text-[0.85rem] text-[var(--d-muted)]">Courriel</p>
                <p className="text-[1.05rem] font-medium">{contact.email}</p>
              </div>
              <div>
                <p className="text-[0.85rem] text-[var(--d-muted)]">Atelier</p>
                <p className="text-[1.05rem] font-medium">{contact.address}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--d-line)] bg-[var(--d-surface)]">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4 px-6 py-8 text-[0.85rem] text-[var(--d-muted)]">
          <p>{footer.legal}</p>
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
