import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { PageEntrance } from "@/components/motion/PageEntrance";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/contact";
import { pages } from "@/content/pages";
import { canSend } from "@/lib/mail";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(pages.contact, "/contact");

/**
 * Le formulaire n'apparaît que si l'envoi est réellement possible.
 *
 * `canSend()` vérifie la présence des quatre variables EmailJS au moment de la
 * compilation : leur présence seule est évaluée, jamais leur valeur, et rien
 * n'en sort dans le HTML. S'il en manque une, la page garde le courriel et le
 * téléphone — un formulaire qui n'envoie rien coûte plus cher qu'une adresse
 * qui marche.
 */
const ENVOI_POSSIBLE = canSend();

export default function ContactPage() {
  return (
    <>
      <PageEntrance name="contact">
        <Section>
          <div className="flex items-center gap-5">
            <span
              data-enter="label"
              className="font-mono text-label text-accent uppercase"
            >
              {pages.contact.kicker}
            </span>
            <span
              aria-hidden="true"
              data-enter="rule"
              className="bg-rule h-px flex-1 origin-left"
            />
          </div>

          <h1
            data-enter="title"
            className="font-display text-display text-ink mt-7 max-w-3xl text-balance"
          >
            {pages.contact.h1}
          </h1>
          <p data-enter="lead" className="text-xl text-ink-2 mt-8 max-w-xl">
            {pages.contact.lead}
          </p>

          <div data-enter="body" className="mt-12 flex flex-wrap gap-4">
            <Button href={`mailto:${contact.email}`}>{contact.email}</Button>
            {contact.phone ? (
              <Button
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                variant="secondary"
              >
                {contact.phoneAction} {contact.phone}
              </Button>
            ) : null}
          </div>

          <dl className="border-rule mt-16 grid gap-8 border-t pt-8 sm:grid-cols-3">
            {contact.phone ? (
              <div>
                <dt className="font-mono text-label text-ink-2 uppercase">
                  {contact.phoneLabel}
                </dt>
                <dd className="text-sm text-ink mt-2">
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="hover:text-accent inline-block py-1.5 transition-colors"
                  >
                    <span className="link-underline">{contact.phone}</span>
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-mono text-label text-ink-2 uppercase">
                {contact.emailLabel}
              </dt>
              <dd className="text-sm text-ink mt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-accent inline-block py-1.5 transition-colors"
                >
                  <span className="link-underline">{contact.email}</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label text-ink-2 uppercase">
                {contact.areaLabel}
              </dt>
              <dd className="text-sm text-ink mt-3">{contact.area}</dd>
            </div>
          </dl>
        </Section>
      </PageEntrance>

      {ENVOI_POSSIBLE ? (
        <Section tone="soft">
          <h2 className="font-display text-display-sm text-ink">
            {contact.form.title}
          </h2>
          <p className="text-base text-ink-2 mt-5 max-w-xl">
            {contact.form.lead}
          </p>
          <ContactForm />
        </Section>
      ) : null}

      <Section tone={ENVOI_POSSIBLE ? "paper" : "soft"}>
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-display-sm text-ink">
              {contact.checklist.title}
            </h2>
            <p className="text-base text-ink-2 mt-5">
              {contact.checklist.note}
            </p>

            <ul className="mt-8 space-y-3">
              {contact.checklist.items.map((item) => (
                <li key={item} className="text-base text-ink-2 flex gap-3">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-display-sm text-ink">
              {contact.next.title}
            </h2>

            <ol className="divide-rule border-rule mt-8 divide-y border-t">
              {contact.next.steps.map((step, index) => (
                // `items-baseline` : sans lui, les deux colonnes sont
                // étirées et chaque texte se pose en haut de sa propre boîte
                // de ligne. Le numéro est en 11 px d'interlignage 1,1, le pas
                // en 16 px d'interlignage 1,55 — 9 px d'écart mesurés entre
                // les deux lignes de base.
                <li key={step} className="flex items-baseline gap-6 py-6">
                  <span className="font-mono text-label text-accent uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-ink-2">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}
