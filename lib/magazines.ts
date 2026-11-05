import { archives, type Archive, type ArchiveIssue } from "@/lib/site";
import { fetchWpText, uploadsProxyPath } from "@/lib/wp-fetch";

export function getArchiveOrThrow(slug: string): Archive {
  const archive = archives.find((a) => a.slug === slug);
  if (!archive) throw new Error("archive not found");
  return archive;
}

export function findIssue(archive: Archive, issueSlug: string): ArchiveIssue | undefined {
  return archive.issues.find((i) => i.slug === issueSlug);
}

export type ResolvedIssueMedia = {
  title: string;
  pdfUrl: string | null;
  pdfProxyUrl: string | null;
  coverProxyUrl: string | null;
  wpHref: string;
};

export async function resolveIssueMedia(issue: ArchiveIssue): Promise<ResolvedIssueMedia> {
  let pdfUrl: string | null = null;
  try {
    const html = await fetchWpText(issue.href);
    const jsonSrc = html.match(/data-json-src="([^"]+)"/i)?.[1];
    if (jsonSrc) {
      const raw = await fetchWpText(jsonSrc);
      const data = JSON.parse(raw) as { pdfUrl?: string; title?: string };
      if (data.pdfUrl) pdfUrl = data.pdfUrl;
    }
  } catch {
    pdfUrl = null;
  }

  return {
    title: issue.title,
    pdfUrl,
    pdfProxyUrl: pdfUrl ? uploadsProxyPath(pdfUrl) : null,
    coverProxyUrl: uploadsProxyPath(issue.coverThumb || issue.cover),
    wpHref: issue.href,
  };
}
