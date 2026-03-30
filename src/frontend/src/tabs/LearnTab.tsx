import { motion } from "motion/react";

const keyFacts = [
  { label: "Date", value: "March 1, 1896" },
  { label: "Location", value: "Adwa, Tigray, Ethiopia" },
  { label: "Outcome", value: "Ethiopian Victory" },
  {
    label: "Significance",
    value: "First African defeat of a European colonial power",
  },
];

export default function LearnTab() {
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-1"
          style={{ color: "oklch(0.35 0.13 20)" }}
        >
          HISTORY
        </p>
        <h2
          className="font-display text-2xl font-bold"
          style={{ color: "oklch(0.20 0.04 45)" }}
        >
          The Battle of Adwa
        </h2>
        <p
          className="text-sm mt-2 leading-relaxed"
          style={{ color: "oklch(0.35 0.02 80)" }}
        >
          On March 1, 1896, Ethiopian forces under Emperor Menelik II won a
          decisive victory over the Italian army, becoming the first African
          nation to defeat a European colonial power and preserve its
          sovereignty.
        </p>
      </div>

      {/* Key Facts Card */}
      <div
        className="mx-4 bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
      >
        <div className="h-1.5" style={{ background: "oklch(0.35 0.13 20)" }} />
        <div className="p-4">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.35 0.13 20)" }}
          >
            KEY FACTS
          </p>
          <div className="space-y-2">
            {keyFacts.map((f) => (
              <div key={f.label} className="flex gap-2">
                <span
                  className="text-xs font-bold w-24 shrink-0"
                  style={{ color: "oklch(0.50 0.02 80)" }}
                >
                  {f.label}:
                </span>
                <span className="text-xs" style={{ color: "oklch(0.22 0 0)" }}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leader Profiles */}
      <div className="px-4 mt-5">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "oklch(0.50 0.02 80)" }}
        >
          LEADERS
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              img: "/assets/generated/menelik-ii.dim_400x500.jpg",
              name: "Emperor Menelik II",
              bio: "United Ethiopia's diverse forces and strategically led the nation to a historic victory against Italian colonialism.",
            },
            {
              img: "/assets/generated/empress-taytu.dim_400x500.jpg",
              name: "Empress Taytu Betul",
              bio: "A powerful strategist and leader who commanded her own troops and played a decisive role in the battle.",
            },
          ].map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
            >
              <div
                className="h-1.5"
                style={{ background: "oklch(0.35 0.13 20)" }}
              />
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-36 object-cover object-top"
              />
              <div className="p-3">
                <h3
                  className="font-bold text-xs leading-tight"
                  style={{ color: "oklch(0.20 0.04 45)" }}
                >
                  {leader.name}
                </h3>
                <p
                  className="text-xs mt-1 leading-snug"
                  style={{ color: "oklch(0.50 0.02 80)" }}
                >
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Text Sections */}
      <div className="px-4 mt-5 space-y-4">
        {[
          {
            title: "Background",
            text: "In 1889, Italy and Ethiopia signed the Treaty of Wuchale. Italy interpreted the treaty as making Ethiopia an Italian protectorate, but Ethiopia rejected this interpretation. When diplomatic negotiations failed, Italy invaded Ethiopia from its colony in Eritrea.",
          },
          {
            title: "The Battle",
            text: "Emperor Menelik II mobilized over 100,000 soldiers — one of the largest armies Africa had ever assembled. On March 1, 1896, Ethiopian forces surrounded and defeated the Italian army of approximately 17,000 troops near the town of Adwa in the Tigray region, killing or capturing most of them.",
          },
          {
            title: "Legacy",
            text: "The victory at Adwa preserved Ethiopia's independence and made it a symbol of African resistance to colonialism. The battle inspired anti-colonial movements across Africa and the African diaspora. March 2 is still celebrated as Adwa Victory Day in Ethiopia.",
          },
        ].map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl p-4"
            style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
          >
            <h3
              className="font-display font-bold text-base mb-2"
              style={{ color: "oklch(0.20 0.04 45)" }}
            >
              {section.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.02 80)" }}
            >
              {section.text}
            </p>
          </div>
        ))}
      </div>

      {/* Adwa Victory Memorial Museum */}
      <div className="px-4 mt-6">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-1"
          style={{ color: "oklch(0.35 0.13 20)" }}
        >
          FOR TRAVELERS
        </p>
        <h2
          className="font-display text-xl font-bold mb-3"
          style={{ color: "oklch(0.20 0.04 45)" }}
        >
          🏛️ Adwa Victory Memorial Museum
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="bg-white rounded-xl overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
        >
          {/* Color bar — Ethiopian flag colors */}
          <div className="h-2 flex">
            <div
              className="flex-1"
              style={{ background: "oklch(0.50 0.18 145)" }}
            />
            <div
              className="flex-1"
              style={{ background: "oklch(0.78 0.18 90)" }}
            />
            <div
              className="flex-1"
              style={{ background: "oklch(0.42 0.20 25)" }}
            />
          </div>

          <div className="p-4 space-y-3">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.02 80)" }}
            >
              The{" "}
              <strong style={{ color: "oklch(0.20 0.04 45)" }}>
                Adwa Victory Memorial Museum
              </strong>{" "}
              is a modern museum located in{" "}
              <strong style={{ color: "oklch(0.20 0.04 45)" }}>
                Piassa, Addis Ababa
              </strong>
              .
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.02 80)" }}
            >
              It was officially inaugurated in{" "}
              <strong style={{ color: "oklch(0.20 0.04 45)" }}>
                2024 (Ethiopian Calendar: 2016)
              </strong>{" "}
              by Abiy Ahmed, to honor the heroes of the Battle of Adwa.
            </p>

            {/* Prime Minister Abiy Ahmed Photo */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ boxShadow: "0 2px 8px rgba(42,26,18,0.12)" }}
            >
              <img
                src="/assets/abiy-ahmed.jpg"
                alt="Prime Minister Abiy Ahmed Ali"
                className="w-full object-cover object-top"
                style={{ maxHeight: "260px" }}
              />
              <div
                className="px-3 py-2"
                style={{ background: "oklch(0.97 0.01 80)" }}
              >
                <p
                  className="text-xs font-semibold text-center"
                  style={{ color: "oklch(0.28 0.08 25)" }}
                >
                  Prime Minister Abiy Ahmed Ali 🇪🇹
                </p>
                <p
                  className="text-xs text-center mt-0.5"
                  style={{ color: "oklch(0.50 0.02 80)" }}
                >
                  Inaugurated the Adwa Victory Memorial Museum in 2024
                  (Ethiopian Calendar: 2016)
                </p>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.02 80)" }}
            >
              The museum was built as a gift from the current generation to
              future generations, so they can learn about Ethiopia's history,
              courage, and independence.
            </p>

            {/* Inside the Museum */}
            <div
              className="rounded-lg p-3 mt-1"
              style={{ background: "oklch(0.97 0.01 80)" }}
            >
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: "oklch(0.35 0.13 20)" }}
              >
                Inside the museum, visitors can explore:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Historical artifacts 📚",
                  "Stories of Ethiopian heroes ⚔️",
                  "Exhibitions about unity and resistance 🇪🇹",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: "oklch(0.42 0.20 25)",
                        marginTop: "5px",
                      }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.22 0 0)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.02 80)" }}
            >
              The museum also shows how Ethiopians defeated colonial forces and
              protected their freedom, inspiring Africa and the world 🌍
            </p>

            {/* Highlighted closing line */}
            <div
              className="rounded-lg p-3"
              style={{
                background: "oklch(0.96 0.03 25)",
                borderLeft: "3px solid oklch(0.42 0.20 25)",
              }}
            >
              <p
                className="text-sm font-semibold leading-relaxed"
                style={{ color: "oklch(0.28 0.08 25)" }}
              >
                It is not just a museum — it is a symbol of pride, unity, and
                identity for all Ethiopians ❤️🇪🇹
              </p>
            </div>

            {/* Footer quote */}
            <p
              className="text-xs italic text-center pt-1"
              style={{ color: "oklch(0.50 0.02 80)" }}
            >
              "Adwa lives on through this museum, teaching us to be strong,
              united, and proud."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
