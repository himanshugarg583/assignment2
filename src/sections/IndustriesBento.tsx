import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/SectionHeading";
import logoNine from "../image/nine.avif";
import logoTen from "../image/ten.avif";
import logoEleven from "../image/eleven.avif";

const standards = [
  {
    title: "UN Global Compact Member",
    description:
      "EG Trans proudly participates in the United Nations Global Compact, aligning our business strategies with universal principles on human rights, labour, environment, and anti-corruption.",
    logo: logoNine
  },
  {
    title: "WEPs Commitment",
    description:
      "We are signatories of the Women's Empowerment Principles (WEPs), promoting gender equality and empowering women across all levels of our organization.",
    logo: logoTen
  },
  {
    title: "VTA Member",
    description:
      "As active members of the Victorian Transport Association (VTA), we follow best practices in logistics, safety, and workforce development across Australia's transport industry.",
    logo: logoEleven
  }
];

export default function IndustriesBento() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardHeight = 320;
  const pinDistance = (standards.length - 1) * 320 + 200;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".industry-stack-card");
      if (!cards.length) return;

      gsap.set(cards, { y: 350 });
      gsap.set(cards[0], { y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: `+=${pinDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      cards.slice(1).forEach((card, index) => {
        timeline.to(card, { y: 0, duration: 1 }, index);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pinDistance]);

  return (
    <section id="industries" className="section-padding py-20" ref={sectionRef}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <SectionHeading
            label="Industry Standards"
            title="The EG Trans"
            description="Registered with the United Nations Global Compact and aligned with WEPs principles - driving ethics, inclusion, and accountability in every operation. Our focus on safety, driver wellness, and transparency ensures responsible logistics and trusted global partnerships."
          />
        </div>

        <div className="relative" style={{ minHeight: `${cardHeight}px` }}>
          {standards.map((standard, index) => (
            <div
              key={standard.title}
              className="industry-stack-card absolute inset-x-0 rounded-[24px] p-6 overflow-hidden"
              style={{ zIndex: index + 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green/10 via-transparent to-white/5" />
              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <img
                      src={standard.logo}
                      alt={standard.title}
                      className="h-9 w-9 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Trusted Company Logo
                  </p>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{standard.title}</h3>
                <p className="mt-3 text-sm text-white/70">
                  {standard.description}
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-green"
                >
                  Know more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
