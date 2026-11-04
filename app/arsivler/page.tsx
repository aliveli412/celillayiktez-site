import type { Metadata } from "next";
import Link from "next/link";
import { archives } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dergi Arşivleri",
  description: "Dergi arşivleri — PDF’ler WordPress yüklemelerinde",
};

export default function ArsivlerPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
        Arşiv
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Dergi Arşivleri</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
        Sayı listeleri burada; PDF ve kapak dosyaları eski WordPress uploads yollarında kalır.
      </p>
      <div className="ember-rule mt-6" />

      <div className="mt-14 space-y-4">
        {archives.map((archive, i) => (
          <Link
            key={archive.slug}
            href={`/arsivler/${archive.slug}`}
            className="group flex flex-col gap-3 border border-[color:var(--line)] bg-[color:var(--surface)]/80 px-6 py-7 transition hover:border-[color:var(--ember)] hover:bg-white md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-5">
              <span className="font-display text-3xl text-[color:var(--ember)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-3xl tracking-tight group-hover:text-[color:var(--ember)]">
                  {archive.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--ink-soft)]">
                  {archive.intro}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-sm text-[color:var(--ink-soft)] md:text-right">
              {archive.years || "Arşiv"}
              <div className="mt-1 font-semibold text-[color:var(--ink)]">
                {archive.issues.length > 0 ? `${archive.issues.length} sayı →` : "Detay →"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
