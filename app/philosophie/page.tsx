import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Philosophie",
  description:
    "Wofür CBAM-Compliance.de steht: klare Daten, saubere Prozesse, vorsichtige Kommunikation und belastbare CBAM-Vorbereitung für Importeure.",
  path: "/philosophie",
  image: "/images/beratung.jpg"
});

const principles = [
  {
    title: "Struktur vor Aktionismus",
    text: "CBAM wird unübersichtlich, wenn Daten, Lieferanten und Verantwortlichkeiten nicht sauber getrennt werden. Wir beginnen deshalb mit einer belastbaren Struktur."
  },
  {
    title: "Daten statt Bauchgefühl",
    text: "Entscheidungen entstehen aus Importdaten, CN-Codes, Ursprungsländern, Mengen und nachvollziehbaren Lieferanteninformationen."
  },
  {
    title: "Vorsichtige Aussagen",
    text: "Wir versprechen keine rechtssichere Bewertung und keine garantierte Compliance. Wir schaffen die Grundlage, auf der interne Teams und Fachberater gezielt arbeiten können."
  },
  {
    title: "Abteilungsübergreifend denken",
    text: "CBAM betrifft Einkauf, Zoll, Finanzen und Geschäftsführung. Gute Vorbereitung verbindet diese Perspektiven in einem gemeinsamen Arbeitsprozess."
  }
];

const workflow = [
  "Importdaten aufnehmen und vereinheitlichen",
  "CBAM-relevante Waren und Lieferanten sichtbar machen",
  "Berichtsgrundlagen und Management-Übersichten erstellen",
  "Offene Händler- und Lieferantenverifizierungen nachhalten",
  "Informationen für Rechts-, Steuer- oder Zollberatung sauber vorbereiten"
];

export default function PhilosophyPage() {
  return (
    <>
      <Section
        eyebrow="Philosophie"
        title="Wofür wir stehen"
        text="CBAM-Compliance.de steht für eine ruhige, strukturierte und datenbasierte Vorbereitung von Importeuren. Unser Anspruch ist nicht, komplexe Pflichten kleinzureden, sondern sie in einen beherrschbaren Prozess zu übersetzen."
      >
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-5 leading-8 text-slate-600">
            <p>
              Gute CBAM-Vorbereitung beginnt mit sauberer Kommunikation: Welche Daten liegen vor, welche Informationen fehlen und welche Entscheidungen müssen vorbereitet werden?
            </p>
            <p>
              Wir arbeiten bewusst sachlich. Keine dramatisierenden Versprechen, keine Abkürzungen, sondern eine klare Struktur, die interne Teams und externe Fachberater nutzen können.
            </p>
          </div>
          <Image
            src="/images/beratung.jpg"
            alt="Beratungssituation als Symbol für strukturierte CBAM-Vorbereitung"
            width={1920}
            height={960}
            className="aspect-[16/9] rounded-[2rem] object-cover shadow-sm"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {principles.map((item) => (
            <article key={item.title} className="glass p-6">
              <h2 className="text-xl font-semibold text-navy">{item.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Arbeitsweise"
        title="Was gute CBAM-Vorbereitung ausmacht"
        text="Eine belastbare CBAM-Struktur entsteht nicht durch einzelne Dokumente, sondern durch wiederholbare Abläufe, klare Verantwortlichkeiten und nachvollziehbare Daten."
      >
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="glass p-6">
            <h2 className="text-2xl font-semibold text-navy">Unsere Rolle</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Wir arbeiten organisatorisch und datenbasiert. Wir analysieren, strukturieren, bereiten Berichte vor und schaffen Transparenz über offene Punkte. Die finale rechtliche, steuerliche oder zollrechtliche Bewertung erfolgt bei Bedarf durch Ihre entsprechenden Berater.
            </p>
          </div>
          <div className="space-y-4">
            {workflow.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">{index + 1}</span>
                <p className="self-center font-medium leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        title="Sie suchen eine klare CBAM-Arbeitsgrundlage?"
        text="Wir helfen, Daten, Lieferanteninformationen und Berichtsvorbereitung in eine belastbare Struktur zu bringen."
        button="Kontakt aufnehmen"
      />
    </>
  );
}
