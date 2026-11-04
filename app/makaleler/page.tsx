import type { Metadata } from "next";
import { articles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Makaleler",
  description: "Celil Layiktez makaleleri",
};

export default function MakalelerPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
        Yazılar
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Makaleler</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
        Dizinde {articles.length} yazı var. Tam metinler şimdilik WordPress sayfalarında açılır.
      </p>
      <div className="ember-rule mt-6" />

      <ol className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {articles.map((article, index) => (
          <li key={article.href}>
            <a
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline gap-5 py-5 transition hover:bg-white/60"
            >
              <span className="w-8 shrink-0 text-xs tabular-nums text-[color:var(--ember)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl leading-snug tracking-tight group-hover:text-[color:var(--ember)] md:text-2xl">
                {article.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
