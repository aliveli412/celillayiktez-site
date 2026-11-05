import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { archives, getArchive } from "@/lib/site";

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

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <Link
        href="/arsivler"
        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ember)]"
      >
        ← Dergi Arşivleri
      </Link>
      <h1 className="mt-5 font-display text-4xl tracking-tight md:text-6xl">{archive.title}</h1>
      {archive.years ? (
        <p className="mt-3 text-sm tracking-[0.08em] text-[color:var(--ink-soft)]">{archive.years}</p>
      ) : null}
      <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-soft)]">{archive.intro}</p>
      <p className="mt-3 text-sm text-[color:var(--ink-soft)]">
        Kapak ve PDF dosyaları WordPress yüklemelerinde kalır.
      </p>
      <div className="ember-rule mt-6" />

      {archive.issues.length === 0 ? (
        <div className="mt-10 border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-sm leading-7 text-[color:var(--ink-soft)]">
          Belgeler WordPress yüklemelerinde. Talep için{" "}
          <a href="mailto:info@celillayiktez.com" className="font-semibold text-[color:var(--ember)]">
            info@celillayiktez.com
          </a>
          . Kaynak:{" "}
          <a href={archive.wpIndex} target="_blank" rel="noreferrer" className="font-semibold text-[color:var(--ember)]">
            eski arşiv sayfası
          </a>
          .
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {archive.issues.map((issue) => {
            // Direct WP URL — avoids Hostinger rate-limits on /api/wp-media for many images
            const cover = issue.coverThumb || issue.cover;
            return (
              <Link
                key={issue.slug}
                href={`/arsivler/${archive.slug}/${issue.slug}`}
                className="group"
              >
                <div className="overflow-hidden rounded-lg border border-[color:var(--line)] bg-white shadow-[0_8px_24px_rgba(16,20,26,0.05)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover}
                    alt={issue.title}
                    className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <h2 className="mt-3 font-display text-base leading-snug tracking-tight group-hover:text-[color:var(--ember)] md:text-lg">
                  {issue.title}
                </h2>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
