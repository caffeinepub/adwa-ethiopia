import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const timelineSteps = [
  {
    year: "1889",
    title: "Treaty of Wuchale Signed",
    description:
      "Ethiopia and Italy signed the Treaty of Wuchale. The Italian version secretly claimed Ethiopia was an Italian protectorate — the Amharic version did not.",
    color: "#FCDD09",
  },
  {
    year: "1890–92",
    title: "Diplomatic Tensions Rise",
    description:
      "Italy began asserting international control over Ethiopia based on its treaty interpretation. Emperor Menelik II grew increasingly resistant to Italy's claims.",
    color: "#078930",
  },
  {
    year: "1893",
    title: "Menelik II Annuls the Treaty",
    description:
      "Emperor Menelik II formally rejected the Italian interpretation and annulled the Treaty of Wuchale, declaring Ethiopia fully sovereign and free.",
    color: "#DA121A",
  },
  {
    year: "March 1, 1896",
    title: "Battle of Adwa",
    description:
      "Italy invaded. Ethiopian forces under Emperor Menelik II and Empress Taytu Betul decisively defeated the Italian army at Adwa — a landmark moment for African independence.",
    color: "#FCDD09",
  },
];

function FadeBlock({
  children,
  delay = 0,
}: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollAnimation();
  return (
    <div
      ref={ref}
      className="fade-in-up"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function HistorySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.14 0.04 45)" }}>
      <div className="max-w-7xl mx-auto">
        <FadeBlock>
          <div className="text-center mb-14">
            <div className="eth-stripe mx-auto mb-5" style={{ maxWidth: 60 }}>
              <div className="s-green" />
              <div className="s-yellow" />
              <div className="s-red" />
            </div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "#FCDD09" }}
            >
              Historical Context
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "oklch(0.95 0.008 80)" }}
            >
              Before Adwa
            </h2>
            <p
              className="text-base mt-4 max-w-xl mx-auto"
              style={{ color: "oklch(0.65 0.01 80)" }}
            >
              The diplomatic betrayal that led to Ethiopia’s greatest victory
            </p>
          </div>
        </FadeBlock>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative mb-16">
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{ background: "oklch(0.28 0.04 45)" }}
          />
          {timelineSteps.map((step, i) => (
            <FadeBlock key={step.year} delay={i * 150}>
              <div className="relative flex gap-6 mb-8">
                <div
                  className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "oklch(0.19 0.04 45)",
                    border: `2px solid ${step.color}`,
                    color: step.color,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  className="flex-1 rounded-2xl p-6"
                  style={{
                    background: "oklch(0.19 0.04 45)",
                    borderLeft: `3px solid ${step.color}`,
                  }}
                >
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2"
                    style={{ background: `${step.color}22`, color: step.color }}
                  >
                    {step.year}
                  </span>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "oklch(0.93 0.01 80)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.68 0.01 80)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeBlock>
          ))}
        </div>

        {/* Proclamation scroll */}
        <FadeBlock>
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#FCDD09" }}
            >
              📜 Historic Proclamation Scroll
            </p>
            <button
              type="button"
              className="w-full rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border: "2px solid #FCDD09",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                background: "transparent",
                padding: 0,
              }}
              onClick={() =>
                setLightbox(
                  "/assets/6695ae0a1bb3f08e1ae2e72b31d2378e-019d3f34-bfbf-75f8-97ab-8e1ee6e96fab.jpg",
                )
              }
            >
              <img
                src="/assets/6695ae0a1bb3f08e1ae2e72b31d2378e-019d3f34-bfbf-75f8-97ab-8e1ee6e96fab.jpg"
                alt="Historic Adwa Campaign Proclamation"
                className="w-full object-contain"
                style={{ maxHeight: 400, background: "#f5e8c0" }}
              />
              <div
                className="px-4 py-3"
                style={{ background: "oklch(0.19 0.04 45)" }}
              >
                <p className="text-xs text-center" style={{ color: "#FCDD09" }}>
                  የአድዋ ዘሜቻ የከተተ አዋፅ — Historic Adwa Campaign Proclamation
                </p>
              </div>
            </button>
          </div>
        </FadeBlock>

        {/* Legacy */}
        <FadeBlock>
          <div
            className="max-w-2xl mx-auto mt-12 rounded-2xl p-8"
            style={{
              background: "oklch(0.19 0.04 45)",
              border: "1px solid oklch(0.28 0.04 45)",
            }}
          >
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#FCDD09" }}
            >
              Legacy
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.80 0.01 80)" }}
            >
              The victory at Adwa proved that an African nation could stand up
              to European colonialism. Ethiopia became a beacon of hope and
              independence for all of Africa.
            </p>
          </div>
        </FadeBlock>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full cursor-default"
          style={{ background: "rgba(0,0,0,0.92)", border: "none" }}
          onClick={() => setLightbox(null)}
          aria-label="Close lightbox"
        >
          <img
            src={lightbox}
            alt="Historic scroll fullscreen"
            className="max-w-full max-h-full rounded-xl object-contain"
          />
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setLightbox(null)}
          >
            &#x2715;
          </button>
        </button>
      )}
    </div>
  );
}
