import Image from "next/image";

import { Scene } from "@/components/motion/Scene";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { demoSites } from "@/content/demo-sites";

import type { SectionTone } from "@/components/ui/Section";

const HEADING_ID = "demonstrations-titre";

/**
 * Les trois démonstrations, posées auprès de l'offre.
 *
 * Pas de fiche projet derrière : la carte mène directement au site. Un
 * exercice n'a pas d'étude de cas — il n'y a pas de commanditaire à citer, pas
 * de contrainte reçue, pas de résultat à raconter. Le site lui-même est
 * l'intégralité de l'argument.
 *
 * L'aperçu ne porte aucun voile filaire : ces trois sites existent et
 * fonctionnent, seule leur entreprise est inventée.
 */
export function DemoSites({
  tone = "paper",
  as: Heading = "h3",
}: {
  tone?: SectionTone;
  as?: "h2" | "h3";
}) {
  return (
    <Scene name="projects">
      <Section id="demonstrations" labelledBy={HEADING_ID} tone={tone}>
        <SectionHeading id={HEADING_ID} {...demoSites.intro} />

        <p
          data-reveal="notice"
          className="border-accent text-base text-ink-2 mt-8 max-w-lg border-l pl-5"
        >
          {demoSites.notice}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {demoSites.items.map((demo) => (
            <article key={demo.slug} data-magnetic>
              <TransitionLink href={`/demo/${demo.slug}`} className="block">
                <div className="mask-y">
                  <div data-reveal="preview">
                    <div className="border-rule bg-paper relative aspect-[4/3] w-full overflow-hidden border">
                      <Image
                        src={demo.preview}
                        alt={demo.previewAlt}
                        width={1600}
                        height={1200}
                        sizes="(min-width: 768px) 30vw, 92vw"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                <div className="mask-y">
                  <div data-reveal="card-body" className="pt-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-mono text-label text-ink-2 uppercase">
                        {demo.trade}
                      </p>
                      <p className="font-mono text-label text-accent uppercase">
                        {demo.register}
                      </p>
                    </div>

                    <Heading className="font-display text-display-sm text-ink mt-5">
                      <span className="link-underline">{demo.name}</span>
                    </Heading>

                    <p className="text-base text-ink-2 mt-4">{demo.summary}</p>
                  </div>
                </div>
              </TransitionLink>
            </article>
          ))}
        </div>
      </Section>
    </Scene>
  );
}
