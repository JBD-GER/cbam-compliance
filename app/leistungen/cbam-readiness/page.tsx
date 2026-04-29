import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Readiness-Dienstleistung",
  description:
    "CBAM-Readiness-Dienstleistung für Importeure: Datenraum, Risikomatrix, Lieferantenkommunikation, Registrierungsvorbereitung und Management Summary für die CBAM-Regelphase.",
  path: "/leistungen/cbam-readiness",
  image: "/images/compliance.jpg"
});

const blocks = [
  {
    title: "Warum Readiness wichtig ist",
    text: "CBAM betrifft nicht nur einzelne Zollvorgänge. Unternehmen benötigen belastbare Datenräume, klare Zuständigkeiten, Lieferanteninformationen und einen Prozess, der wiederholbar funktioniert."
  },
  {
    title: "Leistungsumfang",
    text: "Wir analysieren Import- und Warengruppen, erstellen eine CBAM-Risikomatrix, strukturieren Lieferantenanforderungen, bereiten organisatorische Angaben für die Registrierung vor und verdichten die Ergebnisse für die Geschäftsführung."
  },
  {
    title: "Ergebnis für Ihre Organisation",
    text: "Geschäftsführung, Einkauf, Zoll und Buchhaltung erhalten eine gemeinsame Arbeitsgrundlage mit Verantwortlichkeiten, Datenanforderungen, Prioritäten und konkreten nächsten Schritten."
  }
];

const modules = [
  ["Datenraum", "Aufbau einer strukturierten CBAM-Datenbasis mit Importpositionen, Warengruppen, Ursprungsländern, Lieferanten und offenen Punkten."],
  ["Risikomatrix", "Einordnung relevanter Waren, Lieferanten und Datenlücken nach Priorität und organisatorischem Handlungsbedarf."],
  ["Lieferantenkommunikation", "Vorbereitung von Datenanforderungen, Rückmeldestatus und Nachverfolgung offener Lieferanteninformationen."],
  ["Registrierungsvorbereitung", "Zusammenstellung organisatorischer Angaben, Zuständigkeiten und interner Voraussetzungen für den nächsten Schritt."],
  ["Management Summary", "Verdichtete Übersicht für Geschäftsführung und Entscheider mit Status, Risiken und nächsten Schritten."],
  ["Arbeitsprozess", "Definition von Verantwortlichkeiten, Fristen, Eskalationswegen und wiederholbaren Prüfabläufen."]
];

const departments = [
  ["Geschäftsführung", "Übersicht über CBAM-Umfang, Risiken, offene Punkte und priorisierte nächste Schritte."],
  ["Einkauf", "Klare Lieferantenliste, Datenanforderungen und Nachverfolgung von Rückmeldungen."],
  ["Zoll", "Strukturierte Sicht auf KN-/CN-Codes, Ursprungsländer und potenziell relevante Waren."],
  ["Finanzen", "Grundlage für interne Abstimmung zu Kosten, Datenräumen und künftigen Berichtspflichten."]
];

const outcomes = [
  "Ein gemeinsames CBAM-Verständnis zwischen den beteiligten Abteilungen",
  "Eine strukturierte Datenbasis für wiederkehrende Prüfungen",
  "Priorisierte offene Punkte für Lieferanten, Händler und interne Teams",
  "Vorbereitete Berichts- und Managementunterlagen",
  "Ein realistischer Fahrplan für die nächsten organisatorischen Schritte",
  "Bessere Anschlussfähigkeit für Rechts-, Steuer- oder Zollberatung"
];

export default function ReadinessPage() {
  return (
    <>
      <Section
        eyebrow="Leistung"
        title="CBAM-Readiness-Dienstleistung"
        text="Wir bereiten Ihr Unternehmen strukturiert auf die CBAM-Regelphase vor."
      >
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Image
            src="/images/compliance.jpg"
            alt="Beratungssituation mit Unterlagen und Datenanalyse"
            width={1920}
            height={960}
            className="aspect-[16/9] rounded-[2rem] object-cover shadow-sm"
          />
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              Readiness bedeutet, CBAM nicht nur fachlich zu verstehen, sondern intern arbeitsfähig zu werden. Entscheidend ist, dass Daten, Rollen, Lieferantenkommunikation und Entscheidungswege zusammenpassen.
            </p>
            <p>
              Diese Dienstleistung ist für Unternehmen gedacht, die CBAM nicht als einmalige Analyse behandeln möchten, sondern eine belastbare Grundlage für die Regelphase schaffen wollen.
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

      <Section title="Module der Readiness-Dienstleistung">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h2 className="text-xl font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Ergebnis für die beteiligten Abteilungen">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {departments.map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Was nach der Readiness-Dienstleistung klarer sein sollte"
        text="Das Ziel ist eine realistische, intern nutzbare Arbeitsgrundlage. Sie wissen, welche Daten tragfähig sind, wo noch Verifizierungen fehlen und welche Verantwortlichkeiten im Unternehmen greifen müssen."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="CBAM-Readiness strukturiert aufbauen"
        text="Wir prüfen Ihre Ausgangslage und schlagen einen klaren Projektumfang vor."
        button="Readiness anfragen"
      />
    </>
  );
}
