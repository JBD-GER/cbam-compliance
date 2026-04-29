import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import type { AssessmentInput, AssessmentResult } from "@/lib/cbamAssessment";
import { sectorLabels } from "@/lib/cbamAssessment";

const navy = "#07183d";
const ink = "#132238";
const slate = "#475569";
const muted = "#64748b";
const accent = "#41796a";
const border = "#dbe3ea";
const pale = "#f6f8fb";
const pageBottom = 735;
const contentWidth = 488;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

function addWrappedList(doc: PDFKit.PDFDocument, items: string[], x: number, y: number, width: number) {
  let currentY = y;

  items.forEach((item) => {
    doc.font("Helvetica").fontSize(10.5);
    const itemHeight = doc.heightOfString(item, { width, lineGap: 3 });
    if (currentY + itemHeight + 14 > pageBottom) {
      doc.addPage();
      currentY = 64;
    }
    doc.circle(x + 4, currentY + 7, 2.2).fill(accent);
    doc.fillColor(slate).font("Helvetica").fontSize(10.5).text(item, x + 16, currentY, { width, lineGap: 3 });
    currentY = doc.y + 8;
  });

  return currentY;
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

function scoreLabel(status: AssessmentResult["status"]) {
  if (status === "high") return "Hohe Relevanz";
  if (status === "potential") return "Klärungsbedarf";
  return "Geringe Relevanz";
}

function scoreExplanation(score: number) {
  if (score >= 62) {
    return "62-100 Punkte: hohe CBAM-Relevanz wahrscheinlich. Importdaten, Warencodes, Mengen, Lieferanten- und Emissionsdaten sollten kurzfristig strukturiert geprüft werden.";
  }

  if (score >= 30) {
    return "30-61 Punkte: mögliche CBAM-Relevanz. Offene Datenpunkte wie KN-/CN-Codes, Ursprung, Mengen oder Lieferantendaten sollten gezielt geklärt werden.";
  }

  return "0-29 Punkte: aktuell geringe CBAM-Relevanz nach den Angaben. Neue Waren, Ursprungsländer, Mengen oder Codes sollten dennoch regelmäßig erneut geprüft werden.";
}

function choiceLabel(value: string) {
  const labels: Record<string, string> = {
    yes: "Ja",
    no: "Nein",
    unknown: "Unklar",
    partial: "Teilweise",
    applied: "Beantragt"
  };

  return labels[value] ?? value;
}

function displayValue(value: string | undefined) {
  const cleanValue = value?.trim();
  return cleanValue ? cleanValue : "Keine Angabe";
}

function addKeyValueRows(doc: PDFKit.PDFDocument, rows: Array<[string, string]>) {
  rows.forEach(([label, value]) => {
    const cleanValue = displayValue(value);
    doc.font("Helvetica").fontSize(10.2);
    const valueHeight = doc.heightOfString(cleanValue, { width: 300, lineGap: 3 });
    const rowHeight = Math.max(38, valueHeight + 18);
    ensureSpace(doc, rowHeight + 8);
    const y = doc.y;

    doc.roundedRect(54, y, contentWidth, rowHeight, 10).fill("#ffffff").strokeColor("#edf2f7").stroke();
    doc.fillColor(muted).font("Helvetica-Bold").fontSize(8.6).text(label.toUpperCase(), 72, y + 12, { width: 130 });
    doc.fillColor(ink).font("Helvetica").fontSize(10.2).text(cleanValue, 214, y + 10, { width: 300, lineGap: 3 });
    doc.y = y + rowHeight + 8;
  });
}

function addNotice(doc: PDFKit.PDFDocument, title: string, text: string) {
  doc.font("Helvetica").fontSize(9.5);
  const textHeight = doc.heightOfString(text, { width: 448, lineGap: 3 });
  const blockHeight = Math.max(88, textHeight + 56);
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
    const footerY = doc.page.height - 66;

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
        height: 12,
        lineBreak: false
      });
    doc
      .fillColor(muted)
      .font("Helvetica")
      .fontSize(7.8)
      .text(`Seite ${pageNumber} von ${range.count}`, doc.page.width - 154, footerY, {
        width: 100,
        align: "right",
        height: 12,
        lineBreak: false
      });
  }
}

