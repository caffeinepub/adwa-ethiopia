import { useEffect, useRef, useState } from "react";
import AmharicNarration from "../components/AmharicNarration";

const facts = [
  {
    label: "Year of Victory",
    value: 1896,
    suffix: "",
    display: "1896",
    accent: "#FCDD09",
  },
  {
    label: "Ethiopian Forces",
    value: 100,
    suffix: ",000+",
    display: "100,000+",
    accent: "#078930",
  },
  {
    label: "Italian Casualties",
    value: 6,
    suffix: ",000+",
    display: "6,000+",
    accent: "#DA121A",
  },
  {
    label: "Result",
    value: null,
    suffix: "",
    display: "Decisive Victory",
    accent: "#FCDD09",
  },
];

function CounterCard({
  fact,
  index,
}: {
  fact: (typeof facts)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || fact.value === null) return;
    let start = 0;
    const end = fact.value;
    const duration = 1800;
    const step = Math.ceil(duration / end);
    const timer = setInterval(() => {
      start += Math.max(1, Math.floor(end / 60));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, step);
    return () => clearInterval(timer);
  }, [visible, fact.value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-8 text-center"
      style={{
        background: "oklch(0.17 0.01 250)",
        border: `1px solid ${fact.accent}33`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.15}s`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px ${fact.accent}66`;
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 24px rgba(0,0,0,0.4)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Top accent line */}
      <div
        className="mx-auto mb-6 rounded-full"
        style={{ height: 3, width: 48, background: fact.accent }}
      />

      {/* Number */}
      <div
        className="font-display font-bold mb-3"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          color: fact.accent,
          textShadow: `0 0 30px ${fact.accent}55`,
          lineHeight: 1,
        }}
      >
        {fact.value !== null
          ? fact.value <= 10
            ? `${count}${fact.suffix}`
            : `${count.toLocaleString()}${fact.suffix}`
          : fact.display}
      </div>

      {/* Label */}
      <p
        className="text-sm font-semibold tracking-wider uppercase mt-4"
        style={{ color: "oklch(0.65 0.02 90)", letterSpacing: "0.12em" }}
      >
        {fact.label}
      </p>
    </div>
  );
}

export default function FactsSection() {
  return (
    <div
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.01 250) 0%, oklch(0.10 0.01 250) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="flex justify-center gap-0 mb-6 mx-auto rounded-full overflow-hidden"
            style={{ width: 72, height: 6 }}
          >
            <div style={{ flex: 1, background: "#078930" }} />
            <div style={{ flex: 1, background: "#FCDD09" }} />
            <div style={{ flex: 1, background: "#DA121A" }} />
          </div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "#FCDD09", letterSpacing: "0.2em" }}
          >
            By the Numbers
          </p>
          <h2
            className="font-display text-5xl md:text-6xl font-bold mb-6"
            style={{
              color: "oklch(0.96 0.01 90)",
              textShadow: "0 2px 20px rgba(252,181,20,0.15)",
            }}
          >
            The Battle in Facts
          </h2>
        </div>

        {/* Counters grid */}
        {/* BATTLE Narration */}
        <AmharicNarration
          lines={[
            "የካቲት 23 1888 ዓ.ም",
            "ጦርነት ጀመረ።",
            "ሰይፍ ከሰይፍ ተገናኘ።",
            "እነሱ ለነጻነት ተዋጉ።",
          ]}
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <CounterCard key={fact.label} fact={fact} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
