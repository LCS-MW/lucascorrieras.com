import { LegalText } from "@/components/sections/LegalText";
import { legalPages } from "@/content/legal-pages";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const page = legalPages.cgv;

export const metadata: Metadata = pageMetadata(page, "/cgv");

export default function CgvPage() {
  return <LegalText page={page} />;
}
