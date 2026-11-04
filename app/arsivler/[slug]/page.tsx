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
        WP kaynak:{" "}
        <a
          href={archive.wpIndex}
          target="_blank"
          rel="noreferrer"
          className="text-[color:var(--ember)] underline-offset-2 hover:underline"
        >
          {archive.wpIndex.replace("https://", "")}
        </a>
      </p>
      <div className="ember-rule mt-6" />

      {archive.issues.length === 0 ? (
        <div className="mt-10 border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-sm leading-7 text-[color:var(--ink-soft)]">
          Belgeler WordPress yüklemelerinde. Talep için{" "}
          <a href="mailto:info@celillayiktez.com" className="font-semibold text-[color:var(--ember)]">
            info@celillayiktez.com
          </a>
          .
        </div>
      ) : (
        <ul className="mt-10 columns-1 gap-x-12 sm:columns-2 lg:columns-3">
          {archive.issues.map((issue) => (
            <li key={issue.href} className="mb-3 break-inside-avoid">
              <a
                href={issue.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm leading-6 text-[color:var(--ink)] underline-offset-2 hover:text-[color:var(--ember)] hover:underline"
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
