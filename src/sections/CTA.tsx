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
  return (
    <section className="section-padding py-20">
      <div className="cta-panel relative overflow-hidden rounded-[24px] border border-green/40 bg-gradient-to-r from-[#08213C] via-[#0b2748] to-[#08213C] px-8 py-16 text-center">
        <div className="absolute inset-0 bg-hero-glow opacity-70" />
        <div className="cta-aurora absolute inset-0" />
        <div className="cta-grid absolute inset-0" />
        <div className="cta-shimmer absolute inset-0" />
        <span className="cta-orb cta-orb--one absolute -top-28 left-10 h-56 w-56" />
        <span className="cta-orb cta-orb--two absolute -bottom-32 right-10 h-64 w-64" />
        {particles.map((particle, index) => (
          <span
            key={index}
            className="absolute h-2 w-2 rounded-full bg-green/60 animate-float"
            style={{ top: particle.top, left: particle.left }}
          />
        ))}
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-green">
            Next-Gen Freight
          </p>
          <h2 className="mt-6 text-3xl md:text-4xl font-display font-semibold">
            Ready To Move Freight Smarter?
          </h2>
          <p className="mt-4 text-white/70">
            Partner with EG TRANS for premium logistics, seamless visibility, and
            enterprise-level execution across Australia.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="#contact" className="bg-green text-navy shadow-glow">
              Get Quote <FiArrowUpRight />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
