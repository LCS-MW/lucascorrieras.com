import { Approach } from "@/components/sections/Approach";
import { CallToAction } from "@/components/sections/CallToAction";
import { Guarantees } from "@/components/sections/Guarantees";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(pages.home, "/", {
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Guarantees />
      <Services />
      <Showcase />
      <Method />
      <Approach />
      <CallToAction />
    </>
  );
}
