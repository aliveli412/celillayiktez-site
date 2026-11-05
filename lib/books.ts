import { books, type Book } from "@/lib/site";
import { resolveIpagesPdfFromPage } from "@/lib/magazines";
import { uploadsProxyPath, uploadsPublicPath } from "@/lib/wp-fetch";

export function bookSlugFromHref(href: string): string {
  try {
    const path = new URL(href).pathname.replace(/\/+$/, "");
    const base = path.split("/").filter(Boolean).pop() || "";
    return base.replace(/\.html?$/i, "");
  } catch {
    return href;
  }
}

export function findBookBySlug(slug: string): Book | undefined {
  return books.find((b) => bookSlugFromHref(b.href) === slug);
}

export type ResolvedBookMedia = {
  pdfUrl: string | null;
  pdfProxyUrl: string | null;
};

export async function resolveBookMedia(book: Book): Promise<ResolvedBookMedia> {
  let pdfUrl: string | null = book.pdf || null;

  if (!pdfUrl) {
    pdfUrl = await resolveIpagesPdfFromPage(book.href);
  }

  return {
    pdfUrl,
    pdfProxyUrl: pdfUrl ? uploadsPublicPath(pdfUrl) || uploadsProxyPath(pdfUrl) : null,
  };
}
