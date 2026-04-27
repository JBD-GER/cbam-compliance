export type CbamSector =
  | "iron_steel"
  | "aluminium"
  | "cement"
  | "fertilizers"
  | "hydrogen"
  | "electricity"
  | "mixed"
  | "unknown";

export type AssessmentInput = {
  email: string;
  company: string;
  contactName: string;
  phone?: string;
  importsFromThirdCountries: "yes" | "no" | "unknown";
  sectors: CbamSector[];
  annualMassTonnes?: number;
  cnCodes?: string;
  originCountries?: string;
  hasSupplierData: "yes" | "partial" | "no" | "unknown";
  hasEmissionData: "yes" | "partial" | "no" | "unknown";
  hasCbamProcess: "yes" | "partial" | "no";
  hasAuthorizedDeclarant: "yes" | "applied" | "no" | "unknown";
  mixedProducts: "yes" | "no" | "unknown";
  notes?: string;
};

export type AssessmentResult = {
  reportId: string;
  createdAt: string;
  status: "high" | "potential" | "low";
  score: number;
  headline: string;
  summary: string;
  reasons: string[];
  riskAreas: string[];
  recommendations: string[];
  nextSteps: string[];
  dataChecklist: string[];
  disclaimer: string;
};

export const sectorLabels: Record<CbamSector, string> = {
  iron_steel: "Eisen und Stahl",
  aluminium: "Aluminium",
  cement: "Zement",
  fertilizers: "Düngemittel",
  hydrogen: "Wasserstoff",
  electricity: "Strom",
  mixed: "Produkte mit möglichen CBAM-Bestandteilen",
  unknown: "Unklar / noch nicht geprüft"
};

const cbamCoreSectors: CbamSector[] = ["iron_steel", "aluminium", "cement", "fertilizers", "hydrogen", "electricity"];

function addUnique(items: string[], item: string) {
  if (!items.includes(item)) {
    items.push(item);
  }
}

export function normalizeAssessmentInput(input: AssessmentInput): AssessmentInput {
  return {
    ...input,
    email: input.email.trim().toLowerCase(),
    company: input.company.trim(),
    contactName: input.contactName.trim(),
    phone: input.phone?.trim(),
    cnCodes: input.cnCodes?.trim(),
    originCountries: input.originCountries?.trim(),
    notes: input.notes?.trim(),
    sectors: Array.from(new Set(input.sectors ?? []))
  };
}

