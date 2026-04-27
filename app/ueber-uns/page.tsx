import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Über uns",
  description:
    "CBAM-Compliance.de ist eine spezialisierte Compliance-Einheit für strukturierte CBAM-Vorbereitung von Importeuren: Daten, Prozesse und Lieferantenkommunikation.",
  path: "/ueber-uns",
  image: "/images/compliance.jpg"
});

const milestones = [
  {
    year: "2025",
    label: "Start",
    title: "Aufbau einer spezialisierten CBAM-Einheit",
    text: "CBAM-Compliance.de entsteht mit einem klaren Fokus: Importdaten, CN-Code-Strukturen, Lieferantenkommunikation und organisatorische Berichtsvorbereitung für Importeure."
  },
  {
    year: "2025",
    label: "Daten",
    title: "Erste Importanalysen und Berichtsgrundlagen",
    text: "Importdaten werden nach Waren, Ursprungsländern, Mengen und Lieferanten strukturiert. Daraus entstehen erste interne Übersichten für Einkauf, Zoll, Finanzen und Geschäftsführung."
  },
  {
    year: "2026",
    label: "Berichte",
    title: "Berichte, Arbeitslisten und Lieferantenabstimmung",
    text: "Wir erstellen Berichtsvorlagen, Management-Übersichten und Datenräume. Parallel werden Rückmeldungen und Verifizierungen von Händlern und Lieferanten nachgehalten."
  },
  {
    year: "2027",
    label: "Regelphase",
    title: "Vorbereitung auf Abgaben und laufende Prozesse",
    text: "Die Regelphase wird auf Basis verifizierter Informationen vorbereitet. Unsere Rolle bleibt die datenbasierte und organisatorische Begleitung, nicht die finale Rechts- oder Zollbewertung."
  }
];

const achievements = [
  ["120+", "Länder aus den CBAM-Default-Values strukturiert"],
  ["260+", "CN-Code-Einträge für Kostenrechner und Datenanalyse aufbereitet"],
  ["4", "anonymisierte Praxisnotizen aus typischen CBAM-Projekten"],
  ["1", "klarer Fokus: CBAM für Importeure"]
];

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="Über uns"
        title="Spezialisierte CBAM-Vorbereitung für Importeure"
        text="CBAM-Compliance.de unterstützt Importeure bei der strukturierten Vorbereitung auf CBAM-Anforderungen. Unser Fokus liegt auf Daten, Prozessen, Lieferantenkommunikation und klaren Handlungsschritten."
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="glass overflow-hidden p-3">
            <Image
              src="/images/compliance.jpg"
              alt="Beratungsgespräch zur strukturierten Compliance-Vorbereitung"
              width={3840}
              height={2160}
              className="aspect-[16/10] rounded-[1.35rem] object-cover"
            />
          </div>
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              Wir arbeiten an der Schnittstelle von Importdaten, internen Verantwortlichkeiten und Lieferanteninformationen. Ziel ist eine belastbare Arbeitsgrundlage, mit der Unternehmen Entscheidungen treffen, Berater gezielt einbinden und operative Prozesse vorbereiten können.
            </p>
            <p>
              Unsere Unterstützung ist bewusst organisatorisch und datenbasiert ausgerichtet. Wir schaffen Transparenz über Waren, Lieferanten, Datenlücken und nächste Schritte, ohne rechtliche, steuerliche oder zollrechtliche Bewertungen zu ersetzen.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Meilensteine"
        title="Was wir aufgebaut und erreicht haben"
        text="CBAM ist kein einzelnes Formular, sondern ein Prozess aus Datenqualität, Zuständigkeiten, Lieferantenkommunikation und sauberer Berichtsvorbereitung."
      >
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="glass sticky top-28 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Stand heute</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy">Von verstreuten Daten zu einer prüfbaren CBAM-Struktur.</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Wir haben Importdaten analysiert, Berichte vorbereitet und Arbeitsstrukturen geschaffen. Händler- und Lieferantenverifizierungen werden nachgehalten; formale Abgaben folgen in den vorgesehenen regulatorischen Schritten.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="timeline-line absolute left-3 top-0 h-full w-px bg-slate-200" />
            <div className="space-y-6">
              {milestones.map((item, index) => (
                <article key={`${item.year}-${item.title}`} className="timeline-card relative rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl" style={{ animationDelay: `${index * 120}ms` }}>
                  <div className="absolute -left-[2.15rem] top-7 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-accent text-xs font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{item.year}</span>
                    <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-navy">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Erreicht" title="Strukturen, die im Alltag funktionieren" centered>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map(([value, label]) => (
            <div key={label} className="glass p-6 text-center">
              <p className="text-4xl font-semibold tracking-tight text-accent">{value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection title="Sie möchten Ihre CBAM-Struktur prüfen?" text="Wir verschaffen Ihnen einen klaren Blick auf Datenlage, Risiken und nächste organisatorische Schritte." button="Kontakt aufnehmen" />
    </>
  );
}

