import Image from "next/image";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { articles } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Ratgeber für Importeure",
  description:
    "CBAM-Ratgeber für Importeure: Artikel zu CBAM-Zertifikaten, Betroffenheitsanalyse, Readiness, Lieferantendaten, Registrierung und laufender Begleitung.",
  path: "/ratgeber",
  image: "/images/import_hamburg.jpg"
});

export default function GuidePage() {
  return (
    <>
      <Section
        eyebrow="Ratgeber"
        title="CBAM-Wissen für Importeure"
        text="Praxisnahe Einordnungen für Unternehmen, die CBAM strukturiert vorbereiten möchten. Der Fokus liegt auf Daten, Prozessen, Lieferantenkommunikation und organisatorischer Umsetzung."
      >
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/import_hamburg.jpg"
            alt="Containerschiff im Hafen als Kontext für CBAM-Ratgeber"
            width={1920}
            height={960}
            className="aspect-[16/6] w-full object-cover"
            priority
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>
      <CTASection
        title="Sie möchten CBAM nicht nur lesen, sondern strukturiert vorbereiten?"
        text="Wir prüfen Ihre Importdaten, identifizieren relevante Waren und schaffen eine belastbare Grundlage für nächste Schritte."
        button="Kontakt aufnehmen"
      />
    </>
  );
}
