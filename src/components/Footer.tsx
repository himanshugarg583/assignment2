import { motion } from "framer-motion";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone, FiTwitter } from "react-icons/fi";
import logo from "../image/logo.svg";

const footerLinks = [
  "About",
  "Careers",
  "Sustainability",
  "Privacy",
  "Terms"
];

const serviceLinks = [
  "Freight Transport",
  "Warehousing",
  "Refrigerated",
  "Last Mile",
  "Supply Chain"
];

export default function Footer() {
  return (
    <footer id="contact" className="footer-dark section-padding bg-[var(--footer-bg)] pt-20 pb-10">
      <motion.div
        className="grid gap-12 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } }
        }}
      >
        <motion.div className="space-y-4" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/90 border border-white/20 flex items-center justify-center shadow-glow">
              <img src={logo} alt="EG TRANS" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-[0.3em]">EG TRANS</p>
              <p className="text-xs text-white/60 uppercase">Premium Logistics</p>
            </div>
          </div>
          <p className="text-white/70">
            Smart freight and logistics across Australia with real-time visibility,
            enterprise warehousing, and premium customer experience.
          </p>
          <div className="flex gap-3 text-white/60">
            <a className="hover:text-green transition" href="#">
              <FiLinkedin />
            </a>
            <a className="hover:text-green transition" href="#">
              <FiTwitter />
            </a>
            <a className="hover:text-green transition" href="#">
              <FiInstagram />
            </a>
            <a className="hover:text-green transition" href="#">
              <FiFacebook />
            </a>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {footerLinks.map((link) => (
              <li key={link}>
                <a className="footer-link hover:text-green transition" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {serviceLinks.map((link) => (
              <li key={link}>
                <a className="footer-link hover:text-green transition" href="#services">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="space-y-4" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Contact</p>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <FiPhone />
            +61 1800 555 472
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <FiMail />
            operations@egtrans.com.au
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <FiMapPin />
            Sydney, Melbourne, Brisbane, Perth
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p>EG TRANS Logistics. All rights reserved.</p>
        <p>Built for premium freight operations.</p>
      </div>
    </footer>
  );
}
