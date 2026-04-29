"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
};

const storageKey = "cbam-cookie-consent-v1";

function updateGoogleConsent(choice: ConsentChoice) {
  const win = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  win.dataLayer = win.dataLayer ?? [];
  win.gtag =
    win.gtag ??
    function gtagFallback(...args: unknown[]) {
      win.dataLayer?.push(args);
    };

  win.gtag("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied"
  });
  win.dataLayer.push({ event: "cookie_consent_update", cookieConsent: choice });
}

function readStoredConsent() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as ConsentChoice) : null;
  } catch {
    return null;
  }
}

function persistConsent(choice: ConsentChoice) {
  window.localStorage.setItem(storageKey, JSON.stringify(choice));
  updateGoogleConsent(choice);
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function hasStoredConsent() {
  return window.localStorage.getItem(storageKey) !== null;
}

export function CookieBanner() {
  const consentStored = useSyncExternalStore(subscribeToConsent, hasStoredConsent, () => true);
  const [dismissed, setDismissed] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();

    if (stored) {
      updateGoogleConsent(stored);
    }
  }, [consentStored]);

  useEffect(() => {
    if (consentStored || dismissed) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [consentStored, dismissed]);

  function save(choice: ConsentChoice) {
    persistConsent(choice);
    setAnalytics(choice.analytics);
    setMarketing(choice.marketing);
    setDismissed(true);
  }

  if (consentStored || dismissed) {
    return null;
  }

  return (
    <div
      aria-labelledby="cookie-banner-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-navy/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
    >
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-navy/25 sm:p-7">
        <div>
          <p id="cookie-banner-title" className="text-xl font-semibold text-navy">
            Cookie-Einstellungen
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Wir nutzen notwendige Cookies für den Betrieb der Website. Statistik- und Marketing-Cookies, inklusive Google Ads
            Conversion-Messung, verwenden wir nur mit Ihrer Einwilligung. Details finden Sie in der{" "}
            <Link className="font-semibold text-navy underline underline-offset-4 hover:text-accent" href="/datenschutz">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <input checked disabled className="mt-1 h-4 w-4 rounded border-slate-300 text-navy" type="checkbox" />
              <span>
                <span className="block font-semibold text-navy">Notwendig</span>
                Immer aktiv
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <input
                checked={analytics}
                className="focus-ring mt-1 h-4 w-4 rounded border-slate-300 text-navy"
                onChange={(event) => setAnalytics(event.target.checked)}
                type="checkbox"
              />
              <span>
                <span className="block font-semibold text-navy">Statistik</span>
                Reichweitenmessung
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 sm:col-span-2">
              <input
                checked={marketing}
                className="focus-ring mt-1 h-4 w-4 rounded border-slate-300 text-navy"
                onChange={(event) => setMarketing(event.target.checked)}
                type="checkbox"
              />
              <span>
                <span className="block font-semibold text-navy">Marketing</span>
                Google Ads Conversion- und Remarketing-Signale
              </span>
            </label>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <button
              className="focus-ring rounded-full border border-accent bg-white px-4 py-3 text-sm font-semibold text-accent hover:bg-[#eef6f3]"
              onClick={() => save({ analytics: false, marketing: false })}
              type="button"
            >
              Ablehnen
            </button>
            <button
              className="focus-ring rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/15 hover:bg-[#35685b]"
              onClick={() => save({ analytics, marketing })}
              type="button"
            >
              Auswahl speichern
            </button>
            <button
              className="focus-ring rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/15 hover:bg-[#35685b]"
              onClick={() => save({ analytics: true, marketing: true })}
              type="button"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
