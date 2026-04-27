"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";

const inputClass =
  "focus-ring mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          service: String(formData.get("service") ?? ""),
          message: String(formData.get("message") ?? "")
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Ihre Anfrage konnte nicht gesendet werden.");
      }

      setSent(true);
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Ihre Anfrage konnte nicht gesendet werden.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="glass p-8">
        <p className="text-xl font-semibold text-navy">Vielen Dank.</p>
        <p className="mt-3 leading-7 text-slate-600">
          Ihre Anfrage wurde übermittelt. Wir melden uns zeitnah bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form className="glass grid gap-5 p-6 sm:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-navy">
          Name
          <input className={inputClass} name="name" autoComplete="name" required />
        </label>
        <label className="text-sm font-medium text-navy">
          Unternehmen
          <input className={inputClass} name="company" autoComplete="organization" required />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-navy">
          E-Mail
          <input className={inputClass} name="email" type="email" autoComplete="email" required />
        </label>
        <label className="text-sm font-medium text-navy">
          Telefonnummer
          <input className={inputClass} name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label className="text-sm font-medium text-navy">
        Welche Leistung interessiert Sie?
        <select className={inputClass} name="service" required defaultValue="">
          <option value="" disabled>
            Bitte auswählen
          </option>
          <option>CBAM-Betroffenheitsanalyse</option>
          <option>CBAM-Readiness-Paket</option>
          <option>Lieferanten-Datenpaket</option>
          <option>Registrierungsvorbereitung</option>
          <option>Laufende CBAM-Begleitung</option>
          <option>Ich bin mir nicht sicher</option>
        </select>
      </label>
      <label className="text-sm font-medium text-navy">
        Nachricht
        <textarea className={`${inputClass} min-h-36 resize-y`} name="message" required />
      </label>
      <label className="flex gap-3 text-sm leading-6 text-slate-600">
        <input className="focus-ring mt-1 h-4 w-4 rounded border-slate-300 text-navy" type="checkbox" required />
        <span>Ich akzeptiere die Datenschutzhinweise und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.</span>
      </label>
      {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">{error}</div>}
      <Button type="submit" className="w-full sm:w-fit" disabled={sending}>
        {sending ? "Anfrage wird gesendet ..." : "Anfrage senden"}
      </Button>
    </form>
  );
}
