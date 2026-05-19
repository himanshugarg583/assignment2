import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import MagneticButton from "../components/MagneticButton";

const particles = [
  { top: "12%", left: "8%" },
  { top: "30%", left: "80%" },
  { top: "60%", left: "20%" },
  { top: "75%", left: "70%" },
  { top: "20%", left: "45%" }
];

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".cta-reveal", {
        opacity: 0,
        y: 24,
        filter: "blur(6px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding py-20" ref={sectionRef}>
      <div className="cta-panel cta-gradient relative overflow-hidden rounded-[24px] border border-green/40 bg-gradient-to-r from-[#08213C] via-[#0b2748] to-[#08213C] px-8 py-16 text-center">
        <div className="absolute inset-0 bg-hero-glow opacity-70" />
        <div className="cta-aurora absolute inset-0" />
        <div className="cta-grid absolute inset-0" />
        <div className="cta-shimmer absolute inset-0" />
        <span className="cta-orb cta-orb--one absolute -top-28 left-10 h-56 w-56" />
        <span className="cta-orb cta-orb--two absolute -bottom-32 right-10 h-64 w-64" />
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute h-2 w-2 rounded-full bg-green/60 animate-float"
            style={{ top: particle.top, left: particle.left }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          />
        ))}
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="cta-reveal text-sm uppercase tracking-[0.4em] text-green">
            Next-Gen Freight
          </p>
          <h2 className="cta-reveal mt-6 text-3xl md:text-4xl font-display font-semibold">
            Ready To Move Freight Smarter?
          </h2>
          <p className="cta-reveal mt-4 text-white/70">
            Partner with EG TRANS for premium logistics, seamless visibility, and
            enterprise-level execution across Australia.
          </p>
          <div className="cta-reveal mt-8 flex justify-center">
            <MagneticButton href="#contact" className="bg-green text-navy shadow-glow">
              Get Quote <FiArrowUpRight />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
