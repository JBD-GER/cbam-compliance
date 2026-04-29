import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import type { CostReportInput, CostReportResult } from "@/lib/cbamCostReport";

const navy = "#07183d";
const ink = "#132238";
const slate = "#475569";
const muted = "#64748b";
const accent = "#41796a";
const border = "#dbe3ea";
const pale = "#f6f8fb";
const pageBottom = 760;
const contentWidth = 488;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
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

function ensureSpace(doc: PDFKit.PDFDocument, needed: number) {
  if (doc.y + needed > pageBottom) {
    doc.addPage();
    doc.y = 64;
  }
}

function sectionTitle(doc: PDFKit.PDFDocument, title: string) {
  ensureSpace(doc, 70);
  doc.moveDown(1);
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(16).text(title, 54, doc.y);
  doc.moveTo(54, doc.y + 7).lineTo(558, doc.y + 7).strokeColor(border).lineWidth(1).stroke();
  doc.moveDown(1.1);
}

function addList(doc: PDFKit.PDFDocument, items: string[]) {
  items.forEach((item) => {
    const height = doc.heightOfString(item, { width: 460, lineGap: 3 });
    ensureSpace(doc, Math.max(30, height + 14));
    const y = doc.y;
    doc.circle(58, y + 7, 2.2).fill(accent);
    doc.fillColor(slate).font("Helvetica").fontSize(10.2).text(item, 74, y, { width: 460, lineGap: 3 });
    doc.moveDown(0.6);
  });
}

function addKeyValueRows(doc: PDFKit.PDFDocument, rows: string[][]) {
  rows.forEach(([label, value]) => {
    doc.font("Helvetica").fontSize(10.3);
    const valueHeight = doc.heightOfString(value, { width: 330, lineGap: 3 });
    ensureSpace(doc, Math.max(28, valueHeight + 10));
    const y = doc.y;
    doc.fillColor(muted).font("Helvetica-Bold").fontSize(9.3).text(label, 54, y, { width: 150 });
    doc.fillColor(ink).font("Helvetica").fontSize(10.3).text(value, 210, y, { width: 330, lineGap: 3 });
    doc.y = y + Math.max(22, valueHeight + 8);
  });
}

function addSummaryMetric(doc: PDFKit.PDFDocument, label: string, value: string, x: number, y: number, width: number) {
  doc.roundedRect(x, y, width, 58, 12).fill("#ffffff").strokeColor(border).stroke();
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(8.2).text(label.toUpperCase(), x + 12, y + 12, {
    width: width - 24,
    lineGap: 1
  });
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12.5).text(value, x + 12, y + 32, { width: width - 24 });
}

function addNotice(doc: PDFKit.PDFDocument, title: string, text: string) {
  doc.font("Helvetica").fontSize(9.5);
  const textHeight = doc.heightOfString(text, { width: 448, lineGap: 3 });
  const blockHeight = Math.max(92, textHeight + 56);
  ensureSpace(doc, blockHeight + 12);

  const noteY = doc.y;
  doc.roundedRect(54, noteY, contentWidth, blockHeight, 14).fill("#eef6f3");
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text(title, 74, noteY + 16, { width: 448 });
  doc.fillColor(slate).font("Helvetica").fontSize(9.5).text(text, 74, noteY + 40, { width: 448, lineGap: 3 });
  doc.y = noteY + blockHeight + 8;
}

function addDocumentFooters(doc: PDFKit.PDFDocument) {
  const range = doc.bufferedPageRange();

  for (let index = range.start; index < range.start + range.count; index += 1) {
    doc.switchToPage(index);
    const pageNumber = index - range.start + 1;
    const footerY = doc.page.height - 48;

    doc
      .moveTo(54, footerY - 10)
      .lineTo(doc.page.width - 54, footerY - 10)
      .strokeColor(border)
      .lineWidth(0.8)
      .stroke();
    doc
      .fillColor(muted)
      .font("Helvetica")
      .fontSize(7.8)
      .text("Flaaq Holding GmbH | Großer Kamp 5a, 31633 Leese | 05761 8429666 | info@cbam-compliance.de", 54, footerY, {
        width: 395,
        lineBreak: false
      });
    doc
      .fillColor(muted)
      .font("Helvetica")
      .fontSize(7.8)
      .text(`Seite ${pageNumber} von ${range.count}`, doc.page.width - 154, footerY, {
        width: 100,
        align: "right",
        lineBreak: false
      });
  }
}

