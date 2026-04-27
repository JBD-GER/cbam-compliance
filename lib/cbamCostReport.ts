export type CostReportRow = {
  country: string;
  cn: string;
  category: string;
  description: string;
  mass: number;
  see: number;
  benchmark: number;
  route?: string;
};

export type CostReportInput = {
  email: string;
  company: string;
  contactName: string;
  year: number;
  certificatePrice: number;
  phaseOut: number;
  rows: CostReportRow[];
};

export type CostReportResult = {
  reportId: string;
  createdAt: string;
  totals: {
    mass: number;
    grossEmissions: number;
    benchmarkEmissions: number;
    chargeableEmissions: number;
    cost: number;
  };
  rows: Array<
    CostReportRow & {
      grossEmissions: number;
      benchmarkEmissions: number;
      chargeableEmissions: number;
      cost: number;
    }
  >;
  assumptions: string[];
  disclaimer: string;
};

export function normalizeCostReportInput(input: CostReportInput): CostReportInput {
  return {
    ...input,
    email: input.email.trim().toLowerCase(),
    company: input.company.trim(),
    contactName: input.contactName.trim(),
    certificatePrice: Number(input.certificatePrice) || 0,
    phaseOut: Number(input.phaseOut) || 0,
    rows: input.rows
      .map((row) => ({
        ...row,
        country: row.country.trim(),
        cn: row.cn.trim(),
        category: row.category.trim(),
        description: row.description.trim(),
        route: row.route?.trim(),
        mass: Number(row.mass) || 0,
        see: Number(row.see) || 0,
        benchmark: Number(row.benchmark) || 0
      }))
      .filter((row) => row.mass > 0 || row.cn || row.country || row.category)
  };
}

export function calculateCostReport(input: CostReportInput): CostReportResult {
  const normalized = normalizeCostReportInput(input);
  const rows = normalized.rows.map((row) => {
    const grossEmissions = row.mass * row.see;
    const benchmarkEmissions = row.mass * row.benchmark;
    const chargeableEmissions = Math.max(grossEmissions - benchmarkEmissions, 0);
    const cost = chargeableEmissions * normalized.certificatePrice;

    return {
      ...row,
      grossEmissions,
      benchmarkEmissions,
      chargeableEmissions,
      cost
    };
  });

  const totals = rows.reduce(
    (acc, row) => {
      acc.mass += row.mass;
      acc.grossEmissions += row.grossEmissions;
      acc.benchmarkEmissions += row.benchmarkEmissions;
      acc.chargeableEmissions += row.chargeableEmissions;
      acc.cost += row.cost;
      return acc;
    },
    { mass: 0, grossEmissions: 0, benchmarkEmissions: 0, chargeableEmissions: 0, cost: 0 }
  );

  return {
    reportId: `CBAM-KOSTEN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    rows,
    totals,
    assumptions: [
      "Berechnung: max(SEE 2026 - Benchmark, 0) x Nettomasse x Zertifikatspreis.",
      "Der Phase-Out wird im Ergebnis separat ausgewiesen und dient der Einordnung.",
      "SEE-Werte, Benchmarks und Zertifikatspreise sind Eingangsannahmen für eine Schätzung.",
      "Tatsächliche Kosten können durch echte Emissionsdaten, anrechenbare CO2-Preise, freie Zuteilungen, Rechtsakte und Datenqualität abweichen."
    ],
    disclaimer:
      "Dieses Dokument ist eine automatisierte CBAM-Kostenschätzung auf Basis der eingegebenen Daten. Es ersetzt keine Rechts-, Steuer- oder Zollberatung und keine verbindliche Emissions- oder Kostenfeststellung."
  };
}
