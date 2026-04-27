import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { defaultDescription, defaultOgImage, organizationJsonLd, siteName, siteUrl, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: siteName,
  publisher: siteName,
  title: {
    default: "CBAM-Compliance für Importeure | cbam-compliance.de",
    template: "%s | CBAM Compliance"
  },
  description: defaultDescription,
  openGraph: {
    title: "CBAM-Compliance für Importeure",
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "CBAM Compliance für Importeure"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CBAM-Compliance für Importeure",
    description: defaultDescription,
    images: [defaultOgImage]
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
