"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CnIndexItem = {
  cn: string;
  category: string;
  description: string;
  benchmark: number | null;
};

type ProductData = {
  cn: string;
  category: string;
  description: string;
  direct: number | null;
  indirect: number | null;
  total: number | null;
  dv2026: number | null;
  dv2027: number | null;
  dv2028: number | null;
  route: string;
  benchmark: number | null;
};

type CalculatorData = {
  generatedAt: string;
  certificatePrice2026: number;
  cbamFactor2026: number;
  freeAllocation2026: number;
  countries: string[];
  cnIndex: CnIndexItem[];
  productsByCountry: Record<string, ProductData[]>;
};

type CalculatorRow = {
  id: number;
  country: string;
  cn: string;
  category: string;
  description: string;
  mass: number;
  see: number;
  benchmark: number;
  route: string;
};

type MailState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; reportId: string; totalCost: number }
  | { status: "error"; message: string };

const phaseOutByYear: Record<number, number> = {
  2026: 97.5,
  2027: 95,
  2028: 90,
  2029: 77.5,
  2030: 51.5,
  2031: 38.5,
  2032: 25,
  2033: 12.5,
  2034: 0
};

function emptyRow(id = Date.now()): CalculatorRow {
  return {
    id,
    country: "",
    cn: "",
    category: "",
    description: "",
    mass: 0,
    see: 0,
    benchmark: 0,
    route: ""
  };
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function normalizeCn(value: string) {
  return value.replace(/\s/g, "").trim();
}

function findProduct(data: CalculatorData | null, country: string, cn: string) {
  if (!data || !country || !cn) {
    return null;
  }

  const cleanCn = normalizeCn(cn);
  const products = data.productsByCountry[country] ?? [];
  return products.find((item) => item.cn === cleanCn) ?? null;
}

export function CostCalculator() {
  const router = useRouter();
  const [data, setData] = useState<CalculatorData | null>(null);
  const [rows, setRows] = useState<CalculatorRow[]>([emptyRow(1)]);
  const [loadError, setLoadError] = useState("");
  const [year, setYear] = useState(2026);
  const [phaseOutInput, setPhaseOutInput] = useState(97.5);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [mailState, setMailState] = useState<MailState>({ status: "idle" });

  useEffect(() => {
    fetch("/data/cbam-calculator-data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("CBAM-Daten konnten nicht geladen werden.");
        }
        return response.json() as Promise<CalculatorData>;
      })
      .then(setData)
      .catch((error: Error) => setLoadError(error.message));
  }, []);

  const certificatePrice = data?.certificatePrice2026 || 75.36;
  const phaseOut = phaseOutInput;

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        const grossEmissions = row.mass * row.see;
        const benchmarkEmissions = row.mass * row.benchmark;
        const chargeableEmissions = Math.max(grossEmissions - benchmarkEmissions, 0);
        const cost = chargeableEmissions * certificatePrice;

        acc.mass += row.mass;
        acc.grossEmissions += grossEmissions;
        acc.chargeableEmissions += chargeableEmissions;
        acc.cost += cost;
        return acc;
      },
      { mass: 0, grossEmissions: 0, chargeableEmissions: 0, cost: 0 }
    );
  }, [certificatePrice, rows]);

  function hydrateRow(row: CalculatorRow, patch: Partial<CalculatorRow>) {
    const next = { ...row, ...patch };
    const product = findProduct(data, next.country, next.cn);
    if (!product) {
      const indexItem = data?.cnIndex.find((item) => item.cn === normalizeCn(next.cn));
      return {
        ...next,
        cn: normalizeCn(next.cn),
        category: indexItem?.category ?? next.category,
        description: indexItem?.description ?? next.description,
        benchmark: indexItem?.benchmark ?? next.benchmark
      };
    }

    return {
      ...next,
      cn: product.cn,
      category: product.category,
      description: product.description,
      see: product.dv2026 ?? product.total ?? next.see,
      benchmark: product.benchmark ?? next.benchmark,
      route: product.route
    };
  }

  function updateRow(id: number, patch: Partial<CalculatorRow>) {
    setRows((current) => current.map((row) => (row.id === id ? hydrateRow(row, patch) : row)));
  }

  function addRow() {
    setRows((current) => [...current, emptyRow()]);
  }

  function handleYearChange(nextYear: number) {
    setYear(nextYear);
    setPhaseOutInput(phaseOutByYear[nextYear] ?? phaseOutInput);
  }

  function removeRow(id: number) {
    setRows((current) => (current.length === 1 ? current : current.filter((row) => row.id !== id)));
  }

  async function sendCostReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMailState({ status: "loading" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      contactName: String(formData.get("contactName") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      year,
      certificatePrice,
      phaseOut,
      rows: rows.map((row) => ({
        country: row.country,
        cn: row.cn,
        category: row.category,
        description: row.description,
        mass: row.mass,
        see: row.see,
        benchmark: row.benchmark,
        route: row.route
      }))
    };

    try {
      const response = await fetch("/api/cbam-cost-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Das Kostenergebnis konnte nicht versendet werden.");
      }

      setMailState({ status: "success", reportId: result.reportId, totalCost: result.totalCost });
      form.reset();
      router.push("/danke?typ=kostenrechner");
    } catch (error) {
      setMailState({
        status: "error",
        message: error instanceof Error ? error.message : "Das Kostenergebnis konnte nicht versendet werden."
      });
    }
  }

  return (
    <div className="glass overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">CBAM-Kostenrechner 2026</p>
            <h2 className="mt-2 text-2xl font-semibold text-navy">Kosten nach CN-Code, Land und Nettomasse schätzen</h2>
          </div>
        </div>
        {loadError && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{loadError}</p>}
      </div>

      <div className="grid gap-4 border-b border-slate-200 px-5 py-5 sm:grid-cols-3 sm:px-6">
        <label className="text-sm font-semibold text-navy">
          Jahr
          <select className="field mt-2" value={year} onChange={(event) => handleYearChange(Number(event.target.value))}>
            {Object.keys(phaseOutByYear).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <div className="text-sm font-semibold text-navy">
          Zertifikatskosten (EUR/tCO2e)
          <div className="field mt-2 bg-slate-50 font-semibold" aria-label="Zertifikatskosten">
            {formatNumber(certificatePrice)} EUR
          </div>
        </div>
        <div className="text-sm font-semibold text-navy">
          Phase-Out
          <div className="field mt-2 bg-slate-50 font-semibold" aria-label="Phase-Out">
            {formatNumber(phaseOutInput)} %
          </div>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <div className="hidden grid-cols-[1.05fr_1.05fr_1.25fr_0.85fr_0.9fr_0.9fr_0.75fr_0.55fr] gap-3 border-b border-slate-200 pb-3 text-xs font-semibold text-slate-950 lg:grid">
          <span>Kategorie</span>
          <span>CN-Code</span>
          <span>Land</span>
          <span>Nettomasse</span>
          <span>SEE 2026</span>
          <span>Benchmark</span>
          <span>Kosten</span>
          <span />
        </div>
        <div className="space-y-5 lg:space-y-0 lg:divide-y lg:divide-slate-100">
          {rows.map((row) => {
            const gross = row.mass * row.see;
            const benchmark = row.mass * row.benchmark;
            const cost = Math.max(gross - benchmark, 0) * certificatePrice;

            return (
              <div key={row.id} className="rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm lg:grid lg:grid-cols-[1.05fr_1.05fr_1.25fr_0.85fr_0.9fr_0.9fr_0.75fr_0.55fr] lg:gap-3 lg:border-0 lg:bg-transparent lg:px-0 lg:py-5 lg:shadow-none">
                <label className="block text-sm font-semibold text-navy lg:text-xs lg:text-slate-500">
                  Kategorie
                  <input className="field mt-2 bg-slate-50 lg:mt-1" value={row.category} readOnly placeholder="Automatisch" />
                  {row.route && <span className="mt-2 block text-xs font-normal text-slate-500">Route: {row.route}</span>}
                </label>
                <label className="mt-4 block text-sm font-semibold text-navy lg:mt-0 lg:text-xs lg:text-slate-500">
                  CN-Code
                  <input
                    className="field mt-2 font-semibold lg:mt-1"
                    list="cn-codes"
                    value={row.cn}
                    onChange={(event) => updateRow(row.id, { cn: event.target.value })}
                    placeholder="z. B. 72011011"
                  />
                  <span className="mt-2 block text-xs font-normal leading-5 text-slate-500">{row.description || "CN-Code eingeben oder auswählen"}</span>
                </label>
                <label className="mt-4 block text-sm font-semibold text-navy lg:mt-0 lg:text-xs lg:text-slate-500">
                  Land
                  <select className="field mt-2 lg:mt-1" value={row.country} onChange={(event) => updateRow(row.id, { country: event.target.value })}>
                    <option value="">Land auswählen</option>
                    {data?.countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </label>
                <label className="mt-4 block text-sm font-semibold text-navy lg:mt-0 lg:text-xs lg:text-slate-500">
                  Nettomasse (t)
                  <input
                    className="field mt-2 lg:mt-1"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Nettomasse"
                    value={row.mass || ""}
                    onChange={(event) => updateRow(row.id, { mass: Number(event.target.value) })}
                  />
                </label>
                <label className="mt-4 block text-sm font-semibold text-navy lg:mt-0 lg:text-xs lg:text-slate-500">
                  SEE 2026
                  <input
                    className="field mt-2 lg:mt-1"
                    type="number"
                    min="0"
                    step="0.001"
                    value={row.see || ""}
                    onChange={(event) => updateRow(row.id, { see: Number(event.target.value) })}
                  />
                </label>
                <label className="mt-4 block text-sm font-semibold text-navy lg:mt-0 lg:text-xs lg:text-slate-500">
                  Benchmark
                  <input
                    className="field mt-2 lg:mt-1"
                    type="number"
                    min="0"
                    step="0.001"
                    value={row.benchmark || ""}
                    onChange={(event) => updateRow(row.id, { benchmark: Number(event.target.value) })}
                  />
                </label>
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 lg:mt-0 lg:bg-transparent lg:p-0">
                  <p className="text-xs font-semibold text-slate-500 lg:hidden">Kosten</p>
                  <p className="mt-1 font-semibold text-navy lg:mt-7">{formatEuro(cost)}</p>
                </div>
                <div className="mt-4 lg:mt-6">
                  <button
                    type="button"
                    className="focus-ring w-full rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40 lg:w-auto"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                    aria-label="Produkt entfernen"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <datalist id="cn-codes">
          {data?.cnIndex.map((item) => (
            <option key={item.cn} value={item.cn}>
              {item.category} - {item.description}
            </option>
          ))}
        </datalist>
      </div>

      <div className="flex flex-col border-t border-slate-200 p-5 sm:p-6">
        <div className="order-1 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="focus-ring inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/15 hover:bg-[#35685b]" onClick={addRow}>
            Produkt hinzufügen
          </button>
          <button
            type="button"
            className="focus-ring inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy hover:border-navy/25"
            onClick={() => setShowEmailForm((current) => !current)}
          >
            Ergebnisse per E-Mail erhalten
          </button>
        </div>

        <div className="order-3 mt-6 grid gap-4 md:grid-cols-4">
          <Metric label="Nettomasse" value={`${formatNumber(totals.mass)} t`} />
          <Metric label="Gesamtemissionen" value={`${formatNumber(totals.grossEmissions)} tCO2e`} />
          <Metric label={`Phase-Out ${year}`} value={`${formatNumber(phaseOut)} %`} />
          <Metric label={`CBAM-Kosten ${year}`} value={formatEuro(totals.cost)} highlight />
        </div>

        <div className="order-4 mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Datenbasis: Default Values aus <span className="font-semibold">DVs as adopted_v20260204</span> und Benchmarks aus{" "}
          <span className="font-semibold">CBAM Benchmarks_20260206</span>. Die vereinfachte Kostenschätzung folgt dem im Markt üblichen Estimator-Ansatz:
          max(SEE 2026 - Benchmark, 0) x Nettomasse x Zertifikatskosten. Der Phase-Out wird separat ausgewiesen.
        </div>

        {showEmailForm && (
          <form className="order-2 mt-6 grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={sendCostReport}>
            <div>
              <h3 className="text-xl font-semibold text-navy">Offizielles Ergebnisdokument per E-Mail</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sie erhalten ein professionelles PDF mit Positionen, Annahmen, Summen und Hinweistext an die angegebene E-Mail-Adresse.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-sm font-semibold text-navy">
                Ansprechpartner
                <input className="field mt-2" name="contactName" autoComplete="name" required />
              </label>
              <label className="text-sm font-semibold text-navy">
                Unternehmen
                <input className="field mt-2" name="company" autoComplete="organization" required />
              </label>
              <label className="text-sm font-semibold text-navy">
                E-Mail
                <input className="field mt-2" name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <label className="flex gap-3 text-sm leading-6 text-slate-600">
              <input className="focus-ring mt-1 h-4 w-4 rounded border-slate-300 text-navy" type="checkbox" required />
              <span>
                Ich stimme zu, dass meine Angaben zur Erstellung und Zusendung des CBAM-Kostendokuments verarbeitet werden, und akzeptiere die{" "}
                <Link className="font-semibold text-navy underline underline-offset-4 hover:text-accent" href="/datenschutz">
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </label>
            {mailState.status === "error" && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">{mailState.message}</div>
            )}
            {mailState.status === "success" && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                Das Ergebnisdokument {mailState.reportId} wurde versendet. Gesamtschätzung: {formatEuro(mailState.totalCost)}.
              </div>
            )}
            <button
              type="submit"
              disabled={mailState.status === "loading"}
              className="focus-ring inline-flex w-full justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-[#132957] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
            >
              {mailState.status === "loading" ? "Dokument wird versendet ..." : "Ergebnisse per E-Mail erhalten"}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .field {
          border: 1px solid rgb(226 232 240);
          border-radius: 0.9rem;
          background: white;
          padding: 0.78rem 0.9rem;
          color: #132238;
          outline: none;
          width: 100%;
          min-width: 0;
        }

        .field:focus {
          border-color: #41796a;
          box-shadow: 0 0 0 3px rgba(65, 121, 106, 0.15);
        }
      `}</style>
    </div>
  );
}

function Metric({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tracking-tight ${highlight ? "text-accent" : "text-navy"}`}>{value}</p>
    </div>
  );
}
