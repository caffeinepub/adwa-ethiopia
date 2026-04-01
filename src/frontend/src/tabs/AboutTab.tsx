import { Heart, Quote, Smartphone, Target } from "lucide-react";
import { motion } from "motion/react";

export default function AboutTab() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.15 0.04 45)" }}>
      {/* Header */}
      <div
        className="px-4 pt-8 pb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 45) 0%, oklch(0.12 0.04 45) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            The Creator
          </p>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            About the Developer
          </h1>
        </motion.div>
      </div>

      <div className="px-4 pb-8">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="rounded-2xl p-6 mb-5 text-center"
          style={{
            background: "oklch(0.20 0.04 45)",
            border: "1px solid oklch(0.28 0.04 45)",
          }}
        >
          {/* Avatar */}
          <div
            className="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden"
            style={{
              boxShadow: "0 4px 24px oklch(0.72 0.12 70 / 0.30)",
              border: "3px solid oklch(0.72 0.12 70 / 0.60)",
            }}
          >
            <img
              src="/assets/img_20260330_155402_754_2-019d3ee2-5da3-732b-ab24-6a9d982d86ba.jpg"
              alt="Helen Metekiya"
              className="w-full h-full object-cover"
            />
          </div>

          <h2
            className="font-display font-bold text-xl mb-1"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            Helen Metekiya
          </h2>
          <span
            className="inline-block text-xs px-3 py-1 rounded-full mb-4"
            style={{
              background: "oklch(0.72 0.12 70 / 0.15)",
              color: "oklch(0.72 0.12 70)",
            }}
          >
            Developer
          </span>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.70 0.015 80)" }}
          >
            Hello! My name is Helen Metekiya 😊 I am 17 years old and a Grade 12
            student from Ethiopia 🇪🇹
          </p>
        </motion.div>

        {/* My Story */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="rounded-xl p-5 mb-4"
          style={{
            background: "oklch(0.20 0.04 45)",
            border: "1px solid oklch(0.28 0.04 45)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "oklch(0.72 0.12 70)" }}>🌍</span>
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.12 70)" }}
            >
              My Story
            </p>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.70 0.015 80)" }}
          >
            From a young age, I have been deeply passionate about Ethiopian
            history, especially the leadership of Emperor Menelik II and Empress
            Taytu, and the inspiring victory of the Battle of Adwa.
          </p>
          <p
            className="text-sm leading-relaxed mt-3"
            style={{ color: "oklch(0.70 0.015 80)" }}
          >
            For me, Adwa is not just a historical event — it is a symbol of
            courage, unity, and independence. It represents the strength of a
            nation that stood against colonization and inspired the entire
            African continent 🌍✨
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-xl p-5 mb-4 relative overflow-hidden"
          style={{
            background: "oklch(0.20 0.04 45)",
            borderLeft: "3px solid oklch(0.72 0.12 70)",
          }}
        >
          <Quote
            size={36}
            className="absolute top-3 right-3 opacity-10"
            style={{ color: "oklch(0.72 0.12 70)" }}
          />
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Philosophy
          </p>
          <p
            className="text-sm leading-relaxed italic"
            style={{ color: "oklch(0.80 0.015 80)" }}
          >
            "The future belongs to young innovators who respect their history
            while building new solutions."
          </p>
          <p className="text-xs mt-2" style={{ color: "oklch(0.50 0.02 80)" }}>
            — Helen Metekiya
          </p>
        </motion.div>

        {/* Project Goal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="rounded-xl p-5 mb-4"
          style={{ background: "oklch(0.20 0.04 45)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} style={{ color: "oklch(0.72 0.12 70)" }} />
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.12 70)" }}
            >
              Project Goal
            </p>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.70 0.015 80)" }}
          >
            This passion motivated me to develop this application, combining
            technology with history to create a modern and interactive way of
            learning. Through this app, I aim to educate others, promote
            Ethiopian heritage, and show how digital innovation can preserve our
            identity 📱💡
          </p>
        </motion.div>

        {/* Thank You note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.4 }}
          className="rounded-xl p-5 mb-4 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.06 45) 0%, oklch(0.18 0.05 30) 100%)",
            border: "1px solid oklch(0.72 0.12 70 / 0.25)",
          }}
        >
          <Heart
            size={20}
            className="mx-auto mb-2"
            style={{ color: "oklch(0.72 0.12 70)" }}
          />
          <p
            className="text-sm leading-relaxed font-medium"
            style={{ color: "oklch(0.85 0.015 80)" }}
          >
            I am proud to be Ethiopian 🇪🇹❤️
          </p>
          <p
            className="text-sm leading-relaxed mt-1"
            style={{ color: "oklch(0.70 0.015 80)" }}
          >
            Thank you for using my app and being part of this journey 🙏
          </p>
        </motion.div>

        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: "oklch(0.20 0.04 45)" }}
        >
          <div className="flex items-center gap-3">
            <Smartphone size={18} style={{ color: "oklch(0.50 0.02 80)" }} />
            <div>
              <p
                className="text-xs font-semibold"
                style={{ color: "oklch(0.90 0.015 80)" }}
              >
                Adwa Ethiopia
              </p>
              <p className="text-xs" style={{ color: "oklch(0.50 0.02 80)" }}>
                Built with love for Ethiopian heritage
              </p>
            </div>
          </div>
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{
              background: "oklch(0.72 0.12 70 / 0.15)",
              color: "oklch(0.72 0.12 70)",
            }}
          >
            v2.0
          </span>
        </motion.div>
      </div>
    </div>
  );
}
