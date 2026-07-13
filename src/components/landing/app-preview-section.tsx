"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

const screenKeys = [
  "preview.splash",
  "preview.community",
  "preview.createActivity",
  "preview.myProgram",
  "preview.findActivities",
  "preview.profile",
  "preview.aiProgram",
  "preview.findPlaces",
  "preview.map",
  "preview.messages",
  "preview.notifications",
  "preview.weeklyProgress",
];

const screenImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-ku77slvR0U2AZ9UT3sYoXNQKdp4Rh0.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-OnDu0b2rDF1m6U6lgEtvFAmo3Vkn3S.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-GUKh6IH72WxTqsc9kLd8YXBChNN1c6.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-3wPNR5Xt1YK1TVtRKZMJp6wFVWAfLZ.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-pqJRdFx6vxFDPolPnZksBfZrZ34L37.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-DtZaVIrq5J3dH6bP9SexgbyUsjqyP0.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-mr9TQvTTFRKEuFhHc0cp8TA42YoUNx.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-fsxbacrcvn9khUec63OT8Hu8yq9oR9.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.png-VaWT8cU94sr75ms0OkkdPl3TrJlPIu.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-mVQewA7jeFoKUu4kJmDmfJNPA3hAHG.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-v5G1bf5i9DrDnDteaOUiL8HZFbDrxz.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-UOWvqRQuYADTZKaMAOlN7U5R8zvrWL.png",
];

export function AppPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t, dir } = useLanguage();

  const totalScreens = screenKeys.length;
  const itemWidth = 256 + 24;
  const maxScrollLeft = (totalScreens - 1) * itemWidth;

  // Smooth horizontal scroll controlled by vertical page scroll
  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !scrollContainer) return;

    let isAnimating = false;
    let currentTarget = 0;

    const handleWheel = (e: WheelEvent) => {
      if (!section || !scrollContainer) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) return;

      const currentScrollLeft = scrollContainer.scrollLeft;
      const delta = e.deltaY;

      // If at the start and scrolling up, or at the end and scrolling down, let it pass
      if (currentScrollLeft <= 0 && delta < 0) return;
      if (currentScrollLeft >= maxScrollLeft && delta > 0) return;

      // Capture the scroll and prevent vertical scrolling
      e.preventDefault();

      // Calculate new target
      currentTarget = Math.max(0, Math.min(maxScrollLeft, currentTarget + delta * 0.8));
      
      // Smooth animate to target
      if (!isAnimating) {
        isAnimating = true;
        const animate = () => {
          const current = scrollContainer.scrollLeft;
          const diff = currentTarget - current;
          
          if (Math.abs(diff) < 0.5) {
            scrollContainer.scrollLeft = currentTarget;
            isAnimating = false;
            setActiveIndex(Math.round(currentTarget / itemWidth));
            return;
          }

          // Smooth ease towards target
          scrollContainer.scrollLeft += diff * 0.12;
          setActiveIndex(Math.round(scrollContainer.scrollLeft / itemWidth));
          requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      } else {
        // Just update the target while animating
        currentTarget = Math.max(0, Math.min(maxScrollLeft, currentTarget + delta * 0.8));
      }
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [maxScrollLeft, itemWidth]);

  // Sync active index on any scroll change
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(newIndex, totalScreens - 1));
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [itemWidth, totalScreens]);

  const titleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section 
      className="py-24 lg:py-32 bg-muted/30 overflow-hidden relative min-h-screen flex items-center" 
      ref={sectionRef} 
      dir={dir}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-foreground text-sm font-medium mb-4">
            {t("preview.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            <motion.span
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleAnimation}
              className="inline-block text-foreground"
            >
              {t("preview.title")}{" "}
            </motion.span>
            <motion.span
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleAnimation}
              className="inline-block text-primary"
            >
              {t("preview.titleHighlight")}
            </motion.span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            {t("preview.subtitle")}
          </p>
          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-muted-foreground/60"
          >
            ↓ Scroll to browse all screens ↓
          </motion.p>
        </motion.div>

        {/* Horizontal Scroll Container - Full Width */}
        <div className="relative w-full" ref={ref}>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {screenKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="shrink-0 snap-center first:ml-0 last:mr-0"
              >
                {/* Real iPhone Screenshot */}
                <div className="relative w-56 sm:w-64 hover:scale-105 transition-transform duration-300">
                  <img
                    src={screenImages[index]}
                    alt={t(key)}
                    className="w-full h-auto drop-shadow-2xl rounded-4xl"
                  />
                </div>
                
                {/* Label */}
                <p className="text-center mt-4 text-sm font-medium text-muted-foreground">
                  {t(key)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-xs text-muted-foreground font-medium">
              {activeIndex + 1} / {totalScreens}
            </span>
            <div className="w-48 h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${((activeIndex + 1) / totalScreens) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {screenKeys.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const scrollContainer = scrollRef.current;
                  if (scrollContainer) {
                    scrollContainer.scrollTo({
                      left: index * itemWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to ${t(screenKeys[index])}`}
              />
            ))}
          </div>

          {/* Gradient Overlays for Scroll Indication */}
          <div className="absolute left-0 top-0 bottom-8 w-16 bg-linear-to-r from-muted/30 to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute right-0 top-0 bottom-8 w-16 bg-linear-to-l from-muted/30 to-transparent pointer-events-none hidden lg:block" />
        </div>
      </div>
    </section>
  );
}