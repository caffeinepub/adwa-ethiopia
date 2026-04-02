import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Phase flow:
// 1. "black"  – pure black for 2 s
// 2. "text"   – display "አንድ ሀገር ቆመች…" slowly
// 3. "exit"   – fade to black, then call onDismiss

type Phase = "black" | "text" | "exit";

const TEXT_LINES = ["አንድ ሀገር ቆመች…"];

interface Props {
  onDismiss: () => void;
}

export default function CinematicIntro({ onDismiss }: Props) {
  const [phase, setPhase] = useState<Phase>("black");
  const [visibleLines, setVisibleLines] = useState(0);

  // Phase 1→2: wait 2 s on black screen then start text
  useEffect(() => {
    const t = setTimeout(() => setPhase("text"), 2000);
    return () => clearTimeout(t);
  }, []);

  // Phase 2: reveal text lines one by one, then call onDismiss
  useEffect(() => {
    if (phase !== "text") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    TEXT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), i * 2400));
    });
    // After last line has been visible ~2.5s, exit
    timers.push(
      setTimeout(
        () => {
          setPhase("exit");
          setTimeout(onDismiss, 1800);
        },
        TEXT_LINES.length * 2400 + 2500,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [phase, onDismiss]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="intro-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="fixed inset-0"
          style={{ zIndex: 9999, background: "#000" }}
          data-ocid="cinematic_intro.modal"
        >
          {/* TEXT LINES */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
            style={{ zIndex: 3 }}
          >
            {TEXT_LINES.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 28 }}
                animate={
                  visibleLines > i
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 28 }
                }
                transition={{ duration: 2.2, ease: "easeOut" }}
                style={{
                  fontFamily: "'Noto Serif Ethiopic', 'Nyala', Georgia, serif",
                  fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
                  color: "rgba(255,255,255,0.92)",
                  letterSpacing: "0.08em",
                  lineHeight: 1.7,
                  marginBottom: "0.6em",
                  textShadow:
                    "0 0 80px rgba(212,175,55,0.45), 0 2px 12px rgba(0,0,0,0.95)",
                  textAlign: "center",
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Bottom cinematic letterbox glow */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 140,
              background:
                "linear-gradient(to top, rgba(212,175,55,0.06), transparent)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="intro-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="fixed inset-0"
          style={{ zIndex: 9999, background: "#000", pointerEvents: "none" }}
        />
      )}
    </AnimatePresence>
  );
}
