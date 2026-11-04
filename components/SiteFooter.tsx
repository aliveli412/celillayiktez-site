import Link from "next/link";
import { navItems, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-[color:var(--ink)] text-[color:var(--paper)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div>
          <div className="font-display text-3xl tracking-tight">{site.name}</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
            Türkiye’de Masonluk tarihi araştırmalarının bellek mekânı. Kitap ve dergi dosyaları mevcut
            WordPress yüklemelerinde kalır; bu arayüz onları düzenli yollarla açar.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ember)]">
              Gezinti
            </div>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ember)]">
              İletişim
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <a href={`mailto:${site.email}`} className="block hover:text-white">
                {site.email}
              </a>
              <a href={site.facebook} target="_blank" rel="noreferrer" className="block hover:text-white">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/40 md:px-8">
        {site.dates}
      </div>
    </footer>
  );
}
