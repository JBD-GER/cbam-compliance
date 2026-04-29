import type { Metadata } from "next";

export const siteUrl = "https://www.cbam-compliance.de";
export const siteName = "CBAM Compliance";
export const defaultDescription =
  "Wir prüfen Importdaten, identifizieren CBAM-relevante Waren und bereiten Unternehmen strukturiert auf Registrierung, Lieferantendaten und laufende CBAM-Pflichten vor.";
export const defaultOgImage = "/images/import_hamburg.jpg";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createSeoMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  type = "website",
  publishedTime,
  modifiedTime
}: SeoInput): Metadata {
  const url = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "de_DE",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName}: ${title}`
        }
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/images/Logo.png`,
  description: defaultDescription,
  sameAs: []
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "de-DE",
  description: defaultDescription,
  potentialAction: {
    "@type": "ContactAction",
    target: `${siteUrl}/beratung`
  }
};
