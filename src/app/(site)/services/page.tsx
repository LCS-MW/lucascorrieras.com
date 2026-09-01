import { CallToAction } from "@/components/sections/CallToAction";
import { DemoSites } from "@/components/sections/DemoSites";
import { Method } from "@/components/sections/Method";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageEntrance } from "@/components/motion/PageEntrance";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { pages } from "@/content/pages";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { servicesSchema } from "@/lib/structured-data";

import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(pages.services, "/services");

export default function ServicesPage() {
  return (
    <>
      <PageEntrance name="services">
        <Section>
          <div className="flex items-center gap-5">
            <span
              data-enter="label"
              className="font-mono text-label text-accent uppercase"
            >
              {pages.services.kicker}
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
            {pages.services.h1}
          </h1>
          <p data-enter="lead" className="text-xl text-ink-2 mt-8 max-w-xl">
            {pages.services.lead}
          </p>

          <div
            data-enter="body"
            className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8"
          >
            {services.items.map((service) => (
              <ServiceCard key={service.slug} service={service} as="h2" />
            ))}
          </div>

          <p
            data-enter="body"
            className="border-accent text-base text-ink-2 mt-12 max-w-xl border-l pl-5"
          >
            {services.floorNote}
          </p>
        </Section>
      </PageEntrance>

      <DemoSites tone="soft" as="h2" />

      <Method tone="soft" />
      <CallToAction />

      <JsonLd data={servicesSchema()} />
    </>
  );
}
