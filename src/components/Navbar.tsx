import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-deep/80 backdrop-blur-xl border-b border-white/10 py-2 sm:py-3"
            : "bg-transparent py-3 sm:py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 lg:gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0 min-w-0">
            <img
              src="/edited_logo.png"
              alt="ExpertAction"
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 min-w-0">
            {NAV.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group whitespace-nowrap"
                activeProps={{
                  className: "text-primary",
                }}
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
            <CTAButton>
              <Link
                to={`/contact`}
                className="hidden md:inline-flex items-center gap-2 rounded-full btn-cta px-4 lg:px-5 py-2 lg:py-2.5 text-sm font-semibold whitespace-nowrap"
              >
                <Phone className="h-4 w-4" /> Enroll Now
              </Link>
            </CTAButton>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-foreground rounded-md hover:bg-white/5 transition-colors"
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
        className="fixed inset-0 z-[60] bg-navy-deep/95 backdrop-blur-2xl overflow-y-auto"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/5">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src="/edited_logo.png" alt="ExpertAction" className="h-10 sm:h-12 w-auto" />
          </a>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-6 sm:gap-8 px-6 pt-10 sm:pt-16 pb-16">
          {NAV.map((n) => (
            <motion.div key={n.href} className="w-full max-w-xs text-center">
              <Link
                to={n.href}
                onClick={() => setOpen(false)}
                className="block text-2xl sm:text-3xl font-display font-bold hover:text-primary transition-colors"
                activeProps={{
                  className: "block text-2xl sm:text-3xl font-display font-bold text-primary",
                }}
              >
                {n.label}
              </Link>
            </motion.div>
          ))}
          <CTAButton>
            <motion.a
              href={`tel:${PHONE}`}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: open ? 0.5 : 0, duration: 0.4 }}
              className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-full btn-cta px-7 sm:px-8 py-3.5 sm:py-4 text-base font-semibold"
            >
              <Phone className="h-5 w-5" /> Enroll Now
            </motion.a>
          </CTAButton>
        </nav>
      </motion.div>
    </>
  );
}
