import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export default function MagneticButton({
  children,
  className = "",
  href = "#"
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.25 });
  };

  const handleLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic-button inline-flex items-center justify-center gap-2 rounded-full border border-green/40 bg-green px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-all ${className}`}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(60, 185, 140, 0.35)" }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}
