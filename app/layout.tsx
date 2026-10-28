import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
