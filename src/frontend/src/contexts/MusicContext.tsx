import {
  type ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

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
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);

  function startMusic() {
    if (startedRef.current) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(
          0.18,
          audioCtxRef.current.currentTime,
          0.5,
        );
      }
      setIsMuted(false);
      return;
    }
    startedRef.current = true;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // Fade in
    master.gain.setTargetAtTime(0.18, ctx.currentTime, 2);

    // Ethiopian pentatonic notes: A2, C3, D3, E3, G3, A3
    const notes = [110, 130.8, 146.8, 164.8, 196, 220];
    const types: OscillatorType[] = [
      "sine",
      "triangle",
      "sine",
      "triangle",
      "sine",
      "sine",
    ];
    const gains = [0.5, 0.3, 0.4, 0.25, 0.3, 0.2];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = types[i];
      osc.frequency.value = freq;

      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(freq * 1.002, ctx.currentTime + 8);
      osc.frequency.linearRampToValueAtTime(freq, ctx.currentTime + 16);

      const gain = ctx.createGain();
      gain.gain.value = gains[i] * 0.12;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06 + i * 0.01;
      lfo.type = "sine";
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.03;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      osc.connect(gain);
      gain.connect(master);
      osc.start();
    });

    setIsPlaying(true);
    setIsMuted(false);
  }

  function toggleMute() {
    if (!startedRef.current) {
      startMusic();
      return;
    }
    if (!masterGainRef.current || !audioCtxRef.current) return;

    if (isMuted) {
      masterGainRef.current.gain.setTargetAtTime(
        0.18,
        audioCtxRef.current.currentTime,
        0.5,
      );
      setIsMuted(false);
    } else {
      masterGainRef.current.gain.setTargetAtTime(
        0,
        audioCtxRef.current.currentTime,
        0.5,
      );
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
