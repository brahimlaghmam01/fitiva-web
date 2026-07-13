"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Bell, LineChart, Sparkles, Dumbbell, Clock, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function AICoachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, dir } = useLanguage();

  const features = [
    {
      icon: Dumbbell,
      titleKey: "ai.personalizedWorkouts",
      descKey: "ai.personalizedWorkoutsDesc",
    },
    {
      icon: Lightbulb,
      titleKey: "ai.smartSuggestions",
      descKey: "ai.smartSuggestionsDesc",
    },
    {
      icon: Bell,
      titleKey: "ai.progressTracking",
      descKey: "ai.progressTrackingDesc",
    },
    {
      icon: LineChart,
      titleKey: "ai.adaptivePlans",
      descKey: "ai.adaptivePlansDesc",
    },
  ];

  const titleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="ai-coach" className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden" ref={ref} dir={dir}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - AI Coach Card */}
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-card rounded-3xl border border-border p-6 lg:p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                  <Brain className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{t("ai.coach")}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm text-primary">{t("ai.active")}</span>
                  </div>
                </div>
                <Sparkles className="w-6 h-6 text-primary ms-auto" />
              </div>

              {/* Chat Simulation */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="bg-primary/10 rounded-2xl rounded-tl-none p-4"
                >
                  <p className="text-sm text-foreground">
                    Good morning! Based on your sleep data and yesterday&apos;s workout, I recommend a lighter recovery session today.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="bg-muted rounded-2xl rounded-tr-none p-4 ms-auto max-w-[80%]"
                >
                  <p className="text-sm text-foreground">
                    Sounds good! What do you suggest?
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="bg-primary/10 rounded-2xl rounded-tl-none p-4"
                >
                  <p className="text-sm text-foreground mb-3">
                    Here&apos;s your personalized plan:
                  </p>
                  <div className="space-y-2">
                    {[
                      { time: "15 min", activity: "Yoga & Stretching" },
                      { time: "20 min", activity: "Light Cardio" },
                      { time: "10 min", activity: "Meditation" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-background/50 rounded-xl p-3"
                      >
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                        <span className="text-sm text-foreground">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
                className="mt-6 flex items-center gap-3"
              >
                <div className="flex-1 bg-muted rounded-xl px-4 py-3">
                  <p className="text-sm text-muted-foreground">{t("ai.askCoach")}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 -top-8 bg-card rounded-2xl p-4 shadow-xl border border-border hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                  <LineChart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">+23% Progress</p>
                  <p className="text-[10px] text-muted-foreground">This month</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-foreground text-sm font-medium mb-4">
              {t("ai.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
              <motion.span
                custom={0}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleAnimation}
                className="inline-block text-foreground"
              >
                {t("ai.title")}{" "}
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleAnimation}
                className="inline-block text-primary"
              >
                {t("ai.titleHighlight")}
              </motion.span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              {t("ai.subtitle")}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
