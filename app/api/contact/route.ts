import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailFromAddress(value: string) {
  const match = value.match(/<([^>]+)>/);
  return match?.[1] ?? value;
}

function createInternalEmail(input: Record<string, string>) {
  return `<!doctype html>
<html lang="de">
  <body style="margin:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;color:#132238;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#07183d;padding:30px 34px;color:#ffffff;">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9fd1c3;">Neue Anfrage</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;">CBAM-Beratung</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px;">
                <h2 style="margin:0 0 16px;color:#07183d;font-size:22px;">${escapeHtml(input.company)}</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
                  ${[
                    ["Name", input.name],
                    ["Unternehmen", input.company],
                    ["E-Mail", input.email],
                    ["Telefon", input.phone || "-"],
                    ["Leistung", input.service]
                  ]
                    .map(
                      ([label, value]) => `<tr>
                        <td style="padding:14px 18px;background:#f8fafc;color:#64748b;font-size:13px;">${escapeHtml(label)}</td>
                        <td style="padding:14px 18px;color:#132238;font-weight:700;">${escapeHtml(value)}</td>
                      </tr>`
                    )
                    .join("")}
                </table>
                <h3 style="margin:26px 0 10px;color:#07183d;font-size:18px;">Nachricht</h3>
                <p style="margin:0;white-space:pre-line;line-height:1.8;color:#475569;">${escapeHtml(input.message)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function createConfirmationEmail(input: Record<string, string>) {
  return `<!doctype html>
<html lang="de">
  <body style="margin:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;color:#132238;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#07183d;padding:32px 34px;color:#ffffff;">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9fd1c3;">CBAM Compliance</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;">Ihre Anfrage ist eingegangen</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 34px;">
                <p style="margin:0;font-size:16px;line-height:1.8;color:#475569;">Hallo ${escapeHtml(input.name)},</p>
                <p style="margin:14px 0 0;font-size:16px;line-height:1.8;color:#475569;">vielen Dank für Ihre Anfrage zu <strong>${escapeHtml(input.service)}</strong>. Wir prüfen Ihre Angaben und melden uns zeitnah mit einer ersten Einordnung zum sinnvollen Vorgehen.</p>
                <div style="margin-top:24px;padding:20px;border-radius:18px;background:#eef6f3;color:#275b4f;">
                  <strong>Nächster Schritt:</strong> Falls vorhanden, halten Sie Importdaten, KN-/CN-Codes, Ursprungsländer und grobe Mengen bereit. Das beschleunigt die erste Bewertung.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const fallbackTo = from ? emailFromAddress(from) : "";
    const to = process.env.CBAM_CONTACT_TO_EMAIL?.trim() || process.env.CBAM_REPORT_NOTIFY_EMAIL?.trim() || fallbackTo;

    if (!apiKey || !from || !to) {
      return NextResponse.json(
        { error: "Der E-Mail-Versand ist noch nicht konfiguriert. Bitte RESEND_API_KEY, RESEND_FROM_EMAIL und CBAM_CONTACT_TO_EMAIL setzen." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const input = {
      name: isString(body.name) ? body.name.trim() : "",
      company: isString(body.company) ? body.company.trim() : "",
      email: isString(body.email) ? body.email.trim().toLowerCase() : "",
      phone: isString(body.phone) ? body.phone.trim() : "",
      service: isString(body.service) ? body.service.trim() : "",
      message: isString(body.message) ? body.message.trim() : ""
    };

    if (!input.name || !input.company || !input.service || !input.message) {
      throw new Error("Bitte füllen Sie alle Pflichtfelder aus.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    }

    const resend = new Resend(apiKey);
    const internal = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `Neue CBAM-Anfrage: ${input.company}`,
      html: createInternalEmail(input)
    });

    if (internal.error) {
      return NextResponse.json({ error: internal.error.message }, { status: 502 });
    }

    const confirmation = await resend.emails.send({
      from,
      to: input.email,
      replyTo: to,
      subject: "Ihre Anfrage bei CBAM Compliance",
      html: createConfirmationEmail(input)
    });

    if (confirmation.error) {
      return NextResponse.json({ error: confirmation.error.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
