import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idea Fabrika",
  description:
    "Idea Fabrika is a community café and social space in Stoke Newington, bringing together food, culture and community.",
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
    card: "summary_large_image",
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
      <body>{children}</body>
    </html>
  );
}