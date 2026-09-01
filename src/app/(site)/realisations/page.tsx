import { notFound } from "next/navigation";

import { CallToAction } from "@/components/sections/CallToAction";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PageEntrance } from "@/components/motion/PageEntrance";
import { Section } from "@/components/ui/Section";
import { features } from "@/content/features";
import { pages } from "@/content/pages";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(pages.work, "/realisations");

export default function WorkPage() {
  // 404 plutôt qu'une page vide ou une redirection : tant qu'il n'y a rien
  // à montrer, cette adresse n'existe pas. Une redirection laisserait un
  // chemin indexable, une page vide laisserait une promesse en attente.
  if (!features.realisations) notFound();

  return (
    <>
      <PageEntrance name="work">
        <Section>
          <div className="flex items-center gap-5">
            <span
              data-enter="label"
              className="font-mono text-label text-accent uppercase"
            >
              {pages.work.kicker}
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
            {pages.work.h1}
          </h1>
          <p data-enter="lead" className="text-xl text-ink-2 mt-8 max-w-xl">
            {pages.work.lead}
          </p>

          <p
            data-enter="body"
            className="border-accent text-base text-ink-2 mt-10 max-w-lg border-l pl-5"
          >
            {projects.notice}
          </p>

          <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
            {projects.items.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                as="h2"
                priority={index === 0}
              />
            ))}
          </div>
        </Section>
      </PageEntrance>

      <CallToAction />
    </>
  );
}
