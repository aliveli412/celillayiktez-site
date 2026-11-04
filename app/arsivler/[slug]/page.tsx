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
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <Link href="/arsivler" className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">
        ← Dergi Arşivleri
      </Link>
      <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">{archive.title}</h1>
      {archive.years ? (
        <p className="mt-3 text-sm font-semibold tracking-wide text-[color:var(--ink-soft)]">{archive.years}</p>
      ) : null}
      <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-soft)]">{archive.intro}</p>
      <p className="mt-3 text-sm text-[color:var(--ink-soft)]">
        Kaynak dizin:{" "}
        <a href={archive.wpIndex} target="_blank" rel="noreferrer" className="text-[color:var(--brand)] underline-offset-2 hover:underline">
          {archive.wpIndex.replace("https://", "")}
        </a>
      </p>
      <div className="brand-rule mt-6 w-36" />

      {archive.issues.length === 0 ? (
        <div className="mt-10 border border-[color:var(--line)] bg-[color:var(--paper-band)] p-8 text-sm leading-7 text-[color:var(--ink-soft)]">
          Bu bölümdeki belgeler WordPress yüklemelerinde tutulur. Erişim veya araştırma talepleri için{" "}
          <a href="mailto:info@celillayiktez.com" className="font-semibold text-[color:var(--brand)]">
            info@celillayiktez.com
          </a>{" "}
          adresine yazabilirsiniz. Tam liste için{" "}
          <a href={archive.wpIndex} target="_blank" rel="noreferrer" className="font-semibold text-[color:var(--brand)]">
            mevcut arşiv sayfasını
          </a>{" "}
          ziyaret edin.
        </div>
      ) : (
        <ul className="mt-10 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
          {archive.issues.map((issue) => (
            <li key={issue.href} className="mb-3 break-inside-avoid">
              <a
                href={issue.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm leading-6 text-[color:var(--ink)] underline-offset-2 hover:text-[color:var(--brand)] hover:underline"
              >
                {issue.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
