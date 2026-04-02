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
        fontFamily:
          "'Nyala', 'Ethiopic Halehame TI Er', 'Abyssinica SIL', serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Ethiopic:wght@400;600;700&display=swap');
        .eth-font { font-family: 'Noto Serif Ethiopic', 'Nyala', serif; }
      `}</style>

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
            className="eth-font text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "#FCDD09", letterSpacing: "0.2em" }}
          >
            የድልው ጦርነት ካርታ
          </p>
          <h2
            className="eth-font font-bold mb-4"
            style={{
              color: "oklch(0.96 0.01 90)",
              textShadow: "0 2px 20px rgba(252,181,20,0.15)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
            }}
          >
            አድዋ — የጦር ሜዳ ካርታ
          </h2>
          <p
            className="eth-font text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.65 0.02 90)" }}
          >
            የካቲት ፳፫ ቀን ፲፰፻፹፰ ዓ.ም — ኢትዮጵያ ጠላቷን ድል አደረገች
          </p>
        </div>

        {/* Battle Map SVG */}
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
          <div className="p-4 md:p-6">
            <svg
              viewBox="0 0 700 500"
              width="100%"
              style={{ display: "block", borderRadius: 12 }}
              role="img"
            >
              <title>Battle of Adwa Map</title>
              {/* Sky / terrain background */}
              <defs>
                <radialGradient id="terrainGrad" cx="50%" cy="60%" r="70%">
                  <stop offset="0%" stopColor="#3a2a0e" />
                  <stop offset="100%" stopColor="#1a1205" />
                </radialGradient>
                <radialGradient id="adwaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCDD09" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FCDD09" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Terrain */}
              <rect width="700" height="500" fill="url(#terrainGrad)" />

              {/* Mountain silhouettes */}
              <polygon
                points="0,320 80,200 160,280 240,180 320,260 400,160 480,240 560,150 640,220 700,180 700,500 0,500"
                fill="#2a1e08"
              />
              <polygon
                points="0,350 60,260 120,310 200,230 280,290 360,210 440,270 520,200 600,250 700,210 700,500 0,500"
                fill="#1e1504"
              />

              {/* River */}
              <path
                d="M 80 480 Q 180 420 260 390 Q 330 370 420 380 Q 500 395 600 370"
                stroke="#2a5a8a"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
                opacity="0.6"
              />
              <text
                x="200"
                y="410"
                fill="#4a8abf"
                fontSize="10"
                fontFamily="'Noto Serif Ethiopic',serif"
                opacity="0.7"
              >
                ወንዝ
              </text>

              {/* Roads/paths */}
              <path
                d="M 350 480 L 350 290"
                stroke="#6b5a30"
                strokeWidth="2"
                strokeDasharray="5,4"
                opacity="0.5"
              />
              <path
                d="M 100 480 Q 200 420 350 340"
                stroke="#6b5a30"
                strokeWidth="2"
                strokeDasharray="5,4"
                opacity="0.4"
              />
              <path
                d="M 600 480 Q 500 420 350 340"
                stroke="#6b5a30"
                strokeWidth="2"
                strokeDasharray="5,4"
                opacity="0.4"
              />

              {/* ADWA TOWN */}
              <circle cx="350" cy="290" r="32" fill="url(#adwaGlow)" />
              <circle
                cx="350"
                cy="290"
                r="14"
                fill="#FCDD09"
                opacity="0.9"
                filter="url(#glow)"
              />
              <circle cx="350" cy="290" r="7" fill="#fff" />
              <text
                x="350"
                y="262"
                textAnchor="middle"
                fill="#FCDD09"
                fontSize="14"
                fontFamily="'Noto Serif Ethiopic',serif"
                fontWeight="bold"
                filter="url(#glow)"
              >
                አድዋ
              </text>
              <text
                x="350"
                y="248"
                textAnchor="middle"
                fill="rgba(252,221,9,0.6)"
                fontSize="10"
                fontFamily="'Noto Serif Ethiopic',serif"
              >
                Adwa
              </text>

              {/* ===== ETHIOPIAN FORCES ===== */}
              {/* Left flank — Ras Mikael */}
              <g transform="translate(100,200)">
                <rect
                  x="-44"
                  y="-16"
                  width="88"
                  height="32"
                  rx="6"
                  fill="#078930"
                  opacity="0.88"
                />
                <rect
                  x="-44"
                  y="-16"
                  width="88"
                  height="32"
                  rx="6"
                  fill="none"
                  stroke="#FCDD09"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="-3"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontFamily="'Noto Serif Ethiopic',serif"
                  fontWeight="600"
                >
                  ራስ ሚካኤል
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="7"
                  fontFamily="'Noto Serif Ethiopic',serif"
                >
                  ግራ ክንፍ
                </text>
                <line
                  x1="0"
                  y1="16"
                  x2="0"
                  y2="50"
                  stroke="#078930"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                />
                <polygon points="-6,50 6,50 0,60" fill="#078930" />
              </g>

              {/* Center — Emperor Menelik II */}
              <g transform="translate(350,160)">
                <rect
                  x="-58"
                  y="-18"
                  width="116"
                  height="36"
                  rx="8"
                  fill="#078930"
                  opacity="0.92"
                />
                <rect
                  x="-58"
                  y="-18"
                  width="116"
                  height="36"
                  rx="8"
                  fill="none"
                  stroke="#FCDD09"
                  strokeWidth="2"
                />
                {/* Crown symbol */}
                <polygon points="-6,-20 0,-30 6,-20" fill="#FCDD09" />
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fill="#FCDD09"
                  fontSize="9"
                  fontFamily="'Noto Serif Ethiopic',serif"
                  fontWeight="700"
                >
                  አፄ ምኒልክ ፪
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.8)"
                  fontSize="7.5"
                  fontFamily="'Noto Serif Ethiopic',serif"
                >
                  መሃል ጦር · ዋና አዛዥ
                </text>
                <line
                  x1="0"
                  y1="18"
                  x2="0"
                  y2="60"
                  stroke="#FCDD09"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                />
                <polygon points="-7,60 7,60 0,72" fill="#FCDD09" />
              </g>

              {/* Right flank — Ras Makonnen */}
              <g transform="translate(590,200)">
                <rect
                  x="-52"
                  y="-16"
                  width="104"
                  height="32"
                  rx="6"
                  fill="#078930"
                  opacity="0.88"
                />
                <rect
                  x="-52"
                  y="-16"
                  width="104"
                  height="32"
                  rx="6"
                  fill="none"
                  stroke="#FCDD09"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="-3"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontFamily="'Noto Serif Ethiopic',serif"
                  fontWeight="600"
                >
                  ራስ መኮንን
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="7"
                  fontFamily="'Noto Serif Ethiopic',serif"
                >
                  ቀኝ ክንፍ
                </text>
                <line
                  x1="0"
                  y1="16"
                  x2="0"
                  y2="50"
                  stroke="#078930"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                />
                <polygon points="-6,50 6,50 0,60" fill="#078930" />
              </g>

              {/* Empress Taytu — reserve */}
              <g transform="translate(350,100)">
                <rect
                  x="-50"
                  y="-14"
                  width="100"
                  height="28"
                  rx="6"
                  fill="#4a1e6a"
                  opacity="0.9"
                />
                <rect
                  x="-50"
                  y="-14"
                  width="100"
                  height="28"
                  rx="6"
                  fill="none"
                  stroke="#DA121A"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontFamily="'Noto Serif Ethiopic',serif"
                  fontWeight="600"
                >
                  እቴጌ ጣይቱ
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="7"
                  fontFamily="'Noto Serif Ethiopic',serif"
                >
                  ተጠባባቂ ሃይል
                </text>
              </g>

              {/* Ras Alula */}
              <g transform="translate(210,340)">
                <rect
                  x="-44"
                  y="-14"
                  width="88"
                  height="28"
                  rx="6"
                  fill="#056d20"
                  opacity="0.88"
                />
                <rect
                  x="-44"
                  y="-14"
                  width="88"
                  height="28"
                  rx="6"
                  fill="none"
                  stroke="#FCDD09"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontFamily="'Noto Serif Ethiopic',serif"
                  fontWeight="600"
                >
                  ራስ ዓሉላ
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="7"
                  fontFamily="'Noto Serif Ethiopic',serif"
                >
                  ሰሜን ጦር
                </text>
              </g>

              {/* ===== ITALIAN FORCES ===== */}
              {/* Albertone column — left */}
              <g transform="translate(140,440)">
                <rect
                  x="-50"
                  y="-14"
                  width="100"
                  height="28"
                  rx="6"
                  fill="#8B1a1a"
                  opacity="0.88"
                />
                <rect
                  x="-50"
                  y="-14"
                  width="100"
                  height="28"
                  rx="6"
                  fill="none"
                  stroke="#DA121A"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontFamily="sans-serif"
                  fontWeight="600"
                >
                  Gen. Albertone
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="7"
                  fontFamily="sans-serif"
                >
                  Left Column
                </text>
              </g>

              {/* Arimondi column — center */}
              <g transform="translate(350,455)">
                <rect
                  x="-52"
                  y="-14"
                  width="104"
                  height="28"
                  rx="6"
                  fill="#8B1a1a"
                  opacity="0.9"
                />
                <rect
                  x="-52"
                  y="-14"
                  width="104"
                  height="28"
                  rx="6"
                  fill="none"
                  stroke="#DA121A"
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontFamily="sans-serif"
                  fontWeight="600"
                >
                  Gen. Arimondi
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="7"
                  fontFamily="sans-serif"
                >
                  Center Column
                </text>
              </g>

              {/* Dabormida column — right */}
              <g transform="translate(560,440)">
                <rect
                  x="-52"
                  y="-14"
                  width="104"
                  height="28"
                  rx="6"
                  fill="#8B1a1a"
                  opacity="0.88"
                />
                <rect
                  x="-52"
                  y="-14"
                  width="104"
                  height="28"
                  rx="6"
                  fill="none"
                  stroke="#DA121A"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontFamily="sans-serif"
                  fontWeight="600"
                >
                  Gen. Dabormida
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="7"
                  fontFamily="sans-serif"
                >
                  Right Column
                </text>
              </g>

              {/* Barattieri reserve */}
              <g transform="translate(350,500)">
                {/* below canvas, just for label near bottom */}
              </g>

              {/* Attack arrows — Italian advancing */}
              <path
                d="M 140 426 Q 200 380 250 340"
                stroke="#DA121A"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,4"
                markerEnd="url(#arrowRed)"
                opacity="0.8"
              />
              <path
                d="M 350 441 L 350 330"
                stroke="#DA121A"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,4"
                markerEnd="url(#arrowRed)"
                opacity="0.8"
              />
              <path
                d="M 560 426 Q 500 380 450 340"
                stroke="#DA121A"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,4"
                markerEnd="url(#arrowRed)"
                opacity="0.8"
              />

              {/* Counter-attack arrows — Ethiopian */}
              <path
                d="M 100 216 Q 175 265 240 300"
                stroke="#078930"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arrowGreen)"
                opacity="0.9"
              />
              <path
                d="M 350 178 L 350 276"
                stroke="#FCDD09"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arrowGold)"
                opacity="0.9"
              />
              <path
                d="M 590 216 Q 515 265 460 300"
                stroke="#078930"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#arrowGreen)"
                opacity="0.9"
              />

              {/* Arrow markers */}
              <defs>
                <marker
                  id="arrowRed"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L8,3 z" fill="#DA121A" />
                </marker>
                <marker
                  id="arrowGreen"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L8,3 z" fill="#078930" />
                </marker>
                <marker
                  id="arrowGold"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L8,3 z" fill="#FCDD09" />
                </marker>
              </defs>

              {/* Legend */}
              <rect
                x="12"
                y="12"
                width="180"
                height="100"
                rx="8"
                fill="rgba(0,0,0,0.65)"
                stroke="rgba(252,221,9,0.3)"
                strokeWidth="1"
              />
              <text
                x="22"
                y="30"
                fill="#FCDD09"
                fontSize="10"
                fontFamily="'Noto Serif Ethiopic',serif"
                fontWeight="700"
              >
                ምልክቶች
              </text>
              <rect
                x="22"
                y="38"
                width="14"
                height="10"
                rx="2"
                fill="#078930"
              />
              <text
                x="42"
                y="48"
                fill="#ccc"
                fontSize="9"
                fontFamily="'Noto Serif Ethiopic',serif"
              >
                የኢትዮጵያ ጦር
              </text>
              <rect
                x="22"
                y="54"
                width="14"
                height="10"
                rx="2"
                fill="#8B1a1a"
              />
              <text
                x="42"
                y="64"
                fill="#ccc"
                fontSize="9"
                fontFamily="sans-serif"
              >
                Italian Forces
              </text>
              <line
                x1="22"
                y1="79"
                x2="36"
                y2="79"
                stroke="#078930"
                strokeWidth="2"
                markerEnd="url(#arrowGreen)"
              />
              <text
                x="42"
                y="83"
                fill="#ccc"
                fontSize="9"
                fontFamily="'Noto Serif Ethiopic',serif"
              >
                ዘመቻ
              </text>
              <line
                x1="22"
                y1="96"
                x2="36"
                y2="96"
                stroke="#DA121A"
                strokeWidth="2"
                strokeDasharray="4,2"
              />
              <text
                x="42"
                y="100"
                fill="#ccc"
                fontSize="9"
                fontFamily="sans-serif"
              >
                Italian advance
              </text>

              {/* Title banner */}
              <text
                x="350"
                y="28"
                textAnchor="middle"
                fill="#FCDD09"
                fontSize="16"
                fontFamily="'Noto Serif Ethiopic',serif"
                fontWeight="700"
                opacity="0.95"
              >
                የአድዋ ጦርነት ካርታ — ፲፰፻፹፰ ዓ.ም
              </text>
            </svg>
          </div>

          {/* Info bar */}
          <div
            className="px-8 py-5 flex flex-col sm:flex-row gap-6 items-center justify-center"
            style={{
              background: "rgba(7,137,48,0.08)",
              borderTop: "1px solid oklch(0.28 0.02 250)",
            }}
          >
            {[
              { label: "የጦር ሜዳ", value: "አድዋ፣ ኢትዮጵያ", color: "#DA121A" },
              { label: "የኢትዮጵያ ጦር", value: "~100,000", color: "#078930" },
              { label: "የጣሊያን ጦር", value: "~14,500", color: "#FCDD09" },
            ].map((info) => (
              <div key={info.label} className="text-center">
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{
                    color: "oklch(0.50 0.02 90)",
                    fontFamily: "'Noto Serif Ethiopic',serif",
                  }}
                >
                  {info.label}
                </p>
                <p
                  className="text-sm font-bold mt-1"
                  style={{
                    color: info.color,
                    fontFamily: "'Noto Serif Ethiopic',serif",
                  }}
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
