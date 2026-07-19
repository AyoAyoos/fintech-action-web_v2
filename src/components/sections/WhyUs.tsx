// File: src/components/WhyUs.tsx (or wherever this lives — filename says WhyUs but section id is "showcase")
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useSettings } from "@/hooks/use-settings";

const SHOWCASE_IMAGES = [
  { src: "/uploads/showcase-1.jpg" },
  { src: "/uploads/showcase-2.jpg" },
  { src: "/uploads/showcase-3.jpg" },
  { src: "/uploads/showcase-4.jpg" },
  { src: "/uploads/showcase-5.jpg" },
  { src: "/uploads/showcase-6.jpg" },
  { src: "/uploads/showcase-7.jpg" },
];

const AUTOPLAY_MS = 3200;

export default function WhyUs() {
  const s = useSettings();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = SHOWCASE_IMAGES.length;
  const next = () => setActive((p) => (p + 1) % total);
  const prev = () => setActive((p) => (p - 1 + total) % total);

  // Autoplay — functional setState means this effect only needs to
  // re-run when paused/total change, so timing stays exact and doesn't
  // reset the interval on every unrelated re-render.
  useEffect(() => {
    if (paused || total < 2) return;
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [paused, total]);

  const range = isMobile ? 1 : 3;
  const offsets = Array.from({ length: range * 2 + 1 }, (_, i) => i - range);

  return (
    <section
      id="showcase"
      className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-[#F9FAFB] via-[#F0F4F8] to-[#EAF2FF] text-[#111827] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563EB05_1px,transparent_1px),linear-gradient(to_bottom,#2563EB05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#93C5FD]/20 blur-[130px]" />

        <div className="absolute bottom-12 left-0 w-full h-24 opacity-[0.04] md:block hidden">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M 0,90 Q 250,10 500,60 T 1000,20" fill="none" stroke="#2563EB" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#2563EB] text-xs font-bold tracking-widest uppercase bg-[#2563EB]/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Inside Our World
            </span>
            <h2 className="mt-4 font-sans text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111827]">
              {s("section_showcase_heading", "A Glimpse Into Our Culture & Classes")}
            </h2>
            <div className="h-1 w-16 bg-[#2563EB] mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sm md:text-base text-[#111827]/70 font-semibold leading-relaxed">
              Step inside our trading floor, classrooms and community. These moments capture how we teach, how we trade, and the environment our students grow in every single day.
            </p>
          </div>
        </Reveal>

        {/* IMAGE SLIDER CONTAINER */}
        <div className="relative w-full">
          <div
            className="relative h-[420px] md:h-[460px] flex items-center justify-center [perspective:1400px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; setPaused(true); }}
            onTouchEnd={(e) => {
              if (touchStart.current == null) return;
              const dx = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
              touchStart.current = null;
              setPaused(false);
            }}
          >
            <AnimatePresence initial={false}>
              {offsets.map((offset) => {
                const index = (active + offset + total) % total;
                const item = SHOWCASE_IMAGES[index];
                const isCenter = offset === 0;
                const abs = Math.abs(offset);

                const translateX = offset * (isMobile ? 90 : 170);
                const scale = isCenter ? 1 : 0.78 - abs * 0.05;
                const rotateY = isCenter ? 0 : offset * -6;
                const zIndex = 20 - abs;
                const opacity = abs > range ? 0 : 1 - abs * 0.15;

                return (
                  <motion.div
                    key={`slide-${index}`}
                    onClick={() => {
                      if (!isCenter) setActive(index);
                    }}
                    className={`absolute top-1/2 left-1/2 origin-center ${
                      isCenter ? "cursor-default" : "cursor-pointer select-none"
                    }`}
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${translateX}px)`,
                      y: "-50%",
                      scale,
                      rotateY,
                      opacity,
                      zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 210, damping: 26, mass: 0.9 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`relative overflow-hidden rounded-3xl bg-white transition-[width,height,box-shadow] duration-500 ease-out ${
                        isCenter
                          ? "w-[340px] md:w-[520px] h-[400px] md:h-[440px] shadow-[0_30px_60px_-15px_rgba(17,24,39,0.35),0_10px_25px_-10px_rgba(17,24,39,0.25)]"
                          : "w-[110px] md:w-[150px] h-[340px] md:h-[380px] shadow-[0_12px_30px_-10px_rgba(17,24,39,0.18)] opacity-60 hover:opacity-90"
                      }`}
                    >
                      <img
                        src={item.src}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                      />

                      {!isCenter && (
                        <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-[0.5px] transition-colors hover:bg-[#111827]/20" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Previous / Next Buttons */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 grid h-11 w-11 md:h-12 md:w-12 place-items-center rounded-full bg-white text-[#2563EB] border border-[#DBEAFE] hover:bg-[#2563EB] hover:text-white transition-all shadow-xl active:scale-95"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 grid h-11 w-11 md:h-12 md:w-12 place-items-center rounded-full bg-white text-[#2563EB] border border-[#DBEAFE] hover:bg-[#2563EB] hover:text-white transition-all shadow-xl active:scale-95"
            >
              <ChevronRight className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}