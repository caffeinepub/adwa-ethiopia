import { useScrollAnimation } from "../hooks/useScrollAnimation";

const heroes = [
  {
    name: "Emperor Menelik II",
    title: "Commander-in-Chief",
    description:
      "Leader of Ethiopia who united different regions and led the army to a historic victory against Italy in 1896, securing the nation's independence.",
    image: "/assets/generated/hero-menelik.dim_400x500.jpg",
    accent: "#078930",
  },
  {
    name: "Empress Taytu Betul",
    title: "Empress of Ethiopia",
    description:
      "Strong and intelligent leader who played a key role in strategy and logistics, and personally supported the army during the Battle of Adwa.",
    image: "/assets/generated/hero-taytu.dim_400x500.jpg",
    accent: "#FCB514",
  },
  {
    name: "Ras Alula",
    title: "Military General",
    description:
      "Brilliant general known for his extraordinary military skills and long experience defending Ethiopia's borders from foreign threats.",
    image: "/assets/generated/hero-alula.dim_400x400.jpg",
    accent: "#DA121A",
  },
  {
    name: "Ras Makonnen",
    title: "Governor of Harar",
    description:
      "A respected commander and close advisor to Menelik II who played a major role in the battle. Father of Emperor Haile Selassie.",
    image: "/assets/generated/hero-makonnen.dim_400x500.jpg",
    accent: "#078930",
  },
  {
    name: "Ras Mengesha Yohannes",
    title: "Son of Emperor Yohannes IV",
    description:
      "Son of Emperor Yohannes IV who contributed forces and decisive leadership during the war against the Italian colonial forces.",
    image: "/assets/generated/hero-mengesha.dim_400x400.jpg",
    accent: "#FCB514",
  },
  {
    name: "Ras Mikael of Wollo",
    title: "Commander of Wollo Forces",
    description:
      "A powerful leader who brought a strong army from Wollo to the battlefield and played a pivotal role in surrounding the Italian forces.",
    image: "/assets/generated/hero-mikael.dim_400x500.jpg",
    accent: "#DA121A",
  },
  {
    name: "Negus Tekle Haymanot",
    title: "King of Gojjam",
    description:
      "King of Gojjam who contributed a large army and gave vital support to Emperor Menelik II in the decisive battle for Ethiopia's freedom.",
    image: "/assets/generated/hero-tekle-haymanot.dim_400x400.jpg",
    accent: "#078930",
  },
  {
    name: "Dejazmach Gebeyehu",
    title: "War Hero of Adwa",
    description:
      "A brave warrior who fought heroically on the battlefield and made the ultimate sacrifice for Ethiopia's independence. His courage is eternal.",
    image: "/assets/generated/hero-gebeyehu.dim_400x500.jpg",
    accent: "#FCB514",
  },
  {
    name: "Balcha Safo",
    title: "Commander & General",
    description:
      "A skilled and courageous general known for his fierce leadership in war. His bravery at Adwa made him one of Ethiopia's most celebrated soldiers.",
    image: "/assets/generated/hero-balcha.dim_400x500.jpg",
    accent: "#DA121A",
  },
  {
    name: "Fitawrari Habte Giyorgis",
    title: "Military Organizer",
    description:
      "A key military organizer and commander who helped coordinate Ethiopian forces with precision and discipline throughout the campaign.",
    image: "/assets/generated/hero-habte-giyorgis.dim_400x400.jpg",
    accent: "#078930",
  },
  {
    name: "Fitawrari Tekle",
    title: "Battlefield Commander",
    description:
      "A courageous battlefield leader known for his bravery and discipline, who inspired his troops and fought with great valor at Adwa.",
    image: "/assets/generated/hero-fitawrari-tekle.dim_400x400.jpg",
    accent: "#FCB514",
  },
  {
    name: "Azmach Tafari",
    title: "Troop Commander",
    description:
      "A strong and resolute commander who led troops with remarkable courage and strategic skill throughout the Battle of Adwa in 1896.",
    image: "/assets/generated/hero-azmach-tafari.dim_400x400.jpg",
    accent: "#DA121A",
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

export default function HeroesSection() {
  return (
    <div
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.01 250) 0%, oklch(0.14 0.01 250) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeBlock>
          <div className="text-center mb-20">
            <div
              className="flex justify-center gap-0 mb-6 mx-auto"
              style={{
                width: 72,
                height: 6,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div style={{ flex: 1, background: "#078930" }} />
              <div style={{ flex: 1, background: "#FCB514" }} />
              <div style={{ flex: 1, background: "#DA121A" }} />
            </div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "#FCB514", letterSpacing: "0.2em" }}
            >
              In Eternal Memory
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-bold mb-6"
              style={{
                color: "oklch(0.96 0.01 90)",
                textShadow: "0 2px 20px rgba(252,181,20,0.15)",
              }}
            >
              Heroes of Adwa
            </h2>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.65 0.02 90)" }}
            >
              These brave leaders united a nation and changed the course of
              history. Their courage on March 1, 1896 secured Ethiopia's freedom
              and inspired all of Africa.
            </p>
          </div>
        </FadeBlock>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {heroes.map((hero, i) => (
            <FadeBlock key={hero.name} delay={Math.min(i * 80, 400)}>
              <div
                className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-400"
                style={{
                  background: "oklch(0.17 0.01 250)",
                  border: "1px solid oklch(0.28 0.02 250)",
                  cursor: "default",
                  transition:
                    "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-10px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 24px 48px rgba(0,0,0,0.45), 0 0 0 2px ${hero.accent}55`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Circular image */}
                <div
                  className="relative mb-5"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    padding: 3,
                    background: `linear-gradient(135deg, ${hero.accent}, oklch(0.22 0.01 250) 60%)`,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "oklch(0.12 0.01 250)",
                    }}
                  >
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Title badge */}
                <span
                  className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                  style={{
                    background: `${hero.accent}22`,
                    color: hero.accent,
                    border: `1px solid ${hero.accent}44`,
                  }}
                >
                  {hero.title}
                </span>

                {/* Name */}
                <h3
                  className="text-lg font-bold mb-3 leading-tight"
                  style={{ color: "oklch(0.96 0.01 90)" }}
                >
                  {hero.name}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.62 0.02 90)" }}
                >
                  {hero.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-5 w-10 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    height: 2,
                    background: hero.accent,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>
            </FadeBlock>
          ))}
        </div>

        {/* Bottom quote */}
        <FadeBlock delay={300}>
          <div className="text-center mt-20">
            <div
              className="inline-block px-10 py-6 rounded-2xl"
              style={{
                background: "oklch(0.17 0.01 250)",
                border: "1px solid oklch(0.28 0.02 250)",
                boxShadow: "0 4px 32px rgba(7,137,48,0.08)",
              }}
            >
              <p
                className="text-xl italic font-medium mb-2"
                style={{ color: "oklch(0.90 0.01 90)" }}
              >
                "ኢትዮጵያ ትቅደም" — Ethiopia Shall Prevail
              </p>
              <div
                className="flex justify-center gap-0 mx-auto mt-3"
                style={{
                  width: 48,
                  height: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div style={{ flex: 1, background: "#078930" }} />
                <div style={{ flex: 1, background: "#FCB514" }} />
                <div style={{ flex: 1, background: "#DA121A" }} />
              </div>
              <p
                className="text-xs mt-3 tracking-widest uppercase"
                style={{ color: "oklch(0.72 0.18 145)" }}
              >
                Battle Cry of Adwa, 1896
              </p>
            </div>
          </div>
        </FadeBlock>
      </div>
    </div>
  );
}
