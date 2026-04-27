import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Lieferanten-Datenpaket für CBAM",
  description:
    "Lieferanten-Datenpaket für CBAM: Wir strukturieren Lieferantenkommunikation, Datenanforderungen, Rückmeldungen, Emissionsinformationen und offene Verifizierungspunkte.",
  path: "/leistungen/lieferanten-datenpaket",
  image: "/images/beratung.jpg"
});

const blocks = [
  {
    title: "Warum Lieferantendaten zum Engpass werden",
    text: "Viele CBAM-relevante Informationen entstehen nicht im eigenen Unternehmen, sondern bei Lieferanten, Herstellern oder Händlern. Rückmeldungen kommen oft spät, unvollständig oder in Formaten, die intern erst sortiert werden müssen."
  },
  {
    title: "Was wir strukturieren",
    text: "Wir verbinden Lieferanten, Warenpositionen, CN-Codes, Ursprungsländer, Mengen, angefragte Datenfelder, Rückmeldestatus und offene Verifizierungspunkte in einer nachvollziehbaren Arbeitsübersicht."
  },
  {
    title: "Was Ihr Unternehmen gewinnt",
    text: "Einkauf, Zoll und Finanzen sehen, welche Lieferanten priorisiert werden sollten, welche Daten fehlen und welche Informationen für Berichtsvorbereitung oder externe Abstimmung bereitstehen."
  }
];

const scope = [
  "Relevante Lieferanten aus Importdaten ableiten",
  "Lieferantenliste nach Waren, CN-Codes und Ursprungsländern strukturieren",
  "Datenanforderungen und Rückfragepunkte vorbereiten",
  "Rückmeldungen erfassen, sortieren und mit Warenpositionen verknüpfen",
  "Fehlende, unklare oder widersprüchliche Angaben sichtbar machen",
  "Statusübersichten für Einkauf, Zoll, Finanzen und Geschäftsführung erstellen"
];

const process = [
  ["1. Lieferantensicht aufbauen", "Wir identifizieren, welche Lieferanten mit potenziell CBAM-relevanten Waren verbunden sind."],
  ["2. Datenanforderungen definieren", "Benötigte Angaben werden in klare Felder, Fristen und Rückfragepunkte übersetzt."],
  ["3. Rückmeldungen strukturieren", "Eingehende Informationen werden mit Waren, Codes, Ländern und Zeiträumen verknüpft."],
  ["4. Offene Punkte nachhalten", "Unvollständige Angaben, fehlende Nachweise und Verifizierungsbedarf bleiben sichtbar."]
];

const results = [
  "Lieferantenmatrix mit Status und Prioritäten",
  "Übersicht angefragter und erhaltener Emissionsinformationen",
  "Liste offener Rückfragen und fehlender Datenpunkte",
  "Vorbereitete Kommunikationsbausteine für relevante Lieferanten",
  "Arbeitsgrundlage für interne Teams und externe Fachberater",
  "Strukturierte Grundlage für spätere Berichtsvorbereitung"
];

export default function SupplierDataPackagePage() {
  return (
    <>
      <Section
        eyebrow="Leistung"
        title="Lieferanten-Datenpaket"
        text="Wir strukturieren die Kommunikation mit relevanten Lieferanten und bereiten Emissionsdaten, Rückmeldungen und offene Punkte verwertbar auf."
      >
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              CBAM-Vorbereitung scheitert in der Praxis selten an nur einer Zahl. Häufig fehlt eine belastbare Übersicht darüber, welcher Lieferant welche Informationen liefern muss, welche Daten bereits vorliegen und welche Angaben noch verifiziert oder fachlich eingeordnet werden müssen.
            </p>
            <p>
              Das Lieferanten-Datenpaket schafft genau diese Übersicht. Es ist besonders sinnvoll, wenn mehrere Lieferanten, Händler oder Warengruppen betroffen sind und die Kommunikation nicht mehr über einzelne E-Mails steuerbar ist.
            </p>
          </div>
          <Image
            src="/images/beratung.jpg"
            alt="Beratungsgespräch zur Strukturierung von Lieferantendaten"
            width={1920}
            height={960}
            className="aspect-[16/9] rounded-[2rem] object-cover shadow-sm"
          />
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

      <Section
        title="So entsteht eine steuerbare Lieferantenübersicht"
        text="Der Schwerpunkt liegt auf Nachvollziehbarkeit. Jede Rückmeldung wird so eingeordnet, dass interne Teams erkennen können, was belastbar vorliegt und wo noch Klärungsbedarf besteht."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {process.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h2 className="text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Ergebnisse des Lieferanten-Datenpakets">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Lieferantendaten strukturiert nachhalten"
        text="Wir klären, welche Lieferanten relevant sind, welche Informationen fehlen und wie eine verwertbare CBAM-Datenstruktur aufgebaut werden kann."
        button="Lieferanten-Datenpaket anfragen"
      />
    </>
  );
}
