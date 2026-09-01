import { contact } from "@/content/contact";
import { pages } from "@/content/pages";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = pages.contact.metaTitle;

export default function Image() {
  return renderOgImage({
    eyebrow: pages.contact.metaTitle,
    title: pages.contact.h1,
    // Une carte de partage se lit en une seconde : on y met de quoi
    // joindre, pas de quoi paraphraser la page.
    note: [contact.phone, contact.email].filter(Boolean).join("  ·  "),
  });
}
