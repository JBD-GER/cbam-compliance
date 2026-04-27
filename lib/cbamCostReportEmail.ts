import type { CostReportInput, CostReportResult } from "@/lib/cbamCostReport";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

export function createCbamCostReportEmail(input: CostReportInput, result: CostReportResult) {
  const topRows = result.rows
    .slice(0, 4)
    .map(
      (row) => `
        <tr>
          <td style="padding:12px 14px;border-top:1px solid #e2e8f0;color:#132238;">${escapeHtml(row.cn || "-")}</td>
          <td style="padding:12px 14px;border-top:1px solid #e2e8f0;color:#475569;">${escapeHtml(row.country || "-")}</td>
          <td style="padding:12px 14px;border-top:1px solid #e2e8f0;color:#07183d;font-weight:700;text-align:right;">${formatEuro(row.cost)}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ihr CBAM-Kostenergebnis</title>
  </head>
  <body style="margin:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;color:#132238;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#07183d;padding:34px 36px;color:#ffffff;">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9fd1c3;">CBAM Compliance</p>
                <h1 style="margin:0;font-size:30px;line-height:1.2;">Ihr CBAM-Kostenergebnis</h1>
                <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#dbeafe;">Bericht ${escapeHtml(result.reportId)} für ${escapeHtml(input.company)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 36px;">
                <div style="display:inline-block;border-radius:999px;background:#eaf4f1;color:#275b4f;padding:8px 14px;font-size:13px;font-weight:700;">
                  ${escapeHtml(String(input.year))} | ${formatNumber(input.certificatePrice)} EUR/tCO2e
                </div>
                <h2 style="margin:22px 0 10px;font-size:24px;line-height:1.3;color:#07183d;">Geschätzte CBAM-Kosten: ${formatEuro(result.totals.cost)}</h2>
                <p style="margin:0;font-size:16px;line-height:1.8;color:#475569;">
                  Im Anhang finden Sie ein formales PDF-Dokument mit Positionen, Annahmen, Emissionen, Benchmarks und Ergebnissummen.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
                  <tr>
                    <td style="padding:18px 20px;background:#f8fafc;font-size:13px;color:#64748b;">Nettomasse</td>
                    <td style="padding:18px 20px;font-weight:700;color:#07183d;text-align:right;">${formatNumber(result.totals.mass)} t</td>
                  </tr>
                  <tr>
                    <td style="padding:18px 20px;background:#f8fafc;font-size:13px;color:#64748b;">Gesamtemissionen</td>
                    <td style="padding:18px 20px;font-weight:700;color:#07183d;text-align:right;">${formatNumber(result.totals.grossEmissions)} tCO2e</td>
                  </tr>
                  <tr>
                    <td style="padding:18px 20px;background:#f8fafc;font-size:13px;color:#64748b;">Kostenpflichtige Emissionen</td>
                    <td style="padding:18px 20px;font-weight:700;color:#07183d;text-align:right;">${formatNumber(result.totals.chargeableEmissions)} tCO2e</td>
                  </tr>
                </table>

                <h3 style="margin:26px 0 10px;font-size:18px;color:#07183d;">Auszug der Positionen</h3>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
                  <tr>
                    <th align="left" style="padding:12px 14px;background:#f8fafc;color:#64748b;font-size:12px;">CN-Code</th>
                    <th align="left" style="padding:12px 14px;background:#f8fafc;color:#64748b;font-size:12px;">Land</th>
                    <th align="right" style="padding:12px 14px;background:#f8fafc;color:#64748b;font-size:12px;">Kosten</th>
                  </tr>
                  ${topRows}
                </table>

                <div style="margin-top:30px;padding:22px;border-radius:18px;background:#07183d;color:#ffffff;">
                  <h3 style="margin:0 0 8px;font-size:18px;">PDF-Dokument im Anhang</h3>
                  <p style="margin:0;font-size:15px;line-height:1.7;color:#dbeafe;">Das Dokument eignet sich als interne Entscheidungsgrundlage für Einkauf, Zoll, Finanzen und Geschäftsführung.</p>
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
