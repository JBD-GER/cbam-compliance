import type { Metadata } from "next";
import { CostCalculator } from "@/components/CostCalculator";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Kostenrechner 2026",
  description:
    "CBAM-Kostenrechner 2026: Schätzen Sie mögliche CBAM-Zertifikatskosten nach CN-Code, Land, Nettomasse, SEE 2026, Benchmark und Zertifikatspreis.",
  path: "/cbam-kostenrechner",
  image: "/images/computer.jpg"
});

export default function CalculatorPage() {
  return (
    <>
      <Section
        eyebrow="CBAM-Kostenrechner"
        title="CBAM-Kostenrechner 2026"
        text="Berechnen Sie eine erste Orientierung für mögliche CBAM-Zertifikatskosten. Der Rechner arbeitet mit hinterlegten Daten zu CN-Codes, Ländern, Standardwerten und Benchmarks und ersetzt keine rechtliche, steuerliche oder zollrechtliche Bewertung."
      >
        <CostCalculator />
      </Section>

      <Section title="Methodik und Annahmen">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-navy">Berechnungslogik</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Die Schätzung folgt einer vereinfachten Orientierung: max(SEE 2026 - Benchmark, 0) x Nettomasse x Zertifikatskosten. Der Phase-Out wird im Rechner separat ausgewiesen.
            </p>
          </div>
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-navy">Zertifikatspreis</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Der voreingestellte Wert orientiert sich am veröffentlichten CBAM-Zertifikatspreis für Q1 2026. Die EU-Kommission veröffentlicht 2026 Quartalspreise und ab 2027 wöchentliche Preise.
            </p>
          </div>
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-navy">Datenqualität</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Entscheidend sind korrekte CN-Codes, Ursprungsländer, Nettomassen und belastbare Emissionswerte. Der Rechner ist eine Orientierung und keine finale fachliche Bewertung.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white/70 p-6 text-sm leading-7 text-slate-600">
          <p className="font-semibold text-navy">Quellenhinweise</p>
          <p className="mt-2">
            Die EU-Kommission erläutert, dass der CBAM-Zertifikatspreis an den durchschnittlichen Preis der EU-ETS-Zertifikate angelehnt ist, 2026 quartalsweise veröffentlicht wird und ab 2027 wöchentlich berechnet werden soll. Der Verkauf von CBAM-Zertifikaten erfolgt ab Februar 2027 über die gemeinsame zentrale Plattform.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="font-semibold text-accent hover:text-[#35685b]" href="https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en" target="_blank" rel="noreferrer">
              EU-Kommission: Price of CBAM certificates
            </a>
            <a className="font-semibold text-accent hover:text-[#35685b]" href="https://data.jrc.ec.europa.eu/collection/id-00269" target="_blank" rel="noreferrer">
              JRC Data Catalogue
            </a>
          </div>
        </div>
      </Section>

      <CTASection
        title="Benötigen Sie belastbare CBAM-Daten statt einer Schätzung?"
        text="Wir strukturieren Importdaten, Lieferanteninformationen und Emissionswerte, damit Ihr Unternehmen auf die nächsten CBAM-Schritte vorbereitet ist."
        button="CBAM-Daten prüfen lassen"
      />
    </>
  );
}
