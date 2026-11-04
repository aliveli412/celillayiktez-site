import type { Metadata } from "next";
import { hakkindaBlocks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkında",
  description: "Pek Muh. Celil Layiktez hakkında",
};

export default function HakkindaPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 overflow-hidden border border-[color:var(--line)] bg-[color:var(--surface)]">
          <img
            src={site.heroPortraitQuality}
            alt="Celil Layiktez"
            className="aspect-[3/4] w-full object-cover object-top"
          />
          <div className="p-4 text-xs leading-6 text-[color:var(--ink-soft)]">{site.dates}</div>
        </div>
      </aside>
      <article className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
          Yaşamöyküsü
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight md:text-6xl">
          Pek Muh. Celil Layiktez
        </h1>
        <div className="ember-rule mt-6" />
        <div className="mt-10 space-y-5">
          {hakkindaBlocks.map((block, i) => {
            const isHeading = block.tag === "p" && block.text.length < 40 && !block.text.includes(".");
            if (isHeading) {
              return (
                <h2 key={i} className="pt-6 font-display text-2xl text-[color:var(--ember-deep)] md:text-3xl">
                  {block.text}
                </h2>
              );
            }
            return (
              <p key={i} className="text-base leading-8 text-[color:var(--ink-soft)]">
                {block.text}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
