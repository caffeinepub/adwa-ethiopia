import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMusicContext } from "../contexts/MusicContext";

const lines = ["1896…", "አፍሪካ በመከፋፈል ዘመን…", "አንድ ሀገር ቆመች…"];

interface Props {
  onDismiss: () => void;
}

export default function CinematicIntro({ onDismiss }: Props) {
  const { startMusic } = useMusicContext();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setVisibleLines((n) => n + 1);
          },
          1200 + i * 1500,
        ),
      );
    });
    timers.push(
      setTimeout(() => setShowButton(true), 1200 + lines.length * 1500 + 800),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  function handleEnter() {
    startMusic();
    setExiting(true);
    setTimeout(onDismiss, 1500);
  }

  if (exiting) {
    return (
      <motion.div
        key="cinematic-exit"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="fixed inset-0"
        style={{ zIndex: 9999, background: "#000", pointerEvents: "none" }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ zIndex: 9999, background: "#000" }}
      data-ocid="cinematic_intro.modal"
    >
      <div className="text-center px-8 max-w-2xl w-full">
        {lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 24 }}
            animate={
              visibleLines > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.35rem, 4vw, 2.1rem)",
              color: i === 0 ? "#d4af37" : "rgba(212,175,55,0.88)",
              letterSpacing: "0.12em",
              lineHeight: 1.7,
              marginBottom: "0.4em",
              textShadow: "0 0 40px rgba(212,175,55,0.35)",
            }}
          >
            {line}
          </motion.p>
        ))}

        <AnimatePresence>
          {showButton && (
            <motion.button
              key="enter-btn"
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onClick={handleEnter}
              data-ocid="cinematic_intro.primary_button"
              className="intro-enter-btn"
              style={{
                marginTop: "3rem",
                padding: "0.85rem 2.6rem",
                background: "transparent",
                border: "1px solid #d4af37",
                color: "#d4af37",
                fontSize: "0.82rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                borderRadius: "2px",
              }}
            >
              Enter the Story
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(to top, rgba(212,175,55,0.04), transparent)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        .intro-enter-btn {
          animation: goldPulse 2.5s ease-in-out infinite;
        }
        .intro-enter-btn:hover {
          background: rgba(212,175,55,0.1) !important;
          box-shadow: 0 0 32px rgba(212,175,55,0.4);
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(212,175,55,0.2); }
          50% { box-shadow: 0 0 28px rgba(212,175,55,0.55); }
        }
      `}</style>
    </div>
  );
}
