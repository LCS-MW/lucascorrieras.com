/**
 * Données structurées injectées dans le document.
 *
 * `<` est échappé : un chevron dans une chaîne de contenu fermerait la balise
 * script prématurément. C'est le seul risque réel ici, le JSON venant de nos
 * propres fichiers de contenu.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
