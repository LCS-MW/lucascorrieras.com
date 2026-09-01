import { PageEntrance } from "@/components/motion/PageEntrance";
import { Section } from "@/components/ui/Section";

/**
 * Gabarit des pages de texte légal — confidentialité, conditions de vente.
 *
 * Les deux ont la même forme : un en-tête, puis des sections titrées séparées
 * au filet. Elles empruntent la séquence d'entrée « approche », la seule qui
 * pose le libellé et le filet avant le titre : sur une page qu'on ne lit que
 * parce qu'on la cherche, l'étiquette compte plus que l'accroche.
 */
export function LegalText({
  page,
}: {
  page: {
    kicker: string;
    h1: string;
    lead: string;
    updatedAt?: string;
    sections: readonly { title: string; body: readonly string[] }[];
  };
}) {
  return (
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

        {page.updatedAt ? (
          <p
            data-enter="body"
            className="font-mono text-label text-ink-2 mt-8 uppercase"
          >
            Dernière mise à jour · {page.updatedAt}
          </p>
        ) : null}

        <div
          data-enter="body"
          className="divide-rule border-rule mt-16 max-w-2xl divide-y border-t"
        >
          {page.sections.map((section) => (
            <section key={section.title} className="py-10">
              <h2 className="font-display text-display-sm text-ink">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base text-ink-2 mt-5">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </PageEntrance>
  );
}
