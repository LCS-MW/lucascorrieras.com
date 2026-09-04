import { CallToAction } from "@/components/sections/CallToAction";
import { ExplodedView } from "@/components/sections/ExplodedView";
import { PageEntrance } from "@/components/motion/PageEntrance";
import { Scene } from "@/components/motion/Scene";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { carteRestaurant } from "@/content/case-studies";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const { page, frame, stack } = carteRestaurant;
const STACK_HEADING_ID = "stack-titre";

export const metadata: Metadata = pageMetadata(
  page,
  `/demonstrations/${carteRestaurant.slug}`,
);

export default function CarteRestaurantPage() {
  return (
    <>
      <PageEntrance name="project">
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

          {/* Le cadre est posé ici et pas en fin de page. Un visiteur qui
              apprend au dernier écran que le projet n'a pas eu de suite a déjà
              lu tout le reste comme une référence commerciale. */}
          <div data-enter="body" className="mt-14 max-w-xl">
            <p className="font-mono text-label text-accent uppercase">
              {frame.label}
            </p>
            <p className="border-accent text-base text-ink-2 mt-4 border-l pl-5">
              {frame.body}
            </p>
          </div>

          <div data-enter="body" className="mt-10">
            <Button href={frame.action.href}>{frame.action.label}</Button>
          </div>
        </Section>
      </PageEntrance>

      <ExplodedView />

      <Scene name="heading">
        <Section labelledBy={STACK_HEADING_ID} tone="soft">
          <SectionHeading id={STACK_HEADING_ID} {...stack.intro} />

          <dl className="border-rule mt-16 grid gap-x-12 gap-y-8 border-t pt-10 sm:grid-cols-2">
            {stack.items.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-label text-ink-2 uppercase">
                  {item.label}
                </dt>
                <dd className="text-base text-ink mt-3">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </Scene>

      <CallToAction />
    </>
  );
}
