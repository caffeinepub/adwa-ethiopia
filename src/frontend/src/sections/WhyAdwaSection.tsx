import { Globe, Shield, Sword } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const editorialQuotes = [
  {
    text: "Adwa was the first time in modern history that an African army defeated a European colonial power.",
    source: "Historical Record",
    accent: "#FCDD09",
  },
  {
    text: "The victory at Adwa gave hope to colonized peoples everywhere that freedom was achievable.",
    source: "Pan-African Legacy",
    accent: "#078930",
  },
  {
    text: "Ethiopia's independence inspired the founding of the African Union itself.",
    source: "African History",
    accent: "#DA121A",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "Inspired African Independence",
    desc: "Adwa became the rallying cry for independence movements across colonized Africa, proving that African nations could resist European domination.",
    accent: "#FCDD09",
  },
  {
    icon: Sword,
    title: "Challenged European Colonialism",
    desc: "The defeat shattered the myth of European military invincibility and forced a global rethinking of colonial assumptions about Africa.",
    accent: "#DA121A",
  },
  {
    icon: Shield,
    title: "Preserved Ethiopian Sovereignty",
    desc: "Ethiopia remained the only African nation to maintain full sovereignty throughout the colonial era — a direct result of Adwa.",
    accent: "#078930",
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

export default function WhyAdwaSection() {
  return (
    <div
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.01 250) 0%, oklch(0.10 0.01 250) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeBlock>
          <div className="text-center mb-20">
            <div
              className="flex justify-center gap-0 mb-6 mx-auto rounded-full overflow-hidden"
              style={{ width: 72, height: 6 }}
            >
              <div style={{ flex: 1, background: "#078930" }} />
              <div style={{ flex: 1, background: "#FCDD09" }} />
              <div style={{ flex: 1, background: "#DA121A" }} />
            </div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "#FCDD09", letterSpacing: "0.2em" }}
            >
              The Significance
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-bold mb-6"
              style={{
                color: "oklch(0.96 0.01 90)",
                textShadow: "0 2px 20px rgba(252,181,20,0.15)",
              }}
            >
              Why Adwa Matters
            </h2>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.65 0.02 90)" }}
            >
              A battle fought over a century ago continues to shape the destiny
              of an entire continent.
            </p>
          </div>
        </FadeBlock>

        {/* Editorial Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {editorialQuotes.map((q, i) => (
            <FadeBlock key={q.source} delay={i * 120}>
              <div
                className="h-full flex flex-col justify-between p-8 rounded-2xl"
                style={{
                  background: "oklch(0.17 0.01 250)",
                  border: `1px solid ${q.accent}33`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  transition:
                    "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-8px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${q.accent}55`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 24px rgba(0,0,0,0.4)";
                }}
              >
                {/* Giant decorative quote */}
                <div
                  className="font-display text-8xl leading-none mb-4 select-none"
                  style={{ color: `${q.accent}33`, lineHeight: 0.8 }}
                >
                  &ldquo;
                </div>

                <p
                  className="font-display text-lg md:text-xl italic leading-relaxed flex-1 mb-6"
                  style={{ color: "oklch(0.90 0.02 90)" }}
                >
                  {q.text}
                </p>

                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: 32,
                      height: 3,
                      background: q.accent,
                      borderRadius: 2,
                    }}
                  />
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: q.accent }}
                  >
                    {q.source}
                  </span>
                </div>
              </div>
            </FadeBlock>
          ))}
        </div>

        {/* Impact Cards */}
        <FadeBlock>
          <div className="text-center mb-12">
            <h3
              className="font-display text-3xl md:text-4xl font-bold"
              style={{ color: "oklch(0.96 0.01 90)" }}
            >
              The Lasting Impact
            </h3>
          </div>
        </FadeBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactCards.map((card, i) => (
            <FadeBlock key={card.title} delay={i * 150}>
              <div
                className="p-8 rounded-2xl text-center"
                style={{
                  background: "oklch(0.17 0.01 250)",
                  border: `1px solid ${card.accent}33`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  transition:
                    "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-8px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${card.accent}55`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 24px rgba(0,0,0,0.4)";
                }}
              >
                <div
                  className="inline-flex items-center justify-center rounded-full mb-6"
                  style={{
                    width: 72,
                    height: 72,
                    background: `${card.accent}18`,
                    border: `2px solid ${card.accent}44`,
                  }}
                >
                  <card.icon size={28} color={card.accent} />
                </div>
                <h4
                  className="font-display text-xl font-bold mb-4"
                  style={{ color: "oklch(0.96 0.01 90)" }}
                >
                  {card.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.62 0.02 90)" }}
                >
                  {card.desc}
                </p>
              </div>
            </FadeBlock>
          ))}
        </div>

        {/* Bottom quote */}
        <FadeBlock delay={200}>
          <div
            className="mt-20 text-center py-12 px-8 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(7,137,48,0.08), rgba(218,18,26,0.08))",
              border: "1px solid rgba(252,221,9,0.15)",
            }}
          >
            <p
              className="font-display text-2xl md:text-3xl lg:text-4xl italic font-bold"
              style={{
                color: "#FCDD09",
                textShadow: "0 0 40px rgba(252,221,9,0.3)",
              }}
            >
              &ldquo;Adwa is a symbol of freedom for all Africa&rdquo;
            </p>
          </div>
        </FadeBlock>
      </div>
    </div>
  );
}
