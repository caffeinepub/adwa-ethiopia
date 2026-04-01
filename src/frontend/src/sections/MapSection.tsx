import { useEffect, useRef, useState } from "react";

export default function MapSection() {
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

  return (
    <div
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.01 250) 0%, oklch(0.13 0.01 250) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
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
            Geography of Victory
          </p>
          <h2
            className="font-display text-5xl md:text-6xl font-bold mb-6"
            style={{
              color: "oklch(0.96 0.01 90)",
              textShadow: "0 2px 20px rgba(252,181,20,0.15)",
            }}
          >
            Battlefield Map
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.65 0.02 90)" }}
          >
            The battle took place near the ancient town of Adwa in northern
            Ethiopia, where Italian forces advanced and were decisively
            repelled.
          </p>
        </div>

        {/* Map container */}
        <div
          ref={ref}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "oklch(0.15 0.02 250)",
            border: "1px solid oklch(0.28 0.02 250)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="p-8 md:p-12">
            <svg
              viewBox="0 0 500 580"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-lg mx-auto block"
              role="img"
            >
              <title>Map of Ethiopia showing the Battle of Adwa location</title>
              {/* Ocean background hint */}
              <rect
                width="500"
                height="580"
                fill="oklch(0.12 0.015 230)"
                rx="16"
              />

              {/* Ethiopia shape (simplified) */}
              <path
                d="M 160 80
                   L 200 65
                   L 260 60
                   L 310 75
                   L 350 85
                   L 370 110
                   L 380 145
                   L 370 180
                   L 390 210
                   L 395 250
                   L 380 280
                   L 360 310
                   L 350 340
                   L 355 370
                   L 340 400
                   L 310 420
                   L 290 440
                   L 260 460
                   L 240 450
                   L 220 430
                   L 200 410
                   L 180 420
                   L 160 400
                   L 145 380
                   L 130 350
                   L 120 310
                   L 110 280
                   L 115 250
                   L 120 220
                   L 130 190
                   L 140 160
                   L 145 130
                   L 150 105
                   Z"
                fill="#0d3b1a"
                stroke="#078930"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 12px rgba(7,137,48,0.3))" }}
              />

              {/* Addis Ababa dot */}
              <circle cx="230" cy="310" r="6" fill="#FCDD09" opacity="0.9" />
              <text
                x="244"
                y="315"
                fill="#FCDD09"
                fontSize="12"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                Addis Ababa
              </text>

              {/* Adwa — pulsing red dot */}
              <circle cx="190" cy="130" r="14" fill="#DA121A" opacity="0.3">
                <animate
                  attributeName="r"
                  values="10;20;10"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.1;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="190" cy="130" r="7" fill="#DA121A" />
              <circle cx="190" cy="130" r="3" fill="#fff" />

              {/* Adwa label */}
              <text
                x="205"
                y="125"
                fill="#DA121A"
                fontSize="14"
                fontFamily="sans-serif"
                fontWeight="900"
              >
                ★ Adwa
              </text>
              <text
                x="205"
                y="141"
                fill="rgba(255,255,255,0.5)"
                fontSize="10"
                fontFamily="sans-serif"
              >
                Battle Site
              </text>

              {/* Italian advance arrows — from north */}
              <path
                d="M 190 30 L 190 105"
                stroke="#DA121A"
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
                opacity="0.8"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="100;0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              <polygon
                points="190,108 184,90 196,90"
                fill="#DA121A"
                opacity="0.8"
              />
              <text
                x="195"
                y="55"
                fill="#DA121A"
                fontSize="11"
                fontFamily="sans-serif"
                fontWeight="bold"
                opacity="0.9"
              >
                Italian Advance
              </text>

              {/* Ethiopian defense arrows from south */}
              <path
                d="M 190 240 L 190 160"
                stroke="#078930"
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
                opacity="0.8"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-100"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              <polygon
                points="190,155 184,175 196,175"
                fill="#078930"
                opacity="0.8"
              />
              <text
                x="196"
                y="210"
                fill="#078930"
                fontSize="11"
                fontFamily="sans-serif"
                fontWeight="bold"
                opacity="0.9"
              >
                Ethiopian Defense
              </text>

              {/* Red Sea label */}
              <text
                x="355"
                y="100"
                fill="rgba(255,255,255,0.3)"
                fontSize="11"
                fontFamily="sans-serif"
                fontStyle="italic"
              >
                Red Sea
              </text>

              {/* Legend */}
              <rect
                x="20"
                y="490"
                width="200"
                height="70"
                rx="8"
                fill="rgba(0,0,0,0.4)"
              />
              <circle cx="40" cy="510" r="6" fill="#DA121A" />
              <text
                x="55"
                y="515"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                Battle Site — Adwa
              </text>
              <circle cx="40" cy="530" r="5" fill="#FCDD09" />
              <text
                x="55"
                y="535"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                Capital — Addis Ababa
              </text>
              <line
                x1="30"
                y1="550"
                x2="50"
                y2="550"
                stroke="#DA121A"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <text
                x="55"
                y="554"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                Italian Advance
              </text>
            </svg>
          </div>

          {/* Info bar */}
          <div
            className="px-8 py-5 flex flex-col sm:flex-row gap-4 items-center justify-center"
            style={{
              background: "rgba(7,137,48,0.08)",
              borderTop: "1px solid oklch(0.28 0.02 250)",
            }}
          >
            {[
              {
                label: "Battle Location",
                value: "Adwa, Tigray",
                color: "#DA121A",
              },
              { label: "Elevation", value: "~2,100m", color: "#FCDD09" },
              { label: "Date", value: "March 1, 1896", color: "#078930" },
            ].map((info) => (
              <div key={info.label} className="text-center">
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "oklch(0.50 0.02 90)" }}
                >
                  {info.label}
                </p>
                <p
                  className="text-sm font-bold mt-1"
                  style={{ color: info.color }}
                >
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
