import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { CostReportInput, CostReportRow } from "@/lib/cbamCostReport";
import { calculateCostReport, normalizeCostReportInput } from "@/lib/cbamCostReport";
import { createCbamCostReportEmail } from "@/lib/cbamCostReportEmail";
import { createCbamCostReportPdf } from "@/lib/cbamCostReportPdf";

export const runtime = "nodejs";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (isString(value) && value.trim() !== "") return Number(value.replace(",", "."));
  return 0;
}

function parseRows(value: unknown): CostReportRow[] {
  if (!Array.isArray(value)) return [];

  return value.map((row) => {
    const item = typeof row === "object" && row ? (row as Record<string, unknown>) : {};
    return {
      country: isString(item.country) ? item.country : "",
      cn: isString(item.cn) ? item.cn : "",
      category: isString(item.category) ? item.category : "",
      description: isString(item.description) ? item.description : "",
      route: isString(item.route) ? item.route : "",
      mass: toNumber(item.mass),
      see: toNumber(item.see),
      benchmark: toNumber(item.benchmark)
    };
  });
}

function parseInput(body: Record<string, unknown>): CostReportInput {
  const input = normalizeCostReportInput({
    email: isString(body.email) ? body.email : "",
    company: isString(body.company) ? body.company : "",
    contactName: isString(body.contactName) ? body.contactName : "",
    year: toNumber(body.year) || 2026,
    certificatePrice: toNumber(body.certificatePrice) || 75.36,
    phaseOut: toNumber(body.phaseOut),
    rows: parseRows(body.rows)
  });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  }

  if (!input.company || !input.contactName) {
    throw new Error("Bitte geben Sie Unternehmen und Ansprechpartner an.");
  }

  if (input.rows.length === 0) {
    throw new Error("Bitte geben Sie mindestens eine Kostenposition ein.");
  }

  if (input.rows.some((row) => row.mass < 0 || row.see < 0 || row.benchmark < 0)) {
    throw new Error("Masse, SEE und Benchmark dürfen nicht negativ sein.");
  }

  return input;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !from) {
      return NextResponse.json(
        { error: "Der E-Mail-Versand ist noch nicht konfiguriert. Bitte RESEND_API_KEY und RESEND_FROM_EMAIL setzen." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const input = parseInput(body);
    const result = calculateCostReport(input);
    const pdf = await createCbamCostReportPdf(input, result);
    const html = createCbamCostReportEmail(input, result);
    const resend = new Resend(apiKey);
    const notifyEmail = process.env.CBAM_REPORT_NOTIFY_EMAIL?.trim();

    const { error } = await resend.emails.send({
      from,
      to: input.email,
      bcc: notifyEmail ? [notifyEmail] : undefined,
      subject: `Ihr CBAM-Kostenergebnis ${input.year}`,
      html,
      attachments: [
        {
          filename: `cbam-kostenergebnis-${result.reportId}.pdf`,
          content: pdf,
          contentType: "application/pdf"
        }
      ],
      replyTo: notifyEmail || undefined
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      reportId: result.reportId,
      totalCost: result.totals.cost
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Das Kostenergebnis konnte nicht erstellt werden.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
