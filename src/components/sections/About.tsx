"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Award, BookOpen, ShieldCheck, Copyright, TrendingUp, Target, Users, 
  ChevronLeft, ChevronRight, Sparkles 
} from "lucide-react";
import { fetchSettingSignedUrl } from "@/lib/site-queries";
import Reveal from "@/components/Reveal";
import { useSettings } from "@/hooks/use-settings";

export default function About() {
  const s = useSettings();
  const [activeFeature, setActiveFeature] = useState(0);

  const { data: founderImg } = useQuery({
    queryKey: ["setting", "founder_image"],
    queryFn: () => fetchSettingSignedUrl("founder_image"),
  });

  const credentials = [
    { icon: BookOpen, label: 'Author — "ExpertAction Intraday Trading – 11 Entry Setup"' },
    { icon: Award, label: "NISM-Certified Research Analyst" },
    { icon: ShieldCheck, label: "Founder — ExpertAction® Stock Market Trading Academy" },
    { icon: Copyright, label: "Copyright-Registered Author" },
  ];

  const whyChooseFeatures = [
    {
      icon: Copyright,
      title: "Copyright 11 Entry Setup",
      description: "Direct access to high-probability, copyright-registered intraday entry setups designed specifically for Indian markets.",
    },
    {
      icon: ShieldCheck,
      title: "Micro SL Strategy",
      description: "Learn how to preserve capital first. We replace textbook theory with live chart studies, tight defined stop-losses, and backtested systems.",
    },
    {
      icon: TrendingUp,
      title: "Live Market Mentoring",
      description: "Zero fluff. Real trades executed live in real time alongside industry experts to map price action structures cleanly.",
    },
    {
      icon: Users,
      title: "1,500+ Students Trained",
      description: "Join a growing, proven alumni community of retail traders executing strategies collaboratively across India.",
    },
  ];

  // Auto-play loop configuration for the interactive tabs slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % whyChooseFeatures.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [whyChooseFeatures.length]);

  const handleNext = () => {
    setActiveFeature((prev) => (prev + 1) % whyChooseFeatures.length);
  };

  const handlePrev = () => {
    setActiveFeature((prev) => (prev - 1 + whyChooseFeatures.length) % whyChooseFeatures.length);
  };

  return (
    <section id="about" className="relative py-20 md:py-28 px-4 bg-[#F9FAFB] text-[#111827] overflow-hidden">
      
      {/* Ambient background styling layout */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11182704_1px,transparent_1px),linear-gradient(to_bottom,#11182704_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/3 left-1/4 w-[50%] h-[30%] rounded-full bg-[#2563EB]/5 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* LEFT BRANDING PROFILE PLATFORM */}
        <Reveal>
          <div className="relative max-w-md mx-auto lg:max-w-none w-full">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#2563EB]/10 to-transparent blur-xl" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#DBEAFE] bg-white p-2 shadow-xl">
              {founderImg ? (
                <img src={founderImg} alt="Mangesh Balasaheb Waghmare" className="h-full w-full object-cover rounded-2xl" />
              ) : (
                <div className="h-full w-full grid place-items-center bg-gradient-to-br from-[#F9FAFB] to-[#DBEAFE]/40 rounded-2xl">
                  <div className="text-center p-8">
                    <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-[#2563EB] grid place-items-center text-white text-3xl font-black shadow-md">
                      M
                    </div>
                    <p className="text-[#111827]/50 text-sm font-semibold">Founder photo coming soon</p>
                  </div>
                </div>
              )}
            </div>
            {/* ISBN Micro Badge */}
            <div className="absolute -bottom-4 -right-4 hidden md:block bg-white border border-[#DBEAFE] rounded-xl p-3 shadow-md">
              <div className="text-[#2563EB] text-[10px] font-bold uppercase tracking-wider">Official ISBN</div>
              <div className="text-xs font-mono font-bold text-[#111827]">978-81-19064-07-6</div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT BIO METRICS PANEL */}
        <div className="flex flex-col space-y-5">
          <Reveal>
            <span className="text-[#2563EB] text-xs font-bold tracking-widest uppercase bg-[#2563EB]/10 px-3 py-1.5 rounded-full inline-block shadow-sm">
              About Academy
            </span>
            <h2 className="mt-3 font-sans text-3xl md:text-5xl font-black text-[#111827] uppercase tracking-tight">
              {s("section_about_heading", "About ExpertAction®")}
            </h2>
            <div className="h-1 w-16 bg-[#2563EB] mt-3 rounded-full" />
          </Reveal>
          
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-[#111827]/80 font-medium leading-relaxed">
              {s("about_bio", "Founded in 2019 by Mangesh Balasaheb Waghmare, ExpertAction® is dedicated to stock market education focused on Price Action Trading, Risk Management, Trading Psychology, and Intraday Trading Strategies.")}
            </p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-sm sm:text-base text-[#111827]/60 font-medium leading-relaxed">
              {s("about_bio_2", "We've trained 1,500+ students through classroom and online programs in Pune and across India.")}
            </p>
          </Reveal>

          {/* Credentials list blocks */}
          <div className="pt-4 space-y-3">
            {credentials.map((c, i) => (
              <Reveal key={i} delay={0.25 + i * 0.06}>
                <div className="flex items-center gap-4 rounded-xl border border-[#DBEAFE] bg-white p-3.5 shadow-sm hover:border-[#93C5FD] transition-all duration-200">
                  <div className="shrink-0 grid h-9 w-9 place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                    <c.icon className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#111827]/80">{c.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* --- PREMIUM INTERACTIVE TABS SLIDER DOCK (The Sparkle Section Kept!) --- */}
      <div className="mx-auto max-w-7xl mt-24 lg:mt-32 border-t border-[#DBEAFE] pt-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-[#2563EB] text-xs font-bold tracking-widest uppercase bg-[#2563EB]/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Why Us
            </span>
            <h3 className="text-2xl md:text-4xl font-black font-sans text-[#111827] mt-3 uppercase tracking-tight">
              Why Choose ExpertAction
            </h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Navigation Tabs Indicator Selector Block */}
          <div className="md:col-span-5 space-y-3 order-2 md:order-1">
            {whyChooseFeatures.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFeature(idx)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 relative outline-none shadow-sm ${
                  activeFeature === idx
                    ? "border-[#2563EB] bg-white text-[#2563EB]"
                    : "border-[#DBEAFE] bg-white/60 text-[#111827]/70 hover:bg-white hover:text-[#111827]"
                }`}
              >
                {activeFeature === idx && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 rounded-xl border-2 border-[#2563EB] z-0 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 p-2 rounded-lg transition-colors ${activeFeature === idx ? 'bg-[#2563EB]/10 text-[#2563EB]' : 'bg-[#F9FAFB] text-[#111827]/60'}`}>
                  <feature.icon className="h-5 w-5 stroke-[2.5]" />
                </div>
                <span className="relative z-10 font-bold text-xs sm:text-sm uppercase tracking-wider">{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Right Presentation Viewport Panel */}
          <div className="md:col-span-7 relative order-1 md:order-2">
            <div className="relative min-h-[240px] rounded-2xl border border-[#DBEAFE] bg-white p-6 sm:p-8 flex flex-col justify-center overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  <div className="inline-flex p-3 rounded-xl bg-[#2563EB]/10 text-[#2563EB] shadow-sm">
                    {(() => {
                      const IconComp = whyChooseFeatures[activeFeature].icon;
                      return <IconComp className="h-5 w-5 stroke-[2.5]" />;
                    })()}
                  </div>
                  <h4 className="text-lg sm:text-xl font-black font-sans text-[#111827] uppercase tracking-wide">
                    {whyChooseFeatures[activeFeature].title}
                  </h4>
                  <p className="text-[#111827]/70 text-xs sm:text-sm font-medium leading-relaxed">
                    {whyChooseFeatures[activeFeature].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Accessibility Control Arrow Toggles */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button onClick={handlePrev} className="p-2 rounded-lg border border-[#DBEAFE] bg-[#F9FAFB] hover:bg-zinc-100 text-[#111827]/60 hover:text-[#2563EB] transition-colors shadow-sm">
                  <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                </button>
                <button onClick={handleNext} className="p-2 rounded-lg border border-[#DBEAFE] bg-[#F9FAFB] hover:bg-zinc-100 text-[#111827]/60 hover:text-[#2563EB] transition-colors shadow-sm">
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAT CARD COUNTERS */}
      <div className="mx-auto max-w-6xl mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard end={1500} suffix="+" label="Students Trained" icon={Users} />
        <StatCard end={2019} label="Founded" icon={TrendingUp} plain />
        <StatCard end={3} label="Structured Programs" icon={Target} />
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Count-up Metrics Sub-Component
// ----------------------------------------------------------------------
function StatCard({ end, suffix = "", label, icon: Icon, plain = false }: { end: number; suffix?: string; label: string; icon: React.ComponentType<{ className?: string }>; plain?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, end, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(plain ? Math.round(v).toString() : Math.round(v).toLocaleString("en-IN")),
    });
    return () => controls.stop();
  }, [inView, end, count, plain]);

  return (
    <Reveal>
      <div ref={ref} className="group relative rounded-2xl border border-[#DBEAFE] bg-white p-6 sm:p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300">
          <Icon className="h-28 w-28 text-[#2563EB]" />
        </div>
        <div className="relative">
          <div className="font-sans text-4xl sm:text-5xl font-black text-[#1E3A8A] tracking-tight">
            {display}{suffix}
          </div>
          <div className="mt-2 text-xs uppercase tracking-widest font-bold text-[#111827]/50">{label}</div>
        </div>
      </div>
    </Reveal>
  );
}