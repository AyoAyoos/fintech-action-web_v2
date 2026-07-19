"use client";

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { type MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, LayoutGrid } from "lucide-react";
import { fetchGallery } from "@/lib/site-queries";
import Reveal from "@/components/Reveal";
import { useSettings } from "@/hooks/use-settings";

type GalleryStage = "stack" | "queue";

const STACK_LIMIT = 6;
const STACK_ROTATIONS = [-5, -2, 2, 4, -1, 3];

export default function Gallery() {
  const s = useSettings();
  const { data: images = [] } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });
  
  const [phase, setPhase] = useState<GalleryStage>("stack");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [paused, setPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const touchStart = useRef<number | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const validImages = useMemo(() => images.filter((image) => image.signedUrl), [images]);
  const count = validImages.length;
  
  const stackImages = useMemo(() => validImages.slice(0, Math.min(STACK_LIMIT, count)), [count, validImages]);
  const shouldAutoPlay = !paused && !isInteracting && isVisible && phase === "queue";

  // 3D Parallax Mouse Tracking Effects
  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);
  const heroRotateX = useTransform(heroY, [-60, 60], [4, -4]);
  const heroRotateY = useTransform(heroX, [-60, 60], [-4, 4]);

  const navigate = (newDirection: "next" | "prev") => {
    if (count === 0) return;
    setDirection(newDirection);
    setActiveIndex((prev) => {
      if (newDirection === "next") return (prev + 1) % count;
      return (prev - 1 + count) % count;
    });
  };

  useEffect(() => {
    if (!galleryRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldAutoPlay || count < 2) return;
    const timeout = window.setTimeout(() => navigate("next"), 5000);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, count, shouldAutoPlay]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - bounds.left) / bounds.width - 0.5;
    const dy = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroX.set(dx * 60);
    heroY.set(dy * 60);
  };

  const handleMouseLeave = () => {
    heroX.set(0);
    heroY.set(0);
    setPaused(false);
    setIsInteracting(false);
  };

  // Function to calculate relative array layout position adjustments
  const getVisibleQueueRange = () => {
    if (count === 0) return [];
    const positions = [-2, -1, 0, 1, 2]; // 5 visible screenshot tracks at once
    return positions.map((pos) => {
      const targetIndex = (activeIndex + pos + count) % count;
      return {
        image: validImages[targetIndex],
        offset: pos,
        actualIndex: targetIndex
      };
    });
  };

  const queueItems = useMemo(getVisibleQueueRange, [activeIndex, count, validImages]);

  return (
    <section id="gallery" className="relative overflow-hidden px-4 py-20 md:px-6 md:py-28 bg-[#F9FAFB] text-[#111827]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11182704_1px,transparent_1px),linear-gradient(to_bottom,#11182704_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.05),_transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase bg-[#2563EB]/10 text-[#2563EB] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> PnL Statements
            </span>
            <h2 className="mt-4 font-sans text-3xl font-black md:text-5xl uppercase tracking-tight text-[#111827]">
              {s("section_gallery_heading", "Live Market Trading Verified Results")}
            </h2>
            <div className="h-1 w-16 bg-[#2563EB] mx-auto mt-3 rounded-full" />
            <p className="mt-4 text-[16px] font-medium text-[#111827]/70">
              {s("section_gallery_sub", "Real-time screenshot updates directly verified from trading dashboards.")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            ref={galleryRef}
            className="relative mx-auto w-full max-w-[1150px] rounded-[2.5rem] border border-[#DBEAFE] bg-white p-4 shadow-xl backdrop-blur-xl md:p-6"
          >
            {count === 0 ? (
              <div className="grid min-h-[500px] place-items-center rounded-[1.8rem] border border-dashed border-[#DBEAFE] bg-[#F9FAFB] p-8 text-center text-sm font-semibold text-[#111827]/50">
                No verified screenshots uploaded yet.
              </div>
            ) : (
              /* THE SCREENSHOT WRAPPER CONTAINER */
              <div 
                className="relative min-h-[550px] md:min-h-[650px] overflow-hidden rounded-[2rem] border border-[#DBEAFE]/60 bg-[#F9FAFB] p-6 flex items-center justify-center shadow-inner"
                onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; setIsInteracting(true); }}
                onTouchEnd={(e) => {
                  if (touchStart.current == null) return;
                  const dx = e.changedTouches[0].clientX - touchStart.current;
                  if (Math.abs(dx) > 50) navigate(dx < 0 ? "next" : "prev");
                  touchStart.current = null;
                  setIsInteracting(false);
                }}
              >
                <AnimatePresence mode="wait">
                  {phase === "stack" ? (
                    /* DECK GRID STACK ENTRANCE */
                    <motion.div
                      key="stack-phase"
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative flex h-[400px] w-full items-center justify-center overflow-visible"
                    >
                      {stackImages.map((image, index) => {
                        const rotation = STACK_ROTATIONS[index % STACK_ROTATIONS.length];
                        return (
                          <motion.div
                            key={image.id}
                            layoutId={`gallery-img-${image.id}`}
                            initial={{ opacity: 0, scale: 0.7, y: 40 }}
                            animate={{
                              opacity: 1,
                              x: (index - (stackImages.length - 1) / 2) * 28,
                              y: index * 6,
                              rotate: rotation,
                              scale: 1 - index * 0.02,
                              zIndex: stackImages.length - index,
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 18, delay: index * 0.04 }}
                            whileHover={{ y: -20, scale: 1.04, rotate: rotation * 0.3, zIndex: 50 }}
                            onClick={() => {
                              setActiveIndex(index);
                              setPhase("queue");
                            }}
                            // Explicit Aspect Ratio 9:16 configuration to resemble a phone screen wrapper
                            className="absolute h-[320px] aspect-[9/16] cursor-pointer overflow-hidden rounded-[1.8rem] border border-[#DBEAFE] bg-white p-2 shadow-md md:h-[400px]"
                          >
                            <img src={image.signedUrl ?? ""} alt="" className="h-full w-full rounded-[1.3rem] object-cover pointer-events-none" />
                            <div className="absolute inset-0 flex items-center justify-center bg-[#111827]/20 opacity-0 transition-opacity hover:opacity-100 rounded-[1.8rem]">
                              <Maximize2 className="h-6 w-6 text-white" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    /* ADVANCED DOCK HORIZONTAL PHONE QUEUE SLIDER */
                    <motion.div
                      key="queue-phase"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full flex items-center justify-center overflow-visible py-8"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={() => setPaused(true)}
                    >
                      <div className="relative flex items-center justify-center w-full h-[460px] md:h-[560px] overflow-visible">
                        {queueItems.map(({ image, offset, actualIndex }) => {
                          const isCenter = offset === 0;
                          
                          return (
                            <motion.div
                              key={`${image.id}-${actualIndex}`}
                              layoutId={isCenter ? `gallery-img-${image.id}` : undefined}
                              style={isCenter ? { rotateX: heroRotateX, rotateY: heroRotateY, transformPerspective: 1000 } : undefined}
                              animate={{
                                scale: isCenter ? 1 : 0.82 - Math.abs(offset) * 0.04,
                                x: offset * 240, // Horizontal layout positioning track step size
                                zIndex: 10 - Math.abs(offset),
                              }}
                              transition={{ type: "spring", stiffness: 120, damping: 20 }}
                              onClick={() => {
                                if (!isCenter) {
                                  setDirection(offset > 0 ? "next" : "prev");
                                  setActiveIndex(actualIndex);
                                }
                              }}
                              className={`absolute h-[420px] md:h-[520px] aspect-[9/16] rounded-[2.2rem] border bg-white p-2.5 shadow-xl transition-shadow duration-300 select-none ${
                                isCenter 
                                  ? "border-[#2563EB] cursor-default z-30 shadow-[0_25px_60px_rgba(37,99,235,0.18)]" 
                                  : "border-[#DBEAFE] cursor-pointer opacity-50 hover:opacity-75 z-10"
                              }`}
                            >
                              <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-zinc-50">
                                <img
                                  src={image.signedUrl ?? ""}
                                  className="w-full h-full object-cover pointer-events-none"
                                  alt="Verified Dashboard Snapshot"
                                />
                                
                                {/* HEAVY DARK BLUR MASK OVERLAY FOR ITEMS OUT OF FOCUS IN QUEUE */}
                                {!isCenter && (
                                  <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/60 via-[#111827]/40 to-[#111827]/70 backdrop-blur-[1.5px] transition-opacity duration-300" />
                                )}
                              </div>

                              {/* UI Overlay details strictly reserved for centered active layout frame */}
                              {isCenter && (
                                <>
                                  <div className="absolute left-6 top-6 rounded-full bg-[#111827]/70 border border-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md shadow-sm">
                                    {activeIndex + 1} / {count}
                                  </div>

                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setPhase("stack"); }} 
                                    className="absolute right-6 top-6 rounded-full border border-[#DBEAFE] bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all shadow-md z-40"
                                  >
                                    <LayoutGrid className="w-3 h-3 inline mr-1 -mt-0.5" /> Stack
                                  </button>

                                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 bg-gradient-to-t from-[#111827]/90 via-[#111827]/40 to-transparent rounded-b-[2.2rem] pt-12 pointer-events-none">
                                    <div className="text-left drop-shadow-md">
                                      <p className="text-[10px] uppercase tracking-[0.25em] font-black text-[#93C5FD]">Verified Record</p>
                                      <h3 className="text-sm md:text-base font-black text-white uppercase tracking-wide">Execution Dashboard</h3>
                                    </div>
                                    <div className="flex gap-2 pointer-events-auto">
                                      <button
                                        onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
                                        className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#111827]/60 text-white backdrop-blur-md transition-all hover:bg-[#2563EB] active:scale-95 shadow-md"
                                        aria-label="Previous screenshot"
                                      >
                                        <ChevronLeft className="h-4 w-4 stroke-[3]" />
                                      </button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); navigate("next"); }}
                                        className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#111827]/60 text-white backdrop-blur-md transition-all hover:bg-[#2563EB] active:scale-95 shadow-md"
                                        aria-label="Next screenshot"
                                      >
                                        <ChevronRight className="h-4 w-4 stroke-[3]" />
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}