import Link from "next/link";
import { navItems, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--paper-band)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <img src={site.logoDarkSrc} alt="Celil Layiktez" className="h-12 w-auto object-contain" />
          <p className="mt-4 max-w-md text-sm leading-7 text-[color:var(--ink-soft)]">
            Pek Muh. Celil Layiktez’in (1935–2020) yaşamı, yayınları ve dergi arşivleri. Kitap ve dergi
            dosyaları mevcut WordPress yüklemelerinde tutulur; bu site temiz yönlendirme ve okuma
            deneyimi sunar.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand)]">Sayfalar</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-[color:var(--ink)]">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-[color:var(--brand)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand)]">İletişim</h3>
            <div className="mt-4 space-y-2 text-sm text-[color:var(--ink-soft)]">
              <a href={`mailto:${site.email}`} className="block hover:text-[color:var(--brand)]">
                {site.email}
              </a>
              <a href={site.facebook} target="_blank" rel="noreferrer" className="block hover:text-[color:var(--brand)]">
                Facebook
              </a>
              <a href={site.twitter} target="_blank" rel="noreferrer" className="block hover:text-[color:var(--brand)]">
                X / Twitter
              </a>
              <a
                href={`${site.url}/wiki/index.php/Celil_Layiktez:Hakk%C4%B1nda`}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[color:var(--brand)]"
              >
                wiki
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--line)] px-6 py-5 text-center text-xs text-[color:var(--ink-soft)]">
        © {new Date().getFullYear()} {site.name} · {site.dates}
      </div>
    </footer>
  );
}
