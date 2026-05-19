import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import MagneticButton from "./MagneticButton";
import logo from "../image/logo.svg";

const navLinks = [
  { label: "Who We Are", href: "#who" },
  { label: "What We Offer", href: "#services" },
  { label: "Our Fleet", href: "#fleet" },
  { label: "Industries", href: "#industries" },
  { label: "Technologies", href: "#technologies" },
  { label: "Reach Us", href: "#contact" },
  { label: "Login", href: "#login" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("eg-theme");
    return stored === "dark" ? "dark" : "light";
  });
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("eg-theme", theme);
  }, [theme]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`section-padding mx-auto flex items-center justify-between py-4 transition-all ${
          scrolled
            ? "bg-white/5 backdrop-blur-2xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center">
          <div className="flex h-14 w-40 items-center justify-center rounded-2xl bg-white/90 px-2">
            <img src={logo} alt="EG trans" className="h-full w-full object-contain" />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm text-white/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:text-green"
            aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
            aria-pressed={isLight}
          >
            {isLight ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>
          <MagneticButton href="tel:1800710388" className="bg-green text-navy shadow-glow">
            1800 710 388 <FiArrowUpRight />
          </MagneticButton>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-ink/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="section-padding py-6 flex flex-col gap-5 text-white/80">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition hover:text-green"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:text-green"
                  aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
                  aria-pressed={isLight}
                >
                  {isLight ? <FiMoon size={18} /> : <FiSun size={18} />}
                </button>
                <MagneticButton href="tel:1800710388" className="bg-green text-navy shadow-glow">
                  1800 710 388 <FiArrowUpRight />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
