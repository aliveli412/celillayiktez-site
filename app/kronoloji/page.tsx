import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yaşam Kronolojisi",
  description: "Pek Muh. Celil Layiktez — yaşam kronolojisi",
};

const milestones = [
  {
    year: "1935",
    title: "Doğum",
    text: "16 Mart 1935’te doğdu.",
  },
  {
    year: "1952",
    title: "Saint Michel Fransız Lisesi",
    text: "Saint Michel Fransız Lisesi’nden mezun oldu.",
  },
  {
    year: "1956",
    title: "Robert Kolej",
    text: "Robert Kolej’den (sonradan Boğaziçi Üniversitesi) Elektrik Mühendisi olarak mezun oldu.",
  },
  {
    year: "1964",
    title: "Tekris",
    text: "Müsavat Muhterem Locası’nda tekris edilerek nura kavuştu.",
  },
  {
    year: "1972",
    title: "Üstad-ı Muhterem",
    text: "Müsavat Locası’nın Üstad-ı Muhterem’i seçildi.",
  },
  {
    year: "1991–1998",
    title: "Büyük Görevliler Kurulu",
    text: "Büyük Görevliler Kurulu’nda hizmet etti; kariyerini Önceki Büyük Üstat Yardımcısı olarak noktaladı.",
  },
  {
    year: "1992–2013",
    title: "Tesviye",
    text: "HKEMBL resmi yayını Tesviye dergisinin yazıişleri müdürlüğünü yürüttü.",
  },
  {
    year: "1999–2003",
    title: "Türkiye’de Masonluk Tarihi",
    text: "Üç ciltlik Türkiye’de Masonluk Tarihi serisini yayımladı.",
  },
  {
    year: "2020",
    title: "Ebedi Maşrık",
    text: "29 Haziran 2020’de Ebedi Maşrık’a uğurlandı.",
  },
];

export default function KronolojiPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
        Kronoloji
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Yaşam Kronolojisi</h1>
      <div className="ember-rule mt-6" />

      <ol className="mt-12 space-y-0 border-l border-[color:var(--line)] pl-8">
        {milestones.map((item) => (
          <li key={item.year} className="relative pb-10 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full border-2 border-[color:var(--ember)] bg-[color:var(--surface)]"
            />
            <div className="text-xs font-semibold tracking-[0.18em] text-[color:var(--ember)]">
              {item.year}
            </div>
            <h2 className="mt-2 font-display text-2xl tracking-tight">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">{item.text}</p>
          </li>
        ))}
      </ol>

      <Link
        href="/hakkinda"
        className="mt-12 inline-flex text-sm font-semibold text-[color:var(--ember)] hover:text-[color:var(--ember-deep)]"
      >
        Tam yaşamöyküsü →
      </Link>
    </div>
  );
}
