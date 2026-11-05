import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArchiveDownloadAll from "@/components/ArchiveDownloadAll";
import { archives, getArchive } from "@/lib/site";
import { uploadsProxyPath, uploadsPublicPath } from "@/lib/wp-fetch";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return archives.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const archive = getArchive(slug);
  if (!archive) return { title: "Arşiv" };
  return { title: archive.title, description: archive.intro };
}

export default async function ArchiveDetailPage({ params }: Props) {
  const { slug } = await params;
  const archive = getArchive(slug);
  if (!archive) notFound();

  const preview = archive.issues.slice(0, 5);
  const downloadable = archive.issues
    .map((issue) => {
      const proxy = issue.pdf
        ? uploadsPublicPath(issue.pdf) || uploadsProxyPath(issue.pdf)
        : null;
      if (!proxy) return null;
      return { slug: issue.slug, title: issue.title, pdfProxyUrl: proxy };
    })
    .filter((x): x is { slug: string; title: string; pdfProxyUrl: string } => Boolean(x));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[color:var(--line)] bg-[color:var(--ink)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              preview.length > 0
                ? `linear-gradient(120deg, rgba(16,20,26,0.92), rgba(16,20,26,0.55)), url(${preview[0].cover})`
                : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--ink)] via-[color:var(--ink)]/85 to-[color:var(--ink)]/40" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-end md:px-8 md:py-20">
          <div>
            <Link
              href="/arsivler"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ember)]"
            >
              ← Dergi Arşivleri
            </Link>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
              {archive.years || "Dijital arşiv"}
              {archive.issues.length > 0 ? ` · ${archive.issues.length} sayı` : ""}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              {archive.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/75">{archive.intro}</p>

            {downloadable.length > 0 ? (
              <ArchiveDownloadAll
                archiveTitle={archive.title}
                archiveSlug={archive.slug}
                issues={downloadable}
              />
            ) : null}
          </div>

          {preview.length > 0 ? (
            <div className="relative mx-auto flex h-56 w-full max-w-sm items-end justify-center md:h-72 md:max-w-none">
              {preview.map((issue, index) => {
                const cover = issue.coverThumb || issue.cover;
                const offset = index - Math.floor(preview.length / 2);
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={issue.slug}
                    src={cover}
                    alt=""
                    className="absolute bottom-0 aspect-[2/3] w-24 rounded-sm border border-white/20 object-cover shadow-[0_18px_40px_rgba(0,0,0,0.45)] md:w-28"
                    style={{
                      transform: `translateX(${offset * 42}px) rotate(${offset * 4}deg)`,
                      zIndex: 10 - Math.abs(offset),
                    }}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        {archive.issues.length === 0 ? (
          <div className="border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-sm leading-7 text-[color:var(--ink-soft)]">
            Belgeler WordPress yüklemelerinde. Talep için{" "}
            <a href="mailto:info@celillayiktez.com" className="font-semibold text-[color:var(--ember)]">
              info@celillayiktez.com
            </a>
            . Kaynak:{" "}
            <a
              href={archive.wpIndex}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[color:var(--ember)]"
            >
              eski arşiv sayfası
            </a>
            .
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
                  Sayılar
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight">Kapaklardan seçin</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[color:var(--ink-soft)]">
                Bir sayıya tıklayınca dahili okuyucuda açılır. Toplu indirme üstteki düğmeden.
              </p>
            </div>
            <div className="ember-rule mt-6" />

            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {archive.issues.map((issue) => {
                const cover = issue.coverThumb || issue.cover;
                return (
                  <Link
                    key={issue.slug}
                    href={`/arsivler/${archive.slug}/${issue.slug}`}
                    className="group"
                  >
                    <div className="overflow-hidden border border-[color:var(--line)] bg-white shadow-[0_8px_24px_rgba(16,20,26,0.05)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cover}
                        alt={issue.title}
                        className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-3 font-display text-base leading-snug tracking-tight group-hover:text-[color:var(--ember)] md:text-lg">
                      {issue.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
