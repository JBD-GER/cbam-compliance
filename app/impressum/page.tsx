import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von CBAM-Compliance.de.",
  path: "/impressum",
  image: "/images/office.jpg"
});

export default function ImprintPage() {
  return (
    <Section eyebrow="Rechtliches" title="Impressum" text="Anbieterkennzeichnung und Kontaktangaben von CBAM-Compliance.de.">
      <div className="grid gap-6">
        <article className="glass space-y-8 p-6 leading-8 text-slate-600 sm:p-8">
          <div>
            <h2 className="text-xl font-semibold text-navy">Angaben gemäß § 5 TMG</h2>
            <div className="mt-3">
              <p className="font-semibold text-navy">Flaaq Holding GmbH</p>
              <p>Geschäftsführer: Christoph Pfad</p>
              <p>Großer Kamp 5a</p>
              <p>31633 Leese</p>
            </div>
            <p className="mt-4">
              Die Flaaq Holding GmbH ist im Handelsregister des Amtsgerichts Hannover unter der Nr. HRB 223594 eingetragen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Kontakt</h2>
            <div className="mt-3">
              <p>Telefon: 05761 8429666</p>
              <p>Telefax: 05761 84296661</p>
              <p>
                E-Mail:{" "}
                <a className="font-semibold text-accent hover:text-[#35685b]" href="mailto:info@cbam-compliance.de">
                  info@cbam-compliance.de
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Umsatzsteuer</h2>
            <p className="mt-3">Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE352217621</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Streitschlichtung</h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}
