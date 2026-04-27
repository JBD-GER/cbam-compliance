import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Registrierungsvorbereitung",
  description:
    "CBAM-Registrierungsvorbereitung für Importeure: organisatorische Angaben, Zuständigkeiten, Importstruktur, Datenlage und interne Voraussetzungen strukturiert vorbereiten.",
  path: "/leistungen/cbam-registrierungsvorbereitung",
  image: "/images/office.jpg"
});

const blocks = [
  {
    title: "Warum Vorbereitung wichtig ist",
    text: "Die Registrierung als zugelassener CBAM-Anmelder ist nicht nur ein formaler Schritt. Unternehmen sollten vorher klären, welche Rollen, Daten, Gesellschaften, Ansprechpartner und Importstrukturen betroffen sind."
  },
  {
    title: "Was wir vorbereiten",
    text: "Wir strukturieren organisatorische Angaben, interne Zuständigkeiten, vorhandene Importdaten, relevante Warengruppen und offene Klärungspunkte für den nächsten Schritt im Registrierungsprozess."
  },
  {
    title: "Was bewusst nicht ersetzt wird",
    text: "Wir übernehmen keine finale rechtliche, steuerliche oder zollrechtliche Bewertung. Unsere Arbeit schafft eine geordnete Grundlage für interne Entscheidungen und bei Bedarf für Ihre Fachberater."
  }
];

const scope = [
  "Vorhandene Unternehmens- und Verantwortlichkeitsdaten strukturieren",
  "Betroffene Gesellschaften, Standorte und Ansprechpartner erfassen",
  "Importstruktur nach Waren, Ursprungsländern, Mengen und Lieferanten einordnen",
  "Offene Datenpunkte und interne Freigaben sichtbar machen",
  "Organisatorische Voraussetzungen für den Registrierungsprozess vorbereiten",
  "Management-Übersicht mit Status, Risiken und nächsten Schritten erstellen"
];

const departments = [
  ["Geschäftsführung", "Übersicht über Entscheidungsbedarf, Verantwortlichkeiten und organisatorische Voraussetzungen."],
  ["Zoll", "Strukturierte Sicht auf Waren, CN-Codes, Ursprungsländer und mögliche CBAM-Relevanz."],
  ["Einkauf", "Lieferanten- und Händlerbezug mit offenen Datenanforderungen und Rückfragepunkten."],
  ["Finanzen", "Arbeitsgrundlage für interne Planung, Datenräume und spätere Kosten- beziehungsweise Berichtsthemen."]
];

const workflow = [
  ["1. Ausgangslage klären", "Wir erfassen, welche Gesellschaften, Datenquellen, Ansprechpartner und Importprozesse relevant sind."],
  ["2. Daten vorbereiten", "Importdaten, Lieferanteninformationen und organisatorische Angaben werden in eine klare Struktur gebracht."],
  ["3. Offene Punkte markieren", "Unklare Zuständigkeiten, fehlende Daten und Abstimmungsbedarf werden priorisiert dokumentiert."],
  ["4. Registrierungsreife vorbereiten", "Sie erhalten eine Arbeitsgrundlage für die nächsten internen und externen Schritte."]
];

export default function RegistrationPreparationPage() {
  return (
    <>
      <Section
        eyebrow="Leistung"
        title="CBAM-Registrierungsvorbereitung"
        text="Wir bereiten die organisatorischen Angaben und Voraussetzungen für den Registrierungsprozess strukturiert vor."
      >
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Image
            src="/images/office.jpg"
            alt="Arbeitsplatz als Symbol für organisatorische CBAM-Registrierungsvorbereitung"
            width={1920}
            height={1080}
            className="aspect-[16/9] rounded-[2rem] object-cover shadow-sm"
          />
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              Eine gute Registrierungsvorbereitung beginnt vor dem eigentlichen Antrag. Entscheidend ist, dass Unternehmen wissen, welche Datenquellen relevant sind, wer intern Verantwortung trägt und welche offenen Punkte vor einer formalen Einreichung geklärt werden sollten.
            </p>
            <p>
              Wir helfen, diese organisatorische Grundlage aufzubauen: sachlich, datenbasiert und anschlussfähig für Ihre internen Teams sowie externe Rechts-, Steuer- oder Zollberatung.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {blocks.map((block) => (
            <article key={block.title} className="glass p-6">
              <h2 className="text-xl font-semibold text-navy">{block.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{block.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Leistungsumfang">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scope.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Ergebnis für die beteiligten Abteilungen">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {departments.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h2 className="text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Ablauf der Registrierungsvorbereitung"
        text="Die Vorbereitung schafft Transparenz über Daten, Rollen und nächste Schritte. So wird aus einem formalen Thema ein steuerbarer interner Prozess."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {workflow.map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="CBAM-Registrierung organisatorisch vorbereiten"
        text="Wir klären, welche Angaben, Daten und internen Voraussetzungen für den nächsten Schritt strukturiert werden sollten."
        button="Registrierungsvorbereitung anfragen"
      />
    </>
  );
}
