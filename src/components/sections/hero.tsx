"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate, type Variants } from "framer-motion";
import {
  CheckCircle2,
  Book,
  Award,
  Users,
  Calendar,
  Star,
  TrendingUp,
  ShieldCheck,
  Headset,
  PlayCircle
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
export default function AuthorityHero() {
  const shouldReduceMotion = useReducedMotion();

  // Staggered entrance for the left column: heading -> description -> checklist -> CTAs
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen bg-[#0B1120] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-12 flex flex-col justify-between overflow-hidden font-sans">

      {/* ------------------------------------------- */}
      {/* DYNAMIC STOCK MARKET BACKGROUND             */}
      {/* ------------------------------------------- */}
      <HeroBackground shouldReduceMotion={shouldReduceMotion} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
        {/* Responsive grid: single column on mobile/tablet, 12-col on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-6 xl:gap-8 items-center">

          {/* LEFT COLUMN: Main Headlines & Book (Spans 5 cols) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6 text-center lg:text-left items-center lg:items-start min-w-0"
          >
            <motion.div variants={itemVariants} className="flex flex-col w-full">
              {/* Fluid, clamped typography prevents overflow at every breakpoint */}
              <span className="text-white text-[clamp(1.75rem,7vw,4.5rem)] xl:text-7xl font-black leading-[1.1] tracking-tight uppercase">
                Master the Stock Market with
              </span>
              <span className="text-yellow-500 text-[clamp(2.25rem,8.5vw,5.25rem)] xl:text-8xl font-black leading-[1.1] tracking-tight uppercase drop-shadow-[0_0_20px_rgba(234,179,8,0.3)] mt-1 sm:mt-2">
                Expert Action®
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-zinc-300 font-medium max-w-lg lg:max-w-none"
            >
              Price Action | Risk Management | Trading Psychology <br className="hidden sm:block" />
              Intraday & Options Trading
            </motion.p>

            {/* Authority Checklist */}
            <motion.ul
              variants={itemVariants}
              className="space-y-3 text-sm sm:text-base text-zinc-300 text-left w-full max-w-md lg:max-w-none"
            >
              <li className="flex items-start gap-3">
                <Book aria-hidden="true" className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>Author of Best Selling Book <br className="hidden sm:block"/><span className="text-white font-semibold">"ExpertAction Intraday Trading - 11 Entry Setup"</span></span>
              </li>
              <li className="flex items-start gap-3">
                <Award aria-hidden="true" className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>NISM-Certified Research Analyst</span>
              </li>
              <li className="flex items-start gap-3">
                <Users aria-hidden="true" className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>1,500+ Students Trained Successfully</span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar aria-hidden="true" className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>Founded in 2019</span>
              </li>
            </motion.ul>

            {/* CTAs & Book Mockup */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6 pt-4 w-full justify-center lg:justify-start"
            >
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <Link to="/courses" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.03, boxShadow: "0 0 30px rgba(234,179,8,0.45)" }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-yellow-500 text-black text-sm sm:text-base font-bold uppercase rounded-md hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
                  >
                    Explore Courses
                  </motion.button>
                </Link>
              </div>

              {/* 3D Book Mockup CSS Placeholder */}
              <div className="hidden sm:block perspective-1000 shrink-0 ml-0 lg:ml-4">
                <motion.div
                  animate={shouldReduceMotion ? undefined : { rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 sm:w-32 h-40 sm:h-44 bg-[#0a192f] rounded-r-md border-l-4 border-yellow-500 shadow-2xl relative overflow-hidden transform-style-3d shadow-black/50"
                >
                  <div className="absolute inset-0 p-2 flex flex-col justify-between border border-white/10">
                    <div className="text-[7px] sm:text-[8px] text-zinc-400 text-center uppercase tracking-widest">ExpertAction</div>
                    <div className="text-xs sm:text-sm font-bold text-yellow-500 text-center uppercase leading-tight">Intraday Trading</div>
                    <div className="text-base sm:text-lg font-black text-white text-center">11 ENTRY SETUP</div>
                    <div className="text-[5px] sm:text-[6px] text-zinc-500 text-center">Copyrighted Registry</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* CENTER COLUMN: Expert Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4 flex justify-center relative min-h-[320px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] w-full mt-4 sm:mt-8 lg:mt-0 order-first lg:order-none"
          >
            {/* Gentle continuous float wraps only the transform, keeping the mask/positioning untouched */}
            <motion.img
              src="/cutout.png"
              alt="Founder of ExpertAction"
              loading="lazy"
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 w-full max-w-[240px] sm:max-w-md md:max-w-lg lg:max-w-none object-contain z-10 drop-shadow-2xl"
              style={{
                  maskImage: `
                    linear-gradient(to right, transparent 0%, black 15%),
                    linear-gradient(to top, transparent 0%, black 15%)
                  `,
                  WebkitMaskImage: `
                    linear-gradient(to right, transparent 0%, black 15%),
                    linear-gradient(to top, transparent 0%, black 15%)
                  `,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
            />

            {/* Subtle glow behind the portrait to help it 'pop' from the background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1/3 bg-primary/10 blur-[60px] sm:blur-[80px] rounded-full z-0" />
          </motion.div>

          {/* RIGHT COLUMN: Why Choose Us Card (Spans 3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-3 z-20 mt-4 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none min-w-0"
          >
            {/* NEW WIDGET TO FILL BLANK SPACE */}
            <MarketPulseWidget />

            <div className="bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 sm:p-6 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-black text-center uppercase mb-5 sm:mb-6 text-white tracking-wide">
                Why Choose <br /> <span className="text-yellow-500">Expert Action®?</span>
              </h3>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  { icon: TrendingUp, text: "Practical & Real Market Training" },
                  { icon: ShieldCheck, text: "Proven Trading Strategies" },
                  { icon: PlayCircle, text: "Live Market Mentoring" },
                  { icon: Headset, text: "Lifetime Support" }
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.08, ease: "easeOut" }}
                    className="flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-300"
                  >
                    <item.icon aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 shrink-0" />
                    <span className="min-w-0">{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full py-3 sm:py-3.5 bg-yellow-500 text-black text-sm sm:text-base font-bold uppercase rounded-md hover:bg-yellow-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
              >
                Join Telegram
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM TRUST BAR */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-20 w-full bg-[#0a0f1c] border-y border-white/10 py-6 mt-10 sm:mt-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 sm:gap-6 lg:divide-x lg:divide-white/10">

            <StatItem icon={Calendar} value="2019" label="Established" shouldReduceMotion={shouldReduceMotion} />
            <StatItem icon={Users} value="1,500+" label="Students Trained" shouldReduceMotion={shouldReduceMotion} />
            <StatItem icon={TrendingUp} value="11" label="Copyrighted Entry Setups" shouldReduceMotion={shouldReduceMotion} />
            <StatItem icon={Award} value="NISM" label="Certified Research Analyst" shouldReduceMotion={shouldReduceMotion} />
            <StatItem
              icon={Star}
              iconClassName="fill-yellow-500"
              value="4.8/5"
              label="Google Rating"
              shouldReduceMotion={shouldReduceMotion}
              wrapperClassName="col-span-2 sm:col-span-3 lg:col-span-1"
            />

          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Statistic with count-up animation (triggers once, when scrolled into view)
// ----------------------------------------------------------------------

function parseStatValue(raw: string) {
  const match = raw.match(/^([\d,]+\.?\d*)(.*)$/);
  if (!match) {
    return { hasNumber: false as const, number: 0, suffix: raw, decimals: 0 };
  }
  const numStr = match[1].replace(/,/g, "");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { hasNumber: true as const, number: parseFloat(numStr), suffix: match[2], decimals };
}

function StatItem({
  icon: Icon,
  value,
  label,
  shouldReduceMotion,
  iconClassName = "",
  wrapperClassName = "",
}:  {
  icon: LucideIcon;
  value: string;
  label: string;
  shouldReduceMotion: boolean | null;
  iconClassName?: string;
  wrapperClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = parseStatValue(value);
  const [display, setDisplay] = useState(
    shouldReduceMotion || !parsed.hasNumber ? value : `0${parsed.suffix}`
  );

  useEffect(() => {
    if (!isInView || shouldReduceMotion || !parsed.hasNumber) return;
    const controls = animate(0, parsed.number, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(latest) {
        const formatted =
          parsed.decimals > 0
            ? latest.toFixed(parsed.decimals)
            : Math.round(latest).toLocaleString("en-IN");
        setDisplay(`${formatted}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div ref={ref} className={`flex items-center justify-center gap-3 sm:px-4 ${wrapperClassName}`}>
      <Icon aria-hidden="true" className={`w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0 ${iconClassName}`} />
      <div className="min-w-0">
        <div className="text-lg sm:text-xl font-bold text-white leading-none">{display}</div>
        <div className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold mt-1">{label}</div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Dynamic Background Components
// ----------------------------------------------------------------------

// Added Market Pulse Widget Component
function MarketPulseWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-6 p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <TrendingUp aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        </div>
        <div className="min-w-0">
          <div className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-bold truncate">Nifty 50</div>
          <div className="text-xs sm:text-sm font-bold text-white truncate">22,514.65</div>
        </div>
      </div>
      <div className="text-emerald-400 text-[10px] sm:text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded shrink-0">
        +0.75%
      </div>
    </motion.div>
  );
}

function HeroBackground({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

      {/* Cinematic Ken Burns wrapper: slow continuous zoom across the whole background layer */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 will-change-transform"
      >
        {/* 1. Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* 2. Ambient Gold & Blue Orbs, with a gentle pan added on top of their existing pulse */}
        <motion.div
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1], x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[80px] sm:blur-[120px]"
        />
        <motion.div
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05], x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] sm:w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px] sm:blur-[150px]"
        />
      </motion.div>

      {/* 3. Floating Abstract Candlesticks */}
      <FloatingCandles shouldReduceMotion={shouldReduceMotion} />

      {/* 4. Animated Background Trend Line (SVG) */}
      <div className="absolute bottom-1/4 left-0 w-full h-40 sm:h-48 lg:h-64 opacity-[0.03]">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            d="M 0,200 L 100,180 L 200,190 L 300,120 L 400,140 L 500,80 L 600,100 L 700,40 L 800,60 L 900,10 L 1000,20"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" /> {/* Emerald 500 */}
              <stop offset="100%" stopColor="#eab308" /> {/* Yellow 500 */}
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
}

function FloatingCandles({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const candles = [
    { left: "5%", top: "20%", height: 80, delay: 0, type: "bull" },
    { left: "15%", top: "60%", height: 45, delay: 1.5, type: "bear" },
    { left: "85%", top: "30%", height: 100, delay: 0.8, type: "bull" },
    { left: "92%", top: "70%", height: 60, delay: 2, type: "bear" },
    { left: "45%", top: "15%", height: 50, delay: 1.2, type: "bull" },
  ];

  return (
    <>
      {candles.map((candle, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex flex-col items-center justify-center opacity-10"
          style={{ left: candle.left, top: candle.top }}
          animate={shouldReduceMotion ? undefined : { y: [0, -20, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5 + i, delay: candle.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Top Wick */}
          <div className={`w-px h-6 ${candle.type === "bull" ? "bg-emerald-500" : "bg-red-500"}`} />
          {/* Body */}
          <div
            className={`w-3 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] ${candle.type === "bull" ? "bg-emerald-500 shadow-emerald-500/20" : "bg-red-500 shadow-red-500/20"}`}
            style={{ height: candle.height }}
          />
          {/* Bottom Wick */}
          <div className={`w-px h-8 ${candle.type === "bull" ? "bg-emerald-500" : "bg-red-500"}`} />
        </motion.div>
      ))}
    </>
  );
}