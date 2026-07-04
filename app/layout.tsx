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

export const metadata: Metadata = {
  title: 'Rotfall | Cooperative Survival Horror',
  description: 'Survive the unimaginable in Rotfall. A 2-4 player open-world horror experience with dynamic anomalies, sanity mechanics, and brutal purges.',
  openGraph: {
    title: 'Rotfall',
    description: 'Pre-Alpha v0.4.2 | Cooperative Survival Horror',
    url: 'https://rotfall.game',
    siteName: 'Rotfall',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Rotfall Key Art' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Rotfall', description: 'Survive the unimaginable.' },
  robots: { index: true, follow: true },
}
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
