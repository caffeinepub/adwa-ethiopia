import {
  type ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement | string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        },
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(volume: number): void;
  getPlayerState(): number;
  destroy(): void;
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  function createPlayer() {
    if (!containerRef.current) {
      const div = document.createElement("div");
      div.style.cssText =
        "position:fixed;top:-1px;left:-1px;width:1px;height:1px;opacity:0;pointer-events:none;";
      document.body.appendChild(div);
      containerRef.current = div;
    }

    playerRef.current = new window.YT.Player(containerRef.current, {
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
        onReady: (event) => {
          event.target.setVolume(25);
          event.target.playVideo();
          setIsPlaying(true);
          setIsMuted(false);
        },
      },
    });
  }

  function loadYTApi() {
    if (document.getElementById("yt-iframe-api")) return;
    const script = document.createElement("script");
    script.id = "yt-iframe-api";
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  }

  function startMusic() {
    if (startedRef.current) {
      if (playerRef.current) {
        playerRef.current.setVolume(25);
        playerRef.current.playVideo();
      }
      setIsMuted(false);
      return;
    }
    startedRef.current = true;

    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
      loadYTApi();
    }
  }

  function toggleMute() {
    if (!startedRef.current) {
      startMusic();
      return;
    }
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.setVolume(25);
      setIsMuted(false);
    } else {
      playerRef.current.setVolume(0);
      setIsMuted(true);
    }
  }

  return (
    <MusicContext.Provider
      value={{ isMuted, isPlaying, toggleMute, startMusic }}
    >
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
