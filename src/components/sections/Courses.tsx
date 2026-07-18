import { Phone, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { PHONE } from "@/lib/constants";
import { useSettings } from "@/hooks/use-settings";

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

export default function Courses() {
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