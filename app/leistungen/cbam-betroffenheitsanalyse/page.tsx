import Image from "next/image";
import type { Metadata } from "next";
import { CbamAssessmentCalculator } from "@/components/CbamAssessmentCalculator";
import { CTASection } from "@/components/CTASection";
import { IndustrySection } from "@/components/IndustrySection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Betroffenheitsanalyse für Importeure",
  description:
    "CBAM-Betroffenheitsanalyse: Wir prüfen Importdaten, KN-/CN-Codes, Ursprungsländer, Mengen und Lieferanten, um die mögliche CBAM-Relevanz strukturiert einzuordnen.",
  path: "/leistungen/cbam-betroffenheitsanalyse",
  image: "/images/import.jpg"
});

const blocks = [
  {
    title: "Für wen ist diese Analyse geeignet?",
    items: [
      "Unternehmen mit Importen aus Drittstaaten",
      "Importeure mit unklaren KN-/CN-Codes oder Warengruppen",
      "Einkaufs-, Zoll- und Finanzabteilungen mit kurzfristigem Klärungsbedarf",
      "Geschäftsführungen, die eine belastbare Entscheidungsgrundlage benötigen"
    ]
  },
  {
    title: "Was wird geprüft?",
    items: [
      "Importdaten, Warengruppen und Mengenstrukturen",
      "KN-/CN-Codes und mögliche CBAM-Relevanz",
      "Ursprungsländer und Lieferantenbezug",
      "Schwellenwerte, Datenlücken und organisatorischer Handlungsbedarf"
    ]
  },
  {
    title: "Was erhalten Sie als Ergebnis?",
    items: [
      "Übersicht potenziell betroffener Waren und Lieferanten",
      "Strukturierte Auswertung der Datenlage",
      "Priorisierte nächste Schritte",
      "Handlungsempfehlung als Management-taugliches PDF"
    ]
  }
];

const workflow = [
  ["1. Datenaufnahme", "Sie stellen Importdaten, Zollunterlagen, KN-/CN-Codes, Mengen, Ursprungsländer und Lieferantenlisten bereit."],
  ["2. Strukturierung", "Wir bereinigen und ordnen die Daten nach Waren, Ländern, Lieferanten und potenzieller CBAM-Relevanz."],
  ["3. Bewertung der Datenlage", "Wir markieren betroffene Positionen, Datenlücken, offene Klärungspunkte und sinnvolle Prioritäten."],
  ["4. Ergebnisbericht", "Sie erhalten eine Management-taugliche Übersicht mit nächsten organisatorischen Schritten."]
];

const deliverables = [
  "Übersicht potenziell CBAM-relevanter CN-Codes",
  "Auswertung nach Ursprungsländern, Mengen und Lieferanten",
  "Liste offener Daten- und Klärungspunkte",
  "Priorisierung nach Handlungsbedarf",
  "PDF-Bericht für interne Abstimmungen",
  "Empfehlung für nächste organisatorische Schritte"
];

const dataNeeds = [
  "Importdaten aus dem relevanten Zeitraum",
  "KN-/CN-Codes und Warenbeschreibungen",
  "Ursprungsländer und Lieferantenangaben",
  "Mengen, Gewichte und betroffene Gesellschaften",
  "Vorhandene Lieferantenantworten oder Emissionsinformationen",
  "Interne Ansprechpartner aus Einkauf, Zoll oder Finanzen"
];

export default function AffectedAnalysisPage() {
  return (
    <>
      <Section
        eyebrow="Leistung"
        title="CBAM-Betroffenheitsanalyse"
        text="Wir prüfen, ob und in welchem Umfang Ihr Unternehmen von CBAM betroffen ist."
      >
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              Die Betroffenheitsanalyse ist der pragmatische Einstieg, wenn CBAM im Unternehmen bereits Thema ist, aber noch keine belastbare Sicht auf Waren, Codes, Mengen und Lieferanten besteht.
            </p>
            <p>
              Wir bereiten Ihre Importdaten so auf, dass sichtbar wird, welche Positionen vorrangig betrachtet werden sollten, wo Daten fehlen und welche internen oder externen Klärungen als nächstes anstehen.
            </p>
          </div>
          <Image
            src="/images/import.jpg"
            alt="Containerterminal als Kontext für Importdaten und CBAM-Betroffenheit"
            width={2048}
            height={1152}
            className="aspect-[16/9] rounded-[2rem] object-cover shadow-sm"
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {blocks.map((block) => (
            <article key={block.title} className="glass p-6">
              <h2 className="text-xl font-semibold text-navy">{block.title}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <IndustrySection />

      <Section
        eyebrow="Online-Prüfung"
        title="CBAM-Betroffenheit direkt einschätzen"
        text="Nutzen Sie den Schnellcheck, wenn Sie eine erste strukturierte Einschätzung benötigen. Der Bericht wird automatisch als PDF erzeugt und an die angegebene E-Mail-Adresse gesendet."
      >
        <CbamAssessmentCalculator />
      </Section>

      <Section
        title="So entsteht aus Importdaten eine belastbare Entscheidungsgrundlage"
        text="Eine Betroffenheitsanalyse ist keine lose Einschätzung, sondern ein strukturierter Arbeitsprozess. Ziel ist, aus vorhandenen Informationen eine nachvollziehbare Sicht auf CBAM-Relevanz, Datenlücken und nächste organisatorische Schritte zu machen."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {workflow.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h2 className="text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Konkrete Ergebnisse der Analyse">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Welche Unterlagen typischerweise benötigt werden"
        text="Je sauberer die Ausgangsdaten bereitgestellt werden, desto schneller kann eine belastbare Struktur entstehen. Fehlende Informationen sind kein Hindernis, sie werden als offene Punkte dokumentiert."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dataNeeds.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="CBAM-Betroffenheit prüfen lassen"
        text="Wir klären, welche Importdaten benötigt werden und wie schnell eine belastbare Auswertung möglich ist."
        button="Betroffenheitsanalyse anfragen"
      />
    </>
  );
}
