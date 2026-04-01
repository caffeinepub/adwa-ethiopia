import { useEffect, useRef, useState } from "react";
import AmharicNarration from "../components/AmharicNarration";

const steps = [
  {
    icon: "📜",
    year: "1889",
    title: "Treaty of Wuchale",
    desc: "Italy misinterpreted the treaty to claim a protectorate over Ethiopia, sparking a diplomatic crisis that would lead to war.",
    accent: "#078930",
    side: "left",
  },
  {
    icon: "⚔️",
    year: "1895",
    title: "Preparation for War",
    desc: "Menelik II unified Ethiopian forces, amassed 100,000 troops and modern weapons, rallying the entire nation for defense.",
    accent: "#FCDD09",
    side: "right",
  },
  {
    icon: "🔥",
    year: "March 1, 1896",
    title: "The Battle of Adwa",
    desc: "Ethiopian forces surrounded and destroyed the Italian army at Adwa in a decisive engagement lasting just one day.",
    accent: "#DA121A",
    side: "left",
  },
  {
    icon: "🏆",
    year: "1896",
    title: "Ethiopian Victory",
    desc: "Italy was decisively defeated. Over 6,000 Italian soldiers were killed or wounded — an unprecedented African victory.",
    accent: "#078930",
    side: "right",
  },
  {
    icon: "🌍",
    year: "Legacy",
    title: "Impact on Africa",
    desc: "Adwa inspired anti-colonial movements across Africa and the world, becoming a symbol of freedom and self-determination.",
    accent: "#FCDD09",
    side: "left",
  },
];

const CARD_SHADOW_DEFAULT = "0 4px 32px rgba(0,0,0,0.4)";
const TRANSFORM_DEFAULT = "translateX(0)";

function TimelineCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLeft = step.side === "left";

  return (
    <div
      className="relative flex items-center"
      style={{ marginBottom: "3rem" }}
    >
      {/* Left side content */}
      <div className="flex-1 flex justify-end pr-10 md:pr-12">
        {isLeft && (
          <div
            ref={ref}
            className="max-w-sm w-full rounded-2xl p-6"
            style={{
              background: "oklch(0.17 0.01 250)",
              border: `1px solid ${step.accent}44`,
              boxShadow: CARD_SHADOW_DEFAULT,
              opacity: visible ? 1 : 0,
              transform: visible ? TRANSFORM_DEFAULT : "translateX(-50px)",
              transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px ${step.accent}66`;
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateX(-4px) translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                CARD_SHADOW_DEFAULT;
              (e.currentTarget as HTMLDivElement).style.transform =
                TRANSFORM_DEFAULT;
            }}
          >
            <TimelineCardContent step={step} />
          </div>
        )}
      </div>

      {/* Center node */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        style={{ width: 60 }}
      >
        <div
          className="flex items-center justify-center rounded-full text-2xl"
          style={{
            width: 56,
            height: 56,
            background: `${step.accent}22`,
            border: `3px solid ${step.accent}`,
            boxShadow: `0 0 20px ${step.accent}44`,
            transition: "box-shadow 0.3s",
          }}
        >
          {step.icon}
        </div>
      </div>

      {/* Right side content */}
      <div className="flex-1 pl-10 md:pl-12">
        {!isLeft && (
          <div
            ref={isLeft ? null : ref}
            className="max-w-sm w-full rounded-2xl p-6"
            style={{
              background: "oklch(0.17 0.01 250)",
              border: `1px solid ${step.accent}44`,
              boxShadow: CARD_SHADOW_DEFAULT,
              opacity: visible ? 1 : 0,
              transform: visible ? TRANSFORM_DEFAULT : "translateX(50px)",
              transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px ${step.accent}66`;
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateX(4px) translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                CARD_SHADOW_DEFAULT;
              (e.currentTarget as HTMLDivElement).style.transform =
                TRANSFORM_DEFAULT;
            }}
          >
            <TimelineCardContent step={step} />
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineCardContent({ step }: { step: (typeof steps)[0] }) {
  return (
    <>
      <span
        className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4 inline-block"
        style={{
          background: `${step.accent}22`,
          color: step.accent,
          border: `1px solid ${step.accent}55`,
        }}
      >
        {step.year}
      </span>
      <h3
        className="font-display text-xl md:text-2xl font-bold mb-3"
        style={{ color: "oklch(0.96 0.01 90)" }}
      >
        {step.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.65 0.02 90)" }}
      >
        {step.desc}
      </p>
      <div
        className="mt-4 rounded-full"
        style={{ height: 2, width: 40, background: step.accent }}
      />
    </>
  );
}

export default function TimelineSection() {
  return (
    <div
      id="timeline"
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.01 250) 0%, oklch(0.13 0.01 250) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
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
            The Road to Adwa
          </p>
          <h2
            className="font-display text-5xl md:text-6xl font-bold mb-6"
            style={{
              color: "oklch(0.96 0.01 90)",
              textShadow: "0 2px 20px rgba(252,181,20,0.15)",
            }}
          >
            Interactive Timeline
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.65 0.02 90)" }}
          >
            Follow the events that led to Africa&apos;s greatest victory, from
            diplomatic crisis to historic triumph.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{
              width: 2,
              background:
                "linear-gradient(to bottom, #078930, #FCDD09, #DA121A, #078930, #FCDD09)",
              opacity: 0.5,
            }}
          />
          {/* BEFORE WAR Narration */}
          <AmharicNarration
            lines={[
              "ከባሕር ማዶ፣",
              "ኢጣሊያ ኢትዮጵያን ለመቆጣጠር መጣች።",
              "በሽርሽር… በኃይል…",
              "ጥሪ ተደረገ።",
              "ሕዝቡም ተነሳ።",
            ]}
            className="mb-12"
          />
          {steps.map((step, i) => (
            <TimelineCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
