import Image from "next/image";
import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { IndustrySection } from "@/components/IndustrySection";
import { LinkButton } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { ProcessStep } from "@/components/ProcessStep";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { faqItems, mainServices } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Compliance für Importeure",
  description:
    "CBAM-Compliance für Importeure: Wir prüfen Importdaten, identifizieren CBAM-relevante Waren und strukturieren Lieferantendaten, Registrierungsvorbereitung und laufende CBAM-Prozesse.",
  path: "/",
  image: "/images/import_hamburg.jpg"
});

const problems = [
  {
    title: "Unklare Betroffenheit",
    text: "Welche Waren, KN-/CN-Codes, Ursprungsländer und Mengen sind tatsächlich CBAM-relevant? Ohne strukturierte Datenbasis bleibt diese Frage häufig abstrakt."
  },
  {
    title: "Fehlende Lieferantendaten",
    text: "Viele Lieferanten liefern Emissionsdaten nicht vollständig, nicht rechtzeitig oder nicht in verwertbarer Form. Das erschwert Berichtsvorbereitung und interne Planung."
  },
  {
    title: "Kein interner Prozess",
    text: "Einkauf, Zoll, Buchhaltung und Geschäftsführung benötigen klare Verantwortlichkeiten, Statusübersichten und einen gemeinsamen Fahrplan."
  }
];

const orientationPoints = [
  ["Importe sichtbar machen", "Wir führen Waren, CN-Codes, Ursprungsländer, Mengen und Lieferanten in einer nachvollziehbaren Arbeitsstruktur zusammen."],
  ["CBAM-Relevanz markieren", "Potentiell relevante Warenpositionen werden erkennbar, priorisiert und mit offenen Datenpunkten verbunden."],
  ["Lieferanten steuern", "Rückmeldungen, fehlende Angaben und Verifizierungsstände werden dokumentiert, damit Einkauf und Fachbereiche gezielt nachhalten können."],
  ["Berichte vorbereiten", "Die Ergebnisse werden so verdichtet, dass interne Teams und externe Fachberater effizient darauf aufbauen können."]
];

const dataAreas = [
  ["Zoll- und Importdaten", "Einfuhrdaten, Warenbeschreibungen, Mengen, Ursprungsländer und Lieferanten werden so strukturiert, dass sie für CBAM-Prüfungen nutzbar sind."],
  ["KN-/CN-Code-Analyse", "Relevante Codes werden gruppiert, auf mögliche CBAM-Betroffenheit geprüft und für spätere Abstimmungen nachvollziehbar dokumentiert."],
  ["Lieferantenkommunikation", "Wir bereiten Datenanforderungen vor, strukturieren Rückmeldungen und machen sichtbar, wo Angaben fehlen oder verifiziert werden müssen."],
  ["Management-Übersicht", "Geschäftsführung und Fachabteilungen erhalten eine klare Sicht auf Umfang, offene Punkte, Prioritäten und nächste organisatorische Schritte."]
];

const packageFit = [
  ["Sie wissen noch nicht, ob CBAM relevant ist.", "CBAM-Betroffenheitsanalyse", "Sinnvoll, wenn zunächst Waren, Codes, Ursprungsländer und Mengen eingeordnet werden müssen."],
  ["Sie möchten CBAM operativ vorbereiten.", "CBAM-Readiness-Paket", "Passend, wenn Einkauf, Zoll, Finanzen und Geschäftsführung eine gemeinsame Arbeitsgrundlage benötigen."],
  ["Lieferanten- und Emissionsdaten fehlen.", "Lieferanten-Datenpaket", "Geeignet, wenn Rückmeldungen eingeholt, sortiert und verwertbar aufbereitet werden sollen."],
  ["CBAM soll dauerhaft im Importprozess bleiben.", "Laufende CBAM-Begleitung", "Für Unternehmen mit regelmäßigen Importen, neuen Warencodes oder wechselnden Lieferanten."]
];

const targetGroups = [
  "Importeure von Stahl, Eisen, Aluminium, Zement, Düngemitteln, Wasserstoff oder Strom",
  "Unternehmen mit Importen aus Drittstaaten und wachsendem Klärungsbedarf",
  "Mittelständische Unternehmen ohne eigene CBAM-Struktur",
  "Einkaufs-, Zoll- und Finanzabteilungen, die Daten und Verantwortlichkeiten zusammenführen müssen",
  "Geschäftsführungen, die Risiken, Pflichten und nächste Schritte frühzeitig strukturieren möchten"
];

