import { Scene } from "@/components/motion/Scene";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { built, projects } from "@/content/projects";

import type { SectionTone } from "@/components/ui/Section";

const HEADING_ID = "realisations-titre";

/**
 * Les sites réellement livrés, et rien d'autre.
 *
 * Les trois démonstrations sont ailleurs, auprès de l'offre : les poser ici
 * ferait passer trois exercices pour des clients, et affaiblirait le seul
 * projet qui en est un.
 */
export function Projects({ tone = "paper" }: { tone?: SectionTone }) {
  return (
    <Scene name="projects">
      <Section id="realisations" labelledBy={HEADING_ID} tone={tone}>
        <SectionHeading id={HEADING_ID} {...projects.intro} />

        <div className="mt-16">
          {built.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority
              featured
            />
          ))}
        </div>
      </Section>
    </Scene>
  );
}
