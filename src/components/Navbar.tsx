import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { NAV, PHONE } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-deep/80 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <img src="/edited_logo.png" alt="ExpertAction" className="h-9 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <CTAButton>
              <a
                href={`tel:${PHONE}`}
                className="hidden md:inline-flex items-center gap-2 rounded-full btn-cta px-5 py-2.5 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" /> Enroll Now
              </a>
            </CTAButton>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] bg-navy-deep/95 backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between px-5 py-5">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <img src="/edited_logo.png" alt="ExpertAction" className="h-9 w-auto" />
          </a>
          <button onClick={() => setOpen(false)} className="p-2" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 pt-16">
          {NAV.map((n, i) => (
            <motion.a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: open ? 0.1 + i * 0.06 : 0, duration: 0.4 }}
              className="text-2xl font-display font-bold hover:text-primary transition-colors"
            >
              {n.label}
            </motion.a>
          ))}
          <CTAButton>
            <motion.a
              href={`tel:${PHONE}`}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: open ? 0.5 : 0, duration: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full btn-cta px-8 py-4 text-base font-semibold"
            >
              <Phone className="h-5 w-5" /> Enroll Now
            </motion.a>
          </CTAButton>
        </nav>
      </motion.div>
    </>
  );
}