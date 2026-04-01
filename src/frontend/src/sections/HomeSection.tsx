import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

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
  const ref = useScrollAnimation();

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex((p) => (p + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + quotes.length) % quotes.length);
  };

  return (
    <div
      ref={ref}
      className="fade-in-up max-w-2xl mx-auto mt-12 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(252,221,9,0.25)",
      }}
    >
      <div
        className="px-6 pt-5 pb-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "#FCDD09" }}
        >
          💬 Adwa Inspirational Quotes
        </p>
      </div>
      <div className="relative px-6 pt-5 pb-4" style={{ minHeight: 110 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-bold text-lg text-white leading-snug">
              &ldquo;{quotes[index].en}&rdquo;
            </p>
            <p
              className="text-sm mt-2 italic"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              {quotes[index].am}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between px-4 pb-5">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="rounded-full p-2"
          style={{ background: "rgba(255,255,255,0.1)" }}
          aria-label="Previous"
        >
          <ChevronLeft size={16} color="#FCDD09" />
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center flex-1 px-2">
          {quotes.map((q, i) => (
            <button
              type="button"
              key={q.en}
              onClick={() => goTo(i)}
              aria-label={`Quote ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === index ? 16 : 6,
                height: 6,
                background: i === index ? "#FCDD09" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="rounded-full p-2"
          style={{ background: "rgba(255,255,255,0.1)" }}
          aria-label="Next"
        >
          <ChevronRight size={16} color="#FCDD09" />
        </button>
      </div>
    </div>
  );
}

export default function HomeSection() {
  const statsRef = useScrollAnimation();

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center"
      style={{ paddingTop: "72px" }}
    >
      {/* Background */}
      <img
        src="/assets/generated/battle-adwa.dim_800x400.jpg"
        alt="Battle of Adwa"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,30,10,0.75) 0%, rgba(10,20,10,0.85) 60%, rgba(10,30,10,0.95) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 py-20 w-full max-w-4xl mx-auto">
        {/* Flag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <svg
            role="img"
            aria-label="Ethiopian Flag"
            width="72"
            height="48"
            viewBox="0 0 54 36"
            xmlns="http://www.w3.org/2000/svg"
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-widest uppercase text-white mb-4"
        >
          Adwa Ethiopia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl mb-3"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Battle of Adwa, 1896 — Ethiopia&apos;s Victory
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-sm md:text-base max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          The first African nation to defeat a European colonial power and
          preserve its sovereignty
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 mx-auto"
          style={{ height: "3px", maxWidth: "80px", background: "#FCDD09" }}
        />

        {/* Stats */}
        <div
          ref={statsRef}
          className="fade-in-up mt-10 grid grid-cols-3 gap-4 max-w-sm mx-auto"
        >
          {[
            { label: "Year", value: "1896" },
            { label: "Date", value: "Mar 1" },
            { label: "Victory", value: "Ethiopia" },
          ].map((f) => (
            <div key={f.label} className="text-center">
              <p className="font-bold text-2xl text-white">{f.value}</p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {f.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quotes */}
        <QuotesCarousel />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex justify-center"
        >
          <a href="#learn" className="animate-bounce" aria-label="Scroll down">
            <ChevronDown size={28} color="rgba(255,255,255,0.4)" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
