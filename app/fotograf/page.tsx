import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fotoğraf Galerisi",
  description: "Celil Layiktez fotoğrafları",
};

export default function FotografPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
        Galeri
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Fotoğraflar</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
        Seçilmiş kareler. Daha fazla materyal için{" "}
        <a href="/bizimle-paylas" className="font-semibold text-[color:var(--ember)]">
          Bizimle paylaş
        </a>
        .
      </p>
      <div className="ember-rule mt-6" />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {site.gallery.map((photo) => (
          <figure key={photo.src} className="overflow-hidden border border-[color:var(--line)] bg-[color:var(--surface)]">
            <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover object-top" />
            <figcaption className="px-5 py-4 text-sm text-[color:var(--ink-soft)]">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
