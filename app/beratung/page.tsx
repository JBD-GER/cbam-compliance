import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "CBAM-Beratung anfragen",
  description:
    "Kontakt aufnehmen für CBAM-Betroffenheitsanalyse, CBAM-Readiness, Lieferantendaten, Registrierungsvorbereitung oder laufende CBAM-Begleitung.",
  path: "/beratung",
  image: "/images/team.png"
});

export default function ConsultingPage() {
  return (
    <Section
      eyebrow="Beratung"
      title="Kontakt aufnehmen"
      text="Beschreiben Sie kurz Ihre Importstruktur und den aktuellen CBAM-Stand. Wir melden uns mit einer ersten Einschätzung zum sinnvollen Vorgehen."
    >
      <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/team.png"
          alt="Teamarbeit in einer Beratungssituation"
          width={1920}
          height={1080}
          priority
          className="aspect-[16/8] w-full object-cover sm:aspect-[16/7] lg:aspect-[16/6.8]"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
        <ContactForm />
        <aside className="space-y-5">
          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-navy">Was im Erstgespräch geklärt wird</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <li>Importvolumen und relevante Warengruppen</li>
              <li>Vorhandene KN-/CN-Code- und Lieferantendaten</li>
              <li>Aktueller Stand der CBAM-Vorbereitung</li>
              <li>Sinnvoller Umfang der nächsten Analyse</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-navy">Hilfreich für die Anfrage</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Wenn vorhanden, nennen Sie bitte relevante Warengruppen, typische Ursprungsländer, ungefähre Importmengen und ob bereits Lieferanten- oder Emissionsdaten vorliegen.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
