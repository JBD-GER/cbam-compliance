const iconClass = "h-16 w-16";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

const industries = [
  {
    label: "Dünger",
    icon: (
      <svg viewBox="0 0 64 64" className={iconClass} aria-hidden="true">
        <path {...stroke} d="M18 24h28v28H18z" />
        <path {...stroke} d="M22 24v-8h10v8M36 24v-8h10v8" />
        <path {...stroke} d="M25 39c5-8 14-9 20-2-5 9-14 10-20 2Z" />
        <path {...stroke} d="M33 38c-2-6 0-11 5-15" />
        <path {...stroke} d="M23 31h8" />
      </svg>
    )
  },
  {
    label: "Elektrizität",
    icon: (
      <svg viewBox="0 0 64 64" className={iconClass} aria-hidden="true">
        <path {...stroke} d="M43 17a18 18 0 0 1 3 24" />
        <path {...stroke} d="M21 47a18 18 0 0 1-3-24" />
        <path {...stroke} d="m42 10 7 8-9 5" />
        <path {...stroke} d="m22 54-7-8 9-5" />
        <path d="M34 16 22 35h10l-4 15 14-22H32l2-12Z" fill="currentColor" />
      </svg>
    )
  },
  {
    label: "Wasserstoff",
    icon: (
      <svg viewBox="0 0 64 64" className={iconClass} aria-hidden="true">
        <path {...stroke} d="M11 39c12 5 17-9 29-5 6 2 10-3 13-11" />
        <path {...stroke} d="M12 48c13 4 20-8 31-7 6 1 10-3 13-10" />
        <circle cx="45" cy="17" r="3.4" fill="currentColor" />
        <circle cx="52" cy="25" r="2.8" fill="currentColor" />
        <circle cx="38" cy="25" r="2.2" fill="currentColor" />
      </svg>
    )
  },
  {
    label: "Aluminium",
    icon: (
      <svg viewBox="0 0 64 64" className={iconClass} aria-hidden="true">
        <path {...stroke} d="M23 14c0-5 18-5 18 0v36c0 5-18 5-18 0V14Z" />
        <path {...stroke} d="M23 14c0 5 18 5 18 0M23 50c0 5 18 5 18 0" />
        <path {...stroke} d="M29 23h7M29 31h7" />
      </svg>
    )
  },
  {
    label: "Zement",
    icon: (
      <svg viewBox="0 0 64 64" className={iconClass} aria-hidden="true">
        <path {...stroke} d="M21 15h22l6 34H15l6-34Z" />
        <path {...stroke} d="m21 15 11 9 11-9M15 49l17-11 17 11" />
        <path {...stroke} d="M24 55h16" />
      </svg>
    )
  },
  {
    label: "Eisen & Stahl",
    icon: (
      <svg viewBox="0 0 64 64" className={iconClass} aria-hidden="true">
        <path {...stroke} d="M9 48h46" />
        <path {...stroke} d="m14 48 8-13h16l8 13" />
        <path {...stroke} d="m29 35 7-14h13l8 27" />
        <path {...stroke} d="M21 35h17M36 21h13" />
      </svg>
    )
  }
];

export function IndustrySection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Welche <span className="text-accent">Branchen</span> sind betroffen?
        </h2>
        <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
          Die CBAM-Berichtspflichten gelten für Unternehmen, die folgende Warengruppen aus Drittstaaten importieren.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry) => (
            <div key={industry.label} className="group flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-accent/8 text-accent ring-1 ring-accent/12 transition group-hover:-translate-y-1 group-hover:bg-accent group-hover:text-white group-hover:shadow-xl group-hover:shadow-accent/15">
                {industry.icon}
              </div>
              <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate-950">{industry.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
