import { Scene } from "@/components/motion/Scene";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { method } from "@/content/method";

import type { SectionTone } from "@/components/ui/Section";

const HEADING_ID = "methode-titre";

/**
 * Les étapes sont dans une liste ordonnée : elles se suivent réellement, la
 * numérotation n'est pas décorative.
 *
 * Chaque ligne a son propre déclencheur : le filet se trace, le corps monte
 * sous masque, et le numéro s'incrémente depuis 00. La valeur réelle est
 * rendue côté serveur — c'est elle qui reste sans JavaScript ou en mouvement
 * réduit ; le compteur ne repart de zéro que derrière le masque.
 *
 * Le ton dépend de la page : la section doit alterner avec ses voisines.
 */
export function Method({ tone = "paper" }: { tone?: SectionTone }) {
  return (
    <Scene name="method">
      <Section id="methode" labelledBy={HEADING_ID} tone={tone}>
        <SectionHeading id={HEADING_ID} {...method.intro} />

        <ol className="mt-16">
          {method.steps.map((step) => (
            <li key={step.number} data-reveal="row">
              <span
                aria-hidden="true"
                data-reveal="row-rule"
                className="bg-rule block h-px w-full origin-left"
              />

              <div className="mask-y">
                <div
                  data-reveal="row-body"
                  className="grid gap-4 py-10 md:grid-cols-12 md:gap-8"
                >
                  <span
                    data-count={Number(step.number)}
                    className="font-mono text-label text-accent uppercase md:col-span-1"
                  >
                    {step.number}
                  </span>

                  <h3 className="font-display text-display-sm text-ink md:col-span-4">
                    {step.title}
                  </h3>

                  <div className="md:col-span-7">
                    <p className="text-base text-ink-2">{step.body}</p>
                    <p className="font-mono text-label text-ink mt-5 uppercase">
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </Scene>
  );
}
