import { IntroSequence } from "@/components/motion/IntroSequence";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { PageTransitions } from "@/components/motion/PageTransitions";
import { Scene } from "@/components/motion/Scene";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { nav } from "@/content/nav";
import { localBusinessSchema } from "@/lib/structured-data";

/**
 * Charrue du site principal. Le groupe de routes ne change aucune URL : il
 * sert uniquement à ce que les démos, hors du groupe, n'héritent de rien.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="bg-paper text-ink font-text">
      <a href={nav.skip.href} className="skip-link text-base font-medium">
        {nav.skip.label}
      </a>

      <PageTransitions />

      <LenisProvider>
        <IntroSequence>
          <Scene name="header">
            <SiteHeader />
          </Scene>
          <main id="contenu" className="min-h-svh">
            {children}
          </main>
          <SiteFooter />
        </IntroSequence>
      </LenisProvider>

      <JsonLd data={localBusinessSchema()} />
    </div>
  );
}
