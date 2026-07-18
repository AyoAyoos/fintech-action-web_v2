import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { fetchSettingSignedUrl } from "@/lib/site-queries";
import TextType from "@/components/TextType";
import CTAButton from "@/components/CTAButton";
import { PHONE, WHATSAPP } from "@/lib/constants";
import { useSettings } from "@/hooks/use-settings";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const s = useSettings();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const { data: heroImg } = useQuery({
    queryKey: ["setting", "hero_image"],
    queryFn: () => fetchSettingSignedUrl("hero_image"),
  });

  const headline = s("hero_headline", "Price Action. Precision Execution.");
  const subheadline = s("hero_subheadline", "From Beginner To Market Expert — India's premier academy for copyright-registered price action & intraday trading systems.");
  const parts = headline.split(/\.(.+)/);
  const line1 = parts[0] ? parts[0] + "." : headline;

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero">
      <motion.div style={{ y, opacity }} className="absolute inset-0 bg-chart-grid opacity-50" />
      {heroImg && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-20"
            poster={heroImg ?? undefined}
          >
            <source src="/background_vid.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <FloatingCandles />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-8"
        >
          <Sparkles className="h-3.5 w-3.5" /> NISM-Certified Research Analyst · Since 2019
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight"
        >
          {line1}
          <br />
          <TextType
            as="span"
            className="text-gradient-gold"
            text={["Precision Execution", "Risk Management", "Market Mastery"]}
            typingSpeed={70}
            pauseDuration={1800}
            deletingSpeed={35}
            cursorCharacter="|"
            cursorClassName="text-primary"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <CTAButton>
            <a href={`tel:${PHONE}`} className="group inline-flex items-center gap-2 rounded-full btn-cta px-8 py-4 text-base font-semibold">
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </CTAButton>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-8 py-4 text-base font-semibold hover:bg-white/10 hover:border-primary/50 transition-all">
            <MessageCircle className="h-5 w-5 text-primary" /> Chat on WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/70 text-xs tracking-widest uppercase"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}

function FloatingCandles() {
  const candles = [
    { left: "8%", top: "20%", h: 60, delay: 0, color: "green" },
    { left: "88%", top: "30%", h: 80, delay: 0.5, color: "red" },
    { left: "15%", top: "70%", h: 45, delay: 1, color: "green" },
    { left: "82%", top: "75%", h: 70, delay: 1.5, color: "green" },
    { left: "50%", top: "15%", h: 55, delay: 0.8, color: "red" },
  ];
  return (
    <>
      {candles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{ left: c.left, top: c.top }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={`w-2 rounded-sm ${c.color === "green" ? "bg-primary/40" : "bg-destructive/40"}`} style={{ height: c.h }} />
          <div className={`w-px mx-auto ${c.color === "green" ? "bg-primary/40" : "bg-destructive/40"}`} style={{ height: c.h * 0.4 }} />
        </motion.div>
      ))}
    </>
  );
}