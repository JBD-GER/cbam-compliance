"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [data, setData] = useState<CalculatorData | null>(null);
  const [rows, setRows] = useState<CalculatorRow[]>([emptyRow(1)]);
  const [loadError, setLoadError] = useState("");
  const [year, setYear] = useState(2026);
  const [phaseOutInput, setPhaseOutInput] = useState(97.5);

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

      <div className="border-t border-slate-200 p-5 sm:p-6">
        <button type="button" className="focus-ring inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/15 hover:bg-[#35685b]" onClick={addRow}>
          Produkt hinzufügen
        </button>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Metric label="Nettomasse" value={`${formatNumber(totals.mass)} t`} />
          <Metric label="Gesamtemissionen" value={`${formatNumber(totals.grossEmissions)} tCO2e`} />
          <Metric label={`Phase-Out ${year}`} value={`${formatNumber(phaseOut)} %`} />
          <Metric label={`CBAM-Kosten ${year}`} value={formatEuro(totals.cost)} highlight />
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Datenbasis: Default Values aus <span className="font-semibold">DVs as adopted_v20260204</span> und Benchmarks aus{" "}
          <span className="font-semibold">CBAM Benchmarks_20260206</span>. Die vereinfachte Kostenschätzung folgt dem im Markt üblichen Estimator-Ansatz:
          max(SEE 2026 - Benchmark, 0) x Nettomasse x Zertifikatskosten. Der Phase-Out wird separat ausgewiesen.
        </div>
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
