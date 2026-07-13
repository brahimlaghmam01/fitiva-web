"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.features": "Features",
    "nav.gamification": "Gamification",
    "nav.aiCoach": "AI Coach",
    "nav.reviews": "Reviews",
    "nav.download": "Download",
    "nav.downloadApp": "Download App",
    
    // Hero
    "hero.badge": "AI-Powered Fitness Platform",
    "hero.title": "Turn Fitness Into a",
    "hero.titleHighlight": "Social Game",
    "hero.subtitle": "Track workouts, compete with friends, earn rewards and stay motivated using AI-powered coaching.",
    "hero.downloadApp": "Download App",
    "hero.joinBeta": "Join the Beta",
    "hero.activeUsers": "50,000+ active users",
    "hero.joinCommunity": "Join the community",
    "hero.pointsEarned": "Points Earned",
    "hero.justNow": "Just now",
    "hero.newBadge": "New Badge!",
    "hero.earlyBird": "Early Bird",
    "hero.getOnAppStore": "Download on the",
    "hero.appStore": "App Store",
    "hero.getOnGooglePlay": "GET IT ON",
    "hero.googlePlay": "Google Play",
    
    // Social Features
    "social.badge": "Social Features",
    "social.title": "Connect with fitness",
    "social.titleHighlight": "enthusiasts",
    "social.subtitle": "Build meaningful connections with people who share your fitness goals and motivate each other.",
    "social.findPartners": "Find Workout Partners",
    "social.findPartnersDesc": "Connect with people in your area who share your fitness interests.",
    "social.groupChallenges": "Group Challenges",
    "social.groupChallengesDesc": "Compete together, win together. Join team challenges.",
    "social.liveActivity": "Live Activity Feed",
    "social.liveActivityDesc": "See what your friends are achieving in real-time.",
    "social.communityChat": "Community Chat",
    "social.communityChatDesc": "Share tips, motivation, and celebrate wins together.",
    
    // Gamification
    "game.badge": "Gamification",
    "game.title": "Make fitness",
    "game.titleHighlight": "fun and rewarding",
    "game.subtitle": "Earn points, unlock achievements, and compete on leaderboards to stay motivated.",
    "game.totalPoints": "Total Points",
    "game.currentStreak": "Current Streak",
    "game.days": "Days",
    "game.achievements": "Achievements",
    "game.firstWorkout": "First Workout",
    "game.weekWarrior": "Week Warrior",
    "game.speedster": "Speedster",
    "game.socialButterfly": "Social Butterfly",
    "game.earlyBird": "Early Bird",
    "game.nightOwl": "Night Owl",
    "game.leaderboard": "Leaderboard",
    "game.thisWeek": "This Week",
    "game.pts": "pts",
    
    // AI Coach
    "ai.badge": "AI Coach",
    "ai.title": "Your personal",
    "ai.titleHighlight": "AI fitness coach",
    "ai.subtitle": "Get personalized workout plans, real-time form corrections, and adaptive training that evolves with you.",
    "ai.smartPlans": "Smart Workout Plans",
    "ai.smartPlansDesc": "AI creates personalized routines based on your goals, fitness level, and available equipment.",
    "ai.adaptiveTraining": "Adaptive Training",
    "ai.adaptiveTrainingDesc": "Your plan evolves as you progress, ensuring continuous improvement.",
    "ai.nutritionGuidance": "Nutrition Guidance",
    "ai.nutritionGuidanceDesc": "Get meal suggestions that complement your workout routine.",
    "ai.greeting": "Good morning! Ready for your workout?",
    "ai.suggestion": "Based on your progress, I suggest focusing on upper body today.",
    "ai.startWorkout": "Start Workout",
    
    // App Preview
    "preview.badge": "App Preview",
    "preview.title": "Beautiful design,",
    "preview.titleHighlight": "powerful features",
    "preview.subtitle": "Experience a fitness app that's as enjoyable to use as it is effective.",
    "preview.splash": "Splash Screen",
    "preview.community": "Community",
    "preview.createActivity": "Create Activity",
    "preview.myProgram": "My Program",
    "preview.findActivities": "Find Activities",
    "preview.profile": "Profile",
    "preview.aiProgram": "AI Program",
    "preview.findPlaces": "Find Places",
    "preview.map": "Map",
    "preview.messages": "Messages",
    "preview.notifications": "Notifications",
    "preview.weeklyProgress": "Weekly Progress",
    
    // Testimonials
    "testimonials.badge": "Testimonials",
    "testimonials.title": "Loved by",
    "testimonials.titleHighlight": "fitness enthusiasts",
    "testimonials.subtitle": "See what our community members have to say about their Fitiva experience.",
    
    // Stats
    "stats.badge": "Our Impact",
    "stats.title": "Growing",
    "stats.titleHighlight": "community",
    "stats.subtitle": "Join thousands of fitness enthusiasts who are transforming their lives with Fitiva.",
    "stats.activeUsers": "Active Users",
    "stats.workoutsCompleted": "Workouts Completed",
    "stats.countriesReached": "Countries Reached",
    "stats.appRating": "App Rating",
    
    // CTA
    "cta.title": "Ready to transform your",
    "cta.titleHighlight": "fitness journey?",
    "cta.subtitle": "Join thousands of users who are already achieving their goals with Fitiva.",
    "cta.downloadNow": "Download Now - It's Free",
    "cta.noCredit": "No credit card required",
    "cta.freeForever": "Free forever plan available",
    "cta.cancelAnytime": "Cancel premium anytime",
    
    // Footer
    "footer.description": "Transform your fitness journey with AI-powered workouts, social challenges, and personalized coaching.",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.download": "Download",
    "footer.updates": "Updates",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.careers": "Careers",
    "footer.press": "Press",
    "footer.contact": "Contact",
    "footer.resources": "Resources",
    "footer.blog": "Blog",
    "footer.help": "Help Center",
    "footer.community": "Community",
    "footer.developers": "Developers",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.cookies": "Cookies",
  },
  fr: {
    // Navbar
    "nav.features": "Fonctionnalites",
    "nav.gamification": "Gamification",
    "nav.aiCoach": "Coach IA",
    "nav.reviews": "Avis",
    "nav.download": "Telecharger",
    "nav.downloadApp": "Telecharger l'App",
    
    // Hero
    "hero.badge": "Plateforme Fitness Propulsee par l'IA",
    "hero.title": "Transformez le Fitness en",
    "hero.titleHighlight": "Jeu Social",
    "hero.subtitle": "Suivez vos entrainements, affrontez vos amis, gagnez des recompenses et restez motive avec un coaching IA.",
    "hero.downloadApp": "Telecharger l'App",
    "hero.joinBeta": "Rejoindre la Beta",
    "hero.activeUsers": "50 000+ utilisateurs actifs",
    "hero.joinCommunity": "Rejoignez la communaute",
    "hero.pointsEarned": "Points Gagnes",
    "hero.justNow": "A l'instant",
    "hero.newBadge": "Nouveau Badge!",
    "hero.earlyBird": "Leve-Tot",
    "hero.getOnAppStore": "Telecharger sur",
    "hero.appStore": "App Store",
    "hero.getOnGooglePlay": "DISPONIBLE SUR",
    "hero.googlePlay": "Google Play",
    
    // Social Features
    "social.badge": "Fonctionnalites Sociales",
    "social.title": "Connectez-vous avec des",
    "social.titleHighlight": "passionnes de fitness",
    "social.subtitle": "Creez des liens significatifs avec des personnes partageant vos objectifs fitness.",
    "social.findPartners": "Trouvez des Partenaires",
    "social.findPartnersDesc": "Connectez-vous avec des personnes pres de chez vous.",
    "social.groupChallenges": "Defis de Groupe",
    "social.groupChallengesDesc": "Competez ensemble, gagnez ensemble.",
    "social.liveActivity": "Fil d'Activite en Direct",
    "social.liveActivityDesc": "Voyez les reussites de vos amis en temps reel.",
    "social.communityChat": "Chat Communautaire",
    "social.communityChatDesc": "Partagez conseils, motivation et celebrez ensemble.",
    
    // Gamification
    "game.badge": "Gamification",
    "game.title": "Rendez le fitness",
    "game.titleHighlight": "amusant et gratifiant",
    "game.subtitle": "Gagnez des points, debloquez des succes et competez dans les classements.",
    "game.totalPoints": "Points Totaux",
    "game.currentStreak": "Serie Actuelle",
    "game.days": "Jours",
    "game.achievements": "Succes",
    "game.firstWorkout": "Premier Entrainement",
    "game.weekWarrior": "Guerrier de la Semaine",
    "game.speedster": "Velociste",
    "game.socialButterfly": "Papillon Social",
    "game.earlyBird": "Leve-Tot",
    "game.nightOwl": "Noctambule",
    "game.leaderboard": "Classement",
    "game.thisWeek": "Cette Semaine",
    "game.pts": "pts",
    
    // AI Coach
    "ai.badge": "Coach IA",
    "ai.title": "Votre coach fitness",
    "ai.titleHighlight": "personnel IA",
    "ai.subtitle": "Obtenez des plans d'entrainement personnalises et un coaching adaptatif qui evolue avec vous.",
    "ai.smartPlans": "Plans Intelligents",
    "ai.smartPlansDesc": "L'IA cree des routines personnalisees selon vos objectifs et niveau.",
    "ai.adaptiveTraining": "Entrainement Adaptatif",
    "ai.adaptiveTrainingDesc": "Votre plan evolue avec vos progres.",
    "ai.nutritionGuidance": "Guide Nutritionnel",
    "ai.nutritionGuidanceDesc": "Suggestions de repas complementant vos entrainements.",
    "ai.greeting": "Bonjour! Pret pour votre entrainement?",
    "ai.suggestion": "Selon vos progres, je suggere de travailler le haut du corps aujourd'hui.",
    "ai.startWorkout": "Commencer",
    
    // App Preview
    "preview.badge": "Apercu de l'App",
    "preview.title": "Design elegant,",
    "preview.titleHighlight": "fonctionnalites puissantes",
    "preview.subtitle": "Decouvrez une app fitness aussi agreable a utiliser qu'efficace.",
    "preview.splash": "Ecran d'Accueil",
    "preview.community": "Communaute",
    "preview.createActivity": "Creer une Activite",
    "preview.myProgram": "Mon Programme",
    "preview.findActivities": "Trouver des Activites",
    "preview.profile": "Profil",
    "preview.aiProgram": "Programme IA",
    "preview.findPlaces": "Trouver des Lieux",
    "preview.map": "Carte",
    "preview.messages": "Messages",
    "preview.notifications": "Notifications",
    "preview.weeklyProgress": "Progres Hebdo",
    
    // Testimonials
    "testimonials.badge": "Temoignages",
    "testimonials.title": "Adore par les",
    "testimonials.titleHighlight": "passionnes de fitness",
    "testimonials.subtitle": "Decouvrez ce que notre communaute dit de son experience Fitiva.",
    
    // Stats
    "stats.badge": "Notre Impact",
    "stats.title": "Communaute en",
    "stats.titleHighlight": "croissance",
    "stats.subtitle": "Rejoignez des milliers de passionnes qui transforment leur vie avec Fitiva.",
    "stats.activeUsers": "Utilisateurs Actifs",
    "stats.workoutsCompleted": "Entrainements Termines",
    "stats.countriesReached": "Pays Atteints",
    "stats.appRating": "Note de l'App",
    
    // CTA
    "cta.title": "Pret a transformer votre",
    "cta.titleHighlight": "parcours fitness?",
    "cta.subtitle": "Rejoignez des milliers d'utilisateurs qui atteignent deja leurs objectifs avec Fitiva.",
    "cta.downloadNow": "Telecharger - C'est Gratuit",
    "cta.noCredit": "Aucune carte bancaire requise",
    "cta.freeForever": "Plan gratuit pour toujours",
    "cta.cancelAnytime": "Annulez le premium a tout moment",
    
    // Footer
    "footer.description": "Transformez votre parcours fitness avec des entrainements IA, des defis sociaux et un coaching personnalise.",
    "footer.product": "Produit",
    "footer.features": "Fonctionnalites",
    "footer.pricing": "Tarifs",
    "footer.download": "Telecharger",
    "footer.updates": "Mises a jour",
    "footer.company": "Entreprise",
    "footer.about": "A propos",
    "footer.careers": "Carrieres",
    "footer.press": "Presse",
    "footer.contact": "Contact",
    "footer.resources": "Ressources",
    "footer.blog": "Blog",
    "footer.help": "Centre d'aide",
    "footer.community": "Communaute",
    "footer.developers": "Developpeurs",
    "footer.rights": "Tous droits reserves.",
    "footer.privacy": "Confidentialite",
    "footer.terms": "Conditions",
    "footer.cookies": "Cookies",
  },
  ar: {
    // Navbar
    "nav.features": "المميزات",
    "nav.gamification": "اللعب",
    "nav.aiCoach": "مدرب الذكاء الاصطناعي",
    "nav.reviews": "التقييمات",
    "nav.download": "تحميل",
    "nav.downloadApp": "تحميل التطبيق",
    
    // Hero
    "hero.badge": "منصة لياقة بالذكاء الاصطناعي",
    "hero.title": "حول اللياقة الى",
    "hero.titleHighlight": "لعبة اجتماعية",
    "hero.subtitle": "تتبع تمارينك، تنافس مع اصدقائك، اكسب المكافات وابق متحمسا مع التدريب بالذكاء الاصطناعي.",
    "hero.downloadApp": "تحميل التطبيق",
    "hero.joinBeta": "انضم للنسخة التجريبية",
    "hero.activeUsers": "+50,000 مستخدم نشط",
    "hero.joinCommunity": "انضم للمجتمع",
    "hero.pointsEarned": "نقاط مكتسبة",
    "hero.justNow": "الان",
    "hero.newBadge": "شارة جديدة!",
    "hero.earlyBird": "الطائر المبكر",
    "hero.getOnAppStore": "حمل من",
    "hero.appStore": "اب ستور",
    "hero.getOnGooglePlay": "احصل عليه من",
    "hero.googlePlay": "جوجل بلاي",
    
    // Social Features
    "social.badge": "المميزات الاجتماعية",
    "social.title": "تواصل مع",
    "social.titleHighlight": "عشاق اللياقة",
    "social.subtitle": "ابن علاقات هادفة مع اشخاص يشاركونك اهداف اللياقة ويحفزون بعضهم البعض.",
    "social.findPartners": "ابحث عن شركاء تمرين",
    "social.findPartnersDesc": "تواصل مع اشخاص في منطقتك يشاركونك اهتمامات اللياقة.",
    "social.groupChallenges": "تحديات جماعية",
    "social.groupChallengesDesc": "تنافسوا معا، انتصروا معا.",
    "social.liveActivity": "بث النشاط المباشر",
    "social.liveActivityDesc": "شاهد انجازات اصدقائك في الوقت الفعلي.",
    "social.communityChat": "دردشة المجتمع",
    "social.communityChatDesc": "شارك النصائح والتحفيز واحتفل بالانتصارات معا.",
    
    // Gamification
    "game.badge": "اللعب",
    "game.title": "اجعل اللياقة",
    "game.titleHighlight": "ممتعة ومجزية",
    "game.subtitle": "اكسب النقاط، افتح الانجازات، وتنافس في لوحات المتصدرين للبقاء متحمسا.",
    "game.totalPoints": "اجمالي النقاط",
    "game.currentStreak": "السلسلة الحالية",
    "game.days": "ايام",
    "game.achievements": "الانجازات",
    "game.firstWorkout": "اول تمرين",
    "game.weekWarrior": "محارب الاسبوع",
    "game.speedster": "السريع",
    "game.socialButterfly": "الفراشة الاجتماعية",
    "game.earlyBird": "الطائر المبكر",
    "game.nightOwl": "بومة الليل",
    "game.leaderboard": "لوحة المتصدرين",
    "game.thisWeek": "هذا الاسبوع",
    "game.pts": "نقطة",
    
    // AI Coach
    "ai.badge": "مدرب الذكاء الاصطناعي",
    "ai.title": "مدربك الشخصي",
    "ai.titleHighlight": "بالذكاء الاصطناعي",
    "ai.subtitle": "احصل على خطط تمرين مخصصة وتدريب تكيفي يتطور معك.",
    "ai.smartPlans": "خطط تمرين ذكية",
    "ai.smartPlansDesc": "الذكاء الاصطناعي ينشئ روتينات مخصصة بناء على اهدافك ومستوى لياقتك.",
    "ai.adaptiveTraining": "تدريب تكيفي",
    "ai.adaptiveTrainingDesc": "خطتك تتطور مع تقدمك.",
    "ai.nutritionGuidance": "ارشادات غذائية",
    "ai.nutritionGuidanceDesc": "اقتراحات وجبات تكمل روتين تمرينك.",
    "ai.greeting": "صباح الخير! مستعد لتمرينك؟",
    "ai.suggestion": "بناء على تقدمك، اقترح التركيز على الجزء العلوي اليوم.",
    "ai.startWorkout": "ابدا التمرين",
    
    // App Preview
    "preview.badge": "معاينة التطبيق",
    "preview.title": "تصميم جميل،",
    "preview.titleHighlight": "مميزات قوية",
    "preview.subtitle": "جرب تطبيق لياقة ممتع الاستخدام وفعال.",
    "preview.splash": "شاشة البداية",
    "preview.community": "المجتمع",
    "preview.createActivity": "انشاء نشاط",
    "preview.myProgram": "برنامجي",
    "preview.findActivities": "البحث عن انشطة",
    "preview.profile": "الملف الشخصي",
    "preview.aiProgram": "برنامج الذكاء الاصطناعي",
    "preview.findPlaces": "البحث عن اماكن",
    "preview.map": "الخريطة",
    "preview.messages": "الرسائل",
    "preview.notifications": "الاشعارات",
    "preview.weeklyProgress": "التقدم الاسبوعي",
    
    // Testimonials
    "testimonials.badge": "الشهادات",
    "testimonials.title": "محبوب من",
    "testimonials.titleHighlight": "عشاق اللياقة",
    "testimonials.subtitle": "شاهد ما يقوله اعضاء مجتمعنا عن تجربتهم مع فيتيفا.",
    
    // Stats
    "stats.badge": "تاثيرنا",
    "stats.title": "مجتمع",
    "stats.titleHighlight": "متنامي",
    "stats.subtitle": "انضم لالاف عشاق اللياقة الذين يحولون حياتهم مع فيتيفا.",
    "stats.activeUsers": "مستخدم نشط",
    "stats.workoutsCompleted": "تمرين مكتمل",
    "stats.countriesReached": "دولة",
    "stats.appRating": "تقييم التطبيق",
    
    // CTA
    "cta.title": "مستعد لتحويل",
    "cta.titleHighlight": "رحلة لياقتك؟",
    "cta.subtitle": "انضم لالاف المستخدمين الذين يحققون اهدافهم بالفعل مع فيتيفا.",
    "cta.downloadNow": "حمل الان - مجاني",
    "cta.noCredit": "لا حاجة لبطاقة ائتمان",
    "cta.freeForever": "خطة مجانية للابد",
    "cta.cancelAnytime": "الغ الاشتراك المميز في اي وقت",
    
    // Footer
    "footer.description": "حول رحلة لياقتك مع تمارين بالذكاء الاصطناعي وتحديات اجتماعية وتدريب مخصص.",
    "footer.product": "المنتج",
    "footer.features": "المميزات",
    "footer.pricing": "الاسعار",
    "footer.download": "تحميل",
    "footer.updates": "التحديثات",
    "footer.company": "الشركة",
    "footer.about": "من نحن",
    "footer.careers": "الوظائف",
    "footer.press": "الصحافة",
    "footer.contact": "اتصل بنا",
    "footer.resources": "الموارد",
    "footer.blog": "المدونة",
    "footer.help": "مركز المساعدة",
    "footer.community": "المجتمع",
    "footer.developers": "المطورون",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.privacy": "الخصوصية",
    "footer.terms": "الشروط",
    "footer.cookies": "ملفات تعريف الارتباط",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
