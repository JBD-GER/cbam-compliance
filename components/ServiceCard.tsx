import { LinkButton } from "@/components/Button";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  features?: string[];
  cta?: string;
  badge?: string;
};

export function ServiceCard({ title, description, href, features, cta = "Mehr erfahren", badge }: ServiceCardProps) {
  return (
    <article className={`glass relative flex h-full flex-col p-6 ${badge ? "ring-2 ring-accent/30" : ""}`}>
      {badge && (
        <span className="mb-5 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      <div>
        <h3 className="text-xl font-semibold text-navy">{title}</h3>
        <p className="mt-4 leading-7 text-slate-600">{description}</p>
      </div>
      {features && (
        <ul className="mt-6 space-y-3 text-sm text-slate-700">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 pt-2">
        <LinkButton href={href} variant={badge ? "primary" : "secondary"} className="w-full">
          {cta}
        </LinkButton>
      </div>
    </article>
  );
}
