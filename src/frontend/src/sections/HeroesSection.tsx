import AmharicNarration from "../components/AmharicNarration";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const heroes = [
  {
    name: "Emperor Menelik II",
    amharic: "ዳግማዊ አጤ ምኒልክ",
    title: "Commander-in-Chief",
    quote: "Ethiopia shall never bow to a foreign power.",
    description:
      "Leader of Ethiopia who united different regions and led the army to a historic victory against Italy in 1896, securing the nation's independence.",
    image: "/assets/generated/hero-menelik.dim_400x500.jpg",
    accent: "#078930",
  },
  {
    name: "Empress Taytu Betul",
    amharic: "እቴጌ ጣይቱ ብጡል",
    title: "Empress of Ethiopia",
    quote:
      "I am a woman and I do not love war, but I prefer death to accepting slavery.",
    description:
      "Strong and intelligent leader who played a key role in strategy and logistics, and personally supported the army during the Battle of Adwa.",
    image: "/assets/generated/hero-taytu.dim_400x500.jpg",
    accent: "#FCB514",
  },
  {
    name: "Ras Alula",
    amharic: "ራስ አሉላ",
    title: "Military General",
    quote: "No enemy shall pass while I stand.",
    description:
      "Brilliant general known for his extraordinary military skills and long experience defending Ethiopia's borders from foreign threats.",
    image: "/assets/generated/hero-alula.dim_400x400.jpg",
    accent: "#DA121A",
  },
  {
    name: "Ras Makonnen",
    amharic: "ራስ መኮንን",
    title: "Governor of Harar",
    quote: "Our land is not for sale; it is worth our blood.",
    description:
      "A respected commander and close advisor to Menelik II who played a major role in the battle. Father of Emperor Haile Selassie.",
    image: "/assets/generated/hero-makonnen.dim_400x500.jpg",
    accent: "#078930",
  },
  {
    name: "Ras Mengesha Yohannes",
    amharic: "ራስ መንገሻ ዮሐንስ",
    title: "Son of Emperor Yohannes IV",
    quote: "We carry the legacy of our fathers into battle.",
    description:
      "Son of Emperor Yohannes IV who contributed forces and decisive leadership during the war against the Italian colonial forces.",
    image: "/assets/generated/hero-mengesha.dim_400x400.jpg",
    accent: "#FCB514",
  },
  {
    name: "Ras Mikael of Wollo",
    amharic: "ራስ ሚካኤል ወሎ",
    title: "Commander of Wollo Forces",
    quote: "Unity is the shield that no spear can pierce.",
    description:
      "A powerful leader who brought a strong army from Wollo to the battlefield and played a pivotal role in surrounding the Italian forces.",
    image: "/assets/generated/hero-mikael.dim_400x500.jpg",
    accent: "#DA121A",
  },
  {
    name: "Negus Tekle Haymanot",
    amharic: "ንጉስ ተክለ ሃይማኖት",
    title: "King of Gojjam",
    quote: "Gojjam stands with Ethiopia — always and forever.",
    description:
      "King of Gojjam who contributed a large army and gave vital support to Emperor Menelik II in the decisive battle for Ethiopia's freedom.",
    image: "/assets/generated/hero-tekle-haymanot.dim_400x400.jpg",
    accent: "#078930",
  },
  {
    name: "Dejazmach Gebeyehu",
    amharic: "ደጃዝማች ገበየሁ",
    title: "War Hero of Adwa",
    quote: "I fall so that Ethiopia may stand.",
    description:
      "A brave warrior who fought heroically on the battlefield and made the ultimate sacrifice for Ethiopia's independence. His courage is eternal.",
    image: "/assets/generated/hero-gebeyehu.dim_400x500.jpg",
    accent: "#FCB514",
  },
  {
    name: "Balcha Safo",
    amharic: "ደጃዝማች ባልቻ ሳፎ",
    title: "Commander & General",
    quote: "Fear has no place in an Ethiopian's heart.",
    description:
      "A skilled and courageous general known for his fierce leadership in war. His bravery at Adwa made him one of Ethiopia's most celebrated soldiers.",
    image: "/assets/generated/hero-balcha.dim_400x500.jpg",
    accent: "#DA121A",
  },
  {
    name: "Fitawrari Habte Giyorgis",
    amharic: "ፊታውራሪ ሃብተ ጊዮርጊስ",
    title: "Military Organizer",
    quote: "Discipline and order are the foundation of every victory.",
    description:
      "A key military organizer and commander who helped coordinate Ethiopian forces with precision and discipline throughout the campaign.",
    image: "/assets/generated/hero-habte-giyorgis.dim_400x400.jpg",
    accent: "#078930",
  },
  {
    name: "Fitawrari Tekle",
    amharic: "ፊታውራሪ ተክሌ",
    title: "Battlefield Commander",
    quote: "Courage is the armor of the righteous.",
    description:
      "A courageous battlefield leader known for his bravery and discipline, who inspired his troops and fought with great valor at Adwa.",
    image: "/assets/generated/hero-fitawrari-tekle.dim_400x400.jpg",
    accent: "#FCB514",
  },
  {
    name: "Azmach Tafari",
    amharic: "አዝማች ተፈሪ",
    title: "Troop Commander",
    quote: "A true soldier fights not for glory, but for his people.",
    description:
      "A strong and resolute commander who led troops with remarkable courage and strategic skill throughout the Battle of Adwa in 1896.",
    image: "/assets/generated/hero-azmach-tafari.dim_400x400.jpg",
    accent: "#DA121A",
  },
];

