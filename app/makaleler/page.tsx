import type { Metadata } from "next";
import { articles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Makaleler",
  description: "Celil Layiktez’in yayınlanmış makaleleri",
};

export default function MakalelerPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Yazılar</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Makaleler</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-soft)]">
        Pek Muh. Üstadımız Celil Layiktez’in yayınlanmış makaleleri. Tam metinler şimdilik mevcut
        WordPress sayfalarında açılır; dizin burada temiz ve kırılmayan bağlantılarla sunulur.
      </p>
      <div className="brand-rule mt-6 w-36" />

      <ol className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {articles.map((article, index) => (
          <li key={article.href}>
            <a
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline gap-4 py-4 transition hover:bg-[color:var(--paper-band)]"
            >
              <span className="w-10 shrink-0 text-xs font-bold tabular-nums text-[color:var(--brand)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg leading-snug text-[color:var(--ink)] group-hover:text-[color:var(--brand)] md:text-xl">
                {article.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
