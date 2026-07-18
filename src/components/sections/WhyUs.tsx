import { Copyright, ShieldCheck, TrendingUp, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useSettings } from "@/hooks/use-settings";

const WHY = [
  { icon: Copyright, title: "Copyright 11 Entry Setup", desc: "Proprietary, registered systems." },
  { icon: ShieldCheck, title: "Micro SL Strategy", desc: "Tight, defined stop-losses." },
  { icon: TrendingUp, title: "Live Market Mentoring", desc: "Real trades, real time." },
  { icon: Users, title: "1,500+ Students Trained", desc: "A proven track record." },
];

export default function WhyUs() {
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