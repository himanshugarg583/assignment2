import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/SectionHeading";
import { quickFacts } from "../data/content";

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const parseValue = (value: string) => {
  const match = value.match(/[\d.]+/);
  const number = match ? Number(match[0]) : 0;
  const suffix = match ? value.replace(match[0], "") : "";
  return { number, suffix };
};

export default function TrustedMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>(".stat-number");
      counters.forEach((counter) => {
        const target = Number(counter.dataset.target ?? "0");
        const suffix = counter.dataset.suffix ?? "";
        const decimals = `${target}`.includes(".")
          ? `${target}`.split(".")[1].length
          : 0;
        const tracker = { value: 0 };

        gsap.to(tracker, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 80%"
          },
          onUpdate: () => {
            counter.textContent = `${tracker.value.toFixed(decimals)}${suffix}`;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding py-16 bg-white" ref={sectionRef}>
      <div className="flex flex-col gap-10">
        <SectionHeading
          label="Quick Facts"
          title="Trusted by dozens of Companies across Industries."
          tone="light"
        />
        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {quickFacts.map((fact) => {
            const { number, suffix } = parseValue(fact.value);
            return (
              <motion.div
                key={fact.label}
                className="stat-card rounded-[20px] bg-white/70 p-4 shadow-soft"
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <p
                  className="stat-number text-4xl font-display font-semibold text-navy"
                  data-target={number}
                  data-suffix={suffix}
                >
                  {fact.value}
                </p>
                <p className="mt-3 text-sm text-navy/70">{fact.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
