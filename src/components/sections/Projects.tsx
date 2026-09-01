import { Scene } from "@/components/motion/Scene";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

import type { SectionTone } from "@/components/ui/Section";

const HEADING_ID = "realisations-titre";

export function Projects({ tone = "paper" }: { tone?: SectionTone }) {
  return (
    <Scene name="projects">
      <Section id="realisations" labelledBy={HEADING_ID} tone={tone}>
        <SectionHeading id={HEADING_ID} {...projects.intro} />

        <p
          data-reveal="notice"
          className="border-accent text-base text-ink-2 mt-8 max-w-lg border-l pl-5"
        >
          {projects.notice}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {projects.items.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </Section>
    </Scene>
  );
}
