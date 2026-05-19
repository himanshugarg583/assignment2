import SectionHeading from "../components/SectionHeading";
import { quickFacts } from "../data/content";

export default function TrustedMarquee() {
  return (
    <section className="section-padding py-16 bg-white">
      <div className="flex flex-col gap-10">
        <SectionHeading
          label="Quick Facts"
          title="Trusted by dozens of Companies across Industries."
          tone="light"
        />
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((fact) => (
            <div key={fact.label}>
              <p className="text-4xl font-display font-semibold text-navy">
                {fact.value}
              </p>
              <p className="mt-3 text-sm text-navy/70">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
