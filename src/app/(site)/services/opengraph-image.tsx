import { pages } from "@/content/pages";
import { services } from "@/content/services";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = pages.services.metaTitle;

export default function Image() {
  return renderOgImage({
    eyebrow: pages.services.metaTitle,
    title: pages.services.h1,
    note: services.items.map((service) => service.name).join(" · "),
  });
}
