import { features } from "@/content/features";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

import type { MetadataRoute } from "next";

/** Toutes les routes du site sont statiques : la liste peut être exhaustive. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...(features.realisations
      ? [{ path: "/realisations", priority: 0.8 }]
      : []),
    { path: "/approche", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    // Les pages légales sont indexables mais sans intérêt de classement :
    // priorité au plancher plutôt que `Disallow`, qui empêcherait le crawl
    // sans empêcher l'indexation.
    { path: "/mentions-legales", priority: 0.1 },
    { path: "/confidentialite", priority: 0.1 },
    { path: "/cgv", priority: 0.1 },
  ];

  return [
    ...staticPaths.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    // Les fiches projet ne sont listées que si la rubrique est allumée :
    // un plan du site qui déclare des adresses en 404 est une erreur
    // signalée telle quelle dans la Search Console.
    ...(features.realisations ? projects.items : []).map((project) => ({
      url: `${site.url}/realisations/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
