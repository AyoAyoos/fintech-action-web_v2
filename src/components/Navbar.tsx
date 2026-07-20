"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone ,MessageCircle} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { NAV,PHONE_DISPLAY, PHONE, WHATSAPP } from "@/lib/constants";

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
      {/* Wrapper to control screen width centering */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 pointer-events-none">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className={`w-full max-w-5xl rounded-full bg-[#111827] shadow-xl border border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
            scrolled ? "bg-[#111827]/95 backdrop-blur-xl scale-98 shadow-[#111827]/20" : "scale-100"
          }`}
        >
          {/* LOGO AREA */}
          <Link to="/" className="flex items-center gap-2 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-[#2563EB] text-white text-base font-black shadow-inner">
                E
              </div>
              <span className="font-sans font-black text-base tracking-tight text-white uppercase">
                Expert<span className="text-[#2563EB]">Action</span>
                <sup className="text-[9px] font-bold text-[#2563EB] ml-0.5">®</sup>
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <motion.nav
            className="hidden lg:flex items-center justify-center gap-6 xl:gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.05, delayChildren: 0.1 },
              },
            }}
          >
            {NAV.map((n) => (
              <motion.div
                key={n.href}
                variants={{
                  hidden: { opacity: 0, y: -8 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link
                  to={n.href}
                  className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors relative group py-1 block uppercase tracking-wider"
                  activeProps={{
                    className: "text-[#2563EB]",
                  }}
                >
                  {n.label}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[#2563EB] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* CTA BUTTON / ACTION AREA */}
          <motion.div
            className="flex items-center gap-3 shrink-0"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            {/* The fixed button block */}
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-white text-[#111827] hover:bg-zinc-100 transition-colors px-5 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wide shadow-sm"
            >
              <Phone className="h-3.5 w-3.5 text-[#2563EB] stroke-[3]" /> Enroll Now
            </motion.a>
            
            


            {/* Mobile Hamburger toggle */}
            <motion.button
              onClick={() => setOpen(true)}
              className="lg:hidden p-1.5 text-zinc-400 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Open menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.header>
      </div>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[60] bg-[#111827]/98 backdrop-blur-2xl overflow-y-auto flex flex-col justify-between p-6"
      >
        <div className="flex items-center justify-between w-full border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-[#2563EB] text-white text-base font-black">
              E
            </div>
            <span className="font-sans font-black text-base tracking-tight text-white uppercase">
              Expert<span className="text-[#2563EB]">Action</span>
            </span>
          </div>
          
          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={open ? "close" : "menu"}
              onClick={() => setOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 transition-colors"
              aria-label="Close menu"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          </AnimatePresence>
        </div>

        <motion.nav
          className="flex flex-col items-center justify-center gap-6 my-auto"
          initial="hidden"
          animate={open ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.05, delayChildren: 0.1 },
            },
          }}
        >
          {NAV.map((n) => (
            <motion.div
              key={n.href}
              className="w-full text-center"
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={n.href}
                onClick={() => setOpen(false)}
                className="block text-2xl font-black text-zinc-300 hover:text-[#2563EB] transition-colors uppercase tracking-wider"
                activeProps={{
                  className: "block text-2xl font-black text-[#2563EB] uppercase tracking-wider",
                }}
              >
                {n.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        
      </motion.div>
    </>
  );
}