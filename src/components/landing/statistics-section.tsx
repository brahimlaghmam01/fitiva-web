"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Flame, Trophy, Dumbbell } from "lucide-react";
import { fetchDownloadStats } from "@/lib/api";
import { useScrollAnimation, staggerContainer, staggerItem } from "@/hooks/use-scroll-animation";

const stats = [
  { icon: Users, value: 62000, suffix: "+", label: "Users Motivated Daily", gradient: "from-primary to-blue-500" },
  { icon: Trophy, value: 1500000, suffix: "+", label: "Challenges Completed", gradient: "from-secondary to-green-400" },
  { icon: Flame, value: 8500000, suffix: "+", label: "Workout Streaks Created", gradient: "from-orange-500 to-red-500" },
  { icon: Dumbbell, value: 25000000, suffix: "+", label: "Exercises Logged", gradient: "from-purple-500 to-pink-500" },
];

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toLocaleString();
  };

  return <span ref={ref}>{formatNumber(count)}</span>;
}

export function StatisticsSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 });
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    fetchDownloadStats().then((stats) => {
      if (stats.total > 0) setDownloads(stats.total);
    });
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-linear-to-b from-muted/30 to-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span variants={staggerItem} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Impact
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            The numbers speak for{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">themselves</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-4 text-lg text-muted-foreground text-pretty">
            Join a thriving community of fitness enthusiasts achieving their goals.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-card rounded-3xl border border-border p-6 lg:p-8 text-center card-hover"
            >
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                <AnimatedCounter target={stat.value} duration={2.5} />
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {downloads !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <strong className="text-foreground">{downloads.toLocaleString()}+</strong> downloads and counting. 
              Every day, thousands of users around the world are crushing their fitness goals with Fitiva. 
              Be part of the movement.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}