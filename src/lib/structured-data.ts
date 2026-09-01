import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * Données structurées.
 *
 * `ProfessionalService` est un sous-type de `LocalBusiness` : il lui faut une
 * localité et un moyen de contact pour être éligible à un résultat enrichi.
 * Les deux sont désormais déclarés. `telephone` disparaît proprement si
 * `site.phone` repasse à `null`.
 */

const BUSINESS_ID = `${site.url}#business`;

/**
 * Le siège est un village de l'Aube ; le marché est Troyes et son
 * département. Déclarer les trois est exact et c'est le seul signal local
 * dont dispose le site : `Country: France` seul ne situe rien.
 */
const AREA_SERVED = [
  { "@type": "City", name: site.servedCity },
  { "@type": "AdministrativeArea", name: site.servedRegion },
  { "@type": "Country", name: "France" },
] as const;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    areaServed: AREA_SERVED,
    availableLanguage: { "@type": "Language", name: "Français" },
    founder: { "@type": "Person", name: site.name, jobTitle: site.role },
    knowsAbout: services.items.map((service) => service.name),

    // `priceRange` attend une fourchette symbolique — « €€ », « $$$ » — pas
    // une phrase. Il portait « Sur devis » depuis le passage au devis, ce qui
    // ne veut rien dire pour un moteur.
    priceRange: "€€",

    ...(site.phone ? { telephone: site.phone } : {}),

    // Reprend exactement l'adresse des mentions légales. Y déclarer Troyes
    // parce que c'est le marché visé contredirait le siège publié à deux
    // clics de là, et une incohérence de localité est précisément ce qu'un
    // moteur pénalise. Troyes est dans `areaServed`, à sa place.
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "FR",
    },
  };
}

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": services.items.map((service) => ({
      "@type": "Service",
      "@id": `${site.url}/services#${service.slug}`,
      name: service.name,
      serviceType: service.name,
      description: service.summary,
      areaServed: AREA_SERVED,
      provider: { "@id": BUSINESS_ID },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        ...(service.from === null
          ? {}
          : {
              price: service.from,
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: service.from,
                priceCurrency: "EUR",
                valueAddedTaxIncluded: false,
              },
            }),
      },
    })),
  };
}
