import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AmharicNarration from "../components/AmharicNarration";
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

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }[] = [];

    const colors = ["rgba(252,221,9,", "rgba(255,255,255,", "rgba(255,200,50,"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init 60 particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.2),
        radius: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.0015;

        if (p.y < 0 || p.alpha <= 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.alpha = Math.random() * 0.5 + 0.1;
          p.vy = -(Math.random() * 0.5 + 0.2);
          p.vx = (Math.random() - 0.5) * 0.4;
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

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
          data-ocid="quotes.pagination_prev"
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
          data-ocid="quotes.pagination_next"
        >
          <ChevronRight size={16} color="#FCDD09" />
        </button>
      </div>
    </div>
  );
}

export default function HomeSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col justify-center items-center overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "72px" }}
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.45}px)`,
          willChange: "transform",
        }}
      >
        <img
          src="/assets/generated/battle-adwa.dim_800x400.jpg"
          alt="Battle of Adwa"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.15)", transformOrigin: "center center" }}
        />
      </div>

      {/* Dark dramatic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,15,5,0.78) 0%, rgba(5,20,5,0.82) 50%, rgba(5,20,5,0.96) 100%)",
          zIndex: 1,
        }}
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 py-20 w-full max-w-5xl mx-auto">
        {/* Ethiopian flag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex justify-center"
        >
          <svg
            role="img"
            aria-label="Ethiopian Flag"
            width="80"
            height="54"
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

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
          style={{
            color: "#fff",
            textShadow:
              "0 0 60px rgba(252,221,9,0.4), 0 4px 40px rgba(0,0,0,0.8)",
            letterSpacing: "-0.01em",
          }}
        >
          Victory of Adwa
          <span
            className="block text-3xl md:text-4xl lg:text-5xl mt-2"
            style={{
              color: "#FCDD09",
              textShadow: "0 0 40px rgba(252,221,9,0.5)",
            }}
          >
            Africa&apos;s Pride
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl mb-10 tracking-wide"
          style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}
        >
          March 1, 1896 – Ethiopia defeated colonial invasion
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="#timeline"
            data-ocid="hero.primary_button"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-400"
            style={{
              border: "2px solid #FCDD09",
              color: "#FCDD09",
              background: "transparent",
              letterSpacing: "0.15em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#FCDD09";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 40px rgba(252,221,9,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#FCDD09";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <span>Explore the Story</span>
            <ChevronDown
              size={16}
              className="group-hover:translate-y-1 transition-transform"
            />
          </a>
        </motion.div>

        {/* OPENING Narration */}
        <AmharicNarration
          lines={[
            "1896…",
            "አፍሪካ በመከፋፈል ዘመን፣",
            "አንድ ሀገር ቆመች።",
            "ኢትዮጵያ… አልተንቀሳቀሰችም።",
            "ይህ ታሪክ ብቻ አይደለም።",
            "ይህ… አድዋ ነው።",
          ]}
          className="mt-10"
        />

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-12 mx-auto"
          style={{
            height: "2px",
            maxWidth: "100px",
            background:
              "linear-gradient(90deg, transparent, #FCDD09, transparent)",
          }}
        />

        {/* Quotes carousel */}
        <QuotesCarousel />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#timeline"
            aria-label="Scroll down"
            className="animate-bounce"
          >
            <ChevronDown size={28} color="rgba(255,255,255,0.35)" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
