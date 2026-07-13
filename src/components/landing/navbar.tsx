"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Sparkles, Trophy, MessageCircle, Download, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage, type Language } from "@/lib/language-context";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t, dir } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "#features", label: t("nav.features"), icon: Home },
    { href: "#gamification", label: t("nav.gamification"), icon: Trophy },
    { href: "#ai-coach", label: t("nav.aiCoach"), icon: Sparkles },
    { href: "#testimonials", label: t("nav.reviews"), icon: MessageCircle },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "EN" },
    { code: "fr", label: "Francais", flag: "FR" },
    { code: "ar", label: "العربية", flag: "AR" },
  ];

  return (
    <>
      {/* Desktop Floating Bottom Navbar */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            dir={dir}
          >
            <div className="flex items-center gap-2 px-2 py-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:bg-gray-900/80 dark:border-gray-700">
              {/* Logo */}
              <a 
                href="/" 
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src="/logo.png"
                    alt="Fitiva Logo"
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-bold text-foreground">Fitiva</span>
              </a>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

              {/* Navigation Links */}
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden lg:inline">{link.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold">{language.toUpperCase()}</span>
                </button>
                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 ${
                            language === lang.code ? "bg-primary/10 text-primary" : "text-foreground"
                          }`}
                        >
                          <span className="font-bold text-xs">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

              {/* CTA Button */}
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">{t("nav.download")}</span>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navbar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        dir={dir}
      >
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:bg-gray-900/80 dark:border-gray-700">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm italic">F</span>
            </div>
          </a>

          {/* Center Navigation Pills */}
          <div className="flex items-center gap-1">
            {navLinks.slice(0, 3).map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Menu Button */}
          <button
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 right-0 mb-2 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:bg-gray-900/90 dark:border-gray-700"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </a>
                  );
                })}
                
                {/* Language & Theme Row */}
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                  <div className="flex items-center gap-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          language === lang.code 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {lang.flag}
                      </button>
                    ))}
                  </div>
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                  )}
                </div>
                
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-2 mt-2"
                >
                  <Download className="w-4 h-4" />
                  {t("nav.downloadApp")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
