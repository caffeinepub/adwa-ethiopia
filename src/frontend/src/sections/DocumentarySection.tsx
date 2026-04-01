import { useScrollAnimation } from "../hooks/useScrollAnimation";

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

export default function DocumentarySection() {
  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.14 0.04 45)" }}>
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
              style={{ color: "#FCDD09" }}
            >
              WATCH & LEARN
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "oklch(0.95 0.008 80)" }}
            >
              Documentaries
            </h2>
            <p
              className="text-base mt-4 max-w-xl mx-auto"
              style={{ color: "oklch(0.65 0.01 80)" }}
            >
              Watch carefully curated documentaries about the Battle of Adwa and
              Ethiopian history
            </p>
          </div>
        </FadeBlock>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentaries.map((doc, i) => (
            <FadeBlock key={doc.id} delay={i * 100}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "oklch(0.19 0.04 45)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}
              >
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    title={doc.title}
                    src={`https://www.youtube.com/embed/${doc.id}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "oklch(0.93 0.01 80)" }}
                  >
                    {doc.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.65 0.01 80)" }}
                  >
                    {doc.description}
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
