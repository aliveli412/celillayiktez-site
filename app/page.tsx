import Link from "next/link";
import { archives, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-[color:var(--header)] text-white">
        <div
          className="motion-hero-media absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${site.heroPanelKimdir})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-[color:var(--brand)]/35" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:pb-24">
          <p className="motion-fade-up text-sm font-bold uppercase tracking-[0.35em] text-white/75">
            Celil Layiktez
          </p>
          <h1 className="motion-fade-up-delay mt-4 max-w-4xl font-display text-4xl leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
            Pek Muh. Celil Layiktez
          </h1>
          <p className="motion-fade-up-delay-2 mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
            {site.homeLead}
          </p>
          <p className="motion-fade-up-delay-2 mt-3 text-sm tracking-[0.12em] text-white/55">{site.dates}</p>
          <div className="motion-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
            <Link
              href="/hakkinda"
              className="bg-[color:var(--brand)] px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[color:var(--brand-deep)]"
            >
              Hakkında
            </Link>
            <Link
              href="/kitaplar"
              className="border border-white/70 px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
            >
              Online Kitaplar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="overflow-hidden border border-[color:var(--line)] bg-[color:var(--paper-soft)]">
            <img
              src={site.portraitSrc}
              alt="Pek Muh. Celil Layiktez"
              className="mx-auto h-auto max-h-[520px] w-full object-contain object-top"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Hakkında</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              Pek. Muh. Celil Layiktez K∴ hakkında
            </h2>
            <div className="brand-rule mt-5 w-40" />
            <p className="mt-6 text-base leading-8 text-[color:var(--ink-soft)] md:text-lg">{site.homeIntro}</p>
            <Link
              href="/hakkinda"
              className="mt-8 inline-flex text-sm font-bold uppercase tracking-[0.16em] text-[color:var(--brand)] hover:text-[color:var(--brand-deep)]"
            >
              Devamı için tıkla →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--paper-band)] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Hakkında",
              text: "Yaşamöyküsü, eğitim, iş yaşamı ve masonik çalışmalar.",
              href: "/hakkinda",
            },
            {
              n: "02",
              title: "Online Kitaplar",
              text: "Yayınlanmış kitapların dijital sürümleri (WordPress yüklemeleri).",
              href: "/kitaplar",
            },
            {
              n: "03",
              title: "Makaleler",
              text: "Mimar Sinan, Tesviye ve uluslararası yayınlardaki yazılar.",
              href: "/makaleler",
            },
          ].map((card) => (
            <Link
              key={card.n}
              href={card.href}
              className="group border border-[color:var(--line)] bg-white p-8 transition hover:border-[color:var(--brand)]"
            >
              <div className="text-xs font-bold tracking-[0.25em] text-[color:var(--brand)]">{card.n}</div>
              <h3 className="mt-4 font-display text-2xl group-hover:text-[color:var(--brand)]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-soft)]">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${site.heroPanelKitaplar})` }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Yayınlar</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Kitaplar ve dergi arşivleri</h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--ink-soft)]">
              Kitap kapakları ve dergi PDF’leri eski WordPress yüklemelerinde kalır; buradan güvenli
              bağlantılarla açılır.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archives.map((archive) => (
              <Link
                key={archive.slug}
                href={`/arsivler/${archive.slug}`}
                className="border border-[color:var(--line)] bg-white/90 px-5 py-4 transition hover:border-[color:var(--brand)]"
              >
                <div className="font-display text-lg">{archive.title}</div>
                {archive.years ? (
                  <div className="mt-1 text-xs tracking-wide text-[color:var(--ink-soft)]">{archive.years}</div>
                ) : null}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/kitaplar"
              className="bg-[color:var(--brand)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[color:var(--brand-deep)]"
            >
              Kitaplara git
            </Link>
            <Link
              href="/arsivler"
              className="border border-[color:var(--ink)]/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:border-[color:var(--brand)]"
            >
              Tüm arşivler
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
