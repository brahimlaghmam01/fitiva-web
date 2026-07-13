"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Flame, Medal, Star, TrendingUp, Crown, Zap, Target, Award, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useScrollAnimation, staggerContainer, staggerItem } from "@/hooks/use-scroll-animation";

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
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function GamificationSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });
  const { t, dir } = useLanguage();

  const badges = [
    { icon: Flame, labelKey: "game.firstWorkout" },
    { icon: Medal, labelKey: "game.weekWarrior" },
    { icon: Star, labelKey: "game.speedster" },
    { icon: Crown, labelKey: "game.socialButterfly" },
    { icon: Zap, labelKey: "game.earlyBird" },
    { icon: Target, labelKey: "game.nightOwl" },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah M.", points: 12450, change: "+120" },
    { rank: 2, name: "Mike T.", points: 11890, change: "+85" },
    { rank: 3, name: "Emma L.", points: 11250, change: "+92" },
    { rank: 4, name: "John D.", points: 10980, change: "+45" },
    { rank: 5, name: "Lisa K.", points: 10720, change: "+67" },
  ];

  return (
    <section id="gamification" className="py-24 lg:py-32 bg-background" ref={ref} dir={dir}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span variants={staggerItem} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-foreground text-sm font-medium mb-4">
            {t("game.badge")}
          </motion.span>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Make fitness <span className="text-primary">fun and rewarding</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-4 text-lg text-muted-foreground text-pretty">
            {t("game.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-3xl border border-border p-6 lg:p-8 card-hover"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-muted-foreground text-sm">{t("game.totalPoints")}</p>
                  <p className="text-4xl lg:text-5xl font-bold text-foreground mt-1">
                    <AnimatedCounter target={847250} />
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{t("game.currentStreak")}</span>
                    <span className="text-foreground font-medium">12 {t("game.days")}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "75%" } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-3xl border border-border p-6 lg:p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">{t("game.achievements")}</h3>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.labelKey}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-primary/20">
                      <badge.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                      {t(badge.labelKey)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-3xl border border-border p-6 lg:p-8 card-hover"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">{t("game.leaderboard")}</h3>
              <div className="flex items-center gap-2 text-primary text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>{t("game.thisWeek")}</span>
              </div>
            </div>

            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    index === 0
                      ? "bg-primary/10 border border-primary/20 shadow-sm"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      index === 0
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.rank}
                  </div>

                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-400 flex items-center justify-center text-primary-foreground font-bold shadow-md">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.points.toLocaleString()} {t("game.pts")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary">
                  24
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">You</p>
                  <p className="text-sm text-muted-foreground">8,450 {t("game.pts")}</p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+156</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid sm:grid-cols-3 gap-6"
        >
          {[
            { value: 45, labelKey: "game.currentStreak", icon: Flame },
            { value: 128, labelKey: "game.achievements", icon: Award },
            { value: 15, labelKey: "game.leaderboard", icon: Trophy },
          ].map((stat, index) => (
            <motion.div
              key={stat.labelKey + index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-card rounded-3xl border border-border p-6 text-center card-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-green-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-foreground">
                <AnimatedCounter target={stat.value} duration={1.5} />
              </p>
              <p className="text-muted-foreground mt-1">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}