import articlesJson from "@/lib/content/articles.json";
import archivesJson from "@/lib/content/archives.json";
import booksJson from "@/lib/content/books.json";
import hakkindaJson from "@/lib/content/hakkinda.json";

export const WP_ORIGIN = "https://www.celillayiktez.com";

export const site = {
  name: "Celil Layiktez",
  tagline: "Araştırma · Arşiv · Anı",
  email: "info@celillayiktez.com",
  url: "https://www.celillayiktez.com",
  logoSrc: "/brand/Celil-Layiktez-Logox300x142.png",
  logoDarkSrc: "/brand/logo-dark-2x.png",
  logoMarkSrc: "/brand/logo-dark.png",
  portraitSrc: "/brand/Celil_Layiktez_MK.png",
  faviconSrc: "/brand/cropped-fav-270x270.png",
  heroPanelKimdir: "/brand/hero-banner.png",
  heroPanelKimdirOriginal: "/brand/Celil-Layiktez-Kimdir.png",
  heroPanelKitaplar: "/brand/Celil-Layiktez-Kitaplari.png",
  heroPortraitQuality: "/brand/hero-portrait-natural.jpg",
  gallery: [
    {
      src: "/brand/Pek-Muh.-Celil-Layiktez-K.miz-50.yil-onlugu-takdimi-A.jpg",
      alt: "Pek Muh. Celil Layiktez — 50. yıl önlüğü takdimi",
      caption: "50. yıl önlüğü takdimi",
    },
    {
      src: "/brand/Pek-Muh.-Celil-Layiktez-K.miz-50.yil-onlugu-takdimi-F.jpg",
      alt: "Pek Muh. Celil Layiktez — 50. yıl önlüğü",
      caption: "50. yıl önlüğü",
    },
  ],
  homeIntro:
    "1964 yılında 11 No.lu Müsavat Locasında tekris olmuş, 1972’de Locanın Üstad-ı Muhteremlik görevine seçilmiş, 1991’de Büyük Görevliler Kuruluna girmiş ve 1998 yılında Önceki Büyük Üstat Yardımcısı olarak Büyük Kurul kariyerini noktalamıştır. 1967’de kabul edildiği Mimar Sinan araştırma locasının dergisinde 43 makalesi yayınlanmıştır. 1991’den beri de Tesviye Dergisini çıkartmıştır.",
  homeLead:
    "Türkiye’de Masonluk Tarihi denilince tereddütsüz akla ilk gelen isimlerden biri. Araştırmaları, makaleleri ve kitapları bu sitede yaşatılır.",
  dates: "16 Mart 1935 — 29 Haziran 2020",
  facebook: "https://www.facebook.com/celil.layiktez",
  twitter: "https://twitter.com/celillayiktez",
};

export const navItems = [
  { label: "Hakkında", href: "/hakkinda" },
  { label: "Fotoğraf Galerisi", href: "/fotograf" },
  { label: "Makaleleri", href: "/makaleler" },
  { label: "Dergi Arşivleri", href: "/arsivler" },
  { label: "Online Kitapları", href: "/kitaplar" },
  { label: "Bizimle paylaş", href: "/bizimle-paylas" },
];

export type HakkindaBlock = { tag: string; text: string };
export type Book = {
  title: string;
  year: string;
  href: string;
  /** Proxied path under /api/wp-media — still sourced from WP uploads */
  cover: string;
  coverWp?: string;
  pdf?: string;
};
export type Article = { title: string; href: string; listPage: number };
export type ArchiveIssue = { title: string; href: string };
export type Archive = {
  slug: string;
  title: string;
  years: string;
  wpIndex: string;
  intro: string;
  issues: ArchiveIssue[];
};

export const hakkindaBlocks = hakkindaJson as HakkindaBlock[];
export const books = booksJson as Book[];
export const articles = articlesJson as Article[];
export const archives = archivesJson as Archive[];

export function getArchive(slug: string): Archive | undefined {
  return archives.find((a) => a.slug === slug);
}
