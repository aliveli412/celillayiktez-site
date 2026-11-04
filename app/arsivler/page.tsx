import type { Metadata } from "next";
import Link from "next/link";
import { archives } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dergi Arşivleri",
  description: "Büyük Şark, Türk Mason, Şakul Gibi, Tesviye, Mimar Sinan ve Fransız arşivleri",
};

export default function ArsivlerPage() {
  return (
    <div className="archive-haze min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Arşiv</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Dergi Arşivleri</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-soft)]">
          Dergi sayıları ve PDF dosyaları WordPress yüklemelerinde kalır. Bu sitedeki dizinler her
          sayıyı mevcut arşiv adresine bağlar.
        </p>
        <div className="brand-rule mt-6 w-36" />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {archives.map((archive) => (
            <Link
              key={archive.slug}
              href={`/arsivler/${archive.slug}`}
              className="border border-[color:var(--line)] bg-white p-8 transition hover:border-[color:var(--brand)]"
            >
              <div className="text-xs font-bold tracking-[0.2em] text-[color:var(--brand)]">
                {archive.years || "Arşiv"}
              </div>
              <h2 className="mt-3 font-display text-2xl">{archive.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">{archive.intro}</p>
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--ink)]">
                {archive.issues.length > 0 ? `${archive.issues.length} sayı →` : "Detay →"}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
