import { useScrollAnimation } from "../hooks/useScrollAnimation";

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

export default function MusicSection() {
  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.97 0.008 80)" }}>
      <div className="max-w-7xl mx-auto">
        <FadeBlock>
          <div className="text-center mb-14">
            <div className="eth-stripe mx-auto mb-5" style={{ maxWidth: 60 }}>
              <div className="s-green" />
              <div className="s-yellow" />
              <div className="s-red" />
            </div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "#078930" }}
            >
              CULTURAL HERITAGE
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "oklch(0.18 0 0)" }}
            >
              Patriotic Music
            </h2>
            <p
              className="text-base mt-4 max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.02 80)" }}
            >
              Songs celebrating Ethiopian pride, unity, and the legacy of Adwa
            </p>
          </div>
        </FadeBlock>

        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <FadeBlock key={v.id} delay={i * 100}>
              <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
              >
                <div className="h-1.5 flex">
                  <div className="flex-1" style={{ background: "#078930" }} />
                  <div className="flex-1" style={{ background: "#FCDD09" }} />
                  <div className="flex-1" style={{ background: "#DA121A" }} />
                </div>
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    title={v.title}
                    src={`https://www.youtube.com/embed/${v.videoId}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="px-5 py-4">
                  <h3
                    className="font-bold text-base"
                    style={{ color: "oklch(0.18 0 0)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "oklch(0.50 0.02 80)" }}
                  >
                    {v.subtitle}
                  </p>
                </div>
              </div>
            </FadeBlock>
          ))}
        </div>
      </div>
    </div>
  );
}
