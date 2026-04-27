export const fullLegalNotice =
  "CBAM-Compliance.de erbringt keine Rechts-, Steuer- oder Zollberatung. Unsere Unterstützung umfasst die Analyse und Strukturierung von Importdaten, die organisatorische Vorbereitung von CBAM-Prozessen, die Lieferantenkommunikation sowie die Aufbereitung relevanter Informationen. Die finale rechtliche, steuerliche oder zollrechtliche Bewertung erfolgt bei Bedarf durch Ihre Rechts-, Steuer- oder Zollberatung.";

export function LegalNotice() {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-50/80 p-6 text-center text-sm leading-7 text-slate-600">
      <p className="font-semibold text-navy">Rechtlicher Hinweis</p>
      <p className="mt-2">{fullLegalNotice}</p>
    </div>
  );
}