export async function createCbamReportPdf(input: AssessmentInput, result: AssessmentResult) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 54,
    bufferPages: true,
    info: {
      Title: `CBAM-Prüfbericht ${result.reportId}`,
      Author: "CBAM Compliance",
      Subject: result.headline
    }
  });

  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

  const finished = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  doc.rect(0, 0, 595.28, 236).fill(navy);
  doc.rect(0, 210, 595.28, 26).fill(accent);
  doc.fillColor("#9fd1c3").font("Helvetica-Bold").fontSize(10).text("CBAM COMPLIANCE", 54, 42, {
    characterSpacing: 1.6
  });
  doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(28).text("CBAM-Prüfbericht", 54, 70, {
    width: 340,
    lineGap: 4
  });
  doc.fillColor("#dbeafe").font("Helvetica").fontSize(11.5).text(`Automatisierte Ersteinschätzung für ${input.company}`, 54, 136, {
    width: 340,
    lineGap: 4
  });
  doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(9.5).text(`Bericht ${result.reportId}`, 54, 196, { width: 300, lineBreak: false });
  doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(9.5).text("cbam-compliance.de", 360, 218, {
    width: 180,
    align: "right",
    lineBreak: false
  });

  doc.roundedRect(392, 58, 148, 118, 16).fill("#ffffff");
  doc.fillColor(accent).font("Helvetica-Bold").fontSize(32).text(`${result.score}`, 412, 78, { width: 108, align: "center" });
  doc.fillColor(muted).font("Helvetica").fontSize(9.5).text("von 100 Punkten", 412, 115, { width: 108, align: "center" });
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(10.5).text(scoreLabel(result.status), 412, 140, { width: 108, align: "center" });

  doc.y = 268;
  doc.fillColor(navy).font("Helvetica-Bold").fontSize(22).text(result.headline, 54, doc.y, { width: 488, lineGap: 4 });
  doc.moveDown(0.8);
  doc.fillColor(slate).font("Helvetica").fontSize(11.5).text(result.summary, 54, doc.y, { width: 488, lineGap: 5 });

  doc.moveDown(1.3);
  const cardY = doc.y;
  doc.roundedRect(54, cardY, contentWidth, 118, 14).fill(pale).strokeColor(border).stroke();
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(9).text("BERICHT", 74, cardY + 18);
  doc.fillColor(ink).font("Helvetica").fontSize(10.5).text(result.reportId, 74, cardY + 36, { width: 136 });
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(9).text("DATUM", 226, cardY + 18);
  doc.fillColor(ink).font("Helvetica").fontSize(10.5).text(formatDate(result.createdAt), 226, cardY + 36);
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(9).text("KONTAKT", 378, cardY + 18);
  doc.fillColor(ink).font("Helvetica").fontSize(10.5).text(input.contactName, 378, cardY + 36, { width: 136 });
  doc.fillColor(muted).font("Helvetica-Bold").fontSize(9).text("UNTERNEHMEN", 74, cardY + 74);
  doc.fillColor(ink).font("Helvetica").fontSize(10.5).text(input.company, 170, cardY + 74, { width: 350 });
  doc.y = cardY + 142;

  sectionTitle(doc, "Score-Einordnung");
  addNotice(doc, "Was die Punktzahl bedeutet", scoreExplanation(result.score));

  sectionTitle(doc, "Eingaben");
  const sectorText = input.sectors.map((sector) => sectorLabels[sector]).join(", ") || "Keine Angabe";
  const rows = [
    ["Unternehmen", input.company],
    ["Ansprechpartner", input.contactName],
    ["E-Mail", input.email],
    ["Telefon", input.phone || "Keine Angabe"],
    ["Drittstaatenimporte", choiceLabel(input.importsFromThirdCountries)],
    ["Warengruppen", sectorText],
    ["Jahresmenge", typeof input.annualMassTonnes === "number" ? `${input.annualMassTonnes} t` : "Keine Angabe"],
    ["KN-/CN-Codes", input.cnCodes || "Keine Angabe"],
    ["Ursprungsländer", input.originCountries || "Keine Angabe"],
    ["Lieferantendaten", choiceLabel(input.hasSupplierData)],
    ["Emissionsdaten", choiceLabel(input.hasEmissionData)],
    ["Interner CBAM-Prozess", choiceLabel(input.hasCbamProcess)],
    ["Zugelassener CBAM-Anmelder", choiceLabel(input.hasAuthorizedDeclarant)],
    ["Teil-/Mischprodukte", choiceLabel(input.mixedProducts)]
  ] satisfies Array<[string, string]>;

  addKeyValueRows(doc, rows);

  sectionTitle(doc, "Warum diese Einschätzung?");
  doc.y = addWrappedList(doc, result.reasons, 58, doc.y, 462);

  sectionTitle(doc, "Risikobereiche");
  doc.y = addWrappedList(doc, result.riskAreas, 58, doc.y, 462);

  sectionTitle(doc, "Empfehlungen");
  doc.y = addWrappedList(doc, result.recommendations, 58, doc.y, 462);

  sectionTitle(doc, "Nächste Arbeitsschritte");
  doc.y = addWrappedList(doc, result.nextSteps, 58, doc.y, 462);

  sectionTitle(doc, "Daten-Checkliste");
  doc.y = addWrappedList(doc, result.dataChecklist, 58, doc.y, 462);

  if (input.notes) {
    sectionTitle(doc, "Ihre Hinweise");
    doc.fillColor(slate).font("Helvetica").fontSize(10.5).text(input.notes, 54, doc.y, { width: 488, lineGap: 4 });
  }

  doc.moveDown(1);
  addNotice(doc, "Hinweis", result.disclaimer);

  addDocumentFooters(doc);
  doc.end();
  return finished;
}
