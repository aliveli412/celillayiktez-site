import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bizimle paylaş",
  description: "Celil Layiktez arşivi için materyal paylaşımı",
};

export default function BizimlePaylasPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Celil Layiktez arşiv katkısı")}`;

  return (
    <div className="archive-haze min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Katkı</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Bizimle paylaş</h1>
        <div className="brand-rule mt-6 w-36" />
        <p className="mt-8 text-base leading-8 text-[color:var(--ink-soft)]">
          Pek Muh. Celil Layiktez Üstadımızın resimleri ve makalelerini toplayarak uygun olabilecekleri
          bu siteden Kardeşlerimizin paylaşımına açmak istiyoruz. Elinizde uygun olabileceğini
          düşündüğünüz materyal varsa bizimle paylaşarak yardımcı olur musunuz?
        </p>
        <p className="mt-5 text-base leading-8 text-[color:var(--ink-soft)]">
          Adınızı paylaşmak istemezseniz belirtmeniz yeterli. Göndereceğiniz dosyalardan herhangi
          birinin büyüklüğü 10MB’dan fazla ise lütfen{" "}
          <a href="https://wetransfer.com" target="_blank" rel="noreferrer" className="text-[color:var(--brand)]">
            WeTransfer
          </a>{" "}
          kullanarak dosyanızı{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-[color:var(--brand)]">
            {site.email}
          </a>
          ’a gönderiniz.
        </p>
        <a
          href={mailto}
          className="mt-10 inline-flex bg-[color:var(--brand)] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[color:var(--brand-deep)]"
        >
          E-posta ile gönder
        </a>
      </div>
    </div>
  );
}
