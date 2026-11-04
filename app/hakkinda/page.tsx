import type { Metadata } from "next";
import { hakkindaBlocks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkında",
  description: "Pek Muh. Üstadımız Celil Layiktez hakkında",
};

export default function HakkindaPage() {
  return (
    <div className="archive-haze">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[240px_1fr] lg:py-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28 overflow-hidden border border-[color:var(--line)] bg-white">
            <img src={site.portraitSrc} alt="Celil Layiktez" className="w-full object-cover object-top" />
          </div>
        </aside>
        <article className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Hakkında</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Pek Muh. Üstadımız Celil Layiktez Hakkında
          </h1>
          <div className="brand-rule mt-6 w-36" />
          <div className="mt-10 space-y-5 text-base leading-8 text-[color:var(--ink)]">
            {hakkindaBlocks.map((block, i) => {
              if (block.tag === "p" && block.text.length < 40 && !block.text.includes(".")) {
                return (
                  <h2 key={i} className="pt-4 font-display text-2xl text-[color:var(--brand-dark)]">
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-[color:var(--ink-soft)]">
                  {block.text}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
