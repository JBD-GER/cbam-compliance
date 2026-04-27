import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { caseStudies } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Fallstudien und Praxisnotizen",
  description:
    "CBAM-Fallstudien und Praxisnotizen: Importdaten analysieren, Berichte vorbereiten, Lieferantendaten strukturieren und Verifizierungen nachhalten.",
  path: "/fallstudien",
  image: "/images/compliance.jpg"
});

export default function CaseStudiesPage() {
  return (
    <>
      <Section
        eyebrow="Fallstudien"
        title="Praxisnotizen aus der CBAM-Vorbereitung"
        text="Die folgenden Beispiele zeigen typische Arbeitsschritte aus Projekten zur CBAM-Vorbereitung. Im Mittelpunkt stehen Analyse, Datenstruktur, Berichtserstellung und Lieferantenabstimmung. Die finale Verifizierung durch Händler oder Lieferanten sowie formale Abgaben erfolgen in den vorgesehenen regulatorischen Schritten."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <article key={study.slug} className="glass p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{study.sector}</p>
              <h2 className="mt-4 text-2xl font-semibold text-navy">{study.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{study.summary}</p>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white/70 p-5">
                <h3 className="font-semibold text-navy">Ausgangslage</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{study.situation}</p>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold text-navy">Vorgehen</h3>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                  {study.approach.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                <h3 className="font-semibold text-navy">Stand der Umsetzung</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{study.result}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Praxis-Tipps für Ihre CBAM-Vorbereitung">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Daten zuerst konsolidieren", "Importdaten, CN-Codes, Ursprungsländer und Lieferanten sollten in einer gemeinsamen Struktur zusammengeführt werden."],
            ["Berichte früh vorbereiten", "Berichtsvorlagen und Arbeitslisten helfen, Datenlücken sichtbar zu machen, bevor Fristen näher rücken."],
            ["Verifizierung nachhalten", "Offene Händler- und Lieferantenrückmeldungen brauchen Status, Frist und Verantwortlichkeit."],
            ["Keine Bewertung erzwingen", "Wo rechtliche, steuerliche oder zollrechtliche Fragen offen sind, sollten die Informationen gezielt für Fachberater aufbereitet werden."]
          ].map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h2 className="text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Sie möchten Ihre CBAM-Berichte strukturiert vorbereiten?"
        text="Wir analysieren Importdaten, bauen Berichtsgrundlagen auf und halten offene Lieferanten- beziehungsweise Händlerangaben transparent nach."
        button="Fall besprechen"
      />
    </>
  );
}
