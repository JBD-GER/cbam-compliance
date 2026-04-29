import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { allServices } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Dienstleistungen für Importeure",
  description:
    "CBAM-Dienstleistungen für Importeure: Betroffenheitsanalyse, Readiness, Lieferantendaten, Registrierungsvorbereitung und laufende CBAM-Begleitung.",
  path: "/leistungen",
  image: "/images/office.jpg"
});

const principles = [
  ["Daten zuerst", "Wir starten nicht mit pauschalen Aussagen, sondern mit Importdaten, CN-Codes, Ursprungsländern, Mengen und Lieferantenbeziehungen."],
  ["Struktur für mehrere Abteilungen", "CBAM betrifft Einkauf, Zoll, Finanzen und Geschäftsführung. Die Ergebnisse werden so aufgebaut, dass alle Beteiligten damit arbeiten können."],
  ["Dokumentierte offene Punkte", "Fehlende Lieferantendaten, unklare Codes und Verifizierungsbedarf werden nicht versteckt, sondern sauber sichtbar gemacht."],
  ["Praktische Umsetzung", "Sie erhalten Arbeitslisten, Statusübersichten, Berichtsvorbereitung und klare nächste Schritte statt abstrakter Compliance-Folien."]
];

const decisionHelp = [
  {
    situation: "Sie haben erste Hinweise auf CBAM, aber keine klare Übersicht.",
    recommendation: "Starten Sie mit der CBAM-Betroffenheitsanalyse.",
    text: "Diese Dienstleistung schafft eine erste belastbare Sicht auf Waren, Ursprungsländer, Mengen, Lieferanten und Datenlücken."
  },
  {
    situation: "CBAM soll intern in Rollen, Prozesse und Datenräume überführt werden.",
    recommendation: "Die CBAM-Readiness-Dienstleistung ist der passende Aufbau.",
    text: "Hier geht es um eine abteilungsübergreifende Arbeitsgrundlage für Einkauf, Zoll, Buchhaltung und Geschäftsführung."
  },
  {
    situation: "Lieferantenantworten fehlen oder kommen in uneinheitlicher Form zurück.",
    recommendation: "Die Lieferanten-Datendienstleistung bündelt Kommunikation und Rückmeldungen.",
    text: "Wir strukturieren Anforderungen, Ansprechpartner, Status und verwertbare Datenpunkte für die weitere CBAM-Vorbereitung."
  },
  {
    situation: "Ihre Importstruktur verändert sich laufend.",
    recommendation: "Die laufende CBAM-Begleitung hält Daten und Fristen aktuell.",
    text: "Neue Codes, neue Lieferanten und neue Warenbewegungen werden regelmäßig in die bestehende Arbeitsstruktur aufgenommen."
  }
];

const included = [
  "Sichtung und Strukturierung der bereitgestellten Importdaten",
  "Einordnung von Warengruppen, Ursprungsländern und Lieferanten",
  "Kennzeichnung von Datenlücken und offenen Rückfragen",
  "Aufbereitung von Ergebnissen für interne Abstimmungen",
  "Klare Handlungsschritte für den nächsten organisatorischen Schritt",
  "Abstimmungsfähige Unterlagen für interne Teams und externe Fachberater"
];

export default function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="CBAM-Dienstleistungen"
        title="CBAM-Dienstleistungen für Importeure"
        text="CBAM wird für Unternehmen dann greifbar, wenn Warenbewegungen, Lieferanten, Emissionsinformationen und interne Zuständigkeiten sauber zusammengeführt werden. Unsere Dienstleistungen sind darauf ausgelegt, genau diese Arbeitsgrundlage aufzubauen."
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              Viele Importeure stehen vor einer ähnlichen Situation: Einzelne Informationen liegen vor, aber sie sind nicht in einer Form verbunden, die für CBAM-Berichtsvorbereitung, Lieferantenkommunikation oder interne Steuerung ausreicht.
            </p>
            <p>
              Deshalb betrachten wir CBAM nicht als isolierte Formularaufgabe. Wir bauen eine Struktur auf, mit der Einkauf, Zoll, Finanzen und Geschäftsführung gemeinsam erkennen können, was bereits geklärt ist, was noch fehlt und welche nächsten Schritte sinnvoll sind.
            </p>
          </div>
          <Image
            src="/images/office.jpg"
            alt="Heller Arbeitsplatz als Symbol für strukturierte Compliance-Prozesse"
            width={1920}
            height={1080}
            className="aspect-[16/9] rounded-[2rem] object-cover shadow-sm"
          />
        </div>
      </Section>

      <Section title="Unsere CBAM-Dienstleistungen im Überblick">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Arbeitsprinzip"
        title="Was alle Dienstleistungen gemeinsam haben"
        text="Der konkrete Umfang unterscheidet sich je nach Ausgangslage. Die Arbeitsweise bleibt gleich: strukturiert, nachvollziehbar und auf interne Nutzbarkeit ausgerichtet."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {principles.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h2 className="text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Welche Dienstleistung passt zu welchem Bedarf?">
        <div className="grid gap-5 md:grid-cols-2">
          {decisionHelp.map((item) => (
            <article key={item.situation} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Ausgangslage</p>
              <h2 className="mt-3 text-xl font-semibold text-navy">{item.situation}</h2>
              <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
              <p className="mt-5 font-semibold text-navy">{item.recommendation}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="Typische Bestandteile der Zusammenarbeit"
        text="Je nach Dienstleistung und Datenlage werden einzelne Bausteine stärker oder schwächer gewichtet. Entscheidend ist, dass am Ende eine Arbeitsgrundlage entsteht, die im Unternehmen weitergeführt werden kann."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Welche CBAM-Dienstleistung passt zu Ihrer Situation?"
        text="Im Erstgespräch klären wir Datenlage, Importstruktur, offene Lieferantenpunkte und sinnvolle nächste Schritte."
        button="Kontakt aufnehmen"
      />
    </>
  );
}
