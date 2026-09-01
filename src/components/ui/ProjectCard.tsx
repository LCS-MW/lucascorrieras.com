import { TransitionLink } from "@/components/motion/TransitionLink";

import { ProjectPreview } from "@/components/ui/ProjectPreview";

import type { Project } from "@/content/projects";

/** Même raison que pour `ServiceCard` : le niveau dépend de la page. */
export function ProjectCard({
  project,
  as: Heading = "h3",
  priority = false,
}: {
  project: Project;
  as?: "h2" | "h3";
  priority?: boolean;
}) {
  return (
    <article data-magnetic>
      <TransitionLink href={`/realisations/${project.slug}`} className="block">
        <div className="mask-y">
          <div data-reveal="preview">
            <ProjectPreview
              src={project.preview}
              alt={project.previewAlt}
              slug={project.slug}
              priority={priority}
            />
          </div>
        </div>

        <div className="mask-y">
          <div data-reveal="card-body" className="pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-label text-ink-2 uppercase">
                {project.trade}
              </p>
              <p className="font-mono text-label text-accent uppercase">
                {project.status}
              </p>
            </div>

            <Heading className="font-display text-display-sm text-ink mt-5">
              <span className="link-underline">{project.name}</span>
            </Heading>

            <p className="text-base text-ink-2 mt-4">{project.summary}</p>
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
