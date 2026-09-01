import { home } from "@/content/home";
import { pages } from "@/content/pages";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = pages.home.metaTitle;

export default function Image() {
  return renderOgImage({
    eyebrow: home.hero.eyebrow,
    title: home.hero.title,
  });
}
