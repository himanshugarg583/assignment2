import { useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiPackage,
  FiTruck
} from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import roadImage from "../image/second.avif";
import warehouseImage from "../image/third.webp";

const services = [
  {
    number: "01",
    title: "Road Freight Services",
    description: "Nationwide road freight with live tracking and priority handling.",
    icon: FiTruck,
    image: roadImage
  },
  {
    number: "02",
    title: "Warehousing Services",
    description: "Secure storage, inventory management, and rapid dispatch support.",
    icon: FiPackage,
    image: warehouseImage
  }
];


function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const smoothY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 8);
    rotateY.set(x * 10);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: smoothX, rotateY: smoothY }}
        whileHover={{ y: -10, boxShadow: "0 26px 55px rgba(0, 0, 0, 0.35)" }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="service-card glass-card rounded-[24px] p-6 transition-transform duration-300 hover:shadow-glow"
      >
        <div className="service-card-inner">{children}</div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 18 }
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>(".service-image img");
      images.forEach((image) => {
        gsap.to(image, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section-padding py-20" ref={sectionRef}>
      <div className="flex flex-col gap-12">
        <SectionHeading
          label="Our Services"
          title="Our Services"
          description="From temperature-controlled transport to regional distribution — we’ve got it covered."
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <TiltCard>
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-green/15 border border-green/30 flex items-center justify-center text-green">
                      <Icon />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{service.title}</h3>
                  {service.description && (
                    <p className="mt-3 text-sm text-white/70">
                      {service.description}
                    </p>
                  )}
                  <div className="service-image mt-5 overflow-hidden rounded-[18px] border border-white/10">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="h-44 w-full object-cover"
                      loading="eager"
                      decoding="async"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
