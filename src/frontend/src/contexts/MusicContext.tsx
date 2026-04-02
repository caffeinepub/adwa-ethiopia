import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    YT: {
      Player: new (el: string | HTMLElement, opts: object) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  getPlayerState(): number;
  destroy(): void;
}

interface MusicContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  startMusic: (volume?: number) => void;
  setMusicVolume: (v: number) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const startedRef = useRef(false);
  const pendingVolumeRef = useRef<number>(20);

  const createPlayer = useCallback((_volume: number) => {
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
          event.target.setVolume(pendingVolumeRef.current);
          event.target.playVideo();
          setIsPlaying(true);
          setIsMuted(false);
        },
      },
    });
  }, []);

  const setMusicVolume = useCallback((v: number) => {
    pendingVolumeRef.current = v;
    if (playerRef.current) {
      playerRef.current.setVolume(v);
      if (v > 0) setIsMuted(false);
    }
  }, []);

  const startMusic = useCallback(
    (volume = 20) => {
      pendingVolumeRef.current = volume;
      if (startedRef.current) {
        if (playerRef.current) {
          playerRef.current.setVolume(volume);
          playerRef.current.playVideo();
        }
        setIsMuted(false);
        return;
      }
      startedRef.current = true;

      if (window.YT?.Player) {
        createPlayer(volume);
      } else {
        window.onYouTubeIframeAPIReady = () => createPlayer(volume);
        if (!document.getElementById("yt-iframe-api")) {
          const s = document.createElement("script");
          s.id = "yt-iframe-api";
          s.src = "https://www.youtube.com/iframe_api";
          document.head.appendChild(s);
        }
      }
    },
    [createPlayer],
  );

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
      value={{ isMuted, isPlaying, toggleMute, startMusic, setMusicVolume }}
    >
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
