import { motion } from "framer-motion";

type Props = {
  label: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
};

export default function SectionHeading({
  label,
  title,
  description,
  tone = "dark"
}: Props) {
  const isLight = tone === "light";

  return (
    <div className="max-w-2xl">
      <motion.p
        className="text-sm uppercase tracking-[0.4em] text-green"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.p>
      <motion.h2
        className={`mt-4 text-3xl md:text-4xl font-display font-semibold ${
          isLight ? "text-navy" : "text-white"
        }`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`mt-4 ${isLight ? "text-navy/70" : "text-white/70"}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
