import { type ReactNode, createContext, useContext, useState } from "react";

type Lang = "en" | "am";

const translations = {
  en: {
    navHome: "Home",
    navTimeline: "Timeline",
    navHeroes: "Heroes",
    navFacts: "Facts",
    navMap: "Map",
    navWhyAdwa: "Why Adwa",
    navHistory: "History",
    navQuiz: "Quiz",
    navChat: "AI Chat",
    navGallery: "Gallery",
    navMusic: "Music",
    heroTitle: "Victory of Adwa",
    heroPride: "Africa's Pride",
    heroSubtitle: "March 1, 1896 – Ethiopia defeated colonial invasion",
    heroBtn: "Explore the Story",
    langToggle: "አማ",
  },
  am: {
    navHome: "መነሻ",
    navTimeline: "የጊዜ ሐሳብ",
    navHeroes: "ጀግኖች",
    navFacts: "እውነታዎች",
    navMap: "ካርታ",
    navWhyAdwa: "ለምን አድዋ",
    navHistory: "ታሪክ",
    navQuiz: "ጥያቄ",
    navChat: "AI ጭውውት",
    navGallery: "ጋለሪ",
    navMusic: "ሙዚቃ",
    heroTitle: "የአድዋ ድል",
    heroPride: "የአፍሪካ ኩራት",
    heroSubtitle: "የካቲት 23 1888 ዓ.ም – ኢትዮጵያ ቅኝ ገዥዎችን አሸነፈ",
    heroBtn: "ታሪኩን ሁ",
    langToggle: "EN",
  },
};

interface LanguageContextType {
  lang: Lang;
  t: (typeof translations)["en"];
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "am" : "en"));
  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
