import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  Facebook,
  Award,
  BookOpen,
  ShieldCheck,
  Copyright,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
  Users,
  Sparkles,
  Send,
  Loader2,
} from "lucide-react";
import { fetchAllSettings, fetchGallery, fetchSettingSignedUrl } from "@/lib/site-queries";
import { supabase } from "@/integrations/supabase/client";
import TextType from "../components/TextType";
import CTAButton from "../components/CTAButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExpertAction® — Price Action Trading Academy | Pune" },
      { name: "description", content: "Learn Price Action Trading with copyright-registered 11 Entry Setups from Mangesh Waghmare (NISM-Certified). 1,500+ students trained in Pune." },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const PHONE = "+918237220005";
const PHONE_DISPLAY = "+91 82372 20005";
const WHATSAPP = "https://wa.me/918237220005";

function useSettings() {
  const { data } = useQuery({ queryKey: ["all-settings"], queryFn: fetchAllSettings });
  return (key: string, fallback: string) => data?.[key] ?? fallback;
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <Gallery />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}

/* ------------------------- Navbar ------------------------- */
function Navbar() {
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
              <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <CTAButton>
              <a href={`tel:${PHONE}`} className="hidden md:inline-flex items-center gap-2 rounded-full btn-cta px-5 py-2.5 text-sm font-semibold">
                <Phone className="h-4 w-4" /> Enroll Now
              </a>
            </CTAButton>
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-foreground" aria-label="Open menu">
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
          <button onClick={() => setOpen(false)} className="p-2" aria-label="Close menu"><X className="h-6 w-6" /></button>
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

/* ------------------------- Hero ------------------------- */
function Hero() {
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
  // Split headline on first period for two-line styling; fall back gracefully.
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

/* ------------------------- Reveal wrapper ------------------------- */
function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------- About ------------------------- */
function About() {
  const s = useSettings();
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

  return (
    <section id="about" className="relative py-24 md:py-32 px-5">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-card">
              {founderImg ? (
                <img src={founderImg} alt="Mangesh Balasaheb Waghmare" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full grid place-items-center bg-gradient-to-br from-card to-navy-deep">
                  <div className="text-center p-8">
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary to-gold-soft grid place-items-center text-primary-foreground text-4xl font-black">M</div>
                    <p className="text-muted-foreground text-sm">Founder photo coming soon</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-card border border-primary/30 rounded-2xl p-4 shadow-[var(--shadow-gold)]">
              <div className="text-primary text-xs font-semibold uppercase tracking-wider">ISBN</div>
              <div className="text-sm font-mono">978-81-19064-07-6</div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">About</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-black">
              {s("section_about_heading", "About ExpertAction®")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {s("about_bio", "Founded in 2019 by Mangesh Balasaheb Waghmare, ExpertAction® is dedicated to stock market education focused on Price Action Trading, Risk Management, Trading Psychology, and Intraday Trading Strategies.")}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {s("about_bio_2", "We've trained 1,500+ students through classroom and online programs in Pune and across India.")}
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {credentials.map((c, i) => (
              <Reveal key={i} delay={0.3 + i * 0.08}>
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-card/50 p-4 hover:border-primary/40 hover:bg-card transition-all">
                  <div className="shrink-0 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm md:text-base pt-1.5">{c.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard end={1500} suffix="+" label="Students Trained" icon={Users} />
        <StatCard end={2019} label="Founded" icon={TrendingUp} plain />
        <StatCard end={3} label="Structured Programs" icon={Target} />
      </div>
    </section>
  );
}

function StatCard({ end, suffix = "", label, icon: Icon, plain = false }: { end: number; suffix?: string; label: string; icon: React.ComponentType<{ className?: string }>; plain?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, end, {
      duration: 2,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(plain ? Math.round(v).toString() : Math.round(v).toLocaleString("en-IN")),
    });
    return () => controls.stop();
  }, [inView, end, count, plain]);

  return (
    <Reveal>
      <div ref={ref} className="group relative rounded-2xl border border-white/10 bg-card p-8 text-center card-glow hover:card-glow-hover overflow-hidden">
        <div className="absolute -top-8 -right-8 opacity-5 group-hover:opacity-20 transition-opacity">
          <Icon className="h-32 w-32 text-primary" />
        </div>
        <div className="relative">
          <div className="font-display text-5xl md:text-6xl font-black text-gradient-gold">
            {display}{suffix}
          </div>
          <div className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">{label}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------- Courses ------------------------- */
const COURSE_FEATURES = [
  "Conceptual Framework of Entry Observation",
  "Micro Risk & Stop-Loss Concept",
  "Risk & Capital Management",
  "Copyrighted Educational Study Models",
  "Options Trading Concepts",
  "Live Market Mentoring",
  "Practical Trading Sessions",
  "Certificate of Completion",
];
function Courses() {
  const s = useSettings();
  const COURSES = [
    {
      title: s("course_1_title", "2 Copyrighted Entry Setup"),
      subtitle: "Understanding Price Action",
      tag: "Beginner",
      desc: s("course_1_desc", "Basic to Advanced. Perfect for beginners entering the markets."),
      duration: "2 Days",
      fee: s("course_1_price", "₹20,000"),
      features: COURSE_FEATURES.slice(0, 5),
      popular: false,
    },
    {
      title: s("course_2_title", "7 Copyrighted Entry Setup"),
      subtitle: "Advanced Trader Program",
      tag: "Intermediate",
      desc: s("course_2_desc", "Advanced Price Action & Options Trading Concepts."),
      duration: "15 Days",
      fee: s("course_2_price", "₹50,000"),
      features: COURSE_FEATURES.slice(0, 7),
      popular: true,
    },
    {
      title: s("course_3_title", "11 Copyrighted Entry Setup"),
      subtitle: "Professional Master Program",
      tag: "Master",
      desc: s("course_3_desc", "Complete Price Action Framework for professional traders."),
      duration: "30 Days",
      fee: s("course_3_price", "₹1,00,000"),
      features: COURSE_FEATURES,
      popular: false,
    },
  ];
  return (
    <section id="courses" className="relative py-24 md:py-32 px-5 bg-navy-deep/50">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Programs</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-black">
              {s("section_courses_heading", "Our Entry Setup Trading Programs")}
            </h2>
            <p className="mt-4 text-muted-foreground">{s("section_courses_sub", "Copyright-registered curricula built from real market experience.")}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          {COURSES.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              {/* flex and flex-col added to the card for vertical alignment */}
              <div className={`group relative rounded-3xl border p-8 h-full flex flex-col card-glow hover:card-glow-hover ${c.popular ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card" : "border-white/10 bg-card"}`}>
                {c.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-gold-soft px-4 py-1 text-xs font-bold text-primary-foreground tracking-wider uppercase shadow-[var(--shadow-gold)]">
                    Most Popular
                  </div>
                )}
                <div className="text-xs font-semibold text-primary uppercase tracking-widest">{c.tag}</div>
                <h3 className="mt-3 font-display text-2xl font-extrabold">{c.title}</h3>
                <p className="mt-1 text-sm text-primary/80">{c.subtitle}</p>
                <p className="mt-4 text-sm text-muted-foreground">{c.desc}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-black text-gradient-gold">{c.fee}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Duration: <span className="text-foreground font-semibold">{c.duration}</span></div>

                {/* flex-grow pushes the buttons to the bottom uniformly */}
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 flex-grow">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 shrink-0 grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Wrapped buttons in a flex container to center them without horizontal stretching */}
                {c.popular ? (
                  <div className="mt-8 flex justify-center">
                    <CTAButton>
                      <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold btn-cta">
                        <Phone className="h-4 w-4" /> Call to Enroll
                      </a>
                    </CTAButton>
                  </div>
                ) : (
                  <div className="mt-8 flex justify-center">
                    <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold btn-cta-outline">
                      <Phone className="h-4 w-4" /> Call to Enroll
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Gallery Slider ------------------------- */
function Gallery() {
  const s = useSettings();
  const { data: images = [] } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const validImages = images.filter((i) => i.signedUrl);
  const count = validImages.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  const go = (n: number) => setIdx(((n % count) + count) % count);

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-5">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Gallery</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-black">
              {s("section_gallery_heading", "Our Research in Pictures")}
            </h2>
            <p className="mt-4 text-muted-foreground">{s("section_gallery_sub", "A snapshot of industry insights, sessions, and student milestones.")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mt-12 rounded-3xl overflow-hidden border border-white/10 bg-card aspect-[16/9] max-w-6xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart.current == null) return;
              const dx = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
              touchStart.current = null;
            }}
          >
            {count === 0 ? (
              <div className="h-full grid place-items-center text-muted-foreground text-sm p-8 text-center">
                No gallery images yet. Admin can upload from the dashboard.
              </div>
            ) : (
              <>
                {validImages.map((img, i) => (
                  <motion.img
                    key={img.id}
                    src={img.signedUrl!}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={false}
                    animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1 : 1.05 }}
                    transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />

                {count > 1 && (
                  <>
                    <button onClick={() => go(idx - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-navy-deep/70 backdrop-blur border border-white/20 hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Previous">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={() => go(idx + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-navy-deep/70 backdrop-blur border border-white/20 hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Next">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                      {validImages.map((_, i) => (
                        <button key={i} onClick={() => go(i)} className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"}`} aria-label={`Slide ${i + 1}`} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------- Why Us ------------------------- */
const WHY = [
  { icon: Copyright, title: "Copyright 11 Entry Setup", desc: "Proprietary, registered systems." },
  { icon: ShieldCheck, title: "Micro SL Strategy", desc: "Tight, defined stop-losses." },
  { icon: TrendingUp, title: "Live Market Mentoring", desc: "Real trades, real time." },
  { icon: Users, title: "1,500+ Students Trained", desc: "A proven track record." },
];

function WhyUs() {
  const s = useSettings();
  return (
    <section className="relative py-24 md:py-32 px-5 bg-navy-deep/50">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why Us</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-black">{s("section_why_heading", "Why Choose ExpertAction")}</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-card p-6 text-center card-glow hover:card-glow-hover">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 text-primary group-hover:scale-110 transition-transform">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-bold">{w.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Contact Form ------------------------- */
const PROGRAMS = [
  "2-Day Beginner Program",
  "15-Day Advanced Program",
  "30-Day Professional Program",
];

const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
  program: z.enum(PROGRAMS as [string, ...string[]], { message: "Please choose a program" }),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

function ContactForm() {
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", program: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        program: parsed.data.program,
        message: parsed.data.message || null,
      });
      if (error) throw error;
      toast.success("Thanks! We'll get back to you shortly.");
      setForm({ full_name: "", phone: "", email: "", program: "", message: "" });
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const field = "w-full rounded-xl border border-white/10 bg-navy-deep/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <form onSubmit={onSubmit} className="h-full rounded-3xl border border-white/10 bg-card p-6 md:p-8 space-y-4">
      <div>
        <h3 className="font-display text-2xl font-extrabold">Enquire About a Program</h3>
        <p className="mt-1 text-sm text-muted-foreground">Share your details — our team will reach out within one business day.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input required className={field} placeholder="Full Name *" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} maxLength={100} />
        <input required className={field} placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} type="tel" />
      </div>
      <input required className={field} placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} type="email" />
      <select required className={field} value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}>
        <option value="">Interested Program *</option>
        {PROGRAMS.map((p) => <option key={p} value={p} className="bg-navy-deep">{p}</option>)}
      </select>
      <textarea className={field} placeholder="Message (optional)" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
      <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full btn-cta px-6 py-3.5 text-sm font-semibold disabled:opacity-60 disabled:pointer-events-none">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}

/* ------------------------- Contact ------------------------- */
function Contact() {
  const s = useSettings();
  return (
    <section id="contact" className="relative py-24 md:py-32 px-5">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-black">{s("section_contact_heading", "Get in Touch")}</h2>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-stretch">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-card p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary shrink-0"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Address</div>
                  <p className="mt-1 leading-relaxed">Office No 23, 3rd Floor, B Wing, City Vista Downtown, Fountain Road, Kharadi, Pune - 411014</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary shrink-0"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                  <a href={`tel:${PHONE}`} className="mt-1 block font-semibold hover:text-primary transition-colors">{PHONE_DISPLAY}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary shrink-0"><Sparkles className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Business Hours</div>
                  <p className="mt-1">Open today <span className="text-primary font-semibold">09:00 am – 05:00 pm</span></p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full btn-cta px-5 py-2.5 text-sm font-semibold">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href="https://www.facebook.com/ExpertAction.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors">
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 min-h-[220px]">
                <iframe
                  title="ExpertAction location"
                  src="https://www.google.com/maps?q=City+Vista+Downtown+Kharadi+Pune&output=embed"
                  className="h-[220px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Footer ------------------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-deep px-5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-gold-soft text-primary-foreground font-black">E</div>
              <span className="font-display font-extrabold text-lg">Expert<span className="text-primary">Action</span><sup className="text-[10px] text-primary">®</sup></span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Price Action. Precision Execution.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => <li key={n.href}><a href={n.href} className="text-muted-foreground hover:text-primary transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href={`tel:${PHONE}`} className="hover:text-primary">{PHONE_DISPLAY}</a></li>
              <li><a href={WHATSAPP} className="hover:text-primary" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>Kharadi, Pune - 411014</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-card/50 p-5 text-[11px] leading-relaxed text-muted-foreground">
          ExpertAction® provides educational content for learning purposes only. It does not offer guaranteed returns, portfolio management, or investment advisory services. All trading and investment decisions should be made at your own discretion after considering your financial objectives and risk profile. This website provides educational content only and does NOT constitute investment advice, financial recommendation, or endorsement of specific securities. No guaranteed returns are promised or implied. Trading in financial markets involves risk, and you are advised to seek guidance from SEBI-registered professionals before making investment decisions.
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>Copyright © 2026 ExpertAction Price Action Trading Academy - All Rights Reserved.</p>
          <a href="/admin" className="text-muted-foreground/60 hover:text-primary transition-colors">Admin Login</a>
        </div>
      </div>
    </footer>
  );
}