const adwaQuotes = [
  {
    text: "The Battle of Adwa was not just a military victory — it was a triumph of the human spirit.",
    attribution: "Emperor Menelik II",
    accent: "#078930",
  },
  {
    text: "Africa has the right to be free. Adwa proved it to the world.",
    attribution: "Historical Reflection",
    accent: "#FCB514",
  },
  {
    text: "Adwa is a beacon of hope for all oppressed peoples. Ethiopia showed the world that freedom is worth fighting for.",
    attribution: "Pan-African Legacy",
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

        {/* UNITY Narration */}
        <AmharicNarration
          lines={["ከተራራዎች፣", "ከሜዳዎች፣", "ከአገር ሁሉ፣", "መጡ።", "እንደ አንድ ሆነው።"]}
          className="mb-12"
        />

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
                  className="text-lg font-bold mb-1 leading-tight"
                  style={{ color: "oklch(0.96 0.01 90)" }}
                >
                  {hero.name}
                </h3>

                {/* Amharic Name */}
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: hero.accent, fontFamily: "serif" }}
                >
                  {hero.amharic}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "oklch(0.62 0.02 90)" }}
                >
                  {hero.description}
                </p>

                {/* Quote */}
                <p
                  className="text-xs italic leading-relaxed px-1"
                  style={{
                    color: "oklch(0.72 0.02 90)",
                    borderLeft: `2px solid ${hero.accent}66`,
                    paddingLeft: 10,
                    textAlign: "left",
                  }}
                >
                  "{hero.quote}"
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

        {/* Adwa Inspirational Quotes */}
        <div className="mt-24">
          <FadeBlock>
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: "#FCB514", letterSpacing: "0.2em" }}
              >
                Words That Echo Through History
              </p>
              <h3
                className="font-display text-3xl md:text-4xl font-bold"
                style={{
                  color: "oklch(0.96 0.01 90)",
                  textShadow: "0 2px 20px rgba(252,181,20,0.12)",
                }}
              >
                Adwa Inspirational Quotes
              </h3>
            </div>
          </FadeBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adwaQuotes.map((q, i) => (
              <FadeBlock key={q.attribution} delay={i * 120}>
                <div
                  className="flex flex-col h-full p-7 rounded-2xl"
                  style={{
                    background: "oklch(0.17 0.01 250)",
                    border: "1px solid oklch(0.28 0.02 250)",
                    boxShadow: `0 4px 32px ${q.accent}10`,
                    transition: "transform 0.35s ease, box-shadow 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-8px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${q.accent}55`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 4px 32px ${q.accent}10`;
                  }}
                >
                  {/* Tricolor stripe at top */}
                  <div
                    className="flex mb-6 rounded-full overflow-hidden"
                    style={{ width: 48, height: 4 }}
                  >
                    <div style={{ flex: 1, background: "#078930" }} />
                    <div style={{ flex: 1, background: "#FCB514" }} />
                    <div style={{ flex: 1, background: "#DA121A" }} />
                  </div>

                  {/* Large decorative quote mark */}
                  <div
                    className="text-5xl font-serif leading-none mb-3 select-none"
                    style={{ color: `${q.accent}55` }}
                  >
                    &ldquo;
                  </div>

                  {/* Quote text */}
                  <p
                    className="flex-1 text-base italic leading-relaxed mb-6"
                    style={{ color: "oklch(0.82 0.02 90)" }}
                  >
                    {q.text}
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 28,
                        height: 2,
                        background: q.accent,
                        borderRadius: 1,
                        flexShrink: 0,
                      }}
                    />
                    <p
                      className="text-xs font-bold tracking-wider uppercase"
                      style={{ color: q.accent }}
                    >
                      {q.attribution}
                    </p>
                  </div>
                </div>
              </FadeBlock>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