export function assessCbam(input: AssessmentInput): AssessmentResult {
  const normalized = normalizeAssessmentInput(input);
  let score = 0;
  const reasons: string[] = [];
  const riskAreas: string[] = [];
  const recommendations: string[] = [];
  const nextSteps: string[] = [];
  const dataChecklist: string[] = [
    "Importdaten je Kalenderjahr mit Zollanmeldungen und Nettomassen",
    "KN-/CN-Codes mit Warenbeschreibung und internen Artikelnummern",
    "Ursprungsländer, Lieferanten und Hersteller je Warenposition",
    "Lieferantenantworten, Emissionsdaten und vorhandene Nachweise",
    "Interne Verantwortlichkeiten für Einkauf, Zoll, Finanzen und Compliance"
  ];

  const selectedCoreSectors = normalized.sectors.filter((sector) => cbamCoreSectors.includes(sector));
  const selectedLabels = normalized.sectors.map((sector) => sectorLabels[sector]).join(", ");

  if (normalized.importsFromThirdCountries === "yes") {
    score += 25;
    reasons.push("Es werden Waren aus Nicht-EU-Ländern eingeführt.");
  } else if (normalized.importsFromThirdCountries === "unknown") {
    score += 10;
    reasons.push("Der Drittstaatenbezug ist noch nicht eindeutig geklärt.");
  } else {
    reasons.push("Nach Ihren Angaben liegen keine Einfuhren aus Drittstaaten vor.");
  }

  if (selectedCoreSectors.length > 0) {
    score += 30;
    reasons.push(`Angegeben wurden Warengruppen aus dem CBAM-Kernbereich: ${selectedLabels}.`);
  }

  if (normalized.sectors.includes("mixed")) {
    score += 14;
    reasons.push("Es gibt Produkte mit möglichen CBAM-Bestandteilen. Diese sollten über konkrete KN-/CN-Codes geprüft werden.");
    addUnique(riskAreas, "Gemischte Produkte können nicht nur nach Materialanteil bewertet werden; entscheidend ist die konkrete Einfuhrposition.");
  }

  if (normalized.sectors.includes("unknown")) {
    score += 10;
    reasons.push("Die Warengruppen oder Codes sind noch unklar. Das ist ein relevanter Daten- und Klärungspunkt.");
  }

  if (typeof normalized.annualMassTonnes === "number") {
    if (normalized.annualMassTonnes >= 50) {
      score += 22;
      reasons.push(`Die angegebene Jahresmenge liegt bei ${normalized.annualMassTonnes} t und damit oberhalb der typischen 50-Tonnen-Prüfschwelle.`);
      addUnique(riskAreas, "Mengen oberhalb der 50-Tonnen-Schwelle sollten je Kalenderjahr und betroffener Gesellschaft nachvollziehbar dokumentiert werden.");
    } else if (normalized.annualMassTonnes > 0) {
      score += 8;
      reasons.push(`Die angegebene Jahresmenge liegt bei ${normalized.annualMassTonnes} t. Auch kleinere Mengen sollten bei relevanten Codes dokumentiert werden.`);
    }
  } else {
    score += 8;
    reasons.push("Es wurde keine belastbare Jahresmenge angegeben.");
  }

  if (normalized.cnCodes) {
    score += 8;
    reasons.push("KN-/CN-Codes liegen bereits vor und können für eine strukturierte Prüfung genutzt werden.");
  } else {
    score += 10;
    addUnique(riskAreas, "Fehlende oder unklare KN-/CN-Codes verhindern eine belastbare CBAM-Einordnung.");
  }

  if (normalized.hasSupplierData === "no" || normalized.hasSupplierData === "unknown") {
    score += 12;
    addUnique(riskAreas, "Lieferantendaten fehlen oder sind noch nicht belastbar.");
  } else if (normalized.hasSupplierData === "partial") {
    score += 8;
    addUnique(riskAreas, "Lieferantendaten liegen nur teilweise vor.");
  }

  if (normalized.hasEmissionData === "no" || normalized.hasEmissionData === "unknown") {
    score += 12;
    addUnique(riskAreas, "Emissionsdaten fehlen oder sind noch nicht belastbar.");
  } else if (normalized.hasEmissionData === "partial") {
    score += 8;
    addUnique(riskAreas, "Emissionsdaten liegen nur teilweise vor.");
  }

  if (normalized.hasCbamProcess === "no") {
    score += 10;
    addUnique(riskAreas, "Es gibt noch keinen internen CBAM-Prozess.");
  } else if (normalized.hasCbamProcess === "partial") {
    score += 5;
    addUnique(riskAreas, "Der interne CBAM-Prozess ist erst teilweise aufgebaut.");
  }

  if (normalized.hasAuthorizedDeclarant === "no" || normalized.hasAuthorizedDeclarant === "unknown") {
    score += 7;
    addUnique(riskAreas, "Der Status als zugelassener CBAM-Anmelder sollte geprüft werden, sofern Schwellenwerte und Warenbereich einschlägig sind.");
  }

  const boundedScore = Math.min(score, 100);
  const status = boundedScore >= 62 ? "high" : boundedScore >= 30 ? "potential" : "low";

  if (status === "high") {
    recommendations.push("Führen Sie kurzfristig eine vollständige CBAM-Betroffenheitsanalyse auf Basis der Importdaten durch.");
    recommendations.push("Priorisieren Sie betroffene KN-/CN-Codes, Lieferanten und Mengen je Kalenderjahr.");
    recommendations.push("Starten Sie Lieferantenanfragen zu Emissions- und Nachweisdaten.");
  } else if (status === "potential") {
    recommendations.push("Klären Sie die offenen Datenpunkte, insbesondere Warencodes, Ursprung und Nettomassen.");
    recommendations.push("Markieren Sie potenziell relevante Warenpositionen und Lieferanten in einer Arbeitsliste.");
    recommendations.push("Prüfen Sie anhand der Importdaten, ob die 50-Tonnen-Schwelle erreicht wird.");
  } else {
    recommendations.push("Dokumentieren Sie die aktuelle Nicht- oder Geringbetroffenheit nachvollziehbar.");
    recommendations.push("Prüfen Sie neue Warencodes, Lieferanten und Ursprungsländer regelmäßig erneut.");
  }

  nextSteps.push("Importdaten für das aktuelle und vorherige Kalenderjahr zusammenführen.");
  nextSteps.push("KN-/CN-Codes, Ursprungsländer, Nettomassen und Lieferanten je Position ergänzen.");
  nextSteps.push("Unklare oder gemischte Produkte separat markieren.");
  nextSteps.push("Kosten- und Emissionsszenarien mit dem CBAM-Kostenrechner vorbereiten.");
  nextSteps.push("Bei relevanter Betroffenheit eine detaillierte Analyse und Registrierungsvorbereitung einplanen.");

  const headline =
    status === "high"
      ? "Hohe CBAM-Relevanz wahrscheinlich"
      : status === "potential"
        ? "Mögliche CBAM-Relevanz mit Klärungsbedarf"
        : "Aktuell geringe CBAM-Relevanz nach Ihren Angaben";

  const summary =
    status === "high"
      ? "Ihre Angaben sprechen für einen relevanten CBAM-Prüfbedarf. Besonders Warenbereich, Drittstaatenbezug, Mengen, Datenlage und interne Vorbereitung sollten zeitnah strukturiert werden."
      : status === "potential"
        ? "Ihre Angaben enthalten mehrere offene Punkte. Eine Betroffenheit kann nicht ausgeschlossen werden und sollte anhand konkreter Importdaten und KN-/CN-Codes geprüft werden."
        : "Nach Ihren Angaben ist die CBAM-Betroffenheit derzeit eher gering. Aenderungen bei Waren, Ursprung, Mengen oder Codes sollten dennoch laufend beobachtet werden.";

  return {
    reportId: `CBAM-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status,
    score: boundedScore,
    headline,
    summary,
    reasons,
    riskAreas: riskAreas.length > 0 ? riskAreas : ["Keine wesentlichen Risikobereiche aus den Angaben erkennbar."],
    recommendations,
    nextSteps,
    dataChecklist,
    disclaimer:
      "Dieser Bericht ist eine automatisierte Ersteinschätzung auf Basis Ihrer Angaben. Er ersetzt keine Rechts-, Steuer- oder Zollberatung und keine verbindliche zolltarifliche Einreihung."
  };
}
