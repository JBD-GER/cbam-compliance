import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LegalNotice } from "@/components/LegalNotice";

const navigationLinks = [
  { href: "/leistungen", label: "CBAM-Pakete" },
  { href: "/cbam-kostenrechner", label: "Kostenrechner" },
  { href: "/fallstudien", label: "Fallstudien" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/beratung", label: "Beratung" }
];

const companyLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/philosophie", label: "Philosophie" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" }
];

const serviceLinks = [
  { href: "/leistungen/cbam-betroffenheitsanalyse", label: "CBAM-Betroffenheitsanalyse" },
  { href: "/leistungen/cbam-readiness", label: "CBAM-Readiness-Paket" },
  { href: "/leistungen/lieferanten-datenpaket", label: "Lieferanten-Datenpaket" },
  { href: "/leistungen/cbam-registrierungsvorbereitung", label: "CBAM-Registrierungsvorbereitung" },
  { href: "/leistungen/laufende-begleitung", label: "Laufende CBAM-Begleitung" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_1.15fr_0.9fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm leading-7 text-slate-600">
            CBAM-Compliance.de unterstützt Importeure bei Datenanalyse, Lieferantenkommunikation und organisatorischer CBAM-Vorbereitung.
          </p>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-5 text-sm leading-6 text-slate-600 shadow-sm">
            <p className="font-semibold text-navy">Kontakt</p>
            <dl className="mt-3 grid gap-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Unternehmen</dt>
                <dd className="mt-1 font-medium text-slate-700">Flaaq Holding GmbH</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Adresse</dt>
                <dd className="mt-1">Großer Kamp 5a, 31633 Leese</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Telefon</dt>
                <dd className="mt-1">
                  <a href="tel:+4957618429666" className="font-medium text-navy hover:text-accent">
                    05761 8429666
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">E-Mail</dt>
                <dd className="mt-1">
                  <a href="mailto:info@cbam-compliance.de" className="font-medium text-navy hover:text-accent">
                    info@cbam-compliance.de
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-navy">Navigation</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-navy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-navy">Unternehmen</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-navy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="font-semibold text-navy">CBAM-Pakete</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {serviceLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link href={link.href} className="hover:text-navy">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl">
        <LegalNotice />
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} CBAM Compliance. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
