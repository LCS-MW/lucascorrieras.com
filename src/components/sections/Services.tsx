import { Scene } from "@/components/motion/Scene";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/content/services";

const HEADING_ID = "services-titre";

export function Services() {
  return (
    <Scene name="services">
      <Section id="services" labelledBy={HEADING_ID}>
        <SectionHeading id={HEADING_ID} {...services.intro} />

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {services.items.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <p className="border-accent text-base text-ink-2 mt-12 max-w-xl border-l pl-5">
          {services.floorNote}
        </p>
      </Section>
    </Scene>
  );
}
