import { TransitionLink } from "@/components/motion/TransitionLink";

import { ProjectPreview } from "@/components/ui/ProjectPreview";

import type { Project } from "@/content/projects";

/**
 * Même raison que pour `ServiceCard` : le niveau dépend de la page.
 *
 * `featured` sert au projet réellement livré, qui est seul dans son bloc. Dans
 * une grille de trois colonnes il occuperait un tiers de la largeur et
 * laisserait le reste vide, ce qui le ferait passer pour un reliquat plutôt
 * que pour la pièce principale. En vedette, l'aperçu prend deux tiers et le
 * texte se pose à côté, centré sur sa hauteur.
 */
export function ProjectCard({
  project,
  as: Heading = "h3",
  priority = false,
  featured = false,
}: {
  project: Project;
  as?: "h2" | "h3";
  priority?: boolean;
  featured?: boolean;
}) {
  return (
    <article data-magnetic>
      <TransitionLink
        href={`/realisations/${project.slug}`}
        className={
          featured ? "grid items-center gap-8 md:grid-cols-3" : "block"
        }
      >
        <div className={featured ? "mask-y md:col-span-2" : "mask-y"}>
          <div data-reveal="preview">
            <ProjectPreview
              src={project.preview}
              alt={project.previewAlt}
              slug={project.slug}
              priority={priority}
              wireframe={false}
              sizes={
                featured
                  ? "(min-width: 768px) 66vw, 92vw"
                  : "(min-width: 768px) 30vw, 92vw"
              }
            />
          </div>
        </div>

        <div className="mask-y">
          <div data-reveal="card-body" className={featured ? "" : "pt-6"}>
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
