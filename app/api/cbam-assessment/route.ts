import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { AssessmentInput, CbamSector } from "@/lib/cbamAssessment";
import { assessCbam, normalizeAssessmentInput } from "@/lib/cbamAssessment";
import { createCbamReportEmail } from "@/lib/cbamReportEmail";
import { createCbamReportPdf } from "@/lib/cbamReportPdf";

export const runtime = "nodejs";

const sectors: CbamSector[] = ["iron_steel", "aluminium", "cement", "fertilizers", "hydrogen", "electricity", "mixed", "unknown"];

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function parseChoice<T extends string>(value: unknown, allowed: T[], fallback?: T): T {
  if (isString(value) && allowed.includes(value as T)) {
    return value as T;
  }

  if (fallback) {
    return fallback;
  }

  throw new Error("Invalid form value");
}

function parseInput(body: Record<string, unknown>): AssessmentInput {
  const rawSectors = Array.isArray(body.sectors) ? body.sectors : [];
  const parsedSectors = rawSectors.filter((sector): sector is CbamSector => isString(sector) && sectors.includes(sector as CbamSector));
  const annualMassRaw = body.annualMassTonnes;
  const annualMassTonnes =
    typeof annualMassRaw === "number"
      ? annualMassRaw
      : isString(annualMassRaw) && annualMassRaw.trim() !== ""
        ? Number(annualMassRaw.replace(",", "."))
        : undefined;

  const input: AssessmentInput = {
    email: isString(body.email) ? body.email : "",
    company: isString(body.company) ? body.company : "",
    contactName: isString(body.contactName) ? body.contactName : "",
    phone: isString(body.phone) ? body.phone : undefined,
    importsFromThirdCountries: parseChoice(body.importsFromThirdCountries, ["yes", "no", "unknown"], "unknown"),
    sectors: parsedSectors.length > 0 ? parsedSectors : ["unknown"],
    annualMassTonnes: Number.isFinite(annualMassTonnes) ? annualMassTonnes : undefined,
    cnCodes: isString(body.cnCodes) ? body.cnCodes : undefined,
    originCountries: isString(body.originCountries) ? body.originCountries : undefined,
    hasSupplierData: parseChoice(body.hasSupplierData, ["yes", "partial", "no", "unknown"], "unknown"),
    hasEmissionData: parseChoice(body.hasEmissionData, ["yes", "partial", "no", "unknown"], "unknown"),
    hasCbamProcess: parseChoice(body.hasCbamProcess, ["yes", "partial", "no"], "no"),
    hasAuthorizedDeclarant: parseChoice(body.hasAuthorizedDeclarant, ["yes", "applied", "no", "unknown"], "unknown"),
    mixedProducts: parseChoice(body.mixedProducts, ["yes", "no", "unknown"], "unknown"),
    notes: isString(body.notes) ? body.notes : undefined
  };

  const normalized = normalizeAssessmentInput(input);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  }

  if (!normalized.company || !normalized.contactName) {
    throw new Error("Bitte geben Sie Unternehmen und Ansprechpartner an.");
  }

  if (typeof normalized.annualMassTonnes === "number" && normalized.annualMassTonnes < 0) {
    throw new Error("Die Jahresmenge darf nicht negativ sein.");
  }

  return normalized;
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
    const result = assessCbam(input);
    const pdf = await createCbamReportPdf(input, result);
    const html = createCbamReportEmail(input, result);
    const resend = new Resend(apiKey);
    const notifyEmail = process.env.CBAM_REPORT_NOTIFY_EMAIL?.trim();

    const { error } = await resend.emails.send({
      from,
      to: input.email,
      bcc: notifyEmail ? [notifyEmail] : undefined,
      subject: `Ihr CBAM-Prüfbericht: ${result.headline}`,
      html,
      attachments: [
        {
          filename: `cbam-prüfbericht-${result.reportId}.pdf`,
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
      headline: result.headline,
      score: result.score,
      status: result.status,
      summary: result.summary
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Der Bericht konnte nicht erstellt werden.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
