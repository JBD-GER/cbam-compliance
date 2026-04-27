import { LinkButton } from "@/components/Button";

type CTASectionProps = {
  title?: string;
  text?: string;
  button?: string;
};

export function CTASection({
  title = "Sie importieren CBAM-relevante Waren?",
  text = "Dann sollten Sie frühzeitig klären, ob Ihr Unternehmen betroffen ist, welche Lieferanten relevant sind und welche internen Schritte vorbereitet werden müssen.",
  button = "Kostenlose Ersteinschätzung anfragen"
}: CTASectionProps) {
  return (
    <section className="px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-accent px-6 py-12 text-white shadow-2xl shadow-accent/20 sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-8 text-white/78 sm:text-lg">{text}</p>
          </div>
          <LinkButton href="/beratung" variant="light" className="justify-self-start lg:justify-self-end">
            {button}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
