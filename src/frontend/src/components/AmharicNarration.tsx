import { motion } from "motion/react";

interface Props {
  lines: string[];
  className?: string;
}

/**
 * Cinematic Amharic narration block — fades in on scroll.
 * Gold italic Playfair Display, centered.
 */
export default function AmharicNarration({ lines, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`text-center py-10 px-6 mx-auto ${className}`}
      style={{ maxWidth: 680 }}
      data-ocid="narration.section"
    >
      <div
        style={{
          borderLeft: "3px solid rgba(212,175,55,0.4)",
          borderRight: "3px solid rgba(212,175,55,0.4)",
          padding: "1.5rem 2rem",
          background: "rgba(0,0,0,0.28)",
          borderRadius: "4px",
        }}
      >
        {lines.map((line) => (
          <p
            key={line}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "rgba(212,175,55,0.9)",
              lineHeight: 1.9,
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
