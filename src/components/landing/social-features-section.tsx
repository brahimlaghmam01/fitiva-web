"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { 
  Star, 
  Smartphone, 
  Apple, 
  PhoneOff, 
  Droplets, 
  Sparkles, 
  Brain, 
  Activity, 
  Wind,
  Moon,
  Sun,
  Coffee,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useScrollAnimation, staggerContainer, staggerItem } from "@/hooks/use-scroll-animation";

export function SocialFeaturesSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const { t, dir } = useLanguage();

  const tags = ["#Founders", "#Students", "#Busy parents", "#Remote teams"];

  const floatingCards = [
    { id: 1, type: 'icon', icon: Wind, title: "Meditate", color: "bg-purple-500", x: -300, y: -150, delay: 0.2 },
    { id: 2, type: 'image', src: "/images/landing/meditation.png", title: "Morning Yoga", x: -240, y: -40, delay: 0.3 },
    { id: 3, type: 'icon', icon: PhoneOff, title: "Phone off by 10:30", color: "bg-blue-500", x: -200, y: 100, delay: 0.4 },
    { id: 4, type: 'icon', icon: Droplets, title: "Track water", color: "bg-cyan-500", x: -140, y: 220, delay: 0.5 },
    { id: 5, type: 'image', src: "/images/landing/journaling.png", title: "Daily Journal", x: 240, y: -100, delay: 0.6 },
    { id: 6, type: 'icon', icon: Brain, title: "Focus session", color: "bg-green-500", x: 280, y: 20, delay: 0.7 },
    { id: 7, type: 'icon', icon: Sparkles, title: "Clean workspace", color: "bg-orange-500", x: 200, y: 140, delay: 0.8 },
    { id: 8, type: 'icon', icon: Activity, title: "Stretch for 5 mins", color: "bg-indigo-500", x: -340, y: 20, delay: 0.9 },
    { id: 9, type: 'icon', icon: Coffee, title: "Healthy breakfast", color: "bg-amber-500", x: 320, y: -200, delay: 1.0 },
    { id: 10, type: 'icon', icon: Moon, title: "Sleep hygiene", color: "bg-slate-700", x: -120, y: -220, delay: 1.1 },
    { id: 11, type: 'icon', icon: Sun, title: "Morning sunlight", color: "bg-yellow-500", x: 140, y: -260, delay: 1.2 },
    { id: 12, type: 'icon', icon: CheckCircle2, title: "Daily goals", color: "bg-emerald-500", x: 340, y: 100, delay: 1.3 },
  ];

  return (
    <section id="social-features" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref} dir={dir}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8">
            Build steady daily <span className="inline-block align-middle mx-1 w-10 h-7 md:w-14 md:h-9 rounded-full overflow-hidden border-2 border-primary/20"><img src="/images/landing/meditation.png" alt="" className="object-cover w-full h-full" /></span> habits with a <br className="hidden md:block" />
            layout that keeps your mornings, <br className="hidden md:block" />
            evenings, <span className="inline-block align-middle mx-1 w-10 h-7 md:w-14 md:h-9 rounded-full overflow-hidden border-2 border-primary/20 bg-blue-500/10 flex items-center justify-center text-xl md:text-2xl">☁️</span> and focus simple to follow.
          </motion.h2>
          
          <motion.div variants={staggerItem} className="space-y-6">
            <p className="text-muted-foreground font-medium">{t("social.subtitle") || "Used by people to improve routines."}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-muted text-sm font-medium hover:bg-muted/80 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="relative h-[500px] md:h-[700px] flex items-center justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20 w-[240px] md:w-[300px] aspect-[1/2] rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-slate-950 bg-slate-950 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 md:h-6 bg-slate-950 rounded-b-2xl z-30" />
            <img 
              src="/images/landing/app-screen.png" 
              alt="Fitiva App Interface" 
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </motion.div>

          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            {floatingCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: card.x, 
                    y: card.y, 
                    scale: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 50, 
                      damping: 15, 
                      delay: card.delay 
                    }
                  } : {}}
                  whileHover={{ scale: 1.05, y: (card.y ?? 0) - 10, transition: { duration: 0.2 } }}
                  className="absolute pointer-events-auto"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 shadow-xl border border-border flex items-center gap-3 min-w-[160px] md:min-w-[180px]">
                    {card.type === 'icon' && Icon ? (
                      <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${card.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon size={18} />
                      </div>
                    ) : card.src ? (
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-lg border border-border">
                        <img src={card.src} alt={card.title} className="object-cover w-full h-full" loading="lazy" />
                      </div>
                    ) : null}
                    <span className="font-semibold text-xs md:text-sm whitespace-nowrap">{card.title}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute -bottom-20 left-0 right-0 grid grid-cols-2 gap-3 md:hidden p-4">
             {floatingCards.slice(0, 6).map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.id} className="bg-white dark:bg-slate-900 rounded-xl p-2.5 shadow-md border border-border flex items-center gap-2">
                     {card.type === 'icon' && Icon ? (
                      <div className={`w-7 h-7 rounded-lg ${card.color} flex items-center justify-center text-white`}>
                        <Icon size={14} />
                      </div>
                    ) : card.src ? (
                      <div className="w-7 h-7 rounded-lg overflow-hidden border border-border">
                        <img src={card.src} alt={card.title} className="object-cover w-full h-full" loading="lazy" />
                      </div>
                    ) : null}
                    <span className="font-medium text-[10px] truncate">{card.title}</span>
                  </div>
                );
             })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-24 md:mt-32 space-y-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold">4.7 rating</span>
            <span className="text-sm text-muted-foreground">(based on 125 reviews)</span>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stay consistent with a system that fits into real life. Simple cards, clear routines, and gentle nudges help you build progress that lasts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-3 bg-foreground text-background px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity w-full sm:w-auto justify-center min-w-[200px] shadow-lg">
              <Apple size={24} />
              <div className="text-left">
                <div className="text-[10px] uppercase leading-none opacity-70 font-medium">Download for</div>
                <div className="text-lg leading-tight">iPhone</div>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-muted px-8 py-3.5 rounded-full font-bold hover:bg-muted/80 transition-colors w-full sm:w-auto justify-center min-w-[200px]">
              <Smartphone size={24} />
              <div className="text-left">
                <div className="text-[10px] uppercase leading-none opacity-70 font-medium">Get it on</div>
                <div className="text-lg leading-tight">Android</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-30 pointer-events-none" />
    </section>
  );
}