const reasons = [
  ["Spezialisierter CBAM-Fokus", "Wir konzentrieren uns auf die organisatorische, datenbasierte und prozessuale Vorbereitung von Importeuren."],
  ["Auswertungen statt Allgemeinplätze", "Sie erhalten verwertbare Übersichten, Datenstrukturen, Statuslisten und konkrete nächste Schritte."],
  ["Schnittstelle zwischen Abteilungen", "Wir verbinden Einkauf, Zoll, Buchhaltung, Geschäftsführung und externe Fachberater über eine gemeinsame Arbeitsgrundlage."],
  ["Saubere Vorbereitung für Fachberater", "Bei Bedarf bereiten wir Informationen so auf, dass Rechts-, Steuer- oder Zollberater gezielt weiterarbeiten können."]
];

const workflow = [
  ["1. Orientierung", "Wir klären Ihre Importstruktur, vorhandene Datenquellen, betroffene Gesellschaften und den aktuellen CBAM-Stand."],
  ["2. Datenstruktur", "Wir analysieren Importdaten, KN-/CN-Codes, Ursprungsländer, Mengen, Lieferanten und erkennbare Datenlücken."],
  ["3. Auswertung", "Sie erhalten eine strukturierte Bewertung mit Prioritäten, offenen Punkten und konkreten nächsten Schritten."],
  ["4. Umsetzung", "Je nach Bedarf begleiten wir Registrierungsvorbereitung, Lieferantenkommunikation und laufende Datenpflege."]
];

