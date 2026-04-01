import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  HelpCircle,
  Image,
  MessageCircle,
  MessageSquare,
  Music,
  Play,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Tab } from "../App";

interface HomeTabProps {
  onNavigate: (tab: Tab) => void;
}

const navCards = [
  {
    id: "learn" as Tab,
    label: "Learn",
    description: "Explore the history of the Battle of Adwa",
    icon: <BookOpen size={28} />,
    accentColor: "oklch(0.35 0.13 20)",
    accentLabel: "HISTORY",
  },
  {
    id: "quiz" as Tab,
    label: "Quiz",
    description: "Test your knowledge about Adwa",
    icon: <HelpCircle size={28} />,
    accentColor: "oklch(0.72 0.12 70)",
    accentLabel: "CHALLENGE",
  },
  {
    id: "chat" as Tab,
    label: "AI Chat",
    description: "Ask questions about the battle",
    icon: <MessageSquare size={28} />,
    accentColor: "oklch(0.45 0.12 155)",
    accentLabel: "EXPLORE",
  },
  {
    id: "gallery" as Tab,
    label: "Gallery",
    description: "View historical images and portraits",
    icon: <Image size={28} />,
    accentColor: "oklch(0.72 0.06 70)",
    accentLabel: "VISUALS",
  },
  {
    id: "history" as Tab,
    label: "History",
    description: "Before Adwa — the diplomatic conflict",
    icon: <Clock size={28} />,
    accentColor: "oklch(0.52 0.14 45)",
    accentLabel: "TIMELINE",
  },
  {
    id: "video" as Tab,
    label: "Documentary",
    description: "Watch Adwa documentaries",
    icon: <Play size={28} />,
    accentColor: "oklch(0.40 0.18 25)",
    accentLabel: "WATCH",
  },
  {
    id: "music" as Tab,
    label: "Music",
    description: "Patriotic songs celebrating Ethiopia",
    icon: <Music size={28} />,
    accentColor: "oklch(0.60 0.15 295)",
    accentLabel: "LISTEN",
  },
  {
    id: "donation" as Tab,
    label: "Donation",
    description: "Support cultural education efforts",
    icon: <Heart size={28} />,
    accentColor: "oklch(0.55 0.20 25)",
    accentLabel: "GIVE",
  },
  {
    id: "comments" as Tab,
    label: "Comments",
    description: "Share your experience with the app",
    icon: <MessageCircle size={28} />,
    accentColor: "oklch(0.50 0.14 240)",
    accentLabel: "FEEDBACK",
  },
  {
    id: "about" as Tab,
    label: "About",
    description: "About the developer, Helen Metekiya",
    icon: <User size={28} />,
    accentColor: "oklch(0.65 0.12 200)",
    accentLabel: "DEVELOPER",
  },
];

const quotes = [
  {
    en: "Victory at Adwa is the pride of Ethiopia 🇪🇹✨",
    am: "የአድዋ ድል የኢትዮጵያ ኩራት ነው 🇪🇹✨",
  },
  {
    en: "Adwa showed the world that freedom is possible 🌍",
    am: "አድዋ ነፃነት እንደሚቻል ለዓለም አሳየ",
  },
  {
    en: "Adwa proved that unity brings victory 🤝🏆",
    am: "አድዋ አንድነት ድል እንደሚያመጣ አሳየ 🤝🏆",
  },
  {
    en: "We are strong when we stand together 💪🇪🇹",
    am: "በአንድነት ስንቆም ጠንካራ ነን 💪🇪🇹",
  },
  {
    en: "Adwa is not just history, it is our identity ❤️🇪🇹",
    am: "አድዋ ታሪክ ብቻ አይደለም፣ ማንነታችን ነው ❤️🇪🇹",
  },
  {
    en: "Freedom is earned through courage and sacrifice 🕊️🔥",
    am: "ነፃነት በጀግንነትና በመስዋዕት ይገኛል 🕊️🔥",
  },
  { en: "Adwa inspired all Africa 🌍✨", am: "አድዋ ለአፍሪካ ሁሉ መነሳሳት ነበር 🌍✨" },
  {
    en: "Our heroes protected our independence 🛡️🇪🇹",
    am: "ጀግኖቻችን ነፃነታችንን ጠበቁ 🛡️🇪🇹",
  },
  {
    en: "Ethiopia stands strong forever 🇪🇹🔥",
    am: "ኢትዮጵያ ለዘላለም ጠንካራ ትቆማለች 🇪🇹🔥",
  },
  {
    en: "Pride in our history builds our future 🌱🇪🇹",
    am: "በታሪካችን መኩራት ወደፊታችንን ይገነባል 🌱🇪🇹",
  },
  {
    en: "Adwa is victory through unity and faith 🙏🏆",
    am: "አድዋ በአንድነትና በእምነት የተገኘ ድል ነው 🙏🏆",
  },
  {
    en: "A nation that remembers its heroes is strong 💫🇪🇹",
    am: "ጀግኖቹን የሚያስታውስ ሕዝብ ጠንካራ ነው 💫🇪🇹",
  },
  { en: "Our history gives us strength 💡", am: "ታሪካችን ኃይል ይሰጠናል" },
  {
    en: "The victory of Adwa inspires generations ✨",
    am: "የአድዋ ድል ትውልዶችን ያነሳሳል",
  },
  { en: "I am proud to be Ethiopian 🇪🇹❤️", am: "እኔ ኢትዮጵያዊ መሆኔን እመካለሁ 🇪🇹❤️" },
];

function QuotesCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + quotes.length) % quotes.length);
  };

  return (
    <div
      className="mx-4 mt-5 rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.20 0.04 45)",
        boxShadow: "0 4px 20px rgba(42,26,18,0.25)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 pt-4 pb-2"
        style={{ borderBottom: "1px solid oklch(0.28 0.04 45)" }}
      >
        <span className="text-base" aria-hidden="true">
          💬
        </span>
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "oklch(0.72 0.12 70)" }}
        >
          Adwa Inspirational Quotes
        </p>
      </div>

      {/* Quote body */}
      <div className="relative px-4 pt-4 pb-3" style={{ minHeight: 120 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <p
              className="font-bold text-base leading-snug"
              style={{ color: "oklch(0.93 0.015 80)" }}
            >
              &ldquo;{quotes[index].en}&rdquo;
            </p>
            <p
              className="text-sm mt-2 italic leading-relaxed"
              style={{ color: "oklch(0.70 0.015 80)" }}
            >
              {quotes[index].am}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-3 pb-4">
        {/* Prev */}
        <button
          type="button"
          data-ocid="quotes.pagination_prev"
          onClick={() => goTo(index - 1)}
          className="rounded-full p-1.5 transition-colors"
          style={{ background: "oklch(0.28 0.04 45)" }}
          aria-label="Previous quote"
        >
          <ChevronLeft size={16} style={{ color: "oklch(0.72 0.12 70)" }} />
        </button>

        {/* Dots */}
        <div className="flex gap-1.5 flex-wrap justify-center flex-1 px-2">
          {quotes.map((q, i) => (
            <button
              type="button"
              key={q.en}
              data-ocid={`quotes.item.${i + 1}`}
              onClick={() => goTo(i)}
              aria-label={`Quote ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === index ? 16 : 6,
                height: 6,
                background:
                  i === index ? "oklch(0.72 0.12 70)" : "oklch(0.35 0.04 45)",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          data-ocid="quotes.pagination_next"
          onClick={() => goTo(index + 1)}
          className="rounded-full p-1.5 transition-colors"
          style={{ background: "oklch(0.28 0.04 45)" }}
          aria-label="Next quote"
        >
          <ChevronRight size={16} style={{ color: "oklch(0.72 0.12 70)" }} />
        </button>
      </div>

      {/* Quote count */}
      <p
        className="text-center text-[10px] pb-3"
        style={{ color: "oklch(0.45 0.02 80)" }}
      >
        {index + 1} / {quotes.length}
      </p>
    </div>
  );
}

export default function HomeTab({ onNavigate }: HomeTabProps) {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-52 overflow-hidden">
        <img
          src="/assets/generated/battle-adwa.dim_800x400.jpg"
          alt="Battle of Adwa"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,16,8,0.45), rgba(30,16,8,0.75))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="mb-2"
          >
            <svg
              width="54"
              height="36"
              viewBox="0 0 54 36"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Ethiopian Flag with Star"
              style={{
                borderRadius: "3px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              <rect width="54" height="12" y="0" fill="#078930" />
              <rect width="54" height="12" y="12" fill="#FCDD09" />
              <rect width="54" height="12" y="24" fill="#DA121A" />
              <circle cx="27" cy="18" r="10" fill="#0F47AF" />
              <polygon
                points="27,9 28.8,14.5 34.5,14.5 29.9,17.9 31.6,23.4 27,20 22.4,23.4 24.1,17.9 19.5,14.5 25.2,14.5"
                fill="#FCDD09"
              />
            </svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-xl font-bold tracking-widest uppercase text-white"
          >
            ADWA ETHIOPIA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm mt-1 font-body"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            Battle of Adwa 1896 — Ethiopia&apos;s Victory
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 h-0.5 w-24 rounded-full"
            style={{ background: "oklch(0.72 0.12 70)" }}
          />
        </div>
      </div>

      {/* Nav Cards Grid */}
      <div className="p-4">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "oklch(0.50 0.02 80)" }}
        >
          Explore
        </p>
        <div className="grid grid-cols-2 gap-3">
          {navCards.map((card, i) => (
            <motion.button
              key={card.id}
              data-ocid={`home.${card.id}.button`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => onNavigate(card.id)}
              className="bg-white rounded-xl overflow-hidden text-left transition-transform active:scale-95"
              style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
            >
              <div
                className="h-1.5 w-full"
                style={{ background: card.accentColor }}
              />
              <div className="p-4">
                <div className="mb-2" style={{ color: card.accentColor }}>
                  {card.icon}
                </div>
                <h3
                  className="font-bold text-sm"
                  style={{ color: "oklch(0.22 0 0)" }}
                >
                  {card.label}
                </h3>
                <p
                  className="text-xs mt-0.5 leading-snug"
                  style={{ color: "oklch(0.50 0.02 80)" }}
                >
                  {card.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div
        className="mx-4 mt-1 rounded-xl p-4"
        style={{
          background: "oklch(0.20 0.04 45)",
          boxShadow: "0 2px 12px rgba(42,26,18,0.15)",
        }}
      >
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "oklch(0.72 0.12 70)" }}
        >
          Key Facts
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Year", value: "1896" },
            { label: "Date", value: "Mar 1" },
            { label: "Victory", value: "Ethiopia" },
          ].map((fact) => (
            <div key={fact.label} className="text-center">
              <p
                className="font-bold text-base"
                style={{ color: "oklch(0.90 0.015 80)" }}
              >
                {fact.value}
              </p>
              <p className="text-xs" style={{ color: "oklch(0.65 0.015 80)" }}>
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Inspirational Quotes Carousel */}
      <QuotesCarousel />

      {/* Footer */}
      <footer className="text-center py-6 px-4">
        <p className="text-xs" style={{ color: "oklch(0.50 0.02 80)" }}>
          © 2026 by Helen Metekiya
        </p>
      </footer>
    </div>
  );
}
