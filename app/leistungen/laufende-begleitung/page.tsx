import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Laufende CBAM-Begleitung",
  description:
    "Laufende CBAM-Begleitung für Unternehmen mit regelmäßigen Importen: monatliche Importdatenprüfung, Lieferantendaten, Fristenübersicht und CBAM-Datenraum.",
  path: "/leistungen/laufende-begleitung",
  image: "/images/computer.jpg"
});

const blocks = [
  {
    title: "Für Unternehmen mit regelmäßigen Importen",
    text: "Wenn Waren, Lieferanten oder Ursprungsländer laufend wechseln, reicht eine einmalige Prüfung oft nicht aus. CBAM sollte dann als wiederkehrender Bestandteil des Importprozesses organisiert werden."
  },
  {
    title: "Monatliche Leistungen",
    text: "Wir prüfen neue Importdaten, identifizieren relevante KN-/CN-Codes, halten Lieferanteninformationen nach und aktualisieren den CBAM-Datenraum anhand der vereinbarten Struktur."
  },
  {
    title: "Fristen und Lieferantendaten",
    text: "Wir unterstützen bei der organisatorischen Fristenübersicht und bereiten Informationen so auf, dass interne Teams und externe Berater gezielt damit arbeiten können."
  }
];

const monthly = [
  "Importdaten regelmäßig prüfen und neue Positionen erkennen",
  "Neue oder geänderte KN-/CN-Codes markieren",
  "Lieferanten- und Händlerantworten nachhalten",
  "CBAM-Datenraum aktualisieren",
  "Offene Punkte und Fristen in einer Arbeitsliste führen",
  "Berichtsgrundlagen für interne Abstimmungen vorbereiten"
];

const cadence = [
  ["Monatlich", "Prüfung neuer Importdaten, Statusupdate und Aktualisierung der Arbeitsliste."],
  ["Quartalsweise", "Verdichtete Übersicht über relevante Waren, Lieferanten, Datenlücken und nächste Schritte."],
  ["Jährlich", "Vorbereitung der Datenbasis für weitergehende Berichtspflichten und Abstimmungen mit Fachberatern."]
];

const signals = [
  "Neue Lieferanten oder Händler kommen hinzu",
  "Warencodes ändern sich oder werden neu eingereiht",
  "Importmengen steigen oder verschieben sich zwischen Gesellschaften",
  "Lieferantenantworten bleiben offen oder müssen nachgefasst werden",
  "Interne Teams benötigen einen regelmäßigen CBAM-Status",
  "Berichtsgrundlagen sollen nicht erst kurz vor Fristen entstehen"
];

export default function OngoingSupportPage() {
  return (
    <>
      <Section
        eyebrow="Leistung"
        title="Laufende CBAM-Begleitung"
        text="Wir sorgen dafür, dass CBAM dauerhaft sauber in Ihrem Importprozess berücksichtigt wird."
      >
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              Bei regelmäßigen Importen verändert sich die CBAM-Lage laufend. Neue Lieferanten, andere Ursprungsländer, zusätzliche CN-Codes oder fehlende Rückmeldungen können dazu führen, dass eine einmalige Analyse schnell veraltet.
            </p>
            <p>
              Die laufende Begleitung hält die Arbeitsstruktur aktuell. Sie schafft Übersicht darüber, welche Daten neu hinzugekommen sind, welche Punkte offen bleiben und welche internen Schritte im nächsten Zeitraum anstehen.
            </p>
          </div>
          <Image
            src="/images/computer.jpg"
            alt="Laufende Datenauswertung für CBAM-Prozesse"
            width={3008}
            height={2177}
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

      <Section title="Was die laufende Begleitung konkret umfasst">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {monthly.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Wann laufende Begleitung besonders sinnvoll ist">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signals.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5 font-medium leading-7 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Rhythmus und Steuerung">
        <div className="grid gap-5 md:grid-cols-3">
          {cadence.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h2 className="text-xl font-semibold text-navy">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="CBAM dauerhaft im Prozess halten"
        text="Wir klären, welcher laufende Umfang zu Ihrer Importfrequenz und Lieferantenstruktur passt."
        button="Laufende Begleitung anfragen"
      />
    </>
  );
}
