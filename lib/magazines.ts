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

async function pdfUrlFromIpagesConfig(itemId: string): Promise<string | null> {
  const configUrl = `https://www.celillayiktez.com/wp-content/uploads/ipages_flipbook/${itemId}/config.json`;
  const raw = await fetchWpText(configUrl);
  const data = JSON.parse(raw) as { pdfUrl?: string };
  return data.pdfUrl || null;
}

export async function resolveIssueMedia(issue: ArchiveIssue): Promise<ResolvedIssueMedia> {
  let pdfUrl: string | null = null;
  try {
    const html = await fetchWpText(issue.href);
    const itemId = html.match(/data-item-id="(\d+)"/i)?.[1];
    const jsonSrc = html.match(/data-json-src="([^"]+)"/i)?.[1];

    // Prefer on-disk iPages config — REST /item/{id} often 404s on this host.
    if (itemId) {
      try {
        pdfUrl = await pdfUrlFromIpagesConfig(itemId);
      } catch {
        pdfUrl = null;
      }
    }

    if (!pdfUrl && jsonSrc) {
      try {
        const raw = await fetchWpText(jsonSrc);
        const data = JSON.parse(raw) as { pdfUrl?: string };
        if (data.pdfUrl) pdfUrl = data.pdfUrl;
      } catch {
        /* keep null */
      }
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
