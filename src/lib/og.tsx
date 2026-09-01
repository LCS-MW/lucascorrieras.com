import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/content/site";

/**
 * Générateur d'images Open Graph.
 *
 * Les images reprennent le vocabulaire du site — fond papier, filet d'accent,
 * cadre de sélection, étiquettes en mono — pour qu'un lien partagé ressemble
 * déjà au site avant même d'être ouvert.
 *
 * Satori ne connaît ni Tailwind ni les variables CSS : les valeurs des tokens
 * sont recopiées ici, en un seul endroit, et les polices sont lues sur le
 * disque au moment de la génération (build) plutôt que téléchargées.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const TOKEN = {
  paper: "#F2F3EF",
  ink: "#14171A",
  ink2: "#5C6360",
  rule: "#D7DAD2",
  accent: "#1B3BD4",
} as const;

const FONT_DIR = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [display, mono] = await Promise.all([
    readFile(join(FONT_DIR, "BricolageGrotesque-SemiBold.ttf")),
    readFile(join(FONT_DIR, "IBMPlexMono-Regular.ttf")),
  ]);

  return [
    {
      name: "Bricolage Grotesque",
      data: display,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "IBM Plex Mono",
      data: mono,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

/** Poignée d'angle du cadre de sélection. */
function Handle(style: {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: 14,
        height: 14,
        backgroundColor: TOKEN.paper,
        border: `2px solid ${TOKEN.accent}`,
        ...style,
      }}
    />
  );
}

type OgInput = {
  /** Étiquette en mono, en haut à gauche. */
  eyebrow: string;
  /** Titre, en display. Court : deux lignes maximum. */
  title: string;
  /** Phrase de bas d'image. Facultative. */
  note?: string;
};

export async function renderOgImage({ eyebrow, title, note }: OgInput) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: TOKEN.paper,
        fontFamily: "IBM Plex Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 21,
          letterSpacing: 3,
          color: TOKEN.ink2,
        }}
      >
        <div style={{ color: TOKEN.accent }}>{eyebrow.toUpperCase()}</div>
        <div>{site.domain.toUpperCase()}</div>
      </div>

      <div
        style={{
          display: "flex",
          position: "relative",
          paddingTop: 28,
          paddingBottom: 28,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: `2px solid ${TOKEN.accent}`,
          }}
        />
        {Handle({ top: -7, left: -7 })}
        {Handle({ top: -7, right: -7 })}
        {Handle({ bottom: -7, left: -7 })}
        {Handle({ bottom: -7, right: -7 })}

        <div
          style={{
            display: "flex",
            paddingLeft: 32,
            paddingRight: 32,
            fontFamily: "Bricolage Grotesque",
            fontSize: title.length > 44 ? 68 : 84,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            color: TOKEN.ink,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderTop: `2px solid ${TOKEN.rule}`,
          paddingTop: 26,
          fontSize: 21,
          letterSpacing: 3,
          color: TOKEN.ink2,
        }}
      >
        <div>{(note ?? site.role).toUpperCase()}</div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
