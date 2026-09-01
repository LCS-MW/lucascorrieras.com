import Image from "next/image";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/motion/TransitionLink";

import { CallToAction } from "@/components/sections/CallToAction";
import { Button } from "@/components/ui/Button";
import { PageEntrance } from "@/components/motion/PageEntrance";
import { Section } from "@/components/ui/Section";
import { features } from "@/content/features";
import { pages } from "@/content/pages";
import { findProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { previewName } from "@/lib/transition-names";

import type { Metadata } from "next";

export function generateStaticParams() {
  // Liste vide quand la rubrique est éteinte : aucune fiche n'est
  // prérendue, et son image de partage n'est pas générée non plus.
  if (!features.realisations) return [];
  return projects.items.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return {};

  const path = `/realisations/${project.slug}`;

  return {
    title: `${project.name} — ${project.trade}`,
    description: project.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: site.locale,
      url: path,
      siteName: site.name,
      title: `${project.name} — ${project.trade}`,
      description: project.metaDescription,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const project = features.realisations ? findProject(slug) : undefined;

  if (!project) notFound();

  return (
    <>
      <PageEntrance name="project">
        <Section>
          {/* Point d'arrivée de l'aperçu cliqué dans la grille. Il porte le
              même nom de transition que la carte d'origine, il est donc rejoint
              par déplacement et redimensionnement, sans fondu.

              Pas de `data-enter` : la séquence d'entrée ne doit pas y toucher.
              Masqué puis révélé, il annulerait le morphing en montrant un
              élément transparent au moment de la capture. */}
          <div
            style={{ viewTransitionName: previewName(project.slug) }}
            className="vt-apercu border-rule bg-paper relative mb-14 aspect-[16/9] w-full overflow-hidden border"
          >
            <Image
              src={project.preview}
              alt={project.previewAlt}
              width={1600}
              height={1200}
              sizes="(min-width: 1280px) 1120px, 92vw"
              priority
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>

          <div className="flex items-center gap-4">
            <span data-enter="label" className="flex items-baseline gap-4">
              <TransitionLink
                href="/realisations"
                className="font-mono text-label text-ink-2 hover:text-accent inline-block py-2 uppercase transition-colors"
              >
                <span className="link-underline">{pages.work.h1}</span>
              </TransitionLink>
              <span
                aria-hidden="true"
                className="font-mono text-label text-rule"
              >
                /
              </span>
              <span className="font-mono text-label text-accent uppercase">
                {project.status}
              </span>
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
            {project.name}
          </h1>
          <p
            data-enter="body"
            className="font-mono text-label text-ink-2 mt-5 uppercase"
          >
            {project.trade} · {project.year}
          </p>

          <p data-enter="lead" className="text-xl text-ink-2 mt-10 max-w-xl">
            {project.intent}
          </p>

          <div data-enter="body" className="mt-10">
            <Button href={project.demo}>{projects.demoLabel}</Button>
          </div>

          <dl
            data-enter="body"
            className="border-rule mt-16 grid gap-8 border-t pt-8 sm:grid-cols-3"
          >
            {project.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="font-mono text-label text-ink-2 uppercase">
                  {spec.label}
                </dt>
                <dd className="text-sm text-ink mt-3">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </PageEntrance>

      <Section tone="soft">
        <h2 className="font-display text-display-sm text-ink">
          {project.problem.title}
        </h2>
        <p className="text-base text-ink-2 mt-6 max-w-2xl">
          {project.problem.body}
        </p>
      </Section>

      <Section>
        <h2 className="font-display text-display-sm text-ink">
          {projects.answersTitle}
        </h2>

        <ol className="divide-rule border-rule mt-12 divide-y border-t">
          {project.answers.map((answer, index) => (
            <li
              key={answer.title}
              className="grid items-center gap-4 py-10 md:grid-cols-12 md:gap-8"
            >
              <span className="font-mono text-label text-accent uppercase md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-display-sm text-ink md:col-span-4">
                {answer.title}
              </h3>
              <p className="text-base text-ink-2 md:col-span-7">
                {answer.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="border-accent text-base text-ink-2 mt-12 max-w-lg border-l pl-5">
          {projects.notice}
        </p>
      </Section>

      <CallToAction />
    </>
  );
}
