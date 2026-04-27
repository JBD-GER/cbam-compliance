import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { articles, formatArticleDate } from "@/lib/content";
import { getArticleImage } from "@/lib/articleImages";
import { createSeoMetadata, siteName, siteUrl } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  const image = getArticleImage(article);

  return createSeoMetadata({
    title: article.title,
    description: article.description,
    path: `/ratgeber/${article.slug}`,
    image: image.src,
    type: "article",
    publishedTime: `${article.date}T12:00:00.000Z`,
    modifiedTime: `${article.date}T12:00:00.000Z`
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const image = getArticleImage(article);
  const articleUrl = new URL(`/ratgeber/${article.slug}`, siteUrl).toString();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: new URL(image.src, siteUrl).toString(),
    datePublished: `${article.date}T12:00:00.000Z`,
    dateModified: `${article.date}T12:00:00.000Z`,
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/Logo.png`
      }
    },
    mainEntityOfPage: articleUrl,
    inLanguage: "de-DE"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Section className="pb-10">
        <article className="mx-auto max-w-3xl">
          <Link href="/ratgeber" className="text-sm font-semibold text-accent hover:text-[#35685b]">
            Zurück zum Ratgeber
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{article.readingTime} Lesezeit</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{article.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{article.intro}</p>
          <Image
            src={image.src}
            alt={image.alt}
            width={1920}
            height={1080}
            priority
            className="mt-10 aspect-[16/8] w-full rounded-[2rem] object-cover shadow-sm"
          />

          <div className="mt-12 space-y-10">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold text-navy">{section.title}</h2>
                <div className="mt-4 space-y-4 leading-8 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.image && (
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={1920}
                    height={1080}
                    className="mt-7 aspect-[16/8] w-full rounded-[1.5rem] object-cover shadow-sm"
                  />
                )}
                {section.links && section.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white/75 p-5">
                    {section.links.map((link) => (
                      <LinkButton key={link.href} href={link.href} variant="secondary">
                        {link.label}
                      </LinkButton>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {article.sources && article.sources.length > 0 && (
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white/75 p-6">
              <h2 className="text-lg font-semibold text-navy">Quellen und weiterführende Informationen</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a className="font-medium text-accent hover:text-[#35685b]" href={source.href} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Section>
      <CTASection title="Benötigen Sie eine strukturierte CBAM-Einschätzung?" text="Wir prüfen Datenlage, Lieferantenstruktur und sinnvolle nächste Schritte für Ihr Unternehmen." button="Kontakt aufnehmen" />
    </>
  );
}
