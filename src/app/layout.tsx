import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://barkar.ch"),
  title: {
    default: "Sergej Barkar | Tech Entrepreneur & Data Solutions Expert",
    template: "%s | Sergej Barkar",
  },
  description:
    "An innovative tech entrepreneur and visionary leader, driving global sustainability through cutting-edge data-centric solutions. Over 12 years of experience in technology and leadership.",
  keywords: [
    "Sergej Barkar",
    "Tech Entrepreneur",
    "Data Solutions",
    "Supply Chain",
    "Sustainability",
    "Blockchain",
    "Business Intelligence",
    "Cloud Architecture",
    "Data Engineering",
    "Zürich",
    "Switzerland",
  ],
  authors: [{ name: "Sergej Barkar" }],
  creator: "Sergej Barkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://barkar.ch",
    title: "Sergej Barkar | Tech Entrepreneur & Data Solutions Expert",
    description:
      "An innovative tech entrepreneur and visionary leader, driving global sustainability through cutting-edge data-centric solutions.",
    siteName: "Sergej Barkar CV",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Sergej Barkar CV Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergej Barkar | Tech Entrepreneur & Data Solutions Expert",
    description:
      "An innovative tech entrepreneur and visionary leader, driving global sustainability through cutting-edge data-centric solutions.",
    creator: "@sbarkar_",
    images: ["/preview.png"],
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
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <Script
        defer
        data-domain="barkar.ch"
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      <body>{children}</body>
    </html>
  );
}
