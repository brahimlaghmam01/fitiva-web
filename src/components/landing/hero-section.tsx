"use client";

import { motion } from "framer-motion";
import { Play, Download, Smartphone, Award, Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

const appScreenshots = [
  "/images/phone/1.png",
  "/images/phone/2.png",
  "/images/phone/3.png",
  "/images/phone/4.png",
];

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8 } },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const cardLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const cardRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const badgeVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { t, dir } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % appScreenshots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = useCallback((platform: string) => {
    fetch("/api/download-stats/increment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform }),
    }).catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 overflow-hidden bg-black" dir={dir}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/landing/hero-bg.png"
          alt="Athlete background"
          className="object-cover w-full h-full opacity-80 scale-105"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black" />
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* New Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <span className="px-2 py-0.5 rounded-full bg-primary text-black text-[10px] font-bold uppercase">New</span>
          <span className="text-sm font-medium text-white/90">A calmer way to build habits</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-9xl font-extrabold text-white tracking-tighter mb-8 max-w-5xl mx-auto leading-[0.95]">
          Build habits that <br />
          <span className="bg-linear-to-r from-primary via-white to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            actually stick
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          You see the right habits at the right time <br className="hidden md:block" />
          so your day never feels crowded.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 text-base font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            Start tracking for free
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 text-base font-semibold gap-2">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            Watch demo
          </Button>
        </motion.div>

        {/* Device & Floating Elements Container */}
        <div className="relative max-w-5xl mx-auto mt-10">
          {/* Main App Mockup */}
          <motion.div variants={itemVariants} className="relative z-10 w-full max-w-[320px] mx-auto">
            <div className="relative rounded-[3rem] p-3 bg-neutral-900 border-8 border-neutral-800 shadow-2xl overflow-hidden aspect-9/19.5">
              <div className="absolute inset-0">
                {appScreenshots.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Fitiva App Screen ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      index === currentScreen ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-25 h-6.25 bg-black rounded-full z-20" />
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {appScreenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScreen(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentScreen ? "bg-primary w-4" : "bg-white/30"
                  }`}
                  aria-label={`Go to screen ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Left Floating Card */}
          <motion.div
            variants={cardLeftVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 z-20 w-48 h-48 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hidden md:flex flex-col items-center justify-center text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-bold leading-tight">7-day streak <br /> unlocked</p>
          </motion.div>

          {/* Right Floating Card */}
          <motion.div
            variants={cardRightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute right-0 lg:-right-20 top-2/3 -translate-y-1/2 z-20 w-56 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl hidden md:block"
          >
            <p className="text-white/60 text-xs font-medium mb-1 text-center">Today's goal:</p>
            <p className="text-white font-bold text-sm mb-6 text-center">Complete 3 habits</p>
            
            <div className="flex justify-around items-center">
              {[
                { icon: Smartphone, progress: 65, label: "Morning" },
                { icon: Star, progress: 87, label: "Midday" },
                { icon: Smartphone, progress: 94, label: "Evening" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center border border-white/20">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-white/60 font-bold">{item.progress}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Right: Get for Free */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -right-4 top-20 z-20 hidden lg:block"
          >
            <div className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold flex items-center gap-2 shadow-xl animate-pulse-glow">
              Get it for FREE
              <Download className="w-3 h-3" />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  );
}