import { useScrollAnimation } from "../hooks/useScrollAnimation";

const keyFacts = [
  { label: "Date", value: "March 1, 1896" },
  { label: "Location", value: "Adwa, Tigray, Ethiopia" },
  { label: "Outcome", value: "Ethiopian Victory" },
  {
    label: "Significance",
    value: "First African defeat of a European colonial power",
  },
];

function FadeBlock({
  children,
  delay = 0,
}: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollAnimation();
  return (
    <div
      ref={ref}
      className="fade-in-up"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LearnSection() {
  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.12 0.01 250)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeBlock>
          <div className="text-center mb-14">
            <div className="eth-stripe mx-auto mb-5" style={{ maxWidth: 60 }}>
              <div className="s-green" />
              <div className="s-yellow" />
              <div className="s-red" />
            </div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.72 0.18 145)" }}
            >
              HISTORY
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-bold"
              style={{ color: "oklch(0.94 0.01 90)" }}
            >
              The Battle of Adwa
            </h2>
            <p
              className="text-base mt-4 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.65 0.02 90)" }}
            >
              On March 1, 1896, Ethiopian forces under Emperor Menelik II won a
              decisive victory over the Italian army, becoming the first African
              nation to defeat a European colonial power.
            </p>
          </div>
        </FadeBlock>

        {/* Key Facts + Leaders */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <FadeBlock delay={100}>
            <div
              className="bg-card rounded-2xl overflow-hidden h-full museum-card shadow-card"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
            >
              <div className="h-2 flex">
                <div className="flex-1" style={{ background: "#078930" }} />
                <div className="flex-1" style={{ background: "#FCDD09" }} />
                <div className="flex-1" style={{ background: "#DA121A" }} />
              </div>
              <div className="p-6">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "oklch(0.72 0.18 145)" }}
                >
                  KEY FACTS
                </p>
                <div className="space-y-3">
                  {keyFacts.map((f) => (
                    <div key={f.label} className="flex gap-3">
                      <span
                        className="text-sm font-bold w-28 shrink-0"
                        style={{ color: "oklch(0.62 0.02 90)" }}
                      >
                        {f.label}:
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "oklch(0.94 0.01 90)" }}
                      >
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeBlock>

          {/* Leaders */}
          <FadeBlock delay={200}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {[
                {
                  img: "/assets/generated/menelik-ii.dim_400x500.jpg",
                  name: "Emperor Menelik II",
                  bio: "United Ethiopia's forces and led the nation to a historic victory against Italian colonialism.",
                },
                {
                  img: "/assets/generated/empress-taytu.dim_400x500.jpg",
                  name: "Empress Taytu Betul",
                  bio: "Powerful strategist who commanded her own troops and played a decisive role in the battle.",
                },
              ].map((leader) => (
                <div
                  key={leader.name}
                  className="bg-card rounded-2xl overflow-hidden museum-card shadow-card"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
                >
                  <div className="h-1.5" style={{ background: "#DA121A" }} />
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full object-cover object-top"
                    style={{ height: 160 }}
                  />
                  <div className="p-4">
                    <h3
                      className="font-bold text-sm"
                      style={{ color: "oklch(0.94 0.01 90)" }}
                    >
                      {leader.name}
                    </h3>
                    <p
                      className="text-xs mt-1 leading-snug"
                      style={{ color: "oklch(0.60 0.02 90)" }}
                    >
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeBlock>
        </div>

        {/* Text sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Background",
              text: "In 1889, Italy and Ethiopia signed the Treaty of Wuchale. Italy interpreted the treaty as making Ethiopia an Italian protectorate, but Ethiopia rejected this interpretation. When diplomatic negotiations failed, Italy invaded Ethiopia from its colony in Eritrea.",
              accent: "#078930",
            },
            {
              title: "The Battle",
              text: "Emperor Menelik II mobilized over 100,000 soldiers — one of the largest armies Africa had ever assembled. On March 1, 1896, Ethiopian forces surrounded and defeated the Italian army near Adwa, killing or capturing most of them.",
              accent: "#FCDD09",
            },
            {
              title: "Legacy",
              text: "The victory at Adwa preserved Ethiopia's independence and made it a symbol of African resistance to colonialism. The battle inspired anti-colonial movements across Africa and the African diaspora. March 2 is still celebrated as Adwa Victory Day.",
              accent: "#DA121A",
            },
          ].map((s, i) => (
            <FadeBlock key={s.title} delay={i * 120}>
              <div
                className="bg-card rounded-2xl p-6 h-full museum-card shadow-card"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                  borderTop: `4px solid ${s.accent}`,
                }}
              >
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: "oklch(0.94 0.01 90)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.02 90)" }}
                >
                  {s.text}
                </p>
              </div>
            </FadeBlock>
          ))}
        </div>

        {/* Museum section */}
        <FadeBlock>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.14 0.01 250)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            }}
          >
            <div className="h-2 flex">
              <div className="flex-1" style={{ background: "#078930" }} />
              <div className="flex-1" style={{ background: "#FCDD09" }} />
              <div className="flex-1" style={{ background: "#DA121A" }} />
            </div>
            <div className="p-8 md:p-12">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: "#FCDD09" }}
              >
                FOR TRAVELERS
              </p>
              <h3
                className="text-3xl font-bold mb-6"
                style={{ color: "oklch(0.96 0.01 90)" }}
              >
                🏗️ Adwa Victory Memorial Museum
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.02 90)" }}
                  >
                    The{" "}
                    <strong className="text-white">
                      Adwa Victory Memorial Museum
                    </strong>{" "}
                    is a modern museum located in{" "}
                    <strong className="text-white">Piassa, Addis Ababa</strong>.
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.02 90)" }}
                  >
                    Officially inaugurated in{" "}
                    <strong className="text-white">
                      2024 (Ethiopian Calendar: 2016)
                    </strong>{" "}
                    by Abiy Ahmed, to honor the heroes of the Battle of Adwa.
                  </p>
                  <div
                    className="rounded-xl p-4"
                    style={{ background: "oklch(0.19 0.01 250)" }}
                  >
                    <p
                      className="text-xs font-semibold mb-3"
                      style={{ color: "#FCDD09" }}
                    >
                      Inside the museum:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Historical artifacts 📚",
                        "Stories of Ethiopian heroes ⚔️",
                        "Exhibitions about unity and resistance 🇪🇹",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm"
                          style={{ color: "oklch(0.78 0.02 90)" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "#DA121A" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(218,18,26,0.15)",
                      borderLeft: "3px solid oklch(0.62 0.16 28)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.94 0.01 90)" }}
                    >
                      It is not just a museum — it is a symbol of pride, unity,
                      and identity for all Ethiopians ❤️🇪🇹
                    </p>
                  </div>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="/assets/abiy-ahmed.jpg"
                      alt="Prime Minister Abiy Ahmed Ali"
                      className="w-full object-cover object-top"
                      style={{ maxHeight: 300 }}
                    />
                    <div
                      className="px-4 py-3"
                      style={{ background: "oklch(0.19 0.01 250)" }}
                    >
                      <p className="text-sm font-semibold text-center text-white">
                        Prime Minister Abiy Ahmed Ali 🇪🇹
                      </p>
                      <p
                        className="text-xs text-center mt-1"
                        style={{ color: "oklch(0.65 0.02 90)" }}
                      >
                        Inaugurated the Adwa Victory Memorial Museum in 2024
                        (Ethiopian Calendar: 2016)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeBlock>
      </div>
    </div>
  );
}
