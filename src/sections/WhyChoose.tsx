import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowUpRight,
  FiEye,
  FiMessageCircle,
  FiShield,
  FiZap
} from "react-icons/fi";
import MagneticButton from "../components/MagneticButton";
import SectionHeading from "../components/SectionHeading";

const rightCards = [
  {
    icon: FiMessageCircle,
    title: "Multilingual support across Australia",
    anim: "multilingual"
  },
  {
    icon: FiEye,
    title: "Real-Time Shipment Visibility",
    anim: "visibility"
  },
  {
    icon: FiZap,
    title: "Fast Delivery across Australia",
    anim: "fast"
  },
  {
    icon: FiShield,
    title: "Certified and Compliant Fleet",
    anim: "certified"
  }
] as const;

type CardAnim = (typeof rightCards)[number]["anim"];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 18 }
  }
};

function CardDecoration({ variant }: { variant: CardAnim }) {
  switch (variant) {
    case "multilingual":
      return (
        <>
          <span className="why-orbit why-orbit--1" aria-hidden="true" />
          <span className="why-orbit why-orbit--2" aria-hidden="true" />
          <span className="why-orbit why-orbit--3" aria-hidden="true" />
        </>
      );
    case "visibility":
      return <span className="why-scan" aria-hidden="true" />;
    case "fast":
      return (
        <>
          <span className="why-speed why-speed--1" aria-hidden="true" />
          <span className="why-speed why-speed--2" aria-hidden="true" />
        </>
      );
    case "certified":
      return (
        <>
          <span className="why-shield why-shield--1" aria-hidden="true" />
          <span className="why-shield why-shield--2" aria-hidden="true" />
        </>
      );
    default:
      return null;
  }
}

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".why-parallax", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="section-padding py-20" ref={sectionRef}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="why-parallax space-y-8">
          <SectionHeading
            label="Why EG TRANS"
            title="Why Leading Businesses Rely on Us"
            description="We combine smart operations with real-world reliability to move what matters - faster, safer, and smarter."
          />
          <div>
            <MagneticButton href="#services" className="bg-green text-navy shadow-glow">
              Know More About Us <FiArrowUpRight />
            </MagneticButton>
          </div>
        </div>

        <motion.div
          className="grid gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {rightCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className="why-card glass-card rounded-[24px] p-6"
                variants={cardVariants}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4
                }}
                whileHover={{ y: -8, boxShadow: "0 24px 50px rgba(0,0,0,0.35)" }}
              >
                <div className="why-icon h-24 w-24 rounded-2xl bg-green/15 border border-green/30 flex items-center justify-center text-green">
                  <Icon className="why-icon__glyph" />
                  <CardDecoration variant={card.anim} />
                </div>
                <h3 className="mt-4 text-base font-semibold">{card.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
