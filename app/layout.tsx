import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://rotfall.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rotfall | Cooperative Survival Horror",
  description:
    "Survive the unimaginable in Rotfall. A 2-4 player open-world horror experience with dynamic anomalies, sanity mechanics, and brutal purges.",
  // 👇 ADD THE ICONS FIELD HERE
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Rotfall",
    "survival horror",
    "co-op horror game",
    "open world horror",
    "2-4 player co-op",
    "indie horror game",
    "procedural horror",
    "sanity mechanics",
    "Rotfall game",
  ],
  openGraph: {
    title: "Rotfall | Cooperative Survival Horror",
    description:
      "Pre-Alpha v0.4.2 | Cooperative Survival Horror – Scavenge, Reinforce, Endure.",
    url: siteUrl,
    siteName: "Rotfall",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotfall",
    description:
      "Survive the unimaginable. A 2-4 player open-world cooperative horror experience.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // google: "YOUR_VERIFICATION_CODE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Rotfall",
  description:
    "A 2-4 player open-world cooperative survival horror experience with dynamic anomalies, sanity mechanics, and brutal purges.",
  url: siteUrl,
  applicationCategory: "Game",
  operatingSystem: "Windows",
  author: {
    "@type": "Organization",
    name: "Rotfall Development",
  },
  genre: ["Survival Horror", "Co-op", "Open World"],
  gamePlatform: "Windows",
  numberOfPlayers: {
    "@type": "QuantitativeValue",
    minValue: 2,
    maxValue: 4,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
