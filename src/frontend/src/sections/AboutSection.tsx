import { Heart, Quote, Smartphone, Target } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

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

export default function AboutSection() {
  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.12 0.01 250)" }}>
      <div className="max-w-3xl mx-auto">
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
              THE CREATOR
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-bold"
              style={{ color: "oklch(0.94 0.01 90)" }}
            >
              About the Developer
            </h2>
          </div>
        </FadeBlock>

        {/* Profile */}
        <FadeBlock delay={100}>
          <div
            className="bg-card rounded-2xl p-8 mb-6 text-center shadow-card museum-card"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
          >
            <div
              className="mx-auto mb-5 w-28 h-28 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 4px 24px rgba(7,137,48,0.30)",
                border: "3px solid #078930",
              }}
            >
              <img
                src="/assets/img_20260330_155402_754_2-019d3ee2-5da3-732b-ab24-6a9d982d86ba.jpg"
                alt="Helen Metekiya"
                className="w-full h-full object-cover"
              />
            </div>
            <h3
              className="text-2xl font-bold mb-1"
              style={{ color: "oklch(0.94 0.01 90)" }}
            >
              Helen Metekiya
            </h3>
            <span
              className="inline-block text-xs px-3 py-1 rounded-full mb-4"
              style={{
                background: "oklch(0.72 0.18 145 / 0.12)",
                color: "oklch(0.72 0.18 145)",
              }}
            >
              Developer
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.65 0.02 90)" }}
            >
              Hello! My name is Helen Metekiya 😊 I am 17 years old and a Grade
              12 student from Ethiopia 🇪🇹
            </p>
          </div>
        </FadeBlock>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeBlock delay={150}>
            <div
              className="rounded-2xl p-6"
              style={{ background: "oklch(0.14 0.01 250)", height: "100%" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: "#FCDD09" }}>🌍</span>
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#FCDD09" }}
                >
                  My Story
                </p>
              </div>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "oklch(0.72 0.02 90)" }}
              >
                From a young age, I have been deeply passionate about Ethiopian
                history, especially the leadership of Emperor Menelik II and
                Empress Taytu, and the inspiring victory of the Battle of Adwa.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.02 90)" }}
              >
                For me, Adwa is not just a historical event — it is a symbol of
                courage, unity, and independence. It represents the strength of
                a nation that stood against colonization and inspired the entire
                African continent 🌍✨
              </p>
            </div>
          </FadeBlock>

          <div className="space-y-6">
            <FadeBlock delay={200}>
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: "oklch(0.14 0.01 250)",
                  borderLeft: "3px solid #FCDD09",
                }}
              >
                <Quote
                  size={32}
                  className="absolute top-3 right-3 opacity-10"
                  style={{ color: "#FCDD09" }}
                />
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "#FCDD09" }}
                >
                  Philosophy
                </p>
                <p
                  className="text-sm leading-relaxed italic"
                  style={{ color: "oklch(0.80 0.02 90)" }}
                >
                  &ldquo;The future belongs to young innovators who respect
                  their history while building new solutions.&rdquo;
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: "oklch(0.62 0.02 90)" }}
                >
                  — Helen Metekiya
                </p>
              </div>
            </FadeBlock>

            <FadeBlock delay={250}>
              <div
                className="rounded-2xl p-6"
                style={{ background: "oklch(0.14 0.01 250)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} style={{ color: "#DA121A" }} />
                  <p
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "#DA121A" }}
                  >
                    Project Goal
                  </p>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.72 0.02 90)" }}
                >
                  This passion motivated me to develop this application,
                  combining technology with history to create a modern and
                  interactive way of learning. Through this app, I aim to
                  educate others, promote Ethiopian heritage, and show how
                  digital innovation can preserve our identity 📱💡
                </p>
              </div>
            </FadeBlock>
          </div>
        </div>

        <FadeBlock delay={300}>
          <div
            className="mt-6 rounded-2xl p-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.16 0.06 145) 0%, oklch(0.14 0.04 45) 100%)",
              border: "1px solid #07893040",
            }}
          >
            <Heart
              size={24}
              className="mx-auto mb-3"
              style={{ color: "oklch(0.72 0.18 145)" }}
            />
            <p
              className="text-base font-semibold mb-1"
              style={{ color: "oklch(0.94 0.01 90)" }}
            >
              I am proud to be Ethiopian 🇪🇹❤️
            </p>
            <p className="text-sm" style={{ color: "oklch(0.65 0.02 90)" }}>
              Thank you for using my app and being part of this journey 🙏
            </p>
          </div>
        </FadeBlock>

        <FadeBlock delay={350}>
          <div
            className="mt-4 rounded-2xl p-4 flex items-center justify-between shadow-card museum-card"
            style={{
              background: "oklch(0.17 0.01 250)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-3">
              <Smartphone size={18} style={{ color: "oklch(0.62 0.02 90)" }} />
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.94 0.01 90)" }}
                >
                  Adwa Ethiopia
                </p>
                <p className="text-xs" style={{ color: "oklch(0.62 0.02 90)" }}>
                  Built with love for Ethiopian heritage
                </p>
              </div>
            </div>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                background: "oklch(0.72 0.18 145 / 0.12)",
                color: "oklch(0.72 0.18 145)",
              }}
            >
              v2.0
            </span>
          </div>
        </FadeBlock>
      </div>
    </div>
  );
}
