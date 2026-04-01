import { Volume2, VolumeX } from "lucide-react";
import { useMusicContext } from "../contexts/MusicContext";

export default function MusicController() {
  const { isMuted, isPlaying, toggleMute } = useMusicContext();

  return (
    <button
      type="button"
      onClick={toggleMute}
      data-ocid="music.toggle"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      style={{
        position: "fixed",
        bottom: "6rem",
        right: "1.5rem",
        zIndex: 75,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
        padding: "10px 14px",
        borderRadius: "12px",
        background: "rgba(15,15,25,0.85)",
        border: `1px solid ${isMuted ? "rgba(255,255,255,0.15)" : "rgba(252,221,9,0.5)"}`,
        backdropFilter: "blur(8px)",
        color: isMuted ? "rgba(255,255,255,0.5)" : "#FCDD09",
        cursor: "pointer",
        transition: "all 0.3s ease",
        animation:
          isPlaying && !isMuted ? "musicPulse 2s ease-in-out infinite" : "none",
      }}
    >
      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span
        style={{
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {isMuted ? "Muted" : "Music"}
      </span>
    </button>
  );
}
