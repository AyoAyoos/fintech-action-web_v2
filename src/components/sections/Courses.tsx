"use client";

import { useEffect, useState } from "react";
import { Phone, Check, TrendingUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";

import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { PHONE } from "@/lib/constants";
import { useSettings } from "@/hooks/use-settings";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

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
    <section id="courses" className="relative py-20 md:py-28 px-4 bg-[#F9FAFB] text-[#111827] overflow-hidden">
      
      {/* ------------------------------------------- */}
      {/* AMBIENT BACKGROUND SYSTEM                  */}
      {/* ------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11182705_1px,transparent_1px),linear-gradient(to_bottom,#11182705_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Soft Radial Ambient Blue Glows */}
        <div className="absolute top-1/4 -left-1/4 w-[60%] h-[50%] rounded-full bg-[#2563EB]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[60%] h-[50%] rounded-full bg-[#93C5FD]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <span className="text-[#2563EB] text-xs font-bold tracking-widest uppercase bg-[#2563EB]/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5" /> Programs
            </span>
            <h2 className="mt-4 font-sans text-3xl md:text-5xl font-black text-[#111827] uppercase tracking-tight">
              {s("section_courses_heading", "Our Entry Setup Trading Programs")}
            </h2>
            <div className="h-1 w-20 bg-[#2563EB] mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-[16px] text-[#111827]/70 font-medium">
              {s("section_courses_sub", "Copyright-registered curricula built from real market experience.")}
            </p>
          </div>
        </Reveal>

        {/* ------------------------------------------- */}
        {/* CAROUSEL MODE (MOBILE & TABLET VIEWPORTS)  */}
        {/* ------------------------------------------- */}
        {isMobile ? (
          <div className="w-full px-2 py-4">
            <Swiper
              modules={[EffectCoverflow]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              initialSlide={1}
              coverflowEffect={{
                rotate: 0,
                stretch: 8,
                depth: 140,
                modifier: 2.5,
                slideShadows: false,
              }}
              className="w-full max-w-md !overflow-visible"
            >
              {COURSES.map((c, i) => (
                <SwiperSlide key={i} className="w-[85%] sm:w-[75%] opacity-40 [&.swiper-slide-active]:opacity-100 transition-opacity duration-300">
                  <CourseCard course={c} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
         
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {COURSES.map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <CourseCard course={c} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Isolated CourseCard Component for Clean Separation
// ----------------------------------------------------------------------
function CourseCard({ course, index }: { course: any; index: number }) {
  return (
    <div 
      className={`group relative rounded-3xl border p-6 lg:p-8 h-full flex flex-col transition-all duration-300 bg-white shadow-md hover:shadow-xl ${
        course.popular 
          ? "border-[#2563EB] ring-1 ring-[#2563EB]/30 scale-102" 
          : "border-[#DBEAFE] hover:border-[#93C5FD]"
      }`}
    >
      {course.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] px-5 py-1 text-[11px] font-bold text-white tracking-widest uppercase shadow-md">
          Most Popular
        </div>
      )}
      
      <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider bg-[#DBEAFE]/40 px-2.5 py-1 rounded w-fit">
        {course.tag}
      </div>
      
      <h3 className="mt-4 font-sans text-xl lg:text-2xl font-black text-[#111827] leading-tight">
        {course.title}
      </h3>
      <p className="mt-1 text-xs sm:text-sm font-semibold text-[#2563EB]/90">
        {course.subtitle}
      </p>
      <p className="mt-4 text-xs sm:text-sm text-[#111827]/70 font-medium flex-grow">
        {course.desc}
      </p>

      <div className="mt-6 flex flex-col border-y border-[#DBEAFE] py-4 my-2 gap-1.5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-[#111827]/50 font-bold uppercase tracking-wide">Program Fee</span>
          <span className="font-sans text-3xl font-black text-[#1E3A8A] tracking-tight">{course.fee}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-medium text-[#111827]/70">
          <span>Duration:</span>
          <span className="text-[#111827] font-bold bg-[#F9FAFB] px-2 py-0.5 rounded border border-[#DBEAFE]">
            {course.duration}
          </span>
        </div>
      </div>

      <ul className="mt-4 space-y-3 flex-grow">
        {course.features.map((f: string) => (
          <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm">
            <span className="mt-0.5 shrink-0 grid h-5 w-5 place-items-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span className="text-[#111827]/85 font-semibold">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 w-full">
        {course.popular ? (
          <CTAButton>
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${PHONE}`} 
              className="flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold bg-[#2563EB] hover:bg-[#1E3A8A] text-white shadow-md transition-colors w-full uppercase tracking-wider"
            >
              <Phone className="h-4 w-4 stroke-[2.5]" /> Call to Enroll
            </motion.a>
          </CTAButton>
        ) : (
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`tel:${PHONE}`} 
            className="flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold bg-white hover:bg-zinc-50 text-[#111827] border border-[#DBEAFE] hover:border-[#93C5FD] shadow-sm transition-colors w-full uppercase tracking-wider"
          >
            <Phone className="h-4 w-4 text-[#2563EB] stroke-[2.5]" /> Call to Enroll
          </motion.a>
        )}
      </div>
    </div>
  );
}