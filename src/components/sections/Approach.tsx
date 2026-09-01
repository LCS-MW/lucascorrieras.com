import { Scene } from "@/components/motion/Scene";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approach } from "@/content/approach";

const HEADING_ID = "approche-titre";

/**
 * Le seul bloc saturé du site. Il arrive après une section claire et joue le
 * rôle d'une respiration : c'est ce qui lui donne sa force, et c'est pour ça
 * qu'il ne doit pas être imité ailleurs.
 *
 * Sur l'accent, le filet passe au papier translucide — l'accent à 20 % n'y
 * serait pas visible.
 */
export function Approach() {
  return (
    <Scene name="heading">
      <Section id="approche" labelledBy={HEADING_ID} tone="accent">
        <SectionHeading id={HEADING_ID} {...approach.intro} tone="dark" />

        <div className="border-paper/25 mt-16 grid gap-px border-t md:grid-cols-2">
          {approach.items.map((item) => (
            <article key={item.title} className="py-10 md:pr-10">
              <h3 className="font-display text-display-sm text-paper">
                {item.title}
              </h3>
              <p className="text-base text-paper mt-4 max-w-md">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </Scene>
  );
}
