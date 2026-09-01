import { Scene } from "@/components/motion/Scene";
import { guarantees } from "@/content/guarantees";

/**
 * Bandeau de garanties. Pas de titre de section : c'est une bande de faits,
 * posée juste sous le hero, qui se lit d'un coup d'œil. Les filets se tracent
 * en cascade, les items montent derrière eux.
 */
export function Guarantees() {
  return (
    <Scene name="guarantees">
      <section
        aria-label={guarantees.label}
        className="bg-accent-soft border-rule border-b px-6 py-16 md:px-12 md:py-20"
      >
        <ul className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {guarantees.items.map((item) => (
            <li key={item.label}>
              <span
                aria-hidden="true"
                data-reveal="col-rule"
                className="bg-rule block h-px w-full origin-left"
              />
              <div className="mask-y">
                <div data-reveal="col-body" className="pt-5">
                  <p className="font-mono text-label text-accent uppercase">
                    {item.label}
                  </p>
                  <p className="text-sm text-ink-2 mt-3">{item.value}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Scene>
  );
}
