"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import type { CbamSector } from "@/lib/cbamAssessment";

const inputClass =
  "focus-ring mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300";

const sectors: { value: CbamSector; label: string; hint: string }[] = [
  { value: "iron_steel", label: "Eisen & Stahl", hint: "Stahlwaren, Rohre, Profile, Schrauben, Halbzeuge" },
  { value: "aluminium", label: "Aluminium", hint: "Aluminiumwaren, Profile, Bleche, Komponenten" },
  { value: "cement", label: "Zement", hint: "Zement, Klinker und zementnahe Waren" },
  { value: "fertilizers", label: "Düngemittel", hint: "Stickstoffdünger und verwandte Positionen" },
  { value: "hydrogen", label: "Wasserstoff", hint: "Wasserstoffimporte" },
  { value: "electricity", label: "Strom", hint: "Stromimporte aus Drittstaaten" },
  { value: "mixed", label: "Gemischte Produkte", hint: "Produkte mit möglichen Stahl-/Aluminiumanteilen" },
  { value: "unknown", label: "Noch unklar", hint: "Codes oder Materialbereiche sind noch nicht geprüft" }
];

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; reportId: string; headline: string; score: number; summary: string }
  | { status: "error"; message: string };

export function CbamAssessmentCalculator() {
  const router = useRouter();
  const [selectedSectors, setSelectedSectors] = useState<CbamSector[]>(["unknown"]);
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const selectedCount = selectedSectors.length;
  const progressText = useMemo(() => {
    if (selectedCount === 0) return "Keine Warengruppe ausgewählt";
    if (selectedCount === 1) return "1 Warengruppe ausgewählt";
    return `${selectedCount} Warengruppen ausgewählt`;
  }, [selectedCount]);

  function toggleSector(sector: CbamSector) {
    setSelectedSectors((current) => {
      if (current.includes(sector)) {
        const next = current.filter((item) => item !== sector);
        return next.length > 0 ? next : ["unknown"];
      }

      const withoutUnknown = sector === "unknown" ? [] : current.filter((item) => item !== "unknown");
      return [...withoutUnknown, sector];
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      contactName: String(formData.get("contactName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      importsFromThirdCountries: String(formData.get("importsFromThirdCountries") ?? "unknown"),
      sectors: selectedSectors,
      annualMassTonnes: String(formData.get("annualMassTonnes") ?? ""),
      cnCodes: String(formData.get("cnCodes") ?? ""),
      originCountries: String(formData.get("originCountries") ?? ""),
      hasSupplierData: String(formData.get("hasSupplierData") ?? "unknown"),
      hasEmissionData: String(formData.get("hasEmissionData") ?? "unknown"),
      hasCbamProcess: String(formData.get("hasCbamProcess") ?? "no"),
      hasAuthorizedDeclarant: String(formData.get("hasAuthorizedDeclarant") ?? "unknown"),
      mixedProducts: String(formData.get("mixedProducts") ?? "unknown"),
      notes: String(formData.get("notes") ?? "")
    };

    try {
      const response = await fetch("/api/cbam-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Der Bericht konnte nicht versendet werden.");
      }

      setState({
        status: "success",
        reportId: data.reportId,
        headline: data.headline,
        score: data.score,
        summary: data.summary
      });
      form.reset();
      setSelectedSectors(["unknown"]);
      router.push("/danke?typ=betroffenheitsanalyse");
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Der Bericht konnte nicht versendet werden."
      });
    }
  }

  return (
    <section id="cbam-pruefen" className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-navy p-7 text-white sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9fd1c3]">CBAM-Schnellprüfung</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Betroffenheit automatisch einschätzen</h2>
          <p className="mt-5 leading-8 text-slate-200">
            Geben Sie die wichtigsten Eckdaten ein. Sie erhalten einen professionellen PDF-Prüfbericht per E-Mail mit Score,
            Risikobereichen, Daten-Checkliste und nächsten Schritten.
          </p>
          <div className="mt-8 grid gap-3 text-sm">
            {["Auswertung nach Warenbereich, Drittstaatenbezug und Menge", "PDF-Bericht als Management-taugliche Grundlage", "E-Mail-Versand direkt an die angegebene Adresse"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-slate-200">
            <p className="font-semibold text-white">Score-Einordnung</p>
            <p className="mt-2">0-29 Punkte: geringe Relevanz nach Angaben.</p>
            <p>30-61 Punkte: mögliche Relevanz mit Klärungsbedarf.</p>
            <p>62-100 Punkte: hohe CBAM-Relevanz wahrscheinlich.</p>
          </div>
          <p className="mt-7 text-xs leading-6 text-slate-300">
            Hinweis: Die Schnellprüfung ist eine automatisierte Ersteinschätzung und ersetzt keine Rechts-, Steuer- oder Zollberatung.
          </p>
        </div>

        <form className="grid gap-6 p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-navy">
              Ansprechpartner
              <input className={inputClass} name="contactName" autoComplete="name" required placeholder="Max Mustermann" />
            </label>
            <label className="text-sm font-medium text-navy">
              Unternehmen
              <input className={inputClass} name="company" autoComplete="organization" required placeholder="Muster GmbH" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-navy">
              E-Mail für PDF-Bericht
              <input className={inputClass} name="email" type="email" autoComplete="email" required placeholder="name@unternehmen.de" />
            </label>
            <label className="text-sm font-medium text-navy">
              Telefon optional
              <input className={inputClass} name="phone" type="tel" autoComplete="tel" placeholder="+49 ..." />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-navy">
              Importieren Sie aus Nicht-EU-Ländern?
              <select className={inputClass} name="importsFromThirdCountries" required defaultValue="unknown">
                <option value="yes">Ja</option>
                <option value="no">Nein</option>
                <option value="unknown">Noch unklar</option>
              </select>
            </label>
            <label className="text-sm font-medium text-navy">
              Jahresmenge potenzieller CBAM-Waren in Tonnen
              <input className={inputClass} name="annualMassTonnes" type="number" min="0" step="0.01" placeholder="z. B. 75" />
            </label>
          </div>

          <fieldset>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <legend className="text-sm font-semibold text-navy">Welche Warenbereiche können betroffen sein?</legend>
              <span className="text-xs font-medium text-slate-500">{progressText}</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {sectors.map((sector) => {
                const checked = selectedSectors.includes(sector.value);
                return (
                  <button
                    key={sector.value}
                    type="button"
                    onClick={() => toggleSector(sector.value)}
                    className={`focus-ring rounded-2xl border p-4 text-left transition ${
                      checked ? "border-accent bg-[#eef6f3] text-navy" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                    aria-pressed={checked}
                  >
                    <span className="block font-semibold">{sector.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{sector.hint}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-navy">
              Bekannte KN-/CN-Codes
              <input className={inputClass} name="cnCodes" placeholder="z. B. 7308, 7604, 2523" />
            </label>
            <label className="text-sm font-medium text-navy">
              Ursprungsländer
              <input className={inputClass} name="originCountries" placeholder="z. B. Türkei, China, Indien" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-navy">
              Lieferantendaten vorhanden?
              <select className={inputClass} name="hasSupplierData" required defaultValue="unknown">
                <option value="yes">Ja, strukturiert</option>
                <option value="partial">Teilweise</option>
                <option value="no">Nein</option>
                <option value="unknown">Unklar</option>
              </select>
            </label>
            <label className="text-sm font-medium text-navy">
              Emissionsdaten vorhanden?
              <select className={inputClass} name="hasEmissionData" required defaultValue="unknown">
                <option value="yes">Ja, belastbar</option>
                <option value="partial">Teilweise</option>
                <option value="no">Nein</option>
                <option value="unknown">Unklar</option>
              </select>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className="text-sm font-medium text-navy">
              Interner CBAM-Prozess
              <select className={inputClass} name="hasCbamProcess" required defaultValue="no">
                <option value="yes">Vorhanden</option>
                <option value="partial">Teilweise</option>
                <option value="no">Noch nicht</option>
              </select>
            </label>
            <label className="text-sm font-medium text-navy">
              CBAM-Anmelderstatus
              <select className={inputClass} name="hasAuthorizedDeclarant" required defaultValue="unknown">
                <option value="yes">Vorhanden</option>
                <option value="applied">Beantragt</option>
                <option value="no">Nein</option>
                <option value="unknown">Unklar</option>
              </select>
            </label>
            <label className="text-sm font-medium text-navy">
              Teil-/Mischprodukte?
              <select className={inputClass} name="mixedProducts" required defaultValue="unknown">
                <option value="yes">Ja</option>
                <option value="no">Nein</option>
                <option value="unknown">Unklar</option>
              </select>
            </label>
          </div>

          <label className="text-sm font-medium text-navy">
            Zusätzliche Hinweise
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              name="notes"
              placeholder="z. B. typische Waren, offene Fragen, Datenlage, Lieferantenstruktur"
            />
          </label>

          <label className="flex gap-3 text-sm leading-6 text-slate-600">
            <input className="focus-ring mt-1 h-4 w-4 rounded border-slate-300 text-navy" type="checkbox" required />
            <span>Ich stimme zu, dass meine Angaben zur Erstellung und Zusendung des CBAM-Prüfberichts verarbeitet werden.</span>
          </label>

          {state.status === "error" && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">{state.message}</div>
          )}

          {state.status === "success" && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
              <p className="font-semibold">{state.headline}</p>
              <p className="mt-1">Score: {state.score}/100. Bericht {state.reportId} wurde per E-Mail versendet.</p>
              <p className="mt-2">{state.summary}</p>
              <p className="mt-2 font-medium">
                {state.score >= 62
                  ? "Einordnung: hohe CBAM-Relevanz wahrscheinlich."
                  : state.score >= 30
                    ? "Einordnung: mögliche CBAM-Relevanz mit Klärungsbedarf."
                    : "Einordnung: geringe CBAM-Relevanz nach Ihren Angaben."}
              </p>
            </div>
          )}

          <Button type="submit" disabled={state.status === "loading"} className="w-full sm:w-fit">
            {state.status === "loading" ? "Bericht wird erstellt ..." : "Prüfbericht per E-Mail erhalten"}
          </Button>
        </form>
      </div>
    </section>
  );
}
