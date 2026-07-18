import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchGallery } from "@/lib/site-queries";
import Reveal from "@/components/Reveal";
import { useSettings } from "@/hooks/use-settings";

export default function Gallery() {
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