import { notFound } from "next/navigation";

import { features } from "@/content/features";
import { findProject, projects } from "@/content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Réalisation";

export function generateStaticParams() {
  if (!features.realisations) return [];
  return projects.items.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = features.realisations ? findProject(slug) : undefined;

  if (!project) notFound();

  return renderOgImage({
    eyebrow: `${project.trade} · ${project.status}`,
    title: project.name,
    note: project.summary.slice(0, 90),
  });
}
