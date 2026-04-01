import { useEffect, useState } from "react";
import { useMusicContext } from "../contexts/MusicContext";

const QUOTES = [
  {
    text: "They gave their lives so Africa could live free.",
    author: "— Battle of Adwa, 1896",
  },
  {
    text: "In the dust of Adwa, a continent found its dignity.",
    author: "— Ethiopian Heritage",
  },
  {
    text: "One million hearts, one victory, one eternal dawn.",
    author: "— March 1, 1896",
  },
  {
    text: "Taytu stood. Menelik led. Ethiopia endured. Africa remembered.",
    author: "— Adwa Victory",
  },
  {
    text: "The blood of Adwa watered the seeds of independence across a continent.",
    author: "— Pan-African Legacy",
  },
  {
    text: "Victory is not the end of sacrifice — it is sacrifice made eternal.",
    author: "— Heroes of Adwa",
  },
  {
    text: "March 1, 1896. The day the world learned: Africa will not bow.",
    author: "— Battle of Adwa",
  },
];

export default function EmotionalMode() {
  const [active, setActive] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const { startMusic } = useMusicContext();

  useEffect(() => {
    if (active) {
      document.body.classList.add("emotional-mode");
      startMusic();
    } else {
      document.body.classList.remove("emotional-mode");
    }
    return () => document.body.classList.remove("emotional-mode");
  }, [active, startMusic]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % QUOTES.length);
        setQuoteVisible(true);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [active]);

  const quote = QUOTES[quoteIndex];

  return (
    <>
      {/* Dark overlay */}
      {active && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            pointerEvents: "none",
            background: "rgba(0,0,0,0.5)",
            transition: "opacity 1.5s ease",
            opacity: 1,
          }}
        />
      )}

      {/* Quotes panel */}
      {active && (
        <div
          style={{
            position: "fixed",
            bottom: "5rem",
            left: 0,
            right: 0,
            zIndex: 45,
            padding: "2rem",
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(252,221,9,0.3)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              fontStyle: "italic",
              color: "#FCDD09",
              marginBottom: "0.5rem",
              opacity: quoteVisible ? 1 : 0,
              transition: "opacity 1s ease",
              textShadow: "0 0 40px rgba(252,221,9,0.4)",
              lineHeight: 1.6,
            }}
          >
            &ldquo;{quote.text}&rdquo;
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.1em",
              opacity: quoteVisible ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          >
            {quote.author}
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setActive((a) => !a)}
        data-ocid="emotional.toggle"
        aria-label={active ? "Exit Emotional Mode" : "Enter Emotional Mode"}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 50,
          padding: "10px 18px",
          borderRadius: "12px",
          background: active
            ? "linear-gradient(135deg, rgba(218,18,26,0.9), rgba(120,0,0,0.9))"
            : "linear-gradient(135deg, rgba(80,10,10,0.85), rgba(40,5,5,0.85))",
          border: `1px solid ${active ? "rgba(218,18,26,0.8)" : "rgba(218,18,26,0.4)"}`,
          backdropFilter: "blur(8px)",
          color: active ? "#fff" : "rgba(255,255,255,0.7)",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          animation: active ? "emotionalPulse 2s ease-in-out infinite" : "none",
        }}
      >
        {active ? "✦ Exit Mode" : "✦ Emotional Mode"}
      </button>
    </>
  );
}
