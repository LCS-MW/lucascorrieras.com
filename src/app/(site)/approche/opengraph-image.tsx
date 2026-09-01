import { approach } from "@/content/approach";
import { pages } from "@/content/pages";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = pages.approach.metaTitle;

export default function Image() {
  return renderOgImage({
    eyebrow: pages.approach.metaTitle,
    title: pages.approach.h1,
    note: approach.items.map((item) => item.title).join(" · "),
  });
}
