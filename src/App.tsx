import { useEffect } from "react";
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-ink text-white">
      <Navbar />
      <main>
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
