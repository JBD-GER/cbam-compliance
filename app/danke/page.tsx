import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createSeoMetadata({
  title: "Vielen Dank",
  description: "Ihre Anfrage ist eingegangen und wird bearbeitet.",
  path: "/danke",
  image: "/images/office.jpg"
  }),
  robots: {
    index: false,
    follow: false
  }
};

const messages = {
  kontakt: {
    eyebrow: "Anfrage eingegangen",
    title: "Vielen Dank für Ihre Anfrage.",
    text: "Ihre Nachricht wurde übermittelt und wird bearbeitet. Wir melden uns zeitnah mit einer Einschätzung zum weiteren Vorgehen."
  },
  kostenrechner: {
    eyebrow: "Dokument wird versendet",
    title: "Ihr CBAM-Kostenergebnis ist auf dem Weg.",
    text: "Die Anfrage ist eingegangen. Das Ergebnisdokument wird erstellt, per E-Mail versendet und anschließend geprüft."
  },
  betroffenheitsanalyse: {
    eyebrow: "Prüfbericht wird versendet",
    title: "Ihre CBAM-Betroffenheitsanalyse ist eingegangen.",
    text: "Der Prüfbericht wird erstellt und an die angegebene E-Mail-Adresse gesendet. Die Anfrage wird anschließend bearbeitet."
  }
} as const;

type ThankYouPageProps = {
  searchParams?: Promise<{ typ?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const key = params?.typ;
  const message = key && key in messages ? messages[key as keyof typeof messages] : messages.kontakt;

  return (
    <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-navy p-8 text-white sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9fd1c3]">{message.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Danke.</h1>
            <p className="mt-6 leading-8 text-slate-200">
              CBAM-Anfragen enthalten oft sensible Datenpunkte zu Importen, Warengruppen und Lieferanten. Wir behandeln Ihre Angaben strukturiert und prüfen die nächsten sinnvollen Schritte.
            </p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="inline-flex rounded-full bg-[#eef6f3] px-4 py-2 text-sm font-semibold text-accent">
              Eingang bestätigt
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{message.title}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{message.text}</p>

            <div className="mt-8 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Eingang erfasst</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Bearbeitung gestartet</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Rückmeldung folgt</div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/">Zur Startseite</LinkButton>
              <LinkButton href="/ratgeber" variant="secondary">
                CBAM-Ratgeber lesen
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
