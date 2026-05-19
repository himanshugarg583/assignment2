import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import manufacturingImage from "../image/fourth.avif";
import restaurantsImage from "../image/fifth.avif";
import transportImage from "../image/six.avif";
import automotiveImage from "../image/seven.jpg";
import pharmaImage from "../image/eight.avif";

const industries = [
  {
    title: "Manufacturing & Distribution",
    description: "Apples in a factory conveyor belt.",
    image: manufacturingImage
  },
  {
    title: "Restaurants",
    description: "Shelves full of pharmaceutical products",
    image: restaurantsImage
  },
  {
    title: "Transportation Industry",
    description: "Beige and green Rubber Components",
    image: transportImage
  },
  {
    title: "Automotive Industry",
    description: "Electronic products (monitor, laptop, tablet, phone) on a table.",
    image: automotiveImage
  },
  {
    title: "Pharmaceutical Industry",
    description: "View inside a Shopping Center",
    image: pharmaImage
  }
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: 8,
    scale: 0.98
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18
    }
  },
  hover: {
    y: -8,
    boxShadow: "0 22px 50px rgba(0, 0, 0, 0.35)"
  }
};

const imageVariants = {
  hidden: { scale: 1.06 },
  show: {
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  hover: { scale: 1.08 }
};

const shineVariants = {
  hidden: { x: "-120%", opacity: 0 },
  show: { x: "-120%", opacity: 0 },
  hover: {
    x: "120%",
    opacity: 1,
    transition: { duration: 0.9, ease: "easeInOut" }
  }
};

export default function ProcessTimeline() {
  return (
    <section id="process" className="section-padding py-20">
      <div className="flex flex-col gap-12">
        <SectionHeading
          label="Why EG TRANS"
          title="Industries We Serve"
          description="Each industry has its own logistics DNA - we tailor our services to meet yours with precision, reliability, and care."
        />

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.title}
              className="glass-card overflow-hidden rounded-[24px] relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                variants={shineVariants}
              />
              <div className="h-40 w-full overflow-hidden">
                <motion.img
                  src={industry.image}
                  alt={industry.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  variants={imageVariants}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{industry.title}</h3>
                <p className="mt-2 text-sm text-white/70">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
