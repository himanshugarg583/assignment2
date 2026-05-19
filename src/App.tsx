import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import TrustedMarquee from "./sections/TrustedMarquee";
import Services from "./sections/Services";
import WhyChoose from "./sections/WhyChoose";
import LogisticsMap from "./sections/LogisticsMap";
import ProcessTimeline from "./sections/ProcessTimeline";
import IndustriesBento from "./sections/IndustriesBento";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Footer from "./components/Footer";

export default function App() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.1,
      lerp: 0.08
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const glow = glowRef.current;
    let cleanupPointer = () => {};
    if (glow) {
      const setX = gsap.quickTo(glow, "x", { duration: 0.35, ease: "power3.out" });
      const setY = gsap.quickTo(glow, "y", { duration: 0.35, ease: "power3.out" });
      const setOpacity = gsap.quickTo(glow, "opacity", {
        duration: 0.25,
        ease: "power2.out"
      });

      const handleMove = (event: PointerEvent) => {
        setX(event.clientX);
        setY(event.clientY);
        setOpacity(1);
      };

      const handleLeave = () => {
        setOpacity(0);
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerleave", handleLeave);

      cleanupPointer = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerleave", handleLeave);
      };
    }

    return () => {
      lenis.destroy();
      cleanupPointer();
    };
  }, []);

  return (
    <div className="bg-ink text-white relative">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div ref={glowRef} className="cursor-glow" />
      <Navbar />
      <main className="relative z-10 page-fade">
        <Hero />
        <TrustedMarquee />
        <Services />
        <WhyChoose />
        <LogisticsMap />
        <ProcessTimeline />
        <IndustriesBento />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
