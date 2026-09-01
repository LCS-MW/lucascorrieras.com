import { fromLabel } from "@/content/pricing";
import { services } from "@/content/services";

type Service = (typeof services.items)[number];

/**
 * Le filet de tête est un élément à part et non une bordure : il doit pouvoir
 * se tracer. Le corps est enfermé dans un masque pour monter derrière lui.
 *
 * Le niveau de titre dépend de la page : sous un `h2` de section sur
 * l'accueil, directement sous le `h1` sur `/services`.
 */
export function ServiceCard({
  service,
  as: Heading = "h3",
}: {
  service: Service;
  as?: "h2" | "h3";
}) {
  return (
    <article className="flex flex-col">
      <span
        aria-hidden="true"
        data-reveal="col-rule"
        className="bg-rule block h-px w-full origin-left"
      />

      <div className="mask-y flex flex-1 flex-col">
        <div data-reveal="col-body" className="flex flex-1 flex-col pt-8">
          <Heading className="font-display text-display-sm text-ink">
            {service.name}
          </Heading>

          <p className="text-lg text-ink mt-5">{service.summary}</p>
          <p className="text-base text-ink-2 mt-4">{service.body}</p>

          {/* La marge basse est sur la liste, pas sur le prix : le prix porte
              `mt-auto` pour se coller en bas de la carte, et cette marge-là
              tombe à zéro dès que le contenu remplit la colonne — ce qui est
              justement le cas de la plus haute des trois, celle qui fixe la
              hauteur de la rangée. Son filet se retrouvait alors contre la
              dernière ligne de la liste. Une marge fixe ici garantit l'écart
              quelle que soit la carte ; `mt-auto` ne fait plus qu'ajouter le
              reste de place disponible sur les deux autres. */}
          <ul className="mt-8 mb-10 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="text-sm text-ink-2 flex gap-3">
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="border-rule font-mono text-label text-accent mt-auto border-t pt-5 uppercase">
            {fromLabel(service.from)}
          </p>
        </div>
      </div>
    </article>
  );
}
