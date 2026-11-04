import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bizimle paylaş",
  description: "Arşive katkı",
};

export default function BizimlePaylasPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Celil Layiktez arşiv katkısı")}`;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
        Katkı
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Bizimle paylaş</h1>
      <div className="ember-rule mt-6" />
      <p className="mt-8 text-base leading-8 text-[color:var(--ink-soft)]">
        Pek Muh. Celil Layiktez Üstadımızın resimleri ve makalelerini toplayarak uygun olabilecekleri
        bu siteden paylaşmak istiyoruz. Elinizde uygun materyal varsa yardımcı olur musunuz?
      </p>
      <p className="mt-5 text-base leading-8 text-[color:var(--ink-soft)]">
        10MB üzeri dosyalar için WeTransfer ile{" "}
        <a href={`mailto:${site.email}`} className="font-semibold text-[color:var(--ember)]">
          {site.email}
        </a>
        ’a gönderebilirsiniz.
      </p>
      <a
        href={mailto}
        className="mt-10 inline-flex bg-[color:var(--ember)] px-7 py-3 text-sm font-semibold text-white hover:bg-[color:var(--ember-deep)]"
      >
        E-posta ile gönder
      </a>
    </div>
  );
}