export default function HomePage() {
  return (
    <>
      <section className="px-5 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              CBAM ist komplex. Wir machen daraus einen klaren Prozess.
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              CBAM-Compliance für Importeure
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Wir prüfen Ihre Importdaten, identifizieren CBAM-relevante Waren und bereiten Ihr Unternehmen strukturiert auf Registrierung, Lieferantendaten und laufende CBAM-Pflichten vor.
            </p>
            <p className="mt-5 max-w-2xl leading-8 text-slate-700">
              Für Unternehmen, die CBAM nicht erst kurz vor einer Frist sortieren möchten, sondern heute eine belastbare Daten- und Prozessgrundlage aufbauen wollen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/beratung">CBAM-Betroffenheit prüfen lassen</LinkButton>
              <LinkButton href="/leistungen" variant="secondary">
                CBAM-Pakete ansehen
              </LinkButton>
            </div>
            <div className="mt-8 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-2">
              <p className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">Strukturierte Analyse</p>
              <p className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">Lieferantendaten</p>
              <p className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">Registrierungsvorbereitung</p>
              <p className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">Laufende Begleitung</p>
            </div>
          </div>
          <div className="glass overflow-hidden p-3">
            <Image
              src="/images/import_hamburg.jpg"
              alt="Containerschiff im Hafen als Symbol für internationale Importprozesse"
              width={1920}
              height={960}
              priority
              className="aspect-[16/10] w-full rounded-[1.35rem] object-cover"
            />
          </div>
        </div>
      </section>

      <Section className="pt-8 lg:pt-10">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <Image
              src="/images/import.jpg"
              alt="Containerterminal mit Schiffen und Hafenlogistik"
              width={2048}
              height={1152}
              className="aspect-[16/7] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center rounded-[2rem] border border-slate-200 bg-white/80 p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Arbeitsweise</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy">
              Erst Daten ordnen, dann Entscheidungen treffen.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              CBAM wird schnell unübersichtlich, wenn Informationen in Zollunterlagen, Einkaufslisten, E-Mails und Lieferantenantworten verteilt liegen. Wir schaffen daraus eine prüfbare Struktur.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="CBAM betrifft mehr als nur den Zoll."
        text="CBAM bringt für Importeure neue Anforderungen an Daten, Lieferantenkommunikation, interne Zuständigkeiten und fristgerechte Vorbereitung. Viele Unternehmen wissen, dass CBAM relevant sein könnte, haben aber noch keine belastbare Datenstruktur, keine klare Lieferantenübersicht und keinen wiederholbaren internen Prozess."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="glass p-6">
              <h3 className="text-lg font-semibold text-navy">{problem.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{problem.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <IndustrySection />

      <Section
        eyebrow="Lösung"
        title="Wir bringen Struktur in Ihre CBAM-Vorbereitung."
        text="CBAM-Compliance.de unterstützt Importeure bei der datenbasierten Prüfung, organisatorischen Vorbereitung und laufenden Strukturierung ihrer CBAM-Pflichten. Der Schwerpunkt liegt auf klaren Auswertungen, verständlichen Handlungsempfehlungen und Prozessen, die im Arbeitsalltag funktionieren."
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-4">
            {orientationPoints.map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <div className="glass overflow-hidden p-3">
              <Image
                src="/images/computer.jpg"
                alt="Analyse von Daten an einem Laptop"
                width={3008}
                height={2177}
                className="aspect-[16/10] w-full rounded-[1.35rem] object-cover"
              />
            </div>
            <p className="rounded-3xl border border-slate-200 bg-white/75 p-6 leading-8 text-slate-600">
              Ziel ist keine abstrakte CBAM-Theorie, sondern eine Arbeitsgrundlage: Welche Waren sind relevant? Welche Lieferanten müssen liefern? Welche Informationen fehlen? Wer im Unternehmen muss was entscheiden?
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Datenbasis"
        title="Aus verteilten Informationen wird ein steuerbarer CBAM-Datenraum."
        text="Viele Unternehmen haben die notwendigen Informationen bereits in ihren Systemen. Die Herausforderung liegt darin, sie CBAM-fähig zu strukturieren, fehlende Angaben sichtbar zu machen und eine Grundlage für Berichtsvorbereitung, Lieferantenkommunikation und interne Entscheidungen zu schaffen."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dataAreas.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h3 className="text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Image
            src="/images/office.jpg"
            alt="Heller Arbeitsplatz für strukturierte Compliance-Arbeit"
            width={1920}
            height={1080}
            className="aspect-[16/8] rounded-[2rem] object-cover shadow-sm"
          />
          <Image
            src="/images/green-economy.jpg"
            alt="Windenergie als Kontext für CO2-Bepreisung und Klimapolitik"
            width={1920}
            height={1080}
            className="aspect-[16/8] rounded-[2rem] object-cover shadow-sm"
          />
        </div>
      </Section>

      <Section eyebrow="CBAM-Pakete" title="Pakete für unterschiedliche Ausgangslagen" centered>
        <div className="grid gap-6 lg:grid-cols-3">
          {mainServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Einordnung"
        title="Welcher Einstieg passt zu Ihrer Situation?"
        text="Der passende Umfang hängt davon ab, ob Sie zunächst Betroffenheit klären, Lieferantendaten strukturieren, einen internen Prozess aufbauen oder CBAM dauerhaft in Ihren Importablauf integrieren möchten."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {packageFit.map(([situation, recommendation, text]) => (
            <div key={situation} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Ausgangslage</p>
              <h3 className="mt-3 text-xl font-semibold text-navy">{situation}</h3>
              <p className="mt-4 leading-7 text-slate-600">{text}</p>
              <p className="mt-4 text-sm font-semibold text-navy">Empfohlener Einstieg: {recommendation}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="So läuft die Zusammenarbeit ab">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map(([title, text], index) => (
            <ProcessStep key={title} number={index + 1} title={title.replace(/^\d+\.\s/, "")} text={text} />
          ))}
        </div>
      </Section>

      <Section title="Für wen ist CBAM-Compliance.de geeignet?">
        <div className="grid gap-4 md:grid-cols-2">
          {targetGroups.map((item) => (
            <div key={item} className="flex gap-4 rounded-3xl border border-slate-200 bg-white/75 p-5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <p className="font-medium leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Warum CBAM-Compliance.de?">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, text]) => (
            <div key={title} className="glass p-6">
              <h3 className="font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Praxis"
        title="Fallstudien aus Analyse, Berichtsvorbereitung und Datenstrukturierung"
        text="Unsere Fallstudien zeigen bewusst keine überzogenen Versprechen. Sie zeigen, wie Importdaten strukturiert, Berichtsgrundlagen erstellt und offene Händler- oder Lieferantenverifizierungen nachgehalten wurden."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="glass overflow-hidden p-3">
            <Image
              src="/images/compliance.jpg"
              alt="Beratungssituation mit Unterlagen und Datenanalyse"
              width={1920}
              height={960}
              className="aspect-[16/10] w-full rounded-[1.35rem] object-cover"
            />
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-navy">Von der Datensammlung zur handlungsfähigen Übersicht</h3>
            <p className="mt-4 leading-8 text-slate-600">
              In der Praxis geht es häufig zuerst um Ordnung: Welche Daten liegen vor? Welche Lieferanten fehlen? Welche Berichte können vorbereitet werden? Welche Punkte müssen vor der Regelphase weiter geprüft werden?
            </p>
            <LinkButton href="/fallstudien" className="mt-6">
              Fallstudien ansehen
            </LinkButton>
          </div>
        </div>
      </Section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">CBAM-Kostenrechner 2026</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Mögliche CBAM-Zertifikatskosten grob abschätzen
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Der Kostenrechner nutzt hinterlegte Daten zu CN-Codes, Ländern, Standardwerten und Benchmarks als Orientierung. Er ersetzt keine fachliche Bewertung, hilft aber, Größenordnungen und Datenbedarf früh sichtbar zu machen.
            </p>
            <LinkButton href="/cbam-kostenrechner" className="mt-6">
              Kostenrechner öffnen
            </LinkButton>
          </div>
          <Image
            src="/images/computer.jpg"
            alt="Datenauswertung für eine erste CBAM-Kostenschätzung"
            width={3008}
            height={2177}
            className="aspect-[16/10] rounded-[1.5rem] object-cover"
          />
        </div>
      </section>

      <CTASection />

      <Section title="Häufige Fragen" centered>
        <FAQ items={faqItems} />
      </Section>
    </>
  );
}
