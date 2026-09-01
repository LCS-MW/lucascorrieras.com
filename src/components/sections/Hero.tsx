import { Button } from "@/components/ui/Button";
import { SelectionFrame } from "@/components/ui/SelectionFrame";
import { home } from "@/content/home";

export function Hero() {
  return (
    <section className="border-rule border-b px-6 pt-20 pb-24 md:px-12 md:pt-28 md:pb-40">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-label text-ink-2 uppercase">
          {home.hero.eyebrow}
        </p>

        <div className="mt-14 max-w-3xl">
          <SelectionFrame
            layer={home.hero.frame.layer}
            unit={home.hero.frame.unit}
          >
            <h1
              data-intro="title"
              data-intro-from="fade"
              className="font-display text-display-lg text-ink text-balance"
            >
              {home.hero.title}
            </h1>
          </SelectionFrame>
        </div>

        <p className="text-xl text-ink-2 mt-12 max-w-xl">{home.hero.lead}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={home.hero.actions.primary.href}>
            {home.hero.actions.primary.label}
          </Button>
          <Button href={home.hero.actions.secondary.href} variant="secondary">
            {home.hero.actions.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
