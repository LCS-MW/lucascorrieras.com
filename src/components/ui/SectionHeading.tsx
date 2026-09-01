import type { SectionIntro } from "@/content/types";

/**
 * `light` = fond clair. `dark` = fond profond ou accent : le titre passe au
 * papier, et la voix utilitaire à `accent-soft`, qui garde 6,5:1 sur l'accent
 * et 14,8:1 sur le fond profond — l'accent lui-même n'y tiendrait pas.
 */
type Tone = "light" | "dark";

type SectionHeadingProps = SectionIntro & {
  id: string;
  tone?: Tone;
};

const STYLE = {
  light: {
    index: "text-accent",
    rule: "bg-rule",
    title: "text-ink",
    note: "text-ink-2",
  },
  dark: {
    index: "text-accent-soft",
    rule: "bg-paper/25",
    title: "text-paper",
    note: "text-accent-soft",
  },
} as const;

/**
 * Le libellé mono paraît, son filet se trace, puis le titre monte ligne par
 * ligne. L'ordre est le même partout : c'est ce qui fait que les sections se
 * ressemblent sans se répéter.
 */
export function SectionHeading({
  id,
  index,
  title,
  note,
  tone = "light",
}: SectionHeadingProps) {
  const style = STYLE[tone];

  return (
    <div>
      <div className="flex items-center gap-5">
        <span
          data-reveal="label"
          className={`font-mono text-label uppercase ${style.index}`}
        >
          {index}
        </span>
        <span
          aria-hidden="true"
          data-reveal="rule"
          className={`h-px flex-1 origin-left ${style.rule}`}
        />
      </div>

      <h2
        id={id}
        data-reveal="title"
        className={`font-display text-display-sm mt-7 max-w-2xl ${style.title}`}
      >
        {title}
      </h2>

      <p className={`text-base mt-6 max-w-lg ${style.note}`} data-reveal="note">
        {note}
      </p>
    </div>
  );
}
