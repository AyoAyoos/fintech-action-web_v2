"use client";

import { motion } from "framer-motion";
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

export default function AuthorityHero() {
  return (
    <section className="relative min-h-screen bg-[#0B1120] text-white pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-12 flex flex-col justify-between overflow-hidden font-sans">

      {/* ------------------------------------------- */}
      {/* DYNAMIC STOCK MARKET BACKGROUND             */}
      {/* ------------------------------------------- */}
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
        {/* Responsive grid: single column on mobile/tablet, 12-col on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-6 xl:gap-8 items-center">

          {/* LEFT COLUMN: Main Headlines & Book (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6 text-center lg:text-left items-center lg:items-start min-w-0"
          >
            <div className="flex flex-col w-full">
  {/* Line 1: Fades and slides up smoothly from below */}
  <motion.span
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }}
    className="text-[#111827] text-[clamp(1.75rem,7vw,4.5rem)] xl:text-7xl font-black leading-[1.1] tracking-tight uppercase"
  >
    Master the Stock Market with
  </motion.span>

  {/* Line 2: Scale-pops into place with an ongoing ambient text shadow pulse */}
  <motion.span
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ 
      opacity: 1, 
      scale: 1, 
      y: 0,
      textShadow: [
        "0 0 10px rgba(37,99,235,0.1)",
        "0 0 25px rgba(37,99,235,0.3)",
        "0 0 10px rgba(37,99,235,0.1)"
      ]
    }}
    transition={{ 
      delay: 0.4, // Delays it slightly so it runs after line 1
      duration: 0.6, 
      ease: "easeOut",
      textShadow: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }}
    whileHover={{ scale: 1.02 }}
    className="text-[#2563EB] text-[clamp(2.25rem,8.5vw,5.25rem)] xl:text-8xl font-black leading-[1.1] tracking-tight uppercase mt-1 sm:mt-2 drop-shadow-[0_0_20px_rgba(37,99,235,0.15)] cursor-default"
  >
    Expert Action®
  </motion.span>
</div>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 font-medium max-w-lg lg:max-w-none">
              Price Action | Risk Management | Trading Psychology <br className="hidden sm:block" />
              Intraday & Options Trading
            </p>

            {/* Authority Checklist */}
            <ul className="space-y-3 text-sm sm:text-base text-zinc-300 text-left w-full max-w-md lg:max-w-none">
              <li className="flex items-start gap-3">
                <Book className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>Author of Best Selling Book <br className="hidden sm:block"/><span className="text-white font-semibold">"ExpertAction Intraday Trading - 11 Entry Setup"</span></span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>NISM-Certified Research Analyst</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>1,500+ Students Trained Successfully</span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <span>Founded in 2019</span>
              </li>
            </ul>

            {/* CTAs & Book Mockup */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 w-full justify-center lg:justify-start">
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <Link to="/courses" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-yellow-500 text-black text-sm sm:text-base font-bold uppercase rounded-md hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    Explore Courses
                  </button>
                </Link>
              </div>

              {/* 3D Book Mockup CSS Placeholder */}
              <div className="hidden sm:block perspective-1000 shrink-0 ml-0 lg:ml-4">
                <motion.div
                  animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
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
            </div>
          </motion.div>

          {/* CENTER COLUMN: Expert Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4 flex justify-center relative min-h-[320px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] w-full mt-4 sm:mt-8 lg:mt-0 order-first lg:order-none"
          >
            <img
              src="/cutout.png"
              alt="Founder of ExpertAction"
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

            {/* Optional: Add a subtle glow behind the portrait to help it 'pop' from the background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1/3 bg-primary/10 blur-[60px] sm:blur-[80px] rounded-full z-0" />
          </motion.div>

          {/* RIGHT COLUMN: Why Choose Us Card (Spans 3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-3 z-20 mt-4 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none min-w-0"
          >
            {/* NEW WIDGET TO FILL BLANK SPACE */}
            <MarketPulseWidget />

            <div className="bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 sm:p-6 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-black text-center uppercase mb-5 sm:mb-6 text-white tracking-wide">
                Why Choose <br /> <span className="text-yellow-500">ExpertAction®?</span>
              </h3>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  { icon: TrendingUp, text: "Practical & Real Market Training" },
                  { icon: ShieldCheck, text: "Proven Trading Strategies" },
                  { icon: PlayCircle, text: "Live Market Mentoring" },
                  { icon: Headset, text: "Lifetime Support" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-300">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 shrink-0" />
                    <span className="min-w-0">{item.text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 sm:py-3.5 bg-yellow-500 text-black text-sm sm:text-base font-bold uppercase rounded-md hover:bg-yellow-400 transition-colors">
                Join Telegram
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM TRUST BAR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-20 w-full bg-[#0a0f1c] border-y border-white/10 py-6 mt-10 sm:mt-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 sm:gap-6 lg:divide-x lg:divide-white/10">

            <div className="flex items-center justify-center gap-3 sm:px-4">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-white leading-none">2019</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold mt-1">Established</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:px-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-white leading-none">1,500+</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold mt-1">Students Trained</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:px-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-white leading-none">11</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold mt-1">Copyrighted Entry Setups</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:px-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-white leading-none">NISM</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold mt-1">Certified Research Analyst</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:px-4 col-span-2 sm:col-span-3 lg:col-span-1">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 fill-yellow-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-white leading-none">4.8/5</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold mt-1">Google Rating</div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
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
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
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

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 2. Ambient Gold & Blue Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[80px] sm:blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] sm:w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px] sm:blur-[150px]"
      />

      {/* 3. Floating Abstract Candlesticks */}
      <FloatingCandles />

      {/* 4. Animated Background Trend Line (SVG) */}
      <div className="absolute bottom-1/4 left-0 w-full h-40 sm:h-48 lg:h-64 opacity-[0.03]">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            d="M 0,200 L 100,180 L 200,190 L 300,120 L 400,140 L 500,80 L 600,100 L 700,40 L 800,60 L 900,10 L 1000,20"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
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

function FloatingCandles() {
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
          animate={{ y: [0, -20, 0], opacity: [0.05, 0.15, 0.05] }}
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
