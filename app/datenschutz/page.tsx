import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Datenschutz",
  description: "Datenschutzhinweise von CBAM-Compliance.de zu Kontaktformularen, Hosting, Supabase, E-Mail-Versand, Cookies und Google Ads Conversion Tracking.",
  path: "/datenschutz",
  image: "/images/office.jpg"
});

export default function PrivacyPage() {
  return (
    <Section eyebrow="Rechtliches" title="Datenschutz" text="Informationen zur Verarbeitung personenbezogener Daten bei Nutzung von CBAM-Compliance.de.">
      <div className="grid gap-6">
        <article className="glass space-y-8 p-6 leading-8 text-slate-600 sm:p-8">
          <div>
            <h2 className="text-xl font-semibold text-navy">Verantwortliche Stelle</h2>
            <p className="mt-2">
              Flaaq Holding GmbH, Großer Kamp 5a, 31633 Leese. Weitere Kontaktangaben entnehmen Sie bitte dem Impressum.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Allgemeines zur Datenverarbeitung</h2>
            <p className="mt-2">
              Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die Bearbeitung von Anfragen, die Erstellung angeforderter Dokumente oder die Auswertung unserer Werbemaßnahmen erforderlich ist. Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung vorvertraglicher Maßnahmen oder zur Bearbeitung Ihrer Anfrage erforderlich ist, Art. 6 Abs. 1 lit. f DSGVO bei berechtigten Interessen am sicheren und wirtschaftlichen Betrieb der Website sowie Art. 6 Abs. 1 lit. a DSGVO, sofern Sie eine Einwilligung erteilen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Aufruf der Website und Server-Logdaten</h2>
            <p className="mt-2">
              Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet, damit die Seite ausgeliefert und sicher betrieben werden kann. Dazu können IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene URL, Referrer-URL, Browsertyp, Betriebssystem, Geräteinformationen und technische Fehlerprotokolle gehören. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Hosting über Vercel</h2>
            <p className="mt-2">
              Diese Website wird über Vercel gehostet. Anbieter ist Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Vercel verarbeitet technische Zugriffsdaten, Server-Logdaten und Systemdaten, die für Bereitstellung, Performance, Sicherheit und Fehleranalyse der Website erforderlich sind. Mit Vercel können personenbezogene Daten auch in Drittländer, insbesondere die USA, übermittelt werden. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien im Sinne der DSGVO, insbesondere Standardvertragsklauseln, soweit erforderlich.
            </p>
            <p className="mt-2">
              Weitere Informationen finden Sie in den Datenschutz- und Auftragsverarbeitungsunterlagen von Vercel:{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
                vercel.com/legal/privacy-policy
              </a>{" "}
              und{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://vercel.com/legal/dpa" target="_blank" rel="noreferrer">
                vercel.com/legal/dpa
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Verarbeitung von Kontaktdaten</h2>
            <p className="mt-2">
              Wenn Sie uns über das Kontaktformular kontaktieren, verarbeiten wir die von Ihnen eingegebenen Angaben zur Bearbeitung Ihrer Anfrage. Dazu können Name, Unternehmen, E-Mail-Adresse, Telefonnummer, ausgewählte Leistung und Nachricht gehören.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">CBAM-Rechner und PDF-Dokumente</h2>
            <p className="mt-2">
              Wenn Sie den CBAM-Kostenrechner oder die CBAM-Betroffenheitsanalyse nutzen und ein Ergebnisdokument per E-Mail anfordern, verarbeiten wir die eingegebenen Formular- und Berechnungsdaten. Dazu können Ansprechpartner, Unternehmen, E-Mail-Adresse, Import- und Warendaten, Mengen, Warengruppen, Ursprungsländer, CN-/KN-Codes, Lieferanten- und Emissionsangaben sowie Freitexthinweise gehören. Die Daten werden zur Erstellung des PDF-Dokuments, zum Versand per E-Mail und zur internen Nachvollziehbarkeit der Anfrage verarbeitet.
            </p>
            <p className="mt-2">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Sie das Ergebnisdokument anfordern, sowie Art. 6 Abs. 1 lit. f DSGVO für berechtigte Dokumentations- und Sicherheitsinteressen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Datenverwaltung mit Supabase</h2>
            <p className="mt-2">
              Zur technischen Verwaltung und Speicherung von Daten kann Supabase eingesetzt werden. Anbieter ist Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992. In Supabase können insbesondere Anfrage-, Formular-, Rechner- und Dokumentationsdaten gespeichert werden, soweit dies für Bearbeitung, Nachvollziehbarkeit und technische Bereitstellung erforderlich ist.
            </p>
            <p className="mt-2">
              Je nach Projektkonfiguration kann Supabase Infrastruktur in verschiedenen Regionen nutzen. Soweit personenbezogene Daten außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums verarbeitet werden, erfolgt dies auf Grundlage geeigneter Garantien im Sinne der DSGVO. Weitere Informationen finden Sie unter{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://supabase.com/privacy" target="_blank" rel="noreferrer">
                supabase.com/privacy
              </a>{" "}
              und{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://supabase.com/legal/dpa" target="_blank" rel="noreferrer">
                supabase.com/legal/dpa
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">E-Mail-Versand über Resend</h2>
            <p className="mt-2">
              Für den Versand von Kontaktbestätigungen und PDF-Dokumenten nutzen wir Resend. Anbieter ist Resend, Inc. Beim E-Mail-Versand werden insbesondere Empfängeradresse, Absender, Betreff, Inhalt der Nachricht, technische Versanddaten und gegebenenfalls PDF-Anhänge verarbeitet. Die Verarbeitung erfolgt zur Zustellung der angeforderten Kommunikation auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO beziehungsweise Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p className="mt-2">
              Weitere Informationen finden Sie unter{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://resend.com/legal/dpa" target="_blank" rel="noreferrer">
                resend.com/legal/dpa
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Cookies und Consent-Banner</h2>
            <p className="mt-2">
              Wir verwenden ein Consent-Banner, über das Sie nicht notwendige Verarbeitungen steuern können. Die getroffene Auswahl wird lokal in Ihrem Browser gespeichert, damit die Abfrage nicht bei jedem Seitenaufruf erneut erscheint. Notwendige technische Speicherungen sind für den Betrieb der Website erforderlich. Statistik- und Marketing-Verarbeitungen erfolgen nur, wenn Sie diese aktiv auswählen.
            </p>
            <p className="mt-2">
              Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die gespeicherte Cookie-Auswahl im Browser löschen und die Website erneut aufrufen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Google Ads Conversion Tracking und Consent Mode</h2>
            <p className="mt-2">
              Wir können Google Ads Conversion Tracking einsetzen, um die Wirksamkeit unserer Werbeanzeigen zu messen. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Wenn Sie über eine Google-Anzeige auf unsere Website gelangen und in Marketing-Cookies einwilligen, kann Google erkennen, ob anschließend eine relevante Aktion erfolgt, zum Beispiel eine Kontaktanfrage oder die Anforderung eines Ergebnisdokuments.
            </p>
            <p className="mt-2">
              Dabei können unter anderem Cookie-IDs, Klick-IDs, technische Geräte- und Browserinformationen, aufgerufene Seiten, Zeitpunkt des Besuchs und Conversion-Ereignisse verarbeitet werden. Wir nutzen Google Consent Mode v2. Standardmäßig werden die Consent-Signale für <span className="font-semibold text-navy">ad_storage</span>, <span className="font-semibold text-navy">analytics_storage</span>, <span className="font-semibold text-navy">ad_user_data</span> und <span className="font-semibold text-navy">ad_personalization</span> auf „denied“ gesetzt. Erst nach Ihrer Einwilligung werden die entsprechenden Signale auf „granted“ aktualisiert.
            </p>
            <p className="mt-2">
              Google kann Daten auch auf Servern außerhalb der EU verarbeiten. Rechtsgrundlage für Google Ads Conversion Tracking ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Weitere Informationen finden Sie unter{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                policies.google.com/privacy
              </a>{" "}
              und in den Hinweisen zum Consent Mode unter{" "}
              <a className="font-semibold text-accent hover:text-[#35685b]" href="https://support.google.com/google-ads/answer/13802165" target="_blank" rel="noreferrer">
                support.google.com/google-ads/answer/13802165
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Zweck der Verarbeitung</h2>
            <p className="mt-2">
              Die Verarbeitung erfolgt zur Kommunikation, Anfragebearbeitung, Erstellung angeforderter Ergebnisdokumente, Vorbereitung möglicher Leistungen im Zusammenhang mit CBAM-Analyse, Datenstrukturierung und organisatorischer Begleitung sowie zur technischen Sicherung und Verbesserung der Website.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy">Speicherdauer</h2>
            <p className="mt-2">
              Personenbezogene Daten werden nur so lange gespeichert, wie es für die Bearbeitung der Anfrage, die Erstellung angeforderter Dokumente, gesetzliche Aufbewahrungspflichten oder berechtigte Dokumentationsinteressen erforderlich ist. Technische Logdaten werden grundsätzlich nur für einen begrenzten Zeitraum gespeichert, soweit keine längere Speicherung zur Aufklärung von Sicherheitsvorfällen erforderlich ist.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy">Ihre Rechte</h2>
            <p className="mt-2">
              Betroffene Personen können Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und weitere gesetzlich vorgesehene Rechte geltend machen.
            </p>
            <p className="mt-2">
              Soweit eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}
