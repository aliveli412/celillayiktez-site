import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Idea Fabrika",
    template: "%s | Idea Fabrika",
  },
  description:
    "Idea Fabrika is a community café and social space in Stoke Newington, bringing together food, culture and community.",
  applicationName: "Idea Fabrika",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Idea Fabrika",
    description:
      "Idea Fabrika is a community café and social space in Stoke Newington, bringing together food, culture and community.",
    url: "https://ideafabrika.co.uk",
    siteName: "Idea Fabrika",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Idea Fabrika",
    description:
      "Idea Fabrika is a community café and social space in Stoke Newington, bringing together food, culture and community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
