import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
    icon: FiTruck,
    image: roadImage
  },
  {
    number: "02",
    title: "Warehousing Services",
    icon: FiPackage,
    image: warehouseImage
  }
];


function TiltCard({
  children
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;
    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    });
  };

  const handleLeave = () => {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg)" });
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="service-card glass-card rounded-[24px] p-6 transition-transform duration-300 hover:shadow-glow"
      >
        {children}
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
          y: 28,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      });

      const images = gsap.utils.toArray<HTMLElement>(".service-image");
      images.forEach((image) => {
        gsap.fromTo(
          image,
          { opacity: 0, y: 18, scale: 1.02 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
              invalidateOnRefresh: true
            }
          }
        );
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
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title}>
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
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
