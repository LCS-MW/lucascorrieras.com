import { PageEntrance } from "@/components/motion/PageEntrance";
import { Section } from "@/components/ui/Section";
import { assertLegalComplete, legal } from "@/content/legal";
import { legalPages } from "@/content/legal-pages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const page = legalPages.mentions;

export const metadata: Metadata = pageMetadata(page, "/mentions-legales");

export default function MentionsLegalesPage() {
  // Échoue la compilation de production si un champ obligatoire manque.
  assertLegalComplete();

  const editor: { label: string; value: string | null }[] = [
    { label: "Éditeur", value: legal.editor.name },
    { label: "Statut", value: legal.editor.status },
    { label: "Adresse", value: legal.editor.address },
    { label: "SIRET", value: legal.editor.siret },
    { label: "TVA", value: legal.editor.vat },
    { label: "Courriel", value: legal.editor.email },
    { label: "Téléphone", value: legal.editor.phone },
    { label: "Directeur de la publication", value: legal.editor.publisher },
  ];

  return (
    <>
      <PageEntrance name="approach">
        <Section>
          <div className="flex items-center gap-5">
            <span
              data-enter="label"
              className="font-mono text-label text-accent uppercase"
            >
              {page.kicker}
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
            {page.h1}
          </h1>
          <p data-enter="lead" className="text-xl text-ink-2 mt-8 max-w-xl">
            {page.lead}
          </p>

          <dl
            data-enter="body"
            className="divide-rule border-rule mt-16 max-w-2xl divide-y border-t"
          >
            {editor
              .filter((row) => row.value)
              .map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-8"
                >
                  <dt className="font-mono text-label text-ink-2 pt-1 uppercase">
                    {row.label}
                  </dt>
                  <dd className="text-base text-ink sm:col-span-2">
                    {row.value}
                  </dd>
                </div>
              ))}
          </dl>
        </Section>
      </PageEntrance>

      <Section tone="soft">
        <h2 className="font-display text-display-sm text-ink">Hébergement</h2>
        <p className="text-base text-ink-2 mt-6 max-w-2xl">
          Ce site est hébergé par {legal.host.name}, {legal.host.address}.
        </p>
        <p className="text-base text-ink-2 mt-4 max-w-2xl">
          Les textes, les images et le code de {site.domain} sont protégés par
          le droit d’auteur. Toute reproduction sans accord écrit est interdite.
        </p>
      </Section>
    </>
  );
}
