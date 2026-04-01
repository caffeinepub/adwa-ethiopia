import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    YT: { Player: new (id: string, opts: object) => YTPlayer };
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  getPlayerState(): number;
}

interface MusicContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  startMusic: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const startedRef = useRef(false);

  const createPlayer = useCallback(() => {
    if (!document.getElementById("yt-music-player")) return;
    playerRef.current = new window.YT.Player("yt-music-player", {
      videoId: "SUdDn_sUTgo",
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: "SUdDn_sUTgo",
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event: { target: YTPlayer }) => {
          event.target.setVolume(20);
          event.target.playVideo();
          setIsPlaying(true);
          setIsMuted(false);
        },
      },
    });
  }, []);

  const startMusic = useCallback(() => {
    if (startedRef.current) {
      if (playerRef.current) {
        playerRef.current.setVolume(20);
        playerRef.current.playVideo();
      }
      setIsMuted(false);
      return;
    }
    startedRef.current = true;

    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }
  }, [createPlayer]);

  // Auto-start on first user interaction
  useEffect(() => {
    function onInteraction() {
      if (!startedRef.current) startMusic();
    }
    document.addEventListener("click", onInteraction, { once: true });
    document.addEventListener("scroll", onInteraction, { once: true });
    document.addEventListener("touchstart", onInteraction, { once: true });
    return () => {
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("scroll", onInteraction);
      document.removeEventListener("touchstart", onInteraction);
    };
  }, [startMusic]);

  const toggleMute = useCallback(() => {
    if (!startedRef.current) {
      startMusic();
      return;
    }
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.setVolume(20);
      setIsMuted(false);
    } else {
      playerRef.current.setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, startMusic]);

  return (
    <MusicContext.Provider
      value={{ isMuted, isPlaying, toggleMute, startMusic }}
    >
      {/* Hidden YT player target – must be in DOM before createPlayer() is called */}
      <div
        id="yt-music-player"
        style={{
          position: "fixed",
          top: -1,
          left: -1,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx)
    throw new Error("useMusicContext must be used within MusicProvider");
  return ctx;
}
