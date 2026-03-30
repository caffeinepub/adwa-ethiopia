import { Music } from "lucide-react";
import { motion } from "motion/react";

const videos = [
  {
    id: 1,
    videoId: "SUdDn_sUTgo",
    title: "Ethiopian Patriotic Song 1",
    subtitle: "Adwa Victory Music",
  },
  {
    id: 2,
    videoId: "xKrw9LIkAeU",
    title: "Ethiopian Patriotic Song 2",
    subtitle: "Cultural Heritage Music",
  },
  {
    id: 3,
    videoId: "Lh8QwDkfpTo",
    title: "Ethiopian Patriotic Song 3",
    subtitle: "Traditional Ethiopian Music",
  },
  {
    id: 4,
    videoId: "2VNvWghJJFs",
    title: "Ethiopian Patriotic Song 4",
    subtitle: "National Pride Music",
  },
];

export default function MusicTab() {
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
            Cultural Heritage
          </p>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            Patriotic Music
          </h1>
          <p
            className="text-sm mt-1 leading-relaxed"
            style={{ color: "oklch(0.65 0.015 80)" }}
          >
            Songs that celebrate Ethiopian heritage and Adwa's legacy
          </p>
        </motion.div>
      </div>

      <div className="px-4 pb-8">
        {/* Info note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-5 rounded-xl px-4 py-3 flex items-center gap-3"
          style={{
            background: "oklch(0.20 0.04 45)",
            border: "1px solid oklch(0.72 0.12 70 / 0.3)",
          }}
        >
          <Music
            size={16}
            style={{ color: "oklch(0.72 0.12 70)", flexShrink: 0 }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Ethiopian patriotic music celebrating the victory of Adwa
          </p>
        </motion.div>

        {/* Video cards */}
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            className="mb-6 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.20 0.04 45)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            }}
          >
            {/* Top color bar */}
            <div
              className="h-1 w-full"
              style={{ background: "oklch(0.72 0.12 70)" }}
            />

            {/* Title */}
            <div className="px-4 pt-3 pb-2">
              <h3
                className="font-bold text-sm"
                style={{ color: "oklch(0.90 0.015 80)" }}
              >
                {video.title}
              </h3>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.72 0.12 70)" }}
              >
                {video.subtitle}
              </p>
            </div>

            {/* YouTube embed */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
