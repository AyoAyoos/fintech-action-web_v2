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
    <section className="relative min-h-screen bg-[#F9FAFB] text-[#111827] pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-12 flex flex-col justify-between overflow-hidden font-sans">

      {/* ------------------------------------------- */}
      {/* DYNAMIC STOCK MARKET BACKGROUND             */}
      {/* ------------------------------------------- */}
      <HeroBackground shouldReduceMotion={shouldReduceMotion} />

      <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
        {/* Responsive grid: single column on mobile/tablet, 12-col on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 xl:gap-10 items-center">

          {/* LEFT COLUMN: Main Headlines & Book (Spans 5 cols) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6 text-center lg:text-left items-center lg:items-start min-w-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col w-full"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                }}
                className="text-[#111827] text-[clamp(1.75rem,7vw,4.5rem)] xl:text-8xl font-black leading-[1.1] tracking-tight uppercase"
              >
                Master the Stock Market with
              </motion.span>

              <motion.span
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  textShadow: [
                    "0 0 8px rgba(37,99,235,0.2)",
                    "0 0 18px rgba(37,99,235,0.4)",
                    "0 0 8px rgba(37,99,235,0.2)",
                  ],
                }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  textShadow: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                className="text-[#2563EB] text-[clamp(2.25rem,8.5vw,5.25rem)] xl:text-9xl font-black leading-[1.1] tracking-tight uppercase drop-shadow-[0_0_20px_rgba(37,99,235,0.2)] mt-1 sm:mt-2 cursor-default"
              >
                Expert Action®
              </motion.span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-2xl text-[#111827]/80 font-medium max-w-lg lg:max-w-none"
            >
              {"Price Action | Risk Management | Trading Psychology"}
              <br className="hidden sm:block" />
              {"Intraday & Options Trading"}
            </motion.p>
            {/* Authority Checklist */}
            <motion.ul
              variants={itemVariants}
              className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-[#111827]/80 text-left w-full max-w-md lg:max-w-none"
            >
              <li className="flex items-start gap-3">
                <Book aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Author of Best Selling Book <br className="hidden sm:block"/><span className="text-[#111827] font-semibold">"ExpertAction Intraday Trading - 11 Entry Setup"</span></span>
              </li>
              <li className="flex items-start gap-3">
                <Award aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <span>NISM-Certified Research Analyst</span>
              </li>
              <li className="flex items-start gap-3">
                <Users aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <span>1,500+ Students Trained Successfully</span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] shrink-0 mt-0.5" />
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
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.03, boxShadow: "0 0 25px rgba(37,99,235,0.35)" }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 bg-[#2563EB] text-[#FFFFFF] text-sm sm:text-base lg:text-lg font-bold uppercase rounded-md hover:bg-[#1E3A8A] transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9FAFB]"
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
                  className="w-28 sm:w-32 lg:w-40 h-40 sm:h-44 lg:h-56 bg-[#1E3A8A] rounded-r-md border-l-4 border-[#2563EB] shadow-2xl relative overflow-hidden transform-style-3d shadow-[#1E3A8A]/30"
                >
                  <div className="absolute inset-0 p-2 lg:p-3 flex flex-col justify-between border border-[#DBEAFE]/20">
                    <div className="text-[7px] sm:text-[8px] lg:text-[10px] text-[#93C5FD] text-center uppercase tracking-widest">ExpertAction</div>
                    <div className="text-xs sm:text-sm lg:text-base font-bold text-[#93C5FD] text-center uppercase leading-tight">Intraday Trading</div>
                    <div className="text-base sm:text-lg lg:text-2xl font-black text-[#FFFFFF] text-center">11 ENTRY SETUP</div>
                    <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-[#DBEAFE]/70 text-center">Copyrighted Registry</div>
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
            className="lg:col-span-4 flex justify-center relative min-h-[450px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[900px] xl:min-h-[1000px] w-full mt-4 sm:mt-8 lg:mt-0 order-first lg:order-none"          >
            {/* Gentle continuous float wraps only the transform, keeping the mask/positioning untouched */}
            <motion.img
              src="/cutout.png"
              alt="Founder of ExpertAction"
              loading="lazy"
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 w-full max-w-[240px] sm:max-w-lg md:max-w-xl lg:max-w-none object-contain z-10 drop-shadow-xl"
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
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-2/5 bg-[#2563EB]/10 blur-[60px] sm:blur-[80px] lg:blur-[100px] rounded-full z-0" />
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

            <div className="bg-[#FFFFFF] border border-[#DBEAFE] rounded-xl p-6 sm:p-7 lg:p-8 shadow-xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-center uppercase mb-5 sm:mb-6 lg:mb-8 text-[#111827] tracking-wide">
                Why Choose <br /> <span className="text-[#2563EB]">Expert Action®?</span>
              </h3>

              <ul className="space-y-3 sm:space-y-4 lg:space-y-5 mb-6 sm:mb-8 lg:mb-10">
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
                    className="flex items-center gap-3 text-xs sm:text-sm lg:text-base font-medium text-[#111827]/80"
                  >
                    <item.icon aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#2563EB] shrink-0" />
                    <span className="min-w-0">{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full py-3 sm:py-3.5 lg:py-4 bg-[#2563EB] text-[#FFFFFF] text-sm sm:text-base lg:text-lg font-bold uppercase rounded-md hover:bg-[#1E3A8A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
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
        className="relative z-20 w-full bg-[#FFFFFF] border-y border-[#DBEAFE] py-7 sm:py-8 lg:py-10 mt-10 sm:mt-12"
      >
        <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 sm:gap-6 lg:gap-8 lg:divide-x lg:divide-[#DBEAFE]">

            <StatItem icon={Calendar} value="2019" label="Established" shouldReduceMotion={shouldReduceMotion} />
            <StatItem icon={Users} value="1,500+" label="Students Trained" shouldReduceMotion={shouldReduceMotion} />
            <StatItem icon={TrendingUp} value="11" label="Copyrighted Entry Setups" shouldReduceMotion={shouldReduceMotion} />
            <StatItem icon={Award} value="NISM" label="Certified Research Analyst" shouldReduceMotion={shouldReduceMotion} />
            <StatItem
              icon={Star}
              iconClassName="fill-[#2563EB]"
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
      <Icon aria-hidden="true" className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#2563EB] shrink-0 ${iconClassName}`} />
      <div className="min-w-0">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#111827] leading-none">{display}</div>
        <div className="text-[10px] sm:text-xs lg:text-sm text-[#111827]/60 uppercase tracking-wider font-semibold mt-1">{label}</div>
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
      className="mb-6 p-4 sm:p-5 lg:p-6 rounded-xl border border-[#DBEAFE] bg-[#FFFFFF] shadow-sm flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 rounded-full bg-[#DBEAFE]/50 flex items-center justify-center shrink-0">
          <TrendingUp aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" />
        </div>
        <div className="min-w-0">
          <div className="text-[9px] sm:text-[10px] lg:text-xs text-[#111827]/60 uppercase font-bold truncate">Nifty 50</div>
          <div className="text-xs sm:text-sm lg:text-base font-bold text-[#111827] truncate">22,514.65</div>
        </div>
      </div>
      <div className="text-emerald-600 text-[10px] sm:text-xs lg:text-sm font-bold bg-emerald-500/10 px-2 py-1 lg:px-3 lg:py-1.5 rounded shrink-0">
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

        {/* 1. NEW: The Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20" 
        >
          {/* Make sure the src matches the exact name of your video in the public folder */}
          <source src="/background_vid.mp4" type="video/mp4" />
        </video>

        {/* 2. Optional Light Overlay (Ensures dark text stays readable) */}
        <div className="absolute inset-0 bg-[#F9FAFB]/80" />

        {/* 1. Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1118270A_1px,transparent_1px),linear-gradient(to_bottom,#1118270A_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* 2. Ambient Blue Orbs, with a gentle pan added on top of their existing pulse */}
        <motion.div
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1], x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[40%] rounded-full bg-[#2563EB]/10 blur-[80px] sm:blur-[120px]"
        />
        <motion.div
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05], x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] sm:w-[50%] h-[50%] rounded-full bg-[#93C5FD]/20 blur-[100px] sm:blur-[150px]"
        />
      </motion.div>

      {/* 3. Floating Abstract Candlesticks */}
      <FloatingCandles shouldReduceMotion={shouldReduceMotion} />

      {/* 4. Animated Background Trend Line (SVG) */}
      <div className="absolute bottom-1/4 left-0 w-full h-40 sm:h-48 lg:h-64 opacity-[0.1]">
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
              <stop offset="0%" stopColor="#2563EB" /> {/* Primary Accent */}
              <stop offset="100%" stopColor="#93C5FD" /> {/* Secondary Accent */}
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
}

function FloatingCandles({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const candles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 95}%`,
    top: `${Math.random() * 85}%`,
    height: Math.floor(Math.random() * 60) + 40, // 40px - 100px
    type: Math.random() > 0.5 ? "bull" : "bear",
    delay: Math.random() * 5,
  }));

  return (
    <>
     {candles.map((candle, i) => (
  <motion.div
    key={candle.id}
    className="absolute hidden md:flex flex-col items-center justify-center opacity-60"
    style={{
      left: candle.left,
      top: candle.top,
    }}
    animate={
      shouldReduceMotion
        ? undefined
        : {
            y: [0, -30, 0],
            opacity: [0.35, 0.75, 0.35],
            scale: [1, 1.08, 1],
          }
    }
    transition={{
      duration: 5 + (i % 5),
      delay: candle.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Top Wick */}
    <div
      className={`w-[2px] h-7 ${
        candle.type === "bull" ? "bg-emerald-400" : "bg-red-400"
      }`}
    />

    {/* Candle Body */}
    <div
      className={`w-4 rounded-sm ${
        candle.type === "bull"
          ? "bg-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.8)]"
          : "bg-red-400 shadow-[0_0_25px_rgba(248,113,113,0.8)]"
      }`}
      style={{
        height: `${candle.height}px`,
      }}
    />

    {/* Bottom Wick */}
    <div
      className={`w-[2px] h-9 ${
        candle.type === "bull" ? "bg-emerald-400" : "bg-red-400"
      }`}
    />
  </motion.div>
))}
    </>
  );
}