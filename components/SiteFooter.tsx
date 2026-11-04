import Link from "next/link";
import { navItems, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--header)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <img src={site.logoSrc} alt="Celil Layiktez" className="h-12 w-auto object-contain" />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            Pek Muh. Celil Layiktez’in (1935–2020) yaşamı, yayınları ve dergi arşivleri. Kitap ve dergi
            dosyaları mevcut WordPress yüklemelerinde tutulur; bu site temiz yönlendirme ve okuma
            deneyimi sunar.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand)]">Sayfalar</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/80">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand)]">İletişim</h3>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <a href={`mailto:${site.email}`} className="block hover:text-white">
                {site.email}
              </a>
              <a href={site.facebook} target="_blank" rel="noreferrer" className="block hover:text-white">
                Facebook
              </a>
              <a href={site.twitter} target="_blank" rel="noreferrer" className="block hover:text-white">
                X / Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.name} · {site.dates}
      </div>
    </footer>
  );
}
