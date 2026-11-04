import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const body = Fira_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Celil Layiktez",
    template: "%s | Celil Layiktez",
  },
  description:
    "Pek Muh. Celil Layiktez’in yaşamı, kitapları, makaleleri ve dergi arşivleri — Türkiye’de Masonluk tarihi araştırmaları.",
  applicationName: "Celil Layiktez",
  icons: {
    icon: [{ url: site.faviconSrc, type: "image/png" }],
    apple: [{ url: site.faviconSrc, type: "image/png" }],
  },
  openGraph: {
    title: "Celil Layiktez",
    description:
      "Pek Muh. Celil Layiktez’in yaşamı, kitapları, makaleleri ve dergi arşivleri.",
    url: site.url,
    siteName: "Celil Layiktez",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${body.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
