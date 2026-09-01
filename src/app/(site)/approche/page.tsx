import { CallToAction } from "@/components/sections/CallToAction";
import { PageEntrance } from "@/components/motion/PageEntrance";
import { Section } from "@/components/ui/Section";
import { approach } from "@/content/approach";
import { guarantees } from "@/content/guarantees";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(pages.approach, "/approche");

export default function ApproachPage() {
  return (
    <>
      <PageEntrance name="approach">
        <Section>
          <div className="flex items-center gap-5">
            <span
              data-enter="label"
              className="font-mono text-label text-accent uppercase"
            >
              {pages.approach.kicker}
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
            {pages.approach.h1}
          </h1>
          <p data-enter="lead" className="text-xl text-ink-2 mt-8 max-w-xl">
            {pages.approach.lead}
          </p>

          <div
            data-enter="body"
            className="border-rule mt-20 grid gap-px border-t md:grid-cols-2"
          >
            {approach.items.map((item) => (
              <article key={item.title} className="py-10 md:pr-10">
                <h2 className="font-display text-display-sm text-ink">
                  {item.title}
                </h2>
                <p className="text-base text-ink-2 mt-4 max-w-md">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Section>
      </PageEntrance>

      <Section tone="soft">
        <h2 className="font-display text-display-sm text-ink">
          {guarantees.label}
        </h2>

        <dl className="divide-rule border-rule mt-12 divide-y border-t">
          {guarantees.items.map((item) => (
            <div
              key={item.label}
              className="grid gap-3 py-8 md:grid-cols-12 md:gap-8"
            >
              <dt className="font-mono text-label text-accent uppercase md:col-span-3">
                {item.label}
              </dt>
              <dd className="text-base text-ink-2 md:col-span-9">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <CallToAction />
    </>
  );
}
