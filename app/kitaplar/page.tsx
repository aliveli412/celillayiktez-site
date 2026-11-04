import type { Metadata } from "next";
import { books } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online Kitaplar",
  description: "Pek Muh. Celil Layiktez Üstadımızın yayınlanmış kitapları",
};

export default function KitaplarPage() {
  return (
    <div className="archive-haze min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Yayınlar</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Online Kitaplar</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-soft)]">
          Pek Muh. Üstadımız Celil Layiktez’in yayınlanmış kitaplarına buradan ulaşabilirsiniz. Kapak
          görselleri ve okuma dosyaları WordPress yüklemelerinde kalır; bağlantılar oraya yönlendirir.
        </p>
        <div className="brand-rule mt-6 w-36" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article key={book.href} className="flex flex-col border border-[color:var(--line)] bg-white">
              <a href={book.href} target="_blank" rel="noreferrer" className="block overflow-hidden bg-[color:var(--paper-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.cover}
                  alt={book.title}
                  className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-[1.02]"
                />
              </a>
              <div className="flex flex-1 flex-col p-5">
                {book.year ? (
                  <div className="text-xs font-semibold tracking-wide text-[color:var(--brand)]">{book.year}</div>
                ) : null}
                <h2 className="mt-2 font-display text-xl leading-snug">{book.title}</h2>
                <div className="mt-auto flex flex-wrap gap-3 pt-5">
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[color:var(--brand)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[color:var(--brand-deep)]"
                  >
                    Oku
                  </a>
                  {book.pdf ? (
                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-[color:var(--line)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] hover:border-[color:var(--brand)]"
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
    </div>
  );
}
