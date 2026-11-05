import type { Metadata } from "next";
import Link from "next/link";
import { archives } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dergi Arşivleri",
  description: "Dergi arşivleri — kapaklar ve PDF’ler WordPress yüklemelerinde",
};

export default function ArsivlerPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
        Arşiv
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Dergi Arşivleri</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
        Her derginin kapakları burada; sayıları açınca dahili okuyucuda PDF’ler WordPress
        yüklemelerinden gelir.
      </p>
      <div className="ember-rule mt-6" />

      <div className="mt-14 space-y-5">
        {archives.map((archive, i) => {
          const preview = archive.issues.slice(0, 4);
          return (
            <Link
              key={archive.slug}
              href={`/arsivler/${archive.slug}`}
              className="group block border border-[color:var(--line)] bg-[color:var(--surface)]/80 p-5 transition hover:border-[color:var(--ember)] hover:bg-white md:p-7"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
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
                    <div className="mt-3 text-sm font-semibold text-[color:var(--ink)]">
                      {archive.years || "Arşiv"}
                      {archive.issues.length > 0 ? ` · ${archive.issues.length} sayı →` : " →"}
                    </div>
                  </div>
                </div>
                {preview.length > 0 ? (
                  <div className="flex -space-x-3 self-start md:self-center">
                    {preview.map((issue) => {
                      const src = issue.coverThumb || issue.cover;
                      return (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={issue.slug}
                          src={src}
                          alt=""
                          className="h-20 w-14 rounded border border-white object-cover shadow md:h-24 md:w-16"
                          loading="lazy"
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
