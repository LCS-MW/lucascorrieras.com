import { features } from "@/content/features";
import { pages } from "@/content/pages";
import { projects } from "@/content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = pages.work.metaTitle;

/**
 * Aucune image quand la rubrique est éteinte. Sans ça, elle resterait
 * générée et servie à son adresse propre — une carte de partage qui
 * annonce trois réalisations, pour une page qui répond 404.
 */
export function generateImageMetadata() {
  if (!features.realisations) return [];
  return [{ id: "partage", size, contentType, alt }];
}

export default function Image() {
  return renderOgImage({
    eyebrow: pages.work.metaTitle,
    title: pages.work.h1,
    note: projects.items.map((project) => project.name).join(" · "),
  });
}
