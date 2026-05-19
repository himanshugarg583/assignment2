import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import SectionHeading from "../components/SectionHeading";

export default function LogisticsMap() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const ctx = gsap.context(() => {
      const routes = gsap.utils.toArray<SVGPathElement>(".map-route");
      routes.forEach((route, index) => {
        const length = route.getTotalLength();
        gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(route, {
          strokeDashoffset: 0,
          duration: 2 + index * 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        });
      });

      const dots = gsap.utils.toArray<SVGCircleElement>(".map-dot");
      dots.forEach((dot, index) => {
        const path = routes[index % routes.length];
        if (!path) return;
        gsap.to(dot, {
          duration: 6 + index * 1.4,
          repeat: -1,
          ease: "none",
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5]
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play pause resume pause"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="network"
      className="section-padding py-20 relative"
      ref={sectionRef}
    >
      <div id="tracking" className="absolute -top-24" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
        <SectionHeading
          label="Logistics Map"
          title="Futuristic network coverage across Australia"
          description="Animated routes, pulsing hubs, and live shipment movement across major corridors."
        />
        <motion.div
          className="relative rounded-[24px] glass-card p-8 overflow-hidden"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-hero-glow opacity-60" />
          <svg viewBox="0 0 420 300" className="relative z-10 w-full">
            <path
              d="M40 80 L120 40 L220 70 L300 40 L360 90 L350 160 L280 200 L200 210 L120 190 L70 140 Z"
              stroke="#3CB98C"
              strokeOpacity="0.4"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M80 140 L140 100 L220 120 L300 110 L340 150"
              stroke="#3CB98C"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className="map-route"
            />
            <path
              d="M90 200 L150 180 L210 200 L270 190 L330 210"
              stroke="#4CCFA0"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="map-route"
            />
            <path
              d="M110 90 L160 80 L220 90 L270 70 L310 90"
              stroke="#2E8E6B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              className="map-route"
            />
            <circle cx="90" cy="130" r="6" fill="#3CB98C" className="map-pulse" />
            <circle cx="220" cy="120" r="6" fill="#3CB98C" className="map-pulse" />
            <circle cx="320" cy="145" r="6" fill="#3CB98C" className="map-pulse" />
            <circle r="4" fill="#7CF2C8" className="map-dot" />
            <circle r="4" fill="#7CF2C8" className="map-dot" />
            <circle r="4" fill="#7CF2C8" className="map-dot" />
          </svg>

          <motion.div
            className="absolute h-3 w-3 rounded-full bg-green shadow-glow"
            style={{ left: "28%", top: "50%" }}
            animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-3 w-3 rounded-full bg-green shadow-glow"
            style={{ left: "64%", top: "40%" }}
            animate={{ x: [0, -30, 0], y: [0, 18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-4 w-4 rounded-full border border-green/60"
            style={{ left: "20%", top: "65%" }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-green/30"
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>
          <motion.div
            className="absolute h-4 w-4 rounded-full border border-green/60"
            style={{ left: "70%", top: "35%" }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-green/30"
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
