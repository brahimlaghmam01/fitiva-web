import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { SocialFeaturesSection } from "@/components/landing/social-features-section";
import { GamificationSection } from "@/components/landing/gamification-section";
import { AICoachSection } from "@/components/landing/ai-coach-section";
import { AppPreviewSection } from "@/components/landing/app-preview-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { StatisticsSection } from "@/components/landing/statistics-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SocialFeaturesSection />
      <GamificationSection />
      <AICoachSection />
      <AppPreviewSection />
      <TestimonialsSection />
      <StatisticsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
