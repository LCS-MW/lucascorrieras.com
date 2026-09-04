import Image from "next/image";

import { Scene } from "@/components/motion/Scene";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { carteRestaurant } from "@/content/case-studies";

const HEADING_ID = "eclate-titre";
const { explode, pieces } = carteRestaurant;

/**
 * Position finale de chaque pièce, en centièmes de la largeur de la scène.
 *
 * `angle` est bien atan2(dy, dx) : 34,51° pour le vecteur (32, 22).
 *
 * `len` en revanche n'est PAS √(dx² + dy²), qui vaudrait 38,83. La ligne de
 * rappel s'arrête volontairement à 30, soit huit unités avant le centre de la
 * pièce, pour ne pas passer dessous. Ne pas la « corriger » à 38,83 en croyant
 * réparer une erreur de calcul.
 *
 * `start` est le rayon où la ligne commence : 18 unités, soit le bord de la
 * machine une fois qu'elle a reculé. En deçà elle serait cachée derrière elle
 * de toute façon, la machine ayant un fond opaque.
 *
 * Les valeurs sont écrites plutôt que calculées au rendu : elles ne changent
 * jamais, et une trigonométrie exécutée dans un composant serveur rendrait la
 * même chose à chaque requête.
 */
const GEOMETRY: Record<
  string,
  { dx: number; dy: number; len: number; angle: string; start: number }
> = {
  ecran: { dx: -32, dy: -22, len: 30, angle: "-145.49deg", start: 18 },
  carte: { dx: 32, dy: -22, len: 30, angle: "-34.51deg", start: 18 },
  api: { dx: -32, dy: 22, len: 30, angle: "145.49deg", start: 18 },
  gestion: { dx: 32, dy: 22, len: 30, angle: "34.51deg", start: 18 },
};

/**
 * Les pièces réellement plaçables. Ajouter une entrée à `pieces` sans lui
 * donner de géométrie ne doit pas faire tomber la page : `GEOMETRY[id]`
 * rendrait `undefined`, et lire `.len` dessus casse le rendu serveur, donc la
 * route entière, sans que TypeScript n'ait rien à redire sur un `id: string`.
 * La pièce est simplement absente du schéma ; son bloc d'étude, lui, reste.
 */
const PLACEES = pieces.filter((piece) => piece.id in GEOMETRY);

/** Barre de maquette, comme dans la section « maquette → site ». */
function Bar({ className }: { className: string }) {
  return <span className={`bg-ink-2/30 block ${className}`} />;
}

/**
 * Visuel d'une pièce dans la scène. Volontairement muet pour l'API et la
 * gestion : à 22 % de la largeur de la scène, du texte y serait illisible, et
 * une vignette illisible est une décoration. Le contenu réel est dans les
 * blocs d'étude, en dessous.
 */
function PieceVisual({ id }: { id: string }) {
  if (id === "ecran") {
    return (
      <Image
        src="/demonstrations/ecran-accueil.avif"
        alt=""
        width={1280}
        height={800}
        sizes="(min-width: 64rem) 226px, 22vw"
        className="block h-full w-full object-cover object-top"
      />
    );
  }

  if (id === "carte") {
    return (
      <Image
        src="/demonstrations/ecran-carte.avif"
        alt=""
        width={960}
        height={600}
        sizes="(min-width: 64rem) 226px, 22vw"
        className="block h-full w-full object-cover object-top"
      />
    );
  }

  if (id === "api") {
    // Quatre lignes de longueur décroissante : la silhouette d'un objet JSON,
    // sans prétendre qu'on puisse le lire.
    return (
      <div className="flex h-full flex-col justify-center gap-2 p-4">
        <span className="bg-accent/70 block h-1.5 w-3/5" />
        <span className="bg-accent/70 block h-1.5 w-4/5" />
        <span className="bg-accent/70 block h-1.5 w-2/5" />
        <span className="bg-accent/70 block h-1.5 w-3/4" />
      </div>
    );
  }

  // Gestion : une barre d'en-tête et trois lignes de tableau.
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <Bar className="h-2 w-1/2" />
      <span className="bg-rule mt-1 block h-px w-full" />
      <Bar className="h-1.5 w-full" />
      <Bar className="h-1.5 w-full" />
      <Bar className="h-1.5 w-3/4" />
    </div>
  );
}

/**
 * La page démontée : un portable au trait, la carte du restaurant dedans, et
 * quatre pièces qui s'en détachent au défilement.
 *
 * La scène entière est retirée de l'arbre d'accessibilité. Ce n'est pas une
 * négligence : chaque pièce est reprise en dessous, en texte réel, dans son
 * bloc d'étude. La laisser lisible ferait annoncer deux fois le même contenu,
 * une fois sous forme de diagramme muet. Le paragraphe `sr-only` dit ce que
 * la scène montre, ce qui est tout ce qu'elle apporte.
 *
 * Sous 48 rem la scène n'est pas affichée du tout : les blocs d'étude
 * suffisent, et ils sont mieux faits pour le pouce.
 */
export function ExplodedView() {
  return (
    <Scene name="eclat">
      <Section labelledBy={HEADING_ID}>
        <SectionHeading id={HEADING_ID} {...explode.intro} />

        {/* Le paragraphe décrit la scène sans promettre les quatre pièces :
            sous 48 rem elles ne sont pas rendues, seul le portable l'est. Il
            renvoie donc à la section suivante, qui les porte toutes, à toutes
            les largeurs. */}
        <p className="sr-only">
          {explode.description} {explode.screen.alt}
        </p>

        <div data-eclat className="mt-16">
          <div data-eclat-piste>
            <div data-eclat-stage aria-hidden="true">
              {/* Les lignes de rappel, sous la machine. */}
              {PLACEES.map((piece) => {
                const geo = GEOMETRY[piece.id as keyof typeof GEOMETRY];
                return (
                  <span
                    key={piece.id}
                    data-eclat-leader
                    style={
                      {
                        "--len": geo.len,
                        "--start": geo.start,
                        "--angle": geo.angle,
                      } as React.CSSProperties
                    }
                  />
                );
              })}

              {/* ---- La machine ------------------------------------------ */}
              <div data-eclat-machine>
                <div data-eclat-screen>
                  <Image
                    src="/demonstrations/ecran-accueil.avif"
                    alt=""
                    width={1280}
                    height={800}
                    sizes="(min-width: 64rem) 410px, 40vw"
                    className="block h-full w-full object-cover object-top"
                  />
                </div>
                <div data-eclat-base />
              </div>

              {/* ---- Les pièces ------------------------------------------ */}
              {PLACEES.map((piece) => {
                const geo = GEOMETRY[piece.id as keyof typeof GEOMETRY];
                return (
                  <div
                    key={piece.id}
                    data-eclat-piece
                    style={
                      { "--dx": geo.dx, "--dy": geo.dy } as React.CSSProperties
                    }
                  >
                    <div>
                      <span className="font-mono text-label text-accent mb-2 flex justify-between gap-3 uppercase">
                        <span>{piece.label}</span>
                        <span className="text-ink-2">{piece.cote}</span>
                      </span>
                      <span className="border-rule bg-paper block aspect-[16/10] overflow-hidden border">
                        <PieceVisual id={piece.id} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </Scene>
  );
}
