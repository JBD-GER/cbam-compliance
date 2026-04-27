import type { AssessmentInput, AssessmentResult } from "@/lib/cbamAssessment";
import { sectorLabels } from "@/lib/cbamAssessment";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function listItems(items: string[]) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

export function createCbamReportEmail(input: AssessmentInput, result: AssessmentResult) {
  const sectorText = input.sectors.map((sector) => sectorLabels[sector]).join(", ");

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(result.headline)}</title>
  </head>
  <body style="margin:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;color:#132238;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#07183d;padding:34px 36px;color:#ffffff;">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9fd1c3;">CBAM Compliance</p>
                <h1 style="margin:0;font-size:30px;line-height:1.2;">Ihr CBAM-Prüfbericht</h1>
                <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#dbeafe;">Bericht ${escapeHtml(result.reportId)} für ${escapeHtml(input.company)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 36px;">
                <div style="display:inline-block;border-radius:999px;background:#eaf4f1;color:#275b4f;padding:8px 14px;font-size:13px;font-weight:700;">
                  Score: ${result.score}/100
                </div>
                <h2 style="margin:22px 0 10px;font-size:24px;line-height:1.3;color:#07183d;">${escapeHtml(result.headline)}</h2>
                <p style="margin:0;font-size:16px;line-height:1.8;color:#475569;">${escapeHtml(result.summary)}</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
                  <tr>
                    <td style="padding:18px 20px;background:#f8fafc;font-size:13px;color:#64748b;">Ansprechpartner</td>
                    <td style="padding:18px 20px;font-weight:700;color:#07183d;">${escapeHtml(input.contactName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:18px 20px;background:#f8fafc;font-size:13px;color:#64748b;">Warengruppen</td>
                    <td style="padding:18px 20px;color:#132238;">${escapeHtml(sectorText || "Keine Angabe")}</td>
                  </tr>
                  <tr>
                    <td style="padding:18px 20px;background:#f8fafc;font-size:13px;color:#64748b;">Jahresmenge</td>
                    <td style="padding:18px 20px;color:#132238;">${typeof input.annualMassTonnes === "number" ? `${input.annualMassTonnes} t` : "Keine Angabe"}</td>
                  </tr>
                </table>

                <h3 style="margin:26px 0 10px;font-size:18px;color:#07183d;">Warum diese Einschätzung?</h3>
                <ul style="margin:0;padding-left:22px;font-size:15px;line-height:1.8;color:#475569;">${listItems(result.reasons)}</ul>

                <h3 style="margin:26px 0 10px;font-size:18px;color:#07183d;">Empfohlene nächste Schritte</h3>
                <ul style="margin:0;padding-left:22px;font-size:15px;line-height:1.8;color:#475569;">${listItems(result.recommendations)}</ul>

                <div style="margin-top:30px;padding:22px;border-radius:18px;background:#07183d;color:#ffffff;">
                  <h3 style="margin:0 0 8px;font-size:18px;">PDF-Bericht im Anhang</h3>
                  <p style="margin:0;font-size:15px;line-height:1.7;color:#dbeafe;">Der vollständige Bericht enthält Score, Risikobereiche, Checkliste und konkrete Arbeitsschritte für Ihre interne Abstimmung.</p>
                </div>

                <p style="margin:28px 0 0;font-size:12px;line-height:1.7;color:#64748b;">${escapeHtml(result.disclaimer)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
