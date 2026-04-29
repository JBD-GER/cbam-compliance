"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LinkButton } from "@/components/Button";

const nav = [
  { href: "/cbam-kostenrechner", label: "Kostenrechner" },
  { href: "/fallstudien", label: "Fallstudien" },
  { href: "/beratung", label: "Beratung" }
];

const packages = [
  { href: "/leistungen", label: "Alle CBAM-Dienstleistungen" },
  { href: "/leistungen/cbam-betroffenheitsanalyse", label: "CBAM-Betroffenheitsanalyse" },
  { href: "/leistungen/cbam-readiness", label: "CBAM-Readiness-Dienstleistung" },
  { href: "/leistungen/lieferanten-datenpaket", label: "Lieferanten-Datendienstleistung" },
  { href: "/leistungen/cbam-registrierungsvorbereitung", label: "CBAM-Registrierungsvorbereitung" },
  { href: "/leistungen/laufende-begleitung", label: "Laufende CBAM-Begleitung" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
          <div className="group relative">
            <button
              className="text-sm font-medium text-slate-700 transition hover:text-navy group-hover:text-navy"
              type="button"
              aria-haspopup="true"
            >
              CBAM-Dienstleistung
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-80 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
                {packages.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-navy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <LinkButton href="/beratung">Kontakt aufnehmen</LinkButton>
        </div>
        <button
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy md:hidden"
          type="button"
          aria-label="Mobile Navigation öffnen"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative h-4 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white/95 px-5 py-5 shadow-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4" aria-label="Mobile Navigation">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">CBAM-Dienstleistungen</p>
              {packages.map((item) => (
                <Link key={`${item.href}-${item.label}`} href={item.href} className="block rounded-xl px-3 py-3 font-medium text-slate-800 hover:bg-white" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-3 font-medium text-slate-800 hover:bg-slate-50" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <LinkButton href="/beratung" className="mt-2" onClick={() => setOpen(false)}>
              Kontakt aufnehmen
            </LinkButton>
          </nav>
        </div>
      )}
    </header>
  );
}
