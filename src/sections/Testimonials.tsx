import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { testimonials } from "../data/content";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section-padding py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
        <SectionHeading
          label="Testimonials"
          title="Trusted by teams moving mission-critical freight"
          description="Premium service, realtime visibility, and white-glove delivery experiences."
        />

        <motion.div
          className="relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[active].name}
              initial={{ opacity: 0, y: 24, rotate: -1, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, rotate: 1, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass-card testimonial-card rounded-[24px] p-8"
            >
              <p className="text-lg text-white/80">
                "{testimonials[active].quote}"
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold">
                  {testimonials[active].name}
                </p>
                <p className="text-xs text-white/60">
                  {testimonials[active].role} · {testimonials[active].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 w-2 rounded-full transition ${
                  index === active ? "bg-green" : "bg-white/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