export async function createCbamCostReportPdf(input: CostReportInput, result: CostReportResult) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 54,
    bufferPages: true,
    info: {
      Title: `CBAM-Kostenergebnis ${result.reportId}`,
      Author: "CBAM Compliance",
      Subject: "CBAM-Kostenschätzung"
    }
  });

  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

  const finished = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  doc.rect(0, 0, 595.28, 230).fill(navy);
  doc.rect(0, 205, 595.28, 25).fill(accent);
  doc.fillColor("#9fd1c3").font("Helvetica-Bold").fontSize(10).text("CBAM COMPLIANCE", 54, 42, {
    characterSpacing: 1.6
  });
  doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(30).text("CBAM-Kostenergebnis", 54, 68, {
    width: 360,
    lineGap: 4
  });
  doc.fillColor("#dbeafe").font("Helvetica").fontSize(12).text(`Formales Ergebnisdokument für ${input.company}`, 54, 143, {
    width: 360,
    lineGap: 4
  });
  doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(10).text(`Bericht ${result.reportId}`, 54, 194, { width: 300 });
  doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(9.5).text("cbam-compliance.de", 360, 213, {
    width: 180,
    align: "right",
    lineBreak: false
  });

  doc.roundedRect(374, 54, 166, 112, 16).fill("#ffffff");
  doc.fillColor(accent).font("Helvetica-Bold").fontSize(23).text(formatEuro(result.totals.cost), 394, 78, {
    width: 126,
    align: "center"
  });
  doc.fillColor(muted).font("Helvetica").fontSize(9.5).text("geschätzte CBAM-Kosten", 394, 116, {
    width: 126,
    align: "center"
  });
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(`${input.year} | ${formatNumber(input.certificatePrice)} EUR/tCO2e`, 394, 140, {
    width: 126,
    align: "center"
  });

  doc.y = 260;
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(21).text("Zusammenfassung", 54, doc.y);
  doc.moveDown(0.8);
  doc.fillColor(slate).font("Helvetica").fontSize(11.2).text(
    "Dieses Dokument fasst die im CBAM-Kostenrechner eingegebenen Positionen, Annahmen und Ergebniswerte zusammen. Es dient als interne Orientierung für Kostenplanung, Datenprüfung und weitere CBAM-Vorbereitung.",
    54,
    doc.y,
    { width: 488, lineGap: 5 }
  );

  doc.moveDown(1.2);
  const cardY = doc.y;
  doc.roundedRect(54, cardY, contentWidth, 218, 16).fill(pale).strokeColor(border).stroke();
  addSummaryMetric(doc, "Nettomasse", `${formatNumber(result.totals.mass)} t`, 74, cardY + 22, 214);
  addSummaryMetric(doc, "Gesamtemissionen", `${formatNumber(result.totals.grossEmissions)} tCO2e`, 308, cardY + 22, 214);
  addSummaryMetric(doc, "Kostenpflichtige Emissionen", `${formatNumber(result.totals.chargeableEmissions)} tCO2e`, 74, cardY + 92, 214);
  addSummaryMetric(doc, "Phase-Out", `${formatNumber(input.phaseOut)} %`, 308, cardY + 92, 214);
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(8.5).text("BERICHT", 74, cardY + 168);
  doc.fillColor(ink).font("Helvetica").fontSize(9.5).text(result.reportId, 134, cardY + 168, { width: 176 });
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(8.5).text("DATUM", 332, cardY + 168);
  doc.fillColor(ink).font("Helvetica").fontSize(9.5).text(formatDate(result.createdAt), 386, cardY + 168, { width: 120 });
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(8.5).text("ANSPRECHPARTNER", 74, cardY + 192);
  doc.fillColor(ink).font("Helvetica").fontSize(9.5).text(input.contactName, 180, cardY + 192, { width: 330 });
  doc.y = cardY + 240;

  sectionTitle(doc, "Eingaben");
  const inputRows = [
    ["Unternehmen", input.company],
    ["Ansprechpartner", input.contactName],
    ["E-Mail", input.email],
    ["Jahr", String(input.year)],
    ["Zertifikatspreis", `${formatNumber(input.certificatePrice)} EUR/tCO2e`],
    ["Phase-Out", `${formatNumber(input.phaseOut)} %`]
  ];
  addKeyValueRows(doc, inputRows);

  sectionTitle(doc, "Positionen");
  result.rows.forEach((row, index) => {
    doc.font("Helvetica").fontSize(9.2);
    const title = `${index + 1}. ${row.cn || "Ohne CN-Code"} | ${row.country || "Ohne Land"}${row.route ? ` | Route ${row.route}` : ""}`;
    const description = row.description || row.category || "Keine Beschreibung";
    const titleHeight = doc.heightOfString(title, { width: 314, lineGap: 2 });
    const descriptionHeight = doc.heightOfString(description, { width: 448, lineGap: 2 });
    const metricsText = `Masse: ${formatNumber(row.mass)} t | SEE: ${formatNumber(row.see, 3)} | Benchmark: ${formatNumber(row.benchmark, 3)} | Brutto: ${formatNumber(row.grossEmissions)} tCO2e | kostenpflichtig: ${formatNumber(row.chargeableEmissions)} tCO2e`;
    const metricsHeight = doc.heightOfString(metricsText, { width: 448, lineGap: 2 });
    const rowHeight = Math.max(106, 50 + titleHeight + descriptionHeight + metricsHeight);
    ensureSpace(doc, rowHeight + 18);
    const y = doc.y;
    doc.roundedRect(54, y, contentWidth, rowHeight, 12).fill("#ffffff").strokeColor(border).stroke();
    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text(title, 72, y + 14, {
      width: 314,
      lineGap: 2
    });
    doc.fillColor(accent).font("Helvetica-Bold").fontSize(12).text(formatEuro(row.cost), 430, y + 14, { width: 90, align: "right" });
    const descriptionY = y + 18 + titleHeight + 8;
    doc.fillColor(slate).font("Helvetica").fontSize(9.2).text(description, 72, descriptionY, {
      width: 448,
      lineGap: 2
    });
    doc.fillColor(muted).font("Helvetica").fontSize(8.8).text(metricsText, 72, descriptionY + descriptionHeight + 10, {
      width: 448,
      lineGap: 2
    });
    doc.y = y + rowHeight + 16;
  });

  sectionTitle(doc, "Berechnungsannahmen");
  addList(doc, result.assumptions);

  doc.moveDown(1);
  addNotice(doc, "Hinweis", result.disclaimer);

  addDocumentFooters(doc);
  doc.end();
  return finished;
}
