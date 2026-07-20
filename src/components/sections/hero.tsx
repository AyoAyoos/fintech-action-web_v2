"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";
import {
  Book,
  Award,
  Users,
  Calendar,
  Star,
  TrendingUp,
  ShieldCheck,
  Headset,
  PlayCircle,
  MessageCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { WHATSAPP } from "@/lib/constants";

/**
 * AuthorityHero — redesigned as a balanced two-column fintech hero.
 *
 * Layout goals:
 *  - Left column: eyebrow → headline → EXPERT ACTION accent → subtitle
 *    → primary CTAs → inline trust badges.
 *  - Right column: an anchored "mentor / product" card (Why Choose) with
 *    floating market-info cards + the 3D book mockup parallax-attached
 *    around it, sitting on top of candlestick + video background.
 *  - Bottom trust bar preserved.
 *
 * All original content, colors, and Framer Motion animations are kept.
 */
export default function AuthorityHero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
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
    <section className="relative min-h-screen overflow-hidden bg-[#F9FAFB] font-sans text-[#111827]">
      {/* Background: video + grid + candles */}
      <HeroBackground shouldReduceMotion={shouldReduceMotion} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32 2xl:max-w-[92rem]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* ---------------- LEFT COLUMN ---------------- */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="min-w-0 lg:col-span-7 flex flex-col gap-6 text-center lg:text-left"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#DBEAFE] bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB] shadow-sm backdrop-blur lg:mx-0"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
              Live Market Mentoring · Since 2019
            </motion.div>

            {/* Headline — balanced two-line flow with EXPERT ACTION accent */}
            <div className="w-full">
              <div className="overflow-hidden py-1">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="text-[clamp(2.25rem,5.2vw,4.75rem)] font-black uppercase leading-[1.05] tracking-tight text-[#111827]"
                >
                  Master the Stock Market with
                </motion.h1>
              </div>

              <div className="overflow-hidden py-1">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="mt-1 text-[clamp(2.75rem,7vw,6rem)] font-black uppercase leading-[0.95] tracking-tight text-[#2563EB] drop-shadow-[0_6px_20px_rgba(37,99,235,0.18)]"
                >
                  Expert Action<span className="align-super text-[0.4em]">®</span>
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl text-base font-semibold tracking-wide text-[#111827]/75 sm:text-lg lg:mx-0 lg:text-xl"
            >
              Price Action · Risk Management · Trading Psychology
              <br className="hidden sm:block" />
              <span className="text-[#111827]/60">Intraday &amp; Options Trading</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Link to="/courses" className="w-full sm:w-auto">
                <motion.button
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.03,
                          boxShadow: "0 0 30px rgba(37,99,235,0.35)",
                        }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full rounded-lg bg-[#2563EB] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition-colors hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9FAFB] sm:w-auto sm:px-10 sm:text-base"
                >
                  Explore Courses
                </motion.button>
              </Link>

              <motion.a
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#DBEAFE] bg-white/80 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[#111827] backdrop-blur transition-colors hover:border-[#2563EB] hover:text-[#2563EB] sm:w-auto sm:text-base"
              >
                <MessageCircle className="h-4 w-4 stroke-[2.5]" /> WhatsApp
              </motion.a>
            </motion.div>

            {/* Authority checklist / trust badges */}
            <motion.ul
              variants={itemVariants}
              className="mt-2 grid w-full grid-cols-1 gap-x-6 gap-y-3 text-left text-sm text-[#111827]/80 sm:grid-cols-2 sm:text-base"
            >
              <TrustItem icon={Book} title='Author of "ExpertAction Intraday Trading"' subtitle="Best-Selling · 11 Entry Setup" />
              <TrustItem icon={Award} title="NISM-Certified" subtitle="Research Analyst" />
              <TrustItem icon={Users} title="1,500+ Students" subtitle="Trained Successfully" />
              <TrustItem icon={Calendar} title="Founded 2019" subtitle="6+ Years of Mentoring" />
            </motion.ul>
          </motion.div>

          {/* ---------------- RIGHT COLUMN ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="relative z-20 mx-auto w-full min-w-0 max-w-md lg:col-span-5 lg:max-w-none"
          >
            <RightStage shouldReduceMotion={shouldReduceMotion} />
          </motion.div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-20 mt-12 w-full border-y border-[#DBEAFE] bg-white/90 py-7 backdrop-blur sm:py-8 lg:py-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[92rem]">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8 lg:divide-x lg:divide-[#DBEAFE]">
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
// Right-column stage: anchored card with floating parallax elements
// ----------------------------------------------------------------------
function RightStage({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] sm:aspect-[5/6] lg:aspect-auto lg:h-[600px] lg:max-w-none">
      {/* Soft glow behind stage */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.18),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-8 top-6 -z-10 h-40 rounded-full bg-[#2563EB]/10 blur-3xl" />

      {/* Anchor card (mentor / product hero surface) */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-3xl border border-[#DBEAFE] bg-white/95 p-6 shadow-[0_30px_80px_-30px_rgba(30,58,138,0.35)] sm:p-8 lg:p-10"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]/70">
            Expert Action® · Mentor Desk
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>
        </div>

        <h3 className="text-xl font-black uppercase leading-tight tracking-wide text-[#111827] sm:text-2xl">
          Why Choose <span className="text-[#2563EB]">Expert Action®?</span>
        </h3>

        <ul className="mt-6 space-y-4">
          {[
            { icon: TrendingUp, text: "Practical & Real Market Training" },
            { icon: ShieldCheck, text: "Proven Trading Strategies" },
            { icon: PlayCircle, text: "Live Market Mentoring" },
            { icon: Headset, text: "Lifetime Support" },
          ].map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.08, ease: "easeOut" }}
              className="flex items-center gap-3 text-sm font-medium text-[#111827]/85 sm:text-base"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#DBEAFE]/60 text-[#2563EB]">
                <item.icon aria-hidden="true" className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0">{item.text}</span>
            </motion.li>
          ))}
        </ul>

        {/* Mini sparkline strip */}
        <div className="mt-6 rounded-xl border border-[#DBEAFE] bg-[#F9FAFB] p-3">
          <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#111827]/50">
            <span>Portfolio Simulation</span>
            <span className="text-emerald-600">+18.4%</span>
          </div>
          <svg viewBox="0 0 200 40" className="h-10 w-full" preserveAspectRatio="none">
            <motion.path
              d="M0,30 L20,26 L40,28 L60,20 L80,22 L100,14 L120,17 L140,9 L160,12 L180,5 L200,7"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 0.7 }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Floating market pulse card — top left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute -left-4 -top-6 hidden sm:block"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-xl border border-[#DBEAFE] bg-white/95 px-4 py-3 shadow-xl backdrop-blur"
        >
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#DBEAFE]/60">
            <TrendingUp aria-hidden="true" className="h-5 w-5 text-[#2563EB]" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#111827]/50">Nifty 50</div>
            <div className="text-sm font-bold text-[#111827]">22,514.65</div>
          </div>
          <div className="rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600">
            +0.75%
          </div>
        </motion.div>
      </motion.div>

      {/* Floating certification badge — top right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="absolute -right-3 top-16 hidden sm:block"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="flex items-center gap-2 rounded-xl border border-[#DBEAFE] bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur"
        >
          <Award aria-hidden="true" className="h-5 w-5 text-[#2563EB]" />
          <div className="min-w-0 leading-tight">
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#111827]/50">Certified</div>
            <div className="text-xs font-bold text-[#111827]">NISM Analyst</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating 3D book — bottom right, partially overlaps section edge */}
      <div className="perspective-1000 absolute -bottom-8 -right-2 hidden sm:block">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { rotateY: [-6, 6, -6], rotateX: [3, -3, 3], y: [0, -6, 0] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-44 w-28 overflow-hidden rounded-r-md border-l-4 border-[#2563EB] bg-[#1E3A8A] shadow-2xl shadow-[#1E3A8A]/40 sm:h-52 sm:w-32 lg:h-56 lg:w-36"
        >
          <div className="absolute inset-0 flex flex-col justify-between border border-[#DBEAFE]/20 p-2 lg:p-3">
            <div className="text-center text-[8px] uppercase tracking-widest text-[#93C5FD] lg:text-[10px]">
              ExpertAction
            </div>
            <div className="text-center text-xs font-bold uppercase leading-tight text-[#93C5FD] lg:text-sm">
              Intraday Trading
            </div>
            <div className="text-center text-base font-black text-white lg:text-xl">
              11 ENTRY SETUP
            </div>
            <div className="text-center text-[6px] text-[#DBEAFE]/70 lg:text-[7px]">
              Copyrighted Registry
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating rating chip — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute -left-2 bottom-10 hidden sm:block"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="flex items-center gap-2 rounded-xl border border-[#DBEAFE] bg-white/95 px-3 py-2 shadow-xl backdrop-blur"
        >
          <Star aria-hidden="true" className="h-4 w-4 fill-[#2563EB] text-[#2563EB]" />
          <div className="text-xs font-bold text-[#111827]">
            4.8<span className="text-[#111827]/50">/5</span>
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-widest text-[#111827]/50">
            Google
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Trust item (left column)
// ----------------------------------------------------------------------
function TrustItem({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-transparent bg-white/40 p-3 backdrop-blur transition-colors hover:border-[#DBEAFE]">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#DBEAFE]/60 text-[#2563EB]">
        <Icon aria-hidden="true" className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-[#111827]">{title}</div>
        <div className="text-xs text-[#111827]/60">{subtitle}</div>
      </div>
    </li>
  );
}

// ----------------------------------------------------------------------
// Statistical Parsers & Helpers
// ----------------------------------------------------------------------
function parseStatValue(raw: string) {
  const match = raw.match(/^([\d,]+\.?\d*)(.*)$/);
  if (!match) return { hasNumber: false as const, number: 0, suffix: raw, decimals: 0 };
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
}: {
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
    shouldReduceMotion || !parsed.hasNumber ? value : `0${parsed.suffix}`,
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
  }, [isInView, parsed.decimals, parsed.hasNumber, parsed.number, parsed.suffix, shouldReduceMotion]);

  return (
    <div ref={ref} className={`flex items-center justify-center gap-3 sm:px-4 ${wrapperClassName}`}>
      <Icon
        aria-hidden="true"
        className={`h-6 w-6 shrink-0 text-[#2563EB] sm:h-8 sm:w-8 lg:h-10 lg:w-10 ${iconClassName}`}
      />
      <div className="min-w-0">
        <div className="text-lg font-bold leading-none text-[#111827] sm:text-xl lg:text-2xl">
          {display}
        </div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#111827]/60 sm:text-xs lg:text-sm">
          {label}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Background: video, grid, glow, candles, sparkline
// ----------------------------------------------------------------------
function HeroBackground({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/background_vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#F9FAFB]/80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11182708_1px,transparent_1px),linear-gradient(to_bottom,#11182708_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] sm:bg-[size:32px_32px]" />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.08, 0.14, 0.08],
                  x: [0, 20, 0],
                  y: [0, 10, 0],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] top-[-10%] h-[40%] w-[60%] rounded-full bg-[#2563EB]/10 blur-[80px] sm:w-[40%] sm:blur-[120px]"
        />
      </motion.div>

      <FloatingCandles shouldReduceMotion={shouldReduceMotion} />

      <div className="absolute bottom-1/4 left-0 h-40 w-full opacity-[0.08] sm:h-48 lg:h-64">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full">
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
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function FloatingCandles({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const candles = [
    { left: "4%", top: "18%", height: 75, delay: 0, type: "bull" },
    { left: "18%", top: "58%", height: 50, delay: 1.5, type: "bear" },
    { left: "46%", top: "12%", height: 65, delay: 0.6, type: "bull" },
    { left: "94%", top: "72%", height: 60, delay: 2, type: "bear" },
  ];

  return (
    <>
      {candles.map((candle, i) => (
        <motion.div
          key={i}
          className="absolute hidden flex-col items-center justify-center opacity-40 md:flex"
          style={{ left: candle.left, top: candle.top }}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -20, 0], opacity: [0.08, 0.18, 0.08] }
          }
          transition={{
            duration: 5 + i,
            delay: candle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className={`h-6 w-px ${candle.type === "bull" ? "bg-emerald-500" : "bg-red-500"}`} />
          <div
            className={`w-3 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.05)] ${
              candle.type === "bull" ? "bg-emerald-500" : "bg-red-500"
            }`}
            style={{ height: candle.height }}
          />
          <div className={`h-8 w-px ${candle.type === "bull" ? "bg-emerald-500" : "bg-red-500"}`} />
        </motion.div>
      ))}
    </>
  );
}
