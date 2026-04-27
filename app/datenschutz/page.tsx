import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Datenschutz",
  description: "Datenschutzhinweise von CBAM-Compliance.de zur Verarbeitung von Kontaktdaten und Anfragen.",
  path: "/datenschutz",
  image: "/images/office.jpg"
});

export default function PrivacyPage() {
  return (
    <Section eyebrow="Rechtliches" title="Datenschutz" text="Informationen zur Verarbeitung personenbezogener Daten bei Nutzung von CBAM-Compliance.de.">
      <div className="grid gap-6">
        <article className="glass space-y-6 p-6 leading-8 text-slate-600">
          <div>
            <h2 className="text-xl font-semibold text-navy">Verantwortliche Stelle</h2>
            <p className="mt-2">
              Flaaq Holding GmbH, Großer Kamp 5a, 31633 Leese. Weitere Kontaktangaben entnehmen Sie bitte dem Impressum.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy">Verarbeitung von Kontaktdaten</h2>
            <p className="mt-2">
              Wenn Sie uns über das Kontaktformular kontaktieren, verarbeiten wir die von Ihnen eingegebenen Angaben zur Bearbeitung Ihrer Anfrage. Dazu können Name, Unternehmen, E-Mail-Adresse, Telefonnummer, ausgewählte Leistung und Nachricht gehören.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy">Zweck der Verarbeitung</h2>
            <p className="mt-2">
              Die Verarbeitung erfolgt zur Kommunikation, Anfragebearbeitung und Vorbereitung möglicher Leistungen im Zusammenhang mit CBAM-Analyse, Datenstrukturierung und organisatorischer Begleitung.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy">Speicherdauer</h2>
            <p className="mt-2">
              Personenbezogene Daten werden nur so lange gespeichert, wie es für die Bearbeitung der Anfrage, gesetzliche Aufbewahrungspflichten oder berechtigte Dokumentationsinteressen erforderlich ist.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy">Ihre Rechte</h2>
            <p className="mt-2">
              Betroffene Personen können Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und weitere gesetzlich vorgesehene Rechte geltend machen.
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}
