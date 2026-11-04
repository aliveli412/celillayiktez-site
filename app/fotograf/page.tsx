import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fotoğraf Galerisi",
  description: "Pek Muh. Celil Layiktez fotoğrafları",
};

export default function FotografPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Galeri</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Fotoğraf Galerisi</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--ink-soft)]">
        Pek Muh. Celil Layiktez K∴ — seçilmiş fotoğraflar. Daha fazla görsel için katkılarınızı{" "}
        <a href="/bizimle-paylas" className="font-semibold text-[color:var(--brand)]">
          Bizimle paylaş
        </a>{" "}
        üzerinden iletebilirsiniz.
      </p>
      <div className="brand-rule mt-6 w-36" />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {site.gallery.map((photo) => (
          <figure key={photo.src} className="border border-[color:var(--line)] bg-[color:var(--paper-soft)]">
            <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover object-top md:aspect-[3/4]" />
            <figcaption className="border-t border-[color:var(--line)] bg-white px-5 py-4 text-sm text-[color:var(--ink-soft)]">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
        <figure className="border border-[color:var(--line)] bg-[color:var(--paper-soft)]">
          <img
            src={site.portraitSrc}
            alt="Celil Layiktez portre"
            className="aspect-[4/5] w-full object-contain object-top p-6 md:aspect-[3/4]"
          />
          <figcaption className="border-t border-[color:var(--line)] bg-white px-5 py-4 text-sm text-[color:var(--ink-soft)]">
            Portre
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
