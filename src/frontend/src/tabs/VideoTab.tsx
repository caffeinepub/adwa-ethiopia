import { motion } from "motion/react";

const documentaries = [
  {
    id: "DzclxJ3xMbc",
    title: "Battle of Adwa: The Full Story",
    description:
      "A comprehensive account of the Battle of Adwa, covering the lead-up, the battle itself, and its lasting impact on Ethiopian sovereignty.",
  },
  {
    id: "sXdtR6vcP5U",
    title: "Ethiopia's Historic Victory",
    description:
      "How Ethiopia's decisive win over Italian colonial forces shocked the world and inspired independence movements across Africa.",
  },
  {
    id: "eDNcR0iaAxw",
    title: "Emperor Menelik II & the War",
    description:
      "The story of Emperor Menelik II's military genius and diplomatic acumen that led Ethiopia to its greatest military triumph.",
  },
  {
    id: "If0bELmxx6w",
    title: "Adwa: Africa's Finest Hour",
    description:
      "An exploration of how the Battle of Adwa became a defining moment for the entire African continent and the pan-African movement.",
  },
  {
    id: "b_eYn1ntm_Y",
    title: "The Legacy of Adwa",
    description:
      "Examining the enduring cultural, political, and symbolic legacy of the Battle of Adwa over 125 years later.",
  },
];

export default function VideoTab() {
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
            Watch & Learn
          </p>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            Documentaries
          </h1>
          <p
            className="text-sm mt-1 leading-relaxed"
            style={{ color: "oklch(0.65 0.015 80)" }}
          >
            Five films on Ethiopia's historic victory at the Battle of Adwa
          </p>
        </motion.div>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-6">
        {documentaries.map((doc, i) => (
          <motion.div
            key={doc.id}
            data-ocid={`documentary.item.${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.20 0.04 45)",
              border: "1px solid oklch(0.28 0.04 45)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
            }}
          >
            {/* 16:9 video embed */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                data-ocid={`documentary.canvas_target.${i + 1}`}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${doc.id}`}
                title={doc.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>

            {/* Card info */}
            <div className="p-4">
              <div
                className="text-[10px] font-bold tracking-widest uppercase mb-1"
                style={{ color: "oklch(0.72 0.12 70)" }}
              >
                Documentary {i + 1}
              </div>
              <h2
                className="font-bold text-base leading-snug"
                style={{ color: "oklch(0.90 0.015 80)" }}
              >
                {doc.title}
              </h2>
              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{ color: "oklch(0.65 0.015 80)" }}
              >
                {doc.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
