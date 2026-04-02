import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMusicContext } from "../contexts/MusicContext";

// Phase flow:
// 1. "black"  – pure black for 2 s
// 2. "text"   – display "1896…" then "አንድ ሀገር ቆመች…" then fade
// 3. "video"  – fullscreen YouTube video + Skip Intro button
// 4. "exit"   – fade to black, then call onDismiss

type Phase = "black" | "text" | "video" | "exit";

const TEXT_LINES = ["1896…", "አንድ ሀገር ቆመች…"];

interface Props {
  onDismiss: () => void;
}

export default function CinematicIntro({ onDismiss }: Props) {
  const { startMusic, setMusicVolume } = useMusicContext();
  const [phase, setPhase] = useState<Phase>("black");
  const [visibleLines, setVisibleLines] = useState(0);
  const [videoFaded, setVideoFaded] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<InstanceType<typeof window.YT.Player> | null>(null);
  const didInit = useRef(false);
  const finishCalledRef = useRef(false);

  // Phase 1→2: wait 2 s on black screen then start text
  useEffect(() => {
    const t = setTimeout(() => setPhase("text"), 2000);
    return () => clearTimeout(t);
  }, []);

  // Phase 2: reveal text lines one by one, then transition to video
  useEffect(() => {
    if (phase !== "text") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    TEXT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), i * 2400));
    });
    // After last line has been visible, fade into video
    timers.push(
      setTimeout(
        () => {
          setPhase("video");
          setTimeout(() => setVideoFaded(true), 200);
        },
        TEXT_LINES.length * 2400 + 2000,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Phase 3: start soft music + load YouTube player
  // biome-ignore lint/correctness/useExhaustiveDependencies: startMusic is stable
  useEffect(() => {
    if (phase !== "video" || didInit.current) return;
    didInit.current = true;

    // Start background music very softly during the video
    startMusic(6);

    function initPlayer() {
      if (!playerContainerRef.current) return;
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId: "ixks2N4TP18",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 0,
        },
        events: {
          onStateChange: (e: { data: number }) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              handleFinish();
            }
          },
        },
      });
    }

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      playerRef.current?.destroy();
    };
  }, [phase]);

  function handleFinish() {
    if (finishCalledRef.current) return;
    finishCalledRef.current = true;
    // Bring music to full volume before entering main site
    setMusicVolume(20);
    setPhase("exit");
    setTimeout(onDismiss, 1800);
  }

  return (
    <>
      <style>{`
        @keyframes cinematic-zoom {
          from { transform: translate(-50%, -50%) scale(1); }
          to   { transform: translate(-50%, -50%) scale(1.07); }
        }
      `}</style>

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
            {/* ── VIDEO LAYER (phase: video) ── */}
            {phase === "video" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: videoFaded ? 1 : 0 }}
                transition={{ duration: 2, ease: "easeIn" }}
                className="absolute inset-0"
                style={{ overflow: "hidden" }}
              >
                {/* YouTube player with slow cinematic zoom */}
                <div
                  ref={playerContainerRef}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(1)",
                    width: "100vw",
                    height: "100vh",
                    minWidth: "177.78vh",
                    minHeight: "56.25vw",
                    pointerEvents: "none",
                    animation: "cinematic-zoom 80s ease-in-out forwards",
                  }}
                />
              </motion.div>
            )}

            {/* ── CINEMATIC DARK OVERLAY ── */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  phase === "video"
                    ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.72) 100%)"
                    : "rgba(0,0,0,0)",
                transition: "background 2.2s ease",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* ── TEXT LINES (phases: black & text) ── */}
            {(phase === "black" || phase === "text") && (
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
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                      fontSize:
                        i === 0
                          ? "clamp(1.6rem, 5vw, 2.8rem)"
                          : "clamp(1.2rem, 3.5vw, 2rem)",
                      color: i === 0 ? "#d4af37" : "rgba(255,255,255,0.88)",
                      letterSpacing: i === 0 ? "0.18em" : "0.08em",
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
            )}

            {/* ── SKIP INTRO button (phase: video) ── */}
            {phase === "video" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: videoFaded ? 1 : 0 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  zIndex: 10,
                }}
              >
                <button
                  type="button"
                  onClick={handleFinish}
                  data-ocid="cinematic_intro.skip_button"
                  style={{
                    padding: "0.5rem 1.3rem",
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "rgba(255,255,255,0.82)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    borderRadius: "3px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    transition:
                      "background 0.3s, border-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = "rgba(212,175,55,0.18)";
                    b.style.borderColor = "rgba(212,175,55,0.65)";
                    b.style.color = "#d4af37";
                  }}
                  onMouseLeave={(e) => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = "rgba(0,0,0,0.5)";
                    b.style.borderColor = "rgba(255,255,255,0.3)";
                    b.style.color = "rgba(255,255,255,0.82)";
                  }}
                >
                  Skip Intro ›
                </button>
              </motion.div>
            )}

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
          // Fade-out black overlay on exit
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
    </>
  );
}
