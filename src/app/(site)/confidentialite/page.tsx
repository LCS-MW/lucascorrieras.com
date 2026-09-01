import { LegalText } from "@/components/sections/LegalText";
import { legalPages } from "@/content/legal-pages";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const page = legalPages.privacy;

export const metadata: Metadata = pageMetadata(page, "/confidentialite");

export default function ConfidentialitePage() {
  return <LegalText page={page} />;
}
