import { motion } from "motion/react";
import { useState } from "react";

const timelineSteps = [
  {
    year: "1889",
    title: "Treaty of Wuchale Signed",
    description:
      "Ethiopia and Italy signed the Treaty of Wuchale. The Italian version secretly claimed Ethiopia was an Italian protectorate — the Amharic version did not.",
    color: "oklch(0.72 0.12 70)",
  },
  {
    year: "1890–92",
    title: "Diplomatic Tensions Rise",
    description:
      "Italy began asserting international control over Ethiopia based on its treaty interpretation. Emperor Menelik II grew increasingly resistant to Italy's claims.",
    color: "oklch(0.55 0.15 20)",
  },
  {
    year: "1893",
    title: "Menelik II Annuls the Treaty",
    description:
      "Emperor Menelik II formally rejected the Italian interpretation and annulled the Treaty of Wuchale, declaring Ethiopia fully sovereign and free.",
    color: "oklch(0.50 0.14 155)",
  },
  {
    year: "March 1, 1896",
    title: "Battle of Adwa",
    description:
      "Italy invaded. Ethiopian forces under Emperor Menelik II and Empress Taytu Betul decisively defeated the Italian army at the Battle of Adwa — a landmark moment for African independence.",
    color: "oklch(0.72 0.12 70)",
  },
];

const scrollImages = [
  {
    src: "/assets/6695ae0a1bb3f08e1ae2e72b31d2378e-019d3f34-bfbf-75f8-97ab-8e1ee6e96fab.jpg",
    caption: "የአድዋ ዘመቻ የከተተ አዋጅ — Historic Adwa Campaign Proclamation",
  },
];

export default function HistoryTab() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.15 0.04 45)" }}>
      {/* Header */}
      <div
        className="px-4 pt-8 pb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 45) 0%, oklch(0.12 0.04 45) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Historical Context
          </p>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            Before Adwa
          </h1>
          <p
            className="text-sm mt-1 leading-relaxed"
            style={{ color: "oklch(0.65 0.015 80)" }}
          >
            The diplomatic betrayal that led to Ethiopia's greatest victory
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="px-4 py-2 pb-8">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-4 bottom-4 w-0.5"
            style={{ background: "oklch(0.30 0.04 45)" }}
          />

          {timelineSteps.map((step, i) => (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
              className="relative flex gap-4 mb-6"
            >
              {/* Dot */}
              <div
                className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "oklch(0.20 0.04 45)",
                  border: `2px solid ${step.color}`,
                  color: step.color,
                }}
              >
                {i + 1}
              </div>

              {/* Content card */}
              <div
                className="flex-1 rounded-xl p-4"
                style={{
                  background: "oklch(0.20 0.04 45)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                  borderLeft: `3px solid ${step.color}`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: `${step.color}22`,
                      color: step.color,
                    }}
                  >
                    {step.year}
                  </span>
                </div>
                <h3
                  className="font-bold text-sm mb-1.5"
                  style={{ color: "oklch(0.90 0.015 80)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.65 0.015 80)" }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Historic Proclamation Scrolls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-4 mb-4"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            📜 Historic Proclamation Scroll
          </p>
          <div className="flex flex-col gap-4">
            {scrollImages.map((img) => (
              <motion.button
                key={img.src}
                type="button"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden cursor-pointer text-left w-full"
                style={{
                  border: "2px solid oklch(0.72 0.12 70)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  background: "transparent",
                  padding: 0,
                }}
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-contain"
                  style={{ maxHeight: "400px", background: "#f5e8c0" }}
                />
                <div
                  className="px-3 py-2"
                  style={{ background: "oklch(0.18 0.04 45)" }}
                >
                  <p
                    className="text-xs text-center"
                    style={{ color: "oklch(0.72 0.12 70)" }}
                  >
                    {img.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Legacy note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="rounded-xl p-5 mt-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.06 45), oklch(0.18 0.04 45))",
            border: "1px solid oklch(0.30 0.04 45)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Legacy
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.80 0.015 80)" }}
          >
            The victory at Adwa proved that an African nation could stand up to
            European colonialism. Ethiopia became a beacon of hope and
            independence for all of Africa.
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.90)" }}
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
          tabIndex={-1}
        >
          <img
            src={lightbox}
            alt="Historic scroll fullscreen"
            className="max-w-full max-h-full rounded-xl object-contain"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
          />
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
