import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MagazineReader from "@/components/MagazineReader";
import { bookSlugFromHref, findBookBySlug, resolveBookMedia } from "@/lib/books";
import { books } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return books.map((b) => ({ slug: bookSlugFromHref(b.href) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = findBookBySlug(slug);
  return { title: book?.title || "Kitap" };
}

export default async function BookReaderPage({ params }: Props) {
  const { slug } = await params;
  const book = findBookBySlug(slug);
  if (!book) notFound();

  const media = await resolveBookMedia(book);
  const cover = book.coverWp || book.cover;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/kitaplar"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ember)]"
          >
            ← Online Kitaplar
          </Link>
          <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">{book.title}</h1>
          {book.year ? (
            <p className="mt-2 text-sm text-[color:var(--ink-soft)]">{book.year}</p>
          ) : (
            <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
              PDF WordPress yüklemelerinden okunur
            </p>
          )}
        </div>
        <div className="hidden w-20 shrink-0 overflow-hidden rounded border border-[color:var(--line)] md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="" className="aspect-[3/4] w-full object-cover" />
        </div>
      </div>

      {media.pdfProxyUrl ? (
        <MagazineReader
          title={book.title}
          pdfUrl={media.pdfProxyUrl}
          downloadUrl={media.pdfProxyUrl}
        />
      ) : (
        <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-10 text-center">
          <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
            Bu kitap için PDF bağlantısı şu an çözülemedi. Eski sitedeki okuyucuyu kullanabilirsiniz.
          </p>
          <a
            href={book.href}
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
