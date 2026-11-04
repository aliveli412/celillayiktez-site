import type { Metadata } from "next";
import { books } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online Kitaplar",
  description: "Celil Layiktez’in yayınlanmış kitapları",
};

export default function KitaplarPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
        Yayınlar
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Online Kitaplar</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
        Kapaklar ve okuma dosyaları WordPress yüklemelerinde kalır. Oku bağlantıları oradaki sayfa veya
        PDF’ye gider.
      </p>
      <div className="ember-rule mt-6" />

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <article key={book.href} className="group">
            <a href={book.href} target="_blank" rel="noreferrer" className="block overflow-hidden bg-[color:var(--ink)]/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.cover}
                alt={book.title}
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </a>
            <div className="mt-4">
              {book.year ? (
                <div className="text-xs font-semibold tracking-[0.16em] text-[color:var(--ember)]">
                  {book.year}
                </div>
              ) : null}
              <h2 className="mt-2 font-display text-2xl leading-snug tracking-tight">{book.title}</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={book.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[color:var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[color:var(--ember)]"
                >
                  Oku
                </a>
                {book.pdf ? (
                  <a
                    href={book.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[color:var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:border-[color:var(--ember)]"
                  >
                    PDF
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
