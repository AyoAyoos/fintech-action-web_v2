import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Award, BookOpen, ShieldCheck, Copyright, TrendingUp, Target, Users } from "lucide-react";
import { fetchSettingSignedUrl } from "@/lib/site-queries";
import Reveal from "@/components/Reveal";
import { useSettings } from "@/hooks/use-settings";

export default function About() {
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