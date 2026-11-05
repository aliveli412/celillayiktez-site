import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MagazineReader from "@/components/MagazineReader";
import { findIssue, getArchiveOrThrow, resolveIssueMedia } from "@/lib/magazines";
import { archives } from "@/lib/site";
import { uploadsProxyPath } from "@/lib/wp-fetch";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; issue: string }> };

export function generateStaticParams() {
  // Prefetch route shells; PDF resolve stays dynamic.
  return archives.flatMap((a) =>
    a.issues.slice(0, 0).map((issue) => ({ slug: a.slug, issue: issue.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, issue: issueSlug } = await params;
  try {
    const archive = getArchiveOrThrow(slug);
    const issue = findIssue(archive, issueSlug);
    if (!issue) return { title: "Dergi" };
    return { title: `${issue.title} · ${archive.title}` };
  } catch {
    return { title: "Dergi" };
  }
}

export default async function IssueReaderPage({ params }: Props) {
  const { slug, issue: issueSlug } = await params;
  let archive;
  try {
    archive = getArchiveOrThrow(slug);
  } catch {
    notFound();
  }
  const issue = findIssue(archive, issueSlug);
  if (!issue) notFound();

  const media = await resolveIssueMedia(issue);
  const cover = uploadsProxyPath(issue.cover) || issue.cover;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href={`/arsivler/${archive.slug}`}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ember)]"
          >
            ← {archive.title}
          </Link>
          <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">{issue.title}</h1>
          <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
            PDF WordPress yüklemelerinden okunur · kapak arşiv görseli
          </p>
        </div>
        <div className="hidden w-20 shrink-0 overflow-hidden rounded border border-[color:var(--line)] md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="" className="aspect-[2/3] w-full object-cover" />
        </div>
      </div>

      {media.pdfProxyUrl ? (
        <MagazineReader
          title={issue.title}
          pdfUrl={media.pdfProxyUrl}
          downloadUrl={media.pdfProxyUrl}
        />
      ) : (
        <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-10 text-center">
          <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
            Bu sayı için PDF bağlantısı şu an çözülemedi. Eski sitedeki okuyucuyu kullanabilirsiniz.
          </p>
          <a
            href={issue.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm font-semibold text-[color:var(--ember)]"
          >
            WordPress’te aç →
          </a>
        </div>
      )}
    </div>
  );
}
