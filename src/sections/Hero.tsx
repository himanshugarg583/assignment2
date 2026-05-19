import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import MagneticButton from "../components/MagneticButton";
import heroImage from "../image/first new.avif";

const statCards = [
  {
    value: "98%",
    label: "On-time delivery",
    detail: "National SLA",
    className: "right-6 top-24"
  },
  {
    value: "320+",
    label: "Fleet assets",
    detail: "Realtime monitored",
    className: "right-24 top-52"
  },
  {
    value: "24/7",
    label: "Operations",
    detail: "Dedicated control",
    className: "right-10 top-[22rem]"
  }
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 28,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12
      });

      gsap.to(".hero-float", {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
        stagger: 0.2
      });

      gsap.to(".hero-parallax", {
        y: -80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden pt-24 sm:pt-28"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-mesh-dark opacity-60" />
        <svg
          className="hero-parallax absolute inset-0 w-full h-full opacity-25"
          viewBox="0 0 900 450"
          fill="none"
        >
          <path
            d="M60 120 L140 80 L220 120 L280 90 L340 130 L420 110 L480 150 L560 130 L640 170 L720 150 L820 200"
            stroke="#3CB98C"
            strokeWidth="2"
            className="animate-route-dash"
          />
          <path
            d="M80 260 L160 240 L220 260 L300 230 L360 260 L420 250 L520 280 L600 270 L680 300"
            stroke="#4CCFA0"
            strokeWidth="1.5"
            className="animate-route-dash"
          />
          <path
            d="M120 360 L220 340 L300 360 L380 330 L460 370 L540 350 L620 380 L700 360"
            stroke="#2E8E6B"
            strokeWidth="1"
            className="animate-route-dash"
          />
        </svg>
        <svg
          className="absolute right-0 top-10 hidden md:block w-full max-w-[620px] opacity-30"
          viewBox="0 0 600 360"
          fill="none"
        >
          <path
            d="M40 140 L120 80 L220 110 L300 70 L380 110 L450 90 L520 130 L560 110 L560 180 L480 220 L380 210 L320 250 L200 230 L120 250 L60 210 Z"
            stroke="#3CB98C"
            strokeWidth="1.2"
          />
          <path
            d="M120 160 L200 140 L280 160 L340 140 L420 160"
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <path
            d="M90 200 L170 190 L260 210 L320 190 L410 210"
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-3xl">
          <h1 className="hero-animate text-3xl sm:text-4xl md:text-6xl font-display font-semibold leading-snug sm:leading-tight">
            Road Freight & Warehousing, Done Right
          </h1>
          <p className="hero-animate mt-6 text-lg text-white/70">
            We are one of the first and Only Logistics company to be registered
            member of United Nations.
          </p>
          <div className="hero-animate mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#contact" className="bg-green text-navy shadow-glow">
              Request a Quote <FiArrowUpRight />
            </MagneticButton>
          </div>
        </div>

        <div className="hero-animate mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-soft">
          <img
            src={heroImage}
            alt="Road freight and warehousing"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`hero-float hidden lg:flex absolute ${card.className} glass-card rounded-[24px] px-5 py-4 gap-3 items-center`}
          >
            <div className="h-12 w-12 rounded-2xl bg-green/20 border border-green/40 flex items-center justify-center text-green">
              {card.value}
            </div>
            <div>
              <p className="text-sm font-semibold">{card.label}</p>
              <p className="text-xs text-white/60">{card.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <div className="h-12 w-7 rounded-full border border-white/20 flex items-start justify-center">
          <span className="mt-1 h-2 w-2 rounded-full bg-green animate-bounce" />
        </div>
        <FiArrowDown className="text-sm" />
      </div>
    </section>
  );
}
