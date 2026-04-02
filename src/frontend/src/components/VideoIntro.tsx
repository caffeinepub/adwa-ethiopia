import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMusicContext } from "../contexts/MusicContext";

interface HDYTPlayer {
  destroy(): void;
  setPlaybackQuality(quality: string): void;
}

interface Props {
  onDismiss: () => void;
}

export default function VideoIntro({ onDismiss }: Props) {
  const { startMusic, setMusicVolume } = useMusicContext();
  const [videoFaded, setVideoFaded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HDYTPlayer | null>(null);
  const didInit = useRef(false);
  const finishCalledRef = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    // Start Gigi Adwa music softly under the video
    startMusic(6);

    // Fade in the video after a brief moment
    setTimeout(() => setVideoFaded(true), 400);

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
          hd: 1,
          vq: "hd1080",
        },
        events: {
          onReady: (e: { target: HDYTPlayer }) => {
            e.target.setPlaybackQuality("hd1080");
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              playerRef.current?.setPlaybackQuality("hd1080");
            }
            if (e.data === window.YT.PlayerState.ENDED) {
              handleFinish();
            }
          },
        },
      }) as unknown as HDYTPlayer;
    }

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        initPlayer();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => {
      playerRef.current?.destroy();
    };
  }, [startMusic]);

  function handleFinish() {
    if (finishCalledRef.current) return;
    finishCalledRef.current = true;
    setMusicVolume(20);
    setExiting(true);
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: exiting ? 1.8 : 1.2, ease: "easeInOut" }}
        className="fixed inset-0"
        style={{ zIndex: 9999, background: "#000" }}
        data-ocid="video_intro.modal"
      >
        {/* YouTube player */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: videoFaded ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeIn" }}
          className="absolute inset-0"
          style={{ overflow: "hidden" }}
        >
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

        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.72) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Skip Intro button */}
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
            data-ocid="video_intro.skip_button"
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
              transition: "background 0.3s, border-color 0.3s, color 0.3s",
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

        {/* Bottom glow */}
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
    </>
  );
}
